import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, Clock3, Compass, Flag, Flame, Headphones, Layers, ListChecks, Route, Target, Timer, type LucideIcon } from "lucide-react";
import type { DailyRoadmap as Roadmap, RoadmapIcon, RoadmapStep } from "@/lib/services/daily-roadmap";
import { cn } from "@/lib/utils";

const ICONS: Record<RoadmapIcon, LucideIcon> = {
  compass: Compass,
  layers: Layers,
  headphones: Headphones,
  book: BookOpen,
  list: ListChecks,
  timer: Timer,
  flag: Flag,
};

/** Stops per row on md+ screens; the road snakes back on every other row. */
const COLS = 3;

/** The lane markings down the middle of the road. */
const DASH_X = "bg-[repeating-linear-gradient(90deg,var(--card)_0_7px,transparent_7px_16px)]";
const DASH_Y = "bg-[repeating-linear-gradient(180deg,var(--card)_0_7px,transparent_7px_16px)]";

/** One stretch of road. `travelled` paints it in the theme colour. */
function Road({ className, vertical, travelled }: { className: string; vertical?: boolean; travelled: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute transition-colors duration-500",
        vertical ? "w-3.5 -translate-x-1/2" : "h-3.5 -translate-y-1/2",
        travelled ? "bg-primary/70" : "bg-border",
        className
      )}
    >
      <span className={cn("absolute opacity-80", vertical ? `inset-y-0 left-1/2 w-0.5 -translate-x-1/2 ${DASH_Y}` : `inset-x-0 top-1/2 h-0.5 -translate-y-1/2 ${DASH_X}`)} />
    </span>
  );
}

/** The U-turn at the end of a row (md+): swings out past the stop and comes
 * back in one row lower. 176px is the row height, 14px the road width. */
function Turn({ travelled, right }: { travelled: boolean; right: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute top-[47px] hidden h-[190px] border-[14px] transition-colors duration-500 md:block",
        right ? "right-1 left-1/2 rounded-r-[44px] border-l-0" : "right-1/2 left-1 rounded-l-[44px] border-r-0",
        travelled ? "border-primary/70" : "border-border"
      )}
    >
      <span
        className={cn(
          "absolute -inset-y-2 border-2 border-dashed border-card opacity-80",
          right ? "-right-2 left-0 rounded-r-[38px] border-l-0" : "right-0 -left-2 rounded-l-[38px] border-r-0"
        )}
      />
    </span>
  );
}

/** Progress ring drawn around a stop. */
function Ring({ progress, status }: { progress: number; status: RoadmapStep["status"] }) {
  const r = 47;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 size-full -rotate-90">
      <circle cx="50" cy="50" r={r} fill="none" strokeWidth="6" className={status === "next" ? "stroke-border" : "stroke-primary/20"} />
      {progress > 0 && (
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress / 100)}
          className={status === "done" ? "stroke-success" : "stroke-primary"}
        />
      )}
    </svg>
  );
}

function Stop({ step, index, count, prevDone }: { step: RoadmapStep; index: number; count: number; prevDone: boolean }) {
  const Icon = ICONS[step.icon];
  const row = Math.floor(index / COLS);
  const posInRow = index % COLS;
  const leftToRight = row % 2 === 0;
  const hasPrev = index > 0;
  const hasNext = index < count - 1;
  const done = step.status === "done";
  const current = step.status === "current";
  const finish = step.kind === "finish";
  const reachable = !finish || done;

  const body = (
    <>
      <span className="relative z-10 block size-[72px] shrink-0 md:size-[88px]">
        {current && <span aria-hidden className="absolute -inset-1 rounded-full bg-primary/25 motion-safe:animate-ping" />}
        <span
          className={cn(
            "absolute inset-0 rounded-full bg-card transition-transform duration-300 ease-spring",
            reachable && "group-hover:-translate-y-1 group-hover:scale-105",
            current && "shadow-[0_10px_28px_-8px_var(--primary)]"
          )}
        >
          <Ring progress={step.progress} status={step.status} />
          <span
            className={cn(
              "absolute inset-[7px] flex items-center justify-center rounded-full",
              done && "bg-success text-success-foreground",
              current && "bg-primary text-primary-foreground",
              step.status === "next" && "bg-muted text-muted-foreground"
            )}
          >
            {done ? <Check className="size-7 md:size-8" strokeWidth={3} /> : <Icon className="size-7 md:size-8" strokeWidth={1.75} />}
          </span>
        </span>
        <span
          className={cn(
            "absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full border-2 border-card text-[11px] font-bold tabular-nums",
            done ? "bg-success text-success-foreground" : current ? "bg-warning text-warning-foreground" : "bg-muted text-muted-foreground"
          )}
        >
          {finish ? <Flame className="size-3" /> : index + 1}
        </span>
      </span>

      <span className="relative z-10 flex min-w-0 flex-1 flex-col items-start gap-1 md:flex-none md:items-center">
        <span
          className={cn(
            "max-w-full truncate rounded-full border px-3 py-1 text-sm font-bold",
            current ? "border-primary bg-primary text-primary-foreground" : "border-border/70 bg-card",
            done && "text-muted-foreground"
          )}
        >
          {step.label}
        </span>
        <span className="flex items-center gap-2 px-1 text-xs font-medium text-muted-foreground tabular-nums">
          {step.progressLabel}
          {step.minutes > 0 && (
            <span className="flex items-center gap-0.5">
              <Clock3 className="size-3" />~{step.minutes}p
            </span>
          )}
        </span>
      </span>
    </>
  );

  const cellClass =
    "group relative z-10 flex min-h-[104px] items-center gap-4 rounded-3xl md:h-full md:min-h-0 md:flex-col md:justify-start md:gap-2.5 md:pt-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <li
      className="relative animate-in fade-in zoom-in-90 duration-500 fill-mode-both md:col-[var(--col)] md:row-[var(--row)] md:h-[176px]"
      style={{ "--col": leftToRight ? posInRow + 1 : COLS - posInRow, "--row": row + 1, animationDelay: `${index * 70}ms` } as CSSProperties}
    >
      {/* Phone: one straight road down the left edge. */}
      {hasPrev && <Road vertical travelled={prevDone} className="top-0 left-9 h-1/2 md:hidden" />}
      {hasNext && <Road vertical travelled={done} className="top-1/2 bottom-0 left-9 md:hidden" />}

      {/* md+: the road runs through the centre of each stop and turns at row ends. */}
      {hasPrev && posInRow > 0 && (
        <Road travelled={prevDone} className={cn("top-[54px] hidden w-1/2 md:block", leftToRight ? "left-0" : "right-0")} />
      )}
      {hasNext &&
        (posInRow === COLS - 1 ? (
          <Turn travelled={done} right={leftToRight} />
        ) : (
          <Road travelled={done} className={cn("top-[54px] hidden w-1/2 md:block", leftToRight ? "right-0" : "left-0")} />
        ))}

      {reachable ? (
        <Link href={step.href} aria-label={`${step.title}, ${step.progressLabel}`} data-track={`dashboard_roadmap_${step.kind}`} className={cellClass}>
          {body}
        </Link>
      ) : (
        <div className={cellClass}>{body}</div>
      )}
    </li>
  );
}

