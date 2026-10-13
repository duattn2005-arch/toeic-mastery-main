import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCurrentProfile } from "@/lib/auth";
import { redirect } from "next/navigation";
import { HeroAuthButtons } from "@/components/marketing/landing-auth-buttons";
import { LandingNav } from "@/components/marketing/landing-nav";
import { Reveal } from "@/components/marketing/reveal";
import { FeatureBento } from "@/components/marketing/feature-bento";
import { SiteThemeBackground } from "@/components/layout/site-theme-background";
import { DEFAULT_SITE_THEME_ID } from "@/lib/constants/site-themes";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";
import { SiteFooter } from "@/components/public/site-footer";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/** schema.org data so search engines know this is an online TOEIC course
 * site (name, logo, search box) rather than guessing from the page text. */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: "TOEIC Mastery",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icon.png`,
      description: "Nền tảng luyện thi TOEIC online: đề thi thử sát thực tế, từ vựng theo lộ trình, AI Mentor và phân tích điểm yếu theo Part.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "TOEIC Mastery",
      url: `${SITE_URL}/`,
      inLanguage: "vi",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

const STEPS = [
  {
    title: "Làm bài chẩn đoán",
    description: "Một bài thi ngắn cho biết trình độ hiện tại của bạn ở cả Listening và Reading.",
  },
  {
    title: "Xem điểm yếu từng Part",
    description: "Biểu đồ radar chỉ ra Part nào đang kéo điểm xuống và dạng câu nào bạn hay sai.",
  },
  {
    title: "Luyện đúng chỗ cần luyện",
    description: "Lộ trình hằng ngày gồm đề, từ vựng và ngữ pháp, tự điều chỉnh sau mỗi bài làm.",
  },
];

const FREE_RESOURCES = [
  {
    href: "/thi-thu-mien-phi",
    title: "Thi thử Part 5 miễn phí",
    description: "10 câu ngữ pháp TOEIC, chấm điểm ngay và giải thích từng câu.",
    cta: "Làm thử ngay",
  },
  {
    href: "/huong-dan",
    title: "Hướng dẫn luyện thi TOEIC",
    description: "Cấu trúc đề, cách tính điểm, lộ trình học và mẹo làm bài từng Part.",
    cta: "Đọc hướng dẫn",
  },
  {
    href: "/tu-vung",
    title: "Từ vựng Tiếng Anh THPT",
    description: "Từ vựng Lớp 11 và Lớp 9 theo từng Unit, có phiên âm và nghĩa.",
    cta: "Xem từ vựng",
  },
];

export default async function LandingPage() {
  const profile = await getCurrentProfile();
  if (profile) redirect("/dashboard");

  return (
    <div className="flex min-h-svh flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
      {/* Same ambient wallpaper the logged-in app shell shows by default
          (mèo đen bên hồ sen), so a visitor sees the look the app itself has. */}
      <SiteThemeBackground themeId={DEFAULT_SITE_THEME_ID} />

      <LandingNav />

      <main id="main">
        {/* HERO: asymmetric split, copy left, real artwork right */}
        <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pt-16 pb-24 md:px-6 lg:min-h-[min(calc(100dvh-6rem),52rem)] lg:grid-cols-12 lg:gap-8 lg:pt-8">
          <div className="flex flex-col items-start gap-6 lg:col-span-6">
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-accent px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-accent-foreground uppercase">
                Luyện thi TOEIC toàn diện
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="text-4xl leading-[1.08] font-extrabold md:text-5xl lg:text-6xl">
                Chinh phục điểm TOEIC mục tiêu bằng lộ trình của riêng bạn
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="max-w-[48ch] text-base leading-relaxed text-muted-foreground md:text-lg">
                Đề đủ 7 Part, từ điển ngay trên trang, flashcard ôn đúng lúc và phân tích điểm yếu theo từng Part.
              </p>
            </Reveal>
            <Reveal delay={0.24} className="flex flex-wrap items-center gap-3">
              <HeroAuthButtons />
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-6">
            {/* Double-bezel: outer tray + inner plate with concentric radii */}
            <div className="rounded-[2rem] border border-border/60 bg-card/60 p-2 shadow-lift">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(2rem-0.5rem)] bg-muted">
                <Image
                  src="/themes/lily-pond-cat/background.svg"
                  alt="Chú mèo đen ngồi bên hồ sen, mascot của TOEIC Mastery"
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* FEATURES: asymmetric bento (7+5 / 5+7), each cell a live preview */}
        <section id="features" className="mx-auto scroll-mt-28 w-full max-w-6xl px-4 pb-28 md:px-6">
          <Reveal className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-extrabold md:text-4xl">Mọi công cụ ôn thi trong một nơi</h2>
            <p className="mt-3 max-w-[60ch] text-muted-foreground">
              Từ làm đề đến ghi nhớ từ vựng, mỗi tính năng bám theo cách người học TOEIC thực sự ôn tập.
            </p>
          </Reveal>

          <FeatureBento />
        </section>

        {/* HOW IT WORKS: sticky heading left, stacked rows right */}
        <section id="how" className="mx-auto scroll-mt-28 w-full max-w-6xl px-4 pb-28 md:px-6">
          <div className="grid gap-10 rounded-[2.5rem] border border-border/60 bg-card p-8 shadow-soft md:p-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <h2 className="text-3xl font-extrabold md:text-4xl">Học đúng chỗ, tiến bộ thấy được</h2>
                <p className="mt-3 max-w-[40ch] text-muted-foreground">
                  Ba việc lặp lại mỗi ngày, mỗi lần ngắn nhưng đều đặn.
                </p>
              </div>
            </Reveal>
            <ol className="flex flex-col gap-3 lg:col-span-7">
              {STEPS.map((step, i) => (
                <li key={step.title}>
                  <Reveal delay={i * 0.08}>
                    <div className="rounded-2xl bg-muted/70 p-6 transition-colors duration-500 hover:bg-accent">
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      <p className="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FREE RESOURCES: crawlable entry points into the public content */}
        <section aria-labelledby="free-heading" className="mx-auto w-full max-w-6xl px-4 pb-28 md:px-6">
          <Reveal className="mb-8 max-w-2xl">
            <h2 id="free-heading" className="text-3xl font-extrabold md:text-4xl">
              Học thử miễn phí, không cần đăng nhập
            </h2>
            <p className="mt-3 max-w-[60ch] text-muted-foreground">
              Làm bài kiểm tra ngữ pháp, đọc hướng dẫn luyện thi và xem từ vựng theo từng Unit trước khi quyết định học lâu dài.
            </p>
          </Reveal>
          <ul className="grid gap-4 md:grid-cols-3">
            {FREE_RESOURCES.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col justify-between gap-6 rounded-2xl bg-muted/70 p-6 transition-colors duration-500 hover:bg-accent"
                >
                  <span>
                    <span className="text-lg font-bold">{item.title}</span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">{item.description}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {item.cta}
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px" strokeWidth={2} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* FINAL CTA: mascot + one action, same label as the hero CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-6">
          <Reveal>
            <div className="relative flex flex-col items-start gap-8 overflow-hidden rounded-[2.5rem] bg-[#0c1815] p-8 text-[#c5d3cf] md:flex-row md:items-center md:justify-between md:p-14">
              <div
                aria-hidden
                className="absolute -bottom-32 left-1/3 size-96 rounded-full bg-primary/30 blur-3xl"
              />
              <div className="relative max-w-xl">
                <h2 className="text-3xl font-extrabold text-white md:text-4xl">
                  Bắt đầu từ một bài thi thử hôm nay
                </h2>
                <p className="mt-3 max-w-[44ch] text-[#9fb2ab]">
                  Miễn phí để bắt đầu. Không cần thẻ, không cần cài đặt.
                </p>
                <Link
                  href="/practice"
                  className="group mt-7 inline-flex items-center gap-3 rounded-full bg-primary py-2 pr-2 pl-6 text-[15px] font-semibold text-primary-foreground transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[var(--primary-hover)] active:scale-[0.98]"
                >
                  Bắt đầu luyện tập ngay
                  <span className="flex size-9 items-center justify-center rounded-full bg-black/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                    <ArrowUpRight className="size-4" strokeWidth={2} />
                  </span>
                </Link>
              </div>
              <Image
                src="/mascot-avatar.png"
                alt="Mascot mèo đen của TOEIC Mastery"
                width={176}
                height={176}
                className="relative size-36 shrink-0 rounded-[2rem] object-cover md:size-44"
              />
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
