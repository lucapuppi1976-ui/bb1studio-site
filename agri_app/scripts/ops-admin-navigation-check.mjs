#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");

const files = {
  adminHub: "agri_app/src/app/admin/page.tsx",
  operations: "agri_app/src/app/admin/operations/page.tsx",
  systemLayout: "agri_app/src/app/admin/system/layout.tsx",
  readme: "agri_app/README_ADMIN_OPERATIONS_NAVIGATION_V5_2.md",
  check: "agri_app/scripts/ops-admin-navigation-check.mjs",
};

const failures = [];

function readRepoFile(relativePath) {
  const absolutePath = resolve(repoRoot, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

console.log("Agri App admin operations navigation check V5.2");
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

const adminHubText = readRepoFile(files.adminHub);
const operationsText = readRepoFile(files.operations);
const systemLayoutText = readRepoFile(files.systemLayout);
const runbookText = readRepoFile("agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));

console.log("");
console.log("--- Admin hub ---");

for (const required of [
  "Admin Hub",
  "Centro amministrazione Agri App",
  '"/admin/operations"',
  '"/admin/system"',
  '"/admin/users"',
  '"/dashboard"',
]) {
  const ok = adminHubText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Admin hub incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Operations Center link back ---");

for (const required of [
  'href="/admin"',
  "Admin Hub",
]) {
  const ok = operationsText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Operations Center non contiene link hub: ${required}`);
  }
}

console.log("");
console.log("--- System shortcut layout ---");

for (const required of [
  '"/admin/operations"',
  "Operations Center",
  "Accesso rapido operativo",
  "data-admin-operations-shortcut",
]) {
  const ok = systemLayoutText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Admin system layout senza shortcut operativo: ${required}`);
  }
}

console.log("");
console.log("--- Assenza pattern sensibili nelle nuove superfici ---");

for (const [name, text] of [
  ["adminHub", adminHubText],
  ["operations", operationsText],
  ["systemLayout", systemLayoutText],
]) {
  for (const forbidden of ["secret=", "--secret"]) {
    const ok = !text.includes(forbidden);
    console.log(`${ok ? "✓" : "✗"} ${name}: assente ${forbidden}`);

    if (!ok) {
      failures.push(`${name}: pattern sensibile presente: ${forbidden}`);
    }
  }
}

console.log("");
console.log("--- Runbook e alias ---");

for (const required of [
  "/admin",
  "/admin/operations",
  "npm run ops:admin-navigation-check",
]) {
  const ok = runbookText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Runbook non aggiornato: ${required}`);
  }
}

for (const scriptName of [
  "ops:admin-navigation-check",
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
console.log("--- Admin operations navigation check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("Admin operations navigation check completato con successo.");
