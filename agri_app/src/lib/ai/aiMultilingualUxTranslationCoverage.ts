import {
  AGRI_APP_DEFAULT_LANGUAGE,
  AGRI_APP_SUPPORTED_LANGUAGES,
  type AgriAppLanguageCode,
} from "@/lib/i18n/agriAppLanguages";
import {
  AGRI_APP_UX_DICTIONARY,
  AGRI_APP_UX_DICTIONARY_KEYS,
  type AgriAppUxDictionaryKey,
} from "@/lib/i18n/agriAppUxDictionary";

export type TranslationCoverageMode = "dry-run" | "multilingual-ux-readiness";
export type TranslationCoverageSeverity = "info" | "watch" | "elevated" | "critical";
export type TranslationCoveragePriority = "low" | "medium" | "high" | "urgent";
export type TranslationCoverageStatus =
  | "blocked"
  | "translation-design-ready"
  | "language-review-ready"
  | "multilingual-uat-ready";

export type TranslationCoverageLane =
  | "language_catalog"
  | "translation_dictionary"
  | "missing_translation"
  | "fallback_policy"
  | "language_switcher"
  | "onboarding_i18n"
  | "admin_i18n"
  | "hardcoded_text_audit";

export interface TranslationCoverageInput {
  expectedLanguageCount?: number;
  dictionaryKeyCount?: number;
  missingTranslationCount?: number;
  fallbackPolicyScore?: number;
  languageSwitcherScore?: number;
  onboardingI18nScore?: number;
  adminI18nScore?: number;
  hardcodedTextRiskCount?: number;
  openCriticalI18nIssueCount?: number;
  openMajorI18nIssueCount?: number;
  reviewerRole?: string;
}

export interface TranslationCoverageLanguageItem {
  id: string;
  code: AgriAppLanguageCode;
  label: string;
  nativeLabel: string;
  enabledForUat: boolean;
  fallback: AgriAppLanguageCode;
  translatedKeyCount: number;
  expectedKeyCount: number;
  coveragePercent: number;
  status: "ready" | "review" | "blocked";
}

