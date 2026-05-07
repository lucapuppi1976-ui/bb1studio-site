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
  route: "agri_app/src/app/api/ops/ai-case-memory-retrieval-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiCaseMemoryRetrieval.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/CaseMemoryRetrievalPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiCaseMemoryRetrieval.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_CASE_MEMORY_RETRIEVAL_V9_6.md",
  check: "agri_app/scripts/ops-ai-case-memory-retrieval-check.mjs",
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

console.log("Agri App AI case memory retrieval check V9.6");
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
console.log("--- Case memory retrieval engine ---");

for (const required of [
  "RetrievalQueryInput",
  "RetrievalMemoryCaseInput",
  "CaseMemoryRetrievalInput",
  "SimilarityMatchItem",
  "ReusableInsightCard",
  "TransferLearningCandidate",
  "GapBridgePlanItem",
  "RetrievalBriefing",
  "RetrievalExportPacket",
  "CaseMemoryRetrievalReport",
  "defaultCaseMemoryRetrievalInput",
  "createCaseMemoryRetrievalFixture",
  "createCaseMemoryRetrievalReport",
  "createReadyCaseMemoryRetrievalReport",
  "createBlockedCaseMemoryRetrievalReport",
  "formatCaseMemoryRetrievalReport",
  "similarityMatches",
  "insightCards",
  "transferLearningCandidates",
  "gapBridgePlan",
  "retrievalBriefing",
  "retrievalExportPacket",
  "retrievalSummary",
  "caseMemoryRetrievalReady",
  "similarityMatchesReady",
  "insightCardsReady",
  "transferLearningReady",
  "gapBridgePlanReady",
  "retrievalBriefingReady",
  "retrievalExportPacketReady",
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
  "localMemoryOnly: true",
  "localRetrievalOnly: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Case memory retrieval engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops case memory retrieval ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-case-memory-retrieval-dry-run",
  "createCaseMemoryRetrievalReport",
  "createReadyCaseMemoryRetrievalReport",
  "createBlockedCaseMemoryRetrievalReport",
  "formatCaseMemoryRetrievalReport",
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
  "localMemoryOnly: true",
  "localRetrievalOnly: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint case memory retrieval incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI case memory retrieval ---");

for (const required of [
  '"use client"',
  "AI Case Memory Retrieval & Similar Case Advisor",
  "Ricerca casi simili e insight riutilizzabili",
  "Simula memory retrieval",
  "Reset retrieval",
  "caseMemoryRetrievalReady",
  "retrievalStatus",
  "queryCaseId",
  "memoryCaseCount",
  "candidateMatchCount",
  "reusableInsightCount",
  "transferCandidateCount",
  "topMemoryCaseId",
  "topSimilarityScore",
  "retrievalFingerprint",
  "Similarity matches",
  "Insight cards",
  "Transfer learning candidates",
  "Gap bridge plan",
  "Retrieval briefing",
  "Retrieval export packet",
  "Copia memory retrieval",
  "Esporta retrieval JSON",
  "navigator.clipboard.writeText",
  "data-ai-case-memory-retrieval",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI case memory retrieval incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import CaseMemoryRetrievalPanel from "./CaseMemoryRetrievalPanel";',
  "<CaseMemoryRetrievalPanel />",
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
  "AI Case Memory Retrieval & Similar Case Advisor",
  "Case Memory Retrieval premium",
  "/api/ops/ai-case-memory-retrieval-dry-run",
  "caseMemoryRetrievalReady=true",
  "similarityMatchesReady=true",
  "persistenceReady=false",
  "data-ai-case-memory-retrieval-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin case memory retrieval incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiCaseMemoryRetrieval from "./OperationsAiCaseMemoryRetrieval";',
  "<OperationsAiCaseMemoryRetrieval />",
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
  "AI Case Memory Retrieval & Similar Case Advisor V9.6",
  "/api/ops/ai-case-memory-retrieval-dry-run",
  "CaseMemoryRetrievalInput",
  "CaseMemoryRetrievalReport",
  "similarityMatches",
  "insightCards",
  "transferLearningCandidates",
  "gapBridgePlan",
  "retrievalBriefing",
  "retrievalExportPacket",
  "retrievalSummary",
  "caseMemoryRetrievalReady=true",
  "similarityMatchesReady=true",
  "insightCardsReady=true",
  "transferLearningReady=true",
  "gapBridgePlanReady=true",
  "retrievalBriefingReady=true",
  "retrievalExportPacketReady=true",
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
  "localMemoryOnly=true",
  "localRetrievalOnly=true",
  "nessuna chiamata provider AI live",
  "nessuna memoria persistente DB",
  "nessuna persistenza DB",
  "nessuna creazione automatica",
  "nessuna esecuzione automatica",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "npm run ops:ai-case-memory-retrieval-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README case memory retrieval incompleto: ${required}`);
  }
}

for (const required of [
  "AI case memory retrieval",
  "npm run ops:ai-case-memory-retrieval-check",
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
  "ops:ai-case-memory-retrieval-check",
  "ops:ai-case-memory-graph-check",
  "ops:ai-response-portfolio-check",
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
  console.log("--- Live case memory retrieval protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-case-memory-retrieval-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint case memory retrieval non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-memory-retrieval-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status case memory retrieval blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.report?.caseMemoryRetrievalReady !== false ||
      blocked.data?.report?.safety?.providerCalled !== false ||
      blocked.data?.report?.safety?.persistencePerformed !== false ||
      blocked.data?.report?.safety?.taskCreated !== false ||
      blocked.data?.report?.safety?.interventionCreated !== false ||
      blocked.data?.report?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Case memory retrieval blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ case memory retrieval blocked resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-memory-retrieval-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status case memory retrieval ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.report?.caseMemoryRetrievalReady !== true ||
      ready.data?.report?.premiumSignals?.caseMemoryRetrievalReady !== true ||
      ready.data?.report?.premiumSignals?.providerAiReady !== false ||
      ready.data?.report?.premiumSignals?.persistenceReady !== false ||
      ready.data?.report?.safety?.providerCalled !== false ||
      ready.data?.report?.safety?.persistencePerformed !== false ||
      ready.data?.report?.safety?.taskCreated !== false ||
      ready.data?.report?.safety?.interventionCreated !== false ||
      ready.data?.report?.safety?.automaticExecutionPerformed !== false ||
      ready.data?.report?.safety?.publicSharePerformed !== false ||
      ready.data?.report?.safety?.localMemoryOnly !== true ||
      ready.data?.report?.safety?.localRetrievalOnly !== true ||
      ready.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`Case memory retrieval ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ case memory retrieval ready genera retrieval locale senza provider, DB, task, interventi, share pubblico o esecuzione");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-memory-retrieval-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            farmId: "live-case-memory-retrieval",
            farmName: "Azienda live",
            retrievalWindowLabel: "ultimi 60 giorni",
            operatorName: "Responsabile live",
            includeSimilarityMatches: true,
            includeInsightCards: true,
            includeTransferLearningCandidates: true,
            includeGapBridgePlan: true,
            includeRetrievalBriefing: true,
            includeRetrievalExportPacket: true,
            humanReviewRequired: true,
            query: {
              caseId: "live-query-case",
              fieldId: "live-field-north",
              fieldName: "Live Nord",
              crop: "olivo",
              locationHint: "settore live",
              riskTier: "critical",
              confidenceScore: 0.79,
              symptomTags: ["macchie fogliari", "diffusione bordo"],
              evidenceLabels: ["close-up foglia"],
              linkedFingerprints: ["live-command", "live-risk"],
              openLimitations: ["review finale"],
              reviewerQuestion: "Quali casi simili sono utili?",
              humanReviewed: false,
              blocked: true,
            },
            memoryCases: [
              {
                caseId: "live-memory-core",
                fieldId: "live-field-north",
                fieldName: "Live Nord",
                crop: "olivo",
                locationHint: "bordo live",
                riskTier: "high",
                confidenceScore: 0.76,
                symptomTags: ["macchie fogliari", "diffusione bordo"],
                evidenceLabels: ["close-up foglia", "vista bordo"],
                decisionLabels: ["manual-ready"],
                linkedFingerprints: ["live-command-border", "live-risk-border"],
                reusableInsights: ["aggiungere controllo sano", "validare pattern bordo"],
                knownLimitations: [],
                outcomeLabel: "improved",
                humanReviewed: true,
                blocked: false,
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST case memory retrieval: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.report?.caseMemoryRetrievalReady !== true ||
      post.data?.report?.premiumSignals?.caseMemoryRetrievalReady !== true ||
      post.data?.report?.safety?.providerCalled !== false ||
      post.data?.report?.safety?.persistencePerformed !== false ||
      post.data?.report?.safety?.taskCreated !== false ||
      post.data?.report?.safety?.interventionCreated !== false ||
      post.data?.report?.safety?.automaticExecutionPerformed !== false ||
      post.data?.report?.safety?.publicSharePerformed !== false ||
      post.data?.report?.safety?.productPrescriptionPerformed !== false ||
      post.data?.report?.safety?.dosageAdvicePerformed !== false ||
      post.data?.report?.safety?.localMemoryOnly !== true ||
      post.data?.report?.safety?.localRetrievalOnly !== true ||
      post.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`POST case memory retrieval non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST case memory retrieval protetto genera retrieval dry-run senza provider, DB, task, interventi, share pubblico, prodotto, dosaggio o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI case memory retrieval check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI case memory retrieval check completato con successo.");
