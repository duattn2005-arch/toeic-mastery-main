import "server-only";
import { randomUUID } from "node:crypto";
import { appendFile, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

// Admin-uploaded question/passage photos come straight off a phone camera
// as often as not — several MB and thousands of pixels wide. Next's own
// `/_next/image` optimizer still has to decode and downscale that full-size
// original the first time each question is opened, which is exactly what
// made images feel slow to appear in the exam UI. Shrinking to a size no
// exam layout ever displays larger than, once here at upload time, makes
// that one-time optimization pass (and every plain view of the raw file)
// fast instead of CPU-bound on a multi-megapixel source.
const MAX_IMAGE_DIMENSION = 1600;

/**
 * Local-disk file storage — replaces Supabase Storage. Files land under
 * UPLOADS_DIR/<bucket>/<random>.<ext> (UPLOADS_DIR is expected to be an
 * absolute path outside the app's own deploy directory on the VPS, e.g.
 * /var/app-uploads, so redeploys don't wipe uploads) and are served back by
 * Nginx as static files at NEXT_PUBLIC_UPLOADS_URL.
 *
 * Callers (the /api/upload/* route handlers) are responsible for their own
 * auth check before calling this — this module does no authorization.
 */

export interface SaveUploadResult {
  url: string;
}

export async function saveUpload(
  bucket: string,
  file: File,
  { maxSizeBytes, acceptedTypes }: { maxSizeBytes: number; acceptedTypes: readonly string[] }
): Promise<SaveUploadResult> {
  if (!acceptedTypes.includes(file.type)) {
    throw new UploadValidationError(`Định dạng file không được hỗ trợ (${file.type || "không rõ"})`);
  }
  if (file.size > maxSizeBytes) {
    throw new UploadValidationError(`File phải nhỏ hơn ${Math.round(maxSizeBytes / (1024 * 1024))}MB`);
  }

  const uploadsDir = process.env.UPLOADS_DIR;
  const publicUrl = process.env.NEXT_PUBLIC_UPLOADS_URL;
  if (!uploadsDir || !publicUrl) {
    throw new Error("UPLOADS_DIR / NEXT_PUBLIC_UPLOADS_URL is not set. Copy .env.example to .env and configure it.");
  }

  const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const filename = `${randomUUID()}.${ext}`;
  const bucketDir = path.join(uploadsDir, bucket);
  await mkdir(bucketDir, { recursive: true });

  const rawBuffer = Buffer.from(await file.arrayBuffer());
  const contents = file.type.startsWith("image/") ? await downscaleImage(rawBuffer) : rawBuffer;
  await writeFile(path.join(bucketDir, filename), contents);

  return { url: `${publicUrl.replace(/\/$/, "")}/${bucket}/${filename}` };
}

/**
 * Resizes down to MAX_IMAGE_DIMENSION on the longer side (never upscales)
 * and re-encodes in the same format, auto-rotating per EXIF orientation
 * first since a naive resize would otherwise bake in a sideways photo.
 * Falls back to the original bytes if sharp can't decode it (e.g. a
 * corrupt upload) — the existing type/size checks above already reject
 * anything that isn't a plausible image, so this is a last-resort guard,
 * not the primary validation path.
 */
async function downscaleImage(buffer: Buffer): Promise<Buffer> {
  try {
    return await sharp(buffer)
      .rotate()
      .resize({ width: MAX_IMAGE_DIMENSION, height: MAX_IMAGE_DIMENSION, fit: "inside", withoutEnlargement: true })
      .toBuffer();
  } catch {
    return buffer;
  }
}

export class UploadValidationError extends Error {}

/*
 * Chunked uploads — large files (full-test listening audio) arrive as a
 * series of small requests instead of one huge body, which is what used to
 * fail: one 50MB+ request had to survive Nginx's body cap, the proxy's
 * request-body buffer (see next.config.ts) and every timeout along a slow
 * connection. Parts are staged in the OS temp dir (NOT under UPLOADS_DIR,
 * which Nginx serves publicly) and stitched together on completion.
 */

const CHUNK_ROOT = path.join(tmpdir(), "toeic-mastery-upload-chunks");
const UPLOAD_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Abandoned uploads (tab closed mid-way) are swept after this long. */
const STALE_CHUNK_DIR_MS = 24 * 60 * 60 * 1000;

/** Scoped per user so one admin can never write into or finalize another's
 * upload, and validated so the id can't be used for path traversal. */
function chunkDir(ownerId: string, uploadId: string) {
  if (!UPLOAD_ID_PATTERN.test(uploadId)) throw new UploadValidationError("Mã phiên tải lên không hợp lệ");
  return path.join(CHUNK_ROOT, `${ownerId}-${uploadId.toLowerCase()}`);
}

function chunkFileName(index: number) {
  return `${String(index).padStart(6, "0")}.part`;
}

export async function saveUploadChunk(ownerId: string, uploadId: string, index: number, contents: Buffer) {
  const dir = chunkDir(ownerId, uploadId);
  if (index === 0) void sweepStaleChunkDirs();
  await mkdir(dir, { recursive: true });
  // Overwrite, not append: a retried chunk (the first attempt's response got
  // lost) must replace itself rather than duplicate its bytes.
  await writeFile(path.join(dir, chunkFileName(index)), contents);
}

export async function completeChunkedUpload(
  ownerId: string,
  uploadId: string,
  bucket: string,
  file: { name: string; type: string; size: number; totalChunks: number },
  { maxSizeBytes, acceptedTypes }: { maxSizeBytes: number; acceptedTypes: readonly string[] }
): Promise<SaveUploadResult> {
  const dir = chunkDir(ownerId, uploadId);
  try {
    if (!acceptedTypes.includes(file.type)) {
      throw new UploadValidationError(`Định dạng file không được hỗ trợ (${file.type || "không rõ"})`);
    }
    if (file.size > maxSizeBytes) {
      throw new UploadValidationError(`File phải nhỏ hơn ${Math.round(maxSizeBytes / (1024 * 1024))}MB`);
    }

    const uploadsDir = process.env.UPLOADS_DIR;
    const publicUrl = process.env.NEXT_PUBLIC_UPLOADS_URL;
    if (!uploadsDir || !publicUrl) {
      throw new Error("UPLOADS_DIR / NEXT_PUBLIC_UPLOADS_URL is not set. Copy .env.example to .env and configure it.");
    }

    const parts = (await readdir(dir).catch(() => [] as string[])).filter((name) => name.endsWith(".part")).sort();
    const expected = Array.from({ length: file.totalChunks }, (_, i) => chunkFileName(i));
    if (parts.length !== expected.length || parts.some((name, i) => name !== expected[i])) {
      throw new UploadValidationError("Thiếu một phần dữ liệu khi tải lên, vui lòng thử lại");
    }

    // The name arrives as JSON from the client here (not a multipart File),
    // so only keep a plain extension — never anything path-like.
    const rawExt = file.name.includes(".") ? (file.name.split(".").pop() ?? "") : "";
    const ext = /^[a-z0-9]{1,8}$/i.test(rawExt) ? rawExt.toLowerCase() : "bin";
    const filename = `${randomUUID()}.${ext}`;
    const bucketDir = path.join(uploadsDir, bucket);
    await mkdir(bucketDir, { recursive: true });
    const target = path.join(bucketDir, filename);

    // One part in memory at a time (≤ UPLOAD_CHUNK_SIZE_BYTES) instead of the
    // whole file — the VPS only has 2GB of RAM.
    let written = 0;
    try {
      for (const name of parts) {
        const part = await readFile(path.join(dir, name));
        written += part.length;
        if (written > maxSizeBytes) throw new UploadValidationError(`File phải nhỏ hơn ${Math.round(maxSizeBytes / (1024 * 1024))}MB`);
        await appendFile(target, part);
      }
      if (written !== file.size) throw new UploadValidationError("Dữ liệu tải lên không khớp kích thước file, vui lòng thử lại");
    } catch (err) {
      await rm(target, { force: true });
      throw err;
    }

    return { url: `${publicUrl.replace(/\/$/, "")}/${bucket}/${filename}` };
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

async function sweepStaleChunkDirs() {
  try {
    const now = Date.now();
    for (const name of await readdir(CHUNK_ROOT)) {
      const full = path.join(CHUNK_ROOT, name);
      const info = await stat(full).catch(() => null);
      if (info && now - info.mtimeMs > STALE_CHUNK_DIR_MS) await rm(full, { recursive: true, force: true });
    }
  } catch {
    // Root doesn't exist yet, or a dir vanished mid-sweep — nothing to do.
  }
}
