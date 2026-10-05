import { NextResponse } from "next/server";
import { getAuthedProfileOrNull } from "@/lib/auth";
import { saveUpload, UploadValidationError } from "@/lib/upload";
import { QUESTION_MEDIA_KINDS, isQuestionMediaKind } from "@/lib/upload-kinds";

export async function POST(request: Request) {
  const profile = await getAuthedProfileOrNull();
  if (!profile) return NextResponse.json({ error: "Vui lòng đăng nhập" }, { status: 401 });
  if (profile.role !== "ADMIN") return NextResponse.json({ error: "Chỉ quản trị viên mới được tải file này lên" }, { status: 403 });

  const formData = await request.formData();
  const file = formData.get("file");
  const kind = formData.get("kind");
  if (!(file instanceof File)) return NextResponse.json({ error: "Thiếu file" }, { status: 400 });
  if (!isQuestionMediaKind(kind)) return NextResponse.json({ error: "Thiếu tham số kind" }, { status: 400 });

  const config = QUESTION_MEDIA_KINDS[kind];
  try {
    const { url } = await saveUpload(config.bucket, file, config);
    return NextResponse.json({ url });
  } catch (err) {
    if (err instanceof UploadValidationError) return NextResponse.json({ error: err.message }, { status: 400 });
    throw err;
  }
}
