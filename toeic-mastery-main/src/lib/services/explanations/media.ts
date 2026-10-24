import "server-only";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { assertPublicUrl } from "@/lib/services/seo/safe-fetch";

/** Gemini takes at most ~20MB of inline data per request. */
const MAX_BYTES = 15 * 1024 * 1024;

const MIME_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  mp3: "audio/mp3",
  mpeg: "audio/mpeg",
  wav: "audio/wav",
  m4a: "audio/mp4",
  mp4: "audio/mp4",
  aac: "audio/aac",
  ogg: "audio/ogg",
  flac: "audio/flac",
};

export interface MediaFile {
  mimeType: string;
  data: string;
}

function mimeOf(url: string, header?: string | null) {
  const ext = url.split("?")[0].split(".").pop()?.toLowerCase() ?? "";
  return MIME_BY_EXT[ext] ?? (header && /^(image|audio)\//.test(header) ? header.split(";")[0] : null);
}

/** Our own upload URL → the file on disk (no HTTP round trip). */
function localPath(url: string) {
  const dir = process.env.UPLOADS_DIR;
  const base = process.env.NEXT_PUBLIC_UPLOADS_URL?.replace(/\/$/, "");
  if (!dir || !base || !url.startsWith(`${base}/`)) return null;
  const rel = decodeURIComponent(url.slice(base.length + 1));
  const full = path.resolve(dir, rel);
  return full.startsWith(path.resolve(dir) + path.sep) ? full : null;
}

/** Loads an uploaded image/audio file as base64 for the model. Our own
 * uploads are read from disk; other https URLs (e.g. a CDN) are fetched.
 * Throws with a readable message when the file can't be used. */
export async function loadMedia(url: string): Promise<MediaFile> {
  const file = localPath(url);
  if (file) {
    const info = await stat(file).catch(() => null);
    if (!info) throw new Error(`Không tìm thấy file ${url}`);
    if (info.size > MAX_BYTES) throw new Error(`File quá lớn để gửi cho AI (${Math.round(info.size / 1e6)}MB): ${url}`);
    const mimeType = mimeOf(url);
    if (!mimeType) throw new Error(`Không rõ loại file: ${url}`);
    return { mimeType, data: (await readFile(file)).toString("base64") };
  }

  let parsed: URL;
  try {
    parsed = new URL(url, process.env.NEXT_PUBLIC_SITE_URL);
  } catch {
    throw new Error(`Đường dẫn file không hợp lệ: ${url}`);
  }
  if (parsed.protocol !== "https:") throw new Error(`Chỉ tải được file qua https: ${url}`);
  await assertPublicUrl(parsed.toString());
  const res = await fetch(parsed, { redirect: "error", signal: AbortSignal.timeout(30_000) });
  if (!res.ok) throw new Error(`Không tải được file (${res.status}): ${url}`);
  const mimeType = mimeOf(url, res.headers.get("content-type"));
  if (!mimeType) throw new Error(`Không rõ loại file: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > MAX_BYTES) throw new Error(`File quá lớn để gửi cho AI (${Math.round(buf.length / 1e6)}MB): ${url}`);
  return { mimeType, data: buf.toString("base64") };
}
