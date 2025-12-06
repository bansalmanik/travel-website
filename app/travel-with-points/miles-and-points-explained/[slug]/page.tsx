import { redirect } from "next/navigation";

import { getMilesPointsArticleSlugs } from "@/lib/milesPointsArticles";

export async function generateStaticParams() {
  return getMilesPointsArticleSlugs().map((slug) => ({ slug }));
}

export default async function LegacyMilesPointsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  redirect(`/learning/${slug}`);
}
