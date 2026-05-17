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
  if (!content.includes(fragment)) failures.push(label + ": manca " + fragment);
}

function forbidText(label, content, fragment) {
  if (content.includes(fragment)) failures.push(label + ": pattern vietato " + fragment);
}

const engine = readFile("src/lib/ai/aiTesterAccountWritePathStaging.ts");
const route = readFile("src/app/api/ops/ai-tester-account-write-path-staging-dry-run/route.ts");
const ui = readFile("src/app/ai/photo-diagnosis/TesterAccountWritePathStagingPanel.tsx");
const admin = readFile("src/app/admin/operations/OperationsAiTesterAccountWritePathStaging.tsx");
const readme = readFile("AI_TESTER_ACCOUNT_WRITE_PATH_STAGING_V19_5.md");
const pkg = readFile("package.json");
const runbook = readFile("OPERATIONS_RUNBOOK_V4_14.md");

for (const fragment of [
  "buildAiTesterAccountWritePathStagingReport",
  "aiTesterAccountWritePathStagingVersion",
  "TesterAccountWritePathStagingReport",
  "TesterAccountWritePathStagingBoardItem",
  "testerAccountWritePathStagingReady: true",
  "disabledByDefaultAdapterReady: true",
  "requestPreviewReady: true",
  "adminChecklistReady: true",
  "rollbackPlanReady: true",
  "writeBoundaryReady: true",
]) requireText("engine", engine, fragment);

for (const fragment of [
  "publicSignupAllowed: false",
  "accountWriteAllowed: false",
  "testerAccountCreateAllowed: false",
  "testerInviteSendAllowed: false",
  "testerRoleWriteAllowed: false",
  "testerLanguageWriteAllowed: false",
  "adapterExecutionAllowed: false",
  "schemaWriteAllowed: false",
  "migrationExecutionAllowed: false",
  "providerAiReady: false",
  "providerCalled: false",
  "persistencePerformed: false",
  "taskCreated: false",
  "interventionCreated: false",
  "operationalExecutionAllowed: false",
  "publicExportArtifactWriteAllowed: false",
  "incidentRecordPersistenceAllowed: false",
  "humanReviewRequired: true",
  "redactedOutputOnly: true",
]) requireText("guardrail", engine, fragment);

for (const fragment of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-tester-account-write-path-staging-dry-run",
]) requireText("route", route, fragment);

requireText("ui", ui, "TesterAccountWritePathStagingPanel");
requireText("admin", admin, "OperationsAiTesterAccountWritePathStaging");
requireText("readme", readme, "Tester Account Write Path Staging");
requireText("package", pkg, "ops:ai-tester-account-write-path-staging-check");
requireText("runbook", runbook, "V19.5");
requireText("runbook", runbook, "ops:ai-tester-account-write-path-staging-check");

for (const [label, content] of [["engine", engine], ["route", route], ["ui", ui], ["admin", admin]]) {
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
  ]) forbidText(label, content, fragment);
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
]) forbidText("runtime engine readiness compatibility", engine.toLowerCase(), fragment.toLowerCase());

for (const supportScript of ["scripts/ops-runbook-check.mjs", "scripts/ops-quick-check.mjs", "scripts/ops-quick-coverage-check.mjs"]) {
  const content = readFile(supportScript);
  requireText(supportScript, content, "AGRI_V19_5_TESTER_ACCOUNT_WRITE_PATH_STAGING_CHECK");
}

const summary = {
  ok: failures.length === 0,
  check: "ops-ai-tester-account-write-path-staging-check",
  version: "V19.5",
  totalFailures: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length > 0) process.exit(1);
