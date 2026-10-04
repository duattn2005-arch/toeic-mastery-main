"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { applyListeningKeyImport, buildListeningKeyImportPlan, KEY_SECTIONS, type KeySection } from "@/lib/data/listening-key-import";

export interface ImportResult {
  error?: string;
  updatedQuestions?: number;
  updatedPassages?: number;
  updatedAnswers?: number;
  movedParts?: number;
  reordered?: number;
  createdQuestions?: number;
}

/** Admin entry point for applyListeningKeyImport — refuses while the
 * preview plan has any count/Part mismatch. `fixStructure` ("Sửa toàn bộ
 * theo file") also fixes answers, moves misfiled questions to their Part
 * and renumbers the test into the file's question order. */
export async function importListeningKeysAction(
  testId: string,
  keyTest: number,
  updateAnswers: boolean,
  section: KeySection = "listening",
  fixStructure = false
): Promise<ImportResult> {
  await requireAdmin();
  if (!KEY_SECTIONS.includes(section)) return { error: "Phần đề không hợp lệ" };
  const plan = await buildListeningKeyImportPlan(testId, keyTest, section);
  if (!plan) return { error: "Không tìm thấy đề hoặc file giải thích" };
  if (plan.errors.length > 0) return { error: plan.errors[0] };

  const result = await applyListeningKeyImport(plan, { updateAnswers: updateAnswers || fixStructure, fixStructure });
  revalidatePath(`/admin/tests/${testId}`);
  revalidatePath("/admin/explanations");
  return result;
}
