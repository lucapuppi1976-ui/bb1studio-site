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
  engine: "src/lib/ai/aiPublicExportPackageWritePathGate.ts",
  route: "src/app/api/ops/ai-public-export-package-write-path-gate-dry-run/route.ts",
  ui: "src/app/ai/photo-diagnosis/PublicExportPackageWritePathGatePanel.tsx",
  admin: "src/app/admin/operations/OperationsAiPublicExportPackageWritePathGate.tsx",
  readme: "AI_PUBLIC_EXPORT_PACKAGE_WRITE_PATH_GATE_V17_4.md",
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

requireText("engine", engine, "buildAiPublicExportPackageWritePathGateReport");
requireText("engine", engine, "aiPublicExportPackageWritePathGateVersion");
requireText("engine", engine, "PublicExportPackageWritePathReport");
requireText("engine", engine, "PackageWriteGateItem");
requireText("engine", engine, "LegalPrivacyWriteApprovalItem");
requireText("engine", engine, "ExportArtifactBoundaryItem");
requireText("engine", engine, "publicExportPackageWritePathGateReady: true");
requireText("engine", engine, "legalPrivacyWriteApprovalLockReady: true");
requireText("engine", engine, "exportArtifactBoundaryReady: true");
requireText("engine", engine, "packageWriteNoGoReady: true");
requireText("engine", engine, "publicExportPackageWriteAllowed: false");
requireText("engine", engine, "publicExportArtifactWriteAllowed: false");
requireText("engine", engine, "publicationPackageWriteAllowed: false");

requireText("route", route, "export async function GET");
requireText("route", route, "export async function POST");
requireText("route", route, "CRON_SECRET");
requireText("route", route, "Accesso non consentito.");
requireText("route", route, "/api/ops/ai-public-export-package-write-path-gate-dry-run");

requireText("ui", ui, "PublicExportPackageWritePathGatePanel");
requireText("ui", ui, "Public Export Package Write Path Gate & Legal Privacy Write Approval Lock");

requireText("admin", admin, "OperationsAiPublicExportPackageWritePathGate");
requireText("admin", admin, "/api/ops/ai-public-export-package-write-path-gate-dry-run");

requireText("readme", readme, "AI Public Export Package Write Path Gate & Legal Privacy Write Approval Lock");
requireText("package", pkg, "ops:ai-public-export-package-write-path-gate-check");
requireText("runbook", runbook, "V17.4");
requireText("runbook", runbook, "ops:ai-public-export-package-write-path-gate-check");

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
  "explicitProviderApprovalAllowed",
  "explicitProviderApprovalPerformed",
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
  "complianceExportActivationAllowed",
  "complianceExportActivationPerformed",
  "publicComplianceExportPublicationAllowed",
  "publicComplianceExportPublicationPerformed",
  "publicExportPackageWriteAllowed",
  "publicExportPackageWritePerformed",
  "publicExportArtifactWriteAllowed",
  "publicExportArtifactWritePerformed",
  "publicationPackageWriteAllowed",
  "publicationPackageWritePerformed",
  "exportRetentionWriteAllowed",
  "exportRetentionWritePerformed",
  "exportAccessControlWriteAllowed",
  "exportAccessControlWritePerformed",
  "legalFinalApprovalAllowed",
  "legalFinalApprovalPerformed",
  "privacyFinalApprovalAllowed",
  "privacyFinalApprovalPerformed",
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
  "publicExportPackageWritePathGateReady",
  "legalPrivacyWriteApprovalLockReady",
  "exportArtifactBoundaryReady",
  "packageWriteNoGoReady",
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
  requireText(supportScript, content, "AGRI_V17_4_PUBLIC_EXPORT_PACKAGE_WRITE_PATH_GATE_CHECK");
}

const summary = {
  ok: failures.length === 0,
  check: "ops-ai-public-export-package-write-path-gate-check",
  version: "V17.4",
  totalFailures: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));

if (failures.length > 0) {
  process.exit(1);
}
