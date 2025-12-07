import type { Metadata } from "next";

import PointsConversionContent from "./PointsConversionContent";
import { getPointsConversions } from "@/lib/contentData";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Points Conversion Guide | Transfer Rates",
  description:
    "Pick a rewards program and originating card to see every partner and transfer ratio in one clean table.",
  openGraph: {
    title: "Points Conversion Guide",
    description:
      "Filter by program and source card to browse transfer partners, ratios, and guidance in seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Points Conversion Guide",
    description:
      "See transfer partners and ratios faster—choose your program and card to get a complete table instantly.",
  },
};

export default async function PointsConversionPage() {
  const conversions = await getPointsConversions();

  return <PointsConversionContent conversions={conversions} />;
}
