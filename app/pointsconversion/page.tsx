import type { Metadata } from "next";

import PointsConversionContent from "./PointsConversionContent";

export const metadata: Metadata = {
  title: "Points Conversion Guide | Transfer Rates & Terms",
  description:
    "Search flexible points transfer partners, compare conversion ratios, and review the fine print before sending your rewards.",
  openGraph: {
    title: "Points Conversion Guide",
    description:
      "Search transfer partners, compare conversion ratios, and review terms to protect every point you move.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Points Conversion Guide",
    description:
      "Browse loyalty partners, compare conversion ratios, and confirm terms before you transfer points.",
  },
};

export default function PointsConversionPage() {
  return <PointsConversionContent />;
}
