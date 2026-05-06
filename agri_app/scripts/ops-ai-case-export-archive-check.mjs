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
  route: "agri_app/src/app/api/ops/ai-case-export-archive-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiCaseExportArchive.ts",
  bundleEngine: "agri_app/src/lib/ai/aiCaseExportBundle.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/CaseExportArchivePanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiCaseExportArchive.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_CASE_EXPORT_ARCHIVE_V8_1.md",
  check: "agri_app/scripts/ops-ai-case-export-archive-check.mjs",
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

console.log("Agri App AI case export archive check V8.1");
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
console.log("--- Case export archive engine ---");

for (const required of [
  "AiCaseExportArchive",
  "CaseExportArchiveInput",
  "CaseExportArchiveFile",
  "CaseExportArchiveManifest",
  "CaseExportArchiveMode",
  "defaultCaseExportArchiveInput",
  "readyCaseExportArchiveInput",
  "createAiCaseExportArchive",
  "createReadyAiCaseExportArchive",
  "createBlockedAiCaseExportArchive",
  "createAiCaseExportArchiveFromInput",
  "formatAiCaseExportArchive",
  "archiveFingerprint",
  "archiveReady",
  "archiveManifestReady",
  "textArchiveReady",
  "jsonArchiveReady",
  "redactionManifestReady",
  "fingerprintManifestReady",
  "downloadableArchiveReady",
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
  "manualDownloadOnly: true",
  "manualExportOnly: true",
  "humanReviewRequired: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Case export archive engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops case export archive ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-case-export-archive-dry-run",
  "createAiCaseExportArchive",
  "createReadyAiCaseExportArchive",
  "createBlockedAiCaseExportArchive",
  "createAiCaseExportArchiveFromInput",
  "formatAiCaseExportArchive",
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
  "manualDownloadOnly: true",
  "manualExportOnly: true",
  "humanReviewRequired: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint case export archive incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI case export archive ---");

for (const required of [
  '"use client"',
  "AI Case Export Archive Pack",
  "Archivio scaricabile del caso AI",
  "Simula archivio pronto",
  "Reset archivio",
  "archiveReady",
  "fileCount",
  "readyFileCount",
  "downloadableFileCount",
  "manualDownloadOnly",
  "publicShareAllowed",
  "dbPersistenceAllowed",
  "archiveFingerprint",
  "Archive files",
  "Prohibited archive actions",
  "Copia archivio",
  "Download TXT",
  "Download JSON",
  "navigator.clipboard.writeText",
  "URL.createObjectURL",
  "data-ai-case-export-archive",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI case export archive incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import CaseExportArchivePanel from "./CaseExportArchivePanel";',
  "<CaseExportArchivePanel />",
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
  "AI Case Export Archive Pack",
  "Case export archive",
  "/api/ops/ai-case-export-archive-dry-run",
  "dry-run only",
  "manualDownloadOnly=true",
  "publicShareAllowed=false",
  "data-ai-case-export-archive-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin case export archive incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiCaseExportArchive from "./OperationsAiCaseExportArchive";',
  "<OperationsAiCaseExportArchive />",
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
  "AI Case Export Archive Pack V8.1",
  "/api/ops/ai-case-export-archive-dry-run",
  "AiCaseExportArchive",
  "CaseExportArchiveInput",
  "CaseExportArchiveFile",
  "CaseExportArchiveManifest",
  "archiveFingerprint",
  "archiveReady",
  "archiveManifestReady=true",
  "textArchiveReady=true",
  "jsonArchiveReady=true",
  "redactionManifestReady=true",
  "fingerprintManifestReady=true",
  "downloadableArchiveReady=true",
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
  "manualDownloadOnly=true",
  "manualExportOnly=true",
  "humanReviewRequired=true",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "nessuna creazione automatica",
  "nessuna esecuzione automatica",
  "nessuna condivisione pubblica automatica",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "npm run ops:ai-case-export-archive-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README case export archive incompleto: ${required}`);
  }
}

for (const required of [
  "AI case export archive",
  "npm run ops:ai-case-export-archive-check",
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
  "ops:ai-case-export-archive-check",
  "ops:ai-case-export-bundle-check",
  "ops:ai-manual-conversion-audit-check",
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
  console.log("--- Live case export archive protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-case-export-archive-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint case export archive non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-export-archive-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status archive blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.archive?.archiveReady !== false ||
      blocked.data?.archive?.safety?.persistencePerformed !== false ||
      blocked.data?.archive?.safety?.taskCreated !== false ||
      blocked.data?.archive?.safety?.interventionCreated !== false ||
      blocked.data?.archive?.safety?.automaticExecutionPerformed !== false ||
      blocked.data?.archive?.safety?.publicShareAllowed !== false ||
      blocked.data?.archive?.safety?.dbPersistenceAllowed !== false
    ) {
      failures.push(`Archive blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ archive blocked live resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-export-archive-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status archive ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.archive?.archiveReady !== true ||
      ready.data?.archive?.archivePackage?.archiveManifestReady !== true ||
      ready.data?.archive?.archivePackage?.textArchiveReady !== true ||
      ready.data?.archive?.archivePackage?.jsonArchiveReady !== true ||
      ready.data?.archive?.archivePackage?.redactionManifestReady !== true ||
      ready.data?.archive?.archivePackage?.fingerprintManifestReady !== true ||
      ready.data?.archive?.archivePackage?.downloadableArchiveReady !== true ||
      ready.data?.archive?.archivePackage?.publicShareReady !== false ||
      ready.data?.archive?.archivePackage?.dbPersistenceReady !== false ||
      ready.data?.archive?.archivePackage?.automaticTaskCreationReady !== false ||
      ready.data?.archive?.archivePackage?.automaticInterventionCreationReady !== false ||
      ready.data?.archive?.archivePackage?.automaticExecutionReady !== false ||
      ready.data?.archive?.safety?.providerCalled !== false ||
      ready.data?.archive?.safety?.persistencePerformed !== false ||
      ready.data?.archive?.safety?.taskCreated !== false ||
      ready.data?.archive?.safety?.interventionCreated !== false ||
      ready.data?.archive?.safety?.automaticExecutionPerformed !== false ||
      ready.data?.archive?.safety?.publicSharePerformed !== false
    ) {
      failures.push(`Archive ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ archive ready abilita solo download/export manuale e lascia DB/share/automazioni disabilitati");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-export-archive-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            photoId: "live-case-export-archive-photo",
            photoRole: "symptom-close-up",
            fileName: "live-case-export-archive.webp",
            plantContext: "olivo in campo",
            locationHint: "settore est",
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
          archiveInput: {
            archiveName: "live-protected-case-archive",
            preparedBy: "Archivista live",
            archiveMode: "manual-conversion-archive",
            includeTextBundle: true,
            includeJsonBundle: true,
            includeSafetySummary: true,
            includeRedactionManifest: true,
            includeFingerprints: true,
            includeHumanReviewNotes: true,
            reviewerOnlyAccess: true,
            downloadPrepared: true,
          },
        }),
      },
    );

    console.log(`HTTP status POST archive: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.archive?.archiveReady !== true ||
      post.data?.archive?.safety?.persistencePerformed !== false ||
      post.data?.archive?.safety?.taskCreated !== false ||
      post.data?.archive?.safety?.interventionCreated !== false ||
      post.data?.archive?.safety?.automaticExecutionPerformed !== false ||
      post.data?.archive?.safety?.publicSharePerformed !== false ||
      post.data?.archive?.safety?.manualDownloadOnly !== true
    ) {
      failures.push(`POST archive non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST archive protetto genera archivio dry-run senza DB, task, interventi, share pubblico o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI case export archive check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI case export archive check completato con successo.");
