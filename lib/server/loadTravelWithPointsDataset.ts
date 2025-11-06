import { cache } from "react";

type CloudflareKvNamespace = {
  get(key: string, type?: "text"): Promise<string | null>;
};

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

function resolveKvNamespace(): CloudflareKvNamespace | null {
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

  const kvNamespace = resolveKvNamespace();
  if (kvNamespace) {
    const response = await kvNamespace.get(fileName, "text");

    if (typeof response === "string") {
      return response;
    }

    throw new Error(
      `Travel with Points dataset "${fileName}" was not found in the MilesGoRound KV namespace.`
    );
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
      `Travel with Points dataset "${fileName}" falling back to an empty payload because the MilesGoRound KV binding is not available.\n` +
        "Ensure the Cloudflare Pages project is configured with the MilesGoRound KV namespace."
    );

    return fallbackPayloads[fileName] ?? "{}";
  }

  throw new Error(
    "Travel with Points dataset loader could not find the MilesGoRound KV binding."
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
