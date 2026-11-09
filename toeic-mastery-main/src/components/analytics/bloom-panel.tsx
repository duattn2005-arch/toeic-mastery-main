import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Download,
  Layers,
  Lightbulb,
  Lock,
  Route,
  Sparkles,
  Target,
} from "lucide-react";
import {
  BLOOM_LEVELS,
  CELL_STATUS_LABEL,
  MASTERY_THRESHOLD,
  MIN_ATTEMPTS_PER_CELL,
  MIN_TIMED_SHARE,
  SCORED_LEVELS,
  TIER_LEVELS,
  WEAK_THRESHOLD,
  type BloomLevelId,
  type ScoredBloomLevel,
} from "@/lib/bloom/config";
import { answerInsights } from "@/lib/bloom/answer-insights";
import type { CellResult } from "@/lib/bloom/engine";
import type { BloomLabelRow, LearnerBloom } from "@/lib/bloom/bank";
import { SectionHeader } from "@/components/shared/section-header";
import { PracticeButton } from "@/components/analytics/practice-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pct = (x: number) => `${Math.round(x * 100)}%`;
const LEVEL = new Map(BLOOM_LEVELS.map((l) => [l.id, l]));
const PANEL = "min-w-0 rounded-[1.75rem] border border-border/60 bg-card p-5 shadow-soft sm:p-6";
const MAX_ROWS = 12;

const STATUS_CELL: Record<string, string> = {
  green: "bg-success/15 text-success ring-success/30",
  yellow: "bg-warning/20 text-foreground ring-warning/45",
  red: "bg-destructive/15 text-destructive ring-destructive/30",
  insufficient: "bg-muted/60 text-muted-foreground ring-border",
  inferred:
    "bg-success/8 text-success/80 ring-success/25 [background-image:repeating-linear-gradient(135deg,transparent_0_5px,color-mix(in_srgb,var(--success)_12%,transparent)_5px_7px)]",
};

const STEP_MT: Record<number, string> = {
  1: "lg:mt-20",
  2: "lg:mt-16",
  3: "lg:mt-12",
  4: "lg:mt-8",
  5: "lg:mt-4",
  6: "lg:mt-0",
};

function cellStatus(c: CellResult) {
  return c.inferred ? "inferred" : c.status;
}

function cellTitle(c: CellResult, level: ScoredBloomLevel) {
  const lines = [
    `${LEVEL.get(level)!.nameVi}: ${CELL_STATUS_LABEL[cellStatus(c) as keyof typeof CELL_STATUS_LABEL]}`,
    `${c.attempts} câu khác nhau${c.attempts < MIN_ATTEMPTS_PER_CELL ? ` (cần ${MIN_ATTEMPTS_PER_CELL})` : ""} · độ chính xác ${pct(c.accuracy)}`,
  ];
  if (c.speedBonus > 0) lines.push(`Thưởng tốc độ +${pct(c.speedBonus)}`);
  if (c.trapPenalty > 0) lines.push(`Trừ bẫy −${pct(c.trapPenalty)} (${c.trapHits} lần dính bẫy, ${c.flips} lần đổi đúng → sai)`);
  if (c.noiseRemoved) lines.push(`Đã loại ${c.noiseRemoved} câu (đoán ${c.noise.guess}, ngâm ${c.noise.stuck}, xem đáp án trước ${c.noise.revealed})`);
  if (c.hinted) lines.push(`${c.hinted} câu dùng gợi ý (tính nửa điểm)`);
  if (level >= 3) lines.push(`Câu làm có tính giờ: ${pct(c.timedShare)}`);
  if (c.cappedReason) lines.push(c.cappedReason);
  if (c.stale) lines.push("Đã lâu chưa làm lại — nên ôn để xác nhận");
  return lines.join("\n");
}

