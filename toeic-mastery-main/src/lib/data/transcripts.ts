import "server-only";
import { db } from "@/lib/db";

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
