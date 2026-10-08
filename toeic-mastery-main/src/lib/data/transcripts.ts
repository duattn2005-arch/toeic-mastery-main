import "server-only";
import { db } from "@/lib/db";
import { ETS_2026_LISTENING_KEYS } from "@/lib/content/ets-2026-listening-keys";
import { answerKeyForTest, type SourceTranscript, type TranscriptAnswerKey } from "@/lib/content/transcripts/answer-key";
import type { TranscriptTest } from "@/lib/content/transcripts/types";

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
