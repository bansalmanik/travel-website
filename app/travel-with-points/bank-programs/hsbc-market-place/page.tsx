import { makeBankProgramPage } from "../program-page-factory";

const { metadata, runtime, Page: HsbcMarketPlacePage } = makeBankProgramPage({
  slug: "hsbc-market-place",
  fallbackName: "HSBC Market Place",
  fallbackSummary:
    "Navigate HSBC Market Place offers to stack accelerated rewards on travel, shopping and everyday experiences.",
});

export { metadata, runtime };

export default HsbcMarketPlacePage;
