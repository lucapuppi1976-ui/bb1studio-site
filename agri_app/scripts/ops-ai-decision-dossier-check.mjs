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
  route: "agri_app/src/app/api/ops/ai-decision-dossier-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiDecisionDossier.ts",
  caseReportEngine: "agri_app/src/lib/ai/photoDiagnosisCaseReport.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/DecisionDossierPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiDecisionDossier.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_DECISION_DOSSIER_V7_6.md",
  check: "agri_app/scripts/ops-ai-decision-dossier-check.mjs",
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

async function fetchJsonWithRetry(url, options = {}, attempts = 12, delayMs = 5000) {
  let last = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    last = await fetchJson(url, options);

    if (last.status !== 404 && last.status !== 520 && last.status !== 503) {
      return last;
    }

    await new Promise((resolvePromise) => setTimeout(resolvePromise, delayMs));
  }

  return last;
}

console.log("Agri App AI decision dossier check V7.6");
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
console.log("--- Decision dossier engine ---");

for (const required of [
  "AiDecisionDossier",
  "DecisionGate",
  "DecisionWorkPackage",
  "DecisionSignOff",
  "createAiDecisionDossier",
  "createIncompleteAiDecisionDossier",
  "createAiDecisionDossierFromInput",
  "formatAiDecisionDossier",
  "dossierFingerprint",
  "caseReportFingerprint",
  "executiveDecision",
  "decisionStatus",
  "gates",
  "workPackages",
  "signOff",
  "textDossierReady: true",
  "jsonDossierReady: true",
  "approvalPacketReady: true",
  "databasePersistenceReady: false",
  "automaticExecutionReady: false",
  "providerCalled: false",
  "persistencePerformed: false",
  "productPrescriptionPerformed: false",
  "dosageAdvicePerformed: false",
  "automaticTaskCreationPerformed: false",
  "automaticInterventionCreationPerformed: false",
  "endpointAiCalled: false",
  "allowedToExecute: false",
  "humanReviewRequired: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Decision dossier engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops decision dossier ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-decision-dossier-dry-run",
  "createAiDecisionDossier",
  "createIncompleteAiDecisionDossier",
  "createAiDecisionDossierFromInput",
  "formatAiDecisionDossier",
  "productPrescriptionPerformed: false",
  "dosageAdvicePerformed: false",
  "automaticTaskCreationPerformed: false",
  "automaticInterventionCreationPerformed: false",
  "allowedToExecute: false",
  "humanReviewRequired: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint decision dossier incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI decision dossier ---");

for (const required of [
  '"use client"',
  "AI Decision Dossier",
  "Approval pack operativo",
  "dossierFingerprint",
  "Decision summary",
  "Safety sign-off",
  "providerCalled=false",
  "persistencePerformed=false",
  "productPrescriptionPerformed=false",
  "dosageAdvicePerformed=false",
  "automaticTaskCreationPerformed=false",
  "automaticInterventionCreationPerformed=false",
  "allowedToExecute=false",
  "humanReviewRequired=true",
  "Copia dossier testuale",
  "Esporta dossier JSON",
  "navigator.clipboard.writeText",
  "data-ai-decision-dossier",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI decision dossier incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import DecisionDossierPanel from "./DecisionDossierPanel";',
  "<DecisionDossierPanel />",
]) {
  const ok = photoPageText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Integrazione pagina diagnosi foto mancante: ${required}`);
  }
}

console.log("");
console.log("--- Pannello Admin Operations ---");

for (const required of [
  "AI Decision Dossier",
  "Approval pack e decision gates",
  "/api/ops/ai-decision-dossier-dry-run",
  "allowedToExecute=false",
  "humanReviewRequired=true",
  "data-ai-decision-dossier-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin decision dossier incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiDecisionDossier from "./OperationsAiDecisionDossier";',
  "<OperationsAiDecisionDossier />",
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
  "AI Decision Dossier V7.6",
  "/api/ops/ai-decision-dossier-dry-run",
  "AiDecisionDossier",
  "DecisionGate",
  "DecisionWorkPackage",
  "DecisionSignOff",
  "dossierFingerprint",
  "caseReportFingerprint",
  "executiveDecision",
  "decisionStatus",
  "textDossierReady=true",
  "jsonDossierReady=true",
  "approvalPacketReady=true",
  "databasePersistenceReady=false",
  "automaticExecutionReady=false",
  "providerCalled=false",
  "persistencePerformed=false",
  "productPrescriptionPerformed=false",
  "dosageAdvicePerformed=false",
  "allowedToExecute=false",
  "humanReviewRequired=true",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "npm run ops:ai-decision-dossier-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README decision dossier incompleto: ${required}`);
  }
}

