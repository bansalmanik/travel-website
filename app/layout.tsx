import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "./components/site-nav";
import { MobileQuickNav } from "./components/mobile-quick-nav";
import { ImageGuard } from "./components/image-guard";

export const metadata: Metadata = {
  title: "Miles Go Round",
  description:
    "Miles Go Round shares immersive travel stories, practical guides, and tips for turning points into unforgettable journeys.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-50 dark:bg-black">
        <div className="flex min-h-screen flex-col">
          <ImageGuard />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:uppercase focus:tracking-[0.2em] focus:text-slate-900 focus:shadow-lg"
          >
            Skip to content
          </a>
          <SiteNav />
          <main id="main-content" className="flex-1 pb-28 md:pb-0">
            {children}
          </main>
          <MobileQuickNav />
        </div>
      </body>
    </html>
  );
}
