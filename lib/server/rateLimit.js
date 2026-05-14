const bucket = new Map();

export function isRateLimited(key, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const current = bucket.get(key) || { count: 0, start: now };

  if (now - current.start > windowMs) {
    bucket.set(key, { count: 1, start: now });
    return false;
  }

  current.count += 1;
  bucket.set(key, current);
  return current.count > limit;
}
