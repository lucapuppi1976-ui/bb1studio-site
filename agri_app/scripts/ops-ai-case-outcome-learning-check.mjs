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
  route: "agri_app/src/app/api/ops/ai-case-outcome-learning-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiCaseOutcomeLearning.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/CaseOutcomeLearningPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiCaseOutcomeLearning.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_CASE_OUTCOME_LEARNING_V9_7.md",
  check: "agri_app/scripts/ops-ai-case-outcome-learning-check.mjs",
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

console.log("Agri App AI case outcome learning check V9.7");
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
console.log("--- Case outcome learning engine ---");

for (const required of [
  "OutcomeLearningRecommendationInput",
  "OutcomeObservationInput",
  "CaseOutcomeLearningInput",
  "OutcomeEvidenceTimelineItem",
  "RecommendationOutcomeMatrixItem",
  "OutcomeLessonCard",
  "MemoryUpdateDraft",
  "LearningDriftSignal",
  "ReviewerLearningBriefing",
  "LearningExportPacket",
  "CaseOutcomeLearningReport",
  "defaultCaseOutcomeLearningInput",
  "createCaseOutcomeLearningFixture",
  "createCaseOutcomeLearningReport",
  "createReadyCaseOutcomeLearningReport",
  "createBlockedCaseOutcomeLearningReport",
  "formatCaseOutcomeLearningReport",
  "outcomeTimeline",
  "recommendationOutcomeMatrix",
  "lessonCards",
  "memoryUpdateDrafts",
  "driftSignals",
  "reviewerLearningBriefing",
  "learningExportPacket",
  "learningSummary",
  "caseOutcomeLearningReady",
  "outcomeTimelineReady",
  "recommendationOutcomeMatrixReady",
  "lessonCardsReady",
  "memoryUpdateDraftsReady",
  "driftSignalsReady",
  "reviewerLearningBriefingReady",
  "learningExportPacketReady",
  "providerAiReady: false",
  "persistenceReady: false",
  "memoryPersistenceReady: false",
  "automaticTaskCreationReady: false",
  "automaticInterventionCreationReady: false",
  "automaticExecutionReady: false",
  "providerCalled: false",
  "persistencePerformed: false",
  "memoryPersistencePerformed: false",
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
  "memoryPersistenceAllowed: false",
  "publicShareAllowed: false",
  "productPrescriptionAllowed: false",
  "dosageAdviceAllowed: false",
  "manualDispatchOnly: true",
  "humanReviewRequired: true",
  "localAnalysisOnly: true",
  "localLearningOnly: true",
  "localMemoryOnly: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Case outcome learning engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops case outcome learning ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-case-outcome-learning-dry-run",
  "createCaseOutcomeLearningReport",
  "createReadyCaseOutcomeLearningReport",
  "createBlockedCaseOutcomeLearningReport",
  "formatCaseOutcomeLearningReport",
  "providerCalled: false",
  "persistencePerformed: false",
  "memoryPersistencePerformed: false",
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
  "memoryPersistenceAllowed: false",
  "publicShareAllowed: false",
  "productPrescriptionAllowed: false",
  "dosageAdviceAllowed: false",
  "manualDispatchOnly: true",
  "humanReviewRequired: true",
  "localAnalysisOnly: true",
  "localLearningOnly: true",
  "localMemoryOnly: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint case outcome learning incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI case outcome learning ---");

for (const required of [
  '"use client"',
  "AI Case Outcome Learning Loop & Memory Update Draft",
  "Learning loop locale da outcome osservato",
  "Simula outcome learning",
  "Reset learning",
  "caseOutcomeLearningReady",
  "learningStatus",
  "latestOutcomeLabel",
  "confidenceDelta",
  "riskDeltaLabel",
  "alignedRecommendationCount",
  "memoryUpdateDraftCount",
  "driftSignalCount",
  "learningFingerprint",
  "Outcome evidence timeline",
  "Recommendation outcome matrix",
  "Lesson cards",
  "Memory update drafts",
  "Drift signals",
  "Reviewer learning briefing",
  "Learning export packet",
  "Copia outcome learning",
  "Esporta learning JSON",
  "navigator.clipboard.writeText",
  "data-ai-case-outcome-learning",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI case outcome learning incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import CaseOutcomeLearningPanel from "./CaseOutcomeLearningPanel";',
  "<CaseOutcomeLearningPanel />",
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
  "AI Case Outcome Learning Loop & Memory Update Draft",
  "Case Outcome Learning premium",
  "/api/ops/ai-case-outcome-learning-dry-run",
  "caseOutcomeLearningReady=true",
  "memoryUpdateDraftsReady=true",
  "memoryPersistenceReady=false",
  "data-ai-case-outcome-learning-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin case outcome learning incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiCaseOutcomeLearning from "./OperationsAiCaseOutcomeLearning";',
  "<OperationsAiCaseOutcomeLearning />",
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
  "AI Case Outcome Learning Loop & Memory Update Draft V9.7",
  "/api/ops/ai-case-outcome-learning-dry-run",
  "CaseOutcomeLearningInput",
  "CaseOutcomeLearningReport",
  "outcomeTimeline",
  "recommendationOutcomeMatrix",
  "lessonCards",
  "memoryUpdateDrafts",
  "driftSignals",
  "reviewerLearningBriefing",
  "learningExportPacket",
  "learningSummary",
  "caseOutcomeLearningReady=true",
  "outcomeTimelineReady=true",
  "recommendationOutcomeMatrixReady=true",
  "lessonCardsReady=true",
  "memoryUpdateDraftsReady=true",
  "driftSignalsReady=true",
  "reviewerLearningBriefingReady=true",
  "learningExportPacketReady=true",
  "providerAiReady=false",
  "persistenceReady=false",
  "memoryPersistenceReady=false",
  "automaticTaskCreationReady=false",
  "automaticInterventionCreationReady=false",
  "automaticExecutionReady=false",
  "providerCalled=false",
  "persistencePerformed=false",
  "memoryPersistencePerformed=false",
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
  "memoryPersistenceAllowed=false",
  "publicShareAllowed=false",
  "productPrescriptionAllowed=false",
  "dosageAdviceAllowed=false",
  "manualDispatchOnly=true",
  "humanReviewRequired=true",
  "localAnalysisOnly=true",
  "localLearningOnly=true",
  "localMemoryOnly=true",
  "nessuna chiamata provider AI live",
  "nessuna memoria persistente DB",
  "nessuna persistenza DB",
  "nessun aggiornamento memoria automatico",
  "nessuna creazione automatica",
  "nessuna esecuzione automatica",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "npm run ops:ai-case-outcome-learning-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README case outcome learning incompleto: ${required}`);
  }
}

for (const required of [
  "AI case outcome learning",
  "npm run ops:ai-case-outcome-learning-check",
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
  "ops:ai-case-outcome-learning-check",
  "ops:ai-case-memory-retrieval-check",
  "ops:ai-case-memory-graph-check",
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
  console.log("--- Live case outcome learning protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-case-outcome-learning-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint case outcome learning non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-outcome-learning-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status case outcome learning blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.report?.caseOutcomeLearningReady !== false ||
      blocked.data?.report?.safety?.providerCalled !== false ||
      blocked.data?.report?.safety?.persistencePerformed !== false ||
      blocked.data?.report?.safety?.memoryPersistencePerformed !== false ||
      blocked.data?.report?.safety?.taskCreated !== false ||
      blocked.data?.report?.safety?.interventionCreated !== false ||
      blocked.data?.report?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Case outcome learning blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ case outcome learning blocked resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-outcome-learning-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status case outcome learning ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.report?.caseOutcomeLearningReady !== true ||
      ready.data?.report?.premiumSignals?.caseOutcomeLearningReady !== true ||
      ready.data?.report?.premiumSignals?.providerAiReady !== false ||
      ready.data?.report?.premiumSignals?.persistenceReady !== false ||
      ready.data?.report?.premiumSignals?.memoryPersistenceReady !== false ||
      ready.data?.report?.safety?.providerCalled !== false ||
      ready.data?.report?.safety?.persistencePerformed !== false ||
      ready.data?.report?.safety?.memoryPersistencePerformed !== false ||
      ready.data?.report?.safety?.taskCreated !== false ||
      ready.data?.report?.safety?.interventionCreated !== false ||
      ready.data?.report?.safety?.automaticExecutionPerformed !== false ||
      ready.data?.report?.safety?.publicSharePerformed !== false ||
      ready.data?.report?.safety?.localLearningOnly !== true ||
      ready.data?.report?.safety?.localMemoryOnly !== true ||
      ready.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`Case outcome learning ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ case outcome learning ready genera learning locale senza provider, DB, memoria persistente, task, interventi, share pubblico o esecuzione");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-outcome-learning-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            farmId: "live-case-outcome-learning",
            farmName: "Azienda live",
            learningWindowLabel: "follow-up live",
            operatorName: "Responsabile live",
            caseId: "live-learning-case",
            fieldId: "live-field-north",
            fieldName: "Live Nord",
            crop: "olivo",
            riskTierBefore: "critical",
            confidenceScoreBefore: 0.7,
            symptomTagsBefore: ["macchie fogliari"],
            evidenceLabelsBefore: ["close-up foglia"],
            sourceMemoryCaseIds: ["live-memory-core"],
            sourceRetrievalFingerprints: ["live-retrieval-core"],
            includeOutcomeTimeline: true,
            includeRecommendationOutcomeMatrix: true,
            includeLessonCards: true,
            includeMemoryUpdateDrafts: true,
            includeDriftSignals: true,
            includeReviewerLearningBriefing: true,
            includeLearningExportPacket: true,
            humanReviewRequired: true,
            priorRecommendations: [
              {
                recommendationId: "live-rec-control",
                sourceCaseId: "live-memory-core",
                recommendationType: "evidence-collection",
                recommendationLabel: "Aggiungere controllo sano",
                expectedOutcome: "improved",
                priorityScore: 80,
                confidenceScore: 0.76,
                linkedFingerprints: ["live-retrieval-core"],
                limitations: [],
              },
            ],
            observations: [
              {
                observationId: "live-obs-t1",
                observedAtLabel: "T+3",
                outcomeLabel: "improved",
                riskTierAfter: "watch",
                confidenceScoreAfter: 0.82,
                evidenceLabels: ["close-up foglia", "controllo sano"],
                symptomTagsAfter: ["macchie fogliari"],
                reviewerNote: "Outcome live revisionato.",
                humanReviewed: true,
                blocked: false,
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST case outcome learning: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.report?.caseOutcomeLearningReady !== true ||
      post.data?.report?.premiumSignals?.caseOutcomeLearningReady !== true ||
      post.data?.report?.safety?.providerCalled !== false ||
      post.data?.report?.safety?.persistencePerformed !== false ||
      post.data?.report?.safety?.memoryPersistencePerformed !== false ||
      post.data?.report?.safety?.taskCreated !== false ||
      post.data?.report?.safety?.interventionCreated !== false ||
      post.data?.report?.safety?.automaticExecutionPerformed !== false ||
      post.data?.report?.safety?.publicSharePerformed !== false ||
      post.data?.report?.safety?.productPrescriptionPerformed !== false ||
      post.data?.report?.safety?.dosageAdvicePerformed !== false ||
      post.data?.report?.safety?.localLearningOnly !== true ||
      post.data?.report?.safety?.localMemoryOnly !== true ||
      post.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`POST case outcome learning non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST case outcome learning protetto genera learning dry-run senza provider, DB, memoria persistente, task, interventi, share pubblico, prodotto, dosaggio o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI case outcome learning check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI case outcome learning check completato con successo.");
