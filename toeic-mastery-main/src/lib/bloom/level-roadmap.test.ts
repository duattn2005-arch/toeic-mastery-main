import { test } from "node:test";
import assert from "node:assert/strict";
import { buildBloomProfile, frontierLevel, type BloomAttempt, type BloomProfile } from "./engine";
import { levelRoadmap, scorePct } from "./level-roadmap";
import { SCORED_LEVELS, type ScoredBloomLevel } from "./config";
import type { BloomLabelRow } from "./bank";

const NOW = Date.UTC(2026, 9, 30);
let seq = 0;

function att(over: Partial<BloomAttempt>): BloomAttempt {
  seq++;
  return {
    questionId: `q${seq}`,
    part: "PART5",
    knowledgeLabel: "grammar:a",
    bloomLevel: 2,
    isCorrect: true,
    selectedAnswer: "A",
    firstAnswer: "A",
    answerChanged: false,
    changedFromCorrectToWrong: false,
    timeSpentSec: 25,
    hintUsedCount: 0,
    trapTypeHit: null,
    revealedBeforeAnswer: false,
    explanationViewed: false,
    mode: "timed",
    timestamp: NOW - 86_400_000 + seq,
    source: "attempt",
    ...over,
  };
}

/** `right` correct answers out of `n`, on one label × level. */
const cell = (label: string, bloomLevel: ScoredBloomLevel, n: number, right: number, over: Partial<BloomAttempt> = {}) =>
  Array.from({ length: n }, (_, i) => att({ knowledgeLabel: label, bloomLevel, isCorrect: i < right, ...over }));

function rowsOf(profile: BloomProfile, bank: Record<string, ScoredBloomLevel[]> = {}): BloomLabelRow[] {
  return Object.entries(profile.heatmap).map(([label, row]) => {
    const seen = Object.keys(row).map(Number) as ScoredBloomLevel[];
    const available = [...new Set([...(bank[label] ?? []), ...seen])].sort((a, b) => a - b);
    return { label, kind: "grammar", key: label, title: label, available, frontier: frontierLevel(row, available), attempts: 1 };
  });
}

function roadmap(attempts: BloomAttempt[], level: ScoredBloomLevel, bank?: Record<string, ScoredBloomLevel[]>) {
  const profile = buildBloomProfile(attempts, NOW);
  return { profile, map: levelRoadmap(level, profile, rowsOf(profile, bank)) };
}

test("requirements all pass exactly when the engine calls the level mastered", () => {
  const cases: BloomAttempt[][] = [
    [],
    cell("grammar:a", 2, 10, 10),
    cell("grammar:a", 2, 15, 15),
    cell("grammar:a", 2, 15, 9),
    [...cell("grammar:a", 2, 20, 20), ...cell("grammar:b", 2, 15, 3)],
    [...cell("grammar:a", 5, 15, 15), ...cell("grammar:b", 4, 15, 15, { changedFromCorrectToWrong: true, isCorrect: false })],
    cell("grammar:a", 5, 20, 20, { answerChanged: true, changedFromCorrectToWrong: true }),
    cell("grammar:a", 3, 15, 15, { mode: "practice" }),
    cell("grammar:a", 3, 10, 10, { mode: "practice" }),
    Array.from({ length: 30 }, (_, i) => cell(`grammar:t${i}`, 2, 10, 9)).flat(),
    [...cell("grammar:a", 1, 5, 1), ...cell("grammar:a", 2, 20, 20)],
    [...cell("grammar:a", 3, 15, 15, { mode: "practice" }), ...cell("grammar:b", 3, 15, 15)],
  ];
  for (const attempts of cases) {
    const profile = buildBloomProfile(attempts, NOW);
    for (const level of SCORED_LEVELS) {
      const { requirements } = levelRoadmap(level, profile, rowsOf(profile));
      assert.equal(requirements.every((r) => r.ok), profile.levels[level].mastered, `level ${level}`);
    }
  }
});

test("tasks list worst blockers first and solid labels separately", () => {
  const { map } = roadmap(
    [
      ...cell("grammar:solid", 2, 15, 15),
      ...cell("grammar:yellow", 2, 15, 10),
      ...cell("grammar:red", 2, 15, 3),
      ...cell("grammar:grey", 2, 7, 7),
      ...cell("grammar:new", 3, 15, 15),
      ...cell("grammar:untried", 1, 3, 3),
    ],
    2,
    { "grammar:new": [2, 3], "grammar:untried": [2] }
  );
  assert.deepEqual(map.tasks.map((t) => [t.row.label, t.state]), [
    ["grammar:red", "red"],
    ["grammar:yellow", "yellow"],
    ["grammar:grey", "insufficient"],
    ["grammar:untried", "untried"],
  ]);
  assert.deepEqual(map.solid.map((s) => s.row.label), ["grammar:solid"]);
  assert.match(map.tasks[2].need, /Làm thêm 8 câu \(đã có 7\/15\)/);
});

test("a label held back by a lower level practises that level, and sorts after labels ready now", () => {
  const { map } = roadmap([...cell("grammar:held", 2, 15, 3), ...cell("grammar:held", 3, 15, 3), ...cell("grammar:ready", 3, 15, 9)], 3);
  assert.deepEqual(map.tasks.map((t) => [t.row.label, t.practiceLevel, t.blockedBy]), [
    ["grammar:ready", 3, null],
    ["grammar:held", 2, 2],
  ]);
});

test("a level inferred from a solid higher one passes on that single condition", () => {
  const { map, profile } = roadmap(cell("grammar:a", 2, 15, 15), 1, { "grammar:a": [1, 2] });
  assert.equal(profile.levels[1].inferredFrom, 2);
  assert.deepEqual(map.requirements.map((r) => r.ok), [true]);
  assert.match(map.requirements[0].label, /Suy ra từ Bậc 2/);
  assert.deepEqual(map.tasks, []);
});

test("labels the bank has no question for at this level are not listed", () => {
  const { map } = roadmap(cell("grammar:a", 2, 15, 3), 4);
  assert.deepEqual(map.tasks, []);
});

test("a level 3+ score capped for lack of timed work asks for timed work", () => {
  const { map } = roadmap(cell("grammar:a", 3, 15, 15, { mode: "practice" }), 3);
  assert.equal(map.tasks[0].needsTimed, true);
  assert.match(map.tasks[0].need, /tính giờ/);
});

test("a level 3+ can't be solid without timed work, but one short label doesn't hold back the level", () => {
  const untimed = buildBloomProfile(cell("grammar:a", 3, 15, 15, { mode: "practice" }), NOW);
  assert.equal(untimed.levels[3].mastered, false);
  assert.equal(untimed.levels[3].status, "yellow");
  assert.equal(untimed.tier.frontier, 1);
  assert.equal(levelRoadmap(3, untimed, rowsOf(untimed)).requirements.find((r) => /tính giờ/.test(r.label))?.ok, false);

  const mixed = buildBloomProfile([...cell("grammar:a", 3, 15, 15, { mode: "practice" }), ...cell("grammar:b", 3, 15, 15)], NOW);
  assert.equal(mixed.levels[3].mastered, true);

  const low = buildBloomProfile(cell("grammar:a", 2, 15, 15, { mode: "practice" }), NOW);
  assert.equal(low.levels[2].mastered, true);
});

test("scorePct never rounds a score up to a threshold it hasn't reached", () => {
  assert.equal(scorePct(0.796), "79%");
  assert.equal(scorePct(0.8), "80%");
  assert.equal(scorePct(0.29), "29%");
});
