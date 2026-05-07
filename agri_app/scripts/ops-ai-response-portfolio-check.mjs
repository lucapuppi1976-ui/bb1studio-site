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
  route: "agri_app/src/app/api/ops/ai-response-portfolio-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiResponsePortfolioOptimizer.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/ResponsePortfolioOptimizerPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiResponsePortfolioOptimizer.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_RESPONSE_PORTFOLIO_OPTIMIZER_V9_4.md",
  check: "agri_app/scripts/ops-ai-response-portfolio-check.mjs",
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

console.log("Agri App AI response portfolio optimizer check V9.4");
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
console.log("--- Response portfolio engine ---");

for (const required of [
  "ResponsePortfolioCaseInput",
  "ResponsePortfolioResourceInput",
  "ResponsePortfolioInput",
  "PortfolioScenarioItem",
  "PriorityAllocationItem",
  "ResourceAllocationPlanItem",
  "PortfolioTradeoffItem",
  "PortfolioDecisionBoardItem",
  "ExecutivePortfolioBriefing",
  "CompliancePortfolioGuardItem",
  "PortfolioExportPacket",
  "ResponsePortfolioReport",
  "defaultResponsePortfolioInput",
  "createResponsePortfolioFixture",
  "createResponsePortfolioReport",
  "createReadyResponsePortfolioReport",
  "createBlockedResponsePortfolioReport",
  "formatResponsePortfolioReport",
  "portfolioScenarios",
  "priorityAllocationMatrix",
  "resourceAllocationPlan",
  "tradeoffMatrix",
  "decisionBoard",
  "executivePortfolioBriefing",
  "compliancePortfolioGuard",
  "portfolioExportPacket",
  "portfolioSummary",
  "responsePortfolioReady",
  "portfolioOptimizerReady",
  "priorityAllocationReady",
  "resourceAllocationReady",
  "tradeoffMatrixReady",
  "decisionBoardReady",
  "executivePortfolioBriefingReady",
  "compliancePortfolioGuardReady",
  "portfolioExportPacketReady",
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
    failures.push(`Response portfolio engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops response portfolio ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-response-portfolio-dry-run",
  "createResponsePortfolioReport",
  "createReadyResponsePortfolioReport",
  "createBlockedResponsePortfolioReport",
  "formatResponsePortfolioReport",
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
    failures.push(`Endpoint response portfolio incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI response portfolio ---");

for (const required of [
  '"use client"',
  "AI Strategic Response Portfolio Optimizer",
  "Ottimizzatore portafoglio decisionale AI",
  "Simula response portfolio",
  "Reset portfolio",
  "portfolioReady",
  "portfolioStatus",
  "caseCount",
  "blockedCaseCount",
  "doNowCaseCount",
  "deferCaseCount",
  "portfolioValueProxy",
  "portfolioCostProxy",
  "portfolioEfficiencyProxy",
  "portfolioFingerprint",
  "Portfolio scenarios",
  "Priority allocation matrix",
  "Resource allocation plan",
  "Tradeoff matrix",
  "Decision board",
  "Executive portfolio briefing",
  "Compliance portfolio guard",
  "Portfolio export packet",
  "Copia response portfolio",
  "Esporta portfolio JSON",
  "navigator.clipboard.writeText",
  "data-ai-response-portfolio-optimizer",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI response portfolio incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import ResponsePortfolioOptimizerPanel from "./ResponsePortfolioOptimizerPanel";',
  "<ResponsePortfolioOptimizerPanel />",
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
  "AI Strategic Response Portfolio Optimizer",
  "Response Portfolio Optimizer premium",
  "/api/ops/ai-response-portfolio-dry-run",
  "responsePortfolioReady=true",
  "decisionBoardReady=true",
  "automaticExecutionReady=false",
  "data-ai-response-portfolio-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin response portfolio incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiResponsePortfolioOptimizer from "./OperationsAiResponsePortfolioOptimizer";',
  "<OperationsAiResponsePortfolioOptimizer />",
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
  "AI Strategic Response Portfolio Optimizer V9.4",
  "/api/ops/ai-response-portfolio-dry-run",
  "ResponsePortfolioInput",
  "ResponsePortfolioReport",
  "portfolioScenarios",
  "priorityAllocationMatrix",
  "resourceAllocationPlan",
  "tradeoffMatrix",
  "decisionBoard",
  "executivePortfolioBriefing",
  "compliancePortfolioGuard",
  "portfolioExportPacket",
  "portfolioSummary",
  "responsePortfolioReady=true",
  "portfolioOptimizerReady=true",
  "priorityAllocationReady=true",
  "resourceAllocationReady=true",
  "tradeoffMatrixReady=true",
  "decisionBoardReady=true",
  "executivePortfolioBriefingReady=true",
  "compliancePortfolioGuardReady=true",
  "portfolioExportPacketReady=true",
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
  "portfolio value proxy non è dato finanziario reale",
  "npm run ops:ai-response-portfolio-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README response portfolio incompleto: ${required}`);
  }
}

for (const required of [
  "AI response portfolio optimizer",
  "npm run ops:ai-response-portfolio-check",
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
  "ops:ai-response-portfolio-check",
  "ops:ai-intervention-impact-check",
  "ops:ai-farm-risk-radar-check",
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
  console.log("--- Live response portfolio protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-response-portfolio-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint response portfolio non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-response-portfolio-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status response portfolio blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.report?.portfolioReady !== false ||
      blocked.data?.report?.safety?.providerCalled !== false ||
      blocked.data?.report?.safety?.persistencePerformed !== false ||
      blocked.data?.report?.safety?.taskCreated !== false ||
      blocked.data?.report?.safety?.interventionCreated !== false ||
      blocked.data?.report?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Response portfolio blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ response portfolio blocked resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-response-portfolio-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status response portfolio ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.report?.portfolioReady !== true ||
      ready.data?.report?.premiumSignals?.responsePortfolioReady !== true ||
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
      failures.push(`Response portfolio ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ response portfolio ready genera portafoglio senza provider, DB, task, interventi, share pubblico o esecuzione");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-response-portfolio-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            farmId: "live-response-portfolio",
            farmName: "Azienda live",
            portfolioWindowLabel: "prossimi 14 giorni",
            operatorName: "Responsabile live",
            includePortfolioOptimizer: true,
            includePriorityAllocationMatrix: true,
            includeResourceAllocationPlan: true,
            includeTradeoffMatrix: true,
            includeDecisionBoard: true,
            includeExecutivePortfolioBriefing: true,
            includeCompliancePortfolioGuard: true,
            includePortfolioExportPacket: true,
            humanReviewRequired: true,
            cases: [
              {
                caseId: "live-portfolio-core",
                fieldId: "live-field-north",
                fieldName: "Live Nord",
                crop: "olivo",
                locationHint: "settore live",
                riskTier: "critical",
                scenarioKind: "blocked",
                commandScore: 93,
                roiProxyScore: 71,
                impactScore: 90,
                riskReductionProxy: 57,
                costIndexUnits: 52,
                manualEffortUnits: 6,
                evidenceScore: 82,
                confidenceScore: 0.82,
                constraintLevel: "blocking",
                blocked: true,
                manualProtocolReady: false,
                scoutingMissionReady: true,
                reviewReady: false,
                linkedFingerprints: ["live-command", "live-risk", "live-impact"],
                openLimitations: ["review finale"],
                reviewerNote: "Caso live core.",
              },
              {
                caseId: "live-portfolio-border",
                fieldId: "live-field-north",
                fieldName: "Live Nord",
                crop: "olivo",
                locationHint: "bordo live",
                riskTier: "high",
                scenarioKind: "manual-intervention-ready",
                commandScore: 84,
                roiProxyScore: 79,
                impactScore: 72,
                riskReductionProxy: 61,
                costIndexUnits: 38,
                manualEffortUnits: 5,
                evidenceScore: 75,
                confidenceScore: 0.76,
                constraintLevel: "moderate",
                blocked: false,
                manualProtocolReady: true,
                scoutingMissionReady: true,
                reviewReady: true,
                linkedFingerprints: ["live-command-border", "live-risk-border"],
                openLimitations: [],
                reviewerNote: "Caso live border.",
              },
            ],
            resources: [
              {
                resourceId: "live-portfolio-reviewer",
                label: "Revisore live",
                role: "reviewer",
                capacityUnits: 7,
                reservedUnits: 5,
                costIndexPerUnit: 8,
                constraints: ["review manuale"],
              },
              {
                resourceId: "live-portfolio-operator",
                label: "Operatore live",
                role: "operator",
                capacityUnits: 9,
                reservedUnits: 6,
                costIndexPerUnit: 6,
                constraints: ["raccolta foto"],
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST response portfolio: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.report?.portfolioReady !== true ||
      post.data?.report?.premiumSignals?.responsePortfolioReady !== true ||
      post.data?.report?.safety?.providerCalled !== false ||
      post.data?.report?.safety?.persistencePerformed !== false ||
      post.data?.report?.safety?.taskCreated !== false ||
      post.data?.report?.safety?.interventionCreated !== false ||
      post.data?.report?.safety?.automaticExecutionPerformed !== false ||
      post.data?.report?.safety?.publicSharePerformed !== false ||
      post.data?.report?.safety?.productPrescriptionPerformed !== false ||
      post.data?.report?.safety?.dosageAdvicePerformed !== false ||
      post.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`POST response portfolio non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST response portfolio protetto genera portafoglio dry-run senza provider, DB, task, interventi, share pubblico, prodotto, dosaggio o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI response portfolio optimizer check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI response portfolio optimizer check completato con successo.");
