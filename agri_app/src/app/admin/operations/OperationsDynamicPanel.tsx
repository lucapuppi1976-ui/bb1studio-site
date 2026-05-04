"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type CheckStatus = "idle" | "loading" | "ok" | "error";

type CheckResult = {
  status: CheckStatus;
  httpStatus?: number;
  data?: unknown;
  error?: string;
  updatedAt?: string;
};

function getBasePath() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.pathname.startsWith("/agri_app") ? "/agri_app" : "";
}

function apiPath(path: string) {
  return `${getBasePath()}${path}`;
}

async function fetchJson(path: string): Promise<{ httpStatus: number; data: unknown }> {
  const response = await fetch(apiPath(path), {
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
    },
  });

  const text = await response.text();
  let data: unknown = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = {
      raw: text,
    };
  }

  return {
    httpStatus: response.status,
    data,
  };
}

function nowLabel() {
  return new Date().toLocaleString("it-IT", {
    dateStyle: "short",
    timeStyle: "medium",
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getNestedValue(data: unknown, path: string) {
  if (!isRecord(data)) {
    return "—";
  }

  let current: unknown = data;

  for (const part of path.split(".")) {
    if (!isRecord(current) || !(part in current)) {
      return "—";
    }

    current = current[part];
  }

  if (typeof current === "boolean") {
    return current ? "true" : "false";
  }

  if (current === null || current === undefined || current === "") {
    return "—";
  }

  return String(current);
}

function StatusPill({ result }: { result: CheckResult }) {
  const label =
    result.status === "ok"
      ? "OK"
      : result.status === "error"
        ? "ATTENZIONE"
        : result.status === "loading"
          ? "CARICAMENTO"
          : "IN ATTESA";

  return (
    <span className="rounded-full border px-2 py-1 text-xs font-semibold uppercase tracking-wide">
      {label}
    </span>
  );
}

function ResultCard({
  title,
  description,
  result,
  children,
}: {
  title: string;
  description: string;
  result: CheckResult;
  children?: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <StatusPill result={result} />
      </div>

      <dl className="mt-4 grid gap-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">HTTP</dt>
          <dd className="font-medium">{result.httpStatus ?? "—"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Aggiornato</dt>
          <dd className="font-medium">{result.updatedAt ?? "—"}</dd>
        </div>
      </dl>

      {result.error ? (
        <p className="mt-4 rounded-xl border p-3 text-sm text-muted-foreground">
          {result.error}
        </p>
      ) : null}

      {children}
    </article>
  );
}

function PreflightSummary({ data }: { data: unknown }) {
  const rows = useMemo(
    () => [
      ["Database", getNestedValue(data, "database.classification")],
      ["Email enabled", getNestedValue(data, "email.enabled")],
      ["Email from", getNestedValue(data, "email.from")],
      ["Cron configured", getNestedValue(data, "cronSecretConfigured")],
      ["Ricorrenze duplicate", getNestedValue(data, "recurring.duplicateGroups.length")],
    ],
    [data],
  );

  return (
    <div className="mt-4 grid gap-2 text-sm">
      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between gap-4 rounded-xl border p-3">
          <span className="text-muted-foreground">{label}</span>
          <span className="text-right font-medium">{value}</span>
        </div>
      ))}
    </div>
  );
}

export default function OperationsDynamicPanel() {
  const [health, setHealth] = useState<CheckResult>({ status: "idle" });
  const [ready, setReady] = useState<CheckResult>({ status: "idle" });
  const [preflight, setPreflight] = useState<CheckResult>({ status: "idle" });

  const refreshPublic = useCallback(async () => {
    setHealth({ status: "loading" });
    setReady({ status: "loading" });

    try {
      const result = await fetchJson("/api/health");
      const ok = isRecord(result.data) && result.data.ok === true;

      setHealth({
        status: ok ? "ok" : "error",
        httpStatus: result.httpStatus,
        data: result.data,
        updatedAt: nowLabel(),
        error: ok ? undefined : "Health live non conforme.",
      });
    } catch (error) {
      setHealth({
        status: "error",
        updatedAt: nowLabel(),
        error: error instanceof Error ? error.message : "Errore health sconosciuto.",
      });
    }

    try {
      const result = await fetchJson("/api/ready");
      const ok = isRecord(result.data) && result.data.ok === true;

      setReady({
        status: ok ? "ok" : "error",
        httpStatus: result.httpStatus,
        data: result.data,
        updatedAt: nowLabel(),
        error: ok ? undefined : "Ready live non conforme.",
      });
    } catch (error) {
      setReady({
        status: "error",
        updatedAt: nowLabel(),
        error: error instanceof Error ? error.message : "Errore ready sconosciuto.",
      });
    }
  }, []);

  const refreshPreflight = useCallback(async () => {
    setPreflight({ status: "loading" });

    try {
      const result = await fetchJson("/api/ops/preflight");
      const ok = isRecord(result.data) && result.data.ok === true;

      setPreflight({
        status: ok ? "ok" : "error",
        httpStatus: result.httpStatus,
        data: result.data,
        updatedAt: nowLabel(),
        error: ok
          ? undefined
          : "Preflight non disponibile: serve sessione super admin o configurazione autorizzata.",
      });
    } catch (error) {
      setPreflight({
        status: "error",
        updatedAt: nowLabel(),
        error: error instanceof Error ? error.message : "Errore preflight sconosciuto.",
      });
    }
  }, []);

  useEffect(() => {
    refreshPublic();
  }, [refreshPublic]);

  return (
    <section className="rounded-2xl border p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Stato live dinamico</h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Controlli eseguiti dal browser su endpoint pubblici e, se la sessione admin lo consente,
            sul preflight protetto. Non inserire CRON_SECRET in questa pagina.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted"
            type="button"
            onClick={refreshPublic}
          >
            Aggiorna health/ready
          </button>
          <button
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted"
            type="button"
            onClick={refreshPreflight}
          >
            Esegui preflight admin
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <ResultCard
          title="Health"
          description="Verifica pubblica /api/health."
          result={health}
        />
        <ResultCard
          title="Ready"
          description="Verifica pubblica /api/ready."
          result={ready}
        />
        <ResultCard
          title="Preflight admin"
          description="Verifica protetta via sessione admin, senza secret in UI."
          result={preflight}
        >
          {preflight.data ? <PreflightSummary data={preflight.data} /> : null}
        </ResultCard>
      </div>
    </section>
  );
}
