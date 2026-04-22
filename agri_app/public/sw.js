const CACHE_NAME = "agri-app-v1";
const BASE_PATH = "/agri_app";
const OFFLINE_URL = `${BASE_PATH}/offline`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([
      OFFLINE_URL,
      `${BASE_PATH}/icons/icon-192.png`,
      `${BASE_PATH}/icons/icon-512.png`,
    ]))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const accept = event.request.headers.get("accept") || "";
  const isNavigation = event.request.mode === "navigate" || accept.includes("text/html");

  if (isNavigation) {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cached = await caches.match(OFFLINE_URL);
        return cached || Response.error();
      })
    );
  }
});

self.addEventListener("sync", (event) => {
  if (event.tag !== "agri-sync-queue") return;

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        client.postMessage({ type: "TRIGGER_SYNC_QUEUE" });
      }
    })
  );
});
