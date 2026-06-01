---
name: thesaurus-card
description: Research and author one Physical AI Thesaurus card. Use when the user asks to create, research, or fill in an thesaurus card for a given category + subcategory (e.g. "research Embodiment → Mobility", "make the Function → Companionship card", "add a card for Intelligence → Autonomy Level"). Produces a markdown card plus reusable project JSON records that render directly in the Astro site.
---

# Thesaurus Card Research

Research one card in the Physical AI Thesaurus and write it into the site as files that
render with no further processing. A card = one `category → subcategory`. The thesaurus
studies physical AI through four categories: **Embodiment, Intelligence, Function,
Genealogy**.

The full research methodology, source priorities, and controlled attribute
vocabularies live in `readme.md` at the repo root — read it before researching. The
data contract lives in `src/content.config.ts` — that schema is authoritative; if this
file and the schema ever disagree, the schema wins.

## Inputs

The user provides at least a category and subcategory. Optional: `research_depth`
(quick | standard | deep | exhaustive), `special_focus`, `avoid`, and a preferred
`display` mode.

## Principle: projects are shared, cards are views

Do **not** describe a project inside the card. Projects are reusable atoms stored once
in `src/content/projects/<id>.json`. A card references them by id and arranges them.
The same project (e.g. `rayban-meta-smart-glasses`) is cited by many cards and always
links to its single `/projects/<id>` page.

**Before creating any project, list `src/content/projects/` and reuse existing files.**
If a project exists, add the new card's attributes to it rather than duplicating it
under a new id. Never create two ids for the same real-world project.

## Process

1. Read `readme.md` (methodology + vocabularies) and `src/content.config.ts` (schema).
2. List `src/content/projects/` to see what already exists for reuse.
3. Research the subcategory using real sources (WebSearch / WebFetch). Prioritize, in
   order: official product/project pages, academic papers, lab pages, museum/exhibition
   pages, credible journalism, video demos. **Do not invent sources, projects, years,
   or technical details.** Mark anything unverified as `confidence: low` and list it
   under Open Questions in your final message.
4. Pick 6–10 representative projects spanning commercial products, research prototypes,
   HCI/ubicomp systems, robotics, and art/design where relevant.
5. Choose the `display` mode (see below) that best fits the subcategory.
6. Write/update the project JSON files, then write the card markdown.
7. Fetch an image for each new project (see "Fetching images" below).
8. Run `npm run build` and fix any schema errors before reporting done.

## Choosing the display mode

- `grid` — an unordered gallery; pass `groupBy: "<category.subcategory>"` to cluster by
  a categorical attribute (e.g. Form grouped by `embodiment.form`). Default choice.
- `axis-1d` — projects ordered along one scalar axis (e.g. autonomy, efficiency). Every
  placed project needs a numeric value in `metrics.<name>`.
- `scatter-2d` — projects positioned by two scalar metrics (x and y).

If a 1D/2D mode needs a metric the projects don't have yet, add the numeric value to
each project's `metrics` object. Metrics are intrinsic to the project and reused across
cards; a card may relabel/redirect them via the `axis` config but should not change the
underlying number per-card.

### Metrics vocabulary (ordinal 1–5)

Use these shared dimension names so axis cards across the thesaurus stay comparable.
Score what is clearly true for the project; omit a metric rather than guess.

| metric | 1 (low) | 5 (high) | feeds card |
|---|---|---|---|
| `proximity` | room / infrastructure | on-body / worn | Spatial Relationship |
| `mobility` | fixed | freely mobile / flying | Mobility, Portability |
| `scale` | jewelry-size | room / vehicle-size | Scale of Object |
| `social_legibility` | appliance, barely legible | humanoid / social actor | Social Legibility, Modalities |
| `form_specificity` | formless / voice-only | highly form-specific body | Formless → Form-Specific |
| `autonomy` | notify only | acts autonomously, high delegation | Trust / Delegation |
| `initiative` | fully reactive, waits | proactive, self-initiates | Active → Passive |
| `memory_span` | momentary buffer | long-term autobiographical | Memory Span |
| `visibility` | hidden in infrastructure | overt / direct | Hidden → Direct |
| `generality` | single narrow task | general-purpose | Specified → General |
| `intensity` | ambient, low attention | high-attention, expressive | Intensity |
| `expressiveness` | purely utilitarian | affective / expressive | Utilitarian ↔ Expressive |
| `timing` | async / scheduled | real-time / in-the-moment | Async → In-the-Moment |

