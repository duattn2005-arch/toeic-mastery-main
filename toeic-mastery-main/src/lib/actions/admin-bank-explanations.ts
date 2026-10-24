"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import type { TestPart } from "@/generated/prisma/enums";
import { BANK_PARTS, currentBankJob, importBankExplanations, runBankExplainer, stopBankJob, type ImportedExplanation } from "@/lib/services/explanations/bank-explainer";
import type { SeoActionResult } from "@/lib/actions/admin-seo";

export async function startBankExplainerAction(input: { parts: string[]; overwrite: boolean; limit: number }): Promise<SeoActionResult> {
  const admin = await requireAdmin();
  const parts = BANK_PARTS.filter((p) => input.parts.includes(p)) as TestPart[];
  if (parts.length === 0) return { error: "Chọn ít nhất một Part" };
  if (currentBankJob()?.running) return { error: "Đang có một lượt chạy — đợi xong hoặc bấm Dừng" };
  const limit = Math.max(0, Math.min(5000, Math.round(Number(input.limit) || 0)));
  // Runs in the server process; the page polls for progress.
  void runBankExplainer({ parts, overwrite: Boolean(input.overwrite), limit, adminId: admin.id }).catch((err) => console.error("[bank-explainer]", err));
  revalidatePath("/admin/explanations/bank");
  return { message: "Đã bắt đầu — trang tự cập nhật tiến độ." };
}

export async function stopBankExplainerAction(): Promise<SeoActionResult> {
  await requireAdmin();
  stopBankJob();
  revalidatePath("/admin/explanations/bank");
  return { message: "Sẽ dừng sau nhóm câu đang làm." };
}

export async function importBankExplanationsAction(json: string, overwrite: boolean): Promise<SeoActionResult> {
  await requireAdmin();
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { error: "File không phải JSON hợp lệ" };
  }
  const items = Array.isArray(parsed) ? parsed : Array.isArray((parsed as { items?: unknown })?.items) ? (parsed as { items: unknown[] }).items : null;
  if (!items) return { error: "File cần là một mảng giải thích" };
  const result = await importBankExplanations(items as ImportedExplanation[], overwrite);
  revalidatePath("/admin/explanations/bank");
  const skipped = result.skipped.length ? ` Bỏ qua ${result.skipped.length}: ${result.skipped.slice(0, 5).join("; ")}${result.skipped.length > 5 ? "…" : ""}` : "";
  return { message: `Đã ghi ${result.written} giải thích, ${result.transcripts} transcript.${skipped}` };
}
