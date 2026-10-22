"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pickaxe, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfettiBurst } from "@/components/shared/confetti-burst";
import { cn } from "@/lib/utils";
import { useGameFeedback } from "@/hooks/use-game-feedback";
import { useAutoFinish } from "@/components/study-game/use-auto-finish";
import { buildBlast, type BlastQuestion, type StudyItem } from "@/lib/services/study-game";
import type { ReviewRating } from "@/lib/services/spaced-repetition";

const SECONDS_PER_WORD = 20;
const WRONG_PENALTY_S = 3;
const CLOCK_BONUS_S = 4;
const NEXT_DELAY_MS = 900;
const REVEAL_DELAY_MS = 1500;
/** Claw pivot, as a fraction of the arena. */
const PIVOT = { x: 0.5, y: 0.23 };
const MAX_SWING = (68 * Math.PI) / 180;

type Kind = "big" | "small" | "diamond" | "rock" | "clock";
interface Loot {
  id: number;
  kind: Kind;
  /** Index into the round's options (a meaning) — null for rocks/clocks. */
  option: number | null;
  x: number;
  y: number;
  /** Radius as a fraction of the arena's shorter side. */
  r: number;
}
const RADIUS: Record<Kind, number> = { big: 0.085, small: 0.06, diamond: 0.045, rock: 0.065, clock: 0.042 };
/** How hard it is to reel in (1 = an empty claw). */
const WEIGHT: Record<Kind, number> = { big: 2.4, small: 1.6, diamond: 1.15, rock: 2.9, clock: 1 };
const VALUE: Record<Kind, number> = { big: 15, small: 10, diamond: 25, rock: 0, clock: 0 };

type Claw = { mode: "swing" | "out" | "back"; angle: number; len: number; t: number; carry: number | null };
const INITIAL_CLAW: Claw = { mode: "swing", angle: 0, len: 0, t: 0, carry: null };

/** Lays the loot out with no overlaps (labels need room below each piece). */
function layout(question: BlastQuestion, aspect: number): Loot[] {
  const kinds: Kind[] = question.options.map(() => (Math.random() < 0.5 ? "big" : "small"));
  kinds[Math.floor(Math.random() * kinds.length)] = "diamond";
  const pieces: { kind: Kind; option: number | null }[] = [
    ...question.options.map((_, i) => ({ kind: kinds[i], option: i })),
    { kind: "rock", option: null },
    { kind: "rock", option: null },
    { kind: "rock", option: null },
    ...(Math.random() < 0.6 ? [{ kind: "clock" as const, option: null }] : []),
  ];
  const placed: Loot[] = [];
  const minSide = Math.min(1, aspect); // in arena-height units when wider than tall
  pieces.forEach((piece, id) => {
    const r = RADIUS[piece.kind];
    for (let tries = 0; tries < 200; tries++) {
      const x = 0.1 + Math.random() * 0.8;
      const y = 0.4 + Math.random() * 0.5;
      // Distances measured in pixels-ish: x scaled by the aspect (width/height).
      const clear = placed.every((p) => {
        const dx = (p.x - x) * aspect;
        const dy = p.y - y;
        const gap = (p.r + r) * minSide + (p.option !== null || piece.option !== null ? 0.09 : 0.03);
        return Math.hypot(dx, dy) > gap;
      });
      if (clear || tries === 199) {
        placed.push({ id, kind: piece.kind, option: piece.option, x, y, r });
        break;
      }
    }
  });
  return placed;
}

