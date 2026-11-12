import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { MIN_ATTEMPTS_PER_CELL } from "@/lib/bloom/config";
import { COHORT_MAX_LEARNERS, auditOutcomes, getCohortOutcomeReport, getOutcomeCatalog } from "@/lib/bloom/outcome-data";
import { OBJECTIVE_CHECKLIST, outcomeStatement } from "@/lib/bloom/outcomes";
import { RUBRIC_LEVELS, type RubricLevel } from "@/lib/bloom/rubric";
import { DOMAIN_CHIP, RUBRIC_CHIP, domainCode } from "@/components/analytics/outcomes-panel";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Chuẩn đầu ra" };

const SECTION = "rounded-2xl border border-border bg-card p-6 shadow-soft";
const H2 = "mb-1 text-sm font-semibold text-muted-foreground";
const TH = "px-3 py-2 text-left text-xs font-bold text-muted-foreground";
const TD = "px-3 py-2 align-top text-sm";

const BAR: Record<RubricLevel, string> = { 1: "bg-destructive", 2: "bg-warning", 3: "bg-warning/55", 4: "bg-success/70", 5: "bg-success" };

function Mark({ ok }: { ok: boolean }) {
  return ok ? <Check className="size-4 text-success" aria-label="Phù hợp" /> : <X className="size-4 text-destructive" aria-label="Không phù hợp" />;
}

