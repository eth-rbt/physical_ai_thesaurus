import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * The Physical AI Thesaurus data model.
 *
 *  - `projects` are the shared, reusable atoms. Each lives in one JSON file and
 *    owns everything about itself: categorical `attributes` (for grids/grouping),
 *    scalar `metrics` (for 1D/2D plots), `images`, and `sources`.
 *  - `cards` are views. A card is prose plus a list of `project_ids` it features
 *    and a `display` block describing how those projects are arranged on the page.
 *
 * The same project can be referenced by many cards; clicking it anywhere leads to
 * its single canonical /projects/<id> page.
 */

// --- shared enums (mirror readme.md controlled vocabularies) ---
const projectType = z.enum([
  'commercial_product',
  'research_prototype',
  'academic_paper',
  'art_design_project',
  'industrial_system',
  'platform',
  'dataset',
  'concept',
  'unknown',
]);

const imageType = z.enum([
  'product_photo',
  'research_figure',
  'system_diagram',
  'interaction_photo',
  'screenshot',
  'render',
  'exhibition_photo',
  'video_still',
  'unknown',
]);

const rightsStatus = z.enum([
  'official_press_image',
  'academic_fair_use_candidate',
  'user_generated',
  'needs_permission',
  'public_domain',
  'creative_commons',
  'unknown',
]);

const sourceType = z.enum([
  'official_product_page',
  'official_blog_post',
  'press_release',
  'academic_paper',
  'project_page',
  'lab_page',
  'conference_page',
  'exhibition_page',
  'credible_news',
  'video_demo',
  'documentation',
  'unknown',
]);

const confidence = z.enum(['high', 'medium', 'low']);

// Does the system actually have AI/ML running inside it? Many interaction-design
// prototypes are pure sensing/actuation or tangible-interaction techniques with NO
// AI at all (e.g. inFORM is a motorized pin display, not an AI system).
//  - none:       no AI/ML; a mechanical, sensing, actuation, or tangible technique.
//  - some:       AI/ML powers a component (e.g. a gesture classifier, vision tracking).
//  - core:       AI is central to what the system is/does.
//  - envisioned: AI is part of the concept/vision but not implemented (concepts, speculative).
//  - unknown:    not yet determined.
const aiEmbedded = z.enum(['none', 'some', 'core', 'envisioned', 'unknown']);

// How grounded an interaction is. Enforces the "verified, not invented" contract:
//  - documented: an actual supported feature/use — must cite a source.
//  - observed:   a real emergent/creative use people actually do (hack, art, community) — must cite.
//  - proposed:   a plausible idea grounded in the project's REAL capabilities, not yet observed.
const interactionProvenance = z.enum(['documented', 'observed', 'proposed']);

const interactionRecord = z.object({
  title: z.string(),
  description: z.string(),
  provenance: interactionProvenance.default('proposed'),
  // Required in spirit for documented/observed (a real, fetchable URL); optional analog for proposed.
  source_url: z.string().url().optional(),
  source_label: z.string().optional(),
});

const imageRecord = z.object({
  image_id: z.string(),
  caption: z.string(),
  image_type: imageType.default('unknown'),
  source_url: z.string().url(),
  rights_status: rightsStatus.default('unknown'),
  alt_text: z.string(),
  // Optional local file in /public for images we are licensed to host.
  // When absent, the UI shows a styled placeholder tile.
  local_image: z.string().optional(),
});

const sourceRecord = z.object({
  source_id: z.string(),
  title: z.string(),
  source_type: sourceType.default('unknown'),
  url: z.string().url(),
  publisher: z.string().optional(),
  year: z.number().int().nullable().optional(),
  access_notes: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    year: z.number().int().nullable().default(null),
    organization: z.array(z.string()).default([]),
    project_type: projectType.default('unknown'),
    short_description: z.string(),
    long_description: z.string().optional(),
    primary_url: z.string().url().optional(),

    // Whether real AI/ML runs in the system, rendered as an obvious badge on the
    // project page and grid tile. `ai_note` is a one-line rationale.
    ai_embedded: aiEmbedded.default('unknown'),
    ai_note: z.string().optional(),

    // Categorical tags keyed by "category.subcategory" → normalized values.
    // Powers grid grouping and cross-thesaurus filtering.
    attributes: z.record(z.string(), z.array(z.string())).default({}),

    // Scalar/ordinal values keyed by dimension name. Powers 1D/2D plots.
    metrics: z.record(z.string(), z.number()).default({}),

    images: z.array(imageRecord).default([]),
    sources: z.array(sourceRecord).default([]),

    // Interesting interactions this project affords — documented features, real emergent
    // uses, and grounded proposed ideas. Authored by the `project-interactions` skill.
    interactions: z.array(interactionRecord).default([]),

    confidence: confidence.default('medium'),
  }),
});

