import type { Metadata } from "next";
import Link from "next/link";

import { getHotelProgramContent } from "@/lib/contentData";

export const metadata: Metadata = {
  title: "Hotel loyalty programs guide | Travel with Points",
  description:
    "Compare elite status perks, understand free night certificates, and follow a proven checklist to stretch hotel points.",
  keywords: [
    "hotel loyalty programs",
    "elite status tips",
    "travel rewards hotels",
    "hotel points strategy"
  ],
  alternates: {
    canonical: "/travel-with-points/hotel-programs"
  }
};

export default async function HotelProgramsPage() {
  const { programs, elitePaths, bookingTips } =
    await getHotelProgramContent();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 py-16 sm:gap-16 sm:px-6 sm:py-20 lg:py-28">
        <header className="space-y-4 sm:space-y-5">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-sky-700 sm:text-xs">Travel with Points</p>
          <h1 className="text-3xl font-semibold sm:text-5xl">Hotel loyalty programs</h1>
          <p className="text-sm text-slate-700 sm:text-base">
            Elite status brings upgrades, late checkout, and breakfast. Learn which chains reward credit card spending versus
            nights on property so you can focus on the brands that fit your style of travel.
          </p>
        </header>

        <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Featured hotel programs</h2>
          <div className="grid gap-6 sm:gap-7 md:grid-cols-2">
            {programs.map((program) => {
              const highlight = program.overview?.items?.[0];
              const topTier =
                program.statusLevels && program.statusLevels.tiers.length > 0
                  ? program.statusLevels.tiers[program.statusLevels.tiers.length - 1]
                  : undefined;

              return (
                <article
                  key={program.slug}
                  className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-sky-300/60 hover:bg-white hover:shadow-md sm:p-6"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-sky-700 sm:text-xs">{program.footprint}</p>
                      <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                        <Link
                          href={`/${program.slug}`}
                          className="text-slate-900 underline-offset-4 transition hover:text-sky-800 hover:underline"
                        >
                          {program.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-slate-700 sm:text-base">{program.summary}</p>
                    </div>
                    {highlight ? (
                      <p className="text-sm text-slate-700 sm:text-base">
                        <span className="font-semibold text-slate-900">Snapshot:</span> {highlight}
                      </p>
                    ) : null}
                    {topTier ? (
                      <p className="text-[0.65rem] uppercase tracking-[0.25em] text-sky-700 sm:text-xs">Top tier • {topTier}</p>
                    ) : null}
                  </div>
                  <Link
                    href={`/${program.slug}`}
                    className="mt-6 inline-flex items-center text-sm font-semibold text-sky-800 sm:text-base"
                  >
                    View program guide
                    <svg
                      aria-hidden
                      className="ml-2 h-4 w-4"
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
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Paths to elite status</h2>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {elitePaths.map((path) => (
              <article key={path.tier} className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{path.tier}</h3>
                <p className="text-sm leading-6 text-slate-700 sm:text-base">{path.highlight}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Booking checklist</h2>
          <ul className="space-y-4 text-sm leading-6 text-slate-700 sm:text-base">
            {bookingTips.map((tip) => (
              <li key={tip} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-sky-700 sm:h-2.5 sm:w-2.5" aria-hidden />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
