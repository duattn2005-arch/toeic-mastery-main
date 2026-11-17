import { db } from "@/lib/db";
import { GA_LINKED_MEASUREMENT_ID, GA_MEASUREMENT_ID } from "@/lib/ga-config";

/**
 * Where server-side GA4 hits get their Measurement Protocol API secrets:
 * the server's .env (GA4_API_SECRET / GA4_LINKED_API_SECRET) when set,
 * otherwise what the owner saved on /admin/ga4 (app_settings) — the site's
 * owners can't SSH into the server to edit .env, and without a secret every
 * server-side event (admin-approved payments, manual Pro grants, the
 * backfill) was being silently skipped.
 *
 * Not marked "server-only" because the CLI backfill script runs under
 * plain tsx; it's only ever imported from server code.
 */

export const GA_SECRET_KEYS = { primary: "ga4_api_secret", linked: "ga4_linked_api_secret" } as const;

const CACHE_MS = 60_000;
let cache: { at: number; primary: string | null; linked: string | null } | null = null;

export function clearGaSecretCache() {
  cache = null;
}

async function storedSecrets() {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache;
  const rows = await db.appSetting.findMany({ where: { key: { in: [GA_SECRET_KEYS.primary, GA_SECRET_KEYS.linked] } } });
  const get = (key: string) => rows.find((r) => r.key === key)?.value.trim() || null;
  cache = { at: Date.now(), primary: get(GA_SECRET_KEYS.primary), linked: get(GA_SECRET_KEYS.linked) };
  return cache;
}

export interface GaTarget {
  measurementId: string;
  secret: string;
  source: "env" | "admin";
}

/** One entry per GA4 property that has a secret, .env first. */
export async function getGaTargets(): Promise<GaTarget[]> {
  const envPrimary = process.env.GA4_API_SECRET?.trim();
  const envLinked = process.env.GA4_LINKED_API_SECRET?.trim();
  const stored = envPrimary && envLinked ? null : await storedSecrets().catch(() => null);
  const targets: GaTarget[] = [];
  const primary = envPrimary || stored?.primary;
  const linked = envLinked || stored?.linked;
  if (primary) targets.push({ measurementId: GA_MEASUREMENT_ID, secret: primary, source: envPrimary ? "env" : "admin" });
  if (linked) targets.push({ measurementId: GA_LINKED_MEASUREMENT_ID, secret: linked, source: envLinked ? "env" : "admin" });
  return targets;
}

export function mpUrl(target: GaTarget) {
  return `https://www.google-analytics.com/mp/collect?measurement_id=${target.measurementId}&api_secret=${encodeURIComponent(target.secret)}`;
}
