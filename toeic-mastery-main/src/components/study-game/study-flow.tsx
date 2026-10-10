"use client";

import * as React from "react";
import { BookOpenCheck, CircleDot, Grid3x3, ListChecks, Rocket } from "lucide-react";
import { FlashcardBrowse } from "@/components/study-game/flashcard-browse";
import { MatchingGame } from "@/components/study-game/matching-game";
import { BlastGame } from "@/components/study-game/blast-game";
import { BalloonGame } from "@/components/study-game/balloon-game";
import { QuizMode } from "@/components/study-game/quiz-mode";
import { splitArcadeWords, type StudyItem } from "@/lib/services/study-game";
import type { ReviewRating } from "@/lib/services/spaced-repetition";
import { cn } from "@/lib/utils";

export type FlowStep = "flashcard" | "match" | "blast" | "balloon" | "quiz";

export const FLOW_STEPS: { id: FlowStep; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "flashcard", label: "Flashcard", icon: BookOpenCheck },
  { id: "match", label: "Nối từ", icon: Grid3x3 },
  { id: "blast", label: "Blast", icon: Rocket },
  { id: "balloon", label: "Bong bóng", icon: CircleDot },
  { id: "quiz", label: "Kiểm tra", icon: ListChecks },
];

/** The steps a word list can actually play — Blast/Bong bóng/Kiểm tra need at least
 * one other word for wrong options (from `distractorPool` when reviewing a
 * single word), and Nối từ needs two words to pair up. */
export function playableSteps(count: number, poolSize: number): FlowStep[] {
  const steps: FlowStep[] = ["flashcard"];
  if (count >= 2) steps.push("match");
  if (poolSize >= 2) steps.push("blast", "balloon", "quiz");
  return steps;
}

/** The one review flow every "Ôn tập lại" / "Ôn từ đang học" / "Ôn tập lại
 * tất cả" button runs, wherever the words come from (path day, IIG day,
 * topic, Đã lưu, daily review): Flashcard -> Nối từ -> Blast -> Bong bóng
 * -> Kiểm tra, every step over every word in `items` — except that from
 * ARCADE_SPLIT_AT words on, Blast and Bong bóng split the list in half
 * (splitArcadeWords). Done steps can be replayed from the step bar. */
export function StudyFlow({
  items,
  onItemResult,
  onFinish,
  autoStar = true,
  distractorPool,
}: {
  items: StudyItem[];
  /** The whole lesson's words, so reviewing a few words (e.g. "Ôn từ đang
   * học (1)") still gets real wrong options in Blast and Kiểm tra. */
  distractorPool?: StudyItem[];
  onItemResult?: (itemId: string, rating: ReviewRating) => void | Promise<void>;
  /** Called after the last step (Kiểm tra) is finished. */
  onFinish: () => void;
  /** Off for Saved Words — see FlashcardBrowse's autoStar doc. */
  autoStar?: boolean;
}) {
  const poolSize = new Set([...items, ...(distractorPool ?? [])].map((i) => i.id)).size;
  const steps = React.useMemo(() => playableSteps(items.length, poolSize), [items.length, poolSize]);
  const [arcade] = React.useState(() => splitArcadeWords(items));
  const [index, setIndex] = React.useState(0);
  const [doneUpTo, setDoneUpTo] = React.useState(-1);
  // Remounts the step's game when a finished step is replayed.
  const [run, setRun] = React.useState(0);

  function finishStep() {
    setDoneUpTo((d) => Math.max(d, index));
    if (index >= steps.length - 1) {
      onFinish();
      return;
    }
    setIndex(index + 1);
    setRun((r) => r + 1);
  }

  function jump(to: number) {
    setIndex(to);
    setRun((r) => r + 1);
  }

  const step = steps[index];

  return (
    <div className="flex flex-col gap-6">
      {steps.length > 1 && (
        <div className="flex items-center gap-2">
          {FLOW_STEPS.filter((s) => steps.includes(s.id)).map(({ id, label, icon: Icon }, i) => {
            const done = i <= doneUpTo;
            const active = i === index;
            return (
              <button
                key={id}
                type="button"
                disabled={!done || active}
                onClick={() => jump(i)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-xl border px-2 py-2.5 text-sm font-medium transition-colors sm:justify-start sm:px-3",
                  active && "border-primary/40 bg-accent text-foreground",
                  done && !active && "border-success/40 bg-success/10 text-success hover:bg-success/20",
                  !active && !done && "border-border text-muted-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="hidden truncate sm:inline">{label}</span>
              </button>
            );
          })}
        </div>
      )}

      <React.Fragment key={`${step}-${run}`}>
        {step === "flashcard" && <FlashcardBrowse items={items} onFinish={finishStep} onItemResult={onItemResult} autoStar={autoStar} />}
        {step === "match" && <MatchingGame items={items} onFinish={finishStep} onItemResult={onItemResult} />}
        {step === "blast" && <BlastGame items={arcade.blast} distractorPool={distractorPool ?? items} onFinish={finishStep} onItemResult={onItemResult} />}
        {step === "balloon" && <BalloonGame items={arcade.balloon} distractorPool={distractorPool ?? items} onFinish={finishStep} onItemResult={onItemResult} />}
        {step === "quiz" && <QuizMode items={items} distractorPool={distractorPool} onFinish={finishStep} onItemResult={onItemResult} autoStar={autoStar} />}
      </React.Fragment>
    </div>
  );
}