for (const required of [
  "AI decision dossier",
  "npm run ops:ai-decision-dossier-check",
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
  "ops:ai-decision-dossier-check",
  "ops:ai-case-report-check",
  "ops:ai-solution-playbook-check",
  "ops:ai-differential-diagnosis-check",
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
  console.log("--- Live decision dossier protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-decision-dossier-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint decision dossier non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const liveValid = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-decision-dossier-dry-run?secret=${encodeURIComponent(secret)}`,
    );

    console.log(`HTTP status dossier valid: ${liveValid.status}`);

    if (
      liveValid.status !== 200 ||
      !liveValid.data?.ok ||
      liveValid.data?.dossier?.dossierFingerprint === undefined ||
      !Array.isArray(liveValid.data?.dossier?.gates) ||
      liveValid.data?.dossier?.gates?.length < 4 ||
      !Array.isArray(liveValid.data?.dossier?.workPackages) ||
      liveValid.data?.dossier?.workPackages?.length < 3 ||
      liveValid.data?.dossier?.exportPackage?.textDossierReady !== true ||
      liveValid.data?.dossier?.exportPackage?.jsonDossierReady !== true ||
      liveValid.data?.dossier?.exportPackage?.approvalPacketReady !== true ||
      liveValid.data?.dossier?.safety?.providerCalled !== false ||
      liveValid.data?.dossier?.safety?.productPrescriptionPerformed !== false ||
      liveValid.data?.dossier?.safety?.dosageAdvicePerformed !== false ||
      liveValid.data?.dossier?.safety?.allowedToExecute !== false ||
      liveValid.data?.dossier?.safety?.humanReviewRequired !== true
    ) {
      failures.push(`Decision dossier valid non OK: HTTP ${liveValid.status}`);
    } else {
      console.log("✓ decision dossier live generato senza provider, prescrizioni, dosi o persistenza");
    }

    const liveIncomplete = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-decision-dossier-dry-run?secret=${encodeURIComponent(secret)}&sample=incomplete`,
    );

    console.log(`HTTP status dossier incomplete: ${liveIncomplete.status}`);

    if (
      liveIncomplete.status !== 200 ||
      !liveIncomplete.data?.ok ||
      !Array.isArray(liveIncomplete.data?.dossier?.gates) ||
      liveIncomplete.data?.dossier?.gates?.length < 4
    ) {
      failures.push(`Decision dossier incomplete non OK: HTTP ${liveIncomplete.status}`);
    } else {
      console.log("✓ decision dossier incomplete genera gate operativi");
    }

    const livePost = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-decision-dossier-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            photoId: "live-decision-dossier-photo",
            photoRole: "symptom-close-up",
            fileName: "live-decision-dossier.webp",
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
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST dossier: ${livePost.status}`);

    if (
      livePost.status !== 200 ||
      !livePost.data?.ok ||
      !livePost.data?.dossier?.executiveDecision ||
      livePost.data?.dossier?.safety?.persistencePerformed !== false ||
      livePost.data?.dossier?.safety?.automaticTaskCreationPerformed !== false ||
      livePost.data?.dossier?.safety?.automaticInterventionCreationPerformed !== false
    ) {
      failures.push(`POST decision dossier non OK: HTTP ${livePost.status}`);
    } else {
      console.log("✓ POST decision dossier generato con gate e blocchi operativi");
    }
  }
}

console.log("");
console.log("--- AI decision dossier check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI decision dossier check completato con successo.");
