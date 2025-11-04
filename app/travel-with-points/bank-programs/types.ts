export type EnabledEntity = {
  enabled?: boolean;
};

export type BaseSection = EnabledEntity & {
  id: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
};

export type BulletSection = BaseSection & {
  style: "bullets";
  bullets: string[];
};

export type TableSection = BaseSection & {
  style: "table";
  table: {
    columns: string[];
    rows: { cells: string[] }[];
    caption?: string;
  };
};

export type KeyValueItem = EnabledEntity & {
  label: string;
  value: string;
};

export type KeyValueSection = BaseSection & {
  style: "key-values";
  items: KeyValueItem[];
  columns?: number;
};

export type ContentBlock =
  | (EnabledEntity & { type: "paragraph"; text: string })
  | (EnabledEntity & { type: "bullets"; title?: string; items: string[] });

export type ContentBlocksSection = BaseSection & {
  style: "content-blocks";
  blocks: ContentBlock[];
};

export type ProgramSection =
  | BulletSection
  | TableSection
  | KeyValueSection
  | ContentBlocksSection;

export type BankProgram = EnabledEntity & {
  slug: string;
  name: string;
  issuer: string;
  programType: string;
  joinCost: string;
  summary: string;
  sections: ProgramSection[];
};
