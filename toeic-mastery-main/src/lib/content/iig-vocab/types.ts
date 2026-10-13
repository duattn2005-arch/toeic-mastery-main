import type { MasteryQuestion } from "@/lib/content/mastery/types";

/** [từ, từ loại, phiên âm, nghĩa, ví dụ, ghi chú (phân biệt/mở rộng)] */
export type IigWord = [word: string, pos: string, ipa: string, meaning: string, example: string, note?: string];

export interface IigTopic {
  slug: string;
  title: string;
  titleVi: string;
  /** Optional section heading on the collection grid, e.g. "Đọc (RC)". */
  group?: string;
  summary: string;
  /** Words per day as a [min, max] range, overriding the collection's
   * fixed wordsPerDay — the path then splits the topic into evenly sized
   * days within that range (e.g. THPT Lớp 11: 15–20). */
  dayWordRange?: [min: number, max: number];
  words: IigWord[];
  /** Câu trắc nghiệm (chọn đáp án, tìm từ sai, đúng/sai). */
  quiz: MasteryQuestion[];
  /** Câu tự luận (sắp xếp câu, chia dạng từ, điền từ) — đáp án ẩn. */
  written: { q: string; a: string }[];
}
