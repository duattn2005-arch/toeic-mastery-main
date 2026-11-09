import Link from "next/link";
import { Check, ChevronDown, X } from "lucide-react";
import type { MistakeDetail } from "@/lib/bloom/bank";
import type { ErrorTypeStat, MistakeQuestionStat, MistakeScope } from "@/lib/bloom/mistakes";
import { PART_META } from "@/lib/constants/toeic";
import { cn } from "@/lib/utils";
import type { TestPart } from "@/generated/prisma/enums";

const VISIBLE_QUESTIONS = 5;
const CHIP = "rounded-full px-2 py-0.5 text-[11px] font-semibold";
const dateOf = (t: number) => new Date(t).toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

/** How often each kind of error happens, most frequent first. */
export function ErrorTypes({ types }: { types: ErrorTypeStat[] }) {
  const max = types[0]?.count ?? 0;
  return (
    <ul className="flex flex-col gap-3.5">
      {types.map((t) => (
        <li key={t.label}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
            <span className="font-medium">{t.label}</span>
            <span className="text-xs text-muted-foreground tabular-nums">
              <b className="text-sm font-semibold text-foreground">{t.count} lần</b> · {t.recent} lần trong 30 ngày qua
            </span>
          </div>
          <div aria-hidden className="mt-1.5 h-2 rounded-full bg-muted">
            <div className="h-full rounded-full bg-destructive/70" style={{ width: `${(t.count / max) * 100}%` }} />
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.tip}</p>
        </li>
      ))}
    </ul>
  );
}

