export type SectionImage = {
  src: string;
  alt: string;
};

export type ListSection = {
  title?: string;
  description?: string;
  items?: string[];
  note?: string;
  image?: SectionImage;
  enabled?: boolean;
};

export type QuickFact = {
  label: string;
  value: string;
};

export type StatusRow = {
  label: string;
  description?: string;
  values: string[];
};

export type StatusLevelsSection = {
  tiers: string[];
  rows?: StatusRow[];
  note?: string;
  image?: SectionImage;
};

export type HotelProgram = {
  slug: string;
  name: string;
  footprint: string;
  summary: string;
  seoDescription: string;
  overview?: ListSection;
  quickFacts?: QuickFact[];
  statusLevels?: StatusLevelsSection;
  enrollment?: ListSection;
  coBrandedCards?: ListSection;
  pointsEarn?: ListSection;
  pointsBurn?: ListSection;
  eliteBenefitDetails?: ListSection;
  partnerships?: ListSection;
  specialPerks?: ListSection;
  lifetimeStatus?: ListSection;
  paidMemberships?: ListSection;
  otherBenefits?: ListSection;
  notesSection?: ListSection;
  tags?: string[];
  enabled?: boolean;
};

export type ElitePath = {
  tier: string;
  highlight: string;
  enabled?: boolean;
};

export type HotelDataset = {
  programs?: HotelProgram[];
  elitePaths?: ElitePath[];
  bookingTips?: string[];
};
