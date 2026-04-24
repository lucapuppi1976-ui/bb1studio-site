"use client";

import { useEffect } from "react";

export function RegisterServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const basePath = process.env.NEXT_PUBLIC_APP_BASE_PATH || "/agri_app";
    navigator.serviceWorker.register(`${basePath}/sw.js`).catch(() => undefined);
  }, []);

  return null;
}
