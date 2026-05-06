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
  route: "agri_app/src/app/api/ops/ai-case-export-bundle-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiCaseExportBundle.ts",
  auditEngine: "agri_app/src/lib/ai/aiManualConversionAudit.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/CaseExportBundlePanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiCaseExportBundle.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_CASE_EXPORT_BUNDLE_V8_0.md",
  check: "agri_app/scripts/ops-ai-case-export-bundle-check.mjs",
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

console.log("Agri App AI case export bundle check V8.0");
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
console.log("--- Case export bundle engine ---");

for (const required of [
  "AiCaseExportBundle",
  "CaseExportBundleInput",
  "CaseExportArtifact",
  "CaseExportRedactionRule",
  "CaseExportShareMode",
  "defaultCaseExportBundleInput",
  "readyCaseExportBundleInput",
  "createAiCaseExportBundle",
  "createReadyAiCaseExportBundle",
  "createBlockedAiCaseExportBundle",
  "createAiCaseExportBundleFromInput",
  "formatAiCaseExportBundle",
  "bundleFingerprint",
  "sourceAuditFingerprint",
  "sourceGateFingerprint",
  "sourcePreviewFingerprint",
  "sourceDossierFingerprint",
  "artifactCount",
  "readyArtifactCount",
  "redactedArtifactCount",
  "textBundleReady",
  "jsonBundleReady",
  "reviewerPacketReady",
  "safetySummaryReady",
  "externalRedactedBundleReady",
  "publicShareReady: false",
  "dbPersistenceReady: false",
  "automaticTaskCreationReady: false",
  "automaticInterventionCreationReady: false",
  "automaticExecutionReady: false",
  "providerCalled: false",
  "persistencePerformed: false",
  "taskCreated: false",
  "interventionCreated: false",
  "automaticExecutionPerformed: false",
  "publicSharePerformed: false",
  "productPrescriptionPerformed: false",
  "dosageAdvicePerformed: false",
  "manualExportOnly: true",
  "humanReviewRequired: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Case export bundle engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops case export bundle ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-case-export-bundle-dry-run",
  "createAiCaseExportBundle",
  "createReadyAiCaseExportBundle",
  "createBlockedAiCaseExportBundle",
  "createAiCaseExportBundleFromInput",
  "formatAiCaseExportBundle",
  "providerCalled: false",
  "persistencePerformed: false",
  "taskCreated: false",
  "interventionCreated: false",
  "automaticExecutionPerformed: false",
  "publicSharePerformed: false",
  "productPrescriptionPerformed: false",
  "dosageAdvicePerformed: false",
  "automaticTaskCreationAllowed: false",
  "automaticInterventionCreationAllowed: false",
  "automaticExecutionAllowed: false",
  "dbPersistenceAllowed: false",
  "publicShareAllowed: false",
  "manualExportOnly: true",
  "humanReviewRequired: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint case export bundle incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI case export bundle ---");

for (const required of [
  '"use client"',
  "AI Case Export Bundle",
  "Bundle esportabile del caso AI",
  "Simula bundle pronto",
  "Reset bundle",
  "bundleReady",
  "shareMode",
  "artifactCount",
  "readyArtifactCount",
  "publicShareAllowed",
  "dbPersistenceAllowed",
  "automaticExecutionAllowed",
  "bundleFingerprint",
  "Artifacts",
  "Redaction rules",
  "Prohibited export actions",
  "Copia bundle",
  "Esporta bundle JSON",
  "navigator.clipboard.writeText",
  "data-ai-case-export-bundle",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI case export bundle incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import CaseExportBundlePanel from "./CaseExportBundlePanel";',
  "<CaseExportBundlePanel />",
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
  "AI Case Export Bundle",
  "Case export bundle",
  "/api/ops/ai-case-export-bundle-dry-run",
  "dry-run only",
  "publicShareAllowed=false",
  "dbPersistenceAllowed=false",
  "data-ai-case-export-bundle-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin case export bundle incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiCaseExportBundle from "./OperationsAiCaseExportBundle";',
  "<OperationsAiCaseExportBundle />",
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
  "AI Case Export Bundle V8.0",
  "/api/ops/ai-case-export-bundle-dry-run",
  "AiCaseExportBundle",
  "CaseExportBundleInput",
  "CaseExportArtifact",
  "CaseExportRedactionRule",
  "bundleFingerprint",
  "sourceAuditFingerprint",
  "sourceGateFingerprint",
  "sourcePreviewFingerprint",
  "sourceDossierFingerprint",
  "artifactCount",
  "readyArtifactCount",
  "redactedArtifactCount",
  "textBundleReady=true",
  "jsonBundleReady=true",
  "reviewerPacketReady=true",
  "safetySummaryReady=true",
  "publicShareReady=false",
  "dbPersistenceReady=false",
  "automaticTaskCreationReady=false",
  "automaticInterventionCreationReady=false",
  "automaticExecutionReady=false",
  "providerCalled=false",
  "persistencePerformed=false",
  "taskCreated=false",
  "interventionCreated=false",
  "automaticExecutionPerformed=false",
  "publicSharePerformed=false",
  "productPrescriptionPerformed=false",
  "dosageAdvicePerformed=false",
  "manualExportOnly=true",
  "humanReviewRequired=true",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "nessuna creazione automatica",
  "nessuna esecuzione automatica",
  "nessuna condivisione pubblica automatica",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "npm run ops:ai-case-export-bundle-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README case export bundle incompleto: ${required}`);
  }
}

for (const required of [
  "AI case export bundle",
  "npm run ops:ai-case-export-bundle-check",
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
  "ops:ai-case-export-bundle-check",
  "ops:ai-manual-conversion-audit-check",
  "ops:ai-work-order-execution-gate-check",
  "ops:ai-work-order-preview-check",
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
  console.log("--- Live case export bundle protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-case-export-bundle-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint case export bundle non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-export-bundle-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status bundle blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.bundle?.bundleReady !== false ||
      blocked.data?.bundle?.safety?.persistencePerformed !== false ||
      blocked.data?.bundle?.safety?.taskCreated !== false ||
      blocked.data?.bundle?.safety?.interventionCreated !== false ||
      blocked.data?.bundle?.safety?.automaticExecutionPerformed !== false ||
      blocked.data?.bundle?.safety?.publicShareAllowed !== false ||
      blocked.data?.bundle?.safety?.dbPersistenceAllowed !== false
    ) {
      failures.push(`Bundle blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ bundle blocked live resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-export-bundle-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status bundle ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.bundle?.bundleReady !== true ||
      ready.data?.bundle?.exportPackage?.textBundleReady !== true ||
      ready.data?.bundle?.exportPackage?.jsonBundleReady !== true ||
      ready.data?.bundle?.exportPackage?.reviewerPacketReady !== true ||
      ready.data?.bundle?.exportPackage?.safetySummaryReady !== true ||
      ready.data?.bundle?.exportPackage?.publicShareReady !== false ||
      ready.data?.bundle?.exportPackage?.dbPersistenceReady !== false ||
      ready.data?.bundle?.exportPackage?.automaticTaskCreationReady !== false ||
      ready.data?.bundle?.exportPackage?.automaticInterventionCreationReady !== false ||
      ready.data?.bundle?.exportPackage?.automaticExecutionReady !== false ||
      ready.data?.bundle?.safety?.providerCalled !== false ||
      ready.data?.bundle?.safety?.persistencePerformed !== false ||
      ready.data?.bundle?.safety?.taskCreated !== false ||
      ready.data?.bundle?.safety?.interventionCreated !== false ||
      ready.data?.bundle?.safety?.automaticExecutionPerformed !== false ||
      ready.data?.bundle?.safety?.publicSharePerformed !== false
    ) {
      failures.push(`Bundle ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ bundle ready abilita solo export dry-run e lascia DB/share/automazioni disabilitati");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-export-bundle-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            photoId: "live-case-export-bundle-photo",
            photoRole: "symptom-close-up",
            fileName: "live-case-export-bundle.webp",
            plantContext: "olivo in campo",
            locationHint: "settore ovest",
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
          bundleInput: {
            exporterName: "Exporter live",
            exportReason: "manual-conversion",
            exportLabel: "live-protected-case-export",
            shareMode: "review-only",
            includeJson: true,
            includeText: true,
            includeReviewerPacket: true,
            includeSafetySummary: true,
            includeSourceFingerprints: true,
            reviewerVisibleOnly: true,
          },
        }),
      },
    );

    console.log(`HTTP status POST bundle: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.bundle?.bundleReady !== true ||
      post.data?.bundle?.safety?.persistencePerformed !== false ||
      post.data?.bundle?.safety?.taskCreated !== false ||
      post.data?.bundle?.safety?.interventionCreated !== false ||
      post.data?.bundle?.safety?.automaticExecutionPerformed !== false ||
      post.data?.bundle?.safety?.publicSharePerformed !== false ||
      post.data?.bundle?.safety?.manualExportOnly !== true
    ) {
      failures.push(`POST bundle non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST bundle protetto genera export dry-run senza DB, task, interventi, share pubblico o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI case export bundle check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI case export bundle check completato con successo.");
