import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerEnvValidation, getPublicEnv } from "@/lib/env";
import { getEmailRuntimeStatus, getEmailTestSafety } from "@/lib/notifications/email-control";

function classifyDatabaseName(name: string) {
  if (name === "agri_app_dev_db") return "dev";
  if (name === "agri_app") return "live";
  return "unknown";
}

function getDatabaseInfo() {
  const value = process.env.DATABASE_URL || "";
  if (!value) return { configured: false, classification: "missing" };

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
    return { configured: true, classification: "invalid" };
  }
}

async function isAuthorized(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  if (secret && secret === process.env.CRON_SECRET) return true;

  const session = await getServerSession(authOptions);
  return session?.user?.role === UserRole.SUPER_ADMIN;
}

export async function GET(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ ok: false, error: "Accesso non consentito." }, { status: 403 });
  }

  let db = false;
  try {
    await prisma.$queryRawUnsafe("SELECT 1");
    db = true;
  } catch {
    db = false;
  }

  const env = getServerEnvValidation();
  const email = getEmailRuntimeStatus();
  const missingServerEnv = env.success ? [] : env.error.issues.map((issue) => issue.path.join("."));

  const [users, plants, openTasks, activeSchedules, dueSchedules, unreadNotices] = db
    ? await Promise.all([
        prisma.user.count(),
        prisma.plant.count(),
        prisma.task.count({ where: { status: { in: ["SCHEDULED", "NOTIFIED"] } } }),
        prisma.taskRecurrenceTemplate.count({ where: { active: true } }),
        prisma.taskRecurrenceTemplate.count({ where: { active: true, nextDueDate: { lte: new Date() } } }),
        prisma.appNotification.count({ where: { readAt: null } }),
      ])
    : [0, 0, 0, 0, 0, 0];

  return NextResponse.json({
    ok: db && env.success,
    db,
    database: getDatabaseInfo(),
    envValid: env.success,
    missingServerEnv,
    publicEnv: getPublicEnv(),
    email,
    testSafety: getEmailTestSafety(email),
    cron: {
      cronSecretConfigured: Boolean(process.env.CRON_SECRET),
      emailNotificationsEnabled: process.env.ENABLE_EMAIL_NOTIFICATIONS === "true",
    },
    counts: {
      users,
      plants,
      openTasks,
      activeSchedules,
      dueSchedules,
      unreadNotices,
    },
  });
}
