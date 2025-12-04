import type { Metadata } from "next";
import Link from "next/link";

import type { AnnualFee } from "@/app/travel-with-points/credit-cards/types";
import { getCreditCardContent } from "@/lib/contentData";

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

export default async function CreditCardsPage() {
  const { cards, cardStrategies, favoriteCombos } =
    await getCreditCardContent();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-950">
      <div className="mx-auto flex max-w-4xl flex-col gap-16 px-6 py-20 lg:py-28">
        <header className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-700">Travel with Points</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Credit card strategy</h1>
          <p className="text-base text-slate-700">
            Focus on cards that earn flexible currencies, pair perks with your lifestyle, and keep an eye on welcome bonus rules.
          </p>
          <p className="text-base text-slate-700">
            A focused setup earns faster, redeems better, and avoids orphaned points.
          </p>
        </header>

        <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">Featured travel credit cards</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((card) => (
              <article
                key={card.slug}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-amber-300/60 hover:bg-white hover:shadow-md"
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">{card.issuer}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">
                      <Link
                        href={`/travel-with-points/credit-cards/${card.slug}`}
                        className="text-slate-950 underline-offset-4 transition hover:text-amber-700 hover:underline"
                      >
                        {card.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-slate-700">{card.summary}</p>
                  </div>
                  <dl className="grid gap-3 text-sm text-slate-700">
                    <div>
                      <dt className="font-semibold text-slate-950">Annual fee</dt>
                      <dd>{formatAnnualFee(card.annualFee)}</dd>
                    </div>
                  </dl>
                  {card.keyHighlights?.length ? (
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold text-slate-950">Standout highlight:</span> {card.keyHighlights[0]}
                    </p>
                  ) : null}
                </div>
                <Link
                  href={`/travel-with-points/credit-cards/${card.slug}`}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-amber-700"
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

        <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">Core principles</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {cardStrategies.map((strategy) => (
              <article key={strategy.title} className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-semibold text-slate-950">{strategy.title}</h3>
                <p className="text-sm leading-6 text-slate-700">{strategy.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">Starter card pairings</h2>
          <div className="space-y-6">
            {favoriteCombos.map((combo) => (
              <article key={combo.name} className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-950">{combo.name}</h3>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                  {combo.cards.join(" + ")}
                </p>
                <p className="text-sm leading-6 text-slate-700">{combo.note}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
