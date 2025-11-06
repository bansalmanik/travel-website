import { makeBankProgramPage } from "../program-page-factory";

const { generateMetadata, Page: IciciIshopPage } = makeBankProgramPage({
  slug: "icici-ishop",
  fallbackName: "ICICI IShop",
  fallbackSummary:
    "Unlock extra ICICI Bank rewards and cashback by routing purchases through the IShop partner marketplace.",
});

export { generateMetadata };

export default IciciIshopPage;
