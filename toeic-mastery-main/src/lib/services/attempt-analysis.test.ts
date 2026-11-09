import { test } from "node:test";
import assert from "node:assert/strict";
import { analyzeAttempt, answerInsight, lossCause, type AnsweredQuestion } from "./attempt-analysis";

const a = (over: Partial<AnsweredQuestion>): AnsweredQuestion => ({
  part: "PART5",
  selectedLabel: "B",
  correctLabel: "A",
  isCorrect: false,
  isFlagged: false,
  initialSelectedLabel: "B",
  hintUsedCount: 0,
  timeSpentSec: 20, // Part 5's standard is 25s, so this is normal pace
  trapTypeHit: null,
  grammarTopicSlug: null,
  ...over,
});

test("lossCause picks the most specific cause", () => {
  assert.equal(lossCause(a({ selectedLabel: "A", isCorrect: true })), null);
  assert.equal(lossCause(a({ selectedLabel: null, initialSelectedLabel: null })), "skipped");
  assert.equal(lossCause(a({ initialSelectedLabel: "A", trapTypeHit: "sound_alike" })), "flipped");
  assert.equal(lossCause(a({ trapTypeHit: "sound_alike", timeSpentSec: 1 })), "trap");
  assert.equal(lossCause(a({ timeSpentSec: 12 })), "rushed");
  assert.equal(lossCause(a({ timeSpentSec: 38 })), "overtime");
  assert.equal(lossCause(a({})), "other");
});

test("lossCause does not read pace from missing timing or from Listening", () => {
  assert.equal(lossCause(a({ timeSpentSec: 0 })), "other");
  assert.equal(lossCause(a({ part: "PART2", timeSpentSec: 1 })), "other");
});

test("an unknown trap code is ignored", () => {
  assert.equal(lossCause(a({ trapTypeHit: "legacy_code" })), "other");
  assert.deepEqual(analyzeAttempt([a({ trapTypeHit: "legacy_code" })]).traps, []);
});

test("causes add up to the questions lost", () => {
  const answers = [
    a({ selectedLabel: "A", isCorrect: true }),
    a({ selectedLabel: null, initialSelectedLabel: null }),
    a({ selectedLabel: null, initialSelectedLabel: null }),
    a({ timeSpentSec: 3 }),
  ];
  const { causes } = analyzeAttempt(answers);
  assert.equal(causes.reduce((sum, c) => sum + c.count, 0), 3);
  assert.equal(causes[0].cause, "skipped");
});

test("answer changes split by outcome and ignore unchanged answers", () => {
  const { changes } = analyzeAttempt([
    a({ initialSelectedLabel: "B", selectedLabel: "A", isCorrect: true }),
    a({ initialSelectedLabel: "A", selectedLabel: "B" }),
    a({ initialSelectedLabel: "C", selectedLabel: "B" }),
    a({}),
    a({ initialSelectedLabel: null, selectedLabel: "B" }),
  ]);
  assert.deepEqual(changes, { toCorrect: 1, toWrong: 1, wrongToWrong: 1 });
});

test("a topic needs two questions and one miss to count as weak", () => {
  const { topics } = analyzeAttempt([
    a({ grammarTopicSlug: "single" }),
    a({ grammarTopicSlug: "perfect", selectedLabel: "A", isCorrect: true }),
    a({ grammarTopicSlug: "perfect", selectedLabel: "A", isCorrect: true }),
    a({ grammarTopicSlug: "weak" }),
    a({ grammarTopicSlug: "weak", selectedLabel: "A", isCorrect: true }),
  ]);
  assert.deepEqual(topics, [{ slug: "weak", correct: 1, total: 2 }]);
});

test("pacing averages timed answers on Reading Parts only", () => {
  const { pacing } = analyzeAttempt([
    a({ timeSpentSec: 20 }),
    a({ timeSpentSec: 30 }),
    a({ timeSpentSec: 0 }),
    a({ part: "PART2", timeSpentSec: 9 }),
  ]);
  assert.deepEqual(pacing, [{ part: "PART5", targetSec: 25, avgSec: 25 }]);
});

test("headline names the worst Part and skips the catch-all cause", () => {
  const { headline } = analyzeAttempt([
    a({ part: "PART7", selectedLabel: null, initialSelectedLabel: null }),
    a({ part: "PART7", timeSpentSec: 0 }),
    a({ part: "PART7", timeSpentSec: 0 }),
    a({ part: "PART5", timeSpentSec: 0 }),
  ]);
  assert.match(headline, /mất 4 câu, nhiều nhất ở Part 7 \(3 câu\)/);
  assert.match(headline, /bỏ qua \(1 câu\)/);
});

test("only correct answers count as hinted", () => {
  const { hintedCorrect } = analyzeAttempt([
    a({ selectedLabel: "A", isCorrect: true, hintUsedCount: 1 }),
    a({ hintUsedCount: 2 }),
    a({ selectedLabel: "A", isCorrect: true }),
  ]);
  assert.equal(hintedCorrect, 1);
});

test("a perfect attempt has no causes", () => {
  const { headline, causes } = analyzeAttempt([a({ selectedLabel: "A", isCorrect: true })]);
  assert.equal(headline, "Bạn trả lời đúng cả 1 câu.");
  assert.deepEqual(causes, []);
});

test("answerInsight names the trap and the original answer", () => {
  const insight = answerInsight(a({ initialSelectedLabel: "C", trapTypeHit: "same_word_trap" }));
  assert.equal(insight.label, "Bẫy lặp từ");
  assert.equal(insight.changedFrom, "C");
  assert.equal(answerInsight(a({ selectedLabel: "A", initialSelectedLabel: "A", isCorrect: true })).label, null);
});
