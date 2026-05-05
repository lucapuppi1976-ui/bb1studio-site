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
  draftEngine: "agri_app/src/app/ai/photo-diagnosis/diagnosisDraftEngine.ts",
  actionEngine: "agri_app/src/app/ai/photo-diagnosis/diagnosisActionPlan.ts",
  readme: "agri_app/AI_PHOTO_ACTION_PLAN_V5_9.md",
  check: "agri_app/scripts/ops-ai-action-plan-check.mjs",
};

const failures = [];

function readRepoFile(relativePath) {
  const absolutePath = resolve(repoRoot, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

console.log("Agri App AI action plan check V5.9");
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
const actionEngineText = readRepoFile(files.actionEngine);
const readmeText = readRepoFile(files.readme);
const runbookText = readRepoFile("agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));

console.log("");
console.log("--- Action plan engine locale ---");

for (const required of [
  "createLocalActionPlan",
  "formatActionPlan",
  "DiagnosisActionPlan",
  "proposedTasks",
  "suggestedInterventions",
  "monitoringPlan",
  "escalationRules",
  "materialsAndChecks",
  "humanReviewNotes",
  "planPriorityFromRisk",
]) {
  const ok = actionEngineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Action plan engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI piano azione ---");

for (const required of [
  "AI Action Plan Builder",
  "Genera piano d’azione",
  "Piano d’azione operativo",
  "Attività proposte",
  "Interventi consigliati",
  "Monitoraggio",
  "Escalation e revisione umana",
  "Copia piano",
  "data-ai-action-plan-builder",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI action plan incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Guardrail no AI live ---");

for (const [label, text] of [
  ["client", clientText],
  ["actionEngine", actionEngineText],
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
  "AI Photo Action Plan V5.9",
  "motore locale",
  "nessuna chiamata AI live",
  "nessuna creazione automatica",
  "npm run ops:ai-action-plan-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README action plan incompleto: ${required}`);
  }
}

for (const required of [
  "AI photo action plan",
  "npm run ops:ai-action-plan-check",
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
console.log("--- AI action plan check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI action plan check completato con successo.");
