import { NextResponse, type NextRequest } from "next/server";

import {
  createIncompleteSolutionPlaybook,
  createSolutionPlaybook,
  createSolutionPlaybookFromInput,
  formatSolutionPlaybook,
} from "../../../../lib/ai/photoSolutionPlaybook";
import { createPhotoSymptomAnnotationFixture } from "../../../../lib/ai/photoSymptomAnnotation";

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
  const playbook =
    sample === "incomplete"
      ? createIncompleteSolutionPlaybook()
      : createSolutionPlaybook();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-solution-playbook-dry-run",
    mode: "solution-playbook-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    productPrescriptionPerformed: false,
    dosageAdvicePerformed: false,
    automaticTaskCreationPerformed: false,
    automaticInterventionCreationPerformed: false,
    allowedToExecute: false,
    humanReviewRequired: true,
    playbook,
    report: formatSolutionPlaybook(playbook),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input = createPhotoSymptomAnnotationFixture();

  try {
    const payload = await request.json();
    input = payload?.input || payload || input;
  } catch {
    input = createPhotoSymptomAnnotationFixture();
  }

  const playbook = createSolutionPlaybookFromInput(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-solution-playbook-dry-run",
    mode: "solution-playbook-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    productPrescriptionPerformed: false,
    dosageAdvicePerformed: false,
    automaticTaskCreationPerformed: false,
    automaticInterventionCreationPerformed: false,
    allowedToExecute: false,
    humanReviewRequired: true,
    playbook,
    report: formatSolutionPlaybook(playbook),
  });
}
