import type { MasteryQuestion } from "@/lib/content/mastery/types";

/** [từ, từ loại, phiên âm, nghĩa, ví dụ, ghi chú (phân biệt/mở rộng)] */
export type IigWord = [word: string, pos: string, ipa: string, meaning: string, example: string, note?: string];

export interface IigTopic {
  slug: string;
  title: string;
  titleVi: string;
  summary: string;
  words: IigWord[];
  /** Câu trắc nghiệm (chọn đáp án, tìm từ sai, đúng/sai). */
  quiz: MasteryQuestion[];
  /** Câu tự luận (sắp xếp câu, chia dạng từ, điền từ) — đáp án ẩn. */
  written: { q: string; a: string }[];
}
