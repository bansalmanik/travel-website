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
    canonical: "/travel-with-points/flight-programs"
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
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-16 px-6 py-20 lg:py-28">
        <header className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300">Travel with Points</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Flight loyalty programs</h1>
          <p className="text-base text-slate-200/80">
            Award charts change, but the fundamentals stay the same: understand alliance partnerships, hold flexible points, and
            strike when you find award space.
          </p>
        </header>

        <section className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold text-white">Featured airline loyalty programs</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {programs.length === 0 ? (
              <p className="col-span-full rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-6 text-center text-sm text-slate-200/80">
                Coming soon – new airline program guides are in the works.
              </p>
            ) : (
              programs.map((program) => {
                const signatureSweetSpot = program.sections
                  ?.find((section) => section.id === "sweet-spots")
                  ?.bullets?.[0];

                return (
                  <article
                    key={program.slug}
                    className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-emerald-300/60 hover:bg-slate-900/80"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">{program.alliance}</p>
                        <h3 className="text-xl font-semibold text-white">
                          <Link href={`/travel-with-points/flight-programs/${program.slug}`} className="hover:underline">
                            {program.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-slate-200/80">{program.summary}</p>
                      </div>
                      <dl className="grid gap-3 text-sm text-slate-100/80">
                        <div>
                          <dt className="font-semibold text-white">Primary hubs</dt>
                          <dd>{program.hub}</dd>
                        </div>
                      </dl>
                      {signatureSweetSpot ? (
                        <p className="text-sm text-slate-100/70">
                          <span className="font-semibold text-white">Signature sweet spot:</span> {signatureSweetSpot}
                        </p>
                      ) : null}
                    </div>
                    <Link
                      href={`/travel-with-points/flight-programs/${program.slug}`}
                      className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-300"
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
              })
            )}
          </div>
        </section>

        <section className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold text-white">Award booking playbook</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {awardPlaybook.length === 0 ? (
              <p className="col-span-full rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-5 text-center text-sm text-slate-200/80">
                Coming soon – award booking strategies are being polished.
              </p>
            ) : (
              awardPlaybook.map((item) => (
                <article key={item.title} className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-100/80">{item.detail}</p>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold text-white">Favorite sweet spots</h2>
          <div className="space-y-6">
            {favoriteRoutes.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-6 text-center text-sm text-slate-200/80">
                Coming soon – collecting our go-to sweet spots for you.
              </p>
            ) : (
              favoriteRoutes.map((route) => (
                <article key={route.route} className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold text-white">{route.route}</h3>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">{route.program}</p>
                  </div>
                  <p className="text-sm leading-6 text-slate-100/80">{route.highlight}</p>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
