import { emailNotificationsEnabled, emailProviderReady, serverEnv } from "@/lib/env.server";

type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  idempotencyKey?: string;
};

type SendEmailResult =
  | { ok: true; id: string | null }
  | { ok: false; error: string; skipped?: boolean };

export async function sendNotificationEmail({
  to,
  subject,
  html,
  text,
  idempotencyKey,
}: SendEmailInput): Promise<SendEmailResult> {
  if (!emailNotificationsEnabled) {
    return { ok: false, error: "Email notifications disabled", skipped: true };
  }

  if (!emailProviderReady || !serverEnv.RESEND_API_KEY || !serverEnv.EMAIL_FROM) {
    return { ok: false, error: "Email provider not configured", skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serverEnv.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "User-Agent": "bb1studio-agri-app/0.1.0",
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    body: JSON.stringify({
      from: serverEnv.EMAIL_FROM,
      to,
      subject,
      html,
      text,
      ...(serverEnv.EMAIL_REPLY_TO ? { replyTo: serverEnv.EMAIL_REPLY_TO } : {}),
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    return {
      ok: false,
      error:
        payload?.message ||
        payload?.error ||
        `Resend request failed with status ${response.status}`,
    };
  }

  return {
    ok: true,
    id: payload?.id ?? null,
  };
}
