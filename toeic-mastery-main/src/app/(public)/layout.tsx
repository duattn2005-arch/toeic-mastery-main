import { LandingNav } from "@/components/marketing/landing-nav";
import { SiteFooter } from "@/components/public/site-footer";

/** Shell for the public, crawlable content (word lists, guides, free quiz):
 * the same landing nav and the shared footer. Nothing here reads the
 * session, so these pages stay static. */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <LandingNav />
      <main id="main" className="mx-auto w-full max-w-4xl flex-1 px-4 pt-10 pb-16 md:px-6">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
