import type { Metadata } from "next";

import PointsConversionContent from "./PointsConversionContent";
import { getPointsConversions } from "@/lib/contentData";

const siteUrl = "https://www.milesgoround.com";

export const metadata: Metadata = {
  title: "Points Transfer Guide | Convert Rewards for Travel",
  description:
    "Find the best ways to transfer your credit card points to airlines and hotels. Compare transfer partners and rates to book your next trip.",
  keywords: [
    "points transfer",
    "transfer partners",
    "travel booking",
    "credit card points",
    "airline transfers",
    "hotel transfers",
    "travel rewards",
  ],
  alternates: {
    canonical: `${siteUrl}/pointsconversion`,
  },
  openGraph: {
    title: "Points Transfer Guide | Miles Go Round",
    description:
      "Find the best ways to transfer your credit card points to airlines and hotels for your next trip.",
    url: `${siteUrl}/pointsconversion`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Points Transfer Guide | Miles Go Round",
    description:
      "Find the best ways to transfer your credit card points to airlines and hotels.",
  },
};

export default async function PointsConversionPage() {
  const conversions = await getPointsConversions();

  return <PointsConversionContent conversions={conversions} />;
}
