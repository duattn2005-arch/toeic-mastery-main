import "server-only";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { TEST_PARTS } from "@/lib/constants/toeic";
import { computeAttemptXp } from "@/lib/services/xp";
import { PRO_EXPLANATION_NOTE } from "@/lib/data/question-access";
import { bloomOfQuestion } from "@/lib/bloom/from-question";
import { analyzeAttempt, answerInsight, type AnsweredQuestion } from "@/lib/services/attempt-analysis";
import type { TestPart } from "@/generated/prisma/enums";

/** Free keeps the score, right/wrong and the correct answer. The explanation,
 * evidence and script are Pro: a Free account could otherwise submit a blank
 * test and read them all, with no daily cap. A script stays only where there's
 * no recording and text-to-speech needs it. */
export async function getAttemptResult(attemptId: string, userId: string, pro: boolean) {
  const attempt = await db.attempt.findUnique({
    where: { id: attemptId },
    include: { test: true },
  });
  if (!attempt || attempt.userId !== userId) notFound();

  const questions = await db.question.findMany({
    // Explicit questionIds (a "retry just these questions" attempt) takes
    // priority — see getExamData's own copy of this same scoping for why.
    // Otherwise scoped to attempt.parts (empty = the whole test) — a
    // Listening-only/Reading-only/hand-picked-Parts attempt never showed
    // the rest of the test, so reviewing it shouldn't list those as missed
    // questions either.
    where:
      attempt.questionIds.length > 0
        ? { id: { in: attempt.questionIds } }
        : { testId: attempt.testId, ...(attempt.parts.length > 0 ? { part: { in: attempt.parts } } : {}) },
    // A hand-picked set can span several tests (weakness practice): keep
    // Parts in order, then each test's own order.
    orderBy: attempt.questionIds.length > 0 ? [{ part: "asc" }, { testId: "asc" }, { orderIndex: "asc" }] : { orderIndex: "asc" },
    include: {
      options: { orderBy: { label: "asc" } },
      passage: true,
    },
  });

  const answers = await db.attemptAnswer.findMany({ where: { attemptId } });
  const answerByQuestion = new Map(answers.map((a) => [a.questionId, a]));

  const bookmarks = await db.bookmark.findMany({
    where: { userId, type: "QUESTION", questionId: { in: questions.map((q) => q.id) } },
    select: { questionId: true },
  });
  const bookmarkedQuestionIds = new Set(bookmarks.map((b) => b.questionId));

  const partBuckets = new Map<TestPart, { correct: number; skipped: number; total: number }>();
  for (const part of TEST_PARTS) partBuckets.set(part, { correct: 0, skipped: 0, total: 0 });

  const answeredQuestions: AnsweredQuestion[] = [];

  const questionReviews = questions.map((q) => {
    const answer = answerByQuestion.get(q.id) ?? null;
    const bucket = partBuckets.get(q.part)!;
    bucket.total += 1;
    if (answer?.isCorrect) bucket.correct += 1;
    if (!answer?.selectedLabel) bucket.skipped += 1;

    const answered: AnsweredQuestion = {
      part: q.part,
      selectedLabel: answer?.selectedLabel ?? null,
      correctLabel: q.correctLabel,
      isCorrect: answer?.isCorrect ?? false,
      isFlagged: answer?.isFlagged ?? false,
      initialSelectedLabel: answer?.initialSelectedLabel ?? null,
      hintUsedCount: answer?.hintUsedCount ?? 0,
      timeSpentSec: answer?.timeSpentSec ?? 0,
      trapTypeHit: answer?.trapTypeHit ?? null,
      grammarTopicSlug: q.grammarTopicSlug,
      // Level saved at submit first; older answers have none, so derive it from the question.
      bloomLevel: pro ? (answer?.bloomLevel ?? bloomOfQuestion(q).level) : null,
    };
    answeredQuestions.push(answered);

    return {
      insight: pro ? answerInsight(answered) : null,
      id: q.id,
      part: q.part,
      orderIndex: q.orderIndex,
      prompt: q.prompt,
      imageUrl: q.imageUrl,
      audioUrl: q.audioUrl,
      explanationLocked: !pro,
      transcript: pro || !q.audioUrl ? q.transcript : null,
      evidenceText: pro ? q.evidenceText : null,
      explanationVi: pro ? q.explanationVi : PRO_EXPLANATION_NOTE,
      grammarTopicSlug: q.grammarTopicSlug,
      vocabularyFocus: q.vocabularyFocus,
      correctLabel: q.correctLabel,
      selectedLabel: answer?.selectedLabel ?? null,
      isCorrect: answer?.isCorrect ?? false,
      isFlagged: answer?.isFlagged ?? false,
      isBookmarked: bookmarkedQuestionIds.has(q.id),
      options: q.options.map((o) => ({ label: o.label, content: o.content, isCorrect: o.isCorrect, distractorExplanation: pro ? o.distractorExplanation : null })),
      passage: q.passage
        ? {
            id: q.passage.id,
            title: q.passage.title,
            texts: q.passage.texts as unknown as { label: string; content: string }[],
            audioUrl: q.passage.audioUrl,
            imageUrl: q.passage.imageUrl,
            transcript: pro || !q.passage.audioUrl ? q.passage.transcript : null,
          }
        : null,
    };
  });

  const partBreakdown = TEST_PARTS.map((part) => {
    const bucket = partBuckets.get(part)!;
    return { part, correct: bucket.correct, skipped: bucket.skipped, wrong: bucket.total - bucket.correct - bucket.skipped, total: bucket.total };
  }).filter((p) => p.total > 0);

  // Pro-only like the rest of the learner analytics: a Free response never carries it.
  const analysis = pro ? analyzeAttempt(answeredQuestions) : null;
  const topicRows = analysis?.topics.length
    ? await db.grammarTopic.findMany({ where: { slug: { in: analysis.topics.map((t) => t.slug) } }, select: { slug: true, title: true } })
    : [];
  const topicTitles = new Map(topicRows.map((t) => [t.slug, t.title]));

  const timeUsedSec = attempt.allowedDurationSec - attempt.remainingSec;
  // XP earned from this specific attempt (correct answers + completion
  // bonus) — same per-unit weights as the lifetime total on the dashboard,
  // so "just now" and "all-time" always add up consistently.
  const answered = (attempt.correctCount ?? 0) + (attempt.wrongCount ?? 0);
  const xpEarned = computeAttemptXp(attempt.correctCount ?? 0, answered, answered + (attempt.skippedCount ?? 0));

  return {
    attempt,
    questionReviews,
    partBreakdown,
    analysis: analysis && { ...analysis, topics: analysis.topics.flatMap((t) => (topicTitles.has(t.slug) ? [{ ...t, title: topicTitles.get(t.slug)! }] : [])) },
    timeUsedSec,
    xpEarned,
  };
}

export type AttemptResult = Awaited<ReturnType<typeof getAttemptResult>>;
export type QuestionReview = AttemptResult["questionReviews"][number];
