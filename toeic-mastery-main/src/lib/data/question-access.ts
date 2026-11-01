import "server-only";
import { db } from "@/lib/db";
import { isPro } from "@/lib/auth";
import type { Prisma } from "@/generated/prisma/client";

/** Replaces a question's explanation for Free accounts wherever it isn't
 * already covered by the daily reveal cap. Set server-side so the text itself
 * never reaches the browser. */
export const PRO_EXPLANATION_NOTE = "Lời giải chi tiết dành cho gói Pro.";

const FREE_QUESTIONS: Prisma.QuestionWhereInput = { OR: [{ testId: null }, { test: { isPro: false } }] };

/** Spread into any `where` that pulls from the question bank outside a test
 * the learner already started, so a Pro test's questions never reach a Free
 * account through Quick Study, grammar practice or a mentor test. */
export function questionAccessFilter(pro: boolean): Prisma.QuestionWhereInput {
  return pro ? {} : FREE_QUESTIONS;
}

export async function questionAccessFilterFor(userId: string): Promise<Prisma.QuestionWhereInput> {
  const profile = await db.profile.findUniqueOrThrow({ where: { id: userId }, select: { plan: true, proExpiresAt: true } });
  return questionAccessFilter(isPro(profile));
}
