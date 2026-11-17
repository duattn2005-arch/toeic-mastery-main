import "server-only";
import { completeMentorTask } from "@/lib/services/mentor/llm-client";
import { foldVocabLines, normalizeIpa, normalizePartOfSpeech, type VocabRow } from "@/lib/vocab-import";

/**
 * AI help for the learner's word import (same LLM client AI Mentor uses):
 * filling in IPA + word type from the word *and the meaning the learner
 * gave* (so "favor — thiên vị" comes back a verb, not the noun a plain
 * dictionary lists first), and pulling a word list out of free text.
 * Nothing here ever overwrites what the learner typed — callers merge.
 */

/** The learner waits on these (the import dialog / the save button), and
 * free-tier Gemini latency runs well past completeMentorTask's 20s default. */
const AI_TIMEOUT_MS = 60_000;
const BATCH = 40;
export const MAX_AI_ROWS = 150;
export const MAX_AI_TEXT = 8_000;

const SYSTEM =
  "Bạn là giáo viên tiếng Anh luyện thi TOEIC cho người Việt. Chỉ trả lời bằng đúng JSON hợp lệ được yêu cầu — không markdown, không giải thích ngoài JSON.";

const TYPES = "n, v, adj, adv, prep, conj, pron, det, phr v (cụm động từ), phr (cụm từ), idiom";
const IPA_STYLE = 'IPA giọng Anh-Mỹ kiểu từ điển Cambridge, có dấu nhấn ˈ ˌ và dấu chấm tách âm tiết, bọc trong dấu /, ví dụ "/ˈfeɪ.vɚ/", "/kəmˈpækt/"';

function extractJson<T>(raw: string): T {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/, "")
    .trim();
  return JSON.parse(cleaned) as T;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** IPA + type for each word, keyed by lowercased word. Rows the model
 * skipped or garbled are simply missing from the map. */
export async function aiIpaAndType(items: { term: string; definition: string }[]): Promise<Map<string, { ipa: string; partOfSpeech: string }>> {
  const out = new Map<string, { ipa: string; partOfSpeech: string }>();
  for (let i = 0; i < items.length; i += BATCH) {
    const batch = items.slice(i, i + BATCH);
    const prompt = `Với mỗi từ/cụm từ tiếng Anh dưới đây (kèm nghĩa tiếng Việt người học đã ghi), cho:
- "ipa": ${IPA_STYLE}. Cụm từ thì phiên âm cả cụm.
- "type": loại từ KHỚP VỚI NGHĨA đã ghi (không phải loại phổ biến nhất của từ). Nếu nghĩa ghi nhiều loại như "(n) ...; (v) ..." thì liệt kê đủ, cách nhau dấu phẩy. Chỉ dùng: ${TYPES}.

Dữ liệu: ${JSON.stringify(batch.map((b) => ({ word: b.term, meaning: b.definition || null })))}

Trả về CHÍNH XÁC một mảng JSON cùng thứ tự, đủ ${batch.length} phần tử:
[{"word": "...", "ipa": "/.../", "type": "n"}]`;
    const raw = await completeMentorTask({ system: SYSTEM, messages: [{ role: "user", content: prompt }], maxTokens: 200 + batch.length * 50, timeoutMs: AI_TIMEOUT_MS });
    const parsed = extractJson<unknown[]>(raw);
    if (!Array.isArray(parsed)) continue;
    for (const item of parsed) {
      if (!item || typeof item !== "object") continue;
      const r = item as Record<string, unknown>;
      const word = str(r.word, 80).toLowerCase();
      if (!word) continue;
      out.set(word, { ipa: normalizeIpa(str(r.ipa, 80)), partOfSpeech: normalizePartOfSpeech(str(r.type, 40)) });
    }
  }
  return out;
}

/** Pulls the words a learner wants to study out of anything pasted — a
 * messy list, notes, a paragraph — with IPA, type, a Vietnamese meaning
 * (theirs if they wrote one) and their note (never invented). */
export async function aiExtractVocab(text: string): Promise<VocabRow[]> {
  const prompt = `Người học dán đoạn dưới đây (có thể là danh sách từ, bảng lộn xộn, ghi chép, hoặc một đoạn văn tiếng Anh). Hãy nhận diện các từ/cụm từ tiếng Anh họ cần học (tối đa ${MAX_AI_ROWS}; với đoạn văn thì chọn từ vựng đáng học cho TOEIC, bỏ từ quá cơ bản). Mỗi từ cho:
- "word": dạng gốc (động từ nguyên mẫu, danh từ số ít), giữ cụm từ nếu là cụm.
- "ipa": ${IPA_STYLE}.
- "type": một trong ${TYPES}; khớp với nghĩa.
- "meaning": nghĩa tiếng Việt — nếu người học đã ghi nghĩa thì giữ đúng nghĩa đó; nếu chưa có thì cho nghĩa phổ biến trong TOEIC, ngắn gọn.
- "note": ghi chú/từ liên quan người học đã tự ghi kèm từ đó (nếu có). Không tự bịa ghi chú — không có thì để "".
Một từ có nhiều loại/nghĩa khác nhau thì tách thành nhiều phần tử cùng "word".

Đoạn người học dán:
"""
${text}
"""

Trả về CHÍNH XÁC một mảng JSON:
[{"word": "...", "ipa": "/.../", "type": "n", "meaning": "...", "note": ""}]`;
  const raw = await completeMentorTask({ system: SYSTEM, messages: [{ role: "user", content: prompt }], maxTokens: 8000, timeoutMs: AI_TIMEOUT_MS });
  const parsed = extractJson<unknown[]>(raw);
  if (!Array.isArray(parsed)) return [];
  const lines = parsed.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const r = item as Record<string, unknown>;
    const term = str(r.word, 80);
    if (!term) return [];
    return [{ term, ipa: normalizeIpa(str(r.ipa, 80)), pos: normalizePartOfSpeech(str(r.type, 40)), definition: str(r.meaning, 300), note: str(r.note, 500) }];
  });
  return foldVocabLines(lines).slice(0, MAX_AI_ROWS);
}
