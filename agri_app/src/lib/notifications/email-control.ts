import { emailNotificationsEnabled, emailProviderReady, serverEnv } from "@/lib/env.server";
import { sendNotificationEmail } from "@/lib/notifications/email";

export type EmailRuntimeStatus = {
  enabled: boolean;
  providerReady: boolean;
  mode: "disabled" | "missing-config" | "ready";
  missing: string[];
  resendApiKeyConfigured: boolean;
  fromConfigured: boolean;
  replyToConfigured: boolean;
  from: string | null;
  replyTo: string | null;
};

export function getEmailRuntimeStatus(): EmailRuntimeStatus {
  const missing: string[] = [];

  if (!serverEnv.RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (!serverEnv.EMAIL_FROM) missing.push("EMAIL_FROM");

  const mode = !emailNotificationsEnabled
    ? "disabled"
    : emailProviderReady
      ? "ready"
      : "missing-config";

  return {
    enabled: emailNotificationsEnabled,
    providerReady: emailProviderReady,
    mode,
    missing,
    resendApiKeyConfigured: Boolean(serverEnv.RESEND_API_KEY),
    fromConfigured: Boolean(serverEnv.EMAIL_FROM),
    replyToConfigured: Boolean(serverEnv.EMAIL_REPLY_TO),
    from: serverEnv.EMAIL_FROM ?? null,
    replyTo: serverEnv.EMAIL_REPLY_TO ?? null,
  };
}

export function buildControlledEmailTestPreview(to: string) {
  const subject = "Agri App • test email notifiche";
  const text = [
    "Questo è un test controllato delle email di Agri App.",
    "Se lo ricevi, Resend e la configurazione email sono pronti.",
    "Gli invii operativi restano comunque governati da ENABLE_EMAIL_NOTIFICATIONS.",
  ].join("\n");
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1c1917;">
      <h2>Agri App • test email notifiche</h2>
      <p>Questo è un test controllato delle email di Agri App.</p>
      <p>Se lo ricevi, Resend e la configurazione email sono pronti.</p>
      <p>Gli invii operativi restano comunque governati da <strong>ENABLE_EMAIL_NOTIFICATIONS</strong>.</p>
    </div>
  `;

  return { to, subject, text, html };
}

export async function sendControlledTestEmail(to: string) {
  const diagnostics = getEmailRuntimeStatus();
  const preview = buildControlledEmailTestPreview(to);

  if (!diagnostics.enabled) {
    return {
      ok: false,
      skipped: true,
      reason: "disabled",
      diagnostics,
      preview: { to: preview.to, subject: preview.subject, text: preview.text },
    };
  }

  if (!diagnostics.providerReady) {
    return {
      ok: false,
      skipped: true,
      reason: "provider-not-configured",
      diagnostics,
      preview: { to: preview.to, subject: preview.subject, text: preview.text },
    };
  }

  const result = await sendNotificationEmail({
    to,
    subject: preview.subject,
    html: preview.html,
    text: preview.text,
    idempotencyKey: `email-test:${to}:${new Date().toISOString().slice(0, 10)}`,
  });

  return {
    ok: result.ok,
    skipped: result.ok ? false : result.skipped === true,
    reason: result.ok ? undefined : result.error,
    result,
    diagnostics,
    preview: { to: preview.to, subject: preview.subject, text: preview.text },
  };
}
