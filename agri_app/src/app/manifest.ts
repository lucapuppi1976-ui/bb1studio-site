import type { MetadataRoute } from "next";
import { getAppConfig } from "@/lib/app-config";

export default function manifest(): MetadataRoute.Manifest {
  const { basePath } = getAppConfig();

  return {
    name: "Agri App",
    short_name: "Agri App",
    description: "Gestione agricola bb1studio",
    start_url: `${basePath}/dashboard`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: `${basePath}/icons/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${basePath}/icons/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
