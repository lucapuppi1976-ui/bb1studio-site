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
  safety: "agri_app/src/app/ai/photo-diagnosis/photoDiagnosisProviderSafety.ts",
  panel: "agri_app/src/app/ai/photo-diagnosis/ProviderSafetyPanel.tsx",
  readme: "agri_app/AI_PROVIDER_SAFETY_HARNESS_V6_1.md",
  check: "agri_app/scripts/ops-ai-provider-safety-check.mjs",
};

const failures = [];

function readRepoFile(relativePath) {
  const absolutePath = resolve(repoRoot, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

console.log("Agri App AI provider safety check V6.1");
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
const safetyText = readRepoFile(files.safety);
const panelText = readRepoFile(files.panel);
const readmeText = readRepoFile(files.readme);
const runbookText = readRepoFile("agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));

console.log("");
console.log("--- Provider safety contract ---");

for (const required of [
  "ProviderSafetyContract",
  "providerSafetyCapabilities",
  "createProviderSafetyContract",
  "formatProviderSafetyContract",
  "providerCallsEnabled: false",
  "clientProviderCallsAllowed: false",
  "persistenceAllowed: false",
  "automaticTaskCreationAllowed: false",
  "humanReviewRequired: true",
]) {
  const ok = safetyText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Safety contract incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI Provider Safety Harness ---");

for (const required of [
  "AI Provider Safety Harness",
  "Provider request contract",
  "Contratto sicurezza per provider AI",
  "Nessuna chiamata provider abilitata",
  "No direct call",
  "Human review required",
  "Output vietati",
  "Backend requirements",
  "data-ai-provider-safety-harness",
]) {
  const ok = panelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Provider safety UI incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina intake ---");

for (const required of [
  'import ProviderSafetyPanel from "./ProviderSafetyPanel";',
  "<ProviderSafetyPanel />",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Integrazione ProviderSafetyPanel mancante: ${required}`);
  }
}

console.log("");
console.log("--- Guardrail no AI live ---");

for (const [label, text] of [
  ["client", clientText],
  ["safety", safetyText],
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
  "AI Provider Safety Harness V6.1",
  "provider contract",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "human review obbligatoria",
  "npm run ops:ai-provider-safety-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README provider safety incompleto: ${required}`);
  }
}

for (const required of [
  "AI provider safety harness",
  "npm run ops:ai-provider-safety-check",
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
  "ops:ai-provider-safety-check",
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
console.log("--- AI provider safety check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI provider safety check completato con successo.");
