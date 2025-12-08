
import { Noto_Sans_KR } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import type { Metadata } from "next";

import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PicSel - 스마트한 결제 가이드",
  description: "국내 쇼핑몰 결제 시 최적의 결제수단을 추천해드립니다.",
  icons: {
    icon: "/picsel.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${notoSansKr.variable} antialiased font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
