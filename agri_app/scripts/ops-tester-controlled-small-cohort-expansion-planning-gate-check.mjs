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

const engine = readFile("src/lib/ops/testerControlledSmallCohortExpansionPlanningGate.ts");
const route = readFile("src/app/api/ops/tester-controlled-small-cohort-expansion-planning-gate-dry-run/route.ts");
const ui = readFile("src/app/ai/photo-diagnosis/TesterControlledSmallCohortExpansionPlanningGatePanel.tsx");
const admin = readFile("src/app/admin/operations/OperationsTesterControlledSmallCohortExpansionPlanningGate.tsx");
const readme = readFile("CONTROLLED_SMALL_COHORT_EXPANSION_PLANNING_GATE_V21_5.md");
const pkg = readFile("package.json");
const runbook = readFile("OPERATIONS_RUNBOOK_V4_14.md");

for (const fragment of [
  "buildTesterControlledSmallCohortExpansionPlanningReport",
  "testerControlledSmallCohortExpansionPlanningGateVersion",
  "TesterControlledSmallCohortExpansionPlanningReport",
  "TesterControlledSmallCohortExpansionPlanningBoardItem",
  "testerControlledSmallCohortExpansionPlanningGateReady: true",
  "controlledSmallCohortPlanningReady: true",
  "candidateCohortPlanReady: true",
  "onboardingPlanReady: true",
  "supportCapacityReviewReady: true",
  "rollbackReadinessReviewReady: true",
  "expansionHumanApprovalReady: true",
  "manualEvidenceOnly: true",
  "readOnlyVerificationOnly: true",
  "CONTROLLED_SMALL_COHORT_PLAN_READY",
  "COHORT_PLANNING_INCOMPLETE",
  "CONTINUE_DUAL_TESTER_UAT",
  "FIX_BEFORE_COHORT",
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
  "/api/ops/tester-controlled-small-cohort-expansion-planning-gate-dry-run",
]) requireText("route", route, fragment);

for (const fragment of [".create(", ".update(", ".delete(", ".upsert(", ".createMany(", ".updateMany(", ".deleteMany("]) {
  forbidText("route write safety", route, fragment);
}

requireText("ui", ui, "TesterControlledSmallCohortExpansionPlanningGatePanel");
requireText("admin", admin, "OperationsTesterControlledSmallCohortExpansionPlanningGate");
requireText("readme", readme, "Controlled Small-Cohort Tester Expansion Planning Gate");
requireText("package", pkg, "ops:tester-controlled-small-cohort-expansion-planning-gate-check");
requireText("runbook", runbook, "V21.5");
requireText("runbook", runbook, "ops:tester-controlled-small-cohort-expansion-planning-gate-check");

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
  requireText(supportScript, content, "AGRI_V21_5_TESTER_CONTROLLED_SMALL_COHORT_EXPANSION_PLANNING_GATE_CHECK");
}

const summary = {
  ok: failures.length === 0,
  check: "ops-tester-controlled-small-cohort-expansion-planning-gate-check",
  version: "V21.5",
  totalFailures: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length > 0) process.exit(1);
