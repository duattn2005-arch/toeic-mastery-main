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

/** Splits each Unit's extra words (keyed by Unit number) into its own
 * "Mở rộng" topic right after the Unit, so the main list stays short. The
 * extra lists are applied in order; a word already anywhere in the grade —
 * in the main lists or in earlier extras — is skipped (case-insensitive),
 * since the sync keys words by their text. */
export function withExtensionTopics(grade: 9 | 11, units: IigTopic[], extraLists: Record<number, ThptRow[]>[]): IigTopic[] {
  const seen = new Set(units.flatMap((u) => u.words.map(([word]) => word.toLowerCase())));
  const extraRows = units.map(() => [] as ThptRow[]);
  for (const extras of extraLists) {
    units.forEach((_, index) => {
      for (const row of extras[index + 1] ?? []) {
        const key = row[0].toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        extraRows[index].push(row);
      }
    });
  }
  return units.flatMap((unit, index) => {
    const rows = extraRows[index];
    if (rows.length === 0) return [unit];
    const extension: IigTopic = {
      ...unit,
      slug: `${unit.slug}-mo-rong`,
      title: `${unit.title} · Mở rộng`,
      titleVi: `${unit.titleVi} · Mở rộng`,
      summary: `${rows.length} từ mở rộng Unit ${index + 1} (họ từ, đồng/trái nghĩa, cụm từ, cấu trúc) — Tiếng Anh ${grade} Global Success.`,
      words: thptWords(rows),
    };
    return [unit, extension];
  });
}
