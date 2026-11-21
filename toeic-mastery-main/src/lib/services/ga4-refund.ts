/**
 * Takes back GA4 revenue for orders that were counted as a `purchase` but
 * never paid. Run from /admin/ga4.
 *
 * Until PR #52 (PURCHASE_ON_PAYMENT_SINCE) the app counted a `purchase` the
 * moment a learner reached the QR screen, and the one-time backfill counted
 * every older order whatever its status. Unpaid ones (still PENDING,
 * rejected, refunded) inflated GA4 revenue. GA4 data can't be edited, but a
 * `refund` event with the same transaction_id and value is subtracted from
 * revenue, so that's what this sends: once per order, recorded in
 * app_settings so a second click never subtracts twice.
 *
 * Which orders reached GA4 as a purchase:
 *   - created before CLICK_PURCHASE_SINCE: only those the backfill sent
 *     (all of them after a full run, else the batch list);
 *   - created between CLICK_PURCHASE_SINCE and PURCHASE_ON_PAYMENT_SINCE:
 *     all of them (the browser fired it at the QR screen; one blocked by
 *     an ad blocker never arrived, which can't be known from here).
 * Orders newer than MIN_AGE are left for later: they may still be paid.
 */
import { db } from "@/lib/db";
import { getGaTargets, mpUrl, type GaTarget } from "@/lib/services/ga-secrets";
import { BACKFILL_DONE_KEY, CLICK_PURCHASE_SINCE, previewGa4Backfill, readBatchSent } from "@/lib/services/ga4-backfill";

/** When PR #52 ("purchase only once paid") reached main. */
export const PURCHASE_ON_PAYMENT_SINCE = new Date("2026-11-21T06:21:19Z");
export const REFUND_SENT_KEY = "ga4_refund_sent";
const LOCK_KEY = "ga4_refund_lock";
const LOCK_STALE_MS = 10 * 60 * 1000;
/** A pending order younger than this may still be paid — don't refund it yet. */
const MIN_AGE_MS = 24 * 60 * 60 * 1000;

const STATUS_VI: Record<string, string> = { PENDING: "chưa chuyển tiền", FAILED: "đã từ chối", REFUNDED: "đã hoàn tiền" };

export interface RefundCandidate {
  orderId: string;
  userId: string;
  who: string;
  value: number;
  status: string;
  createdAt: string;
  /** How it reached GA4: the backfill, or the QR-screen purchase. */
  source: "backfill" | "checkout";
}

interface RefundRecord {
  orderId: string;
  value: number;
  at: string;
}

async function readRefunds(): Promise<RefundRecord[]> {
  const row = await db.appSetting.findUnique({ where: { key: REFUND_SENT_KEY } });
  if (!row) return [];
  try {
    return JSON.parse(row.value) as RefundRecord[];
  } catch {
    return [];
  }
}

/** Orders already refunded in GA4 — a later real payment for one of them is
 * sent as a fresh purchase id (see trackPaymentConfirmed), since GA4 may
 * ignore a repeat of the original transaction id. */
export async function getRefundedOrderIds(): Promise<Set<string>> {
  return new Set((await readRefunds()).map((r) => r.orderId));
}

export interface RefundPreview {
  candidates: RefundCandidate[];
  totalValue: number;
  refundedCount: number;
  refundedValue: number;
}

export async function previewGa4Refunds(): Promise<RefundPreview> {
  const cutoff = new Date(Math.min(PURCHASE_ON_PAYMENT_SINCE.getTime(), Date.now() - MIN_AGE_MS));
  const [orders, refunds, backfill, done] = await Promise.all([
    db.payment.findMany({
      where: { status: { not: "SUCCESS" }, createdAt: { lt: cutoff } },
      select: { orderId: true, userId: true, amount: true, status: true, createdAt: true, user: { select: { email: true } } },
      orderBy: { createdAt: "asc" },
    }),
    readRefunds(),
    previewGa4Backfill(),
    db.appSetting.findUnique({ where: { key: BACKFILL_DONE_KEY } }),
  ]);
  const batchSent = await readBatchSent(backfill.items);
  const refunded = new Set(refunds.map((r) => r.orderId));

  const candidates: RefundCandidate[] = [];
  for (const o of orders) {
    if (refunded.has(o.orderId) || o.amount <= 0) continue;
    const viaCheckout = o.createdAt >= CLICK_PURCHASE_SINCE;
    if (!viaCheckout && !done && !batchSent.has(o.orderId)) continue; // never reached GA4
    candidates.push({
      orderId: o.orderId,
      userId: o.userId,
      who: o.user.email,
      value: o.amount,
      status: STATUS_VI[o.status] ?? o.status,
      createdAt: o.createdAt.toISOString(),
      source: viaCheckout ? "checkout" : "backfill",
    });
  }

  return {
    candidates,
    totalValue: candidates.reduce((sum, c) => sum + c.value, 0),
    refundedCount: refunds.length,
    refundedValue: refunds.reduce((sum, r) => sum + r.value, 0),
  };
}

async function sendRefund(targets: GaTarget[], c: RefundCandidate): Promise<boolean> {
  const body = JSON.stringify({
    client_id: `server.${c.userId}`,
    user_id: c.userId,
    events: [{ name: "refund", params: { transaction_id: c.orderId, value: c.value, currency: "VND", engagement_time_msec: 1 } }],
  });
  const results = await Promise.all(
    targets.map((t) =>
      fetch(mpUrl(t), { method: "POST", body, signal: AbortSignal.timeout(6000) })
        .then((r) => r.ok)
        .catch(() => false)
    )
  );
  return results.every(Boolean);
}

async function takeLock(updatedBy: string | null): Promise<boolean> {
  const value = new Date().toISOString();
  try {
    await db.appSetting.create({ data: { key: LOCK_KEY, value, updatedBy } });
    return true;
  } catch {
    const row = await db.appSetting.findUnique({ where: { key: LOCK_KEY } });
    if (row && Date.now() - new Date(row.value).getTime() > LOCK_STALE_MS) {
      await db.appSetting.deleteMany({ where: { key: LOCK_KEY } });
      return takeLock(updatedBy);
    }
    return false;
  }
}

export async function runGa4Refunds(
  updatedBy: string | null
): Promise<{ error: string } | { sent: number; failed: number; value: number }> {
  const targets = await getGaTargets();
  if (targets.length === 0) return { error: "Chưa có khoá GA4 nào — lưu khoá ở bước 1 trước." };
  if (!(await takeLock(updatedBy))) return { error: "Đang có một lần rút khác chạy — đợi vài giây rồi tải lại trang." };

  try {
    const preview = await previewGa4Refunds();
    if (preview.candidates.length === 0) return { error: "Không còn đơn nào cần rút." };

    const records = await readRefunds();
    let sent = 0;
    let failed = 0;
    let value = 0;
    for (const c of preview.candidates) {
      if (await sendRefund(targets, c)) {
        sent++;
        value += c.value;
        records.push({ orderId: c.orderId, value: c.value, at: new Date().toISOString() });
      } else failed++;
    }
    const payload = JSON.stringify(records);
    await db.appSetting.upsert({
      where: { key: REFUND_SENT_KEY },
      create: { key: REFUND_SENT_KEY, value: payload, updatedBy },
      update: { value: payload, updatedBy },
    });
    return { sent, failed, value };
  } finally {
    await db.appSetting.deleteMany({ where: { key: LOCK_KEY } });
  }
}
