import Link from "next/link";
import { ArrowUpRight, Lightbulb, MessageSquareWarning } from "lucide-react";
import { ResolveReportButton } from "@/components/admin/resolve-report-button";
import { cn } from "@/lib/utils";
import type { ReportContext } from "@/lib/data/question-reports";

/** Admin list of open question reports: where the question is (test +
 * number + Part), what the learner said, the question's current answer,
 * and concrete fix suggestions with a link straight to its editor. */
export function QuestionReportList({ reports }: { reports: ReportContext[] }) {
  if (reports.length === 0) {
    return <p className="text-sm text-muted-foreground">Không có báo cáo nào đang chờ xử lý.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {reports.map((r) => (
        <article key={r.id} className="rounded-2xl border border-border/70 bg-background/40 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-2 text-sm">
                {r.location && "testId" in r.location ? (
                  <>
                    <span className="rounded-md bg-primary/15 px-2 py-0.5 font-bold text-primary">Câu {r.location.number}</span>
                    <Link href={`/admin/tests/${r.location.testId}`} className="font-semibold hover:underline">
                      {r.location.testTitle}
                    </Link>
                  </>
                ) : r.location ? (
                  <span className="font-semibold">Ngữ pháp: {r.location.grammarTopic}</span>
                ) : (
                  <span className="font-semibold text-muted-foreground">Câu hỏi không thuộc đề nào</span>
                )}
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">{r.question.partLabel}</span>
              </p>
              <p className="mt-1.5 line-clamp-2 text-sm text-foreground/85">{r.question.prompt || "(Câu hỏi không có nội dung chữ)"}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={r.editHref}
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-primary px-3.5 text-xs font-bold text-primary-foreground transition-colors hover:bg-[var(--primary-hover)]"
              >
                Sửa câu này <ArrowUpRight className="size-3.5" />
              </Link>
              <ResolveReportButton reportId={r.id} />
            </div>
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-xl bg-warning/10 px-3 py-2 text-sm">
            <MessageSquareWarning className="mt-0.5 size-4 shrink-0 text-warning" />
            <p>
              <span className="font-semibold">{r.reasonLabel}</span>
              {r.message && <>: &ldquo;{r.message}&rdquo;</>}
              <span className="block text-xs text-muted-foreground">
                {r.reporter}, {r.createdAt.toLocaleString("vi-VN")}
              </span>
            </p>
          </div>

          {r.question.options.length > 0 && (
            <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {r.question.options.map((o) => (
                <p
                  key={o.label}
                  className={cn(
                    "rounded-lg px-2.5 py-1.5 text-xs",
                    o.isCorrect ? "bg-success/15 font-semibold text-success" : "bg-muted/60 text-foreground/80"
                  )}
                >
                  {o.label}. {/[\p{L}\p{N}]/u.test(o.content) ? o.content : <span className="italic opacity-70">(trống)</span>}
                  {o.isCorrect && " ✓"}
                </p>
              ))}
            </div>
          )}

          {r.suggestions.length > 0 && (
            <div className="mt-3 rounded-xl border border-primary/25 bg-primary/5 p-3">
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-primary">
                <Lightbulb className="size-3.5" /> Gợi ý sửa
              </p>
              <ul className="list-disc space-y-1 pl-5 text-xs leading-relaxed text-foreground/85">
                {r.suggestions.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
