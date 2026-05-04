#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const args = process.argv.slice(2);

function readArg(name, fallback = "") {
  const index = args.indexOf(name);

  if (index >= 0) {
    return args[index + 1] ?? "";
  }

  const prefix = `${name}=`;
  const inline = args.find((arg) => arg.startsWith(prefix));

  return inline ? inline.slice(prefix.length) : fallback;
}

const baseUrl = readArg("--base", "https://bb1studio.com/agri_app").replace(/\/+$/, "");
const fakeSecret = `v411-redaction-check-${Date.now()}-not-sensitive`;

console.log("Agri App ops log redaction check operativo");
console.log(`Base URL: ${baseUrl}`);
console.log("Fake secret configured: yes");

const result = spawnSync(
  process.execPath,
  [
    "scripts/ops-live-check.mjs",
    "--base",
    baseUrl,
    "--secret",
    fakeSecret,
  ],
  {
    cwd: appDir,
    encoding: "utf8",
    env: {
      ...process.env,
      CRON_SECRET_VALUE: "",
      CRON_SECRET: "",
    },
  },
);

const output = `${result.stdout || ""}${result.stderr || ""}`;

if (output.includes(fakeSecret)) {
  console.log(output.split(fakeSecret).join("[REDACTED]"));
  console.error("ERRORE: il fake secret è comparso nell'output operativo.");
  process.exit(1);
}

if (!output.includes("Email status live safety")) {
  console.log(output);
  console.error("ERRORE: il controllo email-status non sembra essere stato eseguito.");
  process.exit(2);
}

if (!output.includes("secret=[REDACTED]")) {
  console.log(output);
  console.error("ERRORE: non è stata trovata la redazione secret=[REDACTED].");
  process.exit(3);
}

console.log("Redaction output verificato: il fake secret non compare nei log.");
console.log("Output operativo redatto:");
console.log(output);

console.log("Ops log redaction check completato con successo.");
