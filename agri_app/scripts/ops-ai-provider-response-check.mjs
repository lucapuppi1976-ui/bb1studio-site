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
  route: "agri_app/src/app/api/ops/ai-provider-response-validate/route.ts",
  contract: "agri_app/src/lib/ai/photoDiagnosisProviderResponse.ts",
  panel: "agri_app/src/app/admin/operations/OperationsAiProviderResponse.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_PROVIDER_RESPONSE_CONTRACT_V6_4.md",
  check: "agri_app/scripts/ops-ai-provider-response-check.mjs",
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

console.log("Agri App AI provider response contract check V6.4");
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
const contractText = readRepoFile(files.contract);
const panelText = readRepoFile(files.panel);
const operationsPageText = readRepoFile(files.operationsPage);
const readmeText = readRepoFile(files.readme);
const runbookText = readRepoFile("agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));

console.log("");
console.log("--- Response contract validator ---");

for (const required of [
  "ProviderDiagnosisResponseCandidate",
  "ProviderResponseValidation",
  "providerResponseSchemaVersion",
  "createValidProviderResponseFixture",
  "createInvalidProviderResponseFixture",
  "validateProviderDiagnosisResponse",
  "formatProviderValidationReport",
  "humanReviewRequired",
  "automaticTaskCreationAllowed",
  "persistenceAllowed",
  "externalProviderCalled",
]) {
  const ok = contractText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Response contract incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops response validate ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-provider-response-validate",
  "validateProviderDiagnosisResponse",
  "formatProviderValidationReport",
  "providerCallsEnabled: false",
  "externalProviderCalled: false",
  "persistenceAllowed: false",
  "automaticTaskCreationAllowed: false",
  "humanReviewRequired: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint response validate incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Pannello admin operations ---");

for (const required of [
  "AI Provider Response Contract",
  "Validatore risposta provider",
  "/api/ops/ai-provider-response-validate",
  "agri-ai-diagnosis-response.v1",
  "automaticTaskCreationAllowed=false",
  "persistenceAllowed=false",
  "humanReviewRequired=true",
  "data-ai-provider-response-contract",
]) {
  const ok = panelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello response contract incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione Operations Center ---");

for (const required of [
  'import OperationsAiProviderResponse from "./OperationsAiProviderResponse";',
  "<OperationsAiProviderResponse />",
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
  ["contract", contractText],
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
  "AI Provider Response Contract V6.4",
  "/api/ops/ai-provider-response-validate",
  "agri-ai-diagnosis-response.v1",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "nessuna creazione automatica",
  "humanReviewRequired=true",
  "npm run ops:ai-provider-response-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README response contract incompleto: ${required}`);
  }
}

for (const required of [
  "AI provider response contract",
  "npm run ops:ai-provider-response-check",
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
  "ops:ai-provider-response-check",
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
  console.log("--- Live response contract protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJson(`${baseUrl}/api/ops/ai-provider-response-validate`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint response validate non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const liveValid = await fetchJson(
      `${baseUrl}/api/ops/ai-provider-response-validate?secret=${encodeURIComponent(secret)}`,
    );

    console.log(`HTTP status valid fixture: ${liveValid.status}`);

    if (liveValid.status !== 200 || !liveValid.data?.ok || liveValid.data?.validation?.ok !== true) {
      failures.push(`Valid fixture non OK: HTTP ${liveValid.status}`);
    } else {
      console.log("✓ valid fixture accettata");
    }

    const liveInvalid = await fetchJson(
      `${baseUrl}/api/ops/ai-provider-response-validate?secret=${encodeURIComponent(secret)}&sample=invalid`,
    );

    console.log(`HTTP status invalid fixture: ${liveInvalid.status}`);

    if (liveInvalid.status !== 200 || !liveInvalid.data?.ok || liveInvalid.data?.validation?.ok !== false) {
      failures.push(`Invalid fixture non respinta correttamente: HTTP ${liveInvalid.status}`);
    } else {
      console.log("✓ invalid fixture respinta dal validatore");
    }

    const livePost = await fetchJson(
      `${baseUrl}/api/ops/ai-provider-response-validate?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidate: {
            schemaVersion: "agri-ai-diagnosis-response.v1",
            language: "it",
            visualSummary: "Foglie con macchie e ingiallimento localizzato.",
            severity: "medium",
            confidence: 0.44,
            hypotheses: [
              {
                label: "Stress idrico o nutrizionale",
                category: "water",
                confidence: 0.4,
                evidence: ["ingiallimento"],
                uncertainty: ["manca storico irrigazione"],
              },
            ],
            immediateActions: [
              {
                title: "Raccogliere foto aggiuntive",
                priority: "medium",
                description: "Acquisire dettaglio foglia e pianta intera.",
                safetyNote: "Non applicare trattamenti senza revisione umana.",
                requiresHumanReview: true,
              },
            ],
            additionalChecks: ["controllare irrigazione", "verificare presenza insetti"],
            escalationCriteria: ["peggioramento rapido", "diffusione su nuove piante"],
            humanReviewRequired: true,
            automaticTaskCreationAllowed: false,
            persistenceAllowed: false,
            providerMetadata: {
              model: "dry-run-live-test",
              mode: "validation-only",
              externalProviderCalled: false,
            },
          },
        }),
      },
    );

    console.log(`HTTP status POST validazione: ${livePost.status}`);

    if (livePost.status !== 200 || !livePost.data?.ok || livePost.data?.validation?.ok !== true) {
      failures.push(`POST validazione non OK: HTTP ${livePost.status}`);
    } else {
      console.log("✓ POST validazione accettata");
    }
  }
}

console.log("");
console.log("--- AI provider response contract check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI provider response contract check completato con successo.");
