import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getNotificationCenterData } from "@/lib/data/notifications";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/actions/notifications";
import { requireUser } from "@/lib/authz";
import { routes } from "@/lib/app-routes";
import { getTranslations } from "@/lib/i18n/server";
import { toDateLocale } from "@/lib/i18n/config";
import { formatNotificationType } from "@/lib/i18n/labels";
import { getNotificationHubText, notificationScopes, type NotificationScope } from "@/lib/i18n/notifications-hub";

type PageProps = {
  searchParams?: Promise<{
    scope?: string | string[];
    q?: string | string[];
  }>;
};

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeScope(value: string | string[] | undefined): NotificationScope {
  const scope = one(value);
  return notificationScopes.includes(scope as NotificationScope) ? (scope as NotificationScope) : "all";
}

function formatDateTime(value: Date, locale: string) {
  return new Date(value).toLocaleString(locale, { dateStyle: "short", timeStyle: "short" });
}

function hrefFor(scope: NotificationScope, q: string) {
  const params = new URLSearchParams();
  if (scope !== "all") params.set("scope", scope);
  if (q) params.set("q", q);
  const query = params.toString();
  return `${routes.notifications}${query ? `?${query}` : ""}`;
}

function matchesScope(notification: { type: string; readAt: Date | null }, scope: NotificationScope) {
  if (scope === "all") return true;
  if (scope === "unread") return !notification.readAt;
  if (scope === "task") return notification.type === "TASK";
  if (scope === "approval") return notification.type === "APPROVAL";
  if (scope === "system") return notification.type === "SYSTEM" || notification.type === "INFO";
  return true;
}

export default async function NotificationsPage({ searchParams }: PageProps) {
  const session = await requireUser();
  const { locale, t } = await getTranslations();
  const copy = getNotificationHubText(locale);
  const dateLocale = toDateLocale(locale);
  const params = searchParams ? await searchParams : undefined;
  const scope = normalizeScope(params?.scope);
  const q = (one(params?.q) || "").trim();
  const query = q.toLowerCase();
  const { notifications, totalCount, unreadCount, todayCount, taskCount, approvalCount } = await getNotificationCenterData(session.user.id);
  const filteredNotifications = notifications.filter((notification) => {
    if (!matchesScope(notification, scope)) return false;
    if (!query) return true;

    return [notification.title, notification.message, notification.type]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));
  });

  const metrics = [
    { label: copy.metrics.all, value: totalCount, href: hrefFor("all", q) },
    { label: copy.metrics.unread, value: unreadCount, href: hrefFor("unread", q) },
    { label: copy.metrics.today, value: todayCount, href: hrefFor("all", q) },
    { label: copy.metrics.task, value: taskCount, href: hrefFor("task", q) },
    { label: copy.metrics.approval, value: approvalCount, href: hrefFor("approval", q) },
  ];

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
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric) => (
          <Link key={metric.label} href={metric.href} className="agri-card p-4 transition hover:-translate-y-0.5 hover:bg-white">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{metric.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-emerald-950">{metric.value}</p>
          </Link>
        ))}
      </div>

      <section className="mt-6 agri-card">
        <form className="grid gap-3 lg:grid-cols-[1fr_auto]" action={routes.notifications}>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-stone-700">{copy.search.label}</span>
            <input className="agri-input" name="q" defaultValue={q} placeholder={copy.search.placeholder} />
          </label>
          <input type="hidden" name="scope" value={scope === "all" ? "" : scope} />
          <div className="flex items-end gap-2">
            <button className="w-full agri-button-primary lg:w-auto" type="submit">{copy.search.button}</button>
            {q || scope !== "all" ? <Link href={routes.notifications} className="w-full agri-button-secondary text-center lg:w-auto">{copy.search.clear}</Link> : null}
          </div>
        </form>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {notificationScopes.map((item) => {
            const active = item === scope;
            return (
              <Link
                key={item}
                href={hrefFor(item, q)}
                className={active ? "rounded-full bg-emerald-950 px-4 py-2 text-sm font-semibold text-white shadow-sm" : "rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm transition hover:border-emerald-300"}
              >
                {copy.filters[item]}
              </Link>
            );
          })}
        </div>
      </section>

      <div className="mt-6">
        {filteredNotifications.length === 0 ? (
          <div className="agri-card text-stone-700">
            <h2 className="text-lg font-semibold text-stone-950">{copy.empty.title}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">{copy.empty.body}</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredNotifications.map((notification) => (
              <article key={notification.id} className={`rounded-[1.75rem] border p-4 shadow-[0_20px_60px_rgba(28,37,25,0.08)] ring-1 ring-black/5 backdrop-blur sm:p-5 ${notification.readAt ? "border-white/70 bg-white/80 text-stone-950" : "border-emerald-200 bg-emerald-50/95 text-stone-950"}`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900">{formatNotificationType(notification.type, locale)}</span>
                      <span className={notification.readAt ? "rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700" : "rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-900"}>
                        {notification.readAt ? copy.card.read : copy.card.unread}
                      </span>
                    </div>
                    <h2 className="mt-3 text-lg font-semibold text-stone-950 sm:text-xl">{notification.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{notification.message}</p>
                  </div>
                  <div className="text-left text-sm text-stone-500 sm:text-right">
                    <p className="font-medium text-stone-700">{copy.card.received}</p>
                    <p className="mt-1">{formatDateTime(notification.createdAt, dateLocale)}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {notification.href ? <Link href={notification.href} className="agri-button-secondary">{copy.card.open}</Link> : null}
                  {!notification.readAt ? (
                    <form action={markNotificationRead.bind(null, notification.id)}>
                      <button className="agri-button-primary">{copy.card.markRead}</button>
                    </form>
                  ) : (
                    <span className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900">{copy.card.alreadyRead}</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
