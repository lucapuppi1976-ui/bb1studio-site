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
  route: "agri_app/src/app/api/ops/ai-work-order-execution-gate-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiWorkOrderExecutionGate.ts",
  previewEngine: "agri_app/src/lib/ai/aiWorkOrderPreview.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/WorkOrderExecutionGatePanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiWorkOrderExecutionGate.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_WORK_ORDER_EXECUTION_GATE_V7_8.md",
  check: "agri_app/scripts/ops-ai-work-order-execution-gate-check.mjs",
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

console.log("Agri App AI work order execution gate check V7.8");
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
console.log("--- Execution gate engine ---");

for (const required of [
  "AiWorkOrderExecutionGate",
  "ExecutionGateInput",
  "ExecutionGateChecklistItem",
  "ExecutionReviewDecision",
  "ExecutionGateStatus",
  "defaultExecutionGateInput",
  "approvedExecutionGateInput",
  "createAiWorkOrderExecutionGate",
  "createApprovedAiWorkOrderExecutionGate",
  "createBlockedAiWorkOrderExecutionGate",
  "createAiWorkOrderExecutionGateFromInput",
  "formatAiWorkOrderExecutionGate",
  "manualConversionAllowed",
  "automaticExecutionAllowed: false",
  "automaticTaskCreationAllowed: false",
  "automaticInterventionCreationAllowed: false",
  "noAutomaticDbWrites: true",
  "noProviderCall: true",
  "taskCreated: false",
  "interventionCreated: false",
  "automaticExecutionPerformed: false",
  "productPrescriptionPerformed: false",
  "dosageAdvicePerformed: false",
  "humanReviewRequired: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Execution gate engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops execution gate ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-work-order-execution-gate-dry-run",
  "createAiWorkOrderExecutionGate",
  "createAiWorkOrderExecutionGateFromInput",
  "formatAiWorkOrderExecutionGate",
  "providerCalled: false",
  "persistencePerformed: false",
  "taskCreated: false",
  "interventionCreated: false",
  "automaticExecutionPerformed: false",
  "productPrescriptionPerformed: false",
  "dosageAdvicePerformed: false",
  "automaticTaskCreationAllowed: false",
  "automaticInterventionCreationAllowed: false",
  "automaticExecutionAllowed: false",
  "manualConversionAllowed",
  "humanReviewRequired: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint execution gate incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI execution gate ---");

for (const required of [
  '"use client"',
  "AI Work Order Execution Gate",
  "Gate di conversione manuale",
  "Simula approvazione",
  "Reset gate",
  "manualConversionAllowed",
  "automaticExecutionAllowed",
  "automaticTaskCreationAllowed",
  "automaticInterventionCreationAllowed",
  "Gate fingerprint",
  "Checklist gate",
  "Blockers",
  "Prohibited instructions",
  "Copia gate",
  "Esporta gate JSON",
  "navigator.clipboard.writeText",
  "data-ai-work-order-execution-gate",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI execution gate incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import WorkOrderExecutionGatePanel from "./WorkOrderExecutionGatePanel";',
  "<WorkOrderExecutionGatePanel />",
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
  "AI Work Order Execution Gate",
  "Manual conversion gate",
  "/api/ops/ai-work-order-execution-gate-dry-run",
  "automaticExecutionAllowed=false",
  "humanReviewRequired=true",
  "data-ai-work-order-execution-gate-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin execution gate incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiWorkOrderExecutionGate from "./OperationsAiWorkOrderExecutionGate";',
  "<OperationsAiWorkOrderExecutionGate />",
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
  "AI Work Order Execution Gate V7.8",
  "/api/ops/ai-work-order-execution-gate-dry-run",
  "AiWorkOrderExecutionGate",
  "ExecutionGateInput",
  "ExecutionGateChecklistItem",
  "ExecutionReviewDecision",
  "manualConversionAllowed",
  "automaticTaskCreationAllowed=false",
  "automaticInterventionCreationAllowed=false",
  "automaticExecutionAllowed=false",
  "noAutomaticDbWrites=true",
  "noProviderCall=true",
  "taskCreated=false",
  "interventionCreated=false",
  "automaticExecutionPerformed=false",
  "productPrescriptionPerformed=false",
  "dosageAdvicePerformed=false",
  "humanReviewRequired=true",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "nessuna creazione automatica",
  "nessuna esecuzione automatica",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "npm run ops:ai-work-order-execution-gate-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README execution gate incompleto: ${required}`);
  }
}

for (const required of [
  "AI work order execution gate",
  "npm run ops:ai-work-order-execution-gate-check",
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
  "ops:ai-work-order-execution-gate-check",
  "ops:ai-work-order-preview-check",
  "ops:ai-decision-dossier-check",
  "ops:ai-case-report-check",
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
  console.log("--- Live execution gate protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-work-order-execution-gate-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint execution gate non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-work-order-execution-gate-dry-run?secret=${encodeURIComponent(secret)}`,
    );

    console.log(`HTTP status execution gate blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.gate?.manualConversionAllowed !== false ||
      blocked.data?.gate?.safety?.automaticTaskCreationAllowed !== false ||
      blocked.data?.gate?.safety?.automaticInterventionCreationAllowed !== false ||
      blocked.data?.gate?.safety?.automaticExecutionAllowed !== false ||
      blocked.data?.gate?.safety?.taskCreated !== false ||
      blocked.data?.gate?.safety?.interventionCreated !== false ||
      blocked.data?.gate?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Execution gate blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ gate blocked live mantiene conversione manuale bloccata e nessuna automazione");
    }

    const approved = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-work-order-execution-gate-dry-run?secret=${encodeURIComponent(secret)}&sample=approved`,
    );

    console.log(`HTTP status execution gate approved: ${approved.status}`);

    if (
      approved.status !== 200 ||
      !approved.data?.ok ||
      approved.data?.gate?.manualConversionAllowed !== true ||
      approved.data?.gate?.conversionPackage?.manualTaskDraftReady !== true ||
      approved.data?.gate?.conversionPackage?.manualInterventionDraftReady !== true ||
      approved.data?.gate?.conversionPackage?.automaticTaskCreationReady !== false ||
      approved.data?.gate?.conversionPackage?.automaticInterventionCreationReady !== false ||
      approved.data?.gate?.conversionPackage?.automaticExecutionReady !== false ||
      approved.data?.gate?.safety?.providerCalled !== false ||
      approved.data?.gate?.safety?.persistencePerformed !== false ||
      approved.data?.gate?.safety?.taskCreated !== false ||
      approved.data?.gate?.safety?.interventionCreated !== false ||
      approved.data?.gate?.safety?.automaticExecutionPerformed !== false ||
      approved.data?.gate?.safety?.automaticTaskCreationAllowed !== false ||
      approved.data?.gate?.safety?.automaticInterventionCreationAllowed !== false ||
      approved.data?.gate?.safety?.automaticExecutionAllowed !== false
    ) {
      failures.push(`Execution gate approved non OK: HTTP ${approved.status}`);
    } else {
      console.log("✓ gate approved abilita solo conversione manuale e lascia ogni automazione disabilitata");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-work-order-execution-gate-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            photoId: "live-execution-gate-photo",
            photoRole: "symptom-close-up",
            fileName: "live-execution-gate.webp",
            plantContext: "olivo in campo",
            locationHint: "settore nord",
            crop: "olivo",
            observedAtLabel: "live-protected-dry-run",
            regions: [
              {
                id: "r1",
                label: "Macchie fogliari",
                tissue: "leaf-upper",
                severity: "medium",
                distribution: "localized",
                normalizedBox: {
                  x: 20,
                  y: 20,
                  width: 30,
                  height: 30,
                },
                visibleSigns: ["macchie", "ingiallimento"],
                operatorNote: "Sintomo da verificare.",
              },
            ],
          },
          gateInput: {
            reviewDecision: "approve-with-caution",
            evidenceConfirmed: true,
            reviewerAssigned: true,
            safetySignoff: true,
            operatorAcknowledged: true,
            noProductRequest: true,
            noDosageRequest: true,
            manualConversionRequested: true,
          },
        }),
      },
    );

    console.log(`HTTP status POST execution gate: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.gate?.manualConversionAllowed !== true ||
      post.data?.gate?.safety?.persistencePerformed !== false ||
      post.data?.gate?.safety?.taskCreated !== false ||
      post.data?.gate?.safety?.interventionCreated !== false ||
      post.data?.gate?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`POST execution gate non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST execution gate protetto genera gate manuale senza DB, task, interventi o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI work order execution gate check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI work order execution gate check completato con successo.");
