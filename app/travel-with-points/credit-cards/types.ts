export type SectionImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type AnnualFee = {
  amount: number;
  currency: string;
  gstApplicable?: boolean;
};

export type TieredWelcomeBenefitDetail = {
  validFrom?: string;
  validTo?: string;
  miles: number;
  condition: string;
};

export type TieredWelcomeBenefit = {
  details: TieredWelcomeBenefitDetail[];
  milesPostingTime: string;
  onlyForPaidCards?: boolean;
};

export type TieredEarnRateValue =
  | string
  | {
      rate: string;
      eligible?: string;
      cap?: string;
    };

export type TieredRewards = {
  currency: string;
  conversion?: string;
  earnRate: Record<string, TieredEarnRateValue>;
  exclusions: string[];
  milesPostingTime: string;
};

export type TierLevel = {
  name: string;
  upgradeSpend: number | null;
};

export type TieredTiers = {
  levels: TierLevel[];
  downgradeRule?: string;
};

export type TieredTierBenefits = {
  annualMilesOnFeePayment: Record<string, number>;
  milestoneBenefits: { spend: number; miles: number }[];
};

export type TieredLoungeAccess = {
  domestic: Record<string, number>;
  international: Record<string, number>;
  guestAccessIncluded?: boolean;
  notes?: string;
};

export type TieredMilesRedemption = {
  options: string[];
  transferPartnersValue?: string;
  annualTransferLimit?: number;
  groupLimits?: Record<string, number>;
};

export type TieredAdditionalInfo = {
  milesNotEncashable?: boolean;
  anniversaryYearBasis?: boolean;
  tierSpendExclusions?: string;
  accessMethod?: string;
};

export type CardMedia = {
  cardImage?: SectionImage;
};

export type BaseCard = {
  slug: string;
  layout: "tieredMiles" | "lifestyle" | "premiumTravel";
  name: string;
  issuer: string;
  network: string;
  type: string;
  summary: string;
  seoDescription: string;
  annualFee: AnnualFee;
  websiteDisplayTags?: string[];
  keyHighlights?: string[];
  media?: CardMedia;
  enabled?: boolean;
};

export type TieredMilesCard = BaseCard & {
  layout: "tieredMiles";
  welcomeBenefit: TieredWelcomeBenefit;
  rewards: TieredRewards;
  tiers: TieredTiers;
  tierBenefits: TieredTierBenefits;
  loungeAccess: TieredLoungeAccess;
  milesRedemption: TieredMilesRedemption;
  additionalInfo: TieredAdditionalInfo;
};

export type LifestyleAcceleratedRewards = {
  rate: string;
  merchants: string[];
  monthlyCapRp?: number;
  minSpend?: number;
};

export type LifestyleRewards = {
  baseRate: string;
  acceleratedRewards?: LifestyleAcceleratedRewards;
  rewardExclusions: string[];
  rewardPosting: string;
  rewardValidity?: string;
  monthlyRpCap?: number;
};

export type LifestyleMembershipUnlock = {
  benefits: string[];
  spendRequirement: string;
  unlockTime?: string;
  downloadWindow?: string;
};

export type LifestyleJoiningVoucher = {
  valueInInr: number;
  condition: string;
};

export type LifestyleWelcomeBenefits = {
  membershipUnlock?: LifestyleMembershipUnlock;
  joiningVoucher?: LifestyleJoiningVoucher;
};

export type LifestyleRedemption = {
  smartBuyPortalValue: {
    exclusiveCatalog: string;
    flightsHotels: string;
    productsVouchers: string;
    statementCredit: string;
  };
  airmilesConversion?: {
    conversionRate: string;
  };
  travelRedemptionLimit?: string;
};

export type LifestyleMilestoneBenefits = {
  quarterly?: {
    spendRequirement: number;
    voucherValue: number;
    brandChoices: string[];
  };
  annual?: {
    threshold: number;
    benefit: string;
  }[];
  voucherUnlockTime?: string;
};

export type LifestyleLoungeAccess = {
  india?: {
    quota: number;
    terminals: string;
    method?: string;
  };
  internationalPriorityPass?: {
    quota: number;
    chargeAfterQuotaUsd: number;
    notes?: string[];
  };
};

export type LifestyleConcierge = {
  email?: string;
  phone?: string;
};

export type LifestyleInsurance = {
  lostCardLiability?: string;
};

export type LifestyleEligibility = Record<
  string,
  {
    age: string;
    incomeMin?: string;
    itrMin?: string;
  }
>;

export type LifestyleSpecialPrograms = {
  dining?: {
    program: string;
    benefit: string;
    platform?: string;
  };
};

export type LifestyleFeesSummary = {
  joiningFee: number;
  renewalFee: number;
  welcomeBenefitCondition?: string;
};

export type LifestyleCard = BaseCard & {
  layout: "lifestyle";
  fees: LifestyleFeesSummary;
  welcomeBenefits: LifestyleWelcomeBenefits;
  rewards: LifestyleRewards;
  redemption: LifestyleRedemption;
  milestoneBenefits?: LifestyleMilestoneBenefits;
  loungeAccess: LifestyleLoungeAccess;
  concierge?: LifestyleConcierge;
  insurance?: LifestyleInsurance;
  foreignExchangeMarkup?: string;
  eligibility?: LifestyleEligibility;
  specialPrograms?: LifestyleSpecialPrograms;
  travelBenefitsTags?: string[];
  rewardTags?: string[];
};

