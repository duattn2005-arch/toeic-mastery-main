"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Headphones, RotateCcw, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BLANK_PATTERN, type TranscriptGroup, type TranscriptTest } from "@/lib/content/transcripts/types";

const SPEEDS = [0.75, 0.9, 1, 1.25];
const PART_NAMES: Record<number, string> = {
  1: "Photographs",
  2: "Question-Response",
  3: "Conversations",
  4: "Talks",
};

type Answers = Record<string, string>;

function storageKey(setKey: string, testNumber: number) {
  return `transcript:${setKey}:${testNumber}`;
}

function blankKey(part: number, groupId: string, lineIndex: number, blankIndex: number) {
  return `${part}:${groupId}:${lineIndex}:${blankIndex}`;
}

function countBlanks(groups: TranscriptGroup[]) {
  return groups.reduce((sum, g) => sum + g.lines.reduce((n, l) => n + (l.text.match(BLANK_PATTERN)?.length ?? 0), 0), 0);
}

/** Nghe điền từ for one test: audio player on the left (sticky), the
 * transcript with inline blanks on the right, one Part at a time. Answers
 * are kept in this browser's localStorage per test — the source lists have
 * no answer key, so there's nothing to grade server-side. */
export function TranscriptPractice({
  setKey,
  setTitle,
  test,
  totalTests,
  audio,
}: {
  setKey: string;
  setTitle: string;
  test: TranscriptTest;
  totalTests: number;
  /** part (0 = cả đề, 1–4) -> audio URL */
  audio: Record<number, string>;
}) {
  const [activePart, setActivePart] = React.useState(test.parts[0]?.part ?? 1);
  const [answers, setAnswers] = React.useState<Answers>({});
  const [speed, setSpeed] = React.useState(1);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const loadedRef = React.useRef(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey(setKey, test.number));
      // Hydrating from browser-only storage after mount is the point here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setAnswers(JSON.parse(raw) as Answers);
    } catch {
      // Storage unavailable (private mode, blocked) — start empty.
    }
    loadedRef.current = true;
  }, [setKey, test.number]);

  React.useEffect(() => {
    if (!loadedRef.current) return;
    try {
      window.localStorage.setItem(storageKey(setKey, test.number), JSON.stringify(answers));
    } catch {
      // Ignore — answers just won't persist across reloads.
    }
  }, [answers, setKey, test.number]);

  const part = test.parts.find((p) => p.part === activePart) ?? test.parts[0];
  const audioUrl = audio[part.part] ?? audio[0] ?? null;
  const audioLabel = audio[part.part] ? `Part ${part.part}` : audio[0] ? "Cả đề" : null;

  React.useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed, audioUrl]);

  const totalBlanks = countBlanks(part.groups);
  const filledBlanks = Object.entries(answers).filter(([key, value]) => key.startsWith(`${part.part}:`) && value.trim()).length;

  function setAnswer(key: string, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function clearPart() {
    setAnswers((prev) => Object.fromEntries(Object.entries(prev).filter(([key]) => !key.startsWith(`${part.part}:`))));
  }

  function skip(seconds: number) {
    const el = audioRef.current;
    if (el) el.currentTime = Math.max(0, el.currentTime + seconds);
  }

  /** Enter jumps to the next blank, so you can type along while listening. */
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const inputs = Array.from(document.querySelectorAll<HTMLInputElement>("[data-transcript-blank]"));
    const index = inputs.indexOf(e.currentTarget);
    inputs[index + 1]?.focus();
  }

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
        <p className="text-sm text-muted-foreground">Nghe và điền một từ vào mỗi chỗ trống. Nhấn Enter để chuyển sang ô tiếp theo.</p>
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
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(280px,340px)_1fr]">
        <aside className="lg:sticky lg:top-4 lg:self-start">
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

            <Button type="button" variant="outline" size="sm" onClick={clearPart} disabled={filledBlanks === 0} className="w-fit">
              <RotateCcw className="size-3.5" /> Xóa bài làm Part {part.part}
            </Button>
          </div>
        </aside>

        <div className="flex flex-col gap-4">
          {part.groups.map((group) => (
            <section key={group.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h3 className="mb-3 text-sm font-semibold text-primary">{group.title}</h3>
              <div className="flex flex-col gap-2.5">
                {group.lines.map((line, lineIndex) => (
                  <div key={lineIndex} className="flex gap-2 text-sm leading-8">
                    {(line.speaker || line.label) && (
                      <span
                        className={cn(
                          "mt-1 h-fit shrink-0 rounded-md px-1.5 text-xs font-semibold leading-6",
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
                        onChange={setAnswer}
                        onKeyDown={handleKeyDown}
                      />
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}

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
  onChange,
  onKeyDown,
}: {
  text: string;
  keyFor: (blankIndex: number) => string;
  answers: Answers;
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
        return (
          <React.Fragment key={i}>
            {piece}
            <input
              data-transcript-blank
              value={value}
              onChange={(e) => onChange(key, e.target.value)}
              onKeyDown={onKeyDown}
              size={Math.max(6, value.length + 1)}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Chỗ trống"
              className={cn(
                "mx-0.5 inline-block h-7 rounded-md border-b-2 bg-accent/40 px-1.5 text-center align-baseline text-base font-medium sm:text-sm outline-none transition-colors focus:border-primary focus:bg-accent",
                value.trim() ? "border-primary/60 text-primary" : "border-muted-foreground/40"
              )}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}
