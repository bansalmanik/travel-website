import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