export default async function AdminOutcomesPage() {
  const catalog = await getOutcomeCatalog();
  const [audits, cohort] = await Promise.all([auditOutcomes(catalog), getCohortOutcomeReport()]);
  const OUTCOME_BY_CODE = new Map(catalog.outcomes.map((o) => [o.code, o]));
  const LEARNING_OUTCOMES = catalog.outcomes;
  const failing = audits.filter((a) => a.checklist.some((c) => !c.met));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Chuẩn đầu ra</h1>
        <p className="mt-1 max-w-[80ch] text-sm text-muted-foreground">
          Kiểm tra sự phù hợp của mục tiêu và chuẩn đầu ra, đối chiếu chuẩn đầu ra với ngân hàng câu hỏi, và đo mức đạt của người học. Câu chữ sửa được ngay trên web; cách đo (chỉ báo) khai báo ở <code>src/lib/bloom/outcomes.ts</code>. Xem bản công bố tại{" "}
          <Link href="/syllabus" className="font-semibold text-primary underline-offset-2 hover:underline">
            Đề cương
          </Link>
          .
        </p>
        <Link href="/admin/outcomes/edit" className="mt-3 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          Chỉnh sửa mục tiêu và chuẩn đầu ra
        </Link>
      </div>

      <section className={SECTION}>
        <h2 className={H2}>MỨC ĐẠT CHUẨN ĐẦU RA CỦA NGƯỜI HỌC</h2>
        <p className="mb-4 text-xs text-muted-foreground">
          {cohort.learners} người học có hoạt động trong {cohort.activeDays} ngày gần nhất (tối đa {COHORT_MAX_LEARNERS} người gần nhất) · cập nhật {new Date(cohort.generatedAt).toLocaleString("vi-VN")} · làm mới sau 10 phút.
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {RUBRIC_LEVELS.map((r) => (
            <span key={r.level} className="inline-flex items-center gap-1.5 text-xs">
              <span className={cn("size-3 rounded-sm", BAR[r.level])} /> ({r.level}) {r.nameVi}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5 text-xs">
            <span className="size-3 rounded-sm bg-muted" /> Chưa đủ dữ liệu
          </span>
        </div>
        {cohort.learners === 0 ? (
          <p className="text-sm text-muted-foreground">Chưa có người học hoạt động gần đây.</p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {cohort.outcomes.map((c) => {
              const o = OUTCOME_BY_CODE.get(c.code)!;
              return (
                <div key={c.code} className="grid gap-2 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_7rem] sm:items-center">
                  <p className="truncate text-sm" title={outcomeStatement(o)}>
                    <span className="font-bold">{c.code}</span> <span className="text-muted-foreground">{o.verb} {o.content}</span>
                  </p>
                  <div className="flex h-5 overflow-hidden rounded-md bg-muted">
                    {RUBRIC_LEVELS.map((r) =>
                      c.distribution[r.level] ? <div key={r.level} className={BAR[r.level]} style={{ width: `${(c.distribution[r.level] / cohort.learners) * 100}%` }} title={`Mức ${r.level}: ${c.distribution[r.level]} người`} /> : null,
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground sm:text-right">
                    <span className="font-bold text-foreground">{c.achieved}</span>/{cohort.learners} đạt · {c.insufficient} chưa đo
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className={SECTION}>
        <h2 className={H2}>ĐỐI CHIẾU CHUẨN ĐẦU RA – CHỈ BÁO – NGÂN HÀNG CÂU HỎI</h2>
        <p className="mb-4 text-xs text-muted-foreground">Số câu đang xuất bản đánh giá được từng chỉ báo (đúng nhãn và đúng bậc Bloom). Cần ít nhất {MIN_ATTEMPTS_PER_CELL} câu để chỉ báo đo được.</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className={TH}>CĐR</th>
                <th className={TH}>Miền · bậc</th>
                <th className={TH}>Chỉ báo</th>
                <th className={cn(TH, "text-right")}>Số câu</th>
              </tr>
            </thead>
            <tbody>
              {audits.map((a) => {
                const o = OUTCOME_BY_CODE.get(a.code)!;
                return a.bank.map((b, idx) => {
                  const ind = o.indicators.find((i) => i.code === b.code)!;
                  const thin = b.questions !== null && b.questions < MIN_ATTEMPTS_PER_CELL;
                  return (
                    <tr key={b.code} className="border-b border-border/50">
                      {idx === 0 && (
                        <>
                          <td className={cn(TD, "font-bold")} rowSpan={a.bank.length}>
                            {a.code}
                          </td>
                          <td className={TD} rowSpan={a.bank.length}>
                            <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold", DOMAIN_CHIP[o.domain])}>{domainCode(o.domain, o.level)}</span>
                          </td>
                        </>
                      )}
                      <td className={TD}>
                        <span className="font-semibold">{b.code}</span> {ind.verb} {ind.content}
                      </td>
                      <td className={cn(TD, "text-right tabular-nums", thin && "font-bold text-destructive")}>{b.questions === null ? <span className="text-xs text-muted-foreground">Đo bằng hành vi</span> : b.questions}</td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className={SECTION}>
        <h2 className={H2}>CHECKLIST MỤC TIÊU CHƯƠNG TRÌNH (THÔNG TƯ 17/2021)</h2>
        <ul className="mt-3 flex flex-col divide-y divide-border">
          {OBJECTIVE_CHECKLIST.map((c) => (
            <li key={c.criterion} className="flex gap-3 py-2.5 text-sm">
              <Mark ok={c.met} />
              <div>
                <p className="font-medium">{c.criterion}</p>
                <p className="text-xs text-muted-foreground">{c.evidence}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={SECTION}>
        <h2 className={H2}>CHECKLIST CHUẨN ĐẦU RA (ABCD · SMART · ĐỘNG TỪ BLOOM)</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          {failing.length === 0 ? `Cả ${LEARNING_OUTCOMES.length} chuẩn đầu ra đều đạt mọi tiêu chí.` : `${failing.length}/${LEARNING_OUTCOMES.length} chuẩn đầu ra còn tiêu chí chưa đạt: ${failing.map((f) => f.code).join(", ")}.`}
        </p>
        <div className="flex flex-col gap-2">
          {audits.map((a) => {
            const bad = a.checklist.filter((c) => !c.met);
            return (
              <details key={a.code} className="rounded-xl border border-border/60" open={bad.length > 0}>
                <summary className="flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm [&::-webkit-details-marker]:hidden">
                  <Mark ok={bad.length === 0} />
                  <span className="font-bold">{a.code}</span>
                  <span className="truncate text-muted-foreground">{outcomeStatement(OUTCOME_BY_CODE.get(a.code)!)}</span>
                  <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                    {a.checklist.length - bad.length}/{a.checklist.length}
                  </span>
                </summary>
                <ul className="flex flex-col divide-y divide-border/60 border-t border-border/60 px-4">
                  {a.checklist.map((c) => (
                    <li key={c.key} className="flex gap-3 py-2 text-sm">
                      <Mark ok={c.met} />
                      <div className="min-w-0">
                        <p>{c.criterion}</p>
                        <p className="text-xs text-muted-foreground">{c.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </details>
            );
          })}
        </div>
      </section>

      <p className="text-xs text-muted-foreground">
        Mức rubric: {RUBRIC_LEVELS.map((r) => <span key={r.level} className={cn("mr-1.5 rounded-full px-2 py-0.5 ring-1", RUBRIC_CHIP[r.level])}>{r.level} {r.nameVi}</span>)}
      </p>
    </div>
  );
}
