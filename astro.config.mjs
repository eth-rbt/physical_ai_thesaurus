// @ts-check
import { defineConfig } from 'astro/config';

// Physical AI Thesaurus — static content site.
// Cards (markdown) and projects (JSON) live in src/content and are rendered
// to static pages. See src/content.config.ts for the data schemas.
export default defineConfig({
  site: 'https://example.com',
});
