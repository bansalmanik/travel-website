import type { Metadata } from "next";

import PointsConversionContent from "./PointsConversionContent";
import { getPointsConversions } from "@/lib/contentData";

export const metadata: Metadata = {
  title: "Points Conversion Guide | Transfer Rates",
  description:
    "Search flexible points transfer partners, compare conversion ratios, and send your rewards with confidence.",
  openGraph: {
    title: "Points Conversion Guide",
    description:
      "Search transfer partners, compare conversion ratios, and protect every point you move.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Points Conversion Guide",
    description:
      "Browse loyalty partners, compare conversion ratios, and transfer points with confidence.",
  },
};

export default async function PointsConversionPage() {
  const conversions = await getPointsConversions();

  return <PointsConversionContent conversions={conversions} />;
}
