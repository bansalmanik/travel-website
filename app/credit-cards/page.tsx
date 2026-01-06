import type { Metadata } from "next";
import Link from "next/link";

import type { AnnualFee } from "@/app/credit-cards/types";
import { getCreditCardContent } from "@/lib/contentData";
import { getPostsByCategory } from "@/lib/blog";
import Image from "next/image";

const siteUrl = "https://www.milesgoround.com";

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
  title: "Travel Credit Cards | Earn Rewards for Your Trips",
  description:
    "Find the best travel credit cards to fund your adventures. Compare cards, earning strategies, and perks to make every trip more rewarding.",
  keywords: [
    "travel credit cards",
    "best travel cards",
    "credit card rewards",
    "travel perks",
    "card benefits",
    "earning strategies",
    "travel booking",
  ],
  alternates: {
    canonical: `${siteUrl}/credit-cards`,
  },
  openGraph: {
    title: "Travel Credit Cards | Miles Go Round",
    description:
      "Find the best travel credit cards to fund your adventures. Compare cards, earning strategies, and perks.",
    url: `${siteUrl}/credit-cards`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Credit Cards | Miles Go Round",
    description:
      "Find the best travel credit cards to fund your adventures. Compare cards and earning strategies.",
  },
};

export default async function CreditCardsPage() {
  const { cards, cardStrategies, favoriteCombos } =
    await getCreditCardContent();
  const blogPosts = await getPostsByCategory('credit-cards');

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-blue-50 text-slate-900">
      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-8 lg:py-12">
        <header className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700">Travel with Points</p>
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
                href={`/${card.slug}`}
                className="group flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-blue-300/60 hover:bg-white hover:shadow-md"
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
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
                  {card.issuer}
                </p>

                {/* Card Name */}
                <h3 className="mb-4 text-lg font-semibold leading-tight text-slate-900 group-hover:text-blue-700">
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

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between text-2xl font-semibold text-slate-900 transition-colors hover:text-blue-700">
              <span>Starter card pairings</span>
              <svg
                className="h-6 w-6 transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-6 space-y-6">
              {favoriteCombos.map((combo) => (
                <article key={combo.name} className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{combo.name}</h3>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
                    {combo.cards.join(" + ")}
                  </p>
                  <p className="text-sm leading-6 text-slate-700">{combo.note}</p>
                </article>
              ))}
            </div>
          </details>
        </section>

        {blogPosts.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">Related Articles</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {blogPosts.slice(0, 4).map((post) => (
                <Link
                  key={post.slug}
                  href={post.url}
                  className="group relative overflow-hidden rounded-xl bg-slate-100 transition-transform hover:scale-[1.02]"
                  style={{ aspectRatio: '16/9' }}
                >
                  {post.heroImage?.src && (
                    <Image
                      src={post.heroImage.src}
                      alt={post.heroImage.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h3 className="mb-1 text-base font-semibold leading-snug text-white">
                      {post.title}
                    </h3>
                    <p className="text-xs text-white/80">{post.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
