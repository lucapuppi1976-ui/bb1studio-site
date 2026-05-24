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

const engine = readFile("src/lib/ops/testerSecondTesterLoginSessionOnboardingGate.ts");
const route = readFile("src/app/api/ops/tester-second-tester-login-session-onboarding-gate-dry-run/route.ts");
const ui = readFile("src/app/ai/photo-diagnosis/TesterSecondTesterLoginSessionOnboardingGatePanel.tsx");
const admin = readFile("src/app/admin/operations/OperationsTesterSecondTesterLoginSessionOnboardingGate.tsx");
const readme = readFile("SECOND_TESTER_LOGIN_SESSION_ONBOARDING_GATE_V21_1.md");
const pkg = readFile("package.json");
const runbook = readFile("OPERATIONS_RUNBOOK_V4_14.md");

for (const fragment of [
  "buildTesterSecondTesterLoginSessionOnboardingReport",
  "testerSecondTesterLoginSessionOnboardingGateVersion",
  "TesterSecondTesterLoginSessionOnboardingReport",
  "TesterSecondTesterLoginSessionOnboardingBoardItem",
  "testerSecondTesterLoginSessionOnboardingGateReady: true",
  "secondTesterLoginSessionVerificationReady: true",
  "secondTesterManualOnboardingGateReady: true",
  "accountExistenceCheckReady: true",
  "roleCompatibilityCheckReady: true",
  "passwordHashCheckReady: true",
  "sessionObservationReady: true",
  "manualLoginObservationReady: true",
  "onboardingEvidenceReady: true",
  "manualEvidenceOnly: true",
  "readOnlyVerificationOnly: true",
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
  "/api/ops/tester-second-tester-login-session-onboarding-gate-dry-run",
]) requireText("route", route, fragment);

for (const fragment of [".create(", ".update(", ".delete(", ".upsert(", ".createMany(", ".updateMany(", ".deleteMany("]) {
  forbidText("route write safety", route, fragment);
}

requireText("ui", ui, "TesterSecondTesterLoginSessionOnboardingGatePanel");
requireText("admin", admin, "OperationsTesterSecondTesterLoginSessionOnboardingGate");
requireText("readme", readme, "Second Tester Login Session");
requireText("package", pkg, "ops:tester-second-tester-login-session-onboarding-gate-check");
requireText("runbook", runbook, "V21.1");
requireText("runbook", runbook, "ops:tester-second-tester-login-session-onboarding-gate-check");

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
  requireText(supportScript, content, "AGRI_V21_1_TESTER_SECOND_TESTER_LOGIN_SESSION_ONBOARDING_GATE_CHECK");
}

const summary = {
  ok: failures.length === 0,
  check: "ops-tester-second-tester-login-session-onboarding-gate-check",
  version: "V21.1",
  totalFailures: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length > 0) process.exit(1);
