"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Hammer, Star, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfettiBurst } from "@/components/shared/confetti-burst";
import { cn } from "@/lib/utils";
import { pronounce } from "@/lib/pronounce";
import { useGameFeedback } from "@/hooks/use-game-feedback";
import { useAutoFinish } from "@/components/study-game/use-auto-finish";
import { buildBlast, type BlastQuestion, type StudyItem } from "@/lib/services/study-game";
import type { ReviewRating } from "@/lib/services/spaced-repetition";

const SECONDS_PER_WORD = 12;
const HOLES = 9;
const MAX_UP = 3;
/** How long a mole stays up, ms (shorter as the round's clock runs down). */
const UP_MS: [number, number] = [1700, 2600];
/** The right mole always shows up again within this long. */
const ANSWER_EVERY_MS = 2200;
const NEXT_DELAY_MS = 800;
const REVEAL_DELAY_MS = 1400;

type Phase = "play" | "hit" | "reveal";
interface Mole {
  hole: number;
  option: number;
  until: number;
  key: number;
}

/** A mole: brown body, pale belly, pink nose; dizzy X eyes once whacked. */
function MoleFace({ dizzy }: { dizzy: boolean }) {
  return (
    <svg viewBox="0 0 80 70" className="block w-full" aria-hidden>
      <path d="M8 70 C8 22 22 4 40 4 C58 4 72 22 72 70 Z" fill="#8a5a3b" />
      <path d="M20 70 C20 40 28 30 40 30 C52 30 60 40 60 70 Z" fill="#b98863" opacity="0.55" />
      {dizzy ? (
        <g stroke="#2b1a10" strokeWidth="3" strokeLinecap="round">
          <path d="M24 20 l8 8 M32 20 l-8 8 M48 20 l8 8 M56 20 l-8 8" />
        </g>
      ) : (
        <g fill="#2b1a10">
          <circle cx="29" cy="24" r="3.6" />
          <circle cx="51" cy="24" r="3.6" />
          <circle cx="30.2" cy="22.8" r="1.1" fill="#fff" />
          <circle cx="52.2" cy="22.8" r="1.1" fill="#fff" />
        </g>
      )}
      <ellipse cx="40" cy="35" rx="11" ry="8" fill="#f4e3d3" />
      <ellipse cx="40" cy="33" rx="5.5" ry="4" fill="#f0775f" />
      <g stroke="#2b1a10" strokeWidth="1" opacity="0.5" strokeLinecap="round">
        <path d="M30 37 h-12 M30 40 l-11 3 M50 37 h12 M50 40 l11 3" />
      </g>
    </svg>
  );
}

