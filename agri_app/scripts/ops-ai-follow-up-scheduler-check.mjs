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
  route: "agri_app/src/app/api/ops/ai-follow-up-scheduler-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiFollowUpScheduler.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/FollowUpSchedulerPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiFollowUpScheduler.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_FOLLOW_UP_SCHEDULER_V8_7.md",
  check: "agri_app/scripts/ops-ai-follow-up-scheduler-check.mjs",
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

console.log("Agri App AI follow-up scheduler check V8.7");
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
console.log("--- Follow-up scheduler engine ---");

for (const required of [
  "FollowUpSchedulerInput",
  "FollowUpZoneInput",
  "ObservationCadenceItem",
  "FollowUpWindow",
  "ReviewerQueueItem",
  "ManualTaskDraft",
  "EscalationScheduleItem",
  "FollowUpCalendarLegendItem",
  "FollowUpSchedulerReport",
  "defaultFollowUpSchedulerInput",
  "createFollowUpSchedulerFixture",
  "createFollowUpSchedulerReport",
  "createReadyFollowUpSchedulerReport",
  "createBlockedFollowUpSchedulerReport",
  "formatFollowUpSchedulerReport",
  "observationCadence",
  "followUpWindows",
  "reviewerQueue",
  "manualTaskDrafts",
  "escalationSchedule",
  "calendarLegend",
  "calendarSummary",
  "followUpSchedulerReady",
  "observationCadenceReady",
  "calendarWindowReady",
  "reviewerQueueReady",
  "manualTaskDraftReady",
  "escalationScheduleReady",
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
  "manualConversionOnly: true",
  "localAnalysisOnly: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Follow-up scheduler engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops follow-up scheduler ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-follow-up-scheduler-dry-run",
  "createFollowUpSchedulerReport",
  "createReadyFollowUpSchedulerReport",
  "createBlockedFollowUpSchedulerReport",
  "formatFollowUpSchedulerReport",
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
  "manualConversionOnly: true",
  "localAnalysisOnly: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint follow-up scheduler incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI follow-up scheduler ---");

for (const required of [
  '"use client"',
  "AI Follow-Up Scheduler & Observation Cadence",
  "Calendario follow-up e cadence osservazioni",
  "Simula follow-up scheduler",
  "Reset scheduler",
  "scheduleReady",
  "nextCriticalWindow",
  "soonWindowCount",
  "reviewerQueueCount",
  "manualDraftCount",
  "dominantRiskTier",
  "providerAiReady",
  "scheduleFingerprint",
  "Observation cadence",
  "Follow-up windows",
  "Reviewer queue",
  "Manual task drafts",
  "Escalation schedule",
  "Calendar legend",
  "Copia follow-up scheduler",
  "Esporta scheduler JSON",
  "navigator.clipboard.writeText",
  "data-ai-follow-up-scheduler",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI follow-up scheduler incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import FollowUpSchedulerPanel from "./FollowUpSchedulerPanel";',
  "<FollowUpSchedulerPanel />",
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
  "AI Follow-Up Scheduler & Observation Cadence",
  "Follow-up scheduler premium",
  "/api/ops/ai-follow-up-scheduler-dry-run",
  "followUpSchedulerReady=true",
  "providerAiReady=false",
  "automaticTaskCreationReady=false",
  "data-ai-follow-up-scheduler-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin follow-up scheduler incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiFollowUpScheduler from "./OperationsAiFollowUpScheduler";',
  "<OperationsAiFollowUpScheduler />",
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
  "AI Follow-Up Scheduler & Observation Cadence V8.7",
  "/api/ops/ai-follow-up-scheduler-dry-run",
  "FollowUpSchedulerInput",
  "FollowUpSchedulerReport",
  "observationCadence",
  "followUpWindows",
  "reviewerQueue",
  "manualTaskDrafts",
  "escalationSchedule",
  "calendarLegend",
  "followUpSchedulerReady=true",
  "observationCadenceReady=true",
  "calendarWindowReady=true",
  "reviewerQueueReady=true",
  "manualTaskDraftReady=true",
  "escalationScheduleReady=true",
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
  "manualConversionOnly=true",
  "localAnalysisOnly=true",
  "nessuna chiamata provider AI live",
  "nessuna persistenza DB",
  "nessuna creazione automatica",
  "nessuna esecuzione automatica",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "npm run ops:ai-follow-up-scheduler-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README follow-up scheduler incompleto: ${required}`);
  }
}

for (const required of [
  "AI follow-up scheduler",
  "npm run ops:ai-follow-up-scheduler-check",
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
  "ops:ai-follow-up-scheduler-check",
  "ops:ai-field-risk-heatmap-check",
  "ops:ai-field-scouting-plan-check",
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
  console.log("--- Live follow-up scheduler protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-follow-up-scheduler-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint follow-up scheduler non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-follow-up-scheduler-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status follow-up scheduler blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.report?.scheduleReady !== false ||
      blocked.data?.report?.safety?.providerCalled !== false ||
      blocked.data?.report?.safety?.persistencePerformed !== false ||
      blocked.data?.report?.safety?.taskCreated !== false ||
      blocked.data?.report?.safety?.interventionCreated !== false ||
      blocked.data?.report?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Follow-up scheduler blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ follow-up scheduler blocked resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-follow-up-scheduler-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status follow-up scheduler ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.report?.scheduleReady !== true ||
      ready.data?.report?.premiumSignals?.followUpSchedulerReady !== true ||
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
      failures.push(`Follow-up scheduler ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ follow-up scheduler ready genera calendario senza provider, DB, task, interventi, share pubblico o esecuzione");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-follow-up-scheduler-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            caseId: "live-follow-up-scheduler-case",
            operatorName: "Operatore live",
            crop: "olivo",
            fieldName: "appezzamento test",
            locationHint: "settore test",
            heatmapFingerprint: "live-heatmap-fingerprint",
            scoutingPlanFingerprint: "live-scouting-fingerprint",
            temporalTrendFingerprint: "live-temporal-fingerprint",
            fieldIntelligenceFingerprint: "live-field-intelligence-fingerprint",
            includeObservationCadence: true,
            includeFollowUpWindows: true,
            includeReviewQueue: true,
            includeManualTaskDrafts: true,
            includeEscalationSchedule: true,
            includeCalendarLegend: true,
            humanReviewRequired: true,
            zones: [
              {
                zoneId: "live-zone-core",
                label: "Live core",
                riskTier: "urgent-human-review",
                riskScore: 87,
                trendDirection: "worsening",
                lastObservedAtLabel: "T0",
                evidenceCount: 8,
                photoCount: 4,
                photoGapDays: 0,
                requiredPhotoAngles: ["pianta intera", "foglia inferiore", "macro"],
                blockingNotes: ["review obbligatoria"],
                operatorNote: "Zona test live.",
              },
              {
                zoneId: "live-zone-border",
                label: "Live border",
                riskTier: "high-priority",
                riskScore: 66,
                trendDirection: "stable",
                lastObservedAtLabel: "T0",
                evidenceCount: 4,
                photoCount: 3,
                photoGapDays: 1,
                requiredPhotoAngles: ["contesto", "foglia sospetta"],
                blockingNotes: ["follow-up breve"],
                operatorNote: "Bordo test live.",
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST follow-up scheduler: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.report?.scheduleReady !== true ||
      post.data?.report?.premiumSignals?.followUpSchedulerReady !== true ||
      post.data?.report?.safety?.providerCalled !== false ||
      post.data?.report?.safety?.persistencePerformed !== false ||
      post.data?.report?.safety?.taskCreated !== false ||
      post.data?.report?.safety?.interventionCreated !== false ||
      post.data?.report?.safety?.automaticExecutionPerformed !== false ||
      post.data?.report?.safety?.publicSharePerformed !== false ||
      post.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`POST follow-up scheduler non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST follow-up scheduler protetto genera calendario dry-run senza provider, DB, task, interventi, share pubblico o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI follow-up scheduler check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI follow-up scheduler check completato con successo.");
