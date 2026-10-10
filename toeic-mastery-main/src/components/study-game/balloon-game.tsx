"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfettiBurst } from "@/components/shared/confetti-burst";
import { cn } from "@/lib/utils";
import { buildBlast, type BlastQuestion, type StudyItem } from "@/lib/services/study-game";
import type { ReviewRating } from "@/lib/services/spaced-repetition";

/** Seconds a bubble takes to float from the bottom to off the top. */
const RISE_SECONDS = 9;
const OPTIONS = 3;
const MAX_HEARTS = 3;
const COMBO_SEGMENTS = 5;
const NEXT_DELAY_MS = 700;
const REVEAL_DELAY_MS = 1300;

/** Glossy bubble skins (base gradient + glow), one per lane. */
const SKINS = [
  { fill: "from-fuchsia-400 via-purple-500 to-indigo-700", glow: "rgba(192,132,252,0.55)" },
  { fill: "from-emerald-300 via-teal-500 to-emerald-700", glow: "rgba(52,211,153,0.5)" },
  { fill: "from-amber-300 via-orange-400 to-rose-600", glow: "rgba(251,146,60,0.5)" },
];

/** Lanes (percent from the left) and start delays, so bubbles don't overlap. */
const LANES = [
  { x: 22, delay: 0 },
  { x: 50, delay: 0.9 },
  { x: 78, delay: 0.45 },
];

