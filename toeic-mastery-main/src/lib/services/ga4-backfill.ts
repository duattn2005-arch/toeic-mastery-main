/**
 * Shared by the CLI script (prisma/backfill-ga4-purchases.ts) and the
 * admin-only route (/api/admin/ga4-backfill) — same one-time backfill,
 * two ways to run it depending on whether whoever needs to run it has a
 * terminal on the server or only a logged-in browser tab. See either
 * caller's own doc comment for the full "why" (what's included, what
 * isn't, and the GA4 72h backdating limit).
 *
 * Deliberately not marked "server-only": the CLI script runs under plain
 * tsx/node, which throws immediately on importing that marker (it only
 * works inside Next's own server runtime). Safe either way — nothing here
 * is exported from anywhere a client bundle could reach.
 */
import { db } from "@/lib/db";
import { PRO_PLANS } from "@/lib/constants/billing";
import { GA_MEASUREMENT_ID, GA_LINKED_MEASUREMENT_ID } from "@/lib/ga-config";

export function planItem(days: number) {
  const entry = Object.entries(PRO_PLANS).find(([, p]) => p.durationDays === days);
  if (!entry) return { item_id: `days_${days}`, item_name: `Pro ${days} ngày` };
  const [key, plan] = entry;
  return { item_id: key, item_name: `Pro ${plan.label}` };
}

/** `value`/`currency`/`items` omitted entirely when `amount` is null — a
 * real VND figure we don't have must never be invented. Returns which
 * configured GA4 properties it reached. */
async function sendPurchase(userId: string, transactionId: string, days: number, amount: number | null): Promise<string[]> {
  const params: Record<string, unknown> = { transaction_id: transactionId, engagement_time_msec: 1 };
  if (amount != null) {
    params.value = amount;
    params.currency = "VND";
    params.items = [{ ...planItem(days), price: amount, quantity: 1 }];
  }
  const body = JSON.stringify({ client_id: `server.${userId}`, user_id: userId, events: [{ name: "purchase", params }] });

  const targets = [
    [GA_MEASUREMENT_ID, process.env.GA4_API_SECRET],
    [GA_LINKED_MEASUREMENT_ID, process.env.GA4_LINKED_API_SECRET],
  ].filter((t): t is [string, string] => !!t[1]);

  const reached: string[] = [];
  for (const [measurementId, secret] of targets) {
    const res = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${encodeURIComponent(secret)}`, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) reached.push(measurementId);
  }
  return reached;
}

export interface BackfillResult {
  lines: string[];
  live: boolean;
  totalCount: number;
  sentCount: number;
}

/** Runs the whole backfill once. `live: false` only builds the preview
 * lines, sending nothing — the caller decides whether that's enough or
 * whether to call again with `live: true`. */
export async function runGa4PurchaseBackfill(live: boolean): Promise<BackfillResult> {
  const lines: string[] = [];
  const [payments, codes, proProfiles] = await Promise.all([
    db.payment.findMany({
      where: { status: "SUCCESS" },
      select: { userId: true, orderId: true, amount: true, planDurationDays: true, paidAt: true },
      orderBy: { paidAt: "asc" },
    }),
    db.activationCode.findMany({
      where: { usedByUserId: { not: null } },
      select: { usedByUserId: true, code: true, planDurationDays: true, usedAt: true },
      orderBy: { usedAt: "asc" },
    }),
    db.profile.findMany({ where: { plan: "PRO" }, select: { id: true, email: true } }),
  ]);

  const tracedUserIds = new Set([...payments.map((p) => p.userId), ...codes.map((c) => c.usedByUserId!)]);
  const manualGrants = proProfiles.filter((p) => !tracedUserIds.has(p.id));
  const totalCount = payments.length + codes.length + manualGrants.length;

  lines.push(
    `${payments.length} SUCCESS payments + ${codes.length} redeemed codes + ${manualGrants.length} manually-granted Pro account(s) found.`,
    live ? "LIVE — sending to GA4 now." : "DRY RUN — nothing sent (pass --live to actually send).",
    "",
  );

  const missingSecrets = [!process.env.GA4_API_SECRET && "GA4_API_SECRET", !process.env.GA4_LINKED_API_SECRET && "GA4_LINKED_API_SECRET"].filter(Boolean);
  if (missingSecrets.length > 0) lines.push(`Note: ${missingSecrets.join(", ")} not set — those propert${missingSecrets.length > 1 ? "ies" : "y"} will be skipped.`, "");

  let sentCount = 0;
  for (const p of payments) {
    lines.push(`[payment] ${p.orderId} · ${p.amount.toLocaleString("vi-VN")}đ · ${planItem(p.planDurationDays).item_name} · ${p.paidAt?.toISOString().slice(0, 10) ?? "?"}`);
    if (live) {
      const reached = await sendPurchase(p.userId, p.orderId, p.planDurationDays, p.amount);
      lines.push(`  -> sent to ${reached.join(", ") || "(no property configured)"}`);
      sentCount++;
    }
  }
  for (const c of codes) {
    const txId = `code-${c.code}`;
    lines.push(`[code]    ${txId} · (no price on file) · ${planItem(c.planDurationDays).item_name} · ${c.usedAt?.toISOString().slice(0, 10) ?? "?"}`);
    if (live) {
      const reached = await sendPurchase(c.usedByUserId!, txId, c.planDurationDays, null);
      lines.push(`  -> sent to ${reached.join(", ") || "(no property configured)"}`);
      sentCount++;
    }
  }
  for (const m of manualGrants) {
    const txId = `manual-${m.id}`;
    lines.push(`[manual]  ${txId} · (no price on file) · ${m.email}`);
    if (live) {
      const reached = await sendPurchase(m.id, txId, 30, null);
      lines.push(`  -> sent to ${reached.join(", ") || "(no property configured)"}`);
      sentCount++;
    }
  }

  lines.push("", live ? `Sent ${sentCount} purchase events.` : `Would send ${totalCount} purchase events. Re-run with --live to actually send.`);
  return { lines, live, totalCount, sentCount };
}
