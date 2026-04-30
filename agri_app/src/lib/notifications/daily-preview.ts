import { NotificationEmailKind, TaskStatus, UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { normalizeLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getEmailRuntimeStatus } from "@/lib/notifications/email-control";

type TaskBucket = "today" | "tomorrow" | "overdue";

type EmailPreview = {
  to: string;
  subject: string;
  text: string;
  html: string;
  locale: Locale;
  timezone: string;
  dateKey: string;
  idempotencyKey: string;
  summary: {
    today: number;
    tomorrow: number;
    overdue: number;
    approvals: number;
  };
};

function getTimeWindows(now = new Date()) {
  const startToday = new Date(now);
  startToday.setHours(0, 0, 0, 0);
  const endToday = new Date(startToday);
  endToday.setDate(endToday.getDate() + 1);
  const startTomorrow = new Date(endToday);
  const endTomorrow = new Date(startTomorrow);
  endTomorrow.setDate(endTomorrow.getDate() + 1);
  return { startToday, endToday, startTomorrow, endTomorrow };
}

function getTaskBucket(dueDate: Date, startToday: Date, endToday: Date, startTomorrow: Date, endTomorrow: Date): TaskBucket | null {
  if (dueDate < startToday) return "overdue";
  if (dueDate >= startToday && dueDate < endToday) return "today";
  if (dueDate >= startTomorrow && dueDate < endTomorrow) return "tomorrow";
  return null;
}

function isEnabledForBucket(pref: any, bucket: TaskBucket) {
  if (pref && pref.inAppEnabled === false) return false;
  if (!pref) return true;
  if (bucket === "today") return pref.taskDueToday !== false;
  if (bucket === "tomorrow") return pref.taskDueTomorrow !== false;
  return pref.overdueTasks !== false;
}

function safeLocalParts(timezone: string, date = new Date()) {
  const fallback = "Europe/Madrid";
  const targetTimezone = timezone || fallback;

  try {
    const dtf = new Intl.DateTimeFormat("en-CA", {
      timeZone: targetTimezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hour12: false,
    });
    const parts = Object.fromEntries(
      dtf
        .formatToParts(date)
        .filter((part) => part.type !== "literal")
        .map((part) => [part.type, part.value]),
    ) as Record<string, string>;

    return {
      timezone: targetTimezone,
      dateKey: `${parts.year}-${parts.month}-${parts.day}`,
      hour: Number.parseInt(parts.hour, 10),
    };
  } catch {
    return safeLocalParts(fallback, date);
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getAppBaseUrl() {
  const origin = (process.env.NEXT_PUBLIC_APP_ORIGIN || "http://localhost:3000").replace(/\/$/, "");
  const basePath = process.env.NEXT_PUBLIC_APP_BASE_PATH ?? "/agri_app";
  return `${origin}${basePath.startsWith("/") ? basePath : `/${basePath}`}`;
}

function buildDigestEmailHtml(userName: string, summary: { today: string[]; tomorrow: string[]; overdue: string[]; approvals: number; appBaseUrl: string; locale: Locale }) {
  const t = getDictionary(summary.locale);
  const section = (title: string, items: string[]) => {
    if (items.length === 0) return "";
    const list = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    return `<h3>${escapeHtml(title)}</h3><ul>${list}</ul>`;
  };
  const approvalsSection = summary.approvals > 0 ? `<h3>${escapeHtml(t.backend.proposalsSection)}</h3><p>${escapeHtml(t.backend.proposalsMessage(summary.approvals))}</p>` : "";
  const appLink = `${summary.appBaseUrl}/today`;
  const noticesLink = `${summary.appBaseUrl}/notifications`;

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1c1917;">
      <h2>${escapeHtml(t.backend.digestGreeting(userName))}</h2>
      ${section(t.backend.todaySection, summary.today)}
      ${section(t.backend.tomorrowSection, summary.tomorrow)}
      ${section(t.backend.overdueSection, summary.overdue)}
      ${approvalsSection}
      <p>${escapeHtml(t.backend.appLink)}: <a href="${escapeHtml(appLink)}">${escapeHtml(appLink)}</a></p>
      <p>${escapeHtml(t.backend.noticesLink)}: <a href="${escapeHtml(noticesLink)}">${escapeHtml(noticesLink)}</a></p>
    </div>
  `;
}

function buildDigestEmailText(userName: string, summary: { today: string[]; tomorrow: string[]; overdue: string[]; approvals: number; appBaseUrl: string; locale: Locale }) {
  const t = getDictionary(summary.locale);
  const lines = [t.backend.digestGreetingText(userName), ""];
  if (summary.today.length > 0) { lines.push(`${t.backend.todaySection}:`); summary.today.forEach((item) => lines.push(`- ${item}`)); lines.push(""); }
  if (summary.tomorrow.length > 0) { lines.push(`${t.backend.tomorrowSection}:`); summary.tomorrow.forEach((item) => lines.push(`- ${item}`)); lines.push(""); }
  if (summary.overdue.length > 0) { lines.push(`${t.backend.overdueSection}:`); summary.overdue.forEach((item) => lines.push(`- ${item}`)); lines.push(""); }
  if (summary.approvals > 0) { lines.push(`${t.backend.proposalsSection}: ${summary.approvals}`); lines.push(""); }
  lines.push(`${t.backend.appLink}: ${summary.appBaseUrl}/today`);
  lines.push(`${t.backend.noticesLink}: ${summary.appBaseUrl}/notifications`);
  return lines.join("\n");
}

async function notificationExistsToday(userId: string, type: "TASK" | "APPROVAL", href: string, startToday: Date) {
  const existing = await prisma.appNotification.findFirst({
    where: { userId, type, href, createdAt: { gte: startToday } },
    select: { id: true },
  });
  return Boolean(existing);
}

export async function previewDailyOperationalNotifications(now = new Date()) {
  const { startToday, endToday, startTomorrow, endTomorrow } = getTimeWindows(now);

  const tasks = await prisma.task.findMany({
    where: {
      assignedToUserId: { not: null },
      status: { in: [TaskStatus.SCHEDULED, TaskStatus.NOTIFIED] },
      OR: [
        { dueDate: { lt: startToday } },
        { dueDate: { gte: startToday, lt: endToday } },
        { dueDate: { gte: startTomorrow, lt: endTomorrow } },
      ],
    },
    include: { plant: true, assignedTo: { include: { notificationPreference: true } } },
  });

  let wouldCreate = 0;
  let skipped = 0;
  let emailsWouldSend = 0;
  let emailsSkipped = 0;
  const emailPreviews: EmailPreview[] = [];

  const summaries = new Map<string, { user: any; preference: any; today: string[]; tomorrow: string[]; overdue: string[]; approvals: number }>();

  for (const task of tasks) {
    const assignedUser = task.assignedTo;
    if (!assignedUser) { skipped += 1; continue; }
    const bucket = getTaskBucket(task.dueDate, startToday, endToday, startTomorrow, endTomorrow);
    if (!bucket) { skipped += 1; continue; }
    if (!isEnabledForBucket(assignedUser.notificationPreference, bucket)) { skipped += 1; continue; }

    const locale = normalizeLocale(assignedUser.notificationPreference?.locale);
    const t = getDictionary(locale);
    const href = `/tasks/${task.id}`;
    const exists = await notificationExistsToday(assignedUser.id, "TASK", href, startToday);
    if (exists) skipped += 1;
    else wouldCreate += 1;

    const summary = summaries.get(assignedUser.id) ?? { user: assignedUser, preference: assignedUser.notificationPreference, today: [] as string[], tomorrow: [] as string[], overdue: [] as string[], approvals: 0 };
    summary[bucket].push(`${task.title} • ${task.plant?.name || task.plant?.species || t.common.plant}`);
    summaries.set(assignedUser.id, summary);
  }

  const pendingProposalCount = await prisma.taskProposal.count({ where: { status: "PENDING" } });
  if (pendingProposalCount > 0) {
    const admins = await prisma.user.findMany({ where: { role: UserRole.SUPER_ADMIN }, include: { notificationPreference: true } });
    for (const admin of admins) {
      if (admin.notificationPreference?.inAppEnabled === false) continue;
      if (admin.notificationPreference?.proposalUpdates === false) continue;
      const exists = await notificationExistsToday(admin.id, "APPROVAL", "/approvals", startToday);
      if (exists) skipped += 1;
      else wouldCreate += 1;

      const summary = summaries.get(admin.id) ?? { user: admin, preference: admin.notificationPreference, today: [] as string[], tomorrow: [] as string[], overdue: [] as string[], approvals: 0 };
      summary.approvals = pendingProposalCount;
      summaries.set(admin.id, summary);
    }
  }

  const appBaseUrl = getAppBaseUrl();

  for (const summary of summaries.values()) {
    const preference = summary.preference;
    if (!preference?.emailEnabled) { emailsSkipped += 1; continue; }

    const timezone = preference.timezone || "Europe/Madrid";
    const local = safeLocalParts(timezone, now);
    const digestHour = typeof preference.dailyDigestHour === "number" ? preference.dailyDigestHour : 7;
    if (local.hour !== digestHour) { emailsSkipped += 1; continue; }

    const hasContent = summary.today.length > 0 || summary.tomorrow.length > 0 || summary.overdue.length > 0 || summary.approvals > 0;
    if (!hasContent) { emailsSkipped += 1; continue; }

    const existingLog = await prisma.notificationEmailLog.findUnique({
      where: {
        userId_dateKey_kind: {
          userId: summary.user.id,
          dateKey: local.dateKey,
          kind: NotificationEmailKind.DAILY_DIGEST,
        },
      },
    });
    if (existingLog) { emailsSkipped += 1; continue; }

    emailsWouldSend += 1;

    if (emailPreviews.length < 5) {
      const locale = normalizeLocale(preference.locale);
      const t = getDictionary(locale);
      const subject = t.backend.digestSubject(local.dateKey);
      const payload = { today: summary.today, tomorrow: summary.tomorrow, overdue: summary.overdue, approvals: summary.approvals, appBaseUrl, locale };
      emailPreviews.push({
        to: summary.user.email,
        subject,
        text: buildDigestEmailText(summary.user.name || summary.user.email, payload),
        html: buildDigestEmailHtml(summary.user.name || summary.user.email, payload),
        locale,
        timezone: local.timezone,
        dateKey: local.dateKey,
        idempotencyKey: `${summary.user.id}:${local.dateKey}:daily-digest`,
        summary: {
          today: summary.today.length,
          tomorrow: summary.tomorrow.length,
          overdue: summary.overdue.length,
          approvals: summary.approvals,
        },
      });
    }
  }

  return {
    dryRun: true,
    checked: tasks.length,
    wouldCreate,
    skipped,
    emailsWouldSend,
    emailsSkipped,
    emailPreviews,
    email: getEmailRuntimeStatus(),
  };
}
