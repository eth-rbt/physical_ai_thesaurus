---
name: revise-cards
description: Revise existing Physical AI Thesaurus cards after reviewing the rendered site — add a project (new or existing) to one or more cards, place an existing project onto additional cards, or remove/reorder references. Use when the user is reacting to a page they looked at, e.g. "the Form card is missing elegant lamp-like objects, add the Apple/Pixar lamp", "put Roomba on the Mobility card too", "add ElliQ to the social robotics and companionship cards", "drop Jibo from this card". For authoring a brand-new card use `thesaurus-card`; for just researching a standalone project use `research-project`.
---

# Revise Cards

Edit the references on **existing** cards. The common case: the user looked at a rendered card,
noticed a missing kind of object, and wants a project added to that card (and often a few
sibling cards). A project is a shared atom — adding it to a card is editing that card's
`project_ids`, plus making sure the project carries whatever the card's display mode needs.

The data contract is `src/content.config.ts` (authoritative). Cards live in
`src/content/cards/<id>.md`; projects in `src/content/projects/<id>.json`.

## Inputs

- `project` — an existing `project_id`, or a name to research and create new (e.g. "Apple
  elegant lamp / Pixar-style lamp robot").
- `targets` — which cards to place it on: explicit card ids / `category → subcategory`, or
  "infer" (suggest cards from the project's attributes and ask before editing extras).
- `action` — `add` (default), `remove`, or `reorder`.

## Process

1. **Resolve the project.**
   - Existing id → read `src/content/projects/<id>.json`.
   - New → invoke the **`research-project`** skill to author it. Pass `card_context` = the
     target cards and their display modes so it scores the right metrics up front. Never create
     a second id for a real-world thing that already has one — list `src/content/projects/`
     first and reuse.
2. **Identify target cards.** Read each target card's frontmatter. If `targets` is "infer",
   match the project's `attributes`/`metrics` against existing cards (e.g. a project tagged
   `embodiment.form` belongs on `embodiment-form`) and **list the candidates for the user to
   confirm** before editing any card they didn't name.
2a. **Relevance check (do this for every add).** Before placing a project, confirm it is
   *genuinely an instance of that card's subcategory* — write the one-line reason it belongs
   there specifically. "Related to" is not enough. If it doesn't sharpen the card, say so rather
   than padding the grid. While you're in a card, also scan its existing `project_ids` for
   loose/off-topic references and **propose pruning** them (a weak reference signals the
   category is fuzzy) — list each suggested removal with a reason; remove the clearly off-topic
   ones, flag the borderline ones for the user. See `thesaurus-card` → "Selecting projects".
3. **For each target card, make the reference valid for its display mode** — this is the part
   that's easy to forget:
   - `grid` with `groupBy: "<key>"` → the project must have that attribute key with a value, or
     it lands in an "ungrouped" bucket. **A new attribute value creates a new group in the grid
     automatically** — which is exactly how you fill the "missing category" the user spotted.
   - `axis-1d` → the project must have `metrics.<axis.metric>`. If absent, score it on the 1–5
     scale (see `research-project`'s metrics table) and add it to the project JSON; otherwise it
     renders as "not placed."
   - `scatter-2d` → the project must have BOTH `x.metric` and `y.metric`.
   Add any missing attribute/metric to the **project** file (it's intrinsic and reused), not the
   card.
4. **Edit the card frontmatter.** `add`: append the id to `project_ids` (dedupe; place it near
   thematically-similar projects rather than blindly at the end). `remove`: delete the id.
   `reorder`: reorder as asked. **Re-read the paragraph against the new set** — if the change
   shifts what the projects reveal together (e.g. you added the only no-AI technique, or pruned
   the extreme that anchored the range), rewrite the one paragraph so it reports the *current*
   set (still 1–3 sentences, plain examples; weave the `ai_embedded` split where it sharpens).
5. **Keep the registry honest (optional).** If the project was new, add it to
   `pipeline/registry.priority15.json` (`projects` + the relevant cards' `project_ids`) so the
   planning file matches what's on disk. The files on disk are the source of truth; the registry
   is just the batch plan.
6. **Build gate.** Run `npm run build` from the repo root and fix any schema errors (unknown
   project reference, bad enum, non-numeric metric). Re-run until green.

## Rules

- Reuse over duplicate: one id per real-world project, always.
- Adding a project to a card is a frontmatter edit + (if needed) a metric/attribute on the
  project — never copy project detail into the card.
- Don't silently invent metrics to satisfy an axis. Score only what's defensible; if you truly
  can't, tell the user the project will sit in "not placed" rather than faking a number.
- Set image `rights_status` honestly; only set `local_image` if a licensed file exists in
  `/public` (see `research-project` for the fetch routine).

## Finish

Report: the project (created vs. reused), every card edited and how (`project_ids` added/removed,
metrics/attributes added to the project to satisfy a display mode), any sibling cards you
suggest but didn't touch, the build result, and a short **Open Questions** list.
