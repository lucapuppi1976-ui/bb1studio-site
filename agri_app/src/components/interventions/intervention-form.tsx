import type { Intervention, Plant } from "@prisma/client";
import { ImageUploadField } from "@/components/media/image-upload-field";
import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { formatInterventionType } from "@/lib/i18n/labels";
import { getOperationalText, INTERVENTION_TYPE_OPTIONS } from "@/lib/i18n/operational";

type PlantLite = Pick<Plant, "id" | "code" | "name" | "species">;

type Props = {
  plant: PlantLite;
  intervention?: Intervention;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  locale?: Locale;
};

function dateValue(value?: Date | null) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

export function InterventionForm({ plant, intervention, action, submitLabel, locale = DEFAULT_LOCALE }: Props) {
  const op = getOperationalText(locale);

  return (
    <form action={action} className="grid gap-6">
      <input type="hidden" name="plantId" value={plant.id} />

      <div className="agri-card">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">{plant.code}</p>
        <p className="mt-1 text-lg font-semibold text-stone-950">{plant.name || plant.species}</p>
        <p className="text-sm text-stone-600">{plant.species}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.title}</span>
          <input name="title" defaultValue={intervention?.title ?? ""} required className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.type}</span>
          <select name="type" defaultValue={intervention?.type ?? "OTHER"} className="agri-input">
            {INTERVENTION_TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>{formatInterventionType(type, locale)}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.scheduledDate}</span>
          <input type="date" name="scheduledDate" defaultValue={dateValue(intervention?.scheduledDate)} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.completedDate}</span>
          <input type="date" name="completedAt" defaultValue={dateValue(intervention?.completedAt)} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.operator}</span>
          <input name="operatorName" defaultValue={intervention?.operatorName ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.waterLiters}</span>
          <input type="number" step="0.1" name="waterLiters" defaultValue={intervention?.waterLiters ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.productName}</span>
          <input name="productName" defaultValue={intervention?.productName ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.dosage}</span>
          <input name="dosage" defaultValue={intervention?.dosage ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.height}</span>
          <input type="number" step="0.1" name="heightCm" defaultValue={intervention?.heightCm ?? ""} className="agri-input" />
        </label>

        <ImageUploadField label={op.fields.beforePhoto} inputName="beforeImageUrl" defaultValue={intervention?.beforeImageUrl} />

        <div className="md:col-span-2">
          <ImageUploadField label={op.fields.afterPhoto} inputName="afterImageUrl" defaultValue={intervention?.afterImageUrl} />
        </div>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.description}</span>
          <textarea name="description" rows={4} defaultValue={intervention?.description ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.notes}</span>
          <textarea name="notes" rows={4} defaultValue={intervention?.notes ?? ""} className="agri-input" />
        </label>
      </div>

      <button type="submit" className="w-full sm:w-fit agri-button-primary">{submitLabel}</button>
    </form>
  );
}
