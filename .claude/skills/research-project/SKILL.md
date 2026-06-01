---
name: research-project
description: Research and author ONE reusable Physical AI project record (the shared atom that cards reference). Use when the user asks to research, add, or refresh a single project — e.g. "research the Oura Ring project", "add a project record for ElliQ", "refresh google-nest-hub". Produces one `src/content/projects/<id>.json` plus an image, and is the unit the `batch-cards` orchestrator fans out in parallel. For authoring a whole card (prose + project list + display), use `thesaurus-card` instead.
---

# Research One Project

Author a single reusable **project** record for the Physical AI Thesaurus. A project is a
shared atom: one JSON file in `src/content/projects/<id>.json` that owns everything about a
real-world system (categorical `attributes`, scalar `metrics`, `images`, `sources`) and is
referenced by many cards. This skill produces exactly one such file and one image. It does
**not** write cards.

The authoritative data contract is `src/content.config.ts` — if anything here disagrees with
that schema, the schema wins. The source priorities and controlled vocabularies live in
`readme.md` at the repo root.

## Inputs

- `project_id` — required, lowercase kebab-case (becomes the filename).
- `name` — required, the real-world name.
- `type` — optional hint for `project_type` (verify it against reality; don't trust blindly).
- `source_hint` — optional URL or one-line description to seed the research.
- `card_context` — optional: which card(s) will use this project and via which display mode.
  Use this to know **which attributes and metrics matter most** (e.g. an `axis-1d` card on
  `proximity` means this project MUST get a `metrics.proximity` value).

## Process

1. **Reuse check.** If `src/content/projects/<project_id>.json` already exists, read it and
   **update** it (add missing attributes/metrics/sources) rather than overwriting wholesale.
   Never create a second id for the same real-world thing.
2. **Read the vocab.** Skim `readme.md` for the controlled attribute vocabularies and the
   metrics scale, and `src/content.config.ts` for the enum values that must match exactly.
3. **Research with real sources** (WebSearch / WebFetch). Prioritize, in order: official
   product/project pages → academic papers → lab pages → museum/exhibition pages → credible
   journalism → video demos. **Never invent sources, years, organizations, or technical
   claims.** Uncertain year → `null`; uncertain organization → `[]`. Mark shaky records
   `confidence: low` and surface the gap in your final message.
4. **Tag attributes across all four categories** (Embodiment, Intelligence, Function,
   Genealogy) where clearly true — not just the requested card — but don't over-tag with
   speculation. Keys are `"<category>.<subcategory>"` lowercased; values are the normalized
   labels from `readme.md` (e.g. `Glasses / eyewear`, not a freehand phrase).
5. **Score only the metrics you're confident about.** Always include any metric named in
   `card_context`. Use the shared 1–5 scale below. Omit a metric rather than guess.
6. **Fetch one image** (see below).
7. Write `src/content/projects/<project_id>.json`. Do **not** run `npm run build` — this skill
   is an atom that gets fanned out; the caller (or `batch-cards`) runs the build once at the
   end. If you are invoked standalone and want to verify, run it, but a single project rarely
   breaks the schema on its own.

### Metrics vocabulary (ordinal 1–5)

| metric | 1 (low) | 5 (high) |
|---|---|---|
| `proximity` | room / infrastructure | on-body / worn |
| `mobility` | fixed | freely mobile / flying |
| `scale` | jewelry-size | room / vehicle-size |
| `social_legibility` | appliance, barely legible | humanoid / social actor |
| `form_specificity` | formless / voice-only | highly form-specific body |
| `autonomy` | notify only | acts autonomously, high delegation |
| `initiative` | fully reactive | proactive, self-initiates |
| `memory_span` | momentary buffer | long-term autobiographical |
| `visibility` | hidden in infrastructure | overt / direct |
| `generality` | single narrow task | general-purpose |
| `intensity` | ambient, low attention | high-attention |
| `expressiveness` | purely utilitarian | affective / expressive |
| `timing` | async / scheduled | real-time / in-the-moment |

## Output file — `src/content/projects/<project_id>.json`

```json
{
  "name": "Oura Ring",
  "year": 2015,
  "organization": ["Oura Health"],
  "project_type": "commercial_product",
  "short_description": "One sentence.",
  "long_description": "2–4 sentences on the project and why it matters as physical AI.",
  "primary_url": "https://...",
  "ai_embedded": "none",
  "ai_note": "One line justifying the value.",
  "attributes": {
    "embodiment.form": ["Wearable"],
    "intelligence.input": ["Motion", "Environmental sensors"]
  },
  "metrics": { "proximity": 5, "memory_span": 4 },
  "images": [{
    "image_id": "img-oura-ring-001",
    "caption": "...",
    "image_type": "product_photo",
    "source_url": "https://...",
    "rights_status": "creative_commons",
    "alt_text": "Required. Describe the image for a screen reader.",
    "local_image": "/projects/oura-ring.jpg"
  }],
  "sources": [{
    "source_id": "source-oura-ring-001",
    "title": "...",
    "source_type": "official_product_page",
    "url": "https://...",
    "publisher": "Oura Health",
    "year": 2015
  }],
  "confidence": "high"
}
```

Enum fields (`project_type`, `image_type`, `rights_status`, `source_type`, `confidence`,
`ai_embedded`) must be one of the exact values in `src/content.config.ts`. Every project needs
≥1 source and ≥1 attribute; every image needs `alt_text`.

**`ai_embedded`** answers, honestly, whether real AI/ML runs *inside* the system — it renders as
an obvious badge on the project page. Values: `none` (a mechanical / sensing / actuation /
tangible technique — most interaction-design prototypes, e.g. a motorized pin display);
`some` (AI/ML powers a real component, e.g. a learned gesture classifier); `core` (AI is central
to what it is); `envisioned` (AI is part of the concept/vision but not implemented — concepts,
speculative design); `unknown`. Don't inflate it; always add a one-line `ai_note`.

## Fetching the image

- **Strongly prefer Wikimedia Commons** (`commons.wikimedia.org` / `en.wikipedia.org`) for
  clear licensing and a hotlinkable file. Grab the DIRECT file URL on `upload.wikimedia.org`.
- Download: `curl -L -A "Mozilla/5.0 ..." <url> > public/projects/<project_id>.<ext>` (match
  the real extension — jpg/png/webp).
- Verify with `file` that it is a real image > 8KB (not an HTML error page). The Wikimedia
  `/thumb/.../NNNpx-` URLs sometimes 404 — fall back to the original file URL.
- If it is over ~1 MB, downscale: `sips -Z 1000 public/projects/<project_id>.<ext>`.
- Set the image record: `local_image` (`/projects/<id>.<ext>`), `source_url` (the Commons/press
  page), `alt_text`, and `rights_status` (`creative_commons` / `public_domain` for Commons;
  `needs_permission` for official press images you did not download).
- If you cannot find a clearly-licensed image, still write the image record with
  `rights_status: needs_permission` (or `unknown`) and **omit** `local_image` — the site falls
  back to a styled placeholder tile, so the build still succeeds.

## Finish

Report: the project id (added vs. updated), `confidence`, which metrics you scored, the image
(filename + license, or why none), and a short **Open Questions** list (disputed year,
unclear organization, unverified claims, uncertain image rights).
