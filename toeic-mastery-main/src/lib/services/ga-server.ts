import "server-only";
import { GA_LINKED_MEASUREMENT_ID, GA_MEASUREMENT_ID } from "@/lib/ga-config";
import { PRO_PLANS } from "@/lib/constants/billing";

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

/** The sold plan (if any) matching a grant's day count — e.g. "3 tháng" for
 * 90 days — for the item-scoped params GA4's standard e-commerce reports
 * expect. Falls back to a generic item for a day count that isn't one of
 * PRO_PLANS (shouldn't happen here: only real, priced payments reach
 * trackPaymentConfirmed — the admin's free comp/test override never does). */
function planItem(days: number): { item_id: string; item_name: string; quantity: number } {
  const entry = Object.entries(PRO_PLANS).find(([, p]) => p.durationDays === days);
  if (!entry) return { item_id: `days_${days}`, item_name: `Pro ${days} ngày`, quantity: 1 };
  const [key, plan] = entry;
  return { item_id: key, item_name: `Pro ${plan.label}`, quantity: 1 };
}

/** A Pro purchase that has been confirmed on the server — a bank-transfer
 * approved by an admin, or a gateway webhook, long after (or without) the
 * buyer's browser being open. Fires two GA4 events for every one of these:
 *
 * - `payment_confirmed`: a custom event carrying `channel`, for slicing
 *   confirmations by how they arrived (sepay / vnpay / admin_approval).
 * - `purchase`: GA4's own e-commerce event — this is what the Monetization
 *   reports, the Purchases/Revenue cards, and most Ads conversion imports
 *   actually read, so a manually-approved transfer counts as a real
 *   purchase exactly like the browser's own `purchase` event fires for one
 *   auto-confirmed while the buyer is still watching the QR screen (see
 *   pro-card.tsx). Only ever called for a real, priced payment — never for
 *   admin's comp/test override (updateUserPlanAction) or an activation-code
 *   redemption of unknown monetary value (billing.ts's pro_code_redeemed),
 *   so "purchase" revenue in GA4 never includes a free grant. */
export function trackPaymentConfirmed(payment: { userId: string; orderId: string; amount: number; planDurationDays: number }, channel: string) {
  const item = planItem(payment.planDurationDays);
  return Promise.all([
    sendGaServerEvent(payment.userId, "payment_confirmed", {
      transaction_id: payment.orderId,
      value: payment.amount,
      currency: "VND",
      plan_days: payment.planDurationDays,
      channel,
    }),
    sendGaServerEvent(payment.userId, "purchase", {
      transaction_id: payment.orderId,
      value: payment.amount,
      currency: "VND",
      items: [{ ...item, price: payment.amount }],
    }),
  ]);
}
