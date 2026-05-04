#!/usr/bin/env node

import { spawn } from "node:child_process";
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

function hasFlag(name) {
  return args.includes(name);
}

const baseUrl = readArg("--base", "https://bb1studio.com/agri_app").replace(/\/+$/, "");
const secret = process.env.CRON_SECRET_VALUE || process.env.CRON_SECRET || "";
const secretSource = process.env.CRON_SECRET_VALUE
  ? "CRON_SECRET_VALUE"
  : process.env.CRON_SECRET
    ? "CRON_SECRET"
    : "none";

console.log("Agri App secret-safe live release gate");
console.log(`Live base: ${baseUrl}`);
console.log(`Secret configured: ${secret ? "yes" : "no"}`);
console.log(`Secret source: ${secretSource}`);

if (!secret) {
  console.error("ERRORE: impostare CRON_SECRET_VALUE oppure CRON_SECRET nell'ambiente.");
  process.exit(2);
}

if (hasFlag("--self-test")) {
  console.log("Self-test: nessun valore secret stampato.");
  process.exit(0);
}

function redact(value) {
  const text = Buffer.isBuffer(value) ? value.toString("utf8") : String(value);
  return secret ? text.split(secret).join("[REDACTED]") : text;
}

const childArgs = [
  "scripts/release-gate.mjs",
  "--include-live",
  "--base",
  baseUrl,
  "--secret",
  secret,
];

const child = spawn(process.execPath, childArgs, {
  cwd: appDir,
  env: process.env,
  stdio: ["ignore", "pipe", "pipe"],
});

child.stdout.on("data", (chunk) => {
  process.stdout.write(redact(chunk));
});

child.stderr.on("data", (chunk) => {
  process.stderr.write(redact(chunk));
});

child.on("error", (error) => {
  console.error(`ERRORE: impossibile avviare release gate live: ${error.message}`);
  process.exit(1);
});

child.on("close", (code) => {
  process.exit(code ?? 1);
});
