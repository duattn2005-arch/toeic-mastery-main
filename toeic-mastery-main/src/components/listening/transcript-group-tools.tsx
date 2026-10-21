"use client";

import * as React from "react";
import { CheckCircle2, Languages, Loader2, Pause, Play, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";
import { detectSegmentsFromUrl, type SegmentGroupInfo, type SegmentMap } from "@/lib/content/transcripts/segments";
import type { TranscriptGroupKey } from "@/lib/data/transcripts";

/** What the shared <audio> is currently playing a slice of. */
export interface PlayingRange {
  id: string;
  start: number;
  end: number;
}

/**
 * Plays slices (one question, or one line of it) of the Part's audio
 * element: seeks to the start, stops at the end — or jumps back to the
 * start when looping. The page's speed buttons still apply, since it's the
 * same element.
 */
export function useSegmentPlayer(audioRef: React.RefObject<HTMLAudioElement | null>) {
  const [playing, setPlaying] = React.useState<PlayingRange | null>(null);
  const [loop, setLoop] = React.useState(false);
  const rangeRef = React.useRef<PlayingRange | null>(null);
  const loopRef = React.useRef(false);
  React.useEffect(() => {
    loopRef.current = loop;
  }, [loop]);

  React.useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = audioRef.current;
      const range = rangeRef.current;
      if (el && range) {
        // Someone dragged the player elsewhere: that's no longer our slice.
        if (el.currentTime < range.start - 1 || el.currentTime > range.end + 1) {
          rangeRef.current = null;
          setPlaying(null);
        } else if (el.currentTime >= range.end) {
          if (loopRef.current) el.currentTime = range.start;
          else {
            el.pause();
            rangeRef.current = null;
            setPlaying(null);
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [audioRef]);

  const stop = React.useCallback(() => {
    audioRef.current?.pause();
    rangeRef.current = null;
    setPlaying(null);
  }, [audioRef]);

  const play = React.useCallback(
    (range: PlayingRange) => {
      const el = audioRef.current;
      if (!el) return;
      if (rangeRef.current?.id === range.id && !el.paused) {
        stop();
        return;
      }
      rangeRef.current = range;
      setPlaying(range);
      el.currentTime = range.start;
      void el.play();
    },
    [audioRef, stop]
  );

  // A pause from the player's own controls ends the slice too.
  React.useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPause = () => {
      if (rangeRef.current && el.currentTime < rangeRef.current.end - 0.05) {
        rangeRef.current = null;
        setPlaying(null);
      }
    };
    el.addEventListener("pause", onPause);
    return () => el.removeEventListener("pause", onPause);
  });

  return { playing, play, stop, loop, setLoop };
}

const AUTO_CACHE_PREFIX = "transcript-seg:v1:";

/**
 * Per-question timings for the current Part: the admin-reviewed ones when
 * saved, otherwise worked out in the browser from the Part's own audio the
 * first time a learner asks (cached per file). Whole-test audio is never
 * auto-split — finding a Part inside it isn't reliable.
 */
export function usePartSegments(saved: SegmentMap | undefined, partAudioUrl: string | null, part: number, groups: SegmentGroupInfo[]) {
  const [auto, setAuto] = React.useState<Record<string, SegmentMap | "failed">>({});
  const [detecting, setDetecting] = React.useState(false);

  // Results worked out on an earlier visit, read after mount (browser only).
  React.useEffect(() => {
    if (saved || !partAudioUrl || auto[partAudioUrl]) return;
    try {
      const raw = window.localStorage.getItem(AUTO_CACHE_PREFIX + partAudioUrl);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating from browser storage
      if (raw) setAuto((prev) => ({ ...prev, [partAudioUrl]: JSON.parse(raw) as SegmentMap }));
    } catch {
      // Unavailable or malformed — it'll be worked out again on demand.
    }
  }, [saved, partAudioUrl, auto]);

  const cached = partAudioUrl ? auto[partAudioUrl] : undefined;
  const segments: SegmentMap | null = saved ?? (cached && cached !== "failed" ? cached : null);
  const canDetect = !saved && Boolean(partAudioUrl) && cached !== "failed";

  const ensure = React.useCallback(async (): Promise<SegmentMap | null> => {
    if (segments) return segments;
    if (!partAudioUrl || !canDetect) return null;
    setDetecting(true);
    try {
      const found = await detectSegmentsFromUrl(partAudioUrl, part, groups);
      setAuto((prev) => ({ ...prev, [partAudioUrl]: found ?? "failed" }));
      if (found) {
        try {
          window.localStorage.setItem(AUTO_CACHE_PREFIX + partAudioUrl, JSON.stringify(found));
        } catch {
          // Storage full or blocked — it'll just be worked out again next time.
        }
      }
      return found;
    } catch {
      setAuto((prev) => ({ ...prev, [partAudioUrl]: "failed" }));
      return null;
    } finally {
      setDetecting(false);
    }
  }, [segments, partAudioUrl, canDetect, part, groups]);

  return { segments, isAuto: !saved && Boolean(segments), available: Boolean(segments) || canDetect, detecting, ensure };
}

/** "Nghe câu" + loop toggle + "Dịch & đáp án" toggle for one group card. */
export function GroupToolbar({
  groupId,
  title,
  canPlay,
  detecting,
  playing,
  loop,
  onPlay,
  onToggleLoop,
  hasKey,
  showKey,
  onToggleKey,
}: {
  groupId: string;
  title: string;
  canPlay: boolean;
  detecting: boolean;
  playing: PlayingRange | null;
  loop: boolean;
  onPlay: () => void;
  onToggleLoop: () => void;
  hasKey: boolean;
  showKey: boolean;
  onToggleKey: () => void;
}) {
  const isPlaying = playing?.id === groupId;
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <h3 className="mr-auto text-sm font-semibold text-primary">{title}</h3>
      {canPlay && (
        <>
          <button
            type="button"
            onClick={onPlay}
            disabled={detecting}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-colors",
              isPlaying ? "bg-primary text-primary-foreground" : "bg-primary/12 text-primary hover:bg-primary/20"
            )}
          >
            {detecting ? <Loader2 className="size-3.5 animate-spin" /> : isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
            {detecting ? "Đang chia câu…" : isPlaying ? "Dừng" : "Nghe câu"}
          </button>
          <button
            type="button"
            onClick={onToggleLoop}
            aria-pressed={loop}
            title={loop ? "Đang lặp lại câu — bấm để tắt" : "Lặp lại câu liên tục"}
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-full border transition-colors",
              loop ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            <Repeat className="size-3.5" />
          </button>
        </>
      )}
      {hasKey && (
        <button
          type="button"
          onClick={onToggleKey}
          aria-expanded={showKey}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-colors",
            showKey ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:text-foreground"
          )}
        >
          <Languages className="size-3.5" /> {showKey ? "Ẩn dịch & đáp án" : "Dịch & đáp án"}
        </button>
      )}
    </div>
  );
}

