"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { invalidateOutcomeCaches } from "@/lib/bloom/outcome-data";
import { LEARNING_OUTCOMES, PROGRAM_GOAL, PROGRAM_OBJECTIVES, applyOverrides, catalogErrors, parseOverrides, type CatalogOverrides, type OutcomeEdit } from "@/lib/bloom/outcomes";

export type OutcomeSaveState = { ok: boolean; message: string; errors: { code: string; errors: string[] }[] } | null;

const PATHS = ["/admin/outcomes", "/admin/outcomes/edit", "/syllabus", "/analytics"];

function refresh() {
  invalidateOutcomeCaches();
  for (const p of PATHS) revalidatePath(p);
}

/**
 * Admin → Chuẩn đầu ra → Chỉnh sửa. Lưu mục tiêu + chuẩn đầu ra; chỉ lưu phần
 * KHÁC mặc định trong code. Bản sửa phải đạt checklist (ABCD, SMART, động từ
 * đúng bậc Bloom…) — không đạt thì không lưu gì.
 */
export async function saveOutcomesAction(_prev: OutcomeSaveState, form: FormData): Promise<OutcomeSaveState> {
  const admin = await requireAdmin();
  const get = (k: string) => String(form.get(k) ?? "").trim();

  const draft: CatalogOverrides = { objectives: {}, outcomes: {} };
  const goal = get("goal");
  if (goal && goal !== PROGRAM_GOAL) draft.goal = goal;
  for (const p of PROGRAM_OBJECTIVES) {
    const v = get(`po:${p.code}`);
    if (v && v !== p.statement) draft.objectives![p.code] = v;
  }
  for (const o of LEARNING_OUTCOMES) {
    const edit: OutcomeEdit = {};
    for (const f of ["audience", "verb", "content", "degree", "timeBound"] as const) {
      const v = get(`${o.code}:${f}`);
      if (v && v !== o[f]) edit[f] = v;
    }
    const objs = form.getAll(`${o.code}:objectives`).map(String);
    if (objs.length && [...objs].sort().join() !== [...o.objectives].sort().join()) edit.objectives = objs;
    if (Object.keys(edit).length) draft.outcomes![o.code] = edit;
  }

  const clean = parseOverrides(draft);
  const errors = catalogErrors(applyOverrides(clean));
  if (errors.length) return { ok: false, message: `Chưa lưu: ${errors.length} chuẩn đầu ra không đạt checklist.`, errors };

  await db.outcomeSettings.upsert({
    where: { id: "default" },
    create: { id: "default", data: clean as object, updatedBy: admin.id },
    update: { data: clean as object, updatedBy: admin.id },
  });
  refresh();
  const n = Object.keys(clean.outcomes ?? {}).length + Object.keys(clean.objectives ?? {}).length + (clean.goal ? 1 : 0);
  return { ok: true, message: n ? `Đã lưu ${n} mục khác mặc định.` : "Đã lưu — mọi mục đang dùng nội dung mặc định.", errors: [] };
}

export async function resetOutcomesAction(): Promise<void> {
  await requireAdmin();
  await db.outcomeSettings.deleteMany({ where: { id: "default" } });
  refresh();
}
