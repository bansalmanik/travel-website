import type { Metadata } from "next";

import PointsConversionContent from "./PointsConversionContent";
import { getPointsConversions } from "@/lib/contentData";

const siteUrl = "https://www.milesgoround.com";

export const metadata: Metadata = {
  title: "Points Transfer Partners & Conversion Rates | Miles Go Round",
  description:
    "Compare transfer partners and conversion ratios for all major credit card points programs. Find the best transfer rates for airline miles and hotel points.",
  keywords: [
    "points transfer partners",
    "points conversion rates",
    "transfer ratios",
    "credit card points transfer",
    "airline miles transfer",
    "hotel points transfer",
    "Chase Ultimate Rewards",
    "Amex Membership Rewards",
    "Citi ThankYou",
  ],
  alternates: {
    canonical: `${siteUrl}/pointsconversion`,
  },
  openGraph: {
    title: "Points Transfer Partners & Conversion Rates | Miles Go Round",
    description:
      "Compare transfer partners and conversion ratios for all major credit card points programs.",
    url: `${siteUrl}/pointsconversion`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Points Transfer Partners & Conversion Rates",
    description:
      "Compare transfer partners and conversion ratios for all major credit card points programs.",
  },
};

export default async function PointsConversionPage() {
  const conversions = await getPointsConversions();

  return <PointsConversionContent conversions={conversions} />;
}
