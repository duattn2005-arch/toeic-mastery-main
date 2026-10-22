"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpenCheck, CheckCircle2, CircleDot, Grid3x3, Hammer, ListChecks, Pickaxe, Rocket } from "lucide-react";
import { FlashcardBrowse } from "@/components/study-game/flashcard-browse";
import { MatchingGame } from "@/components/study-game/matching-game";
import { BlastGame } from "@/components/study-game/blast-game";
import { BalloonGame } from "@/components/study-game/balloon-game";
import { MoleGame } from "@/components/study-game/mole-game";
import { MinerGame } from "@/components/study-game/miner-game";
import { QuizMode } from "@/components/study-game/quiz-mode";
import { ARCADE_GAMES, splitArcadeWords, type ArcadeGame, type StudyItem } from "@/lib/services/study-game";
import type { ReviewRating } from "@/lib/services/spaced-repetition";
import { cn } from "@/lib/utils";
import { useStudyPreferences } from "@/hooks/use-study-preferences";
import { StudySettings } from "@/components/study-game/study-settings";

export type FlowStep = "flashcard" | "match" | "blast" | "balloon" | "mole" | "miner" | "quiz";

export const FLOW_STEPS: { id: FlowStep; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "flashcard", label: "Flashcard", icon: BookOpenCheck },
  { id: "match", label: "Nối từ", icon: Grid3x3 },
  { id: "blast", label: "Blast", icon: Rocket },
  { id: "balloon", label: "Bong bóng", icon: CircleDot },
  { id: "mole", label: "Đập chuột", icon: Hammer },
  { id: "miner", label: "Đào vàng", icon: Pickaxe },
  { id: "quiz", label: "Kiểm tra", icon: ListChecks },
];

const isArcade = (step: FlowStep): step is ArcadeGame => (ARCADE_GAMES as readonly string[]).includes(step);

/** How long the "next game" card shows between two stages. */
const HANDOVER_MS = 1300;

/** The steps a word list can actually play — the arcade games and Kiểm tra
 * need at least one other word for wrong options (from `distractorPool`
 * when reviewing a single word), and Nối từ needs two words to pair up. */
export function playableSteps(count: number, poolSize: number): FlowStep[] {
  const steps: FlowStep[] = ["flashcard"];
  if (count >= 2) steps.push("match");
  if (poolSize >= 2) steps.push("blast", "balloon", "mole", "miner", "quiz");
  return steps;
}

/** The one review flow every "Ôn tập lại" / "Ôn từ đang học" / "Ôn tập lại
 * tất cả" button runs, wherever the words come from (path day, IIG day,
 * topic, Đã lưu, daily review): Flashcard -> Nối từ -> Blast -> Bong bóng
 * -> Đập chuột -> Đào vàng -> Kiểm tra. Every step goes over every word in
 * `items`, except the arcade games (Blast, Bong bóng, Đập chuột, Đào vàng),
 * which share the list out evenly between the ones being played
 * (splitArcadeWords). Only the stages the learner keeps on in their study
 * settings are played (the gear at the end of the step bar). Finishing a
 * stage moves on by itself, with a short "next" card in between. Done steps
 * can be replayed. */
