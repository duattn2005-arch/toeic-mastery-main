"use client";

import * as React from "react";
import Link from "next/link";
import { PartyPopper, Rocket, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudyFlow } from "@/components/study-game/study-flow";
import { VocabularyReviewOverview } from "@/components/vocabulary/vocabulary-review-overview";
import { practiceVocabularyWordAction, logStudySessionAction } from "@/lib/actions/vocabulary";
import type { ReviewRating } from "@/lib/services/spaced-repetition";
import type { StudyItem } from "@/lib/services/study-game";
import { useLiveVocabStatus } from "@/hooks/use-live-vocab-status";

interface ReviewItem {
  vocabularyWordId: string;
  isLearned: boolean;
  word: {
    word: string;
    ipa: string | null;
    partOfSpeech: string | null;
    meaningVi: string;
    exampleEn: string | null;
    audioUrlUs: string | null;
    audioUrlUk: string | null;
  };
}

function toStudyItem(item: ReviewItem): StudyItem {
  return {
    id: item.vocabularyWordId,
    term: item.word.word,
    ipa: item.word.ipa,
    partOfSpeech: item.word.partOfSpeech,
    meaningVi: item.word.meaningVi,
    exampleEn: item.word.exampleEn,
    audioUrl: item.word.audioUrlUk ?? item.word.audioUrlUs,
    status: item.isLearned ? "mastered" : "learning",
  };
}

/**
 * The daily spaced-repetition due queue, run through the shared StudyFlow
 * (Flashcard -> Nối từ -> Blast -> Bong bóng -> Kiểm tra) — no per-day persistence: a
 * fresh due queue is generated every visit, so progress is local state.
 */
export function ReviewSession({
  items,
  practiceItems = [],
  starredTerms,
}: {
  items: ReviewItem[];
  /** Already-studied words, offered when nothing is due today. */
  practiceItems?: ReviewItem[];
  starredTerms: string[];
}) {
  const [practicing, setPracticing] = React.useState(false);
  // Snapshot the word lists for this visit. Every rating writes progress
  // through a server action, whose revalidation re-renders this page with
  // a fresh due queue — which empties as words are rated. Following those
  // new props would drop the learner out of the session (to the "nothing
  // due" screen) right after the flashcards, before Nối từ/Blast/Bong bóng/Kiểm tra.
  const [session] = React.useState(() => ({ due: items, studied: practiceItems }));
  const { due, studied } = session;

  if (due.length > 0) return <ReviewRunner items={due} starredTerms={starredTerms} doneLabel="hôm nay" />;
  if (practicing) return <ReviewRunner items={studied} starredTerms={starredTerms} doneLabel="đã học" />;

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
      <PartyPopper className="size-10 text-primary" />
      <h2 className="text-lg font-semibold">Không có từ nào đến hạn ôn hôm nay!</h2>
      <p className="max-w-md text-sm text-muted-foreground">
        {studied.length > 0
          ? `Bạn vẫn có thể ôn lại ${studied.length} từ đã học với thẻ ghi nhớ, Nối từ, Blast, Bong bóng và bài Kiểm tra.`
          : "Học vài từ mới trước đã — sau đó bạn có thể quay lại đây để ôn bằng game."}
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {studied.length > 0 && (
          <Button onClick={() => setPracticing(true)}>
            <Rocket className="size-4" /> Ôn lại {studied.length} từ đã học
          </Button>
        )}
        <Button asChild variant="outline">
          <Link href="/vocabulary/topics">Học thêm từ mới</Link>
        </Button>
        {studied.length === 0 && (
          <Button asChild>
            <Link href="/dashboard">Về Tổng quan</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

function ReviewRunner({ items, starredTerms, doneLabel }: { items: ReviewItem[]; starredTerms: string[]; doneLabel: string }) {
  const studyItems = React.useMemo(() => items.map(toStudyItem), [items]);

  // The words the 4-step flow is running on (null = not running): all of
  // them first, then whatever "Ôn tập lại" / "Ôn từ đang học" picks.
  const [flowItems, setFlowItems] = React.useState<StudyItem[] | null>(studyItems);
  const [flowRun, setFlowRun] = React.useState(0);
  const [showOverview, setShowOverview] = React.useState(false);
  const [sessionOverrides, setSessionOverrides] = React.useState<Record<string, boolean>>({});
  const startedAtRef = React.useRef<number | null>(null);

  const effectiveStarredTerms = React.useMemo(() => {
    const base = new Set(starredTerms.map((t) => t.toLowerCase()));
    for (const [term, needsReview] of Object.entries(sessionOverrides)) {
      if (needsReview) base.add(term);
      else base.delete(term);
    }
    return [...base];
  }, [starredTerms, sessionOverrides]);

  const [liveItems, recordStatus] = useLiveVocabStatus(studyItems);
  function handleItemResult(vocabularyWordId: string, rating: ReviewRating) {
    if (startedAtRef.current === null) startedAtRef.current = Date.now();
    recordStatus(vocabularyWordId, rating);
    void practiceVocabularyWordAction(vocabularyWordId, rating);
    const term = studyItems.find((i) => i.id === vocabularyWordId)?.term.toLowerCase();
    if (term) setSessionOverrides((prev) => ({ ...prev, [term]: rating === "AGAIN" }));
  }

  function startFlow(list: StudyItem[]) {
    setShowOverview(false);
    setFlowItems(list);
    setFlowRun((r) => r + 1);
  }

  function finishFlow() {
    if (startedAtRef.current !== null) {
      void logStudySessionAction(Math.round((Date.now() - startedAtRef.current) / 1000));
      startedAtRef.current = null;
    }
    setFlowItems(null);
  }

  if (flowItems) {
    return <StudyFlow key={flowRun} items={flowItems} distractorPool={studyItems} onFinish={finishFlow} onItemResult={handleItemResult} />;
  }

  if (showOverview) {
    return (
      <VocabularyReviewOverview
        key={effectiveStarredTerms.join(",")}
        title="Ôn tập hôm nay"
        items={liveItems}
        starredTerms={effectiveStarredTerms}
        onStartReview={startFlow}
      />
    );
  }

  const needsReviewCount = studyItems.filter((i) => effectiveStarredTerms.includes(i.term.toLowerCase())).length;
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-success/30 bg-success/10 p-8 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-success/20 text-success">
        <PartyPopper className="size-8" />
      </span>
      <p className="text-xl font-bold">Đã ôn xong {studyItems.length} từ {doneLabel}!</p>
      {needsReviewCount > 0 && (
        <p className="text-sm text-muted-foreground">
          Bạn có <strong className="text-foreground">{needsReviewCount}</strong>/{studyItems.length} từ chưa nhớ chắc — hãy ôn tập lại.
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        <Button variant="outline" onClick={() => setShowOverview(true)}>
          <RotateCcw className="size-4" /> Ôn tập lại
        </Button>
        <Button asChild>
          <Link href="/dashboard">Về Tổng quan</Link>
        </Button>
      </div>
    </div>
  );
}
