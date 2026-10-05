import { NextResponse } from "next/server";
import { getAuthedProfileOrNull } from "@/lib/auth";
import { completeChunkedUpload, UploadValidationError } from "@/lib/upload";
import { QUESTION_MEDIA_KINDS, UPLOAD_CHUNK_SIZE_BYTES, isQuestionMediaKind } from "@/lib/upload-kinds";

/** Stitches a chunked upload's pieces into the final file and returns its
 * public URL — the last step after every /chunk request succeeded. */
export async function POST(request: Request) {
  const profile = await getAuthedProfileOrNull();
  if (!profile) return NextResponse.json({ error: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại" }, { status: 401 });
  if (profile.role !== "ADMIN") return NextResponse.json({ error: "Chỉ quản trị viên mới được tải file này lên" }, { status: 403 });

  const body = (await request.json().catch(() => null)) as {
    uploadId?: unknown;
    kind?: unknown;
    fileName?: unknown;
    fileType?: unknown;
    size?: unknown;
    totalChunks?: unknown;
  } | null;

  const uploadId = typeof body?.uploadId === "string" ? body.uploadId : "";
  const fileName = typeof body?.fileName === "string" ? body.fileName : "";
  const fileType = typeof body?.fileType === "string" ? body.fileType : "";
  const size = typeof body?.size === "number" ? body.size : NaN;
  const totalChunks = typeof body?.totalChunks === "number" ? body.totalChunks : NaN;

  if (!isQuestionMediaKind(body?.kind)) return NextResponse.json({ error: "Thiếu tham số kind" }, { status: 400 });
  if (!Number.isInteger(size) || size <= 0 || totalChunks !== Math.ceil(size / UPLOAD_CHUNK_SIZE_BYTES)) {
    return NextResponse.json({ error: "Thông tin file tải lên không hợp lệ" }, { status: 400 });
  }

  const config = QUESTION_MEDIA_KINDS[body.kind];
  try {
    const { url } = await completeChunkedUpload(profile.id, uploadId, config.bucket, { name: fileName, type: fileType, size, totalChunks }, config);
    return NextResponse.json({ url });
  } catch (err) {
    if (err instanceof UploadValidationError) return NextResponse.json({ error: err.message }, { status: 400 });
    throw err;
  }
}
