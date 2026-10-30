"use client";

import * as React from "react";
import { logPracticeAnswerAction } from "@/lib/actions/practice-answers";
import { AnswerOptionList } from "@/components/exam/answer-option";
import { AskMentorButton } from "@/components/shared/ask-mentor-button";

interface QuizOption {
  label: string;
  content: string;
  isCorrect: boolean;
  distractorExplanation: string | null;
}

interface QuizQuestion {
  id: string;
  prompt: string;
  explanationVi: string;
  correctLabel: string;
  options: QuizOption[];
}

export function GrammarPracticeQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  // The right answer shows as soon as one is picked, so only the first pick
  // per question is real evidence. Many questions are on screen at once, so
  // time per question isn't measured (null — the Bloom engine skips it).
  function pick(questionId: string, label: string) {
    if (!(questionId in answers)) void logPracticeAnswerAction({ questionId, selectedLabel: label, source: "grammar_quiz", timeSpentSec: null }).catch(() => {});
    setAnswers((prev) => ({ ...prev, [questionId]: label }));
  }

  const correctCount = questions.filter((q) => answers[q.id] === q.correctLabel).length;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="flex flex-col gap-5">
      {answeredCount > 0 && (
        <p className="text-sm text-muted-foreground">
          Đã trả lời <span className="font-medium text-foreground">{answeredCount}</span>/{questions.length} — Đúng{" "}
          <span className="font-medium text-success">{correctCount}</span>
        </p>
      )}
      {questions.map((q, i) => {
        const selected = answers[q.id];
        return (
          <div key={q.id} className="rounded-2xl border border-border bg-card p-4">
            <p className="mb-3 text-sm font-medium">
              {i + 1}. {q.prompt}
            </p>
            <AnswerOptionList
              options={q.options}
              selectedLabel={selected ?? null}
              correctLabel={selected ? q.correctLabel : null}
              onSelect={(label) => pick(q.id, label)}
            />
            {selected && (
              <div className="mt-3 flex flex-col gap-2 rounded-lg bg-accent/50 p-3">
                <p className="text-xs text-foreground/90">{q.explanationVi}</p>
                <AskMentorButton questionId={q.id} selectedLabel={selected} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
