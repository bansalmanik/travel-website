import type { Metadata } from "next";

import PointsConversionContent from "./PointsConversionContent";
import { getPointsConversions } from "@/lib/contentData";

export const metadata: Metadata = {
  title: "Points Conversion Guide | Transfer Rates",
  description:
    "Pick a rewards program, choose a partner, and instantly see the transfer rate and projected points.",
  openGraph: {
    title: "Points Conversion Guide",
    description:
      "Filter by program and destination partner to browse transfer ratios and guidance in seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Points Conversion Guide",
    description:
      "See transfer partners and ratios faster—choose your program, destination, and amount to get instant guidance.",
  },
};

export default async function PointsConversionPage() {
  const conversions = await getPointsConversions();

  return <PointsConversionContent conversions={conversions} />;
}
