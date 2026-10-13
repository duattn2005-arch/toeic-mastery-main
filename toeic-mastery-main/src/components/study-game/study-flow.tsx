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
import { useStudyPreferences } from "@/hooks/use-study-preferences";
import { StudySettings } from "@/components/study-game/study-settings";

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
 * -> Kiểm tra, every step over every word in `items` — except Blast and
 * Bong bóng, which split the list in half between them (splitArcadeWords).
 * Only the stages the learner keeps on in their study settings are played
 * (the gear at the end of the step bar). Done steps can be replayed. */
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
  const [prefs] = useStudyPreferences();
  const poolSize = new Set([...items, ...(distractorPool ?? [])].map((i) => i.id)).size;
  const [arcade] = React.useState(() => splitArcadeWords(items));
  const playable = React.useMemo(
    () => playableSteps(items.length, poolSize).filter((s) => s !== "balloon" || arcade.balloon.length > 0),
    [items.length, poolSize, arcade]
  );
  // The learner's chosen stages, never empty: if none of them can be played
  // for this word list, fall back to everything playable.
  const steps = React.useMemo(() => {
    const chosen = playable.filter((s) => prefs.stages.includes(s));
    return chosen.length > 0 ? chosen : playable;
  }, [playable, prefs.stages]);

  // Tracked by stage id (not position) so turning stages on/off mid-flow
  // never jumps to the wrong game.
  const [current, setCurrent] = React.useState<FlowStep>(steps[0]);
  const [done, setDone] = React.useState<Set<FlowStep>>(() => new Set());
  // Remounts the step's game when a finished step is replayed.
  const [run, setRun] = React.useState(0);
  const index = Math.max(0, steps.indexOf(current));

  function finishStep() {
    const step = steps[index];
    setDone((d) => new Set(d).add(step));
    if (index >= steps.length - 1) {
      onFinish();
      return;
    }
    setCurrent(steps[index + 1]);
    setRun((r) => r + 1);
  }

  function jump(to: FlowStep) {
    setCurrent(to);
    setRun((r) => r + 1);
  }

  const step = steps[index];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        {steps.length > 1 &&
          FLOW_STEPS.filter((s) => steps.includes(s.id)).map(({ id, label, icon: Icon }) => {
            const isDone = done.has(id);
            const active = id === step;
            return (
              <button
                key={id}
                type="button"
                disabled={!isDone || active}
                onClick={() => jump(id)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-xl border px-2 py-2.5 text-sm font-medium transition-colors sm:justify-start sm:px-3",
                  active && "border-primary/40 bg-accent text-foreground",
                  isDone && !active && "border-success/40 bg-success/10 text-success hover:bg-success/20",
                  !active && !isDone && "border-border text-muted-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="hidden truncate sm:inline">{label}</span>
              </button>
            );
          })}
        <StudySettings stages={playable} className={steps.length > 1 ? "" : "ml-auto"} />
      </div>

      <React.Fragment key={`${step}-${run}`}>
        {step === "flashcard" && (
          <FlashcardBrowse items={items} onFinish={finishStep} onItemResult={onItemResult} autoStar={autoStar} showSettings={false} />
        )}
        {step === "match" && <MatchingGame items={items} onFinish={finishStep} onItemResult={onItemResult} />}
        {step === "blast" && <BlastGame items={arcade.blast} distractorPool={distractorPool ?? items} onFinish={finishStep} onItemResult={onItemResult} />}
        {step === "balloon" && <BalloonGame items={arcade.balloon} distractorPool={distractorPool ?? items} onFinish={finishStep} onItemResult={onItemResult} />}
        {step === "quiz" && <QuizMode items={items} distractorPool={distractorPool} onFinish={finishStep} onItemResult={onItemResult} autoStar={autoStar} />}
      </React.Fragment>
    </div>
  );
}
