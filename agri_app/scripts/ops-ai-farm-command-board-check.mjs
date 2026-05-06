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
  route: "agri_app/src/app/api/ops/ai-farm-command-board-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiFarmCommandBoard.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/FarmCommandBoardPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiFarmCommandBoard.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_FARM_COMMAND_BOARD_V9_0.md",
  check: "agri_app/scripts/ops-ai-farm-command-board-check.mjs",
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

console.log("Agri App AI farm command board check V9.0");
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
console.log("--- Farm command board engine ---");

for (const required of [
  "FarmCommandCaseInput",
  "FarmCommandResourceInput",
  "FarmCommandBoardInput",
  "FarmCasePriorityQueueItem",
  "FarmFieldOverview",
  "FarmOperationalWindow",
  "FarmResourceLoadItem",
  "FarmEscalationItem",
  "FarmComplianceSnapshot",
  "FarmCommandBoardReport",
  "defaultFarmCommandBoardInput",
  "createFarmCommandBoardFixture",
  "createFarmCommandBoardReport",
  "createReadyFarmCommandBoardReport",
  "createBlockedFarmCommandBoardReport",
  "formatFarmCommandBoardReport",
  "casePriorityQueue",
  "crossFieldOverview",
  "operationalWindows",
  "resourceLoadPlan",
  "escalationBoard",
  "complianceSnapshot",
  "executiveSummary",
  "farmCommandBoardReady",
  "crossCasePrioritizationReady",
  "crossFieldOverviewReady",
  "operationalWindowsReady",
  "resourceLoadPlanReady",
  "escalationBoardReady",
  "complianceSnapshotReady",
  "providerAiReady: false",
  "persistenceReady: false",
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
  "automaticTaskCreationAllowed: false",
  "automaticInterventionCreationAllowed: false",
  "automaticExecutionAllowed: false",
  "dbPersistenceAllowed: false",
  "publicShareAllowed: false",
  "productPrescriptionAllowed: false",
  "dosageAdviceAllowed: false",
  "manualDispatchOnly: true",
  "humanReviewRequired: true",
  "localAnalysisOnly: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Farm command board engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops farm command board ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-farm-command-board-dry-run",
  "createFarmCommandBoardReport",
  "createReadyFarmCommandBoardReport",
  "createBlockedFarmCommandBoardReport",
  "formatFarmCommandBoardReport",
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
  "productPrescriptionAllowed: false",
  "dosageAdviceAllowed: false",
  "manualDispatchOnly: true",
  "humanReviewRequired: true",
  "localAnalysisOnly: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint farm command board incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI farm command board ---");

for (const required of [
  '"use client"',
  "AI Farm Command Board & Cross-Case Priority Orchestrator",
  "Board aziendale multi-caso e priorità cross-field",
  "Simula Farm Command Board",
  "Reset board",
  "boardReady",
  "commandStatus",
  "caseCount",
  "fieldCount",
  "blockedCaseCount",
  "manualReadyCaseCount",
  "topPriorityCaseId",
  "nextHumanAction",
  "boardFingerprint",
  "Case priority queue",
  "Cross-field overview",
  "Operational windows",
  "Resource load plan",
  "Escalation board",
  "Compliance snapshot",
  "Copia Farm Command Board",
  "Esporta board JSON",
  "navigator.clipboard.writeText",
  "data-ai-farm-command-board",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI farm command board incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import FarmCommandBoardPanel from "./FarmCommandBoardPanel";',
  "<FarmCommandBoardPanel />",
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
  "AI Farm Command Board & Cross-Case Priority Orchestrator",
  "Farm Command Board premium",
  "/api/ops/ai-farm-command-board-dry-run",
  "farmCommandBoardReady=true",
  "crossCasePrioritizationReady=true",
  "automaticExecutionReady=false",
  "data-ai-farm-command-board-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin farm command board incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiFarmCommandBoard from "./OperationsAiFarmCommandBoard";',
  "<OperationsAiFarmCommandBoard />",
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
  "AI Farm Command Board & Cross-Case Priority Orchestrator V9.0",
  "/api/ops/ai-farm-command-board-dry-run",
  "FarmCommandBoardInput",
  "FarmCommandBoardReport",
  "casePriorityQueue",
  "crossFieldOverview",
  "operationalWindows",
  "resourceLoadPlan",
  "escalationBoard",
  "complianceSnapshot",
  "executiveSummary",
  "farmCommandBoardReady=true",
  "crossCasePrioritizationReady=true",
  "crossFieldOverviewReady=true",
  "operationalWindowsReady=true",
  "resourceLoadPlanReady=true",
  "escalationBoardReady=true",
  "complianceSnapshotReady=true",
  "providerAiReady=false",
  "persistenceReady=false",
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
  "automaticTaskCreationAllowed=false",
  "automaticInterventionCreationAllowed=false",
  "automaticExecutionAllowed=false",
  "dbPersistenceAllowed=false",
  "publicShareAllowed=false",
  "productPrescriptionAllowed=false",
  "dosageAdviceAllowed=false",
  "manualDispatchOnly=true",
  "humanReviewRequired=true",
  "localAnalysisOnly=true",
  "nessuna chiamata provider AI live",
  "nessuna persistenza DB",
  "nessuna creazione automatica",
  "nessuna esecuzione automatica",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "npm run ops:ai-farm-command-board-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README farm command board incompleto: ${required}`);
  }
}

for (const required of [
  "AI farm command board",
  "npm run ops:ai-farm-command-board-check",
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
  "ops:ai-farm-command-board-check",
  "ops:ai-intervention-protocol-check",
  "ops:ai-intervention-readiness-check",
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
  console.log("--- Live farm command board protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-farm-command-board-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint farm command board non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-farm-command-board-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status farm command board blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.report?.boardReady !== false ||
      blocked.data?.report?.safety?.providerCalled !== false ||
      blocked.data?.report?.safety?.persistencePerformed !== false ||
      blocked.data?.report?.safety?.taskCreated !== false ||
      blocked.data?.report?.safety?.interventionCreated !== false ||
      blocked.data?.report?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Farm command board blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ farm command board blocked resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-farm-command-board-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status farm command board ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.report?.boardReady !== true ||
      ready.data?.report?.premiumSignals?.farmCommandBoardReady !== true ||
      ready.data?.report?.premiumSignals?.providerAiReady !== false ||
      ready.data?.report?.premiumSignals?.persistenceReady !== false ||
      ready.data?.report?.safety?.providerCalled !== false ||
      ready.data?.report?.safety?.persistencePerformed !== false ||
      ready.data?.report?.safety?.taskCreated !== false ||
      ready.data?.report?.safety?.interventionCreated !== false ||
      ready.data?.report?.safety?.automaticExecutionPerformed !== false ||
      ready.data?.report?.safety?.publicSharePerformed !== false ||
      ready.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`Farm command board ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ farm command board ready genera board senza provider, DB, task, interventi, share pubblico o esecuzione");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-farm-command-board-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            farmId: "live-farm-command-board",
            farmName: "Azienda live",
            commandWindowLabel: "settimana live",
            operatorName: "Operatore live",
            includeCasePriorityQueue: true,
            includeCrossFieldOverview: true,
            includeOperationalWindows: true,
            includeResourceLoadPlan: true,
            includeEscalationBoard: true,
            includeExecutiveSummary: true,
            includeComplianceSnapshot: true,
            humanReviewRequired: true,
            cases: [
              {
                caseId: "live-case-core",
                fieldId: "live-field-north",
                fieldName: "Live Nord",
                crop: "olivo",
                locationHint: "settore live",
                priority: "blocked-critical",
                status: "blocked",
                readinessScore: 89,
                protocolFingerprint: "live-protocol-core",
                interventionReadinessFingerprint: "live-readiness-core",
                temporalTrendFingerprint: "live-temporal-core",
                fieldMapFingerprint: "live-fieldmap-core",
                followUpWindowLabel: "entro T+1 giorno",
                evidenceCount: 9,
                photoCount: 6,
                openBlockers: ["review finale"],
                reviewerNote: "Caso live core.",
              },
              {
                caseId: "live-case-border",
                fieldId: "live-field-north",
                fieldName: "Live Nord",
                crop: "olivo",
                locationHint: "bordo live",
                priority: "manual-protocol",
                status: "manual-ready",
                readinessScore: 78,
                protocolFingerprint: "live-protocol-border",
                interventionReadinessFingerprint: "live-readiness-border",
                temporalTrendFingerprint: "live-temporal-border",
                fieldMapFingerprint: "live-fieldmap-border",
                followUpWindowLabel: "entro T+2 giorni",
                evidenceCount: 5,
                photoCount: 4,
                openBlockers: [],
                reviewerNote: "Caso live border.",
              },
            ],
            resources: [
              {
                resourceId: "live-reviewer",
                label: "Revisore live",
                resourceType: "reviewer",
                availableWindowLabel: "oggi",
                capacityUnits: 4,
                constraints: ["solo review manuale"],
              },
              {
                resourceId: "live-operator",
                label: "Operatore live",
                resourceType: "operator",
                availableWindowLabel: "domani",
                capacityUnits: 5,
                constraints: ["raccolta evidenza"],
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST farm command board: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.report?.boardReady !== true ||
      post.data?.report?.premiumSignals?.farmCommandBoardReady !== true ||
      post.data?.report?.safety?.providerCalled !== false ||
      post.data?.report?.safety?.persistencePerformed !== false ||
      post.data?.report?.safety?.taskCreated !== false ||
      post.data?.report?.safety?.interventionCreated !== false ||
      post.data?.report?.safety?.automaticExecutionPerformed !== false ||
      post.data?.report?.safety?.publicSharePerformed !== false ||
      post.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`POST farm command board non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST farm command board protetto genera board dry-run senza provider, DB, task, interventi, share pubblico o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI farm command board check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI farm command board check completato con successo.");
