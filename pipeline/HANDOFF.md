# Physical AI Thesaurus — Pipeline Handoff

You are taking over an in-progress research pipeline for the **priority-15 card batch**.
Read this top to bottom, then continue from "What's left".

## Project shape (read these first)

- Data model & rules: `.claude/skills/thesaurus-card/SKILL.md` — output format, the controlled
  **attribute** vocabulary, and the ordinal 1–5 **metrics** vocabulary.
- Exact schema + allowed enum values: `src/content.config.ts` (authoritative — match it).
- Attribute value lists per category: `readme.md`.
- The batch registry (cards + project lists + display modes): `pipeline/registry.priority15.json`.
- A worked example to copy the shape of: `src/content/projects/rayban-meta-smart-glasses.json`.

Cards are markdown views; **projects are shared atoms** (one JSON file each, owning their
attributes, metrics, images, sources). Cards reference projects by id.

## Current state

- **8 original projects** already complete (rayban-meta-smart-glasses, humane-ai-pin, figure-02,
  tesla-optimus, sony-aibo, boston-dynamics-spot, amazon-astro, rabbit-r1).
- **39 new projects** already researched, written, and image-fetched (all valid JSON).
- **Images** live in `public/projects/<id>.<ext>`; records point to them via `local_image`.
- The Forms card (`src/content/cards/embodiment-form.md`) is already built and rendering.

## What's left

### Phase 1 — finish these 13 project records

For each id below, research it (real sources only — no invented facts/years/sources), then write
`src/content/projects/<id>.json` per the schema, and download one image to
`public/projects/<id>.<ext>` (Wikimedia Commons first; downscale >1MB with `sips -Z 1000`; set
`local_image`, `source_url`, correct `rights_status`, and `alt_text`). Fill metrics 1–5 —
especially `proximity`, `memory_span`, `autonomy`, `expressiveness`, `social_legibility` (they
drive the plot cards). Tag attributes across all four categories using the normalized vocab.

| id | name | type | notes |
|---|---|---|---|
| anki-vector | Anki Vector (and Cozmo) | commercial_product | |
| furhat | Furhat Robotics social robot | commercial_product | |
| kismet | Kismet (MIT social robot) | research_prototype | |
| lovot | LOVOT | commercial_product | |
| nabaztag | Nabaztag ambient rabbit | commercial_product | |
| softbank-pepper | SoftBank Pepper | commercial_product | |
| google-soli | Project Soli (Google ATAP) | research_prototype | radar micro-gesture/presence sensing |
| little-signals | Little Signals | research_prototype | Google ATAP + Design I/O; calm ambient notification objects |
| weiser-ubiquitous-computing | Mark Weiser's Ubiquitous Computing vision | concept | conceptual/historical; image may be a diagram |
| xerox-parc-ubicomp | Xerox PARC ubicomp (tabs/pads/boards) | concept | conceptual/historical |
| be-the-beat | Be the Beat | art_design_project | **Ethan Chang's project** — source: https://ethanchang.design/projects/btb.html (use page text + cover image; rights needs_permission) |
| stochastic-parrot | Stochastic Parrot | art_design_project | **Ethan Chang's project** — source: https://ethanchang.design/projects/parrot.html |
| cordyceps | Cordyceps | art_design_project | **Ethan Chang's project** — source: https://ethanchang.design/projects/cordyceps.html |

You can fan these out as parallel sub-agents (one per project) or do them sequentially.
A ready-to-reuse workflow script for exactly this exists at:
`~/.claude/projects/-Users-ethrbt-code-physicalAI-thesarus/40067975-03b5-4713-a454-beb4a9f954e2/workflows/scripts/thesaurus-projects-p15-wf_f719e391-43c.js`
(trim its `PROJECTS` array to these 13 before running, or just run the 13 directly).

### Phase 1 verify

Run `npm run build`. Fix any schema errors (usually a wrong enum value or a missing required
field). All project ids referenced by cards must resolve.

### Phase 2 — author the 14 cards

For each card in `pipeline/registry.priority15.json` → `cards`, write
`src/content/cards/<card_id>.md` with:
- frontmatter: category, subcategory, title, card_question, one_line_summary, status: draft,
  the `display` block **exactly as given in the registry**, and `project_ids` (the registry list).
- body: **one short paragraph (1–3 sentences)** — concrete, names the range. No multi-section essays.

Three cards are plots (their `display` is already set in the registry): `intelligence-memory-span`
(axis-1d on `memory_span`), `embodiment-spatial-relationship` (axis-1d on `proximity`),
`function-trust-delegation` (axis-1d on `autonomy`), and `embodiment-modalities-of-expression`
(scatter-2d on `expressiveness` × `social_legibility`). For these, confirm the referenced
projects actually have those metrics; backfill the metric on any project that's missing it.

### Phase 2 verify

`npm run build`, then check: each card renders, the grid groups correctly, the three axis cards
and the scatter card place their projects, and project pages show "Appears in" cross-links.

## Permissions

`.claude/settings.local.json` already allows the needed tools (Write/Edit, WebSearch/WebFetch,
curl, sips, npm, etc.) so sub-agents run without prompts.
