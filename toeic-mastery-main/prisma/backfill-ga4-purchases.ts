/**
 * One-time backfill: sends a GA4 "purchase" event for every real Pro grant
 * that happened before this app started firing `purchase` at
 * checkout-click time (pro-card.tsx) / before trackPaymentConfirmed
 * existed. These are real — the money or the code redemption genuinely
 * happened — they just never reached GA4 as a `purchase`.
 *
 * Covers three sources. The first two are every one ever, not just
 * currently-active Pro (a lapsed Pro still really was a purchase); the
 * third is necessarily just a current snapshot (see below):
 *   1. Payment rows with status SUCCESS — real VND amount on file, so sent
 *      with value + currency + items.
 *   2. ActivationCode rows that were redeemed — no price is stored for
 *      these (see schema), so sent as a `purchase` with NO value/currency.
 *   3. Currently-PRO profiles that trace to neither of the above — only
 *      reachable via the admin's updateUserPlanAction Free/Pro toggle
 *      (written for support/comp/test, no money recorded), which the site
 *      owner also uses for real payments sent outside the app and wants
 *      counted too, explicitly, test accounts included (her call, her
 *      property). Also sent with no value/currency. This group can only be
 *      today's currently-PRO snapshot — a past grant through this same
 *      toggle that already expired or was reset to FREE leaves no trace at
 *      all in the database, so it cannot be found and backfilled.
 * None of groups 2/3 invents a VND figure that was never on file.
 *
 * Run this ONLY on the server, where DATABASE_URL points at the real
 * database and GA4_API_SECRET / GA4_LINKED_API_SECRET are already set in
 * .env (same two secrets ga-server.ts's sendGaServerEvent reads).
 *
 * GA4 Measurement Protocol clamps any event older than 72h to "72h ago"
 * (it does not reject it, and does not keep the real date) — so every one
 * of these will land clustered on roughly the same day in GA4, not its
 * real date. Confirmed acceptable by the site owner.
 *
 * SAFE BY DEFAULT: without --live this only prints what it would send.
 * Run it for real exactly once — running it twice double-counts every
 * one of these as two separate purchases (GA4 does not dedupe across
 * separate runs of this script).
 *
 *   npx tsx prisma/backfill-ga4-purchases.ts            # dry run, prints the list
 *   npx tsx prisma/backfill-ga4-purchases.ts --live     # actually sends to GA4
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { PRO_PLANS } from "../src/lib/constants/billing";
import { GA_MEASUREMENT_ID, GA_LINKED_MEASUREMENT_ID } from "../src/lib/ga-config";

const LIVE = process.argv.includes("--live");

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) });

function planItem(days: number) {
  const entry = Object.entries(PRO_PLANS).find(([, p]) => p.durationDays === days);
  if (!entry) return { item_id: `days_${days}`, item_name: `Pro ${days} ngày` };
  const [key, plan] = entry;
  return { item_id: key, item_name: `Pro ${plan.label}` };
}

/** `value`/`currency`/`items` omitted entirely when `amount` is null — a
 * real VND figure we don't have must never be invented. */
async function sendPurchase(userId: string, transactionId: string, days: number, amount: number | null) {
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

  for (const [measurementId, secret] of targets) {
    const res = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${encodeURIComponent(secret)}`, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) console.error(`  ! ${measurementId} replied ${res.status} for ${transactionId}`);
  }
  return targets.map(([id]) => id);
}

async function main() {
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

  console.log(
    `${payments.length} SUCCESS payments + ${codes.length} redeemed codes + ${manualGrants.length} manually-granted Pro account(s) found. ` +
      `${LIVE ? "LIVE — sending to GA4 now." : "DRY RUN — nothing sent (pass --live to actually send)."}\n`,
  );

  const missingSecrets = [!process.env.GA4_API_SECRET && "GA4_API_SECRET", !process.env.GA4_LINKED_API_SECRET && "GA4_LINKED_API_SECRET"].filter(Boolean);
  if (missingSecrets.length > 0) console.log(`Note: ${missingSecrets.join(", ")} not set — those propert${missingSecrets.length > 1 ? "ies" : "y"} will be skipped.\n`);

  let sent = 0;
  for (const p of payments) {
    console.log(`[payment] ${p.orderId} · ${p.amount.toLocaleString("vi-VN")}đ · ${planItem(p.planDurationDays).item_name} · ${p.paidAt?.toISOString().slice(0, 10) ?? "?"}`);
    if (LIVE) {
      const targets = await sendPurchase(p.userId, p.orderId, p.planDurationDays, p.amount);
      console.log(`  -> sent to ${targets.join(", ") || "(no property configured)"}`);
      sent++;
    }
  }
  for (const c of codes) {
    const txId = `code-${c.code}`;
    console.log(`[code]    ${txId} · (no price on file) · ${planItem(c.planDurationDays).item_name} · ${c.usedAt?.toISOString().slice(0, 10) ?? "?"}`);
    if (LIVE) {
      const targets = await sendPurchase(c.usedByUserId!, txId, c.planDurationDays, null);
      console.log(`  -> sent to ${targets.join(", ") || "(no property configured)"}`);
      sent++;
    }
  }

  for (const m of manualGrants) {
    const txId = `manual-${m.id}`;
    console.log(`[manual]  ${txId} · (no price on file) · ${m.email}`);
    if (LIVE) {
      const targets = await sendPurchase(m.id, txId, 30, null);
      console.log(`  -> sent to ${targets.join(", ") || "(no property configured)"}`);
      sent++;
    }
  }

  const total = payments.length + codes.length + manualGrants.length;
  console.log(`\n${LIVE ? `Sent ${sent} purchase events.` : `Would send ${total} purchase events. Re-run with --live to actually send.`}`);
  await db.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
