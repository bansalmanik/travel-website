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
    "Your ultimate guide to travel rewards. Discover destination guides, credit card strategies, hotel & airline loyalty programs, and tips to maximize points and miles for free flights and hotel stays.",
  keywords: [
    "travel guides",
    "points and miles",
    "travel rewards",
    "credit card rewards",
    "airline miles",
    "hotel points",
    "frequent flyer programs",
    "loyalty programs",
    "free flights",
    "travel hacking",
    "destination guides",
    "travel tips",
    "India travel credit cards",
    "Marriott Bonvoy",
    "airline alliances",
  ],
  applicationName: "Miles Go Round",
  category: "travel",
  classification: "Travel & Tourism",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
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
    // Add your actual verification codes here
    // google: "your-actual-google-verification-code",
    // yandex: "your-actual-yandex-verification-code",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Miles Go Round",
    title: "Miles Go Round | Travel Guides, Points & Miles Strategies",
    description:
      "Your ultimate guide to travel rewards. Discover destination guides, credit card strategies, and tips to maximize points and miles for free flights and hotel stays.",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/images/content/cover_1.jpg`,
        width: 1200,
        height: 630,
        alt: "Miles Go Round - Travel Guides & Rewards Strategies",
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
      "Your ultimate guide to travel rewards. Discover destination guides, credit card strategies, and tips to maximize points and miles.",
    images: [`${siteUrl}/images/content/cover_1.jpg`],
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
      { url: "/favicon.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  manifest: "/manifest.json",
  other: {
    // Add your actual Google verification code here
    // "google-site-verification": "your-actual-google-verification-code",
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
                    description: 'Your ultimate guide to travel rewards. Discover destination guides, credit card strategies, and tips to maximize points and miles for free flights and hotel stays.',
                    inLanguage: 'en-US',
                    potentialAction: {
                      '@type': 'SearchAction',
                      target: {
                        '@type': 'EntryPoint',
                        urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
                      },
                      'query-input': 'required name=search_term_string',
                    },
                  },
                  {
                    '@type': 'Organization',
                    '@id': `${siteUrl}/#organization`,
                    name: 'Miles Go Round',
                    url: siteUrl,
                    description: 'Travel guides and rewards strategies to help you travel smarter with points and miles.',
                    logo: {
                      '@type': 'ImageObject',
                      '@id': `${siteUrl}/#logo`,
                      url: `${siteUrl}/Logo/MilesGoRound-Logo-Blue.png`,
                      contentUrl: `${siteUrl}/Logo/MilesGoRound-Logo-Blue.png`,
                      width: 512,
                      height: 512,
                      caption: 'Miles Go Round',
                    },
                    image: {
                      '@id': `${siteUrl}/#logo`,
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
                      availableLanguage: ['English'],
                    },
                    foundingDate: '2024',
                    knowsAbout: [
                      'Travel Rewards',
                      'Points and Miles',
                      'Credit Card Rewards',
                      'Airline Loyalty Programs',
                      'Hotel Loyalty Programs',
                      'Travel Hacking',
                    ],
                  },
                  {
                    '@type': 'BreadcrumbList',
                    '@id': `${siteUrl}/#breadcrumb`,
                    itemListElement: [
                      {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: siteUrl,
                      },
                    ],
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
