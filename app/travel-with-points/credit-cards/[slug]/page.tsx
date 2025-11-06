import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { AnnualFee, Card } from "@/app/travel-with-points/credit-cards/types";
import { getCreditCardContent } from "@/lib/contentData";

export const runtime = "edge";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getCard(slug: string): Promise<Card | null> {
  const decodedSlug = decodeURIComponent(slug);
  const { cards } = await getCreditCardContent();

  return cards.find((card) => card.slug === decodedSlug && card.enabled !== false) ?? null;
}

function formatAnnualFee(fee: AnnualFee) {
  const locale = fee.currency === "INR" ? "en-IN" : "en-US";
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: fee.currency,
    maximumFractionDigits: Number.isInteger(fee.amount) ? 0 : 2
  }).format(fee.amount);

  return fee.gstApplicable ? `${formatted} + GST` : formatted;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function renderLayoutSummary(card: Card) {
  switch (card.layout) {
    case "tieredMiles": {
      const welcome = card.welcomeBenefit.details
        .map((detail) => `${formatNumber(detail.miles)} ${card.rewards.currency} • ${detail.condition}`)
        .slice(0, 3);

      return (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white">How this card earns</h2>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm leading-relaxed text-slate-100/80">
            <p className="font-semibold text-white">Reward currency</p>
            <p>{card.rewards.currency}</p>
            <p className="mt-4 font-semibold text-white">Welcome benefits</p>
            {welcome.length ? (
              <ul className="mt-1 space-y-1">
                {welcome.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>No published welcome benefit.</p>
            )}
            <p className="mt-4 font-semibold text-white">Miles posting</p>
            <p>{card.rewards.milesPostingTime}</p>
          </div>
        </section>
      );
    }
    case "lifestyle": {
      const rewards = card.rewards
        ? `${card.rewards.baseRate} base earn rate`
        : "Flexible lifestyle rewards";

      return (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Lifestyle snapshot</h2>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm leading-relaxed text-slate-100/80">
            <p className="font-semibold text-white">Rewards</p>
            <p>{rewards}</p>
            {card.welcomeBenefits?.membershipUnlock ? (
              <div className="mt-4 space-y-1">
                <p className="font-semibold text-white">Membership unlock</p>
                <p>{card.welcomeBenefits.membershipUnlock.spendRequirement}</p>
              </div>
            ) : null}
            {card.welcomeBenefits?.joiningVoucher ? (
              <div className="mt-4 space-y-1">
                <p className="font-semibold text-white">Joining voucher</p>
                <p>
                  ₹{formatNumber(card.welcomeBenefits.joiningVoucher.valueInInr)} –
                  {card.welcomeBenefits.joiningVoucher.condition}
                </p>
              </div>
            ) : null}
          </div>
        </section>
      );
    }
    case "premiumTravel": {
      const requirement = card.welcomeBenefits?.requirements?.[0];
      const perks = requirement?.benefits
        ?.map((perk) => {
          if (perk.name) {
            return perk.name;
          }

          if (perk.partner && perk.valueInInr) {
            return `${perk.partner} – ₹${formatNumber(perk.valueInInr)}`;
          }

          return perk.type;
        })
        .slice(0, 3);

      const privileges: string[] = [];

      if (card.travelBenefits?.airportLoungeAccess) {
        privileges.push("Complimentary lounge access");
      }

      if (card.travelBenefits?.golf?.freeRounds) {
        privileges.push(`${card.travelBenefits.golf.freeRounds} complimentary golf rounds`);
      }

      if (card.travelBenefits?.holidayBenefits?.length) {
        privileges.push(`${card.travelBenefits.holidayBenefits.length} holiday partner offers`);
      }

      if (card.travelBenefits?.dutyFreeDiscount) {
        privileges.push(`Duty free: ${card.travelBenefits.dutyFreeDiscount}`);
      }

      if (card.otherPrivileges?.purchaseProtection) {
        privileges.push(card.otherPrivileges.purchaseProtection);
      }

      if (card.otherPrivileges?.exclusivePrivileges?.length) {
        privileges.push(card.otherPrivileges.exclusivePrivileges[0]);
      }

      return (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Travel privileges</h2>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm leading-relaxed text-slate-100/80">
            {perks?.length ? (
              <div className="space-y-1">
                <p className="font-semibold text-white">Welcome perks</p>
                <ul className="space-y-1">
                  {perks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {privileges.length ? (
              <div className="mt-4 space-y-1">
                <p className="font-semibold text-white">Highlights</p>
                <ul className="space-y-1">
                  {privileges.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      );
    }
    default:
      return null;
  }
}

function CardHighlights({ card }: { card: Card }) {
  const highlights = card.keyHighlights?.filter(Boolean).slice(0, 6) ?? [];

  if (!highlights.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Highlights</h2>
      <ul className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-100/80">
        {highlights.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = await getCard(slug);

  if (!card) {
    return {
      title: "Credit card not found | Travel with Points"
    };
  }

  return {
    title: `${card.name} guide | Travel with Points`,
    description: card.seoDescription,
    alternates: {
      canonical: `/travel-with-points/credit-cards/${card.slug}`
    },
    openGraph: {
      title: `${card.name} guide`,
      description: card.seoDescription
    },
    twitter: {
      card: "summary",
      title: `${card.name} guide`,
      description: card.seoDescription
    }
  };
}

export default async function CreditCardPage({ params }: PageProps) {
  const { slug } = await params;
  const card = await getCard(slug);

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
    feesAndCommissionsSpecification: formatAnnualFee(card.annualFee)
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-16 lg:py-24">
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
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">Card overview</p>
          <h1 className="text-4xl font-semibold text-white">{card.name}</h1>
          <p className="text-base text-slate-200/80">{card.summary}</p>
        </header>

        <section className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-100/80">
          <dl className="grid gap-4 sm:grid-cols-2">
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
          </dl>
          {card.websiteDisplayTags?.length ? (
            <div className="flex flex-wrap gap-2">
              {card.websiteDisplayTags.map((tag) => (
                <span key={tag} className="rounded-full bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </section>

        {card.media?.cardImage ? (
          <figure className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <Image
              src={card.media.cardImage.src}
              alt={card.media.cardImage.alt}
              width={640}
              height={400}
              className="w-full rounded-xl object-contain"
              priority
            />
            {card.media.cardImage.caption ? (
              <figcaption className="mt-3 text-center text-xs text-slate-300/70">
                {card.media.cardImage.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}

        <CardHighlights card={card} />
        {renderLayoutSummary(card)}

        <footer className="flex flex-col gap-3 text-sm text-slate-200/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-white">Browse more cards</p>
          <Link href="/travel-with-points/credit-cards" className="inline-flex items-center font-semibold text-amber-300">
            Back to all cards
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
