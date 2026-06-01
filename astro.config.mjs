// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';

// Physical AI Thesaurus.
// Cards (markdown) and projects (JSON) live in src/content (see
// src/content.config.ts for the schemas). The site now runs server-side (SSR)
// on Vercel so a password gate (src/middleware.ts) can protect every page and
// so editable fields/thoughts can be merged in from Supabase at request time.
export default defineConfig({
  site: 'https://example.com',
  output: 'server',
  adapter: vercel(),
  // Typed env: loaded from .env in dev and from real env vars on Vercel.
  // Both are server-only secrets and never shipped to the client bundle.
  env: {
    schema: {
      // Phase 1 — password gate
      SITE_PASSWORD: envField.string({ context: 'server', access: 'secret', optional: true }),
      ADMIN_PASSWORD: envField.string({ context: 'server', access: 'secret', optional: true }),
      SESSION_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
      // Phase 2 — Supabase. Service-role key is server-only (never sent to client).
      SUPABASE_SERVICE_ROLE_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
