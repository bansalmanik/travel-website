import Image from "next/image";
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
      <div className="mx-auto flex max-w-4xl flex-col gap-16 px-6 py-16 sm:py-20 lg:py-28">
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
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {cards.map((card) => (
              <article
                key={card.slug}
                className="group rounded-2xl border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:border-amber-300/60 hover:bg-white hover:shadow-md"
              >
                <Link
                  href={`/travel-with-points/credit-cards/${card.slug}`}
                  className="flex h-full flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6"
                >
                  <div className="flex w-full items-center justify-center rounded-xl bg-white/80 p-4 shadow-inner sm:w-36">
                    {card.media?.cardImage ? (
                      <Image
                        src={card.media.cardImage.src}
                        alt={card.media.cardImage.alt}
                        width={240}
                        height={140}
                        className="h-24 w-auto max-w-full object-contain sm:h-28"
                        priority={false}
                      />
                    ) : (
                      <div className="flex h-24 w-full items-center justify-center text-sm text-slate-500 sm:h-28">Image coming soon</div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">{card.issuer}</p>
                      <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">{card.name}</h3>
                    </div>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-slate-700 sm:grid-cols-3">
                      <div className="space-y-1">
                        <dt className="font-semibold text-slate-900">Joining fee</dt>
                        <dd>{card.JoiningFee ?? card.joiningFee ?? "See details"}</dd>
                      </div>
                      <div className="space-y-1">
                        <dt className="font-semibold text-slate-900">Annual fee</dt>
                        <dd>{formatAnnualFee(card.annualFee)}</dd>
                      </div>
                      <div className="space-y-1">
                        <dt className="font-semibold text-slate-900">Rewards currency</dt>
                        <dd>{card.rewardsCurrency ?? "See details"}</dd>
                      </div>
                      <div className="space-y-1">
                        <dt className="font-semibold text-slate-900">Category</dt>
                        <dd>{card.Category ?? card.category ?? card.type}</dd>
                      </div>
                      <div className="space-y-1">
                        <dt className="font-semibold text-slate-900">Issuer</dt>
                        <dd>{card.issuer}</dd>
                      </div>
                    </dl>
                  </div>
                </Link>
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
