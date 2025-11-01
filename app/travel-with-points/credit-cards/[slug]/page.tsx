import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import type {
  AnnualFee,
  Card,
  LifestyleCard,
  LifestyleConcierge,
  LifestyleEligibility,
  LifestyleInsurance,
  LifestyleLoungeAccess,
  LifestyleMilestoneBenefits,
  LifestyleRedemption,
  LifestyleRewards,
  LifestyleSpecialPrograms,
  PremiumTravelCard,
  PremiumTravelEligibility,
  PremiumTravelMilestoneBenefits,
  PremiumTravelOtherPrivileges,
  PremiumTravelRedemption,
  PremiumTravelRewardProgram,
  PremiumTravelTravelBenefits,
  PremiumTravelVouchersAndOffers,
  SectionImage,
  TieredAdditionalInfo,
  TieredLoungeAccess,
  TieredMilesCard,
  TieredMilesRedemption,
  TieredTierBenefits,
  TieredTiers,
  TieredWelcomeBenefit,
} from "@/app/travel-with-points/credit-cards/types";
import { getCreditCardContent } from "@/lib/contentData";

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
    timeZone: "UTC",
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

function describePremiumWelcomePerk(perk: PremiumWelcomeBenefitPerk) {
  switch (perk.type) {
    case "cashback":
      return perk.valueInInr ? `${formatSpend(perk.valueInInr, "INR")} cashback` : "Cashback";
    case "hotel_voucher":
      if (perk.valueInInr && perk.partner) {
        return `${formatSpend(perk.valueInInr, "INR")} ${perk.partner} voucher`;
      }

      return "Hotel voucher";
    case "membership":
      if (perk.name && perk.validity) {
        return `${perk.name} membership (${perk.validity})`;
      }

      return perk.name ? `${perk.name} membership` : "Complimentary membership";
    case "reward_points":
      return perk.value ? `${formatNumber(perk.value)} Reward Points` : "Reward Points";
    default:
      if (perk.name && perk.valueInInr) {
        return `${perk.name} - ${formatSpend(perk.valueInInr, "INR")}`;
      }

      return perk.name ?? perk.type;
  }
}

function createTieredWelcomeOfferSummary(welcomeBenefit: TieredWelcomeBenefit, rewardsCurrency: string) {
  if (!welcomeBenefit.details.length) {
    return "";
  }

  return welcomeBenefit.details
    .map((detail) => `${formatNumber(detail.miles)} ${rewardsCurrency} - ${detail.condition}`)
    .join("; ");
}

type TieredCardSnapshotProps = {
  card: TieredMilesCard;
};