/** Small play button in front of one transcript line. */
export function LinePlayButton({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? "Dừng dòng này" : "Nghe dòng này"}
      className={cn(
        "mt-1.5 flex size-6 shrink-0 items-center justify-center rounded-full transition-colors",
        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/15 hover:text-primary"
      )}
    >
      {active ? <Pause className="size-3" /> : <Play className="size-3 translate-x-px" />}
    </button>
  );
}

/** Answer(s), questions (Part 3/4) and the transcript side by side with its
 * Vietnamese translation. */
export function GroupKeyPanel({ data, part }: { data: TranscriptGroupKey; part: number }) {
  const paired = data.vi.length === data.en.length;
  return (
    <div className="mt-4 flex flex-col gap-4 rounded-xl border border-primary/25 bg-primary/[0.04] p-4">
      {part <= 2 ? (
        <p className="flex items-center gap-2 text-sm">
          <CheckCircle2 className="size-4 text-success" /> Đáp án đúng:
          <span className="rounded-md bg-success/15 px-2 py-0.5 font-bold text-success">{data.questions[0]?.answer}</span>
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {data.questions.map((q) => {
            const [qVi, ...optsVi] = q.questionVi ?? [];
            return (
              <div key={q.number} className="rounded-lg bg-card p-3 text-sm shadow-soft">
                <p className="font-medium">{q.question}</p>
                {qVi && <p className="text-xs text-muted-foreground">{qVi}</p>}
                <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                  {(q.options ?? []).map((opt, i) => {
                    const letter = opt.match(/^\(([A-D])\)/)?.[1];
                    const right = letter === q.answer;
                    return (
                      <li key={opt} className={cn("rounded-md px-2 py-1 text-xs", right ? "bg-success/15 font-semibold text-success" : "text-muted-foreground")}>
                        {opt}
                        {optsVi[i] && <span className="block font-normal opacity-80">{optsVi[i].replace(/^\([A-D]\)\s*/, "")}</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      <div>
        <p className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground">TRANSCRIPT & DỊCH NGHĨA</p>
        {paired ? (
          <ul className="flex flex-col gap-2">
            {data.en.map((line, i) => (
              <li key={i} className="text-sm">
                <p>{line}</p>
                <p className="text-xs text-muted-foreground italic">{data.vi[i]}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1 text-sm">
              {data.en.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground italic">
              {data.vi.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
