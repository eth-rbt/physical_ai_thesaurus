import type { APIRoute } from 'astro';
import { getRole } from '../../../lib/auth';
import { getServiceClient } from '../../../lib/supabase.server';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });

// Editing or deleting an existing thought is admin-only.
function requireAdmin(cookies: Parameters<APIRoute>[0]['cookies']) {
  return getRole(cookies) === 'admin';
}

// PATCH /api/thoughts/:id — edit a thought's body (admin only).
export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  if (!requireAdmin(cookies)) return json({ error: 'admin only' }, 403);
  const db = getServiceClient();
  if (!db) return json({ error: 'supabase not configured' }, 503);

  let payload: { body?: string };
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'invalid json' }, 400);
  }
  const body = (payload.body ?? '').trim();
  if (body.length < 1 || body.length > 4000) return json({ error: 'body length' }, 400);

  const { data, error } = await db
    .from('thoughts')
    .update({ body, updated_at: new Date().toISOString() })
    .eq('id', params.id)
    .select()
    .single();

  if (error) return json({ error: error.message }, 500);
  return json({ thought: data });
};

// DELETE /api/thoughts/:id — remove a thought (admin only).
export const DELETE: APIRoute = async ({ params, cookies }) => {
  if (!requireAdmin(cookies)) return json({ error: 'admin only' }, 403);
  const db = getServiceClient();
  if (!db) return json({ error: 'supabase not configured' }, 503);

  const { error } = await db.from('thoughts').delete().eq('id', params.id);
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true });
};
