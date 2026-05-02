#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = new Set(process.argv.slice(2));
const expectArg = process.argv.find((arg) => arg.startsWith("--expect="));
const expected = expectArg ? expectArg.split("=", 2)[1] : null;

function parseDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};

  const values = {};
  for (const rawLine of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const [key, ...rest] = line.split("=");
    let value = rest.join("=").trim();
    value = value.replace(/^['"]|['"]$/g, "");
    values[key.trim()] = value;
  }
  return values;
}

function classifyDatabaseName(name) {
  if (name === "agri_app_dev_db") return "dev";
  if (name === "agri_app") return "live";
  return "unknown";
}

function redactUrl(value) {
  try {
    const url = new URL(value);
    if (url.username) url.username = "***";
    if (url.password) url.password = "***";
    return url.toString();
  } catch {
    return "(URL non valida)";
  }
}

const cwd = process.cwd();
const envFile = path.join(cwd, ".env");
const envValues = parseDotEnv(envFile);
const databaseUrl = process.env.DATABASE_URL || envValues.DATABASE_URL || "";

console.log("Agri App DB safety check");
console.log("Working directory:", cwd);
console.log(".env trovato:", fs.existsSync(envFile));
console.log("");

if (!databaseUrl) {
  console.error("DATABASE_URL non trovata in process.env o .env");
  process.exit(1);
}

let url;
try {
  url = new URL(databaseUrl);
} catch (error) {
  console.error("DATABASE_URL non è una URL valida");
  process.exit(1);
}

const databaseName = url.pathname.replace(/^\//, "");
const classification = classifyDatabaseName(databaseName);

console.log("URL redatta:", redactUrl(databaseUrl));
console.log("Host:", url.hostname);
console.log("Database:", databaseName);
console.log("Classificazione:", classification.toUpperCase());
console.log("");

if (expected && !["dev", "live", "unknown"].includes(expected)) {
  console.error("Valore --expect non valido. Usa dev, live o unknown.");
  process.exit(1);
}

if (expected && classification !== expected) {
  console.error(`ERRORE: atteso ${expected.toUpperCase()}, rilevato ${classification.toUpperCase()}.`);
  process.exit(2);
}

if (args.has("--fail-on-live") && classification === "live") {
  console.error("ERRORE: DB LIVE rilevato. Operazione bloccata da --fail-on-live.");
  process.exit(3);
}

if (classification === "unknown") {
  console.warn("ATTENZIONE: database non riconosciuto. Verifica manualmente prima di procedere.");
}

console.log("Controllo completato.");
