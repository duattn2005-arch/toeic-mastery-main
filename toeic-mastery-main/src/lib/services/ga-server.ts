import "server-only";
import { GA_LINKED_MEASUREMENT_ID, GA_MEASUREMENT_ID } from "@/lib/ga-config";

/** GA4 Measurement Protocol, for things only the server sees — above all a
 * confirmed payment, which arrives from the bank / gateway webhook or an admin
 * click long after (or without) the buyer's browser being open. Each property
 * needs its own API secret (GA4 → Quản trị → Luồng dữ liệu → Measurement
 * Protocol API secrets): GA4_API_SECRET for GA_MEASUREMENT_ID and
 * GA4_LINKED_API_SECRET for GA_LINKED_MEASUREMENT_ID; a property without one is
 * skipped. Never throws and never waits long: analytics must not be able to
 * break a payment confirmation. */
export async function sendGaServerEvent(userId: string, name: string, params: Record<string, string | number> = {}) {
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

/** A Pro purchase that has been confirmed on the server. Separate from the
 * browser's `purchase` event (which only fires if the buyer is still on the
 * page) so no payment goes uncounted; `channel` says how it was confirmed. */
export function trackPaymentConfirmed(payment: { userId: string; orderId: string; amount: number; planDurationDays: number }, channel: string) {
  return sendGaServerEvent(payment.userId, "payment_confirmed", {
    transaction_id: payment.orderId,
    value: payment.amount,
    currency: "VND",
    plan_days: payment.planDurationDays,
    channel,
  });
}
