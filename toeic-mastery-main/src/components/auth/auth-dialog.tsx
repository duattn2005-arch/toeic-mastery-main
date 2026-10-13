"use client";

import { Suspense } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { GoogleAuthButton } from "@/app/(auth)/google-auth-button";
import { AuthDivider } from "@/app/(auth)/auth-inputs";
import { EmailLoginForm } from "@/app/(auth)/login/login-form";
import { EmailRegisterForm } from "@/app/(auth)/register/register-form";
import { DEFAULT_SITE_THEME_ID } from "@/lib/constants/site-themes";
import { ThemeScene } from "@/components/layout/theme-scene";


export type AuthDialogTab = "login" | "register";

const COPY: Record<AuthDialogTab, { title: string; subtitle: string }> = {
  login: { title: "Đăng Nhập", subtitle: "Chào mừng bạn quay trở lại hành trình luyện thi TOEIC." },
  register: { title: "Đăng Ký", subtitle: "Tạo tài khoản miễn phí và bắt đầu chinh phục điểm TOEIC mục tiêu." },
};

/** Landing-page popup version of the login/register flow (see the reference
 * screenshot this was built to match) — reuses the exact same form/action
 * components as the full-page /login and /register routes (which still
 * exist on their own for direct links and the auth proxy's redirect), just
 * inside a Dialog with a scenic header and an in-place tab switch instead
 * of a page navigation. */
export function AuthDialog({
  open,
  onOpenChange,
  tab,
  onTabChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Fully controlled by the caller (see landing-auth-buttons.tsx) rather
   * than defaulted-then-synced internally — that "sync a prop into state
   * via useEffect" shape causes an extra render on every open and is exactly
   * what React's docs recommend against; the caller already tracks which
   * tab a given trigger button should open, so it's the source of truth. */
  tab: AuthDialogTab;
  onTabChange: (tab: AuthDialogTab) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md gap-0 overflow-hidden p-0" showCloseButton={false}>
        <DialogTitle className="sr-only">{COPY[tab].title}</DialogTitle>

        {/* Header is the default theme's scene itself (mèo đen bên hồ sen),
            cropped around the cat: morning art in light mode, night art in
            dark mode. The SVG animates on its own, no extra JS. */}
        <div className="relative isolate h-44 overflow-hidden text-foreground dark:text-white">
          <ThemeScene
            themeId={DEFAULT_SITE_THEME_ID}
            size="160% auto"
            position="24% 64%"
            scrim={{
              light: "linear-gradient(90deg, rgba(244,250,247,0.94) 0%, rgba(244,250,247,0.7) 45%, transparent 70%)",
              dark: "linear-gradient(90deg, rgba(6,14,11,0.82) 0%, rgba(6,14,11,0.45) 45%, transparent 70%)",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-popover to-transparent" aria-hidden />

          <DialogClose
            className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-black/45"
            aria-label="Đóng"
          >
            <X className="size-4" />
          </DialogClose>

          <div className="relative flex h-full max-w-[60%] flex-col justify-center px-6 pb-4">
            <h2 className="text-2xl font-extrabold tracking-tight">{COPY[tab].title}</h2>
            <p className="mt-1.5 text-sm leading-snug text-foreground/75 dark:text-white/80">{COPY[tab].subtitle}</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 px-6 py-6">
          <div className="flex rounded-full bg-muted p-1">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onTabChange(t)}
                className={cn(
                  "flex-1 rounded-full py-2.5 text-center text-sm font-semibold transition-colors",
                  tab === t ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t === "login" ? "Đăng Nhập" : "Đăng Ký"}
              </button>
            ))}
          </div>

          {/* GoogleAuthButton reads ?next= via useSearchParams, which
              requires a Suspense boundary in the App Router. */}
          <Suspense fallback={<div className="h-12 w-full animate-pulse rounded-full bg-muted" />}>
            <GoogleAuthButton />
          </Suspense>

          <AuthDivider label="Hoặc bằng tài khoản" />

          {tab === "login" ? <EmailLoginForm /> : <EmailRegisterForm />}

          <p className="text-center text-xs text-muted-foreground">
            {tab === "login" ? (
              <>
                Chưa có tài khoản?{" "}
                <button type="button" onClick={() => onTabChange("register")} className="font-semibold text-primary hover:underline">
                  Đăng ký ngay tại đây
                </button>
              </>
            ) : (
              <>
                Đã có tài khoản?{" "}
                <button type="button" onClick={() => onTabChange("login")} className="font-semibold text-primary hover:underline">
                  Đăng nhập ngay tại đây
                </button>
              </>
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
