import type { Metadata } from "next";
import Link from "next/link";

const programName = "Axis Travel Edge";
const pageTitle = `${programName} | Bank Programs | Miles Go Round`;
const pageDescription =
  "Discover strategies for earning and redeeming Axis Bank Edge Reward points once this guide is live.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/travel-with-points/bank-programs/axis-travel-edge",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "article",
    url: "https://example.com/travel-with-points/bank-programs/axis-travel-edge",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function AxisTravelEdgePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 px-6 py-24 text-center lg:py-32">
        <span className="inline-flex items-center rounded-full border border-rose-200/40 bg-rose-100/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-rose-200">
          {programName}
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold sm:text-5xl">{programName}</h1>
          <p className="text-base leading-7 text-slate-200/80">
            We are assembling practical tips, sweet spot awards, and transfer partner plays for Axis Travel Edge users.
            Check back soon for the full breakdown.
          </p>
        </div>
        <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-8 text-sm leading-6 text-slate-100/80">
          <p className="font-semibold uppercase tracking-[0.3em] text-rose-200/90">Status</p>
          <p className="text-lg font-medium text-white">Coming soon</p>
        </div>
        <Link href="/travel-with-points/bank-programs" className="inline-flex items-center text-sm font-semibold text-amber-300">
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
          Back to bank programs
        </Link>
      </div>
    </main>
  );
}
