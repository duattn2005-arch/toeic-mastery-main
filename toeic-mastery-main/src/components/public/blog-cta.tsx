import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { BLOG_CTAS, isBlogCtaKey } from "@/lib/content/blog";

/** The box that sends a blog reader into the app. Written by the site, never
 * by the model; `data-track` names it in GA4's ui_click events. */
export function BlogCta({ target }: { target: string }) {
  const cta = BLOG_CTAS[isBlogCtaKey(target) ? target : "free_quiz"];
  return (
    <aside className="my-8 flex flex-col gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Sparkles className="size-5" aria-hidden />
        </span>
        <div>
          <p className="font-semibold">{cta.title}</p>
          <p className="text-sm text-muted-foreground">{cta.text}</p>
        </div>
      </div>
      <Link
        href={cta.href}
        data-track={`blog_cta:${target}`}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[var(--primary-hover)]"
      >
        {cta.button} <ArrowRight className="size-4" aria-hidden />
      </Link>
    </aside>
  );
}
