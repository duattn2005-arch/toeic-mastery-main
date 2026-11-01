import "server-only";

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Best-effort, single-instance in-memory limiter. Good enough for a single
// Node.js server; swap for Upstash/Redis when running multiple instances.
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
}, 60_000).unref?.();

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    const bucket = { count: 1, resetAt: now + windowMs };
    buckets.set(key, bucket);
    return { ok: true, remaining: limit - 1, resetAt: bucket.resetAt };
  }

  existing.count += 1;
  const ok = existing.count <= limit;
  return { ok, remaining: Math.max(0, limit - existing.count), resetAt: existing.resetAt };
}

/** The last X-Forwarded-For entry: Nginx appends the address it actually saw
 * (README §12), while anything before it is whatever the client chose to send,
 * so keying on the first entry would let a client dodge every limit. */
export function clientKeyFromHeaders(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",").pop()?.trim() || "unknown";
}

export function clientKeyFromRequest(request: Request): string {
  return clientKeyFromHeaders(request.headers);
}
