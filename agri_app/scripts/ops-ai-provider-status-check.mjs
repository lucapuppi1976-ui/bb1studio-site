#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");

const args = process.argv.slice(2);
const includeLive = args.includes("--include-live");
const baseArgIndex = args.indexOf("--base");
const baseUrl =
  baseArgIndex >= 0 && args[baseArgIndex + 1]
    ? args[baseArgIndex + 1].replace(/\/$/, "")
    : "https://bb1studio.com/agri_app";

const files = {
  route: "agri_app/src/app/api/ops/ai-provider-status/route.ts",
  panel: "agri_app/src/app/admin/operations/OperationsAiProviderStatus.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_PROVIDER_OPS_STATUS_V6_2.md",
  check: "agri_app/scripts/ops-ai-provider-status-check.mjs",
};

const failures = [];

function readRepoFile(relativePath) {
  const absolutePath = resolve(repoRoot, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let data = null;

  try {
    data = JSON.parse(text);
  } catch {
    data = null;
  }

  return {
    status: response.status,
    text,
    data,
  };
}

console.log("Agri App AI provider ops status check V6.2");
console.log(`Repo root: ${repoRoot}`);
console.log(`Live checks: ${includeLive ? "yes" : "no"}`);
console.log(`Base URL: ${baseUrl}`);
console.log("");

console.log("--- File richiesti ---");

for (const file of Object.values(files)) {
  const ok = existsSync(resolve(repoRoot, file));
  console.log(`${ok ? "✓" : "✗"} ${file}`);

  if (!ok) {
    failures.push(`File mancante: ${file}`);
  }
}

const routeText = readRepoFile(files.route);
const panelText = readRepoFile(files.panel);
const operationsPageText = readRepoFile(files.operationsPage);
const readmeText = readRepoFile(files.readme);
const runbookText = readRepoFile("agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));

console.log("");
console.log("--- Endpoint ops AI provider status ---");

for (const required of [
  "export async function GET",
  "CRON_SECRET",
  "Accesso non consentito.",
  "providerCallsEnabled: false",
  "liveProviderEndpoint: false",
  "clientProviderCallsAllowed: false",
  "persistenceAllowed: false",
  "automaticTaskCreationAllowed: false",
  "humanReviewRequired: true",
  "redactedOutputOnly: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint ops incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Pannello admin operations ---");

for (const required of [
  "AI Provider Ops Status",
  "/api/ops/ai-provider-status",
  "providerCallsEnabled=false",
  "clientProviderCallsAllowed=false",
  "persistenceAllowed=false",
  "automaticTaskCreationAllowed=false",
  "humanReviewRequired=true",
  "data-ai-provider-ops-status",
]) {
  const ok = panelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione Operations Center ---");

for (const required of [
  'import OperationsAiProviderStatus from "./OperationsAiProviderStatus";',
  "<OperationsAiProviderStatus />",
]) {
  const ok = operationsPageText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Integrazione Operations Center mancante: ${required}`);
  }
}

console.log("");
console.log("--- Guardrail provider runtime ---");

for (const [label, text] of [
  ["route", routeText],
  ["panel", panelText],
]) {
  for (const forbidden of [
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "GEMINI_API_KEY",
    "GOOGLE_API_KEY",
    "secret=",
    "--secret",
    "localStorage",
    "sessionStorage",
  ]) {
    const ok = !text.includes(forbidden);
    console.log(`${ok ? "✓" : "✗"} ${label}: assente ${forbidden}`);

    if (!ok) {
      failures.push(`Pattern vietato in ${label}: ${forbidden}`);
    }
  }
}

const aiApiAbsent =
  !existsSync(resolve(repoRoot, "agri_app/src/app/api/ai")) &&
  !existsSync(resolve(repoRoot, "agri_app/src/app/api/diagnosis"));

console.log(`${aiApiAbsent ? "✓" : "✗"} endpoint AI/diagnosis live assenti`);

if (!aiApiAbsent) {
  failures.push("Endpoint AI/diagnosis presente prima della release provider.");
}

console.log("");
console.log("--- Documento e runbook ---");

for (const required of [
  "AI Provider Ops Status V6.2",
  "/api/ops/ai-provider-status",
  "providerCallsEnabled=false",
  "nessuna chiamata AI live",
  "nessuna chiave AI esposta",
  "npm run ops:ai-provider-status-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README provider ops incompleto: ${required}`);
  }
}

for (const required of [
  "AI provider ops status",
  "npm run ops:ai-provider-status-check",
]) {
  const ok = runbookText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Runbook non aggiornato: ${required}`);
  }
}

console.log("");
console.log("--- Alias npm ---");

for (const scriptName of [
  "ops:ai-provider-status-check",
  "ops:ai-provider-safety-check",
  "ops:ai-review-workflow-check",
  "ops:ai-action-plan-check",
  "ops:quick-check",
  "ops:quick-coverage-check",
  "ops:runbook-check",
]) {
  const ok = Boolean(packageJson.scripts?.[scriptName]);
  console.log(`${ok ? "✓" : "✗"} ${scriptName}`);

  if (!ok) {
    failures.push(`Alias npm mancante: ${scriptName}`);
  }
}

if (includeLive) {
  console.log("");
  console.log("--- Live provider ops status protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJson(`${baseUrl}/api/ops/ai-provider-status`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const live = await fetchJson(
      `${baseUrl}/api/ops/ai-provider-status?secret=${encodeURIComponent(secret)}`,
    );

    console.log(`HTTP status protetto: ${live.status}`);

    if (live.status !== 200 || !live.data?.ok) {
      failures.push(`Endpoint protetto non OK: HTTP ${live.status}`);
    } else {
      const ai = live.data.ai || {};
      const guardrails = live.data.guardrails || {};

      for (const [label, ok] of [
        ["providerCallsEnabled=false", ai.providerCallsEnabled === false],
        ["liveProviderEndpoint=false", ai.liveProviderEndpoint === false],
        ["clientProviderCallsAllowed=false", ai.clientProviderCallsAllowed === false],
        ["persistenceAllowed=false", ai.persistenceAllowed === false],
        ["automaticTaskCreationAllowed=false", ai.automaticTaskCreationAllowed === false],
        ["humanReviewRequired=true", ai.humanReviewRequired === true],
        ["reviewBeforeAction=true", guardrails.reviewBeforeAction === true],
        ["redactedOutputOnly=true", guardrails.redactedOutputOnly === true],
      ]) {
        console.log(`${ok ? "✓" : "✗"} ${label}`);

        if (!ok) {
          failures.push(`Live provider ops status inatteso: ${label}`);
        }
      }
    }
  }
}

console.log("");
console.log("--- AI provider ops status check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI provider ops status check completato con successo.");
