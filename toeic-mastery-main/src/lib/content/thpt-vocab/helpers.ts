import type { IigTopic, IigWord } from "@/lib/content/iig-vocab/types";

/** [từ, từ loại, phiên âm (không kèm /), nghĩa, ghi chú (đồng nghĩa, trái nghĩa, cấu trúc)?] */
export type ThptRow = [word: string, pos: string, ipa: string, meaning: string, note?: string];

/** Global Success word lists give term, part of speech, IPA and Vietnamese
 * meaning — no example sentence, so that stays empty (like ETS 2026). */
export function thptWords(rows: ThptRow[]): IigWord[] {
  return rows.map(([word, pos, ipa, meaning, note]) => {
    const row: IigWord = [word, pos, ipa ? `/${ipa.trim()}/` : "", meaning, ""];
    if (note) row.push(note);
    return row;
  });
}

function unitSummary(grade: 9 | 11, unit: number, wordCount: number) {
  return `${wordCount} từ vựng Unit ${unit} — Tiếng Anh ${grade} Global Success.`;
}

export function thptUnit(grade: 9 | 11, unit: number, title: string, titleVi: string, rows: ThptRow[]): IigTopic {
  return {
    slug: `lop-${grade}-unit-${String(unit).padStart(2, "0")}`,
    group: `Lớp ${grade}`,
    title: `Unit ${unit}: ${title}`,
    titleVi: `Lớp ${grade} · ${titleVi}`,
    summary: unitSummary(grade, unit, rows.length),
    words: thptWords(rows),
    quiz: [],
    written: [],
  };
}

/** Appends extra words to the end of each Unit (keyed by Unit number), so
 * the existing daily-path days stay as they were. A word already anywhere
 * in the grade — in the base lists or in an earlier Unit's extras — is
 * skipped (case-insensitive), since the sync keys words by their text. */
export function withExtraWords(grade: 9 | 11, units: IigTopic[], extras: Record<number, ThptRow[]>): IigTopic[] {
  const seen = new Set(units.flatMap((u) => u.words.map(([word]) => word.toLowerCase())));
  return units.map((unit, index) => {
    const rows = (extras[index + 1] ?? []).filter(([word]) => {
      const key = word.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    if (rows.length === 0) return unit;
    const words = [...unit.words, ...thptWords(rows)];
    return { ...unit, words, summary: unitSummary(grade, index + 1, words.length) };
  });
}