/** Soft light specks drifting in the background. */
const BOKEH = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 47) % 100,
  top: (i * 29) % 100,
  size: 3 + (i % 4) * 2,
  delay: (i % 6) * 0.5,
}));

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
        <span className="relative flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-400 via-purple-500 to-indigo-600 text-2xl shadow-[0_0_30px_rgba(192,132,252,0.6)]">
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

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={arenaRef}
        className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(ellipse_at_top,#4c2a9a_0%,#2a1766_45%,#150b3a_100%)] shadow-2xl sm:aspect-[4/5]"
      >
        {BOKEH.map((b, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/70 blur-[1px]"
            style={{ left: `${b.left}%`, top: `${b.top}%`, width: b.size, height: b.size }}
            animate={{ opacity: [0.15, 0.7, 0.15], y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: b.delay }}
          />
        ))}

        {/* HUD: hearts · score + timer ring */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: MAX_HEARTS }, (_, i) => (
              <motion.span key={i} animate={i < hearts ? { scale: 1 } : { scale: 0.8 }}>
                <Heart className={cn("size-5", i < hearts ? "fill-rose-500 text-rose-500 drop-shadow" : "text-white/25")} />
              </motion.span>
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-xl font-black tabular-nums text-white drop-shadow">{score}</span>
            <span
              className="relative flex size-10 items-center justify-center rounded-full text-xs font-bold tabular-nums text-white"
              style={{ background: `conic-gradient(${timeLeft <= 3 ? "#fb7185" : "#60a5fa"} ${ringPct}%, rgba(255,255,255,0.12) 0)` }}
            >
              <span className="absolute inset-[3px] rounded-full bg-[#21124f]" />
              <span className="relative">{timeLeft}</span>
            </span>
          </div>
        </div>

        {/* Meaning card + combo meter */}
        <div className="absolute inset-x-0 top-16 z-20 flex flex-col items-center gap-2 px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.item.id}
              initial={{ y: -12, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -12, opacity: 0 }}
              className="w-full rounded-2xl bg-gradient-to-r from-violet-500/90 to-fuchsia-500/90 px-4 py-2.5 text-center shadow-lg ring-1 ring-white/20"
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/70">Nghĩa</p>
              <p className="text-sm font-bold text-white sm:text-base">{current.item.meaningVi}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex w-full items-center gap-1.5">
            <Flame className={cn("size-3.5 shrink-0", combo > 0 ? "text-orange-400" : "text-white/30")} />
            {Array.from({ length: COMBO_SEGMENTS }, (_, i) => (
              <span
                key={i}
                className={cn("h-1.5 flex-1 rounded-full transition-colors", i < combo % COMBO_SEGMENTS || (combo > 0 && combo % COMBO_SEGMENTS === 0) ? "bg-amber-400" : "bg-white/15")}
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
              className="absolute inset-x-0 top-[38%] z-30 text-center text-sm font-bold text-rose-300 drop-shadow"
            >
              Hết tim — được hồi lại 3 tim, cố lên!
            </motion.p>
          )}
        </AnimatePresence>

        {/* Bubbles */}
        {current.options.map((option, i) => {
          const lane = LANES[i % LANES.length];
          const skin = SKINS[i % SKINS.length];
          const isAnswer = option.id === current.item.id;
          const gone = popped.has(option.id) || (phase === "pop" && isAnswer);
          const revealed = phase === "reveal" && isAnswer;
          return (
            <motion.button
              key={`${current.item.id}-${option.id}`}
              type="button"
              onClick={(e) => tap(e, option)}
              disabled={phase !== "play" || gone}
              className="absolute z-10 -translate-x-1/2 focus-visible:outline-none"
              style={{ left: `${lane.x}%` }}
              initial={{ top: "102%", opacity: 0 }}
              animate={
                gone
                  ? { scale: 1.5, opacity: 0 }
                  : revealed
                    ? { scale: 1.12, opacity: 1 }
                    : { top: "-30%", opacity: 1, x: [0, 10, -8, 6, 0] }
              }
              transition={
                gone
                  ? { duration: 0.25 }
                  : revealed
                    ? { duration: 0.3 }
                    : {
                        top: { duration: RISE_SECONDS + 1, ease: "linear", delay: lane.delay },
                        opacity: { duration: 0.4, delay: lane.delay },
                        x: { duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
                      }
              }
              whileTap={{ scale: 0.92 }}
            >
              <span
                className={cn(
                  "relative flex size-24 items-center justify-center rounded-full bg-gradient-to-br p-3 text-center text-xs font-bold leading-tight text-white ring-1 ring-white/40 sm:size-28 sm:text-sm",
                  revealed ? "from-emerald-300 to-emerald-600 ring-4 ring-emerald-200/70" : skin.fill
                )}
                style={{ boxShadow: `inset -6px -10px 18px rgba(0,0,0,0.25), inset 6px 8px 14px rgba(255,255,255,0.25), 0 0 26px ${skin.glow}` }}
              >
                {/* glossy highlights */}
                <span className="absolute left-[18%] top-[14%] h-[22%] w-[30%] -rotate-[30deg] rounded-full bg-white/70 blur-[1px]" />
                <span className="absolute bottom-[18%] right-[20%] size-2 rounded-full bg-white/50" />
                {/* sparkles */}
                <span className="absolute -left-1 top-3 text-[10px] text-white/90">✦</span>
                <span className="absolute -right-1 bottom-5 text-xs text-white/80">✧</span>
                <span className="relative break-words drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{option.term}</span>
              </span>
            </motion.button>
          );
        })}

        {/* Pop burst + points */}
        <AnimatePresence>
          {burst && (
            <div key={burst.key} className="pointer-events-none absolute z-30" style={{ left: burst.x, top: burst.y }}>
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                return (
                  <motion.span
                    key={i}
                    className={cn("absolute size-2 rounded-full", burst.good ? (i % 2 ? "bg-amber-200" : "bg-white") : "bg-rose-400")}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{ x: Math.cos(angle) * 60, y: Math.sin(angle) * 60, opacity: 0, scale: 0.4 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                  />
                );
              })}
              {burst.text && (
                <motion.span
                  className="absolute -translate-x-1/2 text-xl font-black text-amber-300 drop-shadow"
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: -46, opacity: 0 }}
                  transition={{ duration: 0.9 }}
                  onAnimationComplete={() => setBurst(null)}
                >
                  {burst.text}
                </motion.span>
              )}
            </div>
          )}
        </AnimatePresence>

        {/* progress */}
        <div className="absolute inset-x-6 bottom-3 z-20 flex items-center gap-2 text-[11px] font-medium text-white/60">
          <span>
            {index + 1}/{total}
          </span>
          <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full rounded-full bg-gradient-to-r from-fuchsia-400 to-sky-400" style={{ width: `${(index / total) * 100}%` }} />
          </span>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Chạm vào bong bóng mang từ đúng trước khi nó bay mất · trúng liên tiếp {COMBO_SEGMENTS} lần để nhân đôi điểm
      </p>
    </div>
  );
}
