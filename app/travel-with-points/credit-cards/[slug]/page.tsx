import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import cardData from "@/data/credit-cards.json";

type TableSection = {
  headers: string[];
  rows: string[][];
  paragraph?: string;
};

type BulletSection = {
  bullets: string[];
  paragraph?: string;
};

type Card = {
  slug: string;
  name: string;
  issuer: string;
  annualFee: string;
  summary: string;
  seoDescription: string;
  welcomeOffer: string;
  bestFor: string;
  introduction?: BulletSection;
  overview?: TableSection;
  annualFeeDetails?: TableSection;
  rewards?: TableSection;
  milestoneBenefits?: TableSection;
  redemption?: BulletSection;
  loungeAccess?: TableSection;
  forexMarkup?: BulletSection;
};

const cards = (cardData as { cards: Card[] }).cards;

type SectionWrapperProps = {
  title: string;
  paragraph?: string;
  children: ReactNode;
};

function SectionWrapper({ title, paragraph, children }: SectionWrapperProps) {
  return (
    <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {children}
      {paragraph ? <p className="text-sm text-slate-100/80">{paragraph}</p> : null}
    </section>
  );
}

type BulletSectionBlockProps = {
  title: string;
  section: BulletSection;
};

function BulletSectionBlock({ title, section }: BulletSectionBlockProps) {
  return (
    <SectionWrapper title={title} paragraph={section.paragraph}>
      <ul className="space-y-3 text-sm leading-6 text-slate-100/80">
        {section.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

type TableSectionBlockProps = {
  title: string;
  section: TableSection;
};

function TableSectionBlock({ title, section }: TableSectionBlockProps) {
  return (
    <SectionWrapper title={title} paragraph={section.paragraph}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-sm text-slate-100/80">
          <thead>
            <tr>
              {section.headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {section.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="align-top">
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
}

type SectionIntroProps = {
  issuer: string;
  annualFee: string;
  bestFor: string;
  welcomeOffer: string;
};

function SectionIntro({ issuer, annualFee, bestFor, welcomeOffer }: SectionIntroProps) {
  return (
    <SectionWrapper title="Card snapshot">
      <dl className="grid gap-6 text-sm text-slate-100/80 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-white">Issuer</dt>
          <dd>{issuer}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Annual fee</dt>
          <dd>{annualFee}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-semibold text-white">Best for</dt>
          <dd>{bestFor}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-semibold text-white">Welcome offer</dt>
          <dd>{welcomeOffer}</dd>
        </div>
      </dl>
    </SectionWrapper>
  );
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cards.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const card = cards.find((item) => item.slug === decodedSlug);

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

export default async function CreditCardDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const card = cards.find((item) => item.slug === decodedSlug);

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

        <SectionIntro
          issuer={card.issuer}
          annualFee={card.annualFee}
          bestFor={card.bestFor}
          welcomeOffer={card.welcomeOffer}
        />

        {card.introduction ? (
          <BulletSectionBlock title="Introduction" section={card.introduction} />
        ) : null}

        {card.overview ? (
          <TableSectionBlock title="Overview" section={card.overview} />
        ) : null}

        {card.annualFeeDetails ? (
          <TableSectionBlock title="Annual fee / Joining fee" section={card.annualFeeDetails} />
        ) : null}

        {card.rewards ? <TableSectionBlock title="Rewards" section={card.rewards} /> : null}

        {card.milestoneBenefits ? (
          <TableSectionBlock title="Milestone benefits" section={card.milestoneBenefits} />
        ) : null}

        {card.redemption ? (
          <BulletSectionBlock title="Redemption" section={card.redemption} />
        ) : null}

        {card.loungeAccess ? (
          <TableSectionBlock title="Lounge access" section={card.loungeAccess} />
        ) : null}

        {card.forexMarkup ? (
          <BulletSectionBlock title="Forex markup" section={card.forexMarkup} />
        ) : null}

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
