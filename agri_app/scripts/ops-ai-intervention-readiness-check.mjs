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
  route: "agri_app/src/app/api/ops/ai-intervention-readiness-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiInterventionReadiness.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/InterventionReadinessPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiInterventionReadiness.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_INTERVENTION_READINESS_V8_8.md",
  check: "agri_app/scripts/ops-ai-intervention-readiness-check.mjs",
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

console.log("Agri App AI intervention readiness check V8.8");
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
console.log("--- Intervention readiness engine ---");

for (const required of [
  "InterventionReadinessInput",
  "InterventionReadinessZoneInput",
  "ReadinessDecisionGate",
  "InterventionReadinessMatrixRow",
  "ApprovalBoardItem",
  "ManualConversionPacket",
  "MaterialChecklistItem",
  "InterventionBlockerSummary",
  "InterventionReadinessReport",
  "defaultInterventionReadinessInput",
  "createInterventionReadinessFixture",
  "createInterventionReadinessReport",
  "createReadyInterventionReadinessReport",
  "createBlockedInterventionReadinessReport",
  "formatInterventionReadinessReport",
  "readinessMatrix",
  "approvalBoard",
  "decisionGates",
  "manualConversionPackets",
  "materialChecklist",
  "blockerSummary",
  "readinessSummary",
  "interventionReadinessReady",
  "approvalBoardReady",
  "decisionGatesReady",
  "manualConversionPacketReady",
  "materialChecklistReady",
  "blockerSummaryReady",
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
  "humanReviewRequired: true",
  "manualConversionOnly: true",
  "localAnalysisOnly: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Intervention readiness engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops intervention readiness ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-intervention-readiness-dry-run",
  "createInterventionReadinessReport",
  "createReadyInterventionReadinessReport",
  "createBlockedInterventionReadinessReport",
  "formatInterventionReadinessReport",
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
  "humanReviewRequired: true",
  "manualConversionOnly: true",
  "localAnalysisOnly: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint intervention readiness incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI intervention readiness ---");

for (const required of [
  '"use client"',
  "AI Intervention Readiness Matrix & Manual Approval Board",
  "Matrice readiness intervento e board approvazione",
  "Simula intervention readiness",
  "Reset readiness",
  "readinessReady",
  "dominantPriorityTier",
  "manualReviewReadyCount",
  "blockedCount",
  "draftOnlyCount",
  "nextReviewerAction",
  "providerAiReady",
  "readinessFingerprint",
  "Readiness matrix",
  "Approval board",
  "Decision gates",
  "Manual conversion packets",
  "Material checklist",
  "Blocker summary",
  "Copia intervention readiness",
  "Esporta readiness JSON",
  "navigator.clipboard.writeText",
  "data-ai-intervention-readiness",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI intervention readiness incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import InterventionReadinessPanel from "./InterventionReadinessPanel";',
  "<InterventionReadinessPanel />",
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
  "AI Intervention Readiness Matrix & Manual Approval Board",
  "Intervention readiness premium",
  "/api/ops/ai-intervention-readiness-dry-run",
  "interventionReadinessReady=true",
  "manualConversionOnly=true",
  "automaticTaskCreationReady=false",
  "data-ai-intervention-readiness-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin intervention readiness incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiInterventionReadiness from "./OperationsAiInterventionReadiness";',
  "<OperationsAiInterventionReadiness />",
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
  "AI Intervention Readiness Matrix & Manual Approval Board V8.8",
  "/api/ops/ai-intervention-readiness-dry-run",
  "InterventionReadinessInput",
  "InterventionReadinessReport",
  "readinessMatrix",
  "approvalBoard",
  "decisionGates",
  "manualConversionPackets",
  "materialChecklist",
  "blockerSummary",
  "interventionReadinessReady=true",
  "approvalBoardReady=true",
  "decisionGatesReady=true",
  "manualConversionPacketReady=true",
  "materialChecklistReady=true",
  "blockerSummaryReady=true",
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
  "humanReviewRequired=true",
  "manualConversionOnly=true",
  "localAnalysisOnly=true",
  "nessuna chiamata provider AI live",
  "nessuna persistenza DB",
  "nessuna creazione automatica",
  "nessuna esecuzione automatica",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "npm run ops:ai-intervention-readiness-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README intervention readiness incompleto: ${required}`);
  }
}

for (const required of [
  "AI intervention readiness",
  "npm run ops:ai-intervention-readiness-check",
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
  "ops:ai-intervention-readiness-check",
  "ops:ai-follow-up-scheduler-check",
  "ops:ai-field-risk-heatmap-check",
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
  console.log("--- Live intervention readiness protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-intervention-readiness-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint intervention readiness non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-intervention-readiness-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status intervention readiness blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.report?.readinessReady !== false ||
      blocked.data?.report?.safety?.providerCalled !== false ||
      blocked.data?.report?.safety?.persistencePerformed !== false ||
      blocked.data?.report?.safety?.taskCreated !== false ||
      blocked.data?.report?.safety?.interventionCreated !== false ||
      blocked.data?.report?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Intervention readiness blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ intervention readiness blocked resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-intervention-readiness-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status intervention readiness ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.report?.readinessReady !== true ||
      ready.data?.report?.premiumSignals?.interventionReadinessReady !== true ||
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
      failures.push(`Intervention readiness ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ intervention readiness ready genera matrice senza provider, DB, task, interventi, share pubblico o esecuzione");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-intervention-readiness-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            caseId: "live-intervention-readiness-case",
            operatorName: "Operatore live",
            crop: "olivo",
            fieldName: "appezzamento test",
            locationHint: "settore test",
            followUpSchedulerFingerprint: "live-followup-fingerprint",
            fieldMapFingerprint: "live-fieldmap-fingerprint",
            temporalTrendFingerprint: "live-temporal-fingerprint",
            scoutingPlanFingerprint: "live-scouting-fingerprint",
            includeReadinessMatrix: true,
            includeApprovalBoard: true,
            includeDecisionGates: true,
            includeManualConversionPacket: true,
            includeMaterialChecklist: true,
            includeBlockerSummary: true,
            humanReviewRequired: true,
            zones: [
              {
                zoneId: "live-zone-core",
                label: "Live core",
                priorityTier: "blocked-until-review",
                priorityScore: 88,
                followUpWindowLabel: "entro T+1 giorno",
                reviewerDecision: "needs-more-evidence",
                evidenceCount: 8,
                photoCount: 4,
                requiredChecksCompleted: ["foto contesto", "macro"],
                missingChecks: ["review finale"],
                operatorNote: "Zona test live.",
              },
              {
                zoneId: "live-zone-border",
                label: "Live border",
                priorityTier: "manual-review-required",
                priorityScore: 70,
                followUpWindowLabel: "entro T+2 giorni",
                reviewerDecision: "approve-with-caution",
                evidenceCount: 4,
                photoCount: 3,
                requiredChecksCompleted: ["foto bordo", "nota operatore"],
                missingChecks: ["controllo sano"],
                operatorNote: "Bordo test live.",
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST intervention readiness: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.report?.readinessReady !== true ||
      post.data?.report?.premiumSignals?.interventionReadinessReady !== true ||
      post.data?.report?.safety?.providerCalled !== false ||
      post.data?.report?.safety?.persistencePerformed !== false ||
      post.data?.report?.safety?.taskCreated !== false ||
      post.data?.report?.safety?.interventionCreated !== false ||
      post.data?.report?.safety?.automaticExecutionPerformed !== false ||
      post.data?.report?.safety?.publicSharePerformed !== false ||
      post.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`POST intervention readiness non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST intervention readiness protetto genera matrice dry-run senza provider, DB, task, interventi, share pubblico o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI intervention readiness check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI intervention readiness check completato con successo.");
