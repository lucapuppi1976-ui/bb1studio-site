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
  route: "agri_app/src/app/api/ops/ai-photo-evidence-bundle/route.ts",
  bundle: "agri_app/src/lib/ai/photoEvidenceBundle.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/PhotoEvidenceBundleBuilder.tsx",
  page: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiEvidenceBundle.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_PHOTO_EVIDENCE_BUNDLE_V6_7.md",
  check: "agri_app/scripts/ops-ai-evidence-bundle-check.mjs",
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

console.log("Agri App AI photo evidence bundle check V6.7");
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
const bundleText = readRepoFile(files.bundle);
const clientText = readRepoFile(files.client);
const pageText = readRepoFile(files.page);
const adminPanelText = readRepoFile(files.adminPanel);
const operationsPageText = readRepoFile(files.operationsPage);
const readmeText = readRepoFile(files.readme);
const runbookText = readRepoFile("agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));

console.log("");
console.log("--- Evidence bundle engine ---");

for (const required of [
  "PhotoEvidenceBundleInput",
  "PhotoEvidenceBundle",
  "createPhotoEvidenceBundle",
  "formatPhotoEvidenceBundle",
  "createValidEvidenceBundleFixture",
  "createIncompleteEvidenceBundleFixture",
  "providerReadyPayload",
  "missingEvidence",
  "bundleScore",
  "readiness",
  "symptom-close-up",
  "whole-plant",
  "leaf-underside",
  "acceptedForAiPipeline",
  "providerCallsEnabled: false",
  "externalProviderCalled: false",
  "persistenceAllowed: false",
  "automaticTaskCreationAllowed: false",
  "automaticInterventionCreationAllowed: false",
  "humanReviewRequired: true",
]) {
  const ok = bundleText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Evidence bundle engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops evidence bundle ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-photo-evidence-bundle",
  "createPhotoEvidenceBundle",
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
    failures.push(`Endpoint evidence bundle incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI evidence bundle ---");

for (const required of [
  '"use client"',
  "AI Photo Evidence Bundle",
  "Pacchetto evidenze per diagnosi assistita",
  'accept="image/jpeg,image/png,image/webp"',
  "multiple",
  "URL.createObjectURL",
  "navigator.clipboard.writeText",
  "Copia evidence bundle",
  "data-ai-photo-evidence-bundle",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI evidence bundle incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import PhotoEvidenceBundleBuilder from "./PhotoEvidenceBundleBuilder";',
  "<PhotoEvidenceBundleBuilder />",
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
  "AI Photo Evidence Bundle",
  "Bundle evidenze fotografiche",
  "/api/ops/ai-photo-evidence-bundle",
  "externalProviderCalled=false",
  "humanReviewRequired=true",
  "data-ai-photo-evidence-bundle-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin evidence bundle incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiEvidenceBundle from "./OperationsAiEvidenceBundle";',
  "<OperationsAiEvidenceBundle />",
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
  ["bundle", bundleText],
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
  "AI Photo Evidence Bundle V6.7",
  "/api/ops/ai-photo-evidence-bundle",
  "providerReadyPayload",
  "acceptedForAiPipeline",
  "missingEvidence",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "nessuna creazione automatica",
  "humanReviewRequired=true",
  "npm run ops:ai-evidence-bundle-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README evidence bundle incompleto: ${required}`);
  }
}

for (const required of [
  "AI photo evidence bundle",
  "npm run ops:ai-evidence-bundle-check",
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
  console.log("--- Live evidence bundle protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJson(`${baseUrl}/api/ops/ai-photo-evidence-bundle`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint evidence bundle non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const liveValid = await fetchJson(
      `${baseUrl}/api/ops/ai-photo-evidence-bundle?secret=${encodeURIComponent(secret)}`,
    );

    console.log(`HTTP status valid bundle: ${liveValid.status}`);

    if (
      liveValid.status !== 200 ||
      !liveValid.data?.ok ||
      liveValid.data?.bundle?.acceptedForAiPipeline !== true
    ) {
      failures.push(`Valid bundle non OK: HTTP ${liveValid.status}`);
    } else {
      console.log("✓ valid bundle accettato per pipeline AI");
    }

    const liveIncomplete = await fetchJson(
      `${baseUrl}/api/ops/ai-photo-evidence-bundle?secret=${encodeURIComponent(secret)}&sample=incomplete`,
    );

    console.log(`HTTP status incomplete bundle: ${liveIncomplete.status}`);

    if (
      liveIncomplete.status !== 200 ||
      !liveIncomplete.data?.ok ||
      liveIncomplete.data?.bundle?.acceptedForAiPipeline !== false
    ) {
      failures.push(`Incomplete bundle non respinto correttamente: HTTP ${liveIncomplete.status}`);
    } else {
      console.log("✓ incomplete bundle respinto o marcato da completare");
    }

    const livePost = await fetchJson(
      `${baseUrl}/api/ops/ai-photo-evidence-bundle?secret=${encodeURIComponent(secret)}`,
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
            operatorNotes: "Test live protetto bundle evidenze completo.",
            urgency: "medium",
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

    console.log(`HTTP status POST evidence bundle: ${livePost.status}`);

    if (
      livePost.status !== 200 ||
      !livePost.data?.ok ||
      livePost.data?.bundle?.providerReadyPayload?.constraints?.humanReviewRequired !== true
    ) {
      failures.push(`POST evidence bundle non OK: HTTP ${livePost.status}`);
    } else {
      console.log("✓ POST evidence bundle generato con human review obbligatoria");
    }
  }
}

console.log("");
console.log("--- AI photo evidence bundle check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI photo evidence bundle check completato con successo.");
