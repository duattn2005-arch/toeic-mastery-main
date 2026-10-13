import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthedProfileOrNull } from "@/lib/auth";

function csvCell(value: unknown) {
  const text = value === null || value === undefined ? "" : value instanceof Date ? value.toISOString() : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** Admin-only CSV of every registered account (the /admin/users table, all
 * pages) — opens directly in Excel / Google Sheets (UTF-8 BOM for Vietnamese). */
export async function GET() {
  const profile = await getAuthedProfileOrNull();
  if (!profile || profile.role !== "ADMIN") return NextResponse.json({ error: "Chỉ quản trị viên" }, { status: 403 });

  const users = await db.profile.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      email: true,
      fullName: true,
      role: true,
      plan: true,
      currentScore: true,
      targetScore: true,
      streakCount: true,
      lastStudyDate: true,
      createdAt: true,
      _count: { select: { attempts: true } },
    },
  });

  const header = ["STT", "Email", "Họ tên", "Vai trò", "Gói", "Điểm hiện tại", "Mục tiêu", "Streak", "Đề đã làm", "Học gần nhất", "Ngày đăng ký"];
  const rows = users.map((u, i) => [
    i + 1,
    u.email,
    u.fullName,
    u.role,
    u.plan,
    u.currentScore,
    u.targetScore,
    u.streakCount,
    u._count.attempts,
    u.lastStudyDate ? u.lastStudyDate.toISOString().slice(0, 10) : "",
    u.createdAt,
  ]);
  const csv = "\uFEFF" + [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n");
  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="nguoi-dung-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
