"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { enqueueCreateIntervention, flushOfflineQueue } from "@/lib/offline/queue";
import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { formatInterventionType } from "@/lib/i18n/labels";
import { getOperationalText, INTERVENTION_TYPE_OPTIONS } from "@/lib/i18n/operational";

type Props = {
  plant: {
    id: string;
    code: string;
    name: string | null;
    species: string;
  };
  locale?: Locale;
};

function parseNumber(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string" || !value.trim()) return null;
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? null : parsed;
}

export function OfflineInterventionForm({ plant, locale = DEFAULT_LOCALE }: Props) {
  const op = getOperationalText(locale);
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
        setMessage(op.messages.offlineSynced);
      } else {
        setMessage(op.messages.offlineSaved);
      }

      event.currentTarget.reset();
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : op.messages.saveError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div className="agri-card">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">{plant.code}</p>
        <p className="mt-1 text-lg font-semibold text-stone-950">{plant.name || plant.species}</p>
        <p className="text-sm text-stone-600">{plant.species}</p>
      </div>

      {message ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">{message}</div> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.title}</span>
          <input name="title" required className="agri-input" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.type}</span>
          <select name="type" defaultValue="OTHER" className="agri-input">
            {INTERVENTION_TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>{formatInterventionType(type, locale)}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.scheduledDate}</span>
          <input type="date" name="scheduledDate" className="agri-input" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.operator}</span>
          <input name="operatorName" className="agri-input" />
        </label>
        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.description}</span>
          <textarea name="description" rows={4} className="agri-input" />
        </label>
        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.notes}</span>
          <textarea name="notes" rows={4} className="agri-input" />
        </label>
      </div>

      <button type="submit" disabled={loading} className="w-full sm:w-fit agri-button-primary">
        {loading ? op.actions.saving : op.actions.saveOffline}
      </button>
    </form>
  );
}
