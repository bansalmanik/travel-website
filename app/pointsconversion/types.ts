export type Partner = {
  to: string;
  insight: string;
  enabled?: boolean;
};

export type Rate = {
  rate: string;
  partners: Partner[];
  enabled?: boolean;
};

export type Conversion = {
  program?: string;
  from: string;
  rates: Rate[];
  enabled?: boolean;
};
