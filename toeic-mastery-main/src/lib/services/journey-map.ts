import type { LearningDayStatus, TestPart } from "@/generated/prisma/enums";
import { MINI_TEST_EVERY_N_DAYS, isMiniTestDay } from "@/lib/constants/learning-path";

/**
 * Turns a LearningPath's days into the journey map's "chặng" (stages):
 * runs of MINI_TEST_EVERY_N_DAYS days, each ending on its checkpoint
 * mini-test — the "rương ôn tập" you have to pass to open the next stage.
 * Pure (no DB) so the dashboard card, the full map page and tests all
 * share it.
 */

export type JourneyKind = "grammar" | "listening" | "reading" | "chest";
/** `current` is the one day to do now; `open` is any other unlocked day
 * (rare — completing a day only ever unlocks the next one). */
export type JourneyDayState = "done" | "current" | "open" | "locked";
export type JourneyStageState = "done" | "current" | "locked";

export interface JourneyDayInput {
  dayNumber: number;
  /** YYYY-MM-DD */
  scheduledDate: string;
  focusParts: TestPart[];
  status: LearningDayStatus;
  itemsDone: number;
  itemsTotal: number;
}

export interface JourneyDay {
  dayNumber: number;
  date: string;
  focusParts: TestPart[];
  kind: JourneyKind;
  state: JourneyDayState;
  itemsDone: number;
  itemsTotal: number;
}

export interface JourneyStage {
  /** 1-based */
  number: number;
  firstDay: number;
  lastDay: number;
  title: string;
  state: JourneyStageState;
  days: JourneyDay[];
}

export const JOURNEY_KIND_LABEL: Record<JourneyKind, { long: string; short: string }> = {
  grammar: { long: "Ngữ pháp", short: "Ngữ pháp" },
  listening: { long: "Luyện nghe", short: "Nghe" },
  reading: { long: "Đọc hiểu", short: "Đọc" },
  chest: { long: "Rương ôn tập", short: "Ôn tập" },
};

/** The checkpoint mini-test's pass mark — MentorTest.passThreshold's
 * schema default (0.8), which is what a LearningPath MINI_TEST runs with. */
export const CHEST_PASS_PERCENT = 80;

const PART_TOPIC: Record<TestPart, string> = {
  PART1: "Mô tả tranh",
  PART2: "Hỏi – đáp",
  PART3: "Hội thoại",
  PART4: "Bài nói ngắn",
  PART5: "Ngữ pháp câu",
  PART6: "Điền đoạn văn",
  PART7: "Đọc hiểu",
};

/** Mirrors how buildDayItems (learning-path-generator.ts) reads a day:
 * the checkpoint day is the mini-test, and otherwise the first focus Part
 * decides what the day leads with (PART5/6 → a grammar lesson). */
/** Where a path day sits on the map — the map talks in "chặng · bước", not
 * calendar days: progress follows the learner (a step opens only once the
 * one before it is done, whenever that is), so a date would only ever be
 * a deadline nobody set. */
export function journeyStep(dayNumber: number): { stage: number; step: number } {
  return { stage: Math.ceil(dayNumber / MINI_TEST_EVERY_N_DAYS), step: ((dayNumber - 1) % MINI_TEST_EVERY_N_DAYS) + 1 };
}

export function journeyKind(dayNumber: number, focusParts: TestPart[]): JourneyKind {
  if (isMiniTestDay(dayNumber)) return "chest";
  const first = focusParts[0];
  if (first === "PART5" || first === "PART6") return "grammar";
  if (first === "PART7") return "reading";
  return "listening";
}

/** The stage's two most-practised topics, e.g. "Hội thoại & Ngữ pháp câu". */
function stageTitle(days: { focusParts: TestPart[] }[]): string {
  const counts = new Map<TestPart, number>();
  for (const day of days) for (const part of day.focusParts) counts.set(part, (counts.get(part) ?? 0) + 1);
  // Map keeps insertion order, and sort is stable — ties stay in first-seen order.
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2);
  return top.length > 0 ? top.map(([part]) => PART_TOPIC[part]).join(" & ") : "Ôn tổng hợp";
}

export function buildJourneyStages(input: JourneyDayInput[]): JourneyStage[] {
  const sorted = [...input].sort((a, b) => a.dayNumber - b.dayNumber);
  const firstOpen = sorted.find((d) => d.status === "UNLOCKED" || d.status === "IN_PROGRESS");

  const days: JourneyDay[] = sorted.map((d) => ({
    dayNumber: d.dayNumber,
    date: d.scheduledDate,
    focusParts: d.focusParts,
    kind: journeyKind(d.dayNumber, d.focusParts),
    state: d.status === "COMPLETED" ? "done" : d.status === "LOCKED" ? "locked" : d === firstOpen ? "current" : "open",
    itemsDone: d.itemsDone,
    itemsTotal: d.itemsTotal,
  }));

  const byStage = new Map<number, JourneyDay[]>();
  for (const day of days) {
    const n = journeyStep(day.dayNumber).stage;
    byStage.set(n, [...(byStage.get(n) ?? []), day]);
  }

  return [...byStage.entries()].map(([number, stageDays]) => {
    const state: JourneyStageState = stageDays.every((d) => d.state === "done")
      ? "done"
      : stageDays.every((d) => d.state === "locked")
        ? "locked"
        : "current";
    return {
      number,
      firstDay: stageDays[0].dayNumber,
      lastDay: stageDays[stageDays.length - 1].dayNumber,
      title: stageTitle(stageDays),
      state,
      days: stageDays,
    };
  });
}

/** The stage to show on the dashboard: the one holding today's day, else
 * the first unfinished one, else (whole path done) the last. */
export function currentStageIndex(stages: JourneyStage[]): number {
  const withCurrent = stages.findIndex((s) => s.days.some((d) => d.state === "current"));
  if (withCurrent !== -1) return withCurrent;
  const unfinished = stages.findIndex((s) => s.state !== "done");
  return unfinished !== -1 ? unfinished : Math.max(0, stages.length - 1);
}
