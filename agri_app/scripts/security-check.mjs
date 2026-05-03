#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const args = new Set(process.argv.slice(2));
const allowLiveDb = args.has("--allow-live-db");
const allowEmailEnabled = args.has("--allow-email-enabled");
const strict = args.has("--strict");

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

function parseEnv(filePath) {
  const values = new Map();
  if (!fs.existsSync(filePath)) return values;

  for (const raw of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const index = line.indexOf("=");
    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    value = value.replace(/^['\"]|['\"]$/g, "");
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

function shouldSkipFile(fullPath) {
  const rel = path.relative(repoRoot, fullPath).replaceAll(path.sep, "/");
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

function scanForSecrets() {
  const patterns = [
    { name: "PostgreSQL URL", re: /postgres(?:ql)?:\/\/[^\s'\"]+/i },
    { name: "Resend API key", re: /\bre_[A-Za-z0-9_-]{20,}\b/ },
    { name: "DATABASE_URL assignment", re: /\bDATABASE_URL\s*=\s*['\"]?postgres(?:ql)?:\/\//i },
    { name: "CRON_SECRET assignment", re: /\bCRON_SECRET\s*=\s*['\"]?[A-Za-z0-9_-]{16,}/ },
    { name: "NEXTAUTH_SECRET assignment", re: /\bNEXTAUTH_SECRET\s*=\s*['\"]?[^\s'\"]{16,}/ },
    { name: "RESEND_API_KEY assignment", re: /\bRESEND_API_KEY\s*=\s*['\"]?re_[A-Za-z0-9_-]{20,}/ },
    { name: "Demo admin email", re: /\badmin@bb1studio\.local\b/i },
    { name: "Demo operator email", re: /\boperator@bb1studio\.local\b/i },
    { name: "Demo admin password", re: /\bAdmin123!\b/ },
    { name: "Demo operator password", re: /\bOperator123!\b/ },
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

    const rel = path.relative(repoRoot, file).replaceAll(path.sep, "/");
    for (const { name, re } of patterns) {
      const match = re.exec(text);
      if (match) findings.push({ file: rel, type: name });
    }
  }

  return findings;
}

console.log("Agri App security check");
console.log(`Repo root: ${repoRoot}`);
console.log(`App dir: ${appDir}`);
console.log("");

const env = parseEnv(envPath);
const envRel = path.relative(repoRoot, envPath).replaceAll(path.sep, "/");
console.log(`.env trovato: ${fs.existsSync(envPath)}`);
if (fs.existsSync(envPath)) {
  const ignored = isIgnored(envRel);
  console.log(`.env ignorato da git: ${ignored}`);
  if (!ignored) failures.push("agri_app/.env non risulta ignorato da git.");
}

const db = classifyDb(env.get("DATABASE_URL"));
console.log(`DB classificazione: ${db.classification}`);
if (db.host) console.log(`DB host: ${db.host}`);
if (db.database) console.log(`DB name: ${db.database}`);

if (db.classification === "LIVE" && !allowLiveDb) failures.push("Il .env del Codespace punta al DB LIVE. Usare --allow-live-db solo se intenzionale.");
if (db.classification === "UNKNOWN") warnings.push("DATABASE_URL presente ma non riconosciuta come DEV o LIVE standard.");
if (db.classification === "INVALID") failures.push("DATABASE_URL non valida.");

const emailEnabled = env.get("ENABLE_EMAIL_NOTIFICATIONS") || "";
console.log(`ENABLE_EMAIL_NOTIFICATIONS: ${emailEnabled || "(mancante)"}`);
if (emailEnabled.toLowerCase() === "true" && !allowEmailEnabled) failures.push("ENABLE_EMAIL_NOTIFICATIONS=true in .env locale. Ripristinare false dopo i test.");

const resend = env.get("RESEND_API_KEY") || "";
console.log(`RESEND_API_KEY presente: ${Boolean(resend)}`);
if (resend) {
  console.log(`RESEND_API_KEY prefisso re_: ${resend.startsWith("re_")}`);
  console.log(`RESEND_API_KEY contiene Bearer: ${resend.toLowerCase().startsWith("bearer ")}`);
  if (!resend.startsWith("re_")) warnings.push("RESEND_API_KEY non inizia con re_.");
  if (resend.toLowerCase().startsWith("bearer ")) failures.push("RESEND_API_KEY contiene Bearer. Nel .env va salvata solo la chiave re_...");
}

const emailFrom = env.get("EMAIL_FROM") || "";
console.log(`EMAIL_FROM: ${emailFrom || "(mancante)"}`);

const status = run("git status --short", { cwd: repoRoot });
console.log("");
console.log("Git status --short:");
console.log(status || "(pulito)");

const findings = scanForSecrets();
console.log("");
console.log(`Possibili segreti o credenziali demo trovati nei file versionabili: ${findings.length}`);
for (const finding of findings.slice(0, 40)) {
  console.log(`- ${finding.file}: ${finding.type}`);
}
if (findings.length > 40) console.log(`... altri ${findings.length - 40} risultati`);

if (findings.length > 0) {
  const message = "Possibili segreti o credenziali demo trovati in file versionabili. Verificare ed eventualmente ruotare/rimuovere.";
  if (strict) failures.push(message);
  else warnings.push(message);
}

console.log("");
for (const warning of warnings) console.warn(`WARN: ${warning}`);
for (const failure of failures) console.error(`FAIL: ${failure}`);

if (failures.length > 0) {
  console.error("");
  console.error(`Controllo fallito: ${failures.length} problemi.`);
  process.exit(1);
}

console.log("Controllo sicurezza completato.");
