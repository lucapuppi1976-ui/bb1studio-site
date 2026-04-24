import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getNotificationsForUser } from "@/lib/data/notifications";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/actions/notifications";
import { requireUser } from "@/lib/authz";

export default async function NotificationsPage() {
  const session = await requireUser();
  const notifications = await getNotificationsForUser(session.user.id);

  return (
    <AppShell
      title="Notifiche"
      eyebrow="Centro notifiche"
      actions={
        <form action={markAllNotificationsRead.bind(null, session.user.id)}>
          <button className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
            Segna tutte lette
          </button>
        </form>
      }
    >
      {notifications.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">Nessuna notifica.</div>
      ) : (
        <div className="grid gap-4">
          {notifications.map((notification) => (
            <article key={notification.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">{notification.type}</p>
                  <h2 className="mt-1 text-xl font-semibold">{notification.title}</h2>
                  <p className="mt-2 text-sm text-white/70">{notification.message}</p>
                </div>
                <p className="text-sm text-white/50">
                  {new Date(notification.createdAt).toLocaleString("it-IT")}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {notification.href ? (
                  <Link href={notification.href} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70">
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
                    Letta
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
