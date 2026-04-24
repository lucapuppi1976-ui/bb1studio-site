type Props = {
  taskId: string;
  proposedByUserId: string;
  action: (formData: FormData) => void | Promise<void>;
};

export function ProposalForm({ taskId, proposedByUserId, action }: Props) {
  return (
    <form action={action} className="grid gap-6">
      <input type="hidden" name="taskId" value={taskId} />
      <input type="hidden" name="proposedByUserId" value={proposedByUserId} />

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm text-white/70">Titolo proposta</span>
          <input
            name="title"
            required
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Tipo intervento</span>
          <select
            name="type"
            defaultValue="OTHER"
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          >
            {["IRRIGATION","PRUNING","FERTILIZATION","PHYTOSANITARY","MEASUREMENT","TRANSPLANT","HARVEST","OTHER"].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Data proposta</span>
          <input
            type="date"
            name="scheduledFor"
            required
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm text-white/70">Note</span>
          <textarea
            name="notes"
            rows={4}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>
      </div>

      <button type="submit" className="w-fit rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950">
        Invia proposta
      </button>
    </form>
  );
}
