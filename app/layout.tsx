import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteNav } from "./components/site-nav";
import { ImageGuard } from "./components/image-guard";
import Script from "next/script";

const siteUrl = "https://www.milesgoround.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Miles Go Round | Slow Travel Stories & Points Guides",
    template: "%s | Miles Go Round",
  },
  description:
    "Miles Go Round shares immersive travel stories, soulful itineraries, and practical guides for stretching every mile and point.",
  keywords: [
    "slow travel",
    "travel stories",
    "points travel",
    "miles and points",
    "travel guides",
    "loyalty programs",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Miles Go Round",
    title: "Miles Go Round | Slow Travel Stories & Points Guides",
    description:
      "Explore mindful travel stories, destination travel resources, and loyalty program breakdowns to help you travel better for less.",
    images: [
      {
        url: "/images/content/cover_1.jpg",
        width: 1200,
        height: 630,
        alt: "Sunset over mountains and fjords",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@milesgoround",
    title: "Miles Go Round | Slow Travel Stories & Points Guides",
    description:
      "Discover immersive travelogues, practical travel tips, and how to turn loyalty points into real adventures.",
    images: ["/images/content/cover_1.jpg"],
  },
  authors: [{ name: "Miles Go Round" }],
  creator: "Miles Go Round",
  publisher: "Miles Go Round",
  icons: {
    icon: [
      { url: "/Logo/MilesGoRound-Logo-Blue.png", type: "image/png" },
    ],
    apple: "/Logo/MilesGoRound-Logo-Blue.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-B106KK769W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-B106KK769W');
          `}
        </Script>
      </head>
      <body className="antialiased bg-zinc-50 text-slate-900">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <ImageGuard />
          <SiteNav />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Miles Go Round',
                url: siteUrl,
                potentialAction: {
                  '@type': 'SearchAction',
                  target: `${siteUrl}/search?q={search_term_string}`,
                  'query-input': 'required name=search_term_string',
                },
              }),
            }}
          />
        </div>
      </body>
    </html>
  );
}
