import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrainCircuit, ChevronLeft, ChevronRight, Gamepad2, GraduationCap } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { collectionBasePath, collectionDbSlug, getCollectionTopic, getVocabCollection } from "@/lib/content/vocab-collections";
import { ensureCollectionSynced } from "@/lib/content/vocab-collection-sync";
import { getVocabularyPathOverview } from "@/lib/data/vocabulary-path";
import { getTopicSrsStats, getTopicWithWords } from "@/lib/data/vocabulary";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PathOverviewContent } from "@/components/vocabulary/path/path-overview-content";
import { StartLearningButton } from "@/components/vocabulary/start-learning-button";
import { MasteryBlocks } from "@/components/mastery/mastery-blocks";
import { MasteryQuiz } from "@/components/mastery/mastery-quiz";
import { getExerciseProgress } from "@/lib/data/exercise-progress";
import { PronounceButton } from "@/components/vocabulary/pronounce-button";
import { formatIpa } from "@/lib/pronounce";
import { VOCAB_STATUS_LABEL, vocabStatus, type VocabStatus } from "@/lib/services/spaced-repetition";

type Params = Promise<{ collection: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { collection: key, slug } = await params;
  const collection = getVocabCollection(key);
  const found = collection && getCollectionTopic(collection, slug);
  return { title: collection && found ? `${collection.label}: ${found.topic.title}` : "Từ vựng" };
}

/** Topic page shared by every static word collection (IIG Vocab, ETS 2026). */
export default async function CollectionTopicPage({ params }: { params: Params }) {
  const { collection: key, slug } = await params;
  const collection = getVocabCollection(key);
  const found = collection && getCollectionTopic(collection, slug);
  if (!collection || !found) notFound();
  const { topic, index, prev, next } = found;
  const profile = await requireUser();

  await ensureCollectionSynced(collection);
  const dbSlug = collectionDbSlug(collection, slug);
  const collectionPath = collectionBasePath(collection);
  const quizKey = `vocab:${dbSlug}:quiz`;
  const quizProgress = await getExerciseProgress(profile.id, [quizKey]);
  const [pathOverview, srs, { words: dbWords }] = await Promise.all([
    getVocabularyPathOverview(profile.id, dbSlug),
    getTopicSrsStats(dbSlug, profile.id),
    getTopicWithWords(dbSlug, profile.id),
  ]);
  const basePath = `${collectionPath}/${slug}`;
  const hasDetails = topic.words.some(([, , , , example]) => example);
  const statusByWord = new Map(dbWords.map((w) => [w.word, vocabStatus(w.isTracked ? w : null)]));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          <Link href="/vocabulary" className="hover:text-foreground">Từ vựng</Link>
          <ChevronRight className="size-3" />
          <span className="flex items-center gap-1 font-medium text-primary">
            <GraduationCap className="size-3" /> {collection.label}
          </span>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Chủ đề #{index + 1}</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            {topic.title} <span className="text-muted-foreground">· {topic.titleVi}</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{topic.summary}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Chưa học" value={Math.max(0, topic.words.length - srs.tracked)} />
          <Stat label="Đang học" value={srs.tracked - srs.learned} />
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
        <div className={cn("grid gap-3", hasDetails ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3")}>
          {topic.words.map(([word, pos, ipa, meaning, example, note]) => (
            <div key={word} className={cn("flex flex-col rounded-2xl border border-border bg-card shadow-soft", hasDetails ? "gap-2 p-4" : "gap-1 p-3")}>
              <div className="flex items-start gap-1">
                <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2">
                  <span className="text-base font-semibold">{word}</span>
                  {pos && <span className="text-xs italic text-muted-foreground">({pos})</span>}
                  {formatIpa(ipa) && <span className="text-xs text-muted-foreground">{formatIpa(ipa)}</span>}
                </div>
                <StatusBadge status={statusByWord.get(word) ?? "new"} />
                <PronounceButton term={word} className="-mr-1 -mt-1" />
              </div>
              <p className="text-sm font-medium text-primary">{meaning}</p>
              {example && <p className="text-sm text-muted-foreground">E.g. {example}</p>}
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
          <MasteryQuiz
            exercise={{ title: "Kiểm tra tổng hợp", kind: "test", questions: topic.quiz }}
            progressKey={quizKey}
            initialProgress={quizProgress[quizKey]}
          />
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
          <Link href={`${collectionPath}/${prev.slug}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="size-4" /> {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`${collectionPath}/${next.slug}`} className="flex items-center gap-1 text-right text-sm font-medium text-primary hover:underline">
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

function StatusBadge({ status }: { status: VocabStatus }) {
  if (status === "new") return null;
  return (
    <span
      className={cn(
        "mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold",
        status === "mastered" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
      )}
    >
      {VOCAB_STATUS_LABEL[status]}
    </span>
  );
}
