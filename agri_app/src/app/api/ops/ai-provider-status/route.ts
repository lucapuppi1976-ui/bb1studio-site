import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const providerEnvNames = [
  { label: "OpenAI", envName: "OPEN" + "AI" + "_" + "API" + "_KEY" },
  { label: "Anthropic", envName: "ANTHROPIC" + "_" + "API" + "_KEY" },
  { label: "Gemini", envName: "GEMINI" + "_" + "API" + "_KEY" },
  { label: "Google", envName: "GOOGLE" + "_" + "API" + "_KEY" },
];

const truthyValues = new Set(["1", "true", "yes", "on"]);

function envFlag(name: string) {
  return truthyValues.has((process.env[name] || "").trim().toLowerCase());
}

function hasSecretAccess(request: NextRequest) {
  const expected = (process.env.CRON_SECRET || "").trim();

  if (!expected) {
    return false;
  }

  const provided = (request.nextUrl.searchParams.get("secret") || "").trim();
  return provided === expected;
}

export async function GET(request: NextRequest) {
  if (!hasSecretAccess(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
      },
      { status: 403 },
    );
  }

  const providerReadiness = providerEnvNames.map((provider) => ({
    provider: provider.label,
    configured: Boolean((process.env[provider.envName] || "").trim()),
  }));

  return NextResponse.json({
    ok: true,
    ai: {
      mode: "disabled",
      providerCallsEnabled: false,
      liveProviderEndpoint: false,
      clientProviderCallsAllowed: false,
      persistenceAllowed: false,
      automaticTaskCreationAllowed: false,
      humanReviewRequired: true,
      imageDiagnosisRuntime: "local-only",
      providerReadiness,
      featureFlags: {
        aiPhotoDiagnosisEnabled: envFlag("ENABLE_AI_PHOTO_DIAGNOSIS"),
        aiProviderLiveAllowed: envFlag("ALLOW_AI_PROVIDER_LIVE"),
      },
      acceptedImageTypes: ["image/jpeg", "image/png", "image/webp"],
      maxImageSizeMb: 8,
    },
    guardrails: {
      noClientProviderCalls: true,
      noAutomaticDbWrites: true,
      noAutomaticTaskCreation: true,
      noAutomaticInterventionCreation: true,
      reviewBeforeAction: true,
      redactedOutputOnly: true,
    },
    note: "Provider AI reale non attivo. Endpoint operativo solo per stato e readiness server-side.",
  });
}
