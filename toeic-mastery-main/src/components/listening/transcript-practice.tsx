"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, CircleCheckBig, CloudOff, Headphones, History, Loader2, RotateCcw, Undo2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BLANK_PATTERN, type TranscriptGroup, type TranscriptTest } from "@/lib/content/transcripts/types";
import { isCorrectWord, type TranscriptAnswerKey } from "@/lib/content/transcripts/answer-key";
import type { ExerciseProgress } from "@/lib/data/exercise-progress";
import { saveTranscriptProgressAction } from "@/lib/actions/exercise-progress";
import type { SegmentMap } from "@/lib/content/transcripts/segments";
import type { TranscriptGroupKey } from "@/lib/data/transcripts";
import { GroupKeyPanel, GroupToolbar, LinePlayButton, ShortcutHelp, usePartSegments, useSegmentPlayer, type GroupResult } from "@/components/listening/transcript-group-tools";
import { TranscriptTour } from "@/components/listening/transcript-tour";
import { KEY_CHOICES, KEY_SHORT, TranscriptSettingsDialog, matchesCombo, useLoneKey, useTranscriptSettings } from "@/components/listening/transcript-settings";

const SPEEDS = [0.75, 0.9, 1, 1.25];
const PART_NAMES: Record<number, string> = {
  1: "Photographs",
  2: "Question-Response",
  3: "Conversations",
  4: "Talks",
};
const SAVE_DEBOUNCE_MS = 800;

type Answers = Record<string, string>;
type SaveState = "idle" | "saving" | "saved" | "error";
interface PartResult {
  correct: number;
  gradable: number;
  at: string | null;
}

/** This browser's copy of the answers — the only storage before answers
 * were saved to the account (same key as then, so that work is found). */
function legacyStorageKey(setKey: string, testNumber: number) {
  return `transcript:${setKey}:${testNumber}`;
}

function blankKey(part: number, groupId: string, lineIndex: number, blankIndex: number) {
  return `${part}:${groupId}:${lineIndex}:${blankIndex}`;
}

/** Every blank key of a Part, in reading order. */
function blankKeys(part: number, groups: TranscriptGroup[]) {
  const keys: string[] = [];
  for (const g of groups) {
    g.lines.forEach((l, li) => {
      const count = l.text.match(BLANK_PATTERN)?.length ?? 0;
      for (let b = 0; b < count; b++) keys.push(blankKey(part, g.id, li, b));
    });
  }
  return keys;
}

function partAnswers(answers: Answers, part: number) {
  return Object.fromEntries(Object.entries(answers).filter(([key, value]) => key.startsWith(`${part}:`) && value.trim()));
}

/** Nghe điền từ for one test: audio player on the left (sticky), the
 * transcript with inline blanks on the right, one Part at a time.
 * "Kiểm tra đáp án" grades a Part against `answerKey` (read off the full
 * ETS transcripts — blanks it couldn't place stay ungraded), shows the
 * right word next to each miss, and the Part's answers and last result are
 * saved to the learner's account. */
