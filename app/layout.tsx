import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "./components/site-nav";
import { ImageGuard } from "./components/image-guard";
import { SkipToContent } from "./components/skip-to-content";
import { JsonLd } from "./components/json-ld";

const siteUrl = "https://example.com";

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Miles Go Round",
  url: siteUrl,
  logo: `${siteUrl}/globe.svg`,
  sameAs: [
    "https://instagram.com",
    "https://youtube.com",
    "mailto:hello@milesgoround.com",
  ],
  description:
    "Miles Go Round shares immersive travel stories, practical guides, and tips for turning points into unforgettable journeys.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Miles Go Round",
    template: "%s | Miles Go Round",
  },
  description:
    "Miles Go Round shares immersive travel stories, practical guides, and tips for turning points into unforgettable journeys.",
  keywords: [
    "travel stories",
    "travel hacking",
    "points and miles",
    "slow travel",
    "travel journal",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Miles Go Round",
    description:
      "Discover immersive travel stories, mindful guides, and practical ways to turn points into unforgettable journeys.",
    url: siteUrl,
    siteName: "Miles Go Round",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/images/og-cover.jpg`,
        width: 1200,
        height: 630,
        alt: "Miles Go Round travel website cover art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miles Go Round",
    description:
      "Explore immersive travel stories, mindful field notes, and tips for making the most of miles and points.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 font-sans text-slate-900 antialiased">
        <SkipToContent />
        <JsonLd data={organizationStructuredData} />
        <div className="flex min-h-screen flex-col">
          <ImageGuard />
          <SiteNav />
          <main id="main-content" className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
