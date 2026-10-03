/**
 * "Mastery (độc quyền)" — nội dung độc quyền chuyển từ bộ tài liệu
 * "Luyện chuyên sâu Ngữ pháp và Từ vựng TOEIC Part 5-6". Nội dung tĩnh
 * (không qua DB/seed) nên deploy là có ngay, không cần chạy db:seed.
 */

export type MasteryAnswer = "A" | "B" | "C" | "D";

export interface MasteryQuestion {
  prompt: string;
  options: string[];
  answer: MasteryAnswer;
  explanation: string;
}

export type MasteryBlock =
  | { type: "text"; title?: string; body: string }
  | { type: "list"; title?: string; items: string[] }
  | { type: "table"; title?: string; headers: string[]; rows: string[][] }
  | { type: "examples"; title?: string; items: { en: string; vi?: string }[] }
  | { type: "note"; title?: string; body: string }
  /** Bài tập tự luận/điền từ: đáp án ẩn, bấm để xem. */
  | { type: "qa"; title?: string; instructions?: string; items: { q: string; a: string }[] };

export interface MasteryExercise {
  title: string;
  /** "practice" hiện đáp án ngay khi chọn; "test" làm hết rồi nộp bài. */
  kind: "practice" | "test";
  instructions?: string;
  questions: MasteryQuestion[];
}

export interface MasteryLesson {
  slug: string;
  chapter: string;
  /** Nhãn bài như trong sách, ví dụ "Word Form 1". */
  code: string;
  title: string;
  summary: string;
  blocks: MasteryBlock[];
  exercises: MasteryExercise[];
}

export interface MasteryChapter {
  slug: string;
  title: string;
  description: string;
}
