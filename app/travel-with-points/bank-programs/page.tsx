import type { Metadata } from "next";
import Link from "next/link";

import type { BankProgram } from "@/app/travel-with-points/bank-programs/types";
import { getBankProgramContent } from "@/lib/contentData";

const pageTitle = "Bank Programs | Miles Go Round";
const pageDescription =
  "Compare Indian bank travel portals, shopping ecosystems, and transfer partners so you know where to route your next swipe.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/travel-with-points/bank-programs",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "https://example.com/travel-with-points/bank-programs",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export const runtime = "edge";

async function getPrograms(): Promise<BankProgram[]> {
  const { programs } = await getBankProgramContent();

  return programs;
}

export default async function BankProgramsPage() {
  const programs = await getPrograms();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-24 lg:py-32">
        <span className="inline-flex items-center self-center rounded-full border border-rose-200/40 bg-rose-100/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-rose-200">
          Bank Programs
        </span>
        <div className="space-y-5 text-center">
          <h1 className="text-4xl font-semibold sm:text-5xl">Bank portals & reward ecosystems</h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-200/80">
            Decode accelerated earn rates, portal quirks, and redemption rules for India’s most popular bank reward platforms before you lock in your next travel booking or voucher spree.
          </p>
        </div>
        <div className="grid gap-6 text-left sm:grid-cols-2">
          {programs.map((program) => (
            <Link
              key={program.slug}
              href={`/travel-with-points/bank-programs/${program.slug}`}
              className="group flex h-full flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-200/90">
                    {program.issuer}
                  </p>
                  <h2 className="text-xl font-semibold text-white">{program.name}</h2>
                </div>
                <dl className="grid gap-3 text-xs uppercase tracking-[0.25em] text-rose-100/70">
                  <div className="flex flex-col gap-1 text-[0.7rem]">
                    <dt className="font-semibold text-rose-100/60">Program type</dt>
                    <dd className="text-[0.75rem] normal-case tracking-normal text-slate-100/80">
                      {program.programType}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1 text-[0.7rem]">
                    <dt className="font-semibold text-rose-100/60">Join cost</dt>
                    <dd className="text-[0.75rem] normal-case tracking-normal text-slate-100/80">
                      {program.joinCost}
                    </dd>
                  </div>
                </dl>
                <p className="text-sm leading-6 text-slate-100/80">{program.summary}</p>
              </div>
              <span className="inline-flex items-center text-sm font-semibold text-amber-300">
                Explore program
                <svg
                  aria-hidden
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
        <Link href="/travel-with-points" className="inline-flex items-center self-center text-sm font-semibold text-amber-300">
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
