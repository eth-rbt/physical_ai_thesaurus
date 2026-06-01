---
name: batch-cards
description: Produce a whole batch of Physical AI Thesaurus cards from a registry file in parallel. Use when the user wants to run the pipeline / build many cards at once — e.g. "run the priority-15 batch", "build all the cards in the registry", "process pipeline/registry.priority15.json". Phase 1 fans out one `research-project` agent per missing project; Phase 2 writes every card; then a single build gate. For a single card, use `thesaurus-card`; for a single project, use `research-project`.
---

# Batch Card Pipeline

Drive a full batch of the Physical AI Thesaurus from a registry file, fanning the slow part —
project research — across many agents in parallel instead of authoring cards one at a time.

This skill is explicit opt-in to the **Workflow** tool: orchestrate the batch as a workflow so
project research runs concurrently with a deterministic build gate at the end.

## Inputs

- `registry` — path to the registry JSON. Default: `pipeline/registry.priority15.json`.
- `only` — optional: restrict to specific `project_id`s / `card_id`s (e.g. re-run a few).
- `skip_research` / `skip_cards` — optional: run just one phase.

## Registry shape

```jsonc
{
  "existing_projects": ["rayban-meta-smart-glasses", ...],   // already authored → skip research
  "projects": [ { "project_id": "...", "name": "...", "type": "...", "source_hint": "..." }, ... ],
  "cards":    [ { "card_id": "...", "category": "...", "subcategory": "...", "title": "...",
                  "display": { ... }, "project_ids": [...] }, ... ]
}
```

## Process

1. **Read** the registry and `src/content.config.ts` (the authoritative schema). List
   `src/content/projects/` to see what truly exists on disk.
2. **Compute the research worklist.** A project needs research if it is in `projects`, not in
   `existing_projects`, and has no file on disk (unless `only` overrides). For each project on
   the worklist, build its **card_context**: scan `cards` for every card whose `project_ids`
   include it, and collect those cards' display modes and any `axis`/`x`/`y` metrics. A project
   placed on an `axis-1d`/`scatter-2d` card MUST end up with that metric — pass this into the
   agent prompt so it knows which metrics are mandatory.
3. **Launch a Workflow** (template below). Phase 1 researches projects in parallel via the
   `research-project` skill; Phase 2 writes the cards. Use a pipeline so a card can start as
   soon as all of its projects are done — but since project↔card is many-to-many, the simplest
   correct shape is: barrier after Phase 1 (all projects must exist before any card validates
   its references), then fan out cards.
4. **Build gate.** After the workflow returns, run `npm run build` from the repo root and fix
   any schema errors (bad enum, missing referenced project, metric type). Re-run until green.
5. **Report**: projects added vs. reused vs. failed, cards written, and a consolidated
   **Open Questions** list aggregated from the agents (disputed years, unverified claims,
   images flagged `needs_permission`).

## Workflow template

Adapt this — fill `RESEARCH` and `CARDS` from the registry in step 2, and inline each
project's computed `card_context` into its prompt. Keep `meta` a pure literal.

```js
export const meta = {
  name: 'thesaurus-batch',
  description: 'Research missing projects in parallel, then write all cards',
  phases: [{ title: 'Research projects' }, { title: 'Write cards' }],
}

const RESULT = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    status: { type: 'string', enum: ['added', 'updated', 'failed'] },
    confidence: { type: 'string' },
    open_questions: { type: 'array', items: { type: 'string' } },
  },
  required: ['id', 'status'],
}

// RESEARCH: [{ id, name, type, source_hint, card_context }]  — built from the registry
phase('Research projects')
const projects = await parallel(RESEARCH.map(p => () =>
  agent(
    `Follow the research-project skill to author src/content/projects/${p.id}.json.\n` +
    `name: ${p.name}\ntype hint: ${p.type}\nsource_hint: ${p.source_hint ?? 'none'}\n` +
    `card_context: ${p.card_context}\n` +
    `Write the JSON and fetch one image. Do NOT run npm build. Return the structured result.`,
    { label: `research:${p.id}`, phase: 'Research projects', schema: RESULT }
  )
))

// CARDS: [{ id, category, subcategory, title, display, project_ids }] — from the registry
phase('Write cards')
const cards = await parallel(CARDS.map(c => () =>
  agent(
    `Write the card markdown src/content/cards/${c.id}.md following the thesaurus-card skill's ` +
    `"Output files" card format. Use exactly:\n` +
    `category: ${c.category}\nsubcategory: ${c.subcategory}\ntitle: ${c.title}\n` +
    `display: ${JSON.stringify(c.display)}\nproject_ids: ${JSON.stringify(c.project_ids)}\n` +
    `Write a card_question, a one_line_summary, status: draft, and ONE short framing paragraph ` +
    `(1–3 sentences naming the range with plain examples). Do NOT run npm build.`,
    { label: `card:${c.id}`, phase: 'Write cards' }
  )
))

return { projects: projects.filter(Boolean), cards: cards.filter(Boolean) }
```

## Notes

- The build gate runs **once**, in the main loop after the workflow — agents are told not to
  build, since concurrent `npm run build` invocations would race.
- Failed project agents return `null` (filtered out) or `status: failed`. A card referencing a
  project that never got authored will fail the build at step 4 — that's the safety net; fix by
  re-running `research-project` for the missing id, then rebuild.
- Reuse is sacred: never let an agent create a second id for an existing real-world project.
  The worklist in step 2 already excludes anything on disk.
- Scale the fan-out to the batch. The default registry is ~50 projects + 14 cards; the workflow
  concurrency cap handles the queueing automatically.
