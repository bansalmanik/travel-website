import { cache } from "react";

type LoaderOptions = {
  kvRestApiUrl?: string;
  kvRestApiToken?: string;
  httpBaseUrl?: string;
};

const options: LoaderOptions = {
  kvRestApiUrl: process.env.TRAVEL_WITH_POINTS_KV_REST_API_URL,
  kvRestApiToken: process.env.TRAVEL_WITH_POINTS_KV_REST_API_TOKEN,
  httpBaseUrl: process.env.TRAVEL_WITH_POINTS_DATA_BASE_URL,
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

  const httpBaseUrl = options.httpBaseUrl;
  if (httpBaseUrl) {
    const base = httpBaseUrl.endsWith("/") ? httpBaseUrl : `${httpBaseUrl}/`;
    const response = await fetch(`${base}${fileName}`);

    if (!response.ok) {
      throw new Error(
        `Failed to load "${fileName}" from remote data URL (status ${response.status}).`
      );
    }

    return await response.text();
  }

  const nodeEnv = typeof process !== "undefined" ? process.env.NODE_ENV : undefined;
  if (nodeEnv !== "production") {
    const [{ readFile }, { join }] = await Promise.all([
      import("node:fs/promises"),
      import("node:path"),
    ]);

    const filePath = join(process.cwd(), "data", fileName);
    return await readFile(filePath, "utf8");
  }

  throw new Error(
    "Travel with Points dataset loader is not configured. Set TRAVEL_WITH_POINTS_KV_REST_API_URL/TRAVEL_WITH_POINTS_KV_REST_API_TOKEN or TRAVEL_WITH_POINTS_DATA_BASE_URL."
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
