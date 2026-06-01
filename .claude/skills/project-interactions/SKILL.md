---
name: project-interactions
description: Enrich a Physical AI project record with a "Possible interactions" section — the interesting, concrete things that can happen with this product or idea. Researches real precedents (documented features + emergent/creative uses people actually do, both cited) and adds grounded proposed ideas, clearly labeled. Use when the user wants to flesh out thin project pages, add interactions/use-cases/scenarios to a project, or "make the project cards less grim" — e.g. "add possible interactions to the Roomba", "give Ray-Ban Meta an interactions section", "fill in interactions for the social robots". Writes into `src/content/projects/<id>.json`; can be fanned out across many projects.
---

# Project Interactions

Add a **Possible interactions** section to a project: the vivid, specific things that happen
when a person actually lives with this product or idea. The bar is *interesting and verified* —
not a feature dump, not invented marketing copy. Each interaction is one concrete scenario.

This writes the `interactions` array on `src/content/projects/<id>.json` (schema in
`src/content.config.ts`). It renders on the `/projects/<id>` page as labeled cards.

## The three provenance levels — this is the whole point

Every interaction is tagged with how grounded it is. **This tag is a promise about evidence:**

- `documented` — an actual supported feature or first-party use case. **Must** carry a real,
  fetchable `source_url` (official page, manual, credible demo/review).
- `observed` — a real *emergent* use people actually do that wasn't the headline pitch: hacks,
  rituals, art pieces, community workarounds, memes, misuse. **Must** carry a real `source_url`
  (news, forum thread, paper, project page, video). These are often the most interesting.
- `proposed` — a plausible interaction that is **not yet observed**, invented here. Allowed, but
  it must be grounded in a capability the project *actually has* (read its `attributes`,
  `intelligence.input`, sensors, `function.role`). Optionally cite an analog precedent elsewhere
  via `source_url`. Never dress a proposed idea up as a real feature.

If you cannot verify a source for a `documented`/`observed` item, either drop it or downgrade it
to `proposed`. **Do not invent URLs, demos, studies, or quotes.** A fabricated source is worse
than a missing interaction.

## Process

1. Read `src/content/projects/<id>.json`. Note what it can really do — its inputs, model, form,
   role, and existing `sources`. Proposed ideas must stay inside that capability envelope (don't
   give a voice speaker a camera).
2. If the project already has `interactions`, read them — you are augmenting/refining, not
   duplicating. Merge rather than replace.
3. Research (WebSearch / WebFetch):
   - **documented**: official feature lists, manuals, first-party demos, hands-on reviews.
   - **observed**: how people actually use (and misuse) it — communities (Reddit, forums), news,
     academic field studies, artists/designers, viral moments. Capture the genuinely surprising
     ones (the Roomba that ferries the cat; the voice assistant kids say "please" to).
   - **proposed**: a few forward ideas the product's real sensors/model make possible and that
     would be interesting for a designer to see. Tie each to an actual capability.
4. Write **5–8 interactions** with a deliberate spread — lead with documented/observed (grounded,
   cited) and include a couple of proposed. Don't pad; cut the boring ones.
5. Voice: concrete and scene-like, one interaction per entry. Prefer "Glance at a foreign menu
   and hear it read back in English" over "supports translation." No marketing adjectives, no
   "revolutionary." 1–2 sentences each.
6. Write the `interactions` array into the JSON (see shape below). Touch nothing else.
7. Run `npm run build`, then `node pipeline/lint.mjs --errors` (the linter enforces that every
   documented/observed interaction has a `source_url`). Fix and re-run until clean.

## Record shape

```json
"interactions": [
  {
    "title": "Live translation in your ear",
    "description": "Look at a sign or menu in another language and ask Meta AI to read it back to you in English, hands-free.",
    "provenance": "documented",
    "source_url": "https://www.meta.com/help/smart-glasses/...",
    "source_label": "Meta — smart glasses help"
  },
  {
    "title": "POV recipe coaching",
    "description": "Cooks prop the glasses on to capture a first-person view and ask step-by-step questions without touching a screen with messy hands.",
    "provenance": "observed",
    "source_url": "https://www.theverge.com/...",
    "source_label": "The Verge hands-on"
  },
  {
    "title": "Spot-narrate a museum",
    "description": "Glance at an artwork and get a quiet plain-language explanation in your ear — grounded in the on-board camera + multimodal assistant the glasses already run.",
    "provenance": "proposed"
  }
]
```

`source_label` is the short human label for the link (falls back to "source" if omitted).

## Doing many projects at once

This fans out cleanly — spawn **one agent per project** (parallel), each following this skill for
its `<id>` and told NOT to run the build. Then run `npm run build` + `node pipeline/lint.mjs`
once at the end. The `batch-cards` workflow pattern is a good template.

## Finish

Report, per project: how many interactions added by provenance (e.g. 3 documented / 2 observed /
2 proposed), anything you deliberately downgraded to `proposed` for lack of a source, and any
`open questions` (claims you couldn't verify). Confirm the build + lint are clean.
