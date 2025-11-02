import { cache } from "react";

import { PRIVATE_ASSET_MAP } from "./privateAssetMap";

function normalizeAssetPath(src: string) {
  const trimmed = src.replace(/^\/+/, "");
  return `/${trimmed}`;
}

const loadImageUrl = cache(async (normalizedPath: string) => {
  const assetUrl = PRIVATE_ASSET_MAP[normalizedPath];

  if (!assetUrl) {
    throw new Error(`Private asset not found for path: ${normalizedPath}`);
  }

  return assetUrl;
});

export async function getPrivateImageSrc(src: string): Promise<string> {
  const normalizedPath = normalizeAssetPath(src);
  return loadImageUrl(normalizedPath);
}
