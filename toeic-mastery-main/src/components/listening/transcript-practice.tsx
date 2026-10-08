"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, CircleCheckBig, CloudOff, Headphones, History, Loader2, RotateCcw, Undo2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BLANK_PATTERN, type TranscriptGroup, type TranscriptTest } from "@/lib/content/transcripts/types";
import { isCorrectWord, type TranscriptAnswerKey } from "@/lib/content/transcripts/answer-key";
import type { ExerciseProgress } from "@/lib/data/exercise-progress";
import { saveTranscriptProgressAction } from "@/lib/actions/exercise-progress";

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
    persist(part.part, next, false, undefined, true);
  }

  /** Clears only the missed blanks, keeping the right ones, and focuses the first. */
  function redoWrong() {
    const wrong = new Set(wrongKeys);
    const next = Object.fromEntries(Object.entries(answers).filter(([key]) => !wrong.has(key)));
    setAnswers(next);
    uncheck();
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

  /** Enter jumps to the next blank, so you can type along while listening. */
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const inputs = Array.from(document.querySelectorAll<HTMLInputElement>("[data-transcript-blank]:not([readonly])"));
    const index = inputs.indexOf(e.currentTarget);
    inputs[index + 1]?.focus();
  }

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
          Nghe và điền một từ vào mỗi chỗ trống. Nhấn Enter để chuyển sang ô tiếp theo, làm xong bấm “Kiểm tra đáp án”.
        </p>
      </div>

      <div className="flex gap-1 overflow-x-auto rounded-full bg-card p-1 shadow-soft">
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
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
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
            <section key={group.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5">
              <h3 className="mb-3 text-sm font-semibold text-primary">{group.title}</h3>
              <div className="flex flex-col gap-2.5">
                {group.lines.map((line, lineIndex) => (
                  <div key={lineIndex} className="flex gap-2 text-sm leading-9">
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
                        checked={isChecked}
                        onChange={setAnswer}
                        onKeyDown={handleKeyDown}
                      />
                    </p>
                  </div>
                ))}
              </div>
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
  checked,
  onChange,
  onKeyDown,
}: {
  text: string;
  keyFor: (blankIndex: number) => string;
  answers: Answers;
  answerKey: TranscriptAnswerKey;
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
              size={Math.max(6, value.length + 1)}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label={wrong ? `Chỗ trống — đáp án: ${answer}` : "Chỗ trống"}
              title={checked && !answer ? "Chưa có đáp án đối chiếu cho ô này" : undefined}
              className={cn(
                "mx-0.5 inline-block h-7 rounded-md border-b-2 bg-accent/40 px-1.5 text-center align-baseline text-base font-medium outline-none transition-colors focus:border-primary focus:bg-accent sm:text-sm",
                right && "border-success bg-success/15 text-success",
                wrong && "border-destructive bg-destructive/10 text-destructive line-through decoration-destructive/60",
                !graded && (value.trim() ? "border-primary/60 text-primary" : "border-muted-foreground/40")
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
