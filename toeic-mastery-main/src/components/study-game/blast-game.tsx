"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Rocket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfettiBurst } from "@/components/shared/confetti-burst";
import { cn } from "@/lib/utils";
import { useAutoFinish } from "@/components/study-game/use-auto-finish";
import { useGameFeedback } from "@/hooks/use-game-feedback";
import { GameStarfield } from "@/components/study-game/game-starfield";
import { buildBlast, type BlastQuestion, type StudyItem } from "@/lib/services/study-game";
import type { ReviewRating } from "@/lib/services/spaced-repetition";

const SECONDS_PER_WORD = 12;
const NEXT_DELAY_MS = 750;
const REVEAL_DELAY_MS = 1300;

/** Where the asteroids float (percent of the arena), one per option. Kept
 * clear of the edges so a phone-size asteroid is never clipped. */
const SLOTS = [
  { x: 25, y: 37 },
  { x: 75, y: 35 },
  { x: 27, y: 78 },
  { x: 73, y: 79 },
];
const SHIP = { x: 50, y: 58 };

/** Asteroid skins: same rock, different mineral tint, so the four targets
 * read as distinct without being a rainbow. */
const ROCKS = [
  "from-indigo-300 via-indigo-500 to-indigo-800",
  "from-sky-300 via-sky-500 to-blue-800",
  "from-violet-300 via-violet-500 to-purple-800",
  "from-teal-200 via-teal-500 to-cyan-800",
];

const RING_R = 46;
const RING_C = 2 * Math.PI * RING_R;

type Phase = "aim" | "hit" | "reveal";

/** Blast: the Vietnamese meaning is the target, the asteroids carry English
 * terms. Tap the right one to blast it before the timer runs out. Every
 * word in `items` gets its own round. First-try hit -> GOOD ("Nhớ rồi");
 * a wrong shot or a timeout -> AGAIN ("Đang học"), same SRS rule as QuizMode. */
