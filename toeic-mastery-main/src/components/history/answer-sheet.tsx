import { PART_META } from "@/lib/constants/toeic";
import { cn } from "@/lib/utils";
import type { QuestionReview } from "@/lib/data/history";

/** Same mark in the sheet and the review list. Misses are the only solid marks,
 * so they stand out by weight as well as hue, for readers who can't tell red from green. */
export function answerMarkClass(review: Pick<QuestionReview, "selectedLabel" | "isCorrect">) {
  if (!review.selectedLabel) return "border border-dashed border-muted-foreground/50 text-muted-foreground";
  if (review.isCorrect) return "bg-success/20 text-foreground";
  return "bg-destructive font-bold text-destructive-foreground";
}

function statusText(review: QuestionReview) {
  if (!review.selectedLabel) return "bỏ qua";
  return review.isCorrect ? "đúng" : "sai";
}

/** The attempt drawn as a TOEIC answer sheet. Each mark links to its question in the review list. */
export function AnswerSheet({ reviews }: { reviews: QuestionReview[] }) {
  const numbered = reviews.map((review, index) => ({ review, number: index + 1 }));
  const parts = [...new Set(reviews.map((r) => r.part))];

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h2 className="text-base font-semibold">Phiếu trả lời của bạn</h2>
        <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <Legend className={answerMarkClass({ selectedLabel: "A", isCorrect: true })} label="Đúng" />
          <Legend className={answerMarkClass({ selectedLabel: "A", isCorrect: false })} label="Sai" />
          <Legend className={answerMarkClass({ selectedLabel: null, isCorrect: false })} label="Bỏ qua" />
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        {parts.map((part) => (
          <div key={part} className="flex flex-col gap-1.5 sm:flex-row sm:gap-3">
            <p className="shrink-0 pt-1.5 text-xs font-semibold text-muted-foreground sm:w-12">{PART_META[part].shortLabel}</p>
            <ol className="flex flex-wrap gap-1">
              {numbered
                .filter(({ review }) => review.part === part)
                .map(({ review, number }) => (
                  <li key={review.id}>
                    <a
                      href={`#q-${review.id}`}
                      aria-label={`Câu ${number}: ${statusText(review)}${review.isFlagged ? ", đã đánh dấu" : ""}`}
                      className={cn(
                        "relative flex size-8 items-center justify-center rounded-full text-[11px] tabular-nums outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card motion-reduce:hover:scale-100 sm:size-7",
                        answerMarkClass(review)
                      )}
                    >
                      {number}
                      {review.isFlagged && <span aria-hidden className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-warning ring-2 ring-card" />}
                    </a>
                  </li>
                ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <li className="flex items-center gap-1.5">
      <span aria-hidden className={cn("size-3 rounded-full", className)} />
      {label}
    </li>
  );
}
