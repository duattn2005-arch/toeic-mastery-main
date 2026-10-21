"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Crosshair, Loader2, Play, Save, Scissors, Square, Trash2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { setTranscriptSegmentsAction } from "@/lib/actions/admin-transcripts";
import { detectSegmentsFromUrl, formatTime, parseTime, type SegmentMap } from "@/lib/content/transcripts/segments";

interface Row {
  id: string;
  title: string;
  lines: number;
  start: string;
  end: string;
  lineStarts?: number[];
}

function toRows(groups: { id: string; title: string; lines: number }[], segments: SegmentMap | null): Row[] {
  return groups.map((g) => {
    const s = segments?.[g.id];
    return { ...g, start: s ? formatTime(s.start) : "", end: s ? formatTime(s.end) : "", lineStarts: s?.lines };
  });
}

/** Marks where each question (Part 1/2) or conversation/talk (Part 3/4)
 * sits in a Part's audio, so learners can replay one question at a time.
 * "Tự động chia" finds them from the pauses (segments.ts); each row can
 * then be previewed, nudged, or set from the player's current position. */
export function TranscriptSegmentEditor({
  setKey,
  testNumber,
  part,
  audioUrl,
  groups,
  initialSegments,
}: {
  setKey: string;
  testNumber: number;
  part: number;
  audioUrl: string;
  groups: { id: string; title: string; lines: number }[];
  initialSegments: SegmentMap | null;
}) {
  const router = useRouter();
  const [rows, setRows] = React.useState(() => toRows(groups, initialSegments));
  const [detecting, setDetecting] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [playingId, setPlayingId] = React.useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const stopAtRef = React.useRef<number | null>(null);

  const done = rows.filter((r) => parseTime(r.start) !== null && parseTime(r.end) !== null).length;

  React.useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = audioRef.current;
      if (el && stopAtRef.current !== null && el.currentTime >= stopAtRef.current) {
        el.pause();
        stopAtRef.current = null;
        setPlayingId(null);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function update(id: string, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch, lineStarts: "start" in patch || "end" in patch ? undefined : r.lineStarts } : r)));
  }

  function nudge(row: Row, field: "start" | "end", delta: number) {
    const t = parseTime(row[field]);
    if (t === null) return;
    update(row.id, { [field]: formatTime(Math.max(0, t + delta)) });
  }

  function setFromPlayer(row: Row, field: "start" | "end") {
    const el = audioRef.current;
    if (el) update(row.id, { [field]: formatTime(el.currentTime) });
  }

  function preview(row: Row) {
    const el = audioRef.current;
    const start = parseTime(row.start);
    const end = parseTime(row.end);
    if (!el || start === null || end === null) return;
    if (playingId === row.id) {
      el.pause();
      stopAtRef.current = null;
      setPlayingId(null);
      return;
    }
    el.currentTime = start;
    stopAtRef.current = end;
    setPlayingId(row.id);
    void el.play();
  }

  async function autoDetect() {
    setDetecting(true);
    try {
      const found = await detectSegmentsFromUrl(audioUrl, part, groups.map((g) => ({ id: g.id, lines: g.lines })));
      if (!found) {
        toast.error("Không tự nhận ra được các câu trong file này — hãy đặt mốc bằng tay.");
        return;
      }
      setRows(toRows(groups, found));
      toast.success("Đã chia tự động — nghe thử vài câu rồi bấm Lưu.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không phân tích được file nghe");
    } finally {
      setDetecting(false);
    }
  }

  async function save(clear = false) {
    const segments: SegmentMap = {};
    if (!clear) {
      for (const r of rows) {
        const start = parseTime(r.start);
        const end = parseTime(r.end);
        if (start === null || end === null) continue;
        if (end <= start) {
          toast.error(`${r.title}: thời điểm kết thúc phải sau bắt đầu`);
          return;
        }
        segments[r.id] = { start, end, ...(r.lineStarts ? { lines: r.lineStarts } : {}) };
      }
    }
    setSaving(true);
    const result = await setTranscriptSegmentsAction(setKey, testNumber, part, clear ? null : segments);
    setSaving(false);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    if (clear) setRows(toRows(groups, null));
    toast.success(clear ? "Đã xóa mốc chia câu" : `Đã lưu mốc ${Object.keys(segments).length} câu`);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border bg-muted/30 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-xs font-semibold">
          <Scissors className="size-3.5" /> Chia câu Part {part}
          <span className="font-normal text-muted-foreground">
            · {done}/{rows.length} câu có mốc
          </span>
        </p>
        <div className="flex gap-1.5">
          <Button type="button" size="sm" variant="outline" onClick={autoDetect} disabled={detecting}>
            {detecting ? <Loader2 className="size-3.5 animate-spin" /> : <Wand2 className="size-3.5" />}
            {detecting ? "Đang phân tích…" : "Tự động chia"}
          </Button>
          <Button type="button" size="sm" onClick={() => save()} disabled={saving || done === 0}>
            {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />} Lưu
          </Button>
          {initialSegments && (
            <Button type="button" size="sm" variant="ghost" onClick={() => save(true)} disabled={saving} aria-label="Xóa mốc" className="text-destructive">
              <Trash2 className="size-3.5" />
            </Button>
          )}
        </div>
      </div>

      <audio ref={audioRef} controls preload="metadata" src={audioUrl} className="h-9 w-full" onPause={() => setPlayingId(null)} />
      <p className="text-[11px] text-muted-foreground">
        Mỗi dòng: thời điểm bắt đầu và kết thúc của câu (phút:giây). Bấm <Crosshair className="inline size-3" /> để lấy vị trí đang phát của trình nghe ở trên, ±
        để chỉnh 0,5 giây.
        {part >= 3 ? " Part 3/4: chỉ cần đoạn hội thoại/bài nói, không cần phần đọc câu hỏi." : ""}
      </p>

      <div className="max-h-96 overflow-y-auto rounded-lg border border-border bg-card">
        {rows.map((r) => {
          const ready = parseTime(r.start) !== null && parseTime(r.end) !== null;
          return (
            <div key={r.id} className="flex flex-wrap items-center gap-2 border-b border-border px-2.5 py-1.5 text-xs last:border-b-0">
              <button
                type="button"
                onClick={() => preview(r)}
                disabled={!ready}
                aria-label={`Nghe thử ${r.title}`}
                className={cn("flex size-7 shrink-0 items-center justify-center rounded-full", ready ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}
              >
                {playingId === r.id ? <Square className="size-3" /> : <Play className="size-3 translate-x-px" />}
              </button>
              <span className="w-20 shrink-0 font-medium">
                {r.title}
                {r.lineStarts && <span className="block text-[10px] font-normal text-success">+ mốc từng dòng</span>}
              </span>
              {(["start", "end"] as const).map((field) => (
                <span key={field} className="flex items-center gap-0.5">
                  <span className="w-7 text-muted-foreground">{field === "start" ? "Từ" : "Đến"}</span>
                  <button type="button" onClick={() => nudge(r, field, -0.5)} className="rounded px-1 text-muted-foreground hover:bg-muted">
                    −
                  </button>
                  <input
                    value={r[field]}
                    onChange={(e) => update(r.id, { [field]: e.target.value })}
                    placeholder="0:00.0"
                    className={cn("w-16 rounded border bg-background px-1 py-0.5 text-center tabular-nums", r[field] && parseTime(r[field]) === null ? "border-destructive" : "border-input")}
                  />
                  <button type="button" onClick={() => nudge(r, field, 0.5)} className="rounded px-1 text-muted-foreground hover:bg-muted">
                    +
                  </button>
                  <button type="button" onClick={() => setFromPlayer(r, field)} title="Lấy vị trí đang phát" className="rounded p-1 text-muted-foreground hover:bg-muted">
                    <Crosshair className="size-3" />
                  </button>
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
