import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { UserRole } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { getEmailRuntimeStatus, getEmailTestSafety } from "@/lib/notifications/email-control";

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

  const email = getEmailRuntimeStatus();

  return NextResponse.json({
    ok: true,
    email,
    testSafety: getEmailTestSafety(email),
    note: "L'invio reale resta bloccato finché ENABLE_EMAIL_NOTIFICATIONS=false. Il test email reale è pensato per DEV.",
  });
}
