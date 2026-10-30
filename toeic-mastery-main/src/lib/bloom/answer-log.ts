import "server-only";
import { db } from "@/lib/db";
import { TRAP_TYPE_CODES, type TrapType } from "./config";
import { bloomOfQuestion, type QuestionForBloom } from "./from-question";

/**
 * Ghi các tín hiệu Bloom của một lần trả lời (dùng chung cho bài làm thường,
 * bài kiểm tra Mentor và bài luyện nhanh) — một chỗ duy nhất quyết định
 * bậc được chụp lại và đáp án nhiễu đã dính.
 */

const isTrap = (t: string | null | undefined): t is TrapType => !!t && (TRAP_TYPE_CODES as string[]).includes(t);

export type QuestionForSnapshot = QuestionForBloom & { options: { label: string; content: string; trapType?: string | null }[] };

/** Ảnh chụp lúc chấm: bậc Bloom của câu và mã bẫy của đáp án sai đã chọn. */
export function answerSnapshot(q: QuestionForSnapshot, selectedLabel: string | null): { bloomLevel: number; trapTypeHit: TrapType | null } {
  const { level } = bloomOfQuestion(q);
  if (!selectedLabel || selectedLabel === q.correctLabel) return { bloomLevel: level, trapTypeHit: null };
  const options: { label: string; trapType?: string | null }[] = q.options;
  const trap = options.find((o) => o.label === selectedLabel)?.trapType;
  return { bloomLevel: level, trapTypeHit: isTrap(trap) ? trap : null };
}

/** Các trường câu hỏi cần cho answerSnapshot (select của Prisma). */
export const SNAPSHOT_QUESTION_SELECT = {
  part: true,
  prompt: true,
  correctLabel: true,
  difficulty: true,
  grammarTopicSlug: true,
  strategicLabelSlugs: true,
  transcript: true,
  bloomLevel: true,
  options: { select: { label: true, content: true, trapType: true } },
  passage: { select: { layout: true, transcript: true, texts: true } },
} as const;

const LABEL = /^[A-D]$/;

/**
 * Xem đáp án/giải thích của một câu. Lưu thời điểm xem LẦN ĐẦU, và nếu
 * client báo đã chọn sẵn một đáp án mà server chưa kịp đồng bộ, ghi nhận
 * lựa chọn đó TRƯỚC thời điểm xem — để bộ chưng cất không nhầm là “xem
 * đáp án rồi mới chọn”.
 */
export async function recordExplanationView(attemptId: string, questionId: string, picked: string | null, inProgress: boolean): Promise<void> {
  const now = new Date();
  const existing = await db.attemptAnswer.findUnique({
    where: { attemptId_questionId: { attemptId, questionId } },
    select: { firstAnsweredAt: true, initialSelectedLabel: true, explanationViewedAt: true },
  });
  const pickedLabel = inProgress && picked && LABEL.test(picked) ? picked : null;
  const answeredFirst = pickedLabel && !existing?.firstAnsweredAt ? new Date(now.getTime() - 1) : null;

  await db.attemptAnswer.upsert({
    where: { attemptId_questionId: { attemptId, questionId } },
    create: {
      attemptId,
      questionId,
      explanationViewedAt: now,
      ...(pickedLabel ? { selectedLabel: pickedLabel, initialSelectedLabel: pickedLabel, firstAnsweredAt: answeredFirst, answeredAt: answeredFirst } : {}),
    },
    update: {
      ...(existing?.explanationViewedAt ? {} : { explanationViewedAt: now }),
      ...(answeredFirst ? { firstAnsweredAt: answeredFirst, initialSelectedLabel: existing?.initialSelectedLabel ?? pickedLabel } : {}),
    },
  });
}

/** Mở gợi ý bước `step` — giữ số bước cao nhất đã mở (mở lại không tính thêm). */
export async function recordHintUse(attemptId: string, questionId: string, step: number): Promise<void> {
  const existing = await db.attemptAnswer.findUnique({ where: { attemptId_questionId: { attemptId, questionId } }, select: { hintUsedCount: true } });
  if (existing && existing.hintUsedCount >= step) return;
  await db.attemptAnswer.upsert({
    where: { attemptId_questionId: { attemptId, questionId } },
    create: { attemptId, questionId, hintUsedCount: step },
    update: { hintUsedCount: step },
  });
}
