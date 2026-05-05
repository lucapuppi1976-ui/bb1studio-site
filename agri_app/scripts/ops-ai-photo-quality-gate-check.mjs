#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");

const args = process.argv.slice(2);
const includeLive = args.includes("--include-live");
const baseArgIndex = args.indexOf("--base");
const baseUrl =
  baseArgIndex >= 0 && args[baseArgIndex + 1]
    ? args[baseArgIndex + 1].replace(/\/$/, "")
    : "https://bb1studio.com/agri_app";

const files = {
  route: "agri_app/src/app/api/ops/ai-photo-quality-gate/route.ts",
  gate: "agri_app/src/lib/ai/photoQualityGate.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/PhotoQualityGatePanel.tsx",
  page: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiPhotoQualityGate.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_PHOTO_QUALITY_GATE_V6_6.md",
  check: "agri_app/scripts/ops-ai-photo-quality-gate-check.mjs",
};

const failures = [];

function readRepoFile(relativePath) {
  const absolutePath = resolve(repoRoot, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let data = null;

  try {
    data = JSON.parse(text);
  } catch {
    data = null;
  }

  return {
    status: response.status,
    text,
    data,
  };
}

console.log("Agri App AI photo quality gate check V6.6");
console.log(`Repo root: ${repoRoot}`);
console.log(`Live checks: ${includeLive ? "yes" : "no"}`);
console.log(`Base URL: ${baseUrl}`);
console.log("");

console.log("--- File richiesti ---");

for (const file of Object.values(files)) {
  const ok = existsSync(resolve(repoRoot, file));
  console.log(`${ok ? "✓" : "✗"} ${file}`);

  if (!ok) {
    failures.push(`File mancante: ${file}`);
  }
}

const routeText = readRepoFile(files.route);
const gateText = readRepoFile(files.gate);
const clientText = readRepoFile(files.client);
const pageText = readRepoFile(files.page);
const adminPanelText = readRepoFile(files.adminPanel);
const operationsPageText = readRepoFile(files.operationsPage);
const readmeText = readRepoFile(files.readme);
const runbookText = readRepoFile("agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));

console.log("");
console.log("--- Quality gate engine ---");

for (const required of [
  "PhotoQualityInput",
  "PhotoQualityAssessment",
  "assessPhotoQuality",
  "formatPhotoQualityAssessment",
  "createValidPhotoQualityFixture",
  "createInvalidPhotoQualityFixture",
  "acceptedForAiPipeline",
  "grade",
  "score",
  "blockers",
  "warnings",
  "recommendations",
  "requiredNextPhotos",
  "providerCallsEnabled: false",
  "externalProviderCalled: false",
  "persistenceAllowed: false",
  "automaticTaskCreationAllowed: false",
  "automaticInterventionCreationAllowed: false",
  "humanReviewRequired: true",
]) {
  const ok = gateText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Quality gate engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops quality gate ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-photo-quality-gate",
  "assessPhotoQuality",
  "providerCallsEnabled: false",
  "externalProviderCalled: false",
  "persistenceAllowed: false",
  "automaticTaskCreationAllowed: false",
  "automaticInterventionCreationAllowed: false",
  "humanReviewRequired: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint quality gate incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI intake quality gate ---");

for (const required of [
  '"use client"',
  "AI Photo Quality Gate",
  "Controllo qualità foto prima della pipeline AI",
  'accept="image/jpeg,image/png,image/webp"',
  "URL.createObjectURL",
  "navigator.clipboard.writeText",
  "Copia quality report",
  "data-ai-photo-quality-gate",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI quality gate incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import PhotoQualityGatePanel from "./PhotoQualityGatePanel";',
  "<PhotoQualityGatePanel />",
]) {
  const ok = pageText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Integrazione pagina diagnosi foto mancante: ${required}`);
  }
}

console.log("");
console.log("--- Pannello admin operations ---");

for (const required of [
  "AI Photo Quality Gate",
  "Filtro qualità foto pre-diagnosi",
  "/api/ops/ai-photo-quality-gate",
  "externalProviderCalled=false",
  "humanReviewRequired=true",
  "data-ai-photo-quality-gate-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin quality gate incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiPhotoQualityGate from "./OperationsAiPhotoQualityGate";',
  "<OperationsAiPhotoQualityGate />",
]) {
  const ok = operationsPageText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Integrazione Operations Center mancante: ${required}`);
  }
}

console.log("");
console.log("--- Guardrail no AI live ---");

