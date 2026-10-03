import { DAI_TU_LESSONS } from "./dai-tu";
import { DANH_GIA_LESSONS } from "./danh-gia";
import { DANH_TU_LESSONS } from "./danh-tu";
import { DONG_TU_LESSONS } from "./dong-tu";
import { LIEN_TU_GIOI_TU_LESSONS } from "./lien-tu-gioi-tu";
import { PRACTICE_TEST_LESSONS } from "./practice-tests";
import { TINH_TU_TRANG_TU_LESSONS } from "./tinh-tu-trang-tu";
import type { MasteryChapter, MasteryLesson } from "./types";

export type { MasteryBlock, MasteryChapter, MasteryExercise, MasteryLesson, MasteryQuestion } from "./types";

export const MASTERY_FOLDER_TITLE = "Mastery (độc quyền)";
export const MASTERY_BASE_PATH = "/grammar/mastery";

export const MASTERY_CHAPTERS: MasteryChapter[] = [
  { slug: "danh-tu", title: "Chương I — Danh từ", description: "Nhận biết danh từ, số ít/số nhiều/không đếm được, danh từ chỉ người, nghĩa của danh từ và cụm danh từ." },
  { slug: "dong-tu", title: "Chương II — Động từ", description: "Hòa hợp chủ – vị, thì, thể, phân từ, To V/V-ing và nghĩa của động từ." },
  { slug: "tinh-tu-trang-tu", title: "Chương III — Tính từ và trạng từ", description: "Vị trí, trường hợp đặc biệt, so sánh và nghĩa của tính từ, trạng từ." },
  { slug: "dai-tu", title: "Chương IV — Đại từ", description: "Đại từ nhân xưng, các đại từ khác (those, another, the other…) và đại từ quan hệ." },
  { slug: "lien-tu-gioi-tu", title: "Chương V — Liên từ và giới từ", description: "Vị trí, chức năng và nghĩa của từ liên kết; các giới từ phổ biến." },
  { slug: "danh-gia", title: "Evaluation Tests", description: "Bài đánh giá tổng hợp danh từ, động từ, tính từ, trạng từ." },
  { slug: "practice-tests", title: "B — Practice Tests", description: "5 đề thi 40 câu sát đề TOEIC thực tế, tổng hợp toàn bộ kiến thức đã học." },
];

export const MASTERY_LESSONS: MasteryLesson[] = [
  ...DANH_TU_LESSONS,
  ...DONG_TU_LESSONS,
  ...TINH_TU_TRANG_TU_LESSONS,
  ...DAI_TU_LESSONS,
  ...LIEN_TU_GIOI_TU_LESSONS,
  ...DANH_GIA_LESSONS,
  ...PRACTICE_TEST_LESSONS,
];

export function countLessonQuestions(lesson: MasteryLesson): number {
  const quiz = lesson.exercises.reduce((sum, ex) => sum + ex.questions.length, 0);
  const qa = lesson.blocks.reduce((sum, b) => sum + (b.type === "qa" ? b.items.length : 0), 0);
  return quiz + qa;
}

export function getMasteryLessonsByChapter(chapterSlug: string): MasteryLesson[] {
  return MASTERY_LESSONS.filter((l) => l.chapter === chapterSlug);
}

export function getMasteryLesson(slug: string) {
  const index = MASTERY_LESSONS.findIndex((l) => l.slug === slug);
  if (index === -1) return null;
  const lesson = MASTERY_LESSONS[index];
  return {
    lesson,
    chapter: MASTERY_CHAPTERS.find((c) => c.slug === lesson.chapter) ?? null,
    prev: MASTERY_LESSONS[index - 1] ?? null,
    next: MASTERY_LESSONS[index + 1] ?? null,
  };
}

export function getMasteryStats() {
  return {
    lessonCount: MASTERY_LESSONS.length,
    questionCount: MASTERY_LESSONS.reduce((sum, l) => sum + countLessonQuestions(l), 0),
  };
}
