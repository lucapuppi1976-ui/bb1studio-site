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
    failures.push(`File mancante: ${relativePath}`);
    return "";
  }

  return fs.readFileSync(absolutePath, "utf8");
}

function requireText(label, content, fragment) {
  if (!content.includes(fragment)) {
    failures.push(`${label}: manca "${fragment}"`);
  }
}

function forbidText(label, content, fragment) {
  if (content.includes(fragment)) {
    failures.push(`${label}: pattern vietato "${fragment}"`);
  }
}

const files = {
  engine: "src/lib/ai/aiOperationalExecutionGate.ts",
  route: "src/app/api/ops/ai-operational-execution-gate-dry-run/route.ts",
  ui: "src/app/ai/photo-diagnosis/OperationalExecutionGatePanel.tsx",
  admin: "src/app/admin/operations/OperationsAiOperationalExecutionGate.tsx",
  readme: "AI_OPERATIONAL_EXECUTION_GATE_V17_9.md",
  pkg: "package.json",
  runbook: "OPERATIONS_RUNBOOK_V4_14.md",
};

const engine = readFile(files.engine);
const route = readFile(files.route);
const ui = readFile(files.ui);
const admin = readFile(files.admin);
const readme = readFile(files.readme);
const pkg = readFile(files.pkg);
const runbook = readFile(files.runbook);

requireText("engine", engine, "buildAiOperationalExecutionGateReport");
requireText("engine", engine, "aiOperationalExecutionGateVersion");
requireText("engine", engine, "OperationalExecutionReport");
requireText("engine", engine, "OperationalExecutionGateItem");
requireText("engine", engine, "ExplicitHumanApprovalItem");
requireText("engine", engine, "ExecutionCommandBoundaryItem");
requireText("engine", engine, "operationalExecutionGateReady: true");
requireText("engine", engine, "explicitHumanApprovalLockReady: true");
requireText("engine", engine, "executionCommandBoundaryReady: true");
requireText("engine", engine, "executionNoGoReady: true");
requireText("engine", engine, "operationalExecutionAllowed: false");
requireText("engine", engine, "executionCommandAllowed: false");
requireText("engine", engine, "humanExecutionApprovalAllowed: false");

requireText("route", route, "export async function GET");
requireText("route", route, "export async function POST");
requireText("route", route, "CRON_SECRET");
requireText("route", route, "Accesso non consentito.");
requireText("route", route, "/api/ops/ai-operational-execution-gate-dry-run");

requireText("ui", ui, "OperationalExecutionGatePanel");
requireText("ui", ui, "Operational Execution Gate & Explicit Human Approval Lock");

requireText("admin", admin, "OperationsAiOperationalExecutionGate");
requireText("admin", admin, "/api/ops/ai-operational-execution-gate-dry-run");

requireText("readme", readme, "AI Operational Execution Gate & Explicit Human Approval Lock");
requireText("package", pkg, "ops:ai-operational-execution-gate-check");
requireText("runbook", runbook, "V17.9");
requireText("runbook", runbook, "ops:ai-operational-execution-gate-check");

