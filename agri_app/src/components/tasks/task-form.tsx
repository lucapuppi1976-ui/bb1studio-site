import { Task, User } from "@prisma/client";

type Props = {
  task?: Task;
  plantId: string;
  users?: User[];
  createdByUserId?: string;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
};

function dateValue(value?: Date | null) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

export function TaskForm({ task, plantId, users = [], createdByUserId, action, submitLabel }: Props) {
  return (
    <form action={action} className="grid gap-6">
      <input type="hidden" name="plantId" value={plantId} />
      {createdByUserId ? <input type="hidden" name="createdByUserId" value={createdByUserId} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm text-white/70">Titolo</span>
          <input
            name="title"
            required
            defaultValue={task?.title ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm text-white/70">Descrizione</span>
          <textarea
            name="description"
            rows={4}
            defaultValue={task?.description ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Scadenza</span>
          <input
            type="date"
            name="dueDate"
            defaultValue={dateValue(task?.dueDate)}
            required
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Priorità</span>
          <select
            name="priority"
            defaultValue={task?.priority ?? "RECOMMENDED"}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          >
            <option value="MANDATORY">MANDATORY</option>
            <option value="RECOMMENDED">RECOMMENDED</option>
          </select>
        </label>

        {task ? (
          <label className="grid gap-2">
            <span className="text-sm text-white/70">Stato</span>
            <select
              name="status"
              defaultValue={task?.status ?? "SCHEDULED"}
              className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
            >
              {["SCHEDULED","NOTIFIED","DONE","SKIPPED","EXPIRED"].map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>
        ) : null}

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Assegna a</span>
          <select
            name="assignedToUserId"
            defaultValue={task?.assignedToUserId ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          >
            <option value="">Nessuno</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name || user.email}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm text-white/70">Note</span>
          <textarea
            name="notes"
            rows={4}
            defaultValue={task?.notes ?? ""}
            className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          />
        </label>
      </div>

      <button type="submit" className="w-fit rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950">
        {submitLabel}
      </button>
    </form>
  );
}
