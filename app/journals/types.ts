export type SectionImage = {
  src: string;
  alt: string;
  caption?: string;
  enabled?: boolean;
};

export type JournalSection = {
  heading: string;
  body: string[];
  image?: SectionImage;
  enabled?: boolean;
};

export type JournalEntry = {
  slug: string;
  title: string;
  author: string;
  summary: string;
  seoDescription: string;
  publishedOn: string;
  displayDate: string;
  readTime: string;
  heroImage: SectionImage;
  sections: JournalSection[];
  enabled?: boolean;
};

export type JournalDataset = {
  journals: JournalEntry[];
};
