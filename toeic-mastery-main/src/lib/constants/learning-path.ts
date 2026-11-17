/** Every Nth day of a LearningPath is a checkpoint mini-test instead of a
 * second practice item — matches the "vượt qua test mới mở khóa phần khó
 * hơn" requirement without a checkpoint on literally every single day.
 *
 * Also what the journey map groups days by: each "chặng" is exactly one
 * run of N days ending on that checkpoint (the "rương ôn tập"), so the map
 * and the generator can never disagree about where a stage ends.
 *
 * Plain module (no DB, no "server-only") so client components and tests
 * can import it too. */
export const MINI_TEST_EVERY_N_DAYS = 5;

export function isMiniTestDay(dayNumber: number): boolean {
  return dayNumber % MINI_TEST_EVERY_N_DAYS === 0;
}
