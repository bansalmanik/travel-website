import Link from "next/link";

const featuredSection = {
  title: "Miles & Points Explained",
  description:
    "Start here if you're new to points and miles. Learn the fundamentals, understand how different programs work, and build a solid foundation for your travel rewards journey.",
  href: "/travel-with-points/miles-and-points-explained",
  accent: "bg-indigo-100 text-indigo-900",
};

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
      "Earn transferable points, maximize category bonuses, and decide when a premium annual fee is worth it.",
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

export default function TravelWithPointsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-20 pt-8 sm:px-6 sm:pt-10 lg:gap-10 lg:pb-24 lg:pt-12">
        <header className="space-y-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 sm:text-sm">Travel with Points</p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Turn everyday spending into your next adventure
          </h1>
        </header>

        <section className="grid gap-5 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur sm:gap-6 sm:p-8 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group flex flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50/80 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              <div className="space-y-3">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${section.accent}`}
                >
                  {section.title}
                </span>
                <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{section.description}</p>
              </div>
              <span className="inline-flex items-center text-sm font-semibold text-amber-700">
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

        {/* Learning Hub */}
        <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm sm:p-6">
          <Link
            href={featuredSection.href}
            className="group block"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Learning Hub
              </span>
            </div>
            <h2 className="mb-2 text-lg font-bold text-slate-900 sm:text-xl">
              {featuredSection.title}
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {featuredSection.description}
            </p>
            <span className="inline-flex items-center text-sm font-semibold text-slate-700 transition group-hover:text-slate-900">
              Start learning
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
        </section>

      </div>
    </div>
  );
}
