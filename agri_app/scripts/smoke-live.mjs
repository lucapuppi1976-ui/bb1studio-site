const baseUrl = process.argv[2] || "https://bb1studio.com/agri_app";

const pageChecks = [
  "/login",
  "/dashboard",
  "/tasks",
  "/tasks?scope=open",
  "/tasks?scope=today",
  "/tasks?scope=overdue",
  "/today",
  "/notifications",
  "/settings/notifications",
  "/plants",
  "/interventions",
  "/reports",
  "/recurring-tasks",
  "/offline-sync",
  "/scan",
];

const apiChecks = [
  { name: "health", path: "/api/health" },
  { name: "ready", path: "/api/ready" },
];

const languageChecks = [
  { lang: "it", expected: "Accesso" },
  { lang: "es", expected: "Acceso" },
  { lang: "en", expected: "Invalid" },
  { lang: "sk", expected: "Neplatný" },
  { lang: "fr", expected: "Accès" },
  { lang: "de", expected: "Ungültiger" },
  { lang: "ru", expected: "Недействительный" },
  { lang: "hu", expected: "Érvénytelen" },
];

function buildUrl(path) {
  return `${baseUrl.replace(/\/$/, "")}${path}`;
}

async function checkApi({ name, path }) {
  const response = await fetch(buildUrl(path));
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`${name}: HTTP ${response.status} ${text.slice(0, 180)}`);
  }

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`${name}: risposta non JSON: ${text.slice(0, 180)}`);
  }

  if (json.ok !== true) {
    throw new Error(`${name}: risposta non valida ${text.slice(0, 180)}`);
  }

  console.log(`✓ API ${name}`);
}

async function checkPage(path) {
  const response = await fetch(buildUrl(path));
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`${path}: HTTP ${response.status} ${text.slice(0, 180)}`);
  }

  const badSignals = [
    "Internal Server Error",
    "Application error",
    "InvariantError",
    "clientReferenceManifest",
    "PrismaClientKnownRequestError",
    "NEXT_NOT_FOUND",
  ];

  const found = badSignals.find((signal) => text.includes(signal));

  if (found) {
    throw new Error(`${path}: trovato possibile errore pagina: ${found}`);
  }

  console.log(`✓ PAGE ${path}`);
}

async function checkLanguage({ lang, expected }) {
  const response = await fetch(buildUrl("/api/cron/recurring-tasks?secret=wrong"), {
    method: "POST",
    headers: {
      "Accept-Language": lang,
    },
  });

  const text = await response.text();

  if (response.status !== 401) {
    throw new Error(`i18n ${lang}: atteso 401, ricevuto ${response.status}`);
  }

  if (!text.includes(expected)) {
    throw new Error(`i18n ${lang}: testo inatteso: ${text.slice(0, 180)}`);
  }

  console.log(`✓ I18N ${lang}`);
}

const failures = [];

console.log("");
console.log("Agri App smoke test");
console.log(`Base URL: ${baseUrl}`);
console.log("");

for (const item of apiChecks) {
  try {
    await checkApi(item);
  } catch (error) {
    failures.push(error);
    console.error(`✗ ${error.message}`);
  }
}

for (const path of pageChecks) {
  try {
    await checkPage(path);
  } catch (error) {
    failures.push(error);
    console.error(`✗ ${error.message}`);
  }
}

for (const item of languageChecks) {
  try {
    await checkLanguage(item);
  } catch (error) {
    failures.push(error);
    console.error(`✗ ${error.message}`);
  }
}

console.log("");

if (failures.length > 0) {
  console.error(`Smoke test fallito: ${failures.length} problemi.`);
  process.exit(1);
}

console.log("Smoke test completato con successo.");
