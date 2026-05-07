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
  route: "agri_app/src/app/api/ops/ai-memory-quality-guard-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiMemoryQualityGuard.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/MemoryQualityGuardPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiMemoryQualityGuard.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_MEMORY_QUALITY_GUARD_V9_9.md",
  check: "agri_app/scripts/ops-ai-memory-quality-guard-check.mjs",
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

console.log("Agri App AI memory quality guard check V9.9");
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
console.log("--- Memory quality guard engine ---");

for (const required of [
  "MemoryQualityCandidateInput",
  "MemoryQualityGuardInput",
  "EvidenceAdequacyMatrixItem",
  "MemoryConflictCluster",
  "StaleInsightFinding",
  "BiasDriftFinding",
  "QuarantineRecommendation",
  "QualityImprovementPlanItem",
  "ReviewerQualityBriefing",
  "MemoryQualityExportPacket",
  "MemoryQualityGuardReport",
  "defaultMemoryQualityGuardInput",
  "createMemoryQualityGuardFixture",
  "createMemoryQualityGuardReport",
  "createReadyMemoryQualityGuardReport",
  "createBlockedMemoryQualityGuardReport",
  "formatMemoryQualityGuardReport",
  "evidenceAdequacyMatrix",
  "conflictClusters",
  "staleInsightFindings",
  "biasDriftFindings",
  "quarantineRecommendations",
  "qualityImprovementPlan",
  "reviewerQualityBriefing",
  "qualityExportPacket",
  "qualitySummary",
  "memoryQualityGuardReady",
  "evidenceAdequacyMatrixReady",
  "conflictDetectionReady",
  "staleInsightDetectorReady",
  "biasDriftGuardReady",
  "quarantineRecommendationsReady",
  "qualityImprovementPlanReady",
  "reviewerQualityBriefingReady",
  "qualityExportPacketReady",
  "providerAiReady: false",
  "persistenceReady: false",
  "memoryPersistenceReady: false",
  "automaticTaskCreationReady: false",
  "automaticInterventionCreationReady: false",
  "automaticExecutionReady: false",
  "providerCalled: false",
  "persistencePerformed: false",
  "memoryPersistencePerformed: false",
  "memoryPromotionPerformed: false",
  "memoryQualityWritePerformed: false",
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
  "memoryPromotionAllowed: false",
  "memoryQualityWriteAllowed: false",
  "publicShareAllowed: false",
  "productPrescriptionAllowed: false",
  "dosageAdviceAllowed: false",
  "manualDispatchOnly: true",
  "humanReviewRequired: true",
  "localAnalysisOnly: true",
  "localQualityOnly: true",
  "localMemoryOnly: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Memory quality guard engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops memory quality guard ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-memory-quality-guard-dry-run",
  "createMemoryQualityGuardReport",
  "createReadyMemoryQualityGuardReport",
  "createBlockedMemoryQualityGuardReport",
  "formatMemoryQualityGuardReport",
  "providerCalled: false",
  "persistencePerformed: false",
  "memoryPersistencePerformed: false",
  "memoryPromotionPerformed: false",
  "memoryQualityWritePerformed: false",
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
  "memoryPromotionAllowed: false",
  "memoryQualityWriteAllowed: false",
  "publicShareAllowed: false",
  "productPrescriptionAllowed: false",
  "dosageAdviceAllowed: false",
  "manualDispatchOnly: true",
  "humanReviewRequired: true",
  "localAnalysisOnly: true",
  "localQualityOnly: true",
  "localMemoryOnly: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint memory quality guard incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI memory quality guard ---");

for (const required of [
  '"use client"',
  "AI Agronomic Memory Quality Guard & Drift Control",
  "Quality guard della memoria agronomica",
  "Simula memory quality",
  "Reset quality",
  "memoryQualityGuardReady",
  "qualityStatus",
  "memoryQualityScore",
  "candidateCount",
  "strongCandidateCount",
  "weakCandidateCount",
  "quarantineRecommendationCount",
  "highestRiskCandidateId",
  "qualityFingerprint",
  "Evidence adequacy matrix",
  "Conflict clusters",
  "Stale insight detector",
  "Bias / drift findings",
  "Quarantine recommendations",
  "Quality improvement plan",
  "Reviewer quality briefing",
  "Quality export packet",
  "Copia memory quality",
  "Esporta quality JSON",
  "navigator.clipboard.writeText",
  "data-ai-memory-quality-guard",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI memory quality guard incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import MemoryQualityGuardPanel from "./MemoryQualityGuardPanel";',
  "<MemoryQualityGuardPanel />",
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
  "AI Agronomic Memory Quality Guard & Drift Control",
  "Memory Quality Guard premium",
  "/api/ops/ai-memory-quality-guard-dry-run",
  "memoryQualityGuardReady=true",
  "biasDriftGuardReady=true",
  "memoryQualityWriteAllowed=false",
  "data-ai-memory-quality-guard-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin memory quality guard incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiMemoryQualityGuard from "./OperationsAiMemoryQualityGuard";',
  "<OperationsAiMemoryQualityGuard />",
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
  "AI Agronomic Memory Quality Guard & Drift Control V9.9",
  "/api/ops/ai-memory-quality-guard-dry-run",
  "MemoryQualityGuardInput",
  "MemoryQualityGuardReport",
  "evidenceAdequacyMatrix",
  "conflictClusters",
  "staleInsightFindings",
  "biasDriftFindings",
  "quarantineRecommendations",
  "qualityImprovementPlan",
  "reviewerQualityBriefing",
  "qualityExportPacket",
  "qualitySummary",
  "memoryQualityGuardReady=true",
  "evidenceAdequacyMatrixReady=true",
  "conflictDetectionReady=true",
  "staleInsightDetectorReady=true",
  "biasDriftGuardReady=true",
  "quarantineRecommendationsReady=true",
  "qualityImprovementPlanReady=true",
  "reviewerQualityBriefingReady=true",
  "qualityExportPacketReady=true",
  "providerAiReady=false",
  "persistenceReady=false",
  "memoryPersistenceReady=false",
  "automaticTaskCreationReady=false",
  "automaticInterventionCreationReady=false",
  "automaticExecutionReady=false",
  "providerCalled=false",
  "persistencePerformed=false",
  "memoryPersistencePerformed=false",
  "memoryPromotionPerformed=false",
  "memoryQualityWritePerformed=false",
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
  "memoryPromotionAllowed=false",
  "memoryQualityWriteAllowed=false",
  "publicShareAllowed=false",
  "productPrescriptionAllowed=false",
  "dosageAdviceAllowed=false",
  "manualDispatchOnly=true",
  "humanReviewRequired=true",
  "localAnalysisOnly=true",
  "localQualityOnly=true",
  "localMemoryOnly=true",
  "nessuna chiamata provider AI live",
  "nessuna memoria persistente DB",
  "nessuna persistenza DB",
  "nessuna scrittura qualità memoria",
  "nessuna promozione memoria automatica",
  "nessuna creazione automatica",
  "nessuna esecuzione automatica",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "npm run ops:ai-memory-quality-guard-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README memory quality guard incompleto: ${required}`);
  }
}

for (const required of [
  "AI memory quality guard",
  "npm run ops:ai-memory-quality-guard-check",
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
  "ops:ai-memory-quality-guard-check",
  "ops:ai-memory-promotion-check",
  "ops:ai-case-outcome-learning-check",
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
  console.log("--- Live memory quality guard protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-memory-quality-guard-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint memory quality guard non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-memory-quality-guard-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status memory quality blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.report?.memoryQualityGuardReady !== false ||
      blocked.data?.report?.safety?.providerCalled !== false ||
      blocked.data?.report?.safety?.persistencePerformed !== false ||
      blocked.data?.report?.safety?.memoryPersistencePerformed !== false ||
      blocked.data?.report?.safety?.memoryPromotionPerformed !== false ||
      blocked.data?.report?.safety?.memoryQualityWritePerformed !== false ||
      blocked.data?.report?.safety?.taskCreated !== false ||
      blocked.data?.report?.safety?.interventionCreated !== false ||
      blocked.data?.report?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Memory quality blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ memory quality blocked resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-memory-quality-guard-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status memory quality ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.report?.memoryQualityGuardReady !== true ||
      ready.data?.report?.premiumSignals?.memoryQualityGuardReady !== true ||
      ready.data?.report?.premiumSignals?.providerAiReady !== false ||
      ready.data?.report?.premiumSignals?.persistenceReady !== false ||
      ready.data?.report?.premiumSignals?.memoryPersistenceReady !== false ||
      ready.data?.report?.safety?.providerCalled !== false ||
      ready.data?.report?.safety?.persistencePerformed !== false ||
      ready.data?.report?.safety?.memoryPersistencePerformed !== false ||
      ready.data?.report?.safety?.memoryPromotionPerformed !== false ||
      ready.data?.report?.safety?.memoryQualityWritePerformed !== false ||
      ready.data?.report?.safety?.taskCreated !== false ||
      ready.data?.report?.safety?.interventionCreated !== false ||
      ready.data?.report?.safety?.automaticExecutionPerformed !== false ||
      ready.data?.report?.safety?.publicSharePerformed !== false ||
      ready.data?.report?.safety?.localQualityOnly !== true ||
      ready.data?.report?.safety?.localMemoryOnly !== true ||
      ready.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`Memory quality ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ memory quality ready genera quality guard locale senza provider, DB, memoria persistente, quality write, task, interventi, share pubblico o esecuzione");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-memory-quality-guard-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            farmId: "live-memory-quality",
            farmName: "Azienda live",
            qualityWindowLabel: "quality live",
            operatorName: "Responsabile live",
            currentMemoryVersion: "memory-live-v1-draft",
            targetQualityVersion: "memory-live-quality-v1",
            includeEvidenceAdequacyMatrix: true,
            includeConflictClusters: true,
            includeStaleInsightDetector: true,
            includeBiasDriftFindings: true,
            includeQuarantineRecommendations: true,
            includeQualityImprovementPlan: true,
            includeReviewerQualityBriefing: true,
            includeQualityExportPacket: true,
            humanReviewRequired: true,
            candidates: [
              {
                candidateId: "live-quality-candidate",
                sourceCaseId: "live-learning-case",
                sourceLearningId: "live-learning-core",
                sourceMemoryVersion: "memory-live-v1-draft",
                crop: "olivo",
                fieldName: "Live Nord",
                tags: ["olivo", "controllo sano"],
                insightLines: ["controllo sano utile prima di riuso insight"],
                evidenceLinks: ["live-obs-t1", "live-retrieval-core"],
                outcomeLabels: ["improved"],
                reviewerNotes: ["validare manualmente"],
                confidenceScore: 0.82,
                alignmentScore: 88,
                reviewerCoverageScore: 84,
                ageDays: 12,
                reuseCount: 1,
                conflictTags: [],
                driftSignals: [],
                humanReviewed: true,
                blocked: false,
                blockedReasons: [],
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST memory quality: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.report?.memoryQualityGuardReady !== true ||
      post.data?.report?.premiumSignals?.memoryQualityGuardReady !== true ||
      post.data?.report?.safety?.providerCalled !== false ||
      post.data?.report?.safety?.persistencePerformed !== false ||
      post.data?.report?.safety?.memoryPersistencePerformed !== false ||
      post.data?.report?.safety?.memoryPromotionPerformed !== false ||
      post.data?.report?.safety?.memoryQualityWritePerformed !== false ||
      post.data?.report?.safety?.taskCreated !== false ||
      post.data?.report?.safety?.interventionCreated !== false ||
      post.data?.report?.safety?.automaticExecutionPerformed !== false ||
      post.data?.report?.safety?.publicSharePerformed !== false ||
      post.data?.report?.safety?.productPrescriptionPerformed !== false ||
      post.data?.report?.safety?.dosageAdvicePerformed !== false ||
      post.data?.report?.safety?.localQualityOnly !== true ||
      post.data?.report?.safety?.localMemoryOnly !== true ||
      post.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`POST memory quality non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST memory quality protetto genera quality guard dry-run senza provider, DB, memoria persistente, quality write, task, interventi, share pubblico, prodotto, dosaggio o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI memory quality guard check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI memory quality guard check completato con successo.");
