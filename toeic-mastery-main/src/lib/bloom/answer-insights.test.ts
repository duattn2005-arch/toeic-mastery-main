import { test } from "node:test";
import assert from "node:assert/strict";
import { answerInsights } from "./answer-insights";
import type { AnswerAnalysis } from "./engine";

const a = (over: Partial<AnswerAnalysis>): AnswerAnalysis => ({
  answered: 100,
  correct: 60,
  accuracy: 0.6,
  traps: [],
  unclassifiedWrong: 0,
  rightToWrong: 0,
  wrongToRight: 0,
  wrongToWrong: 0,
  avgSecCorrect: null,
  avgSecWrong: null,
  hintedCorrect: 0,
  byLevel: {} as AnswerAnalysis["byLevel"],
  ...over,
});
const trap = (count: number) => ({ trap: "sound_alike" as const, trapTypeHit: "sound_alike" as const, count });

test("a learner who only changed wrong to wrong is not told they never change answers", () => {
  const { change } = answerInsights(a({ wrongToWrong: 3 }), 0, 1);
  assert.match(change, /Đổi 3 lần/);
  assert.match(change, /3 lần vẫn sai/);
});

test("equal flips are not praised", () => {
  const { change } = answerInsights(a({ rightToWrong: 2, wrongToRight: 2 }), 0, 1);
  assert.match(change, /chưa giúp bạn có thêm điểm/);
});

test("a rare flip habit does not become the priority", () => {
  const { recommendation } = answerInsights(a({ answered: 200, correct: 100, accuracy: 0.5, rightToWrong: 2 }), 0, 2);
  assert.match(recommendation, /Củng cố kiến thức ở Bậc 2/);
});

test("the habit that cost the most questions wins", () => {
  assert.match(answerInsights(a({ rightToWrong: 5, traps: [trap(12)] }), 0, 1).recommendation, /khắc phục/);
  assert.match(answerInsights(a({ rightToWrong: 12, traps: [trap(5)] }), 0, 1).recommendation, /Bớt đổi đáp án/);
});

test("high accuracy gets a next challenge", () => {
  const { recommendation } = answerInsights(a({ answered: 100, correct: 90, accuracy: 0.9 }), 0, 3);
  assert.match(recommendation, /90%/);
});

test("time is compared only when both averages exist", () => {
  assert.match(answerInsights(a({ avgSecCorrect: 30 }), 0, 1).time, /Cần có cả/);
  assert.match(answerInsights(a({ avgSecCorrect: 20, avgSecWrong: 40 }), 0, 1).time, /tốn nhiều thời gian/);
  assert.match(answerInsights(a({ avgSecCorrect: 40, avgSecWrong: 20 }), 0, 1).time, /nhanh hơn/);
});
