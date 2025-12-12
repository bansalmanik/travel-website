import type { Metadata } from "next";
import Link from "next/link";

import Image from "next/image";

import type { AnnualFee, Card } from "@/app/travel-with-points/credit-cards/types";
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

function getJoiningFee(card: Card) {
  return (
    card.joiningFee ||
    card.JoiningFee ||
    card.annualFees ||
    card.AnnualFees ||
    "See card details"
  );
}

function getCardCategory(card: Card) {
  return card.category || card.Category || card.type || "Credit card";
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

        <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">Featured travel credit cards</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {cards.map((card) => (
              <article
                key={card.slug}
                className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-amber-300/60 hover:bg-white hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">{card.issuer}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">
                      <Link
                        href={`/travel-with-points/credit-cards/${card.slug}`}
                        className="text-slate-900 underline-offset-4 transition hover:text-amber-700 hover:underline"
                      >
                        {card.name}
                      </Link>
                    </h3>
                  </div>
                  {card.media?.cardImage?.src ? (
                    <div className="flex shrink-0 items-center justify-center rounded-xl bg-white/80 p-3 shadow-inner">
                      <Image
                        src={card.media.cardImage.src}
                        alt={card.media.cardImage.alt || card.name}
                        width={200}
                        height={125}
                        className="h-auto w-full max-w-[180px] object-contain"
                      />
                    </div>
                  ) : null}
                </div>

                <dl className="grid grid-cols-1 gap-4 text-sm text-slate-700 sm:grid-cols-2">
                  <div className="space-y-1 rounded-xl bg-white px-4 py-3 shadow-sm">
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Joining fee</dt>
                    <dd className="text-base font-semibold text-slate-900">{getJoiningFee(card)}</dd>
                  </div>
                  <div className="space-y-1 rounded-xl bg-white px-4 py-3 shadow-sm">
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Annual fee</dt>
                    <dd className="text-base font-semibold text-slate-900">{formatAnnualFee(card.annualFee)}</dd>
                  </div>
                  <div className="space-y-1 rounded-xl bg-white px-4 py-3 shadow-sm">
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Issuer</dt>
                    <dd className="text-base font-semibold text-slate-900">{card.issuer}</dd>
                  </div>
                  <div className="space-y-1 rounded-xl bg-white px-4 py-3 shadow-sm">
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Rewards currency</dt>
                    <dd className="text-base font-semibold text-slate-900">{card.rewardsCurrency || "Varies"}</dd>
                  </div>
                  <div className="space-y-1 rounded-xl bg-white px-4 py-3 shadow-sm sm:col-span-2">
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Category</dt>
                    <dd className="text-base font-semibold text-slate-900">{getCardCategory(card)}</dd>
                  </div>
                </dl>
              </article>
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
