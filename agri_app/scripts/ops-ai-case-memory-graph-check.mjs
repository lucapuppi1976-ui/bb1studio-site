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
  route: "agri_app/src/app/api/ops/ai-case-memory-graph-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiCaseMemoryGraph.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/CaseMemoryGraphPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiCaseMemoryGraph.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_CASE_MEMORY_GRAPH_V9_5.md",
  check: "agri_app/scripts/ops-ai-case-memory-graph-check.mjs",
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

console.log("Agri App AI case memory graph check V9.5");
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
console.log("--- Case memory graph engine ---");

for (const required of [
  "CaseMemoryCaseInput",
  "CaseMemoryGraphInput",
  "CaseMemoryGraphNode",
  "CaseMemoryGraphEdge",
  "SimilarCaseCluster",
  "PatternRecurrenceSignal",
  "KnowledgeGapItem",
  "MemoryRecommendationItem",
  "CaseLineageItem",
  "CaseMemoryExportPacket",
  "CaseMemoryGraphReport",
  "defaultCaseMemoryGraphInput",
  "createCaseMemoryGraphFixture",
  "createCaseMemoryGraphReport",
  "createReadyCaseMemoryGraphReport",
  "createBlockedCaseMemoryGraphReport",
  "formatCaseMemoryGraphReport",
  "graphNodes",
  "graphEdges",
  "similarityClusters",
  "recurrenceSignals",
  "knowledgeGaps",
  "memoryRecommendations",
  "caseLineage",
  "memoryExportPacket",
  "memorySummary",
  "caseMemoryReady",
  "graphNodesReady",
  "graphEdgesReady",
  "similarityClustersReady",
  "recurrenceSignalsReady",
  "knowledgeGapDetectorReady",
  "memoryRecommendationsReady",
  "caseLineageReady",
  "memoryExportPacketReady",
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
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Case memory graph engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops case memory graph ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-case-memory-graph-dry-run",
  "createCaseMemoryGraphReport",
  "createReadyCaseMemoryGraphReport",
  "createBlockedCaseMemoryGraphReport",
  "formatCaseMemoryGraphReport",
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
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint case memory graph incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI case memory graph ---");

for (const required of [
  '"use client"',
  "AI Agronomic Case Memory & Pattern Graph",
  "Memoria agronomica locale e grafo pattern",
  "Simula case memory graph",
  "Reset memoria",
  "caseMemoryReady",
  "memoryStatus",
  "caseCount",
  "graphNodeCount",
  "graphEdgeCount",
  "clusterCount",
  "patternRecurrenceCount",
  "knowledgeGapCount",
  "topClusterId",
  "memoryFingerprint",
  "Graph nodes",
  "Graph edges",
  "Similarity clusters",
  "Recurrence signals",
  "Knowledge gaps",
  "Memory recommendations",
  "Case lineage",
  "Memory export packet",
  "Copia case memory graph",
  "Esporta memory JSON",
  "navigator.clipboard.writeText",
  "data-ai-case-memory-graph",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI case memory graph incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import CaseMemoryGraphPanel from "./CaseMemoryGraphPanel";',
  "<CaseMemoryGraphPanel />",
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
  "AI Agronomic Case Memory & Pattern Graph",
  "Case Memory Graph premium",
  "/api/ops/ai-case-memory-graph-dry-run",
  "caseMemoryReady=true",
  "graphNodesReady=true",
  "persistenceReady=false",
  "data-ai-case-memory-graph-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin case memory graph incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiCaseMemoryGraph from "./OperationsAiCaseMemoryGraph";',
  "<OperationsAiCaseMemoryGraph />",
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
  "AI Agronomic Case Memory & Pattern Graph V9.5",
  "/api/ops/ai-case-memory-graph-dry-run",
  "CaseMemoryGraphInput",
  "CaseMemoryGraphReport",
  "graphNodes",
  "graphEdges",
  "similarityClusters",
  "recurrenceSignals",
  "knowledgeGaps",
  "memoryRecommendations",
  "caseLineage",
  "memoryExportPacket",
  "memorySummary",
  "caseMemoryReady=true",
  "graphNodesReady=true",
  "graphEdgesReady=true",
  "similarityClustersReady=true",
  "recurrenceSignalsReady=true",
  "knowledgeGapDetectorReady=true",
  "memoryRecommendationsReady=true",
  "caseLineageReady=true",
  "memoryExportPacketReady=true",
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
  "nessuna chiamata provider AI live",
  "nessuna memoria persistente DB",
  "nessuna persistenza DB",
  "nessuna creazione automatica",
  "nessuna esecuzione automatica",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "npm run ops:ai-case-memory-graph-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README case memory graph incompleto: ${required}`);
  }
}

for (const required of [
  "AI case memory graph",
  "npm run ops:ai-case-memory-graph-check",
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
  "ops:ai-case-memory-graph-check",
  "ops:ai-response-portfolio-check",
  "ops:ai-intervention-impact-check",
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
  console.log("--- Live case memory graph protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-case-memory-graph-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint case memory graph non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-memory-graph-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status case memory blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.report?.caseMemoryReady !== false ||
      blocked.data?.report?.safety?.providerCalled !== false ||
      blocked.data?.report?.safety?.persistencePerformed !== false ||
      blocked.data?.report?.safety?.taskCreated !== false ||
      blocked.data?.report?.safety?.interventionCreated !== false ||
      blocked.data?.report?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Case memory blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ case memory blocked resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-memory-graph-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status case memory ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.report?.caseMemoryReady !== true ||
      ready.data?.report?.premiumSignals?.caseMemoryReady !== true ||
      ready.data?.report?.premiumSignals?.providerAiReady !== false ||
      ready.data?.report?.premiumSignals?.persistenceReady !== false ||
      ready.data?.report?.safety?.providerCalled !== false ||
      ready.data?.report?.safety?.persistencePerformed !== false ||
      ready.data?.report?.safety?.taskCreated !== false ||
      ready.data?.report?.safety?.interventionCreated !== false ||
      ready.data?.report?.safety?.automaticExecutionPerformed !== false ||
      ready.data?.report?.safety?.publicSharePerformed !== false ||
      ready.data?.report?.safety?.localMemoryOnly !== true ||
      ready.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`Case memory ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ case memory ready genera grafo locale senza provider, DB, task, interventi, share pubblico o esecuzione");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-case-memory-graph-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            farmId: "live-case-memory",
            farmName: "Azienda live",
            memoryWindowLabel: "ultimi 30 giorni",
            operatorName: "Responsabile live",
            includeGraphNodes: true,
            includeGraphEdges: true,
            includeSimilarityClusters: true,
            includeRecurrenceSignals: true,
            includeKnowledgeGaps: true,
            includeMemoryRecommendations: true,
            includeCaseLineage: true,
            includeMemoryExportPacket: true,
            humanReviewRequired: true,
            cases: [
              {
                caseId: "live-memory-core",
                fieldId: "live-field-north",
                fieldName: "Live Nord",
                crop: "olivo",
                locationHint: "settore live",
                riskTier: "critical",
                confidenceScore: 0.82,
                commandScore: 93,
                roiProxyScore: 71,
                evidenceCount: 11,
                photoCount: 8,
                observedAtLabel: "T-1",
                symptomTags: ["macchie fogliari", "diffusione bordo"],
                evidenceLabels: ["close-up foglia", "contesto pianta"],
                decisionLabels: ["review urgente"],
                linkedFingerprints: ["live-command", "live-risk", "live-impact"],
                openLimitations: ["review finale"],
                reviewerNote: "Caso live core.",
                blocked: true,
                humanReviewed: false,
              },
              {
                caseId: "live-memory-border",
                fieldId: "live-field-north",
                fieldName: "Live Nord",
                crop: "olivo",
                locationHint: "bordo live",
                riskTier: "high",
                confidenceScore: 0.76,
                commandScore: 84,
                roiProxyScore: 79,
                evidenceCount: 7,
                photoCount: 5,
                observedAtLabel: "T-3",
                symptomTags: ["macchie fogliari"],
                evidenceLabels: ["close-up foglia", "vista bordo"],
                decisionLabels: ["manual-ready"],
                linkedFingerprints: ["live-command-border", "live-risk-border"],
                openLimitations: [],
                reviewerNote: "Caso live border.",
                blocked: false,
                humanReviewed: true,
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST case memory: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.report?.caseMemoryReady !== true ||
      post.data?.report?.premiumSignals?.caseMemoryReady !== true ||
      post.data?.report?.safety?.providerCalled !== false ||
      post.data?.report?.safety?.persistencePerformed !== false ||
      post.data?.report?.safety?.taskCreated !== false ||
      post.data?.report?.safety?.interventionCreated !== false ||
      post.data?.report?.safety?.automaticExecutionPerformed !== false ||
      post.data?.report?.safety?.publicSharePerformed !== false ||
      post.data?.report?.safety?.productPrescriptionPerformed !== false ||
      post.data?.report?.safety?.dosageAdvicePerformed !== false ||
      post.data?.report?.safety?.localMemoryOnly !== true ||
      post.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`POST case memory non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST case memory protetto genera grafo dry-run senza provider, DB, task, interventi, share pubblico, prodotto, dosaggio o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI case memory graph check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI case memory graph check completato con successo.");
