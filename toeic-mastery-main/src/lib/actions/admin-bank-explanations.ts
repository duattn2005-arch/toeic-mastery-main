"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import type { TestPart } from "@/generated/prisma/enums";
import { BANK_PARTS, currentBankJob, runBankExplainer, stopBankJob } from "@/lib/services/explanations/bank-explainer";
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