export interface RoadmapGoal {
  targetScore: number | null;
  currentScore: number | null;
  streakCount: number;
  /** Free accounts get a general route; link them to what Pro adds. */
  showProHint: boolean;
}

/** Today's study route: a winding road of stops, the next one called out on top. */
export function DailyRoadmap({ roadmap, goal }: { roadmap: Roadmap; goal: RoadmapGoal }) {
  const { steps, current, allDone, doneCount, total, minutesLeft } = roadmap;
  const gap = goal.targetScore != null && goal.currentScore != null ? goal.targetScore - goal.currentScore : null;
  const CurrentIcon = current ? ICONS[current.icon] : Flag;

  return (
    <section className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-card p-5 shadow-soft sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_100%_0%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent),radial-gradient(50%_45%_at_0%_100%,color-mix(in_oklab,var(--primary)_9%,transparent),transparent)]"
      />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Route className="size-5" strokeWidth={1.75} />
          </span>
          <div>
            <h2 className="text-base font-bold tracking-tight">Lộ trình hôm nay</h2>
            <p className="text-xs text-muted-foreground">
              {allDone ? "Bạn đã đi hết các chặng" : `${doneCount}/${total} chặng${minutesLeft > 0 ? ` · còn khoảng ${minutesLeft} phút` : ""}`}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold tabular-nums">
          {goal.targetScore != null && (
            <span className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-accent-foreground">
              <Target className="size-3.5" />
              Mục tiêu {goal.targetScore}
              {gap != null && gap > 0 && <span className="font-medium opacity-80">· còn {gap} điểm</span>}
            </span>
          )}
          {goal.streakCount > 0 && (
            <span className="flex items-center gap-1 rounded-full bg-warning/15 px-3 py-1.5 text-warning">
              <Flame className="size-3.5" />
              {goal.streakCount} ngày
            </span>
          )}
        </div>
      </div>

      <div className="relative mt-3 flex gap-1" aria-hidden>
        {steps.slice(0, total).map((s) => (
          <span key={s.id} className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <span className={cn("block h-full rounded-full transition-[width] duration-700", s.status === "done" ? "bg-success" : "bg-primary")} style={{ width: `${s.progress}%` }} />
          </span>
        ))}
      </div>

      <div className="relative mt-4 overflow-hidden rounded-3xl bg-primary p-4 text-primary-foreground sm:p-5">
        <div aria-hidden className="pointer-events-none absolute -top-10 -right-8 size-40 rounded-full bg-primary-foreground/10" />
        <div aria-hidden className="pointer-events-none absolute -right-2 -bottom-14 size-28 rounded-full bg-primary-foreground/10" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/15 sm:flex">
            <CurrentIcon className="size-7" strokeWidth={1.75} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase opacity-80">
              {current ? `Chặng ${steps.indexOf(current) + 1} · làm ngay` : "Về đích"}
            </p>
            <p className="mt-0.5 text-lg leading-snug font-bold text-balance">{current ? current.title : "Xong lộ trình hôm nay"}</p>
            <p className="mt-1 text-sm leading-relaxed opacity-90">{current ? current.reason : steps[steps.length - 1].reason}</p>
          </div>
          <Link
            href={current ? current.href : "/practice"}
            data-track="dashboard_roadmap_cta"
            className="group inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-full bg-primary-foreground px-5 text-sm font-bold text-primary shadow-sm transition-transform duration-300 ease-spring hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            {current ? current.cta : "Luyện thêm"}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <ol className="relative mt-4 grid grid-cols-1 md:mt-5 md:grid-cols-3">
        {steps.map((step, i) => (
          <Stop key={step.id} step={step} index={i} count={steps.length} prevDone={i > 0 && steps[i - 1].status === "done"} />
        ))}
      </ol>

      {goal.showProHint && (
        <Link href="/pricing" className="relative mt-3 inline-flex items-center gap-1 self-start text-xs font-semibold text-primary hover:underline">
          Mở lộ trình bám theo Part bạn yếu với gói Pro <ArrowRight className="size-3" />
        </Link>
      )}
    </section>
  );
}
