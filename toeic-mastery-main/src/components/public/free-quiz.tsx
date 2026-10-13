"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FREE_QUIZ, quizLevel } from "@/lib/content/free-quiz";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D"];

/** Part 5 style mini test: pick an answer for every question, submit, then
 * see the score and an explanation for each one. No account, no storage. */
export function FreeQuiz() {
  const [answers, setAnswers] = React.useState<Record<number, number>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const resultRef = React.useRef<HTMLDivElement>(null);

  const total = FREE_QUIZ.length;
  const answered = Object.keys(answers).length;
  const score = FREE_QUIZ.reduce((n, q, i) => n + (answers[i] === q.correct ? 1 : 0), 0);

  function submit() {
    setSubmitted(true);
    trackEvent("free_quiz_complete", { score, total });
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const level = quizLevel(score, total);

  return (
    <div>
      {submitted && (
        <div ref={resultRef} className="mb-8 scroll-mt-28 rounded-2xl border border-primary/30 bg-primary/5 p-6" role="status">
          <p className="text-sm font-semibold text-primary uppercase">Kết quả</p>
          <p className="mt-1 text-4xl font-extrabold">
            {score}/{total} <span className="text-lg font-semibold text-muted-foreground">· {level.label}</span>
          </p>
          <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">{level.text}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[var(--primary-hover)]"
            >
              Luyện đề đầy đủ 7 Part <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/huong-dan/ngu-phap-part-5-toeic" className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent/50">
              Đọc bài ngữ pháp Part 5
            </Link>
            <Button type="button" variant="ghost" className="rounded-full" onClick={reset}>
              <RotateCcw className="size-4" /> Làm lại
            </Button>
          </div>
        </div>
      )}

      <ol className="flex flex-col gap-5">
        {FREE_QUIZ.map((q, i) => {
          const picked = answers[i];
          const isCorrect = picked === q.correct;
          return (
            <li key={q.text} className="rounded-2xl border border-border bg-card p-5">
              <fieldset disabled={submitted}>
                <legend className="w-full">
                  <span className="text-xs font-semibold text-muted-foreground">Câu {i + 1}</span>
                  <span className="mt-1 block text-base leading-relaxed font-medium">
                    {q.text.split("-------").map((part, pi, parts) => (
                      <React.Fragment key={pi}>
                        {part}
                        {pi < parts.length - 1 && (
                          <span role="img" aria-label="chỗ trống" className="mx-1 inline-block h-5 w-14 translate-y-1 border-b-2 border-primary/70" />
                        )}
                      </React.Fragment>
                    ))}
                  </span>
                </legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {q.options.map((option, oi) => {
                    const checked = picked === oi;
                    const isAnswer = oi === q.correct;
                    return (
                      <label
                        key={option}
                        className={cn(
                          "flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-sm transition-colors",
                          !submitted && !checked && "border-border hover:border-primary/40 hover:bg-accent/40",
                          !submitted && checked && "border-primary bg-accent",
                          submitted && isAnswer && "border-success bg-success/10",
                          submitted && checked && !isAnswer && "border-destructive bg-destructive/10",
                          submitted && !isAnswer && !checked && "border-border opacity-60",
                          submitted && "cursor-default"
                        )}
                      >
                        <input
                          type="radio"
                          name={`q-${i}`}
                          value={oi}
                          checked={checked}
                          onChange={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                          className="size-4 accent-[var(--primary)]"
                        />
                        <span className="font-semibold text-muted-foreground">{LETTERS[oi]}.</span>
                        <span className="flex-1">{option}</span>
                        {submitted && isAnswer && <Check className="size-4 text-success" aria-label="Đáp án đúng" />}
                        {submitted && checked && !isAnswer && <X className="size-4 text-destructive" aria-label="Bạn chọn sai" />}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              {submitted && (
                <p className="mt-3 text-sm leading-relaxed">
                  <strong className={isCorrect ? "text-success" : "text-destructive"}>
                    {isCorrect ? "Chính xác. " : picked === undefined ? "Bạn chưa chọn. " : "Chưa đúng. "}
                  </strong>
                  <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">{q.topic}</span>{" "}
                  <span className="text-muted-foreground">{q.explain}</span>
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {!submitted && (
        <div className="sticky bottom-4 mt-6 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card/95 p-3 pl-5 shadow-lift backdrop-blur-sm">
          <span className="text-sm text-muted-foreground">
            Đã chọn {answered}/{total} câu
          </span>
          <Button type="button" className="rounded-full" onClick={submit} disabled={answered === 0}>
            Nộp bài
          </Button>
        </div>
      )}
    </div>
  );
}
