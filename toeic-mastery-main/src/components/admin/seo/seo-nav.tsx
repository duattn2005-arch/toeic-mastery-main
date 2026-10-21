import Link from "next/link";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/admin/seo", label: "Tổng quan & tự động" },
  { href: "/admin/seo/doi-thu", label: "1. Phân tích đối thủ" },
  { href: "/admin/seo/chu-de", label: "2. Chủ đề" },
  { href: "/admin/seo/bai-viet", label: "3. Bài viết" },
];

export const SEO_STATUS_LABEL: Record<string, string> = {
  PENDING: "Chờ phân tích",
  ANALYSING: "Đang phân tích",
  ANALYSED: "Đã phân tích",
  FAILED: "Lỗi",
  IDEA: "Ý tưởng",
  WRITING: "Đang viết",
  DRAFTED: "Đã có bản nháp",
  PUBLISHED: "Đã đăng",
  REJECTED: "Bỏ qua",
  DRAFT: "Bản nháp",
};

export const SEO_STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PENDING: "outline",
  ANALYSING: "secondary",
  ANALYSED: "default",
  FAILED: "destructive",
  IDEA: "outline",
  WRITING: "secondary",
  DRAFTED: "secondary",
  PUBLISHED: "default",
  REJECTED: "outline",
  DRAFT: "secondary",
};

export function SeoNav({ active, title, description }: { active: string; title: string; description: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{description}</p>
      </div>
      <nav className="flex flex-wrap gap-1.5" aria-label="Viết bài SEO">
        {TABS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              t.href === active ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
