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

const engine = readFile("src/lib/ai/aiUatFeedbackBugEvidenceSession.ts");
const route = readFile("src/app/api/ops/ai-uat-feedback-bug-evidence-session-dry-run/route.ts");
const ui = readFile("src/app/ai/photo-diagnosis/UatFeedbackBugEvidenceSessionPanel.tsx");
const admin = readFile("src/app/admin/operations/OperationsAiUatFeedbackBugEvidenceSession.tsx");
const readme = readFile("AI_UAT_FEEDBACK_BUG_EVIDENCE_SESSION_V18_8.md");
const pkg = readFile("package.json");
const runbook = readFile("OPERATIONS_RUNBOOK_V4_14.md");

for (const fragment of [
  "buildAiUatFeedbackBugEvidenceSessionReport",
  "aiUatFeedbackBugEvidenceSessionVersion",
  "UatSessionReport",
  "UatSessionBoardItem",
  "uatFeedbackBugEvidenceSessionReady: true",
  "sessionFeedbackBoardReady: true",
  "bugTriageBoardReady: true",
  "evidenceCaptureBoardReady: true",
  "passFailReviewBoardReady: true",
  "reviewerDecisionBoardReady: true",
  "rollbackGateReady: true",
]) {
  requireText("engine", engine, fragment);
}

for (const fragment of [
  "feedbackWriteAllowed: false",
  "feedbackPersistenceAllowed: false",
  "bugWriteAllowed: false",
  "bugPersistenceAllowed: false",
  "evidenceWriteAllowed: false",
  "evidencePersistenceAllowed: false",
  "sessionWriteAllowed: false",
  "sessionPersistenceAllowed: false",
  "publicSignupAllowed: false",
  "accountWriteAllowed: false",
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
  "/api/ops/ai-uat-feedback-bug-evidence-session-dry-run",
]) {
  requireText("route", route, fragment);
}

requireText("ui", ui, "UatFeedbackBugEvidenceSessionPanel");
requireText("admin", admin, "OperationsAiUatFeedbackBugEvidenceSession");
requireText("readme", readme, "UAT Feedback, Bug Triage");
requireText("package", pkg, "ops:ai-uat-feedback-bug-evidence-session-check");
requireText("runbook", runbook, "V18.8");
requireText("runbook", runbook, "ops:ai-uat-feedback-bug-evidence-session-check");

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
  requireText(supportScript, content, "AGRI_V18_8_UAT_FEEDBACK_BUG_EVIDENCE_SESSION_CHECK");
}

const summary = {
  ok: failures.length === 0,
  check: "ops-ai-uat-feedback-bug-evidence-session-check",
  version: "V18.8",
  totalFailures: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));

if (failures.length > 0) {
  process.exit(1);
}
