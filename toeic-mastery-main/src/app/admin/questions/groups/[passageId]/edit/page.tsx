import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { QuestionGroupForm } from "@/components/admin/question-group-form";
import type { QuestionGroupFormInput } from "@/lib/validations/admin";
import { OPTION_LABEL_VALUES } from "@/lib/validations/admin";

export const metadata: Metadata = { title: "Sửa nhóm câu hỏi" };

export default async function EditQuestionGroupPage({ params }: { params: Promise<{ passageId: string }> }) {
  const { passageId } = await params;

  const [passage, tests] = await Promise.all([
    db.passage.findUnique({
      where: { id: passageId },
      include: {
        questions: { orderBy: { orderIndex: "asc" }, include: { options: { orderBy: { label: "asc" } } } },
        test: { select: { id: true, title: true, slug: true } },
      },
    }),
    db.test.findMany({
      // Practice pools are offered as their own explicit choice in the form.
      where: { NOT: { slug: { startsWith: "practice-pool-" } } },
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true },
      take: 100,
    }),
  ]);
  if (!passage || passage.questions.length === 0) notFound();

  // difficulty/status live per-Question, not on Passage itself, but the form
  // treats them as one shared value for the whole group (same as create) —
  // the first question's values stand in for "the group's" here.
  const first = passage.questions[0];
  const inPracticePool = passage.test?.slug.startsWith("practice-pool-") ?? false;
  // Older than the 100 most recent tests — still show its real title.
  const testOptions =
    passage.test && !inPracticePool && !tests.some((t) => t.id === passage.test?.id)
      ? [...tests, { id: passage.test.id, title: passage.test.title }]
      : tests;

  const initialValues: QuestionGroupFormInput = {
    // Empty = practice pool / unattached — the form shows that as its own choice.
    testId: inPracticePool ? "" : (passage.testId ?? ""),
    part: passage.part as QuestionGroupFormInput["part"],
    format: passage.format,
    layout: passage.layout,
    title: passage.title ?? "",
    audioUrl: passage.audioUrl ?? "",
    imageUrls: passage.imageUrls,
    transcript: passage.transcript ?? "",
    texts: (passage.texts as { label: string; content: string }[] | null) ?? [],
    difficulty: first.difficulty,
    status: first.status,
    questions: passage.questions.map((q) => ({
      prompt: q.prompt,
      correctLabel: q.correctLabel as (typeof OPTION_LABEL_VALUES)[number],
      explanationVi: q.explanationVi,
      grammarTopicSlug: q.grammarTopicSlug ?? "",
      vocabularyFocus: q.vocabularyFocus.join(", "),
      evidenceText: q.evidenceText ?? "",
      options: q.options.map((o) => ({
        label: o.label as (typeof OPTION_LABEL_VALUES)[number],
        content: o.content,
        distractorExplanation: o.distractorExplanation ?? "",
      })),
    })),
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/admin/questions" className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-3.5" /> Về danh sách câu hỏi
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Sửa nhóm câu hỏi</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Lỡ gán nhầm hoặc quên gán đề? Bấm &quot;Đổi đề / vị trí&quot; để chuyển nhóm sang đúng đề và đúng vị trí. Part thì không đổi được — tạo
          nhóm mới nếu cần.
        </p>
      </div>
      <QuestionGroupForm testOptions={testOptions} initialValues={initialValues} initialPassageId={passage.id} />
    </div>
  );
}