## Output files

### Card — `src/content/cards/<category>-<subcategory>.md` (kebab-case id)

```markdown
---
category: Embodiment
subcategory: Mobility
title: Mobility
card_question: How does the AI move through the world?
one_line_summary: Short enough for a card grid.
status: draft
display:
  mode: grid
  groupBy: embodiment.mobility
project_ids:
  - rayban-meta-smart-glasses
  - figure-02
---

Physical AI forms go from glasses to pins to toys to home robots, and the form sets what you expect before the system acts.
```

**Keep the prose short and concrete — one short paragraph, 1–3 sentences.** Name the
range with plain examples (e.g. "from glasses to pins to toys to home robots"). No
multi-section essays, no "Why It Matters / Taxonomy / Design Notes" walls of text — the
projects on the right carry the detail; the paragraph just frames them.

### Project — `src/content/projects/<project-id>.json` (kebab-case id)

```json
{
  "name": "Ray-Ban Meta Smart Glasses",
  "year": 2023,
  "organization": ["Meta", "Ray-Ban"],
  "project_type": "commercial_product",
  "short_description": "One sentence.",
  "long_description": "2–4 sentences on the project and why it matters for this card.",
  "primary_url": "https://...",
  "attributes": {
    "embodiment.form": ["Glasses / eyewear", "Wearable"],
    "intelligence.input": ["Vision", "Audio", "Speech"]
  },
  "metrics": { "social_legibility": 2 },
  "images": [{
    "image_id": "img-rayban-meta-001",
    "caption": "...",
    "image_type": "product_photo",
    "source_url": "https://...",
    "rights_status": "needs_permission",
    "alt_text": "Required. Describe the image for a screen reader."
  }],
  "sources": [{
    "source_id": "source-rayban-meta-001",
    "title": "...",
    "source_type": "official_product_page",
    "url": "https://...",
    "publisher": "Meta",
    "year": 2023
  }],
  "confidence": "high"
}
```

`attributes` keys are `"<category>.<subcategory>"` lowercased; values come from the
controlled vocabularies in `readme.md` (use normalized labels like `Glasses / eyewear`,
not `Ray-Ban shaped AI glasses`). Tag obvious attributes across all four categories, not
just the requested card, but don't over-tag with speculative values. Enum values
(`project_type`, `image_type`, `rights_status`, `source_type`, `confidence`) must match
the schema exactly.

## Fetching images

Each new project should get a real photo. Fan this out: spawn **one agent per new
project** (in a single message so they run in parallel) to find and download an image.
Tell each agent to:

- **Strongly prefer Wikimedia Commons** (`commons.wikimedia.org` / `en.wikipedia.org`) so
  the license is clear and the file is hotlinkable. Grab the DIRECT file URL on
  `upload.wikimedia.org`.
- `curl -L -A "Mozilla/5.0 ..."` the file to `public/projects/<project-id>.<ext>` (match
  the real extension — jpg/png/webp).
- Verify with `file` that it is a real image > 8KB (not an HTML error page). The Wikimedia
  `/thumb/.../NNNpx-` URLs sometimes 404 — fall back to the original file URL.
- If Commons has nothing, use an official press image and flag rights as needs-permission.
- Report back: saved filename, page URL, license, and one-sentence alt text.

Then, for each downloaded file:
- If it is over ~1 MB, downscale: `sips -Z 1000 public/projects/<file>`.
- Set the project's image record: `local_image` (e.g. `/projects/<id>.jpg`), `source_url`
  (the Commons/press page), `alt_text` (the agent's description), and `rights_status`
  (`creative_commons` / `public_domain` for Commons; `needs_permission` for press images).

The grid/scatter tiles use `local_image` automatically; projects without one fall back to
a styled name placeholder, so the site always builds.

## Rules

- All ids are lowercase kebab-case.
- Every project has ≥1 source and ≥1 attribute; every image has `alt_text`.
- Do not download image files. Set `rights_status` honestly (`needs_permission` or
  `unknown` when unsure); only set `local_image` if a licensed file exists in `/public`.
- Uncertain year → `null`; uncertain organization → `[]`. Explain in Open Questions.
- Reuse existing projects; never duplicate.

## Finish

After `npm run build` passes, report: the card created, projects added vs. reused, the
chosen display mode, and a short **Open Questions / Uncertainties** list (disputed years,
unverified claims, unclear image rights).
