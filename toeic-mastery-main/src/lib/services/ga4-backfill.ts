/**
 * One-time GA4 `purchase` backfill, run from /admin/ga4 (or the CLI script
 * prisma/backfill-ga4-purchases.ts on the server). Counts what the site
 * owner counts as a purchase, from before the app started firing
 * `purchase` the moment checkout is reached (pro-card.tsx, since
 * CLICK_PURCHASE_SINCE):
 *
 *   1. Every bank-transfer/VNPay order created before then, whatever its
 *      status — under the owner's rule a purchase is counted when the
 *      learner reaches the QR screen, not when it's confirmed. Real amount.
 *   2. Every redeemed activation code, and
 *   3. every currently-PRO account with no order and no code (granted by
 *      hand on /admin/users for money paid outside the app) — no price is stored
 *      for these; the owner says they're all the 1-month plan, so they're
 *      valued at its list price.
 *
 * GA4 Measurement Protocol clamps anything older than 72h to "72h ago", so
 * these all land around one day, not their real dates — accepted by the
 * owner. Runs live exactly once: a done-marker in app_settings refuses a
 * second live run, since GA4 doesn't dedupe across runs.
 *
 * Deliberately not marked "server-only": the CLI script runs under tsx.
 */
import { db } from "@/lib/db";
import { PRO_PLANS, PRO_TRIAL_CODE_PREFIX } from "@/lib/constants/billing";
import { getGaTargets, mpUrl, type GaTarget } from "@/lib/services/ga-secrets";

/** When PR #35 ("tính purchase ngay khi vào trang thanh toán") reached main:
 * an order created from here on already fired its own `purchase` at
 * checkout, so it's left out to avoid counting it twice. */
export const CLICK_PURCHASE_SINCE = new Date("2026-11-17T05:20:00Z");
export const BACKFILL_DONE_KEY = "ga4_backfill_done_at";

const ONE_MONTH = { item_id: "ONE_MONTH", item_name: `Pro ${PRO_PLANS.ONE_MONTH.label}`, price: PRO_PLANS.ONE_MONTH.amountVnd };

function planItem(days: number) {
  const entry = Object.entries(PRO_PLANS).find(([, p]) => p.durationDays === days);
  if (!entry) return { item_id: `days_${days}`, item_name: `Pro ${days} ngày` };
  const [key, plan] = entry;
  return { item_id: key, item_name: `Pro ${plan.label}` };
}

export interface BackfillItem {
  kind: "order" | "code" | "manual";
  transactionId: string;
  userId: string;
  who: string;
  value: number;
  itemName: string;
  /** What the row is in the app, for the preview (status / code length). */
  detail: string;
  date: string | null;
}

export interface BackfillPreview {
  items: BackfillItem[];
  total: number;
  totalValue: number;
  targets: { measurementId: string; source: GaTarget["source"] }[];
  doneAt: string | null;
}

const STATUS_VI: Record<string, string> = { PENDING: "chờ duyệt", SUCCESS: "đã duyệt", FAILED: "đã từ chối", REFUNDED: "đã hoàn tiền" };

