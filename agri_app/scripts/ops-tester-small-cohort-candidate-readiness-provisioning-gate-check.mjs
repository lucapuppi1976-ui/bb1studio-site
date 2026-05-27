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

const engine = readFile("src/lib/ops/testerSmallCohortCandidateReadinessProvisioningGate.ts");
const route = readFile("src/app/api/ops/tester-small-cohort-candidate-readiness-provisioning-gate-dry-run/route.ts");
const ui = readFile("src/app/ai/photo-diagnosis/TesterSmallCohortCandidateReadinessProvisioningGatePanel.tsx");
const admin = readFile("src/app/admin/operations/OperationsTesterSmallCohortCandidateReadinessProvisioningGate.tsx");
const readme = readFile("SMALL_COHORT_CANDIDATE_READINESS_PROVISIONING_GATE_V21_6.md");
const pkg = readFile("package.json");
const runbook = readFile("OPERATIONS_RUNBOOK_V4_14.md");

for (const fragment of [
  "buildTesterSmallCohortCandidateReadinessProvisioningReport",
  "testerSmallCohortCandidateReadinessProvisioningGateVersion",
  "TesterSmallCohortCandidateReadinessProvisioningReport",
  "TesterSmallCohortCandidateReadinessProvisioningBoardItem",
  "testerSmallCohortCandidateReadinessProvisioningGateReady: true",
  "smallCohortCandidateReadinessReady: true",
  "provisioningDecisionReady: true",
  "duplicateCandidateCheckReady: true",
  "existingUserReviewReady: true",
  "accountWritePilotPlanningReady: true",
  "passwordSetupPlanningReady: true",
  "manualEvidenceOnly: true",
  "readOnlyVerificationOnly: true",
  "PROTECTED_SMALL_COHORT_ACCOUNT_WRITE_PILOT_READY",
  "CANDIDATE_ACCESS_REVIEW_REQUIRED",
  "CANDIDATE_READINESS_INCOMPLETE",
  "FIX_BEFORE_PROVISIONING",
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
  "candidateProbes",
  "duplicateCandidateEmailDetected",
  "candidateExistingUserCount",
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "writePerformed: false",
  "/api/ops/tester-small-cohort-candidate-readiness-provisioning-gate-dry-run",
]) requireText("route", route, fragment);

for (const fragment of [".create(", ".update(", ".delete(", ".upsert(", ".createMany(", ".updateMany(", ".deleteMany("]) {
  forbidText("route write safety", route, fragment);
}

requireText("ui", ui, "TesterSmallCohortCandidateReadinessProvisioningGatePanel");
requireText("admin", admin, "OperationsTesterSmallCohortCandidateReadinessProvisioningGate");
requireText("readme", readme, "Small-Cohort Candidate Readiness");
requireText("package", pkg, "ops:tester-small-cohort-candidate-readiness-provisioning-gate-check");
requireText("runbook", runbook, "V21.6");
requireText("runbook", runbook, "ops:tester-small-cohort-candidate-readiness-provisioning-gate-check");

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
  requireText(supportScript, content, "AGRI_V21_6_TESTER_SMALL_COHORT_CANDIDATE_READINESS_PROVISIONING_GATE_CHECK");
}

const summary = {
  ok: failures.length === 0,
  check: "ops-tester-small-cohort-candidate-readiness-provisioning-gate-check",
  version: "V21.6",
  totalFailures: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length > 0) process.exit(1);
