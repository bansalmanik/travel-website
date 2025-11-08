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

export type RichTable = {
  caption?: string;
  columns: string[];
  rows: string[][];
};

export type RichContent = {
  paragraphs?: string[];
  bullets?: string[];
  table?: RichTable;
};

export type CardSubSection = {
  title?: string;
  description?: string;
  content?: RichContent;
};

export type CardSection = {
  id: string;
  title: string;
  description?: string;
  content?: RichContent;
  subsections?: CardSubSection[];
};

export type CardMedia = {
  cardImage?: SectionImage;
};

export type Card = {
  slug: string;
  name: string;
  issuer: string;
  network: string;
  type: string;
  summary: string;
  seoDescription: string;
  annualFee: AnnualFee;
  rewardsCurrency?: string;
  conversion?: string;
  websiteDisplayTags?: string[];
  keyHighlights?: string[];
  media?: CardMedia;
  detailSections?: CardSection[];
  enabled?: boolean;
};

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
