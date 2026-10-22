"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { runInBackground } from "@/lib/services/seo/background";
import { runQuestionTagging, taggingState } from "@/lib/services/tagging/run";

/** Admin → Nhãn & chưng cất: relabel the whole bank now, in the background
 * (a large bank can outlast the proxy timeout). */
export async function runTaggingNowAction(): Promise<{ started: boolean }> {
  await requireAdmin();
  const started = runInBackground("tagging", () => runQuestionTagging({ trigger: "admin" }));
  revalidatePath("/admin/questions/labels");
  return { started };
}

/** Polled by the admin page while a run is in progress. */
export async function getTaggingProgressAction() {
  await requireAdmin();
  return { running: taggingState.running, scanned: taggingState.scanned, total: taggingState.total, last: taggingState.last };
}
