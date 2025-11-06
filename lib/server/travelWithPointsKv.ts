export type TravelWithPointsDatasetKey =
  | "bank-programs.json"
  | "credit-cards.json"
  | "flight-programs.json"
  | "hotel-programs.json"
  | "journals.json"
  | "points-conversion.json";

export type CloudflareKvNamespace = {
  get(key: string, type?: "text"): Promise<string | null>;
};

export const TRAVEL_WITH_POINTS_DATASET_KEYS = new Set<TravelWithPointsDatasetKey>([
  "bank-programs.json",
  "credit-cards.json",
  "flight-programs.json",
  "hotel-programs.json",
  "journals.json",
  "points-conversion.json",
]);

type GlobalWithMaybeEnv = typeof globalThis & {
  __env__?: Record<string, unknown>;
  __ENV__?: Record<string, unknown>;
  __NEXT_ON_PAGES__?: { env?: Record<string, unknown> };
  env?: Record<string, unknown>;
};

let detectedKvNamespace: CloudflareKvNamespace | null | undefined;

function isKvNamespace(candidate: unknown): candidate is CloudflareKvNamespace {
  return (
    typeof candidate === "object" &&
    candidate !== null &&
    typeof (candidate as CloudflareKvNamespace).get === "function"
  );
}

export function resolveMilesGoRoundNamespace(): CloudflareKvNamespace | null {
  if (detectedKvNamespace !== undefined) {
    return detectedKvNamespace;
  }

  if (typeof globalThis !== "undefined") {
    const globalWithEnv = globalThis as GlobalWithMaybeEnv;
    const globalRecord = globalWithEnv as unknown as Record<string, unknown>;
    const candidates: unknown[] = [
      globalRecord["MilesGoRound"],
      globalWithEnv.env?.["MilesGoRound"],
      globalWithEnv.__env__?.["MilesGoRound"],
      globalWithEnv.__ENV__?.["MilesGoRound"],
      globalWithEnv.__NEXT_ON_PAGES__?.env?.["MilesGoRound"],
    ];

    for (const candidate of candidates) {
      if (isKvNamespace(candidate)) {
        detectedKvNamespace = candidate;
        return candidate;
      }
    }
  }

  if (typeof process !== "undefined") {
    const envRecord = (process as unknown as { env?: Record<string, unknown> }).env;
    const candidate = envRecord?.["MilesGoRound"];
    if (isKvNamespace(candidate)) {
      detectedKvNamespace = candidate;
      return candidate;
    }
  }

  detectedKvNamespace = null;
  return null;
}

const fallbackPayloads: Record<TravelWithPointsDatasetKey, string> = {
  "bank-programs.json": JSON.stringify({ programs: [] }),
  "credit-cards.json": JSON.stringify({
    cards: [],
    cardStrategies: [],
    favoriteCombos: [],
  }),
  "flight-programs.json": JSON.stringify({
    programs: [],
    awardPlaybook: [],
    favoriteRoutes: [],
  }),
  "hotel-programs.json": JSON.stringify({
    programs: [],
    elitePaths: [],
    bookingTips: [],
  }),
  "journals.json": JSON.stringify({ journals: [] }),
  "points-conversion.json": JSON.stringify([]),
};

export function getFallbackDatasetPayload(fileName: string): string {
  return fallbackPayloads[fileName as TravelWithPointsDatasetKey] ?? "{}";
}

export function isTravelWithPointsDatasetKey(
  value: string
): value is TravelWithPointsDatasetKey {
  return TRAVEL_WITH_POINTS_DATASET_KEYS.has(value as TravelWithPointsDatasetKey);
}
