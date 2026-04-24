import { Plant } from "@prisma/client";

type Props = {
  plant?: Plant;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
};

function dateValue(value?: Date | null) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

export function PlantForm({ plant, action, submitLabel }: Props) {
  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm text-white/70">Codice</span>
          <input
            name="code"
            required
            defaultValue={plant?.code ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/70">Nome</span>
          <input
            name="name"
            defaultValue={plant?.name ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Tipo</span>
          <select
            name="type"
            defaultValue={plant?.type ?? "PLANT"}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          >
            <option value="PLANT">PLANT</option>
            <option value="TREE">TREE</option>
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Ambiente</span>
          <select
            name="environment"
            defaultValue={plant?.environment ?? "INDOOR"}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          >
            <option value="INDOOR">INDOOR</option>
            <option value="OUTDOOR">OUTDOOR</option>
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Specie</span>
          <input
            name="species"
            required
            defaultValue={plant?.species ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Varietà</span>
          <input
            name="variety"
            defaultValue={plant?.variety ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Data semina</span>
          <input
            type="date"
            name="sowingDate"
            defaultValue={dateValue(plant?.sowingDate)}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Data germinazione</span>
          <input
            type="date"
            name="germinationDate"
            defaultValue={dateValue(plant?.germinationDate)}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Data trapianto</span>
          <input
            type="date"
            name="transplantDate"
            defaultValue={dateValue(plant?.transplantDate)}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Vaso (L)</span>
          <input
            type="number"
            step="0.1"
            name="potSizeLiters"
            defaultValue={plant?.potSizeLiters ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Substrato</span>
          <input
            name="substrate"
            defaultValue={plant?.substrate ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Altezza (cm)</span>
          <input
            type="number"
            step="0.1"
            name="heightCm"
            defaultValue={plant?.heightCm ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Diametro (mm)</span>
          <input
            type="number"
            step="0.1"
            name="diameterMm"
            defaultValue={plant?.diameterMm ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Zona</span>
          <input
            name="zoneName"
            defaultValue={plant?.zoneName ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Latitudine</span>
          <input
            type="number"
            step="0.000001"
            name="latitude"
            defaultValue={plant?.latitude ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Longitudine</span>
          <input
            type="number"
            step="0.000001"
            name="longitude"
            defaultValue={plant?.longitude ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Stato</span>
          <select
            name="status"
            defaultValue={plant?.status ?? "ACTIVE"}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="ARCHIVED">ARCHIVED</option>
            <option value="REMOVED">REMOVED</option>
          </select>
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm text-white/70">Note</span>
          <textarea
            name="notes"
            rows={4}
            defaultValue={plant?.notes ?? ""}
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
