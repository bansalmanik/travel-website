import { CreditCardHubClient } from "./CreditCardHubClient";

export const metadata = {
  title: "Travel credit card strategy | Travel with Points",
  description:
    "Discover flexible currencies, card pairings, and smart earning tactics to maximize travel rewards with every swipe.",
};

export const runtime = "edge";

export default function CreditCardsPage() {
  return <CreditCardHubClient />;
}
