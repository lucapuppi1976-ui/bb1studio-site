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
  route: "agri_app/src/app/api/ops/ai-farm-risk-radar-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiFarmRiskRadar.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/FarmRiskRadarPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiFarmRiskRadar.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_FARM_RISK_RADAR_V9_2.md",
  check: "agri_app/scripts/ops-ai-farm-risk-radar-check.mjs",
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

console.log("Agri App AI farm risk radar check V9.2");
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
console.log("--- Farm risk radar engine ---");

for (const required of [
  "FarmRiskRadarCaseInput",
  "FarmRiskRadarResourceInput",
  "FarmRiskRadarInput",
  "FieldRiskQuadrant",
  "PredictivePriorityItem",
  "ForecastWindow",
  "ResourceStressItem",
  "CriticalWatchlistItem",
  "ExecutiveRiskBriefing",
  "ComplianceRadarItem",
  "FarmRiskRadarReport",
  "defaultFarmRiskRadarInput",
  "createFarmRiskRadarFixture",
  "createFarmRiskRadarReport",
  "createReadyFarmRiskRadarReport",
  "createBlockedFarmRiskRadarReport",
  "formatFarmRiskRadarReport",
  "fieldRiskQuadrants",
  "predictivePriorityCenter",
  "forecastWindows",
  "resourceStressForecast",
  "criticalWatchlist",
  "executiveRiskBriefing",
  "complianceRadar",
  "radarSummary",
  "farmRiskRadarReady",
  "predictivePriorityReady",
  "fieldRiskQuadrantsReady",
  "forecastWindowsReady",
  "resourceStressForecastReady",
  "criticalWatchlistReady",
  "executiveBriefingReady",
  "complianceRadarReady",
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
    failures.push(`Farm risk radar engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops farm risk radar ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-farm-risk-radar-dry-run",
  "createFarmRiskRadarReport",
  "createReadyFarmRiskRadarReport",
  "createBlockedFarmRiskRadarReport",
  "formatFarmRiskRadarReport",
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
    failures.push(`Endpoint farm risk radar incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI farm risk radar ---");

for (const required of [
  '"use client"',
  "AI Farm Risk Radar & Predictive Priority Center",
  "Risk radar aziendale e forecast priorità",
  "Simula Farm Risk Radar",
  "Reset radar",
  "radarReady",
  "radarStatus",
  "predictedPressure",
  "caseCount",
  "fieldCount",
  "criticalCaseCount",
  "blockedCaseCount",
  "topPriorityCaseId",
  "nextHumanAction",
  "radarFingerprint",
  "Field risk quadrants",
  "Predictive priority center",
  "Forecast windows",
  "Resource stress forecast",
  "Critical watchlist",
  "Executive risk briefing",
  "Compliance radar",
  "Copia Farm Risk Radar",
  "Esporta radar JSON",
  "navigator.clipboard.writeText",
  "data-ai-farm-risk-radar",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI farm risk radar incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import FarmRiskRadarPanel from "./FarmRiskRadarPanel";',
  "<FarmRiskRadarPanel />",
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
  "AI Farm Risk Radar & Predictive Priority Center",
  "Farm Risk Radar premium",
  "/api/ops/ai-farm-risk-radar-dry-run",
  "farmRiskRadarReady=true",
  "forecastWindowsReady=true",
  "automaticExecutionReady=false",
  "data-ai-farm-risk-radar-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin farm risk radar incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiFarmRiskRadar from "./OperationsAiFarmRiskRadar";',
  "<OperationsAiFarmRiskRadar />",
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
  "AI Farm Risk Radar & Predictive Priority Center V9.2",
  "/api/ops/ai-farm-risk-radar-dry-run",
  "FarmRiskRadarInput",
  "FarmRiskRadarReport",
  "fieldRiskQuadrants",
  "predictivePriorityCenter",
  "forecastWindows",
  "resourceStressForecast",
  "criticalWatchlist",
  "executiveRiskBriefing",
  "complianceRadar",
  "radarSummary",
  "farmRiskRadarReady=true",
  "predictivePriorityReady=true",
  "fieldRiskQuadrantsReady=true",
  "forecastWindowsReady=true",
  "resourceStressForecastReady=true",
  "criticalWatchlistReady=true",
  "executiveBriefingReady=true",
  "complianceRadarReady=true",
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
  "npm run ops:ai-farm-risk-radar-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README farm risk radar incompleto: ${required}`);
  }
}

for (const required of [
  "AI farm risk radar",
  "npm run ops:ai-farm-risk-radar-check",
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
  "ops:ai-farm-risk-radar-check",
  "ops:ai-scouting-mission-check",
  "ops:ai-farm-command-board-check",
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
  console.log("--- Live farm risk radar protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-farm-risk-radar-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint farm risk radar non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-farm-risk-radar-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status farm risk radar blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.report?.radarReady !== false ||
      blocked.data?.report?.safety?.providerCalled !== false ||
      blocked.data?.report?.safety?.persistencePerformed !== false ||
      blocked.data?.report?.safety?.taskCreated !== false ||
      blocked.data?.report?.safety?.interventionCreated !== false ||
      blocked.data?.report?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Farm risk radar blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ farm risk radar blocked resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-farm-risk-radar-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status farm risk radar ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.report?.radarReady !== true ||
      ready.data?.report?.premiumSignals?.farmRiskRadarReady !== true ||
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
      failures.push(`Farm risk radar ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ farm risk radar ready genera radar senza provider, DB, task, interventi, share pubblico o esecuzione");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-farm-risk-radar-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            farmId: "live-farm-risk-radar",
            farmName: "Azienda live",
            radarWindowLabel: "prossimi 14 giorni",
            operatorName: "Responsabile live",
            includeRiskQuadrants: true,
            includePredictivePriority: true,
            includeForecastWindows: true,
            includeResourceStress: true,
            includeCriticalWatchlist: true,
            includeExecutiveBriefing: true,
            includeComplianceRadar: true,
            humanReviewRequired: true,
            cases: [
              {
                caseId: "live-risk-core",
                fieldId: "live-field-north",
                fieldName: "Live Nord",
                crop: "olivo",
                locationHint: "settore live",
                riskTier: "critical",
                riskVelocity: "blocked",
                commandScore: 93,
                confidenceScore: 0.82,
                evidenceCount: 11,
                photoCount: 8,
                blocked: true,
                manualProtocolReady: false,
                scoutingMissionReady: true,
                nextReviewWindowLabel: "entro T+1 giorno",
                linkedFingerprints: ["live-command", "live-mission", "live-protocol"],
                openLimitations: ["review finale"],
                reviewerNote: "Caso live core.",
              },
              {
                caseId: "live-risk-border",
                fieldId: "live-field-north",
                fieldName: "Live Nord",
                crop: "olivo",
                locationHint: "bordo live",
                riskTier: "high",
                riskVelocity: "accelerating",
                commandScore: 82,
                confidenceScore: 0.76,
                evidenceCount: 7,
                photoCount: 5,
                blocked: false,
                manualProtocolReady: true,
                scoutingMissionReady: true,
                nextReviewWindowLabel: "entro T+2 giorni",
                linkedFingerprints: ["live-command-border", "live-mission-border"],
                openLimitations: [],
                reviewerNote: "Caso live border.",
              },
            ],
            resources: [
              {
                resourceId: "live-risk-reviewer",
                label: "Revisore live",
                role: "reviewer",
                capacityUnits: 6,
                allocatedUnits: 5,
                riskConstraints: ["review manuale"],
              },
              {
                resourceId: "live-risk-operator",
                label: "Operatore live",
                role: "operator",
                capacityUnits: 8,
                allocatedUnits: 6,
                riskConstraints: ["raccolta foto"],
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST farm risk radar: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.report?.radarReady !== true ||
      post.data?.report?.premiumSignals?.farmRiskRadarReady !== true ||
      post.data?.report?.safety?.providerCalled !== false ||
      post.data?.report?.safety?.persistencePerformed !== false ||
      post.data?.report?.safety?.taskCreated !== false ||
      post.data?.report?.safety?.interventionCreated !== false ||
      post.data?.report?.safety?.automaticExecutionPerformed !== false ||
      post.data?.report?.safety?.publicSharePerformed !== false ||
      post.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`POST farm risk radar non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST farm risk radar protetto genera radar dry-run senza provider, DB, task, interventi, share pubblico o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI farm risk radar check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI farm risk radar check completato con successo.");
