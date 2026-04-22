import type { NextConfig } from "next";

const AGRI_APP_SERVICE = process.env.AGRI_APP_SERVICE_URL || "https://agri-app.onrender.com";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/agri_app",
        destination: `${AGRI_APP_SERVICE}/agri_app`,
      },
      {
        source: "/agri_app/:path*",
        destination: `${AGRI_APP_SERVICE}/agri_app/:path*`,
      },
      {
        source: "/agri_app-static/:path*",
        destination: `${AGRI_APP_SERVICE}/agri_app-static/:path*`,
      },
    ];
  },
};

export default nextConfig;
