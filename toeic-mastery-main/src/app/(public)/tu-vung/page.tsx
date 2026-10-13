import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { JsonLd } from "@/components/public/json-ld";
import { PUBLIC_VOCAB_GRADES, unitName } from "@/lib/content/public-vocab";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Từ vựng Tiếng Anh THPT: Lớp 11, Lớp 9 theo Unit",
  description:
    "Tổng hợp từ vựng Tiếng Anh 11 và Tiếng Anh 9 Global Success theo từng Unit: phiên âm Anh–Anh, nghĩa tiếng Việt, từ đồng nghĩa – trái nghĩa và cấu trúc đi kèm. Học miễn phí.",
  alternates: { canonical: "/tu-vung" },
};

export default function VocabIndexPage() {
  const totalWords = PUBLIC_VOCAB_GRADES.flatMap((g) => g.pages).reduce((n, p) => n + p.topic.words.length, 0);

  return (
    <>
      <Breadcrumbs items={[{ label: "Từ vựng" }]} />
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Từ vựng Tiếng Anh THPT theo từng Unit</h1>
        <p className="mt-4 max-w-[65ch] leading-relaxed text-muted-foreground">
          Danh sách {totalWords.toLocaleString("vi-VN")} từ và cụm từ của sách Tiếng Anh 11 và Tiếng Anh 9 (Global Success), chia theo Unit. Mỗi từ có
          phiên âm Anh–Anh, nghĩa tiếng Việt; các Unit lớn có thêm phần <strong>Mở rộng</strong> gồm họ từ, từ đồng nghĩa – trái nghĩa và cấu trúc đi kèm.
          Muốn nhớ lâu, hãy học theo lộ trình từng ngày với flashcard, game và ôn tập lặp lại ngắt quãng trên TOEIC Mastery.
        </p>
      </header>

      {PUBLIC_VOCAB_GRADES.map(({ grade, label, pages }) => (
        <section key={grade} className="mt-10" aria-labelledby={`grade-${grade}`}>
          <h2 id={`grade-${grade}`} className="flex items-center gap-2 text-xl font-bold md:text-2xl">
            <BookOpenText className="size-5 text-primary" aria-hidden /> Từ vựng {label}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {pages.map((page) => (
              <li key={page.slug}>
                <Link
                  href={`/tu-vung/${page.slug}`}
                  className="flex h-full flex-col justify-between gap-2 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/40"
                >
                  <span>
                    <span className="text-xs font-semibold text-primary uppercase">
                      Unit {page.unit}
                      {page.isExtension ? " · Mở rộng" : ""}
                    </span>
                    <span className="mt-0.5 block font-semibold">{unitName(page)}</span>
                  </span>
                  <span className="flex items-center justify-between text-xs text-muted-foreground">
                    {page.topic.words.length} từ
                    <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="mt-12 text-sm text-muted-foreground">
        Đang luyện TOEIC? Xem thêm <Link href="/huong-dan/cach-hoc-tu-vung-toeic" className="font-medium text-primary underline-offset-4 hover:underline">cách học từ vựng TOEIC hiệu quả</Link> và{" "}
        <Link href="/thi-thu-mien-phi" className="font-medium text-primary underline-offset-4 hover:underline">làm thử bài kiểm tra ngữ pháp Part 5 miễn phí</Link>.
      </p>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Từ vựng Tiếng Anh THPT theo từng Unit",
          url: absoluteUrl("/tu-vung"),
          inLanguage: "vi",
          hasPart: PUBLIC_VOCAB_GRADES.flatMap((g) => g.pages).map((p) => ({ "@type": "WebPage", name: `Từ vựng Tiếng Anh ${p.grade} ${p.topic.title}`, url: absoluteUrl(`/tu-vung/${p.slug}`) })),
        }}
      />
    </>
  );
}
