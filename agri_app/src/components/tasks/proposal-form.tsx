import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { formatInterventionType } from "@/lib/i18n/labels";
import { getOperationalText, INTERVENTION_TYPE_OPTIONS } from "@/lib/i18n/operational";

type Props = {
  taskId: string;
  proposedByUserId: string;
  action: (formData: FormData) => void | Promise<void>;
  locale?: Locale;
};

export function ProposalForm({ taskId, proposedByUserId, action, locale = DEFAULT_LOCALE }: Props) {
  const op = getOperationalText(locale);

  return (
    <form action={action} className="grid gap-6">
      <input type="hidden" name="taskId" value={taskId} />
      <input type="hidden" name="proposedByUserId" value={proposedByUserId} />

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.proposalTitle}</span>
          <input name="title" required className="agri-input" />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.interventionType}</span>
          <select name="type" defaultValue="OTHER" className="agri-input">
            {INTERVENTION_TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>{formatInterventionType(type, locale)}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.proposedDate}</span>
          <input type="date" name="scheduledFor" required className="agri-input" />
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">{op.fields.notes}</span>
          <textarea name="notes" rows={4} className="agri-input" />
        </label>
      </div>

      <button type="submit" className="w-full sm:w-fit agri-button-primary">{op.actions.sendProposal}</button>
    </form>
  );
}
