#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");
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
const expectBranch = readArg("--expect-branch", "");
const includeProtected = hasFlag("--include-protected");
const secret = process.env.CRON_SECRET_VALUE || process.env.CRON_SECRET || "";

const redactionValues = [secret].filter((value) => typeof value === "string" && value.length > 0);

function redact(value) {
  let output = String(value);

  for (const secretValue of redactionValues) {
    output = output.split(secretValue).join("[REDACTED]");
  }

  output = output.replace(/([?&]secret=)[^&\s'"]+/g, "$1[REDACTED]");
  output = output.replace(/(--secret(?:=|\s+))[^&\s'"]+/g, "$1[REDACTED]");

  return output;
}

function print(value = "") {
  process.stdout.write(`${redact(value)}\n`);
}

function section(title) {
  print("");
  print(`--- ${title} ---`);
}

const results = [];

function runStep(label, command, commandArgs, options = {}) {
  section(label);

  const result = spawnSync(command, commandArgs, {
    cwd: options.cwd || appDir,
    encoding: "utf8",
    env: {
      ...process.env,
    },
    maxBuffer: 1024 * 1024 * 20,
  });

  if (result.stdout) {
    process.stdout.write(redact(result.stdout));
  }

  if (result.stderr) {
    process.stderr.write(redact(result.stderr));
  }

  const status = typeof result.status === "number" ? result.status : 1;
  const ok = status === 0;

  results.push({
    label,
    ok,
    status,
  });

  return ok;
}

async function protectedEmailStatusCheck() {
  section("Protected email status live");

  if (!secret) {
    print("ERRORE: per --include-protected impostare CRON_SECRET_VALUE oppure CRON_SECRET.");
    results.push({
      label: "Protected email status live",
      ok: false,
      status: 2,
    });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const url = new URL(`${baseUrl}/api/ops/email-status`);
    url.searchParams.set("secret", secret);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    const text = await response.text();

    let data = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = {
        raw: text,
      };
    }

    print(`HTTP status: ${response.status}`);

    const serialized = JSON.stringify(data, null, 2);
    print(serialized);

    const email = data?.email || data || {};
    const testSafety = data?.testSafety || {};
    const ok =
      response.ok &&
      data?.ok === true &&
      email.enabled === false &&
      (testSafety.canSendTestEmail === false || testSafety.canSendTestEmail === undefined);

    results.push({
      label: "Protected email status live",
      ok,
      status: ok ? 0 : response.status,
    });

    if (!ok) {
      print("ERRORE: protected email status live non conforme.");
    }
  } catch (error) {
    print(`ERRORE: protected email status live fallito: ${error.message}`);
    results.push({
      label: "Protected email status live",
      ok: false,
      status: 1,
    });
  } finally {
    clearTimeout(timeout);
  }
}

print("Agri App ops quick check operativo");
print(`Repo root: ${repoRoot}`);
print(`App dir: ${appDir}`);
print(`Base URL: ${baseUrl}`);
print(`Expected branch: ${expectBranch || "(non impostato)"}`);
print(`Protected checks: ${includeProtected ? "yes" : "no"}`);
print(`Secret configured: ${secret ? "yes" : "no"}`);

runStep("DB safety DEV", process.execPath, [
  "scripts/db-safety-check.mjs",
  "--expect=dev",
]);

runStep("Security strict", process.execPath, [
  "scripts/security-check.mjs",
  "--strict",
]);

runStep("Recurring quality DEV", process.execPath, [
  "scripts/recurring-quality-check.mjs",
  "--expect=dev",
]);

runStep("Ops labels check", process.execPath, [
  "scripts/ops-labels-check.mjs",
]);

runStep("Ops banner check", process.execPath, [
  "scripts/ops-banner-check.mjs",
]);

const releaseStatusArgs = [
  "scripts/release-status.mjs",
  "--strict",
  "--base",
  baseUrl,
];

if (expectBranch) {
  releaseStatusArgs.push("--expect-branch", expectBranch);
}

runStep("Release status live", process.execPath, releaseStatusArgs);

runStep("Ops log redaction check", process.execPath, [
  "scripts/ops-log-redaction-check.mjs",
  "--base",
  baseUrl,
]);

runStep("Ops runbook check", process.execPath, [
  "scripts/ops-runbook-check.mjs",
]);

runStep("Admin operations dynamic check", process.execPath, [
  "scripts/ops-admin-dynamic-check.mjs",
]);

runStep("Admin operations navigation check", process.execPath, [
  "scripts/ops-admin-navigation-check.mjs",
]);

runStep("Admin operations UX check", process.execPath, [
  "scripts/ops-admin-ux-check.mjs",
]);

runStep("Admin command palette check", process.execPath, [
  "scripts/ops-admin-command-palette-check.mjs",
]);

runStep("AI readiness check", process.execPath, [
  "scripts/ops-ai-readiness-check.mjs",
]);

runStep("AI photo intake check", process.execPath, [
  "scripts/ops-ai-photo-intake-check.mjs",
]);

runStep("AI diagnosis draft check", process.execPath, [
  "scripts/ops-ai-diagnosis-draft-check.mjs",
]);

runStep("AI action plan check", process.execPath, [
  "scripts/ops-ai-action-plan-check.mjs",
]);

runStep("AI human review workflow check", process.execPath, [
  "scripts/ops-ai-review-workflow-check.mjs",
]);

runStep("AI provider safety check", process.execPath, [
  "scripts/ops-ai-provider-safety-check.mjs",
]);

runStep("AI provider ops status check", process.execPath, [
  "scripts/ops-ai-provider-status-check.mjs",
]);

runStep("AI provider dry-run check", process.execPath, [
  "scripts/ops-ai-provider-dry-run-check.mjs",
]);

runStep("AI provider response contract check", process.execPath, [
  "scripts/ops-ai-provider-response-check.mjs",
]);

runStep("AI diagnosis pipeline dry-run check", process.execPath, [
  "scripts/ops-ai-pipeline-dry-run-check.mjs",
]);

runStep("AI photo quality gate check", process.execPath, [
  "scripts/ops-ai-photo-quality-gate-check.mjs",
]);

runStep("AI photo evidence bundle check", process.execPath, [
  "scripts/ops-ai-evidence-bundle-check.mjs",
]);

runStep("AI provider request preview check", process.execPath, [
  "scripts/ops-ai-provider-request-check.mjs",
]);

runStep("AI diagnosis orchestrator dry-run check", process.execPath, [
  "scripts/ops-ai-orchestrator-dry-run-check.mjs",
]);

runStep("AI diagnosis case file check", process.execPath, [
  "scripts/ops-ai-case-file-check.mjs",
]);

runStep("AI photo symptom annotation check", process.execPath, [
  "scripts/ops-ai-photo-annotation-check.mjs",
]);

runStep("AI differential diagnosis check", process.execPath, [
  "scripts/ops-ai-differential-diagnosis-check.mjs",
]);

runStep("AI solution playbook check", process.execPath, [
  "scripts/ops-ai-solution-playbook-check.mjs",
]);

runStep("AI case report check", process.execPath, [
  "scripts/ops-ai-case-report-check.mjs",
]);

runStep("AI decision dossier check", process.execPath, [
  "scripts/ops-ai-decision-dossier-check.mjs",
]);

runStep("AI work order preview check", process.execPath, [
  "scripts/ops-ai-work-order-preview-check.mjs",
]);

runStep("AI work order execution gate check", process.execPath, [
  "scripts/ops-ai-work-order-execution-gate-check.mjs",
]);

runStep("AI manual conversion audit check", process.execPath, [
  "scripts/ops-ai-manual-conversion-audit-check.mjs",
]);

runStep("Admin live routes check", process.execPath, [
  "scripts/ops-admin-live-routes-check.mjs",
  "--base",
  baseUrl,
]);

runStep("Admin route monitoring check", process.execPath, [
  "scripts/ops-admin-route-monitoring-check.mjs",
]);

if (includeProtected) {
  await protectedEmailStatusCheck();
}

print("");
print("--- Ops quick check summary ---");

for (const result of results) {
  print(`${result.ok ? "✓" : "✗"} ${result.label} (${result.status})`);
}

const failures = results.filter((result) => !result.ok);

if (failures.length) {
  print("");
  print(`Ops quick check fallito: ${failures.length} problemi.`);
  process.exit(1);
}

print("");
print("Ops quick check completato con successo.");
