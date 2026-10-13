"use server";

import type { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { getCurrentProfile } from "@/lib/auth";
import { normalizeStudyPreferences, type StudyPreferences } from "@/lib/study-preferences";

/** The signed-in learner's saved study settings, or null when signed out or
 * nothing has been saved yet (the client then keeps its local copy). */
export async function getStudyPreferencesAction(): Promise<StudyPreferences | null> {
  const profile = await getCurrentProfile();
  if (!profile) return null;
  try {
    const row = await db.studyPreference.findUnique({ where: { userId: profile.id } });
    return row ? normalizeStudyPreferences(row.data) : null;
  } catch {
    // Table not migrated yet on this database: behave as "nothing saved".
    return null;
  }
}

export async function saveStudyPreferencesAction(input: unknown): Promise<{ ok: boolean }> {
  const profile = await getCurrentProfile();
  if (!profile) return { ok: false };
  const prefs = normalizeStudyPreferences(input);
  const data: Prisma.InputJsonObject = {
    ratingMode: prefs.ratingMode,
    autoSpeak: prefs.autoSpeak,
    stages: prefs.stages,
    gameSpeak: prefs.gameSpeak,
    gameSfx: prefs.gameSfx,
  };
  try {
    await db.studyPreference.upsert({
      where: { userId: profile.id },
      create: { userId: profile.id, data },
      update: { data },
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
