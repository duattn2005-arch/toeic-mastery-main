"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { applyListeningKeyImport, buildListeningKeyImportPlan, type KeySection } from "@/lib/data/listening-key-import";

export interface ImportResult {
  error?: string;
  updatedQuestions?: number;
  updatedPassages?: number;
  updatedAnswers?: number;
}

/** Admin entry point for applyListeningKeyImport — refuses while the
 * preview plan has any count/Part mismatch. */
export async function importListeningKeysAction(
  testId: string,
  keyTest: number,
  updateAnswers: boolean,
  section: KeySection = "listening"
): Promise<ImportResult> {
  await requireAdmin();
  if (section !== "listening" && section !== "reading") return { error: "Phần đề không hợp lệ" };
  const plan = await buildListeningKeyImportPlan(testId, keyTest, section);
  if (!plan) return { error: "Không tìm thấy đề hoặc file giải thích" };
  if (plan.errors.length > 0) return { error: plan.errors[0] };

  const result = await applyListeningKeyImport(plan, updateAnswers);
  revalidatePath("/admin/explanations");
  return result;
}
