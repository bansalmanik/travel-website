import { cache } from "react";

export type SlugParams = Promise<{ slug: string }>;

export async function resolveSlugParam(params: SlugParams): Promise<string> {
  const { slug } = await params;
  return decodeURIComponent(slug);
}

export function createSlugResolver<T extends { slug: string }>(
  loader: () => Promise<T[]>
) {
  const loadAll = cache(loader);

  async function all(): Promise<T[]> {
    return loadAll();
  }

  async function findBySlug(slug: string): Promise<T | undefined> {
    const items = await loadAll();
    return items.find((item) => item.slug === slug);
  }

  async function fromParams(params: SlugParams): Promise<{
    slug: string;
    entity?: T;
  }> {
    const slugValue = await resolveSlugParam(params);
    const entity = await findBySlug(slugValue);

    return { slug: slugValue, entity };
  }

  return { all, findBySlug, fromParams };
}
