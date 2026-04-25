import { AppShell } from "@/components/app-shell";
import { updateNotificationPreferences } from "@/lib/actions/notification-preferences";
import { getNotificationPreferenceForUser } from "@/lib/data/notifications";
import { requireUser } from "@/lib/authz";

export default async function NotificationSettingsPage() {
  const session = await requireUser();
  const prefs = await getNotificationPreferenceForUser(session.user.id);

  return (
    <AppShell title="Preferenze notifiche" eyebrow="Impostazioni personali">
      <form action={updateNotificationPreferences} className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-white">Notifiche in-app</p>
                <p className="mt-1 text-sm text-white/60">Mostra notifiche nel centro notifiche dell’app.</p>
              </div>
              <input type="checkbox" name="inAppEnabled" defaultChecked={prefs.inAppEnabled} className="h-5 w-5" />
            </div>
          </label>

          <label className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-white">Email</p>
                <p className="mt-1 text-sm text-white/60">Preferenza salvata. Invio email sarà attivato nel prossimo step.</p>
              </div>
              <input type="checkbox" name="emailEnabled" defaultChecked={prefs.emailEnabled} className="h-5 w-5" />
            </div>
          </label>

          <label className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-white">Task di oggi</p>
                <p className="mt-1 text-sm text-white/60">Avvisi per attività da svolgere nella giornata corrente.</p>
              </div>
              <input type="checkbox" name="taskDueToday" defaultChecked={prefs.taskDueToday} className="h-5 w-5" />
            </div>
          </label>

          <label className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-white">Task di domani</p>
                <p className="mt-1 text-sm text-white/60">Promemoria preventivo per il giorno successivo.</p>
              </div>
              <input type="checkbox" name="taskDueTomorrow" defaultChecked={prefs.taskDueTomorrow} className="h-5 w-5" />
            </div>
          </label>

          <label className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-white">Task scaduti</p>
                <p className="mt-1 text-sm text-white/60">Segnala le attività non completate e già scadute.</p>
              </div>
              <input type="checkbox" name="overdueTasks" defaultChecked={prefs.overdueTasks} className="h-5 w-5" />
            </div>
          </label>

          <label className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-white">Approvazioni</p>
                <p className="mt-1 text-sm text-white/60">Aggiornamenti quando una proposta viene approvata o rifiutata.</p>
              </div>
              <input type="checkbox" name="proposalUpdates" defaultChecked={prefs.proposalUpdates} className="h-5 w-5" />
            </div>
          </label>

          <label className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
            <div className="grid gap-2">
              <span className="font-medium text-white">Fuso orario</span>
              <input
                name="timezone"
                defaultValue={prefs.timezone}
                className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
              />
            </div>
          </label>

          <label className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
            <div className="grid gap-2">
              <span className="font-medium text-white">Ora digest giornaliero</span>
              <input
                type="number"
                min="0"
                max="23"
                name="dailyDigestHour"
                defaultValue={prefs.dailyDigestHour}
                className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
              />
              <p className="text-sm text-white/50">Per ora usata come preferenza salvata per la routine giornaliera.</p>
            </div>
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950"
          >
            Salva preferenze
          </button>
        </div>
      </form>
    </AppShell>
  );
}
