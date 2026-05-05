#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");

const requiredFiles = [
  "agri_app/OPERATIONS_RUNBOOK_V4_14.md",
  "agri_app/scripts/ops-runbook-check.mjs",
  "agri_app/scripts/ops-quick-check.mjs",
  "agri_app/scripts/ops-admin-page-check.mjs",
  "agri_app/scripts/ops-admin-dynamic-check.mjs",
  "agri_app/scripts/ops-admin-navigation-check.mjs",
  "agri_app/scripts/ops-admin-ux-check.mjs",
  "agri_app/scripts/ops-admin-command-palette-check.mjs",
  "agri_app/AI_IMAGE_DIAGNOSIS_STRATEGY_V5_6.md",
  "agri_app/AI_PREMIUM_READINESS_V5_6.md",
  "agri_app/scripts/ops-ai-readiness-check.mjs",
  "agri_app/AI_PHOTO_DIAGNOSIS_INTAKE_V5_7.md",
  "agri_app/scripts/ops-ai-photo-intake-check.mjs",
  "agri_app/AI_PHOTO_DIAGNOSIS_DRAFT_ENGINE_V5_8.md",
  "agri_app/scripts/ops-ai-diagnosis-draft-check.mjs",
  "agri_app/scripts/ops-admin-route-monitoring-check.mjs",
  "agri_app/scripts/ops-admin-live-routes-check.mjs",
  "agri_app/scripts/ops-quick-coverage-check.mjs",
  "agri_app/scripts/release-gate-live-safe.mjs",
  "agri_app/scripts/ops-log-redaction-check.mjs",
  "agri_app/scripts/ops-labels-check.mjs",
  "agri_app/scripts/ops-banner-check.mjs",
  "agri_app/scripts/release-gate.mjs",
  "agri_app/scripts/release-status.mjs",
  "agri_app/scripts/db-safety-check.mjs",
  "agri_app/scripts/security-check.mjs",
  "agri_app/scripts/recurring-quality-check.mjs",
];

const requiredScripts = [
  "ops:quick-check",
  "ops:admin-page-check",
  "ops:admin-dynamic-check",
  "ops:admin-navigation-check",
  "ops:admin-ux-check",
  "ops:admin-command-palette-check",
  "ops:ai-readiness-check",
  "ops:ai-photo-intake-check",
  "ops:ai-diagnosis-draft-check",
  "ops:admin-route-monitoring-check",
  "ops:admin-live-routes-check",
  "ops:quick-coverage-check",
  "ops:release-gate:live",
  "ops:log-redaction-check",
  "ops:labels-check",
  "ops:banner-check",
  "ops:runbook-check",
  "ops:release-status:live",
  "ops:db-safety",
  "ops:security",
  "ops:recurring-quality",
];

const requiredRunbookText = [
  "NON fare prisma db push",
  "ENABLE_EMAIL_NOTIFICATIONS=false",
  "CRON_SECRET_VALUE",
  "npm run ops:quick-check",
  "npm run ops:admin-dynamic-check",
  "npm run ops:admin-navigation-check",
  "npm run ops:admin-ux-check",
  "npm run ops:admin-command-palette-check",
  "npm run ops:ai-readiness-check",
  "npm run ops:ai-photo-intake-check",
  "npm run ops:ai-diagnosis-draft-check",
  "npm run ops:admin-route-monitoring-check",
  "npm run ops:admin-live-routes-check",
  "npm run ops:quick-coverage-check",
  "npm run ops:banner-check",
  "npm run ops:release-gate:live",
  "secret=[REDACTED]",
  "checkpoint/live-stable",
  "/admin",
  "/admin/operations",
  "/admin/system",
  "/ai/photo-diagnosis",
  "Render Web Service Agri App",
  "Render Cron Job",
  "AI premium readiness checkpoint",
  "AI photo diagnosis intake",
  "AI diagnosis draft engine",
];

const failures = [];

console.log("Agri App ops runbook check operativo");
console.log(`Repo root: ${repoRoot}`);
console.log("");

console.log("--- File richiesti ---");
for (const file of requiredFiles) {
  const ok = existsSync(resolve(repoRoot, file));
  console.log(`${ok ? "✓" : "✗"} ${file}`);

  if (!ok) {
    failures.push(`File mancante: ${file}`);
  }
}

console.log("");
console.log("--- Alias npm richiesti ---");

const packagePath = resolve(appDir, "package.json");
let packageJson = null;

try {
  packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
} catch (error) {
  failures.push(`package.json non leggibile: ${error.message}`);
}

for (const scriptName of requiredScripts) {
  const ok = Boolean(packageJson?.scripts?.[scriptName]);
  console.log(`${ok ? "✓" : "✗"} ${scriptName}`);

  if (!ok) {
    failures.push(`Alias npm mancante: ${scriptName}`);
  }
}

console.log("");
console.log("--- Contenuto runbook ---");

const runbookPath = resolve(repoRoot, "agri_app/OPERATIONS_RUNBOOK_V4_14.md");
let runbookText = "";

try {
  runbookText = readFileSync(runbookPath, "utf8");
} catch (error) {
  failures.push(`Runbook non leggibile: ${error.message}`);
}

for (const requiredText of requiredRunbookText) {
  const ok = runbookText.includes(requiredText);
  console.log(`${ok ? "✓" : "✗"} ${requiredText}`);

  if (!ok) {
    failures.push(`Testo richiesto mancante nel runbook: ${requiredText}`);
  }
}

console.log("");
console.log("--- Runbook check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("Ops runbook check completato con successo.");
