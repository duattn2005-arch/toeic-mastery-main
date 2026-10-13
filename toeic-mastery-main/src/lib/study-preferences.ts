import { z } from "zod";

/** How a learner grades themselves on a flashcard:
 * - "four": Học lại / Khó / Nhớ / Rất dễ (SM-2's four ratings)
 * - "two": Học lại / Đã biết, sorted with the arrow keys (Quizlet-style) */
export type RatingMode = "four" | "two";

/** Stages of the study flow (see StudyFlow's FLOW_STEPS). */
export const STUDY_STAGES = ["flashcard", "match", "blast", "balloon", "quiz"] as const;
export type StudyStage = (typeof STUDY_STAGES)[number];

export interface StudyPreferences {
  ratingMode: RatingMode;
  /** Read the word aloud on every new card and every flip. */
  autoSpeak: boolean;
  /** Stages the learner wants in the study flow; never empty. */
  stages: StudyStage[];
}

export const DEFAULT_STUDY_PREFERENCES: StudyPreferences = {
  ratingMode: "four",
  autoSpeak: true,
  stages: [...STUDY_STAGES],
};

const schema = z.object({
  ratingMode: z.enum(["four", "two"]).catch(DEFAULT_STUDY_PREFERENCES.ratingMode),
  autoSpeak: z.boolean().catch(DEFAULT_STUDY_PREFERENCES.autoSpeak),
  stages: z
    .array(z.enum(STUDY_STAGES))
    .catch(DEFAULT_STUDY_PREFERENCES.stages)
    .transform((s) => {
      const unique = STUDY_STAGES.filter((stage) => s.includes(stage));
      return unique.length > 0 ? unique : [...DEFAULT_STUDY_PREFERENCES.stages];
    }),
});

/** Coerces anything (stored JSON, localStorage, client input) into valid
 * preferences, falling back to defaults field by field. */
export function normalizeStudyPreferences(value: unknown): StudyPreferences {
  const parsed = schema.safeParse(value ?? {});
  return parsed.success ? parsed.data : { ...DEFAULT_STUDY_PREFERENCES, stages: [...DEFAULT_STUDY_PREFERENCES.stages] };
}
