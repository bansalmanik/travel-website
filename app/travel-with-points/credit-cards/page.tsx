import type { Metadata } from "next";
import Image from "next/image";
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

        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">Featured travel credit cards</h2>
          <div className="grid gap-3 sm:gap-4">
            {cards.map((card) => {
              const joiningFee = card.joiningFee ?? card.JoiningFee;
              const category = card.category ?? card.Category ?? card.type;

              return (
                <Link
                  key={card.slug}
                  href={`/travel-with-points/credit-cards/${card.slug}`}
                  className="group block rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-amber-300/60 hover:shadow-md sm:p-4"
                >
                  <article className="flex gap-3 sm:gap-4">
                    {card.media?.cardImage ? (
                      <div className="flex h-12 w-16 flex-none items-center justify-center rounded-lg bg-slate-50 p-1 shadow-inner sm:h-14 sm:w-20">
                        <Image
                          src={card.media.cardImage.src}
                          alt={card.media.cardImage.alt || card.name}
                          width={80}
                          height={56}
                          className="h-full w-auto object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex h-12 w-16 flex-none items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-500 sm:h-14 sm:w-20">
                        No image
                      </div>
                    )}
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-semibold text-slate-900 transition group-hover:text-amber-700 sm:text-base">
                          {card.name}
                        </h3>
                        <p className="text-xs text-slate-600">{card.issuer}</p>
                      </div>
                      <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs sm:text-sm">
                        <div>
                          <dt className="text-slate-500">Joining fee</dt>
                          <dd className="font-semibold text-slate-900">{joiningFee ?? "N/A"}</dd>
                        </div>
                        <div>
                          <dt className="text-slate-500">Annual fee</dt>
                          <dd className="font-semibold text-slate-900">{formatAnnualFee(card.annualFee)}</dd>
                        </div>
                        <div>
                          <dt className="text-slate-500">Rewards</dt>
                          <dd className="font-semibold text-slate-900">{card.rewardsCurrency ?? "N/A"}</dd>
                        </div>
                        {category ? (
                          <div>
                            <dt className="text-slate-500">Category</dt>
                            <dd className="font-semibold text-slate-900">{category}</dd>
                          </div>
                        ) : null}
                      </dl>
                    </div>
                  </article>
                </Link>
              );
            })}
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
