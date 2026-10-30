import Link from "next/link";
import { ArrowRight, Check, Download, Layers, Lightbulb, Route, Sparkles } from "lucide-react";
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
import type { CellResult, LevelMastery } from "@/lib/bloom/engine";
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
  yellow: "bg-warning/15 text-warning ring-warning/35",
  red: "bg-destructive/15 text-destructive ring-destructive/30",
  insufficient: "bg-muted/60 text-muted-foreground ring-border",
  inferred: "bg-success/8 text-success/80 ring-success/25 [background-image:repeating-linear-gradient(135deg,transparent_0_5px,color-mix(in_srgb,var(--success)_12%,transparent)_5px_7px)]",
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

function LevelCard({ m, current }: { m: LevelMastery; current: boolean }) {
  const info = LEVEL.get(m.level)!;
  const value = m.score ?? m.pooledAccuracy;
  const status = m.mastered ? "green" : m.status;
  return (
    <div className={cn("relative flex min-w-0 flex-col gap-2 rounded-2xl border border-border/60 bg-background/60 p-3.5", current && "border-primary/50 ring-2 ring-primary/30")}>
      {current && <span className="absolute -top-2.5 left-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">Đang ở bậc này</span>}
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <span className="size-2 rounded-full" style={{ background: info.color }} />
          Bậc {info.id}
        </span>
        <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">Cấp {m.tier}</span>
      </div>
      <div>
        <p className="text-sm font-bold">
          {info.nameVi} <span className="font-medium text-muted-foreground">· {info.nameEn}</span>
        </p>
        <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground" title={info.description}>
          {info.description}
        </p>
      </div>
      <div className="mt-auto flex items-end justify-between gap-2">
        <span className={cn("text-2xl font-extrabold tabular-nums", status === "green" ? "text-success" : status === "yellow" ? "text-warning" : status === "red" ? "text-destructive" : "text-muted-foreground")}>
          {value === null ? "—" : pct(value)}
        </span>
        {m.mastered ? (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-success">
            <Check className="size-3.5" /> Vững
          </span>
        ) : (
          <span className="text-right text-[11px] text-muted-foreground">{m.score === null ? (value === null ? "Chưa có dữ liệu" : "Ước tính, chưa đủ dữ liệu") : CELL_STATUS_LABEL[status]}</span>
        )}
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", status === "green" ? "bg-success" : status === "yellow" ? "bg-warning" : status === "red" ? "bg-destructive" : "bg-muted-foreground/40")}
          style={{ width: `${Math.max(3, Math.round((value ?? 0) * 100))}%` }}
        />
        <span className="absolute inset-y-0 w-px bg-foreground/15" style={{ left: `${WEAK_THRESHOLD * 100}%` }} />
        <span className="absolute inset-y-0 w-px bg-foreground/30" style={{ left: `${MASTERY_THRESHOLD * 100}%` }} />
      </div>
      <p className="text-[11px] text-muted-foreground tabular-nums">
        {m.attempts} câu · {m.cells.green + m.cells.inferred} vững · {m.cells.yellow} đang lên · {m.cells.red} hổng
      </p>
      {!m.mastered && m.blockers[0] && <p className="text-[11px] leading-snug text-foreground/70">{m.blockers[0]}</p>}
    </div>
  );
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
        className={cn("flex h-11 flex-col items-center justify-center rounded-lg text-xs font-bold ring-1 tabular-nums ring-inset", STATUS_CELL[st], isFrontier && "ring-2 ring-primary/70")}
        title={cellTitle(cell, level)}
      >
        {st === "insufficient" ? (
          <>
            <span>{pct(cell.score)}</span>
            <span className="text-[9px] font-medium opacity-80">
              {cell.attempts}/{MIN_ATTEMPTS_PER_CELL}
            </span>
          </>
        ) : st === "inferred" ? (
          <span className="text-[10px] font-semibold">suy ra</span>
        ) : (
          <>
            <span>{pct(cell.score)}</span>
            {(cell.stale || cell.cappedReason) && <span className="text-[9px] font-medium opacity-80">{cell.stale ? "cần ôn lại" : "thiếu giờ"}</span>}
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
  return <PracticeButton target={{ kind: row.kind, key: row.key, bloom: level }} label={`Luyện bậc ${level}`} variant="outline" className="h-8 px-2.5 text-xs" />;
}

export function BloomPanel({ bloom }: { bloom: LearnerBloom }) {
  const { profile, rows, remember } = bloom;
  const { levels, tier, behavior, noise } = profile;
  const current = tier.frontier;
  const shown = rows.filter((r) => r.attempts > 0).slice(0, MAX_ROWS);
  const hidden = rows.filter((r) => r.attempts > 0).length - shown.length;
  const tiers: ("B" | "I" | "A")[] = ["B", "I", "A"];

  return (
    <section className={PANEL} id="bloom">
      <SectionHeader icon={Layers} title="Bậc tư duy — Thang Bloom" />
      <p className="-mt-1 mb-4 max-w-[72ch] text-sm leading-relaxed text-muted-foreground">
        Mỗi câu bạn làm được xếp vào một bậc tư duy. Một bậc chỉ được coi là <b className="font-semibold text-foreground">vững</b> khi đạt từ {pct(MASTERY_THRESHOLD)} trên ít nhất{" "}
        {MIN_ATTEMPTS_PER_CELL} câu khác nhau, và bài luyện luôn bắt đầu từ bậc thấp nhất còn hổng của từng nhãn — vững nền rồi mới lên cao.
      </p>

      {/* Tier progress */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
        {tiers.map((t, i) => {
          const done = tier.reached !== null && tiers.indexOf(tier.reached) >= i;
          const working = tier.working === t;
          return (
            <span key={t} className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold",
                  done ? "bg-success/15 text-success" : working ? "bg-primary/15 text-primary ring-1 ring-primary/30" : "bg-muted text-muted-foreground"
                )}
              >
                {done && <Check className="size-3.5" />}
                Cấp {t}: {TIER_LEVELS[t].map((l) => LEVEL.get(l)!.nameVi).join(" + ")}
                {working && tier.missing.length > 0 && <span className="font-medium opacity-80">· còn {tier.missing.map((l) => LEVEL.get(l)!.nameVi).join(", ")}</span>}
              </span>
              {i < tiers.length - 1 && <ArrowRight className="size-3.5 text-muted-foreground" />}
            </span>
          );
        })}
      </div>

      {/* Level ladder */}
      <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3 lg:grid-cols-6">
        {SCORED_LEVELS.map((l) => (
          <LevelCard key={l} m={levels[l]} current={current === l} />
        ))}
        <div className="flex min-w-0 flex-col gap-2 rounded-2xl border border-dashed border-border bg-background/40 p-3.5">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <span className="size-2 rounded-full" style={{ background: LEVEL.get(6 as BloomLevelId)!.color }} />
            Bậc 6 · Đầu ra
          </span>
          <p className="text-sm font-bold">
            Sáng tạo <span className="font-medium text-muted-foreground">· Create</span>
          </p>
          <p className="text-[11px] leading-snug text-muted-foreground">Tự xây chiến thuật và lộ trình riêng — không chấm điểm.</p>
          <div className="mt-auto flex flex-col gap-1.5 text-xs font-semibold">
            <a href="/api/insights/profile" download className="flex items-center gap-1.5 text-primary hover:underline">
              <Download className="size-3.5" /> Hồ sơ chiến lược
            </a>
            <Link href="/mentor/path" className="flex items-center gap-1.5 text-primary hover:underline">
              <Route className="size-3.5" /> Lộ trình của bạn
            </Link>
            <Link href="/bookmarks" className="flex items-center gap-1.5 text-primary hover:underline">
              <Sparkles className="size-3.5" /> Bộ câu tự lưu
            </Link>
          </div>
        </div>
      </div>

      {/* Heatmap label × level */}
      <div className="mt-6">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-sm font-bold">Bản đồ nhãn × bậc tư duy</h3>
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
          <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">Làm vài bài luyện hoặc đề thi để bản đồ bắt đầu hiện ra.</p>
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
        {hidden > 0 && <p className="mt-2 text-xs text-muted-foreground">Còn {hidden} nhãn ít dữ liệu hơn — làm thêm bài để chúng hiện lên.</p>}
        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          Điểm một ô = độ chính xác trên tối đa 20 câu gần nhất (mỗi câu tính một lần; câu đúng nhờ gợi ý tính nửa điểm) + thưởng tốc độ phần Đọc − trừ khi dính đáp án bẫy hoặc
          đổi đúng thành sai. Từ bậc Vận dụng, cần ít nhất {pct(MIN_TIMED_SHARE)} câu làm có tính giờ mới được công nhận vững. Rê chuột lên từng ô để xem chi tiết.
        </p>
      </div>

      {/* Signals the score is built on */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Signal title="Dữ liệu đã lọc" body={`${noise.guess} câu đoán mò (< 8 giây) · ${noise.stuck} câu ngâm quá lâu · ${noise.revealed} câu xem đáp án trước khi chọn — không tính vào điểm.`} />
        <Signal
          title="Tín hiệu bậc Nhớ"
          body={`${remember.lookups30d} lần tra từ trong 30 ngày · ${remember.savedWords} từ đã lưu. Ôn flashcard được tính vào hàng Từ vựng, bậc 1.`}
        />
        <Signal title="Tín hiệu bậc Hiểu" body={`${profile.explanationViews} lần mở giải thích · ${profile.hintsUsed} bước gợi ý đã dùng khi luyện.`} icon />
        <Signal
          title="Bậc Đánh giá — ra quyết định"
          body={
            behavior.answered
              ? `${pct(behavior.rightToWrongShare)} câu bậc 4–5 đổi đúng → sai (${behavior.rightToWrong} lần, sai → đúng ${behavior.wrongToRight}).${
                  behavior.mockSpread !== null ? ` Điểm ${behavior.mockAccuracies.length} Mock gần nhất chênh ${pct(behavior.mockSpread)}.` : " Cần 2 Mock test để đo độ ổn định."
                }`
              : "Chưa có câu bậc Phân tích/Đánh giá nào."
          }
          tone={behavior.answered ? (behavior.decisionOk && behavior.stabilityOk !== false ? "good" : "warn") : undefined}
        />
      </div>
    </section>
  );
}

function Legend({ cls, label }: { cls: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className={cn("size-3 rounded ring-1 ring-inset", cls)} /> {label}
    </span>
  );
}

function Signal({ title, body, icon, tone }: { title: string; body: string; icon?: boolean; tone?: "good" | "warn" }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-background/60 p-3.5", tone === "warn" && "border-warning/40", tone === "good" && "border-success/30")}>
      <p className="flex items-center gap-1.5 text-xs font-semibold">
        {icon && <Lightbulb className="size-3.5 text-warning" />}
        {title}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
