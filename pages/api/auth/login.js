import { signAdminToken, getAuthCookie } from '../../../lib/server/auth';
import { isRateLimited } from '../../../lib/server/rateLimit';
import { getServerEnv, warnMissingEnv } from '../../../lib/server/env';
let warnedAdminPasswordMissing = false;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  
  // Rate limiting: 6 attempts per 10 minutes
  if (isRateLimited(`login:${ip}`, 6, 10 * 60 * 1000)) {
    return res.status(429).json({ 
      error: 'Too many login attempts. Please try again in a few minutes.' 
    });
  }

  const { password } = req.body || {};
  
  // Input validation
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  const adminPassword = getServerEnv('ADMIN_PASSWORD');

  if (!adminPassword) {
    if (!warnedAdminPasswordMissing) {
      warnedAdminPasswordMissing = true;
      warnMissingEnv('ADMIN_PASSWORD', '[Auth] ADMIN_PASSWORD is missing. Dashboard login is disabled.');
    }
    return res.status(503).json({ error: 'Missing ADMIN_PASSWORD in .env.local' });
  }

  // Verify password
  if (password !== adminPassword) {
    return res.status(401).json({ error: 'Invalid passphrase' });
  }

  try {
    const token = await signAdminToken();
    if (!token) {
      return res.status(503).json({ error: 'Missing JWT_SECRET in .env.local' });
    }
    res.setHeader('Set-Cookie', getAuthCookie(token));
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Authentication error:', err);
    return res.status(500).json({ error: 'Authentication failed' });
  }
}
