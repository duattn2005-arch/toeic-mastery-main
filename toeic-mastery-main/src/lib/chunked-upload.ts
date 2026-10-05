import { UPLOAD_CHUNK_SIZE_BYTES, type QuestionMediaKind } from "@/lib/upload-kinds";

const MAX_ATTEMPTS_PER_CHUNK = 4;

/** Turns a failed response into a message an admin can act on — Nginx and
 * gateway errors come back as HTML, so `error` from JSON isn't always there. */
async function describeFailure(res: Response): Promise<string> {
  const data = (await res.json().catch(() => null)) as { error?: string } | null;
  if (data?.error) return data.error;
  if (res.status === 413) return "Máy chủ từ chối vì dữ liệu quá lớn (413)";
  if (res.status === 502 || res.status === 503 || res.status === 504) return `Máy chủ đang bận hoặc phản hồi quá lâu (${res.status}), vui lòng thử lại`;
  return `Tải file thất bại (mã ${res.status})`;
}

/** 4xx (except 408/429) won't fix itself on retry — bad input or no access. */
function isRetryable(status: number) {
  return status >= 500 || status === 408 || status === 429;
}

class NonRetryableUploadError extends Error {}

async function sendChunk(uploadId: string, index: number, blob: Blob) {
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS_PER_CHUNK; attempt++) {
    try {
      const res = await fetch(`/api/upload/question-media/chunk?uploadId=${uploadId}&index=${index}`, {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: blob,
      });
      if (res.ok) return;
      const message = await describeFailure(res);
      if (!isRetryable(res.status)) throw new NonRetryableUploadError(message);
      lastError = new Error(message);
    } catch (err) {
      if (err instanceof NonRetryableUploadError) throw err;
      // Network drop — fall through to retry.
      lastError = err instanceof Error && err.message !== "Failed to fetch" ? err : new Error("Mất kết nối khi đang tải lên");
    }
    await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
  }
  throw lastError instanceof Error ? lastError : new Error("Tải file thất bại");
}

/**
 * Uploads a file as a series of small requests (see upload-kinds.ts's
 * UPLOAD_CHUNK_SIZE_BYTES) with per-chunk retries, then asks the server to
 * stitch them together. Returns the public URL. `onProgress` gets 0–100.
 */
export async function uploadFileInChunks(file: File, kind: QuestionMediaKind, onProgress?: (percent: number) => void): Promise<string> {
  const uploadId = crypto.randomUUID();
  const totalChunks = Math.ceil(file.size / UPLOAD_CHUNK_SIZE_BYTES);
  onProgress?.(0);

  for (let index = 0; index < totalChunks; index++) {
    const start = index * UPLOAD_CHUNK_SIZE_BYTES;
    await sendChunk(uploadId, index, file.slice(start, start + UPLOAD_CHUNK_SIZE_BYTES));
    // Keep the last few percent for the server-side stitching step.
    onProgress?.(Math.round(((index + 1) / totalChunks) * 95));
  }

  const res = await fetch("/api/upload/question-media/complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uploadId, kind, fileName: file.name, fileType: file.type, size: file.size, totalChunks }),
  });
  if (!res.ok) throw new Error(await describeFailure(res));
  const data = (await res.json().catch(() => null)) as { url?: string } | null;
  if (!data?.url) throw new Error("Máy chủ không trả về đường dẫn file");
  onProgress?.(100);
  return data.url;
}
