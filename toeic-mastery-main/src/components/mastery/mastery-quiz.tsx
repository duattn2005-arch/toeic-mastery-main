"use client";

import * as React from "react";
import { Check, CloudOff, History, Loader2, RotateCcw } from "lucide-react";
import { AnswerOptionList } from "@/components/exam/answer-option";
import { Button } from "@/components/ui/button";
import type { MasteryExercise } from "@/lib/content/mastery";
import type { ExerciseProgress } from "@/lib/data/exercise-progress";
import { saveExerciseProgressAction } from "@/lib/actions/exercise-progress";

const LABELS = ["A", "B", "C", "D"];
const SAVE_DEBOUNCE_MS = 500;

type SaveState = "idle" | "saving" | "saved" | "error";

/** Quiz cho nội dung Mastery (tĩnh, không gắn với Question trong DB).
 * "practice": hiện đáp án ngay khi chọn. "test": làm hết rồi nộp bài.
 *
 * With `progressKey`, the learner's answers are saved to their account as
 * they go (and restored from `initialProgress` on the next visit); the
 * finished result is kept as "Lần trước" even after "Làm lại". */
export function MasteryQuiz({
  exercise,
  progressKey,
  initialProgress,
}: {
  exercise: MasteryExercise;
  progressKey?: string;
  initialProgress?: ExerciseProgress | null;
}) {
  const total = exercise.questions.length;
  // Saved answers only apply if the exercise still has the same questions.
  const restored = initialProgress && initialProgress.total === total ? initialProgress : null;

  const [answers, setAnswers] = React.useState<Record<number, string>>(() =>
    restored ? Object.fromEntries(Object.entries(restored.answers).map(([i, l]) => [Number(i), l])) : {}
  );
  const [submitted, setSubmitted] = React.useState(restored?.submitted ?? false);
  const [last, setLast] = React.useState(
    restored?.lastAnswered != null && restored.lastCorrect != null
      ? { correct: restored.lastCorrect, answered: restored.lastAnswered, at: restored.lastDoneAt }
      : null
  );
  const [saveState, setSaveState] = React.useState<SaveState>("idle");
  const saveTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const isTest = exercise.kind === "test";
  const revealed = !isTest || submitted;

  const answeredCount = Object.keys(answers).length;
  const correctCount = exercise.questions.filter((q, i) => answers[i] === q.answer).length;

  function persist(next: { answers: Record<number, string>; submitted: boolean; finished: boolean }, immediate = false) {
    if (!progressKey) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    const run = async () => {
      setSaveState("saving");
      const correct = exercise.questions.filter((q, i) => next.answers[i] === q.answer).length;
      const answered = Object.keys(next.answers).length;
      const res = await saveExerciseProgressAction({
        key: progressKey,
        total,
        answers: Object.fromEntries(Object.entries(next.answers)),
        submitted: next.submitted,
        result: next.finished ? { correct, answered } : undefined,
      }).catch(() => ({ error: "network" }));
      setSaveState(res.error ? "error" : "saved");
    };
    if (immediate) void run();
    else saveTimer.current = setTimeout(() => void run(), SAVE_DEBOUNCE_MS);
  }

  React.useEffect(() => () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
  }, []);

  function select(index: number, label: string) {
    const next = { ...answers, [index]: label };
    setAnswers(next);
    // Practice mode reveals right/wrong per question, so the sitting is
    // finished (and recorded as a result) once every question is answered.
    const finished = !isTest && Object.keys(next).length === total;
    if (finished) {
      const correct = exercise.questions.filter((q, i) => next[i] === q.answer).length;
      setLast({ correct, answered: total, at: new Date().toISOString() });
    }
    persist({ answers: next, submitted, finished }, finished);
  }

  function submit() {
    setSubmitted(true);
    setLast({ correct: correctCount, answered: answeredCount, at: new Date().toISOString() });
    persist({ answers, submitted: true, finished: true }, true);
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
    persist({ answers: {}, submitted: false, finished: false }, true);
  }

  return (
    <div className="flex flex-col gap-4">
      {exercise.instructions && <p className="text-sm italic text-muted-foreground">{exercise.instructions}</p>}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-accent/40 px-4 py-2.5 text-sm">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
          <span>
            Đã làm <span className="font-medium text-foreground">{answeredCount}</span>/{total}
            {revealed && answeredCount > 0 && (
              <>
                {" "}— Đúng <span className="font-medium text-success">{correctCount}</span>
                {" "}· Sai <span className="font-medium text-destructive">{answeredCount - correctCount}</span>
              </>
            )}
          </span>
          {last && (
            <span className="flex items-center gap-1 text-xs">
              <History className="size-3.5" /> Lần trước: <span className="font-medium text-foreground">{last.correct}/{total}</span> đúng
              {last.at && <> ({new Date(last.at).toLocaleDateString("vi-VN")})</>}
            </span>
          )}
          {progressKey && saveState !== "idle" && (
            <span className="flex items-center gap-1 text-xs">
              {saveState === "saving" && (
                <>
                  <Loader2 className="size-3 animate-spin" /> Đang lưu…
                </>
              )}
              {saveState === "saved" && (
                <>
                  <Check className="size-3 text-success" /> Đã lưu tiến trình
                </>
              )}
              {saveState === "error" && (
                <>
                  <CloudOff className="size-3 text-destructive" /> Chưa lưu được
                </>
              )}
            </span>
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
              onSelect={(label) => select(i, label)}
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
          <Button type="button" onClick={submit} disabled={answeredCount === 0}>
            Nộp bài & xem đáp án
          </Button>
        </div>
      )}
      {isTest && submitted && (
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm">
          Kết quả: <span className="font-semibold text-primary">{correctCount}/{total}</span> câu đúng. Xem giải thích chi tiết ở từng câu bên trên.
          {progressKey && <> Kết quả đã được lưu vào tài khoản của bạn.</>}
        </div>
      )}
    </div>
  );
}
