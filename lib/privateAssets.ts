import path from "path";
import { promises as fs } from "fs";
import { cache } from "react";

const ASSET_ROOT = path.join(process.cwd(), "private-assets");

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function normalizeAssetPath(src: string) {
  return src.replace(/^\/+/, "");
}

function getMimeType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  return MIME_TYPES[extension] ?? "application/octet-stream";
}

const loadImageDataUri = cache(async (normalizedPath: string) => {
  const assetPath = path.join(ASSET_ROOT, normalizedPath);
  const fileContents = await fs.readFile(assetPath);
  const mimeType = getMimeType(assetPath);
  return `data:${mimeType};base64,${fileContents.toString("base64")}`;
});

export async function getPrivateImageSrc(src: string): Promise<string> {
  const normalizedPath = normalizeAssetPath(src);
  return loadImageDataUri(normalizedPath);
}
