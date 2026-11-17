import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { BookOpen, Check, CheckCircle2, ChevronRight, Compass, Flag, Headphones, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { CHEST_PASS_PERCENT, JOURNEY_KIND_LABEL, journeyStep, type JourneyDay, type JourneyKind, type JourneyStage } from "@/lib/services/journey-map";
import { MINI_TEST_EVERY_N_DAYS } from "@/lib/constants/learning-path";
import { ReviewChest, StageScenery } from "./journey-scenery";

/**
 * The journey map: each stage ("chặng") is a banner over one row of
 * MINI_TEST_EVERY_N_DAYS stops, the last one the review chest. The road
 * snakes like a level map — odd stages run left→right, even ones
 * right→left — and swings out past the row's end to come down into the
 * next stage. All geometry is CSS custom properties (set responsively on
 * the root), so the road, the stops and the turns always line up:
 *
 *   --g       side gutter the road's turns run in
 *   --road-w  road width        --turn-r   turn radius
 *   --node    stop diameter     --row-h    height of a row of stops
 *   --node-y  stop centre, from the top of its row
 */

const COLS = MINI_TEST_EVERY_N_DAYS;
/** Centre of column `col` (1-based), as a CSS length within a stage block. */
const colX = (col: number) => `calc(var(--g) + (100% - 2 * var(--g)) * ${(col - 0.5) / COLS})`;
const CELL_W = `calc((100% - 2 * var(--g)) / ${COLS})`;
/** Y of the stops' centre line, measured from the top of the stage block. */
const NODE_Y = "calc(100% - var(--row-h) + var(--node-y))";
const roadColor = (travelled: boolean) => (travelled ? "var(--jm-road-done)" : "var(--jm-road)");

type Side = "left" | "right";
const cap = (side: Side) => (side === "left" ? "Left" : "Right");

function Straight({ left, travelled }: { left: string; travelled: boolean }) {
  return (
    <span
      aria-hidden
      className="absolute"
      style={{ top: `calc(${NODE_Y} - var(--road-w) / 2)`, left, width: CELL_W, height: "var(--road-w)", background: roadColor(travelled) }}
    >
      <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed" style={{ borderColor: "var(--jm-dash)" }} />
    </span>
  );
}

/**
 * A turn at the side of a stage block, drawn as a box with two borders and
 * one rounded corner — `entry` comes down the side from the block's top and
 * bends into the row; `exit` leaves the row's last stop and bends down to
 * the block's bottom (where the next block's `entry` picks it up). The
 * dashed centre line is a second box inset onto the middle of the border.
 */
function Turn({ side, kind, travelled, fade }: { side: Side; kind: "entry" | "exit"; travelled: boolean; fade?: boolean }) {
  const S = cap(side);
  const vertical = kind === "entry" ? "Bottom" : "Top";
  const color = roadColor(travelled);
  const box: CSSProperties = {
    [side]: "calc(var(--g) / 2 - var(--road-w) / 2)",
    width: "calc(var(--g) / 2 + (100% - 2 * var(--g)) * 0.1 + var(--road-w) / 2)",
    borderStyle: "solid",
    borderWidth: 0,
    borderColor: color,
    [`border${S}Width`]: "var(--road-w)",
    [`border${vertical}Width`]: "var(--road-w)",
    [`border${vertical}${S}Radius`]: "var(--turn-r)",
    ...(kind === "entry"
      ? { top: 0, height: `calc(${NODE_Y} + var(--road-w) / 2)` }
      : { top: `calc(${NODE_Y} - var(--road-w) / 2)`, bottom: 0 }),
    ...(fade
      ? {
          maskImage: `linear-gradient(to ${kind === "entry" ? "bottom" : "top"}, transparent, #000 ${kind === "entry" ? "70%" : "55%"})`,
          WebkitMaskImage: `linear-gradient(to ${kind === "entry" ? "bottom" : "top"}, transparent, #000 ${kind === "entry" ? "70%" : "55%"})`,
        }
      : {}),
  };
  const off = "calc(var(--road-w) / -2 - 1px)";
  const dash: CSSProperties = {
    [side]: off,
    [vertical.toLowerCase()]: off,
    [side === "left" ? "right" : "left"]: 0,
    [vertical === "Bottom" ? "top" : "bottom"]: 0,
    borderStyle: "dashed",
    borderWidth: 0,
    borderColor: "var(--jm-dash)",
    [`border${S}Width`]: 2,
    [`border${vertical}Width`]: 2,
    [`border${vertical}${S}Radius`]: "calc(var(--turn-r) - var(--road-w) / 2)",
  };
  return (
    <span aria-hidden className="absolute" style={box}>
      <span className="absolute opacity-90" style={dash} />
    </span>
  );
}

function KindIcon({ kind }: { kind: JourneyKind }) {
  if (kind === "grammar") return <span className="text-[19px] font-extrabold tracking-tight sm:text-[26px]">Aa</span>;
  const Icon = kind === "reading" ? BookOpen : Headphones;
  return <Icon className="size-6 sm:size-8" strokeWidth={2} />;
}

const pad = (n: number) => String(n).padStart(2, "0");

function Stop({ day, col, href }: { day: JourneyDay; col: number; href: string | null }) {
  const locked = day.state === "locked";
  const done = day.state === "done";
  const current = day.state === "current";
  const chest = day.kind === "chest";
  const label = JOURNEY_KIND_LABEL[day.kind];
  const { step } = journeyStep(day.dayNumber);

  const discStyle: CSSProperties = done
    ? {
        background: "var(--success)",
        color: "var(--success-foreground)",
        boxShadow: "0 5px 0 color-mix(in oklab, var(--success) 65%, #000), 0 0 0 4px var(--card)",
      }
    : locked
      ? { background: "var(--jm-locked)", color: "#fff", boxShadow: "0 5px 0 var(--jm-locked-edge), 0 0 0 4px color-mix(in oklab, var(--card) 85%, transparent)" }
      : {
          background: "var(--primary)",
          color: "var(--primary-foreground)",
          boxShadow: `0 5px 0 color-mix(in oklab, var(--primary) 62%, #000), 0 0 0 4px var(--card)${current ? ", 0 14px 34px -8px var(--primary)" : ""}`,
        };

  const body = (
    <>
      <span
        className="flex h-5 items-center gap-1 rounded-full px-1.5 text-[10px] sm:px-2 font-bold whitespace-nowrap tabular-nums"
        style={
          current
            ? { background: "var(--primary)", color: "var(--primary-foreground)" }
            : done
              ? { background: "var(--success)", color: "var(--success-foreground)" }
              : { background: "var(--jm-flag)", color: "#fff" }
        }
      >
        <Flag className="size-2.5" strokeWidth={2.5} />
        <span className="hidden sm:inline">Bước</span> {step}
      </span>

      <span className="relative mt-1 block" style={{ width: "var(--node)", height: "var(--node)" }}>
        {current && (
          <>
            <span aria-hidden className="absolute -inset-3 rounded-full bg-primary/15" />
            <span aria-hidden className="absolute -inset-1 rounded-full bg-primary/30 motion-safe:animate-ping" />
          </>
        )}
        {chest ? (
          <ReviewChest
            open={done}
            className={cn("relative size-full transition-transform duration-300 ease-spring", href && "group-hover:-translate-y-1")}
            style={
              locked
                ? { filter: "grayscale(1) brightness(1.06) contrast(0.85)", opacity: 0.92 }
                : current
                  ? { filter: "drop-shadow(0 8px 14px color-mix(in oklab, var(--warning) 70%, transparent))" }
                  : undefined
            }
          />
        ) : (
          <span
            className={cn(
              "relative flex size-full items-center justify-center rounded-full transition-transform duration-300 ease-spring",
              href && "group-hover:-translate-y-1"
            )}
            style={discStyle}
          >
            <KindIcon kind={day.kind} />
          </span>
        )}
        {(locked || done) && (
          <span
            className={cn(
              "absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full shadow-sm ring-2 ring-card sm:size-6",
              done ? "bg-success text-success-foreground" : "bg-card text-muted-foreground"
            )}
          >
            {done ? <Check className="size-3 sm:size-3.5" strokeWidth={3} /> : <Lock className="size-2.5 sm:size-3" strokeWidth={2.5} />}
          </span>
        )}
      </span>

      <span
        className={cn(
          "mt-2.5 max-w-full truncate rounded-full px-2 py-0.5 text-[11px] font-bold shadow-sm ring-1 sm:px-3 sm:py-1 sm:text-[13px]",
          current ? "bg-primary text-primary-foreground ring-primary" : "bg-card/95 ring-border/60",
          locked && "text-muted-foreground"
        )}
      >
        <span className="sm:hidden">{label.short}</span>
        <span className="hidden sm:inline">{label.long}</span>
      </span>
      <span className="mt-0.5 text-[10px] font-semibold text-muted-foreground tabular-nums sm:text-[11px]">
        {chest && locked ? `đạt ${CHEST_PASS_PERCENT}%` : `${day.itemsDone}/${day.itemsTotal} bài`}
      </span>
    </>
  );

  const hint = locked ? (chest ? "Học xong các bước trước để mở rương" : "Học xong bước trước để mở khóa") : undefined;
  const cls = "group flex flex-col items-center rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <li className="absolute top-0 flex -translate-x-1/2 justify-center" style={{ left: colX(col), width: CELL_W }}>
      {href ? (
        <Link href={href} className={cls} aria-label={`Bước ${step}: ${label.long}, ${day.itemsDone}/${day.itemsTotal} bài`}>
          {body}
        </Link>
      ) : (
        <div className={cls} title={hint} aria-label={hint ?? `Bước ${step}: ${label.long}`}>
          {body}
        </div>
      )}
    </li>
  );
}

