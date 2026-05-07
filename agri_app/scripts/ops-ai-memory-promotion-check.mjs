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
  route: "agri_app/src/app/api/ops/ai-memory-promotion-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiMemoryPromotionGovernance.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/MemoryPromotionGovernancePanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiMemoryPromotionGovernance.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_MEMORY_PROMOTION_GOVERNANCE_V9_8.md",
  check: "agri_app/scripts/ops-ai-memory-promotion-check.mjs",
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

console.log("Agri App AI memory promotion governance check V9.8");
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
console.log("--- Memory promotion governance engine ---");

for (const required of [
  "MemoryPromotionCandidateInput",
  "MemoryPromotionInput",
  "MemoryPromotionQueueItem",
  "MemoryPatchDraft",
  "GovernanceDecisionBoardItem",
  "VersionedMemorySnapshotDraft",
  "RollbackPlanItem",
  "PromotionAuditTrailItem",
  "MemoryPromotionExportPacket",
  "MemoryPromotionGovernanceReport",
  "defaultMemoryPromotionInput",
  "createMemoryPromotionFixture",
  "createMemoryPromotionGovernanceReport",
  "createReadyMemoryPromotionGovernanceReport",
  "createBlockedMemoryPromotionGovernanceReport",
  "formatMemoryPromotionGovernanceReport",
  "promotionQueue",
  "memoryPatchDrafts",
  "governanceDecisionBoard",
  "versionedMemorySnapshotDraft",
  "rollbackPlan",
  "promotionAuditTrail",
  "promotionExportPacket",
  "governanceSummary",
  "memoryPromotionGovernanceReady",
  "promotionQueueReady",
  "memoryPatchDraftsReady",
  "governanceDecisionBoardReady",
  "versionedMemorySnapshotDraftReady",
  "rollbackPlanReady",
  "promotionAuditTrailReady",
  "promotionExportPacketReady",
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
  "publicShareAllowed: false",
  "productPrescriptionAllowed: false",
  "dosageAdviceAllowed: false",
  "manualDispatchOnly: true",
  "humanReviewRequired: true",
  "localAnalysisOnly: true",
  "localPromotionOnly: true",
  "localMemoryOnly: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Memory promotion governance engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops memory promotion ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-memory-promotion-dry-run",
  "createMemoryPromotionGovernanceReport",
  "createReadyMemoryPromotionGovernanceReport",
  "createBlockedMemoryPromotionGovernanceReport",
  "formatMemoryPromotionGovernanceReport",
  "providerCalled: false",
  "persistencePerformed: false",
  "memoryPersistencePerformed: false",
  "memoryPromotionPerformed: false",
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
  "publicShareAllowed: false",
  "productPrescriptionAllowed: false",
  "dosageAdviceAllowed: false",
  "manualDispatchOnly: true",
  "humanReviewRequired: true",
  "localAnalysisOnly: true",
  "localPromotionOnly: true",
  "localMemoryOnly: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint memory promotion incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI memory promotion ---");

for (const required of [
  '"use client"',
  "AI Memory Promotion Governance & Versioned Knowledge Draft",
  "Governance promozione memoria agronomica",
  "Simula memory promotion",
  "Reset promotion",
  "memoryPromotionGovernanceReady",
  "governanceStatus",
  "candidateCount",
  "eligibleCandidateCount",
  "blockedCandidateCount",
  "promotablePatchCount",
  "promotionReadinessScore",
  "targetDraftVersion",
  "governanceFingerprint",
  "Promotion queue",
  "Memory patch drafts",
  "Governance decision board",
  "Versioned memory snapshot draft",
  "Rollback plan",
  "Promotion audit trail",
  "Promotion export packet",
  "Copia memory promotion",
  "Esporta promotion JSON",
  "navigator.clipboard.writeText",
  "data-ai-memory-promotion-governance",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI memory promotion incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import MemoryPromotionGovernancePanel from "./MemoryPromotionGovernancePanel";',
  "<MemoryPromotionGovernancePanel />",
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
  "AI Memory Promotion Governance & Versioned Knowledge Draft",
  "Memory Promotion Governance premium",
  "/api/ops/ai-memory-promotion-dry-run",
  "memoryPromotionGovernanceReady=true",
  "versionedMemorySnapshotDraftReady=true",
  "memoryPersistenceReady=false",
  "data-ai-memory-promotion-governance-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin memory promotion incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiMemoryPromotionGovernance from "./OperationsAiMemoryPromotionGovernance";',
  "<OperationsAiMemoryPromotionGovernance />",
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
  "AI Memory Promotion Governance & Versioned Knowledge Draft V9.8",
  "/api/ops/ai-memory-promotion-dry-run",
  "MemoryPromotionInput",
  "MemoryPromotionGovernanceReport",
  "promotionQueue",
  "memoryPatchDrafts",
  "governanceDecisionBoard",
  "versionedMemorySnapshotDraft",
  "rollbackPlan",
  "promotionAuditTrail",
  "promotionExportPacket",
  "governanceSummary",
  "memoryPromotionGovernanceReady=true",
  "promotionQueueReady=true",
  "memoryPatchDraftsReady=true",
  "governanceDecisionBoardReady=true",
  "versionedMemorySnapshotDraftReady=true",
  "rollbackPlanReady=true",
  "promotionAuditTrailReady=true",
  "promotionExportPacketReady=true",
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
  "publicShareAllowed=false",
  "productPrescriptionAllowed=false",
  "dosageAdviceAllowed=false",
  "manualDispatchOnly=true",
  "humanReviewRequired=true",
  "localAnalysisOnly=true",
  "localPromotionOnly=true",
  "localMemoryOnly=true",
  "nessuna chiamata provider AI live",
  "nessuna memoria persistente DB",
  "nessuna persistenza DB",
  "nessuna promozione memoria automatica",
  "nessuna creazione automatica",
  "nessuna esecuzione automatica",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "npm run ops:ai-memory-promotion-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README memory promotion incompleto: ${required}`);
  }
}

for (const required of [
  "AI memory promotion governance",
  "npm run ops:ai-memory-promotion-check",
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
  "ops:ai-memory-promotion-check",
  "ops:ai-case-outcome-learning-check",
  "ops:ai-case-memory-retrieval-check",
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
  console.log("--- Live memory promotion protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-memory-promotion-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint memory promotion non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-memory-promotion-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status memory promotion blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.report?.memoryPromotionGovernanceReady !== false ||
      blocked.data?.report?.safety?.providerCalled !== false ||
      blocked.data?.report?.safety?.persistencePerformed !== false ||
      blocked.data?.report?.safety?.memoryPersistencePerformed !== false ||
      blocked.data?.report?.safety?.memoryPromotionPerformed !== false ||
      blocked.data?.report?.safety?.taskCreated !== false ||
      blocked.data?.report?.safety?.interventionCreated !== false ||
      blocked.data?.report?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Memory promotion blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ memory promotion blocked resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-memory-promotion-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status memory promotion ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.report?.memoryPromotionGovernanceReady !== true ||
      ready.data?.report?.premiumSignals?.memoryPromotionGovernanceReady !== true ||
      ready.data?.report?.premiumSignals?.providerAiReady !== false ||
      ready.data?.report?.premiumSignals?.persistenceReady !== false ||
      ready.data?.report?.premiumSignals?.memoryPersistenceReady !== false ||
      ready.data?.report?.safety?.providerCalled !== false ||
      ready.data?.report?.safety?.persistencePerformed !== false ||
      ready.data?.report?.safety?.memoryPersistencePerformed !== false ||
      ready.data?.report?.safety?.memoryPromotionPerformed !== false ||
      ready.data?.report?.safety?.taskCreated !== false ||
      ready.data?.report?.safety?.interventionCreated !== false ||
      ready.data?.report?.safety?.automaticExecutionPerformed !== false ||
      ready.data?.report?.safety?.publicSharePerformed !== false ||
      ready.data?.report?.safety?.localPromotionOnly !== true ||
      ready.data?.report?.safety?.localMemoryOnly !== true ||
      ready.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`Memory promotion ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ memory promotion ready genera governance locale senza provider, DB, memoria persistente, task, interventi, share pubblico o esecuzione");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-memory-promotion-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            farmId: "live-memory-promotion",
            farmName: "Azienda live",
            governanceWindowLabel: "learning live",
            operatorName: "Responsabile live",
            currentMemoryVersion: "memory-live-v0",
            targetDraftVersion: "memory-live-v1-draft",
            governanceMode: "strict-human-review",
            includePromotionQueue: true,
            includeMemoryPatchDrafts: true,
            includeGovernanceDecisionBoard: true,
            includeVersionedMemorySnapshotDraft: true,
            includeRollbackPlan: true,
            includePromotionAuditTrail: true,
            includePromotionExportPacket: true,
            humanReviewRequired: true,
            candidates: [
              {
                candidateId: "live-promotion-candidate",
                sourceCaseId: "live-learning-case",
                sourceLearningId: "live-learning-core",
                sourceRecommendationId: "live-rec-control",
                updateType: "add-insight",
                proposedTags: ["olivo", "controllo sano"],
                proposedInsightLines: ["controllo sano utile prima di riuso insight"],
                evidenceLinks: ["live-obs-t1", "live-retrieval-core"],
                reviewerNote: "Validare manualmente.",
                confidenceScore: 0.82,
                alignmentScore: 88,
                driftSeverity: "low",
                humanReviewed: true,
                blocked: false,
                blockedReasons: [],
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST memory promotion: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.report?.memoryPromotionGovernanceReady !== true ||
      post.data?.report?.premiumSignals?.memoryPromotionGovernanceReady !== true ||
      post.data?.report?.safety?.providerCalled !== false ||
      post.data?.report?.safety?.persistencePerformed !== false ||
      post.data?.report?.safety?.memoryPersistencePerformed !== false ||
      post.data?.report?.safety?.memoryPromotionPerformed !== false ||
      post.data?.report?.safety?.taskCreated !== false ||
      post.data?.report?.safety?.interventionCreated !== false ||
      post.data?.report?.safety?.automaticExecutionPerformed !== false ||
      post.data?.report?.safety?.publicSharePerformed !== false ||
      post.data?.report?.safety?.productPrescriptionPerformed !== false ||
      post.data?.report?.safety?.dosageAdvicePerformed !== false ||
      post.data?.report?.safety?.localPromotionOnly !== true ||
      post.data?.report?.safety?.localMemoryOnly !== true ||
      post.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`POST memory promotion non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST memory promotion protetto genera governance dry-run senza provider, DB, memoria persistente, task, interventi, share pubblico, prodotto, dosaggio o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI memory promotion governance check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI memory promotion governance check completato con successo.");
