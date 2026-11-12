import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpenCheck, Check, Circle, Compass, Goal, Minus } from "lucide-react";
import { DOMAIN_LABEL, type Domain, type LadderResult } from "@/lib/bloom/domains";
import { TIER_NAME, domainLevelInfo, type LearnerOutcomes, type OutcomeResult, type OutcomeTier } from "@/lib/bloom/outcomes";
import { RUBRIC_BY_LEVEL, RUBRIC_LEVELS, RUBRIC_PASS_LEVEL, type RubricLevel, type RubricTrend } from "@/lib/bloom/rubric";
import { PANEL } from "@/components/analytics/insights-view";
import { PanelHeader } from "@/components/analytics/panel-header";
import { cn } from "@/lib/utils";

export const RUBRIC_CHIP: Record<RubricLevel, string> = {
  1: "bg-destructive/15 text-destructive ring-destructive/30",
  2: "bg-warning/25 text-foreground ring-warning/45",
  3: "bg-warning/12 text-foreground ring-warning/30",
  4: "bg-success/15 text-success ring-success/30",
  5: "bg-success/25 text-success ring-success/45",
};

export const DOMAIN_CHIP: Record<Domain, string> = {
  cognitive: "bg-primary/10 text-primary",
  psychomotor: "bg-info/12 text-info",
  affective: "bg-warning/15 text-foreground",
};

export function RubricChip({ level, className }: { level: RubricLevel | null; className?: string }) {
  if (level === null) return <span className={cn("inline-flex shrink-0 items-center rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border", className)}>Chưa đủ dữ liệu</span>;
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ring-1", RUBRIC_CHIP[level], className)} title={RUBRIC_BY_LEVEL.get(level)!.description}>
      {level}/5 · {RUBRIC_BY_LEVEL.get(level)!.nameVi}
    </span>
  );
}

function Trend({ trend, previous }: { trend: RubricTrend; previous: RubricLevel | null }) {
  if (!trend) return null;
  const Icon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;
  const tone = trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-xs font-semibold", tone)} title="So với 30 ngày trước">
      <Icon className="size-3.5" />
      từ mức {previous}
    </span>
  );
}

export function domainCode(domain: Domain, level: number) {
  return domainLevelInfo(domain, level)?.code ?? `${domain[0].toUpperCase()}${level}`;
}

function OutcomeCard({ o }: { o: OutcomeResult }) {
  const info = domainLevelInfo(o.domain, o.level);
  return (
    <details className="group rounded-2xl border border-border/60 bg-background/40 open:bg-card">
      <summary className="flex cursor-pointer list-none flex-col gap-2 p-4 [&::-webkit-details-marker]:hidden">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-extrabold">{o.code}</span>
          <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold", DOMAIN_CHIP[o.domain])}>
            {domainCode(o.domain, o.level)} · {info?.nameVi}
          </span>
          {o.achieved && (
            <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-bold text-success">
              <Check className="size-3" /> Đạt
            </span>
          )}
          <span className="ml-auto flex items-center gap-2">
            <Trend trend={o.trend} previous={o.previous} />
            <RubricChip level={o.rubric} />
          </span>
        </div>
        <p className="text-sm leading-relaxed text-foreground/90">{o.statement}</p>
        <p className="text-xs text-muted-foreground group-open:hidden">
          {o.measured}/{o.indicators.length} chỉ báo đã đo · bấm để xem chi tiết
        </p>
      </summary>
      <ul className="flex flex-col gap-2 border-t border-border/60 p-4">
        {o.indicators.map((i) => (
          <li key={i.code} className="rounded-xl border border-border/50 p-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="min-w-0 flex-1 text-sm">
                <span className="font-bold">{i.code}</span> {i.statement}
              </p>
              <span className="flex items-center gap-2">
                <Trend trend={i.trend} previous={i.previous} />
                <RubricChip level={i.rubric} />
              </span>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground/80">Kết quả:</span> {i.evidence}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground/80">Cách đánh giá:</span> {i.assessment}
            </p>
          </li>
        ))}
      </ul>
    </details>
  );
}

