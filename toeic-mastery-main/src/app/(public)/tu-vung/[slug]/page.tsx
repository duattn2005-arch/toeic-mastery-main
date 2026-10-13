import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { Faq, type FaqItem } from "@/components/public/faq";
import { JsonLd } from "@/components/public/json-ld";
import { PUBLIC_VOCAB_PAGES, getPublicVocabPage, unitName, wordsPerDayLabel } from "@/lib/content/public-vocab";
import { PUBLIC_CONTENT_UPDATED, absoluteUrl } from "@/lib/site-url";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLIC_VOCAB_PAGES.map((p) => ({ slug: p.slug }));
}

function heading(page: NonNullable<ReturnType<typeof getPublicVocabPage>>["page"]) {
  return `Từ vựng Tiếng Anh ${page.grade} Unit ${page.unit}: ${unitName(page)}${page.isExtension ? " (mở rộng)" : ""}`;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const found = getPublicVocabPage(slug);
  if (!found) return {};
  const { page } = found;
  const n = page.topic.words.length;
  return {
    title: heading(page),
    description: page.isExtension
      ? `${n} từ mở rộng Unit ${page.unit} Tiếng Anh ${page.grade} Global Success (${unitName(page)}): họ từ, từ đồng nghĩa – trái nghĩa, cụm từ và cấu trúc, kèm phiên âm Anh–Anh và nghĩa tiếng Việt.`
      : `${n} từ vựng Unit ${page.unit} Tiếng Anh ${page.grade} Global Success (${unitName(page)}): phiên âm Anh–Anh, từ loại và nghĩa tiếng Việt. Học theo lộ trình, ôn tập lặp lại ngắt quãng.`,
    alternates: { canonical: `/tu-vung/${slug}` },
  };
}

