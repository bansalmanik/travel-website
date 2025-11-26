export type ResourceMedia = {
  src: string;
  alt: string;
  caption?: string;
  enabled?: boolean;
};

export type ResourceVideo = {
  url: string;
  title: string;
  provider?: string;
  enabled?: boolean;
};

export type ResourceSection = {
  heading: string;
  paragraphs?: string[];
  images?: ResourceMedia[];
  video?: ResourceVideo;
  enabled?: boolean;
};

export type ResourceEntry = {
  slug: string;
  title: string;
  location: string;
  topic: string;
  summary: string;
  seoDescription: string;
  publishedOn: string;
  displayDate: string;
  readTime: string;
  heroImage: ResourceMedia;
  sections: ResourceSection[];
  enabled?: boolean;
};

export type ResourceDataset = {
  resources: ResourceEntry[];
};
