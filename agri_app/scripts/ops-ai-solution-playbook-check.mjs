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
  route: "agri_app/src/app/api/ops/ai-solution-playbook-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/photoSolutionPlaybook.ts",
  differential: "agri_app/src/lib/ai/photoDifferentialDiagnosis.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/SolutionPlaybookPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiSolutionPlaybook.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_SOLUTION_PLAYBOOK_V7_4.md",
  check: "agri_app/scripts/ops-ai-solution-playbook-check.mjs",
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

async function fetchJsonWithRetry(url, options = {}, attempts = 12, delayMs = 5000) {
  let last = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    last = await fetchJson(url, options);
    if (last.status !== 404 && last.status !== 520 && last.status !== 503) {
      return last;
    }

    await new Promise((resolvePromise) => setTimeout(resolvePromise, delayMs));
  }

  return last;
}

console.log("Agri App AI solution playbook check V7.4");
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
console.log("--- Solution playbook engine ---");

for (const required of [
  "SolutionPlaybook",
  "SolutionPlaybookOption",
  "SolutionPlaybookConstraint",
  "createSolutionPlaybook",
  "createIncompleteSolutionPlaybook",
  "createSolutionPlaybookFromInput",
  "formatSolutionPlaybook",
  "playbookFingerprint",
  "evidenceRequiredBeforeExecution",
  "operatorDecisionChecklist",
  "productPrescriptionAllowed: false",
  "dosageAdviceAllowed: false",
  "chemicalTreatmentAllowed: false",
  "automaticExecutionAllowed: false",
  "automaticTaskCreationAllowed: false",
  "automaticInterventionCreationAllowed: false",
  "persistenceAllowed: false",
  "requiresHumanReview: true",
  "allowedToExecute: false",
  "providerCalled: false",
  "productPrescriptionPerformed: false",
  "dosageAdvicePerformed: false",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Solution playbook engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops solution playbook ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-solution-playbook-dry-run",
  "createSolutionPlaybook",
  "createIncompleteSolutionPlaybook",
  "createSolutionPlaybookFromInput",
  "productPrescriptionPerformed: false",
  "dosageAdvicePerformed: false",
  "automaticTaskCreationPerformed: false",
  "automaticInterventionCreationPerformed: false",
  "allowedToExecute: false",
  "humanReviewRequired: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint solution playbook incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI solution playbook ---");

for (const required of [
  '"use client"',
  "AI Solution Playbook",
  "Soluzioni candidate con vincoli di sicurezza",
  "playbookFingerprint",
  "Top options",
  "Evidence required before execution",
  "Blocchi operativi",
  "productPrescriptionPerformed=false",
  "dosageAdvicePerformed=false",
  "automaticTaskCreationPerformed=false",
  "automaticInterventionCreationPerformed=false",
  "allowedToExecute=false",
  "humanReviewRequired=true",
  "Copia playbook soluzioni",
  "Esporta playbook JSON",
  "navigator.clipboard.writeText",
  "data-ai-solution-playbook",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI solution playbook incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import SolutionPlaybookPanel from "./SolutionPlaybookPanel";',
  "<SolutionPlaybookPanel />",
]) {
  const ok = photoPageText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Integrazione pagina diagnosi foto mancante: ${required}`);
  }
}

console.log("");
console.log("--- Pannello Admin Operations ---");

for (const required of [
  "AI Solution Playbook",
  "Soluzioni sicure e non prescrittive",
  "/api/ops/ai-solution-playbook-dry-run",
  "allowedToExecute=false",
  "productPrescriptionAllowed=false",
  "humanReviewRequired=true",
  "data-ai-solution-playbook-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin solution playbook incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiSolutionPlaybook from "./OperationsAiSolutionPlaybook";',
  "<OperationsAiSolutionPlaybook />",
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
  "AI Solution Playbook V7.4",
  "/api/ops/ai-solution-playbook-dry-run",
  "SolutionPlaybook",
  "SolutionPlaybookOption",
  "playbookFingerprint",
  "evidenceRequiredBeforeExecution",
  "operatorDecisionChecklist",
  "productPrescriptionAllowed=false",
  "dosageAdviceAllowed=false",
  "allowedToExecute=false",
  "providerCalled=false",
  "persistencePerformed=false",
  "nessuna chiamata AI live",
  "nessuna persistenza DB",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "humanReviewRequired=true",
  "npm run ops:ai-solution-playbook-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README solution playbook incompleto: ${required}`);
  }
}

