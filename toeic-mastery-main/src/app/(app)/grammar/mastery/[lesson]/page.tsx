import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, Crown } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { MASTERY_BASE_PATH, MASTERY_FOLDER_TITLE, getMasteryLesson } from "@/lib/content/mastery";
import { MasteryBlocks } from "@/components/mastery/mastery-blocks";
import { MasteryQuiz } from "@/components/mastery/mastery-quiz";
import { GrammarStudyTimer } from "@/components/grammar/grammar-study-timer";

export async function generateMetadata({ params }: { params: Promise<{ lesson: string }> }): Promise<Metadata> {
  const { lesson: slug } = await params;
  const found = getMasteryLesson(slug);
  return { title: found ? `${found.lesson.code}: ${found.lesson.title}` : MASTERY_FOLDER_TITLE };
}

export default async function MasteryLessonPage({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson: slug } = await params;
  await requireUser();
  const found = getMasteryLesson(slug);
  if (!found) notFound();
  const { lesson, chapter, prev, next } = found;

  return (
    <div className="flex flex-col gap-6">
      <GrammarStudyTimer topicSlug={`mastery-${slug}`} />

      <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        <Link href="/grammar" className="hover:text-foreground">Ngữ pháp</Link>
        <ChevronRight className="size-3" />
        <Link href={MASTERY_BASE_PATH} className="flex items-center gap-1 font-medium text-primary hover:underline">
          <Crown className="size-3" /> {MASTERY_FOLDER_TITLE}
        </Link>
        {chapter && (
          <>
            <ChevronRight className="size-3" />
            <span>{chapter.title}</span>
          </>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{lesson.code}</p>
        <h1 className="text-2xl font-semibold tracking-tight">{lesson.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{lesson.summary}</p>
      </div>

      <MasteryBlocks blocks={lesson.blocks} />

      {lesson.exercises.map((exercise, i) => (
        <section key={i}>
          <h2 className="mb-3 text-sm font-semibold uppercase text-muted-foreground">
            {exercise.title} <span className="font-normal normal-case">({exercise.questions.length} câu)</span>
          </h2>
          <MasteryQuiz exercise={exercise} />
        </section>
      ))}

      <nav className="flex flex-wrap justify-between gap-3 border-t border-border pt-4">
        {prev ? (
          <Link href={`${MASTERY_BASE_PATH}/${prev.slug}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="size-4" /> {prev.code}: {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`${MASTERY_BASE_PATH}/${next.slug}`} className="flex items-center gap-1 text-right text-sm font-medium text-primary hover:underline">
            {next.code}: {next.title} <ChevronRight className="size-4" />
          </Link>
        ) : (
          <Link href={MASTERY_BASE_PATH} className="text-sm font-medium text-primary hover:underline">
            Về thư mục Mastery
          </Link>
        )}
      </nav>
    </div>
  );
}
