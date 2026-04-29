import { NotificationEmailKind, TaskStatus, UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { emailNotificationsEnabled } from "@/lib/env.server";
import { sendNotificationEmail } from "@/lib/notifications/email";
import { normalizeLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

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

function getTaskBucket(dueDate: Date, startToday: Date, endToday: Date, startTomorrow: Date, endTomorrow: Date) {
  if (dueDate < startToday) return "overdue" as const;
  if (dueDate >= startToday && dueDate < endToday) return "today" as const;
  if (dueDate >= startTomorrow && dueDate < endTomorrow) return "tomorrow" as const;
  return null;
}

function isEnabledForBucket(pref: any, bucket: "today" | "tomorrow" | "overdue") {
  if (pref && pref.inAppEnabled === false) return false;
  if (!pref) return true;
  if (bucket === "today") return pref.taskDueToday !== false;
  if (bucket === "tomorrow") return pref.taskDueTomorrow !== false;
  return pref.overdueTasks !== false;
}

function buildTaskNotificationCopy(task: any, bucket: "today" | "tomorrow" | "overdue", locale: Locale) {
  const t = getDictionary(locale);
  const plantLabel = task.plant?.name || task.plant?.species || t.common.plant;
  const href = `/tasks/${task.id}`;

  if (bucket === "today") return { title: t.backend.taskTodayTitle(task.title), message: t.backend.taskTodayMessage(plantLabel), href };
  if (bucket === "tomorrow") return { title: t.backend.taskTomorrowTitle(task.title), message: t.backend.taskTomorrowMessage(plantLabel), href };
  return { title: t.backend.taskOverdueTitle(task.title), message: t.backend.taskOverdueMessage(plantLabel), href };
}

async function notificationExistsToday(userId: string, type: "TASK" | "APPROVAL", href: string, startToday: Date) {
  const existing = await prisma.appNotification.findFirst({
    where: { userId, type, href, createdAt: { gte: startToday } },
    select: { id: true },
  });
  return Boolean(existing);
}

function getLocalParts(timezone: string, date = new Date()) {
  const dtf = new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hour12: false });
  const parts = Object.fromEntries(dtf.formatToParts(date).filter((part) => part.type !== "literal").map((part) => [part.type, part.value])) as Record<string, string>;
  const dateKey = `${parts.year}-${parts.month}-${parts.day}`;
  const hour = Number.parseInt(parts.hour, 10);
  return { dateKey, hour };
}

