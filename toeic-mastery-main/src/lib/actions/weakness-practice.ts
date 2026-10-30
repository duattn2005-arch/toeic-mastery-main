"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser, isPro } from "@/lib/auth";
import { FREE_PRACTICE_STARTS_PER_DAY } from "@/lib/constants/limits";
import { PART_META } from "@/lib/constants/toeic";
import { buildLearningInsights, type DimensionKind, type PracticeTarget } from "@/lib/services/insights/engine";
import type { Prisma } from "@/generated/prisma/client";
import { BLOOM_SELECT, bloomGate, type BloomFields, type BloomGate } from "@/lib/bloom/gate";
import type { TestPart } from "@/generated/prisma/enums";

/** Questions in one practice set (whole passage groups may push it a little over). */
const SET_SIZE = 12;
const MIX_SIZE = 20;
/** A question answered right this recently isn't served again. */
const RECENT_RIGHT_DAYS = 14;
/** Parts whose questions come in passage/conversation groups, kept whole. */
const GROUPED_PARTS: TestPart[] = ["PART3", "PART4", "PART6", "PART7"];

export type { PracticeTarget };

/** "Quay lại nền tảng" sets: easier questions only. */
const FOUNDATION_DIFFICULTY: Prisma.QuestionWhereInput = { difficulty: { in: ["EASY", "MEDIUM"] } };

function dimensionWhere(kind: DimensionKind, key: string, foundation = false): Prisma.QuestionWhereInput {
  const extra = foundation ? FOUNDATION_DIFFICULTY : {};
  if (kind === "part") return { part: key as TestPart, ...extra };
  if (kind === "grammar") return { grammarTopicSlug: key, ...extra };
  return { strategicLabelSlugs: { has: key }, ...extra };
}

type Candidate = { id: string; part: TestPart; passageId: string | null; testId: string | null; orderIndex: number };


/**
 * Picks `size` questions for one weakness: the learner's own misses on it
 * first (spaced re-testing), then questions they've never seen, never
 * anything they got right in the last two weeks. Grouped Parts (3/4/6/7)
 * are taken a whole passage/conversation at a time so nothing is shown
 * without its context.
 */
async function pickQuestions(userId: string, where: Prisma.QuestionWhereInput, size: number, allowPro: boolean, gate: BloomGate): Promise<Candidate[]> {
  const since = new Date(Date.now() - RECENT_RIGHT_DAYS * 86_400_000);
  const [history, pool] = await Promise.all([
    db.attemptAnswer.findMany({
      where: { attempt: { userId, status: "SUBMITTED" }, question: where },
      select: { questionId: true, isCorrect: true, selectedLabel: true, updatedAt: true },
      orderBy: { updatedAt: "asc" },
    }),
    db.question.findMany({
      where: {
        ...where,
        status: "PUBLISHED",
        test: { status: "PUBLISHED", ...(allowPro ? {} : { isPro: false }) },
      },
      select: BLOOM_SELECT,
      take: 600,
    }),
  ]);
  const allowed = pool.filter(gate.allow);

  const latest = new Map<string, { right: boolean; at: Date }>();
  for (const h of history) latest.set(h.questionId, { right: h.isCorrect === true && h.selectedLabel !== null, at: h.updatedAt });

  const missed: BloomFields[] = [];
  const fresh: BloomFields[] = [];
  for (const q of allowed) {
    const last = latest.get(q.id);
    if (!last) fresh.push(q);
    else if (!last.right) missed.push(q);
    else if (last.at < since) fresh.push(q);
  }
  const shuffle = <T,>(a: T[]) => a.map((v) => [Math.random(), v] as const).sort((x, y) => x[0] - y[0]).map(([, v]) => v);
  // Misses first, then new questions; inside each, the frontier level first.
  const byLevel = (list: BloomFields[]) => shuffle(list).sort((a, b) => gate.rank(a) - gate.rank(b));
  const ordered = [...byLevel(missed), ...byLevel(fresh)];

  // Whole groups for grouped Parts.
  const byPassage = new Map<string, Candidate[]>();
  // Whole groups — but only the group's questions the learner may take on.
  for (const q of allowed) if (q.passageId) byPassage.set(q.passageId, [...(byPassage.get(q.passageId) ?? []), q]);
  const picked: Candidate[] = [];
  const taken = new Set<string>();
  for (const q of ordered) {
    if (picked.length >= size) break;
    if (taken.has(q.id)) continue;
    const group = q.passageId && GROUPED_PARTS.includes(q.part) ? (byPassage.get(q.passageId) ?? [q]) : [q];
    for (const g of group) {
      if (!taken.has(g.id)) {
        taken.add(g.id);
        picked.push(g);
      }
    }
  }
  return picked;
}

