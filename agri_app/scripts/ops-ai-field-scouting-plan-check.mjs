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
  route: "agri_app/src/app/api/ops/ai-field-scouting-plan-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiFieldScoutingPlan.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/FieldScoutingPlanPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiFieldScoutingPlan.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_FIELD_SCOUTING_PLAN_V8_5.md",
  check: "agri_app/scripts/ops-ai-field-scouting-plan-check.mjs",
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

console.log("Agri App AI field scouting plan check V8.5");
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
console.log("--- Field scouting engine ---");

for (const required of [
  "FieldScoutingInput",
  "FieldScoutingZone",
  "FieldScoutingSamplingPoint",
  "FieldScoutingRouteStep",
  "FieldScoutingPhotoProtocol",
  "FieldScoutingPlan",
  "defaultFieldScoutingInput",
  "createFieldScoutingFixture",
  "createFieldScoutingPlan",
  "createReadyFieldScoutingPlan",
  "createBlockedFieldScoutingPlan",
  "formatFieldScoutingPlan",
  "priorityZones",
  "samplingGrid",
  "scoutingRoute",
  "photoProtocol",
  "escalationRules",
  "humanReviewChecklist",
  "scoutingSummary",
  "scoutingPlanReady",
  "samplingGridReady",
  "routeOptimizationReady",
  "photoProtocolReady",
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
    failures.push(`Field scouting engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops field scouting ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-field-scouting-plan-dry-run",
  "createFieldScoutingPlan",
  "createReadyFieldScoutingPlan",
  "createBlockedFieldScoutingPlan",
  "formatFieldScoutingPlan",
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
    failures.push(`Endpoint field scouting incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI field scouting ---");

for (const required of [
  '"use client"',
  "AI Field Scouting Plan & Sampling Grid",
  "Piano scouting campo e griglia campionamento",
  "Simula scouting plan",
  "Reset piano",
  "planReady",
  "riskPriority",
  "routeStepCount",
  "samplingPointCount",
  "priorityZoneCount",
  "minimumRequiredPhotos",
  "providerAiReady",
  "planFingerprint",
  "Priority zones",
  "Sampling grid",
  "Scouting route",
  "Photo protocol",
  "Escalation rules",
  "Human review checklist",
  "Copia scouting plan",
  "Esporta scouting JSON",
  "navigator.clipboard.writeText",
  "data-ai-field-scouting-plan",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI field scouting incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import FieldScoutingPlanPanel from "./FieldScoutingPlanPanel";',
  "<FieldScoutingPlanPanel />",
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
  "AI Field Scouting Plan & Sampling Grid",
  "Scouting plan premium",
  "/api/ops/ai-field-scouting-plan-dry-run",
  "samplingGridReady=true",
  "providerAiReady=false",
  "humanReviewRequired=true",
  "data-ai-field-scouting-plan-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin field scouting incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiFieldScoutingPlan from "./OperationsAiFieldScoutingPlan";',
  "<OperationsAiFieldScoutingPlan />",
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
  "AI Field Scouting Plan & Sampling Grid V8.5",
  "/api/ops/ai-field-scouting-plan-dry-run",
  "FieldScoutingInput",
  "FieldScoutingPlan",
  "priorityZones",
  "samplingGrid",
  "scoutingRoute",
  "photoProtocol",
  "escalationRules",
  "humanReviewChecklist",
  "scoutingPlanReady=true",
  "samplingGridReady=true",
  "routeOptimizationReady=true",
  "photoProtocolReady=true",
  "escalationWorkflowReady=true",
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
  "npm run ops:ai-field-scouting-plan-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README field scouting incompleto: ${required}`);
  }
}

for (const required of [
  "AI field scouting plan",
  "npm run ops:ai-field-scouting-plan-check",
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
  "ops:ai-field-scouting-plan-check",
  "ops:ai-temporal-trend-check",
  "ops:ai-field-intelligence-check",
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
  console.log("--- Live field scouting protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-field-scouting-plan-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint field scouting non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-field-scouting-plan-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status field scouting blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.plan?.planReady !== false ||
      blocked.data?.plan?.safety?.providerCalled !== false ||
      blocked.data?.plan?.safety?.persistencePerformed !== false ||
      blocked.data?.plan?.safety?.taskCreated !== false ||
      blocked.data?.plan?.safety?.interventionCreated !== false ||
      blocked.data?.plan?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Field scouting blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ field scouting blocked resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-field-scouting-plan-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status field scouting ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.plan?.planReady !== true ||
      ready.data?.plan?.premiumSignals?.scoutingPlanReady !== true ||
      ready.data?.plan?.premiumSignals?.providerAiReady !== false ||
      ready.data?.plan?.premiumSignals?.persistenceReady !== false ||
      ready.data?.plan?.safety?.providerCalled !== false ||
      ready.data?.plan?.safety?.persistencePerformed !== false ||
      ready.data?.plan?.safety?.taskCreated !== false ||
      ready.data?.plan?.safety?.interventionCreated !== false ||
      ready.data?.plan?.safety?.automaticExecutionPerformed !== false ||
      ready.data?.plan?.safety?.publicSharePerformed !== false ||
      ready.data?.plan?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`Field scouting ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ field scouting ready genera piano senza provider, DB, task, interventi, share pubblico o esecuzione");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-field-scouting-plan-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            caseId: "live-field-scouting-case",
            operatorName: "Operatore live",
            crop: "olivo",
            fieldName: "appezzamento test",
            locationHint: "settore test",
            dominantSeverity: "high",
            trendDirection: "worsening",
            confidenceScore: 0.72,
            observationCount: 2,
            photoCount: 6,
            evidenceCount: 8,
            affectedRows: ["fila 1", "fila 2"],
            affectedZones: ["zona core", "bordo", "controllo"],
            suspectedPatterns: ["macchie", "ingiallimento"],
            agronomicContext: "Caso live protetto senza provider AI.",
            includeScoutingRoute: true,
            includeSamplingGrid: true,
            includePhotoProtocol: true,
            includeEscalationRules: true,
            includeHumanReviewChecklist: true,
            humanReviewRequired: true,
          },
        }),
      },
    );

    console.log(`HTTP status POST field scouting: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.plan?.planReady !== true ||
      post.data?.plan?.premiumSignals?.scoutingPlanReady !== true ||
      post.data?.plan?.safety?.providerCalled !== false ||
      post.data?.plan?.safety?.persistencePerformed !== false ||
      post.data?.plan?.safety?.taskCreated !== false ||
      post.data?.plan?.safety?.interventionCreated !== false ||
      post.data?.plan?.safety?.automaticExecutionPerformed !== false ||
      post.data?.plan?.safety?.publicSharePerformed !== false ||
      post.data?.plan?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`POST field scouting non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST field scouting protetto genera piano dry-run senza provider, DB, task, interventi, share pubblico o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI field scouting plan check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI field scouting plan check completato con successo.");
