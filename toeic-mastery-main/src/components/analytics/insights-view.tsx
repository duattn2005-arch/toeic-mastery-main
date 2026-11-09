import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Circle,
  Gauge,
  History,
  Info,
  Layers,
  ListChecks,
  Repeat2,
  Route,
  Target,
  Timer,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { PART_META } from "@/lib/constants/toeic";
import { MASTERY_THRESHOLD, MIN_ATTEMPTS_PER_CELL, WEAK_THRESHOLD } from "@/lib/bloom/config";
import { STATUS_LABEL, type Alert, type LabelStatus, type LearningInsights, type PartInsight, type SkillStat, type Weakness } from "@/lib/services/insights/engine";
import { PanelHeader } from "@/components/analytics/panel-header";
import { PracticeButton } from "@/components/analytics/practice-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TestPart } from "@/generated/prisma/enums";

export const PANEL = "min-w-0 rounded-[1.75rem] border border-border/60 bg-card p-5 shadow-soft sm:p-7";
const pct = (x: number) => `${Math.round(x * 100)}%`;
const nameOf = (s: SkillStat) => (s.kind === "part" ? PART_META[s.key as TestPart].shortLabel : s.title);

const STATUS_STYLE: Record<LabelStatus, { tile: string; dot: string; text: string; bar: string }> = {
  pass: { tile: "border-success/30 bg-success/10", dot: "bg-success", text: "text-success", bar: "bg-success" },
  near: { tile: "border-warning/35 bg-warning/10", dot: "bg-warning", text: "text-warning", bar: "bg-warning" },
  gap: { tile: "border-destructive/30 bg-destructive/10", dot: "bg-destructive", text: "text-destructive", bar: "bg-destructive" },
  unknown: { tile: "border-dashed border-border bg-muted/40", dot: "bg-muted-foreground/40", text: "text-muted-foreground", bar: "bg-muted-foreground/40" },
};

function Meter({ value, status, className }: { value: number; status: LabelStatus; className?: string }) {
  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div className={cn("an-bar h-full rounded-full", STATUS_STYLE[status].bar)} style={{ width: `${Math.max(3, Math.round(value * 100))}%` }} />
      {/* Hổng / Vững marks (src/lib/bloom/config.ts). */}
      <span className="absolute inset-y-0 w-px bg-foreground/15" style={{ left: `${WEAK_THRESHOLD * 100}%` }} />
      <span className="absolute inset-y-0 w-px bg-foreground/25" style={{ left: `${MASTERY_THRESHOLD * 100}%` }} />
    </div>
  );
}

function StatusChip({ status }: { status: LabelStatus }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold", STATUS_STYLE[status].tile, STATUS_STYLE[status].text)}>
      <span className={cn("size-1.5 rounded-full", STATUS_STYLE[status].dot)} />
      {STATUS_LABEL[status]}
    </span>
  );
}

/** Readiness as a ring, filled by the share of next-level conditions met. */
function ReadinessRing({ value }: { value: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative size-28 shrink-0">
      <svg viewBox="0 0 110 110" className="size-full -rotate-90" aria-hidden>
        <defs>
          <linearGradient id="readiness-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--success)" />
          </linearGradient>
        </defs>
        <circle cx="55" cy="55" r={r} fill="none" stroke="var(--muted)" strokeWidth="9" />
        <circle
          cx="55"
          cy="55"
          r={r}
          fill="none"
          stroke="url(#readiness-ring)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value)}
          className="an-ring"
          style={{ "--an-ring-full": c } as React.CSSProperties}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[1.65rem] leading-none font-extrabold tabular-nums">{Math.round(value * 100)}%</span>
        <span className="mt-1 text-[11px] font-medium text-muted-foreground">sẵn sàng</span>
      </div>
    </div>
  );
}

