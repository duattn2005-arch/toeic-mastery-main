import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AuthEventTracker } from "@/components/shared/auth-event-tracker";
import { CookieNotice } from "@/components/shared/cookie-notice";

// The site reports to every property below, so whichever one is open in the
// GA4 dashboard shows the numbers. The first ID loads gtag.js; the second
// (the property used until 2026-10-13, which also forwards to its linked
// G-CCTBJ73HK1) keeps receiving hits — after the switch to the new ID its
// reports silently dropped to zero.
const GA_MEASUREMENT_IDS = ["G-XNZY09JDNQ", "G-GDBZE58K1G"];
const GA_MEASUREMENT_ID = GA_MEASUREMENT_IDS[0];

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  // Lets Next resolve the file-convention opengraph-image.png (see
  // src/app/opengraph-image.png) to an absolute URL — required for link
  // previews on other sites/apps, which can't follow a relative one.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "TOEIC Mastery - Nền tảng luyện thi TOEIC toàn diện",
    template: "%s - TOEIC Mastery",
  },
  description:
    "Luyện đề TOEIC sát thực tế, Listening & Reading đầy đủ 7 Part, từ điển thông minh, flashcard lặp lại ngắt quãng và phân tích điểm yếu theo từng kỹ năng.",
};

export const viewport: Viewport = {
  themeColor: "#0f766e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${jakarta.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-background font-sans text-foreground" suppressHydrationWarning>
        {/* No cookie-consent manager here on purpose: Secure Privacy's script
            (app.secureprivacy.ai/script/6a9942ee4e74644db5656e70.js) set Google
            Consent Mode to analytics_storage "denied" by default before gtag
            loaded, and its banner's Accept button has never worked for this
            domain — so GA4 recorded nothing. GA4 below grants full consent itself. */}
        <Providers>{children}</Providers>
        <AuthEventTracker />
        <CookieNotice />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        {/* beforeInteractive: the consent + config commands must be queued
            before any React code runs, or an early trackEvent() (e.g. the
            sign_up / login event AuthEventTracker sends on hydration) lands
            on dataLayer ahead of config and GA4 drops it. */}
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            // The Google tag's account-side settings default every consent
            // type to "denied" (gcs=G100: no _ga cookie, only anonymous pings,
            // so reports showed 0) — even on a bare page with just this ID.
            // Granting here, before config, makes the very first page_view a
            // full hit (gcs=G111) and lets GA4 set its cookies.
            var granted = { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted', functionality_storage: 'granted', personalization_storage: 'granted', security_storage: 'granted' };
            gtag('consent', 'default', granted);
            gtag('consent', 'update', granted);
            gtag('js', new Date());
            ${GA_MEASUREMENT_IDS.map((id) => `gtag('config', '${id}');`).join("\n            ")}
          `}
        </Script>
      </body>
    </html>
  );
}