for (const [label, text] of [
  ["route", routeText],
  ["gate", gateText],
  ["client", clientText],
  ["adminPanel", adminPanelText],
]) {
  for (const forbidden of [
    "fetch(",
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "GEMINI_API_KEY",
    "GOOGLE_API_KEY",
    "secret=",
    "--secret",
    "localStorage",
    "sessionStorage",
    "prisma.",
    "db.",
  ]) {
    const ok = !text.includes(forbidden);
    console.log(`${ok ? "✓" : "✗"} ${label}: assente ${forbidden}`);

    if (!ok) {
      failures.push(`Pattern vietato in ${label}: ${forbidden}`);
    }
  }
}

const aiApiAbsent =
  !existsSync(resolve(repoRoot, "agri_app/src/app/api/ai")) &&
  !existsSync(resolve(repoRoot, "agri_app/src/app/api/diagnosis"));

console.log(`${aiApiAbsent ? "✓" : "✗"} endpoint AI/diagnosis live assenti`);

if (!aiApiAbsent) {
  failures.push("Endpoint AI/diagnosis presente prima della release provider.");
}

console.log("");
console.log("--- Documento e runbook ---");

for (const required of [
  "AI Photo Quality Gate V6.6",
  "/api/ops/ai-photo-quality-gate",
  "acceptedForAiPipeline",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "nessuna creazione automatica",
  "humanReviewRequired=true",
  "npm run ops:ai-photo-quality-gate-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README quality gate incompleto: ${required}`);
  }
}

for (const required of [
  "AI photo quality gate",
  "npm run ops:ai-photo-quality-gate-check",
]) {
  const ok = runbookText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Runbook non aggiornato: ${required}`);
  }
}

console.log("");
console.log("--- Alias npm ---");

for (const scriptName of [
  "ops:ai-photo-quality-gate-check",
  "ops:ai-pipeline-dry-run-check",
  "ops:ai-provider-response-check",
  "ops:ai-provider-dry-run-check",
  "ops:ai-provider-status-check",
  "ops:ai-provider-safety-check",
  "ops:quick-check",
  "ops:quick-coverage-check",
  "ops:runbook-check",
]) {
  const ok = Boolean(packageJson.scripts?.[scriptName]);
  console.log(`${ok ? "✓" : "✗"} ${scriptName}`);

  if (!ok) {
    failures.push(`Alias npm mancante: ${scriptName}`);
  }
}

if (includeLive) {
  console.log("");
  console.log("--- Live photo quality gate protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJson(`${baseUrl}/api/ops/ai-photo-quality-gate`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint quality gate non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const liveValid = await fetchJson(
      `${baseUrl}/api/ops/ai-photo-quality-gate?secret=${encodeURIComponent(secret)}`,
    );

    console.log(`HTTP status valid fixture: ${liveValid.status}`);

    if (
      liveValid.status !== 200 ||
      !liveValid.data?.ok ||
      liveValid.data?.assessment?.acceptedForAiPipeline !== true
    ) {
      failures.push(`Valid fixture quality gate non OK: HTTP ${liveValid.status}`);
    } else {
      console.log("✓ valid fixture accettata per pipeline AI");
    }

    const liveInvalid = await fetchJson(
      `${baseUrl}/api/ops/ai-photo-quality-gate?secret=${encodeURIComponent(secret)}&sample=invalid`,
    );

    console.log(`HTTP status invalid fixture: ${liveInvalid.status}`);

    if (
      liveInvalid.status !== 200 ||
      !liveInvalid.data?.ok ||
      liveInvalid.data?.assessment?.acceptedForAiPipeline !== false
    ) {
      failures.push(`Invalid fixture quality gate non respinta correttamente: HTTP ${liveInvalid.status}`);
    } else {
      console.log("✓ invalid fixture respinta dal quality gate");
    }

    const livePost = await fetchJson(
      `${baseUrl}/api/ops/ai-photo-quality-gate?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            fileName: "quality-gate-live.webp",
            mimeType: "image/webp",
            sizeBytes: 1400000,
            widthPx: 1800,
            heightPx: 1200,
            photoCount: 3,
            includesWholePlant: true,
            includesCloseUp: true,
            includesUnderside: true,
            hasPlantContext: true,
            hasSymptoms: true,
            hasLocationHint: true,
            operatorNotes: "Test live protetto quality gate con contesto completo.",
          },
        }),
      },
    );

    console.log(`HTTP status POST quality gate: ${livePost.status}`);

    if (
      livePost.status !== 200 ||
      !livePost.data?.ok ||
      livePost.data?.assessment?.acceptedForAiPipeline !== true
    ) {
      failures.push(`POST quality gate non OK: HTTP ${livePost.status}`);
    } else {
      console.log("✓ POST quality gate accettato");
    }
  }
}

console.log("");
console.log("--- AI photo quality gate check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI photo quality gate check completato con successo.");
