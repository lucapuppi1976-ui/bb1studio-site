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
  "agri_app/AI_PHOTO_ACTION_PLAN_V5_9.md",
  "agri_app/scripts/ops-ai-action-plan-check.mjs",
  "agri_app/AI_HUMAN_REVIEW_WORKFLOW_V6_0.md",
  "agri_app/scripts/ops-ai-review-workflow-check.mjs",
  "agri_app/AI_PROVIDER_SAFETY_HARNESS_V6_1.md",
  "agri_app/scripts/ops-ai-provider-safety-check.mjs",
  "agri_app/AI_PROVIDER_OPS_STATUS_V6_2.md",
  "agri_app/scripts/ops-ai-provider-status-check.mjs",
  "agri_app/AI_PROVIDER_DRY_RUN_ADAPTER_V6_3.md",
  "agri_app/scripts/ops-ai-provider-dry-run-check.mjs",
  "agri_app/AI_PROVIDER_RESPONSE_CONTRACT_V6_4.md",
  "agri_app/scripts/ops-ai-provider-response-check.mjs",
  "agri_app/AI_DIAGNOSIS_PIPELINE_DRY_RUN_V6_5.md",
  "agri_app/scripts/ops-ai-pipeline-dry-run-check.mjs",
  "agri_app/AI_PHOTO_QUALITY_GATE_V6_6.md",
  "agri_app/scripts/ops-ai-photo-quality-gate-check.mjs",
  "agri_app/AI_PHOTO_EVIDENCE_BUNDLE_V6_7.md",
  "agri_app/scripts/ops-ai-evidence-bundle-check.mjs",
  "agri_app/AI_PROVIDER_REQUEST_PREVIEW_V6_8.md",
  "agri_app/scripts/ops-ai-provider-request-check.mjs",
  "agri_app/AI_DIAGNOSIS_ORCHESTRATOR_DRY_RUN_V7_0.md",
  "agri_app/scripts/ops-ai-orchestrator-dry-run-check.mjs",
  "agri_app/AI_DIAGNOSIS_CASE_FILE_V7_1.md",
  "agri_app/scripts/ops-ai-case-file-check.mjs",
  "agri_app/AI_PHOTO_SYMPTOM_ANNOTATION_V7_2.md",
  "agri_app/scripts/ops-ai-photo-annotation-check.mjs",
  "agri_app/AI_DIFFERENTIAL_DIAGNOSIS_MATRIX_V7_3.md",
  "agri_app/scripts/ops-ai-differential-diagnosis-check.mjs",
  "agri_app/AI_SOLUTION_PLAYBOOK_V7_4.md",
  "agri_app/scripts/ops-ai-solution-playbook-check.mjs",
  "agri_app/AI_CASE_REPORT_BUILDER_V7_5.md",
  "agri_app/scripts/ops-ai-case-report-check.mjs",
  "agri_app/AI_DECISION_DOSSIER_V7_6.md",
  "agri_app/scripts/ops-ai-decision-dossier-check.mjs",
  "agri_app/AI_WORK_ORDER_PREVIEW_V7_7.md",
  "agri_app/scripts/ops-ai-work-order-preview-check.mjs",
  "agri_app/AI_WORK_ORDER_EXECUTION_GATE_V7_8.md",
  "agri_app/scripts/ops-ai-work-order-execution-gate-check.mjs",
  "agri_app/AI_MANUAL_CONVERSION_AUDIT_V7_9.md",
  "agri_app/scripts/ops-ai-manual-conversion-audit-check.mjs",
  "agri_app/AI_CASE_EXPORT_BUNDLE_V8_0.md",
  "agri_app/scripts/ops-ai-case-export-bundle-check.mjs",
  "agri_app/AI_CASE_EXPORT_ARCHIVE_V8_1.md",
  "agri_app/scripts/ops-ai-case-export-archive-check.mjs",
  "agri_app/AI_FIELD_INTELLIGENCE_V8_3.md",
  "agri_app/scripts/ops-ai-field-intelligence-check.mjs",
  "agri_app/AI_TEMPORAL_FIELD_TREND_V8_4.md",
  "agri_app/scripts/ops-ai-temporal-trend-check.mjs",
  "agri_app/AI_FIELD_SCOUTING_PLAN_V8_5.md",
  "agri_app/scripts/ops-ai-field-scouting-plan-check.mjs",
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
  "npm run ops:ai-action-plan-check",
  "npm run ops:ai-review-workflow-check",
  "npm run ops:ai-provider-safety-check",
  "npm run ops:ai-provider-status-check",
  "npm run ops:ai-provider-dry-run-check",
  "npm run ops:ai-provider-response-check",
  "npm run ops:ai-pipeline-dry-run-check",
  "npm run ops:ai-photo-quality-gate-check",
  "npm run ops:ai-evidence-bundle-check",
  "npm run ops:ai-provider-request-check",
  "npm run ops:ai-orchestrator-dry-run-check",
  "npm run ops:ai-case-file-check",
  "npm run ops:ai-photo-annotation-check",
  "npm run ops:ai-differential-diagnosis-check",
  "npm run ops:ai-solution-playbook-check",
  "npm run ops:ai-case-report-check",
  "npm run ops:ai-decision-dossier-check",
  "npm run ops:ai-work-order-preview-check",
  "npm run ops:ai-work-order-execution-gate-check",
  "npm run ops:ai-manual-conversion-audit-check",
  "npm run ops:ai-case-export-bundle-check",
  "npm run ops:ai-case-export-archive-check",
  "npm run ops:ai-field-intelligence-check",
  "npm run ops:ai-temporal-trend-check",
  "npm run ops:ai-field-scouting-plan-check",
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
  "AI photo action plan",
  "AI human review workflow",
  "AI provider safety harness",
  "AI provider ops status",
  "AI provider dry-run adapter",
  "AI provider response contract",
  "AI diagnosis pipeline dry-run",
  "AI photo quality gate",
  "AI photo evidence bundle",
  "AI provider request preview",
  "AI diagnosis orchestrator dry-run",
  "AI diagnosis case file",
  "AI photo symptom annotation",
  "AI differential diagnosis matrix",
  "AI solution playbook",
  "AI case report builder",
  "AI decision dossier",
  "AI work order preview",
  "AI work order execution gate",
  "AI manual conversion audit",
  "AI case export bundle",
  "AI case export archive",
  "AI field intelligence",
  "AI temporal trend",
  "AI field scouting plan",
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
