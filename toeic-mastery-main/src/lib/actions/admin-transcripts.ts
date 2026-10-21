"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { Prisma } from "@/generated/prisma/client";
import { sanitizeSegments } from "@/lib/content/transcripts/segments";
import { requireAdmin } from "@/lib/auth";
import { TRANSCRIPT_AUDIO_PARTS, getTranscriptSet, getTranscriptTest } from "@/lib/content/transcripts";

export interface ActionResult {
  error?: string;
}

/** Sets (or, with an empty URL, removes) the audio for one test — part 0 is
 * the whole-test file, 1–4 a single Part. */
export async function setTranscriptAudioAction(setKey: string, testNumber: number, part: number, audioUrl: string): Promise<ActionResult> {
  await requireAdmin();
  const set = getTranscriptSet(setKey);
  if (!set || !getTranscriptTest(set, testNumber)) return { error: "Không tìm thấy đề" };
  if (!(TRANSCRIPT_AUDIO_PARTS as readonly number[]).includes(part)) return { error: "Part không hợp lệ" };

  const url = audioUrl.trim();
  if (url) {
    await db.transcriptAudio.upsert({
      where: { setKey_testNumber_part: { setKey, testNumber, part } },
      create: { setKey, testNumber, part, audioUrl: url },
      // A new file has different timings — the old ones no longer apply.
      update: { audioUrl: url, segments: Prisma.DbNull },
    });
  } else {
    await db.transcriptAudio.deleteMany({ where: { setKey, testNumber, part } });
  }

  revalidatePath("/admin/transcripts");
  revalidatePath(`/listening/transcripts/${setKey}`, "layout");
  return {};
}

/** Saves (or, with null, clears) the per-question timings of one Part's
 * audio file — see src/lib/content/transcripts/segments.ts. */
export async function setTranscriptSegmentsAction(setKey: string, testNumber: number, part: number, segments: unknown): Promise<ActionResult> {
  await requireAdmin();
  const set = getTranscriptSet(setKey);
  const test = set && getTranscriptTest(set, testNumber);
  const partData = test?.parts.find((p) => p.part === part);
  if (!set || !test || !partData) return { error: "Không tìm thấy Part" };

  const clean = segments === null ? null : sanitizeSegments(segments, partData.groups.map((g) => g.id));
  if (segments !== null && !clean) return { error: "Chưa có mốc thời gian hợp lệ nào" };
  const updated = await db.transcriptAudio.updateMany({
    where: { setKey, testNumber, part },
    data: { segments: clean ? (clean as unknown as Prisma.InputJsonValue) : Prisma.DbNull },
  });
  if (updated.count === 0) return { error: "Part này chưa có file nghe" };

  revalidatePath("/admin/transcripts");
  revalidatePath(`/listening/transcripts/${setKey}`, "layout");
  return {};
}
