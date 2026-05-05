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
  route: "agri_app/src/app/api/ops/ai-diagnosis-pipeline-dry-run/route.ts",
  pipeline: "agri_app/src/lib/ai/photoDiagnosisPipelineDryRun.ts",
  panel: "agri_app/src/app/admin/operations/OperationsAiPipelineDryRun.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_DIAGNOSIS_PIPELINE_DRY_RUN_V6_5.md",
  check: "agri_app/scripts/ops-ai-pipeline-dry-run-check.mjs",
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

console.log("Agri App AI diagnosis pipeline dry-run check V6.5");
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
const pipelineText = readRepoFile(files.pipeline);
const panelText = readRepoFile(files.panel);
const operationsPageText = readRepoFile(files.operationsPage);
const readmeText = readRepoFile(files.readme);
const runbookText = readRepoFile("agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));

console.log("");
console.log("--- Pipeline dry-run engine ---");

for (const required of [
  "AiDiagnosisPipelineInput",
  "AiDiagnosisPipelineDryRun",
  "createAiDiagnosisPipelineDryRun",
  "createDryRunProviderRequest",
  "validateProviderDiagnosisResponse",
  "diagnosisDraft",
  "actionPlan",
  "reviewPacket",
  "externalProviderCalled: false",
  "providerCallsEnabled: false",
  "persistenceAllowed: false",
  "automaticTaskCreationAllowed: false",
  "automaticInterventionCreationAllowed: false",
  "humanReviewRequired: true",
]) {
  const ok = pipelineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pipeline dry-run incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops pipeline dry-run ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-diagnosis-pipeline-dry-run",
  "createAiDiagnosisPipelineDryRun",
  "providerCallsEnabled: false",
  "externalProviderCalled: false",
  "persistenceAllowed: false",
  "automaticTaskCreationAllowed: false",
  "automaticInterventionCreationAllowed: false",
  "humanReviewRequired: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint pipeline dry-run incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Pannello admin operations ---");

for (const required of [
  "AI Diagnosis Pipeline Dry-Run",
  "Pipeline AI end-to-end simulata",
  "/api/ops/ai-diagnosis-pipeline-dry-run",
  "externalProviderCalled=false",
  "humanReviewRequired=true",
  "persistenceAllowed=false",
  "automaticTaskCreationAllowed=false",
  "automaticInterventionCreationAllowed=false",
  "data-ai-diagnosis-pipeline-dry-run",
]) {
  const ok = panelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello pipeline dry-run incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione Operations Center ---");

for (const required of [
  'import OperationsAiPipelineDryRun from "./OperationsAiPipelineDryRun";',
  "<OperationsAiPipelineDryRun />",
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
  ["pipeline", pipelineText],
  ["panel", panelText],
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
  "AI Diagnosis Pipeline Dry-Run V6.5",
  "/api/ops/ai-diagnosis-pipeline-dry-run",
  "externalProviderCalled=false",
  "providerCallsEnabled=false",
  "automaticTaskCreationAllowed=false",
  "automaticInterventionCreationAllowed=false",
  "humanReviewRequired=true",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "npm run ops:ai-pipeline-dry-run-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README pipeline dry-run incompleto: ${required}`);
  }
}

for (const required of [
  "AI diagnosis pipeline dry-run",
  "npm run ops:ai-pipeline-dry-run-check",
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
  "ops:ai-pipeline-dry-run-check",
  "ops:ai-provider-response-check",
  "ops:ai-provider-dry-run-check",
  "ops:ai-provider-status-check",
  "ops:ai-provider-safety-check",
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
  console.log("--- Live pipeline dry-run protetta ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJson(`${baseUrl}/api/ops/ai-diagnosis-pipeline-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint pipeline dry-run non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const liveGet = await fetchJson(
      `${baseUrl}/api/ops/ai-diagnosis-pipeline-dry-run?secret=${encodeURIComponent(secret)}`,
    );

    console.log(`HTTP status GET pipeline: ${liveGet.status}`);

    if (liveGet.status !== 200 || !liveGet.data?.ok || !liveGet.data?.pipeline?.ok) {
      failures.push(`GET pipeline non OK: HTTP ${liveGet.status}`);
    } else {
      const pipeline = liveGet.data.pipeline;
      for (const [label, ok] of [
        ["pipeline.externalProviderCalled=false", pipeline.externalProviderCalled === false],
        ["pipeline.providerCallsEnabled=false", pipeline.providerCallsEnabled === false],
        ["pipeline.persistenceAllowed=false", pipeline.persistenceAllowed === false],
        ["pipeline.automaticTaskCreationAllowed=false", pipeline.automaticTaskCreationAllowed === false],
        ["pipeline.automaticInterventionCreationAllowed=false", pipeline.automaticInterventionCreationAllowed === false],
        ["pipeline.humanReviewRequired=true", pipeline.humanReviewRequired === true],
        ["pipeline.providerValidation.ok=true", pipeline.providerValidation?.ok === true],
      ]) {
        console.log(`${ok ? "✓" : "✗"} ${label}`);

        if (!ok) {
          failures.push(`GET pipeline inattesa: ${label}`);
        }
      }
    }

    const livePost = await fetchJson(
      `${baseUrl}/api/ops/ai-diagnosis-pipeline-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            imageFileName: "pipeline-dry-run-leaf.webp",
            imageMimeType: "image/webp",
            plantContext: "vite in filare",
            locationHint: "serra nord",
            observedSymptoms: ["macchie fogliari", "ingiallimento"],
            severity: "medium",
            operatorNotes: "test live protetto pipeline dry-run",
            requestedBy: "ops-check",
            reviewMode: "human-review-required",
          },
        }),
      },
    );

    console.log(`HTTP status POST pipeline: ${livePost.status}`);

    if (livePost.status !== 200 || !livePost.data?.ok || !livePost.data?.pipeline?.ok) {
      failures.push(`POST pipeline non OK: HTTP ${livePost.status}`);
    } else {
      const pipeline = livePost.data.pipeline;
      for (const [label, ok] of [
        ["POST diagnosisDraft presente", Boolean(pipeline.diagnosisDraft?.summary)],
        ["POST actionPlan presente", Array.isArray(pipeline.actionPlan?.proposedTasks)],
        ["POST reviewPacket.reviewRequired=true", pipeline.reviewPacket?.reviewRequired === true],
        ["POST steps >= 6", Array.isArray(pipeline.steps) && pipeline.steps.length >= 6],
      ]) {
        console.log(`${ok ? "✓" : "✗"} ${label}`);

        if (!ok) {
          failures.push(`POST pipeline inattesa: ${label}`);
        }
      }
    }
  }
}

console.log("");
console.log("--- AI diagnosis pipeline dry-run check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI diagnosis pipeline dry-run check completato con successo.");
