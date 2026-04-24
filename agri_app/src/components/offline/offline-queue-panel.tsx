"use client";

import { useEffect, useMemo, useState } from "react";
import { flushOfflineQueue, listOfflineQueue } from "@/lib/offline/queue";
import type { OfflineQueueItem } from "@/lib/offline/types";

export function OfflineQueuePanel() {
  const [items, setItems] = useState<OfflineQueueItem[]>([]);
  const [message, setMessage] = useState("");
  const [syncing, setSyncing] = useState(false);

  async function reload() {
    setItems(await listOfflineQueue());
  }

  useEffect(() => {
    reload().catch(() => undefined);
    const onOnline = () => reload();
    const onOffline = () => reload();
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  async function syncNow() {
    setSyncing(true);
    try {
      const result = await flushOfflineQueue();
      setMessage(`Sync completata. Inviati: ${result.sent}. Falliti: ${result.failed}.`);
      await reload();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Errore di sync");
    } finally {
      setSyncing(false);
    }
  }

  const stats = useMemo(() => ({
    total: items.length,
    failed: items.filter((i) => i.status === "failed").length,
    pending: items.filter((i) => i.status === "pending").length,
  }), [items]);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-white/70">Total: {stats.total}</span>
        <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-white/70">Pending: {stats.pending}</span>
        <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-white/70">Failed: {stats.failed}</span>
        <button
          onClick={syncNow}
          disabled={syncing}
          className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950 disabled:opacity-50"
        >
          {syncing ? "Sync..." : "Sincronizza ora"}
        </button>
      </div>

      {message ? <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">{message}</div> : null}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-white/50">
          Nessuna operazione in coda.
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">{item.kind}</p>
                  <h2 className="mt-1 text-lg font-semibold text-white">{item.payload.title}</h2>
                  <p className="text-sm text-white/60">Plant ID: {item.payload.plantId}</p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">{item.status}</span>
              </div>
              {item.lastError ? <p className="mt-3 text-sm text-rose-300">Errore: {item.lastError}</p> : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
