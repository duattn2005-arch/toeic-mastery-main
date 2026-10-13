"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { HeaderAuthButtons } from "@/components/marketing/landing-auth-buttons";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#features", label: "Tính năng" },
  { href: "/#how", label: "Lộ trình" },
  { href: "/practice", label: "Luyện đề" },
];

/**
 * Floating glass "island" nav for logged-out pages. Tightens and darkens once
 * the page scrolls, so it stays legible over content without eating the hero.
 * Scroll state comes from an IntersectionObserver on a sentinel at the top of
 * the page (no scroll listener).
 */
export function LandingNav() {
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="pointer-events-none absolute top-0 h-6 w-px" />
      <header className="sticky top-4 z-40 mx-auto mt-4 w-[calc(100%-2rem)] max-w-4xl">
        <nav
          aria-label="Điều hướng chính"
          className={cn(
            "relative flex items-center justify-between gap-4 rounded-full border border-white/10 pr-2 pl-2 backdrop-blur-xl backdrop-saturate-150",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_40px_-20px_rgba(0,0,0,0.6)]",
            "transition-[padding,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
            scrolled ? "bg-card/85 py-1.5" : "bg-card/55 py-2"
          )}
        >
          {/* Hairline highlight along the top edge, like light catching glass */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />

          <Link href="/" aria-label="TOEIC Mastery, về trang chủ" className="group flex items-center gap-2.5 rounded-full py-0.5 pr-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-white/15 to-white/5 ring-1 ring-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:-rotate-6">
              <Image src="/logo-mark.png" alt="" width={32} height={32} className="size-8 rounded-full" priority />
            </span>
            {/* Wordmark: heavy "TOEIC" + italic gradient "Mastery", same family.
                pr/pb leave room for the italic overhang and the "y" descender,
                which background-clip text would otherwise cut off. */}
            <span className="flex items-baseline gap-1.5 text-xl leading-[1.1] whitespace-nowrap sm:text-2xl">
              <span className="font-black tracking-[-0.04em] text-foreground">TOEIC</span>
              <span className="bg-gradient-to-r from-primary via-[#5eead4] to-[#a7f3d0] bg-clip-text pr-1 pb-0.5 font-extrabold tracking-[-0.03em] text-transparent italic">
                Mastery
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:bg-white/5 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <HeaderAuthButtons />
          </div>
        </nav>
      </header>
    </>
  );
}
