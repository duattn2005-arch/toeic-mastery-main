import "server-only";
import { db } from "@/lib/db";
import { Prisma } from "@/generated/prisma/client";
import { completeMentorTask, MentorConfigError } from "@/lib/services/mentor/llm-client";
import { STRATEGIC_LABELS } from "../../../../prisma/seed-data/strategic-labels";
import type { LabelMeta } from "./run";

/**
 * The second pass behind "every question is labelled": Part 5/6 questions
 * the rules (rules.ts) couldn't read are sent to the AI Mentor's LLM, which
 * reads the sentence, options and explanation and picks a grammar topic and
 * question-type labels from the same taxonomy.
 *
 *  - Only fills fields that are still empty — never overrides the rules or
 *    an admin. Admin saves clear labelMeta, so an edited question is asked
 *    again.
 *  - `labelMeta.ai` marks a question as asked (with the fields the AI set),
 *    so no question is sent twice; run.ts keeps those fields when the rules
 *    still find nothing.
 *  - Capped per run to stay inside free-tier quotas; the 30-minute stale
 *    pass works through any backlog. Without an LLM key it does nothing.
 */

const AI_BATCH = 15;
const AI_MAX_PER_RUN = 90;
const AI_TIMEOUT_MS = 60_000;
const PARTS = ["PART5", "PART6"] as const;

let aiRunning = false;

const ALLOWED_LABELS = new Map(PARTS.map((p) => [p, STRATEGIC_LABELS.filter((l) => l.appliesToParts.includes(p))]));

const SYSTEM_PROMPT =
  "Bạn là chuyên gia phân loại câu hỏi TOEIC chuẩn ETS. Chỉ trả lời bằng đúng JSON hợp lệ được yêu cầu — không markdown, không giải thích ngoài JSON.";

interface AiItem {
  i: number;
  grammar?: string | null;
  labels?: string[];
}

function parseItems(raw: string): AiItem[] | null {
  const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
  try {
    const parsed = JSON.parse(cleaned) as unknown;
    return Array.isArray(parsed) ? (parsed as AiItem[]) : null;
  } catch {
    return null;
  }
}

const cut = (s: string | null | undefined, n: number) => (s ?? "").replace(/\s+/g, " ").trim().slice(0, n);