// One axis of a plot: which project metric to read, plus presentation.
const axis = z.object({
  metric: z.string(),
  label: z.string(),
  direction: z.enum(['asc', 'desc']).default('asc'),
});

// How a card arranges its referenced projects on the right-hand panel.
const display = z.discriminatedUnion('mode', [
  z.object({
    mode: z.literal('grid'),
        // Optional categorical attribute key to cluster the grid by, e.g. "embodiment.form".
    groupBy: z.string().optional(),
  }),
  z.object({
    mode: z.literal('axis-1d'),
    axis,
  }),
  z.object({
    mode: z.literal('scatter-2d'),
    x: axis,
    y: axis,
  }),
]);

const cards = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cards' }),
  schema: z.object({
    category: z.enum(['Embodiment', 'Intelligence', 'Function', 'Genealogy']),
    subcategory: z.string(),
    title: z.string(),
    card_question: z.string(),
    one_line_summary: z.string(),
    status: z.enum(['draft', 'review', 'published']).default('draft'),
    project_ids: z.array(reference('projects')).default([]),
    // Optional card-specific one-liner per project id → why this project belongs
    // on THIS card (the same project is framed differently on different cards).
    project_notes: z.record(z.string(), z.string()).default({}),
    // Optional "takeaways" module for the left column: graphically summarizes the
    // spread of the chosen projects across one categorical attribute (e.g. the set
    // of forms on the Form card, or sensing methods on the Context card).
    summary: z
      .object({
        label: z.string(),
        // Attribute key to aggregate, e.g. "embodiment.form" or "intelligence.input".
        attribute: z.string(),
        // Optional caption shown under the chart.
        caption: z.string().optional(),
      })
      .optional(),
    display: display.default({ mode: 'grid' }),
  }),
});

// `trends` are time-sensitive views onto the corpus: short market/use-case briefs
// that link out to the atoms they're evidenced by. Unlike cards (evergreen taxonomy)
// they carry an `updated` date so the UI can show how fresh each one is, and they
// can be refreshed periodically (e.g. via the deep-research skill).
const trends = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/trends' }),
  schema: z.object({
    title: z.string(),
    // use_case = emerging-use-case / whitespace framing; brief = market-intel framing.
    kind: z.enum(['use_case', 'brief']).default('use_case'),
    // Where the bulk of this domain sits today.
    horizon: z.enum(['now', 'next', 'emerging']).default('now'),
    status: z.enum(['draft', 'review', 'published']).default('draft'),
    summary: z.string(),
    // Drives the "updated <month> <year>" freshness badge.
    updated: z.coerce.date(),
    // Atoms this trend is evidenced by — rendered as a project grid on the detail page.
    related_project_ids: z.array(reference('projects')).default([]),

    // --- the three required structured sections (authored by the `trend-brief` skill) ---
    // 1. Growth: data points for a small time-series plot. Mark forecast points
    //    `projected: true` so the chart can dash them. Anchor values to a cited source.
    growth: z.object({
      label: z.string(),
      unit: z.string().default(''),
      caption: z.string().optional(),
      points: z
        .array(
          z.object({
            year: z.number().int(),
            value: z.number(),
            projected: z.boolean().default(false),
          }),
        )
        .min(2),
    }),
    // 2. Audience: who buys/uses this, plus a few concrete user personas.
    audience: z.object({
      customers: z.array(z.string()).min(1),
      personas: z
        .array(z.object({ name: z.string(), description: z.string() }))
        .min(1),
    }),
    // 3. Key use cases: the concrete things this trend enables.
    use_cases: z
      .array(z.object({ title: z.string(), description: z.string().optional() }))
      .min(3),

    // Same shape as project sources, so citations look and behave consistently.
    sources: z.array(sourceRecord).default([]),
    confidence: confidence.default('medium'),
  }),
});

export const collections = { cards, projects, trends };
