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
  route: "agri_app/src/app/api/ops/ai-provider-dry-run/route.ts",
  adapter: "agri_app/src/lib/ai/photoDiagnosisDryRun.ts",
  panel: "agri_app/src/app/admin/operations/OperationsAiProviderDryRun.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_PROVIDER_DRY_RUN_ADAPTER_V6_3.md",
  check: "agri_app/scripts/ops-ai-provider-dry-run-check.mjs",
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

console.log("Agri App AI provider dry-run check V6.3");
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
const adapterText = readRepoFile(files.adapter);
const panelText = readRepoFile(files.panel);
const operationsPageText = readRepoFile(files.operationsPage);
const readmeText = readRepoFile(files.readme);
const runbookText = readRepoFile("agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));

console.log("");
console.log("--- Adapter dry-run locale ---");

for (const required of [
  "DryRunDiagnosisInput",
  "DryRunProviderRequest",
  "DryRunProviderResult",
  "createDryRunProviderRequest",
  "createDryRunProviderResult",
  "externalProviderCalled: false",
  "providerCallsEnabled: false",
  "persistenceAllowed: false",
  "automaticTaskCreationAllowed: false",
  "humanReviewRequired: true",
]) {
  const ok = adapterText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Adapter dry-run incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops dry-run ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-provider-dry-run",
  "createDryRunProviderRequest",
  "createDryRunProviderResult",
  "externalProviderCalled: false",
  "providerCallsEnabled: false",
  "noAutomaticDbWrites: true",
  "humanReviewRequired: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint dry-run incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Pannello admin operations ---");

for (const required of [
  "AI Provider Dry-Run Adapter",
  "Adapter server-side simulato",
  "/api/ops/ai-provider-dry-run",
  "externalProviderCalled=false",
  "providerCallsEnabled=false",
  "humanReviewRequired=true",
  "data-ai-provider-dry-run-adapter",
]) {
  const ok = panelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello dry-run incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione Operations Center ---");

for (const required of [
  'import OperationsAiProviderDryRun from "./OperationsAiProviderDryRun";',
  "<OperationsAiProviderDryRun />",
]) {
  const ok = operationsPageText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Integrazione Operations Center mancante: ${required}`);
  }
}

console.log("");
console.log("--- Guardrail no AI live ---");

for (const [label, text] of [
  ["route", routeText],
  ["adapter", adapterText],
  ["panel", panelText],
]) {
  for (const forbidden of [
    "fetch(",
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "GEMINI_API_KEY",
    "GOOGLE_API_KEY",
    "secret=",
    "--secret",
    "localStorage",
    "sessionStorage",
    "prisma.",
    "db.",
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
  "AI Provider Dry-Run Adapter V6.3",
  "/api/ops/ai-provider-dry-run",
  "externalProviderCalled=false",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "nessuna creazione automatica",
  "npm run ops:ai-provider-dry-run-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README dry-run incompleto: ${required}`);
  }
}

for (const required of [
  "AI provider dry-run adapter",
  "npm run ops:ai-provider-dry-run-check",
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
  "ops:ai-provider-dry-run-check",
  "ops:ai-provider-status-check",
  "ops:ai-provider-safety-check",
  "ops:ai-review-workflow-check",
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
  console.log("--- Live dry-run protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJson(`${baseUrl}/api/ops/ai-provider-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint dry-run non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const liveGet = await fetchJson(
      `${baseUrl}/api/ops/ai-provider-dry-run?secret=${encodeURIComponent(secret)}`,
    );

    console.log(`HTTP status GET protetto: ${liveGet.status}`);

    if (liveGet.status !== 200 || !liveGet.data?.ok) {
      failures.push(`Endpoint dry-run GET protetto non OK: HTTP ${liveGet.status}`);
    }

    const livePost = await fetchJson(
      `${baseUrl}/api/ops/ai-provider-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageFileName: "dry-run-leaf.webp",
          imageMimeType: "image/webp",
          plantContext: "vite in filare",
          locationHint: "serra nord",
          observedSymptoms: ["macchie fogliari", "ingiallimento"],
          severity: "medium",
          operatorNotes: "test operativo dry-run",
        }),
      },
    );

    console.log(`HTTP status POST protetto: ${livePost.status}`);

    if (livePost.status !== 200 || !livePost.data?.ok) {
      failures.push(`Endpoint dry-run POST protetto non OK: HTTP ${livePost.status}`);
    } else {
      const result = livePost.data.providerResult || {};
      const guardrails = livePost.data.guardrails || {};

      for (const [label, ok] of [
        ["providerResult.externalProviderCalled=false", result.externalProviderCalled === false],
        ["providerResult.providerCallsEnabled=false", result.providerCallsEnabled === false],
        ["providerResult.persistenceAllowed=false", result.persistenceAllowed === false],
        ["providerResult.automaticTaskCreationAllowed=false", result.automaticTaskCreationAllowed === false],
        ["providerResult.humanReviewRequired=true", result.humanReviewRequired === true],
        ["guardrails.noAutomaticDbWrites=true", guardrails.noAutomaticDbWrites === true],
        ["guardrails.humanReviewRequired=true", guardrails.humanReviewRequired === true],
      ]) {
        console.log(`${ok ? "✓" : "✗"} ${label}`);

        if (!ok) {
          failures.push(`Live dry-run inatteso: ${label}`);
        }
      }
    }
  }
}

console.log("");
console.log("--- AI provider dry-run check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI provider dry-run check completato con successo.");
