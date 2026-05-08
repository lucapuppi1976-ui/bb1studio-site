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
  engine: "src/lib/ai/aiAgronomicImprovementScorecard.ts",
  route: "src/app/api/ops/ai-agronomic-improvement-scorecard-dry-run/route.ts",
  ui: "src/app/ai/photo-diagnosis/AgronomicImprovementScorecardPanel.tsx",
  admin: "src/app/admin/operations/OperationsAiAgronomicImprovementScorecard.tsx",
  readme: "AI_AGRONOMIC_IMPROVEMENT_SCORECARD_V11_5.md",
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

requireText("engine", engine, "buildAiAgronomicImprovementScorecardReport");
requireText("engine", engine, "aiAgronomicImprovementScorecardVersion");
requireText("engine", engine, "AgronomicImprovementScorecardReport");
requireText("engine", engine, "ImprovementSourceNode");
requireText("engine", engine, "ResilienceScorecardItem");
requireText("engine", engine, "ImprovementBacklogItem");
requireText("engine", engine, "MaturityModelStage");
requireText("engine", engine, "improvementScorecardReady: true");
requireText("engine", engine, "resilienceScorecardReady: true");
requireText("engine", engine, "roadmapReviewReady: true");
requireText("engine", engine, "maturityModelReady: true");

requireText("route", route, "export async function GET");
requireText("route", route, "export async function POST");
requireText("route", route, "CRON_SECRET");
requireText("route", route, "Accesso non consentito.");
requireText("route", route, "/api/ops/ai-agronomic-improvement-scorecard-dry-run");

requireText("ui", ui, "AgronomicImprovementScorecardPanel");
requireText("ui", ui, "Agronomic Continuous Improvement & Resilience Scorecard Kernel");

requireText("admin", admin, "OperationsAiAgronomicImprovementScorecard");
requireText("admin", admin, "/api/ops/ai-agronomic-improvement-scorecard-dry-run");

requireText("readme", readme, "AI Agronomic Continuous Improvement & Resilience Scorecard Kernel");
requireText("package", pkg, "ops:ai-agronomic-improvement-scorecard-check");
requireText("runbook", runbook, "V11.5");
requireText("runbook", runbook, "ops:ai-agronomic-improvement-scorecard-check");

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
  requireText(supportScript, content, "AGRI_V11_5_AGRONOMIC_IMPROVEMENT_SCORECARD_CHECK");
}

const summary = {
  ok: failures.length === 0,
  check: "ops-ai-agronomic-improvement-scorecard-check",
  version: "V11.5",
  totalFailures: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));

if (failures.length > 0) {
  process.exit(1);
}
