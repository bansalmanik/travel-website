import { cache } from "react";
import { headers } from "next/headers";

import {
  getFallbackDatasetPayload,
  isTravelWithPointsDatasetKey,
} from "./travelWithPointsKv";

function normalizeOrigin(candidate: string): string {
  if (!candidate) {
    return "";
  }

  const trimmed = candidate.trim();
  if (!trimmed) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed.replace(/\/$/, "");
  }

  return `https://${trimmed.replace(/\/$/, "")}`;
}

async function resolveDatasetApiOrigin(): Promise<string | null> {
  if (typeof window !== "undefined") {
    return "";
  }

  if (typeof process !== "undefined") {
    const explicitEnv =
      process.env.TRAVEL_WITH_POINTS_DATASET_API_ORIGIN ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.SITE_URL ??
      process.env.VERCEL_URL;

    if (explicitEnv) {
      const normalized = normalizeOrigin(explicitEnv);
      if (normalized) {
        return normalized;
      }
    }
  }

  try {
    const headerList = await Promise.resolve(headers());
    const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
    if (host) {
      const protocol = headerList.get("x-forwarded-proto") ?? "https";
      return `${protocol}://${host}`;
    }
  } catch {
    // headers() throws outside of a request context. We fall through to the
    // environment-based fallbacks below.
  }

  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
    return "http://127.0.0.1:3000";
  }

  return null;
}

const loadDatasetText = cache(async (fileName: string): Promise<string> => {
  if (!isTravelWithPointsDatasetKey(fileName)) {
    throw new Error(`Unknown Travel with Points dataset: ${fileName}`);
  }

  if (typeof window !== "undefined") {
    const response = await fetch(`/api/travel-with-points/${fileName}`);
    if (!response.ok) {
      throw new Error(
        `Travel with Points dataset "${fileName}" request failed with status ${response.status}.`
      );
    }

    return response.text();
  }

  const origin = await resolveDatasetApiOrigin();
  if (!origin) {
    const allowEmptyFallback = (() => {
      if (typeof process === "undefined") {
        return false;
      }

      const flag = process.env.TRAVEL_WITH_POINTS_ALLOW_EMPTY_DATA ?? "";
      if (flag === "1" || flag.toLowerCase() === "true") {
        return true;
      }

      const phase = process.env.NEXT_PHASE ?? "";
      return phase === "phase-production-build";
    })();

    try {
      const routeModule = (await import(
        "@/app/api/travel-with-points/[dataset]/route"
      )) as typeof import("@/app/api/travel-with-points/[dataset]/route");

      if (typeof routeModule.GET === "function") {
        const params = Promise.resolve({ dataset: fileName });
        const response = await routeModule.GET(
          new Request(
            `https://internal.miles/api/travel-with-points/${fileName}`
          ),
          { params }
        );

        if (response?.ok) {
          return response.text();
        }

        if (response?.status === 404) {
          throw new Error(
            `Travel with Points dataset "${fileName}" was not found. Ensure the ${fileName} key exists in the MilesGoRound KV namespace.`
          );
        }

        const status = response?.status ?? "unknown";
        throw new Error(
          `Travel with Points dataset "${fileName}" request failed with status ${status}.`
        );
      }
    } catch (error) {
      if (!(allowEmptyFallback || process.env.NODE_ENV !== "production")) {
        if (error instanceof Error) {
          throw error;
        }

        throw new Error(
          "Travel with Points dataset loader could not determine the API origin for /api/travel-with-points."
        );
      }

      console.warn(
        `Travel with Points dataset "${fileName}" falling back to an empty payload because the dataset API origin could not be determined.\n` +
          "Ensure the application can compute a fully qualified URL for /api/travel-with-points.",
        error
      );

      return getFallbackDatasetPayload(fileName);
    }

    if (allowEmptyFallback || process.env.NODE_ENV !== "production") {
      console.warn(
        `Travel with Points dataset "${fileName}" falling back to an empty payload because the dataset API origin could not be determined.\n` +
          "Ensure the application can compute a fully qualified URL for /api/travel-with-points."
      );

      return getFallbackDatasetPayload(fileName);
    }

    throw new Error(
      "Travel with Points dataset loader could not determine the API origin for /api/travel-with-points."
    );
  }

  const response = await fetch(`${origin}/api/travel-with-points/${fileName}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    throw new Error(
      `Travel with Points dataset "${fileName}" was not found. Ensure the ${fileName} key exists in the MilesGoRound KV namespace.`
    );
  }

  if (!response.ok) {
    throw new Error(
      `Travel with Points dataset "${fileName}" request failed with status ${response.status}.`
    );
  }

  return response.text();
});

export async function loadTravelWithPointsDataset<T>(fileName: string): Promise<T> {
  const raw = await loadDatasetText(fileName);

  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    throw new Error(`Failed to parse dataset "${fileName}": ${(error as Error).message}`);
  }
}
