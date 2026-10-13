"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown, Flame, Headset, Settings, ShieldCheck, Target, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { MAIN_NAV } from "@/lib/constants/nav";
import { EquippableLogoMark } from "@/components/shared/logo-mark";
import { AccountAvatar } from "@/components/shared/account-avatar";
import { getSiteTheme } from "@/lib/constants/site-themes";
import { ThemeScene } from "@/components/layout/theme-scene";
import { FACEBOOK_URL } from "@/lib/constants/contact";

export interface SidebarProfile {
  fullName: string | null;
  email: string;
  avatarUrl: string | null;
  equippedShopItemId: string | null;
  role: "STUDENT" | "ADMIN";
  streakCount: number;
  targetScore: number | null;
  currentScore: number | null;
  plan: "FREE" | "PRO";
  proExpiresAt: Date | null;
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Darkens the top (logo + menu) for legible labels and fades out lower
 * down, where the scene's subject (the cat on its lily pad, by default)
 * sits between the menu and the streak card. */
const SIDEBAR_SCRIM_DARK =
  "linear-gradient(180deg, rgba(5,11,9,0.82) 0%, rgba(5,11,9,0.72) 50%, rgba(5,11,9,0.12) 66%, rgba(5,11,9,0.5) 100%)";
const SIDEBAR_SCRIM_LIGHT =
  "linear-gradient(180deg, rgba(238,247,243,0.92) 0%, rgba(238,247,243,0.86) 50%, rgba(238,247,243,0.08) 66%, rgba(238,247,243,0.4) 100%), linear-gradient(180deg, #e9f6f1 36%, transparent 52%)";

export function AppSidebar({ profile, siteThemeId }: { profile: SidebarProfile; siteThemeId: string }) {
  const pathname = usePathname();
  const theme = getSiteTheme(siteThemeId);
  // Same rule as src/lib/auth.ts's isPro() — that file is server-only, so it
  // can't be imported into this client component; see top-header.tsx for the
  // same duplicated one-liner.
  const isPro = profile.plan === "PRO" && (!profile.proExpiresAt || profile.proExpiresAt > new Date());

  // The sidebar carries the same Live theme scene as the dashboard hero
  // (animated for lily-pond-cat), under a scrim that keeps menu text crisp.
  return (
    <aside className="fixed inset-y-0 left-0 z-40 isolate hidden w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex dark:border-white/[0.06]">
      {/* Scene at half height (the whole pond fits), lifted above the streak
          card so the cat is not hidden; the scrim's fade hides where the
          scene starts. Day art in light mode, night art in dark mode. */}
      <ThemeScene
        themeId={siteThemeId}
        size="auto 50%"
        position="59% calc(100% - 140px)"
        scrim={{
          light: SIDEBAR_SCRIM_LIGHT,
          dark: `${SIDEBAR_SCRIM_DARK}, linear-gradient(180deg, ${theme.swatchTo} 36%, transparent 52%)`,
        }}
      />
      <Link href="/dashboard" className="flex items-center gap-2.5 px-6 py-6">
        <EquippableLogoMark size={36} equippedShopItemId={profile.equippedShopItemId} />
        <span className="flex items-baseline gap-1 text-lg leading-[1.1] whitespace-nowrap">
          <span className="font-black tracking-[-0.04em] text-sidebar-active">TOEIC</span>
          <span className="bg-gradient-to-r from-primary via-[#0d9488] to-[#14b8a6] bg-clip-text dark:from-[#2dd4bf] dark:via-[#5eead4] dark:to-[#a7f3d0] pr-1 pb-0.5 font-extrabold tracking-[-0.03em] text-transparent italic">
            Mastery
          </span>
        </span>
      </Link>

      <nav data-tour="dashboard-sidebar-nav" className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 dark:[text-shadow:0_1px_2px_rgba(0,0,0,0.55)]">
        {MAIN_NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-300",
                active
                  ? "bg-white/80 font-semibold text-sidebar-active shadow-sm dark:bg-white/[0.12] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] before:absolute before:top-1/2 before:left-0 before:h-5 before:w-[3px] before:-translate-y-1/2 before:rounded-full before:bg-sidebar-ring"
                  : "text-sidebar-foreground hover:bg-white/60 hover:text-sidebar-active dark:text-white/75 dark:hover:bg-white/[0.08] dark:hover:text-white"
              )}
            >
              <item.icon className="size-[18px] shrink-0" strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}

        {profile.role === "ADMIN" && (
          <Link
            href="/admin"
            aria-current={isActive(pathname, "/admin") ? "page" : undefined}
            className={cn(
              "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-300",
              isActive(pathname, "/admin")
                ? "bg-white/80 font-semibold text-sidebar-active shadow-sm dark:bg-white/[0.12] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] before:absolute before:top-1/2 before:left-0 before:h-5 before:w-[3px] before:-translate-y-1/2 before:rounded-full before:bg-sidebar-ring"
                : "text-sidebar-foreground hover:bg-white/60 hover:text-sidebar-active dark:text-white/75 dark:hover:bg-white/[0.08] dark:hover:text-white"
            )}
          >
            <ShieldCheck className="size-[18px] shrink-0" />
            Quản trị
          </Link>
        )}

        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-muted-foreground transition-colors hover:bg-sidebar-active-bg/60 hover:text-sidebar-foreground"
        >
          <Headset className="size-[18px] shrink-0" />
          Liên hệ
        </a>
      </nav>

      <div className="flex flex-col gap-3 px-3 pb-4">
        <div className="rounded-2xl border border-sidebar-border bg-white/80 shadow-sm dark:border-white/[0.08] dark:bg-[#050b09]/70 dark:shadow-none p-3.5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-medium text-sidebar-foreground">
              <Flame className="size-4 text-warning" /> Streak
            </span>
            <span className="font-semibold text-sidebar-active tabular-nums">{profile.streakCount} ngày</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-medium text-sidebar-foreground">
              <Target className="size-4 text-info" /> Mục tiêu
            </span>
            <span className="font-semibold text-sidebar-active tabular-nums">
              {profile.currentScore ?? "-"} / {profile.targetScore ?? "?"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-sidebar-border bg-white/80 shadow-sm dark:border-white/[0.08] dark:bg-[#050b09]/70 dark:shadow-none p-2">
          <Link
            href="/account/profile"
            className="flex flex-1 items-center gap-2.5 rounded-xl px-1.5 py-1 hover:bg-sidebar-active-bg/60"
          >
            <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-active-bg text-sidebar-foreground">
              <span className="flex size-full items-center justify-center overflow-hidden rounded-full">
                <AccountAvatar
                  avatarUrl={profile.avatarUrl}
                  equippedShopItemId={profile.equippedShopItemId}
                  size={32}
                  fallback={<User className="size-4" />}
                />
              </span>
              {isPro && (
                <span
                  className="absolute -right-0.5 -bottom-0.5 flex size-3.5 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 ring-2 ring-sidebar"
                  title="Tài khoản Pro"
                >
                  <Crown className="size-2 fill-white text-white" />
                </span>
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold text-sidebar-active">{profile.fullName || "Học viên"}</span>
              <span className="block truncate text-[11px] text-sidebar-muted-foreground">{profile.email}</span>
            </span>
          </Link>
          <Link
            href="/settings"
            className="flex size-8 shrink-0 items-center justify-center rounded-xl text-sidebar-muted-foreground hover:bg-sidebar-active-bg/60 hover:text-sidebar-active"
            aria-label="Cài đặt"
          >
            <Settings className="size-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
