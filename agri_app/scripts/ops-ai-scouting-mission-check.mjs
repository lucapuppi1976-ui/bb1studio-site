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
  route: "agri_app/src/app/api/ops/ai-scouting-mission-dry-run/route.ts",
  engine: "agri_app/src/lib/ai/aiScoutingMissionPlanner.ts",
  client: "agri_app/src/app/ai/photo-diagnosis/ScoutingMissionPlannerPanel.tsx",
  photoPage: "agri_app/src/app/ai/photo-diagnosis/page.tsx",
  adminPanel: "agri_app/src/app/admin/operations/OperationsAiScoutingMissionPlanner.tsx",
  operationsPage: "agri_app/src/app/admin/operations/page.tsx",
  readme: "agri_app/AI_SCOUTING_MISSION_PLANNER_V9_1.md",
  check: "agri_app/scripts/ops-ai-scouting-mission-check.mjs",
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

console.log("Agri App AI scouting mission planner check V9.1");
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
console.log("--- Scouting mission engine ---");

for (const required of [
  "ScoutingMissionCaseInput",
  "ScoutingMissionResourceInput",
  "ScoutingMissionInput",
  "MissionRouteSegment",
  "MissionPhotoShot",
  "MissionSafetyGate",
  "MissionResourceAssignment",
  "MissionDebriefPacket",
  "MissionEscalationTrigger",
  "MissionExportPacket",
  "ScoutingMissionReport",
  "defaultScoutingMissionInput",
  "createScoutingMissionFixture",
  "createScoutingMissionReport",
  "createReadyScoutingMissionReport",
  "createBlockedScoutingMissionReport",
  "formatScoutingMissionReport",
  "missionRoute",
  "photoShotList",
  "safetyGate",
  "resourceAssignments",
  "debriefPackets",
  "escalationTriggers",
  "exportPacket",
  "missionSummary",
  "scoutingMissionReady",
  "routeSequencingReady",
  "photoShotListReady",
  "safetyGateReady",
  "resourceAssignmentReady",
  "debriefPacketReady",
  "escalationTriggerReady",
  "exportPacketReady",
  "providerAiReady: false",
  "persistenceReady: false",
  "automaticTaskCreationReady: false",
  "automaticInterventionCreationReady: false",
  "automaticExecutionReady: false",
  "providerCalled: false",
  "persistencePerformed: false",
  "taskCreated: false",
  "interventionCreated: false",
  "automaticExecutionPerformed: false",
  "publicSharePerformed: false",
  "productPrescriptionPerformed: false",
  "dosageAdvicePerformed: false",
  "automaticTaskCreationAllowed: false",
  "automaticInterventionCreationAllowed: false",
  "automaticExecutionAllowed: false",
  "dbPersistenceAllowed: false",
  "publicShareAllowed: false",
  "productPrescriptionAllowed: false",
  "dosageAdviceAllowed: false",
  "manualDispatchOnly: true",
  "humanReviewRequired: true",
  "localAnalysisOnly: true",
  "redactedOutputOnly: true",
]) {
  const ok = engineText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Scouting mission engine incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Endpoint ops scouting mission ---");

for (const required of [
  "export async function GET",
  "export async function POST",
  "CRON_SECRET",
  "Accesso non consentito.",
  "/api/ops/ai-scouting-mission-dry-run",
  "createScoutingMissionReport",
  "createReadyScoutingMissionReport",
  "createBlockedScoutingMissionReport",
  "formatScoutingMissionReport",
  "providerCalled: false",
  "persistencePerformed: false",
  "taskCreated: false",
  "interventionCreated: false",
  "automaticExecutionPerformed: false",
  "publicSharePerformed: false",
  "productPrescriptionPerformed: false",
  "dosageAdvicePerformed: false",
  "automaticTaskCreationAllowed: false",
  "automaticInterventionCreationAllowed: false",
  "automaticExecutionAllowed: false",
  "dbPersistenceAllowed: false",
  "publicShareAllowed: false",
  "productPrescriptionAllowed: false",
  "dosageAdviceAllowed: false",
  "manualDispatchOnly: true",
  "humanReviewRequired: true",
  "localAnalysisOnly: true",
]) {
  const ok = routeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Endpoint scouting mission incompleto: ${required}`);
  }
}

console.log("");
console.log("--- UI scouting mission ---");

for (const required of [
  '"use client"',
  "AI Scouting Mission Planner & Field Crew Route Sequencer",
  "Mission planner scouting e shot list campo",
  "Simula scouting mission",
  "Reset missione",
  "missionReady",
  "missionStatus",
  "caseCount",
  "fieldCount",
  "blockedCaseCount",
  "urgentVisitCount",
  "estimatedTotalSlots",
  "firstCaseId",
  "nextManualAction",
  "missionFingerprint",
  "Mission route",
  "Photo shot list",
  "Safety gate",
  "Resource assignments",
  "Debrief packet",
  "Escalation triggers",
  "Export packet",
  "Copia scouting mission",
  "Esporta mission JSON",
  "navigator.clipboard.writeText",
  "data-ai-scouting-mission-planner",
]) {
  const ok = clientText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`UI scouting mission incompleta: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina diagnosi foto ---");

for (const required of [
  'import ScoutingMissionPlannerPanel from "./ScoutingMissionPlannerPanel";',
  "<ScoutingMissionPlannerPanel />",
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
  "AI Scouting Mission Planner & Field Crew Route Sequencer",
  "Scouting mission planner premium",
  "/api/ops/ai-scouting-mission-dry-run",
  "scoutingMissionReady=true",
  "routeSequencingReady=true",
  "automaticExecutionReady=false",
  "data-ai-scouting-mission-admin",
]) {
  const ok = adminPanelText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pannello admin scouting mission incompleto: ${required}`);
  }
}

for (const required of [
  'import OperationsAiScoutingMissionPlanner from "./OperationsAiScoutingMissionPlanner";',
  "<OperationsAiScoutingMissionPlanner />",
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
  "AI Scouting Mission Planner & Field Crew Route Sequencer V9.1",
  "/api/ops/ai-scouting-mission-dry-run",
  "ScoutingMissionInput",
  "ScoutingMissionReport",
  "missionRoute",
  "photoShotList",
  "safetyGate",
  "resourceAssignments",
  "debriefPackets",
  "escalationTriggers",
  "exportPacket",
  "missionSummary",
  "scoutingMissionReady=true",
  "routeSequencingReady=true",
  "photoShotListReady=true",
  "safetyGateReady=true",
  "resourceAssignmentReady=true",
  "debriefPacketReady=true",
  "escalationTriggerReady=true",
  "exportPacketReady=true",
  "providerAiReady=false",
  "persistenceReady=false",
  "automaticTaskCreationReady=false",
  "automaticInterventionCreationReady=false",
  "automaticExecutionReady=false",
  "providerCalled=false",
  "persistencePerformed=false",
  "taskCreated=false",
  "interventionCreated=false",
  "automaticExecutionPerformed=false",
  "publicSharePerformed=false",
  "productPrescriptionPerformed=false",
  "dosageAdvicePerformed=false",
  "automaticTaskCreationAllowed=false",
  "automaticInterventionCreationAllowed=false",
  "automaticExecutionAllowed=false",
  "dbPersistenceAllowed=false",
  "publicShareAllowed=false",
  "productPrescriptionAllowed=false",
  "dosageAdviceAllowed=false",
  "manualDispatchOnly=true",
  "humanReviewRequired=true",
  "localAnalysisOnly=true",
  "nessuna chiamata provider AI live",
  "nessuna persistenza DB",
  "nessuna creazione automatica",
  "nessuna esecuzione automatica",
  "nessuna prescrizione prodotto",
  "nessun dosaggio",
  "npm run ops:ai-scouting-mission-check",
]) {
  const ok = readmeText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`README scouting mission incompleto: ${required}`);
  }
}

for (const required of [
  "AI scouting mission planner",
  "npm run ops:ai-scouting-mission-check",
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
  "ops:ai-scouting-mission-check",
  "ops:ai-farm-command-board-check",
  "ops:ai-intervention-protocol-check",
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
  console.log("--- Live scouting mission protetto ---");

  const secret = (process.env.CRON_SECRET_VALUE || "").trim();

  if (!secret) {
    failures.push("CRON_SECRET_VALUE mancante per include-live.");
    console.log("✗ CRON_SECRET_VALUE configurato");
  } else {
    console.log("✓ CRON_SECRET_VALUE configurato");

    const withoutSecret = await fetchJsonWithRetry(`${baseUrl}/api/ops/ai-scouting-mission-dry-run`);
    const unauthorizedOk = withoutSecret.status === 403 || withoutSecret.status === 401;
    console.log(`${unauthorizedOk ? "✓" : "✗"} senza secret non autorizzato — HTTP ${withoutSecret.status}`);

    if (!unauthorizedOk) {
      failures.push(`Endpoint scouting mission non protetto senza secret: HTTP ${withoutSecret.status}`);
    }

    const blocked = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-scouting-mission-dry-run?secret=${encodeURIComponent(secret)}&sample=blocked`,
    );

    console.log(`HTTP status scouting mission blocked: ${blocked.status}`);

    if (
      blocked.status !== 200 ||
      !blocked.data?.ok ||
      blocked.data?.report?.missionReady !== false ||
      blocked.data?.report?.safety?.providerCalled !== false ||
      blocked.data?.report?.safety?.persistencePerformed !== false ||
      blocked.data?.report?.safety?.taskCreated !== false ||
      blocked.data?.report?.safety?.interventionCreated !== false ||
      blocked.data?.report?.safety?.automaticExecutionPerformed !== false
    ) {
      failures.push(`Scouting mission blocked non OK: HTTP ${blocked.status}`);
    } else {
      console.log("✓ scouting mission blocked resta dry-run e senza automazioni");
    }

    const ready = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-scouting-mission-dry-run?secret=${encodeURIComponent(secret)}&sample=ready`,
    );

    console.log(`HTTP status scouting mission ready: ${ready.status}`);

    if (
      ready.status !== 200 ||
      !ready.data?.ok ||
      ready.data?.report?.missionReady !== true ||
      ready.data?.report?.premiumSignals?.scoutingMissionReady !== true ||
      ready.data?.report?.premiumSignals?.providerAiReady !== false ||
      ready.data?.report?.premiumSignals?.persistenceReady !== false ||
      ready.data?.report?.safety?.providerCalled !== false ||
      ready.data?.report?.safety?.persistencePerformed !== false ||
      ready.data?.report?.safety?.taskCreated !== false ||
      ready.data?.report?.safety?.interventionCreated !== false ||
      ready.data?.report?.safety?.automaticExecutionPerformed !== false ||
      ready.data?.report?.safety?.publicSharePerformed !== false ||
      ready.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`Scouting mission ready non OK: HTTP ${ready.status}`);
    } else {
      console.log("✓ scouting mission ready genera missione senza provider, DB, task, interventi, share pubblico o esecuzione");
    }

    const post = await fetchJsonWithRetry(
      `${baseUrl}/api/ops/ai-scouting-mission-dry-run?secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            farmId: "live-scouting-mission",
            farmName: "Azienda live",
            missionDateLabel: "domani",
            startLocationLabel: "magazzino live",
            operatorName: "Operatore live",
            includeMissionRoute: true,
            includePhotoShotList: true,
            includeSafetyGate: true,
            includeResourceAssignments: true,
            includeDebriefPacket: true,
            includeEscalationTriggers: true,
            includeExportPacket: true,
            humanReviewRequired: true,
            cases: [
              {
                caseId: "live-mission-core",
                fieldId: "live-field-north",
                fieldName: "Live Nord",
                crop: "olivo",
                locationHint: "settore live",
                priority: "blocked",
                readiness: "blocked",
                commandScore: 91,
                photoNeedCount: 6,
                evidenceNeedCount: 5,
                followUpWindowLabel: "entro T+1 giorno",
                requiredShots: ["contesto", "macro", "controllo sano"],
                blockers: ["review finale"],
                reviewerNote: "Caso live core.",
              },
              {
                caseId: "live-mission-border",
                fieldId: "live-field-north",
                fieldName: "Live Nord",
                crop: "olivo",
                locationHint: "bordo live",
                priority: "urgent-visit",
                readiness: "ready-manual",
                commandScore: 82,
                photoNeedCount: 5,
                evidenceNeedCount: 4,
                followUpWindowLabel: "entro T+2 giorni",
                requiredShots: ["bordo", "progressione"],
                blockers: [],
                reviewerNote: "Caso live border.",
              },
            ],
            resources: [
              {
                resourceId: "live-mission-reviewer",
                label: "Revisore live",
                role: "reviewer",
                availableWindowLabel: "oggi",
                capacitySlots: 4,
                constraints: ["review manuale"],
              },
              {
                resourceId: "live-mission-operator",
                label: "Operatore live",
                role: "operator",
                availableWindowLabel: "domani",
                capacitySlots: 6,
                constraints: ["raccolta foto"],
              },
            ],
          },
        }),
      },
    );

    console.log(`HTTP status POST scouting mission: ${post.status}`);

    if (
      post.status !== 200 ||
      !post.data?.ok ||
      post.data?.report?.missionReady !== true ||
      post.data?.report?.premiumSignals?.scoutingMissionReady !== true ||
      post.data?.report?.safety?.providerCalled !== false ||
      post.data?.report?.safety?.persistencePerformed !== false ||
      post.data?.report?.safety?.taskCreated !== false ||
      post.data?.report?.safety?.interventionCreated !== false ||
      post.data?.report?.safety?.automaticExecutionPerformed !== false ||
      post.data?.report?.safety?.publicSharePerformed !== false ||
      post.data?.report?.safety?.localAnalysisOnly !== true
    ) {
      failures.push(`POST scouting mission non OK: HTTP ${post.status}`);
    } else {
      console.log("✓ POST scouting mission protetto genera missione dry-run senza provider, DB, task, interventi, share pubblico o esecuzione");
    }
  }
}

console.log("");
console.log("--- AI scouting mission planner check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI scouting mission planner check completato con successo.");
