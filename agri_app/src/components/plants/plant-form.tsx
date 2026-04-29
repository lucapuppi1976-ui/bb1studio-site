import type { Plant } from "@prisma/client";
import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { formatEnvironment, formatPlantStatus, formatPlantType } from "@/lib/i18n/labels";
import { ENVIRONMENT_OPTIONS, getOperationalText, PLANT_STATUS_OPTIONS, PLANT_TYPE_OPTIONS } from "@/lib/i18n/operational";

type Props = {
  plant?: Plant;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  locale?: Locale;
};

function dateValue(value?: Date | null) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

export function PlantForm({ plant, action, submitLabel, locale = DEFAULT_LOCALE }: Props) {
  const op = getOperationalText(locale);

  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.code}</span>
          <input name="code" required defaultValue={plant?.code ?? ""} className="agri-input" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.name}</span>
          <input name="name" defaultValue={plant?.name ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.type}</span>
          <select name="type" defaultValue={plant?.type ?? "PLANT"} className="agri-input">
            {PLANT_TYPE_OPTIONS.map((type) => <option key={type} value={type}>{formatPlantType(type, locale)}</option>)}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.environment}</span>
          <select name="environment" defaultValue={plant?.environment ?? "INDOOR"} className="agri-input">
            {ENVIRONMENT_OPTIONS.map((environment) => <option key={environment} value={environment}>{formatEnvironment(environment, locale)}</option>)}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.species}</span>
          <input name="species" required defaultValue={plant?.species ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.variety}</span>
          <input name="variety" defaultValue={plant?.variety ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.sowingDate}</span>
          <input type="date" name="sowingDate" defaultValue={dateValue(plant?.sowingDate)} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.germinationDate}</span>
          <input type="date" name="germinationDate" defaultValue={dateValue(plant?.germinationDate)} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.transplantDate}</span>
          <input type="date" name="transplantDate" defaultValue={dateValue(plant?.transplantDate)} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.potSize}</span>
          <input type="number" step="0.1" name="potSizeLiters" defaultValue={plant?.potSizeLiters ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.substrate}</span>
          <input name="substrate" defaultValue={plant?.substrate ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.height}</span>
          <input type="number" step="0.1" name="heightCm" defaultValue={plant?.heightCm ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.diameter}</span>
          <input type="number" step="0.1" name="diameterMm" defaultValue={plant?.diameterMm ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.zone}</span>
          <input name="zoneName" defaultValue={plant?.zoneName ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.latitude}</span>
          <input type="number" step="0.000001" name="latitude" defaultValue={plant?.latitude ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.longitude}</span>
          <input type="number" step="0.000001" name="longitude" defaultValue={plant?.longitude ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.status}</span>
          <select name="status" defaultValue={plant?.status ?? "ACTIVE"} className="agri-input">
            {PLANT_STATUS_OPTIONS.map((status) => <option key={status} value={status}>{formatPlantStatus(status, locale)}</option>)}
          </select>
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.notes}</span>
          <textarea name="notes" rows={4} defaultValue={plant?.notes ?? ""} className="agri-input" />
        </label>
      </div>

      <button type="submit" className="w-full sm:w-fit agri-button-primary">{submitLabel}</button>
    </form>
  );
}
