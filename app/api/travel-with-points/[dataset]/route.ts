import { NextResponse } from "next/server";

import {
  getFallbackDatasetPayload,
  isTravelWithPointsDatasetKey,
  resolveMilesGoRoundNamespace,
} from "@/lib/server/travelWithPointsKv";

export const runtime = "edge";

type RouteParams = Promise<{ dataset: string }>;

function allowEmptyFallback(): boolean {
  if (typeof process === "undefined") {
    return false;
  }

  const flag = process.env.TRAVEL_WITH_POINTS_ALLOW_EMPTY_DATA ?? "";
  if (flag === "1" || flag.toLowerCase() === "true") {
    return true;
  }

  const phase = process.env.NEXT_PHASE ?? "";
  return phase === "phase-production-build";
}

export async function GET(request: Request, { params }: { params: RouteParams }) {
  const { dataset } = await params;
  const datasetName = dataset ?? "";

  if (!isTravelWithPointsDatasetKey(datasetName)) {
    return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
  }

  const kvNamespace = resolveMilesGoRoundNamespace();
  if (!kvNamespace) {
    if (process.env.NODE_ENV !== "production" || allowEmptyFallback()) {
      console.warn(
        `Travel with Points dataset "${datasetName}" falling back to an empty payload because the MilesGoRound KV binding is not available.\n` +
          "Ensure the Cloudflare Pages project is configured with the MilesGoRound KV namespace."
      );

      return new Response(getFallbackDatasetPayload(datasetName), {
        headers: { "content-type": "application/json" },
      });
    }

    return NextResponse.json(
      { error: "MilesGoRound KV namespace is not configured." },
      { status: 500 }
    );
  }

  try {
    const text = await kvNamespace.get(datasetName, "text");

    if (typeof text !== "string") {
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
    }

    return new Response(text, {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error(
      `Failed to load Travel with Points dataset "${datasetName}" from the MilesGoRound KV namespace:`,
      error
    );

    return NextResponse.json({ error: "Failed to load dataset" }, { status: 500 });
  }
}
