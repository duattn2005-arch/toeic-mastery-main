import { test } from "node:test";
import assert from "node:assert/strict";
import type { BloomAttempt } from "./engine";
import { buildMistakeReport } from "./mistakes";

const DAY = 86_400_000;
const NOW = Date.UTC(2026, 10, 9);
let seq = 0;

function att(over: Partial<BloomAttempt>): BloomAttempt {
  seq++;
  return {
    questionId: "q1",
    part: "PART5",
    knowledgeLabel: "grammar:a",
    bloomLevel: 2,
    isCorrect: false,
    selectedAnswer: "B",
    firstAnswer: "B",
    correctAnswer: "C",
    answerChanged: false,
    changedFromCorrectToWrong: false,
    timeSpentSec: 25,
    hintUsedCount: 0,
    trapTypeHit: null,
    revealedBeforeAnswer: false,
    explanationViewed: false,
    mode: "timed",
    timestamp: NOW - DAY + seq,
    source: "attempt",
    sessionId: "s1",
    ...over,
  };
}

test("one question: how often it was missed, what was picked, and whether it's fixed", () => {
  const still = buildMistakeReport([att({ isCorrect: true, selectedAnswer: "C", firstAnswer: "C" }), att({}), att({ selectedAnswer: "B" }), att({ selectedAnswer: "A", firstAnswer: "A" })], NOW);
  const q = still.questions[0];
  assert.equal(still.wrongAnswers, 3);
  assert.equal(still.wrongQuestions, 1);
  assert.equal(q.tries, 4);
  assert.equal(q.wrongCount, 3);
  assert.equal(q.stillWrong, true);
  assert.equal(q.lastPicked, "A");
  assert.deepEqual(q.picks, [{ label: "B", count: 2 }, { label: "A", count: 1 }]);
  assert.equal(still.repeated, 1);

  const fixed = buildMistakeReport([att({}), att({ isCorrect: true, selectedAnswer: "C", firstAnswer: "C" })], NOW);
  assert.equal(fixed.questions[0].stillWrong, false);
  assert.equal(fixed.fixed, 1);
  assert.equal(fixed.stillWrong, 0);
});

test("each wrong answer gets one error type, counted by frequency with a recent share", () => {
  const r = buildMistakeReport(
    [
      att({ questionId: "a", trapTypeHit: "similar_meaning" }),
      att({ questionId: "b", trapTypeHit: "similar_meaning", timestamp: NOW - 60 * DAY }),
      att({ questionId: "c", firstAnswer: "C", changedFromCorrectToWrong: true, answerChanged: true }),
      att({ questionId: "d", timeSpentSec: 5 }),
      att({ questionId: "e", timeSpentSec: 60 }),
      att({ questionId: "f" }),
    ],
    NOW
  );
  const counts = Object.fromEntries(r.types.map((t) => [t.label, t.count]));
  assert.deepEqual(counts, { "Bẫy gần nghĩa": 2, "Đổi đúng thành sai": 1, "Làm quá nhanh": 1, "Làm lâu vẫn sai": 1, "Cần ôn lại kiến thức": 1 });
  assert.equal(r.types[0].label, "Bẫy gần nghĩa");
  assert.equal(r.types[0].recent, 1);
  assert.equal(r.topErrorByLabel["grammar:a"].label, "Bẫy gần nghĩa");
});

test("skipped answers are counted apart: not an error type and not a wrong pick", () => {
  const r = buildMistakeReport([att({ isCorrect: null, selectedAnswer: null, firstAnswer: null })], NOW);
  assert.equal(r.skipped, 1);
  assert.equal(r.wrongQuestions, 0);
  assert.deepEqual(r.questions, []);
  assert.deepEqual(r.types, []);
  assert.equal(r.topErrorByLabel["grammar:a"], undefined);
});

test("flashcards and answers picked after seeing the key are left out", () => {
  const r = buildMistakeReport([att({ part: null, source: "flashcard", questionId: "vocab:1" }), att({ revealedBeforeAnswer: true })], NOW);
  assert.equal(r.wrongAnswers, 0);
  assert.deepEqual(r.types, []);
});

test("an answer corrected after opening the explanation reports the pick that was graded", () => {
  const r = buildMistakeReport([att({ selectedAnswer: "C", firstAnswer: "B" })], NOW);
  assert.equal(r.questions[0].lastPicked, "B");
  assert.deepEqual(r.questions[0].picks, [{ label: "B", count: 1 }]);
});

test("questions sort still-wrong first, then most missed, and split by Bloom level", () => {
  const r = buildMistakeReport(
    [
      att({ questionId: "fixed" }),
      att({ questionId: "fixed" }),
      att({ questionId: "fixed", isCorrect: true, selectedAnswer: "C", firstAnswer: "C" }),
      att({ questionId: "once", bloomLevel: 3 }),
      att({ questionId: "twice" }),
      att({ questionId: "twice" }),
    ],
    NOW
  );
  assert.deepEqual(r.questions.map((q) => q.questionId), ["twice", "once", "fixed"]);
  assert.deepEqual(r.byLevel[3].questions.map((q) => q.questionId), ["once"]);
  assert.equal(r.byLevel[2].wrongAnswers, 4);
  assert.equal(r.byLevel[5].wrongAnswers, 0);
});

test("the review link points at the latest wrong answer from a real attempt", () => {
  const r = buildMistakeReport([att({ sessionId: "exam-1" }), att({ source: "practice", sessionId: null })], NOW);
  assert.equal(r.questions[0].reviewAttemptId, "exam-1");
  assert.equal(buildMistakeReport([att({ source: "practice", sessionId: null })], NOW).questions[0].reviewAttemptId, null);
});
