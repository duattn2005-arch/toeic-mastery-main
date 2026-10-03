import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrainCircuit, ChevronLeft, ChevronRight, Gamepad2, GraduationCap } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { IIG_TOPICS, getIigTopic, getIigTopicIndex } from "@/lib/content/iig-vocab";
import { ensureIigContentSynced, iigDbSlug } from "@/lib/content/iig-vocab/sync";
import { getVocabularyPathOverview } from "@/lib/data/vocabulary-path";
import { getTopicSrsStats, getTopicWithWords } from "@/lib/data/vocabulary";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PathOverviewContent } from "@/components/vocabulary/path/path-overview-content";
import { StartLearningButton } from "@/components/vocabulary/start-learning-button";
import { MasteryBlocks } from "@/components/mastery/mastery-blocks";
import { MasteryQuiz } from "@/components/mastery/mastery-quiz";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getIigTopic(slug);
  return { title: topic ? `IIG Vocab: ${topic.title}` : "IIG Vocab" };
}

export default async function IigTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await requireUser();
  const topic = getIigTopic(slug);
  if (!topic) notFound();
  const index = getIigTopicIndex(slug);
  const prev = index > 0 ? IIG_TOPICS[index - 1] : null;
  const next = index < IIG_TOPICS.length - 1 ? IIG_TOPICS[index + 1] : null;

  await ensureIigContentSynced();
  const dbSlug = iigDbSlug(slug);
  const [pathOverview, srs, { words: dbWords }] = await Promise.all([
    getVocabularyPathOverview(profile.id, dbSlug),
    getTopicSrsStats(dbSlug, profile.id),
    getTopicWithWords(dbSlug, profile.id),
  ]);
  const basePath = `/vocabulary/iig/${slug}`;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          <Link href="/vocabulary" className="hover:text-foreground">Từ vựng</Link>
          <ChevronRight className="size-3" />
          <span className="flex items-center gap-1 font-medium text-primary">
            <GraduationCap className="size-3" /> IIG Vocab
          </span>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Chủ đề #{index + 1}</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            {topic.title} <span className="text-muted-foreground">· {topic.titleVi}</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{topic.summary}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Stat label="Đang học" value={`${srs.tracked}/${topic.words.length}`} />
          <Stat label="Đã thuộc" value={srs.learned} />
          <Stat label="Cần ôn hôm nay" value={srs.due} highlight={srs.due > 0} />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href={`${basePath}/study`}>
              <Gamepad2 className="size-4" /> Học & Chơi
            </Link>
          </Button>
          <Button asChild variant={srs.due > 0 ? "default" : "outline"}>
            <Link href={`/vocabulary/review?topic=${dbSlug}`}>
              <BrainCircuit className="size-4" /> Ôn tập ghi nhớ{srs.due > 0 ? ` (${srs.due})` : ""}
            </Link>
          </Button>
          <StartLearningButton vocabularyWordIds={dbWords.map((w) => w.id)} />
        </div>
      </div>

      <PathOverviewContent data={pathOverview} dayBasePath={`${basePath}/day`} showXp={false} />

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase text-muted-foreground">
          Danh sách từ <span className="font-normal normal-case">({topic.words.length} từ)</span>
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {topic.words.map(([word, pos, ipa, meaning, example, note]) => (
            <div key={word} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-base font-semibold">{word}</span>
                <span className="text-xs italic text-muted-foreground">({pos})</span>
                {ipa && <span className="text-xs text-muted-foreground">{ipa}</span>}
              </div>
              <p className="text-sm font-medium text-primary">{meaning}</p>
              <p className="text-sm text-muted-foreground">E.g. {example}</p>
              {note && <p className="rounded-xl bg-accent/50 p-3 text-xs leading-relaxed">{note}</p>}
            </div>
          ))}
        </div>
      </section>

      {topic.quiz.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase text-muted-foreground">
            Kiểm tra tổng hợp <span className="font-normal normal-case">({topic.quiz.length} câu)</span>
          </h2>
          <MasteryQuiz exercise={{ title: "Kiểm tra tổng hợp", kind: "test", questions: topic.quiz }} />
        </section>
      )}

      {topic.written.length > 0 && (
        <MasteryBlocks
          blocks={[
            {
              type: "qa",
              title: `Bài tập tự luận (${topic.written.length} câu)`,
              instructions: "Sắp xếp câu, chia dạng từ hoặc điền từ — bấm để xem đáp án.",
              items: topic.written,
            },
          ]}
        />
      )}

      <nav className="flex flex-wrap justify-between gap-3 border-t border-border pt-4">
        {prev ? (
          <Link href={`/vocabulary/iig/${prev.slug}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="size-4" /> {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/vocabulary/iig/${next.slug}`} className="flex items-center gap-1 text-right text-sm font-medium text-primary hover:underline">
            {next.title} <ChevronRight className="size-4" />
          </Link>
        ) : (
          <Link href="/vocabulary" className="text-sm font-medium text-primary hover:underline">
            Về trang Từ vựng
          </Link>
        )}
      </nav>
    </div>
  );
}

function Stat({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className={cn("rounded-2xl border p-3 shadow-soft", highlight ? "border-warning/40 bg-warning/10" : "border-border bg-card")}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
