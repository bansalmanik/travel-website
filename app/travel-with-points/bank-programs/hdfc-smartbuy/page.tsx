import { makeBankProgramPage } from "../program-page-factory";

const { metadata, generateMetadata, Page: HdfcSmartbuyPage } = makeBankProgramPage({
    slug: "hdfc-smartbuy",
    fallbackName: "HDFC Bank SmartBuy",
    fallbackSummary:
        "Explore how HDFC Bank SmartBuy boosts rewards on flights, hotels, vouchers and online shopping.",
});


export const runtime = "edge"; // or "nodejs"

export { metadata };
export { generateMetadata };

export default HdfcSmartbuyPage;
