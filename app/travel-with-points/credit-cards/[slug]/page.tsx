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
  CardApplyNow,
  CardDetailBlock,
  CardApplyNowBlock,
  RichContent,
  RichContentBlock,
  SectionImage
} from "@/app/travel-with-points/credit-cards/types";
import { getCreditCardContent } from "@/lib/contentData";

type SectionWrapperProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

function SectionWrapper({ title, description, children }: SectionWrapperProps) {
  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        {description ? <p className="text-sm text-slate-700">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

async function getCards(): Promise<Card[]> {
  const { cards } = await getCreditCardContent();

  return cards;
}

export async function generateStaticParams() {
  const cards = await getCards();
  return cards.map((card) => ({
    slug: card.slug,
  }));
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

function hasTableContent(tableBlock: RichContentBlock | undefined) {
  if (!tableBlock || tableBlock.type !== "table") {
    return false;
  }

  const { table } = tableBlock;

  return Boolean(table.rows.length && table.columns.length);
}

function hasRichContent(content?: RichContent) {
  if (!content?.length) return false;

  return content.some((block) => {
    if (block.type === "paragraphs") {
      return block.paragraphs.length > 0;
    }

    if (block.type === "bullets") {
      return block.bullets.length > 0;
    }

    if (block.type === "table") {
      return hasTableContent(block);
    }

    return false;
  });
}

function summarizeContent(content?: RichContent) {
  if (!content) return "";

  const parts: string[] = [];

  content.forEach((block) => {
    if (block.type === "paragraphs" && block.paragraphs.length) {
      parts.push(block.paragraphs.join(" "));
    }

    if (block.type === "bullets" && block.bullets.length) {
      parts.push(block.bullets.join("; "));
    }

    if (block.type === "table" && hasTableContent(block)) {
      parts.push(
        block.table.rows
          .map((row) => row.filter(Boolean).join(" - "))
          .join("; ")
      );
    }
  });

  return parts.join(" ").trim();
}

function RichContentBlocks({ content }: { content: RichContent }) {
  if (!hasRichContent(content)) {
    return null;
  }

  return (
    <div className="space-y-6 text-sm leading-6 text-slate-700">
      {content.map((block, index) => {
        if (block.type === "paragraphs" && block.paragraphs.length) {
          return (
            <div key={`paragraphs-${index}`} className="space-y-3">
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          );
        }

        if (block.type === "bullets" && block.bullets.length) {
          return (
            <ul key={`bullets-${index}`} className="space-y-3">
              {block.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-600" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "table" && hasTableContent(block)) {
          return (
            <div key={`table-${index}`} className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                {block.table.caption ? (
                  <caption className="caption-top pb-3 text-left text-xs uppercase tracking-[0.3em] text-amber-700">
                    {block.table.caption}
                  </caption>
                ) : null}
                <thead>
                  <tr>
                    {block.table.columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.3em] text-slate-900"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {block.table.rows.map((row, rowIndex) => (
                    <tr key={`${row.join("-")}-${rowIndex}`} className="align-top">
                      {row.map((cell, cellIndex) => (
                        <td key={`${cell}-${cellIndex}`} className="px-4 py-3 text-sm text-slate-700">
                          {cell || "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

function SubSection({ subsection }: { subsection: CardSubSection }) {
  if (!hasRichContent(subsection.content)) {
    return null;
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      {subsection.title ? <h3 className="text-base font-semibold text-slate-900">{subsection.title}</h3> : null}
      {subsection.description ? <p className="text-sm text-slate-700">{subsection.description}</p> : null}
      {subsection.content ? <RichContentBlocks content={subsection.content} /> : null}
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
        {hasMainContent && section.content ? <RichContentBlocks content={section.content} /> : null}
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
      <dl className="grid gap-5 text-sm text-slate-700 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-slate-900">Issuer</dt>
          <dd>{card.issuer}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Card type</dt>
          <dd>{card.type}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Annual fee</dt>
          <dd>{formatAnnualFee(card.annualFee)}</dd>
        </div>
        {card.rewardsCurrency ? (
          <div>
            <dt className="font-semibold text-slate-900">Rewards currency</dt>
            <dd>{card.rewardsCurrency}</dd>
          </div>
        ) : null}
        {card.conversion ? (
          <div className="sm:col-span-2">
            <dt className="font-semibold text-slate-900">Conversion</dt>
            <dd className="mt-1">{card.conversion}</dd>
          </div>
        ) : null}
        {card.keyHighlights?.length ? (
          <div className="sm:col-span-2">
            <dt className="font-semibold text-slate-900">Highlights</dt>
            <dd className="mt-2">
              <ul className="space-y-2">
                {card.keyHighlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-600" aria-hidden />
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
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <figure className="space-y-3">
        <div className="mx-auto max-w-xs overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <Image
            src={image.src}
            alt={image.alt}
            width={320}
            height={200}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
        {image.caption ? (
          <figcaption className="text-xs uppercase tracking-[0.2em] text-slate-500">{image.caption}</figcaption>
        ) : null}
      </figure>
    </section>
  );
}

function isApplyNowBlock(block: CardDetailBlock): block is CardApplyNowBlock {
  return "component" in block && block.component === "applyNow";
}

function isCardSection(block: CardDetailBlock): block is CardSection {
  return "id" in block && typeof block.id === "string";
}

function CardDetailSections({ card }: { card: Card }) {
  if (!card.detailSections?.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <CardSnapshot card={card} />
      {card.detailSections.map((section, index) => {
        if (isApplyNowBlock(section)) {
          return (
            <ApplyNowSection
              key={`apply-now-${index}`}
              applyNow={section.applyNow}
            />
          );
        }

        return <SectionRenderer key={section.id} section={section} />;
      })}
    </div>
  );
}

function ApplyNowSection({ applyNow }: { applyNow: CardApplyNow }) {
  if (!applyNow?.url) {
    return null;
  }

  const label = applyNow.label?.trim() || "Apply now";

  return (
    <SectionWrapper title="Apply now">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <a
          href={applyNow.url}
          className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-amber-500 whitespace-nowrap"
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
        {applyNow.disclaimer ? <p className="text-xs text-slate-600 pt-1">{applyNow.disclaimer}</p> : null}
      </div>
    </SectionWrapper>
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

  const imageSrc = card.media?.cardImage?.src
    ? `https://example.com${card.media.cardImage.src}`
    : undefined;

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
      url: `https://example.com/travel-with-points/credit-cards/${card.slug}`,
      images: imageSrc
        ? [
            {
              url: imageSrc,
              alt: card.media?.cardImage?.alt ?? card.name
            }
          ]
        : undefined
    },
    twitter: {
      card: imageSrc ? "summary_large_image" : "summary",
      title: `${card.name} travel rewards guide`,
      description: card.seoDescription,
      images: imageSrc ? [imageSrc] : undefined
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

  const welcomeSection = card.detailSections?.find(
    (section): section is CardSection => isCardSection(section) && section.id.includes("welcome")
  );
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

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Travel with Points",
        item: "https://example.com/travel-with-points"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Credit cards",
        item: "https://example.com/travel-with-points/credit-cards"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: card.name,
        item: `https://example.com/travel-with-points/credit-cards/${card.slug}`
      }
    ]
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-amber-50 text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-16 sm:gap-12 sm:px-6 sm:py-20 lg:py-28">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/travel-with-points" className="hover:text-amber-700">
                Travel with Points
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/travel-with-points/credit-cards" className="hover:text-amber-700">
                Credit cards
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-amber-700">{card.name}</li>
          </ol>
        </nav>

        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-700">Credit card guide</p>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{card.name}</h1>
          <p className="text-base text-slate-700 sm:text-lg">{card.summary}</p>
        </header>

        {card.media?.cardImage ? <CardImageSection image={card.media.cardImage} /> : null}

        <CardDetailSections card={card} />

        <footer className="flex flex-col gap-3 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-slate-900">Ready for more cards?</p>
          <Link href="/travel-with-points/credit-cards" className="inline-flex items-center font-semibold text-amber-700">
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
