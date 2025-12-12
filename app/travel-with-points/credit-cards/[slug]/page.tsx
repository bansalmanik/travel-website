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
    <section className="space-y-7 rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.45)] backdrop-blur-sm sm:p-7 lg:p-9">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">{title}</h2>
        {description ? <p className="text-sm leading-6 text-slate-700 sm:text-base">{description}</p> : null}
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
    <div className="space-y-8 text-base leading-7 text-slate-800">
      {content.map((block, index) => {
        if (block.type === "paragraphs" && block.paragraphs.length) {
          return (
            <div key={`paragraphs-${index}`} className="space-y-4">
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>
          );
        }

        if (block.type === "bullets" && block.bullets.length) {
          return (
            <ul key={`bullets-${index}`} className="space-y-3">
              {block.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 rounded-2xl bg-slate-50/80 p-3 shadow-inner shadow-slate-100">
                  <span
                    className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-gradient-to-br from-amber-500 to-amber-600 shadow-[0_0_0_4px_rgba(251,191,36,0.18)]"
                    aria-hidden
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "table" && hasTableContent(block)) {
          return (
            <div key={`table-${index}`} className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm">
              <table className="min-w-full divide-y divide-slate-200">
                {block.table.caption ? (
                  <caption className="caption-top bg-slate-50 px-4 pb-4 pt-3 text-left text-xs uppercase tracking-[0.3em] text-amber-700">
                    {block.table.caption}
                  </caption>
                ) : null}
                <thead>
                  <tr>
                    {block.table.columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.3em] text-slate-900"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
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
    <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5 shadow-inner shadow-slate-100">
      {subsection.title ? <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{subsection.title}</h3> : null}
      {subsection.description ? <p className="text-sm text-slate-700 sm:text-base">{subsection.description}</p> : null}
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
      <div className="space-y-6">
        {card.keyHighlights?.length ? (
          <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-5 shadow-[0_12px_30px_-20px_rgba(251,191,36,0.7)]">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-white shadow-lg shadow-amber-200">★</span>
              <dt className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Highlights</dt>
            </div>
            <dd>
              <ul className="space-y-3 text-base text-slate-900">
                {card.keyHighlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span
                      className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-gradient-to-br from-amber-500 to-amber-600 shadow-[0_0_0_4px_rgba(251,191,36,0.18)]"
                      aria-hidden
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ) : null}
        <dl className="grid gap-5 text-sm text-slate-700 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 shadow-inner shadow-slate-100">
            <dt className="font-semibold text-slate-900">Issuer</dt>
            <dd className="mt-1 text-base">{card.issuer}</dd>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 shadow-inner shadow-slate-100">
            <dt className="font-semibold text-slate-900">Card type</dt>
            <dd className="mt-1 text-base">{card.type}</dd>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 shadow-inner shadow-slate-100">
            <dt className="font-semibold text-slate-900">Annual fee</dt>
            <dd className="mt-1 text-base">{formatAnnualFee(card.annualFee)}</dd>
          </div>
          {card.rewardsCurrency ? (
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 shadow-inner shadow-slate-100">
              <dt className="font-semibold text-slate-900">Rewards currency</dt>
              <dd className="mt-1 text-base">{card.rewardsCurrency}</dd>
            </div>
          ) : null}
          {card.conversion ? (
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 shadow-inner shadow-slate-100 sm:col-span-2">
              <dt className="font-semibold text-slate-900">Conversion</dt>
              <dd className="mt-2 text-base leading-7">{card.conversion}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </SectionWrapper>
  );
}

function CardImageSection({ image }: { image: SectionImage }) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.45)] sm:p-8">
      <figure className="space-y-4">
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-4 shadow-[0_30px_70px_-45px_rgba(8,47,73,0.7)] sm:p-6">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400/10 via-white/5 to-amber-500/10" aria-hidden />
          <div className="relative mx-auto aspect-[16/9] w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 shadow-[0_25px_60px_-35px_rgba(251,191,36,0.6)]">
            <Image
              src={image.src}
              alt={image.alt}
              width={640}
              height={360}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
        {image.caption ? (
          <figcaption className="text-center text-xs uppercase tracking-[0.25em] text-slate-500">{image.caption}</figcaption>
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
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Ready to apply?</p>
          <p className="text-base text-slate-700 sm:text-lg">Jump to the issuer site to complete your application.</p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <a
            href={applyNow.url}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-[0_18px_38px_-18px_rgba(251,191,36,0.8)] transition duration-200 hover:translate-y-[-1px] hover:shadow-[0_22px_50px_-22px_rgba(251,191,36,0.9)] whitespace-nowrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>
          {applyNow.disclaimer ? <p className="max-w-lg text-xs leading-5 text-slate-600">{applyNow.disclaimer}</p> : null}
        </div>
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
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 py-16 sm:gap-14 sm:px-6 sm:py-20 lg:gap-16 lg:py-28">
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
