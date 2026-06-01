import { defineMiddleware } from 'astro:middleware';
import { COOKIE_NAME, verifyToken } from './lib/auth';

// Paths that must stay reachable without a session (the login flow itself) and
// static assets (bundles, images, fonts) so the login page can style itself.
const PUBLIC_PATHS = new Set(['/login', '/api/login', '/api/logout']);
const ASSET_RE = /\.(css|js|mjs|map|png|jpe?g|svg|webp|gif|ico|woff2?|ttf|json|txt|xml)$/i;

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  if (pathname.startsWith('/_astro/') || pathname.startsWith('/_image')) return true;
  if (ASSET_RE.test(pathname)) return true;
  return false;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (isPublic(pathname)) return next();

  const token = context.cookies.get(COOKIE_NAME)?.value;
  if (verifyToken(token)) return next();

  // Not authenticated → send to login, remembering where they were headed.
  const next_ = encodeURIComponent(pathname + context.url.search);
  return context.redirect(`/login?next=${next_}`, 302);
});
