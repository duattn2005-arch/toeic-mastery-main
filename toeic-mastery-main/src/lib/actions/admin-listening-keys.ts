"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { applyListeningKeyImport, buildListeningKeyImportPlan } from "@/lib/data/listening-key-import";

export interface ImportResult {
  error?: string;
  updatedQuestions?: number;
  updatedPassages?: number;
  updatedAnswers?: number;
}

/** Admin entry point for applyListeningKeyImport — refuses while the
 * preview plan has any count/Part mismatch. */
export async function importListeningKeysAction(testId: string, keyTest: number, updateAnswers: boolean): Promise<ImportResult> {
  await requireAdmin();
  const plan = await buildListeningKeyImportPlan(testId, keyTest);
  if (!plan) return { error: "Không tìm thấy đề hoặc file giải thích" };
  if (plan.errors.length > 0) return { error: plan.errors[0] };

  const result = await applyListeningKeyImport(plan, updateAnswers);
  revalidatePath("/admin/explanations");
  return result;
}
