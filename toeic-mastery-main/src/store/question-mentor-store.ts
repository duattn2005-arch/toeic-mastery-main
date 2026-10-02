import { create } from "zustand";

export interface QuestionMentorTarget {
  questionId: string;
  attemptId?: string;
  /** The learner's own pick, when the calling screen knows it — folded into
   * the auto-sent opening message so the explanation can address *why their
   * choice* was wrong, even on screens with no persisted AttemptAnswer
   * (quick study, grammar quiz, mistake practice). */
  selectedLabel?: string | null;
}

export function questionMentorKey(target: Pick<QuestionMentorTarget, "questionId" | "attemptId">) {
  return `${target.questionId}:${target.attemptId ?? ""}`;
}

/**
 * State for the floating "Hỏi AI Mentor" dock (see question-mentor-dock.tsx).
 * Global rather than per-button because the button unmounts as soon as the
 * learner moves to the next question, while the explanation they asked for
 * should stay on screen.
 */
interface QuestionMentorState {
  target: QuestionMentorTarget | null;
  /** "open" = full panel, "minimized" = just the corner bubble. */
  view: "closed" | "open" | "minimized";
  /** questionMentorKey → conversationId, so asking about the same question
   * again reopens that thread instead of starting (and auto-asking) anew. */
  conversations: Record<string, string>;
  /** conversationIds whose opening "explain this" message was already sent. */
  autoAsked: Record<string, true>;

  ask: (target: QuestionMentorTarget) => void;
  setView: (view: QuestionMentorState["view"]) => void;
  rememberConversation: (key: string, conversationId: string) => void;
  markAutoAsked: (conversationId: string) => void;
}

export const useQuestionMentorStore = create<QuestionMentorState>()((set) => ({
  target: null,
  view: "closed",
  conversations: {},
  autoAsked: {},

  ask: (target) => set({ target, view: "open" }),
  setView: (view) => set({ view }),
  rememberConversation: (key, conversationId) => set((s) => ({ conversations: { ...s.conversations, [key]: conversationId } })),
  markAutoAsked: (conversationId) => set((s) => ({ autoAsked: { ...s.autoAsked, [conversationId]: true } })),
}));
