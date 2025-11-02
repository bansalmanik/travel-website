import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "./components/site-nav";

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
      <body className="font-sans antialiased bg-zinc-50 dark:bg-black">
        <div className="flex min-h-screen flex-col">
          <SiteNav />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
