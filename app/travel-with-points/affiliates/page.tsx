import type { Metadata } from "next";
import Link from "next/link";

const pageTitle = "Affiliates Website | Miles Go Round";
const pageDescription =
  "Explore upcoming tools and partnerships for creators who want to share point-savvy travel resources.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/travel-with-points/affiliates",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "https://example.com/travel-with-points/affiliates",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function AffiliatesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-12 px-6 py-24 text-center lg:py-32">
        <span className="inline-flex items-center rounded-full border border-rose-200/40 bg-rose-100/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-rose-200">
          Affiliates
        </span>
        <div className="space-y-5">
          <h1 className="text-4xl font-semibold sm:text-5xl">Affiliates Website</h1>
          <p className="text-base leading-7 text-slate-200/80">
            We&apos;re curating a space for partners, curators, and creators to share tools that make traveling with
            points even easier. Check back soon for launch details, affiliate kits, and collaborative campaign ideas.
          </p>
        </div>
        <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-8 text-sm leading-6 text-slate-100/80">
          <p className="font-semibold uppercase tracking-[0.3em] text-rose-200/90">Status</p>
          <p className="text-lg font-medium text-white">Coming soon</p>
          <p>
            Want a heads-up when the portal opens? Join the newsletter from the homepage and you&apos;ll be first to know about
            beta invites and affiliate guidelines.
          </p>
        </div>
        <Link href="/travel-with-points" className="inline-flex items-center text-sm font-semibold text-amber-300">
          <svg
            aria-hidden
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5" />
            <path d="m12 5-7 7 7 7" />
          </svg>
          Back to travel with points
        </Link>
      </div>
    </main>
  );
}
