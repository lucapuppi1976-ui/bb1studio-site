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
  route: "agri_app/src/app/api/ops/ai-provider-request-preview/route.ts",
  engine: "agri_app/src/lib/ai/photoDiagnosisProviderRequest.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/AiProviderRequestPreviewPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiProviderRequestPreview.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_PROVIDER_REQUEST_PREVIEW_V6_8.md",
  check: "agri_app/scripts/ops-ai-provider-request-check.mjs",
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

console.log("Agri App AI provider request preview check V6.8");
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
const engineText = readRepoFile(files.engine);
const clientText = readRepoFile(files.client);
const photoPageText = readRepoFile(files.photoPage);
const adminPanelText = readRepoFile(files.adminPanel);
const operationsPageText = readRepoFile(files.operationsPage);
const readmeText = readRepoFile(files.readme);
const runbookText = readRepoFile("agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));

console.log("");
console.log("--- Provider request engine ---");

for (const required of [
  "AiProviderRequestPreviewInput",
  "AiProviderRequestPreview",
  "createAiProviderRequestPreview",
  "formatAiProviderRequestPreview",
  "providerPayload",
  "systemInstruction",
  "userInstruction",
  "expectedJsonSchema",
  "evidenceSummary",
  "requestReady",
  "requestedOutputs",
  "providerCallsEnabled: false",
  "externalProviderCalled: false",
  "clientProviderCallsAllowed: false",
  "persistenceAllowed: false",
  "automaticTaskCreationAllowed: false",
  "automaticInterventionCreationAllowed: false",
  "humanReviewRequired: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Provider request engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops provider request preview ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-provider-request-preview",
  "createAiProviderRequestPreview",
  "providerCallsEnabled: false",
  "externalProviderCalled: false",
  "clientProviderCallsAllowed: false",
  "persistenceAllowed: false",
  "automaticTaskCreationAllowed: false",
  "automaticInterventionCreationAllowed: false",
  "humanReviewRequired: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint provider request preview incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI provider request preview ---");

for (const required of [
  '"use client"',
  "AI Provider Request Preview",
  "Anteprima richiesta provider AI",
  "providerCallsEnabled=false",
  "externalProviderCalled=false",
  "clientProviderCallsAllowed=false",
  "humanReviewRequired=true",
  "Copia provider payload JSON",
  "navigator.clipboard.writeText",
  "data-ai-provider-request-preview",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI provider request preview incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import AiProviderRequestPreviewPanel from "./AiProviderRequestPreviewPanel";',
  "<AiProviderRequestPreviewPanel />",
]) {
  const ok = photoPageText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Integrazione pagina diagnosi foto mancante: ${required}`);
  }
}

console.log("");
console.log("--- Pannello admin operations ---");

for (const required of [
  "AI Provider Request Preview",
  "Request preview per futuro provider AI",
  "/api/ops/ai-provider-request-preview",
  "externalProviderCalled=false",
  "clientProviderCallsAllowed=false",
  "humanReviewRequired=true",
  "data-ai-provider-request-preview-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin provider request incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiProviderRequestPreview from "./OperationsAiProviderRequestPreview";',
  "<OperationsAiProviderRequestPreview />",
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
  ["engine", engineText],
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
  "AI Provider Request Preview V6.8",
  "/api/ops/ai-provider-request-preview",
  "providerPayload",
  "expectedJsonSchema",
  "systemInstruction",
  "userInstruction",
  "requestReady",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "humanReviewRequired=true",
  "npm run ops:ai-provider-request-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README provider request preview incompleto: ${required}`);
  }
}

for (const required of [
  "AI provider request preview",
  "npm run ops:ai-provider-request-check",
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
  "ops:ai-provider-request-check",
  "ops:ai-evidence-bundle-check",
  "ops:ai-photo-quality-gate-check",
  "ops:ai-pipeline-dry-run-check",
  "ops:ai-provider-response-check",
  "ops:ai-provider-dry-run-check",
  "ops:ai-provider-status-check",
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
  console.log("--- Live provider request preview protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJson(`${baseUrl}/api/ops/ai-provider-request-preview`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint provider request preview non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const liveValid = await fetchJson(
      `${baseUrl}/api/ops/ai-provider-request-preview?secret=${encodeURIComponent(secret)}`,
    );

    console.log(`HTTP status provider request valid: ${liveValid.status}`);

    if (
      liveValid.status !== 200 ||
      !liveValid.data?.ok ||
      liveValid.data?.requestPreview?.providerPayload?.constraints?.providerCallsEnabled !== false ||
      liveValid.data?.requestPreview?.providerPayload?.constraints?.humanReviewRequired !== true
    ) {
      failures.push(`Provider request preview valid non OK: HTTP ${liveValid.status}`);
    } else {
      console.log("✓ provider request preview live generato senza chiamata provider");
    }

    const liveIncomplete = await fetchJson(
      `${baseUrl}/api/ops/ai-provider-request-preview?secret=${encodeURIComponent(secret)}&sample=incomplete`,
    );

    console.log(`HTTP status provider request incomplete: ${liveIncomplete.status}`);

    if (
      liveIncomplete.status !== 200 ||
      !liveIncomplete.data?.ok ||
      liveIncomplete.data?.requestPreview?.requestReady !== false
    ) {
      failures.push(`Provider request incomplete non marcato correttamente: HTTP ${liveIncomplete.status}`);
    } else {
      console.log("✓ provider request incomplete marcato non ready");
    }

    const livePost = await fetchJson(
      `${baseUrl}/api/ops/ai-provider-request-preview?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            plantContext: "vite in filare",
            locationHint: "serra nord",
            symptoms: ["macchie fogliari", "ingiallimento"],
            suspectedCrop: "vite",
            operatorNotes: "Test live protetto provider request preview.",
            urgency: "medium",
            locale: "it-IT",
            requestedOutputs: ["diagnosis", "severity", "evidence", "action-plan", "human-review"],
            photos: [
              {
                id: "close",
                role: "symptom-close-up",
                caption: "Dettaglio sintomo",
                fileName: "close.webp",
                mimeType: "image/webp",
                sizeBytes: 1200000,
                widthPx: 1600,
                heightPx: 1200,
                includesCloseUp: true,
                includesWholePlant: false,
                includesUnderside: false,
              },
              {
                id: "whole",
                role: "whole-plant",
                caption: "Pianta intera",
                fileName: "whole.webp",
                mimeType: "image/webp",
                sizeBytes: 1300000,
                widthPx: 1600,
                heightPx: 1200,
                includesCloseUp: false,
                includesWholePlant: true,
                includesUnderside: false,
              },
              {
                id: "underside",
                role: "leaf-underside",
                caption: "Pagina inferiore",
                fileName: "underside.webp",
                mimeType: "image/webp",
                sizeBytes: 1100000,
                widthPx: 1600,
                heightPx: 1200,
                includesCloseUp: true,
                includesWholePlant: false,
                includesUnderside: true,
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST provider request preview: ${livePost.status}`);

    if (
      livePost.status !== 200 ||
      !livePost.data?.ok ||
      livePost.data?.requestPreview?.providerPayload?.constraints?.externalProviderCalled !== false
    ) {
      failures.push(`POST provider request preview non OK: HTTP ${livePost.status}`);
    } else {
      console.log("✓ POST provider request preview generato con provider disabilitato");
    }
  }
}

console.log("");
console.log("--- AI provider request preview check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI provider request preview check completato con successo.");
