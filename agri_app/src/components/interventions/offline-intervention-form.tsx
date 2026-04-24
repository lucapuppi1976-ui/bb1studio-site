"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { enqueueCreateIntervention, flushOfflineQueue } from "@/lib/offline/queue";

type Props = {
  plant: {
    id: string;
    code: string;
    name: string | null;
    species: string;
  };
};

function parseNumber(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string" || !value.trim()) return null;
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? null : parsed;
}

export function OfflineInterventionForm({ plant }: Props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData(event.currentTarget);

      await enqueueCreateIntervention({
        plantId: plant.id,
        type: String(formData.get("type") || "OTHER"),
        title: String(formData.get("title") || "").trim(),
        description: String(formData.get("description") || "").trim() || null,
        scheduledDate: String(formData.get("scheduledDate") || "").trim() || null,
        completedAt: String(formData.get("completedAt") || "").trim() || null,
        operatorName: String(formData.get("operatorName") || "").trim() || null,
        beforeImageUrl: String(formData.get("beforeImageUrl") || "").trim() || null,
        afterImageUrl: String(formData.get("afterImageUrl") || "").trim() || null,
        waterLiters: parseNumber(formData.get("waterLiters")),
        productName: String(formData.get("productName") || "").trim() || null,
        dosage: String(formData.get("dosage") || "").trim() || null,
        heightCm: parseNumber(formData.get("heightCm")),
        notes: String(formData.get("notes") || "").trim() || null,
      });

      if (navigator.onLine) {
        await flushOfflineQueue();
        setMessage("Intervento sincronizzato correttamente.");
      } else {
        setMessage("Intervento salvato offline. Verrà sincronizzato appena torna la rete.");
      }

      (event.currentTarget).reset();
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Errore durante il salvataggio.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
        <p className="text-xs uppercase tracking-wide text-white/40">{plant.code}</p>
        <p className="mt-1 text-lg font-semibold text-white">{plant.name || plant.species}</p>
        <p className="text-white/60">{plant.species}</p>
      </div>

      {message ? <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">{message}</div> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm text-white/70">Titolo</span>
          <input name="title" required className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/70">Tipo</span>
          <select name="type" defaultValue="OTHER" className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none">
            {["IRRIGATION","PRUNING","FERTILIZATION","PHYTOSANITARY","MEASUREMENT","TRANSPLANT","HARVEST","OTHER"].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/70">Data pianificata</span>
          <input type="date" name="scheduledDate" className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/70">Operatore</span>
          <input name="operatorName" className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none" />
        </label>
        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm text-white/70">Descrizione</span>
          <textarea name="description" rows={4} className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none" />
        </label>
        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm text-white/70">Note</span>
          <textarea name="notes" rows={4} className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none" />
        </label>
      </div>

      <button type="submit" disabled={loading} className="w-fit rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 disabled:opacity-50">
        {loading ? "Salvataggio..." : "Salva in coda offline"}
      </button>
    </form>
  );
}