export async function previewGa4Backfill(): Promise<BackfillPreview> {
  const [orders, codes, proProfiles, done, targets, buyers, trials] = await Promise.all([
    db.payment.findMany({
      where: { createdAt: { lt: CLICK_PURCHASE_SINCE } },
      select: { userId: true, orderId: true, amount: true, planDurationDays: true, status: true, createdAt: true, user: { select: { email: true } } },
      orderBy: { createdAt: "asc" },
    }),
    db.activationCode.findMany({
      // Free trials (TRIAL-<userId>) aren't purchases.
      where: { usedByUserId: { not: null }, NOT: { code: { startsWith: PRO_TRIAL_CODE_PREFIX } } },
      select: { usedByUserId: true, code: true, planDurationDays: true, usedAt: true },
      orderBy: { usedAt: "asc" },
    }),
    db.profile.findMany({ where: { plan: "PRO" }, select: { id: true, email: true } }),
    db.appSetting.findUnique({ where: { key: BACKFILL_DONE_KEY } }),
    getGaTargets(),
    // Anyone with an order of any status or date: their order is (or
    // already was, at checkout) their purchase, so a manual Pro grant on
    // top — often how a pending transfer gets honoured — isn't another one.
    db.payment.findMany({ select: { userId: true }, distinct: ["userId"] }),
    // PRO only because of the free trial — not "bật Pro tay" for money.
    db.activationCode.findMany({
      where: { code: { startsWith: PRO_TRIAL_CODE_PREFIX }, usedByUserId: { not: null } },
      select: { usedByUserId: true },
    }),
  ]);
  const trialUsers = new Set(trials.map((t) => t.usedByUserId!));

  const codeUsers = new Set(codes.map((c) => c.usedByUserId!));
  const orderUsers = new Set(buyers.map((b) => b.userId));
  const emailById = new Map(proProfiles.map((p) => [p.id, p.email]));
  const codeEmails = await db.profile.findMany({ where: { id: { in: [...codeUsers] } }, select: { id: true, email: true } });
  for (const p of codeEmails) emailById.set(p.id, p.email);

  const items: BackfillItem[] = [
    ...orders.map((o) => ({
      kind: "order" as const,
      transactionId: o.orderId,
      userId: o.userId,
      who: o.user.email,
      value: o.amount,
      itemName: planItem(o.planDurationDays).item_name,
      detail: STATUS_VI[o.status] ?? o.status,
      date: o.createdAt.toISOString(),
    })),
    ...codes.map((c) => ({
      kind: "code" as const,
      transactionId: `code-${c.code}`,
      userId: c.usedByUserId!,
      who: emailById.get(c.usedByUserId!) ?? c.usedByUserId!,
      value: ONE_MONTH.price,
      itemName: ONE_MONTH.item_name,
      detail: `mã ${c.code} (${planItem(c.planDurationDays).item_name})`,
      date: c.usedAt?.toISOString() ?? null,
    })),
    ...proProfiles
      .filter((p) => !orderUsers.has(p.id) && !codeUsers.has(p.id) && !trialUsers.has(p.id))
      .map((p) => ({
        kind: "manual" as const,
        transactionId: `manual-${p.id}`,
        userId: p.id,
        who: p.email,
        value: ONE_MONTH.price,
        itemName: ONE_MONTH.item_name,
        detail: "bật Pro tay",
        date: null,
      })),
  ];

  return {
    items,
    total: items.length,
    totalValue: items.reduce((sum, i) => sum + i.value, 0),
    targets: targets.map((t) => ({ measurementId: t.measurementId, source: t.source })),
    doneAt: done?.value ?? null,
  };
}

