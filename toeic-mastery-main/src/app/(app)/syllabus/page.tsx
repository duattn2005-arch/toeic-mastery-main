import type { Metadata } from "next";
import { BookOpenCheck, Check, Goal, Grid3x3, Layers, Scale, Target } from "lucide-react";
import { DOMAIN_LABEL, DOMAIN_LEVELS, type Domain } from "@/lib/bloom/domains";
import {
  LEARNING_OUTCOMES,
  PILLAR_LABEL,
  PROGRAM_GOAL,
  PROGRAM_OBJECTIVES,
  TIER_NAME,
  domainLevelInfo,
  indicatorStatement,
  objectiveMatrix,
  outcomeStatement,
  type OutcomeTier,
} from "@/lib/bloom/outcomes";
import { RUBRIC_LEVELS } from "@/lib/bloom/rubric";
import { PANEL } from "@/components/analytics/insights-view";
import { PanelHeader } from "@/components/analytics/panel-header";
import { DOMAIN_CHIP, RUBRIC_CHIP, domainCode } from "@/components/analytics/outcomes-panel";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Đề cương chương trình" };

const TIERS: OutcomeTier[] = ["B", "I", "A"];
const DOMAINS: Domain[] = ["cognitive", "psychomotor", "affective"];
const TH = "px-3 py-2 text-left text-xs font-bold text-muted-foreground";
const TD = "px-3 py-2.5 align-top text-sm";

