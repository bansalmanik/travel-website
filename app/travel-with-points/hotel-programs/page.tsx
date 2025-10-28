import type { Metadata } from "next";
import Link from "next/link";
import hotelData from "@/data/hotel-programs.json";

type HotelProgram = {
  slug: string;
  name: string;
  footprint: string;
  summary: string;
  seoDescription: string;
  eliteLevels: string[];
  redemptionTips: string[];
  coBrandedCards: string[];
};

type ElitePath = {
  tier: string;
  highlight: string;
};

type BookingTips = string[];

const { programs, elitePaths, bookingTips } = hotelData as {
  programs: HotelProgram[];
  elitePaths: ElitePath[];
  bookingTips: BookingTips;
};

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

export default function HotelProgramsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-16 px-6 py-20 lg:py-28">
        <header className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-300">Travel with Points</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Hotel loyalty programs</h1>
          <p className="text-base text-slate-200/80">
            Elite status brings upgrades, late checkout, and breakfast. Learn which chains reward credit card spending versus
            nights on property so you can focus on the brands that fit your style of travel.
          </p>
        </header>

        <section className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold text-white">Featured hotel programs</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {programs.map((program) => (
              <article key={program.slug} className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-sky-300/60 hover:bg-slate-900/80">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">{program.footprint}</p>
                    <h3 className="text-xl font-semibold text-white">
                      <Link href={`/travel-with-points/hotel-programs/${program.slug}`} className="hover:underline">
                        {program.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-slate-200/80">{program.summary}</p>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-100/70">
                    {program.eliteLevels.slice(0, 2).map((level) => (
                      <li key={level} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 flex-none rounded-full bg-sky-300" aria-hidden />
                        <span>{level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 space-y-2 text-sm text-slate-100/80">
                  <p className="font-semibold text-white">Co-branded cards</p>
                  <p>{program.coBrandedCards.join(", ")}</p>
                </div>
                <Link
                  href={`/travel-with-points/hotel-programs/${program.slug}`}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-sky-300"
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
            ))}
          </div>
        </section>

        <section className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold text-white">Paths to elite status</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {elitePaths.map((path) => (
              <article key={path.tier} className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h3 className="text-lg font-semibold text-white">{path.tier}</h3>
                <p className="text-sm leading-6 text-slate-100/80">{path.highlight}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold text-white">Booking checklist</h2>
          <ul className="space-y-4 text-sm leading-6 text-slate-100/80">
            {bookingTips.map((tip) => (
              <li key={tip} className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-300" aria-hidden />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
