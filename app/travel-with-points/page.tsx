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

export default function TravelWithPointsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:gap-16 lg:py-24">
        <header className="overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/20 p-8 text-center shadow-2xl backdrop-blur">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-amber-300 sm:text-xs">Travel with Points</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
            Turn everyday spending into your next adventure
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-200/80 sm:text-base">
            A structured look at how travel rewards fit together. Compare airline and hotel programs, understand bank partnerships,
            pick the right cards, and use point-conversion paths to unlock real value on flights and stays.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/pointsconversion"
              className="inline-flex w-full items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-200 sm:w-auto"
            >
              Start with points conversion
            </Link>
            <Link
              href="#guides"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 sm:w-auto"
            >
              Explore the playbook
            </Link>
          </div>
        </header>

        <section
          id="guides"
          className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur sm:grid-cols-2 lg:grid-cols-3"
        >
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/10 p-5 text-left transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
            >
              <div className="space-y-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] ${section.accent}`}
                >
                  {section.title}
                </span>
                <p className="text-sm leading-6 text-slate-100/80 sm:text-[0.95rem]">{section.description}</p>
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

        <section className="space-y-6 rounded-3xl border border-white/5 bg-slate-900/50 p-6 shadow-xl backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-amber-300">Quick wins</p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Small moves that stack up fast</h2>
            </div>
            <Link
              href="/travel-with-points/credit-cards"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Browse card strategies
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {quickTips.map((tip) => (
              <div key={tip.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-base font-semibold text-white sm:text-lg">{tip.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-100/80">{tip.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/60 via-slate-900/20 to-slate-800/20 p-6 shadow-xl backdrop-blur sm:grid-cols-3 sm:p-8">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5 sm:col-span-2">
            <h2 className="text-2xl font-semibold sm:text-3xl">Build a flexible travel plan</h2>
            <p className="mt-3 text-sm leading-6 text-slate-100/80 sm:text-base">
              Layer bank, airline, and hotel currencies so your dream itinerary stays within reach—even when award space shifts.
              Save offers you love, mark calendar reminders for transfer bonuses, and keep balances diversified.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-left text-sm text-slate-100/80 sm:gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">Monitor</p>
                <p className="mt-1 font-semibold text-white">Transfer bonuses & expirations</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">Balance</p>
                <p className="mt-1 font-semibold text-white">Mix bank points & co-brands</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">Redeem</p>
                <p className="mt-1 font-semibold text-white">Position for premium cabins</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">Repeat</p>
                <p className="mt-1 font-semibold text-white">Capture welcome & milestone boosts</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/30 p-5">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-amber-300">Next step</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Save your favorite routes</h3>
              <p className="mt-2 text-sm leading-6 text-slate-100/80">
                Keep tabs on itineraries that inspire you, then watch for sweet spot availability and partner deals.
              </p>
            </div>
            <Link
              href="/travel-with-points/flight-programs"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-200"
            >
              Dive into flight awards
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