function Ladder({ title, source, ladder }: { title: string; source: string; ladder: LadderResult }) {
  return (
    <div className="min-w-0 rounded-2xl border border-border/60 p-4">
      <p className="text-sm font-extrabold">{title}</p>
      <p className="text-xs text-muted-foreground">
        {source} · {ladder.insufficient ? "chưa đủ hoạt động" : `đạt bậc ${ladder.reached}/${ladder.steps.length}`}
      </p>
      <ol className="mt-3 flex flex-col gap-2">
        {ladder.steps.map((s) => (
          <li key={s.code} className="flex gap-2.5">
            {s.met ? <Check className="mt-0.5 size-4 shrink-0 text-success" /> : <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground/50" />}
            <div className="min-w-0 text-xs">
              <p className={cn("font-bold", s.met ? "text-foreground" : "text-muted-foreground")}>
                {s.code} · {s.nameVi}
              </p>
              <p className="text-muted-foreground">{s.criterion}</p>
              <p className="text-foreground/80">{s.evidence}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

const TIERS: OutcomeTier[] = ["B", "I", "A"];

export function OutcomesPanel({ data }: { data: LearnerOutcomes }) {
  const { outcomes, domains } = data;
  return (
    <>
      <section className={PANEL}>
        <PanelHeader
          icon={Goal}
          title="Chuẩn đầu ra"
          subtitle={`Bạn đã đạt ${data.achieved}/${data.total} chuẩn đầu ra. Mỗi chuẩn đầu ra được đo bằng các chỉ báo và chấm theo rubric 5 mức; đạt khi mọi chỉ báo từ mức ${RUBRIC_PASS_LEVEL} trở lên.`}
          action={
            <Link href="/syllabus" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-semibold hover:bg-accent/60">
              <BookOpenCheck className="size-4" /> Đề cương chương trình <ArrowRight className="size-3.5" />
            </Link>
          }
        />
        <div className="mb-6 flex flex-wrap gap-2">
          {RUBRIC_LEVELS.map((r) => (
            <span key={r.level} className={cn("rounded-full px-2.5 py-1 text-xs font-semibold ring-1", RUBRIC_CHIP[r.level])} title={r.description}>
              ({r.level}) {r.nameVi}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-7">
          {TIERS.map((tier) => {
            const list = outcomes.filter((o) => o.tier === tier);
            const done = list.filter((o) => o.achieved).length;
            return (
              <div key={tier}>
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <h3 className="text-base font-extrabold">Cấp {TIER_NAME[tier]}</h3>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {done}/{list.length} đạt
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {list.map((o) => (
                    <OutcomeCard key={o.code} o={o} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={PANEL}>
        <PanelHeader icon={Compass} title="Ba miền năng lực" subtitle="Ngoài tư duy (miền nhận thức), chương trình còn đo kỹ năng làm bài và thái độ học tập, cùng sản phẩm bậc Sáng tạo: kế hoạch ôn luyện do bạn tự xây." />
        <div className="grid gap-4 lg:grid-cols-3">
          <Ladder title="Kỹ năng làm bài" source={`${DOMAIN_LABEL.psychomotor.nameVi} — ${DOMAIN_LABEL.psychomotor.source}`} ladder={domains.psychomotor} />
          <Ladder title="Thái độ học tập" source={`${DOMAIN_LABEL.affective.nameVi} — ${DOMAIN_LABEL.affective.source}`} ladder={domains.affective} />
          <div className="min-w-0 rounded-2xl border border-border/60 p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-extrabold">Kế hoạch tự xây</p>
                <p className="text-xs text-muted-foreground">Bậc 6 Sáng tạo — rubric sản phẩm</p>
              </div>
              <RubricChip level={domains.create.rubric} />
            </div>
            <ul className="mt-3 flex flex-col gap-2">
              {domains.create.criteria.map((c) => (
                <li key={c.key} className="flex gap-2.5 text-xs">
                  {c.met ? <Check className="mt-0.5 size-4 shrink-0 text-success" /> : <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground/50" />}
                  <div className="min-w-0">
                    <p className={cn("font-bold", c.met ? "text-foreground" : "text-muted-foreground")}>{c.label}</p>
                    <p className="text-foreground/80">{c.evidence}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
