import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import cardData from "@/data/credit-cards.json";

type SectionImage = {
  src: string;
  alt: string;
  caption?: string;
};

type AnnualFee = {
  amount: number;
  currency: string;
  gstApplicable?: boolean;
};

type WelcomeBenefitDetail = {
  validFrom?: string;
  validTo?: string;
  miles: number;
  condition: string;
};

type WelcomeBenefit = {
  details: WelcomeBenefitDetail[];
  milesPostingTime: string;
  onlyForPaidCards?: boolean;
};

type EarnRateValue =
  | string
  | {
      rate: string;
      eligible?: string;
      cap?: string;
    };

type Rewards = {
  currency: string;
  conversion?: string;
  earnRate: Record<string, EarnRateValue>;
  exclusions: string[];
  milesPostingTime: string;
};

type TierLevel = {
  name: string;
  upgradeSpend: number | null;
};

type Tiers = {
  levels: TierLevel[];
  downgradeRule?: string;
};

type TierBenefits = {
  annualMilesOnFeePayment: Record<string, number>;
  milestoneBenefits: { spend: number; miles: number }[];
};

type LoungeAccess = {
  domestic: Record<string, number>;
  international: Record<string, number>;
  guestAccessIncluded?: boolean;
  notes?: string;
};

type MilesRedemption = {
  options: string[];
  transferPartnersValue?: string;
  annualTransferLimit?: number;
  groupLimits?: Record<string, number>;
};

type AdditionalInfo = {
  milesNotEncashable?: boolean;
  anniversaryYearBasis?: boolean;
  tierSpendExclusions?: string;
  accessMethod?: string;
};

type CardMedia = {
  cardImage?: SectionImage;
};

type Card = {
  slug: string;
  name: string;
  issuer: string;
  network: string;
  type: string;
  summary: string;
  seoDescription: string;
  annualFee: AnnualFee;
  welcomeBenefit: WelcomeBenefit;
  rewards: Rewards;
  tiers: Tiers;
  tierBenefits: TierBenefits;
  loungeAccess: LoungeAccess;
  milesRedemption: MilesRedemption;
  additionalInfo: AdditionalInfo;
  websiteDisplayTags?: string[];
  keyHighlights?: string[];
  media?: CardMedia;
};

const cards = (cardData as { cards: Card[] }).cards;

type SectionWrapperProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

