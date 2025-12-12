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
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-8 lg:py-12">
        <header className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-700">Travel with Points</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Credit card strategy</h1>
          <p className="text-base text-slate-700">
            Focus on cards that earn flexible currencies, pair perks with your lifestyle, and keep an eye on welcome bonus rules.
          </p>
        </header>

        <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-4 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Featured travel credit cards</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card) => (
              <Link
                key={card.slug}
                href={`/travel-with-points/credit-cards/${card.slug}`}
                className="group flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-amber-300/60 hover:bg-white hover:shadow-md"
              >
                {/* Card Image */}
                {card.media?.cardImage && (
                  <div className="mb-4 flex justify-center">
                    <img
                      src={card.media.cardImage.src}
                      alt={card.media.cardImage.alt}
                      className="h-24 w-auto object-contain"
                    />
                  </div>
                )}

                {/* Issuer */}
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
                  {card.issuer}
                </p>

                {/* Card Name */}
                <h3 className="mb-4 text-lg font-semibold leading-tight text-slate-900 group-hover:text-amber-700">
                  {card.name}
                </h3>

                {/* Card Details */}
                <dl className="space-y-2.5 text-sm text-slate-700">
                  {card.JoiningFee && (
                    <div className="flex justify-between">
                      <dt className="font-medium text-slate-600">Joining Fee</dt>
                      <dd className="font-semibold text-slate-900">{card.JoiningFee}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="font-medium text-slate-600">Annual Fee</dt>
                    <dd className="font-semibold text-slate-900">{formatAnnualFee(card.annualFee)}</dd>
                  </div>
                  {card.rewardsCurrency && (
                    <div className="flex justify-between">
                      <dt className="font-medium text-slate-600">Rewards</dt>
                      <dd className="font-semibold text-slate-900">{card.rewardsCurrency}</dd>
                    </div>
                  )}
                  {card.Category && (
                    <div className="flex justify-between">
                      <dt className="font-medium text-slate-600">Category</dt>
                      <dd className="font-semibold text-slate-900">{card.Category}</dd>
                    </div>
                  )}
                </dl>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Core principles</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {cardStrategies.map((strategy) => (
              <article key={strategy.title} className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-semibold text-slate-900">{strategy.title}</h3>
                <p className="text-sm leading-6 text-slate-700">{strategy.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Starter card pairings</h2>
          <div className="space-y-6">
            {favoriteCombos.map((combo) => (
              <article key={combo.name} className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">{combo.name}</h3>
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
