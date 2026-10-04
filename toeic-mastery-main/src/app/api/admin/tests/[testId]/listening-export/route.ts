import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthedProfileOrNull } from "@/lib/auth";

/** Admin-only JSON dump of one test's Listening questions exactly as
 * stored (exam order, prompt, options, correctLabel, passage, current
 * explanation) — for checking the ETS 2026 explanation import against the
 * real data. */
export async function GET(_request: Request, { params }: { params: Promise<{ testId: string }> }) {
  const profile = await getAuthedProfileOrNull();
  if (!profile || profile.role !== "ADMIN") return NextResponse.json({ error: "Chỉ quản trị viên" }, { status: 403 });
  const { testId } = await params;

  const test = await db.test.findUnique({ where: { id: testId }, select: { id: true, title: true } });
  if (!test) return NextResponse.json({ error: "Không tìm thấy đề" }, { status: 404 });

  const questions = await db.question.findMany({
    where: { testId, part: { in: ["PART1", "PART2", "PART3", "PART4"] } },
    orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }, { id: "asc" }],
    select: {
      id: true,
      part: true,
      orderIndex: true,
      passageId: true,
      prompt: true,
      correctLabel: true,
      audioUrl: true,
      explanationVi: true,
      createdAt: true,
      options: { orderBy: { label: "asc" }, select: { label: true, content: true, isCorrect: true } },
    },
  });

  const body = {
    test,
    exportedAt: new Date().toISOString(),
    questions: questions.map((q, i) => ({
      webNumber: i + 1,
      ...q,
      explanationVi: q.explanationVi.slice(0, 120),
    })),
  };
  return new NextResponse(JSON.stringify(body, null, 1), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="${test.title.replace(/[^\w\- ]+/g, "").trim() || "test"}-listening.json"`,
    },
  });
}
