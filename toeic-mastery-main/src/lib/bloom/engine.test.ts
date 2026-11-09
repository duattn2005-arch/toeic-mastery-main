import { test } from "node:test";
import assert from "node:assert/strict";
import {
  analyzeAnswers,
  applyEvaluateBehavior,
  buildBloomHeatmap,
  buildBloomProfile,
  creditOf,
  evaluateBehavior,
  filterNoise,
  frontierLevel,
  groupAttempts,
  inferLowerLevels,
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

test("a level is scored once the whole level has enough questions, even if no single label does", () => {
  const list = Array.from({ length: 30 }, (_, i) => many(10, (j) => ({ knowledgeLabel: `grammar:t${i}`, bloomLevel: 2, isCorrect: j < 9 }))).flat();
  const m = buildBloomProfile(list, NOW).levels[2];
  assert.equal(m.scoredAttempts, 300);
  assert.ok(Math.abs(m.score! - 0.9) < 0.1);
  assert.equal(m.mastered, true);
  assert.equal(m.cells.insufficient, 30);

  const few = buildBloomProfile(many(14, { knowledgeLabel: "grammar:a", bloomLevel: 2 }), NOW).levels[2];
  assert.equal(few.score, null);
  assert.equal(few.mastered, false);
  assert.match(few.blockers[0], /Mới có 14 câu/);
});

test("small labels pull a level's score down, but only a label with enough questions can be Red", () => {
  const list = [...many(20, { knowledgeLabel: "grammar:big", bloomLevel: 2 }), ...many(10, { knowledgeLabel: "grammar:small", bloomLevel: 2, isCorrect: false })];
  const m = buildBloomProfile(list, NOW).levels[2];
  assert.equal(m.cells.red, 0);
  assert.ok(m.score! < 0.8);
  assert.equal(m.mastered, false);
});

test("a solid higher level implies lower levels without enough data, so the learner isn't stuck at level 1", () => {
  const noLow = buildBloomProfile([...many(20, { bloomLevel: 2 }), ...many(20, { bloomLevel: 3 })], NOW);
  assert.equal(noLow.levels[1].mastered, true);
  assert.equal(noLow.levels[1].inferredFrom, 2);
  assert.equal(noLow.tier.frontier, 4);
  assert.equal(noLow.tier.reached, "I");

  const fewLow = buildBloomProfile([...many(5, { bloomLevel: 1 }), ...many(20, { bloomLevel: 2 })], NOW);
  assert.equal(fewLow.levels[1].inferredFrom, 2);
  assert.equal(fewLow.tier.frontier, 3);
});

test("real data beats inference: a scored or clearly weak level is never implied", () => {
  const scored = buildBloomProfile([...many(15, (i) => ({ bloomLevel: 1, knowledgeLabel: "vocab", isCorrect: i < 8 })), ...many(20, { bloomLevel: 2 })], NOW);
  assert.equal(scored.levels[1].inferredFrom, null);
  assert.equal(scored.levels[1].mastered, false);
  assert.equal(scored.tier.frontier, 1);

  const weak = buildBloomProfile([...many(10, (i) => ({ bloomLevel: 1, knowledgeLabel: "vocab", isCorrect: i < 2 })), ...many(20, { bloomLevel: 2 })], NOW);
  assert.equal(weak.levels[1].inferredFrom, null);
  assert.equal(weak.tier.frontier, 1);
});

test("nothing is implied by a higher level that isn't solid, or by a level itself implied", () => {
  const notSolid = buildBloomProfile(many(20, (i) => ({ bloomLevel: 3, isCorrect: i < 8 })), NOW);
  assert.equal(notSolid.levels[1].mastered, false);
  assert.equal(notSolid.tier.frontier, 1);

  const levels = inferLowerLevels(buildBloomProfile(many(20, { bloomLevel: 2 }), NOW).levels);
  assert.equal(levels[1].inferredFrom, 2);
  assert.equal(levels[3].mastered, false);
});

test("evaluation behaviour counts before inferring: a level 5 held back by flips implies nothing", () => {
  const list = many(20, (i) => ({ bloomLevel: 5, part: "PART3", knowledgeLabel: "strategy:implied-meaning", mode: "mock", changedFromCorrectToWrong: i < 2, answerChanged: i < 2, isCorrect: i >= 2 }));
  const p = buildBloomProfile(list, NOW);
  assert.equal(p.levels[5].mastered, false);
  assert.equal(p.levels[4].mastered, false);
});

test("frontierLevel: an untried level under a solid one is implied, a Yellow one still holds the label", () => {
  const label = "grammar:a";
  const untried = buildBloomHeatmap(many(20, { knowledgeLabel: label, bloomLevel: 3 }), NOW);
  assert.equal(frontierLevel(untried[label], [2, 3, 4]).level, 4);

  const yellow = buildBloomHeatmap([...many(20, (i) => ({ knowledgeLabel: label, bloomLevel: 2, isCorrect: i < 13 })), ...many(20, { knowledgeLabel: label, bloomLevel: 3 })], NOW);
  assert.equal(frontierLevel(yellow[label], [2, 3, 4]).level, 2);
});

test("reviewing flashcards doesn't lower the score, but a question redone correctly still earns less", () => {
  const card = (w: number, ok = true) => att({ questionId: `vocab:${w}`, source: "flashcard", knowledgeLabel: "vocab", bloomLevel: 1, part: null, timeSpentSec: null, hintUsedCount: null, isCorrect: ok, mode: "practice" });
  const words = Array.from({ length: 20 }, (_, i) => i);
  assert.equal(scoreCell([...words, ...words].map((w) => card(w)), NOW).score, 1);
  assert.equal(scoreCell([...words, ...words].map((w, i) => card(w, i !== 39)), NOW).score, 0.95);

  const q = (i: number) => att({ questionId: `again${i}` });
  const ids = Array.from({ length: 20 }, (_, i) => i);
  const redone = scoreCell([...ids.map(q), ...ids.map(q)], NOW);
  assert.ok(Math.abs(redone.accuracy - REPEAT_CORRECT_CREDIT) < 1e-9);
});

test("buildBloomProfile: flashcards count at level 1 but not in totalAnswered", () => {
  const p = buildBloomProfile([...many(3, { source: "flashcard", knowledgeLabel: "vocab", bloomLevel: 1, part: null, timeSpentSec: null }), att()], NOW);
  assert.equal(p.totalAnswered, 1);
  assert.equal(p.heatmap.vocab[1]!.attempts, 3);
  assert.equal(p.answers.answered, 1);
});

test("analyzeAnswers: empty input is safe", () => {
  const res = analyzeAnswers([]);
  assert.equal(res.answered, 0);
  assert.equal(res.correct, 0);
  assert.equal(res.accuracy, 0);
  assert.equal(res.unclassifiedWrong, 0);
  assert.deepEqual(res.traps, []);
  assert.equal(res.rightToWrong, 0);
  assert.equal(res.wrongToRight, 0);
  assert.equal(res.avgSecCorrect, null);
  assert.equal(res.avgSecWrong, null);
  assert.equal(res.hintedCorrect, 0);
  assert.equal(res.byLevel[1].answered, 0);
  assert.equal(res.byLevel[1].accuracy, 0);
  assert.equal(res.byLevel[5].answered, 0);
  assert.equal(res.byLevel[5].accuracy, 0);
});

test("analyzeAnswers: noise, unanswered, and flashcard attempts are excluded", () => {
  const attempts = [
    att({ isCorrect: null }), // skipped
    att({ revealedBeforeAnswer: true, isCorrect: true }), // revealed
    att({ timeSpentSec: 3, isCorrect: true }), // guess (Reading Part 5 < 8s)
    att({ timeSpentSec: 200, isCorrect: false }), // stuck (Reading Part 5 > 180s)
    att({ source: "flashcard", isCorrect: true }), // flashcard
    att({ isCorrect: true, timeSpentSec: 25, hintUsedCount: 1 }), // hinted correct
    att({ isCorrect: true, timeSpentSec: 15, hintUsedCount: 0 }), // pure correct
    att({ isCorrect: false, timeSpentSec: 35 }), // wrong
  ];
  const res = analyzeAnswers(attempts);
  assert.equal(res.answered, 3);
  assert.equal(res.correct, 2);
  assert.equal(res.accuracy, 2 / 3);
  assert.equal(res.hintedCorrect, 1);
  assert.equal(res.avgSecCorrect, 20); // (25 + 15) / 2
  assert.equal(res.avgSecWrong, 35);
});

test("analyzeAnswers: traps are sorted descending and unclassifiedWrong is tracked", () => {
  const attempts = [
    att({ isCorrect: false, trapTypeHit: "same_word_trap" }),
    att({ isCorrect: false, trapTypeHit: "sound_alike" }),
    att({ isCorrect: false, trapTypeHit: "sound_alike" }),
    att({ isCorrect: false, trapTypeHit: "same_word_trap" }),
    att({ isCorrect: false, trapTypeHit: "sound_alike" }),
    att({ isCorrect: false, trapTypeHit: "not_stated" }),
    att({ isCorrect: false, trapTypeHit: null }),
    att({ isCorrect: false, trapTypeHit: null }),
    att({ isCorrect: true, trapTypeHit: null }),
  ];
  const res = analyzeAnswers(attempts);
  assert.equal(res.answered, 9);
  assert.equal(res.correct, 1);
  assert.equal(res.unclassifiedWrong, 2);
  assert.equal(res.traps.length, 3);
  assert.equal(res.traps[0].trap, "sound_alike");
  assert.equal(res.traps[0].count, 3);
  assert.equal(res.traps[1].trap, "same_word_trap");
  assert.equal(res.traps[1].count, 2);
  assert.equal(res.traps[2].trap, "not_stated");
  assert.equal(res.traps[2].count, 1);
});

test("a cell whose answers were all filtered as noise scores 0, not NaN", () => {
  const cell = scoreCell(many(3, { revealedBeforeAnswer: true }), NOW);
  assert.equal(cell.attempts, 0);
  assert.equal(cell.score, 0);
  const profile = buildBloomProfile(many(3, { revealedBeforeAnswer: true }), NOW);
  for (const level of Object.values(profile.levels)) assert.ok(!Number.isNaN(level.score ?? 0));
});
