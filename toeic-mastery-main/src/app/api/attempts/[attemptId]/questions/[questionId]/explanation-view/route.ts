import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthedProfileOrNull } from "@/lib/auth";
import { recordExplanationView } from "@/lib/bloom/answer-log";

/**
 * Người học mở phần giải thích của một câu ở trang kết quả — tín hiệu phụ
 * của bậc 2 (Hiểu) trong src/lib/bloom; không ảnh hưởng độ chính xác.
 */
export async function POST(_request: Request, { params }: { params: Promise<{ attemptId: string; questionId: string }> }) {
  const profile = await getAuthedProfileOrNull();
  if (!profile) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { attemptId, questionId } = await params;
  const attempt = await db.attempt.findUnique({ where: { id: attemptId }, select: { userId: true, status: true } });
  if (!attempt || attempt.userId !== profile.id) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (attempt.status !== "SUBMITTED") return NextResponse.json({ ok: false });

  const row = await db.attemptAnswer.findUnique({ where: { attemptId_questionId: { attemptId, questionId } }, select: { id: true } });
  if (!row) return NextResponse.json({ ok: false });
  await recordExplanationView(attemptId, questionId, null, false);
  return NextResponse.json({ ok: true });
}
