import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteNav } from "./components/site-nav";
import { ImageGuard } from "./components/image-guard";

const siteUrl = "https://www.milesgoround.com";

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
    "slow travel",
    "points and miles",
    "travel guides",
    "loyalty programs",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Miles Go Round",
    description:
      "Discover heartfelt travel stories, field notes, and practical ways to turn miles and points into unforgettable adventures.",
    siteName: "Miles Go Round",
    images: [
      {
        url: "/images/content/cover_1.JPG",
        width: 1200,
        height: 630,
        alt: "Sunset over mountains and fjords",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miles Go Round",
    description:
      "Travel stories and points strategies that help you explore more with less.",
    images: ["/images/content/cover_1.JPG"],
    creator: "@milesgoround",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Miles Go Round",
  url: siteUrl,
  description:
    "Miles Go Round curates soulful travel inspiration, destination guides, and loyalty program strategies for thoughtful travelers.",
  sameAs: [
    "https://instagram.com",
    "https://youtube.com",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-50 text-slate-900">
        <a
          className="skip-link"
          href="#main-content"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className="flex min-h-screen flex-col">
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
