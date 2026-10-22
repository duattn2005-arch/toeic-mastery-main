import { z } from "zod";

/** How a learner grades themselves on a flashcard:
 * - "four": Học lại / Khó / Nhớ / Rất dễ (SM-2's four ratings)
 * - "two": Học lại / Đã biết, sorted with the arrow keys (Quizlet-style) */
export type RatingMode = "four" | "two";

/** Stages of the study flow (see StudyFlow's FLOW_STEPS). */
export const STUDY_STAGES = ["flashcard", "match", "blast", "balloon", "mole", "miner", "quiz"] as const;
export type StudyStage = (typeof STUDY_STAGES)[number];

export interface StudyPreferences {
  ratingMode: RatingMode;
  /** Read the word aloud on every new card and every flip. */
  autoSpeak: boolean;
  /** Stages the learner wants in the study flow; never empty. */
  stages: StudyStage[];
  /** Games and quiz: read the English word aloud on a right answer. */
  gameSpeak: boolean;
  /** Games and quiz: short buzz on a wrong answer. */
  gameSfx: boolean;
  /** Bumped when new stages ship, so saved stage lists pick them up on. */
  stagesVersion: number;
}

/** Stages added after a version, switched on for learners whose saved
 * stage list predates them (they never got to choose them). */
const STAGES_ADDED: Record<number, StudyStage[]> = { 2: ["mole", "miner"] };
const CURRENT_STAGES_VERSION = 2;

export const DEFAULT_STUDY_PREFERENCES: StudyPreferences = {
  ratingMode: "four",
  autoSpeak: true,
  stages: [...STUDY_STAGES],
  gameSpeak: true,
  gameSfx: true,
  stagesVersion: CURRENT_STAGES_VERSION,
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
  gameSpeak: z.boolean().catch(DEFAULT_STUDY_PREFERENCES.gameSpeak),
  gameSfx: z.boolean().catch(DEFAULT_STUDY_PREFERENCES.gameSfx),
  stagesVersion: z.number().int().catch(1),
});

/** Coerces anything (stored JSON, localStorage, client input) into valid
 * preferences, falling back to defaults field by field. */
export function normalizeStudyPreferences(value: unknown): StudyPreferences {
  const hasSaved = value !== null && typeof value === "object" && "stages" in value;
  const parsed = schema.safeParse(value ?? {});
  if (!parsed.success) return { ...DEFAULT_STUDY_PREFERENCES, stages: [...DEFAULT_STUDY_PREFERENCES.stages] };
  const prefs = parsed.data;
  if (!hasSaved) return { ...prefs, stagesVersion: CURRENT_STAGES_VERSION };
  // Switch on stages that shipped after this saved list was made.
  const added = Object.entries(STAGES_ADDED)
    .filter(([version]) => Number(version) > prefs.stagesVersion)
    .flatMap(([, stages]) => stages);
  const stages = STUDY_STAGES.filter((s) => prefs.stages.includes(s) || added.includes(s));
  return { ...prefs, stages, stagesVersion: CURRENT_STAGES_VERSION };
}
