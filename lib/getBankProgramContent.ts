import { cache } from "react";

import type { BankProgram } from "@/app/travel-with-points/bank-programs/types";
import { filterEnabled, filterEnabledDeep } from "@/lib/filterEnabled";
import { loadTravelWithPointsDataset } from "@/lib/server/loadTravelWithPointsDataset";

interface BankProgramDataset {
  programs?: BankProgram[];
}

const loadPrograms = async (): Promise<BankProgram[]> => {
  const dataset = await loadTravelWithPointsDataset<BankProgramDataset>(
    "bank-programs.json"
  );
  const programs = filterEnabled(dataset.programs ?? []);

  return programs.map((program) => filterEnabledDeep(program)) as BankProgram[];
};

export const getBankProgramContent = cache(async () => {
  const programs = await loadPrograms();

  return { programs };
});
