"use server";

import { getCurrentProfile } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { aiExtractVocab, MAX_AI_ROWS, MAX_AI_TEXT } from "@/lib/services/vocab-ai";
import { fillMissingVocabDetails, type VocabFillRow } from "@/lib/services/vocab-fill";

/** AI calls per learner per hour, shared by both actions — generous for a
 * person importing word lists, a hard stop for anything scripted. */
const AI_CALLS_PER_HOUR = 30;

function aiAllowed(userId: string) {
  return rateLimit(`vocab-ai:${userId}`, AI_CALLS_PER_HOUR, 60 * 60 * 1000).ok;
}

const clean = (rows: VocabFillRow[]): VocabFillRow[] =>
  rows
    .slice(0, MAX_AI_ROWS)
    .map((r) => ({
      term: String(r.term ?? "").trim().slice(0, 120),
      definition: String(r.definition ?? "").trim().slice(0, 500),
      ipa: String(r.ipa ?? "").trim().slice(0, 120),
      partOfSpeech: String(r.partOfSpeech ?? "").trim().slice(0, 40),
      note: String(r.note ?? "").trim().slice(0, 1000),
    }))
    .filter((r) => r.term);

/** "Tự điền phiên âm & loại từ" — fills the empty cells of the cards in the
 * add-words dialog so the learner sees (and can fix) them before saving. */
export async function fillVocabDetailsAction(rows: VocabFillRow[]): Promise<{ rows?: VocabFillRow[]; filled?: number; error?: string }> {
  const profile = await getCurrentProfile();
  if (!profile) return { error: "Vui lòng đăng nhập" };
  if (!aiAllowed(profile.id)) return { error: "Bạn dùng AI hơi nhiều rồi — thử lại sau ít phút nhé." };

  const result = await fillMissingVocabDetails(clean(rows));
  if (result.aiFailed && result.filled === 0) return { error: "AI đang bận, chưa điền được — thử lại sau ít phút." };
  return { rows: result.rows, filled: result.filled };
}

/** "AI nhận diện" — any pasted text in, a word list (word, IPA, type,
 * meaning, note) out, for the learner to review before importing. */
export async function aiExtractVocabAction(text: string): Promise<{ rows?: VocabFillRow[]; error?: string }> {
  const profile = await getCurrentProfile();
  if (!profile) return { error: "Vui lòng đăng nhập" };
  const input = String(text ?? "").trim();
  if (!input) return { error: "Dán nội dung cần nhận diện trước nhé" };
  if (input.length > MAX_AI_TEXT) return { error: `Đoạn dán dài quá — tối đa ${MAX_AI_TEXT.toLocaleString("vi-VN")} ký tự mỗi lần.` };
  if (!aiAllowed(profile.id)) return { error: "Bạn dùng AI hơi nhiều rồi — thử lại sau ít phút nhé." };

  try {
    const rows = await aiExtractVocab(input);
    if (rows.length === 0) return { error: "AI không tìm thấy từ tiếng Anh nào trong đoạn này." };
    return { rows: rows.map((r) => ({ term: r.term, definition: r.definition, ipa: r.ipa, partOfSpeech: r.partOfSpeech, note: r.note })) };
  } catch (err) {
    console.error("vocab AI extract failed", err);
    return { error: "AI đang bận hoặc trả kết quả lỗi — thử lại sau ít phút." };
  }
}
