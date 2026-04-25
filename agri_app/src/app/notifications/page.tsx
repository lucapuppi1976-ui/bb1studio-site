import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getNotificationsForUser, getUnreadNotificationsCount } from "@/lib/data/notifications";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/actions/notifications";
import { requireUser } from "@/lib/authz";

type Props = {
  searchParams?: Promise<{
    filter?: string | string[] | undefined;
  }>;
};

export default async function NotificationsPage({ searchParams }: Props) {
  const session = await requireUser();
  const resolved = searchParams ? await searchParams : undefined;
  const rawFilter = Array.isArray(resolved?.filter) ? resolved?.filter[0] : resolved?.filter;
  const filter = rawFilter === "unread" ? "unread" : "all";

  const [notifications, unreadCount] = await Promise.all([
    getNotificationsForUser(session.user.id, filter),
    getUnreadNotificationsCount(session.user.id),
  ]);

  return (
    <AppShell
      title="Notifiche"
      eyebrow="Centro notifiche"
      actions={
        <>
          <Link
            href="/settings/notifications"
            className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70"
          >
            Preferenze
          </Link>

          {unreadCount > 0 ? (
            <form action={markAllNotificationsRead}>
              <button className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
                Segna tutte lette
              </button>
            </form>
          ) : null}
        </>
      }
    >
      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
        <Link
          href="/notifications"
          className={`rounded-full px-3 py-1 ${filter === "all" ? "bg-white text-neutral-950" : "bg-white/5 text-white/70"}`}
        >
          Tutte
        </Link>
        <Link
          href="/notifications?filter=unread"
          className={`rounded-full px-3 py-1 ${filter === "unread" ? "bg-white text-neutral-950" : "bg-white/5 text-white/70"}`}
        >
          Non lette ({unreadCount})
        </Link>
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">
          Nessuna notifica per questo filtro.
        </div>
      ) : (
        <div className="grid gap-4">
          {notifications.map((notification) => {
            const isUnread = !notification.readAt;

            return (
              <article
                key={notification.id}
                className={`rounded-2xl border p-5 ${isUnread ? "border-white/20 bg-white/10" : "border-white/10 bg-white/5"}`}
              >
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

                  {isUnread ? (
                    <form action={markNotificationRead.bind(null, notification.id)}>
                      <button className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
                        Segna letta
                      </button>
                    </form>
                  ) : (
                    <span className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/40">
                      Letta
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
