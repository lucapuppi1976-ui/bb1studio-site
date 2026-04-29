"use client";

import { useEffect, useMemo, useState } from "react";
import { flushOfflineQueue, listOfflineQueue } from "@/lib/offline/queue";
import type { OfflineQueueItem } from "@/lib/offline/types";
import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { getOperationalText, lookupText } from "@/lib/i18n/operational";

type Props = {
  locale?: Locale;
};

export function OfflineQueuePanel({ locale = DEFAULT_LOCALE }: Props) {
  const op = getOperationalText(locale);
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
      setMessage(`${op.messages.syncDone} ${op.messages.sent}: ${result.sent}. ${op.messages.failed}: ${result.failed}.`);
      await reload();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : op.messages.syncError);
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
      <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-stone-700 shadow-sm">{op.queue.total}: {stats.total}</span>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-stone-700 shadow-sm">{op.queue.pending}: {stats.pending}</span>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-stone-700 shadow-sm">{op.queue.failed}: {stats.failed}</span>
        <button onClick={syncNow} disabled={syncing} className="agri-button-primary sm:ml-auto">
          {syncing ? op.actions.syncing : op.actions.syncNow}
        </button>
      </div>

      {message ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">{message}</div> : null}

      {items.length === 0 ? (
        <div className="rounded-[1.75rem] border border-dashed border-stone-300 bg-white/70 p-6 text-sm text-stone-600">
          {op.messages.queueEmpty}
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <article key={item.id} className="agri-card">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">{lookupText(op.queue.operations, item.kind)}</p>
                  <h2 className="mt-1 text-lg font-semibold text-stone-950">{item.payload.title}</h2>
                  <p className="text-sm text-stone-600">{op.queue.plantId}: {item.payload.plantId}</p>
                </div>
                <span className="rounded-full border border-emerald-900/10 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-950">
                  {lookupText(op.queue.statuses, item.status)}
                </span>
              </div>
              {item.lastError ? <p className="mt-3 text-sm text-rose-700">{item.lastError}</p> : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
