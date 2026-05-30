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

const engine = readFile("src/lib/ops/testerSmallCohortPasswordSetupPilot.ts");
const route = readFile("src/app/api/ops/tester-small-cohort-password-setup-pilot/route.ts");
const ui = readFile("src/app/ai/photo-diagnosis/TesterSmallCohortPasswordSetupPilotPanel.tsx");
const admin = readFile("src/app/admin/operations/OperationsTesterSmallCohortPasswordSetupPilot.tsx");
const readme = readFile("SMALL_COHORT_PASSWORD_SETUP_PILOT_V21_8.md");
const pkg = readFile("package.json");
const runbook = readFile("OPERATIONS_RUNBOOK_V4_14.md");

for (const fragment of [
  "buildTesterSmallCohortPasswordSetupPilotReport",
  "testerSmallCohortPasswordSetupPilotVersion",
  "SMALL_COHORT_PASSWORD_SETUP_CONFIRM",
  "CONFIRM_V21_8_SMALL_COHORT_PASSWORD_SETUP",
  "testerSmallCohortPasswordSetupPilotReady: true",
  "protectedSmallCohortPasswordWriteRouteReady: true",
  "defaultDryRunOnly: true",
  "serverWriteEnabledRequired: true",
  "serverConfirmRequired: true",
  "bodyConfirmRequired: true",
  "smallCohortLimitReady: true",
  "passwordHashWriteOnly: true",
  "WRITE_CANDIDATES",
]) requireText("engine", engine, fragment);

for (const fragment of [
  "accountCreateAllowed: false",
  "inviteEmailSendAllowed: false",
  "publicSignupAllowed: false",
  "schemaWriteAllowed: false",
  "migrationExecutionAllowed: false",
  "providerAiReady: false",
  "providerCalled: false",
  "operationalExecutionAllowed: false",
  "humanReviewRequired: true",
  "redactedOutputOnly: true",
]) requireText("guardrail", engine, fragment);

for (const fragment of [
  "PrismaClient",
  "findUnique",
  ".update(",
  "$transaction",
  "createPasswordHash",
  "AGRI_SMALL_COHORT_PASSWORD_SETUP_ENABLED",
  "AGRI_SMALL_COHORT_PASSWORD_SETUP_CONFIRM",
  "SMALL_COHORT_PASSWORD_SETUP_CONFIRM",
  "candidatePasswords",
  "dryRun",
  "confirm",
  "writePerformed",
  "updatedUsers",
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/tester-small-cohort-password-setup-pilot",
]) requireText("route", route, fragment);

for (const fragment of [".create(", ".delete(", ".upsert(", ".createMany(", ".updateMany(", ".deleteMany("]) {
  forbidText("route destructive write safety", route, fragment);
}

requireText("ui", ui, "TesterSmallCohortPasswordSetupPilotPanel");
requireText("admin", admin, "OperationsTesterSmallCohortPasswordSetupPilot");
requireText("readme", readme, "Protected Small-Cohort Password Setup Pilot");
requireText("package", pkg, "ops:tester-small-cohort-password-setup-pilot-check");
requireText("runbook", runbook, "V21.8");
requireText("runbook", runbook, "ops:tester-small-cohort-password-setup-pilot-check");

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
  requireText(supportScript, content, "AGRI_V21_8_TESTER_SMALL_COHORT_PASSWORD_SETUP_PILOT_CHECK");
}

const summary = {
  ok: failures.length === 0,
  check: "ops-tester-small-cohort-password-setup-pilot-check",
  version: "V21.8",
  totalFailures: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length > 0) process.exit(1);