export default function SyllabusPage() {
  const matrix = objectiveMatrix();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Đề cương chương trình TOEIC Mastery</h1>
        <p className="mt-1 max-w-[75ch] text-sm text-muted-foreground">
          Mục tiêu, chuẩn đầu ra, chỉ báo, cách đánh giá và rubric của chương trình luyện TOEIC Nghe – Đọc. Kết quả của riêng bạn theo từng chuẩn đầu ra nằm ở tab “Chuẩn đầu ra” trên trang Phân tích.
        </p>
      </div>

      <section className={PANEL}>
        <PanelHeader icon={Target} title="1. Mục tiêu chương trình" subtitle="Điều người học đạt được trong 1–3 năm sau khóa học, theo 4 trụ cột giáo dục của UNESCO." />
        <p className="rounded-2xl bg-muted/50 p-4 text-sm leading-relaxed">
          <span className="font-bold">Mục tiêu chung. </span>
          {PROGRAM_GOAL}
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {PROGRAM_OBJECTIVES.map((p) => (
            <li key={p.code} className="rounded-2xl border border-border/60 p-4">
              <p className="text-xs font-bold text-primary">
                {p.code} · {PILLAR_LABEL[p.pillar].nameVi} ({PILLAR_LABEL[p.pillar].nameEn})
              </p>
              <p className="mt-1 text-sm leading-relaxed">{p.statement}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={PANEL}>
        <PanelHeader icon={Goal} title="2. Chuẩn đầu ra và chỉ báo" subtitle="Mỗi chuẩn đầu ra viết theo cấu trúc A-B-C-D (đối tượng – hành vi – nội dung – mức độ), dùng một động từ của thang Bloom, và được đo bằng các chỉ báo." />
        <div className="flex flex-col gap-7">
          {TIERS.map((tier) => (
            <div key={tier}>
              <h3 className="mb-3 text-base font-extrabold">Cấp {TIER_NAME[tier]}</h3>
              <div className="flex flex-col gap-3">
                {LEARNING_OUTCOMES.filter((o) => o.tier === tier).map((o) => (
                  <article key={o.code} className="rounded-2xl border border-border/60 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-extrabold">{o.code}</span>
                      <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold", DOMAIN_CHIP[o.domain])}>
                        {DOMAIN_LABEL[o.domain].nameVi} · {domainCode(o.domain, o.level)} {domainLevelInfo(o.domain, o.level)?.nameVi}
                      </span>
                      <span className="text-xs text-muted-foreground">Đóng góp: {o.objectives.join(", ")}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed">{outcomeStatement(o)}</p>
                    <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                      <dt className="font-bold">A</dt>
                      <dd>{o.audience}</dd>
                      <dt className="font-bold">B</dt>
                      <dd>{o.verb}</dd>
                      <dt className="font-bold">C</dt>
                      <dd>{o.content}</dd>
                      <dt className="font-bold">D</dt>
                      <dd>{o.degree}</dd>
                    </dl>
                    <ul className="mt-3 flex flex-col gap-2 border-t border-border/60 pt-3">
                      {o.indicators.map((i) => (
                        <li key={i.code} className="text-sm">
                          <span className="font-bold">{i.code}</span> {indicatorStatement(i)}
                          <p className="text-xs text-muted-foreground">Cách đánh giá: {i.assessment}</p>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={PANEL}>
        <PanelHeader icon={Grid3x3} title="3. Ma trận chuẩn đầu ra – mục tiêu" subtitle="Chuẩn đầu ra nào đóng góp cho mục tiêu nào." />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className={TH}>Chuẩn đầu ra</th>
                {PROGRAM_OBJECTIVES.map((p) => (
                  <th key={p.code} className={cn(TH, "text-center")}>
                    {p.code}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((r) => (
                <tr key={r.outcome} className="border-b border-border/50">
                  <td className={cn(TD, "font-bold")}>{r.outcome}</td>
                  {PROGRAM_OBJECTIVES.map((p) => (
                    <td key={p.code} className={cn(TD, "text-center")}>
                      {r.objectives[p.code] ? <Check className="mx-auto size-4 text-success" aria-label="Có" /> : <span className="text-muted-foreground/40">·</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={PANEL}>
        <PanelHeader icon={Scale} title="4. Thang đánh giá (rubric) 5 mức" subtitle="Áp dụng cho mọi chỉ báo. Chỉ báo dùng điểm năng lực được quy đổi theo mốc điểm; chỉ báo dạng thang bậc so bậc đạt được với bậc yêu cầu." />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className={TH}>Mức</th>
                <th className={TH}>Điểm năng lực</th>
                <th className={TH}>Thang bậc (kỹ năng / thái độ)</th>
                <th className={TH}>Mô tả</th>
              </tr>
            </thead>
            <tbody>
              {RUBRIC_LEVELS.map((r, idx) => {
                const next = RUBRIC_LEVELS[idx + 1];
                const range = next ? `${Math.round(r.minScore * 100)}% – dưới ${Math.round(next.minScore * 100)}%` : `từ ${Math.round(r.minScore * 100)}%`;
                const ladder = ["Chưa đạt bậc nào", "Đạt từ bậc 1, còn thiếu từ 2 bậc trở lên", "Thiếu 1 bậc so với yêu cầu", "Đạt đúng bậc yêu cầu", "Vượt bậc yêu cầu"][idx];
                return (
                  <tr key={r.level} className="border-b border-border/50">
                    <td className={TD}>
                      <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold ring-1", RUBRIC_CHIP[r.level])}>
                        ({r.level}) {r.nameVi}
                      </span>
                    </td>
                    <td className={TD}>{r.level === 1 ? `dưới ${Math.round(RUBRIC_LEVELS[1].minScore * 100)}%` : range}</td>
                    <td className={TD}>{ladder}</td>
                    <td className={cn(TD, "text-muted-foreground")}>{r.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className={PANEL}>
        <PanelHeader icon={Layers} title="5. Thang cấp độ tư duy Bloom — ba miền" subtitle="Bộ động từ dùng để viết chuẩn đầu ra và chỉ báo." />
        <div className="grid gap-4 lg:grid-cols-3">
          {DOMAINS.map((d) => (
            <div key={d} className="min-w-0 rounded-2xl border border-border/60 p-4">
              <p className="text-sm font-extrabold">
                {DOMAIN_LABEL[d].nameVi} <span className="font-normal text-muted-foreground">({DOMAIN_LABEL[d].nameEn})</span>
              </p>
              <p className="text-xs text-muted-foreground">{DOMAIN_LABEL[d].source}</p>
              <ol className="mt-3 flex flex-col gap-2.5">
                {DOMAIN_LEVELS[d].map((l) => (
                  <li key={l.code} className="text-xs">
                    <p className="font-bold">
                      {l.code}. {l.nameVi} ({l.nameEn})
                    </p>
                    <p className="text-muted-foreground">{l.description}</p>
                    <p className="text-foreground/80">{l.verbs.join(", ")}</p>
                    <p className="text-muted-foreground italic">{l.verbsEn.join(", ")}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <BookOpenCheck className="size-4" />
        Xây dựng theo hướng dẫn chuẩn đầu ra (ABCD, SMART, chỉ báo, rubric) và tiêu chí Thông tư 17/2021/TT-BGDĐT.
      </p>
    </div>
  );
}
