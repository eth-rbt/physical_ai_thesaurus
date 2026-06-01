---
name: deepen-cards
description: Deeply rethink and regenerate the PROSE on existing Physical AI Thesaurus cards — the card's one_line_summary, the per-project one-liners (project_notes), and the framing paragraph — by reasoning hard about what the subcategory is really about and how each chosen project specifically instantiates it. Use when the user wants sharper, more thoughtful card writing without changing which projects are shown — e.g. "rewrite the one-liners with more depth", "regenerate the card prose", "think harder about each card and its projects", "the blurbs feel generic, deepen them". For changing WHICH projects appear use `rebalance-cards`/`revise-cards`; for a brand-new card use `thesaurus-card`.
---

# Deepen Cards

Regenerate the writing on an **existing** card so it reflects real thought about the
subcategory and the specific projects on it. This skill rewrites three prose fields and
**nothing else**. It does not research, re-select, add, or remove projects, and it never edits
project JSON files.

A card = one `category → subcategory`, stored at `src/content/cards/<id>.md`. The data contract
is `src/content.config.ts` (authoritative). House voice and the metrics/attribute vocab live in
`readme.md` and `.claude/skills/thesaurus-card/SKILL.md` — match them.

## What you may change (only these three)

1. `one_line_summary` (frontmatter) — the card's own one-liner.
2. `project_notes` (frontmatter) — the card-specific one-liner shown under each project tile.
3. The **body paragraph** (markdown under the frontmatter).

## What you must NOT change

`category`, `subcategory`, `title`, `card_question`, `status`, `display` (mode/axis/groupBy),
`summary` (the takeaways block), and **`project_ids`** stay exactly as they are. Never edit any
file under `src/content/projects/`. If the current selection seems wrong, say so in your report —
do not fix it here (that's `rebalance-cards`).

## Think deeply first (do this before writing a word)

For each card, work it out on a scratchpad **before** drafting. This thinking is the point of the
skill — skipping it produces the generic blurbs we're trying to replace.

1. **Read the card** frontmatter + current body, and **read every referenced project's JSON**
   (`short_description`, `long_description`, `attributes`, `metrics`, `ai_embedded`/`ai_note`).
   Work strictly from the projects currently in `project_ids` — no more, no fewer.
2. **State the concept in your own words.** What is this subcategory *actually* asking? What is
   the real axis of variation underneath the obvious one? (e.g. "Memory Span" isn't just
   duration — it's whose memory it is and what it's *for*.) Write 2–4 sentences to yourself.
3. **Locate the range and the tension.** Across the chosen set, what are the revealing extremes,
   and what's the surprise that only shows up when you look at these specific projects together?
   Note the `ai_embedded` split — if a subcategory is carried by clever sensing/actuation with no
   AI, or AI is bolted onto a pre-AI idea, that's often the sharpest point.
4. **For each project, find its *specific* relationship to THIS concept** — the one thing this
   project (not a generic sibling) teaches about this subcategory, grounded in its real record.
   If you can only write something true of any product, you haven't thought hard enough.

Only after this do you write. Test every line: *could it have been written without looking at
this specific card / this specific project?* If yes, rewrite it.

## Writing the three fields

- **`one_line_summary`** — one sentence that captures the *concept and its range*, not a
  definition. Sharp, concrete, a little opinionated. It's the card's thesis in a line.
- **`project_notes[<id>]`** — one card-specific line per project, framed to THIS card's concept
  (the same project reads differently on every card). Ground it in the project's real record;
  name what's distinctive. **Length:** ~12–22 words for `grid`/`axis-1d` cards; **punchy ~8–16
  words** for `scatter-2d` cards (those render as hover tooltips). Write a note for **every**
  current `project_id`, and **remove notes for ids no longer present** so the map matches the
  selection exactly.
- **Body paragraph** — ONE short paragraph (1–3 sentences) reporting what the chosen projects
  **reveal together**: the range they span, the tension, or the surprise. Name concrete examples
  from the set; weave the `ai_embedded` split where it sharpens the point. No multi-section
  essays — the projects carry the detail; the paragraph frames them.

Vary sentence shape across cards; don't fall into a template ("X runs from A to B" every time).
Plain, declarative, specific. No marketing voice, no hedging, no invented facts/specs/years — if
the project record doesn't support a claim, don't make it.

## Process

1. Read `readme.md` and `.claude/skills/thesaurus-card/SKILL.md` once for voice + vocab.
2. For each target card: read the card and all its referenced project JSONs.
3. Do the "Think deeply first" pass (above) on a scratchpad.
4. Rewrite the three fields **in place** in the card `.md`, leaving all other frontmatter keys and
   their formatting untouched. Keep YAML valid: `project_notes` is a map of `id: "quoted string"`;
   escape any inner quotes.
5. Confirm `project_notes` keys exactly match the current `project_ids` (one each, no stragglers).
6. Run `npm run build` from the repo root; fix any YAML/schema errors; re-run until green.

Multiple cards can be deepened in parallel (one agent per card) — each edits only its own `.md`,
so there are no write conflicts. Each agent must still do the full deep-thinking pass for its card.

## Rules

- Touch only `one_line_summary`, `project_notes`, and the body. Everything else is frozen.
- Never edit project JSON, `project_ids`, `display`, or `summary`.
- Ground every line in the project's real record; no invented capabilities, specs, or years.
- Every current project gets exactly one note; remove notes for projects no longer referenced.
- Keep it short: one_line_summary = one sentence; body = 1–3 sentences.

## Finish

Report, per card: the new `one_line_summary`, how many `project_notes` were rewritten, a one-line
note on the concept/angle you found, the build result, and any cards whose **selection** you think
is off (for a follow-up `rebalance-cards`/`revise-cards` — don't fix it here).
