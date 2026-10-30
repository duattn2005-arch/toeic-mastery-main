import { test } from "node:test";
import assert from "node:assert/strict";
import { classifyBloom, classifyTraps, type BloomQuestionInput } from "./classify";

const q = (over: Partial<BloomQuestionInput>): BloomQuestionInput => ({
  part: "PART5",
  prompt: "",
  options: [
    { label: "A", content: "a" },
    { label: "B", content: "b" },
    { label: "C", content: "c" },
    { label: "D", content: "d" },
  ],
  correctLabel: "A",
  difficulty: "MEDIUM",
  grammarTopicSlug: null,
  strategicLabelSlugs: [],
  passageLayout: null,
  sourceText: null,
  ...over,
});

test("Part 5: vocabulary → 1, easy grammar → 2, contextual grammar → 3", () => {
  assert.equal(classifyBloom(q({ strategicLabelSlugs: ["collocation-trap"] })).level, 1);
  assert.equal(classifyBloom(q({ strategicLabelSlugs: ["collocation-trap"] })).knowledgeLabel, "vocab");
  assert.equal(classifyBloom(q({ grammarTopicSlug: "verb-tense", difficulty: "EASY" })).level, 2);
  const g = classifyBloom(q({ grammarTopicSlug: "verb-tense", difficulty: "HARD" }));
  assert.equal(g.level, 3);
  assert.equal(g.knowledgeLabel, "grammar:verb-tense");
});

test("Part 6: connector → 3, sentence insertion → 4", () => {
  assert.equal(classifyBloom(q({ part: "PART6", strategicLabelSlugs: ["connector-logic"], grammarTopicSlug: "conjunctions" })).level, 3);
  assert.equal(classifyBloom(q({ part: "PART6", strategicLabelSlugs: ["sentence-insertion-logic"] })).level, 4);
});

test("Part 1/2 basic → 2, indirect response → 4", () => {
  assert.equal(classifyBloom(q({ part: "PART1", strategicLabelSlugs: ["photo-action"] })).level, 2);
  assert.equal(classifyBloom(q({ part: "PART2", strategicLabelSlugs: ["wh-question"] })).level, 2);
  assert.equal(classifyBloom(q({ part: "PART2", strategicLabelSlugs: ["wh-question", "indirect-response"] })).level, 4);
});

test("Part 3/4/7: detail 2–3, main idea 3, inference/NOT/double 4, speaker meaning 5; highest label wins", () => {
  assert.equal(classifyBloom(q({ part: "PART3", strategicLabelSlugs: ["detail-listening"], difficulty: "EASY" })).level, 2);
  assert.equal(classifyBloom(q({ part: "PART3", strategicLabelSlugs: ["detail-listening"] })).level, 3);
  assert.equal(classifyBloom(q({ part: "PART3", strategicLabelSlugs: ["main-topic-listening"] })).level, 3);
  assert.equal(classifyBloom(q({ part: "PART7", strategicLabelSlugs: ["not-stated"] })).level, 4);
  assert.equal(classifyBloom(q({ part: "PART7", strategicLabelSlugs: ["detail-reading"], passageLayout: "TRIPLE" })).level, 4);
  const m = classifyBloom(q({ part: "PART4", strategicLabelSlugs: ["detail-listening", "implied-meaning"] }));
  assert.equal(m.level, 5);
  assert.equal(m.knowledgeLabel, "strategy:implied-meaning");
});

test("≥2 distractors lifted from the passage push a level-3+ question to 5", () => {
  const traps = { A: null, B: "same_word_trap" as const, C: "paraphrase_miss" as const, D: null };
  assert.equal(classifyBloom(q({ part: "PART7", strategicLabelSlugs: ["inference"] }), traps).level, 5);
  // a plain detail question is not upgraded
  assert.equal(classifyBloom(q({ part: "PART7", strategicLabelSlugs: ["detail-reading"], difficulty: "EASY" }), traps).level, 2);
});

test("traps: Part 5 word family vs meaning; Part 2 repeated word; Part 7 not stated", () => {
  const p5 = classifyTraps(
    q({
      options: [
        { label: "A", content: "decision" },
        { label: "B", content: "decide" },
        { label: "C", content: "choice" },
        { label: "D", content: "decisive" },
      ],
    })
  );
  assert.equal(p5.A, null);
  assert.equal(p5.B, "grammatically_plausible");
  assert.equal(p5.C, "similar_meaning");

  const p2 = classifyTraps(
    q({
      part: "PART2",
      prompt: "Where is the marketing report?",
      options: [
        { label: "A", content: "It's on your desk." },
        { label: "B", content: "The marketing team is busy." },
        { label: "C", content: "Yesterday afternoon." },
      ],
    })
  );
  assert.equal(p2.B, "same_word_trap");

  const p7 = classifyTraps(
    q({
      part: "PART7",
      prompt: "What will happen on Friday?",
      sourceText: "The office renovation begins on Friday, so staff will work from home.",
      options: [
        { label: "A", content: "Employees will work remotely." },
        { label: "B", content: "The office renovation will finish." },
        { label: "C", content: "A new manager will be hired." },
        { label: "D", content: "Staff will attend training." },
      ],
    })
  );
  assert.equal(p7.A, null);
  assert.equal(p7.C, "not_stated");
  assert.equal(p7.B, "paraphrase_miss");
});
