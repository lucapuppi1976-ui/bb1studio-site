#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");

const files = {
  component: "agri_app/src/app/admin/operations/OperationsUxPolish.tsx",
  page: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/README_ADMIN_OPERATIONS_UX_POLISH_V5_4.md",
  check: "agri_app/scripts/ops-admin-ux-check.mjs",
};

const failures = [];

function readRepoFile(relativePath) {
  const absolutePath = resolve(repoRoot, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

console.log("Agri App admin operations UX check V5.4");
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
console.log("--- Contenuto UX polish ---");

for (const required of [
  "Operations UX polish",
  "Percorso operativo consigliato",
  "Route admin monitorate",
  "Comandi essenziali",
  "HTTP 307",
  "/admin",
  "/admin/operations",
  "/admin/system",
  "npm run ops:quick-check",
  "npm run ops:admin-live-routes-check",
  "npm run ops:release-gate:live",
  "ENABLE_EMAIL_NOTIFICATIONS",
]) {
  const ok = componentText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Componente UX incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Assenza pattern sensibili UX ---");

for (const forbidden of ["secret=", "--secret", "localStorage", "sessionStorage"]) {
  const ok = !componentText.includes(forbidden);
  console.log(`${ok ? "✓" : "✗"} assente: ${forbidden}`);

  if (!ok) {
    failures.push(`Pattern sensibile presente nel componente UX: ${forbidden}`);
  }
}

console.log("");
console.log("--- Integrazione pagina ---");

for (const required of [
  'import OperationsUxPolish from "./OperationsUxPolish";',
  "<OperationsUxPolish />",
]) {
  const ok = pageText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pagina non integra UX polish: ${required}`);
  }
}

console.log("");
console.log("--- Runbook e alias ---");

for (const required of [
  "npm run ops:admin-ux-check",
  "Operations UX polish",
]) {
  const ok = runbookText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Runbook non aggiornato: ${required}`);
  }
}

for (const scriptName of [
  "ops:admin-ux-check",
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
console.log("--- Admin operations UX check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("Admin operations UX check completato con successo.");
