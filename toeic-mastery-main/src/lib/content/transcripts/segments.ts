/** Where one TranscriptGroup sits inside its Part's audio file, in seconds.
 * `lines` (Part 1/2 only) is the start of each transcript line, in order. */
export interface GroupSegment {
  start: number;
  end: number;
  lines?: number[];
}

/** TranscriptGroup.id -> segment. */
export type SegmentMap = Record<string, GroupSegment>;

export interface SegmentGroupInfo {
  id: string;
  /** Number of transcript lines in the group. */
  lines: number;
}

/** Sample rate audio is decoded at for analysis — speech pauses don't need
 * more, and it keeps a 20-minute Part to ~40MB of memory on a phone. */
export const ANALYSIS_SAMPLE_RATE = 8000;
const FRAME_SEC = 0.02;

/** Frame loudness in dBFS. */
function envelope(samples: Float32Array, sampleRate: number): Float32Array {
  const frame = Math.max(1, Math.round(sampleRate * FRAME_SEC));
  const out = new Float32Array(Math.floor(samples.length / frame));
  for (let f = 0; f < out.length; f++) {
    let sum = 0;
    for (let i = f * frame, end = i + frame; i < end; i++) sum += samples[i] * samples[i];
    out[f] = 10 * Math.log10(sum / frame + 1e-10);
  }
  return out;
}

function percentile(values: Float32Array, p: number) {
  const sorted = Float32Array.from(values).sort();
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))];
}

type Run = { start: number; end: number }; // frames, end exclusive

/** Stretches of speech separated by at least `minGapSec` of silence; runs
 * shorter than a quarter second (clicks, breaths) are dropped. */
function speechRuns(silent: Uint8Array, minGapSec: number, from = 0, to = silent.length): Run[] {
  const minGap = Math.round(minGapSec / FRAME_SEC);
  const runs: Run[] = [];
  let runStart = -1;
  let lastSpeech = -1;
  for (let f = from; f < to; f++) {
    if (silent[f]) continue;
    if (runStart < 0) runStart = f;
    else if (f - lastSpeech - 1 >= minGap) {
      runs.push({ start: runStart, end: lastSpeech + 1 });
      runStart = f;
    }
    lastSpeech = f;
  }
  if (runStart >= 0) runs.push({ start: runStart, end: lastSpeech + 1 });
  return runs.filter((r) => (r.end - r.start) * FRAME_SEC >= 0.25);
}

const dur = (r: Run) => (r.end - r.start) * FRAME_SEC;

/** Line starts inside a Part 1/2 question: the `lineCount` widest pauses
 * split it into an intro ("Number seven.") plus one piece per line. Only
 * returned when every piece looks like a spoken line. */
function lineStarts(silent: Uint8Array, run: Run, lineCount: number): number[] | undefined {
  const gaps: Run[] = [];
  let gapStart = -1;
  for (let f = run.start; f < run.end; f++) {
    if (silent[f]) {
      if (gapStart < 0) gapStart = f;
    } else if (gapStart >= 0) {
      if ((f - gapStart) * FRAME_SEC >= 0.25) gaps.push({ start: gapStart, end: f });
      gapStart = -1;
    }
  }
  if (gaps.length < lineCount) return undefined;
  const chosen = [...gaps].sort((a, b) => dur(b) - dur(a)).slice(0, lineCount).sort((a, b) => a.start - b.start);
  const starts = chosen.map((g) => g.end);
  const bounds = [...starts, run.end];
  for (let i = 0; i < lineCount; i++) {
    const len = (bounds[i + 1] - bounds[i]) * FRAME_SEC;
    if (len < 0.7 || len > 9) return undefined;
  }
  return starts.map((f) => Math.max(0, f * FRAME_SEC - 0.15));
}

/**
 * Finds every group of a Part in that Part's audio by its pauses: ETS
 * leaves ~5 s after each Part 1/2 question and ~8 s after each spoken Part
 * 3/4 question, while speech inside a question or conversation never pauses
 * that long. So the audio splits into one speech run per Part 1/2 question,
 * and four per Part 3/4 group (the conversation/talk, then its three
 * questions read aloud). Directions at the start of the Part are extra runs
 * and are skipped by counting from the end. Several pause lengths are tried
 * and the one whose runs look most like the expected pattern wins. Returns
 * null when nothing fits — the admin can then mark the times by hand.
 */
