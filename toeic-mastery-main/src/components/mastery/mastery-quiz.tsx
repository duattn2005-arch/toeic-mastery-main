"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";
import { AnswerOptionList } from "@/components/exam/answer-option";
import { Button } from "@/components/ui/button";
import type { MasteryExercise } from "@/lib/content/mastery";

const LABELS = ["A", "B", "C", "D"];

/** Quiz cho nội dung Mastery (tĩnh, không gắn với Question trong DB).
 * "practice": hiện đáp án ngay khi chọn. "test": làm hết rồi nộp bài. */
export function MasteryQuiz({ exercise }: { exercise: MasteryExercise }) {
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const isTest = exercise.kind === "test";
  const revealed = !isTest || submitted;

  const total = exercise.questions.length;
  const answeredCount = Object.keys(answers).length;
  const correctCount = exercise.questions.filter((q, i) => answers[i] === q.answer).length;

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="flex flex-col gap-4">
      {exercise.instructions && <p className="text-sm italic text-muted-foreground">{exercise.instructions}</p>}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-accent/40 px-4 py-2.5 text-sm">
        <span className="text-muted-foreground">
          Đã làm <span className="font-medium text-foreground">{answeredCount}</span>/{total}
          {revealed && answeredCount > 0 && (
            <>
              {" "}— Đúng <span className="font-medium text-success">{correctCount}</span>
            </>
          )}
        </span>
        {answeredCount > 0 && (
          <Button type="button" size="sm" variant="ghost" onClick={reset}>
            <RotateCcw className="size-3.5" /> Làm lại
          </Button>
        )}
      </div>

      {exercise.questions.map((q, i) => {
        const selected = answers[i] ?? null;
        const showResult = revealed && selected !== null;
        return (
          <div key={i} className="rounded-2xl border border-border bg-card p-4">
            <p className="mb-3 whitespace-pre-line text-sm font-medium">
              {i + 1}. {q.prompt}
            </p>
            <AnswerOptionList
              options={q.options.map((content, j) => ({ label: LABELS[j], content }))}
              selectedLabel={selected}
              correctLabel={showResult ? q.answer : null}
              disabled={showResult || (isTest && submitted)}
              onSelect={(label) => setAnswers((prev) => ({ ...prev, [i]: label }))}
            />
            {(showResult || (isTest && submitted)) && (
              <div className="mt-3 rounded-lg bg-accent/50 p-3 text-xs text-foreground/90">
                <span className="font-semibold text-success">Đáp án {q.answer}.</span> {q.explanation}
              </div>
            )}
          </div>
        );
      })}

      {isTest && !submitted && (
        <div className="flex flex-wrap items-center justify-end gap-3">
          {answeredCount < total && (
            <span className="text-xs text-muted-foreground">Còn {total - answeredCount} câu chưa làm</span>
          )}
          <Button type="button" onClick={() => setSubmitted(true)} disabled={answeredCount === 0}>
            Nộp bài & xem đáp án
          </Button>
        </div>
      )}
      {isTest && submitted && (
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm">
          Kết quả: <span className="font-semibold text-primary">{correctCount}/{total}</span> câu đúng. Xem giải thích chi tiết ở từng câu bên trên.
        </div>
      )}
    </div>
  );
}