/** @returns how many questions got at least one label from the AI. */
export async function runAiLabelling(opts: { ids?: string[] } = {}): Promise<number> {
  if (aiRunning) return 0;
  aiRunning = true;
  let labelled = 0;
  try {
    // Newest first, so what was just uploaded is read first.
    const ids = opts.ids ?? null;
    const pending = await db.$queryRaw<{ id: string }[]>`
      SELECT id::text AS id FROM questions
      WHERE part::text IN ('PART5', 'PART6')
        AND cardinality(strategic_label_slugs) = 0
        AND label_meta IS NOT NULL AND label_meta->'ai' IS NULL
        AND (${ids}::text[] IS NULL OR id::text = ANY(${ids}::text[]))
      ORDER BY created_at DESC
      LIMIT ${AI_MAX_PER_RUN}`;
    if (pending.length === 0) return 0;

    const topics = await db.grammarTopic.findMany({ select: { id: true, slug: true, title: true }, orderBy: { orderIndex: "asc" } });
    const topicId = new Map(topics.map((t) => [t.slug, t.id]));

    for (let start = 0; start < pending.length; start += AI_BATCH) {
      const batch = await db.question.findMany({
        where: { id: { in: pending.slice(start, start + AI_BATCH).map((p) => p.id) } },
        select: {
          id: true,
          part: true,
          prompt: true,
          correctLabel: true,
          explanationVi: true,
          grammarTopicSlug: true,
          strategicLabelSlugs: true,
          labelMeta: true,
          options: { select: { label: true, content: true }, orderBy: { label: "asc" } },
          passage: { select: { texts: true } },
        },
      });
      if (batch.length === 0) continue;

      const questionText = batch
        .map((q, i) => {
          const passage = Array.isArray(q.passage?.texts) ? (q.passage.texts as { content?: string }[]).map((t) => t.content ?? "").join(" ") : "";
          return [
            `#${i + 1} (${q.part})`,
            passage ? `Đoạn văn: ${cut(passage, 700)}` : null,
            `Câu: ${cut(q.prompt, 300)}`,
            `Lựa chọn: ${q.options.map((o) => `(${o.label}) ${cut(o.content, 120)}`).join("  ")}`,
            `Đáp án đúng: ${q.correctLabel}`,
            q.explanationVi ? `Lời giải: ${cut(q.explanationVi, 400)}` : null,
          ]
            .filter(Boolean)
            .join("\n");
        })
        .join("\n\n");
      const labelList = PARTS.map((p) => `${p}: ${ALLOWED_LABELS.get(p)!.map((l) => `${l.slug} (${l.title})`).join("; ")}`).join("\n");

      const prompt = `Phân loại ${batch.length} câu hỏi TOEIC dưới đây.
Với mỗi câu chọn:
- "grammar": slug chủ điểm ngữ pháp mà câu kiểm tra, hoặc null nếu là câu từ vựng (chọn nghĩa) chứ không phải ngữ pháp. Chỉ dùng các slug: ${topics.map((t) => `${t.slug} (${t.title})`).join("; ")}.
- "labels": 1–2 nhãn dạng câu, chỉ dùng nhãn đúng Part của câu:
${labelList}
Gợi ý: câu chọn từ khác nghĩa cùng từ loại → collocation-trap; các dạng của cùng một từ → word-form-distractor; câu ngữ pháp thuần → grammar-structure; chọn câu điền vào đoạn → sentence-insertion-logic; từ nối giữa các câu → connector-logic.

${questionText}

Trả về CHÍNH XÁC một mảng JSON, mỗi câu một phần tử:
[{"i": 1, "grammar": "slug hoặc null", "labels": ["..."]}]`;

      let items: AiItem[] | null;
      try {
        items = parseItems(await completeMentorTask({ system: SYSTEM_PROMPT, messages: [{ role: "user", content: prompt }], maxTokens: 200 + batch.length * 60, timeoutMs: AI_TIMEOUT_MS }));
      } catch (err) {
        if (err instanceof MentorConfigError) return labelled; // no LLM configured — rules only
        console.error("[tagging] AI batch failed", err);
        continue; // not marked as asked — the next run retries
      }
      if (!items) continue;

      const now = new Date().toISOString();
      const writes = batch.map((q, i) => {
        const item = items!.find((x) => Number(x?.i) === i + 1);
        const allowed = new Set(ALLOWED_LABELS.get(q.part as (typeof PARTS)[number])?.map((l) => l.slug) ?? []);
        const grammar = item?.grammar && topicId.has(item.grammar) && !q.grammarTopicSlug ? item.grammar : null;
        const labels = [...new Set((item?.labels ?? []).filter((l) => typeof l === "string" && allowed.has(l)))].slice(0, 2);

        const old = q.labelMeta as unknown as LabelMeta;
        const fields: LabelMeta["auto"] = [];
        const data: Prisma.QuestionUpdateInput = {};
        if (grammar) {
          data.grammarTopicSlug = grammar;
          data.grammarTopic = { connect: { id: topicId.get(grammar)! } };
          fields.push("grammar");
        }
        if (labels.length && q.strategicLabelSlugs.length === 0) {
          data.strategicLabelSlugs = labels;
          fields.push("strategy");
        }
        if (fields.length) labelled++;
        const meta: LabelMeta = {
          ...old,
          auto: [...new Set([...(old.auto ?? []), ...fields])],
          ai: { at: now, fields },
          at: now,
          reasons: [...(old.reasons ?? []), ...(fields.length ? [`AI đọc câu: ${[grammar, ...labels].filter(Boolean).join(", ")}`] : [])].slice(0, 8),
        };
        data.labelMeta = meta as unknown as Prisma.InputJsonValue;
        return db.question.update({ where: { id: q.id }, data, select: { id: true } });
      });
      await db.$transaction(writes);
    }
  } finally {
    aiRunning = false;
  }
  if (labelled) console.log(`[tagging] AI labelled ${labelled} question(s)`);
  return labelled;
}
