"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfettiBurst } from "@/components/shared/confetti-burst";
import { cn } from "@/lib/utils";
import { useGameFeedback } from "@/hooks/use-game-feedback";
import { GameStarfield } from "@/components/study-game/game-starfield";
import { buildBlast, type BlastQuestion, type StudyItem } from "@/lib/services/study-game";
import type { ReviewRating } from "@/lib/services/spaced-repetition";

/** Seconds a bubble takes to float from the bottom to off the top. */
const RISE_SECONDS = 9;
const OPTIONS = 3;
const MAX_HEARTS = 3;
const COMBO_SEGMENTS = 5;
const NEXT_DELAY_MS = 700;
const REVEAL_DELAY_MS = 1300;

/** Glossy bubble tints, one per lane (cohesive cool palette). */
const SKINS = [
  { tint: "rgba(45,212,191,0.55)", rim: "rgba(153,246,228,0.9)" },
  { tint: "rgba(56,189,248,0.55)", rim: "rgba(186,230,253,0.9)" },
  { tint: "rgba(167,139,250,0.55)", rim: "rgba(221,214,254,0.9)" },
];

/** Lanes (percent from the left) and start delays, so bubbles don't overlap. */
const LANES = [
  { x: 22, delay: 0 },
  { x: 50, delay: 0.9 },
  { x: 78, delay: 0.45 },
];

type Phase = "play" | "pop" | "reveal";

/** Bong bóng: the Vietnamese meaning is shown on top, bubbles carrying
 * English terms float up from the bottom — tap the right one before it
 * drifts away. Every word in `items` gets its own round. A wrong tap pops
 * the bubble and costs a heart (hearts refill when they run out, so every
 * word is still played). First-try pop -> GOOD; a wrong tap or letting the
 * right bubble escape -> AGAIN, same SRS rule as Blast and Kiểm tra. */