/** How close the next level is, condition by condition. */
export function ReadinessCard({ insights }: { insights: LearningInsights }) {
  const r = insights.routing;
  const met = r.checklist.filter((c) => c.ok).length;
  return (
    <aside className={PANEL}>
      <div className="flex items-center gap-4">
        <ReadinessRing value={r.readiness} />
        <div>
          <h2 className="text-lg leading-snug font-bold">{r.level === "ADVANCED" ? "Điều kiện thi thật" : "Điều kiện lên cấp"}</h2>
          <p className="mt-1 text-sm text-muted-foreground tabular-nums">
            Đạt {met}/{r.checklist.length} điều kiện
          </p>
        </div>
      </div>
      <ul className="mt-5 flex flex-col gap-2">
        {r.checklist.map((c) => (
          <li key={c.label} className={cn("flex items-start gap-2.5 rounded-xl p-2.5", c.ok ? "bg-success/8" : "bg-muted/40")}>
            {c.ok ? <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" /> : <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground/50" />}
            <div className="min-w-0">
              <p className={cn("text-sm leading-snug", c.ok ? "text-muted-foreground" : "font-medium text-foreground")}>{c.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{c.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

const ALERT_STYLE: Record<Alert["tone"], { badge: string; icon: typeof Info }> = {
  warn: { badge: "bg-warning/15 text-warning", icon: AlertTriangle },
  info: { badge: "bg-info/15 text-info", icon: Info },
  good: { badge: "bg-success/15 text-success", icon: TrendingUp },
};

export function AlertsStrip({ alerts }: { alerts: Alert[] }) {
  if (alerts.length === 0) return null;
  return (
    <div className="grid gap-3 sm:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]">
      {alerts.map((a) => {
        const { badge, icon: Icon } = ALERT_STYLE[a.tone];
        return (
          <div key={a.title} className="an-lift flex gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
            <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-xl", badge)}>
              <Icon className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm leading-snug font-semibold">{a.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function PlanTimeline({ insights }: { insights: LearningInsights }) {
  const plan = insights.routing.plan;
  if (plan.length === 0) return null;
  return (
    <section className={PANEL}>
      <PanelHeader icon={Route} title="Lộ trình AI đề xuất" subtitle="Làm theo thứ tự. Các bước được tính lại sau mỗi bài." />
      <ol className="relative flex flex-col gap-3">
        {plan.map((step, i) => (
          <li key={`${step.title}-${i}`} className="relative flex gap-3">
            <div className="flex flex-col items-center">
              <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold", i === 0 ? "bg-primary text-primary-foreground shadow-soft" : "bg-primary/12 text-primary ring-1 ring-primary/25")}>{i + 1}</span>
              {i < plan.length - 1 && <span className="mt-1 w-px flex-1 bg-border" />}
            </div>
            <div className={cn("an-lift flex flex-1 flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between", i === 0 ? "border-primary/30 bg-accent/50" : "border-border/60 bg-background/50")}>
              <div>
                <p className="text-sm font-bold">{step.title}</p>
                <p className="text-sm text-muted-foreground">{step.detail}</p>
              </div>
              {step.action?.type === "practice" && <PracticeButton target={step.action.target} label={step.action.label} variant={i === 0 ? "default" : "outline"} />}
              {step.action?.type === "link" && (
                <Button asChild size="sm" variant={i === 0 ? "default" : "outline"} className="gap-1.5">
                  <Link href={step.action.href}>
                    {step.action.label} <ArrowRight className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function WeaknessCard({ w, rank }: { w: Weakness; rank: number }) {
  return (
    <article className="an-lift relative flex flex-col gap-3 overflow-hidden rounded-3xl border border-border/60 bg-background/60 p-5 pt-6">
      <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1.5", STATUS_STYLE[w.status === "unknown" ? (w.score < 0.5 ? "gap" : "near") : w.status].bar)} />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-destructive/12 text-sm font-black text-destructive">#{rank}</span>
          <div>
            <h3 className="font-bold leading-snug">{w.headline}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <StatusChip status={w.status === "unknown" ? (w.score < 0.5 ? "gap" : "near") : w.status} />
              {!w.confident && <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">Dữ liệu sơ bộ · {w.attempted} câu</span>}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold tabular-nums">{pct(w.score)}</div>
          {w.pointsGain > 0 && <div className="text-xs font-semibold text-success">≈ +{w.pointsGain} điểm</div>}
        </div>
      </div>
      <Meter value={w.score} status={w.status === "unknown" ? (w.score < 0.5 ? "gap" : "near") : w.status} />
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
            <Brain className="size-4 text-muted-foreground" /> Dữ liệu cho thấy
          </p>
          <ul className="flex flex-col gap-1 text-sm leading-relaxed">
            {w.findings.map((f) => (
              <li key={f} className="flex gap-1.5">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/40" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
            <Target className="size-4 text-primary" /> Cách khắc phục
          </p>
          <ul className="flex flex-col gap-1 text-sm leading-relaxed">
            {w.advice.map((a) => (
              <li key={a} className="flex gap-1.5">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        <PracticeButton
          target={{ kind: w.kind, key: w.key, ...(w.bloom ? { bloom: w.bloom.level } : {}) }}
          label={w.bloom ? `Luyện bậc ${w.bloom.level} · ${w.bloom.nameVi}` : "Luyện 12 câu đúng điểm yếu"}
        />
        {w.status === "gap" && <PracticeButton target={{ kind: w.kind, key: w.key, foundation: true, ...(w.bloom ? { bloom: w.bloom.level } : {}) }} label="Bản nền tảng (dễ hơn)" variant="outline" />}
        {w.kind === "grammar" && (
          <Button asChild size="sm" variant="outline" className="gap-1.5">
            <Link href={`/grammar/${w.key}`}>
              <BookOpen className="size-4" /> Học lý thuyết
            </Link>
          </Button>
        )}
      </div>
    </article>
  );
}

export function WeaknessSection({ insights }: { insights: LearningInsights }) {
  return (
    <section id="diem-yeu" className={cn(PANEL, "scroll-mt-6")}>
      <PanelHeader icon={TrendingDown} title="Điểm yếu cần vá" subtitle={insights.weaknesses.length > 0 ? "Xếp theo mức mất điểm. Câu bạn từng sai được đưa vào đề luyện trước." : undefined} />
      {insights.weaknesses.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {insights.answered < 10
            ? "Chưa đủ dữ liệu — làm thêm vài bài để AI tìm ra điểm yếu."
            : `Không có kỹ năng nào dưới ${Math.round(MASTERY_THRESHOLD * 100)}%. Tăng độ khó bằng đề Full Test để tìm giới hạn mới.`}
        </p>
      ) : (
        <>
          <div className="grid gap-4 xl:grid-cols-2">
            {insights.weaknesses.map((w, i) => (
              <WeaknessCard key={w.id} w={w} rank={i + 1} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function HeatTile({ s }: { s: SkillStat }) {
  const style = STATUS_STYLE[s.status];
  const practicable = s.attempted >= 5 && s.status !== "pass";
  return (
    <div className={cn("an-lift flex flex-col gap-2 rounded-2xl border p-3.5", style.tile)}>
      <div className="flex items-start justify-between gap-2">
        <p className="line-clamp-2 text-sm font-semibold leading-snug">{nameOf(s)}</p>
        <span className={cn("text-base font-extrabold tabular-nums", style.text)}>{s.attempted ? pct(s.score) : "—"}</span>
      </div>
      <Meter value={s.score} status={s.status} />
      <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
        <span>
          {STATUS_LABEL[s.status]} · {s.attempted} câu
        </span>
        {practicable && <PracticeButton target={{ kind: s.kind, key: s.key }} label="Luyện" variant="outline" className="h-7 px-2 text-xs" />}
      </div>
    </div>
  );
}

export function CompetencyMap({ insights }: { insights: LearningInsights }) {
  const groups: { title: string; hint: string; items: SkillStat[] }[] = [
    { title: "Theo Part", hint: "7 phần của đề thi", items: insights.parts },
    { title: "Nhãn kiến thức (ngữ pháp)", hint: "Part 5–6", items: insights.grammar },
    { title: "Nhãn chiến lược (dạng câu)", hint: "Suy luận, ý chính, NOT stated…", items: insights.strategies },
  ];
  return (
    <section className={PANEL}>
      <PanelHeader
        icon={Layers}
        title="Bản đồ năng lực"
        subtitle={`Vững từ ${Math.round(MASTERY_THRESHOLD * 100)}%, Hổng dưới ${Math.round(WEAK_THRESHOLD * 100)}%, chỉ xếp loại khi đủ ${MIN_ATTEMPTS_PER_CELL} câu.`}
        action={
          <div className="hidden items-center gap-3 text-[11px] text-muted-foreground sm:flex">
            {(["pass", "near", "gap", "unknown"] as LabelStatus[]).map((st) => (
              <span key={st} className="inline-flex items-center gap-1">
                <span className={cn("size-2 rounded-full", STATUS_STYLE[st].dot)} /> {STATUS_LABEL[st]}
              </span>
            ))}
          </div>
        }
      />
      <div className="flex flex-col gap-5">
        {groups.map((g) =>
          g.items.length === 0 ? null : (
            <div key={g.title}>
              <p className="mb-2.5 text-sm font-bold">
                {g.title} <span className="font-normal text-muted-foreground">({g.hint})</span>
              </p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {g.items.map((s) => (
                  <HeatTile key={`${s.kind}:${s.key}`} s={s} />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

function PaceCell({ p }: { p: PartInsight }) {
  if (p.avgSec === null) return <span className="text-muted-foreground">—</span>;
  const tone = p.pace === "slow" ? "text-destructive" : p.pace === "fast" ? "text-warning" : "text-success";
  return (
    <span className={cn("font-semibold tabular-nums", tone)}>
      {p.avgSec}s<span className="font-normal text-muted-foreground"> / {p.targetSec}s</span>
    </span>
  );
}

export function PartTable({ parts }: { parts: PartInsight[] }) {
  return (
    <section className={PANEL}>
      <PanelHeader icon={ListChecks} title="Chi tiết từng Part" />
      <div className="-mx-2 overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="px-2 py-2 font-semibold">Part</th>
              <th className="px-2 py-2 font-semibold">Năng lực</th>
              <th className="px-2 py-2 font-semibold">Đúng</th>
              <th className="px-2 py-2 font-semibold">Xu hướng</th>
              <th className="px-2 py-2 font-semibold">Tốc độ</th>
              <th className="px-2 py-2 font-semibold">Bỏ trống</th>
              <th className="px-2 py-2" />
            </tr>
          </thead>
          <tbody>
            {parts.map((p) => (
              <tr key={p.part} className="border-t border-border/60 transition-colors hover:bg-accent/40">
                <td className="px-2 py-2.5">
                  <div className="font-semibold">{PART_META[p.part].shortLabel}</div>
                  <div className="text-xs text-muted-foreground">{PART_META[p.part].label.split("— ")[1]}</div>
                </td>
                <td className="w-40 px-2 py-2.5">
                  <div className="flex items-center gap-2">
                    <Meter value={p.score} status={p.status} className="w-20" />
                    <span className={cn("font-bold tabular-nums", STATUS_STYLE[p.status].text)}>{p.attempted ? pct(p.score) : "—"}</span>
                  </div>
                </td>
                <td className="px-2 py-2.5 tabular-nums">
                  {p.correct}/{p.judged}
                </td>
                <td className="px-2 py-2.5">
                  {p.trend ? (
                    <span className={cn("inline-flex items-center gap-1 font-semibold tabular-nums", p.trend.delta >= 0 ? "text-success" : "text-destructive")}>
                      {p.trend.delta >= 0 ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
                      {p.trend.delta >= 0 ? "+" : ""}
                      {Math.round(p.trend.delta * 100)}%
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-2 py-2.5">
                  <PaceCell p={p} />
                </td>
                <td className="px-2 py-2.5 tabular-nums">{p.skipped ? `${p.skipped} (${pct(p.skipRate)})` : "0"}</td>
                <td className="px-2 py-2.5 text-right">{p.attempted >= 5 && <PracticeButton target={{ kind: "part", key: p.part }} label="Luyện" variant="outline" className="h-7 px-2 text-xs" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function BehaviorPanel({ insights }: { insights: LearningInsights }) {
  const b = insights.behaviors;
  const items = [
    { icon: Repeat2, label: "Đổi đúng → sai", value: b.rightToWrong, hint: "Ảo giác tự tin: đã chọn đúng rồi đổi.", bad: b.rightToWrong > b.wrongToRight },
    { icon: Repeat2, label: "Đổi sai → đúng", value: b.wrongToRight, hint: "Lần xem lại có ích.", bad: false },
    { icon: Timer, label: "Đoán (< 8 giây)", value: insights.noise.guessed, hint: "Reading — loại khỏi điểm năng lực.", bad: insights.noise.guessed >= 10 },
    { icon: Gauge, label: "Ngâm (> 2,5 phút)", value: insights.noise.stuck, hint: "Reading — loại khỏi điểm năng lực.", bad: insights.noise.stuck >= 5 },
  ];
  return (
    <section className={PANEL}>
      <PanelHeader icon={Brain} title="Hành vi làm bài" />
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className={cn("an-lift rounded-2xl border p-3.5", it.bad ? "border-warning/35 bg-warning/10" : "border-border/60 bg-background/50")}>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <it.icon className="size-3.5" /> {it.label}
            </div>
            <div className="mt-1 text-2xl font-extrabold tabular-nums">{it.value}</div>
            <div className="text-[11px] leading-snug text-muted-foreground">{it.hint}</div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <p className="mb-2.5 text-sm font-bold">Theo độ khó</p>
        <div className="flex flex-col gap-2">
          {insights.difficulty.map((d) => {
            const status: LabelStatus = d.attempted < MIN_ATTEMPTS_PER_CELL ? "unknown" : d.accuracy < WEAK_THRESHOLD ? "gap" : d.accuracy < MASTERY_THRESHOLD ? "near" : "pass";
            return (
              <div key={d.level} className="flex items-center gap-3 text-sm">
                <span className="w-24 shrink-0 font-medium">{d.level === "EASY" ? "Dễ" : d.level === "MEDIUM" ? "Trung bình" : "Khó"}</span>
                <Meter value={d.accuracy} status={status} />
                <span className="w-24 shrink-0 text-right tabular-nums text-muted-foreground">
                  <span className={cn("font-bold", STATUS_STYLE[status].text)}>{d.attempted ? pct(d.accuracy) : "—"}</span> · {d.attempted}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function StaminaPanel({ stamina }: { stamina: LearningInsights["stamina"] }) {
  return (
    <section className={PANEL}>
      <PanelHeader icon={Gauge} title="Đường cong sức bền" />
      {!stamina ? (
        <p className="text-sm text-muted-foreground">Hoàn thành một đề Full Test liền mạch để AI đo độ chính xác theo từng khối 30 phút và phát hiện điểm sụt hiệu suất cuối bài.</p>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            “{stamina.testTitle}” — độ chính xác theo từng khối 30 phút.{" "}
            {stamina.hasCliff ? (
              <span className="font-semibold text-destructive">Khối cuối sụt {pct(stamina.dropRatio ?? 0)} so với khối đầu.</span>
            ) : (
              <span className="font-semibold text-success">Sức bền ổn định.</span>
            )}
          </p>
          <div className="flex items-end gap-3">
            {stamina.blocks.map((b, i) => {
              const last = i === stamina.blocks.length - 1;
              return (
                <div key={b.blockIndex} className="flex flex-1 flex-col items-center gap-1.5">
                  <span className="text-xs font-bold tabular-nums">{pct(b.accuracy)}</span>
                  <div className="flex h-28 w-full items-end rounded-t-xl bg-muted/50">
                    <div
                      className={cn("an-step w-full rounded-t-xl", stamina.hasCliff && last ? "bg-destructive/70" : "bg-[linear-gradient(180deg,var(--primary),color-mix(in_srgb,var(--primary)_55%,transparent))]")}
                      style={{ height: `${Math.max(6, b.accuracy * 100)}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    {b.startMin}–{b.endMin}′
                  </span>
                </div>
              );
            })}
          </div>
          <Button asChild size="sm" variant="outline" className="mt-4 gap-1.5">
            <Link href={`/history/${stamina.attemptId}`}>
              <History className="size-4" /> Xem lại bài
            </Link>
          </Button>
        </>
      )}
    </section>
  );
}

export function FocusVocabulary({ words }: { words: LearningInsights["focusVocabulary"] }) {
  if (words.length === 0) return null;
  return (
    <section className={PANEL}>
      <PanelHeader icon={BookOpen} title="Từ vựng hay gặp trong câu sai" subtitle="Bấm vào một từ để tra nghĩa." />
      <div className="flex flex-wrap gap-1.5">
        {words.map((v) => (
          <Link key={v.word} href={`/dictionary/${encodeURIComponent(v.word)}`} className="an-lift rounded-full border border-border/70 bg-background/60 px-3.5 py-1.5 text-sm font-medium hover:border-primary/40 hover:text-primary">
            {v.word}
            {v.misses > 1 && <span className="ml-1 text-muted-foreground">×{v.misses}</span>}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function StrengthsPanel({ strengths }: { strengths: SkillStat[] }) {
  return (
    <section className={PANEL}>
      <PanelHeader icon={TrendingUp} title="Điểm mạnh" />
      {strengths.length === 0 ? (
        <p className="text-sm text-muted-foreground">Chưa có kỹ năng nào đạt {Math.round(MASTERY_THRESHOLD * 100)}% với đủ số câu.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {strengths.map((s) => (
            <li key={`${s.kind}:${s.key}`} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-semibold">{nameOf(s)}</span>
                <span className="font-bold tabular-nums text-success">{pct(s.score)}</span>
              </div>
              <Meter value={s.score} status="pass" />
              <span className="text-[11px] text-muted-foreground">
                {s.correct}/{s.judged} câu đúng
                {s.kind !== "part" && ` · ${s.parts.map((p) => PART_META[p].shortLabel).join(", ")}`}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
