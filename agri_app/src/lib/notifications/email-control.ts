import { emailNotificationsEnabled, serverEnv } from "@/lib/env.server";
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

export type EmailTestSafety = {
  canSendTestEmail: boolean;
  reason: "disabled" | "provider-not-configured" | "live-test-disabled" | "ready";
  nodeEnv: string;
  appOrigin: string;
  liveSafetyActive: boolean;
  explicitLiveTestAllowed: boolean;
  note: string;
};

export function getEmailRuntimeStatus(): EmailRuntimeStatus {
  const missing: string[] = [];

  if (!serverEnv.RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (!serverEnv.EMAIL_FROM) missing.push("EMAIL_FROM");

  const configured = Boolean(serverEnv.RESEND_API_KEY) && Boolean(serverEnv.EMAIL_FROM);
  const providerReady = emailNotificationsEnabled && configured;
  const mode = !emailNotificationsEnabled
    ? "disabled"
    : providerReady
      ? "ready"
      : "missing-config";

  return {
    enabled: emailNotificationsEnabled,
    providerReady,
    mode,
    missing,
    resendApiKeyConfigured: Boolean(serverEnv.RESEND_API_KEY),
    fromConfigured: Boolean(serverEnv.EMAIL_FROM),
    replyToConfigured: Boolean(serverEnv.EMAIL_REPLY_TO),
    from: serverEnv.EMAIL_FROM ?? null,
    replyTo: serverEnv.EMAIL_REPLY_TO ?? null,
  };
}

export function getEmailTestSafety(status: EmailRuntimeStatus = getEmailRuntimeStatus()): EmailTestSafety {
  const appOrigin = serverEnv.NEXT_PUBLIC_APP_ORIGIN || "";
  const nodeEnv = serverEnv.NODE_ENV || process.env.NODE_ENV || "development";
  const configured = status.resendApiKeyConfigured && status.fromConfigured;

  const liveSafetyActive =
    nodeEnv === "production" ||
    /bb1studio\.com/i.test(appOrigin) ||
    /onrender\.com/i.test(appOrigin);

  const explicitLiveTestAllowed = process.env.EMAIL_TEST_ALLOW_LIVE === "true";

  if (!status.enabled) {
    return {
      canSendTestEmail: false,
      reason: "disabled",
      nodeEnv,
      appOrigin,
      liveSafetyActive,
      explicitLiveTestAllowed,
      note: "Invio test bloccato perché ENABLE_EMAIL_NOTIFICATIONS=false.",
    };
  }

  if (!configured) {
    return {
      canSendTestEmail: false,
      reason: "provider-not-configured",
      nodeEnv,
      appOrigin,
      liveSafetyActive,
      explicitLiveTestAllowed,
      note: "Invio test bloccato perché RESEND_API_KEY o EMAIL_FROM non sono configurati.",
    };
  }

  if (liveSafetyActive && !explicitLiveTestAllowed) {
    return {
      canSendTestEmail: false,
      reason: "live-test-disabled",
      nodeEnv,
      appOrigin,
      liveSafetyActive,
      explicitLiveTestAllowed,
      note: "Invio test bloccato in ambiente live/production. Per test reali usa DEV, oppure abilita esplicitamente EMAIL_TEST_ALLOW_LIVE=true solo per una prova controllata.",
    };
  }

  return {
    canSendTestEmail: true,
    reason: "ready",
    nodeEnv,
    appOrigin,
    liveSafetyActive,
    explicitLiveTestAllowed,
    note: liveSafetyActive
      ? "Invio test consentito perché EMAIL_TEST_ALLOW_LIVE=true. Usare solo per prove controllate."
      : "Invio test consentito in ambiente DEV/non live.",
  };
}

export function buildControlledEmailTestPreview(to: string) {
  const subject = "Agri App • test email notifiche";
  const text = [
    "Questo è un test controllato delle email di Agri App.",
    "Se lo ricevi, Resend e la configurazione email sono pronti.",
    "Gli invii operativi restano comunque governati da ENABLE_EMAIL_NOTIFICATIONS.",
    "Il test reale è pensato per DEV; il live resta protetto da un blocco aggiuntivo.",
  ].join("\n");
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1c1917;">
      <h2>Agri App • test email notifiche</h2>
      <p>Questo è un test controllato delle email di Agri App.</p>
      <p>Se lo ricevi, Resend e la configurazione email sono pronti.</p>
      <p>Gli invii operativi restano comunque governati da <strong>ENABLE_EMAIL_NOTIFICATIONS</strong>.</p>
      <p>Il test reale è pensato per <strong>DEV</strong>; il live resta protetto da un blocco aggiuntivo.</p>
    </div>
  `;

  return { to, subject, text, html };
}

export async function sendControlledTestEmail(to: string) {
  const diagnostics = getEmailRuntimeStatus();
  const safety = getEmailTestSafety(diagnostics);
  const preview = buildControlledEmailTestPreview(to);

  if (!safety.canSendTestEmail) {
    return {
      ok: false,
      skipped: true,
      reason: safety.reason,
      diagnostics,
      safety,
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
    safety,
    preview: { to: preview.to, subject: preview.subject, text: preview.text },
  };
}
