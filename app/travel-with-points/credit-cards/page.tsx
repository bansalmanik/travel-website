import type { Metadata } from "next";
import Link from "next/link";
import cardData from "@/data/credit-cards.json";

type AnnualFee = {
  amount: number;
  currency: string;
  gstApplicable?: boolean;
};

type Card = {
  slug: string;
  layout: "tieredMiles" | "lifestyle";
  name: string;
  issuer: string;
  network: string;
  type: string;
  summary: string;
  seoDescription: string;
  annualFee: AnnualFee;
  websiteDisplayTags?: string[];
  keyHighlights?: string[];
};

type CardStrategy = {
  title: string;
  description: string;
};

type FavoriteCombo = {
  name: string;
  cards: string[];
  note: string;
};

const { cards, cardStrategies, favoriteCombos } = cardData as {
  cards: Card[];
  cardStrategies: CardStrategy[];
  favoriteCombos: FavoriteCombo[];
};

function formatAnnualFee(annualFee: AnnualFee) {
  const locale = annualFee.currency === "INR" ? "en-IN" : "en-US";
  const hasFraction = !Number.isInteger(annualFee.amount);
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: annualFee.currency,
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0
  });
  const fee = formatter.format(annualFee.amount);

  if (annualFee.gstApplicable) {
    return `${fee} + GST`;
  }

  return fee;
}

export const metadata: Metadata = {
  title: "Travel credit card strategy | Travel with Points",
  description:
    "Discover flexible currencies, card pairings, and smart earning tactics to maximize travel rewards with every swipe.",
  keywords: [
    "travel credit cards",
    "points strategy",
    "loyalty rewards",
    "credit card combinations",
    "transferable points"
  ],
  alternates: {
    canonical: "/travel-with-points/credit-cards"
  }
};

export default function CreditCardsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
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
          <h2 className="text-2xl font-semibold text-white">Featured travel credit cards</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((card) => (
              <article
                key={card.slug}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-amber-300/60 hover:bg-slate-900/80"
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">{card.issuer}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      <Link href={`/travel-with-points/credit-cards/${card.slug}`} className="hover:underline">
                        {card.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-slate-200/80">{card.summary}</p>
                  </div>
                  <dl className="grid gap-3 text-sm text-slate-100/80">
                    <div>
                      <dt className="font-semibold text-white">Annual fee</dt>
                      <dd>{formatAnnualFee(card.annualFee)}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-white">Network</dt>
                      <dd>{card.network}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-white">Card type</dt>
                      <dd>{card.type}</dd>
                    </div>
                  </dl>
                  {card.websiteDisplayTags?.length ? (
                    <ul className="flex flex-wrap gap-2">
                      {card.websiteDisplayTags.slice(0, 3).map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-200"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {card.keyHighlights?.length ? (
                    <p className="text-sm text-slate-100/70">
                      <span className="font-semibold text-white">Standout highlight:</span> {card.keyHighlights[0]}
                    </p>
                  ) : null}
                </div>
                <Link
                  href={`/travel-with-points/credit-cards/${card.slug}`}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-amber-300"
                >
                  View full details
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
          <h2 className="text-2xl font-semibold text-white">Core principles</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {cardStrategies.map((strategy) => (
              <article key={strategy.title} className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h3 className="text-lg font-semibold text-white">{strategy.title}</h3>
                <p className="text-sm leading-6 text-slate-100/80">{strategy.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold text-white">Starter card pairings</h2>
          <div className="space-y-6">
            {favoriteCombos.map((combo) => (
              <article key={combo.name} className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <h3 className="text-lg font-semibold text-white">{combo.name}</h3>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                  {combo.cards.join(" + ")}
                </p>
                <p className="text-sm leading-6 text-slate-100/80">{combo.note}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
