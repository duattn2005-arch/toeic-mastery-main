/**
 * Parsing for the learner's "Nhập nhiều từ" import: a block pasted from
 * Excel / Google Sheets with columns like Word · Pro · Type · Mean · Note
 * (in any order, with or without a header row, extra Day/STT columns
 * fine). Pure and client-safe — the dialog previews with it live, the
 * server action re-runs it on save.
 */

export interface VocabRow {
  term: string;
  /** "/ˈfeɪ.vɚ/" — always slash-wrapped, or "" */
  ipa: string;
  /** Normalized, comma-joined: "n", "v, adj", or "" */
  partOfSpeech: string;
  definition: string;
  note: string;
}

type Field = "term" | "ipa" | "pos" | "definition" | "note" | "skip";

const POS_ALIASES: Record<string, string> = {
  n: "n",
  noun: "n",
  "danh từ": "n",
  v: "v",
  verb: "v",
  "động từ": "v",
  adj: "adj",
  a: "adj",
  adjective: "adj",
  "tính từ": "adj",
  adv: "adv",
  adverb: "adv",
  "trạng từ": "adv",
  prep: "prep",
  preposition: "prep",
  "giới từ": "prep",
  conj: "conj",
  conjunction: "conj",
  "liên từ": "conj",
  pron: "pron",
  pronoun: "pron",
  "đại từ": "pron",
  phr: "phr",
  phrase: "phr",
  "cụm từ": "phr",
  "phr v": "phr v",
  "phrasal verb": "phr v",
  "cụm động từ": "phr v",
  idiom: "idiom",
  "thành ngữ": "idiom",
  int: "interj",
  interj: "interj",
  interjection: "interj",
  det: "det",
  determiner: "det",
};

/** Display order when a word has several types. */
const POS_ORDER = ["n", "v", "phr v", "adj", "adv", "prep", "conj", "pron", "det", "phr", "idiom", "interj"];

function normalizePosToken(token: string): string | null {
  const t = token
    .trim()
    .toLowerCase()
    .replace(/[().]/g, "")
    .replace(/\s+/g, " ");
  if (!t) return null;
  return POS_ALIASES[t] ?? null;
}

/** "N", "Adj.", "noun / verb", "(v)" → "n" / "adj" / "n, v" / "v". Unknown
 * text is kept as typed (lowercased) rather than dropped. */
export function normalizePartOfSpeech(raw: string): string {
  const parts = raw
    .split(/[,/;&+]|\s+-\s+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 0) return "";
  const known = parts.map(normalizePosToken);
  if (known.some((k) => k === null)) {
    const whole = normalizePosToken(raw);
    return whole ?? raw.trim().toLowerCase();
  }
  return sortPos([...new Set(known as string[])]).join(", ");
}

