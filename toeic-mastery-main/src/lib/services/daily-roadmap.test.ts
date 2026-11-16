import { test } from "node:test";
import assert from "node:assert/strict";
import { buildDailyRoadmap, type RoadmapInput } from "./daily-roadmap";
import { TEST_PARTS } from "@/lib/constants/toeic";

const base: RoadmapInput = {
  pro: true,
  partAccuracies: TEST_PARTS.map((part) => ({ part, accuracy: 0.9, attempted: 50 })),
  todayPartAnswers: {},
  attemptsCompleted: 3,
  attemptsToday: 0,
  dueVocab: 0,
  vocabularyLearned: 40,
  continueAttempt: null,
  todayMinutes: 0,
  dailyGoalMinutes: 30,
  streakCount: 2,
};

const withAcc = (over: Record<string, number>) =>
  TEST_PARTS.map((part) => ({ part, accuracy: over[part] ?? 0.9, attempted: 50 }));

test("a learner with no attempts starts with the first test and gets no Part stops", () => {
  const r = buildDailyRoadmap({ ...base, attemptsCompleted: 0, vocabularyLearned: 0, partAccuracies: [] });
  assert.deepEqual(r.steps.map((s) => s.id), ["diagnostic", "vocab", "time", "finish"]);
  assert.equal(r.current?.id, "diagnostic");
});

test("the two weakest Parts are picked, weakest first", () => {
  const r = buildDailyRoadmap({ ...base, partAccuracies: withAcc({ PART4: 0.1, PART2: 0.51, PART1: 0.49 }) });
  assert.deepEqual(r.steps.filter((s) => s.kind === "part").map((s) => s.id), ["part-part-4", "part-part-1"]);
});

test("due vocabulary comes first and is the current stop", () => {
  const r = buildDailyRoadmap({ ...base, dueVocab: 35, partAccuracies: withAcc({ PART4: 0.1 }) });
  assert.equal(r.steps[0].id, "vocab");
  assert.equal(r.current?.id, "vocab");
});

test("ten answers today finish a Part stop and move the current stop on", () => {
  const r = buildDailyRoadmap({ ...base, partAccuracies: withAcc({ PART4: 0.1 }), todayPartAnswers: { PART4: 12 } });
  assert.equal(r.steps[0].status, "done");
  assert.equal(r.steps[0].progressLabel, "10/10 câu");
  assert.equal(r.current?.id, "test");
});

test("free accounts get a general Part stop", () => {
  const r = buildDailyRoadmap({ ...base, pro: false, partAccuracies: [] });
  assert.deepEqual(r.steps.map((s) => s.id), ["part-any", "test", "time", "finish"]);
});

test("everything done reaches the finish line", () => {
  const r = buildDailyRoadmap({
    ...base,
    partAccuracies: withAcc({ PART4: 0.1 }),
    todayPartAnswers: { PART4: 10 },
    attemptsToday: 1,
    todayMinutes: 45,
  });
  assert.equal(r.allDone, true);
  assert.equal(r.current, null);
  assert.equal(r.steps.at(-1)?.status, "done");
  assert.equal(r.minutesLeft, 0);
});
