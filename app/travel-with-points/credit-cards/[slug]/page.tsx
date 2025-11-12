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

export const runtime = "edge";

type SectionWrapperProps = {
  title: string;
  description?: string;
  children: ReactNode;
  id?: string;
  className?: string;
};

function SectionWrapper({ title, description, children, id, className }: SectionWrapperProps) {
  const headingId = id ? `${id}-title` : undefined;
  const sectionClassName = [
    "space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg shadow-black/20 sm:p-8",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} aria-labelledby={headingId} className={sectionClassName}>
      <div className="space-y-2">
        <h2 id={headingId} className="text-lg font-semibold text-white sm:text-xl">
          {title}
        </h2>
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
    <div className="space-y-5 text-[15px] leading-7 text-slate-100/80 sm:text-base">
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
            <ul
              key={`bullets-${index}`}
              className="space-y-2 list-disc pl-5 marker:text-amber-300"
            >
              {block.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "table" && hasTableContent(block)) {
          return (
            <div key={`table-${index}`} className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                {block.table.caption ? (
                  <caption className="caption-top pb-3 text-left text-xs uppercase tracking-[0.3em] text-amber-300">
                    {block.table.caption}
                  </caption>
                ) : null}
                <thead>
                  <tr>
                    {block.table.columns.map((column) => (
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
                  {block.table.rows.map((row, rowIndex) => (
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
    <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      {subsection.title ? <h3 className="text-base font-semibold text-white">{subsection.title}</h3> : null}
      {subsection.description ? (
        <p className="text-sm text-slate-100/70">{subsection.description}</p>
      ) : null}
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
    <SectionWrapper id={section.id} title={section.title} description={section.description}>
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
    <SectionWrapper title="Card snapshot" id="card-snapshot">
      <dl className="grid gap-4 text-sm text-slate-100/80 sm:grid-cols-2">
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
              <ul className="space-y-2 list-disc pl-5 marker:text-amber-300">
                {card.keyHighlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
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
    <figure className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-lg shadow-black/20">
      <div className="overflow-hidden rounded-xl border border-white/10">
        <Image
          src={image.src}
          alt={image.alt}
          width={640}
          height={400}
          className="h-auto w-full object-cover"
          sizes="(min-width: 768px) 640px, 100vw"
          priority
        />
      </div>
      {image.caption ? (
        <figcaption className="text-xs uppercase tracking-[0.2em] text-slate-200/70">{image.caption}</figcaption>
      ) : null}
    </figure>
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
    <div className="flex flex-col gap-7 sm:gap-8">
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
    <SectionWrapper id="apply-now" title="Apply now">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={applyNow.url}
          className="inline-flex w-full items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 sm:w-auto"
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
        {applyNow.disclaimer ? (
          <p className="text-xs text-slate-100/70">{applyNow.disclaimer}</p>
        ) : null}
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

  const canonicalPath = `/travel-with-points/credit-cards/${card.slug}`;
  const pageUrl = `https://example.com${canonicalPath}`;

  const metadata: Metadata = {
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
      canonical: canonicalPath
    },
    openGraph: {
      title: `${card.name} travel rewards guide`,
      description: card.seoDescription,
      type: "article",
      url: pageUrl
    },
    twitter: {
      card: "summary",
      title: `${card.name} travel rewards guide`,
      description: card.seoDescription
    },
    robots: {
      index: true,
      follow: true
    }
  };

  if (card.media?.cardImage) {
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [
        {
          url: card.media.cardImage.src,
          width: 1200,
          height: 630,
          alt: card.media.cardImage.alt || card.name
        }
      ]
    };

    metadata.twitter = {
      ...metadata.twitter,
      card: "summary_large_image",
      images: [card.media.cardImage.src]
    };
  }

  return metadata;
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

  const canonicalPath = `/travel-with-points/credit-cards/${card.slug}`;
  const pageUrl = `https://example.com${canonicalPath}`;

  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: card.name,
    issuer: card.issuer,
    description: card.summary,
    url: pageUrl,
    feesAndCommissionsSpecification: formatAnnualFee(card.annualFee)
  };

  if (offerDescription) {
    structuredData.offers = {
      "@type": "Offer",
      name: "Card benefits",
      description: offerDescription
    };
  }

  if (card.media?.cardImage) {
    structuredData.image = {
      "@type": "ImageObject",
      url: card.media.cardImage.src,
      caption: card.media.cardImage.alt || card.name
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
        item: pageUrl
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <article className="space-y-10">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-300 sm:text-sm">
            <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
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

          <header className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-amber-300 sm:text-xs">
              Credit card guide
            </p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">{card.name}</h1>
            <p className="text-base text-slate-200/80 sm:text-lg">{card.summary}</p>
          </header>

          {card.media?.cardImage ? <CardImageSection image={card.media.cardImage} /> : null}

          <CardDetailSections card={card} />

          <footer className="flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-200/80 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-white">Ready for more cards?</p>
            <Link
              href="/travel-with-points/credit-cards"
              className="inline-flex items-center gap-2 font-semibold text-amber-300"
            >
              Back to credit cards hub
              <svg
                aria-hidden
                className="h-4 w-4"
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
        </article>
      </div>
    </main>
  );
}
