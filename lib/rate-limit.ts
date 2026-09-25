// Basic in-memory sliding-window rate limit, keyed by IP. This is
// intentionally simple — it resets on every server restart/cold start
// and doesn't share state across multiple instances, so it won't hold
// up under serverless autoscaling or a multi-region deploy. It's
// enough to blunt naive bot spam on a single always-on server; if you
// deploy to Vercel/serverless at scale, replace this with a shared
// store (e.g. Upstash Redis rate limiting) — the call site in
// app/api/quote/route.ts only needs `checkRateLimit` to keep working.

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): { allowed: boolean } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const existing = (hits.get(key) ?? []).filter((timestamp) => timestamp > windowStart);
  if (existing.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(key, existing);
    return { allowed: false };
  }

  existing.push(now);
  hits.set(key, existing);
  return { allowed: true };
}
