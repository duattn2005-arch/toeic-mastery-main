import type { MasteryAnswer, MasteryQuestion } from "./types";

/** Viết gọn một câu hỏi: q(đề, [phương án], "B", "giải thích"). */
export function q(prompt: string, options: string[], answer: MasteryAnswer, explanation: string): MasteryQuestion {
  return { prompt, options, answer, explanation };
}
