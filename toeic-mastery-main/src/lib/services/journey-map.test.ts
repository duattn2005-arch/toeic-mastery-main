import { test } from "node:test";
import assert from "node:assert/strict";
import { buildJourneyStages, currentStageIndex, journeyKind, type JourneyDayInput } from "./journey-map";
import type { LearningDayStatus, TestPart } from "@/generated/prisma/enums";

const day = (dayNumber: number, status: LearningDayStatus, focusParts: TestPart[] = ["PART3", "PART4"]): JourneyDayInput => ({
  dayNumber,
  scheduledDate: `2026-11-${String(16 + dayNumber).padStart(2, "0")}`,
  focusParts,
  status,
  itemsDone: status === "COMPLETED" ? 3 : 0,
  itemsTotal: 3,
});

test("every 5th day is the review chest; otherwise the first focus Part decides the kind", () => {
  assert.equal(journeyKind(5, ["PART1"]), "chest");
  assert.equal(journeyKind(10, ["PART5"]), "chest");
  assert.equal(journeyKind(1, ["PART5", "PART3"]), "grammar");
  assert.equal(journeyKind(2, ["PART6"]), "grammar");
  assert.equal(journeyKind(3, ["PART7"]), "reading");
  assert.equal(journeyKind(4, ["PART2", "PART7"]), "listening");
});

test("days are grouped into 5-day stages, the last one partial", () => {
  const stages = buildJourneyStages(Array.from({ length: 12 }, (_, i) => day(i + 1, i === 0 ? "UNLOCKED" : "LOCKED")));
  assert.deepEqual(
    stages.map((s) => [s.number, s.firstDay, s.lastDay, s.days.length]),
    [
      [1, 1, 5, 5],
      [2, 6, 10, 5],
      [3, 11, 12, 2],
    ],
  );
});

test("stage and day states follow the path's lock state", () => {
  const input = [
    ...[1, 2, 3, 4, 5].map((n) => day(n, "COMPLETED")),
    day(6, "IN_PROGRESS"),
    ...[7, 8, 9, 10, 11].map((n) => day(n, "LOCKED")),
  ];
  const stages = buildJourneyStages(input);
  assert.deepEqual(
    stages.map((s) => s.state),
    ["done", "current", "locked"],
  );
  assert.equal(stages[1].days[0].state, "current");
  assert.equal(stages[1].days[1].state, "locked");
  assert.equal(currentStageIndex(stages), 1);
});

test("only the first unlocked day is current", () => {
  const stages = buildJourneyStages([day(1, "UNLOCKED"), day(2, "UNLOCKED"), day(3, "LOCKED")]);
  assert.deepEqual(
    stages[0].days.map((d) => d.state),
    ["current", "open", "locked"],
  );
});

test("the stage title names its two most-practised topics", () => {
  const stages = buildJourneyStages([
    day(1, "UNLOCKED", ["PART3", "PART5"]),
    day(2, "LOCKED", ["PART3", "PART7"]),
    day(3, "LOCKED", ["PART5", "PART3"]),
  ]);
  assert.equal(stages[0].title, "Hội thoại & Ngữ pháp câu");
});

test("a finished path shows its last stage", () => {
  const stages = buildJourneyStages([1, 2, 3, 4, 5, 6].map((n) => day(n, "COMPLETED")));
  assert.equal(currentStageIndex(stages), 1);
});
