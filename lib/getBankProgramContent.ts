import { cache } from "react";

import type { BankProgram } from "@/app/travel-with-points/bank-programs/types";
import bankProgramsDataset from "@/data/bank-programs.json";
import { filterEnabled, filterEnabledDeep } from "@/lib/filterEnabled";

interface BankProgramDataset {
  programs?: BankProgram[];
}

const loadPrograms = (): BankProgram[] => {
  const dataset = bankProgramsDataset as BankProgramDataset;
  const programs = filterEnabled(dataset.programs ?? []);

  return programs.map((program) => filterEnabledDeep(program)) as BankProgram[];
};

export const getBankProgramContent = cache(async () => {
  const programs = loadPrograms();

  return { programs };
});
