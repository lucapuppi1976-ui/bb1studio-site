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
  engine: "agri_app/src/app/ai/photo-diagnosis/diagnosisDraftEngine.ts",
  readme: "agri_app/AI_PHOTO_DIAGNOSIS_DRAFT_ENGINE_V5_8.md",
  check: "agri_app/scripts/ops-ai-diagnosis-draft-check.mjs",
};

const failures = [];

function readRepoFile(relativePath) {
  const absolutePath = resolve(repoRoot, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

console.log("Agri App AI diagnosis draft check V5.8");
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
const engineText = readRepoFile(files.engine);
const readmeText = readRepoFile(files.readme);
const runbookText = readRepoFile("agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));

console.log("");
console.log("--- Draft engine locale ---");

for (const required of [
  "createLocalDiagnosisDraft",
  "formatDiagnosisDraft",
  "DiagnosisDraft",
  "likelyProblems",
  "immediateActions",
  "additionalChecks",
  "followUp",
  "limitations",
  "riskFromSeverity",
  "confidenceFromContext",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Draft engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI bozza diagnosi ---");

for (const required of [
  "AI Diagnosis Draft Engine",
  "Genera bozza diagnosi",
  "Bozza diagnosi strutturata",
  "Rischio operativo",
  "Ipotesi problema",
  "Azioni immediate",
  "Controlli aggiuntivi",
  "Copia bozza",
  "data-ai-diagnosis-draft-engine",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI draft incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Guardrail no AI live ---");

for (const [label, text] of [
  ["client", clientText],
  ["engine", engineText],
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
  "AI Photo Diagnosis Draft Engine V5.8",
  "motore locale",
  "nessuna chiamata AI live",
  "npm run ops:ai-diagnosis-draft-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README draft incompleto: ${required}`);
  }
}

for (const required of [
  "AI diagnosis draft engine",
  "npm run ops:ai-diagnosis-draft-check",
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
console.log("--- AI diagnosis draft check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI diagnosis draft check completato con successo.");
