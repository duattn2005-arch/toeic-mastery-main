import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthedProfileOrNull } from "@/lib/auth";
import { rateLimit, clientKeyFromRequest } from "@/lib/rate-limit";
import { buildHint, HINT_STEPS } from "@/lib/bloom/hints";
import { bloomInputOf } from "@/lib/bloom/from-question";
import { recordHintUse } from "@/lib/bloom/answer-log";

/**
 * Gợi ý từng bước cho một câu khi đang LUYỆN TẬP (không có ở chế độ thi,
 * không có sau khi nộp). Mỗi bước mở thêm được ghi vào hintUsedCount — câu
 * đúng nhờ gợi ý chỉ được tính một phần điểm năng lực (src/lib/bloom).
 */
export async function GET(request: Request, { params }: { params: Promise<{ attemptId: string; questionId: string }> }) {
  const profile = await getAuthedProfileOrNull();
  if (!profile) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const limit = rateLimit(`hint:${profile.id}:${clientKeyFromRequest(request)}`, 40, 60_000);
  if (!limit.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const { attemptId, questionId } = await params;
  const step = Math.min(HINT_STEPS, Math.max(1, Number(new URL(request.url).searchParams.get("step")) || 1));

  const attempt = await db.attempt.findUnique({ where: { id: attemptId }, select: { userId: true, mode: true, status: true, testId: true, parts: true, questionIds: true } });
  if (!attempt || attempt.userId !== profile.id) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (attempt.mode !== "PRACTICE" || attempt.status !== "IN_PROGRESS") {
    return NextResponse.json({ error: "Gợi ý chỉ có khi đang luyện tập" }, { status: 403 });
  }
  if (attempt.questionIds.length > 0 && !attempt.questionIds.includes(questionId)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const question = await db.question.findFirst({
    where: {
      id: questionId,
      ...(attempt.questionIds.length === 0 ? { testId: attempt.testId, ...(attempt.parts.length > 0 ? { part: { in: attempt.parts } } : {}) } : {}),
    },
    select: {
      part: true,
      prompt: true,
      correctLabel: true,
      difficulty: true,
      grammarTopicSlug: true,
      strategicLabelSlugs: true,
      transcript: true,
      evidenceText: true,
      bloomLevel: true,
      grammarTopic: { select: { title: true } },
      options: { select: { label: true, content: true }, orderBy: { label: "asc" } },
      passage: { select: { layout: true, transcript: true, texts: true } },
    },
  });
  if (!question) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const labels = question.strategicLabelSlugs.length
    ? await db.strategicLabel.findMany({ where: { slug: { in: question.strategicLabelSlugs } }, select: { slug: true, title: true } })
    : [];
  const text = buildHint(
    {
      ...bloomInputOf(question),
      evidenceText: question.evidenceText,
      bloomLevel: question.bloomLevel,
      grammarTopicTitle: question.grammarTopic?.title ?? null,
      strategyTitles: Object.fromEntries(labels.map((l) => [l.slug, l.title])),
    },
    step
  );
  await recordHintUse(attemptId, questionId, step);

  return NextResponse.json({ step, total: HINT_STEPS, text });
}
