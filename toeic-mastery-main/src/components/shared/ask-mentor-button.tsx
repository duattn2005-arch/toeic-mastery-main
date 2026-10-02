"use client";

import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuestionMentorStore } from "@/store/question-mentor-store";

/**
 * Entry point into the "Tôi không hiểu câu hỏi này" flow (see
 * docs/ai-mentor-architecture.md §2) — opens the floating QuestionMentorDock
 * scoped to this question (and, when known, the attempt it was answered in
 * and the learner's pick), which auto-asks for an explanation so the first
 * reply arrives without the learner leaving the page or typing anything.
 */
export function AskMentorButton({
  questionId,
  attemptId,
  selectedLabel,
}: {
  questionId: string;
  attemptId?: string;
  selectedLabel?: string | null;
}) {
  const ask = useQuestionMentorStore((s) => s.ask);

  return (
    <Button size="sm" variant="outline" type="button" onClick={() => ask({ questionId, attemptId, selectedLabel })}>
      <Bot className="size-3.5" /> Hỏi AI Mentor
    </Button>
  );
}
