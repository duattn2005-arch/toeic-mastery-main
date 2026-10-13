"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Keyboard, Volume2, VolumeX, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { StudyItem } from "@/lib/services/study-game";
import type { ReviewRating } from "@/lib/services/spaced-repetition";
import { RATING_BUTTONS } from "@/components/vocabulary/flash-card";
import { ensureSavedWordAction, unsaveWordIfExistsAction } from "@/lib/actions/dictionary";
import { useDictionaryHintTutorial } from "@/hooks/use-dictionary-hint-tutorial";
import { formatIpa, pronounce } from "@/lib/pronounce";
import { useStudyPreferences } from "@/hooks/use-study-preferences";
import { StudySettings } from "@/components/study-game/study-settings";

/** Two-button mode: "Đã biết" counts as a normal successful recall. */
const TWO_BUTTONS: { rating: ReviewRating; label: string; key: string }[] = [
  { rating: "AGAIN", label: "Học lại", key: "←" },
  { rating: "GOOD", label: "Đã biết", key: "→" },
];

/** True when a key press belongs to something else on the page: typing in a
 * field, or using the settings popover / a dialog. */
function isForeignTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return true;
  return !!target.closest('[data-radix-popper-content-wrapper], [role="dialog"], [role="menu"]');
}

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
  showSettings = true,
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
  /** Off inside StudyFlow, whose own settings button also covers stages. */
  showSettings?: boolean;
}) {
  const [prefs, updatePrefs] = useStudyPreferences();
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

  // Each new card reads its word aloud when "Tự phát âm" is on (opening a
  // card always follows a click or key press, so the browser allows it).
  React.useEffect(() => {
    if (prefs.autoSpeak && item) pronounce(item.term, item.audioUrl);
    // Only when the card changes, not when the setting is toggled.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.queueKey]);

  function flip() {
    setFlipped((f) => !f);
    if (prefs.autoSpeak) pronounce(item.term, item.audioUrl);
  }

  // Keyboard: Space/Enter flips from anywhere on the page; 2-mode sorts with
  // left/right arrows (even before flipping, like Quizlet); 4-mode rates
  // with 1-4 once flipped. A ref keeps the window listener on fresh state.
  const keyHandler = React.useRef<(e: KeyboardEvent) => void>(() => {});
  React.useEffect(() => {
    keyHandler.current = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || isForeignTarget(e.target)) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        flip();
        return;
      }
      if (prefs.ratingMode === "two") {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          handleRate("AGAIN");
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          handleRate("GOOD");
        }
        return;
      }
      if (flipped && ["1", "2", "3", "4"].includes(e.key)) {
        e.preventDefault();
        handleRate(RATING_BUTTONS[Number(e.key) - 1].rating);
      }
    };
  });
  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => keyHandler.current(e);
    window.addEventListener("keydown", listener, true);
    return () => window.removeEventListener("keydown", listener, true);
  }, []);

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
        onClick={flip}
        aria-label={flipped ? "Lật về mặt từ vựng" : "Lật xem nghĩa"}
        className="relative flex min-h-64 w-full max-w-sm cursor-pointer touch-manipulation select-none flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-card px-6 py-12 text-center shadow-soft transition-transform hover:-translate-y-0.5"
      >
        {!flipped ? (
          <>
            <p className="max-w-full break-words text-2xl font-bold tracking-tight sm:text-3xl">{item.term}</p>
            {ipa && <p className="text-base text-muted-foreground">{ipa}</p>}
            {item.partOfSpeech && (
              <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">{item.partOfSpeech}</span>
            )}
            <p className="mt-2 text-xs text-muted-foreground">Bấm thẻ hoặc nhấn Space để xem nghĩa</p>
          </>
        ) : (
          <>
            <p className="max-w-full break-words text-xl font-bold text-primary sm:text-2xl">{item.meaningVi}</p>
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

      {prefs.ratingMode === "two" ? (
        <div className="grid w-full max-w-sm grid-cols-2 gap-3">
          {TWO_BUTTONS.map((btn) => (
            <button
              key={btn.rating}
              type="button"
              onClick={() => handleRate(btn.rating)}
              className={cn(
                "flex touch-manipulation items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold transition-[background-color,transform] duration-300 active:scale-[0.97]",
                btn.rating === "AGAIN"
                  ? "bg-destructive/10 text-destructive ring-1 ring-destructive/30 hover:bg-destructive/15"
                  : "bg-success/10 text-success ring-1 ring-success/30 hover:bg-success/15"
              )}
            >
              {btn.rating === "AGAIN" ? <X className="size-4" strokeWidth={2.5} /> : <Check className="size-4" strokeWidth={2.5} />}
              {btn.label}
              <kbd className="ml-1 hidden rounded-md bg-background/70 px-1.5 py-0.5 text-[11px] font-semibold sm:inline">{btn.key}</kbd>
            </button>
          ))}
        </div>
      ) : (
        <AnimatePresence>
          {flipped && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="grid w-full max-w-sm grid-cols-4 gap-2"
            >
              {RATING_BUTTONS.map((btn, i) => (
                <button
                  key={btn.rating}
                  type="button"
                  onClick={() => handleRate(btn.rating)}
                  className={cn("touch-manipulation rounded-xl px-2 py-3 text-sm font-semibold transition-colors sm:py-2.5 sm:text-xs", btn.className)}
                >
                  {btn.label}
                  <span className="ml-1 hidden opacity-70 sm:inline">({i + 1})</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={index === 0}
          aria-label="Từ trước"
          className="flex size-10 items-center justify-center rounded-lg border border-input disabled:opacity-40"
        >
          ‹
        </button>
        <button type="button" onClick={playAudio} aria-label="Phát âm" className="flex size-10 items-center justify-center rounded-lg border border-input">
          <Volume2 className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => updatePrefs({ autoSpeak: !prefs.autoSpeak })}
          aria-pressed={prefs.autoSpeak}
          className="flex h-10 items-center gap-1.5 rounded-lg border border-input px-3 text-xs text-muted-foreground hover:text-foreground"
        >
          {prefs.autoSpeak ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
          Tự đọc: {prefs.autoSpeak ? "Bật" : "Tắt"}
        </button>
        {showSettings && <StudySettings />}
      </div>

      <p className="hidden items-center gap-1.5 rounded-full bg-muted/70 px-4 py-1.5 text-xs text-muted-foreground sm:flex">
        <Keyboard className="size-3.5" />
        <kbd className="rounded bg-background px-1.5 font-semibold text-foreground">Space</kbd> lật thẻ
        {prefs.ratingMode === "two" ? (
          <>
            , <kbd className="rounded bg-background px-1.5 font-semibold text-foreground">←</kbd> học lại,{" "}
            <kbd className="rounded bg-background px-1.5 font-semibold text-foreground">→</kbd> đã biết
          </>
        ) : (
          <>
            , <kbd className="rounded bg-background px-1.5 font-semibold text-foreground">1</kbd>-
            <kbd className="rounded bg-background px-1.5 font-semibold text-foreground">4</kbd> tự đánh giá
          </>
        )}
      </p>

      {!flipped && isLast && prefs.ratingMode === "four" && (
        <p className="text-xs text-muted-foreground">Lật thẻ cuối cùng để tự đánh giá và hoàn thành.</p>
      )}
    </div>
  );
}
