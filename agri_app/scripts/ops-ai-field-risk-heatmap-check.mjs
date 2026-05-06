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
  route: "agri_app/src/app/api/ops/ai-field-risk-heatmap-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiFieldRiskHeatmap.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/FieldRiskHeatmapPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiFieldRiskHeatmap.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_FIELD_RISK_HEATMAP_V8_6.md",
  check: "agri_app/scripts/ops-ai-field-risk-heatmap-check.mjs",
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

console.log("Agri App AI field risk heatmap check V8.6");
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
console.log("--- Field risk heatmap engine ---");

for (const required of [
  "FieldRiskHeatmapInput",
  "FieldRiskZoneInput",
  "FieldRiskHeatmapCell",
  "FieldSpreadModel",
  "FieldWorkQueueItem",
  "FieldSamplingFocusItem",
  "FieldRiskMapLegendItem",
  "FieldRiskHeatmapReport",
  "defaultFieldRiskHeatmapInput",
  "createFieldRiskHeatmapFixture",
  "createFieldRiskHeatmapReport",
  "createReadyFieldRiskHeatmapReport",
  "createBlockedFieldRiskHeatmapReport",
  "formatFieldRiskHeatmapReport",
  "heatmapCells",
  "spreadModel",
  "workQueue",
  "samplingFocus",
  "reviewerQueue",
  "mapLegend",
  "heatmapSummary",
  "riskHeatmapReady",
  "zonePrioritizationReady",
  "spreadModelReady",
  "workQueueReady",
  "samplingFocusReady",
  "reviewerQueueReady",
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
    failures.push(`Field risk heatmap engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops field risk heatmap ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-field-risk-heatmap-dry-run",
  "createFieldRiskHeatmapReport",
  "createReadyFieldRiskHeatmapReport",
  "createBlockedFieldRiskHeatmapReport",
  "formatFieldRiskHeatmapReport",
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
    failures.push(`Endpoint field risk heatmap incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI field risk heatmap ---");

for (const required of [
  '"use client"',
  "AI Field Risk Heatmap & Zone Prioritization",
  "Mappa rischio campo e priorità zone",
  "Simula risk heatmap",
  "Reset heatmap",
  "heatmapReady",
  "dominantRiskTier",
  "highestRiskZoneId",
  "highestRiskScore",
  "highPriorityZoneCount",
  "urgentReviewZoneCount",
  "providerAiReady",
  "heatmapFingerprint",
  "Heatmap cells",
  "Spread model",
  "Work queue manuale",
  "Sampling focus",
  "Reviewer queue",
  "Map legend",
  "Copia risk heatmap",
  "Esporta heatmap JSON",
  "navigator.clipboard.writeText",
  "data-ai-field-risk-heatmap",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI field risk heatmap incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import FieldRiskHeatmapPanel from "./FieldRiskHeatmapPanel";',
  "<FieldRiskHeatmapPanel />",
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
  "AI Field Risk Heatmap & Zone Prioritization",
  "Risk heatmap premium",
  "/api/ops/ai-field-risk-heatmap-dry-run",
  "riskHeatmapReady=true",
  "providerAiReady=false",
  "humanReviewRequired=true",
  "data-ai-field-risk-heatmap-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin field risk heatmap incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiFieldRiskHeatmap from "./OperationsAiFieldRiskHeatmap";',
  "<OperationsAiFieldRiskHeatmap />",
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
  "AI Field Risk Heatmap & Zone Prioritization V8.6",
  "/api/ops/ai-field-risk-heatmap-dry-run",
  "FieldRiskHeatmapInput",
  "FieldRiskHeatmapReport",
  "heatmapCells",
  "spreadModel",
  "workQueue",
  "samplingFocus",
  "reviewerQueue",
  "mapLegend",
  "riskHeatmapReady=true",
  "zonePrioritizationReady=true",
  "spreadModelReady=true",
  "workQueueReady=true",
  "samplingFocusReady=true",
  "reviewerQueueReady=true",
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
  "npm run ops:ai-field-risk-heatmap-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README field risk heatmap incompleto: ${required}`);
  }
}

for (const required of [
  "AI field risk heatmap",
  "npm run ops:ai-field-risk-heatmap-check",
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
  "ops:ai-field-risk-heatmap-check",
  "ops:ai-field-scouting-plan-check",
  "ops:ai-temporal-trend-check",
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
  console.log("--- Live field risk heatmap protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-field-risk-heatmap-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint field risk heatmap non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-field-risk-heatmap-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status field risk heatmap blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.report?.heatmapReady !== false ||
      blocked.data?.report?.safety?.providerCalled !== false ||
      blocked.data?.report?.safety?.persistencePerformed !== false ||
      blocked.data?.report?.safety?.taskCreated !== false ||
      blocked.data?.report?.safety?.interventionCreated !== false ||
      blocked.data?.report?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Field risk heatmap blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ field risk heatmap blocked resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-field-risk-heatmap-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status field risk heatmap ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.report?.heatmapReady !== true ||
      ready.data?.report?.premiumSignals?.riskHeatmapReady !== true ||
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
      failures.push(`Field risk heatmap ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ field risk heatmap ready genera mappa senza provider, DB, task, interventi, share pubblico o esecuzione");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-field-risk-heatmap-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            caseId: "live-field-risk-heatmap-case",
            operatorName: "Operatore live",
            crop: "olivo",
            fieldName: "appezzamento test",
            locationHint: "settore test",
            globalTrendDirection: "worsening",
            scoutingPlanFingerprint: "live-scouting-fingerprint",
            temporalTrendFingerprint: "live-temporal-fingerprint",
            fieldIntelligenceFingerprint: "live-field-intelligence-fingerprint",
            includeRiskHeatmap: true,
            includeSpreadModel: true,
            includeWorkQueue: true,
            includeSamplingFocus: true,
            includeReviewerQueue: true,
            includeMapLegend: true,
            humanReviewRequired: true,
            zones: [
              {
                zoneId: "live-zone-core",
                label: "Live core",
                rowRange: "fila 1",
                blockHint: "settore live",
                severityScore: 4,
                evidenceCount: 8,
                photoCount: 4,
                trendSignal: "worsening",
                adjacency: ["live-zone-border"],
                suspectedPatterns: ["macchie", "ingiallimento"],
                coverageConfidence: 0.75,
                operatorNote: "Zona test live.",
              },
              {
                zoneId: "live-zone-border",
                label: "Live border",
                rowRange: "fila 2",
                blockHint: "settore live",
                severityScore: 2,
                evidenceCount: 4,
                photoCount: 3,
                trendSignal: "stable",
                adjacency: ["live-zone-core"],
                suspectedPatterns: ["macchie isolate"],
                coverageConfidence: 0.62,
                operatorNote: "Bordo test live.",
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST field risk heatmap: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.report?.heatmapReady !== true ||
      post.data?.report?.premiumSignals?.riskHeatmapReady !== true ||
      post.data?.report?.safety?.providerCalled !== false ||
      post.data?.report?.safety?.persistencePerformed !== false ||
      post.data?.report?.safety?.taskCreated !== false ||
      post.data?.report?.safety?.interventionCreated !== false ||
      post.data?.report?.safety?.automaticExecutionPerformed !== false ||
      post.data?.report?.safety?.publicSharePerformed !== false ||
      post.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`POST field risk heatmap non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST field risk heatmap protetto genera heatmap dry-run senza provider, DB, task, interventi, share pubblico o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI field risk heatmap check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI field risk heatmap check completato con successo.");
