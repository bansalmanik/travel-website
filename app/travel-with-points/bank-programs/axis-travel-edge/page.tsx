import { makeBankProgramPage } from "../program-page-factory";

const { metadata, runtime, Page: AxisTravelEdgePage } = makeBankProgramPage({
  slug: "axis-travel-edge",
  fallbackName: "Axis Travel Edge",
  fallbackSummary:
    "Learn how Axis Bank Travel Edge unlocks accelerated Edge Rewards on flights, hotels and everyday lifestyle partners.",
});

export { metadata, runtime };

export default AxisTravelEdgePage;
