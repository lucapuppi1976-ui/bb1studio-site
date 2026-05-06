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
  route: "agri_app/src/app/api/ops/ai-manual-conversion-audit-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiManualConversionAudit.ts",
  executionGateEngine: "agri_app/src/lib/ai/aiWorkOrderExecutionGate.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/ManualConversionAuditPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiManualConversionAudit.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_MANUAL_CONVERSION_AUDIT_V7_9.md",
  check: "agri_app/scripts/ops-ai-manual-conversion-audit-check.mjs",
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

console.log("Agri App AI manual conversion audit check V7.9");
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
console.log("--- Manual conversion audit engine ---");

for (const required of [
  "AiManualConversionAudit",
  "ManualConversionAuditInput",
  "ManualConversionAuditEvent",
  "ManualConversionAuditExport",
  "ManualConversionAuditDecision",
  "defaultManualConversionAuditInput",
  "readyManualConversionAuditInput",
  "createAiManualConversionAudit",
  "createReadyAiManualConversionAudit",
  "createBlockedAiManualConversionAudit",
  "createAiManualConversionAuditFromInput",
  "formatAiManualConversionAudit",
  "auditFingerprint",
  "sourceGateFingerprint",
  "sourcePreviewFingerprint",
  "sourceDossierFingerprint",
  "conversionAllowed",
  "manualTaskConversionAllowed",
  "manualInterventionConversionAllowed",
  "textAuditReady: true",
  "jsonAuditReady: true",
  "reviewerPacketReady: true",
  "automaticTaskCreationReady: false",
  "automaticInterventionCreationReady: false",
  "automaticExecutionReady: false",
  "dbPersistenceReady: false",
  "providerCalled: false",
  "persistencePerformed: false",
  "taskCreated: false",
  "interventionCreated: false",
  "automaticExecutionPerformed: false",
  "productPrescriptionPerformed: false",
  "dosageAdvicePerformed: false",
  "manualConversionOnly: true",
  "humanReviewRequired: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Manual conversion audit engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops manual conversion audit ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-manual-conversion-audit-dry-run",
  "createAiManualConversionAudit",
  "createReadyAiManualConversionAudit",
  "createBlockedAiManualConversionAudit",
  "createAiManualConversionAuditFromInput",
  "formatAiManualConversionAudit",
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
  "dbPersistenceAllowed: false",
  "manualConversionOnly: true",
  "humanReviewRequired: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint manual conversion audit incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI manual conversion audit ---");

for (const required of [
  '"use client"',
  "AI Manual Conversion Audit",
  "Audit trail conversione manuale",
  "Simula audit pronto",
  "Reset audit",
  "conversionAllowed",
  "manualTaskConversionAllowed",
  "manualInterventionConversionAllowed",
  "automaticTaskCreationAllowed",
  "automaticInterventionCreationAllowed",
  "automaticExecutionAllowed",
  "dbPersistenceAllowed",
  "auditFingerprint",
  "Audit events",
  "Unresolved blockers",
  "Prohibited conversion actions",
  "Copia audit",
  "Esporta audit JSON",
  "navigator.clipboard.writeText",
  "data-ai-manual-conversion-audit",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI manual conversion audit incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import ManualConversionAuditPanel from "./ManualConversionAuditPanel";',
  "<ManualConversionAuditPanel />",
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
  "AI Manual Conversion Audit",
  "Audit trail manuale",
  "/api/ops/ai-manual-conversion-audit-dry-run",
  "dry-run only",
  "dbPersistenceAllowed=false",
  "automaticExecutionAllowed=false",
  "data-ai-manual-conversion-audit-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin manual conversion audit incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiManualConversionAudit from "./OperationsAiManualConversionAudit";',
  "<OperationsAiManualConversionAudit />",
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
  "AI Manual Conversion Audit V7.9",
  "/api/ops/ai-manual-conversion-audit-dry-run",
  "AiManualConversionAudit",
  "ManualConversionAuditInput",
  "ManualConversionAuditEvent",
  "ManualConversionAuditExport",
  "auditFingerprint",
  "sourceGateFingerprint",
  "sourcePreviewFingerprint",
  "sourceDossierFingerprint",
  "conversionAllowed",
  "manualTaskConversionAllowed",
  "manualInterventionConversionAllowed",
  "textAuditReady=true",
  "jsonAuditReady=true",
  "reviewerPacketReady=true",
  "automaticTaskCreationReady=false",
  "automaticInterventionCreationReady=false",
  "automaticExecutionReady=false",
  "dbPersistenceReady=false",
  "providerCalled=false",
  "persistencePerformed=false",
  "taskCreated=false",
  "interventionCreated=false",
  "automaticExecutionPerformed=false",
  "productPrescriptionPerformed=false",
  "dosageAdvicePerformed=false",
  "manualConversionOnly=true",
  "humanReviewRequired=true",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "nessuna creazione automatica",
  "nessuna esecuzione automatica",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "npm run ops:ai-manual-conversion-audit-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README manual conversion audit incompleto: ${required}`);
  }
}

for (const required of [
  "AI manual conversion audit",
  "npm run ops:ai-manual-conversion-audit-check",
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
  "ops:ai-manual-conversion-audit-check",
  "ops:ai-work-order-execution-gate-check",
  "ops:ai-work-order-preview-check",
  "ops:ai-decision-dossier-check",
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
  console.log("--- Live manual conversion audit protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-manual-conversion-audit-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint manual conversion audit non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-manual-conversion-audit-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status audit blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.audit?.conversionAllowed !== false ||
      blocked.data?.audit?.safety?.persistencePerformed !== false ||
      blocked.data?.audit?.safety?.taskCreated !== false ||
      blocked.data?.audit?.safety?.interventionCreated !== false ||
      blocked.data?.audit?.safety?.automaticExecutionPerformed !== false ||
      blocked.data?.audit?.safety?.automaticTaskCreationAllowed !== false ||
      blocked.data?.audit?.safety?.automaticInterventionCreationAllowed !== false ||
      blocked.data?.audit?.safety?.automaticExecutionAllowed !== false ||
      blocked.data?.audit?.safety?.dbPersistenceAllowed !== false
    ) {
      failures.push(`Audit blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ audit blocked live mantiene conversione bloccata e nessuna automazione");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-manual-conversion-audit-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status audit ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.audit?.conversionAllowed !== true ||
      ready.data?.audit?.manualTaskConversionAllowed !== true ||
      ready.data?.audit?.manualInterventionConversionAllowed !== true ||
      ready.data?.audit?.exportPackage?.textAuditReady !== true ||
      ready.data?.audit?.exportPackage?.jsonAuditReady !== true ||
      ready.data?.audit?.exportPackage?.reviewerPacketReady !== true ||
      ready.data?.audit?.exportPackage?.automaticTaskCreationReady !== false ||
      ready.data?.audit?.exportPackage?.automaticInterventionCreationReady !== false ||
      ready.data?.audit?.exportPackage?.automaticExecutionReady !== false ||
      ready.data?.audit?.exportPackage?.dbPersistenceReady !== false ||
      ready.data?.audit?.safety?.providerCalled !== false ||
      ready.data?.audit?.safety?.persistencePerformed !== false ||
      ready.data?.audit?.safety?.taskCreated !== false ||
      ready.data?.audit?.safety?.interventionCreated !== false ||
      ready.data?.audit?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Audit ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ audit ready abilita solo conversione manuale e lascia DB/automazioni disabilitati");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-manual-conversion-audit-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            photoId: "live-manual-conversion-audit-photo",
            photoRole: "symptom-close-up",
            fileName: "live-manual-conversion-audit.webp",
            plantContext: "olivo in campo",
            locationHint: "settore sud",
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
          auditInput: {
            reviewerName: "Reviewer live",
            reviewerRole: "agronomist",
            convertedBy: "Operatore live",
            conversionIntent: "manual-task-and-intervention",
            evidenceReferences: ["foto sintomo", "foto contesto", "execution gate"],
            selectedTaskIds: ["task-evidence-refresh"],
            selectedInterventionIds: ["intervention-observation"],
            reviewerNotes: ["Review completata in dry-run protetto."],
            conversionNotes: ["Solo conversione manuale."],
            finalDecision: "ready-for-manual-conversion",
            signedAtLabel: "live-protected-audit",
          },
        }),
      },
    );

    console.log(`HTTP status POST audit: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.audit?.conversionAllowed !== true ||
      post.data?.audit?.safety?.persistencePerformed !== false ||
      post.data?.audit?.safety?.taskCreated !== false ||
      post.data?.audit?.safety?.interventionCreated !== false ||
      post.data?.audit?.safety?.automaticExecutionPerformed !== false ||
      post.data?.audit?.safety?.manualConversionOnly !== true
    ) {
      failures.push(`POST audit non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST audit protetto genera audit manuale senza DB, task, interventi o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI manual conversion audit check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI manual conversion audit check completato con successo.");
