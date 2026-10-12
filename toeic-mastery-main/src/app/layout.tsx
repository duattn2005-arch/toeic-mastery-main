import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/providers";

const GA_MEASUREMENT_ID = "G-GDBZE58K1G";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  // Lets Next resolve the file-convention opengraph-image.png (see
  // src/app/opengraph-image.png) to an absolute URL — required for link
  // previews on other sites/apps, which can't follow a relative one.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "TOEIC Mastery — Nền tảng luyện thi TOEIC toàn diện",
    template: "%s — TOEIC Mastery",
  },
  description:
    "Luyện đề TOEIC sát thực tế, Listening & Reading đầy đủ 7 Part, từ điển thông minh, flashcard lặp lại ngắt quãng và phân tích điểm yếu theo từng kỹ năng.",
};

export const viewport: Viewport = {
  themeColor: "#5b4bf0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-background font-sans text-foreground" suppressHydrationWarning>
        {/* No cookie-consent manager here on purpose: Secure Privacy's script
            (app.secureprivacy.ai/script/6a9942ee4e74644db5656e70.js) set Google
            Consent Mode to analytics_storage "denied" by default before gtag
            loaded, and its banner's Accept button has never worked for this
            domain — so GA4 recorded nothing. GA4 below runs with full consent. */}
        <Providers>{children}</Providers>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
