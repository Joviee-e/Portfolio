import fs from 'fs';
import path from 'path';

let loadedLocalEnv = false;
let warned = new Set();

function loadLocalEnv() {
  if (loadedLocalEnv || typeof process === 'undefined') return;
  loadedLocalEnv = true;

  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return;

  try {
    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;

      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (key && !process.env[key]) process.env[key] = value;
    }
  } catch {
    if (!warned.has('.env.local')) {
      warned.add('.env.local');
      console.warn('[Env] Could not read .env.local. Server environment variables will be used.');
    }
  }
}

export function getServerEnv(name) {
  loadLocalEnv();
  return process.env[name];
}

export function warnMissingEnv(name, message) {
  if (warned.has(name)) return;
  warned.add(name);
  console.warn(message || `[Env] ${name} is missing.`);
}

