import { LandingNav } from "@/components/marketing/landing-nav";

/**
 * Minimal shell for `(app)` routes visited while logged out — used only by
 * routes that opt into a public preview (currently /practice) instead of
 * the layout's default hard redirect to /login. No sidebar/user data, since
 * there's no profile yet; just enough chrome to feel like part of the site
 * rather than a dead end, with the real AppShell taking over once signed in.
 */
export function PublicAppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <LandingNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-10 pb-16 md:px-6">{children}</main>
    </div>
  );
}
