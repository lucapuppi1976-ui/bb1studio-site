"use client";

import { useEffect } from "react";
import { flushOfflineQueue } from "@/lib/offline/queue";

export function OfflineSyncProvider() {
  useEffect(() => {
    const trySync = () => {
      flushOfflineQueue().catch(() => undefined);
    };

    window.addEventListener("online", trySync);
    document.addEventListener("visibilitychange", trySync);

    if ("serviceWorker" in navigator) {
      const handler = (event: MessageEvent) => {
        if (event.data?.type === "TRIGGER_SYNC_QUEUE") trySync();
      };
      navigator.serviceWorker.addEventListener("message", handler);
      return () => {
        window.removeEventListener("online", trySync);
        document.removeEventListener("visibilitychange", trySync);
        navigator.serviceWorker.removeEventListener("message", handler);
      };
    }

    return () => {
      window.removeEventListener("online", trySync);
      document.removeEventListener("visibilitychange", trySync);
    };
  }, []);

  return null;
}
