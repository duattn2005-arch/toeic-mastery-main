import { BLANK_PATTERN, type TranscriptTest } from "./types";

/** blank key ("part:groupId:lineIndex:blankIndex") -> the word in the
 * original transcript. Blanks that could not be located for sure are left
 * out (they show as "chưa có đáp án" instead of being graded). */
export type TranscriptAnswerKey = Record<string, string>;

/** Full transcript of one question (Part 1/2) or conversation/talk (Part
 * 3/4) — see answerKeyForTest. */
export interface SourceTranscript {
  /** "7" for a single question, "32-34" for a Part 3/4 group. */
  id: string;
  text: string;
}

const BLANK = "\u0000";

/** Comparable form of a word: lower case, curly quotes straightened, outer
 * punctuation dropped (inner apostrophes/hyphens kept: "they'd", "three-day"). */
export function normalizeWord(word: string) {
  return word
    .toLowerCase()
    .replace(/[‘’ʼ`]/g, "'")
    .replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, "")
    .replace(/^'+|'+$/g, "");
}

function tokenize(text: string): string[] {
  return text
    .replace(/[–—]/g, " ")
    .split(/\s+/)
    .map((t) => (t === BLANK ? t : normalizeWord(t)))
    .filter(Boolean);
}

/** A source transcript as tokens: the whole text (speaker tags and answer
 * labels dropped) plus, for Part 1/2, each labelled option on its own —
 * "(B) The woman is wearing a jacket." must only be matched against (B):
 * Part 1 options share one sentence frame, so free matching would read
 * (A)'s words into (B)'s blanks. */
function sourceTokens(text: string) {
  const byLabel = new Map<string, string[]>();
  const all: string[] = [];
  for (const raw of text.split("\n")) {
    const label = raw.match(/^\s*\(([A-D])\)/)?.[1];
    const tokens = tokenize(raw.replace(/^\s*\([A-D]\)\s*/, "").replace(/^\s*(?:[WM]\d?|Man|Woman|Narrator)\s*:\s*/i, ""));
    if (label) byLabel.set(label, tokens);
    all.push(...tokens);
  }
  return { all, byLabel };
}

/**
 * Finds one sentence of a blank line inside its source, word by word: a
 * semi-global edit-distance alignment (the sentence must be used whole, the
 * source may be entered/left anywhere) where a blank matches any one word.
 * Sentence by sentence because the two sources order Part 2 lines
 * differently and the full transcripts skip a sentence here and there.
 *
 * A blank only gets an answer when (1) the sentence fits the source well,
 * (2) the exactly matched words on both sides pin the blank down, and (3)
 * every equally good place the sentence fits gives the same word — anything
 * shakier is dropped rather than risk marking a right answer wrong.
 */
function alignSentence(text: string, src: string[], keyFor: (blank: number) => string): TranscriptAnswerKey {
  const lineTokens: string[] = [];
  const blankAt = new Map<number, string>();
  let blankIndex = 0;
  for (const token of tokenize(text.replace(BLANK_PATTERN, ` ${BLANK} `))) {
    if (token === BLANK) blankAt.set(lineTokens.length, keyFor(blankIndex++));
    lineTokens.push(token);
  }
  const n = lineTokens.length;
  const m = src.length;
  const nonBlank = n - blankAt.size;
  if (blankAt.size === 0 || nonBlank === 0 || m === 0) return {};

  // dp[i][j]: cost of aligning lineTokens[i:] with src from j, leftover src free.
  const dp = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    dp[i][m] = n - i;
    for (let j = m - 1; j >= 0; j--) {
      const same = lineTokens[i] === BLANK || lineTokens[i] === src[j];
      dp[i][j] = Math.min(dp[i + 1][j + 1] + (same ? 0 : 1), dp[i + 1][j] + 1, dp[i][j + 1] + 1);
    }
  }
  let best = Infinity;
  for (let s = 0; s <= m; s++) best = Math.min(best, dp[0][s]);
  // More than a third of the sentence's own words off: it isn't really there.
  if (best > Math.max(1, Math.floor(nonBlank / 3))) return {};

  /** Answers read off the optimal alignment starting at src[start]. */
  function readAnswers(start: number) {
    const matched: (number | null)[] = new Array(n).fill(null);
    const exact: boolean[] = new Array(n).fill(false);
    let i = 0;
    let j = start;
    while (i < n && j < m) {
      const same = lineTokens[i] === BLANK || lineTokens[i] === src[j];
      if (dp[i][j] === dp[i + 1][j + 1] + (same ? 0 : 1)) {
        if (same) {
          matched[i] = j;
          exact[i] = lineTokens[i] !== BLANK;
        }
        i++;
        j++;
      } else if (dp[i][j] === dp[i + 1][j] + 1) i++;
      else j++;
    }
    const out = new Map<string, string>();
    for (const [pos, blankKey] of blankAt) {
      const at = matched[pos];
      if (at === null) continue;
      // Nearest non-blank neighbour on each side (runs of blanks count as
      // one stretch). Both sides must hold — a side at the sentence's edge
      // holds as long as the other is a real anchor: one anchor alone let an
      // extra blank in the sheet grab the next word ("tying [up] up her").
      let left = pos - 1;
      while (left >= 0 && lineTokens[left] === BLANK) left--;
      let right = pos + 1;
      while (right < n && lineTokens[right] === BLANK) right++;
      const leftOk = left < 0 || (exact[left] && matched[left] === at - (pos - left));
      const rightOk = right >= n || (exact[right] && matched[right] === at + (right - pos));
      if (leftOk && rightOk && (left >= 0 || right < n)) out.set(blankKey, src[at]);
    }
    return out;
  }

  const readings: Map<string, string>[] = [];
  for (let s = 0; s <= m; s++) if (dp[0][s] === best) readings.push(readAnswers(s));
  const key: TranscriptAnswerKey = {};
  for (const blankKey of blankAt.values()) {
    const words = new Set(readings.map((r) => r.get(blankKey)));
    const [word] = words;
    if (words.size === 1 && word) key[blankKey] = word;
  }
  return key;
}

/** Answer key for a whole blank-transcript test, from its full transcripts. */
export function answerKeyForTest(test: TranscriptTest, sources: SourceTranscript[]): TranscriptAnswerKey {
  const byId = new Map(sources.map((s) => [s.id, sourceTokens(s.text)]));
  const key: TranscriptAnswerKey = {};
  for (const part of test.parts) {
    for (const group of part.groups) {
      const source = byId.get(group.id.replace(/^q/, ""));
      if (!source) continue;
      group.lines.forEach((line, lineIndex) => {
        const label = line.label?.match(/[A-D]/)?.[0];
        const src = label ? source.byLabel.get(label) : source.all;
        if (!src) return;
        let offset = 0;
        for (const sentence of line.text.split(/(?<=[.?!])\s+/)) {
          const first = offset;
          Object.assign(key, alignSentence(sentence, src, (blank) => `${part.part}:${group.id}:${lineIndex}:${first + blank}`));
          offset += sentence.match(BLANK_PATTERN)?.length ?? 0;
        }
      });
    }
  }
  return key;
}

/** Same word, ignoring case, outer punctuation, curly/straight quotes and
 * hyphens ("email" = "e-mail", "3d" = "3-d"). */
export function isCorrectWord(input: string, answer: string) {
  const loose = (w: string) => normalizeWord(w.trim()).replace(/-/g, "");
  const a = loose(input);
  return a.length > 0 && a === loose(answer);
}
