#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");

const quickCheckPath = resolve(repoRoot, "agri_app/scripts/ops-quick-check.mjs");
const packagePath = resolve(appDir, "package.json");

const quickCheckText = readFileSync(quickCheckPath, "utf8");
const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));

const requiredQuickCheckParts = [
  "scripts/db-safety-check.mjs",
  "scripts/security-check.mjs",
  "scripts/recurring-quality-check.mjs",
  "scripts/ops-labels-check.mjs",
  "scripts/ops-banner-check.mjs",
  "scripts/release-status.mjs",
  "scripts/ops-log-redaction-check.mjs",
  "scripts/ops-runbook-check.mjs",
  "scripts/ops-admin-dynamic-check.mjs",
  "scripts/ops-admin-navigation-check.mjs",
  "scripts/ops-admin-ux-check.mjs",
  "scripts/ops-admin-command-palette-check.mjs",
  "scripts/ops-ai-readiness-check.mjs",
  "scripts/ops-ai-photo-intake-check.mjs",
  "scripts/ops-ai-diagnosis-draft-check.mjs",
  "scripts/ops-ai-action-plan-check.mjs",
  "scripts/ops-ai-review-workflow-check.mjs",
  "scripts/ops-ai-provider-safety-check.mjs",
  "scripts/ops-ai-provider-status-check.mjs",
  "scripts/ops-ai-provider-dry-run-check.mjs",
  "scripts/ops-ai-provider-response-check.mjs",
  "scripts/ops-ai-pipeline-dry-run-check.mjs",
  "scripts/ops-ai-photo-quality-gate-check.mjs",
  "scripts/ops-ai-evidence-bundle-check.mjs",
  "scripts/ops-ai-provider-request-check.mjs",
  "scripts/ops-ai-orchestrator-dry-run-check.mjs",
  "scripts/ops-ai-case-file-check.mjs",
  "scripts/ops-ai-photo-annotation-check.mjs",
  "scripts/ops-ai-differential-diagnosis-check.mjs",
  "scripts/ops-ai-solution-playbook-check.mjs",
  "scripts/ops-ai-case-report-check.mjs",
  "scripts/ops-ai-decision-dossier-check.mjs",
  "scripts/ops-ai-work-order-preview-check.mjs",
  "scripts/ops-ai-work-order-execution-gate-check.mjs",
  "scripts/ops-ai-manual-conversion-audit-check.mjs",
  "scripts/ops-ai-case-export-bundle-check.mjs",
  "scripts/ops-ai-case-export-archive-check.mjs",
  "scripts/ops-ai-field-intelligence-check.mjs",
  "scripts/ops-ai-temporal-trend-check.mjs",
  "scripts/ops-ai-field-scouting-plan-check.mjs",
  "scripts/ops-ai-field-risk-heatmap-check.mjs",
  "scripts/ops-ai-follow-up-scheduler-check.mjs",
  "scripts/ops-ai-intervention-readiness-check.mjs",
  "scripts/ops-ai-intervention-protocol-check.mjs",
  "scripts/ops-ai-farm-command-board-check.mjs",
  "scripts/ops-ai-scouting-mission-check.mjs",
  "scripts/ops-ai-farm-risk-radar-check.mjs",
  "scripts/ops-ai-intervention-impact-check.mjs",
  "scripts/ops-ai-response-portfolio-check.mjs",
  "scripts/ops-ai-case-memory-graph-check.mjs",
  "scripts/ops-ai-case-memory-retrieval-check.mjs",
  "scripts/ops-ai-case-outcome-learning-check.mjs",
  "scripts/ops-ai-memory-promotion-check.mjs",
  "scripts/ops-ai-memory-quality-guard-check.mjs",
  "scripts/ops-admin-route-monitoring-check.mjs",
  "scripts/ops-admin-live-routes-check.mjs",
  "Protected email status live",
];

const requiredAliases = [
  "ops:quick-check",
  "ops:quick-coverage-check",
  "ops:runbook-check",
  "ops:admin-dynamic-check",
  "ops:admin-navigation-check",
  "ops:admin-ux-check",
  "ops:admin-command-palette-check",
  "ops:ai-readiness-check",
  "ops:ai-photo-intake-check",
  "ops:ai-diagnosis-draft-check",
  "ops:ai-action-plan-check",
  "ops:ai-review-workflow-check",
  "ops:ai-provider-safety-check",
  "ops:ai-provider-status-check",
  "ops:ai-provider-dry-run-check",
  "ops:ai-provider-response-check",
  "ops:ai-pipeline-dry-run-check",
  "ops:ai-photo-quality-gate-check",
  "ops:ai-evidence-bundle-check",
  "ops:ai-provider-request-check",
  "ops:ai-orchestrator-dry-run-check",
  "ops:ai-case-file-check",
  "ops:ai-photo-annotation-check",
  "ops:ai-differential-diagnosis-check",
  "ops:ai-solution-playbook-check",
  "ops:ai-case-report-check",
  "ops:ai-decision-dossier-check",
  "ops:ai-work-order-preview-check",
  "ops:ai-work-order-execution-gate-check",
  "ops:ai-manual-conversion-audit-check",
  "ops:ai-case-export-bundle-check",
  "ops:ai-case-export-archive-check",
  "ops:ai-field-intelligence-check",
  "ops:ai-temporal-trend-check",
  "ops:ai-field-scouting-plan-check",
  "ops:ai-field-risk-heatmap-check",
  "ops:ai-follow-up-scheduler-check",
  "ops:ai-intervention-readiness-check",
  "ops:ai-intervention-protocol-check",
  "ops:ai-farm-command-board-check",
  "ops:ai-scouting-mission-check",
  "ops:ai-farm-risk-radar-check",
  "ops:ai-intervention-impact-check",
  "ops:ai-response-portfolio-check",
  "ops:ai-case-memory-graph-check",
  "ops:ai-case-memory-retrieval-check",
  "ops:ai-case-outcome-learning-check",
  "ops:ai-memory-promotion-check",
  "ops:ai-memory-quality-guard-check",
  "ops:admin-route-monitoring-check",
  "ops:admin-live-routes-check",
  "ops:banner-check",
  "ops:labels-check",
  "ops:log-redaction-check",
  "ops:release-gate:live",
];

const failures = [];

console.log("Agri App ops quick coverage check V4.16");
console.log(`Repo root: ${repoRoot}`);
console.log("");

console.log("--- Copertura ops-quick-check ---");

for (const required of requiredQuickCheckParts) {
  const ok = quickCheckText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`ops-quick-check non include: ${required}`);
  }
}

console.log("");
console.log("--- Alias npm richiesti ---");

for (const scriptName of requiredAliases) {
  const ok = Boolean(packageJson.scripts?.[scriptName]);
  console.log(`${ok ? "✓" : "✗"} ${scriptName}`);

  if (!ok) {
    failures.push(`Alias npm mancante: ${scriptName}`);
  }
}

console.log("");
console.log("--- Quick coverage summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("Ops quick coverage check completato con successo.");
