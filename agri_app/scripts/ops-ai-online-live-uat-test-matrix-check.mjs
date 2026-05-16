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

const engine = readFile("src/lib/ai/aiOnlineLiveUatTestMatrix.ts");
const route = readFile("src/app/api/ops/ai-online-live-uat-test-matrix-dry-run/route.ts");
const ui = readFile("src/app/ai/photo-diagnosis/OnlineLiveUatTestMatrixPanel.tsx");
const admin = readFile("src/app/admin/operations/OperationsAiOnlineLiveUatTestMatrix.tsx");
const readme = readFile("AI_ONLINE_LIVE_UAT_TEST_MATRIX_V18_2.md");
const pkg = readFile("package.json");
const runbook = readFile("OPERATIONS_RUNBOOK_V4_14.md");

for (const fragment of [
  "buildAiOnlineLiveUatTestMatrixReport",
  "aiOnlineLiveUatTestMatrixVersion",
  "LiveUatReport",
  "LiveUatMatrixItem",
  "LiveUatEvidenceItem",
  "liveUatReady: true",
  "evidenceCaptureReady: true",
  "routeCoverageReady: true",
  "protectedEndpointCoverageReady: true",
  "bugTriageReady: true",
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
  "incidentRecordPersistenceAllowed: false",
  "publicExportArtifactWriteAllowed: false",
  "operationalExecutionAllowed: false",
  "executionCommandAllowed: false",
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
  "/api/ops/ai-online-live-uat-test-matrix-dry-run",
]) {
  requireText("route", route, fragment);
}

requireText("ui", ui, "OnlineLiveUatTestMatrixPanel");
requireText("admin", admin, "OperationsAiOnlineLiveUatTestMatrix");
requireText("readme", readme, "Online Live UAT Test Matrix");
requireText("package", pkg, "ops:ai-online-live-uat-test-matrix-check");
requireText("runbook", runbook, "V18.2");
requireText("runbook", runbook, "ops:ai-online-live-uat-test-matrix-check");

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
  requireText(supportScript, content, "AGRI_V18_2_ONLINE_LIVE_UAT_TEST_MATRIX_CHECK");
}

const summary = {
  ok: failures.length === 0,
  check: "ops-ai-online-live-uat-test-matrix-check",
  version: "V18.2",
  totalFailures: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));

if (failures.length > 0) {
  process.exit(1);
}
