import type { OfflineQueueItem } from "@/lib/offline/types";

const DB_NAME = "agri-app-offline";
const DB_VERSION = 1;
const STORE_NAME = "queue";

function assertBrowser() {
  if (typeof window === "undefined" || !("indexedDB" in window)) {
    throw new Error("IndexedDB non disponibile in questo contesto.");
  }
}

export function openOfflineDb(): Promise<IDBDatabase> {
  assertBrowser();

  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("status", "status", { unique: false });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore<T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => void | Promise<T>): Promise<T> {
  const db = await openOfflineDb();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, mode);
    const store = tx.objectStore(STORE_NAME);
    Promise.resolve(fn(store))
      .then((result) => {
        tx.oncomplete = () => resolve(result as T);
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
      })
      .catch(reject);
  });
}

export async function addQueueItem(item: OfflineQueueItem) {
  return withStore("readwrite", (store) => {
    store.put(item);
  });
}

export async function updateQueueItem(item: OfflineQueueItem) {
  return withStore("readwrite", (store) => {
    store.put(item);
  });
}

export async function deleteQueueItem(id: string) {
  return withStore("readwrite", (store) => {
    store.delete(id);
  });
}

export async function getQueueItems(): Promise<OfflineQueueItem[]> {
  return withStore("readonly", (store) => {
    return new Promise<OfflineQueueItem[]>((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve((request.result as OfflineQueueItem[]) || []);
      request.onerror = () => reject(request.error);
    });
  });
}