export function BalloonGame({
  items,
  onFinish,
  onItemResult,
  distractorPool,
}: {
  items: StudyItem[];
  /** Wider word list for the decoy bubbles (defaults to `items`). */
  distractorPool?: StudyItem[];
  onFinish: () => void;
  onItemResult?: (itemId: string, rating: ReviewRating) => void | Promise<void>;
}) {
  const [questions] = React.useState<BlastQuestion[]>(() => buildBlast(items, distractorPool, OPTIONS));
  const [index, setIndex] = React.useState(0);
  const feedback = useGameFeedback(items);
  const [phase, setPhase] = React.useState<Phase>("play");
  const [popped, setPopped] = React.useState<Set<string>>(new Set());
  const [missedWord, setMissedWord] = React.useState(false);
  const [hearts, setHearts] = React.useState(MAX_HEARTS);
  const [score, setScore] = React.useState(0);
  const [combo, setCombo] = React.useState(0);
  const [bestCombo, setBestCombo] = React.useState(0);
  const [firstTry, setFirstTry] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(RISE_SECONDS);
  const [burst, setBurst] = React.useState<{ key: number; x: number; y: number; good: boolean; text?: string } | null>(null);
  const [refilled, setRefilled] = React.useState(false);
  const arenaRef = React.useRef<HTMLDivElement>(null);
  const burstKey = React.useRef(0);

  const total = questions.length;
  const done = index >= total;
  const current = questions[index];
  const multiplier = 1 + Math.floor(combo / COMBO_SEGMENTS);

  const goNext = React.useCallback((delay: number) => {
    setTimeout(() => {
      setIndex((i) => i + 1);
      setPhase("play");
      setPopped(new Set());
      setMissedWord(false);
      setTimeLeft(RISE_SECONDS);
    }, delay);
  }, []);

  // Countdown shown in the ring; the right bubble escaping ends the round.
  React.useEffect(() => {
    if (done || phase !== "play") return;
    const t = setTimeout(() => {
      if (timeLeft > 1) {
        setTimeLeft(timeLeft - 1);
        return;
      }
      setTimeLeft(0);
      setPhase("reveal");
      setCombo(0);
      void onItemResult?.(current.item.id, "AGAIN");
      goNext(REVEAL_DELAY_MS);
    }, 1000);
    return () => clearTimeout(t);
  }, [timeLeft, phase, done, current, onItemResult, goNext]);

  function burstAt(e: React.MouseEvent<HTMLButtonElement>, good: boolean, text?: string) {
    const arena = arenaRef.current?.getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    if (!arena) return;
    burstKey.current += 1;
    setBurst({ key: burstKey.current, x: r.left + r.width / 2 - arena.left, y: r.top + r.height / 2 - arena.top, good, text });
  }

  function tap(e: React.MouseEvent<HTMLButtonElement>, option: StudyItem) {
    if (phase !== "play" || popped.has(option.id)) return;
    setPopped((prev) => new Set(prev).add(option.id));
    if (option.id === current.item.id) feedback.correct(current.item);
    else feedback.wrong();

    if (option.id === current.item.id) {
      const clean = !missedWord;
      const nextCombo = clean ? combo + 1 : 0;
      const gained = clean ? (10 + timeLeft) * (1 + Math.floor(nextCombo / COMBO_SEGMENTS)) : 3;
      burstAt(e, true, `+${gained}`);
      setPhase("pop");
      setScore((s) => s + gained);
      setCombo(nextCombo);
      setBestCombo((b) => Math.max(b, nextCombo));
      if (clean) setFirstTry((n) => n + 1);
      void onItemResult?.(current.item.id, clean ? "GOOD" : "AGAIN");
      goNext(NEXT_DELAY_MS);
    } else {
      burstAt(e, false);
      setMissedWord(true);
      setCombo(0);
      if (hearts > 1) {
        setHearts(hearts - 1);
      } else {
        // Out of hearts: refill rather than end — every word still gets played.
        setHearts(MAX_HEARTS);
        setRefilled(true);
        setTimeout(() => setRefilled(false), 1400);
      }
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <ConfettiBurst />
        <span className="relative flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-300 via-sky-400 to-indigo-500 text-2xl shadow-[0_0_30px_rgba(94,234,212,0.5)]">
          <span className="absolute left-3 top-2.5 h-3 w-4 -rotate-[30deg] rounded-full bg-white/80" />
          <span className="absolute bottom-3.5 right-4 size-1.5 rounded-full bg-white/60" />
        </span>
        <div>
          <p className="text-2xl font-bold">Nổ hết bong bóng rồi!</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Chạm đúng ngay {firstTry}/{total} từ · Combo dài nhất x{bestCombo}
          </p>
        </div>
        <p className="flex items-center gap-1.5 rounded-full bg-amber-400/15 px-4 py-1.5 text-lg font-bold text-amber-500">
          <Star className="size-5 fill-current" /> {score} điểm
        </p>
        <Button type="button" onClick={onFinish}>
          Xong
        </Button>
      </div>
    );
  }

  const ringPct = (timeLeft / RISE_SECONDS) * 100;
  const urgent = timeLeft <= 3;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={arenaRef}
        className="relative isolate aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#0b1030_0%,#101a3f_55%,#0c2a33_100%)] shadow-[0_24px_60px_-24px_rgba(10,16,48,0.8)] ring-1 ring-white/10 sm:aspect-[4/5]"
      >
        <GameStarfield nebula={["rgba(167,139,250,0.22)", "rgba(45,212,191,0.2)"]} />
        {/* Night pond along the bottom, where the bubbles rise from */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(180deg,transparent,rgba(13,148,136,0.28))]">
          <span className="absolute bottom-[18%] left-[8%] h-3 w-16 rounded-[50%] bg-emerald-400/25" />
          <span className="absolute right-[10%] bottom-[30%] h-2.5 w-12 rounded-[50%] bg-emerald-400/20" />
          <span className="absolute bottom-[8%] left-[55%] h-2 w-10 rounded-[50%] bg-emerald-400/20" />
        </div>

        {/* HUD: hearts, score, timer ring */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: MAX_HEARTS }, (_, i) => (
              <motion.span key={i} animate={i < hearts ? { scale: 1 } : { scale: 0.8 }}>
                <Heart className={cn("size-5", i < hearts ? "fill-rose-500 text-rose-500" : "text-white/25")} />
              </motion.span>
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1 text-sm font-black text-amber-300 tabular-nums ring-1 ring-amber-300/25">
              <Star className="size-3.5 fill-current" /> {score}
            </span>
            <span
              className="relative flex size-10 items-center justify-center rounded-full text-xs font-bold text-white tabular-nums"
              style={{ background: `conic-gradient(${urgent ? "#fb7185" : "#5eead4"} ${ringPct}%, rgba(255,255,255,0.12) 0)` }}
            >
              <span className="absolute inset-[3px] rounded-full bg-[#0f1638]" />
              <span className="relative">{timeLeft}</span>
            </span>
          </div>
        </div>

        {/* Meaning card + combo meter */}
        <div className="absolute inset-x-0 top-16 z-20 flex flex-col items-center gap-2 px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.item.id}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full rounded-2xl bg-white px-4 py-2.5 text-center shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]"
            >
              <p className="text-[10px] font-bold tracking-wider text-teal-700 uppercase">Chạm từ có nghĩa</p>
              <p className="text-base font-extrabold text-slate-900">{current.item.meaningVi}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex w-full items-center gap-1.5">
            <Flame className={cn("size-3.5 shrink-0", combo > 0 ? "text-orange-400" : "text-white/30")} />
            {Array.from({ length: COMBO_SEGMENTS }, (_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors duration-300",
                  i < combo % COMBO_SEGMENTS || (combo > 0 && combo % COMBO_SEGMENTS === 0) ? "bg-amber-400" : "bg-white/15"
                )}
              />
            ))}
            <span className={cn("text-[11px] font-bold", multiplier > 1 ? "text-amber-300" : "text-white/40")}>x{multiplier}</span>
          </div>
        </div>

        <AnimatePresence>
          {refilled && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 top-[40%] z-30 text-center text-sm font-bold text-rose-300 [text-shadow:0_2px_6px_rgba(0,0,0,0.6)]"
            >
              Hết tim, được hồi lại 3 tim. Cố lên!
            </motion.p>
          )}
        </AnimatePresence>

        {/* Bubbles: each lane wrapper is as tall as the arena and rises with a
            CSS transform animation (compositor-only); it freezes in place once
            the round is decided. */}
        {current.options.map((option, i) => {
          const lane = LANES[i % LANES.length];
          const skin = SKINS[i % SKINS.length];
          const isAnswer = option.id === current.item.id;
          const gone = popped.has(option.id) || (phase === "pop" && isAnswer);
          const revealed = phase === "reveal" && isAnswer;
          return (
            <div
              key={`${current.item.id}-${option.id}`}
              className={cn("bubble-rise pointer-events-none absolute inset-y-0 z-10 w-0", phase !== "play" && "game-paused")}
              style={{ left: `${lane.x}%`, animationDuration: `${RISE_SECONDS + 1}s`, animationDelay: `${lane.delay}s` }}
            >
              <div className={cn("bubble-sway absolute top-0", phase !== "play" && "game-paused")} style={{ animationDelay: `${i * -1.1}s` }}>
                <motion.button
                  type="button"
                  onClick={(e) => tap(e, option)}
                  disabled={phase !== "play" || gone}
                  aria-label={option.term}
                  className="pointer-events-auto relative -translate-x-1/2 rounded-full focus-visible:ring-4 focus-visible:ring-teal-300/60 focus-visible:outline-none"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={gone ? { scale: 1.45, opacity: 0 } : revealed ? { scale: 1.12, opacity: 1 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: gone ? 0.22 : 0.3 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <span
                    className={cn(
                      "relative flex size-24 items-center justify-center rounded-full p-3 text-center text-sm leading-tight font-extrabold text-white sm:size-28 sm:text-[15px]",
                      revealed && "ring-4 ring-emerald-300/80"
                    )}
                    style={{
                      background: revealed
                        ? "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85), rgba(255,255,255,0.12) 30%, transparent 55%), rgba(52,211,153,0.75)"
                        : `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85), rgba(255,255,255,0.12) 30%, transparent 55%), ${skin.tint}`,
                      boxShadow: `inset 0 0 0 2px ${revealed ? "rgba(167,243,208,0.95)" : skin.rim}, inset -8px -12px 20px rgba(0,0,0,0.22)`,
                    }}
                  >
                    <span className="relative break-words [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">{option.term}</span>
                  </span>
                </motion.button>
              </div>
            </div>
          );
        })}

        {/* Pop burst + points (one-shot) */}
        <AnimatePresence>
          {burst && (
            <div key={burst.key} className="pointer-events-none absolute z-30" style={{ left: burst.x, top: burst.y }}>
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                return (
                  <motion.span
                    key={i}
                    className={cn("absolute size-2 rounded-full", burst.good ? (i % 2 ? "bg-teal-200" : "bg-white") : "bg-rose-400")}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{ x: Math.cos(angle) * 60, y: Math.sin(angle) * 60, opacity: 0, scale: 0.4 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                );
              })}
              {burst.text && (
                <motion.span
                  className="absolute -translate-x-1/2 text-2xl font-black text-amber-300 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]"
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: -46, opacity: 0 }}
                  transition={{ duration: 0.85 }}
                  onAnimationComplete={() => setBurst(null)}
                >
                  {burst.text}
                </motion.span>
              )}
            </div>
          )}
        </AnimatePresence>

        {/* Progress */}
        <div className="absolute inset-x-6 bottom-3 z-20 flex items-center gap-2 text-[11px] font-semibold text-white/70">
          <span className="tabular-nums">
            {index + 1}/{total}
          </span>
          <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <span
              className="block h-full rounded-full bg-gradient-to-r from-teal-300 to-sky-400 transition-[width] duration-500"
              style={{ width: `${(index / total) * 100}%` }}
            />
          </span>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Chạm bong bóng mang từ đúng trước khi nó bay mất. Trúng liên tiếp {COMBO_SEGMENTS} lần để nhân điểm.
      </p>
    </div>
  );
}
