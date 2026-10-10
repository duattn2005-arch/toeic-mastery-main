/** One flashcard/game item — deliberately decoupled from which model it came
 * from (curated VocabularyWord vs. free-text SavedWord), so the same games
 * work for both the Vocabulary section and the Saved Words section. */
export interface StudyItem {
  id: string;
  term: string;
  ipa: string | null;
  partOfSpeech: string | null;
  meaningVi: string;
  exampleEn: string | null;
  audioUrl: string | null;
  /** The learner's progress on this word (Chưa học / Đang học / Đã thuộc),
   * when the item is a tracked VocabularyWord. */
  status?: import("@/lib/services/spaced-repetition").VocabStatus;
}

export interface QuizQuestion {
  item: StudyItem;
  options: string[];
  correctIndex: number;
}

const MIN_ITEMS_FOR_QUIZ = 4;
const MAX_MATCH_PAIRS = 8;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function uniqueBy<T>(arr: T[], key: (t: T) => string): T[] {
  const seen = new Set<string>();
  return arr.filter((t) => (seen.has(key(t)) ? false : (seen.add(key(t)), true)));
}

export function canPlayQuiz(items: StudyItem[]): boolean {
  return items.length >= MIN_ITEMS_FOR_QUIZ;
}

/** One question per item, 3 wrong-meaning distractors drawn from the rest of
 * the set — or from `distractorPool` (e.g. the whole lesson) when reviewing
 * just a few words (so distractors are always plausible — real TOEIC meanings, not
 * nonsense strings). */
export function buildQuiz(items: StudyItem[], distractorPool: StudyItem[] = items): QuizQuestion[] {
  return shuffle(items).map((item) => {
    const pool = uniqueBy([...items, ...distractorPool], (i) => i.meaningVi).filter((i) => i.id !== item.id && i.meaningVi !== item.meaningVi);
    const distractors = shuffle(pool)
      .slice(0, 3)
      .map((i) => i.meaningVi);
    const options = shuffle([item.meaningVi, ...distractors]);
    return { item, options, correctIndex: options.indexOf(item.meaningVi) };
  });
}

export interface MatchTile {
  key: string;
  itemId: string;
  label: string;
  kind: "term" | "meaning";
}

function boardFor(pairs: StudyItem[]): MatchTile[] {
  const tiles: MatchTile[] = pairs.flatMap((item) => [
    { key: `${item.id}-term`, itemId: item.id, label: item.term, kind: "term" as const },
    { key: `${item.id}-meaning`, itemId: item.id, label: item.meaningVi, kind: "meaning" as const },
  ]);
  return shuffle(tiles);
}

/** EVERY item, split into rounds of at most MAX_MATCH_PAIRS pairs (so each
 * board stays playable) — a session of N words plays all N, not just 8.
 * Round sizes are balanced (e.g. 10 words -> 5 + 5, not 8 + 2) so no round
 * is a trivial 1-2 pair board. */
export function buildMatchRounds(items: StudyItem[]): MatchTile[][] {
  const shuffled = shuffle(items);
  if (shuffled.length === 0) return [];
  const roundCount = Math.ceil(shuffled.length / MAX_MATCH_PAIRS);
  const base = Math.floor(shuffled.length / roundCount);
  const extra = shuffled.length % roundCount;
  const rounds: MatchTile[][] = [];
  let start = 0;
  for (let r = 0; r < roundCount; r++) {
    const size = base + (r < extra ? 1 : 0);
    rounds.push(boardFor(shuffled.slice(start, start + size)));
    start += size;
  }
  return rounds;
}

export interface BlastQuestion {
  item: StudyItem;
  /** Terms written on the asteroids — the right one plus up to 3 others. */
  options: StudyItem[];
}

/** One Blast question per item (every word in the session): the meaning is
 * the prompt, the asteroids carry the correct term + real distractor terms. */
export function buildBlast(items: StudyItem[], distractorPool: StudyItem[] = items, optionCount = 4): BlastQuestion[] {
  return shuffle(items).map((item) => {
    const pool = uniqueBy([...items, ...distractorPool], (i) => i.term).filter((i) => i.id !== item.id && i.term !== item.term);
    const distractors = shuffle(pool).slice(0, optionCount - 1);
    return { item, options: shuffle([item, ...distractors]) };
  });
}

/** From this many words on, Blast and Bong bóng each take half the list
 * instead of both replaying all of it — keeps a long review varied
 * without doubling its length (e.g. 30 words -> 15 Blast + 15 Bong bóng). */
export const ARCADE_SPLIT_AT = 30;

/** Which words go to Blast and which to Bong bóng (see ARCADE_SPLIT_AT).
 * Below the threshold both games get every word. */
export function splitArcadeWords(items: StudyItem[]): { blast: StudyItem[]; balloon: StudyItem[] } {
  if (items.length < ARCADE_SPLIT_AT) return { blast: items, balloon: items };
  const mixed = shuffle(items);
  const half = Math.ceil(mixed.length / 2);
  return { blast: mixed.slice(0, half), balloon: mixed.slice(half) };
}
