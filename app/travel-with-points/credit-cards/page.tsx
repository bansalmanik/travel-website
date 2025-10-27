const cardStrategies = [
  {
    title: "Start with a flexible currency",
    description:
      "Chase Ultimate Rewards, American Express Membership Rewards, and Capital One Miles give you multiple airline and hotel partners to work with.",
  },
  {
    title: "Pair premium with no-fee",
    description:
      "A premium card unlocks lounge access and travel credits, while a no-fee card keeps points alive when you want to downgrade.",
  },
  {
    title: "Stack category bonuses",
    description:
      "Use dining, grocery, and travel multipliers to earn faster—then move those points into the program offering the best redemption.",
  },
];

const favoriteCombos = [
  {
    name: "Everyday Essentials",
    cards: ["Chase Sapphire Preferred", "Chase Freedom Flex"],
    note: "A low annual fee starter duo that earns 3x travel/dining and rotating 5x categories while sharing one points pool.",
  },
  {
    name: "Premium Globetrotter",
    cards: ["Amex Platinum", "Amex Gold"],
    note: "Stack $200 in airline incidental credits with 4x grocery/dining to rack up transferable points quickly.",
  },
  {
    name: "Cashback Safety Net",
    cards: ["Capital One Venture", "Citi Double Cash"],
    note: "Earn 2x everywhere, then transfer to Capital One partners or fall back on simple statement credits when award space is scarce.",
  },
];

export default function CreditCardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-16 px-6 py-20 lg:py-28">
        <header className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">Travel with Points</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Credit card strategy</h1>
          <p className="text-base text-slate-200/80">
            Focus on cards that earn flexible currencies, pair perks with your lifestyle, and keep an eye on welcome bonus rules.
            The goal is to earn intentionally—not chase every shiny metal rectangle.
          </p>
        </header>

        <section className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold text-white">Core principles</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {cardStrategies.map((strategy) => (
              <div key={strategy.title} className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h3 className="text-lg font-semibold text-white">{strategy.title}</h3>
                <p className="text-sm leading-6 text-slate-100/80">{strategy.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold text-white">Starter card pairings</h2>
          <div className="space-y-6">
            {favoriteCombos.map((combo) => (
              <div key={combo.name} className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <h3 className="text-lg font-semibold text-white">{combo.name}</h3>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                  {combo.cards.join(" + ")}
                </p>
                <p className="text-sm leading-6 text-slate-100/80">{combo.note}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
