import { makeBankProgramPage } from "../program-page-factory";

const { metadata, generateMetadata, Page: AxisTravelEdgePage } = makeBankProgramPage({
  slug: "axis-travel-edge",
  fallbackName: "Axis Travel Edge",
  fallbackSummary:
    "Learn how Axis Bank Travel Edge unlocks accelerated Edge Rewards on flights, hotels and everyday lifestyle partners.",
});

export const runtime = "edge"; // or "nodejs"

export { metadata };
export { generateMetadata };

export default AxisTravelEdgePage;
