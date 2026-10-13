import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { db } from "@/lib/db";
import { requireAdmin, isSuperAdmin } from "@/lib/auth";
import type { Prisma } from "@/generated/prisma/client";
import { RoleSelect } from "@/components/admin/role-select";
import { PlanSelect } from "@/components/admin/plan-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Quản lý người dùng" };

const PAGE_SIZE = 50;

function formatDate(d: Date | null) {
  return d ? d.toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }) : "—";
}

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const admin = await requireAdmin();
  const canEditRole = isSuperAdmin(admin);
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const where: Prisma.ProfileWhereInput = q
    ? { OR: [{ email: { contains: q, mode: "insensitive" } }, { fullName: { contains: q, mode: "insensitive" } }] }
    : {};

  const [total, matching] = await Promise.all([db.profile.count(), q ? db.profile.count({ where }) : Promise.resolve(null)]);
  const count = matching ?? total;
  const pageCount = Math.max(1, Math.ceil(count / PAGE_SIZE));
  const page = Math.min(pageCount, Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1));

  const users = await db.profile.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: { _count: { select: { attempts: true } } },
  });

  const href = (p: number) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (p > 1) sp.set("page", String(p));
    const s = sp.toString();
    return s ? `/admin/users?${s}` : "/admin/users";
  };
  const first = count === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const last = (page - 1) * PAGE_SIZE + users.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Quản lý người dùng</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tổng cộng <span className="font-semibold text-foreground">{total.toLocaleString("vi-VN")}</span> tài khoản đã đăng ký
            {q && (
              <>
                {" "}
                · {count.toLocaleString("vi-VN")} kết quả cho “{q}”
              </>
            )}
          </p>
          {!canEditRole && (
            <p className="mt-2 text-xs text-muted-foreground">
              Chỉ tài khoản quản trị cấp cao mới có thể thay đổi vai trò (Học viên/Admin) — bạn chỉ có thể xem.
            </p>
          )}
        </div>
        <Button asChild variant="outline">
          {/* A plain link (not next/link): it's a file download from a route handler. */}
          <a href="/api/admin/users/export">
            <Download className="size-4" /> Tải tất cả (CSV)
          </a>
        </Button>
      </div>

      <form action="/admin/users" className="flex max-w-md gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Tìm theo email hoặc tên…"
            className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 text-base outline-none focus-visible:border-ring sm:text-sm"
          />
        </div>
        <Button type="submit" variant="secondary">
          Tìm
        </Button>
        {q && (
          <Button asChild variant="ghost">
            <Link href="/admin/users">Xoá lọc</Link>
          </Button>
        )}
      </form>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Người dùng</th>
              <th className="px-4 py-3 font-medium">Ngày đăng ký</th>
              <th className="px-4 py-3 font-medium">Học gần nhất</th>
              <th className="px-4 py-3 font-medium">Điểm hiện tại</th>
              <th className="px-4 py-3 font-medium">Đề đã làm</th>
              <th className="px-4 py-3 font-medium">Vai trò</th>
              <th className="px-4 py-3 font-medium">Gói</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-xs text-muted-foreground">{first + i}</td>
                <td className="px-4 py-3">
                  <p className="font-medium">{u.fullName || "—"}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{formatDate(u.createdAt)}</td>
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{formatDate(u.lastStudyDate)}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.currentScore ?? "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{u._count.attempts}</td>
                <td className="px-4 py-3">
                  {u.role === "ADMIN" && canEditRole ? (
                    <div className="flex items-center gap-2">
                      <Badge>Admin</Badge>
                      <RoleSelect userId={u.id} role={u.role} canEdit={canEditRole} />
                    </div>
                  ) : (
                    <RoleSelect userId={u.id} role={u.role} canEdit={canEditRole} />
                  )}
                </td>
                <td className="px-4 py-3">
                  <PlanSelect userId={u.id} plan={u.plan} />
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Không có tài khoản nào khớp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <nav className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="text-muted-foreground">
          Hiển thị {first}–{last} / {count.toLocaleString("vi-VN")} · Trang {page}/{pageCount}
        </span>
        <div className="flex gap-2">
          {page > 1 ? (
            <Button asChild variant="outline" size="sm">
              <Link href={href(page - 1)}>
                <ChevronLeft className="size-4" /> Trang trước
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="size-4" /> Trang trước
            </Button>
          )}
          {page < pageCount ? (
            <Button asChild variant="outline" size="sm">
              <Link href={href(page + 1)}>
                Trang sau <ChevronRight className="size-4" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              Trang sau <ChevronRight className="size-4" />
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}
