#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");

const pagePath = resolve(repoRoot, "agri_app/src/app/admin/operations/page.tsx");
const runbookPath = resolve(repoRoot, "agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packagePath = resolve(appDir, "package.json");

const requiredPageText = [
  "Admin Operations Center",
  "Centro operativo Agri App",
  "npm run ops:quick-check",
  "npm run ops:release-gate:live",
  "unset DATABASE_URL LIVE_DATABASE_URL",
  "NON fare prisma db push",
  "CRON_SECRET",
  "checkpoint/live-stable",
];

const forbiddenPageText = [
  "secret=",
  "--secret",
  "prisma db push\\n",
];

const requiredRunbookText = [
  "/admin/operations",
  "Admin Operations Center",
];

const failures = [];

console.log("Agri App admin operations page check V5.0");
console.log(`Repo root: ${repoRoot}`);
console.log("");

console.log("--- File richiesti ---");
for (const file of [
  "agri_app/src/app/admin/operations/page.tsx",
  "agri_app/scripts/ops-admin-page-check.mjs",
  "agri_app/README_ADMIN_OPERATIONS_CENTER_V5_0.md",
]) {
  const ok = existsSync(resolve(repoRoot, file));
  console.log(`${ok ? "✓" : "✗"} ${file}`);
  if (!ok) {
    failures.push(`File mancante: ${file}`);
  }
}

const pageText = existsSync(pagePath) ? readFileSync(pagePath, "utf8") : "";
const runbookText = existsSync(runbookPath) ? readFileSync(runbookPath, "utf8") : "";

console.log("");
console.log("--- Contenuto pagina ---");
for (const text of requiredPageText) {
  const ok = pageText.includes(text);
  console.log(`${ok ? "✓" : "✗"} ${text}`);
  if (!ok) {
    failures.push(`Testo richiesto mancante nella pagina: ${text}`);
  }
}

console.log("");
console.log("--- Assenza pattern sensibili pagina ---");
for (const text of forbiddenPageText) {
  const ok = !pageText.includes(text);
  console.log(`${ok ? "✓" : "✗"} assente: ${text}`);
  if (!ok) {
    failures.push(`Pattern vietato presente nella pagina: ${text}`);
  }
}

console.log("");
console.log("--- Runbook aggiornato ---");
for (const text of requiredRunbookText) {
  const ok = runbookText.includes(text);
  console.log(`${ok ? "✓" : "✗"} ${text}`);
  if (!ok) {
    failures.push(`Testo richiesto mancante nel runbook: ${text}`);
  }
}

console.log("");
console.log("--- Alias npm ---");
const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
const aliasOk = Boolean(packageJson.scripts?.["ops:admin-page-check"]);
console.log(`${aliasOk ? "✓" : "✗"} ops:admin-page-check`);
if (!aliasOk) {
  failures.push("Alias npm mancante: ops:admin-page-check");
}

console.log("");
console.log("--- Admin operations page check summary ---");
if (failures.length) {
  console.log(`Failures: ${failures.length}`);
  for (const failure of failures) {
    console.log(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("Admin operations page check completato con successo.");
