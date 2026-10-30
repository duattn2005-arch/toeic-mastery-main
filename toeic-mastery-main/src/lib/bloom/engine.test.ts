import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyEvaluateBehavior,
  buildBloomHeatmap,
  buildBloomProfile,
  creditOf,
  evaluateBehavior,
  filterNoise,
  frontierLevel,
  groupAttempts,
  levelMastery,
  scoreCell,
  tierProgress,
  type BloomAttempt,
} from "./engine";
import { HINT_CREDIT, MIN_ATTEMPTS_PER_CELL, REPEAT_CORRECT_CREDIT } from "./config";

const DAY = 86_400_000;
const NOW = Date.UTC(2026, 9, 30);
let seq = 0;

function att(over: Partial<BloomAttempt> = {}): BloomAttempt {
  seq++;
  return {
    questionId: `q${seq}`,
    part: "PART5",
    knowledgeLabel: "grammar:verb-tense",
    bloomLevel: 2,
    isCorrect: true,
    selectedAnswer: "A",
    firstAnswer: "A",
    answerChanged: false,
    changedFromCorrectToWrong: false,
    timeSpentSec: 20,
    hintUsedCount: 0,
    trapTypeHit: null,
    revealedBeforeAnswer: false,
    explanationViewed: false,
    mode: "timed",
    timestamp: NOW - DAY + seq,
    source: "attempt",
    ...over,
  };
}
const many = (n: number, over: Partial<BloomAttempt> | ((i: number) => Partial<BloomAttempt>)) =>
  Array.from({ length: n }, (_, i) => att(typeof over === "function" ? over(i) : over));

test("filterNoise drops skipped, revealed-first and out-of-range Reading answers, and counts why", () => {
  const r = filterNoise([
    att({ isCorrect: null }),
    att({ revealedBeforeAnswer: true }),
    att({ timeSpentSec: 3 }),
    att({ timeSpentSec: 200 }),
    att({ timeSpentSec: 3, part: "PART2" }), // Listening: time is audio-bound, kept
    att({ timeSpentSec: null }), // not measured → time rules skipped
    att(),
  ]);
  assert.equal(r.kept.length, 3);
  assert.deepEqual(r.counts, { skipped: 1, revealed: 1, guess: 1, stuck: 1 });
});

test("a correct answer after a hint earns only HINT_CREDIT; unmeasured hints count fully", () => {
  assert.equal(creditOf(att({ hintUsedCount: 2 })), HINT_CREDIT);
  assert.equal(creditOf(att({ hintUsedCount: null })), 1);
  assert.equal(creditOf(att({ isCorrect: false })), 0);
});

test("groupAttempts buckets by label × level", () => {
  const g = groupAttempts([att(), att({ bloomLevel: 3 }), att({ knowledgeLabel: "vocab", bloomLevel: 1 })]);
  assert.equal(g["grammar:verb-tense"][2]!.length, 1);
  assert.equal(g["grammar:verb-tense"][3]!.length, 1);
  assert.equal(g.vocab[1]!.length, 1);
});

test("scoreCell: under MIN_ATTEMPTS_PER_CELL distinct questions is insufficient", () => {
  const c = scoreCell(many(MIN_ATTEMPTS_PER_CELL - 1, {}), NOW);
  assert.equal(c.status, "insufficient");
  assert.equal(c.attempts, MIN_ATTEMPTS_PER_CELL - 1);
});

test("scoreCell: the same question answered many times is one data point", () => {
  const same = many(30, { questionId: "fixed" });
  const c = scoreCell(same, NOW);
  assert.equal(c.attempts, 1);
  assert.equal(c.status, "insufficient");
  // latest answer was a repeat of a correct one → repeat credit
  assert.equal(c.accuracy, REPEAT_CORRECT_CREDIT);
});

test("scoreCell: green at ≥80%, red under 50%", () => {
  const green = scoreCell(many(20, (i) => ({ isCorrect: i % 10 !== 0 })), NOW); // 90%
  assert.equal(green.status, "green");
  const red = scoreCell(many(20, (i) => ({ isCorrect: i % 3 === 0 })), NOW); // ~35%
  assert.equal(red.status, "red");
});

test("scoreCell: level ≥3 stays yellow without enough timed evidence", () => {
  const c = scoreCell(many(20, { bloomLevel: 3, mode: "practice" }), NOW);
  assert.equal(c.status, "yellow");
  assert.ok(c.cappedReason);
  const timed = scoreCell(many(20, { bloomLevel: 3, mode: "timed" }), NOW);
  assert.equal(timed.status, "green");
});

