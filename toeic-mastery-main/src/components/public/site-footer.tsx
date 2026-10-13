import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const COLUMNS = [
  {
    title: "Học miễn phí",
    links: [
      { href: "/thi-thu-mien-phi", label: "Thi thử nhanh Part 5" },
      { href: "/tu-vung", label: "Từ vựng Tiếng Anh THPT" },
      { href: "/tu-vung/tieng-anh-11-unit-1", label: "Từ vựng Tiếng Anh 11" },
      { href: "/tu-vung/tieng-anh-9-unit-1", label: "Từ vựng Tiếng Anh 9" },
    ],
  },
  {
    title: "Hướng dẫn TOEIC",
    links: [
      { href: "/huong-dan/cau-truc-de-thi-toeic", label: "Cấu trúc đề thi" },
      { href: "/huong-dan/cach-tinh-diem-toeic", label: "Cách tính điểm" },
      { href: "/huong-dan/lo-trinh-hoc-toeic", label: "Lộ trình học" },
      { href: "/huong-dan/cach-hoc-tu-vung-toeic", label: "Cách học từ vựng" },
    ],
  },
  {
    title: "Luyện tập",
    links: [
      { href: "/practice", label: "Luyện đề TOEIC online" },
      { href: "/huong-dan/meo-lam-bai-toeic-listening", label: "Mẹo Listening" },
      { href: "/huong-dan/meo-lam-bai-toeic-reading", label: "Mẹo Reading" },
      { href: "/huong-dan/ngu-phap-part-5-toeic", label: "Ngữ pháp Part 5" },
    ],
  },
];

/** Footer shared by the landing page and the public content pages — doubles as
 * the site-wide internal-link block that points crawlers at every section. */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 px-4 py-10 md:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-sm font-semibold">{col.title}</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 shrink-0" strokeWidth={1.75} />
            Nội dung TOEIC-style nguyên bản, không sao chép đề thi có bản quyền.
          </span>
          <span>© {new Date().getFullYear()} TOEIC Mastery</span>
        </div>
      </div>
    </footer>
  );
}
