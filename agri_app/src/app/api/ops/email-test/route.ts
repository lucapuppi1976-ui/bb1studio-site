import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { UserRole } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { buildControlledEmailTestPreview, getEmailRuntimeStatus, getEmailTestSafety, sendControlledTestEmail } from "@/lib/notifications/email-control";

type AuthorizedRequest =
  | { ok: true; via: "session" | "secret"; email?: string | null }
  | { ok: false };

async function authorize(request: Request): Promise<AuthorizedRequest> {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  if (secret && secret === process.env.CRON_SECRET) return { ok: true, via: "secret" };

  const session = await getServerSession(authOptions);
  if (session?.user?.role === UserRole.SUPER_ADMIN) return { ok: true, via: "session", email: session.user.email };

  return { ok: false };
}

export async function GET(request: Request) {
  const auth = await authorize(request);
  if (!auth.ok) return NextResponse.json({ ok: false, error: "Accesso non consentito." }, { status: 403 });

  const to = auth.email || "admin@example.com";
  const email = getEmailRuntimeStatus();

  return NextResponse.json({
    ok: true,
    authorizedBy: auth.via,
    email,
    testSafety: getEmailTestSafety(email),
    preview: buildControlledEmailTestPreview(to),
    sendInstructions: {
      method: "POST",
      requiredQuery: "confirm=send-test-email",
      optionalQuery: "to=destinatario@example.com",
      note: "L'invio reale resta bloccato se ENABLE_EMAIL_NOTIFICATIONS=false, se Resend non è configurato o se il blocco live test è attivo.",
    },
  });
}

export async function POST(request: Request) {
  const auth = await authorize(request);
  if (!auth.ok) return NextResponse.json({ ok: false, error: "Accesso non consentito." }, { status: 403 });

  const url = new URL(request.url);
  const confirm = url.searchParams.get("confirm");
  const to = url.searchParams.get("to") || auth.email;

  if (confirm !== "send-test-email") {
    return NextResponse.json({
      ok: false,
      skipped: true,
      error: "Conferma mancante. Aggiungi confirm=send-test-email per inviare davvero il test.",
      email: getEmailRuntimeStatus(),
    }, { status: 400 });
  }

  if (!to) {
    return NextResponse.json({ ok: false, skipped: true, error: "Destinatario mancante.", email: getEmailRuntimeStatus() }, { status: 400 });
  }

  const result = await sendControlledTestEmail(to);

  return NextResponse.json(result, { status: result.ok || result.skipped ? 200 : 500 });
}
