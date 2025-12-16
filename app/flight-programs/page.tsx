import type { Metadata } from "next";
import Link from "next/link";

import type {
  AwardPlaybookItem,
  FavoriteRoute,
  FlightProgram,
} from "@/app/travel-with-points/flight-programs/types";
import { getFlightProgramContent } from "@/lib/contentData";

export const metadata: Metadata = {
  title: "Flight loyalty program sweet spots | Travel with Points",
  description:
    "Unlock airline alliances, stopover rules, and proven award redemptions to fly farther for fewer miles.",
  keywords: [
    "flight loyalty programs",
    "airline miles sweet spots",
    "award travel tips",
    "alliance partners"
  ],
  alternates: {
    canonical: "/flight-programs"
  }
};

export default async function FlightProgramsPage() {
  const {
    programs,
    awardPlaybook,
    favoriteRoutes,
  }: {
    programs: FlightProgram[];
    awardPlaybook: AwardPlaybookItem[];
    favoriteRoutes: FavoriteRoute[];
  } = await getFlightProgramContent();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <div className="mx-auto flex max-w-4xl flex-col gap-16 px-6 py-20 lg:py-28">
        <header className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-700">Travel with Points</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Flight loyalty programs</h1>
          <p className="text-base text-slate-700">
            Award charts change, but the fundamentals stay the same: understand alliance partnerships, hold flexible points, and
            strike when you find award space.
          </p>
        </header>

        <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Featured airline loyalty programs</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {programs.map((program) => {
              const signatureSweetSpotSection = program.sections?.find(
                (section) => section.id === "sweet-spots"
              );

              const signatureSweetSpot =
                signatureSweetSpotSection && "bullets" in signatureSweetSpotSection
                  ? signatureSweetSpotSection.bullets?.[0]
                  : undefined;

              return (
                <article
                  key={program.slug}
                  className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-emerald-300/60 hover:bg-white hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">{program.alliance}</p>
                      <h3 className="text-xl font-semibold text-slate-900">
                        <Link
                          href={`/${program.slug}`}
                          className="text-slate-900 underline-offset-4 transition hover:text-emerald-800 hover:underline"
                        >
                          {program.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-slate-700">{program.summary}</p>
                    </div>
                    <dl className="grid gap-3 text-sm text-slate-700">
                      <div>
                        <dt className="font-semibold text-slate-900">Primary hubs</dt>
                        <dd>{program.hub}</dd>
                      </div>
                    </dl>
                    {signatureSweetSpot ? (
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">Signature sweet spot:</span> {signatureSweetSpot}
                      </p>
                    ) : null}
                  </div>
                  <Link
                    href={`/${program.slug}`}
                    className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-800"
                  >
                    Explore loyalty guide
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

        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Favorite sweet spots</h2>
          <div className="space-y-6">
            {favoriteRoutes.map((route) => (
              <article key={route.route} className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{route.route}</h3>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-800">{route.program}</p>
                </div>
                <p className="text-sm leading-6 text-slate-700">{route.highlight}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
