import type { Difficulty } from "@/generated/prisma/enums";

/** Độ khó câu luyện theo điểm mục tiêu: 300+ làm câu dễ, 900+ làm câu khó. null = chưa đặt mục tiêu. */
export function difficultyForTarget(targetScore: number | null | undefined): Difficulty | null {
  if (!targetScore) return null;
  if (targetScore < 500) return "EASY";
  if (targetScore < 800) return "MEDIUM";
  return "HARD";
}
