"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { StudyItem } from "@/lib/services/study-game";
import type { ReviewRating } from "@/lib/services/spaced-repetition";
import { RATING_BUTTONS } from "@/components/vocabulary/flash-card";
import { ensureSavedWordAction, unsaveWordIfExistsAction } from "@/lib/actions/dictionary";
import { useDictionaryHintTutorial } from "@/hooks/use-dictionary-hint-tutorial";
import { formatIpa, pronounce } from "@/lib/pronounce";

const AUTO_SPEAK_KEY = "flashcard:auto-speak";

interface QueueEntry extends StudyItem {
  queueKey: string;
}

/** Flashcard learning flow — flip to see the meaning, then self-rate like
 * the dedicated review page does. "Học lại" requeues the word to the back of
 * this same session's queue instead of just moving on, so a word you don't
 * know gets seen again before you finish, matching how the dedicated review
 * flow's AGAIN rating behaves. */
export function FlashcardBrowse({
  items,
  onFinish,
  onItemResult,
  autoStar = true,
}: {
  items: StudyItem[];
  onFinish: () => void;
  onItemResult?: (itemId: string, rating: ReviewRating) => void;
  /** Off for Saved Words: those are a deliberate, manually-curated list, not
   * an auto-managed "needs review" queue — rating one "Đã thuộc" here must
   * not silently delete it from Đã lưu. On everywhere else (real
   * VocabularyWords), where "needs review" genuinely means "add/remove from
   * Đã lưu". */
  autoStar?: boolean;
}) {
  const [queue, setQueue] = React.useState<QueueEntry[]>(() => items.map((item, i) => ({ ...item, queueKey: `${item.id}-${i}` })));
  const [index, setIndex] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const requeueCounter = React.useRef(items.length);

  const dictionaryHint = useDictionaryHintTutorial();

  const item = queue[index];
  const isLast = index === queue.length - 1;

  function handleRate(rating: ReviewRating) {
    onItemResult?.(item.id, rating);
    // "Chưa nhớ" -> the word joins Đã lưu as something to review again;
    // any other rating means it's no longer urgent, so drop it from there.
    if (rating === "AGAIN") {
      if (autoStar) void ensureSavedWordAction(item.term);
      const key = `${item.id}-${requeueCounter.current++}`;
      setQueue((q) => [...q, { ...item, queueKey: key }]);
    } else if (autoStar) {
      void unsaveWordIfExistsAction(item.term);
    }
    if (index + 1 >= queue.length && rating !== "AGAIN") {
      onFinish();
      return;
    }
    setFlipped(false);
    setIndex((i) => i + 1);
  }

  function goPrev() {
    if (index === 0) return;
    setFlipped(false);
    setIndex((i) => i - 1);
  }

  // Each new card reads its word aloud (opening a card is always a click,
  // so the browser allows it); learners can mute this, remembered per browser.
  const [autoSpeak, setAutoSpeak] = React.useState(true);
  React.useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (window.localStorage.getItem(AUTO_SPEAK_KEY) === "off") setAutoSpeak(false);
    } catch {
      // Storage unavailable — keep the default.
    }
  }, []);
  function toggleAutoSpeak() {
    setAutoSpeak((on) => {
      try {
        window.localStorage.setItem(AUTO_SPEAK_KEY, on ? "off" : "on");
      } catch {
        // Ignore — the choice just won't persist.
      }
      return !on;
    });
  }
  React.useEffect(() => {
    if (autoSpeak && item) pronounce(item.term, item.audioUrl);
    // Only when the card changes, not when the setting is toggled.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.queueKey]);

  function playAudio() {
    pronounce(item.term, item.audioUrl);
  }

  const ipa = formatIpa(item.ipa);

  return (
    <div className="flex flex-col items-center gap-5">
      {dictionaryHint}
      <div className="w-full max-w-sm">
        <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
          <span>
            {index + 1} / {queue.length}
          </span>
          <span>{flipped ? "Nghĩa" : "Từ vựng"}</span>
        </div>
        <Progress value={((index + 1) / queue.length) * 100} className="h-1.5" />
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        className="relative flex h-64 cursor-pointer w-full max-w-sm flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-card p-6 text-center shadow-soft transition-transform hover:-translate-y-0.5"
      >
        {!flipped ? (
          <>
            <p className="text-3xl font-bold tracking-tight">{item.term}</p>
            {ipa && <p className="text-base text-muted-foreground">{ipa}</p>}
            {item.partOfSpeech && (
              <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">{item.partOfSpeech}</span>
            )}
            <p className="mt-2 text-xs text-muted-foreground">Bấm để xem nghĩa</p>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold text-primary">{item.meaningVi}</p>
            {item.exampleEn && <p className="mt-1 max-w-xs text-sm italic text-muted-foreground">&ldquo;{item.exampleEn}&rdquo;</p>}
          </>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            playAudio();
          }}
          aria-label="Phát âm"
          className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
        >
          <Volume2 className="size-5" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={index === 0}
          aria-label="Từ trước"
          className="flex size-9 items-center justify-center rounded-lg border border-input disabled:opacity-40"
        >
          ‹
        </button>
        <button type="button" onClick={playAudio} aria-label="Phát âm" className="flex size-9 items-center justify-center rounded-lg border border-input">
          <Volume2 className="size-4" />
        </button>
        <button
          type="button"
          onClick={toggleAutoSpeak}
          aria-pressed={autoSpeak}
          className="flex h-9 items-center gap-1.5 rounded-lg border border-input px-3 text-xs text-muted-foreground hover:text-foreground"
        >
          {autoSpeak ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
          Tự đọc: {autoSpeak ? "Bật" : "Tắt"}
        </button>
      </div>

      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="grid w-full max-w-sm grid-cols-4 gap-2"
          >
            {RATING_BUTTONS.map((btn) => (
              <button
                key={btn.rating}
                type="button"
                onClick={() => handleRate(btn.rating)}
                className={cn("rounded-xl px-2 py-2.5 text-xs font-semibold transition-colors", btn.className)}
              >
                {btn.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {!flipped && isLast && <p className="text-xs text-muted-foreground">Lật thẻ cuối cùng để tự đánh giá và hoàn thành.</p>}
    </div>
  );
}
