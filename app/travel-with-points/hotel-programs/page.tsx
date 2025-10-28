const elitePaths = [
  {
    tier: "Marriott Bonvoy",
    highlight: "Fifth night free on award stays and 35k/50k free night certificates from co-branded cards.",
  },
  {
    tier: "Hyatt World of Hyatt",
    highlight: "Milestone rewards every 10 nights with suite upgrade awards at 50 and 60 nights.",
  },
  {
    tier: "Hilton Honors",
    highlight: "Automatic Gold status with select credit cards, unlocking free breakfast worldwide.",
  },
];

const bookingTips = [
  "Compare cash rates versus points with a simple cents-per-point formula.",
  "Stack portal rebates, Amex Offers, or Mastercard promos for paid stays when points value is low.",
  "Keep a spreadsheet of upcoming certificate expirations so you can plan weekend getaways in advance.",
];

export default function HotelProgramsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
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
          <h2 className="text-2xl font-semibold text-white">Paths to elite status</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {elitePaths.map((path) => (
              <div key={path.tier} className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h3 className="text-lg font-semibold text-white">{path.tier}</h3>
                <p className="text-sm leading-6 text-slate-100/80">{path.highlight}</p>
              </div>
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
    </div>
  );
}
