#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");

const componentPath = resolve(repoRoot, "agri_app/src/app/admin/operations/OperationsDynamicPanel.tsx");
const pagePath = resolve(repoRoot, "agri_app/src/app/admin/operations/page.tsx");
const runbookPath = resolve(repoRoot, "agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packagePath = resolve(appDir, "package.json");

const failures = [];

console.log("Agri App admin operations dynamic check V5.1");
console.log(`Repo root: ${repoRoot}`);
console.log("");

console.log("--- File richiesti ---");
for (const file of [
  "agri_app/src/app/admin/operations/OperationsDynamicPanel.tsx",
  "agri_app/src/app/admin/operations/page.tsx",
  "agri_app/scripts/ops-admin-dynamic-check.mjs",
  "agri_app/README_ADMIN_OPERATIONS_DYNAMIC_V5_1.md",
]) {
  const ok = existsSync(resolve(repoRoot, file));
  console.log(`${ok ? "✓" : "✗"} ${file}`);
  if (!ok) {
    failures.push(`File mancante: ${file}`);
  }
}

const componentText = existsSync(componentPath) ? readFileSync(componentPath, "utf8") : "";
const pageText = existsSync(pagePath) ? readFileSync(pagePath, "utf8") : "";
const runbookText = existsSync(runbookPath) ? readFileSync(runbookPath, "utf8") : "";

console.log("");
console.log("--- Componente dinamico ---");

for (const required of [
  '"use client"',
  "/api/health",
  "/api/ready",
  "/api/ops/preflight",
  'credentials: "same-origin"',
  "Non inserire CRON_SECRET in questa pagina",
  "Esegui preflight admin",
]) {
  const ok = componentText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);
  if (!ok) {
    failures.push(`Testo richiesto mancante nel componente: ${required}`);
  }
}

console.log("");
console.log("--- Assenza pattern sensibili componente ---");

for (const forbidden of [
  "secret=",
  "--secret",
  "localStorage",
  "sessionStorage",
]) {
  const ok = !componentText.includes(forbidden);
  console.log(`${ok ? "✓" : "✗"} assente: ${forbidden}`);
  if (!ok) {
    failures.push(`Pattern vietato presente nel componente: ${forbidden}`);
  }
}

console.log("");
console.log("--- Integrazione pagina ---");

for (const required of [
  'import OperationsDynamicPanel from "./OperationsDynamicPanel";',
  "<OperationsDynamicPanel />",
]) {
  const ok = pageText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);
  if (!ok) {
    failures.push(`Pagina non integra componente: ${required}`);
  }
}

console.log("");
console.log("--- Runbook aggiornato ---");

for (const required of [
  "npm run ops:admin-dynamic-check",
  "Preflight admin dinamico",
]) {
  const ok = runbookText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);
  if (!ok) {
    failures.push(`Runbook non aggiornato: ${required}`);
  }
}

console.log("");
console.log("--- Alias npm ---");

const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
for (const scriptName of [
  "ops:admin-dynamic-check",
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
console.log("--- Admin operations dynamic check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);
  for (const failure of failures) {
    console.log(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("Admin operations dynamic check completato con successo.");
