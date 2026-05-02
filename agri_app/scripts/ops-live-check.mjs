#!/usr/bin/env node

const args = process.argv.slice(2);

function argValue(name, fallback = "") {
  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1]) return args[index + 1];
  return fallback;
}

const baseUrl = argValue("--base", "https://bb1studio.com/agri_app").replace(/\/$/, "");
const secret = argValue("--secret", process.env.CRON_SECRET || "");
const includeCronDryRun = args.includes("--include-cron-dry-run");

const pageChecks = [
  "/login",
  "/dashboard",
  "/notifications",
  "/settings/notifications",
  "/tasks",
  "/today",
  "/approvals",
  "/recurring-tasks",
  "/reports",
];

function url(path) {
  return `${baseUrl}${path}`;
}

function fail(message) {
  throw new Error(message);
}

async function getText(path) {
  const response = await fetch(url(path));
  const text = await response.text();

  if (!response.ok) {
    fail(`${path}: HTTP ${response.status} ${text.slice(0, 180)}`);
  }

  return text;
}

async function getJson(path) {
  const text = await getText(path);

  try {
    return JSON.parse(text);
  } catch {
    fail(`${path}: risposta non JSON: ${text.slice(0, 180)}`);
  }
}

async function postJson(path) {
  const response = await fetch(url(path), { method: "POST" });
  const text = await response.text();

  if (!response.ok) {
    fail(`${path}: HTTP ${response.status} ${text.slice(0, 180)}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    fail(`${path}: risposta non JSON: ${text.slice(0, 180)}`);
  }
}

function assertNoPageError(path, html) {
  const badSignals = [
    "Internal Server Error",
    "Application error",
    "InvariantError",
    "clientReferenceManifest",
    "PrismaClientKnownRequestError",
    "NEXT_NOT_FOUND",
  ];

  const found = badSignals.find((signal) => html.includes(signal));

  if (found) {
    fail(`${path}: trovato possibile errore pagina: ${found}`);
  }
}

const failures = [];

async function runCheck(label, fn) {
  try {
    const result = await fn();
    console.log(`✓ ${label}${result ? ` — ${result}` : ""}`);
  } catch (error) {
    failures.push(error);
    console.error(`✗ ${label} — ${error.message}`);
  }
}

console.log("");
console.log("Agri App live operations check");
console.log(`Base URL: ${baseUrl}`);
console.log(`Secret configured: ${secret ? "yes" : "no"}`);
console.log(`Cron dry-run included: ${includeCronDryRun ? "yes" : "no"}`);
console.log("");

await runCheck("API health", async () => {
  const json = await getJson("/api/health");
  if (json.ok !== true) fail(`health ok non true: ${JSON.stringify(json)}`);
  return "ok";
});

await runCheck("API ready", async () => {
  const json = await getJson("/api/ready");
  if (json.ok !== true) fail(`ready ok non true: ${JSON.stringify(json)}`);
  return "ok";
});

if (secret) {
  await runCheck("Email status live safety", async () => {
    const params = new URLSearchParams({ secret });
    const json = await getJson(`/api/ops/email-status?${params.toString()}`);

    if (json.ok !== true) fail(`email-status ok non true: ${JSON.stringify(json)}`);
    if (json.email?.enabled !== false) fail(`email.enabled atteso false, ricevuto: ${json.email?.enabled}`);
    if (json.testSafety?.canSendTestEmail !== false) fail(`canSendTestEmail atteso false, ricevuto: ${json.testSafety?.canSendTestEmail}`);

    const from = String(json.email?.from || "");
    const fromOk = from.includes("notifiche@bb1studio.com");

    return `enabled=false, canSendTestEmail=false, from=${from || "(vuoto)"}${fromOk ? "" : " [controllare mittente]"}`;
  });
} else {
  console.log("• Email status saltato: passare --secret oppure impostare CRON_SECRET.");
}

for (const path of pageChecks) {
  await runCheck(`Page ${path}`, async () => {
    const html = await getText(path);
    assertNoPageError(path, html);
    return "ok";
  });
}

if (includeCronDryRun) {
  if (!secret) {
    console.log("• Cron dry-run saltato: passare --secret oppure impostare CRON_SECRET.");
  } else {
    await runCheck("Daily notifications cron dry-run", async () => {
      const params = new URLSearchParams({ secret, dryRun: "1" });
      const json = await postJson(`/api/cron/daily-notifications?${params.toString()}`);

      if (json.ok !== true) fail(`cron ok non true: ${JSON.stringify(json)}`);
      if (json.dryRun !== true) fail(`dryRun atteso true, ricevuto: ${json.dryRun}`);
      if (json.email?.enabled !== false) fail(`email.enabled atteso false, ricevuto: ${json.email?.enabled}`);

      return `dryRun=true, email.enabled=false`;
    });
  }
}

console.log("");

if (failures.length > 0) {
  console.error(`Ops check fallito: ${failures.length} problemi.`);
  process.exit(1);
}

console.log("Ops check completato con successo.");
