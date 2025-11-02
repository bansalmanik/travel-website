import { cache } from "react";

type AssetModule = { default: AssetValue } | AssetValue;
type AssetValue = string | { src: string };

type AssetLoader = () => Promise<AssetModule>;

function normalizeAssetPath(src: string): string {
  const trimmed = src.trim();
  if (!trimmed) {
    throw new Error("Invalid private asset path");
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const withoutExtraLeading = withLeadingSlash.replace(/^\/+/, "");
  return `/${withoutExtraLeading}`;
}

const assetLoaders: Record<string, AssetLoader> = {
  "/file.svg": () => import("@/private-assets/file.svg"),
  "/flight-programs/cabin-experience.svg": () => import("@/private-assets/flight-programs/cabin-experience.svg"),
  "/flight-programs/city-hop.svg": () => import("@/private-assets/flight-programs/city-hop.svg"),
  "/flight-programs/globetrotter.svg": () => import("@/private-assets/flight-programs/globetrotter.svg"),
  "/flight-programs/india-gateway.svg": () => import("@/private-assets/flight-programs/india-gateway.svg"),
  "/flight-programs/points-transfer.svg": () => import("@/private-assets/flight-programs/points-transfer.svg"),
  "/flight-programs/route-map.svg": () => import("@/private-assets/flight-programs/route-map.svg"),
  "/flight-programs/status-lounge.svg": () => import("@/private-assets/flight-programs/status-lounge.svg"),
  "/globe.svg": () => import("@/private-assets/globe.svg"),
  "/images/cards/axis-atlas-card.svg": () => import("@/private-assets/images/cards/axis-atlas-card.svg"),
  "/images/content/20230408_132352.jpg": () => import("@/private-assets/images/content/20230408_132352.jpg"),
  "/images/content/20230408_143522.jpg": () => import("@/private-assets/images/content/20230408_143522.jpg"),
  "/images/content/20230408_143854.jpg": () => import("@/private-assets/images/content/20230408_143854.jpg"),
  "/images/content/20230617_112049.jpg": () => import("@/private-assets/images/content/20230617_112049.jpg"),
  "/images/content/20231220_162748.jpg": () => import("@/private-assets/images/content/20231220_162748.jpg"),
  "/images/content/20231223_105939.jpg": () => import("@/private-assets/images/content/20231223_105939.jpg"),
  "/images/content/20231223_191940.jpg": () => import("@/private-assets/images/content/20231223_191940.jpg"),
  "/images/content/christmas_tree.JPG": () => import("@/private-assets/images/content/christmas_tree.JPG"),
  "/images/content/deck.JPG": () => import("@/private-assets/images/content/deck.JPG"),
  "/images/content/maldives-3.jpg": () => import("@/private-assets/images/content/maldives-3.jpg"),
  "/images/content/maldives_1.JPG": () => import("@/private-assets/images/content/maldives_1.JPG"),
  "/images/content/maldives_2.JPG": () => import("@/private-assets/images/content/maldives_2.JPG"),
  "/images/content/photo-1426604966848--e37abe0c5c06.svg": () => import("@/private-assets/images/content/photo-1426604966848--e37abe0c5c06.svg"),
  "/images/content/photo-1426604966848-e37abe0c5c06.svg": () => import("@/private-assets/images/content/photo-1426604966848-e37abe0c5c06.svg"),
  "/images/content/photo-1439066615861-d1af74d74000.svg": () => import("@/private-assets/images/content/photo-1439066615861-d1af74d74000.svg"),
  "/images/content/photo-1441974231531--18aee14e14f9.svg": () => import("@/private-assets/images/content/photo-1441974231531--18aee14e14f9.svg"),
  "/images/content/photo-1441974231531-c6227db76b6e.svg": () => import("@/private-assets/images/content/photo-1441974231531-c6227db76b6e.svg"),
  "/images/content/photo-1446776811953-b23d57bd21aa.svg": () => import("@/private-assets/images/content/photo-1446776811953-b23d57bd21aa.svg"),
  "/images/content/photo-1460353581641--d1918c00cef3.svg": () => import("@/private-assets/images/content/photo-1460353581641--d1918c00cef3.svg"),
  "/images/content/photo-1468413253725--fff7ef9433f6.svg": () => import("@/private-assets/images/content/photo-1468413253725--fff7ef9433f6.svg"),
  "/images/content/photo-1469474968028--cab6e117256e.svg": () => import("@/private-assets/images/content/photo-1469474968028--cab6e117256e.svg"),
  "/images/content/photo-1469474968028-c0c38f4b88f2.svg": () => import("@/private-assets/images/content/photo-1469474968028-c0c38f4b88f2.svg"),
  "/images/content/photo-1470252649378--e90b07bd4d70.svg": () => import("@/private-assets/images/content/photo-1470252649378--e90b07bd4d70.svg"),
  "/images/content/photo-1476610182048--b3c8a3656880.svg": () => import("@/private-assets/images/content/photo-1476610182048--b3c8a3656880.svg"),
  "/images/content/photo-1477587458883-47145ed94245.svg": () => import("@/private-assets/images/content/photo-1477587458883-47145ed94245.svg"),
  "/images/content/photo-1478720568477--9280e47f0c88.svg": () => import("@/private-assets/images/content/photo-1478720568477--9280e47f0c88.svg"),
  "/images/content/photo-1489515217757--911f53afa31a.svg": () => import("@/private-assets/images/content/photo-1489515217757--911f53afa31a.svg"),
  "/images/content/photo-1489515217757-5fd1be406fef.svg": () => import("@/private-assets/images/content/photo-1489515217757-5fd1be406fef.svg"),
  "/images/content/photo-1493558103817-58b2924bce98.svg": () => import("@/private-assets/images/content/photo-1493558103817-58b2924bce98.svg"),
  "/images/content/photo-1497436072909--c443dbe74f0f.svg": () => import("@/private-assets/images/content/photo-1497436072909--c443dbe74f0f.svg"),
  "/images/content/photo-1500530855697--970378c505dc.svg": () => import("@/private-assets/images/content/photo-1500530855697--970378c505dc.svg"),
  "/images/content/photo-1500530855697-b586d89ba3ee.svg": () => import("@/private-assets/images/content/photo-1500530855697-b586d89ba3ee.svg"),
  "/images/content/photo-1500534314209--8629a0f52424.svg": () => import("@/private-assets/images/content/photo-1500534314209--8629a0f52424.svg"),
  "/images/content/photo-1501117716987--32399377d959.svg": () => import("@/private-assets/images/content/photo-1501117716987--32399377d959.svg"),
  "/images/content/photo-1501594907352-04cda38ebc29.svg": () => import("@/private-assets/images/content/photo-1501594907352-04cda38ebc29.svg"),
  "/images/content/photo-1505761671935-60b3a7427bad.svg": () => import("@/private-assets/images/content/photo-1505761671935-60b3a7427bad.svg"),
  "/images/content/photo-1508672019048--d4fb7955603b.svg": () => import("@/private-assets/images/content/photo-1508672019048--d4fb7955603b.svg"),
  "/images/content/photo-1511497584788--4ee03e4cc93d.svg": () => import("@/private-assets/images/content/photo-1511497584788--4ee03e4cc93d.svg"),
  "/images/content/photo-1512453979798--17437297a7d2.svg": () => import("@/private-assets/images/content/photo-1512453979798--17437297a7d2.svg"),
  "/images/content/photo-1520256862855--0d09ea8ba8cb.svg": () => import("@/private-assets/images/content/photo-1520256862855--0d09ea8ba8cb.svg"),
  "/images/content/photo-1520256862855-0d09ea8ba8cb.svg": () => import("@/private-assets/images/content/photo-1520256862855-0d09ea8ba8cb.svg"),
  "/images/content/photo-1521292270410--f29ffc531709.svg": () => import("@/private-assets/images/content/photo-1521292270410--f29ffc531709.svg"),
  "/images/content/photo-1523285367489--b0b6cecd7646.svg": () => import("@/private-assets/images/content/photo-1523285367489--b0b6cecd7646.svg"),
  "/images/content/photo-1524594154903--47e8d54b066d.svg": () => import("@/private-assets/images/content/photo-1524594154903--47e8d54b066d.svg"),
  "/images/content/photo-1525182008055--acba6fe1b456.svg": () => import("@/private-assets/images/content/photo-1525182008055--acba6fe1b456.svg"),
  "/images/content/photo-1526481280695--e2928a46df37.svg": () => import("@/private-assets/images/content/photo-1526481280695--e2928a46df37.svg"),
  "/images/content/photo-1526778548025--49ad9214d7be.svg": () => import("@/private-assets/images/content/photo-1526778548025--49ad9214d7be.svg"),
  "/images/content/photo-1527169402691--6d31811e54c5.svg": () => import("@/private-assets/images/content/photo-1527169402691--6d31811e54c5.svg"),
  "/images/content/photo-1527169402691-6d31811e54c5.svg": () => import("@/private-assets/images/content/photo-1527169402691-6d31811e54c5.svg"),
  "/images/content/photo-1528909514045--406e194c93d3.svg": () => import("@/private-assets/images/content/photo-1528909514045--406e194c93d3.svg"),
  "/images/content/photo-1528909514045--ef98d6c7b657.svg": () => import("@/private-assets/images/content/photo-1528909514045--ef98d6c7b657.svg"),
  "/images/content/photo-1528909514045-2fa4ac7a08ba.svg": () => import("@/private-assets/images/content/photo-1528909514045-2fa4ac7a08ba.svg"),
  "/images/content/photo-1528909514045-406e194c93d3.svg": () => import("@/private-assets/images/content/photo-1528909514045-406e194c93d3.svg"),
  "/images/content/photo-1542314831-068-77e78053cad8.svg": () => import("@/private-assets/images/content/photo-1542314831-068-77e78053cad8.svg"),
  "/images/content/photo-1549693578-d68-30a7fc77244a.svg": () => import("@/private-assets/images/content/photo-1549693578-d68-30a7fc77244a.svg"),
  "/images/content/photo-1554995207-c18-3652a602396e.svg": () => import("@/private-assets/images/content/photo-1554995207-c18-3652a602396e.svg"),
  "/images/content/photo-1582719478250--17846ff570bd.svg": () => import("@/private-assets/images/content/photo-1582719478250--17846ff570bd.svg"),
  "/images/content/private_beach.JPG": () => import("@/private-assets/images/content/private_beach.JPG"),
  "/images/content/speed_boat.JPG": () => import("@/private-assets/images/content/speed_boat.JPG"),
  "/images/content/stingray.JPG": () => import("@/private-assets/images/content/stingray.JPG"),
  "/next.svg": () => import("@/private-assets/next.svg"),
  "/vercel.svg": () => import("@/private-assets/vercel.svg"),
  "/window.svg": () => import("@/private-assets/window.svg"),
};

function resolveAssetModule(module: AssetModule): string {
  if (typeof module === "string") {
    return module;
  }

  if (module && typeof module === "object") {
    if ("src" in module && typeof module.src === "string") {
      return module.src;
    }

    if ("default" in module) {
      return resolveAssetModule((module as { default: AssetValue }).default);
    }
  }

  throw new Error("Unsupported private asset module format");
}

const loadImageSource = cache(async (normalizedPath: string) => {
  const loader = assetLoaders[normalizedPath];

  if (!loader) {
    throw new Error(`Private asset not found: ${normalizedPath}`);
  }

  const assetModule = await loader();
  return resolveAssetModule(assetModule);
});

export async function getPrivateImageSrc(src: string): Promise<string> {
  const normalizedPath = normalizeAssetPath(src);
  return loadImageSource(normalizedPath);
}
