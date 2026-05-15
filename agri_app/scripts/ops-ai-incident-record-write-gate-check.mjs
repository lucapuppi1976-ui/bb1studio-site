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
  engine: "src/lib/ai/aiIncidentRecordWriteGate.ts",
  route: "src/app/api/ops/ai-incident-record-write-gate-dry-run/route.ts",
  ui: "src/app/ai/photo-diagnosis/IncidentRecordWriteGatePanel.tsx",
  admin: "src/app/admin/operations/OperationsAiIncidentRecordWriteGate.tsx",
  readme: "AI_INCIDENT_RECORD_WRITE_GATE_V17_7.md",
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

requireText("engine", engine, "buildAiIncidentRecordWriteGateReport");
requireText("engine", engine, "aiIncidentRecordWriteGateVersion");
requireText("engine", engine, "IncidentRecordWriteReport");
requireText("engine", engine, "IncidentRecordWriteGateItem");
requireText("engine", engine, "IncidentGovernanceFinalApprovalItem");
requireText("engine", engine, "IncidentTimelineBoundaryItem");
requireText("engine", engine, "incidentRecordWriteGateReady: true");
requireText("engine", engine, "incidentGovernanceFinalApprovalLockReady: true");
requireText("engine", engine, "incidentTimelineAuditBoundaryReady: true");
requireText("engine", engine, "incidentRecordNoGoReady: true");
requireText("engine", engine, "incidentRecordWriteAllowed: false");
requireText("engine", engine, "incidentTimelineWriteAllowed: false");
requireText("engine", engine, "incidentAuditWriteAllowed: false");

requireText("route", route, "export async function GET");
requireText("route", route, "export async function POST");
requireText("route", route, "CRON_SECRET");
requireText("route", route, "Accesso non consentito.");
requireText("route", route, "/api/ops/ai-incident-record-write-gate-dry-run");

requireText("ui", ui, "IncidentRecordWriteGatePanel");
requireText("ui", ui, "Incident Record Write Gate & Incident Governance Final Approval Lock");

requireText("admin", admin, "OperationsAiIncidentRecordWriteGate");
requireText("admin", admin, "/api/ops/ai-incident-record-write-gate-dry-run");

requireText("readme", readme, "AI Incident Record Write Gate & Incident Governance Final Approval Lock");
requireText("package", pkg, "ops:ai-incident-record-write-gate-check");
requireText("runbook", runbook, "V17.7");
requireText("runbook", runbook, "ops:ai-incident-record-write-gate-check");

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
  "incidentTimelineWriteAllowed",
  "incidentTimelineWritePerformed",
  "incidentAuditWriteAllowed",
  "incidentAuditWritePerformed",
  "incidentRetentionWriteAllowed",
  "incidentRetentionWritePerformed",
  "incidentClosureEligibilityWriteAllowed",
  "incidentClosureEligibilityWritePerformed",
  "incidentClosureWriteAllowed",
  "incidentClosureWritePerformed",
  "incidentNotificationAllowed",
  "incidentNotificationPerformed",
  "incidentGovernanceFinalApprovalAllowed",
  "incidentGovernanceFinalApprovalPerformed",
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
  "incidentRecordWriteGateReady",
  "incidentGovernanceFinalApprovalLockReady",
  "incidentTimelineAuditBoundaryReady",
  "incidentRecordNoGoReady",
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
  requireText(supportScript, content, "AGRI_V17_7_INCIDENT_RECORD_WRITE_GATE_CHECK");
}

const summary = {
  ok: failures.length === 0,
  check: "ops-ai-incident-record-write-gate-check",
  version: "V17.7",
  totalFailures: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));

if (failures.length > 0) {
  process.exit(1);
}