test("scoreCell: traps and right→wrong switches are penalised, capped", () => {
  const base = scoreCell(many(20, (i) => ({ isCorrect: i < 16 })), NOW); // 80%
  const trapped = scoreCell(many(20, (i) => ({ isCorrect: i < 16, trapTypeHit: i >= 16 ? "same_word_trap" : null })), NOW);
  assert.ok(trapped.score < base.score);
  assert.ok(base.score - trapped.score <= 0.15 + 1e-9);
});

test("scoreCell: stale green is flagged after MASTERY_STALE_DAYS", () => {
  const old = scoreCell(many(20, { timestamp: NOW - 60 * DAY }), NOW);
  assert.equal(old.status, "green");
  assert.equal(old.stale, true);
});

test("heatmap: an insufficient lower cell is inferred from a green higher cell of the same label; red is never overridden", () => {
  const label = "strategy:inference";
  const h = buildBloomHeatmap(
    [
      ...many(5, { knowledgeLabel: label, bloomLevel: 2 }),
      ...many(20, { knowledgeLabel: label, bloomLevel: 4, part: "PART7", timeSpentSec: 50 }),
      ...many(20, (i) => ({ knowledgeLabel: label, bloomLevel: 3, part: "PART7", timeSpentSec: 50, isCorrect: i % 3 === 0 })),
    ],
    NOW
  );
  assert.equal(h[label][2]!.inferred, true);
  assert.equal(h[label][3]!.status, "red");
  assert.equal(h[label][3]!.inferred, false);
});

test("frontierLevel (tầng): lowest non-mastered level among the ones the bank has", () => {
  const label = "grammar:verb-tense";
  const h = buildBloomHeatmap([...many(20, { knowledgeLabel: label, bloomLevel: 2 }), ...many(20, (i) => ({ knowledgeLabel: label, bloomLevel: 3, isCorrect: i % 2 === 0 }))], NOW);
  const f = frontierLevel(h[label], [2, 3]);
  assert.equal(f.level, 3);
  assert.equal(f.maxAllowed, 3);
  // no data at level 2 → can't go above 2
  assert.equal(frontierLevel(undefined, [2, 3]).maxAllowed, 2);
});

test("levelMastery: weighted by attempts, any red cell blocks mastery", () => {
  const h = buildBloomHeatmap(
    [
      ...many(20, { knowledgeLabel: "grammar:a", bloomLevel: 2 }),
      ...many(20, (i) => ({ knowledgeLabel: "grammar:b", bloomLevel: 2, isCorrect: i % 4 === 0 })),
    ],
    NOW
  );
  const lv = levelMastery(h);
  assert.equal(lv[2].cells.red, 1);
  assert.equal(lv[2].mastered, false);
  assert.equal(lv[5].status, "insufficient");
});

test("tierProgress: B needs levels 1 and 2", () => {
  const h = buildBloomHeatmap([...many(20, { knowledgeLabel: "vocab", bloomLevel: 1 }), ...many(20, { knowledgeLabel: "grammar:a", bloomLevel: 2 })], NOW);
  const t = tierProgress(levelMastery(h));
  assert.equal(t.reached, "B");
  assert.equal(t.working, "I");
  assert.deepEqual(t.missing, [3]);
});

test("evaluateBehavior blocks level 5 on right→wrong switching", () => {
  const list = many(40, (i) => ({ bloomLevel: 5, part: "PART3", knowledgeLabel: "strategy:implied-meaning", changedFromCorrectToWrong: i < 5, answerChanged: i < 5, isCorrect: i >= 5, mode: "mock", sessionId: "m1" }));
  const b = evaluateBehavior(list);
  assert.equal(b.decisionOk, false);
  const lv = applyEvaluateBehavior(levelMastery(buildBloomHeatmap(list, NOW)), b);
  assert.equal(lv[5].mastered, false);
});

test("buildBloomProfile: flashcards count at level 1 but not in totalAnswered", () => {
  const p = buildBloomProfile([...many(3, { source: "flashcard", knowledgeLabel: "vocab", bloomLevel: 1, part: null, timeSpentSec: null }), att()], NOW);
  assert.equal(p.totalAnswered, 1);
  assert.equal(p.heatmap.vocab[1]!.attempts, 3);
});
