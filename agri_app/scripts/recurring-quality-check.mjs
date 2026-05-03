#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const rawArgs = process.argv.slice(2);
const args = new Set(rawArgs);
const expectArg = rawArgs.find((arg) => arg.startsWith("--expect="));
const expected = expectArg ? expectArg.split("=", 2)[1] : null;
const failOnLive = args.has("--fail-on-live");
const strict = args.has("--strict");
const jsonOutput = args.has("--json");

function findRepoRoot(start) {
  let current = path.resolve(start);
  while (current !== path.dirname(current)) {
    if (fs.existsSync(path.join(current, ".git"))) return current;
    current = path.dirname(current);
  }
  return path.resolve(start);
}

function parseDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};

  const values = {};
  for (const rawLine of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const index = line.indexOf("=");
    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    value = value.replace(/^['"]|['"]$/g, "");
    values[key] = value;
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

function normalizeJson(value) {
  return JSON.parse(JSON.stringify(value, (_key, item) => {
    if (typeof item === "bigint") return Number(item);
    if (item instanceof Date) return item.toISOString();
    return item;
  }));
}

function daysBetween(a, b) {
  return Math.round((a.getTime() - b.getTime()) / 86400000);
}

function printLine(...items) {
  if (!jsonOutput) console.log(...items);
}

const cwd = process.cwd();
const repoRoot = findRepoRoot(cwd);
const appDir = fs.existsSync(path.join(repoRoot, "agri_app")) ? path.join(repoRoot, "agri_app") : repoRoot;
const envFile = path.join(appDir, ".env");
const envValues = parseDotEnv(envFile);

const databaseUrl = process.env.DATABASE_URL || envValues.DATABASE_URL || "";
if (!process.env.DATABASE_URL && databaseUrl) {
  process.env.DATABASE_URL = databaseUrl;
}

const report = {
  ok: true,
  workingDirectory: cwd,
  appDir,
  envFound: fs.existsSync(envFile),
  database: {
    redactedUrl: databaseUrl ? redactUrl(databaseUrl) : "",
    host: "",
    name: "",
    classification: "missing",
  },
  checkedAt: new Date().toISOString(),
  counts: {},
  duplicateGroups: [],
  dueTemplates: [],
  unassignedTemplates: [],
  recentGeneratedTasks: [],
  warnings: [],
  failures: [],
};

function finishEarly(code = 1) {
  report.ok = false;
  if (jsonOutput) console.log(JSON.stringify(report, null, 2));
  else {
    for (const failure of report.failures) console.error(`FAIL: ${failure}`);
  }
  process.exit(code);
}

if (!databaseUrl) {
  report.failures.push("DATABASE_URL non trovata in process.env o .env.");
  finishEarly(1);
}

let parsedUrl;
try {
  parsedUrl = new URL(databaseUrl);
} catch {
  report.database.classification = "invalid";
  report.failures.push("DATABASE_URL non è una URL valida.");
  finishEarly(1);
}

report.database.host = parsedUrl.hostname;
report.database.name = parsedUrl.pathname.replace(/^\//, "");
report.database.classification = classifyDatabaseName(report.database.name);

if (expected && !["dev", "live", "unknown"].includes(expected)) {
  report.failures.push("Valore --expect non valido. Usa dev, live o unknown.");
}

if (expected && report.database.classification !== expected) {
  report.failures.push(`DB atteso ${expected.toUpperCase()}, rilevato ${report.database.classification.toUpperCase()}.`);
}

if (failOnLive && report.database.classification === "live") {
  report.failures.push("DB LIVE rilevato. Operazione bloccata da --fail-on-live.");
}

if (report.database.classification === "unknown") {
  report.warnings.push("Database non riconosciuto come DEV o LIVE standard. Verifica manualmente.");
}

printLine("Agri App recurring quality check");
printLine("Working directory:", cwd);
printLine(".env trovato:", report.envFound);
printLine("URL redatta:", report.database.redactedUrl);
printLine("Host:", report.database.host);
printLine("Database:", report.database.name);
printLine("Classificazione:", report.database.classification.toUpperCase());
printLine("");

if (report.failures.length > 0) finishEarly(1);

const { PrismaClient } = await import("@prisma/client");
const prisma = new PrismaClient();

try {
  const now = new Date();

  const [
    templatesTotal,
    templatesActive,
    templatesPaused,
    templatesDue,
    templatesUnassigned,
    generatedTasks,
    generatedWithoutSourceDate,
    generatedWithoutTemplate,
    openGeneratedTasks,
    completedGeneratedTasks,
  ] = await Promise.all([
    prisma.taskRecurrenceTemplate.count(),
    prisma.taskRecurrenceTemplate.count({ where: { active: true } }),
    prisma.taskRecurrenceTemplate.count({ where: { active: false } }),
    prisma.taskRecurrenceTemplate.count({ where: { active: true, nextDueDate: { lte: now } } }),
    prisma.taskRecurrenceTemplate.count({ where: { active: true, assignedToUserId: null } }),
    prisma.task.count({ where: { recurrenceTemplateId: { not: null } } }),
    prisma.task.count({ where: { recurrenceTemplateId: { not: null }, recurrenceSourceDate: null } }),
    prisma.task.count({ where: { recurrenceTemplateId: null, recurrenceSourceDate: { not: null } } }),
    prisma.task.count({
      where: {
        recurrenceTemplateId: { not: null },
        status: { in: ["SCHEDULED", "NOTIFIED"] },
      },
    }),
    prisma.task.count({
      where: {
        recurrenceTemplateId: { not: null },
        status: "DONE",
      },
    }),
  ]);

  report.counts = {
    templatesTotal,
    templatesActive,
    templatesPaused,
    templatesDue,
    templatesUnassigned,
    generatedTasks,
    generatedWithoutSourceDate,
    generatedWithoutTemplate,
    openGeneratedTasks,
    completedGeneratedTasks,
  };

  const duplicateGroups = await prisma.$queryRaw`
    SELECT "recurrenceTemplateId", "recurrenceSourceDate", COUNT(*)::int AS count
    FROM "Task"
    WHERE "recurrenceTemplateId" IS NOT NULL
      AND "recurrenceSourceDate" IS NOT NULL
    GROUP BY "recurrenceTemplateId", "recurrenceSourceDate"
    HAVING COUNT(*) > 1
    ORDER BY count DESC
    LIMIT 20
  `;

  report.duplicateGroups = normalizeJson(duplicateGroups);

  const [dueTemplates, unassignedTemplates, recentGeneratedTasks] = await Promise.all([
    prisma.taskRecurrenceTemplate.findMany({
      where: { active: true, nextDueDate: { lte: now } },
      include: {
        plant: { select: { id: true, code: true, name: true, species: true } },
        assignedTo: { select: { id: true, name: true, email: true } },
      },
      orderBy: { nextDueDate: "asc" },
      take: 20,
    }),
    prisma.taskRecurrenceTemplate.findMany({
      where: { active: true, assignedToUserId: null },
      include: {
        plant: { select: { id: true, code: true, name: true, species: true } },
      },
      orderBy: { nextDueDate: "asc" },
      take: 20,
    }),
    prisma.task.findMany({
      where: { recurrenceTemplateId: { not: null } },
      include: {
        plant: { select: { id: true, code: true, name: true, species: true } },
        assignedTo: { select: { id: true, name: true, email: true } },
        recurrenceTemplate: { select: { id: true, title: true, nextDueDate: true, active: true } },
      },
      orderBy: [{ createdAt: "desc" }],
      take: 20,
    }),
  ]);

  report.dueTemplates = dueTemplates.map((template) => ({
    id: template.id,
    title: template.title,
    nextDueDate: template.nextDueDate.toISOString(),
    overdueDays: Math.max(0, daysBetween(now, template.nextDueDate)),
    plant: {
      id: template.plant.id,
      code: template.plant.code,
      label: template.plant.name || template.plant.species,
    },
    assignedTo: template.assignedTo?.name || template.assignedTo?.email || null,
  }));

  report.unassignedTemplates = unassignedTemplates.map((template) => ({
    id: template.id,
    title: template.title,
    nextDueDate: template.nextDueDate.toISOString(),
    plant: {
      id: template.plant.id,
      code: template.plant.code,
      label: template.plant.name || template.plant.species,
    },
  }));

  report.recentGeneratedTasks = recentGeneratedTasks.map((task) => ({
    id: task.id,
    title: task.title,
    status: task.status,
    dueDate: task.dueDate.toISOString(),
    recurrenceSourceDate: task.recurrenceSourceDate?.toISOString() || null,
    createdAt: task.createdAt.toISOString(),
    plant: {
      id: task.plant.id,
      code: task.plant.code,
      label: task.plant.name || task.plant.species,
    },
    assignedTo: task.assignedTo?.name || task.assignedTo?.email || null,
    recurrenceTemplate: task.recurrenceTemplate
      ? {
          id: task.recurrenceTemplate.id,
          title: task.recurrenceTemplate.title,
          active: task.recurrenceTemplate.active,
          nextDueDate: task.recurrenceTemplate.nextDueDate.toISOString(),
        }
      : null,
  }));

  if (generatedWithoutSourceDate > 0) {
    report.failures.push(`Ci sono ${generatedWithoutSourceDate} attività generate senza recurrenceSourceDate.`);
  }

  if (generatedWithoutTemplate > 0) {
    report.failures.push(`Ci sono ${generatedWithoutTemplate} attività con recurrenceSourceDate ma senza recurrenceTemplateId.`);
  }

  if (report.duplicateGroups.length > 0) {
    report.failures.push(`Trovati ${report.duplicateGroups.length} gruppi duplicati per recurrenceTemplateId + recurrenceSourceDate.`);
  }

  if (templatesDue > 0) {
    report.warnings.push(`Ci sono ${templatesDue} programmazioni attive già dovute. Il cron reale dovrebbe elaborarle alla prossima esecuzione.`);
  }

  if (templatesUnassigned > 0) {
    report.warnings.push(`Ci sono ${templatesUnassigned} programmazioni attive senza responsabile.`);
  }

  if (strict && report.warnings.length > 0) {
    report.failures.push("Modalità --strict: warning trattati come errori.");
  }

  report.ok = report.failures.length === 0;

  if (jsonOutput) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printLine("Conteggi:");
    for (const [key, value] of Object.entries(report.counts)) {
      printLine(`- ${key}: ${value}`);
    }

    printLine("");
    printLine(`Doppioni recurrenceTemplateId + recurrenceSourceDate: ${report.duplicateGroups.length}`);

    if (report.dueTemplates.length > 0) {
      printLine("");
      printLine("Programmazioni dovute:");
      for (const template of report.dueTemplates) {
        printLine(`- ${template.title} | ${template.plant.code} | nextDueDate=${template.nextDueDate} | overdueDays=${template.overdueDays}`);
      }
    }

    if (report.unassignedTemplates.length > 0) {
      printLine("");
      printLine("Programmazioni attive senza responsabile:");
      for (const template of report.unassignedTemplates) {
        printLine(`- ${template.title} | ${template.plant.code} | nextDueDate=${template.nextDueDate}`);
      }
    }

    if (report.recentGeneratedTasks.length > 0) {
      printLine("");
      printLine("Ultime attività generate:");
      for (const task of report.recentGeneratedTasks.slice(0, 10)) {
        printLine(`- ${task.title} | ${task.plant.code} | status=${task.status} | source=${task.recurrenceSourceDate || "(mancante)"}`);
      }
    }

    printLine("");
    for (const warning of report.warnings) console.warn(`WARN: ${warning}`);
    for (const failure of report.failures) console.error(`FAIL: ${failure}`);

    if (report.ok) {
      printLine("Controllo qualità programmazioni completato.");
    }
  }

  if (!report.ok) process.exit(1);
} finally {
  await prisma.$disconnect();
}
