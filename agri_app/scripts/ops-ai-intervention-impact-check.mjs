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
  route: "agri_app/src/app/api/ops/ai-intervention-impact-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiInterventionImpactRoi.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/InterventionImpactRoiPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiInterventionImpactRoi.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_INTERVENTION_IMPACT_ROI_V9_3.md",
  check: "agri_app/scripts/ops-ai-intervention-impact-check.mjs",
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

console.log("Agri App AI intervention impact ROI check V9.3");
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
console.log("--- Intervention impact ROI engine ---");

for (const required of [
  "InterventionImpactCaseInput",
  "InterventionImpactResourceInput",
  "InterventionImpactInput",
  "ImpactScenarioMatrixItem",
  "RiskReductionForecastItem",
  "ManualCostEnvelopeItem",
  "ResourceBudgetImpactItem",
  "OpportunityCostItem",
  "RoiPriorityItem",
  "ExecutiveImpactBriefing",
  "ComplianceEconomicsGuardItem",
  "InterventionImpactReport",
  "defaultInterventionImpactInput",
  "createInterventionImpactFixture",
  "createInterventionImpactReport",
  "createReadyInterventionImpactReport",
  "createBlockedInterventionImpactReport",
  "formatInterventionImpactReport",
  "scenarioMatrix",
  "riskReductionForecast",
  "manualCostEnvelope",
  "resourceBudgetImpact",
  "opportunityCostBoard",
  "roiPriorityQueue",
  "executiveImpactBriefing",
  "complianceEconomicsGuard",
  "impactSummary",
  "interventionImpactReady",
  "scenarioMatrixReady",
  "riskReductionForecastReady",
  "manualCostEnvelopeReady",
  "resourceBudgetImpactReady",
  "opportunityCostBoardReady",
  "roiPriorityQueueReady",
  "executiveImpactBriefingReady",
  "complianceEconomicsGuardReady",
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
    failures.push(`Intervention impact ROI engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops intervention impact ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-intervention-impact-dry-run",
  "createInterventionImpactReport",
  "createReadyInterventionImpactReport",
  "createBlockedInterventionImpactReport",
  "formatInterventionImpactReport",
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
    failures.push(`Endpoint intervention impact incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI intervention impact ---");

for (const required of [
  '"use client"',
  "AI Intervention Impact & ROI Simulator",
  "Simulatore impatto interventi e ROI proxy",
  "Simula impact ROI",
  "Reset impact",
  "impactReady",
  "impactStatus",
  "caseCount",
  "criticalCaseCount",
  "blockedCaseCount",
  "manualReadyCaseCount",
  "topRoiCaseId",
  "projectedRiskReductionProxy",
  "projectedCostIndexUnits",
  "impactFingerprint",
  "Scenario matrix",
  "Risk reduction forecast",
  "Manual cost envelope",
  "Resource budget impact",
  "Opportunity cost board",
  "ROI priority queue",
  "Executive impact briefing",
  "Compliance economics guard",
  "Copia impact ROI",
  "Esporta impact JSON",
  "navigator.clipboard.writeText",
  "data-ai-intervention-impact-roi",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI intervention impact incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import InterventionImpactRoiPanel from "./InterventionImpactRoiPanel";',
  "<InterventionImpactRoiPanel />",
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
  "AI Intervention Impact & ROI Simulator",
  "Intervention Impact & ROI simulator premium",
  "/api/ops/ai-intervention-impact-dry-run",
  "interventionImpactReady=true",
  "roiPriorityQueueReady=true",
  "automaticExecutionReady=false",
  "data-ai-intervention-impact-roi-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin intervention impact incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiInterventionImpactRoi from "./OperationsAiInterventionImpactRoi";',
  "<OperationsAiInterventionImpactRoi />",
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
  "AI Intervention Impact & ROI Simulator V9.3",
  "/api/ops/ai-intervention-impact-dry-run",
  "InterventionImpactInput",
  "InterventionImpactReport",
  "scenarioMatrix",
  "riskReductionForecast",
  "manualCostEnvelope",
  "resourceBudgetImpact",
  "opportunityCostBoard",
  "roiPriorityQueue",
  "executiveImpactBriefing",
  "complianceEconomicsGuard",
  "impactSummary",
  "interventionImpactReady=true",
  "scenarioMatrixReady=true",
  "riskReductionForecastReady=true",
  "manualCostEnvelopeReady=true",
  "resourceBudgetImpactReady=true",
  "opportunityCostBoardReady=true",
  "roiPriorityQueueReady=true",
  "executiveImpactBriefingReady=true",
  "complianceEconomicsGuardReady=true",
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
  "ROI proxy non è dato finanziario reale",
  "npm run ops:ai-intervention-impact-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README intervention impact incompleto: ${required}`);
  }
}

for (const required of [
  "AI intervention impact ROI",
  "npm run ops:ai-intervention-impact-check",
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
  "ops:ai-intervention-impact-check",
  "ops:ai-farm-risk-radar-check",
  "ops:ai-scouting-mission-check",
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
  console.log("--- Live intervention impact protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-intervention-impact-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint intervention impact non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-intervention-impact-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status intervention impact blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.report?.impactReady !== false ||
      blocked.data?.report?.safety?.providerCalled !== false ||
      blocked.data?.report?.safety?.persistencePerformed !== false ||
      blocked.data?.report?.safety?.taskCreated !== false ||
      blocked.data?.report?.safety?.interventionCreated !== false ||
      blocked.data?.report?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Intervention impact blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ intervention impact blocked resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-intervention-impact-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status intervention impact ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.report?.impactReady !== true ||
      ready.data?.report?.premiumSignals?.interventionImpactReady !== true ||
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
      failures.push(`Intervention impact ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ intervention impact ready genera simulazione senza provider, DB, task, interventi, share pubblico o esecuzione");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-intervention-impact-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            farmId: "live-intervention-impact",
            farmName: "Azienda live",
            impactWindowLabel: "prossimi 14 giorni",
            operatorName: "Responsabile live",
            includeScenarioMatrix: true,
            includeRiskReductionForecast: true,
            includeManualCostEnvelope: true,
            includeResourceBudgetImpact: true,
            includeOpportunityCostBoard: true,
            includeRoiPriorityQueue: true,
            includeExecutiveImpactBriefing: true,
            includeComplianceEconomicsGuard: true,
            humanReviewRequired: true,
            cases: [
              {
                caseId: "live-impact-core",
                fieldId: "live-field-north",
                fieldName: "Live Nord",
                crop: "olivo",
                locationHint: "settore live",
                riskTier: "critical",
                riskVelocity: "blocked",
                scenarioKind: "blocked",
                commandScore: 92,
                confidenceScore: 0.82,
                affectedAreaIndex: 72,
                potentialLossIndex: 84,
                interventionReadinessScore: 45,
                manualEffortUnits: 6,
                resourceLoadUnits: 5,
                evidenceCount: 11,
                photoCount: 8,
                blocked: true,
                manualProtocolReady: false,
                scoutingMissionReady: true,
                linkedFingerprints: ["live-command", "live-risk", "live-mission"],
                openLimitations: ["review finale"],
                reviewerNote: "Caso live core.",
              },
              {
                caseId: "live-impact-border",
                fieldId: "live-field-north",
                fieldName: "Live Nord",
                crop: "olivo",
                locationHint: "bordo live",
                riskTier: "high",
                riskVelocity: "accelerating",
                scenarioKind: "manual-intervention-ready",
                commandScore: 83,
                confidenceScore: 0.76,
                affectedAreaIndex: 50,
                potentialLossIndex: 61,
                interventionReadinessScore: 80,
                manualEffortUnits: 5,
                resourceLoadUnits: 4,
                evidenceCount: 7,
                photoCount: 5,
                blocked: false,
                manualProtocolReady: true,
                scoutingMissionReady: true,
                linkedFingerprints: ["live-command-border", "live-risk-border"],
                openLimitations: [],
                reviewerNote: "Caso live border.",
              },
            ],
            resources: [
              {
                resourceId: "live-impact-reviewer",
                label: "Revisore live",
                role: "reviewer",
                capacityUnits: 6,
                allocatedUnits: 5,
                costIndexPerUnit: 8,
                constraints: ["review manuale"],
              },
              {
                resourceId: "live-impact-operator",
                label: "Operatore live",
                role: "operator",
                capacityUnits: 8,
                allocatedUnits: 6,
                costIndexPerUnit: 6,
                constraints: ["raccolta foto"],
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST intervention impact: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.report?.impactReady !== true ||
      post.data?.report?.premiumSignals?.interventionImpactReady !== true ||
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
      failures.push(`POST intervention impact non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST intervention impact protetto genera simulazione dry-run senza provider, DB, task, interventi, share pubblico, prodotto, dosaggio o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI intervention impact ROI check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI intervention impact ROI check completato con successo.");
