"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSuperAdmin } from "@/lib/auth";
import { GA_SECRET_KEYS, clearGaSecretCache } from "@/lib/services/ga-secrets";
import { sendGaTestEvent, sendGaTestPurchase, type GaTestResult } from "@/lib/services/ga4-test";
import { BACKFILL_DONE_KEY, runGa4Backfill, type BackfillRunResult } from "@/lib/services/ga4-backfill";

/** Saves the GA4 Measurement Protocol API secrets from /admin/ga4. A blank
 * field leaves that secret as it was, so re-saving one doesn't wipe the
 * other. Owner-only. */
export async function saveGaSecretsAction(input: { primary: string; linked: string }): Promise<{ error?: string; saved?: number }> {
  const admin = await requireSuperAdmin();
  const entries = [
    [GA_SECRET_KEYS.primary, input.primary],
    [GA_SECRET_KEYS.linked, input.linked],
  ]
    .map(([key, value]) => [key, String(value ?? "").trim()] as const)
    .filter(([, value]) => value);
  if (entries.length === 0) return { error: "Dán ít nhất một khoá" };
  if (entries.some(([, value]) => !/^[A-Za-z0-9_-]{8,100}$/.test(value))) {
    return { error: "Khoá không đúng dạng — copy đúng phần “Giá trị bí mật” trong GA4" };
  }

  await Promise.all(
    entries.map(([key, value]) =>
      db.appSetting.upsert({ where: { key }, create: { key, value, updatedBy: admin.id }, update: { value, updatedBy: admin.id } })
    )
  );
  clearGaSecretCache();
  revalidatePath("/admin/ga4");
  return { saved: entries.length };
}

/** Clears the "already sent" marker so the backfill can run again. Only for
 * when GA4 provably received nothing (wrong secret) — otherwise a re-run
 * double counts revenue. Owner-only. */
export async function allowGa4ResendAction(): Promise<{ error?: string; ok?: true }> {
  await requireSuperAdmin();
  await db.appSetting.deleteMany({ where: { key: BACKFILL_DONE_KEY } });
  revalidatePath("/admin/ga4");
  return { ok: true };
}

export async function sendGaTestEventAction(): Promise<GaTestResult[]> {
  await requireSuperAdmin();
  return sendGaTestEvent();
}

export async function sendGaTestPurchaseAction(): Promise<GaTestResult[]> {
  await requireSuperAdmin();
  return sendGaTestPurchase();
}

export async function runGa4BackfillAction(): Promise<BackfillRunResult> {
  const admin = await requireSuperAdmin();
  const result = await runGa4Backfill(admin.id);
  revalidatePath("/admin/ga4");
  return result;
}