/** The capybara peeking over the word sign. */
function Capybara() {
  return (
    <svg viewBox="0 0 160 80" className="block w-full" aria-hidden>
      <path d="M18 80 C18 30 50 10 90 10 C130 10 150 34 150 80 Z" fill="#8d6748" />
      <ellipse cx="44" cy="20" rx="9" ry="11" fill="#5c3f2b" />
      <ellipse cx="128" cy="22" rx="9" ry="11" fill="#5c3f2b" />
      <path d="M58 44 q8 -8 16 0 M100 44 q8 -8 16 0" stroke="#2b1a10" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M78 56 l9 7 l9 -7 Z" fill="#2b1a10" />
      <path d="M87 63 v5 q-5 5 -10 2 M87 68 q5 5 10 2" stroke="#2b1a10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Đập chuột: the English word is on the sign, moles pop out of the holes
 * holding Vietnamese meanings — whack the one with the right meaning before
 * the round's clock runs out. Same SRS rule as the other games: a first-try
 * hit is GOOD, a wrong whack or a timeout is AGAIN. Number keys 1–9 whack
 * the holes too (laid out like a phone keypad). */
export function MoleGame({
  items,
  onFinish,
  onItemResult,
  distractorPool,
  autoAdvance = false,
}: {
  items: StudyItem[];
  distractorPool?: StudyItem[];
  onFinish: () => void;
  onItemResult?: (itemId: string, rating: ReviewRating) => void | Promise<void>;
  /** Go straight on when done (the study flow), instead of a summary. */
  autoAdvance?: boolean;
}) {
  const [questions] = React.useState<BlastQuestion[]>(() => buildBlast(items, distractorPool, 6));
  const [index, setIndex] = React.useState(0);
  const feedback = useGameFeedback(items);
  const [phase, setPhase] = React.useState<Phase>("play");
  const [moles, setMoles] = React.useState<Mole[]>([]);
  const [whacked, setWhacked] = React.useState<{ hole: number; right: boolean; key: number } | null>(null);
  const [wrongOptions, setWrongOptions] = React.useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = React.useState(SECONDS_PER_WORD);
  const [score, setScore] = React.useState(0);
  const [combo, setCombo] = React.useState(0);
  const [bestCombo, setBestCombo] = React.useState(0);
  const [firstTry, setFirstTry] = React.useState(0);
  const lastAnswerAt = React.useRef(0);
  const keyRef = React.useRef(0);

  const total = questions.length;
  const done = index >= total;
  const current = questions[index];
  const answerOption = current ? current.options.findIndex((o) => o.id === current.item.id) : -1;
  useAutoFinish(done && autoAdvance, onFinish);

  // Read the word when its round starts.
  React.useEffect(() => {
    if (current) feedback.correct(current.item);
    lastAnswerAt.current = Date.now();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Moles popping up and down.
  React.useEffect(() => {
    if (done || phase !== "play") return;
    const tick = () => {
      const now = Date.now();
      setMoles((prev) => {
        let next = prev.filter((m) => m.until > now);
        const up = new Set(next.map((m) => m.option));
        while (next.length < MAX_UP) {
          const busy = new Set(next.map((m) => m.hole));
          const free = Array.from({ length: HOLES }, (_, h) => h).filter((h) => !busy.has(h));
          const needAnswer = !up.has(answerOption) && now - lastAnswerAt.current > ANSWER_EVERY_MS;
          const choices = current.options.map((_, i) => i).filter((i) => !up.has(i) && i !== answerOption && !wrongOptions.has(i));
          const option = needAnswer || choices.length === 0 ? answerOption : choices[Math.floor(Math.random() * choices.length)];
          if (up.has(option) || free.length === 0) break;
          if (option === answerOption) lastAnswerAt.current = now;
          up.add(option);
          keyRef.current += 1;
          const stay = UP_MS[0] + Math.random() * (UP_MS[1] - UP_MS[0]);
          next = [...next, { hole: free[Math.floor(Math.random() * free.length)], option, until: now + stay, key: keyRef.current }];
          if (Math.random() < 0.45) break; // stagger, not all at once
        }
        return next;
      });
    };
    tick();
    const id = setInterval(tick, 350);
    return () => clearInterval(id);
  }, [done, phase, current, answerOption, wrongOptions]);

  const goNext = React.useCallback((delay: number) => {
    setTimeout(() => {
      setIndex((i) => i + 1);
      setPhase("play");
      setMoles([]);
      setWhacked(null);
      setWrongOptions(new Set());
      setTimeLeft(SECONDS_PER_WORD);
    }, delay);
  }, []);

  // Round clock; running out shows where the right mole was.
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
      keyRef.current += 1;
      setMoles([{ hole: 4, option: answerOption, until: Date.now() + 10_000, key: keyRef.current }]);
      void onItemResult?.(current.item.id, "AGAIN");
      goNext(REVEAL_DELAY_MS);
    }, 1000);
    return () => clearTimeout(t);
  }, [timeLeft, phase, done, current, answerOption, onItemResult, goNext]);

  function whack(hole: number) {
    if (phase !== "play") return;
    const mole = moles.find((m) => m.hole === hole);
    if (!mole) return;
    keyRef.current += 1;
    if (mole.option === answerOption) {
      const clean = wrongOptions.size === 0;
      const nextCombo = clean ? combo + 1 : 0;
      const gained = clean ? 10 + Math.min(nextCombo - 1, 5) * 2 + timeLeft : 3;
      feedback.correct(current.item);
      setWhacked({ hole, right: true, key: keyRef.current });
      setPhase("hit");
      setScore((s) => s + gained);
      setCombo(nextCombo);
      setBestCombo((b) => Math.max(b, nextCombo));
      if (clean) setFirstTry((n) => n + 1);
      setMoles((prev) => prev.map((m) => (m.hole === hole ? { ...m, until: Date.now() + 10_000 } : m)));
      void onItemResult?.(current.item.id, clean ? "GOOD" : "AGAIN");
      goNext(NEXT_DELAY_MS);
    } else {
      feedback.wrong();
      setCombo(0);
      setWhacked({ hole, right: false, key: keyRef.current });
      setWrongOptions((prev) => new Set(prev).add(mole.option));
      setMoles((prev) => prev.map((m) => (m.hole === hole ? { ...m, until: Date.now() + 450 } : m)));
    }
  }

  // Keys 1–9 like a phone keypad: 7 8 9 top row, 1 2 3 bottom row.
  const whackRef = React.useRef(whack);
  React.useEffect(() => {
    whackRef.current = whack;
  });
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (!Number.isInteger(n) || n < 1 || n > 9) return;
      const row = 2 - Math.floor((n - 1) / 3);
      whackRef.current(row * 3 + ((n - 1) % 3));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (done) {
    if (autoAdvance) return null;
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <ConfettiBurst />
        <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 text-white shadow-lg">
          <Hammer className="size-8" />
        </span>
        <div>
          <p className="text-2xl font-extrabold">Đập chuột hoàn tất!</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Đập trúng ngay {firstTry}/{total} từ, combo dài nhất x{bestCombo}
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

  const urgent = timeLeft <= 3;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative isolate aspect-[2/3] w-full max-w-3xl overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#7cc7f2] via-[#a9dcf7] to-[#d6efe0] shadow-[0_24px_60px_-24px_rgba(30,80,120,0.6)] ring-1 ring-black/5 select-none sm:aspect-[16/11]">
        {/* Clouds */}
        <div className="absolute top-[14%] left-[8%] h-6 w-20 rounded-full bg-white/80 blur-[1px] sm:h-8 sm:w-28" />
        <div className="absolute top-[9%] right-[10%] h-5 w-16 rounded-full bg-white/70 blur-[1px] sm:h-7 sm:w-24" />
        {/* Hills */}
        <div className="absolute inset-x-[-10%] top-[44%] h-[70%] rounded-[50%] bg-[#9ccc72]" />
        <div className="absolute inset-x-[-20%] top-[58%] h-[70%] rounded-[50%] bg-[#79b05a]" />

        {/* HUD */}
        <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-2 p-3 sm:p-4">
          <div className="rounded-2xl border-b-4 border-amber-700/60 bg-amber-300 px-3 py-1 text-center shadow-md">
            <p className="text-[9px] font-black tracking-widest text-amber-900/70">ĐIỂM</p>
            <p className="text-lg leading-tight font-black text-amber-950 tabular-nums">{score}</p>
          </div>
          <div className="flex flex-col items-center gap-1 pt-1">
            <span className="rounded-full bg-white/70 px-2.5 py-0.5 text-[11px] font-bold text-sky-900 tabular-nums">
              {index + 1}/{total}
            </span>
            {combo > 1 && (
              <span className="flex items-center gap-1 rounded-full bg-orange-500 px-2 py-0.5 text-[11px] font-bold text-white">
                <Flame className="size-3" /> x{combo}
              </span>
            )}
          </div>
          <div className={cn("rounded-2xl border-b-4 px-3 py-1 text-center shadow-md", urgent ? "border-rose-800/60 bg-rose-400" : "border-amber-700/60 bg-amber-300")}>
            <p className={cn("text-[9px] font-black tracking-widest", urgent ? "text-rose-950/70" : "text-amber-900/70")}>THỜI GIAN</p>
            <p className={cn("text-lg leading-tight font-black tabular-nums", urgent ? "text-rose-950" : "text-amber-950")}>{timeLeft}s</p>
          </div>
        </div>

        {/* Capybara + word sign */}
        <div className="absolute inset-x-0 top-[9%] z-20 flex flex-col items-center sm:top-[6%]">
          <div className="w-[34%] max-w-[180px] sm:w-[22%]">
            <Capybara />
          </div>
          <AnimatePresence mode="wait">
            <motion.button
              key={current.item.id}
              type="button"
              onClick={() => pronounce(current.item.term, current.item.audioUrl)}
              initial={{ y: -8, opacity: 0, rotate: -2 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="-mt-1 min-w-[60%] rounded-2xl border-4 border-[#8d6748] bg-[#fff4d6] px-5 py-2 text-center shadow-[0_6px_0_#6b4b33] sm:min-w-[44%]"
            >
              <span className="flex items-center justify-center gap-1 text-[10px] font-black tracking-widest text-[#8d6748]">
                <Volume2 className="size-3.5" /> TỪ:
              </span>
              <span className="block text-xl font-black text-[#4a3222] sm:text-2xl">{current.item.term}</span>
            </motion.button>
          </AnimatePresence>
        </div>

        {/* Holes 3x3 */}
        <div className="absolute inset-x-[2%] bottom-[3%] top-[44%] z-10 grid grid-cols-3 grid-rows-3 sm:top-[42%]">
          {Array.from({ length: HOLES }, (_, hole) => {
            const mole = moles.find((m) => m.hole === hole);
            const option = mole ? current.options[mole.option] : null;
            const hit = whacked?.hole === hole ? whacked : null;
            const revealed = phase === "reveal" && mole?.option === answerOption;
            return (
              <button
                key={hole}
                type="button"
                onClick={() => whack(hole)}
                aria-label={option ? option.meaningVi : `Hang ${hole + 1}`}
                className="relative flex items-end justify-center outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
              >
                {/* The mole rises out of this clipped well, cut off inside the dark
                    of the hole (above the rim, so its sign is never hidden) */}
                <div className="absolute inset-x-[6%] bottom-[22%] top-0 z-20 overflow-hidden">
                  <AnimatePresence>
                    {mole && option && (
                      <motion.div
                        key={mole.key}
                        className="absolute inset-x-0 bottom-0 flex flex-col items-center"
                        initial={{ y: "105%" }}
                        animate={hit && !hit.right ? { y: ["0%", "6%", "0%"], x: [0, -5, 5, 0] } : { y: "0%" }}
                        exit={{ y: "105%" }}
                        transition={{ type: "spring", stiffness: 420, damping: 28 }}
                      >
                        <div className="relative w-[58%] max-w-[96px]">
                          <MoleFace dizzy={Boolean(hit?.right)} />
                        </div>
                        <div
                          className={cn(
                            "relative -mt-[16%] max-w-[94%] rounded-xl border-[3px] px-2 py-1 text-center text-[10px] leading-tight font-black shadow-[0_3px_0_rgba(0,0,0,0.18)] sm:text-[13px]",
                            hit?.right || revealed
                              ? "rotate-[-4deg] border-emerald-600 bg-emerald-50 text-emerald-800"
                              : hit && !hit.right
                                ? "border-rose-500 bg-rose-50 text-rose-700"
                                : "border-[#8d6748] bg-[#fff4d6] text-[#4a3222]"
                          )}
                        >
                          {option.meaningVi}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* Hole + dirt rim with grass */}
                <div className="relative z-10 mb-[4%] h-[28%] w-[88%]">
                  <div className="absolute inset-x-[8%] top-0 bottom-[35%] rounded-[50%] bg-[#3e2516] shadow-[inset_0_6px_10px_rgba(0,0,0,0.5)]" />
                  <div className="absolute inset-x-0 top-[38%] bottom-0 rounded-[50%] bg-[#7b4b2b]" />
                  <div className="absolute inset-x-[10%] top-[52%] bottom-[18%] rounded-[50%] bg-[#94603a]" />
                  <span className="absolute bottom-[10%] left-[4%] h-3 w-1 rotate-[-15deg] rounded-full bg-[#4f9a3a]" />
                  <span className="absolute right-[6%] bottom-[12%] h-3 w-1 rotate-[12deg] rounded-full bg-[#4f9a3a]" />
                </div>
                <AnimatePresence>
                  {hit?.right && (
                    <motion.span
                      key={hit.key}
                      className="absolute top-[18%] right-[4%] z-20 flex items-center gap-1 rounded-full border-2 border-white bg-emerald-600 px-2 py-0.5 text-xs font-black text-white shadow-lg sm:text-sm"
                      initial={{ scale: 0.4, opacity: 0, y: 6 }}
                      animate={{ scale: 1, opacity: 1, y: -6 }}
                      exit={{ opacity: 0 }}
                    >
                      <Star className="size-3.5 fill-amber-300 text-amber-300" /> +10
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className="absolute bottom-0 left-1/2 z-20 hidden -translate-x-1/2 rounded bg-black/25 px-1 text-[9px] font-bold text-white/80 sm:block">
                  {[7, 8, 9, 4, 5, 6, 1, 2, 3][hole]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Đập chú chuột cầm đúng nghĩa của từ trên bảng. Trên máy tính có thể bấm phím số 1–9 theo vị trí hang.
      </p>
    </div>
  );
}
