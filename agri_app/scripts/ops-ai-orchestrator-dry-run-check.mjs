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
  route: "agri_app/src/app/api/ops/ai-diagnosis-orchestrator-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/photoDiagnosisOrchestratorDryRun.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/DiagnosisOrchestratorDryRunPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiOrchestratorDryRun.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_DIAGNOSIS_ORCHESTRATOR_DRY_RUN_V7_0.md",
  check: "agri_app/scripts/ops-ai-orchestrator-dry-run-check.mjs",
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

console.log("Agri App AI diagnosis orchestrator dry-run check V7.0");
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
const engineText = readRepoFile(files.engine);
const clientText = readRepoFile(files.client);
const photoPageText = readRepoFile(files.photoPage);
const adminPanelText = readRepoFile(files.adminPanel);
const operationsPageText = readRepoFile(files.operationsPage);
const readmeText = readRepoFile(files.readme);
const runbookText = readRepoFile("agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));

console.log("");
console.log("--- Orchestrator engine ---");

for (const required of [
  "DiagnosisOrchestratorDryRun",
  "SyntheticProviderDiagnosis",
  "createDiagnosisOrchestratorDryRun",
  "formatDiagnosisOrchestratorDryRun",
  "createAiProviderRequestPreview",
  "syntheticProviderResponse",
  "responseValidation",
  "operationalDecision",
  "allowedToExecute: false",
  "providerCalled: false",
  "persistencePerformed: false",
  "automaticTaskCreationPerformed: false",
  "automaticInterventionCreationPerformed: false",
  "providerCallsEnabled: false",
  "externalProviderCalled: false",
  "clientProviderCallsAllowed: false",
  "persistenceAllowed: false",
  "automaticTaskCreationAllowed: false",
  "automaticInterventionCreationAllowed: false",
  "humanReviewRequired: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Orchestrator engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops orchestrator ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-diagnosis-orchestrator-dry-run",
  "createDiagnosisOrchestratorDryRun",
  "providerCallsEnabled: false",
  "externalProviderCalled: false",
  "clientProviderCallsAllowed: false",
  "persistenceAllowed: false",
  "automaticTaskCreationAllowed: false",
  "automaticInterventionCreationAllowed: false",
  "humanReviewRequired: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint orchestrator incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI orchestrator dry-run ---");

for (const required of [
  '"use client"',
  "AI Diagnosis Orchestrator Dry Run",
  "Orchestrazione completa diagnosi AI",
  "providerCalled=false",
  "persistencePerformed=false",
  "automaticTaskCreationPerformed=false",
  "automaticInterventionCreationPerformed=false",
  "humanReviewRequired=true",
  "Copia report orchestratore",
  "Copia JSON dry-run",
  "navigator.clipboard.writeText",
  "data-ai-diagnosis-orchestrator-dry-run",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI orchestrator incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import DiagnosisOrchestratorDryRunPanel from "./DiagnosisOrchestratorDryRunPanel";',
  "<DiagnosisOrchestratorDryRunPanel />",
]) {
  const ok = photoPageText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Integrazione pagina diagnosi foto mancante: ${required}`);
  }
}

console.log("");
console.log("--- Pannello admin operations ---");

for (const required of [
  "AI Diagnosis Orchestrator Dry Run",
  "Orchestratore diagnosi AI dry-run",
  "/api/ops/ai-diagnosis-orchestrator-dry-run",
  "providerCalled=false",
  "persistencePerformed=false",
  "allowedToExecute=false",
  "data-ai-orchestrator-dry-run-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin orchestrator incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiOrchestratorDryRun from "./OperationsAiOrchestratorDryRun";',
  "<OperationsAiOrchestratorDryRun />",
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
  ["engine", engineText],
  ["client", clientText],
  ["adminPanel", adminPanelText],
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
  "AI Diagnosis Orchestrator Dry Run V7.0",
  "/api/ops/ai-diagnosis-orchestrator-dry-run",
  "syntheticProviderResponse",
  "responseValidation",
  "operationalDecision",
  "allowedToExecute=false",
  "providerCalled=false",
  "persistencePerformed=false",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "humanReviewRequired=true",
  "npm run ops:ai-orchestrator-dry-run-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README orchestrator incompleto: ${required}`);
  }
}

