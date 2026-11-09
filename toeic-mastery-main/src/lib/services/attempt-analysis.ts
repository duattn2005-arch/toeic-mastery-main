import { PART_STANDARD_SECONDS, TRAP_TYPES, type TrapType } from "@/lib/bloom/config";
import { PART_META, TEST_PARTS } from "@/lib/constants/toeic";
import type { TestPart } from "@/generated/prisma/enums";

export type AnsweredQuestion = {
  part: TestPart;
  selectedLabel: string | null;
  correctLabel: string;
  isCorrect: boolean;
  isFlagged: boolean;
  initialSelectedLabel: string | null;
  hintUsedCount: number;
  timeSpentSec: number;
  trapTypeHit: string | null;
  grammarTopicSlug: string | null;
};

export type LossCause = "skipped" | "flipped" | "trap" | "rushed" | "overtime" | "other";

const CAUSES: Record<LossCause, { label: string; tip: string }> = {
  skipped: { label: "Bỏ qua", tip: "TOEIC không trừ điểm câu sai, nên hãy luôn chọn một đáp án." },
  flipped: { label: "Đổi đúng thành sai", tip: "Chỉ đổi đáp án khi tìm được bằng chứng rõ ràng trong bài." },
  trap: { label: "Dính bẫy", tip: "Đối chiếu lại với bài trước khi chọn đáp án có vẻ quen." },
  rushed: { label: "Làm quá nhanh", tip: "Thời gian chưa tới một nửa mức chuẩn. Đọc hết câu hỏi và các đáp án rồi mới chọn." },
  overtime: { label: "Làm lâu vẫn sai", tip: "Câu này tốn hơn 1,5 lần mức chuẩn. Đặt giới hạn, chọn đáp án tốt nhất rồi đi tiếp." },
  other: { label: "Cần ôn lại kiến thức", tip: "Đọc lời giải, rồi lưu từ vựng hoặc cấu trúc bạn chưa chắc." },
};

/** Reading Parts only: Listening is paced by the recording, so its time says nothing about the learner. */
const targetSeconds = (part: TestPart) => PART_STANDARD_SECONDS[part];

const knownTrap = (code: string | null) => (code && code in TRAP_TYPES ? TRAP_TYPES[code as TrapType] : null);

/** One cause per lost question, most specific first, so the causes add up to the questions lost. */
export function lossCause(a: AnsweredQuestion): LossCause | null {
  if (a.isCorrect) return null;
  if (!a.selectedLabel) return "skipped";
  if (a.initialSelectedLabel === a.correctLabel) return "flipped";
  if (knownTrap(a.trapTypeHit)) return "trap";
  const target = targetSeconds(a.part);
  // 0 means no timing was recorded (older attempts), not an instant answer.
  if (target && a.timeSpentSec > 0) {
    if (a.timeSpentSec < target * 0.5) return "rushed";
    if (a.timeSpentSec >= target * 1.5) return "overtime";
  }
  return "other";
}

export function answerInsight(a: AnsweredQuestion) {
  const cause = lossCause(a);
  const trap = cause === "trap" ? knownTrap(a.trapTypeHit) : null;
  return {
    label: cause && (trap?.nameVi ?? CAUSES[cause].label),
    tip: cause && (trap?.description ?? CAUSES[cause].tip),
    timeSpentSec: a.timeSpentSec,
    targetSec: targetSeconds(a.part),
    changedFrom: a.initialSelectedLabel && a.selectedLabel && a.initialSelectedLabel !== a.selectedLabel ? a.initialSelectedLabel : null,
  };
}

export function analyzeAttempt(answers: AnsweredQuestion[]) {
  const causeCounts = new Map<LossCause, number>();
  const trapCounts = new Map<TrapType, number>();
  const topicCounts = new Map<string, { correct: number; total: number }>();
  const lostByPart = new Map<TestPart, number>();
  const changes = { toCorrect: 0, toWrong: 0, wrongToWrong: 0 };
  const flagged = { correct: 0, total: 0 };
  let hintedCorrect = 0;

  for (const a of answers) {
    const cause = lossCause(a);
    if (cause) {
      causeCounts.set(cause, (causeCounts.get(cause) ?? 0) + 1);
      lostByPart.set(a.part, (lostByPart.get(a.part) ?? 0) + 1);
    }
    // Counted whatever the cause: a flipped answer can land on a trap too.
    if (knownTrap(a.trapTypeHit)) trapCounts.set(a.trapTypeHit as TrapType, (trapCounts.get(a.trapTypeHit as TrapType) ?? 0) + 1);

    if (a.initialSelectedLabel && a.selectedLabel && a.initialSelectedLabel !== a.selectedLabel) {
      if (a.isCorrect) changes.toCorrect += 1;
      else if (a.initialSelectedLabel === a.correctLabel) changes.toWrong += 1;
      else changes.wrongToWrong += 1;
    }
    if (a.isCorrect && a.hintUsedCount > 0) hintedCorrect += 1;
    if (a.isFlagged) {
      flagged.total += 1;
      if (a.isCorrect) flagged.correct += 1;
    }
    if (a.grammarTopicSlug) {
      const topic = topicCounts.get(a.grammarTopicSlug) ?? { correct: 0, total: 0 };
      topic.total += 1;
      if (a.isCorrect) topic.correct += 1;
      topicCounts.set(a.grammarTopicSlug, topic);
    }
  }

  const causes = [...causeCounts]
    .map(([cause, count]) => ({ cause, count, ...CAUSES[cause] }))
    .sort((x, y) => y.count - x.count);

  const traps = [...trapCounts]
    .map(([code, count]) => ({ code, count, ...TRAP_TYPES[code] }))
    .sort((x, y) => y.count - x.count)
    .slice(0, 3);

  // One question says little about a topic, so a topic needs two before it's called weak.
  const topics = [...topicCounts]
    .map(([slug, t]) => ({ slug, ...t }))
    .filter((t) => t.total >= 2 && t.correct < t.total)
    .sort((x, y) => y.total - y.correct - (x.total - x.correct))
    .slice(0, 4);

  const pacing = TEST_PARTS.flatMap((part) => {
    const target = targetSeconds(part);
    const timed = answers.filter((a) => a.part === part && a.selectedLabel && a.timeSpentSec > 0);
    if (!target || timed.length === 0) return [];
    return [{ part, targetSec: target, avgSec: Math.round(timed.reduce((sum, a) => sum + a.timeSpentSec, 0) / timed.length) }];
  });

  return { headline: headline(answers.length, causes, lostByPart), causes, changes, flagged, hintedCorrect, traps, topics, pacing };
}

function headline(total: number, causes: { cause: LossCause; count: number; label: string }[], lostByPart: Map<TestPart, number>) {
  const lost = causes.reduce((sum, c) => sum + c.count, 0);
  if (lost === 0) return `Bạn trả lời đúng cả ${total} câu.`;

  const worst = [...lostByPart].sort((x, y) => y[1] - x[1])[0];
  const where = lostByPart.size > 1 ? `, nhiều nhất ở ${PART_META[worst[0]].shortLabel} (${worst[1]} câu)` : "";
  // "other" means no clear signal, so it never headlines when a real cause exists.
  const top = causes.find((c) => c.cause !== "other");
  return `Bạn mất ${lost} câu${where}.${top ? ` Lý do gặp nhiều nhất: ${top.label.toLowerCase()} (${top.count} câu).` : ""}`;
}

export type AttemptAnalysis = ReturnType<typeof analyzeAttempt>;
