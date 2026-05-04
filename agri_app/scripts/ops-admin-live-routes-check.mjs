#!/usr/bin/env node

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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const baseUrl = readArg("--base", "https://bb1studio.com/agri_app").replace(/\/+$/, "");
const maxAttempts = Number.parseInt(readArg("--attempts", "12"), 10);
const delayMs = Number.parseInt(readArg("--delay-ms", "5000"), 10);
const routes = ["/admin", "/admin/operations", "/admin/system"];
const acceptedStatuses = new Set([200, 302, 307, 308]);
const retryableStatuses = new Set([0, 408, 425, 429, 500, 502, 503, 504]);
const failures = [];

async function fetchRouteOnce(route) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(`${baseUrl}${route}`, {
      signal: controller.signal,
      redirect: "manual",
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    return {
      route,
      status: response.status,
      ok: acceptedStatuses.has(response.status),
      error: "",
    };
  } catch (error) {
    return {
      route,
      status: 0,
      ok: false,
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchRouteWithRetry(route) {
  let lastResult = {
    route,
    status: 0,
    ok: false,
    error: "Non eseguito",
  };

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    lastResult = await fetchRouteOnce(route);

    const statusLabel = lastResult.status === 0 ? lastResult.error : `HTTP ${lastResult.status}`;
    console.log(
      `${lastResult.ok ? "✓" : "•"} ${route} tentativo ${attempt}/${maxAttempts} — ${statusLabel}`,
    );

    if (lastResult.ok) {
      return lastResult;
    }

    if (!retryableStatuses.has(lastResult.status)) {
      return lastResult;
    }

    if (attempt < maxAttempts) {
      await sleep(delayMs);
    }
  }

  return lastResult;
}

console.log("Agri App admin live routes check V5.3");
console.log(`Base URL: ${baseUrl}`);
console.log(`Attempts: ${maxAttempts}`);
console.log(`Delay ms: ${delayMs}`);
console.log("");

for (const route of routes) {
  const result = await fetchRouteWithRetry(route);

  if (!result.ok) {
    const failure = result.status === 0 ? `${route}: ${result.error}` : `${route}: HTTP ${result.status}`;
    failures.push(failure);
  }
}

console.log("");
console.log("--- Admin live routes summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("Admin live routes check completato con successo.");