/**
 * "Luyện ngay" from /analytics: builds a practice set aimed at one weakness
 * (a Part, a grammar topic, a question type), a mix of the top three, or
 * the questions whose latest answer is still wrong — and opens it in the
 * normal exam runner as a Practice attempt (instant feedback available).
 */
export async function startWeaknessPracticeAction(target: PracticeTarget) {
  const profile = await requireUser();
  const pro = isPro(profile);

  if (!pro) {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startsToday = await db.attempt.count({ where: { userId: profile.id, mode: "PRACTICE", createdAt: { gte: startOfToday } } });
    if (startsToday >= FREE_PRACTICE_STARTS_PER_DAY) redirect("/analytics?practiceLimitReached=1");
  }

  let questions: Candidate[] = [];
  if (target.kind === "mistakes") {
    const insights = await buildLearningInsights(profile.id);
    const ids = insights.openMistakes.slice(0, MIX_SIZE).map((m) => m.questionId);
    questions = await db.question.findMany({
      where: { id: { in: ids }, status: "PUBLISHED" },
      select: { id: true, part: true, passageId: true, testId: true, orderIndex: true },
    });
  } else if (target.kind === "mix") {
    const insights = await buildLearningInsights(profile.id);
    const top = insights.weaknesses.slice(0, 3);
    if (top.length === 0) redirect("/analytics?noWeakness=1");
    const each = Math.ceil(MIX_SIZE / top.length);
    const seen = new Set<string>();
    const gate = await bloomGate(profile.id);
    for (const w of top) {
      for (const q of await pickQuestions(profile.id, dimensionWhere(w.kind, w.key, target.foundation), each, pro, gate)) {
        if (!seen.has(q.id)) {
          seen.add(q.id);
          questions.push(q);
        }
      }
    }
  } else {
    const gate = await bloomGate(profile.id, typeof target.bloom === "number" && target.bloom >= 1 && target.bloom <= 5 ? target.bloom : undefined);
    questions = await pickQuestions(profile.id, dimensionWhere(target.kind, target.key, target.foundation), SET_SIZE, pro, gate);
    // Too few easy questions on this label: fall back to every difficulty
    // (still never above the label's Bloom frontier).
    if (target.foundation && questions.length < SET_SIZE / 2) questions = await pickQuestions(profile.id, dimensionWhere(target.kind, target.key), SET_SIZE, pro, gate);
  }

  if (questions.length === 0) redirect("/analytics?noQuestions=1");

  // Time budget: TOEIC pacing per question (Reading) or a generous fixed
  // allowance per Listening question, plus 20% — doubled for foundation
  // sets, where the point is understanding, not speed.
  const seconds = questions.reduce((s, q) => s + (PART_META[q.part].skill === "READING" ? PART_META[q.part].targetSeconds : 35), 0);
  const foundation = "foundation" in target && target.foundation === true;
  const allowedDurationSec = Math.max(180, Math.round(seconds * (foundation ? 2.4 : 1.2)));
  const testId = questions.find((q) => q.testId)?.testId;
  if (!testId) redirect("/analytics?noQuestions=1");

  const attempt = await db.attempt.create({
    data: {
      userId: profile.id,
      testId,
      mode: "PRACTICE",
      parts: [],
      questionIds: questions.map((q) => q.id),
      allowedDurationSec,
      remainingSec: allowedDurationSec,
    },
  });
  await db.studySession.create({
    data: { userId: profile.id, activityType: "PRACTICE", attemptId: attempt.id, metadata: { weaknessPractice: target } },
  });

  redirect(`/exam/${attempt.id}`);
}
