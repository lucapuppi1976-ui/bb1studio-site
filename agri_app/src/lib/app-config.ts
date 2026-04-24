import { getPublicEnv } from "@/lib/env";

export function getAppConfig() {
  const env = getPublicEnv();

  return {
    origin: env.NEXT_PUBLIC_APP_ORIGIN.replace(/\/$/, ""),
    basePath: env.NEXT_PUBLIC_APP_BASE_PATH || "/agri_app",
  };
}

export function withBasePath(pathname: string) {
  const { basePath } = getAppConfig();
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${basePath}${normalized === "/" ? "" : normalized}`;
}
