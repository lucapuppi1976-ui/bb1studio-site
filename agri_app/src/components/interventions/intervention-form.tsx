import { Intervention, Plant } from "@prisma/client";
import { ImageUploadField } from "@/components/media/image-upload-field";

type PlantLite = Pick<Plant, "id" | "code" | "name" | "species">;

type Props = {
  plant: PlantLite;
  intervention?: Intervention;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
};

function dateValue(value?: Date | null) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

export function InterventionForm({ plant, intervention, action, submitLabel }: Props) {
  return (
    <form action={action} className="grid gap-6">
      <input type="hidden" name="plantId" value={plant.id} />

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
        <p className="text-xs uppercase tracking-wide text-white/40">{plant.code}</p>
        <p className="mt-1 text-lg font-semibold text-white">{plant.name || plant.species}</p>
        <p className="text-white/60">{plant.species}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm text-white/70">Titolo</span>
          <input
            name="title"
            defaultValue={intervention?.title ?? ""}
            required
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Tipo</span>
          <select
            name="type"
            defaultValue={intervention?.type ?? "OTHER"}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          >
            {["IRRIGATION","PRUNING","FERTILIZATION","PHYTOSANITARY","MEASUREMENT","TRANSPLANT","HARVEST","OTHER"].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Data pianificata</span>
          <input
            type="date"
            name="scheduledDate"
            defaultValue={dateValue(intervention?.scheduledDate)}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Data completamento</span>
          <input
            type="date"
            name="completedAt"
            defaultValue={dateValue(intervention?.completedAt)}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Operatore</span>
          <input
            name="operatorName"
            defaultValue={intervention?.operatorName ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Litri acqua</span>
          <input
            type="number"
            step="0.1"
            name="waterLiters"
            defaultValue={intervention?.waterLiters ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Prodotto</span>
          <input
            name="productName"
            defaultValue={intervention?.productName ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Dosaggio</span>
          <input
            name="dosage"
            defaultValue={intervention?.dosage ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Altezza (cm)</span>
          <input
            type="number"
            step="0.1"
            name="heightCm"
            defaultValue={intervention?.heightCm ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <ImageUploadField
          label="Foto prima"
          inputName="beforeImageUrl"
          defaultValue={intervention?.beforeImageUrl}
        />

        <div className="md:col-span-2">
          <ImageUploadField
            label="Foto dopo"
            inputName="afterImageUrl"
            defaultValue={intervention?.afterImageUrl}
          />
        </div>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm text-white/70">Descrizione</span>
          <textarea
            name="description"
            rows={4}
            defaultValue={intervention?.description ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm text-white/70">Note</span>
          <textarea
            name="notes"
            rows={4}
            defaultValue={intervention?.notes ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-fit rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950"
      >
        {submitLabel}
      </button>
    </form>
  );
}
