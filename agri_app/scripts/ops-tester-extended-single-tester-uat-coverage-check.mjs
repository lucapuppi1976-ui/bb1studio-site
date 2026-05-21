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

const engine = readFile("src/lib/ops/testerExtendedSingleTesterUatCoverage.ts");
const route = readFile("src/app/api/ops/tester-extended-single-tester-uat-coverage-dry-run/route.ts");
const ui = readFile("src/app/ai/photo-diagnosis/TesterExtendedSingleTesterUatCoveragePanel.tsx");
const admin = readFile("src/app/admin/operations/OperationsTesterExtendedSingleTesterUatCoverage.tsx");
const readme = readFile("TESTER_EXTENDED_SINGLE_TESTER_UAT_COVERAGE_V20_5.md");
const pkg = readFile("package.json");
const runbook = readFile("OPERATIONS_RUNBOOK_V4_14.md");

for (const fragment of [
  "buildTesterExtendedSingleTesterUatCoverageReport",
  "testerExtendedSingleTesterUatCoverageVersion",
  "TesterExtendedSingleTesterUatReport",
  "TesterExtendedSingleTesterUatBoardItem",
  "testerExtendedSingleTesterUatCoverageReady: true",
  "extendedSingleTesterScenarioCoverageReady: true",
  "secondTesterExpansionDecisionReady: true",
  "manualEvidenceOnly: true",
  "readOnlyVerificationOnly: true",
]) requireText("engine", engine, fragment);

for (const fragment of [
  "issuePersistenceAllowed: false",
  "evidencePersistenceAllowed: false",
  "accountWriteAllowed: false",
  "passwordWriteAllowed: false",
  "inviteEmailSendAllowed: false",
  "publicSignupAllowed: false",
  "schemaWriteAllowed: false",
  "migrationExecutionAllowed: false",
  "providerAiReady: false",
  "providerCalled: false",
  "operationalExecutionAllowed: false",
  "publicExportArtifactWriteAllowed: false",
  "humanReviewRequired: true",
  "redactedOutputOnly: true",
]) requireText("guardrail", engine, fragment);

for (const fragment of [
  "PrismaClient",
  "findUnique",
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "writePerformed: false",
  "/api/ops/tester-extended-single-tester-uat-coverage-dry-run",
]) requireText("route", route, fragment);

for (const fragment of [".create(", ".update(", ".delete(", ".upsert(", ".createMany(", ".updateMany(", ".deleteMany("]) {
  forbidText("route write safety", route, fragment);
}

requireText("ui", ui, "TesterExtendedSingleTesterUatCoveragePanel");
requireText("admin", admin, "OperationsTesterExtendedSingleTesterUatCoverage");
requireText("readme", readme, "Extended Single Tester UAT Scenario Coverage");
requireText("package", pkg, "ops:tester-extended-single-tester-uat-coverage-check");
requireText("runbook", runbook, "V20.5");
requireText("runbook", runbook, "ops:tester-extended-single-tester-uat-coverage-check");

for (const [label, content] of [["engine", engine], ["ui", ui], ["admin", admin]]) {
  for (const fragment of [
    ["fe", "tch("].join(""),
    ["OPENAI", "_API_KEY"].join(""),
    ["ANTHROPIC", "_API_KEY"].join(""),
    ["GEMINI", "_API_KEY"].join(""),
    ["GOOGLE", "_API_KEY"].join(""),
    ["local", "Storage"].join(""),
    ["session", "Storage"].join(""),
    ["prisma", "."].join(""),
    ["db", "."].join(""),
  ]) forbidText(label, content, fragment);
}

for (const fragment of [
  ["OPENAI", "_API_KEY"].join(""),
  ["ANTHROPIC", "_API_KEY"].join(""),
  ["GEMINI", "_API_KEY"].join(""),
  ["GOOGLE", "_API_KEY"].join(""),
  ["s", "k-"].join(""),
]) forbidText("route AI safety", route, fragment);

for (const supportScript of ["scripts/ops-runbook-check.mjs", "scripts/ops-quick-check.mjs", "scripts/ops-quick-coverage-check.mjs"]) {
  const content = readFile(supportScript);
  requireText(supportScript, content, "AGRI_V20_5_TESTER_EXTENDED_SINGLE_TESTER_UAT_COVERAGE_CHECK");
}

const summary = {
  ok: failures.length === 0,
  check: "ops-tester-extended-single-tester-uat-coverage-check",
  version: "V20.5",
  totalFailures: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length > 0) process.exit(1);
