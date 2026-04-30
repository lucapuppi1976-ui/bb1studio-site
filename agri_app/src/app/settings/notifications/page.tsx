import { AppShell } from "@/components/app-shell";
import { getMyNotificationPreferences } from "@/lib/data/notification-preferences";
import { saveNotificationPreferences } from "@/lib/actions/notification-preferences";
import { getTranslations } from "@/lib/i18n/server";
import { LOCALE_LABELS, LOCALES } from "@/lib/i18n/config";
import { getNotificationHubText } from "@/lib/i18n/notifications-hub";
import { emailNotificationsEnabled } from "@/lib/env.server";

type PageProps = { searchParams?: Promise<{ saved?: string | string[] }> };

function isSavedFlag(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] === "1" : value === "1";
}

export default async function NotificationSettingsPage({ searchParams }: PageProps) {
  const prefs = await getMyNotificationPreferences();
  const { locale, t } = await getTranslations();
  const copy = getNotificationHubText(locale);
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const saved = isSavedFlag(resolvedSearchParams?.saved);
  const checkboxClass = "h-4 w-4 rounded border-stone-300 text-emerald-900 accent-emerald-900";

  return (
    <AppShell title={t.notificationSettings.title} eyebrow={t.notificationSettings.eyebrow}>
      <div className="mx-auto max-w-4xl">
        {saved ? <div className="mb-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-900 shadow-sm">{t.notificationSettings.saved}</div> : null}

        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <section className="agri-card">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{copy.settings.channelStatus}</p>
            <h2 className="mt-2 text-xl font-semibold text-stone-950">{t.notificationSettings.channelsTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">{copy.settings.inAppActive}</p>
          </section>
          <section className="agri-card">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Email</p>
            <h2 className="mt-2 text-xl font-semibold text-stone-950">{emailNotificationsEnabled ? copy.settings.emailOn : copy.settings.emailOff}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">{copy.settings.emailPrepared}</p>
          </section>
        </div>

        <form action={saveNotificationPreferences} className="grid gap-6">
          <section className="agri-card">
            <h2 className="text-xl font-semibold text-stone-950">{t.notificationSettings.channelsTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">{t.notificationSettings.channelsDescription}</p>
            <div className="mt-6 grid gap-4">
              <label className="flex items-start gap-3 text-stone-700">
                <input className={`${checkboxClass} mt-1`} type="checkbox" name="inAppEnabled" defaultChecked={prefs.inAppEnabled} />
                <span>{t.notificationSettings.inAppEnabled}</span>
              </label>
              <label className="flex items-start gap-3 text-stone-700">
                <input className={`${checkboxClass} mt-1`} type="checkbox" name="emailEnabled" defaultChecked={prefs.emailEnabled} />
                <span>{t.notificationSettings.emailEnabled}</span>
              </label>
            </div>
          </section>

          <section className="agri-card">
            <h2 className="text-xl font-semibold text-stone-950">{t.notificationSettings.eventsTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">{copy.settings.eventsDescription}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="flex items-start gap-3 text-stone-700"><input className={`${checkboxClass} mt-1`} type="checkbox" name="taskDueToday" defaultChecked={prefs.taskDueToday} /><span>{t.notificationSettings.taskDueToday}</span></label>
              <label className="flex items-start gap-3 text-stone-700"><input className={`${checkboxClass} mt-1`} type="checkbox" name="taskDueTomorrow" defaultChecked={prefs.taskDueTomorrow} /><span>{t.notificationSettings.taskDueTomorrow}</span></label>
              <label className="flex items-start gap-3 text-stone-700"><input className={`${checkboxClass} mt-1`} type="checkbox" name="overdueTasks" defaultChecked={prefs.overdueTasks} /><span>{t.notificationSettings.overdueTasks}</span></label>
              <label className="flex items-start gap-3 text-stone-700"><input className={`${checkboxClass} mt-1`} type="checkbox" name="proposalUpdates" defaultChecked={prefs.proposalUpdates} /><span>{t.notificationSettings.proposalUpdates}</span></label>
              <label className="flex items-start gap-3 text-stone-700 sm:col-span-2"><input className={`${checkboxClass} mt-1`} type="checkbox" name="systemMessages" defaultChecked={prefs.systemMessages} /><span>{t.notificationSettings.systemMessages}</span></label>
            </div>
          </section>

          <section className="agri-card">
            <h2 className="text-xl font-semibold text-stone-950">{t.notificationSettings.scheduleTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">{copy.settings.scheduleDescription}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-stone-700">{t.notificationSettings.dailyDigestHour}</span>
                <input type="number" min={0} max={23} name="dailyDigestHour" defaultValue={prefs.dailyDigestHour} className="agri-input" />
                <span className="text-xs leading-5 text-stone-500">{copy.settings.digestHelp}</span>
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-stone-700">{t.notificationSettings.timezone}</span>
                <input type="text" name="timezone" defaultValue={prefs.timezone} className="agri-input" />
                <span className="text-xs leading-5 text-stone-500">{copy.settings.timezoneHelp}</span>
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-stone-700">{t.notificationSettings.locale}</span>
                <select name="locale" defaultValue={prefs.locale || locale} className="agri-input">{LOCALES.map((item) => <option key={item} value={item}>{LOCALE_LABELS[item]}</option>)}</select>
                <span className="text-xs leading-5 text-stone-500">{copy.settings.localeHelp}</span>
              </label>
            </div>
          </section>

          <div className="flex gap-3">
            <button type="submit" className="agri-button-primary px-5 py-3">{t.common.saveChanges}</button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
