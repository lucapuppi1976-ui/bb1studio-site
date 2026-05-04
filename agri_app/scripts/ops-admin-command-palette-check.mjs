#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");

const files = {
  component: "agri_app/src/app/admin/operations/OperationsCommandPalette.tsx",
  page: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/README_ADMIN_OPERATIONS_COMMAND_PALETTE_V5_5.md",
  check: "agri_app/scripts/ops-admin-command-palette-check.mjs",
};

const failures = [];

function readRepoFile(relativePath) {
  const absolutePath = resolve(repoRoot, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

console.log("Agri App admin command palette check V5.5");
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

const componentText = readRepoFile(files.component);
const pageText = readRepoFile(files.page);
const runbookText = readRepoFile("agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));

console.log("");
console.log("--- Contenuto command palette ---");

for (const required of [
  '"use client"',
  "Command palette",
  "Comandi operativi copiabili",
  "navigator.clipboard.writeText",
  "npm run ops:quick-check",
  "npm run ops:release-gate:live",
  "npm run ops:admin-live-routes-check",
  "unset DATABASE_URL LIVE_DATABASE_URL",
  "ROLLBACK_BRANCH",
  "TAG_NAME",
  "CRON_SECRET_VALUE",
]) {
  const ok = componentText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Palette incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Assenza pattern sensibili palette ---");

for (const forbidden of ["secret=", "--secret", "localStorage", "sessionStorage"]) {
  const ok = !componentText.includes(forbidden);
  console.log(`${ok ? "✓" : "✗"} assente: ${forbidden}`);

  if (!ok) {
    failures.push(`Pattern sensibile presente nella palette: ${forbidden}`);
  }
}

console.log("");
console.log("--- Integrazione pagina ---");

for (const required of [
  'import OperationsCommandPalette from "./OperationsCommandPalette";',
  "<OperationsCommandPalette />",
]) {
  const ok = pageText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pagina non integra palette: ${required}`);
  }
}

console.log("");
console.log("--- Runbook e alias ---");

for (const required of [
  "npm run ops:admin-command-palette-check",
  "Operations command palette",
]) {
  const ok = runbookText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Runbook non aggiornato: ${required}`);
  }
}

for (const scriptName of [
  "ops:admin-command-palette-check",
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
console.log("--- Admin command palette check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("Admin command palette check completato con successo.");
