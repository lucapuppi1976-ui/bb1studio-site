import Link from "next/link";
import { TaskStatus } from "@prisma/client";
import { AppShell } from "@/components/app-shell";
import { requireSuperAdmin } from "@/lib/authz";
import { getServerEnvValidation, getPublicEnv } from "@/lib/env";
import { withBasePath } from "@/lib/app-config";
import { routes } from "@/lib/app-routes";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "@/lib/i18n/server";
import { getEmailRuntimeStatus, getEmailTestSafety } from "@/lib/notifications/email-control";
import { getAdminSystemCockpitText } from "@/lib/i18n/admin-system-cockpit";

function classifyDatabaseName(name: string) {
  if (name === "agri_app_dev_db") return "dev";
  if (name === "agri_app") return "live";
  return "unknown";
}

function getDatabaseInfo() {
  const value = process.env.DATABASE_URL || "";
  if (!value) return { configured: false, classification: "missing", host: "", name: "" };

  try {
    const url = new URL(value);
    const name = url.pathname.replace(/^\//, "");
    return {
      configured: true,
      host: url.hostname,
      name,
      classification: classifyDatabaseName(name),
    };
  } catch {
    return { configured: true, classification: "invalid", host: "", name: "" };
  }
}

function badgeClass(kind: "ok" | "warning" | "problem" | "neutral") {
  if (kind === "ok") return "border-emerald-200 bg-emerald-50 text-emerald-900";
  if (kind === "warning") return "border-amber-200 bg-amber-50 text-amber-900";
  if (kind === "problem") return "border-rose-200 bg-rose-50 text-rose-900";
  return "border-stone-200 bg-stone-50 text-stone-700";
}

function StatusBadge({ label, kind }: { label: string; kind: "ok" | "warning" | "problem" | "neutral" }) {
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass(kind)}`}>{label}</span>;
}

function InfoRow({ label, value }: { label: string; value: string | number | boolean | null | undefined }) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-stone-100 py-3 text-sm first:border-t-0">
      <span className="text-stone-500">{label}</span>
      <span className="max-w-[65%] break-words text-right font-medium text-stone-900">{value === null || value === undefined || value === "" ? "—" : String(value)}</span>
    </div>
  );
}

async function loadDbSnapshot(userId: string) {
  const now = new Date();

  const [
    users,
    plants,
    openTasks,
    generatedTasks,
    schedules,
    activeSchedules,
    dueSchedules,
    unassignedSchedules,
    unreadNotices,
    generatedWithoutSourceDate,
    generatedWithoutTemplate,
    duplicateGroups,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.plant.count(),
    prisma.task.count({ where: { status: { in: [TaskStatus.SCHEDULED, TaskStatus.NOTIFIED] } } }),
    prisma.task.count({ where: { recurrenceTemplateId: { not: null } } }),
    prisma.taskRecurrenceTemplate.count(),
    prisma.taskRecurrenceTemplate.count({ where: { active: true } }),
    prisma.taskRecurrenceTemplate.count({ where: { active: true, nextDueDate: { lte: now } } }),
    prisma.taskRecurrenceTemplate.count({ where: { active: true, assignedToUserId: null } }),
    prisma.appNotification.count({ where: { userId, readAt: null } }),
    prisma.task.count({ where: { recurrenceTemplateId: { not: null }, recurrenceSourceDate: null } }),
    prisma.task.count({ where: { recurrenceTemplateId: null, recurrenceSourceDate: { not: null } } }),
    prisma.$queryRaw<Array<{ count: number }>>`
      SELECT COUNT(*)::int AS count
      FROM (
        SELECT "recurrenceTemplateId", "recurrenceSourceDate"
        FROM "Task"
        WHERE "recurrenceTemplateId" IS NOT NULL
          AND "recurrenceSourceDate" IS NOT NULL
        GROUP BY "recurrenceTemplateId", "recurrenceSourceDate"
        HAVING COUNT(*) > 1
      ) duplicates
    `,
  ]);

  return {
    users,
    plants,
    openTasks,
    generatedTasks,
    schedules,
    activeSchedules,
    dueSchedules,
    unassignedSchedules,
    unreadNotices,
    generatedWithoutSourceDate,
    generatedWithoutTemplate,
    duplicateGroups: duplicateGroups[0]?.count ?? 0,
  };
}

export default async function AdminSystemPage() {
  const session = await requireSuperAdmin();
  const { locale } = await getTranslations();
  const copy = getAdminSystemCockpitText(locale);

  let dbOk = true;
  try {
    await prisma.$queryRawUnsafe("SELECT 1");
  } catch {
    dbOk = false;
  }

  const serverEnv = getServerEnvValidation();
  const publicEnv = getPublicEnv();
  const database = getDatabaseInfo();
  const email = getEmailRuntimeStatus();
  const emailSafety = getEmailTestSafety(email);
  const missingServerEnv = serverEnv.success ? [] : serverEnv.error.issues.map((issue) => issue.path.join("."));
  const cronSecretConfigured = Boolean(process.env.CRON_SECRET);

  const snapshot = dbOk ? await loadDbSnapshot(session.user.id) : null;
  const generatedQualityOk = snapshot ? snapshot.generatedWithoutSourceDate === 0 && snapshot.generatedWithoutTemplate === 0 : false;
  const duplicatesOk = snapshot ? snapshot.duplicateGroups === 0 : false;

  const topCards = [
    {
      title: copy.cards.database.title,
      badge: dbOk ? copy.status.ok : copy.status.problem,
      kind: dbOk ? "ok" : "problem",
      body: dbOk ? copy.cards.database.bodyOk : copy.cards.database.bodyProblem,
    },
    {
      title: copy.cards.environment.title,
      badge: serverEnv.success ? copy.status.ok : copy.status.problem,
      kind: serverEnv.success ? "ok" : "problem",
      body: serverEnv.success ? copy.cards.environment.bodyOk : copy.cards.environment.bodyProblem,
    },
    {
      title: copy.cards.email.title,
      badge: email.enabled ? copy.status.enabled : copy.status.disabled,
      kind: email.enabled ? "warning" : "ok",
      body: email.enabled ? copy.cards.email.bodyEnabled : copy.cards.email.bodyDisabled,
    },
    {
      title: copy.cards.cron.title,
      badge: cronSecretConfigured ? copy.status.configured : copy.status.missing,
      kind: cronSecretConfigured ? "ok" : "problem",
      body: cronSecretConfigured ? copy.cards.cron.bodyOk : copy.cards.cron.bodyProblem,
    },
  ] as const;

  return (
    <AppShell title={copy.header.title} eyebrow={copy.header.eyebrow}>
      <p className="mb-6 max-w-3xl text-sm leading-6 text-stone-600">{copy.header.description}</p>

      <div className="grid gap-4 md:grid-cols-4">
        {topCards.map((card) => (
          <section key={card.title} className="agri-card">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-stone-950">{card.title}</h2>
              <StatusBadge label={card.badge} kind={card.kind} />
            </div>
            <p className="mt-4 text-sm leading-6 text-stone-600">{card.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <section className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{copy.cards.database.title}</h2>
          <div className="mt-4">
            <InfoRow label={copy.labels.dbTarget} value={database.classification.toUpperCase()} />
            <InfoRow label={copy.labels.dbName} value={database.name} />
            <InfoRow label={copy.labels.dbHost} value={database.host} />
          </div>
          <p className="mt-4 text-xs leading-5 text-stone-500">{copy.messages.liveDbWarning}</p>
        </section>

        <section className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{copy.cards.email.title}</h2>
          <div className="mt-4">
            <InfoRow label={copy.labels.emailMode} value={email.mode} />
            <InfoRow label={copy.labels.emailFrom} value={email.from} />
            <InfoRow label={copy.labels.emailProvider} value={email.providerReady ? copy.status.ready : copy.status.notReady} />
            <InfoRow label={copy.labels.canSendTestEmail} value={emailSafety.canSendTestEmail ? copy.status.enabled : copy.status.disabled} />
          </div>
          <p className="mt-4 text-xs leading-5 text-stone-500">{copy.messages.emailDisabledSafe}</p>
        </section>

        <section className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{copy.sections.missingServerEnv}</h2>
          {missingServerEnv.length === 0 ? (
            <p className="mt-4 text-sm text-stone-600">{copy.messages.noMissingEnv}</p>
          ) : (
            <ul className="mt-4 grid gap-2 text-sm text-stone-700">
              {missingServerEnv.map((item) => <li key={item} className="rounded-2xl bg-amber-50 px-3 py-2 text-amber-900">{item}</li>)}
            </ul>
          )}
        </section>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{copy.sections.operationalNumbers}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <InfoRow label={copy.labels.users} value={snapshot?.users} />
            <InfoRow label={copy.labels.plants} value={snapshot?.plants} />
            <InfoRow label={copy.labels.openTasks} value={snapshot?.openTasks} />
            <InfoRow label={copy.labels.generatedTasks} value={snapshot?.generatedTasks} />
            <InfoRow label={copy.labels.schedules} value={snapshot?.schedules} />
            <InfoRow label={copy.labels.unreadNotices} value={snapshot?.unreadNotices} />
          </div>
        </section>

        <section className="agri-card">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-lg font-semibold text-stone-950">{copy.sections.recurringQuality}</h2>
            <StatusBadge label={generatedQualityOk && duplicatesOk ? copy.status.ok : copy.status.warning} kind={generatedQualityOk && duplicatesOk ? "ok" : "warning"} />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <InfoRow label={copy.labels.activeSchedules} value={snapshot?.activeSchedules} />
            <InfoRow label={copy.labels.dueSchedules} value={snapshot?.dueSchedules} />
            <InfoRow label={copy.labels.unassignedSchedules} value={snapshot?.unassignedSchedules} />
            <InfoRow label={copy.labels.generatedWithoutSourceDate} value={snapshot?.generatedWithoutSourceDate} />
            <InfoRow label={copy.labels.generatedWithoutTemplate} value={snapshot?.generatedWithoutTemplate} />
            <InfoRow label={copy.labels.duplicateGroups} value={snapshot?.duplicateGroups} />
          </div>
          <p className="mt-4 text-xs leading-5 text-stone-500">{generatedQualityOk ? copy.messages.generatedQualityOk : copy.messages.noData} {duplicatesOk ? copy.messages.duplicateOk : ""}</p>
        </section>
      </div>

      <section className="agri-card mt-6">
        <h2 className="text-lg font-semibold text-stone-950">{copy.sections.quickChecks}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <a href={withBasePath("/api/health")} className="agri-button-secondary text-center">{copy.actions.health}</a>
          <a href={withBasePath("/api/ready")} className="agri-button-secondary text-center">{copy.actions.ready}</a>
          <a href={withBasePath("/api/ops/email-status")} className="agri-button-secondary text-center">{copy.actions.emailStatus}</a>
          <a href={withBasePath("/api/ops/preflight")} className="agri-button-secondary text-center">{copy.actions.preflight}</a>
          <Link href={routes.notifications} className="agri-button-secondary text-center">{copy.actions.notifications}</Link>
          <Link href={routes.recurringTasks} className="agri-button-secondary text-center">{copy.actions.recurringTasks}</Link>
          <Link href={routes.reports} className="agri-button-secondary text-center">{copy.actions.reports}</Link>
        </div>
      </section>

      <section className="agri-card mt-6">
        <h2 className="text-lg font-semibold text-stone-950">{copy.sections.publicConfig}</h2>
        <p className="mt-2 text-sm text-stone-600">{copy.messages.publicConfigHint}</p>
        <pre className="mt-4 overflow-auto rounded-2xl bg-stone-950 p-4 text-sm text-white/80">{JSON.stringify(publicEnv, null, 2)}</pre>
      </section>
    </AppShell>
  );
}
