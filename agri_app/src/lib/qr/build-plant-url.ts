import { getAppConfig } from "@/lib/app-config";

export function buildPlantPublicUrlByCode(code: string) {
  const { origin, basePath } = getAppConfig();
  return `${origin}${basePath}/plants/code/${encodeURIComponent(code)}`;
}
