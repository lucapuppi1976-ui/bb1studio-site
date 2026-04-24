import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_APP_BASE_PATH || "/agri_app";

const nextConfig: NextConfig = {
  basePath,
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