for (const required of [
  "AI solution playbook",
  "npm run ops:ai-solution-playbook-check",
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
  "ops:ai-solution-playbook-check",
  "ops:ai-differential-diagnosis-check",
  "ops:ai-photo-annotation-check",
  "ops:ai-case-file-check",
  "ops:ai-orchestrator-dry-run-check",
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
  console.log("--- Live solution playbook protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-solution-playbook-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint solution playbook non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const liveValid = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-solution-playbook-dry-run?secret=${encodeURIComponent(secret)}`,
    );

    console.log(`HTTP status solution valid: ${liveValid.status}`);

    if (
      liveValid.status !== 200 ||
      !liveValid.data?.ok ||
      liveValid.data?.playbook?.playbookFingerprint === undefined ||
      !Array.isArray(liveValid.data?.playbook?.options) ||
      liveValid.data?.playbook?.options?.length < 8 ||
      liveValid.data?.playbook?.safety?.providerCalled !== false ||
      liveValid.data?.playbook?.safety?.productPrescriptionPerformed !== false ||
      liveValid.data?.playbook?.safety?.dosageAdvicePerformed !== false ||
      liveValid.data?.playbook?.safety?.allowedToExecute !== false ||
      liveValid.data?.playbook?.safety?.humanReviewRequired !== true
    ) {
      failures.push(`Solution playbook valid non OK: HTTP ${liveValid.status}`);
    } else {
      console.log("✓ solution playbook live generato senza provider, prescrizioni, dosi o persistenza");
    }

    const liveIncomplete = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-solution-playbook-dry-run?secret=${encodeURIComponent(secret)}&sample=incomplete`,
    );

    console.log(`HTTP status solution incomplete: ${liveIncomplete.status}`);

    if (
      liveIncomplete.status !== 200 ||
      !liveIncomplete.data?.ok ||
      !Array.isArray(liveIncomplete.data?.playbook?.evidenceRequiredBeforeExecution) ||
      liveIncomplete.data?.playbook?.evidenceRequiredBeforeExecution?.length < 3
    ) {
      failures.push(`Solution incomplete senza evidence requirements: HTTP ${liveIncomplete.status}`);
    } else {
      console.log("✓ solution incomplete genera evidence requirements");
    }

    const livePost = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-solution-playbook-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            photoId: "live-solution-photo",
            photoRole: "symptom-close-up",
            fileName: "live-solution.webp",
            plantContext: "vite in filare",
            locationHint: "serra nord",
            crop: "vite",
            observedAtLabel: "live-protected-dry-run",
            regions: [
              {
                id: "r1",
                label: "Macchia fogliare",
                tissue: "leaf-upper",
                severity: "medium",
                distribution: "localized",
                normalizedBox: {
                  x: 20,
                  y: 20,
                  width: 30,
                  height: 20,
                },
                visibleSigns: ["macchie brune", "alone giallo"],
                operatorNote: "Sintomo principale.",
              },
              {
                id: "r2",
                label: "Ingiallimento",
                tissue: "leaf-underside",
                severity: "low",
                distribution: "scattered",
                normalizedBox: {
                  x: 54,
                  y: 40,
                  width: 22,
                  height: 24,
                },
                visibleSigns: ["ingiallimento"],
                operatorNote: "Sintomo secondario.",
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST solution: ${livePost.status}`);

    if (
      livePost.status !== 200 ||
      !livePost.data?.ok ||
      !livePost.data?.playbook?.topOptions ||
      livePost.data?.playbook?.safety?.persistencePerformed !== false ||
      livePost.data?.playbook?.safety?.automaticTaskCreationPerformed !== false ||
      livePost.data?.playbook?.safety?.automaticInterventionCreationPerformed !== false
    ) {
      failures.push(`POST solution playbook non OK: HTTP ${livePost.status}`);
    } else {
      console.log("✓ POST solution playbook generato con blocchi operativi");
    }
  }
}

console.log("");
console.log("--- AI solution playbook check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI solution playbook check completato con successo.");
