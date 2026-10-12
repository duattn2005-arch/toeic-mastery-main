import type { IigTopic, IigWord } from "@/lib/content/iig-vocab/types";

/** Global Success word lists give term, part of speech, IPA and Vietnamese
 * meaning — no example sentence, so that stays empty (like ETS 2026). */
export function thptWords(rows: [word: string, pos: string, ipa: string, meaning: string][]): IigWord[] {
  return rows.map(([word, pos, ipa, meaning]) => [word, pos, ipa ? `/${ipa.trim()}/` : "", meaning, ""]);
}

export function thptUnit(
  grade: 9 | 11,
  unit: number,
  title: string,
  titleVi: string,
  rows: Parameters<typeof thptWords>[0]
): IigTopic {
  return {
    slug: `lop-${grade}-unit-${String(unit).padStart(2, "0")}`,
    group: `Lớp ${grade}`,
    title: `Unit ${unit}: ${title}`,
    titleVi: `Lớp ${grade} · ${titleVi}`,
    summary: `${rows.length} từ vựng Unit ${unit} — Tiếng Anh ${grade} Global Success.`,
    words: thptWords(rows),
    quiz: [],
    written: [],
  };
}
