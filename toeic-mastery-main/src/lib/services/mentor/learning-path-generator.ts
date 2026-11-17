import "server-only";
import { db } from "@/lib/db";
import { LISTENING_PARTS, TEST_PARTS } from "@/lib/constants/toeic";
import { getWeakestDimensions } from "./skill-mastery";
import { getOutcomeFocus } from "@/lib/bloom/outcome-data";
import { pickGrammarLessonIds } from "./grammar-lesson-picker";
import { MINI_TEST_EVERY_N_DAYS, isMiniTestDay } from "@/lib/constants/learning-path";
import type { TestPart, LearningItemType, LearningDayStatus } from "@/generated/prisma/enums";

// Re-exported so learning-path-replanner.ts keeps deriving the exact same
// day composition from here; the values live in a plain module so the
// journey map (client-safe) groups stages by the very same constant.
export { MINI_TEST_EVERY_N_DAYS, isMiniTestDay };

const DEFAULT_PATH_LENGTH_DAYS = 30;
const MAX_PATH_LENGTH_DAYS = 60;
const MIN_PATH_LENGTH_DAYS = 7;

/** TOEIC grammar is concentrated in these two Parts — a day focused on
 * either becomes a specific GRAMMAR_LESSON item (via buildDayItems' third
 * argument) instead of a generic READING_PRACTICE item. */
const GRAMMAR_FOCUS_PARTS: TestPart[] = ["PART5", "PART6"];

export function needsGrammarLesson(focusParts: TestPart[]): boolean {
  return focusParts.some((p) => GRAMMAR_FOCUS_PARTS.includes(p));
}

function resolvePathLength(examDate: Date | null): number {
  if (!examDate) return DEFAULT_PATH_LENGTH_DAYS;
  const daysUntilExam = Math.ceil((examDate.getTime() - Date.now()) / (24 * 60 * 60 * 1000));
  return Math.min(MAX_PATH_LENGTH_DAYS, Math.max(MIN_PATH_LENGTH_DAYS, daysUntilExam));
}

/** The Parts a new path leads with: those behind unmet learning outcomes
 * (chuẩn đầu ra) first, then the weakest by SkillMastery. Shared with the
 * dashboard's not-yet-started preview so the 5 days it shows are exactly
 * the 5 days "Bắt đầu" then creates. */
export async function getPathWeakParts(userId: string): Promise<TestPart[]> {
  const [weakPartDims, focus] = await Promise.all([getWeakestDimensions(userId, 7, "PART"), getOutcomeFocus(userId)]);
  return [...new Set([...focus.parts, ...weakPartDims.map((d) => d.dimensionKey as TestPart)])];
}

/** One or two focus Parts per day, weakest parts cycled through first and
 * more often. With no weak-part data yet (brand-new learner), this just
 * rotates evenly through all 7 Parts. Deterministic and cursor-based, so
 * the first N days of a longer plan equal a plan of length N. */
export function buildDayFocusPlan(dayCount: number, weakParts: TestPart[]): TestPart[][] {
  const rotation = [...weakParts, ...TEST_PARTS.filter((p) => !weakParts.includes(p))];
  const plan: TestPart[][] = [];
  let cursor = 0;

  for (let day = 1; day <= dayCount; day++) {
    const partCount = isMiniTestDay(day) ? 1 : 2;
    const dayParts = new Set<TestPart>();
    for (let i = 0; i < partCount; i++) {
      dayParts.add(rotation[cursor % rotation.length]);
      cursor += 1;
    }
    plan.push([...dayParts]);
  }
  return plan;
}

/**
 * The LearningPathItem set for one day given its focus Parts — shared by
 * the initial generator and the replanner so a re-planned day ends up with
 * exactly the same item shape a freshly generated one would have.
 * `grammarLessonId` (from pickGrammarLessonIds, called by the caller before
 * this) replaces the first PART5/PART6 practice item with a specific
 * GRAMMAR_LESSON pointing at that lesson — null falls back to plain
 * READING_PRACTICE for that Part (no lesson could be picked, or the day
 * genuinely has none of PART5/PART6 in its focus).
 */
