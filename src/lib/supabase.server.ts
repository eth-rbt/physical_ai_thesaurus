import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_SERVICE_ROLE_KEY } from 'astro:env/server';

// Server-side Supabase client using the service-role key. This bypasses RLS, so
// it must ONLY be used from API routes that have already authorized the request
// via the session cookie. Never import this into client code.
let client: SupabaseClient | null = null;

export function getServiceClient(): SupabaseClient | null {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  if (!url || !SUPABASE_SERVICE_ROLE_KEY) return null; // not configured yet
  if (!client) {
    client = createClient(url, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

export type EntityType = 'project' | 'card';
export function isEntityType(v: unknown): v is EntityType {
  return v === 'project' || v === 'card';
}
