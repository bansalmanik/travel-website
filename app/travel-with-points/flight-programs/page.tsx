import type { Metadata } from "next";
import flightData from "@/data/flight-programs.json";

type AwardPlaybookItem = {
  title: string;
  detail: string;
};

type FavoriteRoute = {
  route: string;
  program: string;
  highlight: string;
};

const { awardPlaybook, favoriteRoutes } = flightData as {
  awardPlaybook: AwardPlaybookItem[];
  favoriteRoutes: FavoriteRoute[];
};

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

export default function FlightProgramsPage() {
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
          <h2 className="text-2xl font-semibold text-white">Award booking playbook</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {awardPlaybook.map((item) => (
              <article key={item.title} className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-100/80">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold text-white">Favorite sweet spots</h2>
          <div className="space-y-6">
            {favoriteRoutes.map((route) => (
              <article key={route.route} className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-white">{route.route}</h3>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">{route.program}</p>
                </div>
                <p className="text-sm leading-6 text-slate-100/80">{route.highlight}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