export default async function VocabTopicPage({ params }: { params: Params }) {
  const { slug } = await params;
  const found = getPublicVocabPage(slug);
  if (!found) notFound();
  const { page, prev, next, sameGrade } = found;
  const words = page.topic.words;
  const hasNotes = words.some((w) => w[5]);

  const faqs: FaqItem[] = [
    {
      q: `${page.isExtension ? "Phần mở rộng" : "Unit"} ${page.unit} Tiếng Anh ${page.grade} có bao nhiêu từ vựng?`,
      a: `${page.isExtension ? "Phần mở rộng của" : ""} Unit ${page.unit} (${unitName(page)}) trên trang này có ${words.length} từ và cụm từ, mỗi mục kèm phiên âm Anh–Anh và nghĩa tiếng Việt.`.trim(),
    },
    {
      q: "Học hết danh sách này mất bao lâu?",
      a: `Với nhịp ${wordsPerDayLabel(page)} từ mỗi ngày, bạn học xong ${words.length} từ trong khoảng ${page.dayCount} ngày. Lộ trình trên TOEIC Mastery chia sẵn từng ngày theo ba bước: Học, Luyện tập bằng game, Kiểm tra.`,
    },
    {
      q: "Làm sao để nhớ từ lâu mà không học vẹt?",
      a: "Học theo cụm từ thay vì từ rời, tự nhớ lại nghĩa trước khi lật thẻ, và ôn đúng lúc sắp quên. TOEIC Mastery dùng thuật toán lặp lại ngắt quãng (SM-2) để nhắc ôn từng từ vào thời điểm phù hợp.",
    },
  ];

  const title = heading(page);

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Từ vựng", href: "/tu-vung" }, { label: `Tiếng Anh ${page.grade}` }, { label: `Unit ${page.unit}${page.isExtension ? " · Mở rộng" : ""}` }]}
      />

      <article>
        <header>
          <h1 className="text-3xl font-extrabold tracking-tight text-balance md:text-4xl">{title}</h1>
          <p className="mt-4 max-w-[65ch] leading-relaxed text-muted-foreground">
            {page.isExtension ? (
              <>
                Phần mở rộng của Unit {page.unit} ({unitName(page)}) gồm {words.length} từ và cụm từ: họ từ, từ đồng nghĩa – trái nghĩa, collocation và cấu trúc
                hay gặp. Học sau khi đã nắm danh sách chính của Unit.
              </>
            ) : (
              <>
                Danh sách {words.length} từ vựng của Unit {page.unit} ({unitName(page)}), sách Tiếng Anh {page.grade} Global Success, kèm từ loại, phiên âm
                Anh–Anh và nghĩa tiếng Việt.
              </>
            )}
          </p>
        </header>

        <aside className="mt-6 flex flex-col gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Sparkles className="size-5" aria-hidden />
            </span>
            <div>
              <p className="font-semibold">Học {words.length} từ này trong {page.dayCount} ngày</p>
              <p className="text-sm text-muted-foreground">Flashcard, game nối từ, kiểm tra và nhắc ôn đúng lúc. Miễn phí.</p>
            </div>
          </div>
          <Link
            href={page.appHref}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[var(--primary-hover)]"
          >
            Học ngay <ArrowRight className="size-4" aria-hidden />
          </Link>
        </aside>

        <section className="mt-10" aria-labelledby="word-list">
          <h2 id="word-list" className="text-xl font-bold md:text-2xl">
            Danh sách từ vựng ({words.length} từ)
          </h2>
          <table className="mt-4 w-full border-collapse text-sm">
            <caption className="sr-only">
              Từ vựng Unit {page.unit} Tiếng Anh {page.grade}: từ, từ loại, phiên âm và nghĩa
            </caption>
            <thead className="sr-only md:table-header-group md:not-sr-only">
              <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase">
                <th scope="col" className="py-2 pr-3 font-semibold">Từ</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Loại từ</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Phiên âm</th>
                <th scope="col" className="py-2 font-semibold">Nghĩa{hasNotes ? " · ghi chú" : ""}</th>
              </tr>
            </thead>
            <tbody>
              {words.map(([word, pos, ipa, meaning, , note]) => (
                <tr key={word} className="block border-b border-border/60 py-3 md:table-row">
                  <th scope="row" className="block pr-3 text-left text-base font-semibold md:table-cell md:py-3 md:align-top">
                    {word}
                  </th>
                  <td className="block text-xs text-muted-foreground italic md:table-cell md:py-3 md:pr-3 md:align-top md:text-sm">{pos}</td>
                  <td className="block text-xs text-muted-foreground md:table-cell md:py-3 md:pr-3 md:align-top md:text-sm">{ipa}</td>
                  <td className="block md:table-cell md:py-3 md:align-top">
                    <span className="font-medium text-primary">{meaning}</span>
                    {note && <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{note}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </article>

      <Faq items={faqs} />

      <nav aria-label="Các Unit khác" className="mt-12 border-t border-border pt-6">
        <div className="flex flex-wrap justify-between gap-3 text-sm">
          {prev ? (
            <Link href={`/tu-vung/${prev.slug}`} className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="size-4" aria-hidden /> Unit {prev.unit}{prev.isExtension ? " · Mở rộng" : ""}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/tu-vung/${next.slug}`} className="flex items-center gap-1 font-medium text-primary hover:underline">
              Unit {next.unit}{next.isExtension ? " · Mở rộng" : ""} <ChevronRight className="size-4" aria-hidden />
            </Link>
          )}
        </div>
        <p className="mt-6 text-sm font-semibold">Tất cả Unit Tiếng Anh {page.grade}</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {sameGrade.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/tu-vung/${p.slug}`}
                aria-current={p.slug === page.slug ? "page" : undefined}
                className={
                  p.slug === page.slug
                    ? "inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
                    : "inline-block rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }
              >
                Unit {p.unit}{p.isExtension ? " · Mở rộng" : ""}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: title,
          description: `${words.length} từ vựng Unit ${page.unit} Tiếng Anh ${page.grade} Global Success (${unitName(page)}).`,
          url: absoluteUrl(`/tu-vung/${page.slug}`),
          inLanguage: "vi",
          learningResourceType: "Danh sách từ vựng",
          educationalLevel: `Lớp ${page.grade}`,
          teaches: "Từ vựng tiếng Anh",
          dateModified: PUBLIC_CONTENT_UPDATED,
          provider: { "@type": "EducationalOrganization", name: "TOEIC Mastery", url: absoluteUrl("/") },
        }}
      />
    </>
  );
}