function Nugget({ kind, glow }: { kind: Kind; glow?: boolean }) {
  if (kind === "diamond")
    return (
      <svg viewBox="0 0 40 32" className="size-full drop-shadow-[0_0_10px_rgba(125,211,252,0.7)]" aria-hidden>
        <path d="M8 2 H32 L40 11 L20 32 L0 11 Z" fill="#38bdf8" />
        <path d="M8 2 L14 11 H26 L32 2 Z M0 11 H40 L20 32 Z" fill="#7dd3fc" opacity="0.55" />
        <path d="M14 11 L20 32 L26 11 Z" fill="#0ea5e9" />
        <path d="M10 5 L13 9" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  if (kind === "rock")
    return (
      <svg viewBox="0 0 40 36" className="size-full" aria-hidden>
        <path d="M6 10 L18 2 L32 6 L39 20 L30 34 L10 33 L1 22 Z" fill="#9ca3af" />
        <path d="M6 10 L18 2 L32 6 L26 14 L12 16 Z" fill="#d1d5db" />
        <path d="M16 20 l5 5 l-3 4 M25 18 l3 3" stroke="#6b7280" strokeWidth="1.4" fill="none" />
      </svg>
    );
  if (kind === "clock")
    return (
      <svg viewBox="0 0 40 40" className="size-full drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" aria-hidden>
        <circle cx="20" cy="20" r="18" fill="#14532d" stroke="#4ade80" strokeWidth="3" />
        <path d="M20 9 V20 L27 24" stroke="#bbf7d0" strokeWidth="3" strokeLinecap="round" fill="none" />
        <text x="20" y="34" textAnchor="middle" fontSize="8" fontWeight="900" fill="#bbf7d0">+{CLOCK_BONUS_S}s</text>
      </svg>
    );
  return (
    <svg viewBox="0 0 44 40" className={cn("size-full", glow ? "drop-shadow-[0_0_16px_rgba(52,211,153,0.9)]" : "drop-shadow-[0_0_12px_rgba(251,191,36,0.55)]")} aria-hidden>
      <defs>
        <radialGradient id="nugget" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fff7c2" />
          <stop offset="0.35" stopColor="#fcd34d" />
          <stop offset="1" stopColor="#f59e0b" />
        </radialGradient>
      </defs>
      <path d="M8 14 C6 6 16 1 22 5 C27 0 38 4 37 12 C44 16 42 28 35 30 C33 38 20 40 15 34 C6 36 1 28 5 22 C1 18 3 14 8 14 Z" fill="url(#nugget)" />
      <circle cx="15" cy="13" r="3" fill="#fff" opacity="0.55" />
    </svg>
  );
}

function Miner() {
  return (
    <svg viewBox="0 0 80 52" className="block w-full" aria-hidden>
      <path d="M6 52 C6 24 22 14 42 14 C62 14 76 26 76 52 Z" fill="#8d6748" />
      <path d="M18 22 C20 6 62 6 66 22 Z" fill="#f59e0b" />
      <rect x="14" y="20" width="56" height="5" rx="2.5" fill="#d97706" />
      <path d="M30 34 q5 -4 10 0 M48 34 q5 -4 10 0" stroke="#2b1a10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M41 41 l4 3 l4 -3 Z" fill="#2b1a10" />
    </svg>
  );
}

/** Đào vàng: the English word is up top, nuggets and diamonds underground
 * carry Vietnamese meanings (plus rocks and the odd +time clock). The claw
 * swings — tap the screen (or Space / ↓) to drop it, and haul up the piece
 * with the right meaning. Heavier pieces reel in slower; a wrong meaning
 * costs 3 seconds. First-try catch is GOOD, otherwise AGAIN. */
export function MinerGame({
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
  autoAdvance?: boolean;
}) {
  const [questions] = React.useState<BlastQuestion[]>(() => buildBlast(items, distractorPool, 5));
  const [index, setIndex] = React.useState(0);
  const feedback = useGameFeedback(items);
  const arenaRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ w: 0, h: 0 });
  const [loot, setLoot] = React.useState<Loot[]>([]);
  const lootRef = React.useRef<Loot[]>([]);
  const clawRef = React.useRef<Claw>({ ...INITIAL_CLAW });
  /** What the claw looked like on the last frame, for rendering. */
  const [view, setView] = React.useState<Claw>(INITIAL_CLAW);
  const [phase, setPhase] = React.useState<"play" | "hit" | "reveal">("play");
  const phaseRef = React.useRef(phase);
  const [timeLeft, setTimeLeft] = React.useState(SECONDS_PER_WORD);
  const [money, setMoney] = React.useState(0);
  const [missed, setMissed] = React.useState(false);
  const missedRef = React.useRef(false);
  const [firstTry, setFirstTry] = React.useState(0);
  const [pop, setPop] = React.useState<{ key: number; text: string; good: boolean } | null>(null);

  const total = questions.length;
  const done = index >= total;
  const current = questions[index];
  useAutoFinish(done && autoAdvance, onFinish);

  React.useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  React.useEffect(() => {
    missedRef.current = missed;
  }, [missed]);

  // Arena size, for the claw's geometry.
  React.useEffect(() => {
    const el = arenaRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, [done]);

  // New round: fresh layout, word read aloud.
  const ready = size.w > 0;
  React.useEffect(() => {
    if (!current || !ready) return;
    const next = layout(current, size.w / size.h);
    lootRef.current = next;
    // The layout needs the measured arena, so it can only be made here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoot(next);
    clawRef.current = { mode: "swing", angle: 0, len: 0, t: clawRef.current.t, carry: null };
    feedback.correct(current.item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, ready]);

  const goNext = React.useCallback((delay: number) => {
    setTimeout(() => {
      setIndex((i) => i + 1);
      setPhase("play");
      setMissed(false);
      setTimeLeft(SECONDS_PER_WORD);
    }, delay);
  }, []);

  const resolve = React.useCallback(
    (piece: Loot) => {
      lootRef.current = lootRef.current.filter((l) => l.id !== piece.id);
      setLoot(lootRef.current);
      if (piece.kind === "clock") {
        setTimeLeft((t) => t + CLOCK_BONUS_S);
        setPop({ key: Date.now(), text: `+${CLOCK_BONUS_S}s`, good: true });
        return;
      }
      if (piece.option === null) {
        setPop({ key: Date.now(), text: "Đá!", good: false });
        return;
      }
      const right = current.options[piece.option].id === current.item.id;
      if (right) {
        const clean = !missedRef.current;
        const gained = clean ? VALUE[piece.kind] : 3;
        feedback.correct(current.item);
        setMoney((m) => m + gained);
        if (clean) setFirstTry((n) => n + 1);
        setPop({ key: Date.now(), text: `+$${gained}`, good: true });
        setPhase("hit");
        void onItemResult?.(current.item.id, clean ? "GOOD" : "AGAIN");
        goNext(NEXT_DELAY_MS);
      } else {
        feedback.wrong();
        setMissed(true);
        setTimeLeft((t) => Math.max(1, t - WRONG_PENALTY_S));
        setPop({ key: Date.now(), text: `-${WRONG_PENALTY_S}s`, good: false });
      }
    },
    [current, feedback, onItemResult, goNext]
  );
  const resolveRef = React.useRef(resolve);
  React.useEffect(() => {
    resolveRef.current = resolve;
  });

  // The claw: swing, shoot out along its angle, reel back (with a piece).
  React.useEffect(() => {
    if (done || size.w === 0) return;
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const c = clawRef.current;
      const { w, h } = size;
      const minSide = Math.min(w, h);
      const pivot = { x: PIVOT.x * w, y: PIVOT.y * h };
      const rest = 0.05 * h;
      if (c.mode === "swing") {
        c.t += dt;
        c.angle = MAX_SWING * Math.sin(c.t * 1.8);
        c.len = rest;
      } else if (c.mode === "out") {
        c.len += h * 1.05 * dt;
        const tip = { x: pivot.x + Math.sin(c.angle) * c.len, y: pivot.y + Math.cos(c.angle) * c.len };
        const hit = lootRef.current.find((l) => Math.hypot(tip.x - l.x * w, tip.y - l.y * h) < l.r * minSide + 8);
        if (hit) {
          c.carry = hit.id;
          c.mode = "back";
        } else if (tip.x < 0 || tip.x > w || tip.y > h) c.mode = "back";
      } else {
        const piece = c.carry === null ? null : lootRef.current.find((l) => l.id === c.carry);
        c.len -= (h * 1.5 * dt) / (piece ? WEIGHT[piece.kind] : 1);
        if (c.len <= rest) {
          c.len = rest;
          c.mode = "swing";
          c.carry = null;
          if (piece) resolveRef.current(piece);
        }
      }
      setView({ ...c });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [done, size]);

  const fire = React.useCallback(() => {
    if (phaseRef.current !== "play" || clawRef.current.mode !== "swing") return;
    clawRef.current.mode = "out";
  }, []);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowDown") {
        e.preventDefault();
        fire();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fire]);

  // Round clock; running out shows the right piece.
  React.useEffect(() => {
    if (done || phase !== "play") return;
    const t = setTimeout(() => {
      if (timeLeft > 1) {
        setTimeLeft((s) => s - 1);
        return;
      }
      setTimeLeft(0);
      setPhase("reveal");
      void onItemResult?.(current.item.id, "AGAIN");
      goNext(REVEAL_DELAY_MS);
    }, 1000);
    return () => clearTimeout(t);
  }, [timeLeft, phase, done, current, onItemResult, goNext]);

  if (done) {
    if (autoAdvance) return null;
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <ConfettiBurst />
        <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-600 text-white shadow-lg">
          <Pickaxe className="size-8" />
        </span>
        <div>
          <p className="text-2xl font-extrabold">Đào vàng hoàn tất!</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Kéo đúng ngay {firstTry}/{total} từ
          </p>
        </div>
        <p className="flex items-center gap-1.5 rounded-full bg-amber-400/15 px-4 py-1.5 text-lg font-bold text-amber-500">
          <Star className="size-5 fill-current" /> ${money}
        </p>
        <Button type="button" onClick={onFinish} className="rounded-full px-6">
          Xong
        </Button>
      </div>
    );
  }

  const { w, h } = size;
  const minSide = Math.min(w, h);
  const c = view;
  const pivot = { x: PIVOT.x * w, y: PIVOT.y * h };
  const tip = { x: pivot.x + Math.sin(c.angle) * c.len, y: pivot.y + Math.cos(c.angle) * c.len };
  const upcoming = questions.slice(index, index + 4);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={arenaRef}
        onPointerDown={fire}
        className="relative isolate aspect-[2/3] w-full max-w-3xl cursor-pointer touch-manipulation overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-24px_rgba(60,30,10,0.8)] ring-1 ring-black/10 select-none sm:aspect-[16/11]"
        style={{ background: "linear-gradient(180deg, #6ec3f0 0%, #a8dcf5 19%, #6b4423 21%, #4a2d17 60%, #2f1c0e 100%)" }}
      >
        {/* Grass line + specks of soil */}
        <div className="absolute inset-x-0 top-[19.5%] h-[2.2%] bg-[repeating-linear-gradient(90deg,#3f8f3a_0_6px,#57a94d_6px_12px)]" />
        <div className="pointer-events-none absolute inset-x-0 top-[22%] bottom-0 opacity-30 [background-image:radial-gradient(#f5c46b_1px,transparent_1.5px)] [background-size:38px_34px]" />
        <div className="absolute top-[6%] left-[8%] h-4 w-16 rounded-full bg-white/80 sm:h-6 sm:w-24" />
        <div className="absolute top-[3%] right-[18%] size-10 rounded-full bg-amber-300 shadow-[0_0_30px_rgba(252,211,77,0.8)] sm:size-14" />

        {/* HUD: money, time, words */}
        <div className="absolute inset-x-0 top-0 z-30 flex flex-col gap-1.5 p-2.5 sm:p-3">
          <div className="flex items-center gap-2">
            <span className="rounded-xl bg-slate-800/80 px-2.5 py-1 text-sm font-black text-amber-300 tabular-nums">${money}</span>
            <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-black/30 ring-1 ring-white/20">
              <div
                className={cn("h-full rounded-full transition-[width] duration-500", timeLeft <= 5 ? "bg-rose-500" : "bg-emerald-600")}
                style={{ width: `${Math.min(100, (timeLeft / SECONDS_PER_WORD) * 100)}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[11px] font-black text-white tabular-nums">{timeLeft}s</span>
            </div>
            <span className="rounded-full bg-black/30 px-2 py-0.5 text-[11px] font-bold text-white tabular-nums">
              {index + 1}/{total}
            </span>
          </div>
          <div className="flex gap-1.5 overflow-hidden">
            {upcoming.map((q, i) => (
              <span
                key={q.item.id}
                className={cn(
                  "flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold sm:text-sm",
                  i === 0 ? "bg-[#3b2a1a] text-amber-300 ring-2 ring-amber-400" : "bg-slate-600/60 text-white/70"
                )}
              >
                {i === 0 && <Search className="size-3.5" />}
                {q.item.term}
              </span>
            ))}
          </div>
        </div>

        {/* Miner and reel */}
        {w > 0 && (
          <>
            <div className="absolute z-10 w-[16%] max-w-[110px]" style={{ left: pivot.x - Math.min(110, w * 0.16) - 6, top: pivot.y - Math.min(110, w * 0.16) * 0.62 }}>
              <Miner />
            </div>
            <svg className="pointer-events-none absolute inset-0 z-10" width={w} height={h} aria-hidden>
              <line x1={pivot.x} y1={pivot.y} x2={tip.x} y2={tip.y} stroke="#e2e8f0" strokeWidth={2.5} />
              <circle cx={pivot.x} cy={pivot.y} r={12} fill="#475569" stroke="#cbd5e1" strokeWidth={3} />
              <g transform={`translate(${tip.x} ${tip.y}) rotate(${(-c.angle * 180) / Math.PI})`}>
                <path d="M-11 0 C-14 9 -10 16 -4 18 M11 0 C14 9 10 16 4 18" stroke="#e2e8f0" strokeWidth={4} fill="none" strokeLinecap="round" />
                <circle r={4.5} fill="#94a3b8" />
              </g>
            </svg>
          </>
        )}

        {/* Loot */}
        {w > 0 &&
          loot.map((l) => {
            const carried = c.carry === l.id;
            const px = carried ? tip.x : l.x * w;
            const py = carried ? tip.y + l.r * minSide * 0.7 : l.y * h;
            const d = l.r * minSide * 2;
            const isAnswer = l.option !== null && current.options[l.option].id === current.item.id;
            const reveal = phase === "reveal" && isAnswer;
            return (
              <div key={`${index}-${l.id}`} className="pointer-events-none absolute z-20 flex flex-col items-center" style={{ left: px, top: py, transform: "translate(-50%, -50%)" }}>
                <div style={{ width: d, height: d * (l.kind === "diamond" ? 0.8 : 0.9) }} className={cn(reveal && "animate-pulse")}>
                  <Nugget kind={l.kind} glow={reveal} />
                </div>
                {l.option !== null && (
                  <span
                    className={cn(
                      "mt-1 max-w-[34vw] rounded-lg px-2 py-0.5 text-center text-[10px] leading-tight font-black shadow sm:max-w-[200px] sm:text-[13px]",
                      reveal ? "bg-emerald-500 text-white" : "bg-[#1c120a]/90 text-white"
                    )}
                  >
                    {current.options[l.option].meaningVi}
                  </span>
                )}
              </div>
            );
          })}

        <AnimatePresence>
          {pop && (
            <motion.span
              key={pop.key}
              className={cn(
                "pointer-events-none absolute left-1/2 z-40 -translate-x-1/2 rounded-full border-2 border-white px-3 py-1 text-lg font-black shadow-lg",
                pop.good ? "bg-emerald-600 text-white" : "bg-rose-500 text-white"
              )}
              style={{ top: "30%" }}
              initial={{ y: 10, opacity: 0, scale: 0.6 }}
              animate={{ y: -20, opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onAnimationComplete={() => setTimeout(() => setPop((p) => (p?.key === pop.key ? null : p)), 500)}
            >
              {pop.text}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Chạm màn hình (hoặc phím Space / ↓) để thả móc, kéo lên cục vàng mang đúng nghĩa của từ. Vật nặng kéo chậm hơn, kéo nhầm nghĩa bị trừ {WRONG_PENALTY_S} giây.
      </p>
    </div>
  );
}
