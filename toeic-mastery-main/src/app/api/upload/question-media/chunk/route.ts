import { NextResponse } from "next/server";
import { getAuthedProfileOrNull } from "@/lib/auth";
import { saveUploadChunk, UploadValidationError } from "@/lib/upload";
import { QUESTION_MEDIA_KINDS, UPLOAD_CHUNK_SIZE_BYTES } from "@/lib/upload-kinds";

const MAX_CHUNKS = Math.ceil(Math.max(...Object.values(QUESTION_MEDIA_KINDS).map((k) => k.maxSizeBytes)) / UPLOAD_CHUNK_SIZE_BYTES);

/**
 * One piece of a chunked admin upload (see chunked-upload.ts on the client
 * and completeChunkedUpload in src/lib/upload.ts). The raw bytes are the
 * request body; which upload/piece it is travels in the query string, so
 * there's no multipart parsing at all.
 */
export async function POST(request: Request) {
  const profile = await getAuthedProfileOrNull();
  if (!profile) return NextResponse.json({ error: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại" }, { status: 401 });
  if (profile.role !== "ADMIN") return NextResponse.json({ error: "Chỉ quản trị viên mới được tải file này lên" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const uploadId = searchParams.get("uploadId") ?? "";
  const index = Number(searchParams.get("index"));
  if (!Number.isInteger(index) || index < 0 || index >= MAX_CHUNKS) {
    return NextResponse.json({ error: "Số thứ tự phần tải lên không hợp lệ" }, { status: 400 });
  }

  const contents = Buffer.from(await request.arrayBuffer());
  if (contents.length === 0 || contents.length > UPLOAD_CHUNK_SIZE_BYTES) {
    return NextResponse.json({ error: "Kích thước phần tải lên không hợp lệ" }, { status: 400 });
  }

  try {
    await saveUploadChunk(profile.id, uploadId, index, contents);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof UploadValidationError) return NextResponse.json({ error: err.message }, { status: 400 });
    throw err;
  }
}