export interface TranslationCoverageBoardItem {
  id: string;
  label: string;
  lane: TranslationCoverageLane;
  score: number;
  priority: TranslationCoveragePriority;
  severity: TranslationCoverageSeverity;
  question: string;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TranslationCoverageFindingItem {
  id: string;
  label: string;
  lane: TranslationCoverageLane;
  severity: TranslationCoverageSeverity;
  reason: string;
  manualResolution: string;
  blocksMultilingualUat: boolean;
}

export const MULTILINGUAL_UX_TRANSLATION_GUARDRAIL = {
  multilingualUxCoverageReady: true,
  languageCatalogReady: true,
  translationDictionaryReady: true,
  missingTranslationGateReady: true,
  fallbackPolicyReady: true,
  languageSwitcherReadinessReady: true,
  onboardingI18nReady: true,
  adminI18nReady: true,
  hardcodedTextAuditReady: true,
  onlineControlledGo: true,
  liveUatReady: true,
  controlledDryRunProductionReady: true,
  publicSignupAllowed: false,
  accountWriteAllowed: false,
  testerInviteSendAllowed: false,
  testerInvitePersistenceAllowed: false,
  providerAiReady: false,
  providerCalled: false,
  providerCallAllowed: false,
  providerCallPerformed: false,
  providerRequestDispatchAllowed: false,
  providerResponseIntakeAllowed: false,
  providerResultPersistenceAllowed: false,
  persistenceReady: false,
  memoryPersistenceReady: false,
  persistencePerformed: false,
  memoryPersistencePerformed: false,
  dbPersistenceAllowed: false,
  memoryPersistenceAllowed: false,
  taskCreated: false,
  interventionCreated: false,
  automaticExecutionPerformed: false,
  automaticTaskCreationAllowed: false,
  automaticInterventionCreationAllowed: false,
  automaticExecutionAllowed: false,
  publicShareAllowed: false,
  publicSharePerformed: false,
  productPrescriptionAllowed: false,
  productPrescriptionPerformed: false,
  dosageAdviceAllowed: false,
  dosageAdvicePerformed: false,
  incidentRecordPersistenceAllowed: false,
  incidentRecordWriteAllowed: false,
  publicExportArtifactWriteAllowed: false,
  publicExportArtifactWritePerformed: false,
  operationalExecutionAllowed: false,
  operationalExecutionPerformed: false,
  executionCommandAllowed: false,
  executionCommandPerformed: false,
  schemaWriteAllowed: false,
  schemaWritePerformed: false,
  migrationExecutionAllowed: false,
  migrationExecutionPerformed: false,
  storageActivationAllowed: false,
  storageActivationPerformed: false,
  manualDispatchOnly: true,
  humanReviewRequired: true,
  localAnalysisOnly: true,
  redactedOutputOnly: true,
  localMemoryOnly: true,
  localLearningOnly: true,
  localPromotionOnly: true,
  localQualityOnly: true,
} as const;

export interface TranslationCoverageReport {
  generatedAt: string;
  mode: TranslationCoverageMode;
  context: Required<TranslationCoverageInput>;
  readiness: typeof MULTILINGUAL_UX_TRANSLATION_GUARDRAIL;
  defaultLanguage: AgriAppLanguageCode;
  supportedLanguages: TranslationCoverageLanguageItem[];
  dictionaryKeys: AgriAppUxDictionaryKey[];
  translationCoverageScore: number;
  translationCoverageStatus: TranslationCoverageStatus;
  overallSeverity: TranslationCoverageSeverity;
  languageCatalogBoard: TranslationCoverageBoardItem[];
  translationDictionaryBoard: TranslationCoverageBoardItem[];
  missingTranslationBoard: TranslationCoverageBoardItem[];
  fallbackPolicyBoard: TranslationCoverageBoardItem[];
  languageSwitcherBoard: TranslationCoverageBoardItem[];
  onboardingI18nBoard: TranslationCoverageBoardItem[];
  adminI18nBoard: TranslationCoverageBoardItem[];
  hardcodedTextAuditBoard: TranslationCoverageBoardItem[];
  findings: TranslationCoverageFindingItem[];
  stagedRoadmap: Record<"v187" | "v188" | "v189" | "v190" | "v191", string>;
  redactedExportBundle: {
    exportId: string;
    includesFieldIdentifiers: false;
    includesPrivateNotes: false;
    includesProviderPayloads: false;
    includesOperationalInternalData: false;
    includesProductionForecasts: false;
    includesProductRecommendations: false;
    includesDosageGuidance: false;
    sections: string[];
  };
  safetySummary: string[];
}

function normalizeInput(input: TranslationCoverageInput): Required<TranslationCoverageInput> {
  return {
    expectedLanguageCount: input.expectedLanguageCount ?? 6,
    dictionaryKeyCount: input.dictionaryKeyCount ?? AGRI_APP_UX_DICTIONARY_KEYS.length,
    missingTranslationCount: input.missingTranslationCount ?? 0,
    fallbackPolicyScore: input.fallbackPolicyScore ?? 90,
    languageSwitcherScore: input.languageSwitcherScore ?? 82,
    onboardingI18nScore: input.onboardingI18nScore ?? 86,
    adminI18nScore: input.adminI18nScore ?? 78,
    hardcodedTextRiskCount: input.hardcodedTextRiskCount ?? 1,
    openCriticalI18nIssueCount: input.openCriticalI18nIssueCount ?? 0,
    openMajorI18nIssueCount: input.openMajorI18nIssueCount ?? 1,
    reviewerRole: input.reviewerRole ?? "multilingual UX reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TranslationCoverageSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromScore(score: number): TranslationCoveragePriority {
  if (score < 65) return "urgent";
  if (score < 75) return "high";
  if (score < 85) return "medium";
  return "low";
}

function boardItem(
  id: string,
  label: string,
  lane: TranslationCoverageLane,
  score: number,
  question: string,
  expectedEvidence: string[],
  safeOutcome: string,
): TranslationCoverageBoardItem {
  const normalized = clampScore(score);

  return {
    id,
    label,
    lane,
    score: normalized,
    priority: priorityFromScore(normalized),
    severity: severityFromConcern(100 - normalized),
    question,
    expectedEvidence,
    safeOutcome,
  };
}

function countTranslatedKeys(language: AgriAppLanguageCode): number {
  const dictionary = AGRI_APP_UX_DICTIONARY[language];

  return AGRI_APP_UX_DICTIONARY_KEYS.filter((key) => {
    const value = dictionary[key];
    return typeof value === "string" && value.trim().length > 0;
  }).length;
}

function buildLanguageItems(): TranslationCoverageLanguageItem[] {
  const expectedKeyCount = AGRI_APP_UX_DICTIONARY_KEYS.length;

  return AGRI_APP_SUPPORTED_LANGUAGES.map((language) => {
    const translatedKeyCount = countTranslatedKeys(language.code);
    const coveragePercent = clampScore((translatedKeyCount / expectedKeyCount) * 100);

    return {
      id: "I18N_LANG_" + language.code.toUpperCase(),
      code: language.code,
      label: language.label,
      nativeLabel: language.nativeLabel,
      enabledForUat: language.enabledForUat,
      fallback: language.fallback,
      translatedKeyCount,
      expectedKeyCount,
      coveragePercent,
      status: coveragePercent >= 100 ? "ready" : coveragePercent >= 85 ? "review" : "blocked",
    };
  });
}

export function buildAiMultilingualUxTranslationCoverageReport(
  input: TranslationCoverageInput = {},
): TranslationCoverageReport {
  const context = normalizeInput(input);
  const supportedLanguages = buildLanguageItems();
  const minimumCoverage = Math.min(...supportedLanguages.map((language) => language.coveragePercent));
  const averageCoverage =
    supportedLanguages.reduce((sum, language) => sum + language.coveragePercent, 0) /
    Math.max(1, supportedLanguages.length);

  const languageCatalogBoard = [
    boardItem(
      "I18N_CATALOG_001",
      "Supported language catalog",
      "language_catalog",
      supportedLanguages.length >= context.expectedLanguageCount ? 100 : 60,
      "Are all expected UAT languages listed?",
      ["it", "en", "es", "fr", "de", "pt"],
      "Language catalog is explicit and reviewable.",
    ),
  ];

  const translationDictionaryBoard = [
    boardItem(
      "I18N_DICT_001",
      "UX dictionary coverage",
      "translation_dictionary",
      averageCoverage,
      "Are UX keys translated for all UAT languages?",
      ["dictionary keys", "language dictionaries", "coverage score"],
      "Core UAT copy is centralized in a dictionary.",
    ),
  ];

  const missingTranslationBoard = [
    boardItem(
      "I18N_MISSING_001",
      "Missing translation gate",
      "missing_translation",
      context.missingTranslationCount === 0 ? 100 : 50,
      "Are missing translations blocked before external UAT?",
      ["missingTranslationCount=0", "fallback policy"],
      "Missing translations are visible before tester expansion.",
    ),
  ];

  const fallbackPolicyBoard = [
    boardItem(
      "I18N_FALLBACK_001",
      "Fallback language policy",
      "fallback_policy",
      context.fallbackPolicyScore,
      "Is every language mapped to a safe fallback?",
      ["fallback language", "default language"],
      "Fallback language policy is explicit.",
    ),
  ];

  const languageSwitcherBoard = [
    boardItem(
      "I18N_SWITCHER_001",
      "Language switcher readiness",
      "language_switcher",
      context.languageSwitcherScore,
      "Can testers identify and change language?",
      ["visible selector", "preferred language", "fallback copy"],
      "Language selection is ready for UX implementation review.",
    ),
  ];

  const onboardingI18nBoard = [
    boardItem(
      "I18N_ONBOARD_001",
      "Tester onboarding translations",
      "onboarding_i18n",
      context.onboardingI18nScore,
      "Are onboarding texts available in every UAT language?",
      ["onboarding title", "onboarding description", "role labels"],
      "Tester onboarding can be localized.",
    ),
  ];

  const adminI18nBoard = [
    boardItem(
      "I18N_ADMIN_001",
      "Admin UX translation coverage",
      "admin_i18n",
      context.adminI18nScore,
      "Are admin status labels understandable across languages?",
      ["admin title", "status labels", "lock messages"],
      "Admin text is ready for translation review.",
    ),
  ];

  const hardcodedTextAuditBoard = [
    boardItem(
      "I18N_HARDCODED_001",
      "Hardcoded text audit",
      "hardcoded_text_audit",
      context.hardcodedTextRiskCount === 0 ? 100 : 75,
      "Are user-facing strings moving toward dictionary usage?",
      ["dictionary keys", "component copy audit"],
      "Hardcoded text risk is tracked before external UAT.",
    ),
  ];

  const findings: TranslationCoverageFindingItem[] = [];

  if (context.openCriticalI18nIssueCount > 0) {
    findings.push({
      id: "I18N_FINDING_001",
      label: "Open critical translation issue",
      lane: "missing_translation",
      severity: "critical",
      reason: String(context.openCriticalI18nIssueCount) + " critical translation issues remain open.",
      manualResolution: "Resolve critical translation issues before multilingual UAT.",
      blocksMultilingualUat: true,
    });
  }

  if (context.missingTranslationCount > 0) {
    findings.push({
      id: "I18N_FINDING_002",
      label: "Missing translation entries",
      lane: "missing_translation",
      severity: "critical",
      reason: String(context.missingTranslationCount) + " translation entries are missing.",
      manualResolution: "Complete dictionary entries or approve explicit fallback.",
      blocksMultilingualUat: true,
    });
  }

  if (context.hardcodedTextRiskCount > 0) {
    findings.push({
      id: "I18N_FINDING_003",
      label: "Hardcoded text risk",
      lane: "hardcoded_text_audit",
      severity: "watch",
      reason: String(context.hardcodedTextRiskCount) + " hardcoded text risk items remain.",
      manualResolution: "Move user-facing text toward centralized dictionary usage.",
      blocksMultilingualUat: false,
    });
  }

  if (context.openMajorI18nIssueCount > 0) {
    findings.push({
      id: "I18N_FINDING_004",
      label: "Open major translation issue",
      lane: "admin_i18n",
      severity: "watch",
      reason: String(context.openMajorI18nIssueCount) + " major translation issues remain open.",
      manualResolution: "Track and review before broader tester rollout.",
      blocksMultilingualUat: false,
    });
  }

  const translationCoverageScore = clampScore(
    (minimumCoverage +
      averageCoverage +
      context.fallbackPolicyScore +
      context.languageSwitcherScore +
      context.onboardingI18nScore +
      context.adminI18nScore) /
      6 -
      findings.filter((item) => item.blocksMultilingualUat).length * 20,
  );

  const translationCoverageStatus: TranslationCoverageStatus =
    findings.some((item) => item.blocksMultilingualUat)
      ? "blocked"
      : translationCoverageScore >= 90
        ? "multilingual-uat-ready"
        : translationCoverageScore >= 80
          ? "language-review-ready"
          : "translation-design-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: MULTILINGUAL_UX_TRANSLATION_GUARDRAIL,
    defaultLanguage: AGRI_APP_DEFAULT_LANGUAGE,
    supportedLanguages,
    dictionaryKeys: AGRI_APP_UX_DICTIONARY_KEYS,
    translationCoverageScore,
    translationCoverageStatus,
    overallSeverity: severityFromConcern(
      context.missingTranslationCount * 30 +
        context.openCriticalI18nIssueCount * 45 +
        context.openMajorI18nIssueCount * 20 +
        context.hardcodedTextRiskCount * 10,
    ),
    languageCatalogBoard,
    translationDictionaryBoard,
    missingTranslationBoard,
    fallbackPolicyBoard,
    languageSwitcherBoard,
    onboardingI18nBoard,
    adminI18nBoard,
    hardcodedTextAuditBoard,
    findings,
    stagedRoadmap: {
      v187: "Multilingual UX completion and translation coverage gate.",
      v188: "UAT feedback, bug triage and evidence session board.",
      v189: "Live UAT launch gate and tester readiness audit.",
      v190: "Invite-only tester account activation after access governance approval.",
      v191: "External UAT expansion after translation and UX signoff.",
    },
    redactedExportBundle: {
      exportId: "multilingual_ux_translation_coverage_v18_7_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "language catalog",
        "translation dictionary",
        "missing translation board",
        "fallback policy",
        "language switcher",
        "onboarding translations",
        "admin translations",
        "hardcoded text audit",
        "findings",
        "safety summary",
      ],
    },
    safetySummary: [
      "Multilingual UX translation coverage is dry-run only.",
      "No public signup, account write, invite send, provider call, AI persistence, task creation, intervention creation, public export write, incident write or operational execution is performed.",
      "User-facing UX dictionary coverage is tracked across UAT languages.",
      "Human review remains mandatory.",
      "V18.7 prepares multilingual tester readiness without expanding activation scope.",
    ],
  };
}

export const aiMultilingualUxTranslationCoverageVersion = "V18.7";