function HeatCell({ row, level, cell }: { row: BloomLabelRow; level: ScoredBloomLevel; cell: CellResult | undefined }) {
  const available = row.available.includes(level);
  const isFrontier = row.frontier.level === level;
  if (!cell) {
    return (
      <td className="p-1">
        <div
          className={cn(
            "flex h-11 items-center justify-center rounded-lg text-xs",
            available ? "border border-dashed border-border text-muted-foreground" : "text-muted-foreground/40",
            isFrontier && "border-primary/60 ring-2 ring-primary/40"
          )}
          title={available ? `${LEVEL.get(level)!.nameVi}: chưa làm câu nào` : "Ngân hàng chưa có câu ở bậc này cho nhãn này"}
        >
          {available ? "—" : "·"}
        </div>
      </td>
    );
  }
  const st = cellStatus(cell);
  return (
    <td className="p-1">
      <div
        className={cn(
          "flex h-11 flex-col items-center justify-center rounded-lg text-xs font-bold ring-1 tabular-nums ring-inset",
          STATUS_CELL[st],
          isFrontier && "ring-2 ring-primary/70"
        )}
        title={cellTitle(cell, level)}
      >
        {st === "insufficient" ? (
          <>
            {/* No valid answer left after noise filtering: unknown, not a score of 0%. */}
            <span>{cell.attempts > 0 ? pct(cell.score) : "–"}</span>
            <span className="text-[9px] font-medium opacity-80">
              {cell.attempts}/{MIN_ATTEMPTS_PER_CELL}
            </span>
          </>
        ) : st === "inferred" ? (
          <span className="text-[10px] font-semibold">suy ra</span>
        ) : (
          <>
            <span>{pct(cell.score)}</span>
            {(cell.stale || cell.cappedReason) && (
              <span className="text-[9px] font-medium opacity-80">{cell.stale ? "cần ôn lại" : "thiếu giờ"}</span>
            )}
          </>
        )}
      </div>
    </td>
  );
}

function RowAction({ row }: { row: BloomLabelRow }) {
  const level = row.frontier.level;
  if (!level) return <span className="text-[11px] font-semibold text-success">Vững hết</span>;
  if (row.kind === "vocab") {
    return (
      <Button asChild size="sm" variant="outline" className="h-8 gap-1 px-2.5 text-xs">
        <Link href="/vocabulary">
          Ôn từ <ArrowRight className="size-3" />
        </Link>
      </Button>
    );
  }
  return (
    <PracticeButton
      target={{ kind: row.kind, key: row.key, bloom: level }}
      label={`Luyện bậc ${level}`}
      variant="outline"
      className="h-8 px-2.5 text-xs"
    />
  );
}

function Legend({ cls, label }: { cls: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className={cn("size-3 rounded ring-1 ring-inset", cls)} /> {label}
    </span>
  );
}

function AnswerFact({ label, value, body }: { label: string; value: string; body: string }) {
  return (
    <div>
      <dt className="text-sm font-semibold">{label}</dt>
      <dd>
        <p className="mt-0.5 text-2xl font-extrabold tracking-tight tabular-nums">{value}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </dd>
    </div>
  );
}

function Signal({ title, body, icon, tone }: { title: string; body: string; icon?: boolean; tone?: "good" | "warn" }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-background/60 p-3.5",
        tone === "warn" && "border-warning/40",
        tone === "good" && "border-success/30"
      )}
    >
      <p className="flex items-center gap-1.5 text-xs font-semibold">
        {icon && <Lightbulb className="size-3.5 text-warning" />}
        {title}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

