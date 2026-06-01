import type { APIRoute } from 'astro';
import { COOKIE_NAME, COOKIE_OPTIONS, roleForPassword, createToken } from '../../lib/auth';

// Validate the shared password and, on success, set the signed session cookie.
function safeNext(raw: FormDataEntryValue | null): string {
  const s = typeof raw === 'string' ? raw : '';
  // Only allow same-site relative paths to avoid open-redirects.
  return s.startsWith('/') && !s.startsWith('//') ? s : '/';
}

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const password = String(form.get('password') ?? '');
  const next = safeNext(form.get('next'));

  const role = roleForPassword(password);
  if (!role) {
    return redirect(`/login?error=1&next=${encodeURIComponent(next)}`, 303);
  }

  cookies.set(COOKIE_NAME, createToken(role), COOKIE_OPTIONS);
  return redirect(next, 303);
};

// Block GETs to the endpoint — the form lives at /login.
export const GET: APIRoute = ({ redirect }) => redirect('/login', 302);
