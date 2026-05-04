#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");

const checks = [
  {
    file: "agri_app/scripts/ops-log-redaction-check.mjs",
    forbidden: "Agri App ops log redaction check V4.11",
    required: "Agri App ops log redaction check operativo",
  },
  {
    file: "agri_app/scripts/ops-labels-check.mjs",
    forbidden: "Agri App ops labels check V4.12",
    required: "Agri App ops labels check operativo",
  },
  {
    file: "agri_app/scripts/ops-quick-check.mjs",
    forbidden: "Agri App ops quick check V4.13",
    required: "Agri App ops quick check operativo",
  },
  {
    file: "agri_app/scripts/ops-runbook-check.mjs",
    forbidden: "Agri App ops runbook check V4.14",
    required: "Agri App ops runbook check operativo",
  },
];

const failures = [];

console.log("Agri App ops banner check V4.15");
console.log(`Repo root: ${repoRoot}`);
console.log("");

for (const check of checks) {
  const absolutePath = resolve(repoRoot, check.file);
  const text = readFileSync(absolutePath, "utf8");

  console.log(`File: ${check.file}`);

  if (text.includes(check.forbidden)) {
    console.log(`  ✗ assente: ${check.forbidden}`);
    failures.push(`${check.file}: banner storico ancora presente: ${check.forbidden}`);
  } else {
    console.log(`  ✓ assente: ${check.forbidden}`);
  }

  if (text.includes(check.required)) {
    console.log(`  ✓ presente: ${check.required}`);
  } else {
    console.log(`  ✗ presente: ${check.required}`);
    failures.push(`${check.file}: banner operativo mancante: ${check.required}`);
  }

  console.log("");
}

if (failures.length) {
  console.log("Failures:");
  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Ops banner check completato con successo.");
