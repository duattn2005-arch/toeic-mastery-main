import { NextResponse } from "next/server";
import { getAuthedProfileOrNull } from "@/lib/auth";
import { exportBank } from "@/lib/services/explanations/bank-explainer";

/** Admin-only download of the practice question banks (Part 1–7) exactly as
 * stored — question, options, answer key, passage text, image/audio links,
 * current transcript/explanation — so explanations can be written offline
 * and brought back with "Nhập giải thích". ?all=1 includes questions that
 * already have a full explanation. */
export async function GET(request: Request) {
  const profile = await getAuthedProfileOrNull();
  if (!profile || profile.role !== "ADMIN") return NextResponse.json({ error: "Chỉ quản trị viên" }, { status: 403 });
  const all = new URL(request.url).searchParams.get("all") === "1";
  const data = await exportBank(all);
  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(JSON.stringify(data, null, 1), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "content-disposition": `attachment; filename="ngan-hang-cau-hoi-${date}.json"`,
    },
  });
}
