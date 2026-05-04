#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const rawArgs = process.argv.slice(2);
const args = new Set(rawArgs);

function argValue(name, fallback = "") {
  const index = rawArgs.indexOf(name);
  if (index >= 0 && rawArgs[index + 1]) return rawArgs[index + 1];
  return fallback;
}

function findRepoRoot(start) {
  let current = path.resolve(start);
  while (current !== path.dirname(current)) {
    if (fs.existsSync(path.join(current, ".git"))) return current;
    current = path.dirname(current);
  }
  return path.resolve(start);
}

function normalizeSecret(value) {
  let raw = String(value || "").trim();
  if (!raw) return "";

  // Accept accidental inputs such as CRON_SECRET="abc" or CRON_SECRET=abc.
  if (raw.startsWith("CRON_SECRET=")) raw = raw.slice("CRON_SECRET=".length).trim();
  raw = raw.replace(/^['\"]|['\"]$/g, "");
  return raw.trim();
}

function commandText(command, args = []) {
  return [command, ...args].join(" ");
}

function runCommand({ label, command, args = [], cwd, env = {}, shell = false }) {
  return new Promise((resolve) => {
    console.log(`\n--- ${label} ---`);
    if (!env.CRON_SECRET) console.log(commandText(command, args));
    else console.log(commandText(command, args).replace(env.CRON_SECRET, "***"));

    const child = spawn(command, args, {
      cwd,
      env: { ...process.env, ...env },
      shell,
      stdio: "inherit",
    });

    child.on("close", (code) => resolve({ label, code: code ?? 1 }));
  });
}

const repoRoot = findRepoRoot(process.cwd());
const appDir = fs.existsSync(path.join(repoRoot, "agri_app")) ? path.join(repoRoot, "agri_app") : repoRoot;
const includeLive = args.has("--include-live");
const includeCronDryRun = args.has("--include-cron-dry-run");
const skipBuild = args.has("--skip-build");
const baseUrl = argValue("--base", "https://bb1studio.com/agri_app").replace(/\/$/, "");
const secret = normalizeSecret(argValue("--secret", process.env.CRON_SECRET || ""));

const checks = [
  {
    label: "DB safety DEV",
    command: "node",
    args: ["scripts/db-safety-check.mjs", "--expect=dev"],
    cwd: appDir,
  },
  {
    label: "Security strict",
    command: "node",
    args: ["scripts/security-check.mjs", "--strict"],
    cwd: appDir,
  },
  {
    label: "Recurring quality DEV",
    command: "node",
    args: ["scripts/recurring-quality-check.mjs", "--expect=dev"],
    cwd: appDir,
  },
];

if (!skipBuild) {
  checks.push({
    label: "Production build",
    command: "bash",
    args: ["-lc", "unset DATABASE_URL LIVE_DATABASE_URL; npx prisma generate && npm run build"],
    cwd: appDir,
  });
}

if (includeLive) {
  if (!secret) {
    console.error("\nERRORE: --include-live richiede --secret oppure CRON_SECRET in ambiente.");
    console.error("Passa solo il valore del secret, non CRON_SECRET=...");
    process.exit(2);
  }

  const liveArgs = ["scripts/ops-live-check.mjs", "--base", baseUrl];
  if (includeCronDryRun) liveArgs.push("--include-cron-dry-run");

  checks.push({
    label: "Live operations check",
    command: "node",
    args: liveArgs,
    cwd: appDir,
    env: { CRON_SECRET: secret },
  });
}

console.log("Agri App release gate V4.7");
console.log(`Repo root: ${repoRoot}`);
console.log(`App dir: ${appDir}`);
console.log(`Build included: ${skipBuild ? "no" : "yes"}`);
console.log(`Live checks included: ${includeLive ? "yes" : "no"}`);
if (includeLive) {
  console.log(`Live base: ${baseUrl}`);
  console.log(`Secret length: ${secret.length}`);
  console.log(`Cron dry-run included: ${includeCronDryRun ? "yes" : "no"}`);
}

const results = [];
for (const check of checks) {
  const result = await runCommand(check);
  results.push(result);
  if (result.code !== 0) break;
}

console.log("\n--- Release gate summary ---");
for (const result of results) {
  console.log(`${result.code === 0 ? "✓" : "✗"} ${result.label} (${result.code})`);
}

const failures = results.filter((result) => result.code !== 0);
if (failures.length > 0 || results.length !== checks.length) {
  console.error("\nRelease gate fallito.");
  process.exit(1);
}

console.log("\nRelease gate completato con successo.");
