import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_APP_BASE_PATH || "/agri_app";

const nextConfig: NextConfig = {
  basePath,

  allowedDevOrigins: [
    "*.app.github.dev",
    "glorious-engine-5gwqwxrwgvxq24g44-3000.app.github.dev",
  ],

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
      allowedOrigins: [
        "localhost:3000",
        "127.0.0.1:3000",
        "*.app.github.dev",
        "glorious-engine-5gwqwxrwgvxq24g44-3000.app.github.dev",
        "bb1studio.com",
        "www.bb1studio.com",
        "agri-app-main-2.onrender.com",
      ],
    },
  },
};

export default nextConfig;