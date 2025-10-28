const awardPlaybook = [
  {
    title: "Search partners, not airlines",
    detail: "Use Air Canada Aeroplan, Avianca LifeMiles, or Virgin Atlantic to book seats on Star Alliance and SkyTeam partners with fewer surcharges.",
  },
  {
    title: "Leverage stopovers",
    detail: "Programs like Aeroplan and Alaska Mileage Plan allow stopovers on one-way awards—turn a connection into a mini vacation.",
  },
  {
    title: "Watch transfer bonuses",
    detail: "Amex, Chase, and Capital One regularly offer 15–30% bonuses. Transfer only when a specific award is available.",
  },
];

const favoriteRoutes = [
  {
    route: "US ➜ Europe",
    program: "Virgin Atlantic Flying Club",
    highlight: "Redeem 50k points for one-way Delta One to Europe during off-peak dates.",
  },
  {
    route: "US ➜ Asia",
    program: "Alaska Mileage Plan",
    highlight: "Fly Japan Airlines business class for 60k miles with a free stopover in Tokyo.",
  },
  {
    route: "Intra-Europe",
    program: "Avios (British Airways / Iberia)",
    highlight: "Short-haul flights start at 4k points and avoid high fuel surcharges when booked through Iberia.",
  },
];

export default function FlightProgramsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
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
              <div key={item.title} className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-100/80">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold text-white">Favorite sweet spots</h2>
          <div className="space-y-6">
            {favoriteRoutes.map((route) => (
              <div key={route.route} className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-white">{route.route}</h3>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">{route.program}</p>
                </div>
                <p className="text-sm leading-6 text-slate-100/80">{route.highlight}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
