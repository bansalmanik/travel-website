import { cache } from "react";

type LoaderOptions = {
  kvRestApiUrl?: string;
  kvRestApiToken?: string;
};

const options: LoaderOptions = {
  kvRestApiUrl: process.env.TRAVEL_WITH_POINTS_KV_REST_API_URL,
  kvRestApiToken: process.env.TRAVEL_WITH_POINTS_KV_REST_API_TOKEN,
};

const fallbackPayloads: Record<string, string> = {
  "bank-programs.json": JSON.stringify({ programs: [] }),
  "credit-cards.json": JSON.stringify({ cards: [], cardStrategies: [], favoriteCombos: [] }),
  "flight-programs.json": JSON.stringify({ programs: [], awardPlaybook: [], favoriteRoutes: [] }),
  "hotel-programs.json": JSON.stringify({ programs: [], elitePaths: [], bookingTips: [] }),
  "journals.json": JSON.stringify({ journals: [] }),
  "points-conversion.json": JSON.stringify([]),
};

const loadDatasetText = cache(async (fileName: string): Promise<string> => {
  if (!fileName) {
    throw new Error("A dataset file name must be provided.");
  }

  const kvRestApiUrl = options.kvRestApiUrl;
  const kvRestApiToken = options.kvRestApiToken;
  if (kvRestApiUrl && kvRestApiToken) {
    const base = kvRestApiUrl.endsWith("/") ? kvRestApiUrl : `${kvRestApiUrl}/`;
    const response = await fetch(`${base}${encodeURIComponent(fileName)}`, {
      headers: {
        Authorization: `Bearer ${kvRestApiToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to load "${fileName}" from Cloudflare KV (status ${response.status}).`
      );
    }

    return await response.text();
  }

  const nodeEnv = typeof process !== "undefined" ? process.env.NODE_ENV : undefined;
  const allowEmptyFallback = (() => {
    if (typeof process === "undefined") {
      return false;
    }

    const flag = process.env.TRAVEL_WITH_POINTS_ALLOW_EMPTY_DATA ?? "";
    return flag === "1" || flag.toLowerCase() === "true";
  })();

  if (nodeEnv !== "production" || allowEmptyFallback) {
    console.warn(
      `Travel with Points dataset "${fileName}" falling back to an empty payload because KV credentials are not configured.\n` +
        "Set TRAVEL_WITH_POINTS_KV_REST_API_URL and TRAVEL_WITH_POINTS_KV_REST_API_TOKEN to load real data."
    );

    return fallbackPayloads[fileName] ?? "{}";
  }

  throw new Error(
    "Travel with Points dataset loader is not configured. Set TRAVEL_WITH_POINTS_KV_REST_API_URL and TRAVEL_WITH_POINTS_KV_REST_API_TOKEN."
  );
});

export async function loadTravelWithPointsDataset<T>(fileName: string): Promise<T> {
  const raw = await loadDatasetText(fileName);

  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    throw new Error(`Failed to parse dataset "${fileName}": ${(error as Error).message}`);
  }
}