async function send(targets: GaTarget[], item: BackfillItem, timestampMicros?: number): Promise<boolean> {
  const body = JSON.stringify({
    client_id: `server.${item.userId}`,
    ...(timestampMicros ? { timestamp_micros: timestampMicros } : {}),
    user_id: item.userId,
    events: [
      {
        name: "purchase",
        params: {
          transaction_id: item.transactionId,
          value: item.value,
          currency: "VND",
          items: [{ item_id: item.itemName, item_name: item.itemName, price: item.value, quantity: 1 }],
          engagement_time_msec: 1,
        },
      },
    ],
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

export type BackfillRunResult = { sent: number; failed: number; totalValue: number } | { error: string };

/** Sends everything previewGa4Backfill lists, once. */
export async function runGa4Backfill(updatedBy: string | null): Promise<BackfillRunResult> {
  const preview = await previewGa4Backfill();
  if (preview.doneAt) return { error: `Đã gửi bù lúc ${new Date(preview.doneAt).toLocaleString("vi-VN")} — không gửi lại để tránh tính trùng.` };
  const targets = await getGaTargets();
  if (targets.length === 0) return { error: "Chưa có khoá GA4 nào — lưu khoá ở trên trước." };

  // Claim the run first, so a double click can't send everything twice.
  try {
    await db.appSetting.create({ data: { key: BACKFILL_DONE_KEY, value: new Date().toISOString(), updatedBy } });
  } catch {
    return { error: "Đang có một lần gửi bù khác chạy hoặc vừa chạy xong." };
  }

  let sent = 0;
  let failed = 0;
  for (const item of preview.items) {
    if (await send(targets, item)) sent++;
    else failed++;
  }
  return { sent, failed, totalValue: preview.totalValue };
}

export const SAMPLE_COUNT = 5;

/** Re-sends the first few backfill items as a trial, ignoring the done
 * marker and leaving it alone. If the original run already landed in GA4
 * these may count twice (a handful of orders), which is the price of
 * proving the real payload gets through. */
export async function runGa4BackfillSample(): Promise<{ error: string } | { sent: number; failed: number; items: { who: string; value: number; transactionId: string }[] }> {
  const targets = await getGaTargets();
  if (targets.length === 0) return { error: "Chưa có khoá GA4 nào — lưu khoá ở trên trước." };
  const preview = await previewGa4Backfill();
  const sample = preview.items.slice(0, SAMPLE_COUNT);
  let sent = 0;
  let failed = 0;
  for (const item of sample) {
    if (await send(targets, item)) sent++;
    else failed++;
  }
  return { sent, failed, items: sample.map((i) => ({ who: i.who, value: i.value, transactionId: i.transactionId })) };
}

/** Batch mode: send the backfill a few at a time, over several days, so GA4
 * doesn't show one giant spike. Which orders already went out is kept as a
 * JSON list of transaction ids in app_settings. First use is seeded with the
 * SAMPLE_COUNT orders the trial button already sent, so they aren't sent a
 * third time. */
export const BATCH_SENT_KEY = "ga4_backfill_batch_sent";

export async function readBatchSent(items: BackfillItem[]): Promise<Set<string>> {
  const row = await db.appSetting.findUnique({ where: { key: BATCH_SENT_KEY } });
  if (!row) return new Set(items.slice(0, SAMPLE_COUNT).map((i) => i.transactionId));
  try {
    const ids = JSON.parse(row.value) as string[];
    return new Set(ids);
  } catch {
    return new Set();
  }
}

export interface BatchProgress {
  sent: number;
  remaining: number;
  remainingValue: number;
}

export async function getGa4BatchProgress(preview: BackfillPreview): Promise<BatchProgress> {
  const sent = await readBatchSent(preview.items);
  const pending = preview.items.filter((i) => !sent.has(i.transactionId));
  return { sent: preview.total - pending.length, remaining: pending.length, remainingValue: pending.reduce((sum, i) => sum + i.value, 0) };
}

export async function runGa4BackfillBatch(
  count: number,
  updatedBy: string | null,
  spreadDays = 0
): Promise<{ error: string } | { sent: number; failed: number; value: number; remaining: number }> {
  const n = Math.max(1, Math.min(87, Math.floor(count) || 0));
  const targets = await getGaTargets();
  if (targets.length === 0) return { error: "Chưa có khoá GA4 nào — lưu khoá ở trên trước." };
  const preview = await previewGa4Backfill();
  const done = await readBatchSent(preview.items);
  const pending = preview.items.filter((i) => !done.has(i.transactionId));
  if (pending.length === 0) return { error: "Đã gửi hết rồi — không còn đơn nào để gửi." };

  let sent = 0;
  let failed = 0;
  let value = 0;
  // GA4 accepts event times at most 72h back; stay under with a margin.
  const days = Math.max(0, Math.min(3, Math.floor(spreadDays) || 0));
  const windowMs = days === 0 ? 0 : Math.min(days * 24, 70) * 3600_000;
  for (const item of pending.slice(0, n)) {
    const ts = windowMs ? (Date.now() - Math.random() * windowMs) * 1000 : undefined;
    if (await send(targets, item, ts ? Math.floor(ts) : undefined)) {
      sent++;
      value += item.value;
      done.add(item.transactionId);
    } else failed++;
  }
  const payload = JSON.stringify([...done]);
  await db.appSetting.upsert({
    where: { key: BATCH_SENT_KEY },
    create: { key: BATCH_SENT_KEY, value: payload, updatedBy },
    update: { value: payload, updatedBy },
  });
  return { sent, failed, value, remaining: pending.length - sent };
}
