# Physical AI Atlas Card Research Skill

## Local setup

The site is an [Astro](https://astro.build) app that runs server-side (SSR) so a
password gate can protect every page and so editable fields / thoughts can be
merged in from Supabase. After cloning:

```bash
npm install
cp .env.example .env   # then fill in the values below
npm run dev            # http://localhost:4321
```

### Environment variables

`.env` is **gitignored** — every clone needs its own. Nothing crashes if a value
is missing, but the password gate **fails closed**: with no `SITE_PASSWORD`, no
login is accepted and the whole site is inaccessible. Minimum to see the site is
`SITE_PASSWORD` (+ `SESSION_SECRET`); add the Supabase keys for the live Thoughts
feed.

| Variable | Required? | Purpose |
|---|---|---|
| `SITE_PASSWORD` | **Yes — to log in** | Shared site password (role `user`: read + add thoughts). |
| `SESSION_SECRET` | Recommended | Signs the session cookie. Falls back to an insecure dev default if unset. Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `ADMIN_PASSWORD` | Optional | Separate key granting role `admin` (edit/delete any thought). |
| `PUBLIC_SUPABASE_URL` | For Thoughts | Supabase project URL (Project Settings → API). |
| `PUBLIC_SUPABASE_ANON_KEY` | For Thoughts | Supabase anon/public key (browser read + realtime). |
| `SUPABASE_SERVICE_ROLE_KEY` | For Thoughts | Server-only key for writes via API routes. **Never expose / never prefix with `PUBLIC_`.** |

Without the Supabase keys the Thoughts panels simply show "not configured yet";
everything else works.

### Supabase (Thoughts feed)

1. Create a project at [supabase.com](https://supabase.com).
2. Run [`pipeline/supabase_schema.sql`](pipeline/supabase_schema.sql) in the SQL editor (creates the `thoughts` + `overrides` tables, RLS, and realtime).
3. Copy the Project URL, anon key, and service-role key into `.env`.

### Build & deploy

```bash
npm run build          # outputs .vercel/output via @astrojs/vercel
```

Deploys to **Vercel** (import the repo; it auto-detects Astro). Set all six
variables above in **Vercel → Settings → Environment Variables**, then redeploy —
env-var changes don't apply to existing deployments.

---

## Purpose

This skill researches one card in the Physical AI Atlas.

The atlas studies physical AI interactions through four high-level categories:

* Embodiment
* Intelligence
* Function
* Genealogy

Each category contains many subcategories. A card corresponds to one specific subcategory, such as:

* Embodiment → Form
* Embodiment → Proximity
* Intelligence → Model Type
* Intelligence → Input Modality
* Function → Companionship
* Function → Labor
* Genealogy → Smart Objects
* Genealogy → Social Robotics

The goal is to produce both:

1. A human-readable card page for the website.
2. Structured database records for reusable projects, images, sources, and attributes.

Do not treat each card as an isolated article. Treat each card as one lens into a shared atlas of projects.

---

## Input Format

The user will provide:

```yaml
category: Embodiment | Intelligence | Function | Genealogy
subcategory: string
research_depth: quick | standard | deep | exhaustive
output_target: card_page | database | both
special_focus: optional string
avoid: optional list of topics
```

Example:

```yaml
category: Embodiment
subcategory: Form
research_depth: deep
output_target: both
special_focus: physical AI interaction demos, commercial products, HCI/ubicomp prototypes, robotics examples
avoid:
  - detailed model architecture unless necessary
  - market analysis
```

---

## Core Research Boundary

Research only the requested card’s subcategory.

For example, if the card is:

```yaml
category: Embodiment
subcategory: Form
```

Then focus on physical form factors: glasses, wearables, humanoids, desktop agents, animal robots, appliances, mobile robots, architectural systems, industrial robots, vehicles, etc.

Do not drift into long analysis of intelligence, function, or genealogy unless it helps explain why a form matters.

However, when a project is discovered, still tag it with obvious attributes across the whole atlas.

Example:

Ray-Ban Meta may be discussed under Embodiment → Form as “glasses,” but its project record can also include:

```yaml
embodiment.form:
  - Glasses
  - Wearable
  - Head-worn
intelligence.input:
  - Vision
  - Audio
  - Speech
intelligence.model:
  - Large language model
  - Vision-language model
function.role:
  - Assistant
  - Capture
  - Memory
genealogy.lineage:
  - Smart glasses
  - Wearable computing
```

---

## Research Goals

For each card, produce:

1. A clear definition of the subcategory.
2. A concise explanation of why the subcategory matters for physical AI interaction.
3. A taxonomy of major types within the subcategory.
4. Examples from:

   * Commercial products
   * Research prototypes
   * HCI / ubicomp systems
   * Robotics systems
   * Art / design / speculative interaction projects, where relevant
5. Design implications.
6. Edge cases and hybrid cases.
7. Suggested images and visual layout ideas.
8. Structured project records that can be reused across cards.
9. Structured image records.
10. Source records with URLs and notes.

---

## Source Requirements

Use reliable sources where possible.

Prioritize:

1. Official project pages
2. Product pages
3. Academic papers
4. Conference proceedings
5. Lab pages
6. Museum / exhibition pages
7. Credible journalism
8. Video demos, only when primary sources are unavailable

For academic projects, capture:

* Paper title
* Authors, if available
* Venue
* Year
* DOI or ACM / IEEE / arXiv URL if available
* Project website, if available

For commercial products, capture:

* Company
* Product page
* Launch year or announcement year
* Official images or press images, if available

Do not invent sources. If a claim cannot be verified, mark it as uncertain.

---

## Output Format

Always produce output in the following sections:

```markdown
# Card Research Output

## 1. Card Metadata

## 2. Card Page Content

## 3. Taxonomy

## 4. Design Implications

## 5. Edge Cases / Hybrids

## 6. Suggested Page Layout

## 7. Project Records

## 8. Image Records

## 9. Attribute Records

## 10. Source Records

## 11. Open Questions / Uncertainties
```

---

# 1. Card Metadata

Return a metadata object.

```json
{
  "card_id": "embodiment-form",
  "category": "Embodiment",
  "subcategory": "Form",
  "title": "Form",
  "card_question": "What physical form does the AI take?",
  "one_line_summary": "Form defines the physical carrier through which an AI system appears, senses, acts, and participates in the world.",
  "status": "draft",
  "research_depth": "deep"
}
```

Rules:

* `card_id` should be lowercase kebab-case.
* Use the format `{category}-{subcategory}`.
* The `card_question` should be phrased as a design question.
* The `one_line_summary` should be short enough for a card grid.

---

# 2. Card Page Content

Produce website-ready text.

Use this structure:

```markdown
## Title

## One-paragraph Overview

## Why It Matters

## Main Taxonomy

## Design Notes

## Representative Examples

## Related Cards
```

The one-paragraph overview should be polished and readable. It should not sound like a database dump.

Tone:

* Clear
* Research-informed
* Design-oriented
* Suitable for an interactive atlas
* Not overly academic
* Not marketing copy

Example style:

> Form is the physical carrier through which an AI system becomes socially and materially legible. A model embedded in glasses suggests first-person perception and personal augmentation, while the same model embedded in a humanoid body suggests labor, companionship, or social presence. In physical AI, form does not merely package intelligence; it frames what users expect the system to know, do, notice, and become.

---

# 3. Taxonomy

Create a taxonomy table for the requested subcategory.

Example for Embodiment → Form:

```markdown
| Type | Description | Interaction Affordances | Typical Examples | Design Risks |
|---|---|---|---|---|
| Glasses / eyewear | Head-worn AI systems with first-person sensing | Memory, capture, navigation, situated assistance | Ray-Ban Meta, Google Glass, Brilliant Labs Frame | Privacy concerns, social recording anxiety |
| Humanoid robots | Humanlike robots with faces, torsos, arms, or legs | Social interaction, labor, instruction-following | Figure AI, Tesla Optimus, Ameca | Overpromising humanlike capability |
```

Taxonomies should be mutually understandable, but they do not need to be perfectly mutually exclusive. Physical AI systems often belong to multiple types.

---

# 4. Design Implications

List 5–10 design implications.

Each implication should follow this pattern:

```markdown
### Implication Title

Explanation.

Relevant examples:
- Example A
- Example B
```

Good implication examples:

* Form creates an expectation of agency.
* Body-worn devices inherit privacy concerns from cameras and microphones.
* Humanoid forms increase social readability but also increase expectation mismatch.
* Familiar object forms lower onboarding cost but may hide new capabilities.
* Mobility changes whether the AI is perceived as a tool, agent, or cohabitant.

---

# 5. Edge Cases / Hybrids

Identify ambiguous or hybrid examples.

For each, explain why it is hard to classify.

Example:

```markdown
### Smart speakers

Smart speakers are physically embodied, but minimally expressive. They are domestic objects, audio agents, and ambient assistants, but they lack visible locomotion or manipulation. They sit between appliance, agent, and infrastructure.
```

---

# 6. Suggested Page Layout

Suggest a layout for the website card page.

Return this structure:

```json
{
  "hero": {
    "title": "Form",
    "subtitle": "What physical form does the AI take?",
    "image_suggestion": "A grid of contrasting physical AI forms: glasses, humanoid, desktop robot, smart object, industrial arm"
  },
  "sections": [
    {
      "type": "intro_paragraph",
      "content": "..."
    },
    {
      "type": "taxonomy_grid",
      "content": "Major form types with images"
    },
    {
      "type": "example_gallery",
      "content": "Representative projects"
    },
    {
      "type": "design_implications",
      "content": "Key implications for interaction design"
    },
    {
      "type": "related_cards",
      "content": "Links to related atlas cards"
    }
  ]
}
```

---

# 7. Project Records

For every example mentioned, create a structured project record.

Use JSON Lines format, one project per line.

Required fields:

```json
{
  "project_id": "rayban-meta-smart-glasses",
  "name": "Ray-Ban Meta Smart Glasses",
  "year": 2023,
  "organization": ["Meta", "Ray-Ban"],
  "project_type": "commercial_product",
  "short_description": "AI-enabled smart glasses with cameras, microphones, speakers, and multimodal assistant features.",
  "long_description": "A longer 2–4 sentence description of the project and its relevance to the requested card.",
  "primary_url": "https://...",
  "source_ids": ["source-rayban-meta-001"],
  "image_ids": ["img-rayban-meta-001"],
  "confidence": "high"
}
```

Accepted `project_type` values:

* commercial_product
* research_prototype
* academic_paper
* art_design_project
* industrial_system
* platform
* dataset
* concept
* unknown

Rules:

* Use lowercase kebab-case for `project_id`.
* Do not duplicate projects already listed in the same output.
* If the project year is uncertain, use `null` and explain in Open Questions.
* If the organization is uncertain, use an empty array and explain in Open Questions.
* Use `confidence: high | medium | low`.

---

# 8. Image Records

Create an image record for each suggested or sourced image.

Use JSON Lines format.

Required fields:

```json
{
  "image_id": "img-rayban-meta-001",
  "project_id": "rayban-meta-smart-glasses",
  "suggested_filename": "rayban-meta-smart-glasses-product.jpg",
  "caption": "Ray-Ban Meta smart glasses with camera embedded in the frame.",
  "image_type": "product_photo",
  "source_url": "https://...",
  "rights_status": "official_press_image",
  "alt_text": "A pair of black smart glasses with a small camera visible near the corner of the frame.",
  "linked_card_ids": ["embodiment-form"]
}
```

Accepted `image_type` values:

* product_photo
* research_figure
* system_diagram
* interaction_photo
* screenshot
* render
* exhibition_photo
* video_still
* unknown

Accepted `rights_status` values:

* official_press_image
* academic_fair_use_candidate
* user_generated
* needs_permission
* public_domain
* creative_commons
* unknown

Rules:

* Do not download images unless explicitly asked.
* Prefer official image sources.
* Every image must have alt text.
* If image rights are unclear, set `rights_status` to `unknown` or `needs_permission`.

---

# 9. Attribute Records

Create normalized attribute records connecting projects to atlas categories and subcategories.

Use JSON Lines format.

Required fields:

```json
{
  "project_id": "rayban-meta-smart-glasses",
  "category": "Embodiment",
  "subcategory": "Form",
  "attribute_value": "Glasses / eyewear",
  "confidence": "high",
  "evidence": "The product is a pair of smart glasses with cameras, microphones, and speakers."
}
```

Rules:

* Attribute records are many-to-many.
* A project can have multiple values for the same subcategory.
* Use stable, reusable attribute labels.
* Prefer normalized labels over overly specific labels.
* Example: use `Glasses / eyewear`, not `Ray-Ban shaped AI glasses`.
* Include attributes outside the requested card only when they are obvious and useful.
* Do not over-tag with speculative attributes.

---

# 10. Source Records

Create source records.

Use JSON Lines format.

Required fields:

```json
{
  "source_id": "source-rayban-meta-001",
  "title": "Ray-Ban Meta Smart Glasses",
  "source_type": "official_product_page",
  "url": "https://...",
  "publisher": "Meta",
  "year": 2023,
  "access_notes": "Official product page.",
  "relevant_project_ids": ["rayban-meta-smart-glasses"]
}
```

Accepted `source_type` values:

* official_product_page
* official_blog_post
* press_release
* academic_paper
* project_page
* lab_page
* conference_page
* exhibition_page
* credible_news
* video_demo
* documentation
* unknown

Rules:

* Every project should have at least one source when possible.
* Prefer primary sources.
* Use credible secondary sources only to supplement.
* Do not include unrelated links.

---

# 11. Open Questions / Uncertainties

End with unresolved issues.

Examples:

```markdown
- The exact launch year for Project X is unclear; sources disagree between 2018 and 2019.
- The model architecture for Product Y is not publicly specified.
- Image rights for Project Z are unclear; use only as reference unless permission is obtained.
```

---

## Attribute Normalization Guidelines

Use these naming conventions unless the user provides a different controlled vocabulary.

### Embodiment

Possible subcategories:

* Form
* Scale
* Mobility
* Proximity
* Sensor Placement
* Actuation
* Materiality
* Social Legibility
* Spatial Relationship
* Body Mapping

Example attribute values:

```yaml
Embodiment.Form:
  - Glasses / eyewear
  - Wearable
  - Humanoid robot
  - Animal / creature robot
  - Desktop agent
  - Mobile robot
  - Industrial robot
  - Domestic object
  - Smart appliance
  - Vehicle
  - Drone
  - Architectural / environmental system
  - Distributed object ecology

Embodiment.Mobility:
  - Fixed
  - Handheld
  - Body-worn
  - Wheeled
  - Legged
  - Flying
  - Robotic arm
  - Environmental / room-scale
```

### Intelligence

Possible subcategories:

* Model Type
* Input Modality
* Output Modality
* Autonomy Level
* Memory
* Adaptation
* Planning
* Perception
* Control Architecture
* Multi-Agent Coordination

Example attribute values:

```yaml
Intelligence.Model Type:
  - Rule-based system
  - Classical machine learning
  - Deep learning
  - Large language model
  - Vision-language model
  - Vision-language-action model
  - Speech model
  - Robotics foundation model
  - Reinforcement learning
  - Hybrid symbolic-neural system

Intelligence.Input Modality:
  - Text
  - Speech
  - Audio
  - Vision
  - Touch
  - Gesture
  - Gaze
  - Location
  - Motion
  - Force / torque
  - Environmental sensors
```

### Function

Possible subcategories:

* Role
* Task Domain
* User Relationship
* Interaction Goal
* Labor Type
* Assistance Type
* Social Function
* Creative Function
* Care Function
* Environmental Function

Example attribute values:

```yaml
Function.Role:
  - Assistant
  - Companion
  - Coach
  - Tool
  - Coworker
  - Caregiver
  - Performer
  - Teacher
  - Mediator
  - Security monitor
  - Cleaner
  - Delivery agent
  - Manufacturing worker
  - Creative collaborator
  - Memory aid
```

### Genealogy

Possible subcategories:

* Lineage
* Precedent Field
* Design Tradition
* Technical Origin
* Cultural Reference
* Product Family
* Research Community
* Interaction Paradigm

Example attribute values:

```yaml
Genealogy.Lineage:
  - Wearable computing
  - Ubiquitous computing
  - Social robotics
  - Human-robot interaction
  - Smart home
  - Internet of Things
  - Augmented reality
  - Industrial automation
  - Telepresence robotics
  - Ambient intelligence
  - Tangible user interfaces
  - Companion robotics
  - Cybernetics
  - Speculative design
```

---

## Quality Bar

A good output should:

* Stay focused on the requested card.
* Include enough examples to make the card feel rich.
* Avoid vague claims.
* Use sources.
* Produce reusable structured records.
* Separate card prose from database records.
* Avoid duplicating the same project under multiple names.
* Mark uncertainty honestly.
* Include image and layout suggestions.
* Think like a research atlas, not a blog post.

---

## Common Mistakes to Avoid

Do not:

* Write only an essay.
* Create examples without structured records.
* Mix all four categories into one unfocused card.
* Invent nonexistent projects.
* Invent technical details not present in sources.
* Treat images as free to use without rights notes.
* Use inconsistent attribute names.
* Make every attribute overly specific.
* Forget to include source records.
* Forget alt text.
* Over-tag projects with speculative categories.

---

## Final Checklist

Before finishing, verify:

* [ ] Card metadata exists.
* [ ] Card prose exists.
* [ ] Taxonomy exists.
* [ ] Design implications exist.
* [ ] Edge cases exist.
* [ ] Suggested layout exists.
* [ ] Project records exist.
* [ ] Image records exist.
* [ ] Attribute records exist.
* [ ] Source records exist.
* [ ] Uncertainties are listed.
* [ ] All IDs are lowercase kebab-case.
* [ ] Every project has at least one attribute.
* [ ] Every image has alt text.
* [ ] Every sourced claim has a source.