export function BlastGame({
  items,
  onFinish,
  onItemResult,
  autoAdvance = false,
  distractorPool,
}: {
  items: StudyItem[];
  /** Wider word list for the decoy asteroids (defaults to `items`). */
  distractorPool?: StudyItem[];
  onFinish: () => void;
  onItemResult?: (itemId: string, rating: ReviewRating) => void | Promise<void>;
  /** Go straight on when done (the study flow), instead of a summary. */
  autoAdvance?: boolean;
}) {
  const [questions] = React.useState<BlastQuestion[]>(() => buildBlast(items, distractorPool));
  const [index, setIndex] = React.useState(0);
  const feedback = useGameFeedback(items);
  const [phase, setPhase] = React.useState<Phase>("aim");
  const [missed, setMissed] = React.useState<Set<string>>(new Set());
  const [laserTo, setLaserTo] = React.useState<number | null>(null);
  const [shotKey, setShotKey] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(SECONDS_PER_WORD);
  const [score, setScore] = React.useState(0);
  const [combo, setCombo] = React.useState(0);
  const [bestCombo, setBestCombo] = React.useState(0);
  const [firstTry, setFirstTry] = React.useState(0);
  const [floater, setFloater] = React.useState<{ key: number; text: string; slot: number } | null>(null);

  const total = questions.length;
  const done = index >= total;
  useAutoFinish(done && autoAdvance, onFinish);
  const current = questions[index];
  const wrongThisWord = current ? missed.has(current.item.id) : false;

  const goNext = React.useCallback((delay: number) => {
    setTimeout(() => {
      setIndex((i) => i + 1);
      setPhase("aim");
      setLaserTo(null);
      setTimeLeft(SECONDS_PER_WORD);
    }, delay);
  }, []);

  // Countdown; running out reveals the right asteroid and counts as a miss.
  React.useEffect(() => {
    if (done || phase !== "aim") return;
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

  function shoot(slot: number, option: StudyItem) {
    if (phase !== "aim" || missed.has(`${current.item.id}:${option.id}`)) return;
    setLaserTo(slot);
    setShotKey((k) => k + 1);
    if (option.id === current.item.id) feedback.correct(current.item);
    else feedback.wrong();

    if (option.id === current.item.id) {
      const clean = !wrongThisWord;
      const nextCombo = clean ? combo + 1 : 0;
      const gained = clean ? 10 + Math.min(nextCombo - 1, 5) * 2 + timeLeft : 3;
      setPhase("hit");
      setScore((s) => s + gained);
      setCombo(nextCombo);
      setBestCombo((b) => Math.max(b, nextCombo));
      if (clean) setFirstTry((n) => n + 1);
      setFloater({ key: shotKey + 1, text: `+${gained}`, slot });
      void onItemResult?.(current.item.id, clean ? "GOOD" : "AGAIN");
      goNext(NEXT_DELAY_MS);
    } else {
      setCombo(0);
      setMissed((prev) => new Set(prev).add(current.item.id).add(`${current.item.id}:${option.id}`));
    }
  }

  if (done) {
    if (autoAdvance) return null;
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <ConfettiBurst />
        <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 text-white shadow-lg">
          <Rocket className="size-8" />
        </span>
        <div>
          <p className="text-2xl font-extrabold">Dọn sạch thiên thạch!</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Bắn trúng ngay {firstTry}/{total} từ, combo dài nhất x{bestCombo}
          </p>
        </div>
        <p className="flex items-center gap-1.5 rounded-full bg-amber-400/15 px-4 py-1.5 text-lg font-bold text-amber-500">
          <Star className="size-5 fill-current" /> {score} điểm
        </p>
        <Button type="button" onClick={onFinish} className="rounded-full px-6">
          Xong
        </Button>
      </div>
    );
  }

  const target = laserTo === null ? null : SLOTS[laserTo];
  const urgent = timeLeft <= 3;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative isolate aspect-[4/5] w-full max-w-3xl overflow-hidden rounded-[2rem] bg-[#0a0b24] shadow-[0_24px_60px_-24px_rgba(10,11,36,0.8)] ring-1 ring-white/10 sm:aspect-[16/10]">
        <GameStarfield nebula={["rgba(45,212,191,0.22)", "rgba(99,102,241,0.3)"]} />

        {/* HUD */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 px-4 pt-3 sm:px-5 sm:pt-4">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/85 tabular-nums ring-1 ring-white/10">
            {index + 1}/{total}
          </span>
          <div className="flex items-center gap-2">
            {combo > 1 && (
              <span className="flex items-center gap-1 rounded-full bg-orange-500/20 px-2.5 py-1 text-xs font-bold text-orange-300 ring-1 ring-orange-400/30">
                <Flame className="size-3.5" /> x{combo}
              </span>
            )}
            <span className="flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-extrabold text-amber-300 tabular-nums ring-1 ring-amber-300/25">
              <Star className="size-3.5 fill-current" /> {score}
            </span>
          </div>
        </div>
        <div className="absolute inset-x-4 top-[3.25rem] z-20 h-1 overflow-hidden rounded-full bg-white/10 sm:inset-x-5">
          <div className="h-full rounded-full bg-gradient-to-r from-teal-300 to-sky-400 transition-[width] duration-500" style={{ width: `${(index / total) * 100}%` }} />
        </div>

        {/* The prompt: the meaning to hunt for */}
        <div className="absolute inset-x-0 top-[4.25rem] z-20 flex justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.item.id}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-[88%] rounded-2xl bg-white px-5 py-2.5 text-center shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]"
            >
              <p className="text-[10px] font-bold tracking-wider text-teal-700 uppercase">Bắn từ có nghĩa</p>
              <p className="text-base font-extrabold text-slate-900 sm:text-lg">{current.item.meaningVi}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Laser: a soft wide glow under a bright core, no SVG filters */}
        <svg className="pointer-events-none absolute inset-0 z-10 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {target && (
            <g key={shotKey}>
              {[
                { w: 10, color: phase === "hit" ? "rgba(94,234,212,0.35)" : "rgba(251,113,133,0.35)" },
                { w: 3, color: phase === "hit" ? "#ccfbf1" : "#fecdd3" },
              ].map((l) => (
                <motion.line
                  key={l.w}
                  x1={SHIP.x}
                  y1={SHIP.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={l.color}
                  strokeWidth={l.w}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              ))}
            </g>
          )}
        </svg>

        {/* Ship with the countdown ring around it */}
        <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: `${SHIP.x}%`, top: `${SHIP.y}%` }}>
          <svg width={108} height={108} viewBox="0 0 108 108" className="-rotate-90" aria-hidden>
            <circle cx={54} cy={54} r={RING_R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={5} />
            <circle
              cx={54}
              cy={54}
              r={RING_R}
              fill="none"
              stroke={urgent ? "#fb7185" : "#5eead4"}
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C * (1 - timeLeft / SECONDS_PER_WORD)}
              // A short step per second: a 1s linear transition would repaint the
              // SVG on every frame for the whole round.
              style={{ transition: "stroke-dashoffset 0.35s ease-out, stroke 0.3s" }}
            />
          </svg>
          <motion.span
            key={shotKey}
            className="absolute inset-[17px] flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-teal-200 to-sky-500 text-indigo-950 shadow-[0_0_26px_rgba(94,234,212,0.45)]"
            animate={{ scale: [1, 0.9, 1] }}
            transition={{ duration: 0.22 }}
          >
            <Rocket className="size-5" strokeWidth={2.25} />
            <span className={cn("text-[11px] font-black tabular-nums", urgent && "text-rose-700")}>{timeLeft}s</span>
          </motion.span>
        </div>

        {/* Asteroids */}
        {current.options.map((option, slot) => {
          const pos = SLOTS[slot];
          const isAnswer = option.id === current.item.id;
          const wrongShot = missed.has(`${current.item.id}:${option.id}`);
          const exploded = phase === "hit" && isAnswer;
          const revealed = phase === "reveal" && isAnswer;
          return (
            <motion.button
              key={`${current.item.id}-${option.id}`}
              type="button"
              onClick={() => shoot(slot, option)}
              disabled={phase !== "aim" || wrongShot}
              aria-label={option.term}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:ring-4 focus-visible:ring-teal-300/60 focus-visible:outline-none"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={
                exploded
                  ? { scale: 1.5, opacity: 0 }
                  : wrongShot
                    ? { scale: 0.9, opacity: 0.55, x: [0, -8, 8, -5, 5, 0] }
                    : { scale: 1, opacity: 1 }
              }
              transition={
                exploded || wrongShot ? { duration: 0.35 } : { type: "spring", stiffness: 300, damping: 22, delay: slot * 0.05 }
              }
              whileHover={phase === "aim" && !wrongShot ? { scale: 1.06 } : undefined}
              whileTap={phase === "aim" && !wrongShot ? { scale: 0.94 } : undefined}
            >
              <span className="asteroid-float block" style={{ animationDelay: `${slot * -0.7}s`, animationDuration: `${3 + slot * 0.4}s` }}>
                <span
                  className={cn(
                    "relative flex size-[5.5rem] items-center justify-center rounded-[47%_53%_49%_51%/52%_47%_53%_48%] bg-gradient-to-br p-3 text-center text-xs leading-tight font-extrabold text-white shadow-[inset_-9px_-11px_0_rgba(0,0,0,0.28),inset_6px_6px_0_rgba(255,255,255,0.12)] ring-1 ring-white/20 sm:size-32 sm:text-[15px]",
                    revealed ? "from-emerald-200 via-emerald-400 to-emerald-700 ring-4 ring-emerald-300/70" : wrongShot ? "from-rose-300 via-rose-500 to-rose-800" : ROCKS[slot]
                  )}
                >
                  <span className="absolute top-[20%] left-[18%] size-3 rounded-full bg-black/15" />
                  <span className="absolute right-[20%] bottom-[18%] size-4 rounded-full bg-black/15" />
                  <span className="relative break-words [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">{option.term}</span>
                </span>
              </span>
            </motion.button>
          );
        })}

        {/* Hit: shockwave ring, sparks and the score pop (one-shot effects) */}
        <AnimatePresence>
          {phase === "hit" && laserTo !== null && (
            <div
              key={`boom-${shotKey}`}
              className="pointer-events-none absolute z-20"
              style={{ left: `${SLOTS[laserTo].x}%`, top: `${SLOTS[laserTo].y}%` }}
            >
              <motion.span
                className="absolute -top-12 -left-12 size-24 rounded-full border-4 border-teal-200"
                initial={{ scale: 0.3, opacity: 0.9 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
              {Array.from({ length: 10 }, (_, i) => {
                const angle = (i / 10) * Math.PI * 2;
                return (
                  <motion.span
                    key={i}
                    className={cn("absolute size-2 rounded-full", i % 2 ? "bg-amber-200" : "bg-teal-200")}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{ x: Math.cos(angle) * 72, y: Math.sin(angle) * 72, opacity: 0, scale: 0.4 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                  />
                );
              })}
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {floater && (
            <motion.span
              key={floater.key}
              className="pointer-events-none absolute z-30 -translate-x-1/2 text-2xl font-black text-amber-300 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]"
              style={{ left: `${SLOTS[floater.slot].x}%`, top: `${SLOTS[floater.slot].y}%` }}
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -52, opacity: 0 }}
              transition={{ duration: 0.85 }}
              onAnimationComplete={() => setFloater(null)}
            >
              {floater.text}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Chạm thiên thạch mang từ đúng. Bắn trúng ngay lần đầu được cộng combo và thời gian còn lại.
      </p>
    </div>
  );
}