function sortPos(list: string[]): string[] {
  return [...list].sort((a, b) => {
    const ia = POS_ORDER.indexOf(a);
    const ib = POS_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
}

/** Wraps a bare transcription in slashes; leaves "" alone. */
export function normalizeIpa(raw: string): string {
  const t = raw.trim().replace(/^\[|\]$/g, "").replace(/^\/+|\/+$/g, "").trim();
  return t ? `/${t}/` : "";
}

const looksLikeIpa = (s: string) => /^\s*[/[].+[/\]]\s*$/.test(s) || /[ˈˌəɪʊʌæɑɔɛɜθðʃʒŋː]/.test(s);
const looksLikePos = (s: string) => s.trim() !== "" && normalizePosToken(s.split(/[,/]/)[0]) !== null;
const looksLikeNumber = (s: string) => /^\s*\d+\s*$/.test(s);
/** Vietnamese diacritics — a column full of these is the meaning, not the word. */
const looksVietnamese = (s: string) => /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(s);

/**
 * Splits pasted spreadsheet text into rows of cells. Google Sheets / Excel
 * copy as TSV and wrap a cell that contains a newline (a multi-line note)
 * or a quote in double quotes, doubling any quote inside — so a naive
 * split on "\n" would break one row into several.
 */
export function parseDelimited(text: string, delimiter = "\t"): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let i = 0;
  let atCellStart = true;
  const src = text.replace(/\r\n?/g, "\n");

  while (i < src.length) {
    const ch = src[i];
    if (atCellStart && ch === '"') {
      // Quoted cell: read to the closing quote ("" is a literal quote).
      i++;
      while (i < src.length) {
        if (src[i] === '"') {
          if (src[i + 1] === '"') {
            cell += '"';
            i += 2;
            continue;
          }
          i++;
          break;
        }
        cell += src[i++];
      }
      atCellStart = false;
      continue;
    }
    if (ch === delimiter) {
      row.push(cell);
      cell = "";
      atCellStart = true;
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      atCellStart = true;
    } else {
      cell += ch;
      atCellStart = false;
    }
    i++;
  }
  if (cell !== "" || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

const HEADERS: Record<string, Field> = {
  word: "term",
  words: "term",
  term: "term",
  vocab: "term",
  vocabulary: "term",
  "từ": "term",
  "từ vựng": "term",
  "từ mới": "term",
  pro: "ipa",
  pron: "ipa",
  pronunciation: "ipa",
  ipa: "ipa",
  phonetic: "ipa",
  phonetics: "ipa",
  "phiên âm": "ipa",
  type: "pos",
  pos: "pos",
  "word type": "pos",
  "part of speech": "pos",
  "loại": "pos",
  "loại từ": "pos",
  "từ loại": "pos",
  mean: "definition",
  meaning: "definition",
  meanings: "definition",
  definition: "definition",
  "nghĩa": "definition",
  "nghĩa tiếng việt": "definition",
  note: "note",
  notes: "note",
  "ghi chú": "note",
  example: "note",
  "ví dụ": "note",
  day: "skip",
  "ngày": "skip",
  stt: "skip",
  no: "skip",
  "#": "skip",
  "số": "skip",
};

function headerField(cell: string): Field | undefined {
  return HEADERS[cell.trim().toLowerCase().replace(/[.:]/g, "").replace(/\s+/g, " ")];
}

/** Column roles from a header row, if the first row is one (≥2 cells name a
 * known column and one of them is the word). */
function columnsFromHeader(first: string[]): Field[] | null {
  const fields = first.map(headerField);
  const named = fields.filter(Boolean).length;
  if (named < 2 || !fields.includes("term")) return null;
  return fields.map((f) => f ?? "skip");
}

/** Column roles guessed from content when there's no header. */
function columnsFromContent(rows: string[][]): Field[] {
  const width = Math.max(...rows.map((r) => r.length));
  const share = (col: number, test: (s: string) => boolean) => {
    const filled = rows.map((r) => r[col] ?? "").filter((c) => c.trim());
    return filled.length === 0 ? 0 : filled.filter(test).length / filled.length;
  };
  const fields: Field[] = Array.from({ length: width }, (_, col) => {
    if (share(col, looksLikeNumber) > 0.8) return "skip";
    if (share(col, looksLikeIpa) > 0.6) return "ipa";
    if (share(col, looksLikePos) > 0.6) return "pos";
    return "definition"; // provisional — text columns are sorted out below
  });
  // Text columns, left to right: the first non-Vietnamese one is the word,
  // the next text column the meaning, anything after that the note.
  const text = fields.map((f, i) => (f === "definition" ? i : -1)).filter((i) => i !== -1);
  const termCol = text.find((i) => share(i, looksVietnamese) < 0.5) ?? text[0];
  let seenMeaning = false;
  for (const i of text) {
    if (i === termCol) fields[i] = "term";
    else if (!seenMeaning) {
      fields[i] = "definition";
      seenMeaning = true;
    } else fields[i] = "note";
  }
  return fields;
}

/** One pasted line (or one AI-extracted item) before same-word lines are folded. */
export interface VocabLine {
  term: string;
  ipa: string;
  pos: string;
  definition: string;
  note: string;
}

/** Folds lines of the same word (case-insensitive) into one card: types
 * joined ("n, v"), meanings tagged by type when they differ ("(n) ân huệ;
 * (v) thiên vị"), notes joined — a learner keeps one saved card per word. */
export function foldVocabLines(lines: VocabLine[]): VocabRow[] {
  const byWord = new Map<string, VocabLine[]>();
  for (const line of lines) {
    const key = line.term.trim().toLowerCase();
    if (!key) continue;
    byWord.set(key, [...(byWord.get(key) ?? []), line]);
  }
  const unique = <T,>(xs: T[]) => [...new Set(xs)];
  return [...byWord.values()].map((group) => {
    const defs = group.filter((g) => g.definition);
    const multiType = unique(defs.map((g) => g.pos)).length > 1;
    return {
      term: group[0].term.trim(),
      ipa: unique(group.map((g) => g.ipa).filter(Boolean)).join(" "),
      partOfSpeech: normalizePartOfSpeech(group.map((g) => g.pos).filter(Boolean).join(", ")),
      definition: unique(defs.map((g) => (multiType && g.pos ? `(${g.pos}) ${g.definition}` : g.definition))).join("; "),
      note: unique(group.map((g) => g.note).filter(Boolean)).join("\n"),
    };
  });
}

export interface ParsedVocab {
  rows: VocabRow[];
  /** Pasted lines folded into an earlier row of the same word. */
  merged: number;
  /** True when column roles came from a header row rather than guessing. */
  fromHeader: boolean;
}

/**
 * Parses a pasted table into one row per distinct word. A blank word cell
 * inherits the word above it (a merged cell in Sheets copies as blank), and
 * several lines for the same word — "Favor · N · ân huệ" / "Favor · V ·
 * thiên vị" — fold into one card ("n, v", "(n) ân huệ; (v) thiên vị"),
 * since a learner keeps one saved card per word.
 */
export function parseVocabTable(text: string, delimiter = "\t"): ParsedVocab {
  const cells = parseDelimited(text, delimiter);
  if (cells.length === 0) return { rows: [], merged: 0, fromHeader: false };

  const header = columnsFromHeader(cells[0]);
  const body = header ? cells.slice(1) : cells;
  const fields = header ?? columnsFromContent(body);
  if (!fields.includes("term")) return { rows: [], merged: 0, fromHeader: !!header };

  const pick = (row: string[], field: Field) =>
    fields
      .map((f, i) => (f === field ? (row[i] ?? "").trim() : ""))
      .filter(Boolean)
      .join("\n");

  const lines: VocabLine[] = [];
  let lastTerm = "";
  for (const row of body) {
    const line = {
      term: pick(row, "term").replace(/\s+/g, " "),
      ipa: normalizeIpa(pick(row, "ipa").split("\n")[0]),
      pos: normalizePartOfSpeech(pick(row, "pos")),
      definition: pick(row, "definition"),
      note: pick(row, "note"),
    };
    if (!line.term && (line.definition || line.ipa || line.pos)) line.term = lastTerm;
    if (!line.term) continue;
    lastTerm = line.term;
    lines.push(line);
  }

  const rows = foldVocabLines(lines);
  return { rows, merged: lines.length - rows.length, fromHeader: !!header };
}

/** First type of a row's comma-joined list, for colour coding a badge. */
export function posTone(pos: string): "n" | "v" | "adj" | "adv" | "other" {
  const first = pos.split(",")[0]?.trim();
  return first === "n" || first === "v" || first === "adj" || first === "adv" ? first : first === "phr v" ? "v" : "other";
}
