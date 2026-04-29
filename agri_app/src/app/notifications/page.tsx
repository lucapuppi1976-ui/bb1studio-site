import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getNotificationCenterData } from "@/lib/data/notifications";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/actions/notifications";
import { requireUser } from "@/lib/authz";
import { routes } from "@/lib/app-routes";
import { getTranslations } from "@/lib/i18n/server";
import { toDateLocale } from "@/lib/i18n/config";
import { formatNotificationType } from "@/lib/i18n/labels";

function formatDateTime(value: Date, locale: string) {
  return new Date(value).toLocaleString(locale, { dateStyle: "short", timeStyle: "short" });
}

export default async function NotificationsPage() {
  const session = await requireUser();
  const { locale, t } = await getTranslations();
  const dateLocale = toDateLocale(locale);
  const { notifications, unreadCount, todayCount } = await getNotificationCenterData(session.user.id);

  return (
    <AppShell
      title={t.notices.title}
      eyebrow={t.notices.eyebrow}
      actions={
        <>
          <Link href={routes.settingsNotifications} className="agri-button-secondary">{t.notices.preferences}</Link>
          <form action={markAllNotificationsRead}>
            <button className="agri-button-primary">{t.notices.markAllRead}</button>
          </form>
        </>
      }
    >
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="agri-card">
          <p className="text-sm font-medium text-stone-500">{t.notices.unread}</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-emerald-950">{unreadCount}</p>
        </div>
        <div className="agri-card">
          <p className="text-sm font-medium text-stone-500">{t.notices.generatedToday}</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-emerald-950">{todayCount}</p>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="agri-card text-stone-600">{t.notices.empty}</div>
      ) : (
        <div className="grid gap-4">
          {notifications.map((notification) => (
            <article key={notification.id} className={`rounded-[1.75rem] border p-5 shadow-[0_20px_60px_rgba(28,37,25,0.08)] ring-1 ring-black/5 backdrop-blur ${notification.readAt ? "border-white/70 bg-white/80 text-stone-950" : "border-emerald-200 bg-emerald-50/95 text-stone-950"}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">{formatNotificationType(notification.type, locale)}</p>
                  <h2 className="mt-1 text-xl font-semibold text-stone-950">{notification.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{notification.message}</p>
                </div>
                <div className="text-right text-sm text-stone-500">
                  <p>{formatDateTime(notification.createdAt, dateLocale)}</p>
                  <p className="mt-2 font-medium text-stone-700">{notification.readAt ? t.notices.read : t.notices.unreadState}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {notification.href ? <Link href={notification.href} className="agri-button-secondary">{t.common.open}</Link> : null}
                {!notification.readAt ? (
                  <form action={markNotificationRead.bind(null, notification.id)}>
                    <button className="agri-button-primary">{t.notices.markRead}</button>
                  </form>
                ) : (
                  <span className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900">{t.notices.alreadyRead}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}
