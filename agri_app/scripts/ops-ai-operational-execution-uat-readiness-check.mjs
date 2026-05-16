#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const appRoot = fs.existsSync(path.join(process.cwd(), "package.json"))
  ? process.cwd()
  : path.join(process.cwd(), "agri_app");

const failures = [];

function readFile(relativePath) {
  const absolutePath = path.join(appRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    failures.push("File mancante: " + relativePath);
    return "";
  }
  return fs.readFileSync(absolutePath, "utf8");
}

function requireText(label, content, fragment) {
  if (!content.includes(fragment)) {
    failures.push(label + ": manca " + fragment);
  }
}

function forbidText(label, content, fragment) {
  if (content.includes(fragment)) {
    failures.push(label + ": pattern vietato " + fragment);
  }
}

const engine = readFile("src/lib/ai/aiOperationalExecutionUatReadiness.ts");
const route = readFile("src/app/api/ops/ai-operational-execution-uat-readiness-dry-run/route.ts");
const ui = readFile("src/app/ai/photo-diagnosis/OperationalExecutionUatReadinessPanel.tsx");
const admin = readFile("src/app/admin/operations/OperationsAiOperationalExecutionUatReadiness.tsx");
const readme = readFile("AI_OPERATIONAL_EXECUTION_UAT_READINESS_V18_3.md");
const pkg = readFile("package.json");
const runbook = readFile("OPERATIONS_RUNBOOK_V4_14.md");

for (const fragment of [
  "buildAiOperationalExecutionUatReadinessReport",
  "aiOperationalExecutionUatReadinessVersion",
  "ExecutionUatReport",
  "ExecutionUatBoardItem",
  "executionUatReadinessReady: true",
  "humanApprovalProofReady: true",
  "emergencyStopProofReady: true",
  "commandBoundaryReady: true",
  "dryRunExecutionScenarioReady: true",
  "rollbackDecisionReady: true",
]) {
  requireText("engine", engine, fragment);
}

for (const fragment of [
  "providerAiReady: false",
  "providerCalled: false",
  "persistencePerformed: false",
  "memoryPersistencePerformed: false",
  "taskCreated: false",
  "interventionCreated: false",
  "automaticExecutionPerformed: false",
  "dbPersistenceAllowed: false",
  "operationalExecutionAllowed: false",
  "operationalExecutionPerformed: false",
  "executionCommandAllowed: false",
  "executionNotificationAllowed: false",
  "emergencyStopConfigured: false",
  "humanExecutionApprovalAllowed: false",
  "publicExportArtifactWriteAllowed: false",
  "incidentRecordPersistenceAllowed: false",
  "humanReviewRequired: true",
  "redactedOutputOnly: true",
]) {
  requireText("guardrail", engine, fragment);
}

for (const fragment of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-operational-execution-uat-readiness-dry-run",
]) {
  requireText("route", route, fragment);
}

requireText("ui", ui, "OperationalExecutionUatReadinessPanel");
requireText("admin", admin, "OperationsAiOperationalExecutionUatReadiness");
requireText("readme", readme, "Operational Execution UAT Readiness");
requireText("package", pkg, "ops:ai-operational-execution-uat-readiness-check");
requireText("runbook", runbook, "V18.3");
requireText("runbook", runbook, "ops:ai-operational-execution-uat-readiness-check");

for (const [label, content] of [
  ["engine", engine],
  ["route", route],
  ["ui", ui],
  ["admin", admin],
]) {
  for (const fragment of [
    ["fe", "tch("].join(""),
    ["OPENAI", "_API_KEY"].join(""),
    ["ANTHROPIC", "_API_KEY"].join(""),
    ["GEMINI", "_API_KEY"].join(""),
    ["GOOGLE", "_API_KEY"].join(""),
    ["secret", "="].join(""),
    ["--", "secret"].join(""),
    ["local", "Storage"].join(""),
    ["session", "Storage"].join(""),
    ["prisma", "."].join(""),
    ["db", "."].join(""),
  ]) {
    forbidText(label, content, fragment);
  }
}

for (const fragment of [
  ["s", "k-"].join(""),
  "secret",
  "sensitive",
  "token",
  "credential",
  "password",
  "authorization",
  "bearer",
  "process.env",
]) {
  forbidText("runtime engine readiness compatibility", engine.toLowerCase(), fragment.toLowerCase());
}

for (const supportScript of [
  "scripts/ops-runbook-check.mjs",
  "scripts/ops-quick-check.mjs",
  "scripts/ops-quick-coverage-check.mjs",
]) {
  const content = readFile(supportScript);
  requireText(supportScript, content, "AGRI_V18_3_OPERATIONAL_EXECUTION_UAT_READINESS_CHECK");
}

const summary = {
  ok: failures.length === 0,
  check: "ops-ai-operational-execution-uat-readiness-check",
  version: "V18.3",
  totalFailures: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));

if (failures.length > 0) {
  process.exit(1);
}
