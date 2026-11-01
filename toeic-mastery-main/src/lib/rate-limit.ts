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

/** Proxies between the visitor and Nginx. Production sits behind one CDN/WAF
 * (README §12); set to 0 if Nginx ever faces visitors directly. */
function trustedProxyHops(): number {
  const hops = Number(process.env.TRUSTED_PROXY_HOPS ?? 1);
  return Number.isInteger(hops) && hops >= 0 ? hops : 1;
}

/** Counts back from the end of X-Forwarded-For, past each trusted proxy: Nginx
 * appends the address it saw (here the CDN's, shared by many visitors), and
 * entries further left than the visitor are whatever the client chose to send.
 * So neither end of the list is safe to key limits on. */
export function clientKeyFromHeaders(headers: Headers): string {
  const hops = headers.get("x-forwarded-for")?.split(",").map((entry) => entry.trim()).filter(Boolean) ?? [];
  return hops[Math.max(0, hops.length - 1 - trustedProxyHops())] || "unknown";
}

export function clientKeyFromRequest(request: Request): string {
  return clientKeyFromHeaders(request.headers);
}
