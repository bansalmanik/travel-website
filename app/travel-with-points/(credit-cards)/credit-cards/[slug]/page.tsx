import { CardPageClient } from "./CardPageClient";

export const runtime = "edge";

type PageProps = {
  params: { slug: string };
};

export default function CreditCardSlugPage({ params }: PageProps) {
  return <CardPageClient slug={params.slug} />;
}
