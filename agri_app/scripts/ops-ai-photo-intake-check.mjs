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
  readme: "agri_app/AI_PHOTO_DIAGNOSIS_INTAKE_V5_7.md",
  check: "agri_app/scripts/ops-ai-photo-intake-check.mjs",
};

const failures = [];

function readRepoFile(relativePath) {
  const absolutePath = resolve(repoRoot, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

console.log("Agri App AI photo intake check V5.7");
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

const pageText = readRepoFile(files.page);
const clientText = readRepoFile(files.client);
const readmeText = readRepoFile(files.readme);
const operationsAiText = readRepoFile("agri_app/src/app/admin/operations/OperationsAiReadiness.tsx");
const runbookText = readRepoFile("agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));

console.log("");
console.log("--- Pagina diagnosi foto ---");

for (const required of [
  "Diagnosi fotografica AI",
  "PhotoDiagnosisIntake",
  "/admin/operations",
  "analisi AI non è ancora attiva",
]) {
  const ok = pageText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pagina intake incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Client intake controllato ---");

for (const required of [
  '"use client"',
  "AI Photo Diagnosis Intake",
  "accept=\"image/jpeg,image/png,image/webp\"",
  "URL.createObjectURL",
  "navigator.clipboard.writeText",
  "Prepara richiesta AI",
  "Brief diagnosi fotografica AI",
  "Analisi AI non ancora attiva",
  "maxImageSizeMb",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Client intake incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Guardrail no AI live ---");

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
  const ok = !clientText.includes(forbidden);
  console.log(`${ok ? "✓" : "✗"} assente: ${forbidden}`);

  if (!ok) {
    failures.push(`Pattern vietato nel client intake: ${forbidden}`);
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
console.log("--- Link da Operations Center AI readiness ---");

for (const required of [
  "/ai/photo-diagnosis",
  "Intake diagnosi foto",
]) {
  const ok = operationsAiText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Operations AI readiness non linka intake: ${required}`);
  }
}

console.log("");
console.log("--- Documento e runbook ---");

for (const required of [
  "AI Photo Diagnosis Intake V5.7",
  "nessuna chiamata AI live",
  "npm run ops:ai-photo-intake-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README intake incompleto: ${required}`);
  }
}

for (const required of [
  "AI photo diagnosis intake",
  "npm run ops:ai-photo-intake-check",
  "/ai/photo-diagnosis",
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
console.log("--- AI photo intake check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI photo intake check completato con successo.");