export function MistakeCounts({ scope }: { scope: MistakeScope }) {
  const items = [
    { label: "Lần trả lời sai", value: scope.wrongAnswers },
    { label: "Câu từng sai", value: scope.wrongQuestions },
    { label: "Vẫn đang sai", value: scope.stillWrong },
    { label: "Đã làm lại đúng", value: scope.fixed },
    { label: "Sai từ 2 lần trở lên", value: scope.repeated },
    { label: "Bỏ trống", value: scope.skipped },
  ];
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((i) => (
        <div key={i.label}>
          <dt className="text-xs text-muted-foreground">{i.label}</dt>
          <dd className="text-lg font-extrabold tabular-nums">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function QuestionBody({ q, detail }: { q: MistakeQuestionStat; detail: MistakeDetail | undefined }) {
  const lastOption = detail?.options.find((o) => o.label === q.lastPicked);
  const sameWrong = q.picks[0]?.count >= 2 ? q.picks[0] : null;
  return (
    <div className="mt-3 flex flex-col gap-3 border-t border-border/50 pt-3 text-sm">
      {detail && detail.options.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {detail.options.map((o) => {
            const picked = q.picks.find((p) => p.label === o.label);
            return (
              <li key={o.label} className={cn("flex items-start gap-2 rounded-lg px-2.5 py-1.5", o.isCorrect ? "bg-success/10" : picked ? "bg-destructive/10" : "bg-muted/40")}>
                {o.isCorrect ? <Check className="mt-0.5 size-4 shrink-0 text-success" aria-label="Đáp án đúng" /> : picked ? <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-label="Đáp án bạn đã chọn" /> : <span className="size-4 shrink-0" />}
                <span className="min-w-0">
                  <b className="font-semibold">{o.label}.</b> {o.content}
                  {picked && (
                    <span className="ml-1.5 text-xs font-medium text-destructive">
                      Bạn chọn {picked.count} lần
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <p className="font-semibold">Vì sao mất câu này: {q.errorLabel}</p>
        <p className="mt-0.5 text-muted-foreground">{q.errorTip}</p>
        {lastOption?.distractorExplanation && <p className="mt-1 whitespace-pre-line text-muted-foreground">{`Đáp án ${lastOption.label}: ${lastOption.distractorExplanation}`}</p>}
      </div>
      {sameWrong && (
        <p>
          Bạn đã chọn <b className="font-semibold">{sameWrong.label}</b> {sameWrong.count} lần: có thể bạn đang hiểu sai điểm này chứ không phải sơ suất.
        </p>
      )}
      {q.lastTimeSec !== null && q.targetSec !== null && (
        <p className="text-xs text-muted-foreground tabular-nums">
          Lần sai gần nhất làm trong {q.lastTimeSec} giây, mức chuẩn {q.targetSec} giây.
        </p>
      )}
      {detail?.explanationVi && (
        <div>
          <p className="font-semibold">Lời giải</p>
          <p className="mt-0.5 whitespace-pre-line text-foreground/90">{detail.explanationVi}</p>
        </div>
      )}
      {q.reviewAttemptId && (
        <Link href={`/history/${q.reviewAttemptId}`} className="self-start text-xs font-semibold text-primary hover:underline">
          Mở lại bài làm có câu này
        </Link>
      )}
    </div>
  );
}

function QuestionRow({ q, detail, labelTitle }: { q: MistakeQuestionStat; detail: MistakeDetail | undefined; labelTitle: string | undefined }) {
  const prompt = detail?.prompt.replace(/\s+/g, " ").trim();
  return (
    <li>
      <details className="group/q rounded-xl border border-border/60 bg-card/40 p-3">
        <summary className="flex cursor-pointer list-none items-start justify-between gap-3 rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none [&::-webkit-details-marker]:hidden">
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-1.5">
              <span className={cn(CHIP, "bg-muted text-foreground")}>{PART_META[q.part as TestPart]?.shortLabel ?? q.part}</span>
              <span className={cn(CHIP, q.stillWrong ? "bg-destructive/15 text-destructive" : "bg-success/15 text-success")}>{q.stillWrong ? "Vẫn đang sai" : "Đã làm lại đúng"}</span>
              <span className={cn(CHIP, "bg-warning/20 text-foreground")}>{q.errorLabel}</span>
              {labelTitle && <span className="text-[11px] text-muted-foreground">{labelTitle}</span>}
            </span>
            <span className="mt-1.5 line-clamp-2 block text-sm font-medium">{prompt || "(Câu nghe / không có đề bài chữ)"}</span>
            <span className="mt-1 block text-xs text-muted-foreground tabular-nums">
              Sai {q.wrongCount}/{q.tries} lần làm
              {q.correctAnswer && <> · {q.lastPicked ? `Lần gần nhất chọn ${q.lastPicked}, đáp án ${q.correctAnswer}` : `Đáp án ${q.correctAnswer}`}</>} · {dateOf(q.lastWrongAt)}
            </span>
          </span>
          <ChevronDown className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-open/q:rotate-180" />
        </summary>
        <QuestionBody q={q} detail={detail} />
      </details>
    </li>
  );
}

/** Worst questions first, the rest folded. Only questions with loaded details are listed past the first screen. */
export function MistakeQuestions({
  questions,
  details,
  titles,
  limit,
}: {
  questions: MistakeQuestionStat[];
  details: Map<string, MistakeDetail>;
  titles: Map<string, string>;
  limit: number;
}) {
  const shown = questions.slice(0, limit);
  const first = shown.slice(0, VISIBLE_QUESTIONS);
  const more = shown.slice(VISIBLE_QUESTIONS);
  const row = (q: MistakeQuestionStat) => <QuestionRow key={q.questionId} q={q} detail={details.get(q.questionId)} labelTitle={titles.get(q.knowledgeLabel)} />;
  return (
    <>
      <ul className="flex flex-col gap-2">{first.map(row)}</ul>
      {more.length > 0 && (
        <details className="group/more mt-2">
          <summary className="flex cursor-pointer items-center gap-1 rounded text-xs font-semibold text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
            Xem thêm {more.length} câu <ChevronDown className="size-3.5 transition-transform group-open/more:rotate-180" />
          </summary>
          <ul className="mt-2 flex flex-col gap-2">{more.map(row)}</ul>
        </details>
      )}
      {questions.length > shown.length && <p className="mt-2 text-xs text-muted-foreground">Còn {questions.length - shown.length} câu sai khác, xếp sau theo mức độ ưu tiên.</p>}
    </>
  );
}