export type PremiumTravelFeeWaiver = {
  spendRequirement: number;
  currency: string;
  note?: string;
};

export type PremiumTravelFees = {
  joiningFee: number;
  annualFee: number;
  waiver?: PremiumTravelFeeWaiver;
};

export type PremiumWelcomeBenefitPerk = {
  type: string;
  valueInInr?: number;
  partner?: string;
  name?: string;
  validity?: string;
  value?: number;
};

export type PremiumWelcomeBenefitRequirement = {
  spend: number;
  periodDays: number;
  postingTime?: string;
  benefits: PremiumWelcomeBenefitPerk[];
};

export type PremiumTravelWelcomeBenefits = {
  requirements: PremiumWelcomeBenefitRequirement[];
  sourceNote?: string;
};

export type PremiumTravelRewardProgram = {
  currency: string;
  baseRate: string;
  acceleratedRate?: {
    rate: string;
    categories: string[];
    monthlyCap?: number;
  };
  earnLogic?: string;
  expiry?: string;
  sourceNote?: string;
};

export type PremiumTravelMilestoneBonus = {
  thresholdInInr: number;
  rewardPoints: number;
  cycle: string;
};

export type PremiumTravelMilestoneAdditionalBenefit = {
  type: string;
  partner?: string;
  valueInInr?: number;
  deliveryTimeline?: string;
};

export type PremiumTravelMilestoneSplit = {
  thresholdPoints?: number;
  extraPointsViaSupport?: number;
  redemptionNote?: string;
};

export type PremiumTravelMilestoneDetail = {
  thresholdInInr: number;
  rewardPoints?: number;
  cycle?: string;
  description?: string;
  split?: PremiumTravelMilestoneSplit;
  additionalBenefit?: PremiumTravelMilestoneAdditionalBenefit;
  redeemableOn?: string[];
};

export type PremiumTravelMilestoneBenefits = {
  annualSpendBonus?: PremiumTravelMilestoneBonus;
  first90DaySpendBonus?: PremiumTravelMilestoneBonus;
  additionalMilestones?: PremiumTravelMilestoneDetail[];
  eligibleSpendNote?: string;
};

export type PremiumTravelRedemptionPartners = {
  airlines?: string[];
  hotels?: string[];
};

export type PremiumTravelRedemption = {
  type: string;
  rate?: string;
  platform?: string;
  instantRedemption?: boolean;
  partners?: PremiumTravelRedemptionPartners;
  notes?: string[];
};

export type PremiumTravelDomesticLoungeAccess = {
  complimentaryVisitsPerYear: number;
  quarterlyCap?: number;
  notes?: string[];
};

export type PremiumTravelPriorityPassAccess = {
  membershipFee?: string;
  visitCharges?: string;
  notes?: string[];
};

export type PremiumTravelLoungeAccess = {
  domestic?: number | PremiumTravelDomesticLoungeAccess;
  international?: number;
  note?: string;
  priorityPass?: PremiumTravelPriorityPassAccess;
};

export type PremiumTravelGolfBenefits = {
  freeRounds?: number;
  freeLessons?: number;
  limit?: string;
  discount?: string;
};

export type PremiumTravelHolidayBenefit = {
  partner: string;
  benefit: string;
};

export type PremiumTravelTravelBenefits = {
  airportLoungeAccess?: PremiumTravelLoungeAccess;
  golf?: PremiumTravelGolfBenefits;
  holidayBenefits?: PremiumTravelHolidayBenefit[];
  dutyFreeDiscount?: string;
};

export type PremiumTravelOtherPrivileges = {
  purchaseProtection?: string;
  movieDiningBenefits?: string;
  exclusivePrivileges?: string[];
  securityServices?: string[];
};

export type PremiumTravelEligibility = {
  age?: string;
  minIncome?: string;
  residency?: string;
  citiesServed?: string[];
};

export type PremiumTravelVoucherOffer = {
  name: string;
  valueInInr?: number;
  trigger?: string;
  validity?: string;
  validityDays?: number;
  oneTimeUse?: boolean;
  bookingChannels?: string[];
  notes?: string[];
};

export type PremiumTravelVouchersAndOffers = {
  vouchers?: PremiumTravelVoucherOffer[];
  otherPrograms?: string[];
};

export type PremiumTravelCard = BaseCard & {
  layout: "premiumTravel";
  fees: PremiumTravelFees;
  welcomeBenefits: PremiumTravelWelcomeBenefits;
  rewardProgram: PremiumTravelRewardProgram;
  rewardExclusions?: string[];
  milestoneBenefits?: PremiumTravelMilestoneBenefits;
  redemption: PremiumTravelRedemption;
  travelBenefits?: PremiumTravelTravelBenefits;
  otherPrivileges?: PremiumTravelOtherPrivileges;
  eligibility?: PremiumTravelEligibility;
  tags?: string[];
  vouchersAndOffers?: PremiumTravelVouchersAndOffers;
};

export type Card = TieredMilesCard | LifestyleCard | PremiumTravelCard;

export type CardStrategy = {
  title: string;
  description: string;
  enabled?: boolean;
};

export type FavoriteCombo = {
  name: string;
  cards: string[];
  note: string;
  enabled?: boolean;
};

export type CreditCardDataset = {
  cards: Card[];
  cardStrategies: CardStrategy[];
  favoriteCombos: FavoriteCombo[];
};
