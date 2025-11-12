import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteNav } from "./components/site-nav";
import { ImageGuard } from "./components/image-guard";

const siteName = "Miles Go Round";
const siteUrl = "https://www.milesgoround.com";
const siteDescription =
  "Miles Go Round shares immersive travel stories, practical guides, and tips for turning points into unforgettable journeys.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "travel stories",
    "slow travel",
    "travel guides",
    "points travel",
    "frequent flyer tips",
    "travel inspiration",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteName,
    description: siteDescription,
    siteName,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteName} — soulful travel stories and guides`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    creator: "@milesgoround",
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Travel",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#0f172a" }],
};

const structuredData = {
  '@context': "https://schema.org",
  '@type': "WebSite",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  potentialAction: {
    '@type': "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    'query-input': "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-zinc-50">
      <body className="antialiased bg-zinc-50 font-sans text-slate-900">
        <Script id="site-structured-data" type="application/ld+json">
          {JSON.stringify(structuredData)}
        </Script>
        <div className="flex min-h-screen flex-col">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow-lg"
          >
            Skip to content
          </a>
          <ImageGuard />
          <SiteNav />
          <main id="main-content" className="flex-1 focus:outline-none">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
