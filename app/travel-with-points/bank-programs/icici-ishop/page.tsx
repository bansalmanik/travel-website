import { makeBankProgramPage } from "../program-page-factory";

const { metadata, generateMetadata, Page: IciciIshopPage } = makeBankProgramPage({
  slug: "icici-ishop",
  fallbackName: "ICICI IShop",
  fallbackSummary:
    "Unlock extra ICICI Bank rewards and cashback by routing purchases through the IShop partner marketplace.",
});

export const runtime = "edge"; // or "nodejs"

export { metadata };
export { generateMetadata };

export default IciciIshopPage;
