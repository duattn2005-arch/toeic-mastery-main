import "server-only";
import { GA_LINKED_MEASUREMENT_ID, GA_MEASUREMENT_ID } from "@/lib/ga-config";

type GaParamValue = string | number | Array<Record<string, string | number>>;

/** GA4 Measurement Protocol, for things only the server sees — above all a
 * confirmed payment, which arrives from the bank / gateway webhook or an admin
 * click long after (or without) the buyer's browser being open. Each property
 * needs its own API secret (GA4 → Quản trị → Luồng dữ liệu → Measurement
 * Protocol API secrets): GA4_API_SECRET for GA_MEASUREMENT_ID and
 * GA4_LINKED_API_SECRET for GA_LINKED_MEASUREMENT_ID; a property without one is
 * skipped. Never throws and never waits long: analytics must not be able to
 * break a payment confirmation.
 *
 * Note for callers: GA4 Measurement Protocol silently clamps any event
 * older than 72h to "72h ago" instead of rejecting it (and still returns
 * 2xx) — so this must only ever be called right when something happens,
 * never to backfill history. There is no way to get an old event to land
 * on its real date. */
export async function sendGaServerEvent(userId: string, name: string, params: Record<string, GaParamValue> = {}) {
  const targets = [
    [GA_MEASUREMENT_ID, process.env.GA4_API_SECRET],
    [GA_LINKED_MEASUREMENT_ID, process.env.GA4_LINKED_API_SECRET],
  ].filter((t): t is [string, string] => !!t[1]);
  const body = JSON.stringify({
    // No browser here, so no _ga client id: a stable per-account one keeps
    // these hits together; user_id ties them to the same person as web visits.
    client_id: `server.${userId}`,
    user_id: userId,
    events: [{ name, params: { ...params, engagement_time_msec: 1 } }],
  });
  await Promise.all(
    targets.map(async ([measurementId, secret]) => {
      try {
        await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${encodeURIComponent(secret)}`, {
          method: "POST",
          body,
          signal: AbortSignal.timeout(4000),
        });
      } catch {
        // Swallow: a failed analytics ping is not worth surfacing.
      }
    }),
  );
}

/** A Pro purchase that has been confirmed on the server — a bank-transfer
 * approved by an admin, or a gateway webhook, long after (or without) the
 * buyer's browser being open. A custom event, not GA4's own `purchase`:
 * every order this fires for was already counted as a `purchase` the
 * moment the learner reached the QR screen (pro-card.tsx's handleUpgrade —
 * a deliberate business choice, not firing late on the GA4-recommended
 * default, see the comment there), so firing `purchase` again here would
 * double-count the same order. `channel` says how it was confirmed, for
 * slicing by sepay / vnpay / admin_approval without touching the
 * `purchase` numbers. */
export function trackPaymentConfirmed(payment: { userId: string; orderId: string; amount: number; planDurationDays: number }, channel: string) {
  return sendGaServerEvent(payment.userId, "payment_confirmed", {
    transaction_id: payment.orderId,
    value: payment.amount,
    currency: "VND",
    plan_days: payment.planDurationDays,
    channel,
  });
}

/** A Pro grant from /admin/users' direct Free↔Pro toggle
 * (updateUserPlanAction). That code is written for support/comp/test
 * accounts — no money moves through it — but the site owner also uses it
 * for real payments sent outside the app's own bank-transfer flow, and
 * wants every use of it counted as a purchase regardless (her call, made
 * explicitly, on her own property). No value/currency: unlike a bank
 * transfer or VNPay order, this path never records a price, so there is
 * no real VND figure to report — inventing one would be fabricating
 * revenue, which this never does. */
export function trackManualProGrant(userId: string) {
  return sendGaServerEvent(userId, "purchase", { transaction_id: `manual-${userId}-${Date.now()}` });
}
