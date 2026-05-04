#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");

const opsLivePath = resolve(repoRoot, "agri_app/scripts/ops-live-check.mjs");
const routeCheckPath = resolve(repoRoot, "agri_app/scripts/ops-admin-live-routes-check.mjs");
const runbookPath = resolve(repoRoot, "agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packagePath = resolve(appDir, "package.json");

const failures = [];

console.log("Agri App admin route monitoring check V5.3");
console.log(`Repo root: ${repoRoot}`);
console.log("");

console.log("--- File richiesti ---");

for (const file of [
  "agri_app/scripts/ops-live-check.mjs",
  "agri_app/scripts/ops-admin-live-routes-check.mjs",
  "agri_app/scripts/ops-admin-route-monitoring-check.mjs",
  "agri_app/README_ADMIN_ROUTE_MONITORING_V5_3.md",
]) {
  const ok = existsSync(resolve(repoRoot, file));
  console.log(`${ok ? "✓" : "✗"} ${file}`);

  if (!ok) {
    failures.push(`File mancante: ${file}`);
  }
}

const opsLiveText = existsSync(opsLivePath) ? readFileSync(opsLivePath, "utf8") : "";
const routeCheckText = existsSync(routeCheckPath) ? readFileSync(routeCheckPath, "utf8") : "";
const runbookText = existsSync(runbookPath) ? readFileSync(runbookPath, "utf8") : "";
const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));

console.log("");
console.log("--- ops-live-check include route admin ---");

for (const route of ["/admin", "/admin/operations", "/admin/system"]) {
  const ok = opsLiveText.includes(route);
  console.log(`${ok ? "✓" : "✗"} ${route}`);

  if (!ok) {
    failures.push(`ops-live-check non include ${route}`);
  }
}

console.log("");
console.log("--- Check route admin dedicato ---");

for (const required of [
  "/admin",
  "/admin/operations",
  "/admin/system",
  "acceptedStatuses",
  "Admin live routes check completato con successo",
]) {
  const ok = routeCheckText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`ops-admin-live-routes-check incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Runbook e alias ---");

for (const required of [
  "npm run ops:admin-live-routes-check",
  "Admin live route monitoring",
  "/admin/system",
]) {
  const ok = runbookText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Runbook non aggiornato: ${required}`);
  }
}

for (const scriptName of [
  "ops:admin-live-routes-check",
  "ops:admin-route-monitoring-check",
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
console.log("--- Admin route monitoring check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("Admin route monitoring check completato con successo.");
