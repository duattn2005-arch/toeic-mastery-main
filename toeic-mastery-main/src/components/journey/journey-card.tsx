import Link from "next/link";
import { ArrowRight, BookOpen, Flag, Flame, Headphones, Heart, Map as MapIcon, Route, Target } from "lucide-react";
import { PART_META } from "@/lib/constants/toeic";
import { CHEST_PASS_PERCENT, JOURNEY_KIND_LABEL, buildJourneyStages, currentStageIndex, journeyStep, type JourneyKind } from "@/lib/services/journey-map";
import type { LearningPathDaySummary } from "@/lib/data/learning-path";
import { ReviewChest } from "./journey-scenery";
import { JourneyMap } from "./journey-map";
import { StartJourneyButton } from "./start-journey-button";

function BannerArt({ kind }: { kind: JourneyKind }) {
  if (kind === "chest") return <ReviewChest className="size-10" />;
  if (kind === "grammar") return <span className="text-2xl font-extrabold tracking-tight">Aa</span>;
  const Icon = kind === "reading" ? BookOpen : Headphones;
  return <Icon className="size-7" strokeWidth={1.75} />;
}

/**
 * The dashboard's "Lộ trình học" card: the next step called out on top,
 * then the current stage of the learner's LearningPath on the illustrated
 * map, with the next (still locked) stage peeking in underneath, and a link
 * to the whole map. With no path yet it shows the first stage as a preview
 * — exactly what "Bắt đầu lộ trình" will create — instead.
 *
 * Talks in "chặng · bước", never calendar days: a step opens when the one
 * before it is done, whenever that is (completeLearningPathItem), so the
 * learner sets the pace. The only push is a gentle nudge toward the goal.
 */
