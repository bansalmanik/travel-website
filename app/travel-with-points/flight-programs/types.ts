export type SectionImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type BaseSection = {
  id: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  images?: SectionImage[];
  displayImages?: boolean;
};

export type BulletSection = BaseSection & {
  style: "bullets";
  bullets: string[];
};

export type TableSection = BaseSection & {
  style: "table";
  table: {
    caption?: string;
    columns: string[];
    rows: { cells: string[] }[];
  };
};

export type KeyValueSection = BaseSection & {
  style: "key-values";
  items: { label: string; value: string }[];
  columns?: number;
};

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; title?: string; items: string[] };

export type ContentBlocksSection = BaseSection & {
  style: "content-blocks";
  blocks: ContentBlock[];
};

export type ProgramSection =
  | BulletSection
  | TableSection
  | KeyValueSection
  | ContentBlocksSection;

export type FlightProgram = {
  slug: string;
  name: string;
  alliance: string;
  hub: string;
  summary: string;
  seoDescription: string;
  sections: ProgramSection[];
  tags?: string[];
};

export type AwardPlaybookItem = {
  title: string;
  detail: string;
  enabled?: boolean;
};

export type FavoriteRoute = {
  route: string;
  program: string;
  highlight: string;
  enabled?: boolean;
};
