/**
 * THANG ĐÁNH GIÁ (RUBRIC) 5 MỨC — chuẩn hóa kết quả của một chuẩn đầu ra
 * hoặc một chỉ báo theo hướng dẫn xây dựng rubric (mục E):
 *   (1) Không đáp ứng · (2) Đáp ứng tối thiểu · (3) Đáp ứng vừa phải ·
 *   (4) Đáp ứng mức mong đợi · (5) Vượt quá mức mong đợi.
 *
 * Mốc điểm khớp với hai ngưỡng Mastery Learning của config.ts: dưới
 * WEAK_THRESHOLD là mức 1 (= ô Đỏ), từ MASTERY_THRESHOLD là mức 4 trở lên
 * (= ô Xanh) — nên rubric không mâu thuẫn với heatmap Đỏ/Vàng/Xanh, chỉ
 * chia mịn hơn. Sự tiến bộ được đo bằng việc chuyển mức 2 → 3 → 4.
 */
import { MASTERY_THRESHOLD, WEAK_THRESHOLD } from "./config";

export type RubricLevel = 1 | 2 | 3 | 4 | 5;

export interface RubricLevelInfo {
  level: RubricLevel;
  nameVi: string;
  nameEn: string;
  /** Điểm năng lực (0–1) tối thiểu để đạt mức này. */
  minScore: number;
  description: string;
}

/** Mốc giữa mức 2 và 3, giữa mức 4 và 5 (nhóm có thể chỉnh). */
export const RUBRIC_DEVELOPING_THRESHOLD = 0.65;
export const RUBRIC_EXCEEDS_THRESHOLD = 0.9;

export const RUBRIC_LEVELS: readonly RubricLevelInfo[] = [
  { level: 1, nameVi: "Không đáp ứng", nameEn: "Does not meet", minScore: 0, description: "Chưa thể hiện được hành vi của chuẩn đầu ra; cần học lại từ nền." },
  { level: 2, nameVi: "Đáp ứng tối thiểu", nameEn: "Needs improvement", minScore: WEAK_THRESHOLD, description: "Thể hiện được một phần, còn sai nhiều — cần cải thiện nhiều." },
  { level: 3, nameVi: "Đáp ứng vừa phải", nameEn: "Developing", minScore: RUBRIC_DEVELOPING_THRESHOLD, description: "Thể hiện được phần lớn, còn sai sót nhỏ — cần cải thiện nhỏ." },
  { level: 4, nameVi: "Đáp ứng mức mong đợi", nameEn: "Meets expectations", minScore: MASTERY_THRESHOLD, description: "Đạt chuẩn đầu ra (ngưỡng vững của Mastery Learning)." },
  { level: 5, nameVi: "Vượt mức mong đợi", nameEn: "Exceeds expectations", minScore: RUBRIC_EXCEEDS_THRESHOLD, description: "Đạt chắc chắn, gần như không sai — sẵn sàng cho bậc cao hơn." },
];

export const RUBRIC_BY_LEVEL = new Map(RUBRIC_LEVELS.map((r) => [r.level, r]));

/** Mức rubric để coi một chỉ báo / chuẩn đầu ra là ĐẠT. */
export const RUBRIC_PASS_LEVEL: RubricLevel = 4;

export function rubricLevelOf(score: number): RubricLevel {
  let out: RubricLevel = 1;
  for (const r of RUBRIC_LEVELS) if (score >= r.minScore) out = r.level;
  return out;
}

/**
 * Rubric cho một thang có bậc (miền kỹ năng Dave, miền thái độ Krathwohl):
 * so bậc đã đạt với bậc chuẩn đầu ra yêu cầu.
 */
export function rubricFromLadder(reached: number, target: number): RubricLevel {
  if (reached > target) return 5;
  if (reached === target) return 4;
  if (reached === target - 1) return 3;
  if (reached >= 1) return 2;
  return 1;
}

/** Hướng thay đổi so với lần đo trước (null = không có dữ liệu trước). */
export type RubricTrend = "up" | "down" | "same" | null;

export function rubricTrend(now: RubricLevel | null, before: RubricLevel | null): RubricTrend {
  if (now === null || before === null) return null;
  return now > before ? "up" : now < before ? "down" : "same";
}
