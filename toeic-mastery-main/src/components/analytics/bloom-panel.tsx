import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  CircleAlert,
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
  MIN_ATTEMPTS_PER_LEVEL,
  MIN_TIMED_SHARE,
  SCORED_LEVELS,
  TIER_LEVELS,
  TIMED_EVIDENCE_FROM_LEVEL,
  WEAK_THRESHOLD,
  type BloomLevelId,
  type ScoredBloomLevel,
} from "@/lib/bloom/config";
import { answerInsights } from "@/lib/bloom/answer-insights";
import type { CellResult, LevelMastery } from "@/lib/bloom/engine";
import { levelRoadmap, scorePct, type LevelRoadmap, type LevelTask } from "@/lib/bloom/level-roadmap";
import type { BloomLabelRow, LearnerBloom, MistakeDetail } from "@/lib/bloom/bank";
import { MISTAKES_OVERALL, MISTAKES_PER_LEVEL, type ErrorTypeStat, type MistakeScope } from "@/lib/bloom/mistakes";
import { ErrorTypes, MistakeCounts, MistakeQuestions } from "@/components/analytics/mistake-report";
import { PracticeButton } from "@/components/analytics/practice-button";
import { PanelHeader } from "@/components/analytics/panel-header";
import { PANEL } from "@/components/analytics/insights-view";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const pct = (x: number) => `${Math.round(x * 100)}%`;
const LEVEL = new Map(BLOOM_LEVELS.map((l) => [l.id, l]));
const FOLD_SUMMARY = "flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border/60 bg-card px-4 py-3 text-sm font-bold transition-colors hover:border-primary/40 hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none [&::-webkit-details-marker]:hidden";
const MINI_CELL: Record<string, string> = { green: "bg-success", yellow: "bg-warning", red: "bg-destructive", insufficient: "bg-muted-foreground/35", inferred: "bg-success/40" };
const MAX_ROWS = 12;
const MAX_TASKS = 6;
const KIND_LABEL: Record<BloomLabelRow["kind"], string> = { grammar: "Ngữ pháp", strategy: "Dạng câu", vocab: "Từ vựng", part: "Part" };
// Tabs trigger defaults to a one-line pill; each step here is a tall card.
const STEP_BASE =
  "an-lift relative h-auto min-w-0 flex-col items-stretch justify-start gap-1.5 overflow-hidden rounded-2xl border-2 p-3 pt-4 text-left whitespace-normal text-foreground data-[state=active]:border-primary data-[state=active]:shadow-md data-[state=active]:ring-2 data-[state=active]:ring-primary/40 sm:p-3.5 dark:text-foreground dark:data-[state=active]:border-primary";

const STATUS_CELL: Record<string, string> = {
  green: "bg-success/15 text-success ring-success/30",
  yellow: "bg-warning/20 text-foreground ring-warning/45",
  red: "bg-destructive/15 text-destructive ring-destructive/30",
  insufficient: "bg-muted/60 text-muted-foreground ring-border",
  inferred:
    "bg-success/8 text-success/80 ring-success/25 [background-image:repeating-linear-gradient(135deg,transparent_0_5px,color-mix(in_srgb,var(--success)_12%,transparent)_5px_7px)]",
};

function cellStatus(c: CellResult) {
  return c.inferred ? "inferred" : c.status;
}

/** How a cell's score was built. Spelled out in the level detail because touch screens can't hover the heatmap's title. */
function cellFacts(c: CellResult, level: ScoredBloomLevel) {
  const lines = [
    `${c.attempts} câu khác nhau${c.attempts < MIN_ATTEMPTS_PER_CELL ? ` (cần ${MIN_ATTEMPTS_PER_CELL})` : ""} · độ chính xác ${pct(c.accuracy)}`,
  ];
  if (c.speedBonus > 0) lines.push(`Thưởng tốc độ +${pct(c.speedBonus)}`);
  if (c.trapPenalty > 0) lines.push(`Trừ bẫy −${pct(c.trapPenalty)} (${c.trapHits} lần dính bẫy, ${c.flips} lần đổi đúng → sai)`);
  if (c.noiseRemoved) lines.push(`Đã loại ${c.noiseRemoved} câu (đoán ${c.noise.guess}, ngâm ${c.noise.stuck}, xem đáp án trước ${c.noise.revealed})`);
  if (c.hinted) lines.push(`${c.hinted} câu dùng gợi ý (tính nửa điểm)`);
  if (level >= TIMED_EVIDENCE_FROM_LEVEL) lines.push(`Câu làm có tính giờ: ${pct(c.timedShare)}`);
  return lines;
}

