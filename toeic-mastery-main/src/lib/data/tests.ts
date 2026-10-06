import "server-only";
import { db } from "@/lib/db";
import { Prisma, type TestPart } from "@/generated/prisma/client";

export interface TestListFilters {
  category?: "ALL" | "FULL" | "LISTENING" | "READING" | TestPart;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  completion?: "ALL" | "COMPLETED" | "NOT_COMPLETED";
  sort?: "NEWEST" | "RATING";
}

export async function getTestList(userId: string, filters: TestListFilters) {
  const where: Prisma.TestWhereInput = { status: "PUBLISHED" };

  switch (filters.category) {
    case "FULL":
      where.isFullTest = true;
      break;
    case "LISTENING":
      where.isFullTest = false;
      where.listeningQuestions = { gt: 0 };
      break;
    case "READING":
      where.isFullTest = false;
      where.readingQuestions = { gt: 0 };
      break;
    case undefined:
    case "ALL":
      break;
    default:
      where.isFullTest = false;
      where.sections = { some: { part: filters.category } };
  }

  if (filters.difficulty) where.difficulty = filters.difficulty;

  const tests = await db.test.findMany({
    where,
    orderBy: filters.sort === "RATING" ? { attempts: { _count: "desc" } } : { createdAt: "desc" },
    include: {
      _count: { select: { attempts: true } },
      attempts: {
        where: { userId },
        orderBy: { updatedAt: "desc" },
        take: 1,
        select: { id: true, status: true, currentQuestionIndex: true, totalScore: true },
      },
    },
  });

  const bestScores = await db.attempt.groupBy({
    by: ["testId"],
    where: { userId, status: "SUBMITTED", testId: { in: tests.map((t) => t.id) } },
    _max: { totalScore: true },
  });
  const bestScoreByTest = new Map(bestScores.map((b) => [b.testId, b._max.totalScore]));
  const practicedByTest = await getQuestionsPracticedByTest(tests.map((t) => t.id));

  const mapped = tests.map((t) => {
    const latestAttempt = t.attempts[0] ?? null;
    const isCompleted = latestAttempt?.status === "SUBMITTED";
    const isInProgress = latestAttempt?.status === "IN_PROGRESS";
    return {
      id: t.id,
      title: t.title,
      difficulty: t.difficulty,
      totalQuestions: t.totalQuestions,
      durationMinutes: t.durationMinutes,
      isFullTest: t.isFullTest,
      isPro: t.isPro,
      usersCompleted: t._count.attempts,
      questionsPracticed: practicedByTest.get(t.id) ?? 0,
      bestScore: bestScoreByTest.get(t.id) ?? null,
      isCompleted,
      isInProgress,
      progressPercent: isInProgress && latestAttempt ? Math.round((latestAttempt.currentQuestionIndex / t.totalQuestions) * 100) : null,
      resumeAttemptId: isInProgress ? latestAttempt!.id : null,
    };
  });

  if (filters.completion === "COMPLETED") return mapped.filter((t) => t.isCompleted);
  if (filters.completion === "NOT_COMPLETED") return mapped.filter((t) => !t.isCompleted);
  return mapped;
}

export type TestListItem = Awaited<ReturnType<typeof getTestList>>[number];

/** Real number of answered questions (all learners, every attempt status)
 * per test — a bigger, still truthful engagement figure than attempts. */
async function getQuestionsPracticedByTest(testIds: string[]): Promise<Map<string, number>> {
  if (testIds.length === 0) return new Map();
  const rows = await db.$queryRaw<{ testId: string; count: bigint }[]>`
    SELECT a.test_id::text AS "testId", COUNT(*) AS count
    FROM attempt_answers aa
    JOIN attempts a ON a.id = aa.attempt_id
    WHERE aa.selected_label IS NOT NULL
      AND a.test_id::text IN (${Prisma.join(testIds)})
    GROUP BY a.test_id
  `;
  return new Map(rows.map((r) => [r.testId, Number(r.count)]));
}

/** Site-wide real totals for the "lượt luyện tập" headline on /practice. */
export async function getPracticeTotals() {
  const [attempts, answered] = await Promise.all([
    db.attempt.count(),
    db.$queryRaw<{ count: bigint }[]>`SELECT COUNT(*) AS count FROM attempt_answers WHERE selected_label IS NOT NULL`,
  ]);
  return { attempts, questionsPracticed: Number(answered[0]?.count ?? 0) };
}

/**
 * Picks one test for "Làm bài test thử" (take a trial test) to jump
 * straight into, skipping the practice list entirely — the most-attempted
 * published full test, preferring a free (non-Pro) one so a brand-new
 * account never gets bounced into a paywall on their very first click.
 */
export async function getTrialFullTestId(): Promise<string | null> {
  const free = await db.test.findFirst({
    where: { status: "PUBLISHED", isFullTest: true, isPro: false },
    orderBy: { attempts: { _count: "desc" } },
    select: { id: true },
  });
  if (free) return free.id;

  const any = await db.test.findFirst({
    where: { status: "PUBLISHED", isFullTest: true },
    orderBy: { attempts: { _count: "desc" } },
    select: { id: true },
  });
  return any?.id ?? null;
}