export function JourneyCard({
  mode,
  days,
  targetScore,
  currentScore,
  streakCount,
}: {
  mode: "path" | "preview";
  days: LearningPathDaySummary[];
  targetScore: number | null;
  currentScore: number | null;
  streakCount: number;
}) {
  const stages = buildJourneyStages(days);
  const index = currentStageIndex(stages);
  const stage = stages[index];
  const peek = stages[index + 1] ?? null;
  const today = stage?.days.find((d) => d.state === "current" || d.state === "open") ?? null;
  const doneCount = days.filter((d) => d.status === "COMPLETED").length;
  const finished = mode === "path" && days.length > 0 && doneCount === days.length;
  const gap = targetScore != null && currentScore != null ? targetScore - currentScore : null;
  const isLastDay = today != null && today.dayNumber === days[days.length - 1]?.dayNumber;
  const where = today ? journeyStep(today.dayNumber) : null;

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-card p-4 shadow-soft sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Route className="size-5" strokeWidth={1.75} />
          </span>
          <div>
            <h2 className="text-base font-bold tracking-tight">Lộ trình học</h2>
            <p className="text-xs text-muted-foreground tabular-nums">
              {mode === "preview"
                ? "Xem trước chặng đầu tiên của bạn"
                : finished
                  ? `Đã đi hết ${stages.length} chặng`
                  : `Chặng ${stage?.number ?? 1}/${stages.length} · đã xong ${doneCount}/${days.length} bước`}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold tabular-nums">
          {mode === "path" && (
            <Link
              href="/mentor/path"
              data-track="dashboard_journey_full_map"
              className="group flex items-center gap-1 rounded-full border border-border px-3 py-1.5 transition-colors duration-300 hover:border-primary/40 hover:bg-accent/50"
            >
              <MapIcon className="size-3.5 text-primary" />
              Toàn bộ · {stages.length} chặng
              <ArrowRight className="size-3.5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          )}
          {targetScore != null && (
            <span className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-accent-foreground">
              <Target className="size-3.5" />
              Mục tiêu {targetScore}
              {gap != null && gap > 0 && <span className="font-medium opacity-80">· còn {gap} điểm</span>}
            </span>
          )}
          {streakCount > 0 && (
            <span className="flex items-center gap-1 rounded-full bg-warning/15 px-3 py-1.5 text-warning">
              <Flame className="size-3.5" />
              {streakCount} ngày
            </span>
          )}
        </div>
      </div>

      {mode === "path" && days.length > 0 && (
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-muted" aria-hidden>
          <div className="h-full rounded-full bg-primary transition-[width] duration-700" style={{ width: `${(doneCount / days.length) * 100}%` }} />
        </div>
      )}

      <div className="relative mt-3 overflow-hidden rounded-2xl bg-primary p-3.5 text-primary-foreground sm:px-4">
        <div aria-hidden className="pointer-events-none absolute -top-10 -right-8 size-40 rounded-full bg-primary-foreground/10" />
        <div aria-hidden className="pointer-events-none absolute -right-2 -bottom-14 size-28 rounded-full bg-primary-foreground/10" />
        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center">
          <span className="hidden size-11 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15 sm:flex">
            {mode === "preview" || finished || !today ? <Flag className="size-7" strokeWidth={1.75} /> : <BannerArt kind={today.kind} />}
          </span>
          <div className="min-w-0 flex-1">
            {mode === "preview" ? (
              <>
                <p className="text-[11px] font-bold tracking-[0.14em] uppercase opacity-80">Lộ trình riêng của bạn</p>
                <p className="mt-0.5 text-base leading-snug font-bold text-balance">
                  {targetScore != null ? `Đi từng chặng tới mục tiêu ${targetScore} điểm` : "Chọn mục tiêu, nhận lộ trình riêng"}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed opacity-90">
                  Mỗi chặng {stage?.days.length ?? 5} bước, khép lại bằng rương ôn tập — đạt {CHEST_PASS_PERCENT}% mới mở chặng sau. Part bạn yếu
                  được xếp lên trước, học theo nhịp của riêng bạn.
                </p>
              </>
            ) : finished || !today ? (
              <>
                <p className="text-[11px] font-bold tracking-[0.14em] uppercase opacity-80">Về đích</p>
                <p className="mt-0.5 text-base leading-snug font-bold">Bạn đã đi hết lộ trình!</p>
                <p className="mt-0.5 text-xs leading-relaxed opacity-90">Xem lại các chặng đã qua, hoặc làm đề thi thử để đo điểm mới.</p>
              </>
            ) : (
              <>
                <p className="text-[11px] font-bold tracking-[0.14em] uppercase opacity-80 tabular-nums">
                  Chặng {where?.stage} · Bước {where?.step} · {today.itemsDone > 0 ? "học tiếp" : "làm ngay"}
                </p>
                <p className="mt-0.5 text-base leading-snug font-bold text-balance">
                  {JOURNEY_KIND_LABEL[today.kind].long} · {today.focusParts.map((p) => PART_META[p].shortLabel).join(", ")}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed opacity-90 tabular-nums">
                  {today.kind === "chest"
                    ? `Bài kiểm tra nhanh — đạt ${CHEST_PASS_PERCENT}% để ${isLastDay ? "về đích" : `mở Chặng ${stage.number + 1}`}.`
                    : `${today.itemsDone}/${today.itemsTotal} bài xong · học hết để ${isLastDay ? "về đích" : "mở bước tiếp theo"}.`}
                </p>
              </>
            )}
          </div>
          {mode === "preview" ? (
            <StartJourneyButton targetScore={targetScore} />
          ) : (
            <Link
              href={finished || !today ? "/mentor/path" : `/mentor/path/day/${today.dayNumber}`}
              data-track="dashboard_journey_cta"
              className="group inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-primary-foreground px-4 text-sm font-bold text-primary shadow-sm transition-transform duration-300 ease-spring hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              {finished || !today ? "Xem lộ trình" : today.itemsDone > 0 ? "Học tiếp" : "Học ngay"}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>

      {stage && (
        <JourneyMap stages={[stage]} linkDays={mode === "path"} continuesAbove={index > 0} peek={peek} compact className="mt-3 flex-1" />
      )}

      {!finished && (
        <p className="mt-2.5 flex items-start gap-1.5 px-1 text-[11px] leading-relaxed text-muted-foreground">
          <Heart className="mt-0.5 size-3 shrink-0 text-primary" />
          <span>
            Không có hạn chót — hôm nay chưa xong thì mai học tiếp đúng bước đó.{" "}
            {targetScore != null
              ? `Cố gắng đều mỗi ngày một bước để chạm mục tiêu ${targetScore} điểm nhé!`
              : "Cố gắng đều mỗi ngày một bước nhé!"}
          </span>
        </p>
      )}

    </section>
  );
}
