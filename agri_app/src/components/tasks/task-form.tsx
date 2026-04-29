import type { Task, User } from "@prisma/client";
import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { formatTaskPriority, formatTaskStatus } from "@/lib/i18n/labels";
import { getOperationalText, PRIORITY_OPTIONS, TASK_STATUS_OPTIONS } from "@/lib/i18n/operational";

type Props = {
  task?: Task;
  plantId: string;
  users?: User[];
  createdByUserId?: string;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  locale?: Locale;
};

function dateValue(value?: Date | null) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

export function TaskForm({ task, plantId, users = [], createdByUserId, action, submitLabel, locale = DEFAULT_LOCALE }: Props) {
  const op = getOperationalText(locale);

  return (
    <form action={action} className="grid gap-6">
      <input type="hidden" name="plantId" value={plantId} />
      {createdByUserId ? <input type="hidden" name="createdByUserId" value={createdByUserId} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.title}</span>
          <input name="title" required defaultValue={task?.title ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.description}</span>
          <textarea name="description" rows={4} defaultValue={task?.description ?? ""} className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.dueDate}</span>
          <input type="date" name="dueDate" defaultValue={dateValue(task?.dueDate)} required className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.priority}</span>
          <select name="priority" defaultValue={task?.priority ?? "RECOMMENDED"} className="agri-input">
            {PRIORITY_OPTIONS.map((priority) => (
              <option key={priority} value={priority}>{formatTaskPriority(priority, locale)}</option>
            ))}
          </select>
        </label>

        {task ? (
          <label className="grid gap-2">
            <span className="text-sm font-medium text-stone-700">{op.fields.status}</span>
            <select name="status" defaultValue={task.status ?? "SCHEDULED"} className="agri-input">
              {TASK_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>{formatTaskStatus(status, locale)}</option>
              ))}
            </select>
          </label>
        ) : null}

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.assignTo}</span>
          <select name="assignedToUserId" defaultValue={task?.assignedToUserId ?? ""} className="agri-input">
            <option value="">{op.messages.notAssigned}</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name || user.email}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.notes}</span>
          <textarea name="notes" rows={4} defaultValue={task?.notes ?? ""} className="agri-input" />
        </label>
      </div>

      <button type="submit" className="w-full sm:w-fit agri-button-primary">{submitLabel}</button>
    </form>
  );
}
