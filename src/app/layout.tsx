
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Noto_Sans_KR } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import type { Metadata } from "next";

import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://picsel.vercel.app"),
  title: {
    default: "PicSel - 스마트한 결제 가이드",
    template: "%s | PicSel",
  },
  description: "국내 쇼핑몰 결제 시 최적의 결제수단을 추천해드립니다. AI 기반 소비 분석으로 혜택을 놓치지 마세요.",
  keywords: ["결제", "카드 추천", "AI 분석", "소비 혜택", "캐시백", "포인트 적립", "스마트 결제"],
  authors: [{ name: "PicSel Team" }],
  creator: "PicSel",
  publisher: "PicSel",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://picsel.vercel.app",
    siteName: "PicSel",
    title: "PicSel - 스마트한 결제 가이드",
    description: "국내 쇼핑몰 결제 시 최적의 결제수단을 AI가 추천해드립니다.",
    images: [
      {
        url: "/picsel.svg",
        width: 1200,
        height: 630,
        alt: "PicSel 로고",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PicSel - 스마트한 결제 가이드",
    description: "국내 쇼핑몰 결제 시 최적의 결제수단을 추천해드립니다.",
    images: ["/picsel.svg"],
    creator: "@picsel_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/picsel.svg",
    shortcut: "/picsel.svg",
    apple: "/picsel.svg",
  },
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PicSel",
  },
};

// eslint-disable-next-line no-restricted-syntax
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PicSel",
    description: "국내 쇼핑몰 결제 시 최적의 결제수단을 추천해드립니다",
    url: "https://picsel.vercel.app",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
  };

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${notoSansKr.variable} antialiased font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
