import type { Difficulty } from "@/generated/prisma/enums";
import type { Prisma } from "@/generated/prisma/client";

/** Độ khó câu luyện theo điểm mục tiêu: 300+ làm câu dễ, 900+ làm câu khó. null = chưa đặt mục tiêu. */
export function difficultyForTarget(targetScore: number | null | undefined): Difficulty | null {
  if (!targetScore) return null;
  if (targetScore < 500) return "EASY";
  if (targetScore < 800) return "MEDIUM";
  return "HARD";
}

/**
 * Câu thuộc một mức. Ngân hàng gần như toàn nhãn MEDIUM, nên MEDIUM được tách
 * tiếp theo bậc Bloom: ≤2 tính là dễ, 3 trung bình, ≥4 khó.
 */
export function tierWhere(tier: Difficulty): Prisma.QuestionWhereInput {
  if (tier === "EASY") return { OR: [{ difficulty: "EASY" }, { difficulty: "MEDIUM", bloomLevel: { lte: 2 } }] };
  if (tier === "HARD") return { OR: [{ difficulty: "HARD" }, { difficulty: "MEDIUM", bloomLevel: { gte: 4 } }] };
  return { difficulty: "MEDIUM", OR: [{ bloomLevel: 3 }, { bloomLevel: null }] };
}

/** Thứ tự thử khi mức mong muốn hết câu: mức đó → mức gần nhất → mức còn lại. */
export const TIER_FALLBACK: Record<Difficulty, Difficulty[]> = {
  EASY: ["EASY", "MEDIUM", "HARD"],
  MEDIUM: ["MEDIUM", "EASY", "HARD"],
  HARD: ["HARD", "MEDIUM", "EASY"],
};