export function buildDayItems(
  focusParts: TestPart[],
  includeMiniTest: boolean,
  grammarLessonId: string | null = null
): { itemType: LearningItemType; orderIndex: number; refId?: string }[] {
  const items: { itemType: LearningItemType; orderIndex: number; refId?: string }[] = [];
  let remainingGrammarLessonId = grammarLessonId;

  focusParts.forEach((part, i) => {
    if (remainingGrammarLessonId && GRAMMAR_FOCUS_PARTS.includes(part)) {
      items.push({ itemType: "GRAMMAR_LESSON", orderIndex: i, refId: remainingGrammarLessonId });
      remainingGrammarLessonId = null; // attach to only the first qualifying Part in the day
      return;
    }
    items.push({
      itemType: (LISTENING_PARTS as string[]).includes(part) ? "LISTENING_PRACTICE" : "READING_PRACTICE",
      orderIndex: i,
    });
  });

  items.push({ itemType: "VOCAB_REVIEW", orderIndex: items.length });
  if (includeMiniTest) items.push({ itemType: "MINI_TEST", orderIndex: items.length });

  return items;
}

/**
 * (Re)generates a learner's personalized day-by-day curriculum. Abandons
 * any existing ACTIVE path first — a learner only ever has one ACTIVE path,
 * regenerating (new target score, retaken placement test) supersedes the
 * old one rather than running two in parallel.
 */
export async function generateLearningPath(params: { userId: string; targetScore: number; examDate: Date | null }): Promise<{ pathId: string; dayCount: number }> {
  await db.learningPath.updateMany({
    where: { userId: params.userId, status: "ACTIVE" },
    data: { status: "ABANDONED" },
  });

  const [weakParts, weakGrammarDims, focus] = await Promise.all([
    getPathWeakParts(params.userId),
    getWeakestDimensions(params.userId, 5, "GRAMMAR_TOPIC"),
    getOutcomeFocus(params.userId),
  ]);
  const weakGrammarTopicSlugs = weakGrammarDims.map((d) => d.dimensionKey);

  const dayCount = resolvePathLength(params.examDate);
  const focusPlan = buildDayFocusPlan(dayCount, weakParts);
  const today = new Date();

  const grammarDayCount = focusPlan.filter(needsGrammarLesson).length;
  const grammarLessonIds = await pickGrammarLessonIds({ count: grammarDayCount, weakTopicSlugs: weakGrammarTopicSlugs, excludeIds: [] });
  let grammarCursor = 0;

  const rationale =
    weakParts.length > 0
      ? `${focus.codes.length ? `Bám chuẩn đầu ra chưa đạt (${focus.codes.join(", ")}): ` : ""}Ưu tiên ${weakParts.length} phần đang yếu nhất trước, xen kẽ các phần còn lại; mỗi chặng ${MINI_TEST_EVERY_N_DAYS} bước khép lại bằng một bài kiểm tra nhanh để xác nhận đã hiểu trước khi mở phần khó hơn. Học theo nhịp của bạn — xong bước nào mở bước đó.`
      : "Chưa có đủ dữ liệu về điểm yếu — lộ trình khởi đầu xoay vòng đều cả 7 Part, sẽ tự điều chỉnh sau khi có kết quả luyện tập đầu tiên.";

  const path = await db.learningPath.create({
    data: {
      userId: params.userId,
      targetScore: params.targetScore,
      examDate: params.examDate,
      rationale,
      days: {
        create: focusPlan.map((focusParts, index) => {
          const dayNumber = index + 1;
          const scheduledDate = new Date(today);
          scheduledDate.setDate(scheduledDate.getDate() + index);
          const status: LearningDayStatus = dayNumber === 1 ? "UNLOCKED" : "LOCKED";
          const grammarLessonId = needsGrammarLesson(focusParts) ? (grammarLessonIds[grammarCursor++] ?? null) : null;

          return {
            dayNumber,
            scheduledDate,
            focusParts,
            status,
            items: { create: buildDayItems(focusParts, isMiniTestDay(dayNumber), grammarLessonId) },
          };
        }),
      },
    },
    select: { id: true },
  });

  return { pathId: path.id, dayCount };
}
