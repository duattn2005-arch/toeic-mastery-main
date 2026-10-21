import "server-only";
import { db } from "@/lib/db";
import { ETS_2026_LISTENING_KEYS } from "@/lib/content/ets-2026-listening-keys";
import { answerKeyForTest, type SourceTranscript, type TranscriptAnswerKey } from "@/lib/content/transcripts/answer-key";
import type { TranscriptTest } from "@/lib/content/transcripts/types";
import type { SegmentMap } from "@/lib/content/transcripts/segments";

/** testNumber -> part (0 = cả đề, 1–4) -> audio URL, for one transcript set. */
export type TranscriptAudioMap = Record<number, Record<number, string>>;

export async function getTranscriptAudioMap(setKey: string, testNumber?: number): Promise<TranscriptAudioMap> {
  const rows = await db.transcriptAudio.findMany({
    where: { setKey, ...(testNumber !== undefined ? { testNumber } : {}) },
    select: { testNumber: true, part: true, audioUrl: true },
  });
  const map: TranscriptAudioMap = {};
  for (const row of rows) {
    (map[row.testNumber] ??= {})[row.part] = row.audioUrl;
  }
  return map;
}

const answerKeyCache = new Map<string, TranscriptAnswerKey>();

/** Answer key for one blank-transcript test, read off the full ETS 2026
 * Listening transcripts (Test 1–8 have them; other tests get an empty key
 * and stay ungraded). Pure computation over static content, so cached. */
export function getTranscriptAnswerKey(setKey: string, test: TranscriptTest): TranscriptAnswerKey {
  const cacheKey = `${setKey}:${test.number}`;
  const cached = answerKeyCache.get(cacheKey);
  if (cached) return cached;
  const keys = setKey === "ets-2026" ? ETS_2026_LISTENING_KEYS[test.number] : undefined;
  const sources: SourceTranscript[] = [];
  const seen = new Set<string>();
  for (const q of keys ?? []) {
    const id = q.group ?? String(q.number);
    if (seen.has(id) || !q.transcript) continue;
    seen.add(id);
    sources.push({ id, text: q.transcript });
  }
  const key = answerKeyForTest(test, sources);
  answerKeyCache.set(cacheKey, key);
  return key;
}

/** part (1–4) -> saved per-question timings of that Part's own audio file. */
export async function getTranscriptSegments(setKey: string, testNumber: number): Promise<Record<number, SegmentMap>> {
  const rows = await db.transcriptAudio.findMany({
    where: { setKey, testNumber, part: { gt: 0 } },
    select: { part: true, segments: true },
  });
  return Object.fromEntries(rows.flatMap((r) => (r.segments ? [[r.part, r.segments as unknown as SegmentMap]] : [])));
}

/** Answer, bilingual transcript and (Part 3/4) the questions of one
 * transcript group, for the "Dịch & đáp án" panel. */
export interface TranscriptGroupKey {
  questions: { number: number; answer: string; question?: string; options?: string[]; questionVi?: string[] }[];
  en: string[];
  vi: string[];
}

/** Lines under a "Dịch …:" heading of an explanation, e.g. "Dịch nghĩa:". */
function viBlock(explanation: string, heading: RegExp) {
  const block = explanation.split(/\n\s*\n/).find((b) => heading.test(b.trim().split("\n")[0]));
  return block ? block.trim().split("\n").slice(1).map((l) => l.trim()).filter(Boolean) : [];
}

const groupKeyCache = new Map<string, Record<string, TranscriptGroupKey>>();

/** TranscriptGroup.id -> key, from the ETS 2026 Listening keys. Static. */
export function getTranscriptGroupKeys(setKey: string, test: TranscriptTest): Record<string, TranscriptGroupKey> {
  const cacheKey = `${setKey}:${test.number}`;
  const cached = groupKeyCache.get(cacheKey);
  if (cached) return cached;
  const keys = setKey === "ets-2026" ? (ETS_2026_LISTENING_KEYS[test.number] ?? []) : [];
  const out: Record<string, TranscriptGroupKey> = {};
  for (const q of keys) {
    const id = `q${q.group ?? q.number}`;
    const entry = (out[id] ??= {
      questions: [],
      en: q.transcript.split("\n").map((l) => l.trim()).filter(Boolean),
      vi: viBlock(q.explanationVi, /^Dịch (nghĩa|hội thoại|bài nói|đoạn)/i),
    });
    if (q.part >= 3) {
      const [question, ...options] = q.textEn.split(/\s+(?=\([A-D]\))/);
      entry.questions.push({ number: q.number, answer: q.answer, question: question.trim(), options: options.map((o) => o.trim()), questionVi: viBlock(q.explanationVi, /^Dịch câu hỏi/i) });
    } else {
      entry.questions.push({ number: q.number, answer: q.answer });
    }
  }
  groupKeyCache.set(cacheKey, out);
  return out;
}
