import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import type {
  AnnualFee,
  Card,
  CardSection,
  CardSubSection,
  RichContent,
  SectionImage
} from "@/app/travel-with-points/credit-cards/types";
import { getCreditCardContent } from "@/lib/contentData";

export const runtime = "edge";

type SectionWrapperProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

function SectionWrapper({ title, description, children }: SectionWrapperProps) {
  return (
    <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {description ? <p className="text-sm text-slate-100/80">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

async function getCards(): Promise<Card[]> {
  const { cards } = await getCreditCardContent();

  return cards;
}

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

function hasTableContent(table?: RichContent["table"]) {
  return Boolean(table && table.rows.length && table.columns.length);
}

function hasRichContent(content?: RichContent) {
  if (!content) return false;

  return Boolean(
    (content.paragraphs && content.paragraphs.length) ||
      (content.bullets && content.bullets.length) ||
      hasTableContent(content.table)
  );
}

function summarizeContent(content?: RichContent) {
  if (!content) return "";

  const parts: string[] = [];

  if (content.paragraphs?.length) {
    parts.push(content.paragraphs.join(" "));
  }

  if (content.bullets?.length) {
    parts.push(content.bullets.join("; "));
  }

  if (hasTableContent(content.table) && content.table) {
    parts.push(
      content.table.rows
        .map((row) => row.filter(Boolean).join(" - "))
        .join("; ")
    );
  }

  return parts.join(" ").trim();
}

function RichContentBlock({ content }: { content: RichContent }) {
  if (!hasRichContent(content)) {
    return null;
  }

  return (
    <div className="space-y-6 text-sm leading-6 text-slate-100/80">
      {content.paragraphs?.length ? (
        <div className="space-y-3">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}

      {content.bullets?.length ? (
        <ul className="space-y-3">
          {content.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {hasTableContent(content.table) && content.table ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            {content.table.caption ? (
              <caption className="caption-top pb-3 text-left text-xs uppercase tracking-[0.3em] text-amber-300">
                {content.table.caption}
              </caption>
            ) : null}
            <thead>
              <tr>
                {content.table.columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.3em] text-slate-200"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {content.table.rows.map((row, rowIndex) => (
                <tr key={`${row.join("-")}-${rowIndex}`} className="align-top">
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`} className="px-4 py-3 text-sm text-slate-100/80">
                      {cell || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

function SubSection({ subsection }: { subsection: CardSubSection }) {
  if (!hasRichContent(subsection.content)) {
    return null;
  }

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      {subsection.title ? <h3 className="text-base font-semibold text-white">{subsection.title}</h3> : null}
      {subsection.description ? (
        <p className="text-sm text-slate-100/70">{subsection.description}</p>
      ) : null}
      {subsection.content ? <RichContentBlock content={subsection.content} /> : null}
    </div>
  );
}

function SectionRenderer({ section }: { section: CardSection }) {
  const hasMainContent = hasRichContent(section.content);
  const hasSubSections = section.subsections?.some((sub) => hasRichContent(sub.content));

  if (!hasMainContent && !hasSubSections) {
    return null;
  }

  return (
    <SectionWrapper title={section.title} description={section.description}>
      <div className="space-y-6">
        {hasMainContent && section.content ? <RichContentBlock content={section.content} /> : null}
        {section.subsections?.length ? (
          <div className="space-y-4">
            {section.subsections.map((subsection, index) => (
              <SubSection key={`${subsection.title ?? section.id}-${index}`} subsection={subsection} />
            ))}
          </div>
        ) : null}
      </div>
    </SectionWrapper>
  );
}

type CardSnapshotProps = {
  card: Card;
};

function CardSnapshot({ card }: CardSnapshotProps) {
  return (
    <SectionWrapper title="Card snapshot">
      <dl className="grid gap-6 text-sm text-slate-100/80 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-white">Issuer</dt>
          <dd>{card.issuer}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Network</dt>
          <dd>{card.network}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Card type</dt>
          <dd>{card.type}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Annual fee</dt>
          <dd>{formatAnnualFee(card.annualFee)}</dd>
        </div>
        {card.rewardsCurrency ? (
          <div>
            <dt className="font-semibold text-white">Rewards currency</dt>
            <dd>{card.rewardsCurrency}</dd>
          </div>
        ) : null}
        {card.conversion ? (
          <div className="sm:col-span-2">
            <dt className="font-semibold text-white">Conversion</dt>
            <dd className="mt-1">{card.conversion}</dd>
          </div>
        ) : null}
        {card.keyHighlights?.length ? (
          <div className="sm:col-span-2">
            <dt className="font-semibold text-white">Highlights</dt>
            <dd className="mt-2">
              <ul className="space-y-2">
                {card.keyHighlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ) : null}
      </dl>
    </SectionWrapper>
  );
}

function CardImageSection({ image }: { image: SectionImage }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <figure className="space-y-3">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
          <Image
            src={image.src}
            alt={image.alt}
            width={640}
            height={400}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
        {image.caption ? (
          <figcaption className="text-xs uppercase tracking-[0.2em] text-slate-200/70">{image.caption}</figcaption>
        ) : null}
      </figure>
    </section>
  );
}

function CardDetailSections({ card }: { card: Card }) {
  if (!card.detailSections?.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <CardSnapshot card={card} />
      {card.detailSections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const cards = await getCards();
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
  const cards = await getCards();
  const card = cards.find((item) => item.slug === decodedSlug);

  if (!card) {
    notFound();
  }

  const welcomeSection = card.detailSections?.find((section) => section.id.includes("welcome"));
  const offerDescription = [
    summarizeContent(welcomeSection?.content),
    ...(welcomeSection?.subsections?.map((subsection) => summarizeContent(subsection.content)) ?? [])
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: card.name,
    issuer: card.issuer,
    description: card.summary,
    url: `https://example.com/travel-with-points/credit-cards/${card.slug}`,
    feesAndCommissionsSpecification: formatAnnualFee(card.annualFee)
  };

  if (offerDescription) {
    structuredData.offers = {
      "@type": "Offer",
      name: "Card benefits",
      description: offerDescription
    };
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-20 lg:py-28">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-300">
          <ol className="flex flex-wrap items-center gap-2">
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

        {card.media?.cardImage ? <CardImageSection image={card.media.cardImage} /> : null}

        <CardDetailSections card={card} />

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
