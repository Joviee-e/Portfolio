import { SignJWT, jwtVerify } from 'jose';
import { getServerEnv, warnMissingEnv } from './env';

const COOKIE_NAME = 'portfolio_admin_session';
const MAX_AGE_SECONDS = 60 * 60 * 12;
let warnedJwtMissing = false;

function secretKey() {
  const secret = getServerEnv('JWT_SECRET');
  if (!secret) {
    if (!warnedJwtMissing) {
      warnedJwtMissing = true;
      warnMissingEnv('JWT_SECRET', '[Auth] JWT_SECRET is missing. Dashboard authentication is disabled.');
    }
    return null;
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminToken() {
  const key = secretKey();
  if (!key) return null;
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(key);
}

export async function verifyAdminToken(token) {
  try {
    const key = secretKey();
    if (!key) return false;
    const { payload } = await jwtVerify(token, key);
    return payload?.role === 'admin';
  } catch {
    return false;
  }
}

export function getAuthCookie(token) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${MAX_AGE_SECONDS}${secure}`;
}

export function getClearedAuthCookie() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}

export function getSessionCookieName() {
  return COOKIE_NAME;
}
