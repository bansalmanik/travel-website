import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import cardData from "@/data/credit-cards.json";

type Card = {
  slug: string;
  name: string;
  issuer: string;
  annualFee: string;
  summary: string;
  seoDescription: string;
  welcomeOffer: string;
  bestFor: string;
  earnRates: string[];
  topFeatures: string[];
  transferPartners: string[];
};

const cards = (cardData as { cards: Card[] }).cards;

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return cards.map((card) => ({ slug: card.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const slug = decodeURIComponent(params.slug);
  const card = cards.find((item) => item.slug === slug);

  if (!card) {
    return {
      title: "Credit card not found | Travel with Points"
    };
  }

  return {
    title: `${card.name} travel rewards guide | Travel with Points`,
    description: card.seoDescription,
    keywords: [
      card.name,
      `${card.issuer} credit card`,
      "travel credit card review",
      "points strategy",
      "reward card benefits"
    ],
    alternates: {
      canonical: `/travel-with-points/credit-cards/${card.slug}`
    },
    openGraph: {
      title: `${card.name} travel rewards guide`,
      description: card.seoDescription,
      type: "article",
      url: `https://example.com/travel-with-points/credit-cards/${card.slug}`
    },
    twitter: {
      card: "summary",
      title: `${card.name} travel rewards guide`,
      description: card.seoDescription
    }
  };
}

export default function CreditCardDetailPage({ params }: PageProps) {
  const slug = decodeURIComponent(params.slug);
  const card = cards.find((item) => item.slug === slug);

  if (!card) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: card.name,
    issuer: card.issuer,
    description: card.summary,
    url: `https://example.com/travel-with-points/credit-cards/${card.slug}`,
    offers: {
      "@type": "Offer",
      name: "Welcome offer",
      description: card.welcomeOffer
    },
    feesAndCommissionsSpecification: card.annualFee,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "1"
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-20 lg:py-28">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-300">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/travel-with-points" className="hover:text-amber-300">
                Travel with Points
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/travel-with-points/credit-cards" className="hover:text-amber-300">
                Credit cards
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-amber-200">{card.name}</li>
          </ol>
        </nav>

        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">Credit card guide</p>
          <h1 className="text-4xl font-semibold text-white">{card.name}</h1>
          <p className="text-base text-slate-200/80">{card.summary}</p>
        </header>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Card snapshot</h2>
          <dl className="grid gap-6 text-sm text-slate-100/80 sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-white">Issuer</dt>
              <dd>{card.issuer}</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Annual fee</dt>
              <dd>{card.annualFee}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-semibold text-white">Best for</dt>
              <dd>{card.bestFor}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-semibold text-white">Welcome offer</dt>
              <dd>{card.welcomeOffer}</dd>
            </div>
          </dl>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">How it earns</h2>
          <ul className="space-y-3 text-sm leading-6 text-slate-100/80">
            {card.earnRates.map((rate) => (
              <li key={rate} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
                <span>{rate}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Standout benefits</h2>
          <ul className="space-y-3 text-sm leading-6 text-slate-100/80">
            {card.topFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Transfer partners</h2>
          <p className="text-sm text-slate-100/80">
            Move your rewards where they matter most. Transfer partners include:
          </p>
          <ul className="grid gap-3 text-sm text-slate-100/80 sm:grid-cols-2">
            {card.transferPartners.map((partner) => (
              <li key={partner} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
                <span>{partner}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="flex flex-col gap-3 text-sm text-slate-200/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-white">Ready for more cards?</p>
          <Link href="/travel-with-points/credit-cards" className="inline-flex items-center font-semibold text-amber-300">
            Back to credit cards hub
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
        </footer>
      </div>
    </main>
  );
}
