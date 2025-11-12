import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";

import "./globals.css";
import { SiteNav } from "./components/site-nav";
import { ImageGuard } from "./components/image-guard";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

const siteUrl = "https://www.milesgoround.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Miles Go Round | Slow Travel Stories & Points Guides",
    template: "%s | Miles Go Round",
  },
  description:
    "Miles Go Round shares immersive travel stories, practical guides, and tips for turning points into unforgettable journeys.",
  keywords: [
    "slow travel",
    "travel stories",
    "travel hacking",
    "loyalty programs",
    "points and miles",
    "remote work travel",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Miles Go Round | Slow Travel Stories & Points Guides",
    description:
      "Explore mindful journeys, practical journals, and loyalty program tips designed to make every mile meaningful.",
    siteName: "Miles Go Round",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miles Go Round | Slow Travel Stories & Points Guides",
    description:
      "Explore mindful journeys, practical journals, and loyalty program tips designed to make every mile meaningful.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Miles Go Round",
  url: siteUrl,
  sameAs: ["https://instagram.com", "https://youtube.com"],
  logo: `${siteUrl}/favicon.ico`,
  description:
    "Miles Go Round is a travel storytelling studio helping readers plan intentional journeys with points and miles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} bg-slate-950 antialiased`}>
        <a className="skip-nav" href="#main-content">
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-amber-50 to-sky-50 text-slate-900">
          <ImageGuard />
          <SiteNav />
          <main id="main-content" className="flex-1 focus:outline-none">
            {children}
          </main>
        </div>
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
