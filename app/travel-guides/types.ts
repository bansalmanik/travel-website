export type SectionImage = {
  src: string;
  alt: string;
  caption?: string;
  enabled?: boolean;
};

export type TravelGuideSection = {
  heading: string;
  body: string[];
  image?: SectionImage;
  images?: SectionImage[];
  enabled?: boolean;
};

export type TravelGuideEntry = {
  slug: string;
  title: string;
  author: string;
  summary: string;
  seoDescription: string;
  publishedOn: string;
  displayDate: string;
  readTime: string;
  heroImage: SectionImage;
  gallery?: SectionImage[];
  videoUrl?: string;
  sections: TravelGuideSection[];
  enabled?: boolean;
};

export type TravelGuideDataset = {
  travelGuides: TravelGuideEntry[];
};
