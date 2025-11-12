import Link from "next/link";

const sections = [
  {
    title: "Points Conversion",
    description:
      "Compare transfer partners, check standard ratios, and note any timing quirks before you move your points.",
    href: "/pointsconversion",
    accent: "bg-violet-100 text-violet-900",
    icon: "🔁",
  },
  {
    title: "Credit Cards",
    description:
      "Earn transferable points, maximize category bonuses, and decide when a premium annual fee is worth it.",
    href: "/travel-with-points/credit-cards",
    accent: "bg-amber-100 text-amber-900",
    icon: "💳",
  },
  {
    title: "Hotel Programs",
    description:
      "Unlock elite benefits, track milestone rewards, and understand when to redeem points versus paying cash.",
    href: "/travel-with-points/hotel-programs",
    accent: "bg-sky-100 text-sky-900",
    icon: "🏨",
  },
  {
    title: "Flight Programs",
    description:
      "Use partner awards, alliances, and transfer bonuses to sit up front without paying full fare.",
    href: "/travel-with-points/flight-programs",
    accent: "bg-emerald-100 text-emerald-900",
    icon: "✈️",
  },
  {
    title: "Bank Programs",
    description:
      "Tap into bank-specific travel portals and redemption tools to stretch every transferable point further.",
    href: "/travel-with-points/bank-programs",
    accent: "bg-rose-100 text-rose-900",
    icon: "🏦",
  },
];

const quickTips = [
  {
    title: "Set a goal",
    detail: "Decide on a dream trip before collecting points—strategy follows purpose.",
  },
  {
    title: "Diversify currencies",
    detail: "Balance transferable points and co-branded cards so you can pivot when award space disappears.",
  },
  {
    title: "Track expirations",
    detail: "Many programs reset with activity. A simple quarterly reminder protects your balance.",
  },
];

const journeySteps = [
  {
    title: "Imagine the getaway",
    description: "Define your destination, cabin, or hotel tier so every point you earn is intentional.",
  },
  {
    title: "Map the currencies",
    description: "Match your goal to the cards, bank partners, and transfer bonuses that get you there fastest.",
  },
  {
    title: "Book with confidence",
    description: "Follow the transfer steps, secure award space, and celebrate a trip that costs a fraction of cash rates.",
  },
];

export default function TravelWithPointsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
        <header className="space-y-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">Travel with Points</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            Turn everyday spending into your next adventure
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-200/80">
            A structured look at how travel rewards fit together. Compare airline and hotel programs, understand bank partnerships,
            pick the right cards, and use point-conversion paths to unlock real value on flights and stays.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#start-planning"
              className="inline-flex w-full items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-400/30 transition hover:bg-amber-300 sm:w-auto"
            >
              Start planning
            </Link>
            <Link
              href="/pointsconversion"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10 sm:w-auto"
            >
              Explore conversions
            </Link>
          </div>
        </header>

        <section
          id="start-planning"
          className="grid grid-cols-1 gap-6 rounded-3xl bg-slate-900/60 p-6 shadow-2xl backdrop-blur sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:p-10"
        >
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-5 text-left transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10 sm:p-6"
            >
              <div className="space-y-4">
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/70 text-lg" aria-hidden>
                    {section.icon}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] ${section.accent}`}
                  >
                    {section.title}
                  </span>
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

        <section className="grid grid-cols-1 gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:grid-cols-2 sm:gap-6 sm:p-8 lg:grid-cols-3">
          {quickTips.map((tip) => (
            <div key={tip.title} className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-5">
              <h2 className="text-base font-semibold text-white sm:text-lg">{tip.title}</h2>
              <p className="text-sm leading-6 text-slate-100/80">{tip.detail}</p>
            </div>
          ))}
        </section>

        <section className="space-y-8 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/10 via-slate-900/60 to-slate-900/80 p-6 sm:p-8 lg:p-10">
          <div className="space-y-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">Your points journey</p>
            <h2 className="text-2xl font-semibold sm:text-3xl">A three-step path from swipe to seat</h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-100/80 sm:text-base">
              Keep the process light and actionable. Follow these steps to move from earning to booking without the overwhelm.
            </p>
          </div>
          <ol className="space-y-6 sm:space-y-0 sm:divide-y sm:divide-white/10">
            {journeySteps.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-2 sm:flex-row sm:gap-6 sm:py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-base font-semibold text-amber-200">
                  {index + 1}
                </span>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="text-sm leading-6 text-slate-100/80">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-3xl bg-slate-900/50 p-6 text-center shadow-inner sm:p-8 lg:p-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">Ready to cash in your points?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-100/80 sm:text-base">
            Jump into the guides above, keep tabs on limited-time transfer bonuses, and check back for fresh strategies to stretch
            every mile.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/travel-with-points/stories"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 sm:w-auto"
            >
              Get inspired by real trips
            </Link>
            <Link
              href="/journals"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10 sm:w-auto"
            >
              Start a trip journal
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
