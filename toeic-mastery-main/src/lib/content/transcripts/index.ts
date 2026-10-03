import { ETS_2026_TRANSCRIPT_TESTS } from "./ets-2026-data";
import type { TranscriptSet } from "./types";

export const ETS_2026_TRANSCRIPTS: TranscriptSet = {
  key: "ets-2026",
  title: "Transcript ETS 2026",
  author: "Mr. Mạnh Huy",
  description: "Nghe điền từ 10 đề ETS 2026 — Part 1 đến Part 4. Nghe file audio và điền từ còn thiếu vào mỗi chỗ trống.",
  tests: ETS_2026_TRANSCRIPT_TESTS,
};

export const TRANSCRIPT_SETS = [ETS_2026_TRANSCRIPTS];

/** Audio slots per test: 0 = cả đề, 1–4 = từng Part. */
export const TRANSCRIPT_AUDIO_PARTS = [0, 1, 2, 3, 4] as const;

export function getTranscriptSet(key: string) {
  return TRANSCRIPT_SETS.find((s) => s.key === key) ?? null;
}

export function getTranscriptTest(set: TranscriptSet, testNumber: number) {
  return set.tests.find((t) => t.number === testNumber) ?? null;
}
