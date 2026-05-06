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
  route: "agri_app/src/app/api/ops/ai-field-intelligence-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiFieldIntelligence.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/FieldIntelligencePanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiFieldIntelligence.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_FIELD_INTELLIGENCE_V8_3.md",
  check: "agri_app/scripts/ops-ai-field-intelligence-check.mjs",
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

console.log("Agri App AI field intelligence check V8.3");
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
console.log("--- Field intelligence engine ---");

for (const required of [
  "FieldIntelligenceCaseInput",
  "FieldIntelligenceEvidence",
  "FieldIntelligenceSeverityMap",
  "FieldIntelligenceDifferentialFocus",
  "FieldIntelligenceNextPhoto",
  "FieldIntelligenceReport",
  "defaultFieldIntelligenceInput",
  "createFieldIntelligenceFixture",
  "createAiFieldIntelligenceReport",
  "createReadyAiFieldIntelligenceReport",
  "createBlockedAiFieldIntelligenceReport",
  "formatAiFieldIntelligenceReport",
  "evidenceMatrix",
  "severityMap",
  "crossPhotoPatterns",
  "riskForecast",
  "differentialFocus",
  "nextPhotoProtocol",
  "humanReviewChecklist",
  "premiumSignals",
  "multiPhotoCorrelation",
  "temporalComparisonReady",
  "fieldScoutingProtocolReady",
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
    failures.push(`Field intelligence engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops field intelligence ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-field-intelligence-dry-run",
  "createAiFieldIntelligenceReport",
  "createReadyAiFieldIntelligenceReport",
  "createBlockedAiFieldIntelligenceReport",
  "formatAiFieldIntelligenceReport",
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
    failures.push(`Endpoint field intelligence incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI field intelligence ---");

for (const required of [
  '"use client"',
  "AI Multi-Photo Field Intelligence",
  "Intelligence multi-foto del caso",
  "Simula caso multi-foto",
  "Reset caso",
  "reportReady",
  "photoCount",
  "evidenceCount",
  "dominantSeverity",
  "riskTier",
  "confidenceScore",
  "providerAiReady",
  "reportFingerprint",
  "Evidence matrix",
  "Severity map",
  "Differential focus",
  "Next photo protocol",
  "Human review checklist",
  "Copia field intelligence",
  "Esporta JSON",
  "navigator.clipboard.writeText",
  "data-ai-field-intelligence",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI field intelligence incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import FieldIntelligencePanel from "./FieldIntelligencePanel";',
  "<FieldIntelligencePanel />",
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
  "AI Multi-Photo Field Intelligence",
  "Field intelligence multi-foto",
  "/api/ops/ai-field-intelligence-dry-run",
  "multiPhotoCorrelation=true",
  "providerAiReady=false",
  "humanReviewRequired=true",
  "data-ai-field-intelligence-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin field intelligence incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiFieldIntelligence from "./OperationsAiFieldIntelligence";',
  "<OperationsAiFieldIntelligence />",
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
  "AI Multi-Photo Field Intelligence V8.3",
  "/api/ops/ai-field-intelligence-dry-run",
  "FieldIntelligenceCaseInput",
  "FieldIntelligenceReport",
  "evidenceMatrix",
  "severityMap",
  "riskForecast",
  "differentialFocus",
  "nextPhotoProtocol",
  "humanReviewChecklist",
  "multiPhotoCorrelation=true",
  "temporalComparisonReady=true",
  "fieldScoutingProtocolReady=true",
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
  "npm run ops:ai-field-intelligence-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README field intelligence incompleto: ${required}`);
  }
}

for (const required of [
  "AI field intelligence",
  "npm run ops:ai-field-intelligence-check",
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
  console.log("--- Live field intelligence protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-field-intelligence-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint field intelligence non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-field-intelligence-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status field intelligence blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.report?.reportReady !== false ||
      blocked.data?.report?.safety?.persistencePerformed !== false ||
      blocked.data?.report?.safety?.taskCreated !== false ||
      blocked.data?.report?.safety?.interventionCreated !== false ||
      blocked.data?.report?.safety?.automaticExecutionPerformed !== false ||
      blocked.data?.report?.safety?.publicShareAllowed !== false
    ) {
      failures.push(`Field intelligence blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ field intelligence blocked resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-field-intelligence-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status field intelligence ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.report?.reportReady !== true ||
      ready.data?.report?.premiumSignals?.multiPhotoCorrelation !== true ||
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
      failures.push(`Field intelligence ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ field intelligence ready genera report multi-foto senza provider, DB, task, interventi, share pubblico o esecuzione");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-field-intelligence-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            caseId: "live-field-intelligence-case",
            operatorName: "Operatore live",
            crop: "olivo",
            locationHint: "settore test",
            observedAtLabel: "live-protected-dry-run",
            agronomicContext: "Caso multi-foto live protetto senza provider AI.",
            includeEvidenceMatrix: true,
            includeSeverityMap: true,
            includeRiskForecast: true,
            includeDifferentialFocus: true,
            includeNextPhotoProtocol: true,
            includeHumanReviewChecklist: true,
            humanReviewRequired: true,
            photos: [
              {
                photoId: "live-photo-close-up",
                photoRole: "symptom-close-up",
                fileName: "live-close-up.webp",
                plantContext: "foglia sintomatica",
                locationHint: "settore test",
                crop: "olivo",
                observedAtLabel: "live",
                regions: [
                  {
                    id: "r1",
                    label: "Macchie fogliari",
                    tissue: "leaf-upper",
                    severity: "medium",
                    distribution: "localized",
                    normalizedBox: {
                      x: 20,
                      y: 20,
                      width: 30,
                      height: 30,
                    },
                    visibleSigns: ["macchie", "ingiallimento"],
                    operatorNote: "Sintomo da verificare.",
                  },
                ],
              },
              {
                photoId: "live-photo-context",
                photoRole: "whole-plant",
                fileName: "live-context.webp",
                plantContext: "pianta intera",
                locationHint: "settore test",
                crop: "olivo",
                observedAtLabel: "live",
                regions: [
                  {
                    id: "r2",
                    label: "Ingiallimento diffuso",
                    tissue: "leaf-upper",
                    severity: "medium",
                    distribution: "scattered",
                    normalizedBox: {
                      x: 15,
                      y: 25,
                      width: 40,
                      height: 32,
                    },
                    visibleSigns: ["ingiallimento", "macchie"],
                    operatorNote: "Sintomi su area più ampia.",
                  },
                ],
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST field intelligence: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.report?.reportReady !== true ||
      post.data?.report?.premiumSignals?.multiPhotoCorrelation !== true ||
      post.data?.report?.safety?.persistencePerformed !== false ||
      post.data?.report?.safety?.taskCreated !== false ||
      post.data?.report?.safety?.interventionCreated !== false ||
      post.data?.report?.safety?.automaticExecutionPerformed !== false ||
      post.data?.report?.safety?.publicSharePerformed !== false ||
      post.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`POST field intelligence non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST field intelligence protetto genera analisi multi-foto dry-run senza provider, DB, task, interventi, share pubblico o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI field intelligence check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI field intelligence check completato con successo.");
