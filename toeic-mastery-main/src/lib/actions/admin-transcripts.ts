"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
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
      update: { audioUrl: url },
    });
  } else {
    await db.transcriptAudio.deleteMany({ where: { setKey, testNumber, part } });
  }

  revalidatePath("/admin/transcripts");
  revalidatePath(`/listening/transcripts/${setKey}`, "layout");
  return {};
}
