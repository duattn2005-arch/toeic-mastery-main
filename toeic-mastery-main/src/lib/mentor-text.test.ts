import { test } from "node:test";
import assert from "node:assert/strict";
import { mentorTextSegments } from "./mentor-text";

const plain = (t: string) => mentorTextSegments(t).map((s) => (s.bold ? `<b>${s.text}</b>` : s.text)).join("");

test("chat: giữ in đậm, bỏ ký tự Markdown và thẻ nội bộ", () => {
  assert.equal(plain('vào trang **"Từ vựng"** hoặc **"Đã lưu"**'), 'vào trang <b>"Từ vựng"</b> hoặc <b>"Đã lưu"</b>');
  assert.equal(plain("chủ đề **[VOCABULARY_TOPIC] TOEIC 300+**"), "chủ đề <b>TOEIC 300+</b>");
  assert.equal(plain("## Mẹo\n* một\n- hai\n*nghiêng* và **dở"), "Mẹo\n• một\n• hai\nnghiêng và dở");
  assert.equal(plain("Xong.\n[[RECOMMEND_NEXT_STEPS]]"), "Xong.\n");
});

test("độ khó theo điểm mục tiêu", async () => {
  const { difficultyForTarget } = await import("./target-difficulty");
  assert.equal(difficultyForTarget(300), "EASY");
  assert.equal(difficultyForTarget(650), "MEDIUM");
  assert.equal(difficultyForTarget(940), "HARD");
  assert.equal(difficultyForTarget(null), null);
});
