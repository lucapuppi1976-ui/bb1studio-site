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
  route: "agri_app/src/app/api/ops/ai-temporal-trend-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiTemporalTrend.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/TemporalTrendPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiTemporalTrend.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_TEMPORAL_FIELD_TREND_V8_4.md",
  check: "agri_app/scripts/ops-ai-temporal-trend-check.mjs",
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

console.log("Agri App AI temporal trend check V8.4");
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
console.log("--- Temporal trend engine ---");

for (const required of [
  "TemporalObservationInput",
  "TemporalTrendInput",
  "TemporalChangeVector",
  "TemporalSeverityPoint",
  "TemporalFollowUpItem",
  "TemporalTrendReport",
  "defaultTemporalTrendInput",
  "createTemporalTrendFixture",
  "createTemporalTrendReport",
  "createReadyTemporalTrendReport",
  "createBlockedTemporalTrendReport",
  "formatTemporalTrendReport",
  "timeline",
  "changeVectors",
  "severityTrend",
  "temporalForecast",
  "followUpSchedule",
  "escalationRules",
  "premiumSignals",
  "temporalComparisonReady",
  "progressionTrackingReady",
  "trendForecastReady",
  "followUpScheduleReady",
  "escalationWorkflowReady",
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
  "humanReviewRequired: true",
  "localAnalysisOnly: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Temporal trend engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops temporal trend ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-temporal-trend-dry-run",
  "createTemporalTrendReport",
  "createReadyTemporalTrendReport",
  "createBlockedTemporalTrendReport",
  "formatTemporalTrendReport",
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
  "humanReviewRequired: true",
  "localAnalysisOnly: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint temporal trend incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI temporal trend ---");

for (const required of [
  '"use client"',
  "AI Temporal Field Trend Intelligence",
  "Trend temporale del caso fotografico",
  "Simula trend temporale",
  "Reset trend",
  "trendReady",
  "observationCount",
  "totalPhotoCount",
  "totalEvidenceCount",
  "trendDirection",
  "riskTier",
  "confidenceScore",
  "providerAiReady",
  "trendFingerprint",
  "Timeline osservazioni",
  "Change vector",
  "Severity trend",
  "Follow-up schedule",
  "Escalation rules",
  "Copia trend intelligence",
  "Esporta trend JSON",
  "navigator.clipboard.writeText",
  "data-ai-temporal-trend",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI temporal trend incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import TemporalTrendPanel from "./TemporalTrendPanel";',
  "<TemporalTrendPanel />",
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
  "AI Temporal Field Trend Intelligence",
  "Trend temporale del caso foto",
  "/api/ops/ai-temporal-trend-dry-run",
  "temporalComparisonReady=true",
  "providerAiReady=false",
  "humanReviewRequired=true",
  "data-ai-temporal-trend-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin temporal trend incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiTemporalTrend from "./OperationsAiTemporalTrend";',
  "<OperationsAiTemporalTrend />",
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
  "AI Temporal Field Trend Intelligence V8.4",
  "/api/ops/ai-temporal-trend-dry-run",
  "TemporalTrendInput",
  "TemporalTrendReport",
  "timeline",
  "changeVectors",
  "severityTrend",
  "temporalForecast",
  "followUpSchedule",
  "escalationRules",
  "temporalComparisonReady=true",
  "progressionTrackingReady=true",
  "trendForecastReady=true",
  "followUpScheduleReady=true",
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
  "humanReviewRequired=true",
  "localAnalysisOnly=true",
  "nessuna chiamata provider AI live",
  "nessuna persistenza DB",
  "nessuna creazione automatica",
  "nessuna esecuzione automatica",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "npm run ops:ai-temporal-trend-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README temporal trend incompleto: ${required}`);
  }
}

for (const required of [
  "AI temporal trend",
  "npm run ops:ai-temporal-trend-check",
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
  "ops:ai-temporal-trend-check",
  "ops:ai-field-intelligence-check",
  "ops:ai-case-export-archive-check",
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
  console.log("--- Live temporal trend protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-temporal-trend-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint temporal trend non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-temporal-trend-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status temporal trend blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.report?.trendReady !== false ||
      blocked.data?.report?.safety?.providerCalled !== false ||
      blocked.data?.report?.safety?.persistencePerformed !== false ||
      blocked.data?.report?.safety?.taskCreated !== false ||
      blocked.data?.report?.safety?.interventionCreated !== false ||
      blocked.data?.report?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Temporal trend blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ temporal trend blocked resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-temporal-trend-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status temporal trend ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.report?.trendReady !== true ||
      ready.data?.report?.premiumSignals?.temporalComparisonReady !== true ||
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
      failures.push(`Temporal trend ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ temporal trend ready genera timeline e forecast senza provider, DB, task, interventi, share pubblico o esecuzione");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-temporal-trend-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            caseId: "live-temporal-trend-case",
            operatorName: "Operatore live",
            crop: "olivo",
            locationHint: "settore test",
            agronomicContext: "Caso temporale live protetto senza provider AI.",
            includeTimeline: true,
            includeChangeVector: true,
            includeSeverityTrend: true,
            includeForecast: true,
            includeFollowUpSchedule: true,
            includeEscalationRules: true,
            humanReviewRequired: true,
            observations: [
              {
                observationId: "live-obs-0",
                observedAtLabel: "giorno 0",
                dayOffset: 0,
                crop: "olivo",
                locationHint: "settore test",
                photoCount: 2,
                evidenceCount: 3,
                dominantSeverity: "medium",
                severityScore: 2,
                affectedTissues: ["leaf-upper"],
                repeatedSigns: ["macchie", "ingiallimento"],
                distributionProfile: ["localized"],
                operatorNote: "Baseline.",
              },
              {
                observationId: "live-obs-2",
                observedAtLabel: "giorno 2",
                dayOffset: 2,
                crop: "olivo",
                locationHint: "settore test",
                photoCount: 3,
                evidenceCount: 5,
                dominantSeverity: "high",
                severityScore: 3,
                affectedTissues: ["leaf-upper", "leaf-underside"],
                repeatedSigns: ["macchie", "ingiallimento", "opacità"],
                distributionProfile: ["localized", "scattered"],
                operatorNote: "Follow-up.",
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST temporal trend: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.report?.trendReady !== true ||
      post.data?.report?.premiumSignals?.temporalComparisonReady !== true ||
      post.data?.report?.safety?.providerCalled !== false ||
      post.data?.report?.safety?.persistencePerformed !== false ||
      post.data?.report?.safety?.taskCreated !== false ||
      post.data?.report?.safety?.interventionCreated !== false ||
      post.data?.report?.safety?.automaticExecutionPerformed !== false ||
      post.data?.report?.safety?.publicSharePerformed !== false ||
      post.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`POST temporal trend non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST temporal trend protetto genera trend dry-run senza provider, DB, task, interventi, share pubblico o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI temporal trend check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI temporal trend check completato con successo.");
