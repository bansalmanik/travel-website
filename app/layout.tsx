import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";
import { SiteNav } from "./components/site-nav";
import { ImageGuard } from "./components/image-guard";

const siteUrl = new URL("https://www.milesgoround.com");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Miles Go Round | Slow Travel Guides & Loyalty Tips",
    template: "%s | Miles Go Round",
  },
  description:
    "Miles Go Round shares immersive travel stories, slow travel inspiration, and actionable loyalty tips so you can see more of the world without adding stress.",
  keywords: [
    "travel blog",
    "slow travel",
    "points and miles",
    "travel guides",
    "loyalty program tips",
  ],
  authors: [{ name: "Miles Go Round" }],
  creator: "Miles Go Round",
  publisher: "Miles Go Round",
  alternates: {
    canonical: siteUrl.toString(),
  },
  openGraph: {
    type: "website",
    url: siteUrl.toString(),
    title: "Miles Go Round | Slow Travel Guides & Loyalty Tips",
    description:
      "Discover heartfelt travel journals, destination stories, and practical ways to turn credit card points into meaningful adventures.",
    siteName: "Miles Go Round",
    images: [
      {
        url: new URL("/images/og-cover.jpg", siteUrl).toString(),
        width: 1200,
        height: 630,
        alt: "Sunset hike overlooking mountains and water",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@milesgoround",
    title: "Miles Go Round | Slow Travel Guides & Loyalty Tips",
    description:
      "Plan soulful journeys and learn to travel better with stories, guides, and loyalty program breakdowns from Miles Go Round.",
    images: [new URL("/images/og-cover.jpg", siteUrl).toString()],
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Miles Go Round",
  url: siteUrl.toString(),
  logo: new URL("/images/og-cover.jpg", siteUrl).toString(),
  sameAs: [
    "https://www.instagram.com/milesgoround",
    "https://www.youtube.com/@milesgoround",
    "mailto:hello@milesgoround.com",
  ],
  description:
    "Miles Go Round is a travel website with guides, journals, and loyalty program strategies for mindful explorers.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Miles Go Round",
  url: siteUrl.toString(),
  description:
    "Miles Go Round curates slow travel inspiration and points strategies to help you explore the world thoughtfully.",
  inLanguage: "en",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-zinc-50 text-slate-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:inset-x-4 focus:top-4 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <ImageGuard />
          <SiteNav />
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </div>
        <Script
          id="schema-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
