import { Clock } from "lucide-react";
import type { BlogContent } from "@/lib/content/blog";
import { BlogCta } from "@/components/public/blog-cta";
import { Faq } from "@/components/public/faq";
import { GuideBody } from "@/components/public/guide-body";

export interface BlogArticleData {
  title: string;
  description: string;
  content: BlogContent;
  ctaTarget: string;
  wordCount: number;
  publishedAt: Date | null;
  updatedAt: Date;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Asia/Ho_Chi_Minh" });
}

/** A blog post as readers see it — shared by /blog/[slug], the in-app
 * TOEIC Tips reader and the admin preview. `cta={false}` drops the sign-up
 * style boxes, which make no sense for someone already logged in. */
export function BlogArticle({ post, cta = true }: { post: BlogArticleData; cta?: boolean }) {
  const date = post.publishedAt ?? post.updatedAt;
  return (
    <>
      <article>
        <header>
          <p className="text-xs font-semibold text-primary uppercase">Blog luyện thi TOEIC</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-balance md:text-4xl">{post.title}</h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden /> {Math.max(1, Math.round(post.wordCount / 200))} phút đọc
            </span>
            <span>
              {post.publishedAt ? "Đăng" : "Cập nhật"} <time dateTime={date.toISOString()}>{formatDate(date)}</time>
            </span>
            <span>Biên soạn: TOEIC Mastery</span>
          </p>
          <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-muted-foreground">{post.description}</p>
        </header>
        <div className="mt-8">
          <GuideBody guide={post.content} afterFirstSection={cta ? <BlogCta target={post.ctaTarget} /> : undefined} />
        </div>
      </article>
      {cta && <BlogCta target={post.ctaTarget} />}
      <Faq items={post.content.faqs} />
    </>
  );
}
