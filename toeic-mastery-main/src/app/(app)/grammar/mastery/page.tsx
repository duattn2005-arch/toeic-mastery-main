import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Crown, FileText } from "lucide-react";
import { requireUser } from "@/lib/auth";
import {
  MASTERY_BASE_PATH,
  MASTERY_CHAPTERS,
  MASTERY_FOLDER_TITLE,
  countLessonQuestions,
  getMasteryLessonsByChapter,
  getMasteryStats,
} from "@/lib/content/mastery";

export const metadata: Metadata = { title: MASTERY_FOLDER_TITLE };

export default async function MasteryFolderPage() {
  await requireUser();
  const stats = getMasteryStats();

  return (
    <div className="flex flex-col gap-6">
      <Link href="/grammar" className="flex w-fit items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ChevronLeft className="size-3.5" /> Ngữ pháp
      </Link>

      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Crown className="size-6" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{MASTERY_FOLDER_TITLE}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Bộ tài liệu độc quyền luyện chuyên sâu Ngữ pháp và Từ vựng TOEIC Part 5-6: lý thuyết, mẹo làm bài, bảng tổng hợp và bài tập có đáp án, giải thích chi tiết.
            </p>
            <p className="mt-2 text-xs font-medium text-primary">
              {stats.lessonCount} bài học · {stats.questionCount} câu luyện tập
            </p>
          </div>
        </div>
      </div>

      {MASTERY_CHAPTERS.map((chapter) => {
        const lessons = getMasteryLessonsByChapter(chapter.slug);
        if (lessons.length === 0) return null;
        return (
          <section key={chapter.slug} className="flex flex-col gap-3">
            <div>
              <h2 className="text-base font-semibold">{chapter.title}</h2>
              <p className="text-xs text-muted-foreground">{chapter.description}</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.slug}
                  href={`${MASTERY_BASE_PATH}/${lesson.slug}`}
                  className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition-colors hover:border-primary/40"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <FileText className="size-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">{lesson.code}</p>
                    <p className="text-sm font-semibold">{lesson.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{lesson.summary}</p>
                    <p className="mt-1 text-[11px] font-medium text-primary">{countLessonQuestions(lesson)} câu luyện tập</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