function buildDigestEmailHtml(userName: string, summary: { today: string[]; tomorrow: string[]; overdue: string[]; approvals: number; appBaseUrl: string; locale: Locale }) {
  const t = getDictionary(summary.locale);
  const section = (title: string, items: string[]) => {
    if (items.length === 0) return "";
    const list = items.map((item) => `<li>${item}</li>`).join("");
    return `<h3>${title}</h3><ul>${list}</ul>`;
  };
  const approvalsSection = summary.approvals > 0 ? `<h3>${t.backend.proposalsSection}</h3><p>${t.backend.proposalsMessage(summary.approvals)}</p>` : "";

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>${t.backend.digestGreeting(userName)}</h2>
      ${section(t.backend.todaySection, summary.today)}
      ${section(t.backend.tomorrowSection, summary.tomorrow)}
      ${section(t.backend.overdueSection, summary.overdue)}
      ${approvalsSection}
      <p>${t.backend.appLink}: <a href="${summary.appBaseUrl}/today">${summary.appBaseUrl}/today</a></p>
      <p>${t.backend.noticesLink}: <a href="${summary.appBaseUrl}/notifications">${summary.appBaseUrl}/notifications</a></p>
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

async function maybeSendDigestEmail(args: { user: any; preference: any; date: Date; taskSummary: { today: string[]; tomorrow: string[]; overdue: string[]; approvals: number } }) {
  const { user, preference, date, taskSummary } = args;
  if (!emailNotificationsEnabled) return { sent: false, skipped: true, reason: "disabled" as const };
  if (!preference?.emailEnabled) return { sent: false, skipped: true, reason: "user-disabled" as const };

  const timezone = preference?.timezone || "Europe/Madrid";
  const digestHour = typeof preference?.dailyDigestHour === "number" ? preference.dailyDigestHour : 7;
  const locale = normalizeLocale(preference?.locale);
  const t = getDictionary(locale);
  const local = getLocalParts(timezone, date);
  if (local.hour !== digestHour) return { sent: false, skipped: true, reason: "outside-hour" as const };

  const hasContent = taskSummary.today.length > 0 || taskSummary.tomorrow.length > 0 || taskSummary.overdue.length > 0 || taskSummary.approvals > 0;
  if (!hasContent) return { sent: false, skipped: true, reason: "empty" as const };

  const log = await prisma.notificationEmailLog.findUnique({ where: { userId_dateKey_kind: { userId: user.id, dateKey: local.dateKey, kind: NotificationEmailKind.DAILY_DIGEST } } });
  if (log) return { sent: false, skipped: true, reason: "already-sent" as const };

  const appBaseUrl = `${process.env.NEXT_PUBLIC_APP_ORIGIN}${process.env.NEXT_PUBLIC_APP_BASE_PATH ?? "/agri_app"}`;
  const subject = t.backend.digestSubject(local.dateKey);
  const html = buildDigestEmailHtml(user.name || user.email, { ...taskSummary, appBaseUrl, locale });
  const text = buildDigestEmailText(user.name || user.email, { ...taskSummary, appBaseUrl, locale });

  const sendResult = await sendNotificationEmail({ to: user.email, subject, html, text, idempotencyKey: `${user.id}:${local.dateKey}:daily-digest` });
  if (!sendResult.ok) return { sent: false, skipped: true, reason: sendResult.error };

  await prisma.notificationEmailLog.create({ data: { userId: user.id, dateKey: local.dateKey, kind: NotificationEmailKind.DAILY_DIGEST, provider: "resend", providerMessageId: sendResult.id ?? undefined } });
  return { sent: true, skipped: false };
}

export async function createDailyOperationalNotifications() {
  const now = new Date();
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

  let created = 0;
  let skipped = 0;
  let emailsSent = 0;
  let emailsSkipped = 0;

  const summaries = new Map<string, { user: any; preference: any; today: string[]; tomorrow: string[]; overdue: string[]; approvals: number }>();

  for (const task of tasks) {
    const assignedUser = task.assignedTo;
    if (!assignedUser) { skipped += 1; continue; }
    const bucket = getTaskBucket(task.dueDate, startToday, endToday, startTomorrow, endTomorrow);
    if (!bucket) { skipped += 1; continue; }
    if (!isEnabledForBucket(assignedUser.notificationPreference, bucket)) { skipped += 1; continue; }

    const locale = normalizeLocale(assignedUser.notificationPreference?.locale);
    const copy = buildTaskNotificationCopy(task, bucket, locale);
    const exists = await notificationExistsToday(assignedUser.id, "TASK", copy.href, startToday);

    if (exists) {
      skipped += 1;
    } else {
      await prisma.appNotification.create({ data: { userId: assignedUser.id, type: "TASK", title: copy.title, message: copy.message, href: copy.href } });
      await prisma.task.update({ where: { id: task.id }, data: { status: TaskStatus.NOTIFIED } });
      created += 1;
    }

    const t = getDictionary(locale);
    const summary = summaries.get(assignedUser.id) ?? { user: assignedUser, preference: assignedUser.notificationPreference, today: [] as string[], tomorrow: [] as string[], overdue: [] as string[], approvals: 0 };
    const line = `${task.title} • ${task.plant?.name || task.plant?.species || t.common.plant}`;
    summary[bucket].push(line);
    summaries.set(assignedUser.id, summary);
  }

  const pendingProposalCount = await prisma.taskProposal.count({ where: { status: "PENDING" } });
  if (pendingProposalCount > 0) {
    const admins = await prisma.user.findMany({ where: { role: UserRole.SUPER_ADMIN }, include: { notificationPreference: true } });
    for (const admin of admins) {
      if (admin.notificationPreference?.inAppEnabled === false) continue;
      if (admin.notificationPreference?.proposalUpdates === false) continue;
      const locale = normalizeLocale(admin.notificationPreference?.locale);
      const t = getDictionary(locale);
      const title = t.backend.proposalsTitle;
      const href = "/approvals";
      const exists = await notificationExistsToday(admin.id, "APPROVAL", href, startToday);
      if (exists) {
        skipped += 1;
      } else {
        await prisma.appNotification.create({ data: { userId: admin.id, type: "APPROVAL", title, message: t.backend.proposalsMessage(pendingProposalCount), href } });
        created += 1;
      }
      const summary = summaries.get(admin.id) ?? { user: admin, preference: admin.notificationPreference, today: [] as string[], tomorrow: [] as string[], overdue: [] as string[], approvals: 0 };
      summary.approvals = pendingProposalCount;
      summaries.set(admin.id, summary);
    }
  }

  for (const summary of summaries.values()) {
    const result = await maybeSendDigestEmail({ user: summary.user, preference: summary.preference, date: now, taskSummary: { today: summary.today, tomorrow: summary.tomorrow, overdue: summary.overdue, approvals: summary.approvals } });
    if (result.sent) emailsSent += 1;
    if (result.skipped) emailsSkipped += 1;
  }

  return { created, skipped, emailsSent, emailsSkipped };
}
