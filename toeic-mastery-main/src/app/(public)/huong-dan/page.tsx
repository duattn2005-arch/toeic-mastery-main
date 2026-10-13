import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { JsonLd } from "@/components/public/json-ld";
import { GUIDES, readingMinutes } from "@/lib/content/guides";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Hướng dẫn luyện thi TOEIC cho người Việt",
  description:
    "Tổng hợp bài hướng dẫn TOEIC cho người Việt: cấu trúc đề thi, cách tính điểm, lộ trình học, cách học từ vựng, mẹo Listening, Reading và ngữ pháp Part 5.",
  alternates: { canonical: "/huong-dan" },
};

export default function GuidesIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Hướng dẫn" }]} />
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Hướng dẫn luyện thi TOEIC</h1>
        <p className="mt-4 max-w-[65ch] leading-relaxed text-muted-foreground">
          Những bài viết ngắn gọn, đi thẳng vào việc: đề thi có gì, điểm được tính ra sao, nên học thế nào và làm bài từng Part ra sao. Đọc xong có thể luyện ngay
          trên TOEIC Mastery.
        </p>
      </header>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {GUIDES.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/huong-dan/${guide.slug}`}
              className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/40"
            >
              <span>
                <span className="text-xs font-semibold text-primary uppercase">{guide.category}</span>
                <span className="mt-1 block text-lg leading-snug font-bold">{guide.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{guide.summary}</span>
              </span>
              <span className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" aria-hidden /> {readingMinutes(guide)} phút đọc
                </span>
                <ArrowRight className="size-3.5" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-muted-foreground">
        Muốn thử sức ngay?{" "}
        <Link href="/thi-thu-mien-phi" className="font-medium text-primary underline-offset-4 hover:underline">
          Làm bài kiểm tra Part 5 miễn phí
        </Link>{" "}
        hoặc xem{" "}
        <Link href="/tu-vung" className="font-medium text-primary underline-offset-4 hover:underline">
          từ vựng Tiếng Anh THPT theo Unit
        </Link>
        .
      </p>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Hướng dẫn luyện thi TOEIC",
          url: absoluteUrl("/huong-dan"),
          inLanguage: "vi",
          hasPart: GUIDES.map((g) => ({ "@type": "Article", headline: g.title, url: absoluteUrl(`/huong-dan/${g.slug}`) })),
        }}
      />
    </>
  );
}
