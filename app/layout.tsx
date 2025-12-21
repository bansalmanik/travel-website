import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteNav } from "./components/site-nav";
import { ImageGuard } from "./components/image-guard";
import Script from "next/script";

const siteUrl = "https://www.milesgoround.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
      default: "Miles Go Round | Travel Guides, Points & Miles Strategies",
    template: "%s | Miles Go Round",
  },
  description:
    "Travel guides, real experiences, and practical advice on using points, miles, and credit cards to book flights and hotels smarter.",
  keywords: [
      "travel guides",
      "travel blog",
      "points and miles",
      "airline miles",
      "hotel points",
      "credit card rewards",
      "loyalty programs",
      "travel rewards",
      "flight booking tips",
      "hotel booking tips",
  ],
  applicationName: "Miles Go Round",
  category: "travel",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": `${siteUrl}/rss.xml`,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Miles Go Round",
      title: "Miles Go Round | Travel Guides, Points & Miles Strategies",
    description:
      "Travel guides, real experiences, and practical advice on using points, miles, and credit cards to book flights and hotels smarter.",
    locale: "en_US",
    images: [
      {
        url: "/images/content/cover_1.jpg",
        width: 1200,
        height: 630,
        alt: "Sunset over mountains and fjords",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@milesgoround",
    creator: "@milesgoround",
      title: "Miles Go Round | Travel Guides, Points & Miles Strategies",
    description:
      "Travel guides, real experiences, and practical advice on using points, miles, and credit cards to book flights and hotels smarter.",
    images: ["/images/content/cover_1.jpg"],
  },
  authors: [{ name: "Miles Go Round", url: siteUrl }],
  creator: "Miles Go Round",
  publisher: "Miles Go Round",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "google-site-verification": "your-google-verification-code",
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
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
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
                '@graph': [
                  {
                    '@type': 'WebSite',
                    '@id': `${siteUrl}/#website`,
                    name: 'Miles Go Round',
                    url: siteUrl,
                        description: 'Travel guides, real experiences, and practical advice on using points, miles, and credit cards to book flights and hotels smarter.',
                    inLanguage: 'en-US',
                    potentialAction: {
                      '@type': 'SearchAction',
                      target: `${siteUrl}/search?q={search_term_string}`,
                      'query-input': 'required name=search_term_string',
                    },
                  },
                  {
                    '@type': 'Organization',
                    '@id': `${siteUrl}/#organization`,
                    name: 'Miles Go Round',
                    url: siteUrl,
                    logo: {
                      '@type': 'ImageObject',
                      url: `${siteUrl}/Logo/MilesGoRound-Logo-Blue.png`,
                      width: 512,
                      height: 512,
                    },
                    sameAs: [
                      'https://www.instagram.com/milesgoround/',
                      'https://www.youtube.com/@milesGoRound',
                      'https://x.com/milesGoRound',
                    ],
                    contactPoint: {
                      '@type': 'ContactPoint',
                      email: 'info@milesgoround.com',
                      contactType: 'customer service',
                      availableLanguage: 'English',
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </body>
    </html>
  );
}
