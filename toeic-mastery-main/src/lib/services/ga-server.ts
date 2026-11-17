import "server-only";
import { getGaTargets, mpUrl } from "@/lib/services/ga-secrets";
import { PRO_PLANS } from "@/lib/constants/billing";

type GaParamValue = string | number | Array<Record<string, string | number>>;

/** GA4 Measurement Protocol, for things only the server sees — above all a
 * confirmed payment, which arrives from the bank / gateway webhook or an admin
 * click long after (or without) the buyer's browser being open. Each property
 * needs its own API secret (GA4 → Quản trị → Luồng dữ liệu → Measurement
 * Protocol API secrets) — from .env or /admin/ga4, see ga-secrets.ts; a
 * property without one is skipped. Never throws and never waits long: analytics must not be able to
 * break a payment confirmation.
 *
 * Note for callers: GA4 Measurement Protocol silently clamps any event
 * older than 72h to "72h ago" instead of rejecting it (and still returns
 * 2xx) — so this must only ever be called right when something happens,
 * never to backfill history. There is no way to get an old event to land
 * on its real date. */
export async function sendGaServerEvent(userId: string, name: string, params: Record<string, GaParamValue> = {}) {
  const targets = await getGaTargets().catch(() => []);
  const body = JSON.stringify({
    // No browser here, so no _ga client id: a stable per-account one keeps
    // these hits together; user_id ties them to the same person as web visits.
    client_id: `server.${userId}`,
    user_id: userId,
    events: [{ name, params: { ...params, engagement_time_msec: 1 } }],
  });
  await Promise.all(
    targets.map(async (target) => {
      try {
        await fetch(mpUrl(target), { method: "POST", body, signal: AbortSignal.timeout(4000) });
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
 * accounts, but the site owner uses it for real payments sent outside the
 * app and wants every use counted as a purchase (her call, on her own
 * property) — always the flat 30-day grant, so valued at the 1-month plan
 * price, per the owner. */
export function trackManualProGrant(userId: string) {
  const plan = PRO_PLANS.ONE_MONTH;
  return sendGaServerEvent(userId, "purchase", {
    transaction_id: `manual-${userId}-${Date.now()}`,
    value: plan.amountVnd,
    currency: "VND",
    items: [{ item_id: "ONE_MONTH", item_name: `Pro ${plan.label}`, price: plan.amountVnd, quantity: 1 }],
  });
}