export function detectSegments(samples: Float32Array, sampleRate: number, part: number, groups: SegmentGroupInfo[]): SegmentMap | null {
  if (groups.length === 0 || samples.length === 0) return null;
  const db = envelope(samples, sampleRate);
  const floor = percentile(db, 0.1);
  const loud = percentile(db, 0.9);
  const threshold = floor + (loud - floor) * 0.3;
  const silent = new Uint8Array(db.length);
  for (let f = 0; f < db.length; f++) silent[f] = db[f] < threshold ? 1 : 0;

  const perGroup = part >= 3 ? 4 : 1;
  const need = groups.length * perGroup;
  let best: { runs: Run[]; score: number } | null = null;

  for (const gap of [1.6, 2, 2.4, 2.8, 3.2, 3.8, 4.5]) {
    const all = speechRuns(silent, gap);
    if (all.length < need) continue;
    const runs = all.slice(all.length - need);
    let ok = 0;
    for (let g = 0; g < groups.length; g++) {
      if (perGroup === 1) {
        const d = dur(runs[g]);
        if (d >= 2.5 && d <= 40) ok++;
      } else {
        const talk = dur(runs[g * 4]);
        const questions = [1, 2, 3].map((q) => dur(runs[g * 4 + q]));
        if (talk >= 12 && questions.every((q) => q <= 12 && q * 1.8 < talk)) ok++;
      }
    }
    const ratio = ok / groups.length;
    const score = ratio * 10 - (all.length - need) * 0.05;
    if (ratio >= 0.8 && (!best || score > best.score)) best = { runs, score };
  }

  if (!best) return null;
  const out: SegmentMap = {};
  const totalSec = db.length * FRAME_SEC;
  groups.forEach((group, g) => {
    const run = best!.runs[g * perGroup];
    const segment: GroupSegment = {
      start: +Math.max(0, run.start * FRAME_SEC - 0.3).toFixed(2),
      end: +Math.min(totalSec, run.end * FRAME_SEC + 0.35).toFixed(2),
    };
    if (perGroup === 1) {
      const lines = lineStarts(silent, run, group.lines);
      if (lines) segment.lines = lines.map((t) => +t.toFixed(2));
    }
    out[group.id] = segment;
  });
  return out;
}

/** Decodes an audio file at the analysis rate and runs detectSegments. */
export async function detectSegmentsFromUrl(url: string, part: number, groups: SegmentGroupInfo[]): Promise<SegmentMap | null> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Không tải được file nghe (${res.status})`);
  const data = await res.arrayBuffer();
  // An OfflineAudioContext decodes straight to its own (low) sample rate.
  const ctx = new OfflineAudioContext(1, 1, ANALYSIS_SAMPLE_RATE);
  const buffer = await ctx.decodeAudioData(data);
  const channels = Array.from({ length: buffer.numberOfChannels }, (_, c) => buffer.getChannelData(c));
  const mono = channels.length === 1 ? channels[0] : channels[0].map((v, i) => (v + channels[1][i]) / 2);
  return detectSegments(mono, buffer.sampleRate, part, groups);
}

/** Validates a SegmentMap coming from the client before it is stored. */
export function sanitizeSegments(input: unknown, groupIds: string[]): SegmentMap | null {
  if (!input || typeof input !== "object") return null;
  const out: SegmentMap = {};
  const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v >= 0 && v < 6 * 3600 ? +v.toFixed(2) : null);
  for (const id of groupIds) {
    const raw = (input as Record<string, unknown>)[id] as Record<string, unknown> | undefined;
    if (!raw) continue;
    const start = num(raw.start);
    const end = num(raw.end);
    if (start === null || end === null || end <= start) continue;
    const segment: GroupSegment = { start, end };
    if (Array.isArray(raw.lines)) {
      const lines = raw.lines.map(num);
      if (lines.every((l): l is number => l !== null && l >= start - 1 && l <= end)) segment.lines = lines;
    }
    out[id] = segment;
  }
  return Object.keys(out).length ? out : null;
}

/** "m:ss.s" for display and editing. */
export function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds - m * 60;
  return `${m}:${s.toFixed(1).padStart(4, "0")}`;
}

/** Parses "m:ss.s", "ss.s" or "h:mm:ss" back to seconds (null if invalid). */
export function parseTime(text: string): number | null {
  const parts = text.trim().split(":").map(Number);
  if (parts.length === 0 || parts.length > 3 || parts.some((p) => !Number.isFinite(p) || p < 0)) return null;
  return parts.reduce((acc, p) => acc * 60 + p, 0);
}
