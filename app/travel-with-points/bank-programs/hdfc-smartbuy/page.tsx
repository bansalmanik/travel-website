import { makeBankProgramPage } from "../program-page-factory";

const { metadata, runtime, Page: HdfcSmartbuyPage } = makeBankProgramPage({
  slug: "hdfc-smartbuy",
  fallbackName: "HDFC Bank SmartBuy",
  fallbackSummary:
    "Explore how HDFC Bank SmartBuy boosts rewards on flights, hotels, vouchers and online shopping.",
});

export { metadata, runtime };

export default HdfcSmartbuyPage;
