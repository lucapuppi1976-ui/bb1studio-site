import { readFileSync, existsSync } from "node:fs";

function getArg(name, fallback = undefined) {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  return process.argv[index + 1] ?? fallback;
}

function hasFlag(name) {
  return process.argv.includes(name);
}

function readEnvValue(key) {
  const path = ".env";
  if (!existsSync(path)) return "";

  const raw = readFileSync(path, "utf8");
  for (const row of raw.split(/\r?\n/)) {
    const line = row.trim();
    if (!line || line.startsWith("#")) continue;
    if (!line.startsWith(`${key}=`)) continue;
    return line.split("=").slice(1).join("=").trim().replace(/^["']|["']$/g, "");
  }

  return "";
}

const baseUrl = getArg("--base", "http://localhost:3000/agri_app").replace(/\/$/, "");
const to = getArg("--to", "");
const send = hasFlag("--send");
const secret = process.env.CRON_SECRET || readEnvValue("CRON_SECRET");

if (!secret) {
  console.error("CRON_SECRET mancante. Verifica .env oppure esporta CRON_SECRET.");
  process.exit(1);
}

async function getJson(url, init = {}) {
  const response = await fetch(url, init);
  const text = await response.text();

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Risposta non JSON (${response.status}): ${text.slice(0, 240)}`);
  }

  return { response, json };
}

function withSecret(path, extra = {}) {
  const url = new URL(`${baseUrl}${path}`);
  url.searchParams.set("secret", secret);
  for (const [key, value] of Object.entries(extra)) {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  }
  return url.toString();
}

console.log("Agri App email DEV test");
console.log(`Base URL: ${baseUrl}`);
console.log(`Modalità invio reale: ${send ? "richiesta" : "no, solo preview"}`);
console.log("");

const status = await getJson(withSecret("/api/ops/email-status"));
console.log("EMAIL STATUS");
console.log(JSON.stringify(status.json, null, 2));
console.log("");

const preview = await getJson(withSecret("/api/ops/email-test"));
console.log("EMAIL PREVIEW");
console.log(JSON.stringify(preview.json, null, 2));
console.log("");

const dryRun = await getJson(withSecret("/api/cron/daily-notifications", { dryRun: "1" }), { method: "POST" });
console.log("CRON DRY-RUN");
console.log(JSON.stringify(dryRun.json, null, 2));
console.log("");

if (send) {
  if (!to) {
    console.error("Per inviare davvero serve --to email@example.com");
    process.exit(1);
  }

  const sendResult = await getJson(withSecret("/api/ops/email-test", {
    confirm: "send-test-email",
    to,
  }), { method: "POST" });

  console.log("EMAIL SEND TEST");
  console.log(JSON.stringify(sendResult.json, null, 2));
}
