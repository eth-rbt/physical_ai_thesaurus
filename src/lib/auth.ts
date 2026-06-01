import { createHmac, timingSafeEqual } from 'node:crypto';
import { SITE_PASSWORD, SESSION_SECRET, ADMIN_PASSWORD } from 'astro:env/server';
import type { AstroCookies } from 'astro';

// Site-wide password gate with two roles (no per-user accounts):
//  - SITE_PASSWORD  → role 'user'  : read everything, add thoughts.
//  - ADMIN_PASSWORD → role 'admin' : also edit/delete any thought (and, later,
//    the structured fields).
// The cookie never stores the password; it stores "<role>.<expiry>" plus an HMAC
// over that, so it can't be forged or its role escalated without SESSION_SECRET.

export const COOKIE_NAME = 'pai_session';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export type Role = 'user' | 'admin';

function secret(): string {
  return SESSION_SECRET || SITE_PASSWORD || 'dev-insecure-secret-change-me';
}

function hmac(value: string): string {
  return createHmac('sha256', secret()).update(value).digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** Build a signed session token: "<role>.<expiryMs>.<hmac(role.expiryMs)>". */
export function createToken(role: Role, now = Date.now()): string {
  const exp = now + MAX_AGE_SECONDS * 1000;
  const payload = `${role}.${exp}`;
  return `${payload}.${hmac(payload)}`;
}

/** Validate a token and return its role, or null if invalid/expired. */
export function readToken(token: string | undefined, now = Date.now()): Role | null {
  if (!token) return null;
  const lastDot = token.lastIndexOf('.');
  if (lastDot < 0) return null;
  const payload = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);
  if (!safeEqual(sig, hmac(payload))) return null;
  const [role, exp] = payload.split('.');
  if (role !== 'user' && role !== 'admin') return null;
  const expMs = Number(exp);
  if (!Number.isFinite(expMs) || expMs <= now) return null;
  return role;
}

/** True if the token is a valid session (any role). Used by the gate. */
export function verifyToken(token: string | undefined, now = Date.now()): boolean {
  return readToken(token, now) !== null;
}

/** Resolve the current session role from request cookies. */
export function getRole(cookies: AstroCookies): Role | null {
  return readToken(cookies.get(COOKIE_NAME)?.value);
}

/**
 * Match a submitted password to a role, in constant time. Admin is checked
 * first so a shared admin key wins even if it equals the site password.
 */
export function roleForPassword(submitted: string): Role | null {
  if (ADMIN_PASSWORD && safeEqual(submitted, ADMIN_PASSWORD)) return 'admin';
  if (SITE_PASSWORD && safeEqual(submitted, SITE_PASSWORD)) return 'user';
  return null;
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  path: '/',
  secure: import.meta.env.PROD,
  maxAge: MAX_AGE_SECONDS,
};