const falseFlags = [
  "providerAiReady",
  "persistenceReady",
  "memoryPersistenceReady",
  "automaticTaskCreationReady",
  "automaticInterventionCreationReady",
  "automaticExecutionReady",
  "providerCalled",
  "persistencePerformed",
  "memoryPersistencePerformed",
  "taskCreated",
  "interventionCreated",
  "automaticExecutionPerformed",
  "publicSharePerformed",
  "productPrescriptionPerformed",
  "dosageAdvicePerformed",
  "automaticTaskCreationAllowed",
  "automaticInterventionCreationAllowed",
  "automaticExecutionAllowed",
  "dbPersistenceAllowed",
  "memoryPersistenceAllowed",
  "publicShareAllowed",
  "productPrescriptionAllowed",
  "dosageAdviceAllowed",
  "memoryPromotionAllowed",
  "memoryQualityWriteAllowed",
  "memoryPromotionPerformed",
  "memoryQualityWritePerformed",
  "operationalAiReady",
  "controlledBetaAllowed",
  "controlledBetaPerformed",
  "productionBetaAllowed",
  "productionBetaPerformed",
  "providerActivationAllowed",
  "providerActivationPerformed",
  "providerRuntimeBetaAllowed",
  "providerRuntimeBetaPerformed",
  "providerRuntimeCanaryAllowed",
  "providerRuntimeCanaryPerformed",
  "providerCanaryCallAllowed",
  "providerCanaryCallPerformed",
  "providerCanaryCallExecutionAllowed",
  "providerCanaryCallExecutionPerformed",
  "providerCallExecutionAllowed",
  "providerCallExecutionPerformed",
  "explicitProviderApprovalAllowed",
  "explicitProviderApprovalPerformed",
  "providerRequestDispatchAllowed",
  "providerRequestDispatchPerformed",
  "providerResponseIntakeAllowed",
  "providerResponseIntakePerformed",
  "providerResponseReviewAllowed",
  "providerResponseReviewPerformed",
  "providerResultPersistenceAllowed",
  "providerResultPersistencePerformed",
  "providerRequestSendAllowed",
  "providerRequestSendPerformed",
  "providerResultReviewAllowed",
  "providerResultReviewPerformed",
  "canaryExecutionAllowed",
  "canaryExecutionPerformed",
  "canaryResultPersistenceAllowed",
  "canaryResultPersistencePerformed",
  "explicitActivationApprovalAllowed",
  "explicitActivationApprovalPerformed",
  "productionRuntimeAllowed",
  "productionRuntimePerformed",
  "casePersistenceActivationAllowed",
  "casePersistencePerformed",
  "storageActivationAllowed",
  "storageActivationPerformed",
  "liveMigrationExecutionAllowed",
  "liveMigrationExecutionPerformed",
  "migrationExecutionAllowed",
  "migrationExecutionPerformed",
  "schemaWriteAllowed",
  "schemaWritePerformed",
  "automationActivationAllowed",
  "reviewPersistenceAllowed",
  "reviewPersistencePerformed",
  "manualConversionAllowed",
  "manualConversionPerformed",
  "providerCallAllowed",
  "providerCallPerformed",
  "complianceExportAllowed",
  "complianceExportPerformed",
  "publicComplianceExportPublicationAllowed",
  "publicComplianceExportPublicationPerformed",
  "publicExportPackageWriteAllowed",
  "publicExportPackageWritePerformed",
  "publicExportArtifactWriteAllowed",
  "publicExportArtifactWritePerformed",
  "manualDispatchActivationAllowed",
  "manualDispatchActivationPerformed",
  "manualDispatchWritePathAllowed",
  "manualDispatchWritePathPerformed",
  "taskInterventionCreationAllowed",
  "taskInterventionCreationPerformed",
  "incidentHandlingAllowed",
  "incidentHandlingPerformed",
  "incidentWriteAllowed",
  "incidentWritePerformed",
  "incidentHandlingWritePathAllowed",
  "incidentHandlingWritePathPerformed",
  "incidentRecordWriteAllowed",
  "incidentRecordWritePerformed",
  "operationalExecutionAllowed",
  "operationalExecutionPerformed",
  "executionPreflightAllowed",
  "executionPreflightPerformed",
  "executionCommandAllowed",
  "executionCommandPerformed",
  "executionNotificationAllowed",
  "executionNotificationPerformed",
  "emergencyStopConfigured",
  "emergencyStopPerformed",
  "humanExecutionApprovalAllowed",
  "humanExecutionApprovalPerformed",
];

const trueFlags = [
  "manualDispatchOnly",
  "humanReviewRequired",
  "localAnalysisOnly",
  "redactedOutputOnly",
  "localMemoryOnly",
  "localLearningOnly",
  "localPromotionOnly",
  "localQualityOnly",
  "onlineControlledReady",
  "zeroActivationMode",
  "operationalExecutionGateReady",
  "explicitHumanApprovalLockReady",
  "executionCommandBoundaryReady",
  "executionNoGoReady",
];

for (const flag of falseFlags) {
  requireText(`guardrail false ${flag}`, engine, `${flag}: false`);
}

for (const flag of trueFlags) {
  requireText(`guardrail true ${flag}`, engine, `${flag}: true`);
}

const forbidden = [
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
];

for (const [label, content] of [
  ["engine", engine],
  ["route", route],
  ["ui", ui],
  ["admin", admin],
]) {
  for (const fragment of forbidden) {
    forbidText(label, content, fragment);
  }
}

const runtimeForbidden = [
  ["s", "k-"].join(""),
  "secret",
  "sensitive",
  "token",
  "credential",
  "password",
  "authorization",
  "bearer",
  "process.env",
];

for (const fragment of runtimeForbidden) {
  forbidText("runtime engine readiness compatibility", engine.toLowerCase(), fragment.toLowerCase());
}

for (const forbiddenDir of ["src/app/api/ai", "src/app/api/diagnosis"]) {
  if (fs.existsSync(path.join(appRoot, forbiddenDir))) {
    failures.push(`Directory endpoint AI non autorizzata: ${forbiddenDir}`);
  }
}

for (const supportScript of [
  "scripts/ops-runbook-check.mjs",
  "scripts/ops-quick-check.mjs",
  "scripts/ops-quick-coverage-check.mjs",
]) {
  const content = readFile(supportScript);
  requireText(supportScript, content, "AGRI_V17_9_OPERATIONAL_EXECUTION_GATE_CHECK");
}

const summary = {
  ok: failures.length === 0,
  check: "ops-ai-operational-execution-gate-check",
  version: "V17.9",
  totalFailures: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));

if (failures.length > 0) {
  process.exit(1);
}
