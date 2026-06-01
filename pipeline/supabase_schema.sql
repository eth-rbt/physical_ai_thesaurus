-- Physical AI Thesaurus — editable layer (Phase 2/3)
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
--
-- Security model: the whole site already sits behind a shared password, and
-- there are no per-user accounts. So:
--   • The browser uses the ANON key and may only SELECT (read + realtime).
--   • Every write goes through our Astro API routes using the SERVICE_ROLE key,
--     which bypasses RLS after checking the session cookie's role.
-- That means we intentionally grant SELECT to anon and grant NO insert/update/
-- delete policies (those are denied for anon by default).

-- ---- Thoughts: an append-only feed per card/project ------------------------
create table if not exists public.thoughts (
  id          uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('project', 'card')),
  entity_id   text not null,
  body        text not null check (char_length(body) between 1 and 4000),
  author      text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz
);
create index if not exists thoughts_entity_idx
  on public.thoughts (entity_type, entity_id, created_at);

-- ---- Overrides: human-edited text that wins over the git value (Phase 3) ----
create table if not exists public.overrides (
  entity_type text not null check (entity_type in ('project', 'card')),
  entity_id   text not null,
  field_key   text not null,           -- e.g. 'one_line_summary', 'short_description', 'note.lovot'
  value       text not null,
  updated_by  text,
  updated_at  timestamptz not null default now(),
  primary key (entity_type, entity_id, field_key)
);

-- ---- Row-level security: read-only for anon, writes via service role --------
alter table public.thoughts  enable row level security;
alter table public.overrides enable row level security;

drop policy if exists "anon read thoughts"  on public.thoughts;
drop policy if exists "anon read overrides" on public.overrides;
create policy "anon read thoughts"  on public.thoughts  for select to anon, authenticated using (true);
create policy "anon read overrides" on public.overrides for select to anon, authenticated using (true);

-- ---- Realtime: broadcast thought inserts/updates/deletes to subscribers -----
alter publication supabase_realtime add table public.thoughts;
