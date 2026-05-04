#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(appDir, "..");
const args = process.argv.slice(2);

function getArg(name, fallback = "") {
  const i = args.indexOf(name);
  if (i >= 0) return args[i + 1] ?? "";
  const prefix = `${name}=`;
  return args.find((arg) => arg.startsWith(prefix))?.slice(prefix.length) ?? fallback;
}

function hasFlag(name) {
  return args.includes(name);
}

function run(cmd) {
  try {
    return execFileSync(cmd[0], cmd.slice(1), {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function runOk(cmd) {
  try {
    execFileSync(cmd[0], cmd.slice(1), {
      cwd: repoRoot,
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    const text = await res.text();
    let data = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    return { status: res.status, ok: res.ok, data };
  } finally {
    clearTimeout(timeout);
  }
}

const strict = hasFlag("--strict");
const expectBranch = getArg("--expect-branch");
const baseUrl = getArg("--base").replace(/\/+$/, "");

const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

const branch = run(["git", "rev-parse", "--abbrev-ref", "HEAD"]);
const head = run(["git", "rev-parse", "--short", "HEAD"]);
const upstream = run(["git", "rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"]);
const exactTag = run(["git", "describe", "--tags", "--exact-match", "HEAD"]);
const latestTag = run(["git", "describe", "--tags", "--abbrev=0"]);
const origin = run(["git", "remote", "get-url", "origin"]);
const status = run(["git", "status", "--short"]);

console.log("Agri App release status operativo");
console.log(`Repo root: ${repoRoot}`);
console.log(`App dir: ${appDir}`);
console.log(`Strict mode: ${strict ? "yes" : "no"}`);
console.log(`Live checks: ${baseUrl ? "yes" : "no"}`);
if (baseUrl) console.log(`Live base: ${baseUrl}`);
console.log("");

console.log("--- Git ---");
console.log(`Branch: ${branch || "(non disponibile)"}`);
console.log(`Upstream: ${upstream || "(non configurato)"}`);
console.log(`HEAD: ${head || "(non disponibile)"}`);
console.log(`Exact tag: ${exactTag || "(nessun tag esatto su HEAD)"}`);
console.log(`Latest tag: ${latestTag || "(nessun tag trovato)"}`);
console.log(`Origin: ${origin || "(non disponibile)"}`);
console.log(`Working tree clean: ${status ? "no" : "yes"}`);

if (status) {
  console.log("");
  console.log("Git status --short:");
  console.log(status);
}

if (expectBranch && branch !== expectBranch) {
  fail(`Branch atteso ${expectBranch}, branch corrente ${branch || "(non disponibile)"}`);
}

if (strict && status) {
  fail("Working tree non pulito in strict mode.");
}

console.log("");
console.log("--- File operativi attesi ---");

const files = [
  "agri_app/scripts/db-safety-check.mjs",
  "agri_app/scripts/security-check.mjs",
  "agri_app/scripts/recurring-quality-check.mjs",
  "agri_app/scripts/ops-live-check.mjs",
  "agri_app/scripts/release-gate.mjs",
  "agri_app/scripts/release-status.mjs",
  "agri_app/README_RELEASE_GATE_V4_7.md",
  "agri_app/README_RELEASE_STATUS_V4_8.md",
];

for (const file of files) {
  const ok = existsSync(resolve(repoRoot, file));
  console.log(`${ok ? "✓" : "✗"} ${file}`);
  if (!ok) fail(`File atteso mancante: ${file}`);
}

console.log("");
console.log("--- Package ---");

const packagePath = resolve(appDir, "package.json");

if (!existsSync(packagePath)) {
  fail("package.json mancante.");
} else {
  try {
    const pkg = JSON.parse(readFileSync(packagePath, "utf8"));
    console.log(`name: ${pkg.name ?? "(non indicato)"}`);
    console.log(`version: ${pkg.version ?? "(non indicata)"}`);
    console.log(`build script: ${pkg.scripts?.build ? "presente" : "mancante"}`);

    if (!pkg.scripts?.build) {
      fail("Script npm build mancante.");
    }
  } catch (error) {
    fail(`package.json non leggibile: ${error.message}`);
  }
}

console.log("");
console.log("--- Env locale ---");

const envPath = resolve(appDir, ".env");
const envExists = existsSync(envPath);
const envIgnored = runOk(["git", "check-ignore", "-q", relative(repoRoot, envPath)]);

console.log(`.env trovato: ${envExists ? "true" : "false"}`);
console.log(`.env ignorato da git: ${envIgnored ? "true" : "false"}`);

if (envExists && !envIgnored) {
  fail(".env esiste ma non risulta ignorato da git.");
}

if (!envExists) {
  warnings.push(".env locale non trovato.");
}

if (baseUrl) {
  console.log("");
  console.log("--- Live public checks ---");

  const health = await fetchJson(`${baseUrl}/api/health`);
  const ready = await fetchJson(`${baseUrl}/api/ready`);

  const healthOk = health.ok && health.data?.ok === true && health.data?.service === "agri-app";
  const readyOk = ready.ok && ready.data?.ok === true;

  console.log(`${healthOk ? "✓" : "✗"} /api/health status=${health.status} ok=${health.data?.ok} service=${health.data?.service}`);
  console.log(`${readyOk ? "✓" : "✗"} /api/ready status=${ready.status} ok=${ready.data?.ok}`);

  if (!healthOk) fail("/api/health live non conforme.");
  if (!readyOk) fail("/api/ready live non conforme.");
}

console.log("");
console.log("--- Release status summary ---");

console.log(`Warnings: ${warnings.length}`);
for (const warning of warnings) {
  console.log(`- ${warning}`);
}

console.log(`Failures: ${failures.length}`);
for (const failure of failures) {
  console.log(`- ${failure}`);
}

if (failures.length) {
  process.exit(1);
}

console.log("");
console.log("Release status completato con successo.");
