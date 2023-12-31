import "@/app/globals.css";
import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { memo } from "react";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "black" },
    { media: "(prefers-color-scheme: light)", color: "white" },
  ],
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon-16x16.png",
    apple: "/favicons/apple-touch-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "テッケン",
    description: "東京藝術大学 テクノロジー研究会",
    site: "https://tekken.work",
    images: [
      {
        url: "https://tekken.work/ogp.png",
        width: 2000,
        height: 1000,
      },
    ],
  },
  openGraph: {
    title: "テッケン",
    description: "東京藝術大学 テクノロジー研究会",
    url: "https://tekken.work",
    siteName: "テッケン",
    images: [
      {
        url: "https://tekken.work/ogp.png",
        width: 2000,
        height: 1000,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },

  viewport: {
    width: "device-width",
    viewportFit: "cover",
    initialScale: 1.0,
    maximumScale: 1.0,
    minimumScale: 1.0,
    userScalable: false,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="ja">
        <head></head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased scroll-smooth"
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col ">
              {children}
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
