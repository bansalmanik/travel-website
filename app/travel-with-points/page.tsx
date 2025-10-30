import Link from "next/link";

const sections = [
  {
    title: "Points Conversion",
    description:
      "Compare transfer partners, check standard ratios, and note any timing quirks before you move your points.",
    href: "/pointsconversion",
    accent: "bg-violet-100 text-violet-900",
  },
  {
    title: "Credit Cards",
    description:
      "Earn transferrable points, maximize category bonuses, and decide when a premium annual fee is worth it.",
    href: "/travel-with-points/credit-cards",
    accent: "bg-amber-100 text-amber-900",
  },
  {
    title: "Hotel Programs",
    description:
      "Unlock elite benefits, track milestone rewards, and understand when to redeem points versus paying cash.",
    href: "/travel-with-points/hotel-programs",
    accent: "bg-sky-100 text-sky-900",
  },
  {
    title: "Flight Programs",
    description:
      "Use partner awards, alliances, and transfer bonuses to sit up front without paying full fare.",
    href: "/travel-with-points/flight-programs",
    accent: "bg-emerald-100 text-emerald-900",
  },
  {
    title: "Bank Programs",
    description:
      "Tap into bank-specific travel portals and redemption tools to stretch every transferable point further.",
    href: "/travel-with-points/bank-programs",
    accent: "bg-rose-100 text-rose-900",
  },
];

const quickTips = [
  {
    title: "Set a goal",
    detail: "Decide on a dream trip before collecting points—strategy follows purpose.",
  },
  {
    title: "Diversify currencies",
    detail: "Balance transferrable points and co-branded cards so you can pivot when award space disappears.",
  },
  {
    title: "Track expirations",
    detail: "Many programs reset with activity. A simple quarterly reminder protects your balance.",
  },
];

export default function TravelWithPointsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-20 lg:py-28">
        <header className="space-y-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">Travel with Points</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            Turn everyday spending into your next adventure
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-200/80">
            I’ve spent a decade experimenting with loyalty ecosystems. This hub distills the frameworks, spreadsheets, and
            real itineraries that help me book aspirational trips for a fraction of the cash price.
          </p>
        </header>

        <section className="grid gap-8 rounded-3xl bg-slate-900/60 p-10 shadow-2xl backdrop-blur lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
            >
              <div className="space-y-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${section.accent}`}
                >
                  {section.title}
                </span>
                <p className="text-sm leading-6 text-slate-100/80">{section.description}</p>
              </div>
              <span className="mt-6 inline-flex items-center text-sm font-semibold text-amber-300">
                Dive deeper
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
              </span>
            </Link>
          ))}
        </section>

        <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur lg:grid-cols-3">
          {quickTips.map((tip) => (
            <div key={tip.title} className="space-y-3">
              <h2 className="text-lg font-semibold text-white">{tip.title}</h2>
              <p className="text-sm leading-6 text-slate-100/80">{tip.detail}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
