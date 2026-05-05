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
  route: "agri_app/src/app/api/ops/ai-diagnosis-case-file-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/photoDiagnosisCaseFile.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/DiagnosisCaseFilePanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiCaseFile.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_DIAGNOSIS_CASE_FILE_V7_1.md",
  check: "agri_app/scripts/ops-ai-case-file-check.mjs",
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

console.log("Agri App AI diagnosis case file check V7.1");
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
console.log("--- Case file engine ---");

for (const required of [
  "DiagnosisCaseFile",
  "DiagnosisCaseFileAuditEntry",
  "createDiagnosisCaseFile",
  "formatDiagnosisCaseFile",
  "createDiagnosisCaseFileFromDryRunReport",
  "caseFileFingerprint",
  "auditTrail",
  "reportText",
  "jsonReady: true",
  "providerCalled: false",
  "persistencePerformed: false",
  "automaticTaskCreationPerformed: false",
  "automaticInterventionCreationPerformed: false",
  "allowedToExecute: false",
  "humanReviewRequired: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Case file engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops case file ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-diagnosis-case-file-dry-run",
  "createDiagnosisCaseFile",
  "createDiagnosisCaseFileFromDryRunReport",
  "providerCalled: false",
  "persistencePerformed: false",
  "automaticTaskCreationPerformed: false",
  "automaticInterventionCreationPerformed: false",
  "allowedToExecute: false",
  "humanReviewRequired: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint case file incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI case file ---");

for (const required of [
  '"use client"',
  "AI Diagnosis Case File",
  "Case file diagnostico e audit trail",
  "caseFileFingerprint",
  "auditTrail",
  "Copia case file",
  "Esporta case file JSON",
  "navigator.clipboard.writeText",
  "providerCalled=false",
  "persistencePerformed=false",
  "automaticTaskCreationPerformed=false",
  "automaticInterventionCreationPerformed=false",
  "allowedToExecute=false",
  "humanReviewRequired=true",
  "data-ai-diagnosis-case-file",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI case file incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import DiagnosisCaseFilePanel from "./DiagnosisCaseFilePanel";',
  "<DiagnosisCaseFilePanel />",
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
  "AI Diagnosis Case File",
  "Case file diagnostico e audit trail",
  "/api/ops/ai-diagnosis-case-file-dry-run",
  "reportText + JSON",
  "auditTrail",
  "allowedToExecute=false",
  "data-ai-case-file-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin case file incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiCaseFile from "./OperationsAiCaseFile";',
  "<OperationsAiCaseFile />",
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
  "AI Diagnosis Case File V7.1",
  "/api/ops/ai-diagnosis-case-file-dry-run",
  "caseFileFingerprint",
  "auditTrail",
  "reportText",
  "jsonReady",
  "allowedToExecute=false",
  "providerCalled=false",
  "persistencePerformed=false",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "humanReviewRequired=true",
  "npm run ops:ai-case-file-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README case file incompleto: ${required}`);
  }
}

for (const required of [
  "AI diagnosis case file",
  "npm run ops:ai-case-file-check",
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
  "ops:ai-case-file-check",
  "ops:ai-orchestrator-dry-run-check",
  "ops:ai-provider-request-check",
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
  console.log("--- Live case file protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJson(`${baseUrl}/api/ops/ai-diagnosis-case-file-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint case file non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const liveValid = await fetchJson(
      `${baseUrl}/api/ops/ai-diagnosis-case-file-dry-run?secret=${encodeURIComponent(secret)}`,
    );

    console.log(`HTTP status case file valid: ${liveValid.status}`);

    if (
      liveValid.status !== 200 ||
      !liveValid.data?.ok ||
      liveValid.data?.caseFile?.caseFileFingerprint === undefined ||
      liveValid.data?.caseFile?.safety?.providerCalled !== false ||
      liveValid.data?.caseFile?.safety?.allowedToExecute !== false ||
      liveValid.data?.caseFile?.humanReview?.required !== true
    ) {
      failures.push(`Case file valid non OK: HTTP ${liveValid.status}`);
    } else {
      console.log("✓ case file live generato senza provider, senza persistenza e senza esecuzione");
    }

    const liveIncomplete = await fetchJson(
      `${baseUrl}/api/ops/ai-diagnosis-case-file-dry-run?secret=${encodeURIComponent(secret)}&sample=incomplete`,
    );

    console.log(`HTTP status case file incomplete: ${liveIncomplete.status}`);

    if (
      liveIncomplete.status !== 200 ||
      !liveIncomplete.data?.ok ||
      !["requires-more-evidence", "blocked-for-safety"].includes(liveIncomplete.data?.caseFile?.status)
    ) {
      failures.push(`Case file incomplete non marcato correttamente: HTTP ${liveIncomplete.status}`);
    } else {
      console.log("✓ case file incomplete marcato come richiede evidenze o bloccato");
    }

    const livePost = await fetchJson(
      `${baseUrl}/api/ops/ai-diagnosis-case-file-dry-run?secret=${encodeURIComponent(secret)}`,
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
            operatorNotes: "Test live protetto case file.",
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

    console.log(`HTTP status POST case file: ${livePost.status}`);

    if (
      livePost.status !== 200 ||
      !livePost.data?.ok ||
      livePost.data?.caseFile?.exports?.jsonReady !== true ||
      livePost.data?.caseFile?.safety?.persistencePerformed !== false ||
      livePost.data?.caseFile?.safety?.automaticTaskCreationPerformed !== false ||
      livePost.data?.caseFile?.safety?.automaticInterventionCreationPerformed !== false
    ) {
      failures.push(`POST case file non OK: HTTP ${livePost.status}`);
    } else {
      console.log("✓ POST case file generato con export e blocco operativo");
    }
  }
}

console.log("");
console.log("--- AI diagnosis case file check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI diagnosis case file check completato con successo.");