function StageBanner({ stage, href }: { stage: JourneyStage; href: string | null }) {
  const locked = stage.state === "locked";
  const done = stage.state === "done";
  const Icon = locked ? Lock : done ? CheckCircle2 : Compass;
  const inner = (
    <>
      <span
        className={cn(
          "absolute -top-3 -right-2 flex size-9 items-center justify-center rounded-full border-4 text-sm font-extrabold tabular-nums shadow-md sm:-right-3 sm:size-11 sm:text-base",
          done ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"
        )}
        style={{ borderColor: "var(--jm-ground-1)" }}
      >
        {pad(stage.number)}
      </span>
      <p
        className={cn(
          "text-[10px] font-bold tracking-[0.16em] uppercase sm:text-[11px]",
          locked ? "text-muted-foreground" : done ? "text-success" : "text-primary"
        )}
      >
        {locked ? "Chưa mở khóa" : done ? "Đã hoàn thành" : "Đang học"}
      </p>
      <p className="mt-1 flex items-center gap-2 pr-6 sm:gap-3">
        <Icon
          className={cn("size-5 shrink-0 sm:size-6", locked ? "text-muted-foreground" : done ? "text-success" : "text-primary")}
          strokeWidth={2}
        />
        <span className={cn("line-clamp-2 min-w-0 text-[15px] leading-snug font-extrabold tracking-tight sm:truncate sm:text-xl", locked && "text-foreground/70")}>
          {stage.title}
        </span>
        {href && (
          <ChevronRight className="ml-auto size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5" />
        )}
      </p>
      <p className="mt-1 text-xs text-muted-foreground tabular-nums sm:text-sm">
        {stage.days.length} bước · rương ôn tập đạt {CHEST_PASS_PERCENT}%
      </p>
    </>
  );
  const cls = cn(
    "group relative block w-full rounded-[1.6rem] border px-4 py-3 backdrop-blur-sm transition-shadow duration-300 sm:max-w-[74%] sm:px-5 sm:py-4",
    locked && "border-border/60 bg-card/75 shadow-[0_10px_26px_-16px_rgb(0_0_0/0.35)]",
    done && "border-success/35 bg-card/90 shadow-[0_10px_26px_-16px_rgb(0_0_0/0.3)]",
    !locked && !done && "border-primary/35 bg-card/95 shadow-[0_16px_36px_-18px_var(--primary)] ring-1 ring-primary/15",
    href && "hover:shadow-[0_18px_40px_-18px_var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  );
  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

function StageBlock({
  stage,
  dayHref,
  entry,
  exit,
  bannerOnly = false,
}: {
  stage: JourneyStage;
  dayHref: (day: JourneyDay) => string | null;
  /** null = the road starts at this stage's first stop. */
  entry: { travelled: boolean; fade?: boolean } | null;
  exit: { travelled: boolean; fade?: boolean } | null;
  /** Just the banner, with the road running down past it — the next,
   * still-locked stage peeking in at the bottom of the dashboard card. */
  bannerOnly?: boolean;
}) {
  const leftToRight = stage.number % 2 === 1;
  const entrySide: Side = leftToRight ? "left" : "right";
  const exitSide: Side = leftToRight ? "right" : "left";
  const firstOpen = stage.days.find((d) => d.state === "current" || d.state === "open") ?? stage.days[0];
  const bannerHref = stage.state === "locked" ? null : dayHref(firstOpen);

  return (
    <div className="relative" style={bannerOnly ? undefined : { minHeight: "var(--row-h)" }}>
      <StageScenery stage={stage.number} free={entrySide === "left" ? "right" : "left"} />

      {bannerOnly ? (
        entry && (
          <span
            aria-hidden
            className="absolute inset-y-0"
            style={{
              [entrySide]: "calc(var(--g) / 2 - var(--road-w) / 2)",
              width: "var(--road-w)",
              background: roadColor(entry.travelled),
              maskImage: "linear-gradient(to bottom, #000 30%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 30%, transparent)",
            }}
          />
        )
      ) : (
        <>
          {entry && <Turn side={entrySide} kind="entry" travelled={entry.travelled} fade={entry.fade} />}
          {stage.days.slice(0, -1).map((day, i) => {
            const a = leftToRight ? i + 1 : COLS - i;
            const b = leftToRight ? a + 1 : a - 1;
            return <Straight key={day.dayNumber} left={colX(Math.min(a, b))} travelled={day.state === "done"} />;
          })}
          {exit && <Turn side={exitSide} kind="exit" travelled={exit.travelled} fade={exit.fade} />}
        </>
      )}

      <div className={cn("relative z-10 flex pt-6 pb-4 sm:pb-5", entrySide === "right" && "justify-end")} style={{ paddingInline: "var(--g)" }}>
        <StageBanner stage={stage} href={bannerHref} />
      </div>

      {!bannerOnly && (
        <ol className="relative z-10" style={{ height: "var(--row-h)" }} aria-label={`Chặng ${stage.number}: ${stage.title}`}>
          {stage.days.map((day, i) => (
            <Stop key={day.dayNumber} day={day} col={leftToRight ? i + 1 : COLS - i} href={dayHref(day)} />
          ))}
        </ol>
      )}
    </div>
  );
}

const lastDone = (stage: JourneyStage) => stage.days[stage.days.length - 1]?.state === "done";

export function JourneyMap({
  stages,
  linkDays,
  continuesAbove = false,
  continuesBelow = false,
  peek = null,
  className,
  children,
}: {
  stages: JourneyStage[];
  /** Link unlocked days to their day page. Off for the not-yet-created preview. */
  linkDays: boolean;
  /** Earlier stages exist but aren't drawn (dashboard): fade the road in. */
  continuesAbove?: boolean;
  /** Later stages exist but aren't drawn: fade the road out. Ignored with `peek`. */
  continuesBelow?: boolean;
  /** The next stage, drawn as just its banner peeking in at the bottom. */
  peek?: JourneyStage | null;
  className?: string;
  children?: ReactNode;
}) {
  const dayHref = (day: JourneyDay) => (linkDays && day.state !== "locked" ? `/mentor/path/day/${day.dayNumber}` : null);
  const last = stages.length - 1;
  return (
    <div
      className={cn(
        "journey-scene relative isolate overflow-hidden rounded-[1.75rem]",
        "[--g:8%] [--node-y:45px] [--node:46px] [--road-w:12px] [--row-h:122px] [--turn-r:24px]",
        "sm:[--g:8%] sm:[--node-y:60px] sm:[--node:72px] sm:[--road-w:16px] sm:[--row-h:162px] sm:[--turn-r:46px]",
        className
      )}
    >
      {stages.map((stage, i) => (
        <StageBlock
          key={stage.number}
          stage={stage}
          dayHref={dayHref}
          entry={i > 0 ? { travelled: lastDone(stages[i - 1]) } : continuesAbove ? { travelled: stage.days[0]?.state !== "locked", fade: true } : null}
          exit={i < last || peek ? { travelled: lastDone(stage) } : continuesBelow ? { travelled: lastDone(stage), fade: true } : null}
        />
      ))}
      {peek && stages.length > 0 && (
        <div className="[mask-image:linear-gradient(to_bottom,#000_45%,transparent)]">
          <StageBlock stage={peek} dayHref={dayHref} entry={{ travelled: lastDone(stages[last]) }} exit={null} bannerOnly />
        </div>
      )}
      {children}
    </div>
  );
}
