'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

import type {
  AnnualFee,
  Card,
  CreditCardDataset,
  LifestyleCard,
  PremiumTravelCard,
  TieredMilesCard,
} from "@/app/travel-with-points/(credit-cards)/credit-cards/types";
import {
  cx,
  travelContentShell,
  travelGradientBackground,
} from "@/app/travel-with-points/_shared/styles";
import { filterEnabled, filterEnabledDeep } from "@/lib/filterEnabled";


const loadingPage = (
  <main className={travelGradientBackground}>
    <div className={cx(travelContentShell, "gap-6")}>
      <p className="text-sm text-slate-200/70">Loading card details…</p>
    </div>
  </main>
);

type LoadState =
  | { status: "loading" }
  | { status: "ready"; card: Card }
  | { status: "missing" };

type CardPageClientProps = {
  slug: string;
};

async function loadCardBySlug(slug: string): Promise<Card | null> {
  const dataset = (await import("@/data/credit-cards.json")).default as CreditCardDataset;
  const normalizedCards = filterEnabled(dataset.cards).map((card) =>
    filterEnabledDeep(card)
  ) as Card[];

  return normalizedCards.find((card) => card.slug === slug) ?? null;
}

function formatAnnualFee(annualFee: AnnualFee) {
  const locale = annualFee.currency === "INR" ? "en-IN" : "en-US";
  const hasFraction = !Number.isInteger(annualFee.amount);
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: annualFee.currency,
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
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
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatLabel(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .replace(/\bId\b/, "ID");
}

type SectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

function Section({ title, description, children }: SectionProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {description ? <p className="text-sm text-slate-100/80">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

type KeyValueGridProps = {
  items: { label: string; value: ReactNode }[];
  columns?: 1 | 2;
};

function KeyValueGrid({ items, columns = 2 }: KeyValueGridProps) {
  return (
    <dl className={`grid gap-4 text-sm text-slate-100/80 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className="font-semibold text-white">{item.label}</dt>
          <dd className="mt-1">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

type BulletListProps = {
  items: ReactNode[];
};

function BulletList({ items }: BulletListProps) {
  if (!items.length) {
    return null;
  }

  return (
    <ul className="space-y-2 text-sm leading-6 text-slate-100/80">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber-300" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type TagListProps = {
  tags?: string[] | null;
};

function TagList({ tags }: TagListProps) {
  if (!tags?.length) {
    return null;
  }

  return (
    <ul className="mt-2 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function TieredMilesSections({ card }: { card: TieredMilesCard }) {
  const earnRateItems = Object.entries(card.rewards.earnRate).map(([key, value]) => {
    if (typeof value === "string") {
      return { label: formatLabel(key), value };
    }

    const details = [value.rate];
    if (value.eligible) {
      details.push(`Eligible: ${value.eligible}`);
    }
    if (value.cap) {
      details.push(`Cap: ${value.cap}`);
    }

    return { label: formatLabel(key), value: details.join(" · ") };
  });

  const tierLevels = card.tiers.levels.map((level) => `${level.name}: ${level.upgradeSpend ? `₹${formatNumber(level.upgradeSpend)}` : "Entry"}`);

  const tierBenefits: ReactNode[] = [];
  if (card.tierBenefits.annualMilesOnFeePayment) {
    tierBenefits.push(
      `Renewal bonus: ${Object.entries(card.tierBenefits.annualMilesOnFeePayment)
        .map(([tier, miles]) => `${tier} ${miles} miles`)
        .join(" · ")}`
    );
  }
  if (card.tierBenefits.milestoneBenefits?.length) {
    tierBenefits.push(
      `Milestones: ${card.tierBenefits.milestoneBenefits
        .map((milestone) => `${formatNumber(milestone.spend)} spend → ${formatNumber(milestone.miles)} miles`)
        .join("; ")}`
    );
  }

  const loungeDetails: ReactNode[] = [];
  if (card.loungeAccess.domestic) {
    loungeDetails.push(
      `Domestic visits: ${Object.entries(card.loungeAccess.domestic)
        .map(([tier, visits]) => `${tier} ${visits}`)
        .join(" · ")}`
    );
  }
  if (card.loungeAccess.international) {
    loungeDetails.push(
      `International visits: ${Object.entries(card.loungeAccess.international)
        .map(([tier, visits]) => `${tier} ${visits}`)
        .join(" · ")}`
    );
  }
  if (card.loungeAccess.notes) {
    loungeDetails.push(card.loungeAccess.notes);
  }

  const redemptionDetails: ReactNode[] = [];
  if (card.milesRedemption.options?.length) {
    redemptionDetails.push(`Redeem for: ${card.milesRedemption.options.join(", ")}`);
  }
  if (card.milesRedemption.transferPartnersValue) {
    redemptionDetails.push(card.milesRedemption.transferPartnersValue);
  }
  if (card.milesRedemption.annualTransferLimit) {
    redemptionDetails.push(`Annual transfer limit: ${formatNumber(card.milesRedemption.annualTransferLimit)} miles`);
  }
  if (card.milesRedemption.groupLimits) {
    redemptionDetails.push(
      `Group limits: ${Object.entries(card.milesRedemption.groupLimits)
        .map(([group, limit]) => `${group} ${formatNumber(limit)}`)
        .join(" · ")}`
    );
  }

  const infoPoints: ReactNode[] = [];
  if (card.additionalInfo.milesNotEncashable) {
    infoPoints.push(`${card.rewards.currency} cannot be encashed; redeem via partners or travel.`);
  }
  if (card.additionalInfo.anniversaryYearBasis) {
    infoPoints.push("Tier evaluation follows the anniversary year.");
  }
  if (card.additionalInfo.tierSpendExclusions) {
    infoPoints.push(`Tier spend exclusions: ${card.additionalInfo.tierSpendExclusions}.`);
  }
  if (card.additionalInfo.accessMethod) {
    infoPoints.push(`Lounge access method: ${card.additionalInfo.accessMethod}.`);
  }

  return (
    <div className="space-y-8">
      <Section title="Card snapshot">
        <KeyValueGrid
          items={[
            { label: "Issuer", value: card.issuer },
            { label: "Network", value: card.network },
            { label: "Card type", value: card.type },
            { label: "Annual fee", value: formatAnnualFee(card.annualFee) },
            { label: "Rewards currency", value: card.rewards.currency },
            card.rewards.conversion
              ? { label: "Conversion", value: card.rewards.conversion }
              : null,
          ].filter(Boolean) as { label: string; value: ReactNode }[]}
        />
        <TagList tags={card.websiteDisplayTags} />
      </Section>

      <Section title="Welcome benefits" description={card.welcomeBenefit.milesPostingTime}>
        <BulletList
          items={card.welcomeBenefit.details.map((detail) => (
            <span key={`${detail.condition}-${detail.miles}`}>
              {formatNumber(detail.miles)} miles — {detail.condition}
            </span>
          ))}
        />
        {card.welcomeBenefit.onlyForPaidCards ? (
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-amber-300">
            Available only on paid cards
          </p>
        ) : null}
      </Section>

      <Section title="Rewards earning" description={card.rewards.milesPostingTime}>
        <KeyValueGrid items={earnRateItems} />
        <div className="mt-4 text-xs uppercase tracking-[0.3em] text-amber-300">
          Exclusions: {card.rewards.exclusions.join(" · ")}
        </div>
      </Section>

      <Section title="Tier progression" description={card.tiers.downgradeRule}>
        <BulletList items={tierLevels} />
        {tierBenefits.length ? (
          <div className="mt-4 space-y-2 text-sm text-slate-100/80">
            {tierBenefits.map((benefit, index) => (
              <p key={index}>{benefit}</p>
            ))}
          </div>
        ) : null}
      </Section>

      <Section title="Lounge access">
        <BulletList items={loungeDetails} />
      </Section>

      <Section title="Redeeming miles">
        <BulletList items={redemptionDetails} />
      </Section>

      {infoPoints.length ? (
        <Section title="Additional information">
          <BulletList items={infoPoints} />
        </Section>
      ) : null}
    </div>
  );
}

function LifestyleSections({ card }: { card: LifestyleCard }) {
  const snapshotItems: { label: string; value: ReactNode }[] = [
    { label: "Issuer", value: card.issuer },
    { label: "Network", value: card.network },
    { label: "Card type", value: card.type },
    { label: "Joining fee", value: formatSpend(card.fees.joiningFee, card.annualFee.currency) },
    { label: "Renewal fee", value: formatSpend(card.fees.renewalFee, card.annualFee.currency) },
  ];

  if (card.foreignExchangeMarkup) {
    snapshotItems.push({ label: "FX markup", value: card.foreignExchangeMarkup });
  }

  const rewardMeta: string[] = [card.rewards.rewardPosting];
  if (card.rewards.rewardValidity) {
    rewardMeta.push(`Valid for ${card.rewards.rewardValidity}`);
  }
  if (card.rewards.monthlyRpCap) {
    rewardMeta.push(`Monthly cap: ${formatNumber(card.rewards.monthlyRpCap)} RP`);
  }

  const lifestyleSupport: ReactNode[] = [];
  if (card.concierge?.phone) {
    lifestyleSupport.push(`Concierge: ${card.concierge.phone}`);
  }
  if (card.concierge?.email) {
    lifestyleSupport.push(`Concierge email: ${card.concierge.email}`);
  }
  if (card.insurance?.lostCardLiability) {
    lifestyleSupport.push(`Lost card liability: ${card.insurance.lostCardLiability}`);
  }

  const eligibilityDetails = card.eligibility
    ? Object.entries(card.eligibility).map(([profile, details]) => (
        <div key={profile} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <p className="text-sm font-semibold text-white">{profile}</p>
          <p className="mt-1 text-sm text-slate-100/80">Age: {details.age}</p>
          {details.incomeMin ? (
            <p className="text-sm text-slate-100/80">Income: {details.incomeMin}</p>
          ) : null}
          {details.itrMin ? (
            <p className="text-sm text-slate-100/80">ITR: {details.itrMin}</p>
          ) : null}
        </div>
      ))
    : null;

  return (
    <div className="space-y-8">
      <Section title="Card snapshot" description={card.fees.welcomeBenefitCondition}>
        <KeyValueGrid items={snapshotItems} />
        <TagList tags={card.travelBenefitsTags} />
        <TagList tags={card.rewardTags} />
      </Section>

      <Section title="Welcome benefits">
        <BulletList
          items={[
            card.welcomeBenefits.membershipUnlock
              ? `Unlock memberships after ${card.welcomeBenefits.membershipUnlock.spendRequirement}`
              : null,
            card.welcomeBenefits.joiningVoucher
              ? `Joining vouchers worth ₹${formatNumber(card.welcomeBenefits.joiningVoucher.valueInInr)} once you ${card.welcomeBenefits.joiningVoucher.condition}`
              : null,
          ].filter(Boolean) as ReactNode[]}
        />
      </Section>

      <Section title="Rewards earning" description={rewardMeta.join(" · ")}>
        <div className="space-y-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Base earn rate</h3>
            <p className="mt-1 text-sm text-slate-100/80">{card.rewards.baseRate}</p>
          </div>
          {card.rewards.acceleratedRewards ? (
            <div className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-sm font-semibold text-white">Accelerated earn</p>
              <p className="text-sm text-slate-100/80">{card.rewards.acceleratedRewards.rate}</p>
              <div className="text-xs uppercase tracking-[0.3em] text-amber-300">
                {card.rewards.acceleratedRewards.monthlyCapRp
                  ? `Monthly cap: ${formatNumber(card.rewards.acceleratedRewards.monthlyCapRp)} RP`
                  : null}
              </div>
              <div className="mt-2 grid gap-2 text-sm text-slate-100/80 sm:grid-cols-2">
                {card.rewards.acceleratedRewards.merchants.map((merchant) => (
                  <span
                    key={merchant}
                    className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2"
                  >
                    {merchant}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          <div className="text-xs uppercase tracking-[0.3em] text-amber-300">
            Exclusions: {card.rewards.rewardExclusions.join(" · ")}
          </div>
        </div>
      </Section>

      <Section title="Redemption value" description={card.redemption.travelRedemptionLimit}>
        <div className="grid gap-4 text-sm text-slate-100/80 sm:grid-cols-2">
          {Object.entries(card.redemption.smartBuyPortalValue).map(([key, value]) => (
            <div key={key} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">{formatLabel(key)}</p>
              <p className="mt-2 text-base font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
        {card.redemption.airmilesConversion ? (
          <p className="mt-4 text-sm text-slate-100/80">{card.redemption.airmilesConversion.conversionRate}</p>
        ) : null}
      </Section>

      {card.milestoneBenefits ? (
        <Section title="Milestone benefits" description={card.milestoneBenefits.voucherUnlockTime}>
          <BulletList
            items={[
              card.milestoneBenefits.quarterly
                ? `Quarterly spend ${formatSpend(card.milestoneBenefits.quarterly.spendRequirement, card.annualFee.currency)} for ${formatSpend(card.milestoneBenefits.quarterly.voucherValue, card.annualFee.currency)} vouchers`
                : null,
              ...(card.milestoneBenefits.annual?.map(
                (benefit) =>
                  `${formatSpend(benefit.threshold, card.annualFee.currency)} annual spend → ${benefit.benefit}`
              ) ?? []),
            ].filter(Boolean) as ReactNode[]}
          />
        </Section>
      ) : null}

      <Section title="Lounge access">
        <BulletList
          items={[
            card.loungeAccess.india
              ? `${card.loungeAccess.india.quota} domestic visits (${card.loungeAccess.india.terminals})`
              : null,
            card.loungeAccess.internationalPriorityPass
              ? `${card.loungeAccess.internationalPriorityPass.quota} international visits`
              : null,
          ].filter(Boolean) as ReactNode[]}
        />
      </Section>

      {lifestyleSupport.length ? (
        <Section title="Support & insurance">
          <BulletList items={lifestyleSupport} />
        </Section>
      ) : null}

      {eligibilityDetails?.length ? (
        <Section title="Eligibility">
          <div className="grid gap-3 sm:grid-cols-2">{eligibilityDetails}</div>
        </Section>
      ) : null}

      {card.specialPrograms?.dining ? (
        <Section title="Special programs">
          <BulletList
            items={[
              `${card.specialPrograms.dining.program}: ${card.specialPrograms.dining.benefit}`,
              card.specialPrograms.dining.platform
                ? `Platform: ${card.specialPrograms.dining.platform}`
                : null,
            ].filter(Boolean) as ReactNode[]}
          />
        </Section>
      ) : null}
    </div>
  );
}

function PremiumTravelSections({ card }: { card: PremiumTravelCard }) {
  const snapshotItems: { label: string; value: ReactNode }[] = [
    { label: "Issuer", value: card.issuer },
    { label: "Network", value: card.network },
    { label: "Card type", value: card.type },
    { label: "Joining fee", value: formatSpend(card.fees.joiningFee, card.annualFee.currency) },
    { label: "Annual fee", value: formatSpend(card.fees.annualFee, card.annualFee.currency) },
  ];
  if (card.fees.waiver) {
    snapshotItems.push({
      label: "Renewal waiver",
      value: `${formatSpend(card.fees.waiver.spendRequirement, card.fees.waiver.currency)} spend${card.fees.waiver.note ? ` — ${card.fees.waiver.note}` : ""}`,
    });
  }

  const welcomeDetails = card.welcomeBenefits.requirements.map((requirement) => (
    <span key={`${requirement.spend}-${requirement.periodDays}`}>
      Spend {formatSpend(requirement.spend, card.annualFee.currency)} in {requirement.periodDays} days
      {requirement.benefits.length ? ` → ${requirement.benefits.map((benefit) => benefit.type).join(" + ")}` : ""}
    </span>
  ));

  const rewardExtras: ReactNode[] = [];
  if (card.rewardProgram.acceleratedRate) {
    rewardExtras.push(
      `Accelerated earn: ${card.rewardProgram.acceleratedRate.rate} (${card.rewardProgram.acceleratedRate.categories.join(", ")})`
    );
    if (card.rewardProgram.acceleratedRate.monthlyCap) {
      rewardExtras.push(
        `Monthly bonus cap: ${formatSpend(card.rewardProgram.acceleratedRate.monthlyCap, card.annualFee.currency)} spend`
      );
    }
  }
  if (card.rewardProgram.earnLogic) {
    rewardExtras.push(`Accrual: ${card.rewardProgram.earnLogic}`);
  }
  if (card.rewardProgram.expiry) {
    rewardExtras.push(`Points expire: ${card.rewardProgram.expiry}`);
  }

  const milestoneDetails: ReactNode[] = [];
  if (card.milestoneBenefits?.annualSpendBonus) {
    const bonus = card.milestoneBenefits.annualSpendBonus;
    milestoneDetails.push(
      `Annual spend ${formatSpend(bonus.thresholdInInr, card.annualFee.currency)} → ${formatNumber(bonus.rewardPoints)} points (${bonus.cycle})`
    );
  }
  if (card.milestoneBenefits?.first90DaySpendBonus) {
    const bonus = card.milestoneBenefits.first90DaySpendBonus;
    milestoneDetails.push(
      `First 90 days: spend ${formatSpend(bonus.thresholdInInr, card.annualFee.currency)} for ${formatNumber(bonus.rewardPoints)} points`
    );
  }
  if (card.milestoneBenefits?.additionalMilestones?.length) {
    card.milestoneBenefits.additionalMilestones.forEach((milestone) => {
      milestoneDetails.push(
        `${formatSpend(milestone.thresholdInInr, card.annualFee.currency)} spend → ${milestone.description ?? `${formatNumber(milestone.rewardPoints ?? 0)} points`}`
      );
    });
  }
  if (card.milestoneBenefits?.eligibleSpendNote) {
    milestoneDetails.push(card.milestoneBenefits.eligibleSpendNote);
  }

  const redemptionItems: ReactNode[] = [
    `${card.redemption.type}${card.redemption.rate ? ` — ${card.redemption.rate}` : ""}`,
  ];
  if (card.redemption.platform) {
    redemptionItems.push(`Redeem via ${card.redemption.platform}`);
  }
  redemptionItems.push(`Instant redemption: ${card.redemption.instantRedemption ? "Yes" : "No"}`);
  if (card.redemption.partners?.airlines?.length) {
    redemptionItems.push(`Airline partners: ${card.redemption.partners.airlines.join(", ")}`);
  }
  if (card.redemption.partners?.hotels?.length) {
    redemptionItems.push(`Hotel partners: ${card.redemption.partners.hotels.join(", ")}`);
  }
  if (card.redemption.notes?.length) {
    redemptionItems.push(...card.redemption.notes);
  }

  const travelBenefits: ReactNode[] = [];
  if (card.travelBenefits?.airportLoungeAccess) {
    const lounge = card.travelBenefits.airportLoungeAccess;
    if (typeof lounge.domestic === "number") {
      travelBenefits.push(`Domestic lounge visits: ${lounge.domestic}`);
    } else if (lounge.domestic) {
      travelBenefits.push(
        `Domestic lounges: ${lounge.domestic.complimentaryVisitsPerYear} complimentary visits${lounge.domestic.quarterlyCap ? ` (quarterly cap ${lounge.domestic.quarterlyCap})` : ""}`
      );
      if (lounge.domestic.notes?.length) {
        travelBenefits.push(...lounge.domestic.notes);
      }
    }
    if (lounge.international) {
      travelBenefits.push(`International lounge visits: ${lounge.international}`);
    }
    if (lounge.priorityPass?.membershipFee) {
      travelBenefits.push(`Priority Pass: ${lounge.priorityPass.membershipFee}`);
    }
    if (lounge.priorityPass?.visitCharges) {
      travelBenefits.push(`Priority Pass visit charges: ${lounge.priorityPass.visitCharges}`);
    }
    if (lounge.note) {
      travelBenefits.push(lounge.note);
    }
  }
  if (card.travelBenefits?.golf) {
    const golf = card.travelBenefits.golf;
    if (golf.freeRounds) {
      travelBenefits.push(`Golf: ${golf.freeRounds} complimentary rounds`);
    }
    if (golf.freeLessons) {
      travelBenefits.push(`Golf lessons: ${golf.freeLessons}`);
    }
    if (golf.limit) {
      travelBenefits.push(golf.limit);
    }
    if (golf.discount) {
      travelBenefits.push(golf.discount);
    }
  }
  if (card.travelBenefits?.holidayBenefits?.length) {
    travelBenefits.push(
      `Holiday benefits: ${card.travelBenefits.holidayBenefits
        .map((benefit) => `${benefit.partner} ${benefit.benefit}`)
        .join("; ")}`
    );
  }
  if (card.travelBenefits?.dutyFreeDiscount) {
    travelBenefits.push(card.travelBenefits.dutyFreeDiscount);
  }

  const otherPrivileges: ReactNode[] = [];
  if (card.otherPrivileges?.purchaseProtection) {
    otherPrivileges.push(card.otherPrivileges.purchaseProtection);
  }
  if (card.otherPrivileges?.movieDiningBenefits) {
    otherPrivileges.push(card.otherPrivileges.movieDiningBenefits);
  }
  if (card.otherPrivileges?.exclusivePrivileges?.length) {
    otherPrivileges.push(
      `Exclusive: ${card.otherPrivileges.exclusivePrivileges.join("; ")}`
    );
  }
  if (card.otherPrivileges?.securityServices?.length) {
    otherPrivileges.push(`Security services: ${card.otherPrivileges.securityServices.join(", ")}`);
  }

  const eligibilityItems: ReactNode[] = [];
  if (card.eligibility?.age) {
    eligibilityItems.push(`Age: ${card.eligibility.age}`);
  }
  if (card.eligibility?.minIncome) {
    eligibilityItems.push(`Min income: ${card.eligibility.minIncome}`);
  }
  if (card.eligibility?.residency) {
    eligibilityItems.push(`Residency: ${card.eligibility.residency}`);
  }
  if (card.eligibility?.citiesServed?.length) {
    eligibilityItems.push(`Cities: ${card.eligibility.citiesServed.join(", ")}`);
  }

  const voucherItems: ReactNode[] = [];
  if (card.vouchersAndOffers?.vouchers?.length) {
    card.vouchersAndOffers.vouchers.forEach((voucher) => {
      voucherItems.push(
        `${voucher.name}${voucher.valueInInr ? ` — ${formatSpend(voucher.valueInInr, card.annualFee.currency)}` : ""}${voucher.trigger ? ` (${voucher.trigger})` : ""}`
      );
      if (voucher.notes?.length) {
        voucherItems.push(...voucher.notes);
      }
    });
  }
  if (card.vouchersAndOffers?.otherPrograms?.length) {
    voucherItems.push(`Other programs: ${card.vouchersAndOffers.otherPrograms.join(", ")}`);
  }

  return (
    <div className="space-y-8">
      <Section title="Card snapshot">
        <KeyValueGrid items={snapshotItems} />
        <TagList tags={card.tags ?? card.websiteDisplayTags} />
      </Section>

      <Section title="Welcome & milestone unlocks" description={card.welcomeBenefits.sourceNote}>
        <BulletList items={welcomeDetails} />
      </Section>

      <Section title="Rewards earning" description={card.rewardProgram.sourceNote}>
        <div className="space-y-3 text-sm text-slate-100/80">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Base earn rate</p>
            <p className="mt-1 text-base font-semibold text-white">{card.rewardProgram.baseRate}</p>
            <p className="text-sm text-slate-100/80">Currency: {card.rewardProgram.currency}</p>
          </div>
          <BulletList items={rewardExtras} />
        </div>
        {card.rewardExclusions?.length ? (
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-amber-300">
            Exclusions: {card.rewardExclusions.join(" · ")}
          </p>
        ) : null}
      </Section>

      {milestoneDetails.length ? (
        <Section title="Milestone benefits">
          <BulletList items={milestoneDetails} />
        </Section>
      ) : null}

      <Section title="Redeeming points">
        <BulletList items={redemptionItems} />
      </Section>

      {travelBenefits.length ? (
        <Section title="Travel privileges">
          <BulletList items={travelBenefits} />
        </Section>
      ) : null}

      {otherPrivileges.length ? (
        <Section title="Additional privileges">
          <BulletList items={otherPrivileges} />
        </Section>
      ) : null}

      {eligibilityItems.length ? (
        <Section title="Eligibility">
          <BulletList items={eligibilityItems} />
        </Section>
      ) : null}

      {voucherItems.length ? (
        <Section title="Vouchers & offers">
          <BulletList items={voucherItems} />
        </Section>
      ) : null}
    </div>
  );
}

function CardContent({ card }: { card: Card }) {
  if (card.layout === "tieredMiles") {
    return <TieredMilesSections card={card} />;
  }

  if (card.layout === "lifestyle") {
    return <LifestyleSections card={card} />;
  }

  return <PremiumTravelSections card={card} />;
}

export function CardPageClient({ slug }: CardPageClientProps) {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    loadCardBySlug(slug)
      .then((card) => {
        if (cancelled) {
          return;
        }

        if (card) {
          setState({ status: "ready", card });
        } else {
          setState({ status: "missing" });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ status: "missing" });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (state.status === "loading") {
    return loadingPage;
  }

  if (state.status === "missing") {
    return (
      <main className={travelGradientBackground}>
        <div
          className={cx(
            "mx-auto flex max-w-3xl flex-col",
            "gap-6 px-6 py-20 lg:py-28"
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">Credit card guide</p>
          <h1 className="text-3xl font-semibold text-white">Card not found</h1>
          <p className="text-sm text-slate-200/80">
            The guide you are looking for is unavailable. Please head back to the credit cards hub to explore other
            strategies.
          </p>
          <Link href="/travel-with-points/credit-cards" className="inline-flex items-center text-sm font-semibold text-amber-300">
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
        </div>
      </main>
    );
  }

  const { card } = state;

  return (
    <main className={travelGradientBackground}>
      <div className={cx(travelContentShell, "gap-12")}>
        <nav className="text-xs uppercase tracking-[0.3em] text-slate-200/70">
          <Link href="/travel-with-points" className="hover:text-amber-300">
            Travel with Points
          </Link>
          <span className="mx-2 text-slate-500">/</span>
          <Link href="/travel-with-points/credit-cards" className="hover:text-amber-300">
            Credit cards
          </Link>
          <span className="mx-2 text-slate-500">/</span>
          <span className="text-amber-200">{card.name}</span>
        </nav>

        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">Credit card guide</p>
          <h1 className="text-4xl font-semibold text-white">{card.name}</h1>
          <p className="text-base text-slate-200/80">{card.summary}</p>
        </header>

        {card.media?.cardImage ? (
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <figure className="space-y-3">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
                <Image
                  src={card.media.cardImage.src}
                  alt={card.media.cardImage.alt}
                  width={640}
                  height={400}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              {card.media.cardImage.caption ? (
                <figcaption className="text-xs uppercase tracking-[0.2em] text-slate-200/70">
                  {card.media.cardImage.caption}
                </figcaption>
              ) : null}
            </figure>
          </section>
        ) : null}

        <CardContent card={card} />

        {card.keyHighlights?.length ? (
          <section className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h2 className="text-lg font-semibold text-white">Highlights</h2>
            <BulletList items={card.keyHighlights} />
          </section>
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
