import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "./components/site-nav";
import { ImageGuard } from "./components/image-guard";
import { SiteFooter } from "./components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://milesgoround.example"),
  title: {
    default: "Miles Go Round",
    template: "%s | Miles Go Round",
  },
  description:
    "Miles Go Round shares immersive travel stories, practical guides, and tips for turning points into unforgettable journeys.",
  keywords: [
    "slow travel blog",
    "travel storytelling",
    "travel with points",
    "points and miles guide",
    "immersive travel journals",
  ],
  alternates: {
    canonical: "https://milesgoround.example",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://milesgoround.example",
    title: "Miles Go Round",
    description:
      "Travel stories, point strategies, and journals to help you explore the world with intention.",
    siteName: "Miles Go Round",
    images: [
      {
        url: "https://milesgoround.example/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mountain view with a winding river at sunset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miles Go Round",
    description:
      "Travel stories, point strategies, and journals to help you explore the world with intention.",
    images: ["https://milesgoround.example/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-50 font-sans text-slate-900 antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <ImageGuard />
          <SiteNav />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
