export type BankProgramSectionStyle =
  | "key-values"
  | "bullets"
  | "content-blocks"
  | "table";

export type KeyValueItem = {
  label: string;
  value: string;
  enabled?: boolean;
};

export type KeyValueSection = {
  id: string;
  title: string;
  style: "key-values";
  intro?: string;
  items?: KeyValueItem[];
  enabled?: boolean;
};

export type BulletSection = {
  id: string;
  title: string;
  style: "bullets";
  intro?: string;
  bullets?: string[];
  enabled?: boolean;
};

export type ContentBlock = {
  type: "paragraph";
  text: string;
  enabled?: boolean;
};

export type ContentBlocksSection = {
  id: string;
  title: string;
  style: "content-blocks";
  intro?: string;
  blocks?: ContentBlock[];
  enabled?: boolean;
};

export type TableRow = {
  cells: string[];
  enabled?: boolean;
};

export type TableSection = {
  id: string;
  title: string;
  style: "table";
  intro?: string;
  table?: {
    columns: string[];
    rows: TableRow[];
  };
  enabled?: boolean;
};

export type BankProgramSection =
  | KeyValueSection
  | BulletSection
  | ContentBlocksSection
  | TableSection;

export type BankProgram = {
  slug: string;
  name: string;
  issuer: string;
  programType: string;
  joinCost: string;
  summary: string;
  seoDescription?: string;
  sections: BankProgramSection[];
  enabled?: boolean;
};

export type BankProgramDataset = {
  programs: BankProgram[];
};
