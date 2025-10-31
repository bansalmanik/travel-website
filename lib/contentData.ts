import path from "path";
import { promises as fs } from "fs";
import { cache } from "react";

import type {
  AwardPlaybookItem,
  FavoriteRoute,
  FlightProgram,
} from "@/app/travel-with-points/flight-programs/types";
import type {
  Card,
  CardStrategy,
  CreditCardDataset,
  FavoriteCombo,
} from "@/app/travel-with-points/credit-cards/types";
import type {
  ElitePath,
  HotelDataset,
  HotelProgram,
} from "@/app/travel-with-points/hotel-programs/types";
import type { JournalDataset, JournalEntry } from "@/app/journals/types";
import type { Conversion } from "@/app/pointsconversion/types";
import { filterEnabled, filterEnabledDeep } from "./filterEnabled";

const readDataFile = cache(async (fileName: string) => {
  const filePath = path.join(process.cwd(), "data", fileName);
  return fs.readFile(filePath, "utf-8");
});

async function loadJsonData<T>(fileName: string): Promise<T> {
  const fileContents = await readDataFile(fileName);
  return JSON.parse(fileContents) as T;
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const data = await loadJsonData<JournalDataset>("journals.json");
  return filterEnabled(data.journals).map((entry) =>
    filterEnabledDeep(entry),
  );
}

export async function getCreditCardContent(): Promise<{
  cards: Card[];
  cardStrategies: CardStrategy[];
  favoriteCombos: FavoriteCombo[];
}> {
  const data = await loadJsonData<CreditCardDataset>("credit-cards.json");

  return {
    cards: filterEnabled(data.cards).map((card) => filterEnabledDeep(card)),
    cardStrategies: filterEnabled(data.cardStrategies),
    favoriteCombos: filterEnabled(data.favoriteCombos),
  };
}

export async function getFlightProgramContent(): Promise<{
  programs: FlightProgram[];
  awardPlaybook: AwardPlaybookItem[];
  favoriteRoutes: FavoriteRoute[];
}> {
  const data = await loadJsonData<{
    programs: FlightProgram[];
    awardPlaybook: AwardPlaybookItem[];
    favoriteRoutes: FavoriteRoute[];
  }>("flight-programs.json");

  return {
    programs: filterEnabled(data.programs).map((program) =>
      filterEnabledDeep(program),
    ),
    awardPlaybook: filterEnabled(data.awardPlaybook),
    favoriteRoutes: filterEnabled(data.favoriteRoutes),
  };
}

export async function getHotelProgramContent(): Promise<{
  programs: HotelProgram[];
  elitePaths: ElitePath[];
  bookingTips: string[];
}> {
  const data = await loadJsonData<HotelDataset>("hotel-programs.json");

  return {
    programs: filterEnabled(data.programs ?? []).map((program) =>
      filterEnabledDeep(program),
    ),
    elitePaths: filterEnabled(data.elitePaths ?? []),
    bookingTips: data.bookingTips ?? [],
  };
}

export async function getPointsConversions(): Promise<Conversion[]> {
  const data = await loadJsonData<Conversion[]>("points-conversion.json");
  return filterEnabled(data).map((conversion) =>
    filterEnabledDeep(conversion),
  ) as Conversion[];
}
