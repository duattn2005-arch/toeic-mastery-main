"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Rocket, Star, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ConfettiBurst } from "@/components/shared/confetti-burst";
import { cn } from "@/lib/utils";
import { buildBlast, type BlastQuestion, type StudyItem } from "@/lib/services/study-game";
import type { ReviewRating } from "@/lib/services/spaced-repetition";

const SECONDS_PER_WORD = 12;
const NEXT_DELAY_MS = 750;
const REVEAL_DELAY_MS = 1300;

/** Where the asteroids float (percent of the arena) — one per option. */
const SLOTS = [
  { x: 23, y: 30 },
  { x: 77, y: 28 },
  { x: 27, y: 76 },
  { x: 73, y: 77 },
];
const CANNON = { x: 50, y: 53 };

/** Decorative corner planets, the cute "crew" around the arena. */
const PLANETS = [
  { className: "left-[3%] top-[6%]", color: "from-fuchsia-400 to-purple-600", face: "◕ᴗ◕" },
  { className: "right-[3%] top-[6%]", color: "from-sky-300 to-cyan-500", face: "•ᴥ•" },
  { className: "left-[3%] bottom-[6%]", color: "from-emerald-300 to-teal-500", face: "ᵔᴗᵔ" },
  { className: "right-[3%] bottom-[6%]", color: "from-orange-300 to-rose-500", face: "^ᴗ^" },
];

const STARS = Array.from({ length: 36 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 61) % 100,
  size: i % 5 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5,
  delay: (i % 7) * 0.4,
}));

type Phase = "aim" | "hit" | "reveal";

/** Blast: the Vietnamese meaning is the target, the asteroids carry English
 * terms — tap the right one to blast it before the timer runs out. Every
 * word in `items` gets its own round. First-try hit -> GOOD ("Nhớ rồi");
 * a wrong shot or a timeout -> AGAIN ("Đang học"), same SRS rule as QuizMode. */
