import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getNotificationCenterData } from "@/lib/data/notifications";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/actions/notifications";
import { requireUser } from "@/lib/authz";
import { routes } from "@/lib/app-routes";

function formatDateTime(value: Date) {
  return new Date(value).toLocaleString("it-IT", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default async function NotificationsPage() {
  const session = await requireUser();
  const { notifications, unreadCount, todayCount } = await getNotificationCenterData(session.user.id);

  return (
    <AppShell
      title="Notifiche"
      eyebrow="Centro notifiche"
      actions={
        <>
          <Link
            href={routes.settingsNotifications}
            className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70"
          >
            Preferenze
          </Link>

          <form action={markAllNotificationsRead}>
            <button className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
              Segna tutte lette
            </button>
          </form>
        </>
      }
    >
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">Non lette</p>
          <p className="mt-2 text-4xl font-bold text-white">{unreadCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">Generate oggi</p>
          <p className="mt-2 text-4xl font-bold text-white">{todayCount}</p>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">
          Nessuna notifica disponibile.
        </div>
      ) : (
        <div className="grid gap-4">
          {notifications.map((notification) => (
            <article
              key={notification.id}
              className={`rounded-2xl border p-5 ${
                notification.readAt
                  ? "border-white/10 bg-white/5"
                  : "border-emerald-500/20 bg-emerald-500/5"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">
                    {notification.type}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-white">
                    {notification.title}
                  </h2>
                  <p className="mt-2 text-sm text-white/70">
                    {notification.message}
                  </p>
                </div>

                <div className="text-right text-sm text-white/50">
                  <p>{formatDateTime(notification.createdAt)}</p>
                  <p className="mt-2">
                    {notification.readAt ? "Letta" : "Non letta"}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {notification.href ? (
                  <Link
                    href={notification.href}
                    className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70"
                  >
                    Apri
                  </Link>
                ) : null}

                {!notification.readAt ? (
                  <form action={markNotificationRead.bind(null, notification.id)}>
                    <button className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
                      Segna letta
                    </button>
                  </form>
                ) : (
                  <span className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                    Già letta
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}
