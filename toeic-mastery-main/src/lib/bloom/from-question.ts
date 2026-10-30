/**
 * Cầu nối câu hỏi trong DB → đầu vào của classify.ts (thuần, không import
 * Prisma — chỉ nhận đúng các trường cần).
 */
import type { ScoredBloomLevel } from "./config";
import { classifyBloom, type BloomQuestionInput, type QuestionPart } from "./classify";

export interface QuestionForBloom {
  part: string;
  prompt: string | null;
  correctLabel: string;
  difficulty: string;
  grammarTopicSlug: string | null;
  strategicLabelSlugs: string[];
  transcript?: string | null;
  bloomLevel?: number | null;
  options?: { label: string; content: string }[];
  passage?: { layout?: string | null; transcript?: string | null; texts?: unknown } | null;
}

/** Nội dung bài nghe / đoạn văn để so đáp án nhiễu với bài. */
export function sourceTextOf(q: QuestionForBloom): string | null {
  const texts = Array.isArray(q.passage?.texts) ? (q.passage!.texts as { content?: unknown }[]).map((t) => (typeof t?.content === "string" ? t.content : "")).join("\n") : "";
  const parts = [q.transcript, q.passage?.transcript, texts].filter((x): x is string => !!x && x.trim().length > 0);
  return parts.length ? parts.join("\n") : null;
}

export function bloomInputOf(q: QuestionForBloom): BloomQuestionInput {
  const layout = q.passage?.layout;
  return {
    part: q.part as QuestionPart,
    prompt: q.prompt ?? "",
    options: q.options ?? [],
    correctLabel: q.correctLabel,
    difficulty: (q.difficulty as BloomQuestionInput["difficulty"]) ?? "MEDIUM",
    grammarTopicSlug: q.grammarTopicSlug,
    strategicLabelSlugs: q.strategicLabelSlugs,
    passageLayout: layout === "DOUBLE" || layout === "TRIPLE" || layout === "SINGLE" ? layout : null,
    sourceText: sourceTextOf(q),
  };
}

const isLevel = (n: number | null | undefined): n is ScoredBloomLevel => n === 1 || n === 2 || n === 3 || n === 4 || n === 5;

/**
 * Bậc và nhãn chính của một câu cho bộ chưng cất: bậc đã lưu (tự động hoặc
 * admin duyệt) được ưu tiên; câu chưa gắn thì suy ra ngay bằng luật.
 */
export function bloomOfQuestion(q: QuestionForBloom): { level: ScoredBloomLevel; knowledgeLabel: string } {
  const c = classifyBloom(bloomInputOf(q));
  return { level: isLevel(q.bloomLevel) ? q.bloomLevel : c.level, knowledgeLabel: c.knowledgeLabel };
}