function SectionWrapper({ title, description, children }: SectionWrapperProps) {
  return (
    <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {description ? <p className="text-sm text-slate-100/80">{description}</p> : null}
      </div>
      {children}
    </section>
  );
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

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function formatSpend(value: number, currency: string) {
  const locale = currency === "INR" ? "en-IN" : "en-US";
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  return formatter.format(value);
}

function formatDate(value?: string) {
  if (!value) {
    return "—";
  }

  const formatter = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return formatter.format(new Date(value));
}

function formatLabel(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .replace(/\bId\b/, "ID");
}

function createWelcomeOfferSummary(welcomeBenefit: WelcomeBenefit, rewardsCurrency: string) {
  if (!welcomeBenefit.details.length) {
    return "";
  }

  return welcomeBenefit.details
    .map((detail) => `${formatNumber(detail.miles)} ${rewardsCurrency} - ${detail.condition}`)
    .join("; ");
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
        <div>
          <dt className="font-semibold text-white">Rewards currency</dt>
          <dd>{card.rewards.currency}</dd>
        </div>
        {card.rewards.conversion ? (
          <div>
            <dt className="font-semibold text-white">Conversion</dt>
            <dd>{card.rewards.conversion}</dd>
          </div>
        ) : null}
        <div className="sm:col-span-2">
          <dt className="font-semibold text-white">Tags</dt>
          <dd className="mt-2">
            {card.websiteDisplayTags?.length ? (
              <ul className="flex flex-wrap gap-2">
                {card.websiteDisplayTags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-200"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-slate-100/60">—</span>
            )}
          </dd>
        </div>
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

type WelcomeBenefitSectionProps = {
  welcomeBenefit: WelcomeBenefit;
  rewardsCurrency: string;
};

function WelcomeBenefitSection({ welcomeBenefit, rewardsCurrency }: WelcomeBenefitSectionProps) {
  return (
    <SectionWrapper
      title="Welcome benefits"
      description={`Miles post ${welcomeBenefit.milesPostingTime.toLowerCase()}${
        welcomeBenefit.onlyForPaidCards ? "; available on paid variants" : ""
      }.`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-sm text-slate-100/80">
          <thead>
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200">
                Valid from
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200">
                Valid to
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200">
                Miles
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200">
                Requirement
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {welcomeBenefit.details.map((detail, index) => (
              <tr key={`${detail.condition}-${index}`} className="align-top">
                <td className="px-4 py-3">{formatDate(detail.validFrom)}</td>
                <td className="px-4 py-3">{formatDate(detail.validTo)}</td>
                <td className="px-4 py-3">{`${formatNumber(detail.miles)} ${rewardsCurrency}`}</td>
                <td className="px-4 py-3">{detail.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
}

type RewardsSectionProps = {
  rewards: Rewards;
};

function RewardsSection({ rewards }: RewardsSectionProps) {
  return (
    <SectionWrapper
      title="Rewards earning"
      description={`Miles post ${rewards.milesPostingTime.toLowerCase()}. Exclusions include ${rewards.exclusions.join(
        ", "
      )}.`}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Earn rates</h3>
          <ul className="mt-3 space-y-4 text-sm leading-6 text-slate-100/80">
            {Object.entries(rewards.earnRate).map(([key, value]) => {
              const label = formatLabel(key);

              if (typeof value === "string") {
                return (
                  <li key={key} className="space-y-1">
                    <p className="font-semibold text-white">{label}</p>
                    <p>{value}</p>
                  </li>
                );
              }

              return (
                <li key={key} className="space-y-1">
                  <p className="font-semibold text-white">{label}</p>
                  <p>{value.rate}</p>
                  {value.eligible ? <p className="text-xs uppercase tracking-[0.25em] text-amber-300">{value.eligible}</p> : null}
                  {value.cap ? <p className="text-xs text-slate-100/60">Cap: {value.cap}</p> : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}

type TiersSectionProps = {
  tiers: Tiers;
  currency: string;
};

function TiersSection({ tiers, currency }: TiersSectionProps) {
  return (
    <SectionWrapper title="Tier progression" description={tiers.downgradeRule}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-sm text-slate-100/80">
          <thead>
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200">
                Tier
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200">
                Spend to upgrade
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {tiers.levels.map((level) => (
              <tr key={level.name} className="align-top">
                <td className="px-4 py-3">{level.name}</td>
                <td className="px-4 py-3">
                  {level.upgradeSpend ? formatSpend(level.upgradeSpend, currency) : "Base tier"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
}

type TierBenefitsSectionProps = {
  tierBenefits: TierBenefits;
  rewardsCurrency: string;
  spendCurrency: string;
};

function TierBenefitsSection({ tierBenefits, rewardsCurrency, spendCurrency }: TierBenefitsSectionProps) {
  return (
    <SectionWrapper title="Tier benefits">
      <div className="space-y-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-sm text-slate-100/80">
            <caption className="caption-top pb-3 text-left text-xs uppercase tracking-[0.3em] text-amber-300">
              Annual miles on fee payment
            </caption>
            <thead>
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200">
                  Tier
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200">
                  Miles credited
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {Object.entries(tierBenefits.annualMilesOnFeePayment).map(([tier, miles]) => (
                <tr key={tier} className="align-top">
                  <td className="px-4 py-3">{tier}</td>
                  <td className="px-4 py-3">{`${formatNumber(miles)} ${rewardsCurrency}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-sm text-slate-100/80">
            <caption className="caption-top pb-3 text-left text-xs uppercase tracking-[0.3em] text-amber-300">
              Milestone bonuses
            </caption>
            <thead>
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200">
                  Spend threshold
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200">
                  Bonus miles
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {tierBenefits.milestoneBenefits.map((benefit, index) => (
                <tr key={`${benefit.spend}-${index}`} className="align-top">
                  <td className="px-4 py-3">{formatSpend(benefit.spend, spendCurrency)}</td>
                  <td className="px-4 py-3">{`${formatNumber(benefit.miles)} ${rewardsCurrency}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionWrapper>
  );
}

type LoungeAccessSectionProps = {
  loungeAccess: LoungeAccess;
};

function LoungeAccessSection({ loungeAccess }: LoungeAccessSectionProps) {
  const tiers = Array.from(
    new Set([
      ...Object.keys(loungeAccess.domestic),
      ...Object.keys(loungeAccess.international)
    ])
  );

  return (
    <SectionWrapper
      title="Lounge access"
      description={`${loungeAccess.guestAccessIncluded ? "Guest access included" : "Guest access not included"}${
        loungeAccess.notes ? `; ${loungeAccess.notes}` : ""
      }`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-sm text-slate-100/80">
          <thead>
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200">
                Tier
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200">
                Domestic visits
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200">
                International visits
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {tiers.map((tier) => (
              <tr key={tier} className="align-top">
                <td className="px-4 py-3">{tier}</td>
                <td className="px-4 py-3">{loungeAccess.domestic[tier] ?? "—"}</td>
                <td className="px-4 py-3">{loungeAccess.international[tier] ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
}

type MilesRedemptionSectionProps = {
  milesRedemption: MilesRedemption;
  rewardsCurrency: string;
};

function MilesRedemptionSection({ milesRedemption, rewardsCurrency }: MilesRedemptionSectionProps) {
  return (
    <SectionWrapper title="Miles redemption options">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Ways to use miles</h3>
          <ul className="mt-3 grid gap-3 text-sm text-slate-100/80 sm:grid-cols-2">
            {milesRedemption.options.map((option) => (
              <li key={option} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
                <span>{option}</span>
              </li>
            ))}
          </ul>
        </div>
        {milesRedemption.transferPartnersValue ? (
          <p className="text-sm text-slate-100/80">{milesRedemption.transferPartnersValue}</p>
        ) : null}
        {milesRedemption.annualTransferLimit ? (
          <p className="text-sm text-slate-100/80">
            Annual transfer limit: {`${formatNumber(milesRedemption.annualTransferLimit)} ${rewardsCurrency}`}
          </p>
        ) : null}
        {milesRedemption.groupLimits ? (
          <div className="space-y-3 text-sm text-slate-100/80">
            <p className="font-semibold text-white">Group limits</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {Object.entries(milesRedemption.groupLimits).map(([group, limit]) => (
                <li key={group} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-300">{group}</p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {`${formatNumber(limit)} ${rewardsCurrency}`}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </SectionWrapper>
  );
}

type AdditionalInfoSectionProps = {
  additionalInfo: AdditionalInfo;
  rewardsCurrency: string;
};

function AdditionalInfoSection({ additionalInfo, rewardsCurrency }: AdditionalInfoSectionProps) {
  const bulletPoints: string[] = [];

  if (additionalInfo.milesNotEncashable) {
    bulletPoints.push(`${rewardsCurrency} cannot be encashed; redeem via travel or partners.`);
  }

  if (additionalInfo.anniversaryYearBasis) {
    bulletPoints.push("Tier calculations follow the card anniversary year.");
  }

  if (additionalInfo.tierSpendExclusions) {
    bulletPoints.push(`Tier spend exclusions: ${additionalInfo.tierSpendExclusions}.`);
  }

  if (additionalInfo.accessMethod) {
    bulletPoints.push(`Lounge access method: ${additionalInfo.accessMethod}.`);
  }

  if (!bulletPoints.length) {
    return null;
  }

  return (
    <SectionWrapper title="Additional information">
      <ul className="space-y-3 text-sm leading-6 text-slate-100/80">
        {bulletPoints.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

type CardImageSectionProps = {
  image: SectionImage;
};

function CardImageSection({ image }: CardImageSectionProps) {
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

  const welcomeOfferSummary = createWelcomeOfferSummary(card.welcomeBenefit, card.rewards.currency);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: card.name,
    issuer: card.issuer,
    description: card.summary,
    url: `https://example.com/travel-with-points/credit-cards/${card.slug}`,
    offers: {
      "@type": "Offer",
      name: "Welcome benefits",
      description: welcomeOfferSummary
    },
    feesAndCommissionsSpecification: formatAnnualFee(card.annualFee),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "1"
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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

        {card.media?.cardImage ? <CardImageSection image={card.media.cardImage} /> : null}

        <CardSnapshot card={card} />

        <WelcomeBenefitSection welcomeBenefit={card.welcomeBenefit} rewardsCurrency={card.rewards.currency} />

        <RewardsSection rewards={card.rewards} />

        <TiersSection tiers={card.tiers} currency={card.annualFee.currency} />

        <TierBenefitsSection
          tierBenefits={card.tierBenefits}
          rewardsCurrency={card.rewards.currency}
          spendCurrency={card.annualFee.currency}
        />

        <LoungeAccessSection loungeAccess={card.loungeAccess} />

        <MilesRedemptionSection milesRedemption={card.milesRedemption} rewardsCurrency={card.rewards.currency} />

        <AdditionalInfoSection additionalInfo={card.additionalInfo} rewardsCurrency={card.rewards.currency} />

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
