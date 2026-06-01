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

    // Categorical tags keyed by "category.subcategory" → normalized values.
    // Powers grid grouping and cross-thesaurus filtering.
    attributes: z.record(z.string(), z.array(z.string())).default({}),

    // Scalar/ordinal values keyed by dimension name. Powers 1D/2D plots.
    metrics: z.record(z.string(), z.number()).default({}),

    images: z.array(imageRecord).default([]),
    sources: z.array(sourceRecord).default([]),
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
    display: display.default({ mode: 'grid' }),
  }),
});

export const collections = { cards, projects };
