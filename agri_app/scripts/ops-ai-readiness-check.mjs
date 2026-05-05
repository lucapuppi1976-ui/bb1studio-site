#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");

const files = {
  component: "agri_app/src/app/admin/operations/OperationsAiReadiness.tsx",
  page: "agri_app/src/app/admin/operations/page.tsx",
  readinessDoc: "agri_app/AI_PREMIUM_READINESS_V5_6.md",
  strategyDoc: "agri_app/AI_IMAGE_DIAGNOSIS_STRATEGY_V5_6.md",
  check: "agri_app/scripts/ops-ai-readiness-check.mjs",
};

const failures = [];

function readRepoFile(relativePath) {
  const absolutePath = resolve(repoRoot, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

function walk(dir) {
  if (!existsSync(dir)) {
    return [];
  }

  const entries = readdirSync(dir);
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry)) {
        continue;
      }

      files.push(...walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

console.log("Agri App AI readiness check V5.6");
console.log(`Repo root: ${repoRoot}`);
console.log("");

console.log("--- File richiesti ---");

for (const file of Object.values(files)) {
  const ok = existsSync(resolve(repoRoot, file));
  console.log(`${ok ? "✓" : "✗"} ${file}`);

  if (!ok) {
    failures.push(`File mancante: ${file}`);
  }
}

const componentText = readRepoFile(files.component);
const pageText = readRepoFile(files.page);
const readinessText = readRepoFile(files.readinessDoc);
const strategyText = readRepoFile(files.strategyDoc);
const runbookText = readRepoFile("agri_app/OPERATIONS_RUNBOOK_V4_14.md");
const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));

console.log("");
console.log("--- Contenuto AI readiness UI ---");

for (const required of [
  "AI Premium Readiness",
  "diagnosi fotografica assistita",
  "riconoscimento foto",
  "identificazione problemi",
  "proposte",
  "Nessuna chiave AI nella UI",
  "Nessun endpoint AI live attivo",
  "Roadmap funzionale AI",
]) {
  const ok = componentText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Componente AI readiness incompleto: ${required}`);
  }
}

console.log("");
console.log("--- Integrazione pagina operations ---");

for (const required of [
  'import OperationsAiReadiness from "./OperationsAiReadiness";',
  "<OperationsAiReadiness />",
]) {
  const ok = pageText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Pagina non integra AI readiness: ${required}`);
  }
}

console.log("");
console.log("--- Documenti AI ---");

for (const [label, text, requiredItems] of [
  [
    "AI_PREMIUM_READINESS_V5_6.md",
    readinessText,
    [
      "checkpoint live sicuro",
      "riconoscimento immagini",
      "proposta soluzioni",
      "Nessuna chiave AI",
      "npm run ops:ai-readiness-check",
    ],
  ],
  [
    "AI_IMAGE_DIAGNOSIS_STRATEGY_V5_6.md",
    strategyText,
    [
      "diagnosi fotografica agricola",
      "Analisi AI",
      "Diagnosi assistita",
      "Soluzioni proposte",
      "Human review",
    ],
  ],
]) {
  console.log(label);

  for (const required of requiredItems) {
    const ok = text.includes(required);
    console.log(`  ${ok ? "✓" : "✗"} ${required}`);

    if (!ok) {
      failures.push(`${label} incompleto: ${required}`);
    }
  }
}

console.log("");
console.log("--- Guardrail AI runtime ---");

const aiApiDir = resolve(repoRoot, "agri_app/src/app/api/ai");
const aiDiagnosisApiDir = resolve(repoRoot, "agri_app/src/app/api/diagnosis");
const aiRoutesAbsent = !existsSync(aiApiDir) && !existsSync(aiDiagnosisApiDir);

console.log(`${aiRoutesAbsent ? "✓" : "✗"} endpoint AI live non presenti`);

if (!aiRoutesAbsent) {
  failures.push("Endpoint AI/diagnosis presente prima della release AI dedicata.");
}

const runtimeFiles = [
  ...walk(resolve(repoRoot, "agri_app/src")),
  ...walk(resolve(repoRoot, "agri_app/scripts")),
].filter((file) => basename(file) !== "ops-ai-readiness-check.mjs");

const leakPatterns = [
  /sk-[A-Za-z0-9_-]{20,}/,
  /sk-ant-[A-Za-z0-9_-]{20,}/,
  /AIza[A-Za-z0-9_-]{20,}/,
  /OPENAI_API_KEY\s*=/,
  /ANTHROPIC_API_KEY\s*=/,
  /GOOGLE_API_KEY\s*=/,
  /GEMINI_API_KEY\s*=/,
];

let leaks = 0;

for (const file of runtimeFiles) {
  const text = readFileSync(file, "utf8");

  for (const pattern of leakPatterns) {
    if (pattern.test(text)) {
      leaks += 1;
      console.log(`✗ possibile secret AI in ${file}`);
      failures.push(`Possibile secret AI in runtime: ${file}`);
      break;
    }
  }
}

if (leaks === 0) {
  console.log("✓ nessun pattern chiave AI rilevato in src/scripts");
}

console.log("");
console.log("--- Assenza pattern sensibili UI ---");

for (const forbidden of ["secret=", "--secret", "localStorage", "sessionStorage"]) {
  const ok = !componentText.includes(forbidden);
  console.log(`${ok ? "✓" : "✗"} assente: ${forbidden}`);

  if (!ok) {
    failures.push(`Pattern sensibile presente nel componente AI readiness: ${forbidden}`);
  }
}

console.log("");
console.log("--- Runbook e alias ---");

for (const required of [
  "AI premium readiness checkpoint",
  "npm run ops:ai-readiness-check",
]) {
  const ok = runbookText.includes(required);
  console.log(`${ok ? "✓" : "✗"} ${required}`);

  if (!ok) {
    failures.push(`Runbook non aggiornato: ${required}`);
  }
}

for (const scriptName of [
  "ops:ai-readiness-check",
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

console.log("");
console.log("--- AI readiness check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("AI readiness check completato con successo.");
