---
name: trend-brief
description: Research and author ONE Physical AI Thesaurus trend — a time-sensitive market/use-case brief for the Trends tab. Every trend MUST carry three structured sections: a growth plot, target customers & personas, and a list of key use cases — plus cited sources and links to existing project atoms. Use when the user wants to add or refresh a trend / market domain — e.g. "add a trend for smart home", "add autonomous vehicles to the Trends page", "refresh the AI wearables trend", "research the humanoid labor market trend". Writes one `src/content/trends/<id>.md`. For an evergreen taxonomy card use `thesaurus-card`; for a reusable project atom use `research-project`.
---

# Author One Trend

Author a single **trend** for the Physical AI Thesaurus Trends tab. A trend is a
time-sensitive, cited read on where a slice of physical AI is heading — one markdown file
in `src/content/trends/<id>.md`. Unlike cards (evergreen taxonomy), a trend carries an
`updated` date and is meant to be refreshed as the field moves.

Every trend MUST have three structured sections, because the schema requires them and the
detail page renders all three:

1. **A growth plot** — `growth`: ≥2 time-series data points (a chart of where the market/adoption is going).
2. **Target customers & personas** — `audience`: who buys/uses it, plus concrete user personas.
3. **Key use cases** — `use_cases`: ≥3 concrete things the trend enables.

The authoritative data contract is the `trends` collection in `src/content.config.ts` — if
anything here disagrees with that schema, **the schema wins**.

## Inputs

- `trend_id` — required, lowercase kebab-case (becomes the filename, e.g. `smart-home`).
- `title` — required, the domain name (e.g. "Smart home AI").
- `angle` — optional hint: `brief` (market-intel framing) vs `use_case` (emerging-use-case framing).
- `scope_hint` — optional one-line description to bound the domain.

## Process

1. **Reuse check.** If `src/content/trends/<trend_id>.md` already exists, **update** it
   (refresh figures, bump `updated`, add sources) rather than overwriting wholesale.
2. **Research with real sources** (WebSearch / WebFetch). Gather, at minimum:
   - 2+ concrete, cited market figures (market size $, CAGR, shipments, adoption, clearances).
   - The growth trajectory needed for the plot (anchor years + values; mark forecasts).
   - Who the real customers are and what the live use cases / open questions are.
   **Never invent statistics, dollar figures, sources, or URLs.** Verify every URL resolves.
   Where analyst estimates diverge widely, cite a representative source and say so (and set
   `confidence: medium`). Prefer credible_news / academic_paper / official sources.
3. **Pick the linked atoms.** List existing projects with
   `ls src/content/projects/ | sed 's/.json$//'` and choose 5–10 ids that genuinely relate.
   `related_project_ids` MUST reference **existing** ids only (they use `reference('projects')`
   — a bad id fails the build). If an obviously-central atom is missing, note it in **Open
   Questions**; optionally author it with the `research-project` skill.
4. **Build the growth plot data.** 2+ points anchored to a cited source. Set `projected: true`
   on any forecast/future point (the chart dashes those segments). Keep `unit` short (`$B`,
   `M units`, `M units/yr`). Put the source + CAGR in `caption`.
5. **Write target customers & personas.** `customers` = buyer/user segments (short phrases).
   `personas` = 3–4 concrete archetypes, each a `name` + one-sentence `description` grounded in
   the real domain (personas are interpretive, but must be plausible given the research — don't
   attach fake numbers to them).
6. **Write ≥3 key use cases** — each a `title` + short `description`, drawn from the research
   (documented uses first, then credible emerging ones). Be concrete, not hype.
7. **Write the narrative body** (markdown after the frontmatter): 2–3 short paragraphs —
   (a) market now + growth with cited figures, (b) what's newly possible / drivers,
   (c) emerging use cases + whitespace/open questions. Attribute figures inline like
   "(Source: Publisher, year)".
8. Write `src/content/trends/<trend_id>.md`. If invoked standalone, run `npm run build` to
   verify the schema and that every `related_project_ids` ref resolves. If fanned out in
   parallel, let the orchestrator run the build once at the end.

## Output file — `src/content/trends/<trend_id>.md`

```markdown
---
title: "Smart home AI"
kind: brief            # 'brief' (market-intel) | 'use_case' (emerging-use-case)
horizon: now           # now | next | emerging  (where the bulk of the domain sits today)
status: published      # draft | review | published
summary: "One punchy sentence — the hook."
updated: 2026-06-01    # YYYY-MM-DD; drives the freshness badge — set to today
related_project_ids:   # existing project ids ONLY (5–10)
  - amazon-echo-alexa
  - google-nest-hub
growth:                # REQUIRED — the growth plot
  label: "Smart home market"
  unit: "$B"
  caption: "<Source firm>; ~X% CAGR, <span>."
  points:              # ≥2; mark forecasts projected: true
    - { year: 2025, value: 150 }
    - { year: 2030, value: 330, projected: true }
audience:              # REQUIRED — target customers & personas
  customers:           # ≥1 buyer/user segments
    - "Homeowners"
    - "Renters / smart-apartment operators"
  personas:            # ≥1 (aim for 3–4) concrete archetypes
    - name: "The convenience-first homeowner"
      description: "Automates lighting, locks, and climate; wants it to 'just work' hands-free."
use_cases:             # REQUIRED — ≥3 concrete use cases
  - title: "Voice-controlled whole-home control"
    description: "Lights, locks, thermostats, and media by voice."
  - title: "Energy & presence automation"
    description: "Routines that cut energy use based on occupancy."
  - title: "Home security & monitoring"
    description: "Cameras and sensors with AI event detection."
sources:               # same shape as project sources
  - source_id: firm-smart-home-2025
    title: "..."
    url: "https://..."
    publisher: "..."
    year: 2025
    source_type: credible_news   # official_product_page | official_blog_post | press_release | academic_paper | credible_news | documentation | unknown
confidence: high       # high | medium | low
---

Paragraph 1 — market now + growth, with cited figures (Source: Publisher, year).

Paragraph 2 — what's newly possible and the drivers.

Paragraph 3 — emerging use cases and the whitespace / open questions.
```

Enum fields (`kind`, `horizon`, `status`, `source_type`, `confidence`) must be one of the exact
values in `src/content.config.ts`. Constraints the schema enforces: `growth.points` ≥ 2,
`audience.customers` ≥ 1, `audience.personas` ≥ 1, `use_cases` ≥ 3, `updated` a valid date.

## Finish

Report: the trend id (added vs. updated), `kind`/`horizon`, `confidence`, the linked atom ids
(and any obviously-missing atom worth authoring), and a short **Open Questions** list (figures
that diverge between sources, anything you couldn't verify, forecast assumptions). State plainly
that no statistic was invented and every source URL was checked to resolve.
