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

const engine = readFile("src/lib/ai/aiTesterAccountActivationGate.ts");
const route = readFile("src/app/api/ops/ai-tester-account-activation-gate-dry-run/route.ts");
const ui = readFile("src/app/ai/photo-diagnosis/TesterAccountActivationGatePanel.tsx");
const admin = readFile("src/app/admin/operations/OperationsAiTesterAccountActivationGate.tsx");
const readme = readFile("AI_TESTER_ACCOUNT_ACTIVATION_GATE_V19_0.md");
const pkg = readFile("package.json");
const runbook = readFile("OPERATIONS_RUNBOOK_V4_14.md");

for (const fragment of [
  "buildAiTesterAccountActivationGateReport",
  "aiTesterAccountActivationGateVersion",
  "TesterActivationReport",
  "TesterActivationBoardItem",
  "testerAccountActivationGateReady: true",
  "inviteOnlyActivationReady: true",
  "manualProvisioningReadinessReady: true",
  "activationApprovalEvidenceReady: true",
  "roleAssignmentReadinessReady: true",
  "languageAssignmentReadinessReady: true",
  "revocationReadinessReady: true",
]) {
  requireText("engine", engine, fragment);
}

for (const fragment of [
  "publicSignupAllowed: false",
  "accountWriteAllowed: false",
  "testerAccountCreateAllowed: false",
  "testerInviteSendAllowed: false",
  "testerRoleWriteAllowed: false",
  "testerLanguageWriteAllowed: false",
  "testerAccessRevocationAllowed: false",
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
]) {
  requireText("guardrail", engine, fragment);
}

for (const fragment of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-tester-account-activation-gate-dry-run",
]) {
  requireText("route", route, fragment);
}

requireText("ui", ui, "TesterAccountActivationGatePanel");
requireText("admin", admin, "OperationsAiTesterAccountActivationGate");
requireText("readme", readme, "Invite-Only Tester Account Activation Gate");
requireText("package", pkg, "ops:ai-tester-account-activation-gate-check");
requireText("runbook", runbook, "V19.0");
requireText("runbook", runbook, "ops:ai-tester-account-activation-gate-check");

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
  requireText(supportScript, content, "AGRI_V19_0_TESTER_ACCOUNT_ACTIVATION_GATE_CHECK");
}

const summary = {
  ok: failures.length === 0,
  check: "ops-ai-tester-account-activation-gate-check",
  version: "V19.0",
  totalFailures: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));

if (failures.length > 0) {
  process.exit(1);
}