export function TranscriptPractice({
  setKey,
  setTitle,
  test,
  totalTests,
  audio,
  answerKey,
  savedParts,
  segments,
  groupKeys,
}: {
  setKey: string;
  setTitle: string;
  test: TranscriptTest;
  totalTests: number;
  /** part (0 = cả đề, 1–4) -> audio URL */
  audio: Record<number, string>;
  answerKey: TranscriptAnswerKey;
  /** part -> what was saved for it last time. */
  savedParts: Record<number, ExerciseProgress>;
  /** part -> admin-reviewed per-question timings of that Part's audio. */
  segments: Record<number, SegmentMap>;
  /** group id -> answers, questions and bilingual transcript. */
  groupKeys: Record<string, TranscriptGroupKey>;
}) {
  const [activePart, setActivePart] = React.useState(test.parts[0]?.part ?? 1);
  const [answers, setAnswers] = React.useState<Answers>(() =>
    Object.assign({}, ...Object.values(savedParts).map((p) => p.answers as Answers))
  );
  const [checked, setChecked] = React.useState<Set<number>>(
    () => new Set(Object.entries(savedParts).flatMap(([part, p]) => (p.submitted ? [Number(part)] : [])))
  );
  const [lastResults, setLastResults] = React.useState<Record<number, PartResult>>(() =>
    Object.fromEntries(
      Object.entries(savedParts).flatMap(([part, p]) =>
        p.lastCorrect != null && p.lastAnswered != null ? [[Number(part), { correct: p.lastCorrect, gradable: p.lastAnswered, at: p.lastDoneAt }]] : []
      )
    )
  );
  const [saveState, setSaveState] = React.useState<SaveState>("idle");
  const [speed, setSpeed] = React.useState(1);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const saveTimers = React.useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const loadedRef = React.useRef(false);

  // Browser copy kept as a backup of the account copy (e.g. a save that
  // failed offline is still there on reload). Declared before the loader
  // so on mount it sees loadedRef unset and doesn't overwrite the stored
  // answers before they've been read.
  React.useEffect(() => {
    if (!loadedRef.current) return;
    try {
      window.localStorage.setItem(legacyStorageKey(setKey, test.number), JSON.stringify(answers));
    } catch {
      // Ignore — the account copy still has it.
    }
  }, [answers, setKey, test.number]);

  // Picks up answers this browser kept before progress was saved to the
  // account (and anything not yet saved): Part by Part, a Part with nothing
  // on the server takes the browser's answers and uploads them right away,
  // so half-finished work typed before this update is never lost — even if
  // another Part has already been saved server-side.
  React.useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    let local: Answers = {};
    try {
      const raw = window.localStorage.getItem(legacyStorageKey(setKey, test.number));
      if (raw) local = JSON.parse(raw) as Answers;
    } catch {
      // Storage unavailable or malformed — nothing to recover.
    }
    const adopted: Answers = {};
    for (const p of test.parts) {
      if (savedParts[p.part]) continue;
      const fromBrowser = partAnswers(local, p.part);
      if (Object.keys(fromBrowser).length === 0) continue;
      Object.assign(adopted, fromBrowser);
      void saveTranscriptProgressAction({
        setKey,
        testNumber: test.number,
        part: p.part,
        total: Math.max(1, blankKeys(p.part, p.groups).length),
        answers: fromBrowser,
        checked: false,
      }).catch(() => undefined);
    }
    // Hydrating from browser-only storage after mount is the point here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (Object.keys(adopted).length > 0) setAnswers((prev) => ({ ...adopted, ...prev }));
  }, [savedParts, setKey, test]);

  React.useEffect(() => {
    const timers = saveTimers.current;
    return () => Object.values(timers).forEach(clearTimeout);
  }, []);

  const part = test.parts.find((p) => p.part === activePart) ?? test.parts[0];
  const audioUrl = audio[part.part] ?? audio[0] ?? null;
  const audioLabel = audio[part.part] ? `Part ${part.part}` : audio[0] ? "Cả đề" : null;

  React.useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed, audioUrl]);

  // Replaying one question/line at a time — needs the Part's own file.
  const partAudioUrl = audio[part.part] ?? null;
  const segmentGroups = React.useMemo(() => part.groups.map((g) => ({ id: g.id, lines: g.lines.length })), [part]);
  const partSegments = usePartSegments(segments[part.part], partAudioUrl, part.part, segmentGroups);
  const { settings, update: updateSettings } = useTranscriptSettings();
  const player = useSegmentPlayer(audioRef, {
    repeats: settings.autoReplay < 0 ? Infinity : settings.autoReplay,
    gapSec: settings.replayGap,
  });
  const [openKeys, setOpenKeys] = React.useState<Set<string>>(() => new Set());

  /** Play/pause the Part's main player — what the listen shortcut does
   * when there are no per-question timings for this file. */
  function togglePlayer() {
    const el = audioRef.current;
    if (!el) {
      toast.message("Part này chưa có file nghe.");
      return;
    }
    if (el.paused) void el.play();
    else el.pause();
  }

  async function playGroup(groupId: string, lineIndex?: number, fallbackToPlayer = false, restart = false) {
    const segs = await partSegments.ensure();
    const seg = segs?.[groupId];
    if (!seg) {
      if (fallbackToPlayer) togglePlayer();
      else toast.message("Chưa tách được đoạn ghi âm cho câu này — hãy dùng trình nghe ở bên trái.");
      return;
    }
    if (lineIndex === undefined || !seg.lines || seg.lines[lineIndex] === undefined) player.play({ id: groupId, start: seg.start, end: seg.end }, restart);
    else player.play({ id: `${groupId}:${lineIndex}`, start: seg.lines[lineIndex], end: seg.lines[lineIndex + 1] ?? seg.end }, restart);
  }

  function toggleKey(groupId: string) {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  }

  // Checking one question at a time, hints, and which question the keyboard
  // shortcuts act on (the one holding the focused blank, else the last used).
  const [checkedGroups, setCheckedGroups] = React.useState<Set<string>>(() => new Set());
  const [hints, setHints] = React.useState<Record<string, number>>({});
  const [activeGroup, setActiveGroup] = React.useState<string | null>(null);
  const [showShortcuts, setShowShortcuts] = React.useState(false);
  const currentGroupId = part.groups.some((g) => g.id === activeGroup) ? activeGroup! : part.groups[0]?.id;

  const groupBlankKeys = (groupId: string) => {
    const group = part.groups.find((g) => g.id === groupId);
    return group ? blankKeys(part.part, [group]) : [];
  };
  const isGroupChecked = (groupId: string) => checked.has(part.part) || checkedGroups.has(`${part.part}:${groupId}`);
  function groupResult(groupId: string, source: Answers = answers): GroupResult | null {
    const gradable = groupBlankKeys(groupId).filter((k) => answerKey[k]);
    if (gradable.length === 0) return null;
    return { correct: gradable.filter((k) => isCorrectWord(source[k] ?? "", answerKey[k])).length, total: gradable.length };
  }

  function focusBlank(key: string | undefined) {
    if (!key) return;
    requestAnimationFrame(() => {
      const el = document.querySelector<HTMLInputElement>(`[data-blank-key="${CSS.escape(key)}"]`);
      el?.focus();
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /** Grades one question; returns its first wrong blank, if any. */
  function checkGroup(groupId: string) {
    setActiveGroup(groupId);
    setCheckedGroups((prev) => new Set(prev).add(`${part.part}:${groupId}`));
    return groupBlankKeys(groupId).find((k) => answerKey[k] && !isCorrectWord(answers[k] ?? "", answerKey[k]));
  }

  function redoGroup(groupId: string) {
    const wrong = groupBlankKeys(groupId).filter((k) => answerKey[k] && !isCorrectWord(answers[k] ?? "", answerKey[k]));
    const next = Object.fromEntries(Object.entries(answers).filter(([key]) => !wrong.includes(key)));
    setAnswers(next);
    setCheckedGroups((prev) => {
      const out = new Set(prev);
      out.delete(`${part.part}:${groupId}`);
      return out;
    });
    if (checked.has(part.part)) uncheck();
    persist(part.part, next, false);
    focusBlank(wrong[0]);
  }

  /** One more letter of the word in each listed blank that isn't right yet. */
  function addHints(blankList: string[]) {
    setHints((prev) => {
      const next = { ...prev };
      for (const k of blankList) {
        const word = answerKey[k];
        if (!word || isCorrectWord(answers[k] ?? "", word)) continue;
        next[k] = Math.min(word.length, (next[k] ?? 0) + 1);
      }
      return next;
    });
  }

  function focusGroup(groupId: string | undefined) {
    if (!groupId) return;
    setActiveGroup(groupId);
    const blanks = groupBlankKeys(groupId);
    const firstOpen = blanks.find((k) => !(answerKey[k] && isCorrectWord(answers[k] ?? "", answerKey[k]))) ?? blanks[0];
    if (firstOpen) focusBlank(firstOpen);
    else document.getElementById(`transcript-group-${groupId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const keys = React.useMemo(() => blankKeys(part.part, part.groups), [part]);
  const totalBlanks = keys.length;
  const filledBlanks = keys.filter((k) => answers[k]?.trim()).length;
  const gradableKeys = keys.filter((k) => answerKey[k]);
  const isChecked = checked.has(part.part);
  const correctKeys = gradableKeys.filter((k) => isCorrectWord(answers[k] ?? "", answerKey[k]));
  const wrongKeys = gradableKeys.filter((k) => !isCorrectWord(answers[k] ?? "", answerKey[k]));
  const last = lastResults[part.part];

  function persist(partNumber: number, nextAnswers: Answers, nextChecked: boolean, result?: PartResult, immediate = false) {
    clearTimeout(saveTimers.current[partNumber]);
    const total = blankKeys(partNumber, test.parts.find((p) => p.part === partNumber)?.groups ?? []).length;
    const run = async () => {
      setSaveState("saving");
      const res = await saveTranscriptProgressAction({
        setKey,
        testNumber: test.number,
        part: partNumber,
        total: Math.max(1, total),
        answers: partAnswers(nextAnswers, partNumber),
        checked: nextChecked,
        result: result ? { correct: result.correct, answered: result.gradable } : undefined,
      }).catch(() => ({ error: "network" }));
      setSaveState(res.error ? "error" : "saved");
    };
    if (immediate) void run();
    else saveTimers.current[partNumber] = setTimeout(() => void run(), SAVE_DEBOUNCE_MS);
  }

  function setAnswer(key: string, value: string) {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    persist(part.part, next, isChecked);
  }

  function checkPart() {
    const result = { correct: correctKeys.length, gradable: gradableKeys.length, at: new Date().toISOString() };
    setChecked((prev) => new Set(prev).add(part.part));
    setLastResults((prev) => ({ ...prev, [part.part]: result }));
    persist(part.part, answers, true, result, true);
  }

  function uncheck() {
    setChecked((prev) => {
      const next = new Set(prev);
      next.delete(part.part);
      return next;
    });
  }

  function clearPart() {
    const next = Object.fromEntries(Object.entries(answers).filter(([key]) => !key.startsWith(`${part.part}:`)));
    setAnswers(next);
    uncheck();
    setCheckedGroups((prev) => new Set([...prev].filter((g) => !g.startsWith(`${part.part}:`))));
    setHints((prev) => Object.fromEntries(Object.entries(prev).filter(([key]) => !key.startsWith(`${part.part}:`))));
    persist(part.part, next, false, undefined, true);
  }

  /** Clears only the missed blanks, keeping the right ones, and focuses the first. */
  function redoWrong() {
    const wrong = new Set(wrongKeys);
    const next = Object.fromEntries(Object.entries(answers).filter(([key]) => !wrong.has(key)));
    setAnswers(next);
    uncheck();
    setCheckedGroups((prev) => new Set([...prev].filter((g) => !g.startsWith(`${part.part}:`))));
    persist(part.part, next, false, undefined, true);
    requestAnimationFrame(() => {
      const first = document.querySelector<HTMLInputElement>(`[data-blank-key="${CSS.escape(wrongKeys[0] ?? "")}"]`);
      first?.focus();
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function skip(seconds: number) {
    const el = audioRef.current;
    if (el) el.currentTime = Math.max(0, el.currentTime + seconds);
  }

  /** Enter jumps to the next blank (Shift+Enter back), so you can type
   * along while listening. Enter on a question's last blank checks that
   * question first: all right moves on, otherwise back to its first miss. */
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const inputs = Array.from(document.querySelectorAll<HTMLInputElement>("[data-transcript-blank]:not([readonly])"));
    const index = inputs.indexOf(e.currentTarget);
    if (e.shiftKey) {
      inputs[index - 1]?.focus();
      return;
    }
    const key = e.currentTarget.dataset.blankKey ?? "";
    const groupId = key.split(":")[1];
    const blanks = groupBlankKeys(groupId);
    if (key === blanks[blanks.length - 1] && blanks.some((k) => answerKey[k])) {
      const firstWrong = checkGroup(groupId);
      if (firstWrong) {
        focusBlank(firstWrong);
        return;
      }
      const nextGroup = part.groups[part.groups.findIndex((g) => g.id === groupId) + 1];
      if (nextGroup) focusGroup(nextGroup.id);
      return;
    }
    inputs[index + 1]?.focus();
  }

  // Keyboard shortcuts — Ctrl/Alt combos (matched on e.code, so Option on a
  // Mac works too) that don't clash with typing or the browser's own keys.
  /** "Nghe lại": the slice last played in the current question (a line or
   * the whole question) from its start, else the whole question. */
  function replayCurrent() {
    const groupId = currentGroupId;
    if (!groupId) return;
    const last = player.lastRange();
    if (last && last.id.split(":")[0] === groupId) player.play(last, true);
    else void playGroup(groupId, undefined, true, true);
  }

  function playPause() {
    if (!player.togglePause()) toast.message("Part này chưa có file nghe.");
  }

  useLoneKey([settings.replayKey, settings.playPauseKey], (choice) => {
    if (choice === settings.replayKey) replayCurrent();
    else if (choice === settings.playPauseKey) playPause();
  });

  function handleShortcut(e: KeyboardEvent) {
    if (matchesCombo(settings.replayKey, e)) {
      e.preventDefault();
      replayCurrent();
      return;
    }
    if (matchesCombo(settings.playPauseKey, e)) {
      e.preventDefault();
      playPause();
      return;
    }
    const groupId = currentGroupId;
    if (!groupId) return;
    const focusedKey = (document.activeElement as HTMLElement | null)?.dataset?.blankKey;
    // Alt+P is the main one: macOS (and some Windows keyboards) take
    // Ctrl+Space to switch input language before the page ever sees it.
    if ((e.ctrlKey && !e.altKey && e.code === "Space") || (e.altKey && !e.ctrlKey && !e.metaKey && e.code === "KeyP")) {
      e.preventDefault();
      void playGroup(groupId, undefined, true);
      return;
    }
    if (e.code === "Escape" && audioRef.current && !audioRef.current.paused) {
      player.stop();
      return;
    }
    if (!e.altKey || e.ctrlKey || e.metaKey) return;
    const digit = e.code.match(/^Digit([1-9])$/)?.[1];
    const actions: Record<string, () => void> = {
      KeyR: () => player.setLoop((v) => !v),
      KeyH: () => addHints(focusedKey ? [focusedKey] : groupBlankKeys(groupId)),
      KeyC: () => {
        const firstWrong = checkGroup(groupId);
        if (firstWrong) focusBlank(firstWrong);
      },
      KeyA: () => toggleKey(groupId),
      KeyB: () => skip(-3),
      Slash: () => setShowShortcuts((v) => !v),
      ArrowDown: () => focusGroup(part.groups[part.groups.findIndex((g) => g.id === groupId) + 1]?.id),
      ArrowUp: () => focusGroup(part.groups[part.groups.findIndex((g) => g.id === groupId) - 1]?.id),
    };
    const action = digit ? () => void playGroup(groupId, Number(digit) - 1) : actions[e.code];
    if (!action) return;
    e.preventDefault();
    action();
  }
  const shortcutRef = React.useRef(handleShortcut);
  React.useEffect(() => {
    shortcutRef.current = handleShortcut;
  });
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => shortcutRef.current(e);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const checkButton =
    gradableKeys.length > 0 ? (
      <Button type="button" onClick={checkPart} disabled={filledBlanks === 0} className="w-full sm:w-fit">
        <CircleCheckBig className="size-4" /> {isChecked ? "Chấm lại" : "Kiểm tra đáp án"} Part {part.part}
      </Button>
    ) : null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href={`/listening/transcripts/${setKey}`}
          className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> {setTitle}
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Test {test.number} <span className="text-muted-foreground">/ {totalTests}</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Nghe và điền một từ vào mỗi chỗ trống. Enter sang ô tiếp theo — Enter ở ô cuối của câu sẽ kiểm tra luôn câu đó. Bí thì bấm “Gợi ý” để hiện chữ cái đầu.
        </p>
      </div>

      <TranscriptTour />

      <div data-tour="transcript-parts" className="flex gap-1 overflow-x-auto rounded-full bg-card p-1 shadow-soft">
        {test.parts.map((p) => (
          <button
            key={p.part}
            type="button"
            onClick={() => setActivePart(p.part)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              p.part === part.part ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
            )}
          >
            Part {p.part}
            <span className="hidden text-xs opacity-80 sm:inline">· {PART_NAMES[p.part]}</span>
            {lastResults[p.part] && (
              <span className={cn("rounded-full px-1.5 text-[10px] font-semibold", p.part === part.part ? "bg-white/20" : "bg-success/15 text-success")}>
                {lastResults[p.part].correct}/{lastResults[p.part].gradable}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(280px,340px)_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div data-tour="transcript-audio" className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Headphones className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">File nghe</p>
                <p className="text-xs text-muted-foreground">{audioLabel ? `Đang dùng: ${audioLabel}` : `Part ${part.part}`}</p>
              </div>
            </div>

            {audioUrl ? (
              <>
                <audio ref={audioRef} key={audioUrl} controls preload="metadata" src={audioUrl} className="w-full" />
                <div className="flex flex-wrap items-center gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => skip(-5)}>
                    <Undo2 className="size-3.5" /> 5 giây
                  </Button>
                  <div className="flex gap-1">
                    {SPEEDS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSpeed(s)}
                        className={cn(
                          "rounded-lg px-2 py-1 text-xs font-medium transition-colors",
                          speed === s ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>
                {partAudioUrl ? (
                  <p className="text-xs text-muted-foreground">
                    Bấm <span className="font-semibold text-primary">Nghe câu</span> ở mỗi câu để nghe riêng câu đó, bật lặp lại để nghe đi nghe lại.
                    {partSegments.isAuto && " Mốc câu được chia tự động nên có thể lệch vài giây."}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">Đang dùng file cả đề — nghe từng câu sẽ có khi có file riêng của Part {part.part}.</p>
                )}
              </>
            ) : (
              <p className="rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                Chưa có file nghe cho đề này. Quản trị viên sẽ bổ sung sau — bạn vẫn có thể đọc và điền trước.
              </p>
            )}

            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Đã điền Part {part.part}</span>
                <span className="font-medium text-foreground">
                  {filledBlanks}/{totalBlanks}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-accent">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${totalBlanks ? (filledBlanks / totalBlanks) * 100 : 0}%` }} />
              </div>
            </div>

            {isChecked && gradableKeys.length > 0 && (
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 text-sm">
                <p>
                  Đúng <span className="font-semibold text-success">{correctKeys.length}</span>/{gradableKeys.length} ô · Sai{" "}
                  <span className="font-semibold text-destructive">{wrongKeys.length}</span>
                </p>
                {gradableKeys.length < totalBlanks && (
                  <p className="mt-1 text-xs text-muted-foreground">{totalBlanks - gradableKeys.length} ô chưa có đáp án đối chiếu nên không chấm.</p>
                )}
              </div>
            )}
            {gradableKeys.length === 0 && (
              <p className="rounded-xl bg-accent/50 p-3 text-xs text-muted-foreground">Đề này chưa có transcript gốc để chấm — bạn vẫn có thể điền và lưu bài.</p>
            )}

            {last && (
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <History className="size-3.5" /> Lần chấm gần nhất:{" "}
                <span className="font-medium text-foreground">
                  {last.correct}/{last.gradable}
                </span>{" "}
                đúng{last.at && <> ({new Date(last.at).toLocaleDateString("vi-VN")})</>}
              </p>
            )}

            {checkButton}

            <div data-tour="transcript-settings" className="flex flex-wrap items-start gap-2">
              <TranscriptSettingsDialog settings={settings} onChange={updateSettings} />
              <ShortcutHelp
                open={showShortcuts}
                onToggle={() => setShowShortcuts((v) => !v)}
                extra={[
                  [KEY_CHOICES[settings.replayKey], "Nghe lại câu từ đầu"],
                  [KEY_CHOICES[settings.playPauseKey], "Phát / tạm dừng"],
                ]}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {isChecked && wrongKeys.length > 0 && (
                <Button type="button" variant="outline" size="sm" onClick={redoWrong} className="border-destructive/40 text-destructive hover:bg-destructive/10">
                  <XCircle className="size-3.5" /> Làm lại ô sai ({wrongKeys.length})
                </Button>
              )}
              <Button type="button" variant="outline" size="sm" onClick={clearPart} disabled={filledBlanks === 0}>
                <RotateCcw className="size-3.5" /> Làm lại Part {part.part}
              </Button>
            </div>

            {saveState !== "idle" && (
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                {saveState === "saving" && (
                  <>
                    <Loader2 className="size-3 animate-spin" /> Đang lưu…
                  </>
                )}
                {saveState === "saved" && (
                  <>
                    <Check className="size-3 text-success" /> Đã lưu bài làm vào tài khoản
                  </>
                )}
                {saveState === "error" && (
                  <>
                    <CloudOff className="size-3 text-destructive" /> Chưa lưu được — kiểm tra kết nối
                  </>
                )}
              </p>
            )}
          </div>
        </aside>

        <div className="flex flex-col gap-4">
          {part.groups.map((group) => (
            <section
              key={group.id}
              id={`transcript-group-${group.id}`}
              data-tour={group.id === part.groups[0]?.id ? "transcript-first-group" : undefined}
              onFocusCapture={() => setActiveGroup(group.id)}
              className={cn(
                "rounded-2xl border bg-card p-4 shadow-soft transition-[border-color,box-shadow] sm:p-5",
                group.id === currentGroupId ? "border-primary/50 ring-2 ring-primary/15" : "border-border"
              )}
            >
              <GroupToolbar
                groupId={group.id}
                title={group.title}
                canPlay={Boolean(partAudioUrl) && partSegments.available && (!partSegments.segments || Boolean(partSegments.segments[group.id]))}
                detecting={partSegments.detecting}
                playing={player.playing}
                loop={player.loop}
                onPlay={() => {
                  setActiveGroup(group.id);
                  void playGroup(group.id);
                }}
                onToggleLoop={() => player.setLoop((v) => !v)}
                keyTip={settings.showKeyTips ? KEY_SHORT[settings.replayKey] : undefined}
                canHint={groupBlankKeys(group.id).some((k) => answerKey[k] && !isCorrectWord(answers[k] ?? "", answerKey[k]))}
                onHint={() => {
                  setActiveGroup(group.id);
                  addHints(groupBlankKeys(group.id));
                }}
                canCheck={groupBlankKeys(group.id).some((k) => answerKey[k])}
                result={isGroupChecked(group.id) ? groupResult(group.id) : null}
                onCheck={() => focusBlank(checkGroup(group.id))}
                onRedo={() => redoGroup(group.id)}
                hasKey={Boolean(groupKeys[group.id])}
                showKey={openKeys.has(group.id)}
                onToggleKey={() => toggleKey(group.id)}
              />
              <div className="flex flex-col gap-2.5">
                {group.lines.map((line, lineIndex) => (
                  <div key={lineIndex} className="flex gap-2 text-sm leading-9">
                    {partSegments.segments?.[group.id]?.lines?.[lineIndex] !== undefined && (
                      <LinePlayButton active={player.playing?.id === `${group.id}:${lineIndex}`} onClick={() => void playGroup(group.id, lineIndex)} />
                    )}
                    {(line.speaker || line.label) && (
                      <span
                        className={cn(
                          "mt-1.5 h-fit shrink-0 rounded-md px-1.5 text-xs font-semibold leading-6",
                          line.speaker ? "bg-primary/15 text-primary" : "text-muted-foreground"
                        )}
                      >
                        {line.speaker ? `${line.speaker}:` : line.label}
                      </span>
                    )}
                    <p className="min-w-0 flex-1">
                      <LineWithBlanks
                        text={line.text}
                        keyFor={(blankIndex) => blankKey(part.part, group.id, lineIndex, blankIndex)}
                        answers={answers}
                        answerKey={answerKey}
                        hints={hints}
                        minHint={settings.firstLetters ? 1 : 0}
                        checked={isGroupChecked(group.id)}
                        onChange={setAnswer}
                        onKeyDown={handleKeyDown}
                      />
                    </p>
                  </div>
                ))}
              </div>
              {openKeys.has(group.id) && groupKeys[group.id] && <GroupKeyPanel data={groupKeys[group.id]} part={part.part} />}
            </section>
          ))}

          {checkButton && <div className="flex justify-end">{checkButton}</div>}

          <nav className="flex flex-wrap justify-between gap-3 border-t border-border pt-4">
            {test.number > 1 ? (
              <Link href={`/listening/transcripts/${setKey}/${test.number - 1}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                <ChevronLeft className="size-4" /> Test {test.number - 1}
              </Link>
            ) : (
              <span />
            )}
            {test.number < totalTests && (
              <Link href={`/listening/transcripts/${setKey}/${test.number + 1}`} className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Test {test.number + 1} <ChevronRight className="size-4" />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

function LineWithBlanks({
  text,
  keyFor,
  answers,
  answerKey,
  hints,
  minHint,
  checked,
  onChange,
  onKeyDown,
}: {
  text: string;
  keyFor: (blankIndex: number) => string;
  answers: Answers;
  answerKey: TranscriptAnswerKey;
  /** blank key -> letters of the answer revealed as a hint. */
  hints: Record<string, number>;
  /** Letters every blank shows anyway ("Hiện sẵn chữ cái đầu"). */
  minHint: number;
  checked: boolean;
  onChange: (key: string, value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  const pieces = text.split(BLANK_PATTERN);
  return (
    <>
      {pieces.map((piece, i) => {
        if (i === pieces.length - 1) return <React.Fragment key={i}>{piece}</React.Fragment>;
        const key = keyFor(i);
        const value = answers[key] ?? "";
        const answer = answerKey[key];
        const graded = checked && Boolean(answer);
        const right = graded && isCorrectWord(value, answer);
        const wrong = graded && !right;
        const shown = Math.max(hints[key] ?? 0, minHint);
        const hinted = answer && shown ? answer.slice(0, shown) + "·".repeat(Math.max(0, answer.length - shown)) : "";
        return (
          <React.Fragment key={i}>
            {piece}
            <input
              data-transcript-blank
              data-blank-key={key}
              value={value}
              onChange={(e) => onChange(key, e.target.value)}
              onKeyDown={onKeyDown}
              readOnly={right}
              placeholder={hinted || undefined}
              size={Math.max(6, value.length + 1, hinted.length + 1)}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label={wrong ? `Chỗ trống — đáp án: ${answer}` : "Chỗ trống"}
              title={checked && !answer ? "Chưa có đáp án đối chiếu cho ô này" : hinted ? "Đã dùng gợi ý" : undefined}
              className={cn(
                "mx-0.5 inline-block h-7 rounded-md border-b-2 bg-accent/40 px-1.5 text-center align-baseline text-base font-medium outline-none transition-colors focus:border-primary focus:bg-accent sm:text-sm",
                right && "border-success bg-success/15 text-success",
                wrong && "border-destructive bg-destructive/10 text-destructive line-through decoration-destructive/60",
                !graded && (value.trim() ? "border-primary/60 text-primary" : hinted ? "border-warning/70" : "border-muted-foreground/40"),
                hinted && "placeholder:font-mono placeholder:tracking-wider placeholder:text-warning/80"
              )}
            />
            {wrong && (
              <span className="mx-0.5 inline-flex items-center rounded-md bg-success/15 px-1.5 align-baseline text-xs font-semibold leading-6 text-success">
                {answer}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}