export function BloomPanel({ bloom }: { bloom: LearnerBloom }) {
  const { profile, rows, remember } = bloom;
  const { levels, tier, behavior, noise, answers } = profile;
  const current = tier.frontier;
  const shown = rows.filter((r) => r.attempts > 0).slice(0, MAX_ROWS);
  const hidden = rows.filter((r) => r.attempts > 0).length - shown.length;
  const tiers: ("B" | "I" | "A")[] = ["B", "I", "A"];

  const hasAnyAttempts = profile.totalAnswered > 0;
  const allMastered = current === null;
  const currentHeroRow = current !== null ? rows.find((r) => r.frontier.level === current) : undefined;
  const currentMastery = current !== null ? levels[current] : undefined;
  const currentInfo = current !== null ? LEVEL.get(current)! : undefined;
  const currentScoreVal = currentMastery ? (currentMastery.score ?? currentMastery.pooledAccuracy) : null;
  const currentBlocker = currentMastery?.blockers[0];

  // Answer Analysis Insights
  const hasEnoughAnswers = answers.answered >= MIN_ATTEMPTS_PER_CELL;

  const insights = answerInsights(answers, profile.hintsUsed, current);

  return (
    <section className={PANEL} id="bloom">
      <SectionHeader icon={Layers} title="Bậc tư duy — Thang Bloom" />
      <p className="-mt-1 mb-4 max-w-[72ch] text-sm leading-relaxed text-muted-foreground">
        Mỗi câu bạn làm được xếp vào một bậc tư duy. Một bậc chỉ được coi là <b className="font-semibold text-foreground">vững</b> khi đạt từ {pct(MASTERY_THRESHOLD)} trên ít nhất{" "}
        {MIN_ATTEMPTS_PER_CELL} câu khác nhau, và bài luyện luôn bắt đầu từ bậc thấp nhất còn hổng của từng nhãn — vững nền rồi mới lên cao.
      </p>

      {/* 1. HERO SECTION */}
      <div className="space-y-3">
        {/* Tier progress compact line */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Tiến trình cấp độ:</span>
          {tiers.map((t, i) => {
            const done = tier.reached !== null && tiers.indexOf(tier.reached) >= i;
            const working = tier.working === t;
            return (
              <span key={t} className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-medium transition-colors",
                    done
                      ? "bg-success/15 text-success font-semibold"
                      : working
                        ? "bg-primary/15 text-primary ring-1 ring-primary/30 font-semibold"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {done && <Check className="size-3" />}
                  Cấp {t}: {TIER_LEVELS[t].map((l) => LEVEL.get(l)!.nameVi).join(" + ")}
                  {working && tier.missing.length > 0 && (
                    <span className="font-normal opacity-80">(còn Bậc {tier.missing.join(", ")})</span>
                  )}
                </span>
                {i < tiers.length - 1 && <span className="text-muted-foreground/40">→</span>}
              </span>
            );
          })}
        </div>

        {/* Hero Card */}
        {!hasAnyAttempts ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/60 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  Khởi đầu lộ trình
                </span>
                <h3 className="text-2xl font-black tracking-tight sm:text-3xl text-foreground">
                  Bắt đầu chinh phục Thang Bloom
                </h3>
                <p className="max-w-[65ch] text-sm text-muted-foreground">
                  Bạn chưa có dữ liệu làm bài. Hãy hoàn thành các bài luyện tập đầu tiên để hệ thống phân tích bậc tư duy và đề xuất bài luyện phù hợp.
                </p>
              </div>
              <div className="shrink-0">
                <Button asChild size="default" className="w-full gap-2 font-bold sm:w-auto">
                  <Link href="/practice">
                    Bắt đầu luyện tập <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : allMastered ? (
          <div className="rounded-2xl border border-success/40 bg-success/5 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/20 px-2.5 py-0.5 text-xs font-bold text-success">
                    <Check className="size-3.5" /> Đã hoàn thành toàn bộ bậc tư duy
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="text-3xl font-black tracking-tight sm:text-4xl text-foreground">
                    Bậc 5 · {LEVEL.get(5)!.nameVi}
                  </h3>
                  <span className="text-2xl font-extrabold text-success sm:text-3xl">Đã vững</span>
                </div>
                <p className="max-w-[65ch] text-sm text-muted-foreground">
                  {LEVEL.get(5)!.description}
                </p>
                <p className="text-xs text-success font-medium">
                  Bạn đã nắm vững nền tảng trên tất cả các nhãn kiến thức. Tiếp tục phát triển chiến thuật và định hướng cá nhân ở Bậc 6.
                </p>
              </div>
              <div className="shrink-0">
                <Button asChild size="default" variant="outline" className="w-full gap-2 font-bold sm:w-auto">
                  <Link href="/mentor/path">
                    Xem lộ trình của bạn <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border/80 bg-background/80 p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                    Bậc hiện tại cần chinh phục
                  </span>
                  <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                    Cấp {currentMastery?.tier}
                  </span>
                  <span
                    className="inline-block size-2 rounded-full"
                    style={{ background: currentInfo?.color }}
                  />
                </div>

                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="text-3xl font-black tracking-tight sm:text-4xl text-foreground">
                    Bậc {current} · {currentInfo?.nameVi}
                  </h3>
                  <span className="text-lg font-medium text-muted-foreground sm:text-xl">
                    {currentInfo?.nameEn}
                  </span>
                  <span
                    className={cn(
                      "text-2xl font-extrabold tabular-nums sm:text-3xl",
                      currentMastery?.mastered
                        ? "text-success"
                        : currentMastery?.status === "green"
                          ? "text-success"
                          : currentMastery?.status === "yellow"
                            ? "text-foreground"
                            : currentMastery?.status === "red"
                              ? "text-destructive"
                              : "text-muted-foreground"
                    )}
                  >
                    {currentScoreVal === null ? "—" : pct(currentScoreVal)}
                  </span>
                </div>

                <p className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
                  {currentInfo?.description}
                </p>

                {currentBlocker && (
                  <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <AlertTriangle className="size-4 shrink-0 text-warning" />
                    <span>Điểm nghẽn cần vượt qua: {currentBlocker}</span>
                  </p>
                )}
              </div>

              <div className="shrink-0">
                {currentHeroRow ? (
                  currentHeroRow.kind === "vocab" ? (
                    <Button asChild size="default" className="w-full gap-2 font-bold sm:w-auto">
                      <Link href="/vocabulary">
                        Ôn từ vựng Bậc {current} <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  ) : (
                    <PracticeButton
                      target={{ kind: currentHeroRow.kind, key: currentHeroRow.key, bloom: current }}
                      label={`Luyện ngay: ${currentHeroRow.title}`}
                      size="default"
                      className="w-full gap-2 font-bold sm:w-auto"
                    />
                  )
                ) : (
                  <PracticeButton
                    target={{ kind: "part", key: "PART5", bloom: current }}
                    label={`Luyện Bậc ${current}`}
                    size="default"
                    className="w-full gap-2 font-bold sm:w-auto"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. STAIRCASE */}
      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-bold">Thang leo năng lực Bloom</h3>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            Leo từng bậc từ nền tảng (Bậc 1) đến sáng tạo (Bậc 6)
          </span>
        </div>

        <div className="flex flex-col-reverse gap-3 lg:grid lg:grid-cols-6 lg:items-start lg:gap-3">
          {SCORED_LEVELS.map((lvl) => {
            const m = levels[lvl];
            const info = LEVEL.get(lvl)!;
            const isMastered = m.mastered;
            const isCurrent = current === lvl;
            const isLocked = !isMastered && current !== null && lvl > current;
            const val = m.score ?? m.pooledAccuracy;
            const mtClass = STEP_MT[lvl] ?? "lg:mt-0";

            return (
              <div
                key={lvl}
                className={cn(
                  "flex min-w-0 flex-col gap-2 rounded-2xl p-4 transition-all",
                  mtClass,
                  isMastered
                    ? "border-2 border-success/40 bg-success/5 shadow-xs"
                    : isCurrent
                      ? "border-2 border-primary bg-primary/10 ring-2 ring-primary/30 shadow-md"
                      : isLocked
                        ? "border-2 border-dashed border-border/80 bg-muted/20 opacity-70"
                        : "border-2 border-warning/40 bg-warning/5"
                )}
              >
                {/* Level number */}
                <div className="flex items-center justify-between gap-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                    <span className="size-2 shrink-0 rounded-full" style={{ background: info.color }} />
                    Bậc {info.id}
                  </span>
                  {isCurrent && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                      Đang ở đây
                    </span>
                  )}
                </div>

                {/* Name */}
                <div>
                  <p className="truncate text-sm font-bold text-foreground" title={info.nameVi}>
                    {info.nameVi}
                  </p>
                </div>

                {/* Score */}
                <div className="my-1">
                  <span
                    className={cn(
                      "text-2xl font-black tabular-nums tracking-tight",
                      isMastered
                        ? "text-success"
                        : isCurrent
                          ? "text-primary"
                          : isLocked
                            ? "text-muted-foreground"
                            : "text-foreground"
                    )}
                  >
                    {val === null ? "—" : pct(val)}
                  </span>
                </div>

                {/* Status icon + text */}
                <div className="mt-auto pt-1">
                  {isMastered ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-success">
                      <Check className="size-4 shrink-0" />
                      <span>Đã vững</span>
                    </div>
                  ) : isCurrent ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                      <Target className="size-4 shrink-0" />
                      {/* Score alone doesn't make a level solid: it also needs enough questions per label. */}
                      <span>{val !== null && val >= MASTERY_THRESHOLD ? "Đủ điểm, còn điểm nghẽn" : `Cần đạt ${pct(MASTERY_THRESHOLD)}`}</span>
                    </div>
                  ) : isLocked ? (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Lock className="size-4 shrink-0" />
                      <span>Luyện sau bậc {current}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <Clock className="size-4 shrink-0 text-warning" />
                      <span>Chưa vững</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Level 6 - Sáng tạo (unscored, 3 links) */}
          <div
            className={cn(
              "flex min-w-0 flex-col gap-2 rounded-2xl border-2 border-dashed border-border bg-card/60 p-4 transition-all lg:mt-0"
            )}
          >
            <div className="flex items-center justify-between gap-1.5">
              <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                <span className="size-2 shrink-0 rounded-full" style={{ background: LEVEL.get(6 as BloomLevelId)!.color }} />
                Bậc 6
              </span>
              <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                Đầu ra
              </span>
            </div>

            <div>
              <p className="text-sm font-bold text-foreground">Sáng tạo</p>
            </div>

            <div className="my-1">
              <span className="text-sm font-semibold text-muted-foreground">Không chấm điểm</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
              <Sparkles className="size-4 shrink-0" />
              <span>Tự định hướng</span>
            </div>

            <div className="mt-auto flex flex-col gap-1.5 border-t border-border/40 pt-2 text-xs font-semibold">
              <a
                href="/api/insights/profile"
                download
                className="flex items-center gap-1.5 text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                <Download className="size-3.5 shrink-0" /> Hồ sơ chiến lược
              </a>
              <Link
                href="/mentor/path"
                className="flex items-center gap-1.5 text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                <Route className="size-3.5 shrink-0" /> Lộ trình của bạn
              </Link>
              <Link
                href="/bookmarks"
                className="flex items-center gap-1.5 text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                <Sparkles className="size-3.5 shrink-0" /> Bộ câu tự lưu
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PHÂN TÍCH CÂU TRẢ LỜI */}
      <div className="mt-8">
        <div className="mb-3">
          <h3 className="text-base font-bold">Phân tích câu trả lời</h3>
          <p className="text-xs text-muted-foreground">
            Đánh giá thói quen làm bài và bẫy thường gặp dựa trên các câu đã trả lời
          </p>
        </div>

        {!hasEnoughAnswers ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/40 p-6 text-center text-sm text-muted-foreground">
            Bạn đã hoàn thành {answers.answered}/{MIN_ATTEMPTS_PER_CELL} câu hợp lệ. Hãy làm thêm ít nhất {MIN_ATTEMPTS_PER_CELL - answers.answered} câu nữa để hệ thống tổng hợp phân tích chi tiết về bẫy đề thi và thói quen làm bài.
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-start gap-3 rounded-2xl bg-primary/10 p-4">
              <Lightbulb className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold text-primary">Nên ưu tiên</p>
                <p className="mt-0.5 max-w-[72ch] text-sm leading-relaxed font-medium text-foreground">{insights.recommendation}</p>
              </div>
            </div>

            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
              <AnswerFact
                label="Dính bẫy"
                value={`${answers.traps.reduce((s, t) => s + t.count, 0)} lần`}
                body={insights.trap}
              />
              <AnswerFact
                label="Đổi đáp án"
                value={`${answers.rightToWrong + answers.wrongToRight + answers.wrongToWrong} lần`}
                body={insights.change}
              />
              <AnswerFact
                label="Giây mỗi câu đúng / sai"
                value={`${answers.avgSecCorrect === null ? "–" : Math.round(answers.avgSecCorrect)} / ${answers.avgSecWrong === null ? "–" : Math.round(answers.avgSecWrong)}`}
                body={insights.time}
              />
              <AnswerFact
                label="Câu đúng có dùng gợi ý"
                value={`${answers.hintedCorrect} câu`}
                body={insights.hint}
              />
            </dl>
          </div>
        )}
      </div>

      {/* 4. COLLAPSED NATIVE <details> (Heatmap & Signals) */}
      <details className="group mt-8 rounded-2xl border border-border/70 bg-card/60 p-4 transition-colors">
        <summary className="flex cursor-pointer select-none items-center justify-between rounded-lg px-2 py-1.5 text-sm font-bold text-foreground hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <span className="flex items-center gap-2">
            <Layers className="size-4 text-primary" />
            Bản đồ chi tiết nhãn × bậc tư duy & tín hiệu đo lường ({shown.length} nhãn)
          </span>
          <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
        </summary>

        <div className="mt-4 space-y-6 border-t border-border/40 pt-4">
          {/* Heatmap label × level */}
          <div>
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-sm font-bold">Bản đồ nhãn × bậc tư duy</h4>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                <Legend cls={STATUS_CELL.green} label={`Vững ≥ ${pct(MASTERY_THRESHOLD)}`} />
                <Legend cls={STATUS_CELL.yellow} label="Đang hình thành" />
                <Legend cls={STATUS_CELL.red} label={`Hổng < ${pct(WEAK_THRESHOLD)}`} />
                <Legend cls={STATUS_CELL.insufficient} label={`Chưa đủ ${MIN_ATTEMPTS_PER_CELL} câu`} />
                <Legend cls={STATUS_CELL.inferred} label="Suy ra từ bậc cao hơn" />
                <span className="flex items-center gap-1">
                  <span className="size-3 rounded ring-2 ring-primary/70" /> Bậc cần luyện tiếp
                </span>
              </div>
            </div>
            {shown.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Làm vài bài luyện hoặc đề thi để bản đồ bắt đầu hiện ra.
              </p>
            ) : (
              <div className="-mx-1 overflow-x-auto">
                <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
                  <thead>
                    <tr className="text-[11px] text-muted-foreground">
                      <th className="px-2 pb-1.5 text-left font-semibold">Nhãn kiến thức</th>
                      {SCORED_LEVELS.map((l) => (
                        <th key={l} className="w-[13%] px-1 pb-1.5 text-center font-semibold">
                          {l}. {LEVEL.get(l)!.nameVi}
                        </th>
                      ))}
                      <th className="w-[12%] pb-1.5" />
                    </tr>
                  </thead>
                  <tbody>
                    {shown.map((row) => (
                      <tr key={row.label}>
                        <td className="max-w-[220px] px-2 py-1">
                          <p className="truncate font-medium" title={row.title}>
                            {row.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {row.kind === "grammar" ? "Ngữ pháp" : row.kind === "strategy" ? "Dạng câu" : row.kind === "vocab" ? "Từ vựng" : "Part"} · {row.attempts} câu
                          </p>
                        </td>
                        {SCORED_LEVELS.map((l) => (
                          <HeatCell key={l} row={row} level={l} cell={profile.heatmap[row.label]?.[l]} />
                        ))}
                        <td className="py-1 pl-1 text-right">
                          <RowAction row={row} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {hidden > 0 && (
              <p className="mt-2 text-xs text-muted-foreground">
                Còn {hidden} nhãn ít dữ liệu hơn — làm thêm bài để chúng hiện lên.
              </p>
            )}
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              Điểm một ô = độ chính xác trên tối đa 20 câu gần nhất (mỗi câu tính một lần; câu đúng nhờ gợi ý tính nửa điểm) + thưởng tốc độ phần Đọc − trừ khi dính đáp án bẫy hoặc đổi đúng thành sai. Từ bậc Vận dụng, cần ít nhất {pct(MIN_TIMED_SHARE)} câu làm có tính giờ mới được công nhận vững. Rê chuột lên từng ô để xem chi tiết.
            </p>
          </div>

          {/* Signals the score is built on */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Signal
              title="Dữ liệu đã lọc"
              body={`${noise.guess} câu đoán mò (< 8 giây) · ${noise.stuck} câu ngâm quá lâu · ${noise.revealed} câu xem đáp án trước khi chọn — không tính vào điểm.`}
            />
            <Signal
              title="Tín hiệu bậc Nhớ"
              body={`${remember.lookups30d} lần tra từ trong 30 ngày · ${remember.savedWords} từ đã lưu. Ôn flashcard được tính vào hàng Từ vựng, bậc 1.`}
            />
            <Signal
              title="Tín hiệu bậc Hiểu"
              body={`${profile.explanationViews} lần mở giải thích · ${profile.hintsUsed} bước gợi ý đã dùng khi luyện.`}
              icon
            />
            <Signal
              title="Bậc Đánh giá — ra quyết định"
              body={
                behavior.answered
                  ? `${pct(behavior.rightToWrongShare)} câu bậc 4–5 đổi đúng → sai (${behavior.rightToWrong} lần, sai → đúng ${behavior.wrongToRight}).${
                      behavior.mockSpread !== null
                        ? ` Điểm ${behavior.mockAccuracies.length} Mock gần nhất chênh ${pct(behavior.mockSpread)}.`
                        : " Cần 2 Mock test để đo độ ổn định."
                    }`
                  : "Chưa có câu bậc Phân tích/Đánh giá nào."
              }
              tone={behavior.answered ? (behavior.decisionOk && behavior.stabilityOk !== false ? "good" : "warn") : undefined}
            />
          </div>
        </div>
      </details>
    </section>
  );
}