export function StudyFlow({
  items,
  onItemResult,
  onFinish,
  autoStar = true,
  distractorPool,
}: {
  items: StudyItem[];
  /** The whole lesson's words, so reviewing a few words (e.g. "Ôn từ đang
   * học (1)") still gets real wrong options in the games and Kiểm tra. */
  distractorPool?: StudyItem[];
  onItemResult?: (itemId: string, rating: ReviewRating) => void | Promise<void>;
  /** Called after the last step is finished. */
  onFinish: () => void;
  /** Off for Saved Words — see FlashcardBrowse's autoStar doc. */
  autoStar?: boolean;
}) {
  const [prefs] = useStudyPreferences();
  const poolSize = new Set([...items, ...(distractorPool ?? [])].map((i) => i.id)).size;
  const playable = React.useMemo(() => playableSteps(items.length, poolSize), [items.length, poolSize]);
  // The learner's chosen stages, never empty: if none of them can be played
  // for this word list, fall back to everything playable.
  const chosen = React.useMemo(() => {
    const picked = playable.filter((s) => prefs.stages.includes(s));
    return picked.length > 0 ? picked : playable;
  }, [playable, prefs.stages]);
  // The words shared out between the chosen arcade games; a game left with
  // no words (fewer words than games) is dropped from the flow.
  const arcadeKey = chosen.filter(isArcade).join(",");
  const arcade = React.useMemo(() => splitArcadeWords(items, arcadeKey ? (arcadeKey.split(",") as ArcadeGame[]) : []), [items, arcadeKey]);
  const steps = React.useMemo(() => chosen.filter((s) => !isArcade(s) || arcade[s].length > 0), [chosen, arcade]);

  // Tracked by stage id (not position) so turning stages on/off mid-flow
  // never jumps to the wrong game.
  const [current, setCurrent] = React.useState<FlowStep>(steps[0]);
  const [done, setDone] = React.useState<Set<FlowStep>>(() => new Set());
  // Remounts the step's game when a finished step is replayed.
  const [run, setRun] = React.useState(0);
  const [handover, setHandover] = React.useState<{ from: FlowStep; to: FlowStep } | null>(null);
  const index = Math.max(0, steps.indexOf(current));

  function finishStep() {
    const step = steps[index];
    setDone((d) => new Set(d).add(step));
    if (index >= steps.length - 1) {
      onFinish();
      return;
    }
    const next = steps[index + 1];
    // No "Xong" to press between stages: a short card, then the next one.
    setHandover({ from: step, to: next });
    setTimeout(() => {
      setHandover(null);
      setCurrent(next);
      setRun((r) => r + 1);
    }, HANDOVER_MS);
  }

  function jump(to: FlowStep) {
    setCurrent(to);
    setRun((r) => r + 1);
  }

  const step = steps[index];
  const pool = distractorPool ?? items;

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
                disabled={!isDone || active || handover !== null}
                onClick={() => jump(id)}
                title={label}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-xl border px-2 py-2.5 text-sm font-medium transition-colors lg:justify-start lg:px-3",
                  active && "border-primary/40 bg-accent text-foreground",
                  isDone && !active && "border-success/40 bg-success/10 text-success hover:bg-success/20",
                  !active && !isDone && "border-border text-muted-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="hidden truncate lg:inline">{label}</span>
              </button>
            );
          })}
        <StudySettings stages={playable} className={steps.length > 1 ? "" : "ml-auto"} />
      </div>

      {handover ? (
        <AnimatePresence mode="wait">
          <Handover key={`${handover.from}-${handover.to}`} from={handover.from} to={handover.to} />
        </AnimatePresence>
      ) : (
        <React.Fragment key={`${step}-${run}`}>
          {step === "flashcard" && (
            <FlashcardBrowse items={items} onFinish={finishStep} onItemResult={onItemResult} autoStar={autoStar} showSettings={false} />
          )}
          {step === "match" && <MatchingGame items={items} onFinish={finishStep} onItemResult={onItemResult} autoAdvance />}
          {step === "blast" && <BlastGame items={arcade.blast} distractorPool={pool} onFinish={finishStep} onItemResult={onItemResult} autoAdvance />}
          {step === "balloon" && <BalloonGame items={arcade.balloon} distractorPool={pool} onFinish={finishStep} onItemResult={onItemResult} autoAdvance />}
          {step === "mole" && <MoleGame items={arcade.mole} distractorPool={pool} onFinish={finishStep} onItemResult={onItemResult} autoAdvance />}
          {step === "miner" && <MinerGame items={arcade.miner} distractorPool={pool} onFinish={finishStep} onItemResult={onItemResult} autoAdvance />}
          {step === "quiz" && <QuizMode items={items} distractorPool={distractorPool} onFinish={finishStep} onItemResult={onItemResult} autoStar={autoStar} />}
        </React.Fragment>
      )}
    </div>
  );
}

/** The card shown for a moment between two stages. */
export function Handover({ from, to }: { from: FlowStep; to: FlowStep }) {
  const fromStep = FLOW_STEPS.find((s) => s.id === from);
  const toStep = FLOW_STEPS.find((s) => s.id === to);
  if (!fromStep || !toStep) return null;
  const ToIcon = toStep.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center gap-4 rounded-[2rem] border border-border/70 bg-card px-6 py-14 text-center shadow-soft"
    >
      <p className="flex items-center gap-1.5 text-sm font-semibold text-success">
        <CheckCircle2 className="size-4" /> Xong {fromStep.label}
      </p>
      <div className="flex items-center gap-3">
        <ArrowRight className="size-5 text-muted-foreground" />
        <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <ToIcon className="size-7" />
        </span>
      </div>
      <p className="text-xl font-extrabold">Tiếp theo: {toStep.label}</p>
      <div className="h-1 w-40 overflow-hidden rounded-full bg-muted">
        <motion.div className="h-full bg-primary" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: HANDOVER_MS / 1000, ease: "linear" }} />
      </div>
    </motion.div>
  );
}
