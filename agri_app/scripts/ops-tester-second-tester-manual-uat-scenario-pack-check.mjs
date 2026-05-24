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

const engine = readFile("src/lib/ops/testerSecondTesterManualUatScenarioPack.ts");
const route = readFile("src/app/api/ops/tester-second-tester-manual-uat-scenario-pack-dry-run/route.ts");
const ui = readFile("src/app/ai/photo-diagnosis/TesterSecondTesterManualUatScenarioPackPanel.tsx");
const admin = readFile("src/app/admin/operations/OperationsTesterSecondTesterManualUatScenarioPack.tsx");
const readme = readFile("SECOND_TESTER_MANUAL_UAT_SCENARIO_PACK_V21_2.md");
const pkg = readFile("package.json");
const runbook = readFile("OPERATIONS_RUNBOOK_V4_14.md");

for (const fragment of [
  "buildTesterSecondTesterManualUatScenarioPackReport",
  "testerSecondTesterManualUatScenarioPackVersion",
  "TesterSecondTesterManualUatScenarioPackReport",
  "TesterSecondTesterManualUatScenarioPackItem",
  "testerSecondTesterManualUatScenarioPackReady: true",
  "secondTesterManualScenarioPackReady: true",
  "scenarioChecklistReady: true",
  "evidenceChecklistReady: true",
  "issueTriageReady: true",
  "secondTesterUatExpansionReady: true",
  "manualEvidenceOnly: true",
  "readOnlyVerificationOnly: true",
  "SECOND_TESTER_SCENARIO_PACK_COMPLETE",
  "SCENARIO_COVERAGE_INCOMPLETE",
  "EVIDENCE_INCOMPLETE",
]) requireText("engine", engine, fragment);

for (const fragment of [
  "accountWriteAllowed: false",
  "passwordWriteAllowed: false",
  "inviteEmailSendAllowed: false",
  "publicSignupAllowed: false",
  "schemaWriteAllowed: false",
  "migrationExecutionAllowed: false",
  "providerAiReady: false",
  "providerCalled: false",
  "operationalExecutionAllowed: false",
  "evidencePersistenceAllowed: false",
  "issuePersistenceAllowed: false",
  "humanReviewRequired: true",
  "redactedOutputOnly: true",
]) requireText("guardrail", engine, fragment);

for (const fragment of [
  "PrismaClient",
  "findUnique",
  "safeCount",
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "writePerformed: false",
  "/api/ops/tester-second-tester-manual-uat-scenario-pack-dry-run",
]) requireText("route", route, fragment);

for (const fragment of [".create(", ".update(", ".delete(", ".upsert(", ".createMany(", ".updateMany(", ".deleteMany("]) {
  forbidText("route write safety", route, fragment);
}

requireText("ui", ui, "TesterSecondTesterManualUatScenarioPackPanel");
requireText("admin", admin, "OperationsTesterSecondTesterManualUatScenarioPack");
requireText("readme", readme, "Second Tester Manual UAT Scenario Pack");
requireText("package", pkg, "ops:tester-second-tester-manual-uat-scenario-pack-check");
requireText("runbook", runbook, "V21.2");
requireText("runbook", runbook, "ops:tester-second-tester-manual-uat-scenario-pack-check");

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
  requireText(supportScript, content, "AGRI_V21_2_TESTER_SECOND_TESTER_MANUAL_UAT_SCENARIO_PACK_CHECK");
}

const summary = {
  ok: failures.length === 0,
  check: "ops-tester-second-tester-manual-uat-scenario-pack-check",
  version: "V21.2",
  totalFailures: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length > 0) process.exit(1);
