import type { APIRoute } from 'astro';
import { getRole } from '../../../lib/auth';
import { getServiceClient, isEntityType } from '../../../lib/supabase.server';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });

// POST /api/thoughts — add a thought. Any valid session (user or admin) may add.
export const POST: APIRoute = async ({ request, cookies }) => {
  if (!getRole(cookies)) return json({ error: 'unauthorized' }, 401);

  const db = getServiceClient();
  if (!db) return json({ error: 'supabase not configured' }, 503);

  let payload: { entity_type?: string; entity_id?: string; body?: string; author?: string };
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'invalid json' }, 400);
  }

  const { entity_type, entity_id } = payload;
  const body = (payload.body ?? '').trim();
  const author = (payload.author ?? '').trim().slice(0, 80) || null;

  if (!isEntityType(entity_type) || !entity_id) return json({ error: 'bad entity' }, 400);
  if (body.length < 1 || body.length > 4000) return json({ error: 'body length' }, 400);

  const { data, error } = await db
    .from('thoughts')
    .insert({ entity_type, entity_id, body, author })
    .select()
    .single();

  if (error) return json({ error: error.message }, 500);
  return json({ thought: data }, 201);
};
