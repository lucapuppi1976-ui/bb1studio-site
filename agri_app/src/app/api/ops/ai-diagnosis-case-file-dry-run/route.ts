import { NextResponse, type NextRequest } from "next/server";

import {
  createDiagnosisCaseFile,
  createDiagnosisCaseFileFromDryRunReport,
  formatDiagnosisCaseFile,
} from "../../../../lib/ai/photoDiagnosisCaseFile";
import {
  createIncompleteEvidenceBundleFixture,
  createValidEvidenceBundleFixture,
} from "../../../../lib/ai/photoEvidenceBundle";
import type { AiProviderRequestPreviewInput } from "../../../../lib/ai/photoDiagnosisProviderRequest";

export const dynamic = "force-dynamic";

function hasSecretAccess(request: NextRequest) {
  const expected = (process.env.CRON_SECRET || "").trim();

  if (!expected) {
    return false;
  }

  const provided = (request.nextUrl.searchParams.get("secret") || "").trim();
  return provided === expected;
}

function forbidden(request: NextRequest) {
  if (hasSecretAccess(request)) {
    return null;
  }

  return NextResponse.json(
    {
      ok: false,
      error: "Accesso non consentito.",
    },
    { status: 403 },
  );
}

export async function GET(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  const sample = request.nextUrl.searchParams.get("sample");
  const includeFullReport = request.nextUrl.searchParams.get("report") === "full";
  const input =
    sample === "incomplete"
      ? createIncompleteEvidenceBundleFixture()
      : createValidEvidenceBundleFixture();

  const caseFile = createDiagnosisCaseFile(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-diagnosis-case-file-dry-run",
    mode: "diagnosis-case-file-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    automaticTaskCreationPerformed: false,
    automaticInterventionCreationPerformed: false,
    allowedToExecute: false,
    humanReviewRequired: true,
    caseFile,
    report: includeFullReport
      ? createDiagnosisCaseFileFromDryRunReport(input)
      : formatDiagnosisCaseFile(caseFile),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input: AiProviderRequestPreviewInput = createValidEvidenceBundleFixture();

  try {
    const payload = await request.json();
    input = payload?.input || payload || input;
  } catch {
    input = createValidEvidenceBundleFixture();
  }

  const caseFile = createDiagnosisCaseFile(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-diagnosis-case-file-dry-run",
    mode: "diagnosis-case-file-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    automaticTaskCreationPerformed: false,
    automaticInterventionCreationPerformed: false,
    allowedToExecute: false,
    humanReviewRequired: true,
    caseFile,
    report: formatDiagnosisCaseFile(caseFile),
  });
}
