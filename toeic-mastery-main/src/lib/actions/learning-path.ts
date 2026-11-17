"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { generateLearningPath } from "@/lib/services/mentor/learning-path-generator";

export interface StartLearningPathResult {
  error?: string;
}

/**
 * "Bắt đầu" on the dashboard's journey preview: creates the learner's
 * LearningPath directly, without going through AI Mentor's onboarding chat
 * (which needs a placement test first when there's no score baseline yet —
 * a step this preview doesn't need: generateLearningPath works from
 * SkillMastery, and with no data at all it just rotates evenly through the
 * 7 Parts, re-planning itself as practice data comes in).
 *
 * `targetScore` is only passed when the learner picks one right here (no
 * target on their profile yet) — and is then saved to the profile too.
 * A learner who already has an ACTIVE path is left alone, so a double
 * click can never replace a path they've started on.
 */
export async function startLearningPathAction(targetScore?: number): Promise<StartLearningPathResult> {
  const profile = await requireUser();
  const target = targetScore ?? profile.targetScore;
  if (target == null || !Number.isInteger(target) || target < 10 || target > 990) {
    return { error: "Chọn mục tiêu điểm trước nhé" };
  }

  const existing = await db.learningPath.findFirst({ where: { userId: profile.id, status: "ACTIVE" }, select: { id: true } });
  if (!existing) {
    if (target !== profile.targetScore) await db.profile.update({ where: { id: profile.id }, data: { targetScore: target } });
    await generateLearningPath({ userId: profile.id, targetScore: target, examDate: profile.examDate });
  }

  revalidatePath("/dashboard");
  revalidatePath("/mentor/path");
  return {};
}
