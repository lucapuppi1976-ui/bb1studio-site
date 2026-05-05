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
  route: "agri_app/src/app/api/ops/ai-differential-diagnosis-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/photoDifferentialDiagnosis.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/DifferentialDiagnosisPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiDifferentialDiagnosis.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_DIFFERENTIAL_DIAGNOSIS_MATRIX_V7_3.md",
  check: "agri_app/scripts/ops-ai-differential-diagnosis-check.mjs",
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

console.log("Agri App AI differential diagnosis check V7.3");
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
console.log("--- Differential engine ---");

for (const required of [
  "DifferentialDiagnosisMatrix",
  "DifferentialDiagnosisCandidate",
  "DifferentialEvidenceFactor",
  "createDifferentialDiagnosisMatrix",
  "createIncompleteDifferentialDiagnosisMatrix",
  "formatDifferentialDiagnosisMatrix",
  "matrixFingerprint",
  "evidenceFor",
  "evidenceAgainst",
  "evidenceMissing",
  "recommendedChecks",
  "conservativeActions",
  "blockedActions",
  "confidenceBand",
  "riskBand",
  "nextBestEvidence",
  "providerCalled: false",
  "persistencePerformed: false",
  "automaticTaskCreationPerformed: false",
  "automaticInterventionCreationPerformed: false",
  "allowedToExecute: false",
  "humanReviewRequired: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Differential engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops differential ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-differential-diagnosis-dry-run",
  "createDifferentialDiagnosisMatrix",
  "createIncompleteDifferentialDiagnosisMatrix",
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
    failures.push(`Endpoint differential incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI differential ---");

for (const required of [
  '"use client"',
  "AI Differential Diagnosis Matrix",
  "Diagnosi differenziale spiegabile",
  "matrixFingerprint",
  "Top candidate",
  "Evidenze a favore",
  "Evidenze contro",
  "Mancanti",
  "Evidence gaps",
  "Copia matrice differenziale",
  "Esporta matrix JSON",
  "navigator.clipboard.writeText",
  "providerCalled=false",
  "persistencePerformed=false",
  "automaticTaskCreationPerformed=false",
  "automaticInterventionCreationPerformed=false",
  "allowedToExecute=false",
  "humanReviewRequired=true",
  "data-ai-differential-diagnosis",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI differential incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import DifferentialDiagnosisPanel from "./DifferentialDiagnosisPanel";',
  "<DifferentialDiagnosisPanel />",
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
  "AI Differential Diagnosis Matrix",
  "Diagnosi differenziale spiegabile",
  "/api/ops/ai-differential-diagnosis-dry-run",
  "matrixFingerprint",
  "evidenceFor / against / missing",
  "humanReviewRequired=true",
  "data-ai-differential-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin differential incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiDifferentialDiagnosis from "./OperationsAiDifferentialDiagnosis";',
  "<OperationsAiDifferentialDiagnosis />",
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
  "AI Differential Diagnosis Matrix V7.3",
  "/api/ops/ai-differential-diagnosis-dry-run",
  "DifferentialDiagnosisMatrix",
  "matrixFingerprint",
  "evidenceFor",
  "evidenceAgainst",
  "evidenceMissing",
  "confidenceBand",
  "riskBand",
  "allowedToExecute=false",
  "providerCalled=false",
  "persistencePerformed=false",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "humanReviewRequired=true",
  "npm run ops:ai-differential-diagnosis-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README differential incompleto: ${required}`);
  }
}

for (const required of [
  "AI differential diagnosis matrix",
  "npm run ops:ai-differential-diagnosis-check",
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
  "ops:ai-differential-diagnosis-check",
  "ops:ai-photo-annotation-check",
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
  console.log("--- Live differential protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJson(`${baseUrl}/api/ops/ai-differential-diagnosis-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint differential non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const liveValid = await fetchJson(
      `${baseUrl}/api/ops/ai-differential-diagnosis-dry-run?secret=${encodeURIComponent(secret)}`,
    );

    console.log(`HTTP status differential valid: ${liveValid.status}`);

    if (
      liveValid.status !== 200 ||
      !liveValid.data?.ok ||
      liveValid.data?.matrix?.matrixFingerprint === undefined ||
      !Array.isArray(liveValid.data?.matrix?.candidates) ||
      liveValid.data?.matrix?.candidates?.length < 3 ||
      liveValid.data?.matrix?.safety?.providerCalled !== false ||
      liveValid.data?.matrix?.safety?.allowedToExecute !== false ||
      liveValid.data?.matrix?.safety?.humanReviewRequired !== true
    ) {
      failures.push(`Differential valid non OK: HTTP ${liveValid.status}`);
    } else {
      console.log("✓ differential live generato senza provider, senza persistenza e senza esecuzione");
    }

    const liveIncomplete = await fetchJson(
      `${baseUrl}/api/ops/ai-differential-diagnosis-dry-run?secret=${encodeURIComponent(secret)}&sample=incomplete`,
    );

    console.log(`HTTP status differential incomplete: ${liveIncomplete.status}`);

    if (
      liveIncomplete.status !== 200 ||
      !liveIncomplete.data?.ok ||
      !Array.isArray(liveIncomplete.data?.matrix?.evidenceGaps) ||
      liveIncomplete.data?.matrix?.evidenceGaps?.length < 1
    ) {
      failures.push(`Differential incomplete senza evidence gaps: HTTP ${liveIncomplete.status}`);
    } else {
      console.log("✓ differential incomplete genera evidence gaps");
    }

    const livePost = await fetchJson(
      `${baseUrl}/api/ops/ai-differential-diagnosis-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            photoId: "live-differential-photo",
            photoRole: "symptom-close-up",
            fileName: "live-differential.webp",
            plantContext: "vite in filare",
            locationHint: "serra nord",
            crop: "vite",
            observedAtLabel: "live-protected-dry-run",
            regions: [
              {
                id: "r1",
                label: "Macchia fogliare",
                tissue: "leaf-upper",
                severity: "medium",
                distribution: "localized",
                normalizedBox: {
                  x: 20,
                  y: 20,
                  width: 30,
                  height: 20,
                },
                visibleSigns: ["macchie brune", "alone giallo"],
                operatorNote: "Sintomo principale.",
              },
              {
                id: "r2",
                label: "Ingiallimento",
                tissue: "leaf-underside",
                severity: "low",
                distribution: "scattered",
                normalizedBox: {
                  x: 54,
                  y: 40,
                  width: 22,
                  height: 24,
                },
                visibleSigns: ["ingiallimento"],
                operatorNote: "Sintomo secondario.",
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST differential: ${livePost.status}`);

    if (
      livePost.status !== 200 ||
      !livePost.data?.ok ||
      !livePost.data?.matrix?.topCandidate ||
      livePost.data?.matrix?.safety?.persistencePerformed !== false ||
      livePost.data?.matrix?.safety?.automaticTaskCreationPerformed !== false ||
      livePost.data?.matrix?.safety?.automaticInterventionCreationPerformed !== false
    ) {
      failures.push(`POST differential non OK: HTTP ${livePost.status}`);
    } else {
      console.log("✓ POST differential generato con ranking e blocco operativo");
    }
  }
}

console.log("");
console.log("--- AI differential diagnosis check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI differential diagnosis check completato con successo.");
