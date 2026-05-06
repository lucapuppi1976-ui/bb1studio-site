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
  route: "agri_app/src/app/api/ops/ai-work-order-preview-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiWorkOrderPreview.ts",
  decisionDossierEngine: "agri_app/src/lib/ai/aiDecisionDossier.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/WorkOrderPreviewPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiWorkOrderPreview.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_WORK_ORDER_PREVIEW_V7_7.md",
  check: "agri_app/scripts/ops-ai-work-order-preview-check.mjs",
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

console.log("Agri App AI work order preview check V7.7");
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
console.log("--- Work order preview engine ---");

for (const required of [
  "AiWorkOrderPreview",
  "WorkOrderTaskDraft",
  "WorkOrderInterventionDraft",
  "WorkOrderExecutionConstraints",
  "createAiWorkOrderPreview",
  "createIncompleteAiWorkOrderPreview",
  "createAiWorkOrderPreviewFromInput",
  "formatAiWorkOrderPreview",
  "previewFingerprint",
  "sourceDossierFingerprint",
  "sourceCaseReportFingerprint",
  "tasks",
  "interventions",
  "executionConstraints",
  "approvalRequirements",
  "textWorkOrderReady: true",
  "jsonWorkOrderReady: true",
  "reviewerPacketReady: true",
  "taskCreationReady: false",
  "interventionCreationReady: false",
  "providerCalled: false",
  "persistencePerformed: false",
  "taskCreated: false",
  "interventionCreated: false",
  "productPrescriptionPerformed: false",
  "dosageAdvicePerformed: false",
  "allowedToCreateTask: false",
  "allowedToCreateIntervention: false",
  "allowedToExecute: false",
  "humanReviewRequired: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Work order preview engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops work order preview ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-work-order-preview-dry-run",
  "createAiWorkOrderPreview",
  "createIncompleteAiWorkOrderPreview",
  "createAiWorkOrderPreviewFromInput",
  "formatAiWorkOrderPreview",
  "providerCalled: false",
  "persistencePerformed: false",
  "taskCreated: false",
  "interventionCreated: false",
  "productPrescriptionPerformed: false",
  "dosageAdvicePerformed: false",
  "allowedToCreateTask: false",
  "allowedToCreateIntervention: false",
  "allowedToExecute: false",
  "humanReviewRequired: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint work order preview incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI work order preview ---");

for (const required of [
  '"use client"',
  "AI Work Order Preview",
  "Execution-safe work package",
  "previewFingerprint",
  "Preview summary",
  "Execution constraints",
  "allowedToCreateTask=false",
  "allowedToCreateIntervention=false",
  "allowedToExecute=false",
  "allowedToPrescribeProduct=false",
  "allowedToSuggestDosage=false",
  "requiresHumanReview=true",
  "Copia work order",
  "Esporta preview JSON",
  "navigator.clipboard.writeText",
  "data-ai-work-order-preview",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI work order preview incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import WorkOrderPreviewPanel from "./WorkOrderPreviewPanel";',
  "<WorkOrderPreviewPanel />",
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
  "AI Work Order Preview",
  "Execution-safe package",
  "/api/ops/ai-work-order-preview-dry-run",
  "draft only",
  "allowedToExecute=false",
  "data-ai-work-order-preview-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin work order preview incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiWorkOrderPreview from "./OperationsAiWorkOrderPreview";',
  "<OperationsAiWorkOrderPreview />",
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
  "AI Work Order Preview V7.7",
  "/api/ops/ai-work-order-preview-dry-run",
  "AiWorkOrderPreview",
  "WorkOrderTaskDraft",
  "WorkOrderInterventionDraft",
  "WorkOrderExecutionConstraints",
  "previewFingerprint",
  "sourceDossierFingerprint",
  "sourceCaseReportFingerprint",
  "textWorkOrderReady=true",
  "jsonWorkOrderReady=true",
  "reviewerPacketReady=true",
  "taskCreationReady=false",
  "interventionCreationReady=false",
  "providerCalled=false",
  "persistencePerformed=false",
  "taskCreated=false",
  "interventionCreated=false",
  "productPrescriptionPerformed=false",
  "dosageAdvicePerformed=false",
  "allowedToCreateTask=false",
  "allowedToCreateIntervention=false",
  "allowedToExecute=false",
  "humanReviewRequired=true",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "nessuna creazione automatica",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "npm run ops:ai-work-order-preview-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README work order preview incompleto: ${required}`);
  }
}

for (const required of [
  "AI work order preview",
  "npm run ops:ai-work-order-preview-check",
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
  "ops:ai-work-order-preview-check",
  "ops:ai-decision-dossier-check",
  "ops:ai-case-report-check",
  "ops:ai-solution-playbook-check",
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
  console.log("--- Live work order preview protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-work-order-preview-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint work order non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const liveValid = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-work-order-preview-dry-run?secret=${encodeURIComponent(secret)}`,
    );

    console.log(`HTTP status work order valid: ${liveValid.status}`);

    if (
      liveValid.status !== 200 ||
      !liveValid.data?.ok ||
      liveValid.data?.preview?.previewFingerprint === undefined ||
      !Array.isArray(liveValid.data?.preview?.tasks) ||
      liveValid.data?.preview?.tasks?.length < 3 ||
      !Array.isArray(liveValid.data?.preview?.interventions) ||
      liveValid.data?.preview?.interventions?.length < 3 ||
      liveValid.data?.preview?.exportPackage?.textWorkOrderReady !== true ||
      liveValid.data?.preview?.exportPackage?.jsonWorkOrderReady !== true ||
      liveValid.data?.preview?.exportPackage?.reviewerPacketReady !== true ||
      liveValid.data?.preview?.exportPackage?.taskCreationReady !== false ||
      liveValid.data?.preview?.exportPackage?.interventionCreationReady !== false ||
      liveValid.data?.preview?.safety?.providerCalled !== false ||
      liveValid.data?.preview?.safety?.persistencePerformed !== false ||
      liveValid.data?.preview?.safety?.taskCreated !== false ||
      liveValid.data?.preview?.safety?.interventionCreated !== false ||
      liveValid.data?.preview?.safety?.productPrescriptionPerformed !== false ||
      liveValid.data?.preview?.safety?.dosageAdvicePerformed !== false ||
      liveValid.data?.preview?.safety?.allowedToCreateTask !== false ||
      liveValid.data?.preview?.safety?.allowedToCreateIntervention !== false ||
      liveValid.data?.preview?.safety?.allowedToExecute !== false ||
      liveValid.data?.preview?.safety?.humanReviewRequired !== true
    ) {
      failures.push(`Work order valid non OK: HTTP ${liveValid.status}`);
    } else {
      console.log("✓ work order live generato senza provider, persistenza, task, interventi, prescrizioni o dosi");
    }

    const liveIncomplete = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-work-order-preview-dry-run?secret=${encodeURIComponent(secret)}&sample=incomplete`,
    );

    console.log(`HTTP status work order incomplete: ${liveIncomplete.status}`);

    if (
      liveIncomplete.status !== 200 ||
      !liveIncomplete.data?.ok ||
      !Array.isArray(liveIncomplete.data?.preview?.tasks) ||
      liveIncomplete.data?.preview?.tasks?.length < 3
    ) {
      failures.push(`Work order incomplete non OK: HTTP ${liveIncomplete.status}`);
    } else {
      console.log("✓ work order incomplete genera task draft e vincoli operativi");
    }

    const livePost = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-work-order-preview-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            photoId: "live-work-order-preview-photo",
            photoRole: "symptom-close-up",
            fileName: "live-work-order-preview.webp",
            plantContext: "olivo in campo",
            locationHint: "settore ovest",
            crop: "olivo",
            observedAtLabel: "live-protected-dry-run",
            regions: [
              {
                id: "r1",
                label: "Ingiallimento fogliare",
                tissue: "leaf-upper",
                severity: "medium",
                distribution: "diffuse",
                normalizedBox: {
                  x: 24,
                  y: 18,
                  width: 32,
                  height: 22,
                },
                visibleSigns: ["ingiallimento", "macchie fogliari"],
                operatorNote: "Sintomo principale.",
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST work order: ${livePost.status}`);

    if (
      livePost.status !== 200 ||
      !livePost.data?.ok ||
      !livePost.data?.preview?.summary ||
      livePost.data?.preview?.safety?.persistencePerformed !== false ||
      livePost.data?.preview?.safety?.taskCreated !== false ||
      livePost.data?.preview?.safety?.interventionCreated !== false ||
      livePost.data?.preview?.safety?.allowedToCreateTask !== false ||
      livePost.data?.preview?.safety?.allowedToCreateIntervention !== false
    ) {
      failures.push(`POST work order non OK: HTTP ${livePost.status}`);
    } else {
      console.log("✓ POST work order generato con task draft, intervention draft e blocchi operativi");
    }
  }
}

console.log("");
console.log("--- AI work order preview check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI work order preview check completato con successo.");
