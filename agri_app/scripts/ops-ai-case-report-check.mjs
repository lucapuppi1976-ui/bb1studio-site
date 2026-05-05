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
  route: "agri_app/src/app/api/ops/ai-case-report-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/photoDiagnosisCaseReport.ts",
  solutionEngine: "agri_app/src/lib/ai/photoSolutionPlaybook.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/CaseReportPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiCaseReport.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_CASE_REPORT_BUILDER_V7_5.md",
  check: "agri_app/scripts/ops-ai-case-report-check.mjs",
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

console.log("Agri App AI case report check V7.5");
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
console.log("--- Case report engine ---");

for (const required of [
  "DiagnosisCaseReport",
  "CaseReportSection",
  "CaseReportAuditEntry",
  "createDiagnosisCaseReport",
  "createIncompleteDiagnosisCaseReport",
  "formatDiagnosisCaseReport",
  "reportFingerprint",
  "executiveSummary",
  "auditTrail",
  "textReportReady: true",
  "jsonReportReady: true",
  "pdfExportReady: false",
  "databasePersistenceReady: false",
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
  "formatDifferentialDiagnosisMatrix",
  "formatSolutionPlaybook",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Case report engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops case report ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-case-report-dry-run",
  "createDiagnosisCaseReport",
  "createIncompleteDiagnosisCaseReport",
  "formatDiagnosisCaseReport",
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
    failures.push(`Endpoint case report incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI case report ---");

for (const required of [
  '"use client"',
  "AI Case Report Builder",
  "Report operativo esportabile",
  "reportFingerprint",
  "Executive summary",
  "Audit trail",
  "Safety summary",
  "providerCalled=false",
  "persistencePerformed=false",
  "productPrescriptionPerformed=false",
  "dosageAdvicePerformed=false",
  "automaticTaskCreationPerformed=false",
  "automaticInterventionCreationPerformed=false",
  "allowedToExecute=false",
  "humanReviewRequired=true",
  "Copia report testuale",
  "Esporta report JSON",
  "navigator.clipboard.writeText",
  "data-ai-case-report-builder",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI case report incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import CaseReportPanel from "./CaseReportPanel";',
  "<CaseReportPanel />",
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
  "AI Case Report Builder",
  "Report esportabile e audit trail",
  "/api/ops/ai-case-report-dry-run",
  "textReportReady=true",
  "jsonReportReady=true",
  "humanReviewRequired=true",
  "data-ai-case-report-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin case report incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiCaseReport from "./OperationsAiCaseReport";',
  "<OperationsAiCaseReport />",
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
  "AI Case Report Builder V7.5",
  "/api/ops/ai-case-report-dry-run",
  "DiagnosisCaseReport",
  "CaseReportSection",
  "CaseReportAuditEntry",
  "reportFingerprint",
  "executiveSummary",
  "auditTrail",
  "textReportReady=true",
  "jsonReportReady=true",
  "pdfExportReady=false",
  "databasePersistenceReady=false",
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
  "npm run ops:ai-case-report-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README case report incompleto: ${required}`);
  }
}

for (const required of [
  "AI case report builder",
  "npm run ops:ai-case-report-check",
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
  "ops:ai-case-report-check",
  "ops:ai-solution-playbook-check",
  "ops:ai-differential-diagnosis-check",
  "ops:ai-photo-annotation-check",
  "ops:ai-case-file-check",
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
  console.log("--- Live case report protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-case-report-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint case report non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const liveValid = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-report-dry-run?secret=${encodeURIComponent(secret)}`,
    );

    console.log(`HTTP status case valid: ${liveValid.status}`);

    if (
      liveValid.status !== 200 ||
      !liveValid.data?.ok ||
      liveValid.data?.report?.reportFingerprint === undefined ||
      !Array.isArray(liveValid.data?.report?.sections) ||
      liveValid.data?.report?.sections?.length < 7 ||
      !Array.isArray(liveValid.data?.report?.auditTrail) ||
      liveValid.data?.report?.auditTrail?.length < 6 ||
      liveValid.data?.report?.exports?.textReportReady !== true ||
      liveValid.data?.report?.exports?.jsonReportReady !== true ||
      liveValid.data?.report?.safety?.providerCalled !== false ||
      liveValid.data?.report?.safety?.productPrescriptionPerformed !== false ||
      liveValid.data?.report?.safety?.dosageAdvicePerformed !== false ||
      liveValid.data?.report?.safety?.allowedToExecute !== false ||
      liveValid.data?.report?.safety?.humanReviewRequired !== true
    ) {
      failures.push(`Case report valid non OK: HTTP ${liveValid.status}`);
    } else {
      console.log("✓ case report live generato senza provider, prescrizioni, dosi o persistenza");
    }

    const liveIncomplete = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-report-dry-run?secret=${encodeURIComponent(secret)}&sample=incomplete`,
    );

    console.log(`HTTP status case incomplete: ${liveIncomplete.status}`);

    if (
      liveIncomplete.status !== 200 ||
      !liveIncomplete.data?.ok ||
      !Array.isArray(liveIncomplete.data?.report?.sections) ||
      liveIncomplete.data?.report?.sections?.length < 7
    ) {
      failures.push(`Case report incomplete non OK: HTTP ${liveIncomplete.status}`);
    } else {
      console.log("✓ case report incomplete genera sezioni operative");
    }

    const livePost = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-report-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            photoId: "live-case-report-photo",
            photoRole: "symptom-close-up",
            fileName: "live-case-report.webp",
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

    console.log(`HTTP status POST case: ${livePost.status}`);

    if (
      livePost.status !== 200 ||
      !livePost.data?.ok ||
      !livePost.data?.report?.executiveSummary ||
      livePost.data?.report?.safety?.persistencePerformed !== false ||
      livePost.data?.report?.safety?.automaticTaskCreationPerformed !== false ||
      livePost.data?.report?.safety?.automaticInterventionCreationPerformed !== false
    ) {
      failures.push(`POST case report non OK: HTTP ${livePost.status}`);
    } else {
      console.log("✓ POST case report generato con audit trail e blocchi operativi");
    }
  }
}

console.log("");
console.log("--- AI case report check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI case report check completato con successo.");