function cellTitle(c: CellResult, level: ScoredBloomLevel) {
  const lines = [`${LEVEL.get(level)!.nameVi}: ${CELL_STATUS_LABEL[cellStatus(c) as keyof typeof CELL_STATUS_LABEL]}`, ...cellFacts(c, level)];
  if (c.cappedReason) lines.push(c.cappedReason);
  if (c.stale) lines.push("Đã lâu chưa làm lại — nên ôn để xác nhận");
  return lines.join("\n");
}

function HeatCell({ row, level, cell }: { row: BloomLabelRow; level: ScoredBloomLevel; cell: CellResult | undefined }) {
  const available = row.available.includes(level);
  const isFrontier = row.frontier.level === level;
  const frontier = isFrontier && "ring-2 ring-primary ring-offset-2 ring-offset-background";
  const dot = isFrontier && <span aria-hidden className="absolute -top-1 -right-1 size-2.5 rounded-full border-2 border-background bg-primary" />;
  if (!cell) {
    return (
      <td className="border-b border-border/50 px-1.5 py-2">
        <div
          className={cn(
            "relative flex h-11 items-center justify-center rounded-lg text-xs",
            available && "bg-muted/40 text-muted-foreground/70",
            isFrontier && "bg-primary/8 font-semibold text-primary",
            frontier
          )}
          title={available ? `${LEVEL.get(level)!.nameVi}: chưa làm câu nào` : "Ngân hàng chưa có câu ở bậc này cho nhãn này"}
        >
          {dot}
          {available && (isFrontier ? "Bắt đầu" : "—")}
        </div>
      </td>
    );
  }
  const st = cellStatus(cell);
  return (
    <td className="border-b border-border/50 px-1.5 py-2">
      <div
        className={cn(
          "relative flex h-11 flex-col items-center justify-center gap-0.5 rounded-lg text-sm leading-none font-bold tabular-nums transition-transform duration-200 hover:-translate-y-0.5",
          STATUS_CELL[st],
          frontier
        )}
        title={cellTitle(cell, level)}
      >
        {dot}
        {st === "insufficient" ? (
          <>
            {/* No valid answer left after noise filtering: unknown, not a score of 0%. */}
            <span className="text-[13px]">{cell.attempts > 0 ? scorePct(cell.score) : "–"}</span>
            <span className="flex items-center gap-1">
              <span aria-hidden className="h-1 w-6 overflow-hidden rounded-full bg-foreground/10">
                <span className="block h-full rounded-full bg-muted-foreground/60" style={{ width: `${Math.min(100, (cell.attempts / MIN_ATTEMPTS_PER_CELL) * 100)}%` }} />
              </span>
              <span className="text-[9px] font-medium">
                {cell.attempts}/{MIN_ATTEMPTS_PER_CELL}
              </span>
            </span>
          </>
        ) : st === "inferred" ? (
          <span className="text-[11px] font-semibold">suy ra</span>
        ) : (
          <>
            <span>{scorePct(cell.score)}</span>
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
    <span className="flex items-center gap-1.5 rounded-full bg-muted/50 py-1 pr-2.5 pl-1.5">
      <span className={cn("size-3.5 rounded-[5px] ring-1 ring-inset", cls)} /> {label}
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

function LevelBar({ value, status }: { value: number | null; status: string }) {
  return (
    <span className="relative block h-2 overflow-hidden rounded-full bg-muted">
      <span
        className={cn("an-bar block h-full rounded-full", status === "green" ? "bg-success" : status === "yellow" ? "bg-warning" : status === "red" ? "bg-destructive" : "bg-muted-foreground/40")}
        style={{ width: `${Math.max(3, Math.round((value ?? 0) * 100))}%` }}
      />
      <span className="absolute inset-y-0 w-px bg-foreground/15" style={{ left: `${WEAK_THRESHOLD * 100}%` }} />
      <span className="absolute inset-y-0 w-px bg-foreground/30" style={{ left: `${MASTERY_THRESHOLD * 100}%` }} />
    </span>
  );
}

function StepTrigger({ m, current, next }: { m: LevelMastery; current: ScoredBloomLevel | null; next: BloomLevelId | null }) {
  const lvl = m.level;
  const info = LEVEL.get(lvl)!;
  const isCurrent = current === lvl;
  const isNext = lvl === next;
  const val = m.score ?? m.pooledAccuracy;
  return (
    <TabsTrigger
      value={String(lvl)}
      className={cn(
        STEP_BASE,
        m.mastered ? "border-success/40 bg-success/5" : isCurrent ? "border-primary/60 bg-primary/10" : "border-dashed border-border/80 bg-muted/20"
      )}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: info.color }} />
      <span className="text-xs font-bold text-muted-foreground">Bậc {lvl}</span>
      <span className="truncate text-sm font-bold">{info.nameVi}</span>
      <span className={cn("text-2xl font-black tracking-tight tabular-nums", m.mastered ? "text-success" : isCurrent ? "text-primary" : "text-muted-foreground")}>
        {val === null ? "—" : scorePct(val)}
      </span>
      <LevelBar value={val} status={m.mastered ? "green" : m.status} />
      {m.mastered ? (
        <span className="flex items-center gap-1.5 text-xs font-bold text-success">
          <Check className="size-4 shrink-0" /> {m.inferredFrom ? `Suy ra từ Bậc ${m.inferredFrom}` : "Đã vững"}
        </span>
      ) : isCurrent ? (
        <span className="flex items-center gap-1.5 text-xs font-bold text-primary">
          <Target className="size-4 shrink-0" /> Đang ở đây
        </span>
      ) : (
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          {!isNext && <Lock className="size-4 shrink-0" />} {isNext ? "Bậc kế tiếp" : "Chưa tới"}
        </span>
      )}
    </TabsTrigger>
  );
}

export function TaskAction({ task, level, hero }: { task: LevelTask; level: ScoredBloomLevel; hero?: boolean }) {
  const { row, blockedBy, needsTimed, practiceLevel } = task;
  const size = hero ? "default" : "sm";
  const cls = hero ? "h-auto w-full whitespace-normal font-bold sm:w-auto" : "h-8 shrink-0 gap-1 px-2.5 text-xs";
  const variant = hero ? "default" : "outline";
  // A lower level comes first: timed work can't count until the label gets there.
  if (row.kind === "vocab" || (needsTimed && blockedBy === null)) {
    const label = row.kind === "vocab" ? "Ôn từ vựng" : "Làm đề Thi thử";
    return (
      <Button asChild size={size} variant={variant} className={cn("gap-1", cls)}>
        <Link href={row.kind === "vocab" ? "/vocabulary" : "/practice"}>
          {hero && row.kind !== "vocab" ? `${label}: ${row.title}` : label} <ArrowRight className="size-3.5" />
        </Link>
      </Button>
    );
  }
  const label = blockedBy !== null ? `Luyện bậc ${blockedBy} trước` : `Luyện bậc ${level}`;
  return <PracticeButton target={{ kind: row.kind, key: row.key, bloom: practiceLevel }} label={hero ? `${label}: ${row.title}` : label} size={size} variant={variant} className={cls} />;
}

function TaskRow({ task, level, topError }: { task: LevelTask; level: ScoredBloomLevel; topError: ErrorTypeStat | undefined }) {
  const { row, cell, state, need, blockedBy } = task;
  return (
    <li className={cn("an-lift flex flex-col gap-3 rounded-2xl border border-l-4 border-border/60 bg-card p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4", state === "red" ? "border-l-destructive/70" : state === "yellow" ? "border-l-warning" : "border-l-muted-foreground/30")}>
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-semibold">{row.title}</span>
          <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset", STATUS_CELL[state === "untried" ? "insufficient" : state === "red" ? "red" : state === "yellow" ? "yellow" : "insufficient"])}>
            {state === "untried" ? "Chưa làm" : CELL_STATUS_LABEL[cell!.status]}
          </span>
          <span className="text-[11px] text-muted-foreground">{KIND_LABEL[row.kind]}</span>
        </p>
        <p className="mt-1 text-sm leading-relaxed">{need}</p>
        {topError && (
          <p className="mt-0.5 text-xs font-medium">
            Hay sai nhất: {topError.label} ({topError.count} lần)
          </p>
        )}
        {blockedBy !== null && <p className="mt-0.5 text-xs font-medium">Nhãn này chưa vững bậc {blockedBy}, nên đề sẽ ra ở bậc {blockedBy} trước.</p>}
        {cell && (
          <details className="group/facts mt-1">
            <summary className="inline-flex cursor-pointer items-center gap-1 rounded text-xs font-medium text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none [&::-webkit-details-marker]:hidden">
              Cách tính điểm <ChevronDown className="size-3 transition-transform group-open/facts:rotate-180" />
            </summary>
            <ul className="mt-1 flex flex-col gap-0.5 text-xs leading-relaxed text-muted-foreground">
              {cellFacts(cell, level).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </details>
        )}
      </div>
      <TaskAction task={task} level={level} />
    </li>
  );
}

function LevelDetail({
  m,
  map,
  current,
  mistakes,
  details,
  titles,
}: {
  m: LevelMastery;
  map: LevelRoadmap;
  current: ScoredBloomLevel | null;
  mistakes: MistakeScope;
  details: Map<string, MistakeDetail>;
  titles: Map<string, string>;
}) {
  const lvl = m.level;
  const info = LEVEL.get(lvl)!;
  const val = m.score ?? m.pooledAccuracy;
  const { evidence, tasks, solid, requirements } = map;
  const firstTasks = tasks.slice(0, MAX_TASKS);
  const moreTasks = tasks.slice(MAX_TASKS);
  const facts = [
    { label: "Câu được tính", value: String(m.attempts) },
    { label: "Độ chính xác", value: m.pooledAccuracy === null ? "—" : pct(m.pooledAccuracy) },
    { label: "Dính bẫy", value: `${evidence.trapHits} lần` },
    { label: "Đổi đúng → sai", value: `${evidence.flips} lần` },
    { label: "Dùng gợi ý", value: `${evidence.hinted} câu` },
    { label: "Câu bị loại", value: `${evidence.noiseRemoved} câu` },
    ...(lvl >= TIMED_EVIDENCE_FROM_LEVEL ? [{ label: `Có tính giờ (cần ${pct(MIN_TIMED_SHARE)})`, value: pct(m.timedShare) }] : []),
  ];
  return (
    <div className="rounded-3xl bg-background/70 p-4 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-lg font-black tracking-tight">
          Bậc {lvl}: {info.nameVi} <span className="text-sm font-medium text-muted-foreground">Cấp {m.tier}</span>
        </h4>
        <span className="text-sm font-bold tabular-nums">
          {val === null ? "Chưa có điểm" : scorePct(val)}
          {m.score === null && val !== null && <span className="font-normal text-muted-foreground"> ước tính</span>}
          {!m.inferredFrom && <span className="font-normal text-muted-foreground"> / cần {pct(MASTERY_THRESHOLD)}</span>}
        </span>
      </div>
      <div className="mt-2">
        <LevelBar value={val} status={m.mastered ? "green" : m.status} />
      </div>
      <p className="mt-3 max-w-[72ch] text-sm leading-relaxed text-muted-foreground">{info.description}</p>
      {!m.mastered && current !== null && lvl > current && (
        <p className="mt-3 flex items-start gap-1.5 text-sm font-medium">
          <Lock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          Nên luyện sau khi vững Bậc {current}: {LEVEL.get(current)!.nameVi}.
        </p>
      )}

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="order-2 min-w-0 self-start rounded-2xl border border-border/60 bg-card p-4">
          <h5 className="mb-3 text-sm font-bold">Điều kiện để vững bậc này</h5>
          <ul className="flex flex-col gap-3">
            {requirements.map((r) => (
              <li key={r.label} className="flex items-start gap-2">
                {r.ok ? <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" /> : <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />}
                <div className="min-w-0">
                  <p className={cn("text-sm leading-snug", !r.ok && "font-medium")}>{r.label}</p>
                  <p className="text-xs text-muted-foreground">{r.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 min-w-0">
          <h5 className="mb-3 text-sm font-bold">
          {m.mastered ? "Có thể nâng thêm" : `Cần luyện gì để vững bậc ${lvl}`}
          {tasks.length > 0 && <span className="font-normal text-muted-foreground"> ({tasks.length} nhãn)</span>}
        </h5>
        {tasks.length === 0 ? (
          m.mastered ? (
            <p className="text-sm text-muted-foreground">Mọi nhãn đã làm ở bậc này đều vững.</p>
          ) : (
            <div className="flex flex-col items-start gap-3 text-sm text-muted-foreground">
              <p>Bạn chưa làm nhãn nào có câu ở bậc này. Làm một bài để hệ thống bắt đầu đo.</p>
              <PracticeButton target={{ kind: "part", key: "PART5", bloom: lvl }} label={`Luyện bậc ${lvl}`} variant="outline" />
            </div>
          )
        ) : (
          <>
            <ul className="flex flex-col gap-2.5">
              {firstTasks.map((t) => (
                <TaskRow key={t.row.label} task={t} level={lvl} topError={mistakes.topErrorByLabel[t.row.label]} />
              ))}
            </ul>
            {moreTasks.length > 0 && (
              <details className="an-fold group/more mt-3">
                <summary className="flex cursor-pointer items-center gap-1 rounded text-xs font-semibold text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
                  Xem thêm {moreTasks.length} nhãn <ChevronDown className="size-3.5 transition-transform group-open/more:rotate-180" />
                </summary>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {moreTasks.map((t) => (
                    <TaskRow key={t.row.label} task={t} level={lvl} topError={mistakes.topErrorByLabel[t.row.label]} />
                  ))}
                </ul>
              </details>
            )}
          </>
        )}
        </div>
      </div>

      {mistakes.wrongAnswers + mistakes.skipped > 0 && (
        <details className="an-fold group/wrong mt-5">
          <summary className={FOLD_SUMMARY}>
            Xem câu sai ở bậc này ({mistakes.wrongQuestions} câu)
            <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open/wrong:rotate-180" />
          </summary>
          <div className="mt-3">
          <MistakeCounts scope={mistakes} />
          </div>
          <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <div>
              <h6 className="mb-2 text-xs font-semibold text-muted-foreground">Loại lỗi và tần suất</h6>
              <ErrorTypes types={mistakes.types} />
            </div>
            <div className="min-w-0">
              <h6 className="mb-2 text-xs font-semibold text-muted-foreground">Từng câu sai, bấm để xem đáp án và lời giải</h6>
              {mistakes.questions.length > 0 ? (
                <MistakeQuestions questions={mistakes.questions} details={details} titles={titles} limit={MISTAKES_PER_LEVEL} />
              ) : (
                <p className="text-sm text-muted-foreground">Bậc này chỉ có câu bỏ trống, chưa có câu chọn sai.</p>
              )}
            </div>
          </div>
        </details>
      )}

      <details className="an-fold group/nums mt-2.5">
        <summary className={FOLD_SUMMARY}>
          Xem số liệu và cách đo
          <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open/nums:rotate-180" />
        </summary>
        <div className="mt-3">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs text-muted-foreground">{f.label}</dt>
                <dd className="text-sm font-bold tabular-nums">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-3 max-w-[72ch] text-xs leading-relaxed text-muted-foreground">Đo bằng: {info.sources}</p>
      </details>

      {solid.length > 0 && (
        <div className="mt-5">
          <h5 className="mb-2 text-sm font-bold">
            Đã vững ở bậc này <span className="font-normal text-muted-foreground">({solid.length} nhãn)</span>
          </h5>
          <ul className="flex flex-wrap gap-1.5">
            {solid.map(({ row, cell }) => (
              <li key={row.label} className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                {row.title}, {cell.inferred ? "suy ra" : scorePct(cell.score)}
                {cell.stale && ", cần ôn lại"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const HEAT_LEGEND = [
  [STATUS_CELL.green, `Vững ≥ ${pct(MASTERY_THRESHOLD)}`],
  [STATUS_CELL.yellow, "Đang hình thành"],
  [STATUS_CELL.red, `Hổng < ${pct(WEAK_THRESHOLD)}`],
  [STATUS_CELL.insufficient, `Chưa đủ ${MIN_ATTEMPTS_PER_CELL} câu`],
  [STATUS_CELL.inferred, "Suy ra từ bậc cao hơn"],
] as const;

export function BloomPanel({ bloom, mistakeDetails }: { bloom: LearnerBloom; mistakeDetails: Map<string, MistakeDetail> }) {
  const { profile, rows, remember, mistakes } = bloom;
  const labelTitles = new Map(rows.map((r) => [r.label, r.title]));
  const { levels, tier, behavior, noise } = profile;
  const current = tier.frontier;
  const withData = rows.filter((r) => r.attempts > 0);
  const shown = withData.slice(0, MAX_ROWS);
  const hidden = withData.length - shown.length;
  const tiers: ("B" | "I" | "A")[] = ["B", "I", "A"];
  const roadmaps = new Map(SCORED_LEVELS.map((l) => [l, levelRoadmap(l, profile, rows)]));
  const nextLevel = current !== null ? (SCORED_LEVELS.find((l) => l > current && !levels[l].mastered) ?? 6) : null;
  const statusCounts = { green: 0, yellow: 0, red: 0 };
  for (const row of withData) {
    for (const cell of Object.values(profile.heatmap[row.label] ?? {})) {
      if (cell && cell.status !== "insufficient") statusCounts[cell.status]++;
    }
  }

  return (
    <section className={PANEL} id="bloom">
      <PanelHeader icon={Layers} title="Thang Bloom" subtitle={`Mỗi bậc cần đạt từ ${pct(MASTERY_THRESHOLD)} trên ít nhất ${MIN_ATTEMPTS_PER_LEVEL} câu. Bấm vào một bậc để xem cần luyện gì.`} />

      <ol className="flex flex-wrap items-center gap-1.5 text-xs">
        {tiers.map((t, i) => {
          const done = tier.reached !== null && tiers.indexOf(tier.reached) >= i;
          return (
            <li
              key={t}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold",
                done ? "bg-success/15 text-success" : tier.working === t ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
              )}
            >
              {done && <Check className="size-3" />}
              Cấp {t}: {TIER_LEVELS[t].map((l) => LEVEL.get(l)!.nameVi).join(" + ")}
            </li>
          );
        })}
      </ol>

      <Tabs defaultValue={String(current ?? 5)} className="mt-6 gap-4">
        <TabsList className="grid h-auto w-full grid-cols-3 items-start gap-2 rounded-none bg-transparent p-0 group-data-[orientation=horizontal]/tabs:h-auto sm:grid-cols-6 sm:gap-3">
          {SCORED_LEVELS.map((lvl) => (
            <StepTrigger key={lvl} m={levels[lvl]} current={current} next={nextLevel} />
          ))}
          <TabsTrigger value="6" className={cn(STEP_BASE, "border-dashed border-border bg-card/60")}>
            <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
              <span className="size-2 shrink-0 rounded-full" style={{ background: LEVEL.get(6 as BloomLevelId)!.color }} />
              Bậc 6
            </span>
            <span className="truncate text-sm font-bold">Sáng tạo</span>
            <span className="text-sm font-semibold text-muted-foreground">Không chấm điểm</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
              <Sparkles className="size-4 shrink-0" />
              Tự định hướng
            </span>
          </TabsTrigger>
        </TabsList>

        {SCORED_LEVELS.map((lvl) => (
          <TabsContent key={lvl} value={String(lvl)}>
            <LevelDetail m={levels[lvl]} map={roadmaps.get(lvl)!} current={current} mistakes={mistakes.byLevel[lvl]} details={mistakeDetails} titles={labelTitles} />
          </TabsContent>
        ))}
        <TabsContent value="6">
          <div className="rounded-2xl border border-border/70 bg-background/60 p-4 sm:p-5">
            <h3 className="text-lg font-extrabold tracking-tight">Bậc 6: Sáng tạo</h3>
            <p className="mt-1 max-w-[68ch] text-sm leading-relaxed text-muted-foreground">{LEVEL.get(6 as BloomLevelId)!.description}</p>
            <div className="mt-4 flex flex-col items-start gap-2.5 text-sm font-semibold">
              <a href="/api/insights/profile" download className="flex items-center gap-1.5 rounded text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
                <Download className="size-4 shrink-0" /> Hồ sơ chiến lược
              </a>
              <Link href="/mentor/path" className="flex items-center gap-1.5 rounded text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
                <Route className="size-4 shrink-0" /> Lộ trình của bạn
              </Link>
              <Link href="/bookmarks" className="flex items-center gap-1.5 rounded text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
                <Sparkles className="size-4 shrink-0" /> Bộ câu tự lưu
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <details className="an-fold group mt-7">
        <summary className="an-lift flex cursor-pointer flex-col gap-4 rounded-3xl bg-[linear-gradient(120deg,var(--primary),color-mix(in_srgb,var(--primary)_68%,var(--success)))] p-5 text-primary-foreground shadow-soft select-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none sm:flex-row sm:items-center sm:justify-between sm:p-6 [&::-webkit-details-marker]:hidden">
          <span className="min-w-0">
            <span className="block text-xl font-extrabold tracking-tight sm:text-2xl">Bản đồ nhãn kiến thức</span>
            <span className="mt-1 block max-w-[52ch] text-sm leading-relaxed opacity-90">
              {withData.length} nhãn trên 5 bậc: {statusCounts.green} ô vững, {statusCounts.yellow} ô đang hình thành, {statusCounts.red} ô hổng. Mở để xem bạn mạnh, yếu ở đâu.
            </span>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-sm font-bold text-accent-foreground">
              <span className="group-open:hidden">Mở bản đồ</span>
              <span className="hidden group-open:inline">Thu gọn</span>
              <ChevronDown className="size-4 transition-transform duration-300 group-open:rotate-180" />
            </span>
          </span>
          {/* A preview of the real map: one column per label, one row per level, lowest level at the bottom. */}
          <span aria-hidden className="flex shrink-0 gap-1 self-start rounded-2xl bg-card p-3 shadow-soft sm:self-center">
            {shown.map((row) => (
              <span key={row.label} className="flex flex-col-reverse gap-1">
                {SCORED_LEVELS.map((l) => {
                  const cell = profile.heatmap[row.label]?.[l];
                  return <span key={l} className={cn("size-3 rounded-[4px] sm:size-3.5", cell ? MINI_CELL[cellStatus(cell)] : "bg-foreground/6")} />;
                })}
              </span>
            ))}
          </span>
        </summary>

        <div className="mt-4 space-y-6 rounded-3xl bg-background p-4 sm:p-6">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
              {HEAT_LEGEND.map(([cls, label]) => (
                <Legend key={label} cls={cls} label={label} />
              ))}
              <span className="flex items-center gap-1.5 rounded-full bg-primary/10 py-1 pr-2.5 pl-1.5 text-primary">
                <span className="relative size-3.5 rounded-[5px] ring-2 ring-primary">
                  <span className="absolute -top-1 -right-1 size-2 rounded-full bg-primary" />
                </span>
                Bậc cần luyện tiếp
              </span>
            </div>
            {shown.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">Làm vài bài luyện hoặc đề thi để bản đồ bắt đầu hiện ra.</p>
            ) : (
              <div className="-mx-1 overflow-x-auto">
                <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
                  <thead>
                    <tr className="text-[11px] text-muted-foreground">
                      <th className="sticky left-0 z-10 border-b border-border bg-background px-3 pb-2.5 text-left font-semibold tracking-wide uppercase">Nhãn kiến thức</th>
                      {SCORED_LEVELS.map((l) => (
                        <th key={l} className="w-[13%] border-b border-border px-1 pb-2.5 text-center font-semibold">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-1 text-foreground/80">
                            <span className="flex size-4 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: LEVEL.get(l)!.color }}>
                              {l}
                            </span>
                            {LEVEL.get(l)!.nameVi}
                          </span>
                        </th>
                      ))}
                      <th className="w-[12%] border-b border-border pb-2.5" />
                    </tr>
                  </thead>
                  <tbody>
                    {shown.map((row) => (
                      <tr key={row.label} className="group/row">
                        <td className="sticky left-0 z-10 max-w-[180px] border-b border-border/50 bg-background px-3 py-2 transition-colors group-hover/row:bg-muted sm:max-w-[240px]">
                          <p className="truncate font-semibold" title={row.title}>
                            {row.title}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <span className="rounded bg-muted px-1.5 py-px font-medium">{KIND_LABEL[row.kind]}</span>
                            {row.attempts} câu
                          </p>
                        </td>
                        {SCORED_LEVELS.map((l) => (
                          <HeatCell key={l} row={row} level={l} cell={profile.heatmap[row.label]?.[l]} />
                        ))}
                        <td className="border-b border-border/50 py-2 pr-2 pl-1 text-right">
                          <RowAction row={row} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {hidden > 0 && <p className="mt-2 text-xs text-muted-foreground">Còn {hidden} nhãn ít dữ liệu hơn, làm thêm bài để chúng hiện lên.</p>}
            <p className="mt-3 max-w-[80ch] text-[11px] leading-relaxed text-muted-foreground">
              Điểm một ô là độ chính xác trên tối đa 20 câu gần nhất (câu đúng nhờ gợi ý tính nửa điểm), cộng thưởng tốc độ phần Đọc, trừ khi dính bẫy hoặc đổi đúng thành sai. Từ bậc Vận dụng cần ít nhất {pct(MIN_TIMED_SHARE)} câu có tính giờ.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Signal title="Dữ liệu đã lọc" body={`${noise.guess} câu đoán mò (dưới 8 giây), ${noise.stuck} câu ngâm quá lâu, ${noise.revealed} câu xem đáp án trước khi chọn: không tính vào điểm.`} />
            <Signal title="Tín hiệu bậc Nhớ" body={`${remember.lookups30d} lần tra từ trong 30 ngày, ${remember.savedWords} từ đã lưu. Ôn flashcard được tính vào hàng Từ vựng, bậc 1.`} />
            <Signal title="Tín hiệu bậc Hiểu" body={`${profile.explanationViews} lần mở giải thích, ${profile.hintsUsed} bước gợi ý đã dùng khi luyện.`} icon />
            <Signal
              title="Bậc Đánh giá: ra quyết định"
              body={
                behavior.answered
                  ? `${pct(behavior.rightToWrongShare)} câu bậc 4–5 đổi đúng thành sai (${behavior.rightToWrong} lần, sai thành đúng ${behavior.wrongToRight}).${
                      behavior.mockSpread !== null ? ` Điểm ${behavior.mockAccuracies.length} Mock gần nhất chênh ${pct(behavior.mockSpread)}.` : " Cần 2 Mock test để đo độ ổn định."
                    }`
                  : "Chưa có câu bậc Phân tích hoặc Đánh giá nào."
              }
              tone={behavior.answered ? (behavior.decisionOk && behavior.stabilityOk !== false ? "good" : "warn") : undefined}
            />
          </div>
        </div>
      </details>
    </section>
  );
}

/** Every wrong question across all levels, how it was lost and how often. */
export function MistakeMap({ bloom, mistakeDetails }: { bloom: LearnerBloom; mistakeDetails: Map<string, MistakeDetail> }) {
  const { rows, mistakes } = bloom;
  const labelTitles = new Map(rows.map((r) => [r.label, r.title]));
  return (
    <section className={PANEL}>
      <PanelHeader
            icon={CircleAlert}
            title="Bản đồ lỗi sai"
            subtitle="Câu nào bạn sai, sai kiểu gì và lặp lại bao nhiêu lần."
            action={mistakes.questions.some((q) => q.stillWrong && q.reviewAttemptId) ? <PracticeButton target={{ kind: "mistakes" }} label="Làm lại câu đang sai" /> : undefined}
          />
      {mistakes.wrongAnswers + mistakes.skipped === 0 ? (
        <p className="text-sm text-muted-foreground">Chưa có câu sai nào. Làm thêm bài để bản đồ bắt đầu hiện ra.</p>
      ) : (
        <>
          <MistakeCounts scope={mistakes} />
          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <div>
              <h3 className="mb-3 text-sm font-bold">Loại lỗi và tần suất</h3>
              <ErrorTypes types={mistakes.types} />
            </div>
            <div className="min-w-0">
              <h3 className="mb-3 text-sm font-bold">Câu cần xử lý trước</h3>
              {mistakes.questions.length > 0 ? (
                <MistakeQuestions questions={mistakes.questions} details={mistakeDetails} titles={labelTitles} limit={MISTAKES_OVERALL} />
              ) : (
                <p className="text-sm text-muted-foreground">Chưa có câu chọn sai, chỉ có câu bỏ trống.</p>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export function AnswerHabits({ bloom }: { bloom: LearnerBloom }) {
  const { profile } = bloom;
  const { answers, tier } = profile;
  const insights = answerInsights(answers, profile.hintsUsed, tier.frontier);
  return (
    <section className={PANEL}>
      <PanelHeader icon={Lightbulb} title="Thói quen làm bài" />
      {answers.answered < MIN_ATTEMPTS_PER_CELL ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Bạn có {answers.answered}/{MIN_ATTEMPTS_PER_CELL} câu hợp lệ. Làm thêm {MIN_ATTEMPTS_PER_CELL - answers.answered} câu để xem thói quen làm bài.
        </p>
      ) : (
        <>
          <div className="flex items-start gap-3 rounded-2xl bg-accent/60 p-4">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-accent-foreground" />
            <p className="max-w-[72ch] text-sm leading-relaxed font-medium">{insights.recommendation}</p>
          </div>
          <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            <AnswerFact label="Dính bẫy" value={`${answers.traps.reduce((s, t) => s + t.count, 0)} lần`} body={insights.trap} />
            <AnswerFact label="Đổi đáp án" value={`${answers.rightToWrong + answers.wrongToRight + answers.wrongToWrong} lần`} body={insights.change} />
            <AnswerFact
              label="Giây mỗi câu đúng / sai"
              value={`${answers.avgSecCorrect === null ? "–" : Math.round(answers.avgSecCorrect)} / ${answers.avgSecWrong === null ? "–" : Math.round(answers.avgSecWrong)}`}
              body={insights.time}
            />
            <AnswerFact label="Câu đúng có dùng gợi ý" value={`${answers.hintedCorrect} câu`} body={insights.hint} />
          </dl>
        </>
      )}
    </section>
  );
}
