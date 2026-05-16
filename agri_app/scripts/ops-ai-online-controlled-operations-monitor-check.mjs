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

const engine = readFile("src/lib/ai/aiOnlineControlledOperationsMonitor.ts");
const route = readFile("src/app/api/ops/ai-online-controlled-operations-monitor-dry-run/route.ts");
const ui = readFile("src/app/ai/photo-diagnosis/OnlineControlledOperationsMonitorPanel.tsx");
const admin = readFile("src/app/admin/operations/OperationsAiOnlineControlledOperationsMonitor.tsx");
const readme = readFile("AI_ONLINE_CONTROLLED_OPERATIONS_MONITOR_V18_0.md");
const pkg = readFile("package.json");
const runbook = readFile("OPERATIONS_RUNBOOK_V4_14.md");

for (const fragment of [
  "buildAiOnlineControlledOperationsMonitorReport",
  "aiOnlineControlledOperationsMonitorVersion",
  "OnlineControlledOperationsReport",
  "WatchtowerSignalItem",
  "ProtectedEndpointBoardItem",
  "DailyOpsChecklistItem",
  "onlineControlledGo: true",
  "controlledDryRunProductionReady: true",
  "onlineControlledOperationsMonitorReady: true",
  "dryRunProductionWatchtowerReady: true",
  "protectedEndpointBoardReady: true",
  "dailyOpsChecklistReady: true",
  "rollbackReadinessReady: true",
]) {
  requireText("engine", engine, fragment);
}

for (const fragment of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-online-controlled-operations-monitor-dry-run",
]) {
  requireText("route", route, fragment);
}

requireText("ui", ui, "OnlineControlledOperationsMonitorPanel");
requireText("ui", ui, "Online Controlled Operations Monitor & Dry-Run Production Watchtower");
requireText("admin", admin, "OperationsAiOnlineControlledOperationsMonitor");
requireText("admin", admin, "/api/ops/ai-online-controlled-operations-monitor-dry-run");
requireText("readme", readme, "Online Controlled Operations Monitor & Dry-Run Production Watchtower");
requireText("package", pkg, "ops:ai-online-controlled-operations-monitor-check");
requireText("runbook", runbook, "V18.0");
requireText("runbook", runbook, "ops:ai-online-controlled-operations-monitor-check");

for (const flag of [
  "providerAiReady",
  "persistenceReady",
  "memoryPersistenceReady",
  "automaticTaskCreationReady",
  "automaticInterventionCreationReady",
  "automaticExecutionReady",
  "providerCalled",
  "persistencePerformed",
  "memoryPersistencePerformed",
  "taskCreated",
  "interventionCreated",
  "automaticExecutionPerformed",
  "publicSharePerformed",
  "productPrescriptionPerformed",
  "dosageAdvicePerformed",
  "automaticTaskCreationAllowed",
  "automaticInterventionCreationAllowed",
  "automaticExecutionAllowed",
  "dbPersistenceAllowed",
  "memoryPersistenceAllowed",
  "publicShareAllowed",
  "productPrescriptionAllowed",
  "dosageAdviceAllowed",
  "operationalAiReady",
  "providerActivationAllowed",
  "providerCallExecutionAllowed",
  "providerRequestDispatchAllowed",
  "providerResponseIntakeAllowed",
  "providerResultPersistenceAllowed",
  "productionRuntimeAllowed",
  "storageActivationAllowed",
  "migrationExecutionAllowed",
  "schemaWriteAllowed",
  "reviewPersistenceAllowed",
  "publicExportArtifactWriteAllowed",
  "taskInterventionCreationAllowed",
  "incidentRecordWriteAllowed",
  "operationalExecutionAllowed",
  "executionCommandAllowed",
  "humanExecutionApprovalAllowed",
]) {
  requireText("guardrail false " + flag, engine, flag + ": false");
}

for (const flag of [
  "onlineControlledGo",
  "controlledDryRunProductionReady",
  "manualDispatchOnly",
  "humanReviewRequired",
  "localAnalysisOnly",
  "redactedOutputOnly",
  "onlineControlledOperationsMonitorReady",
  "dryRunProductionWatchtowerReady",
  "protectedEndpointBoardReady",
  "dailyOpsChecklistReady",
  "rollbackReadinessReady",
]) {
  requireText("guardrail true " + flag, engine, flag + ": true");
}

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

for (const forbiddenDir of ["src/app/api/ai", "src/app/api/diagnosis"]) {
  if (fs.existsSync(path.join(appRoot, forbiddenDir))) {
    failures.push("Directory endpoint AI non autorizzata: " + forbiddenDir);
  }
}

for (const supportScript of [
  "scripts/ops-runbook-check.mjs",
  "scripts/ops-quick-check.mjs",
  "scripts/ops-quick-coverage-check.mjs",
]) {
  const content = readFile(supportScript);
  requireText(supportScript, content, "AGRI_V18_0_ONLINE_CONTROLLED_OPERATIONS_MONITOR_CHECK");
}

const summary = {
  ok: failures.length === 0,
  check: "ops-ai-online-controlled-operations-monitor-check",
  version: "V18.0",
  totalFailures: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));

if (failures.length > 0) {
  process.exit(1);
}
