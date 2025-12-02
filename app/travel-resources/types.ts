export type SectionImage = {
  src: string;
  alt: string;
  caption?: string;
  enabled?: boolean;
};

export type TravelResourceSection = {
  heading: string;
  body: string[];
  images?: SectionImage[];
  image?: SectionImage;
  enabled?: boolean;
};

export type TravelResourceEntry = {
  slug: string;
  title: string;
  author: string;
  summary: string;
  seoDescription: string;
  publishedOn: string;
  displayDate: string;
  readTime: string;
  heroImage: SectionImage;
  sections: TravelResourceSection[];
  gallery?: SectionImage[];
  videoUrl?: string;
  enabled?: boolean;
};

export type TravelResourceDataset = {
  travelResources: TravelResourceEntry[];
};
