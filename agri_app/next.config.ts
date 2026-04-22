import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_APP_BASE_PATH || "/agri_app";
const assetPrefix = process.env.NEXT_PUBLIC_APP_ASSET_PREFIX || "/agri_app-static";

const nextConfig: NextConfig = {
  basePath,
  assetPrefix,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["bb1studio.com", "www.bb1studio.com"],
    },
  },
};

export default nextConfig;
