import "server-only";
import { completeMentorTask } from "@/lib/services/mentor/llm-client";

/** Pulls the JSON value out of a model reply: tolerates a ```json fence or a
 * sentence before/after it; throws with a short preview when there is none. */
export function extractJson<T>(raw: string): T {
  const text = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
  try {
    return JSON.parse(text) as T;
  } catch {
    const start = text.search(/[[{]/);
    const end = Math.max(text.lastIndexOf("}"), text.lastIndexOf("]"));
    if (start !== -1 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1)) as T;
      } catch {
        // fall through to the error below
      }
    }
    throw new Error(`AI trả về JSON không hợp lệ. Nội dung nhận được: ${text.slice(0, 200)}`);
  }
}

/** One model call that must answer with JSON (same provider as AI Mentor). */
export async function askJson<T>(params: { system: string; prompt: string; maxTokens: number; timeoutMs: number }): Promise<T> {
  const raw = await completeMentorTask({
    system: params.system,
    messages: [{ role: "user", content: params.prompt }],
    maxTokens: params.maxTokens,
    timeoutMs: params.timeoutMs,
  });
  return extractJson<T>(raw);
}

/** Lower-cased, accent-free form for comparing keywords ("Từ vựng" ≈ "tu vung"). */
export function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function cleanStrings(value: unknown, max: number, maxLength = 300): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim().slice(0, maxLength))
    .filter(Boolean)
    .slice(0, max);
}

/** Cuts to `max` characters at a word boundary. */
export function clip(text: string, max: number) {
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return (space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[,;:\-–—\s]+$/, "");
}
