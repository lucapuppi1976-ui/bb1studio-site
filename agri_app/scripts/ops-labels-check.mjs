#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");

const checks = [
  {
    file: "agri_app/scripts/release-gate.mjs",
    forbidden: [
      "Agri App release gate V4.7",
      "Secret length:",
    ],
    required: [
      "Agri App release gate operativo",
      "Secret configured:",
    ],
  },
  {
    file: "agri_app/scripts/release-status.mjs",
    forbidden: [
      "Agri App release status V4.8",
    ],
    required: [
      "Agri App release status operativo",
    ],
  },
];

const failures = [];

console.log("Agri App ops labels check V4.12");
console.log(`Repo root: ${repoRoot}`);
console.log("");

for (const check of checks) {
  const absolutePath = resolve(repoRoot, check.file);
  const text = readFileSync(absolutePath, "utf8");

  console.log(`File: ${check.file}`);

  for (const forbidden of check.forbidden) {
    if (text.includes(forbidden)) {
      failures.push(`${check.file}: label vietata ancora presente: ${forbidden}`);
      console.log(`  ✗ assente: ${forbidden}`);
    } else {
      console.log(`  ✓ assente: ${forbidden}`);
    }
  }

  for (const required of check.required) {
    if (text.includes(required)) {
      console.log(`  ✓ presente: ${required}`);
    } else {
      failures.push(`${check.file}: label richiesta mancante: ${required}`);
      console.log(`  ✗ presente: ${required}`);
    }
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

console.log("Ops labels check completato con successo.");
