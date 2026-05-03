#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const args = new Set(process.argv.slice(2));
const allowLiveDb = args.has("--allow-live-db");
const allowEmailEnabled = args.has("--allow-email-enabled");
const strict = args.has("--strict");
const jsonOutput = args.has("--json");

function run(command, options = {}) {
  try {
    return execSync(command, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...options }).trim();
  } catch {
    return "";
  }
}

function findRepoRoot(start) {
  let current = path.resolve(start);
  while (current !== path.dirname(current)) {
    if (fs.existsSync(path.join(current, ".git"))) return current;
    current = path.dirname(current);
  }
  return path.resolve(start);
}

const cwd = process.cwd();
const repoRoot = findRepoRoot(cwd);
const appDir = fs.existsSync(path.join(repoRoot, "agri_app")) ? path.join(repoRoot, "agri_app") : repoRoot;
const envPath = path.join(appDir, ".env");

const failures = [];
const warnings = [];
const info = [];

function parseEnv(filePath) {
  const values = new Map();
  if (!fs.existsSync(filePath)) return values;

  for (const raw of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const index = line.indexOf("=");
    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    value = value.replace(/^[\'\"]|[\'\"]$/g, "");
    values.set(key, value);
  }
  return values;
}

function classifyDb(urlString) {
  if (!urlString) return { classification: "MISSING" };
  try {
    const url = new URL(urlString);
    const database = url.pathname.replace(/^\//, "");
    const host = url.hostname;
    if (database === "agri_app_dev_db") return { classification: "DEV", host, database };
    if (database === "agri_app") return { classification: "LIVE", host, database };
    return { classification: "UNKNOWN", host, database };
  } catch {
    return { classification: "INVALID" };
  }
}

function isIgnored(relPath) {
  const result = run(`git check-ignore -q ${JSON.stringify(relPath)} && echo ignored`, { cwd: repoRoot });
  return result === "ignored";
}

function relative(fullPath) {
  return path.relative(repoRoot, fullPath).replaceAll(path.sep, "/");
}

const envTemplateFiles = new Set([
  "agri_app/.env.example",
  "agri_app/.env.codespaces.example",
  "agri_app/.env.render.live.example",
]);

const allowedDevCredentialFiles = new Set([
  "agri_app/prisma/seed.ts",
  "agri_app/scripts/delete-demo-users.mjs",
]);

function shouldSkipFile(fullPath) {
  const rel = relative(fullPath);
  const base = path.basename(rel);

  if (rel.includes("/.git/") || rel.startsWith(".git/")) return true;
  if (rel.includes("/node_modules/") || rel.includes("/.next/") || rel.includes("/dist/") || rel.includes("/build/")) return true;
  if (rel.includes("/coverage/")) return true;
  if (rel.endsWith(".zip") || rel.endsWith(".png") || rel.endsWith(".jpg") || rel.endsWith(".jpeg") || rel.endsWith(".webp") || rel.endsWith(".gif") || rel.endsWith(".pdf")) return true;
  if (base === "package-lock.json") return true;
  if (base === ".env" || base === ".env.local") return true;
  return false;
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (shouldSkipFile(full)) continue;
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function classifyFinding(rel, type) {
  if (envTemplateFiles.has(rel)) return "info";
  if (allowedDevCredentialFiles.has(rel) && type.startsWith("Demo ")) return "info";
  if (rel.startsWith("agri_app/CHECKPOINT_") && type.startsWith("Demo ")) return "warning";
  if (rel === "agri_app/README.md" && type.startsWith("Demo ")) return "warning";
  if (rel === "agri_app/README_LOGIN_PRODUCTION_SAFE_V4_5.md" && type.startsWith("Demo ")) return "warning";
  return "critical";
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function joinedCredential(localPart) {
  return [localPart, "bb1studio.local"].join("@");
}

function joinedPassword(prefix) {
  return `${prefix}${"123"}!`;
}

function scanForSecrets() {
  const demoAdminEmail = joinedCredential("admin");
  const demoOperatorEmail = joinedCredential("operator");
  const demoAdminPassword = joinedPassword("Admin");
  const demoOperatorPassword = joinedPassword("Operator");

  const patterns = [
    { name: "PostgreSQL URL", re: /postgres(?:ql)?:\/\/[^\s'\"]+/i },
    { name: "Resend API key", re: /\bre_[A-Za-z0-9_-]{20,}\b/ },
    { name: "DATABASE_URL assignment", re: /\bDATABASE_URL\s*=\s*['\"]?postgres(?:ql)?:\/\//i },
    { name: "CRON_SECRET assignment", re: /\bCRON_SECRET\s*=\s*['\"]?[A-Za-z0-9_-]{16,}/ },
    { name: "NEXTAUTH_SECRET assignment", re: /\bNEXTAUTH_SECRET\s*=\s*['\"]?[^\s'\"]{16,}/ },
    { name: "RESEND_API_KEY assignment", re: /\bRESEND_API_KEY\s*=\s*['\"]?re_[A-Za-z0-9_-]{20,}/ },
    { name: "Demo admin email", re: new RegExp(`\\b${escapeRegex(demoAdminEmail)}\\b`, "i") },
    { name: "Demo operator email", re: new RegExp(`\\b${escapeRegex(demoOperatorEmail)}\\b`, "i") },
    { name: "Demo admin password", re: new RegExp(`\\b${escapeRegex(demoAdminPassword)}\\b`) },
    { name: "Demo operator password", re: new RegExp(`\\b${escapeRegex(demoOperatorPassword)}\\b`) },
  ];

  const rootDocs = ["README.md", "README_CHECKPOINT.txt", "CHECKPOINT_CURRENT.md", "MAIN_CHAT1_SUMMARY.md", "NEXT_STEPS.md"]
    .map((name) => path.join(repoRoot, name))
    .filter((file) => fs.existsSync(file));

  const files = [...walk(appDir), ...rootDocs];
  const findings = [];

  for (const file of files) {
    let text = "";
    try {
      text = fs.readFileSync(file, "utf8");
    } catch {
      continue;
    }

    const rel = relative(file);
    for (const { name, re } of patterns) {
      const match = re.exec(text);
      if (match) findings.push({ file: rel, type: name, severity: classifyFinding(rel, name) });
    }
  }

  return findings;
}

const env = parseEnv(envPath);
const envRel = relative(envPath);
const db = classifyDb(env.get("DATABASE_URL"));
const emailEnabled = env.get("ENABLE_EMAIL_NOTIFICATIONS") || "";
const resend = env.get("RESEND_API_KEY") || "";
const emailFrom = env.get("EMAIL_FROM") || "";
const status = run("git status --short", { cwd: repoRoot });
const findings = scanForSecrets();
const criticalFindings = findings.filter((finding) => finding.severity === "critical");
const warningFindings = findings.filter((finding) => finding.severity === "warning");
const infoFindings = findings.filter((finding) => finding.severity === "info");

if (fs.existsSync(envPath) && !isIgnored(envRel)) failures.push("agri_app/.env non risulta ignorato da git.");
if (db.classification === "LIVE" && !allowLiveDb) failures.push("Il .env del Codespace punta al DB LIVE. Usare --allow-live-db solo se intenzionale.");
if (db.classification === "UNKNOWN") warnings.push("DATABASE_URL presente ma non riconosciuta come DEV o LIVE standard.");
if (db.classification === "INVALID") failures.push("DATABASE_URL non valida.");
if (emailEnabled.toLowerCase() === "true" && !allowEmailEnabled) failures.push("ENABLE_EMAIL_NOTIFICATIONS=true in .env locale. Ripristinare false dopo i test.");
if (resend && !resend.startsWith("re_")) warnings.push("RESEND_API_KEY non inizia con re_.");
if (resend && resend.toLowerCase().startsWith("bearer ")) failures.push("RESEND_API_KEY contiene Bearer. Nel .env va salvata solo la chiave re_...");

if (criticalFindings.length > 0) {
  const message = "Possibili segreti o credenziali demo trovati in file versionabili non consentiti.";
  if (strict) failures.push(message);
  else warnings.push(message);
}

if (warningFindings.length > 0) {
  warnings.push("Riferimenti demo trovati in documenti storici. Non sono runtime, ma valutare cleanup se non servono più.");
}

const result = {
  ok: failures.length === 0,
  repoRoot,
  appDir,
  envFound: fs.existsSync(envPath),
  envIgnored: fs.existsSync(envPath) ? isIgnored(envRel) : null,
  database: db,
  email: {
    enabled: emailEnabled || null,
    resendConfigured: Boolean(resend),
    resendPrefixOk: resend ? resend.startsWith("re_") : null,
    resendContainsBearer: resend ? resend.toLowerCase().startsWith("bearer ") : null,
    from: emailFrom || null,
  },
  gitStatus: status || "",
  findings: {
    critical: criticalFindings,
    warning: warningFindings,
    info: infoFindings,
  },
  warnings,
  failures,
};

if (jsonOutput) {
  console.log(JSON.stringify(result, null, 2));
  if (failures.length > 0) process.exit(1);
  process.exit(0);
}

console.log("Agri App security check");
console.log(`Repo root: ${repoRoot}`);
console.log(`App dir: ${appDir}`);
console.log("");
console.log(`.env trovato: ${fs.existsSync(envPath)}`);
if (fs.existsSync(envPath)) console.log(`.env ignorato da git: ${isIgnored(envRel)}`);
console.log(`DB classificazione: ${db.classification}`);
if (db.host) console.log(`DB host: ${db.host}`);
if (db.database) console.log(`DB name: ${db.database}`);
console.log(`ENABLE_EMAIL_NOTIFICATIONS: ${emailEnabled || "(mancante)"}`);
console.log(`RESEND_API_KEY presente: ${Boolean(resend)}`);
if (resend) {
  console.log(`RESEND_API_KEY prefisso re_: ${resend.startsWith("re_")}`);
  console.log(`RESEND_API_KEY contiene Bearer: ${resend.toLowerCase().startsWith("bearer ")}`);
}
console.log(`EMAIL_FROM: ${emailFrom || "(mancante)"}`);
console.log("");
console.log("Git status --short:");
console.log(status || "(pulito)");
console.log("");
console.log(`Findings critici: ${criticalFindings.length}`);
for (const finding of criticalFindings.slice(0, 40)) console.log(`- ${finding.file}: ${finding.type}`);
if (criticalFindings.length > 40) console.log(`... altri ${criticalFindings.length - 40} risultati`);
console.log(`Findings warning: ${warningFindings.length}`);
for (const finding of warningFindings.slice(0, 20)) console.log(`- ${finding.file}: ${finding.type}`);
if (warningFindings.length > 20) console.log(`... altri ${warningFindings.length - 20} risultati`);
console.log(`Findings informativi: ${infoFindings.length}`);
for (const finding of infoFindings.slice(0, 20)) console.log(`- ${finding.file}: ${finding.type}`);
if (infoFindings.length > 20) console.log(`... altri ${infoFindings.length - 20} risultati`);
console.log("");
for (const warning of warnings) console.warn(`WARN: ${warning}`);
for (const failure of failures) console.error(`FAIL: ${failure}`);

if (failures.length > 0) {
  console.error("");
  console.error(`Controllo fallito: ${failures.length} problemi.`);
  process.exit(1);
}

console.log("Controllo sicurezza completato.");
