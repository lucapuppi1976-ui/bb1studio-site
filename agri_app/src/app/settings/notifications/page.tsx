import { AppShell } from "@/components/app-shell";
import { getMyNotificationPreferences } from "@/lib/data/notification-preferences";
import { saveNotificationPreferences } from "@/lib/actions/notification-preferences";

type PageProps = {
  searchParams?: Promise<{
    saved?: string | string[] | undefined;
  }>;
};

function isSavedFlag(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] === "1";
  }

  return value === "1";
}

export default async function NotificationSettingsPage({
  searchParams,
}: PageProps) {
  const prefs = await getMyNotificationPreferences();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const saved = isSavedFlag(resolvedSearchParams?.saved);

  return (
    <AppShell title="Preferenze notifiche" eyebrow="Impostazioni utente">
      <div className="mx-auto max-w-3xl">
        {saved ? (
          <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            Preferenze salvate correttamente.
          </div>
        ) : null}

        <form action={saveNotificationPreferences} className="grid gap-6">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">
              Canali notifiche
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Per ora le notifiche in-app sono il canale attivo. Il flag email è
              già pronto per l’integrazione successiva.
            </p>

            <div className="mt-6 grid gap-4">
              <label className="flex items-center gap-3 text-white/80">
                <input
                  type="checkbox"
                  name="inAppEnabled"
                  defaultChecked={prefs.inAppEnabled}
                />
                <span>Notifiche in-app abilitate</span>
              </label>

              <label className="flex items-center gap-3 text-white/80">
                <input
                  type="checkbox"
                  name="emailEnabled"
                  defaultChecked={prefs.emailEnabled}
                />
                <span>Notifiche email abilitate</span>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">
              Eventi da notificare
            </h2>

            <div className="mt-6 grid gap-4">
              <label className="flex items-center gap-3 text-white/80">
                <input
                  type="checkbox"
                  name="taskDueToday"
                  defaultChecked={prefs.taskDueToday}
                />
                <span>Task in scadenza oggi</span>
              </label>

              <label className="flex items-center gap-3 text-white/80">
                <input
                  type="checkbox"
                  name="taskDueTomorrow"
                  defaultChecked={prefs.taskDueTomorrow}
                />
                <span>Task in scadenza domani</span>
              </label>

              <label className="flex items-center gap-3 text-white/80">
                <input
                  type="checkbox"
                  name="overdueTasks"
                  defaultChecked={prefs.overdueTasks}
                />
                <span>Task scaduti non completati</span>
              </label>

              <label className="flex items-center gap-3 text-white/80">
                <input
                  type="checkbox"
                  name="proposalUpdates"
                  defaultChecked={prefs.proposalUpdates}
                />
                <span>Aggiornamenti sulle proposte di intervento</span>
              </label>

              <label className="flex items-center gap-3 text-white/80">
                <input
                  type="checkbox"
                  name="systemMessages"
                  defaultChecked={prefs.systemMessages}
                />
                <span>Messaggi di sistema</span>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">
              Orario digest e fuso orario
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm text-white/70">Ora digest</span>
                <input
                  type="number"
                  min={0}
                  max={23}
                  name="dailyDigestHour"
                  defaultValue={prefs.dailyDigestHour}
                  className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm text-white/70">Timezone</span>
                <input
                  type="text"
                  name="timezone"
                  defaultValue={prefs.timezone}
                  className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                />
              </label>
            </div>
          </section>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:opacity-90"
            >
              Salva preferenze
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
