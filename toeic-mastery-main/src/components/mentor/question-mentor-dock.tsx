"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2, Maximize2, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MentorChatThread } from "@/components/mentor/mentor-chat-thread";
import { MentorComposer } from "@/components/mentor/mentor-composer";
import { MascotAvatar } from "@/components/mascot/study-mascot";
import { useMentorSend } from "@/hooks/use-mentor-send";
import { questionMentorKey, useQuestionMentorStore, type QuestionMentorTarget } from "@/store/question-mentor-store";
import type { MentorMessagesPage } from "@/components/mentor/types";

const EMPTY_PAGE: MentorMessagesPage = { messages: [], nextCursor: null };

function openingMessage(target: QuestionMentorTarget) {
  const picked = target.selectedLabel ? ` Mình đã chọn đáp án ${target.selectedLabel}.` : "";
  return `Giải thích giúp mình câu này nhé.${picked} Vì sao đáp án đúng là đúng, và các lựa chọn còn lại sai ở đâu?`;
}

async function createQuestionConversation(target: QuestionMentorTarget): Promise<string> {
  const res = await fetch("/api/mentor/conversations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionId: target.questionId, attemptId: target.attemptId }),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.conversation?.id) throw new Error("Không mở được AI Mentor, vui lòng thử lại.");
  return body.conversation.id;
}

/**
 * Corner-anchored AI Mentor chat for a specific question — opened by
 * AskMentorButton instead of navigating to /mentor, so the learner keeps
 * their place in the exam/review. Creates a question-scoped conversation
 * (the server then injects that question, its answer key and the learner's
 * pick into the system prompt — see mentor-context.ts) and immediately
 * sends an "explain this question" turn, so the explanation starts
 * streaming without the learner typing anything.
 *
 * Wears the study mascot's own avatar (and StudyMascot hides itself while
 * this is up) so there's only ever one study buddy in the corner. Sits a
 * bit higher than the mascot's usual spot so it never covers the exam's
 * bottom "Nhóm tiếp" navigation.
 */
export function QuestionMentorDock({ equippedShopItemId }: { equippedShopItemId: string | null }) {
  const target = useQuestionMentorStore((s) => s.target);
  const view = useQuestionMentorStore((s) => s.view);
  const setView = useQuestionMentorStore((s) => s.setView);
  const conversationId = useQuestionMentorStore((s) => (s.target ? s.conversations[questionMentorKey(s.target)] : undefined));
  const rememberConversation = useQuestionMentorStore((s) => s.rememberConversation);
  // Keyed by question so a failure for one question doesn't stick around
  // when the learner asks about another (no reset-in-effect needed).
  const [failure, setFailure] = React.useState<{ key: string; message: string } | null>(null);
  const error = target && failure?.key === questionMentorKey(target) ? failure.message : null;

  React.useEffect(() => {
    if (!target || conversationId || view === "closed") return;
    let cancelled = false;
    createQuestionConversation(target)
      .then((id) => {
        if (!cancelled) rememberConversation(questionMentorKey(target), id);
      })
      .catch((err: Error) => {
        if (!cancelled) setFailure({ key: questionMentorKey(target), message: err.message });
      });
    return () => {
      cancelled = true;
    };
  }, [target, conversationId, view, rememberConversation]);

  if (!target || view === "closed") return null;

  if (view === "minimized") {
    return (
      <button
        type="button"
        onClick={() => setView("open")}
        aria-label="Mở AI Mentor"
        className="mascot-float fixed bottom-36 right-4 z-50 flex size-16 items-center justify-center rounded-full border border-border bg-card shadow-soft lg:bottom-24 lg:right-5"
      >
        <MascotAvatar state="studying" size={48} equippedShopItemId={equippedShopItemId} className="size-12" />
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="AI Mentor"
      className="fixed bottom-36 right-4 z-50 flex h-[min(560px,calc(100svh-12rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft lg:bottom-24 lg:right-5"
    >
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
        <MascotAvatar state="idle" size={32} equippedShopItemId={equippedShopItemId} className="size-8" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">AI Mentor</p>
          <p className="truncate text-xs text-muted-foreground">Đang giải thích câu hỏi bạn vừa hỏi</p>
        </div>
        {conversationId && (
          <Button size="icon" variant="ghost" className="size-8" asChild>
            <Link href={`/mentor?conversationId=${conversationId}`} aria-label="Mở trang AI Mentor" onClick={() => setView("minimized")}>
              <Maximize2 className="size-4" />
            </Link>
          </Button>
        )}
        <Button size="icon" variant="ghost" className="size-8" onClick={() => setView("minimized")} aria-label="Thu nhỏ">
          <Minus className="size-4" />
        </Button>
        <Button size="icon" variant="ghost" className="size-8" onClick={() => setView("closed")} aria-label="Đóng">
          <X className="size-4" />
        </Button>
      </div>

      {conversationId ? (
        <QuestionMentorChat key={conversationId} conversationId={conversationId} target={target} />
      ) : error ? (
        <div className="flex flex-1 items-center justify-center px-4 text-center text-sm text-muted-foreground">{error}</div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}

function QuestionMentorChat({ conversationId, target }: { conversationId: string; target: QuestionMentorTarget }) {
  const { send } = useMentorSend(conversationId);
  const markAutoAsked = useQuestionMentorStore((s) => s.markAutoAsked);

  // Marked in the store before sending (not a local ref) so neither
  // StrictMode's double effect nor reopening the dock re-asks.
  React.useEffect(() => {
    if (useQuestionMentorStore.getState().autoAsked[conversationId]) return;
    markAutoAsked(conversationId);
    void send(openingMessage(target));
  }, [conversationId, target, send, markAutoAsked]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-3 pb-3">
      <MentorChatThread conversationId={conversationId} initialPage={EMPTY_PAGE} />
      <MentorComposer conversationId={conversationId} nextStepsRemainingToday={null} showNextSteps={false} />
    </div>
  );
}
