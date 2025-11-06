import { makeBankProgramPage } from "../program-page-factory";

const { metadata, generateMetadata, Page: HsbcMarketPlacePage } = makeBankProgramPage({
  slug: "hsbc-market-place",
  fallbackName: "HSBC Market Place",
  fallbackSummary:
    "Navigate HSBC Market Place offers to stack accelerated rewards on travel, shopping and everyday experiences.",
});

export const runtime = "edge"; // or "nodejs"

export { metadata };
export { generateMetadata };

export default HsbcMarketPlacePage;
