import { test } from "node:test";
import assert from "node:assert/strict";
import { buildHint, type HintInput } from "./hints";

const base = (over: Partial<HintInput>): HintInput => ({
  part: "PART5",
  prompt: "",
  options: [],
  correctLabel: "A",
  difficulty: "MEDIUM",
  grammarTopicSlug: null,
  strategicLabelSlugs: [],
  passageLayout: null,
  sourceText: null,
  evidenceText: null,
  ...over,
});

test("step 1 names the question type and thinking level", () => {
  const h = buildHint(base({ grammarTopicSlug: "verb-tense", grammarTopicTitle: "Thì động từ" }), 1);
  assert.match(h, /Thì động từ/);
  assert.match(h, /bậc tư duy 3 \(Vận dụng\)/);
});

test("Part 5 step 2 shows the words around the blank, never the answer", () => {
  const q = base({
    prompt: "The manager ______ the report before the meeting yesterday.",
    options: [
      { label: "A", content: "reviewed" },
      { label: "B", content: "reviews" },
    ],
  });
  const h = buildHint(q, 2);
  assert.match(h, /The manager ____ the report/);
  assert.doesNotMatch(h, /reviewed/);
});

test("reading step 2 points at the evidence but drops it when it quotes the answer", () => {
  const q = base({
    part: "PART7",
    prompt: "When will the renovation begin?",
    options: [
      { label: "A", content: "on Friday" },
      { label: "B", content: "next month" },
    ],
    strategicLabelSlugs: ["detail-reading"],
    sourceText: "Staff will work from home. The renovation begins on Friday morning.",
    evidenceText: "The renovation begins on Friday morning.",
  });
  const h = buildHint(q, 2);
  assert.doesNotMatch(h, /on friday/i);
});

test("reading step 2 quotes the most relevant sentence when it doesn't give the answer away", () => {
  const q = base({
    part: "PART7",
    prompt: "Why are staff working from home?",
    options: [
      { label: "A", content: "The office is being renovated." },
      { label: "B", content: "A holiday is coming." },
    ],
    strategicLabelSlugs: ["detail-reading"],
    sourceText: "Due to building work, staff are working from home this week. Lunch is provided on Friday.",
  });
  assert.match(buildHint(q, 2), /building work/);
});
