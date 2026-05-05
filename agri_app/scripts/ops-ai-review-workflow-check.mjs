#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");

const files = {
  page: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  client: "agri_app/src/app/ai/photo-diagnosis/PhotoDiagnosisIntake.tsx",
  actionEngine: "agri_app/src/app/ai/photo-diagnosis/diagnosisActionPlan.ts",
  reviewEngine: "agri_app/src/app/ai/photo-diagnosis/diagnosisReviewPacket.ts",
  reviewWorkflow: "agri_app/src/app/ai/photo-diagnosis/DiagnosisReviewWorkflow.tsx",
  readme: "agri_app/AI_HUMAN_REVIEW_WORKFLOW_V6_0.md",
  check: "agri_app/scripts/ops-ai-review-workflow-check.mjs",
};

const failures = [];

function readRepoFile(relativePath) {
  const absolutePath = resolve(repoRoot, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

console.log("Agri App AI human review workflow check V6.0");
console.log(`Repo root: ${repoRoot}`);
console.log("");

console.log("--- File richiesti ---");

for (const file of Object.values(files)) {
  const ok = existsSync(resolve(repoRoot, file));
  console.log(`${ok ? "✓" : "✗"} ${file}`);

  if (!ok) {
    failures.push(`File mancante: ${file}`);
  }
}

const clientText = readRepoFile(files.client);
const reviewEngineText = readRepoFile(files.reviewEngine);
const reviewWorkflowText = readRepoFile(files.reviewWorkflow);
const readmeText = readRepoFile(files.readme);
const runbookText = readRepoFile("agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));

console.log("");
console.log("--- Review packet engine ---");

for (const required of [
  "createReviewPacket",
  "formatReviewPacket",
  "DiagnosisReviewPacket",
  "ReviewDecision",
  "reviewDecisionLabel",
  "reviewChecklist",
  "requiredHumanChecks",
  "safetyNotes",
  "nextSteps",
  "inputSnapshot",
]) {
  const ok = reviewEngineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Review packet engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI human review workflow ---");

for (const required of [
  "AI Human Review Workflow",
  "Revisione umana",
  "Decisione revisore",
  "Approva con cautela",
  "Richiede correzioni",
  "Rifiuta bozza",
  "Copia pacchetto",
  "Esporta pacchetto JSON",
  "data-ai-human-review-workflow",
]) {
  const ok = reviewWorkflowText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI review workflow incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina intake ---");

for (const required of [
  'import DiagnosisReviewWorkflow from "./DiagnosisReviewWorkflow";',
  "<DiagnosisReviewWorkflow",
  "enabled={actionPlanReady}",
  "input={draftInput}",
  "draft={diagnosisDraft}",
  "actionPlan={actionPlan}",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Integrazione review workflow mancante: ${required}`);
  }
}

console.log("");
console.log("--- Guardrail no AI live ---");

for (const [label, text] of [
  ["client", clientText],
  ["reviewEngine", reviewEngineText],
  ["reviewWorkflow", reviewWorkflowText],
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
  "AI Human Review Workflow V6.0",
  "pacchetto revisione",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "npm run ops:ai-review-workflow-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README review workflow incompleto: ${required}`);
  }
}

for (const required of [
  "AI human review workflow",
  "npm run ops:ai-review-workflow-check",
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
  "ops:ai-review-workflow-check",
  "ops:ai-action-plan-check",
  "ops:ai-diagnosis-draft-check",
  "ops:ai-photo-intake-check",
  "ops:ai-readiness-check",
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

console.log("");
console.log("--- AI human review workflow check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI human review workflow check completato con successo.");