for (const required of [
  "AI diagnosis orchestrator dry-run",
  "npm run ops:ai-orchestrator-dry-run-check",
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
  "ops:ai-orchestrator-dry-run-check",
  "ops:ai-provider-request-check",
  "ops:ai-evidence-bundle-check",
  "ops:ai-photo-quality-gate-check",
  "ops:ai-pipeline-dry-run-check",
  "ops:ai-provider-response-check",
  "ops:ai-provider-dry-run-check",
  "ops:ai-provider-status-check",
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
  console.log("--- Live orchestrator dry-run protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJson(`${baseUrl}/api/ops/ai-diagnosis-orchestrator-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint orchestrator non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const liveValid = await fetchJson(
      `${baseUrl}/api/ops/ai-diagnosis-orchestrator-dry-run?secret=${encodeURIComponent(secret)}`,
    );

    console.log(`HTTP status orchestrator valid: ${liveValid.status}`);

    if (
      liveValid.status !== 200 ||
      !liveValid.data?.ok ||
      liveValid.data?.dryRun?.providerCalled !== false ||
      liveValid.data?.dryRun?.operationalDecision?.allowedToExecute !== false ||
      liveValid.data?.dryRun?.operationalDecision?.humanReviewRequired !== true
    ) {
      failures.push(`Orchestrator valid non OK: HTTP ${liveValid.status}`);
    } else {
      console.log("✓ orchestrator dry-run live completato senza provider e senza esecuzione operativa");
    }

    const liveIncomplete = await fetchJson(
      `${baseUrl}/api/ops/ai-diagnosis-orchestrator-dry-run?secret=${encodeURIComponent(secret)}&sample=incomplete`,
    );

    console.log(`HTTP status orchestrator incomplete: ${liveIncomplete.status}`);

    if (
      liveIncomplete.status !== 200 ||
      !liveIncomplete.data?.ok ||
      liveIncomplete.data?.dryRun?.requestPreview?.requestReady !== false
    ) {
      failures.push(`Orchestrator incomplete non marcato correttamente: HTTP ${liveIncomplete.status}`);
    } else {
      console.log("✓ orchestrator incomplete marcato non ready");
    }

    const livePost = await fetchJson(
      `${baseUrl}/api/ops/ai-diagnosis-orchestrator-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            plantContext: "vite in filare",
            locationHint: "serra nord",
            symptoms: ["macchie fogliari", "ingiallimento"],
            suspectedCrop: "vite",
            operatorNotes: "Test live protetto orchestratore dry-run.",
            urgency: "medium",
            locale: "it-IT",
            photos: [
              {
                id: "close",
                role: "symptom-close-up",
                caption: "Dettaglio sintomo",
                fileName: "close.webp",
                mimeType: "image/webp",
                sizeBytes: 1200000,
                widthPx: 1600,
                heightPx: 1200,
                includesCloseUp: true,
                includesWholePlant: false,
                includesUnderside: false,
              },
              {
                id: "whole",
                role: "whole-plant",
                caption: "Pianta intera",
                fileName: "whole.webp",
                mimeType: "image/webp",
                sizeBytes: 1300000,
                widthPx: 1600,
                heightPx: 1200,
                includesCloseUp: false,
                includesWholePlant: true,
                includesUnderside: false,
              },
              {
                id: "underside",
                role: "leaf-underside",
                caption: "Pagina inferiore",
                fileName: "underside.webp",
                mimeType: "image/webp",
                sizeBytes: 1100000,
                widthPx: 1600,
                heightPx: 1200,
                includesCloseUp: true,
                includesWholePlant: false,
                includesUnderside: true,
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST orchestrator: ${livePost.status}`);

    if (
      livePost.status !== 200 ||
      !livePost.data?.ok ||
      livePost.data?.dryRun?.responseValidation?.valid !== true ||
      livePost.data?.dryRun?.automaticTaskCreationPerformed !== false ||
      livePost.data?.dryRun?.automaticInterventionCreationPerformed !== false
    ) {
      failures.push(`POST orchestrator non OK: HTTP ${livePost.status}`);
    } else {
      console.log("✓ POST orchestrator generato con validazione e blocco operativo");
    }
  }
}

console.log("");
console.log("--- AI diagnosis orchestrator dry-run check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI diagnosis orchestrator dry-run check completato con successo.");
