import { addQueueItem, deleteQueueItem, getQueueItems, updateQueueItem } from "@/lib/offline/indexeddb";
import type { CreateInterventionPayload, OfflineQueueItem } from "@/lib/offline/types";

let flushing = false;

function createQueueId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `offline-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export async function enqueueCreateIntervention(payload: CreateInterventionPayload) {
  const item: OfflineQueueItem = {
    id: createQueueId(),
    kind: "CREATE_INTERVENTION",
    status: "pending",
    retries: 0,
    createdAt: new Date().toISOString(),
    lastError: null,
    payload,
  };
  await addQueueItem(item);
  await registerBackgroundSyncIfAvailable();
  return item;
}

export async function listOfflineQueue() {
  const items = await getQueueItems();
  return items.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

async function sendQueueItem(item: OfflineQueueItem) {
  const basePath = process.env.NEXT_PUBLIC_APP_BASE_PATH || "/agri_app";

  const response = await fetch(`${basePath}/api/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [item] }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const json = await response.json();
  const result = json?.results?.[0];
  if (!result?.ok) {
    throw new Error(result?.error || "Sync fallita");
  }
}

export async function flushOfflineQueue() {
  if (typeof window === "undefined") return { sent: 0, failed: 0 };
  if (!navigator.onLine) return { sent: 0, failed: 0 };
  if (flushing) return { sent: 0, failed: 0 };

  flushing = true;
  try {
    const items = await listOfflineQueue();
    const syncable = items.filter((item) => item.status === "pending" || item.status === "failed");
    let sent = 0;
    let failed = 0;

    for (const item of syncable) {
      try {
        await updateQueueItem({ ...item, status: "processing", lastError: null });
        await sendQueueItem(item);
        await deleteQueueItem(item.id);
        sent++;
      } catch (error) {
        await updateQueueItem({
          ...item,
          status: "failed",
          retries: item.retries + 1,
          lastError: error instanceof Error ? error.message : "Errore sconosciuto",
        });
        failed++;
      }
    }

    return { sent, failed };
  } finally {
    flushing = false;
  }
}

export async function registerBackgroundSyncIfAvailable() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.ready;
    const withSync = registration as ServiceWorkerRegistration & {
      sync?: { register: (tag: string) => Promise<void> };
    };
    if (withSync.sync?.register) {
      await withSync.sync.register("agri-sync-queue");
    }
  } catch {
    // noop
  }
}