export function BlastGame({
  items,
  onFinish,
  onItemResult,
  distractorPool,
}: {
  items: StudyItem[];
  /** Wider word list for the decoy asteroids (defaults to `items`). */
  distractorPool?: StudyItem[];
  onFinish: () => void;
  onItemResult?: (itemId: string, rating: ReviewRating) => void | Promise<void>;
}) {
  const [questions] = React.useState<BlastQuestion[]>(() => buildBlast(items, distractorPool));
  const [index, setIndex] = React.useState(0);
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
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <ConfettiBurst />
        <span className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-400 to-indigo-500 text-white shadow-lg">
          <Rocket className="size-8" />
        </span>
        <div>
          <p className="text-2xl font-bold">Dọn sạch thiên thạch!</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Bắn trúng ngay {firstTry}/{total} từ · Combo dài nhất x{bestCombo}
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

  const target = laserTo === null ? null : SLOTS[laserTo];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full max-w-3xl">
        <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Từ {index + 1}/{total}
          </span>
          <span className="flex items-center gap-3">
            {combo > 1 && (
              <span className="flex items-center gap-1 font-semibold text-orange-500">
                <Flame className="size-3.5" /> Combo x{combo}
              </span>
            )}
            <span className="flex items-center gap-1 font-semibold text-amber-500">
              <Star className="size-3.5 fill-current" /> {score}
            </span>
          </span>
        </div>
        <Progress value={(index / total) * 100} className="h-1.5" />
      </div>

      <div className="relative aspect-[4/5] w-full max-w-3xl overflow-hidden rounded-3xl border border-indigo-400/20 bg-[radial-gradient(ellipse_at_center,#2b2470_0%,#16123f_55%,#0b0a24_100%)] shadow-2xl sm:aspect-[16/10]">
        {STARS.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: s.delay }}
          />
        ))}

        {PLANETS.map((p) => (
          <motion.div
            key={p.className}
            className={cn(
              "absolute hidden size-14 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white/90 shadow-[0_0_24px_rgba(255,255,255,0.25)] ring-4 ring-white/10 sm:flex",
              p.color,
              p.className
            )}
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            {p.face}
          </motion.div>
        ))}

        {/* The prompt: the meaning to hunt for. */}
        <div className="absolute inset-x-0 top-3 z-20 flex justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.item.id}
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              className="max-w-[90%] rounded-2xl bg-white/95 px-4 py-2 text-center shadow-lg"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-indigo-500">Bắn từ có nghĩa là</p>
              <p className="text-sm font-bold text-slate-900 sm:text-base">{current.item.meaningVi}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Laser */}
        <svg className="pointer-events-none absolute inset-0 z-10 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {target && (
            <motion.line
              key={shotKey}
              x1={CANNON.x}
              y1={CANNON.y}
              x2={target.x}
              y2={target.y}
              stroke={phase === "hit" ? "#67e8f9" : "#fb7185"}
              strokeWidth={3}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ filter: "drop-shadow(0 0 6px #67e8f9)" }}
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: 1, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          )}
        </svg>

        {/* Cannon: a cute round ship with a spinning dashed shield. */}
        <div
          className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={{ left: `${CANNON.x}%`, top: `${CANNON.y}%` }}
        >
          <motion.span
            className="absolute size-24 rounded-full border-2 border-dashed border-cyan-300/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            key={shotKey}
            className="relative flex size-14 flex-col items-center justify-center rounded-full bg-gradient-to-br from-cyan-200 to-indigo-400 text-xs font-bold text-indigo-950 shadow-[0_0_30px_rgba(103,232,249,0.6)]"
            animate={{ scale: [1, 0.88, 1] }}
            transition={{ duration: 0.25 }}
          >
            {phase === "hit" ? "^ᴗ^" : phase === "reveal" ? "ಥ_ಥ" : wrongThisWord ? "•︵•" : "•ᴗ•"}
          </motion.span>
          <span
            className={cn(
              "absolute -bottom-9 flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums",
              timeLeft <= 3 ? "bg-rose-500 text-white" : "bg-white/15 text-white"
            )}
          >
            <Timer className="size-3" /> {timeLeft}s
          </span>
        </div>

        {/* Asteroids */}
        <AnimatePresence>
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
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  exploded
                    ? { scale: 1.6, opacity: 0 }
                    : wrongShot
                      ? { scale: 0.92, opacity: 0.45, x: [0, -8, 8, -5, 5, 0] }
                      : { scale: 1, opacity: 1, y: [0, -7, 0] }
                }
                exit={{ scale: 0, opacity: 0 }}
                transition={
                  exploded
                    ? { duration: 0.4 }
                    : wrongShot
                      ? { duration: 0.4 }
                      : { y: { duration: 2.6 + slot * 0.35, repeat: Infinity, ease: "easeInOut" }, default: { type: "spring", stiffness: 260, damping: 18, delay: slot * 0.06 } }
                }
                whileHover={phase === "aim" && !wrongShot ? { scale: 1.08 } : undefined}
                whileTap={phase === "aim" && !wrongShot ? { scale: 0.94 } : undefined}
              >
                <span
                  className={cn(
                    "relative flex size-24 items-center justify-center rounded-[46%_54%_50%_50%/52%_46%_54%_48%] p-3 text-center text-xs font-bold leading-tight text-white shadow-[inset_-8px_-10px_0_rgba(0,0,0,0.25),0_0_22px_rgba(139,92,246,0.45)] sm:size-32 sm:text-sm",
                    revealed
                      ? "bg-gradient-to-br from-emerald-300 to-emerald-600 ring-4 ring-emerald-300/70"
                      : wrongShot
                        ? "bg-gradient-to-br from-rose-400 to-rose-700"
                        : "bg-gradient-to-br from-violet-400 to-indigo-700"
                  )}
                >
                  <span className="absolute left-[18%] top-[22%] size-3 rounded-full bg-black/15" />
                  <span className="absolute bottom-[20%] right-[22%] size-4 rounded-full bg-black/15" />
                  <span className="absolute right-[30%] top-[16%] size-2 rounded-full bg-black/10" />
                  <span className="relative break-words drop-shadow">{option.term}</span>
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {/* Explosion sparks + score pop */}
        <AnimatePresence>
          {phase === "hit" && laserTo !== null && (
            <div
              key={`boom-${shotKey}`}
              className="pointer-events-none absolute z-20"
              style={{ left: `${SLOTS[laserTo].x}%`, top: `${SLOTS[laserTo].y}%` }}
            >
              {Array.from({ length: 10 }, (_, i) => {
                const angle = (i / 10) * Math.PI * 2;
                return (
                  <motion.span
                    key={i}
                    className={cn("absolute size-2.5 rounded-full", i % 2 ? "bg-amber-300" : "bg-cyan-300")}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ x: Math.cos(angle) * 70, y: Math.sin(angle) * 70, opacity: 0, scale: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
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
              className="pointer-events-none absolute z-30 -translate-x-1/2 text-xl font-black text-amber-300 drop-shadow"
              style={{ left: `${SLOTS[floater.slot].x}%`, top: `${SLOTS[floater.slot].y}%` }}
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.9 }}
              onAnimationComplete={() => setFloater(null)}
            >
              {floater.text}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <p className="text-xs text-muted-foreground">
        Chạm vào thiên thạch mang từ đúng · bắn trúng ngay lần đầu được cộng combo và thời gian còn lại
      </p>
    </div>
  );
}