function TieredCardSnapshot({ card }: TieredCardSnapshotProps) {
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

type TieredWelcomeBenefitSectionProps = {
  welcomeBenefit: TieredWelcomeBenefit;
  rewardsCurrency: string;
};

function TieredWelcomeBenefitSection({ welcomeBenefit, rewardsCurrency }: TieredWelcomeBenefitSectionProps) {
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

type TieredRewardsSectionProps = {
  rewards: TieredRewards;
};

function TieredRewardsSection({ rewards }: TieredRewardsSectionProps) {
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

type TieredTiersSectionProps = {
  tiers: TieredTiers;
  currency: string;
};

function TieredTiersSection({ tiers, currency }: TieredTiersSectionProps) {
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

type TieredTierBenefitsSectionProps = {
  tierBenefits: TieredTierBenefits;
  rewardsCurrency: string;
  spendCurrency: string;
};

function TieredTierBenefitsSection({ tierBenefits, rewardsCurrency, spendCurrency }: TieredTierBenefitsSectionProps) {
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

type TieredLoungeAccessSectionProps = {
  loungeAccess: TieredLoungeAccess;
};

function TieredLoungeAccessSection({ loungeAccess }: TieredLoungeAccessSectionProps) {
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

type TieredMilesRedemptionSectionProps = {
  milesRedemption: TieredMilesRedemption;
  rewardsCurrency: string;
};

function TieredMilesRedemptionSection({ milesRedemption, rewardsCurrency }: TieredMilesRedemptionSectionProps) {
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

type TieredAdditionalInfoSectionProps = {
  additionalInfo: TieredAdditionalInfo;
  rewardsCurrency: string;
};

function TieredAdditionalInfoSection({ additionalInfo, rewardsCurrency }: TieredAdditionalInfoSectionProps) {
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

function createWelcomeOfferSummary(card: Card) {
  if (card.layout === "tieredMiles") {
    return createTieredWelcomeOfferSummary(card.welcomeBenefit, card.rewards.currency);
  }

  if (card.layout === "premiumTravel") {
    return card.welcomeBenefits.requirements
      .map((requirement) => {
        const benefits = requirement.benefits.map((benefit) => describePremiumWelcomePerk(benefit)).join(" + ");
        return `${benefits} after spending ${formatSpend(requirement.spend, card.annualFee.currency)} in ${requirement.periodDays} days`;
      })
      .join("; ");
  }

  const summaryParts: string[] = [];

  if (card.welcomeBenefits.membershipUnlock) {
    const membership = card.welcomeBenefits.membershipUnlock;
    const memberships = membership.benefits.join(" + ");
    summaryParts.push(`${memberships} after spending ${membership.spendRequirement}`);
  }

  if (card.welcomeBenefits.joiningVoucher) {
    const voucher = card.welcomeBenefits.joiningVoucher;
    summaryParts.push(`₹${formatNumber(voucher.valueInInr)} voucher - ${voucher.condition}`);
  }

  return summaryParts.join("; ");
}

type TieredMilesCardSectionsProps = {
  card: TieredMilesCard;
};

function TieredMilesCardSections({ card }: TieredMilesCardSectionsProps) {
  return (
    <>
      <TieredCardSnapshot card={card} />
      <TieredWelcomeBenefitSection welcomeBenefit={card.welcomeBenefit} rewardsCurrency={card.rewards.currency} />
      <TieredRewardsSection rewards={card.rewards} />
      <TieredTiersSection tiers={card.tiers} currency={card.annualFee.currency} />
      <TieredTierBenefitsSection
        tierBenefits={card.tierBenefits}
        rewardsCurrency={card.rewards.currency}
        spendCurrency={card.annualFee.currency}
      />
      <TieredLoungeAccessSection loungeAccess={card.loungeAccess} />
      <TieredMilesRedemptionSection milesRedemption={card.milesRedemption} rewardsCurrency={card.rewards.currency} />
      <TieredAdditionalInfoSection additionalInfo={card.additionalInfo} rewardsCurrency={card.rewards.currency} />
    </>
  );
}

type LifestyleCardSectionsProps = {
  card: LifestyleCard;
};

function LifestyleCardSections({ card }: LifestyleCardSectionsProps) {
  return (
    <>
      <LifestyleCardSnapshot card={card} />
      <LifestyleWelcomeBenefitsSection card={card} />
      <LifestyleRewardsSection rewards={card.rewards} currency={card.annualFee.currency} />
      <LifestyleRedemptionSection redemption={card.redemption} />
      <LifestyleMilestoneSection milestoneBenefits={card.milestoneBenefits} currency={card.annualFee.currency} />
      <LifestyleLoungeAccessSection loungeAccess={card.loungeAccess} />
      <LifestyleSupportSection concierge={card.concierge} insurance={card.insurance} />
      <LifestyleEligibilitySection eligibility={card.eligibility} />
      <LifestyleSpecialProgramsSection specialPrograms={card.specialPrograms} />
    </>
  );
}

type LifestyleCardSnapshotProps = {
  card: LifestyleCard;
};

function LifestyleCardSnapshot({ card }: LifestyleCardSnapshotProps) {
  const { fees, travelBenefitsTags, rewardTags } = card;
  const snapshotDescription = fees.welcomeBenefitCondition
    ? `Welcome perks unlock when you ${fees.welcomeBenefitCondition}.`
    : undefined;

  return (
    <SectionWrapper title="Card snapshot" description={snapshotDescription}>
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
          <dt className="font-semibold text-white">Joining fee</dt>
          <dd>{formatSpend(fees.joiningFee, card.annualFee.currency)}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Renewal fee</dt>
          <dd>{formatSpend(fees.renewalFee, card.annualFee.currency)}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Foreign exchange markup</dt>
          <dd>{card.foreignExchangeMarkup ?? "—"}</dd>
        </div>
        {travelBenefitsTags?.length ? (
          <div className="sm:col-span-2">
            <dt className="font-semibold text-white">Travel focus</dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-2">
                {travelBenefitsTags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-200"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ) : null}
        {rewardTags?.length ? (
          <div className="sm:col-span-2">
            <dt className="font-semibold text-white">Rewards focus</dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-2">
                {rewardTags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-200"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </dd>
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

type LifestyleWelcomeBenefitsSectionProps = {
  card: LifestyleCard;
};

function LifestyleWelcomeBenefitsSection({ card }: LifestyleWelcomeBenefitsSectionProps) {
  const { membershipUnlock, joiningVoucher } = card.welcomeBenefits;

  if (!membershipUnlock && !joiningVoucher) {
    return null;
  }

  return (
    <SectionWrapper title="Welcome benefits">
      <div className="grid gap-6 sm:grid-cols-2">
        {membershipUnlock ? (
          <article className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white">Membership unlock</h3>
              <p className="text-sm text-slate-100/80">Spend {membershipUnlock.spendRequirement} to unlock both memberships.</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-100/80">
              {membershipUnlock.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-1 text-xs uppercase tracking-[0.3em] text-amber-300">
              {membershipUnlock.unlockTime ? <p>Unlocks: {membershipUnlock.unlockTime}</p> : null}
              {membershipUnlock.downloadWindow ? <p>Download window: {membershipUnlock.downloadWindow}</p> : null}
            </div>
          </article>
        ) : null}
        {joiningVoucher ? (
          <article className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <h3 className="text-lg font-semibold text-white">Joining voucher</h3>
            <p className="text-sm text-slate-100/80">
              Worth ₹{formatNumber(joiningVoucher.valueInInr)} in welcome vouchers once you {joiningVoucher.condition}.
            </p>
          </article>
        ) : null}
      </div>
    </SectionWrapper>
  );
}

type LifestyleRewardsSectionProps = {
  rewards: LifestyleRewards;
  currency: string;
};

function LifestyleRewardsSection({ rewards, currency }: LifestyleRewardsSectionProps) {
  const meta: string[] = [rewards.rewardPosting];

  if (rewards.rewardValidity) {
    meta.push(`Valid for ${rewards.rewardValidity}`);
  }

  if (rewards.monthlyRpCap) {
    meta.push(`Monthly cap: ${formatNumber(rewards.monthlyRpCap)} RP`);
  }

  return (
    <SectionWrapper title="Rewards earning" description={meta.join(" · ")}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Base earn rate</h3>
          <p className="text-sm text-slate-100/80">{rewards.baseRate}</p>
        </div>
        {rewards.acceleratedRewards ? (
          <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <h3 className="text-base font-semibold text-white">5X partner merchants</h3>
            <p className="text-sm text-slate-100/80">{rewards.acceleratedRewards.rate}</p>
            <ul className="mt-2 grid gap-2 text-sm text-slate-100/80 sm:grid-cols-2">
              {rewards.acceleratedRewards.merchants.map((merchant) => (
                <li key={merchant} className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2">
                  {merchant}
                </li>
              ))}
            </ul>
            <div className="text-xs uppercase tracking-[0.3em] text-amber-300">
              {rewards.acceleratedRewards.minSpend ? (
                <p>Min transaction: {formatSpend(rewards.acceleratedRewards.minSpend, currency)}</p>
              ) : null}
              {rewards.acceleratedRewards.monthlyCapRp ? (
                <p>Monthly bonus cap: {formatNumber(rewards.acceleratedRewards.monthlyCapRp)} RP</p>
              ) : null}
            </div>
          </div>
        ) : null}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Exclusions & caps</h3>
          <ul className="grid gap-2 text-sm text-slate-100/80 sm:grid-cols-2">
            {rewards.rewardExclusions.map((item) => (
              <li key={item} className="rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}

type LifestyleRedemptionSectionProps = {
  redemption: LifestyleRedemption;
};

function LifestyleRedemptionSection({ redemption }: LifestyleRedemptionSectionProps) {
  const { smartBuyPortalValue } = redemption;

  return (
    <SectionWrapper title="Redemption value" description={redemption.travelRedemptionLimit}>
      <div className="grid gap-4 text-sm text-slate-100/80 sm:grid-cols-2">
        {Object.entries(smartBuyPortalValue).map(([key, value]) => (
          <article key={key} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">{formatLabel(key)}</h3>
            <p className="mt-2 text-base font-semibold text-white">{value}</p>
          </article>
        ))}
      </div>
      {redemption.airmilesConversion ? (
        <p className="mt-6 text-sm text-slate-100/80">{redemption.airmilesConversion.conversionRate}</p>
      ) : null}
    </SectionWrapper>
  );
}

type LifestyleMilestoneSectionProps = {
  milestoneBenefits?: LifestyleMilestoneBenefits;
  currency: string;
};

function LifestyleMilestoneSection({ milestoneBenefits, currency }: LifestyleMilestoneSectionProps) {
  if (!milestoneBenefits) {
    return null;
  }

  const { quarterly, annual, voucherUnlockTime } = milestoneBenefits;

  if (!quarterly && (!annual || !annual.length)) {
    return null;
  }

  return (
    <SectionWrapper title="Milestone benefits" description={voucherUnlockTime}>
      <div className="space-y-6">
        {quarterly ? (
          <article className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <h3 className="text-base font-semibold text-white">Quarterly gift vouchers</h3>
            <p className="text-sm text-slate-100/80">
              Spend {formatSpend(quarterly.spendRequirement, currency)} each quarter to choose a {formatSpend(quarterly.voucherValue, currency)} voucher.
            </p>
            <ul className="grid gap-2 text-sm text-slate-100/80 sm:grid-cols-2">
              {quarterly.brandChoices.map((brand) => (
                <li key={brand} className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2">
                  {brand}
                </li>
              ))}
            </ul>
          </article>
        ) : null}
        {annual?.length ? (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Annual flight vouchers</h3>
            <ul className="space-y-2 text-sm text-slate-100/80">
              {annual.map((item) => (
                <li key={`${item.threshold}-${item.benefit}`} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
                  <span>
                    {formatSpend(item.threshold, currency)} spend → {item.benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </SectionWrapper>
  );
}

type LifestyleLoungeAccessSectionProps = {
  loungeAccess: LifestyleLoungeAccess;
};

function LifestyleLoungeAccessSection({ loungeAccess }: LifestyleLoungeAccessSectionProps) {
  if (!loungeAccess.india && !loungeAccess.internationalPriorityPass) {
    return null;
  }

  return (
    <SectionWrapper title="Lounge access">
      <div className="grid gap-4 text-sm text-slate-100/80 sm:grid-cols-2">
        {loungeAccess.india ? (
          <article className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <h3 className="text-base font-semibold text-white">India lounges</h3>
            <p>{loungeAccess.india.quota} complimentary visits</p>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">{loungeAccess.india.terminals}</p>
            {loungeAccess.india.method ? (
              <p className="text-xs text-slate-100/70">Access method: {loungeAccess.india.method}</p>
            ) : null}
          </article>
        ) : null}
        {loungeAccess.internationalPriorityPass ? (
          <article className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <h3 className="text-base font-semibold text-white">Priority Pass (International)</h3>
            <p>{loungeAccess.internationalPriorityPass.quota} visits per membership year</p>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              ${loungeAccess.internationalPriorityPass.chargeAfterQuotaUsd} after quota
            </p>
            {loungeAccess.internationalPriorityPass.notes?.length ? (
              <ul className="space-y-2 text-xs text-slate-100/70">
                {loungeAccess.internationalPriorityPass.notes.map((note) => (
                  <li key={note} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-amber-300" aria-hidden />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ) : null}
      </div>
    </SectionWrapper>
  );
}

type LifestyleSupportSectionProps = {
  concierge?: LifestyleConcierge;
  insurance?: LifestyleInsurance;
};

function LifestyleSupportSection({ concierge, insurance }: LifestyleSupportSectionProps) {
  if (!concierge && !insurance) {
    return null;
  }

  return (
    <SectionWrapper title="Support & protection">
      <div className="grid gap-4 text-sm text-slate-100/80 sm:grid-cols-2">
        {concierge ? (
          <article className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Concierge</h3>
            {concierge.email ? <p>Email: {concierge.email}</p> : null}
            {concierge.phone ? <p>Phone: {concierge.phone}</p> : null}
          </article>
        ) : null}
        {insurance ? (
          <article className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Insurance</h3>
            {insurance.lostCardLiability ? <p>{insurance.lostCardLiability}</p> : null}
          </article>
        ) : null}
      </div>
    </SectionWrapper>
  );
}

type LifestyleEligibilitySectionProps = {
  eligibility?: LifestyleEligibility;
};

function LifestyleEligibilitySection({ eligibility }: LifestyleEligibilitySectionProps) {
  if (!eligibility) {
    return null;
  }

  const segments = Object.entries(eligibility);

  return (
    <SectionWrapper title="Eligibility">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-sm text-slate-100/80">
          <thead>
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200">
                Segment
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200">
                Age
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-200">
                Income / ITR requirement
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {segments.map(([segment, details]) => (
              <tr key={segment} className="align-top">
                <td className="px-4 py-3">{formatLabel(segment)}</td>
                <td className="px-4 py-3">{details.age}</td>
                <td className="px-4 py-3">
                  {details.incomeMin ?? details.itrMin ?? "—"}
                  {details.incomeMin && details.itrMin ? (
                    <p className="text-xs text-slate-100/60">ITR: {details.itrMin}</p>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
}

type LifestyleSpecialProgramsSectionProps = {
  specialPrograms?: LifestyleSpecialPrograms;
};

function LifestyleSpecialProgramsSection({ specialPrograms }: LifestyleSpecialProgramsSectionProps) {
  if (!specialPrograms?.dining) {
    return null;
  }

  const { dining } = specialPrograms;

  return (
    <SectionWrapper title="Special programs">
      <article className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-100/80">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">{dining.program}</p>
        <p className="text-base font-semibold text-white">{dining.benefit}</p>
        {dining.platform ? <p>Powered by {dining.platform}</p> : null}
      </article>
    </SectionWrapper>
  );
}

type PremiumTravelCardSectionsProps = {
  card: PremiumTravelCard;
};

function PremiumTravelCardSections({ card }: PremiumTravelCardSectionsProps) {
  return (
    <>
      <PremiumTravelSnapshot card={card} />
      <PremiumTravelWelcomeBenefitsSection card={card} />
      <PremiumTravelRewardsSection rewardProgram={card.rewardProgram} currency={card.annualFee.currency} />
      <PremiumTravelRewardExclusionsSection exclusions={card.rewardExclusions} />
      <PremiumTravelMilestoneSection milestoneBenefits={card.milestoneBenefits} currency={card.annualFee.currency} />
      <PremiumTravelVouchersSection
        vouchersAndOffers={card.vouchersAndOffers}
        currency={card.annualFee.currency}
      />
      <PremiumTravelRedemptionSection redemption={card.redemption} />
      <PremiumTravelTravelBenefitsSection travelBenefits={card.travelBenefits} />
      <PremiumTravelOtherPrivilegesSection otherPrivileges={card.otherPrivileges} />
      <PremiumTravelEligibilitySection eligibility={card.eligibility} />
    </>
  );
}

type PremiumTravelSnapshotProps = {
  card: PremiumTravelCard;
};

function PremiumTravelSnapshot({ card }: PremiumTravelSnapshotProps) {
  const { fees, rewardProgram, tags } = card;
  const waiverDescription = fees.waiver
    ? `Annual fee waived on ${formatSpend(
        fees.waiver.spendRequirement,
        fees.waiver.currency ?? card.annualFee.currency
      )} annual spend${fees.waiver.note ? ` (${fees.waiver.note})` : ""}.`
    : undefined;

  return (
    <SectionWrapper title="Card snapshot" description={waiverDescription}>
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
          <dt className="font-semibold text-white">Joining fee</dt>
          <dd>{formatSpend(fees.joiningFee, card.annualFee.currency)}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Annual fee</dt>
          <dd>{formatAnnualFee(card.annualFee)}</dd>
        </div>
        {fees.waiver ? (
          <div>
            <dt className="font-semibold text-white">Annual fee waiver</dt>
            <dd>
              Waived with {formatSpend(fees.waiver.spendRequirement, fees.waiver.currency ?? card.annualFee.currency)}
            </dd>
          </div>
        ) : null}
        <div>
          <dt className="font-semibold text-white">Rewards currency</dt>
          <dd>{rewardProgram.currency}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Points expiry</dt>
          <dd>{rewardProgram.expiry ?? "—"}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Earn logic</dt>
          <dd>{rewardProgram.earnLogic ?? "—"}</dd>
        </div>
      </dl>
      {tags?.length ? (
        <div className="mt-6">
          <p className="font-semibold text-white">Focus tags</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-200"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {card.keyHighlights?.length ? (
        <div className="mt-6">
          <p className="font-semibold text-white">Highlights</p>
          <ul className="mt-2 space-y-2">
            {card.keyHighlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </SectionWrapper>
  );
}

type PremiumTravelWelcomeBenefitsSectionProps = {
  card: PremiumTravelCard;
};

function PremiumTravelWelcomeBenefitsSection({ card }: PremiumTravelWelcomeBenefitsSectionProps) {
  const { welcomeBenefits } = card;

  if (!welcomeBenefits.requirements.length) {
    return null;
  }

  return (
    <SectionWrapper title="Welcome & milestone unlocks" description={welcomeBenefits.sourceNote}>
      <div className="space-y-4">
        {welcomeBenefits.requirements.map((requirement, index) => (
          <article
            key={`${requirement.spend}-${requirement.periodDays}-${index}`}
            className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-100/80"
          >
            <div>
              <h3 className="text-base font-semibold text-white">
                Spend {formatSpend(requirement.spend, card.annualFee.currency)} in {requirement.periodDays} days
              </h3>
              {requirement.postingTime ? (
                <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Posting: {requirement.postingTime}</p>
              ) : null}
            </div>
            <ul className="space-y-2">
              {requirement.benefits.map((benefit, benefitIndex) => (
                <li key={`${benefit.type}-${benefitIndex}`} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
                  <span>{describePremiumWelcomePerk(benefit)}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}

type PremiumTravelRewardsSectionProps = {
  rewardProgram: PremiumTravelRewardProgram;
  currency: string;
};

function PremiumTravelRewardsSection({ rewardProgram, currency }: PremiumTravelRewardsSectionProps) {
  return (
    <SectionWrapper title="Rewards earning" description={rewardProgram.sourceNote}>
      <div className="grid gap-4 text-sm text-slate-100/80 md:grid-cols-2">
        <article className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Base earn rate</h3>
          <p className="text-base font-semibold text-white">{rewardProgram.baseRate}</p>
          <p>Rewards currency: {rewardProgram.currency}</p>
        </article>
        {rewardProgram.acceleratedRate ? (
          <article className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Accelerated earn</h3>
              <p className="text-base font-semibold text-white">{rewardProgram.acceleratedRate.rate}</p>
            </div>
            <ul className="space-y-1 text-sm">
              {rewardProgram.acceleratedRate.categories.map((category) => (
                <li key={category} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-amber-300" aria-hidden />
                  <span>{category}</span>
                </li>
              ))}
            </ul>
            {rewardProgram.acceleratedRate.monthlyCap ? (
              <p className="text-xs text-slate-100/70">
                Monthly bonus cap: {formatSpend(rewardProgram.acceleratedRate.monthlyCap, currency)} spend
              </p>
            ) : null}
          </article>
        ) : null}
      </div>
      <div className="mt-4 space-y-2 text-sm text-slate-100/80">
        {rewardProgram.earnLogic ? <p>Points accrue at: {rewardProgram.earnLogic}</p> : null}
        {rewardProgram.expiry ? <p>Points expiry: {rewardProgram.expiry}</p> : null}
      </div>
    </SectionWrapper>
  );
}

type PremiumTravelRewardExclusionsSectionProps = {
  exclusions?: string[];
};

function PremiumTravelRewardExclusionsSection({ exclusions }: PremiumTravelRewardExclusionsSectionProps) {
  if (!exclusions?.length) {
    return null;
  }

  return (
    <SectionWrapper title="Reward exclusions">
      <ul className="grid gap-2 text-sm text-slate-100/80 sm:grid-cols-2">
        {exclusions.map((exclusion) => (
          <li key={exclusion} className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
            <span>{exclusion}</span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

type PremiumTravelMilestoneSectionProps = {
  milestoneBenefits?: PremiumTravelMilestoneBenefits;
  currency: string;
};

function PremiumTravelMilestoneSection({ milestoneBenefits, currency }: PremiumTravelMilestoneSectionProps) {
  if (!milestoneBenefits) {
    return null;
  }

  const { annualSpendBonus, first90DaySpendBonus, additionalMilestones, eligibleSpendNote } = milestoneBenefits;
  const hasTraditionalMilestones = Boolean(annualSpendBonus || first90DaySpendBonus);
  const hasAdditionalMilestones = Boolean(additionalMilestones?.length);

  if (!hasTraditionalMilestones && !hasAdditionalMilestones) {
    return null;
  }

  return (
    <SectionWrapper title="Milestone bonuses" description={eligibleSpendNote}>
      {hasTraditionalMilestones ? (
        <div className="grid gap-4 text-sm text-slate-100/80 md:grid-cols-2">
          {first90DaySpendBonus ? (
            <article className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <h3 className="text-base font-semibold text-white">{first90DaySpendBonus.cycle}</h3>
              <p>
                Spend {formatSpend(first90DaySpendBonus.thresholdInInr, currency)} → {formatNumber(first90DaySpendBonus.rewardPoints)} Reward Points
              </p>
            </article>
          ) : null}
          {annualSpendBonus ? (
            <article className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <h3 className="text-base font-semibold text-white">{annualSpendBonus.cycle}</h3>
              <p>
                Spend {formatSpend(annualSpendBonus.thresholdInInr, currency)} → {formatNumber(annualSpendBonus.rewardPoints)} Reward Points
              </p>
            </article>
          ) : null}
        </div>
      ) : null}
      {hasAdditionalMilestones ? (
        <div className="mt-6 space-y-4">
          {additionalMilestones!.map((milestone, index) => {
            const detailKey = `${milestone.thresholdInInr}-${milestone.rewardPoints ?? "no-points"}-${index}`;
            const splitDetails: string[] = [];

            if (milestone.split?.thresholdPoints) {
              splitDetails.push(
                `${formatNumber(milestone.split.thresholdPoints)} Reward Points post threshold`
              );
            }

            if (milestone.split?.extraPointsViaSupport) {
              splitDetails.push(
                `${formatNumber(milestone.split.extraPointsViaSupport)} Reward Points via support`
              );
            }

            return (
              <article
                key={detailKey}
                className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-100/80"
              >
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-white">
                    Spend {formatSpend(milestone.thresholdInInr, currency)}
                    {milestone.cycle ? ` (${milestone.cycle})` : ""}
                  </h3>
                  {milestone.rewardPoints ? (
                    <p className="font-semibold text-amber-200">
                      Bonus: {formatNumber(milestone.rewardPoints)} Reward Points
                    </p>
                  ) : null}
                  {milestone.description ? <p>{milestone.description}</p> : null}
                </div>
                {splitDetails.length || milestone.split?.redemptionNote ? (
                  <div className="space-y-2 rounded-xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Breakdown</p>
                    <ul className="space-y-1">
                      {splitDetails.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-amber-300" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {milestone.split?.redemptionNote ? (
                      <p className="text-xs text-slate-100/70">{milestone.split.redemptionNote}</p>
                    ) : null}
                  </div>
                ) : null}
                {milestone.redeemableOn?.length ? (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Redeem via</p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {milestone.redeemableOn.map((platform) => (
                        <li key={platform} className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2">
                          {platform}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {milestone.additionalBenefit ? (
                  <div className="space-y-2 rounded-xl border border-amber-300/20 bg-amber-300/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                      Extra benefit
                    </p>
                    <p className="font-semibold text-white">{milestone.additionalBenefit.type.replace(/_/g, " ")}</p>
                    <ul className="space-y-1 text-sm text-slate-100/80">
                      {milestone.additionalBenefit.partner ? (
                        <li>Partner: {milestone.additionalBenefit.partner}</li>
                      ) : null}
                      {typeof milestone.additionalBenefit.valueInInr === "number" ? (
                        <li>Value: {formatSpend(milestone.additionalBenefit.valueInInr, currency)}</li>
                      ) : null}
                      {milestone.additionalBenefit.deliveryTimeline ? (
                        <li>Delivery: {milestone.additionalBenefit.deliveryTimeline}</li>
                      ) : null}
                    </ul>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      ) : null}
    </SectionWrapper>
  );
}

type PremiumTravelVouchersSectionProps = {
  vouchersAndOffers?: PremiumTravelVouchersAndOffers;
  currency: string;
};

function PremiumTravelVouchersSection({ vouchersAndOffers, currency }: PremiumTravelVouchersSectionProps) {
  if (!vouchersAndOffers) {
    return null;
  }

  const { vouchers, otherPrograms } = vouchersAndOffers;

  if (!vouchers?.length && !otherPrograms?.length) {
    return null;
  }

  return (
    <SectionWrapper title="Vouchers & offers">
      <div className="space-y-4">
        {vouchers?.map((voucher) => (
          <article
            key={voucher.name}
            className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-100/80"
          >
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">{voucher.name}</h3>
              {typeof voucher.valueInInr === "number" ? (
                <p className="text-sm text-amber-200">
                  Value: {formatSpend(voucher.valueInInr, currency)}
                </p>
              ) : null}
              {voucher.trigger ? <p>{voucher.trigger}</p> : null}
            </div>
            <ul className="space-y-1 text-xs text-slate-100/70">
              {voucher.validity ? <li>Valid for: {voucher.validity}</li> : null}
              {typeof voucher.validityDays === "number" ? (
                <li>Validity: {voucher.validityDays} days</li>
              ) : null}
              {voucher.oneTimeUse ? <li>One-time use voucher</li> : null}
            </ul>
            {voucher.bookingChannels?.length ? (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Booking channels</p>
                <ul className="grid gap-2 text-sm text-slate-100/80 sm:grid-cols-2">
                  {voucher.bookingChannels.map((channel) => (
                    <li key={channel} className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2">
                      {channel}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {voucher.notes?.length ? (
              <ul className="space-y-1 text-xs text-slate-100/70">
                {voucher.notes.map((note) => (
                  <li key={note} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-amber-300" aria-hidden />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
        {otherPrograms?.length ? (
          <article className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-100/80">
            <h3 className="text-base font-semibold text-white">Other featured programs</h3>
            <ul className="space-y-1">
              {otherPrograms.map((program) => (
                <li key={program} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-amber-300" aria-hidden />
                  <span>{program}</span>
                </li>
              ))}
            </ul>
          </article>
        ) : null}
      </div>
    </SectionWrapper>
  );
}

type PremiumTravelRedemptionSectionProps = {
  redemption: PremiumTravelRedemption;
};

function PremiumTravelRedemptionSection({ redemption }: PremiumTravelRedemptionSectionProps) {
  const hasPartners = Boolean(redemption.partners?.airlines?.length || redemption.partners?.hotels?.length);

  return (
    <SectionWrapper title="Redeeming points">
      <div className="space-y-4 text-sm text-slate-100/80">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-white">Redemption type</dt>
            <dd>{redemption.type}</dd>
          </div>
          {redemption.rate ? (
            <div>
              <dt className="font-semibold text-white">Transfer rate</dt>
              <dd>{redemption.rate}</dd>
            </div>
          ) : null}
          {redemption.platform ? (
            <div>
              <dt className="font-semibold text-white">Platform</dt>
              <dd>{redemption.platform}</dd>
            </div>
          ) : null}
          <div>
            <dt className="font-semibold text-white">Instant transfers</dt>
            <dd>{redemption.instantRedemption ? "Yes" : "No"}</dd>
          </div>
        </dl>
        {hasPartners ? (
          <div className="grid gap-4 text-sm text-slate-100/80 sm:grid-cols-2">
            {redemption.partners?.airlines?.length ? (
              <article className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Airline partners</h3>
                <ul className="space-y-1">
                  {redemption.partners.airlines.map((partner) => (
                    <li key={partner} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-amber-300" aria-hidden />
                      <span>{partner}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}
            {redemption.partners?.hotels?.length ? (
              <article className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Hotel partners</h3>
                <ul className="space-y-1">
                  {redemption.partners.hotels.map((partner) => (
                    <li key={partner} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-amber-300" aria-hidden />
                      <span>{partner}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}
          </div>
        ) : null}
        {redemption.notes?.length ? (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Notes</p>
            <ul className="space-y-1 text-xs text-slate-100/70">
              {redemption.notes.map((note) => (
                <li key={note} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-amber-300" aria-hidden />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </SectionWrapper>
  );
}

type PremiumTravelTravelBenefitsSectionProps = {
  travelBenefits?: PremiumTravelTravelBenefits;
};

function PremiumTravelTravelBenefitsSection({ travelBenefits }: PremiumTravelTravelBenefitsSectionProps) {
  if (!travelBenefits) {
    return null;
  }

  const { airportLoungeAccess, golf, holidayBenefits, dutyFreeDiscount } = travelBenefits;

  if (!airportLoungeAccess && !golf && !holidayBenefits?.length && !dutyFreeDiscount) {
    return null;
  }

  const domesticLoungeDetails =
    typeof airportLoungeAccess?.domestic === "number"
      ? { complimentaryVisitsPerYear: airportLoungeAccess.domestic }
      : airportLoungeAccess?.domestic;
  const internationalVisits =
    typeof airportLoungeAccess?.international === "number"
      ? airportLoungeAccess.international
      : undefined;
  const priorityPassAccess = airportLoungeAccess?.priorityPass;

  return (
    <SectionWrapper title="Travel & lifestyle perks">
      <div className="grid gap-4 text-sm text-slate-100/80 md:grid-cols-2">
        {airportLoungeAccess ? (
          <article className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <h3 className="text-base font-semibold text-white">Airport lounges</h3>
            {domesticLoungeDetails ? (
              <div className="space-y-1">
                <p>{domesticLoungeDetails.complimentaryVisitsPerYear} domestic visits per year</p>
                {domesticLoungeDetails.quarterlyCap ? (
                  <p className="text-xs text-slate-100/70">
                    Max {domesticLoungeDetails.quarterlyCap} visits per quarter
                  </p>
                ) : null}
                {domesticLoungeDetails.notes?.length ? (
                  <ul className="space-y-1 text-xs text-slate-100/70">
                    {domesticLoungeDetails.notes.map((note) => (
                      <li key={note} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-amber-300" aria-hidden />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
            {typeof internationalVisits === "number" ? (
              <p>{internationalVisits} international visits</p>
            ) : null}
            {airportLoungeAccess.note ? (
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300">{airportLoungeAccess.note}</p>
            ) : null}
          </article>
        ) : null}
        {priorityPassAccess ? (
          <article className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <h3 className="text-base font-semibold text-white">Priority Pass access</h3>
            {priorityPassAccess.membershipFee ? <p>{priorityPassAccess.membershipFee}</p> : null}
            {priorityPassAccess.visitCharges ? (
              <p className="text-xs text-slate-100/70">{priorityPassAccess.visitCharges}</p>
            ) : null}
            {priorityPassAccess.notes?.length ? (
              <ul className="space-y-1 text-xs text-slate-100/70">
                {priorityPassAccess.notes.map((note) => (
                  <li key={note} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-amber-300" aria-hidden />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ) : null}
        {golf ? (
          <article className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <h3 className="text-base font-semibold text-white">Golf program</h3>
            {typeof golf.freeRounds === "number" ? <p>{golf.freeRounds} complimentary rounds</p> : null}
            {typeof golf.freeLessons === "number" ? <p>{golf.freeLessons} coaching sessions</p> : null}
            {golf.limit ? <p className="text-xs text-slate-100/70">Limit: {golf.limit}</p> : null}
            {golf.discount ? <p className="text-xs text-slate-100/70">{golf.discount}</p> : null}
          </article>
        ) : null}
      </div>
      {holidayBenefits?.length ? (
        <div className="mt-4 space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Holiday offers</h3>
          <ul className="grid gap-2 text-sm text-slate-100/80 sm:grid-cols-2">
            {holidayBenefits.map((benefit) => (
              <li key={`${benefit.partner}-${benefit.benefit}`} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
                <span>
                  {benefit.partner}: {benefit.benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {dutyFreeDiscount ? (
        <p className="mt-4 text-sm text-slate-100/80">Duty-free shopping: {dutyFreeDiscount}</p>
      ) : null}
    </SectionWrapper>
  );
}

type PremiumTravelOtherPrivilegesSectionProps = {
  otherPrivileges?: PremiumTravelOtherPrivileges;
};

function PremiumTravelOtherPrivilegesSection({ otherPrivileges }: PremiumTravelOtherPrivilegesSectionProps) {
  if (!otherPrivileges) {
    return null;
  }

  const { purchaseProtection, movieDiningBenefits, exclusivePrivileges, securityServices } = otherPrivileges;

  if (!purchaseProtection && !movieDiningBenefits && !exclusivePrivileges?.length && !securityServices?.length) {
    return null;
  }

  return (
    <SectionWrapper title="Additional privileges">
      <ul className="space-y-2 text-sm text-slate-100/80">
        {purchaseProtection ? (
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
            <span>Purchase protection: {purchaseProtection}</span>
          </li>
        ) : null}
        {movieDiningBenefits ? (
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
            <span>{movieDiningBenefits}</span>
          </li>
        ) : null}
        {exclusivePrivileges?.length ? (
          <li>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
              <span className="font-semibold text-white">Exclusive experiences</span>
            </div>
            <ul className="mt-2 space-y-1 pl-5 text-sm text-slate-100/80">
              {exclusivePrivileges.map((privilege) => (
                <li key={privilege} className="list-disc">
                  {privilege}
                </li>
              ))}
            </ul>
          </li>
        ) : null}
        {securityServices?.length ? (
          <li>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
              <span className="font-semibold text-white">Security & services</span>
            </div>
            <ul className="mt-2 space-y-1 pl-5 text-sm text-slate-100/80">
              {securityServices.map((service) => (
                <li key={service} className="list-disc">
                  {service}
                </li>
              ))}
            </ul>
          </li>
        ) : null}
      </ul>
    </SectionWrapper>
  );
}

type PremiumTravelEligibilitySectionProps = {
  eligibility?: PremiumTravelEligibility;
};

function PremiumTravelEligibilitySection({ eligibility }: PremiumTravelEligibilitySectionProps) {
  if (!eligibility) {
    return null;
  }

  const { age, minIncome, residency, citiesServed } = eligibility;

  return (
    <SectionWrapper title="Eligibility">
      <dl className="grid gap-4 text-sm text-slate-100/80 sm:grid-cols-2">
        {age ? (
          <div>
            <dt className="font-semibold text-white">Age</dt>
            <dd>{age}</dd>
          </div>
        ) : null}
        {minIncome ? (
          <div>
            <dt className="font-semibold text-white">Minimum income</dt>
            <dd>{minIncome}</dd>
          </div>
        ) : null}
        {residency ? (
          <div>
            <dt className="font-semibold text-white">Residency</dt>
            <dd>{residency}</dd>
          </div>
        ) : null}
      </dl>
      {citiesServed?.length ? (
        <div className="mt-4 space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Cities serviced</h3>
          <ul className="grid gap-2 text-sm text-slate-100/80 sm:grid-cols-2">
            {citiesServed.map((city) => (
              <li key={city} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
                <span>{city}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </SectionWrapper>
  );
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const cards = await getCards();

  return cards.map((card) => ({ slug: card.slug }));
}

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

  const welcomeOfferSummary = createWelcomeOfferSummary(card);
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

        {card.layout === "tieredMiles" ? (
          <TieredMilesCardSections card={card} />
        ) : card.layout === "lifestyle" ? (
          <LifestyleCardSections card={card} />
        ) : (
          <PremiumTravelCardSections card={card} />
        )}

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
