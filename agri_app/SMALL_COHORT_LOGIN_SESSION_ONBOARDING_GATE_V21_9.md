# V21.9 — Small-Cohort Login Session Verification & Manual Onboarding Gate

V21.9 verifica login, sessione e onboarding manuale della piccola coorte in modalità read-only.

## Endpoint

/api/ops/tester-small-cohort-login-session-onboarding-gate-dry-run

## Stato

- testerSmallCohortLoginSessionOnboardingGateReady=true
- smallCohortLoginSessionVerificationReady=true
- smallCohortManualOnboardingGateReady=true
- candidateAccountReadinessCheckReady=true
- candidatePasswordHashCheckReady=true
- candidateSessionObservationReady=true
- manualLoginObservationReady=true
- onboardingEvidenceReady=true
- manualEvidenceOnly=true
- readOnlyVerificationOnly=true
- accountWriteAllowed=false
- passwordWriteAllowed=false
- inviteEmailSendAllowed=false
- publicSignupAllowed=false
- schemaWriteAllowed=false
- migrationExecutionAllowed=false
- providerAiReady=false
- providerCalled=false
- operationalExecutionAllowed=false
- evidencePersistenceAllowed=false
- issuePersistenceAllowed=false
- humanReviewRequired=true
- redactedOutputOnly=true

## Decisioni possibili

- SMALL_COHORT_UAT_READY
- SMALL_COHORT_LOGIN_OBSERVATION_REQUIRED
- SMALL_COHORT_SESSION_REVIEW_REQUIRED
- ONBOARDING_EVIDENCE_INCOMPLETE
- FIX_BEFORE_UAT
- NO_GO

## Check

npm run ops:tester-small-cohort-login-session-onboarding-gate-check

## Decisione

V21.9 non crea account, non scrive password, non invia email e non apre public signup. Se il gate risulta pronto, V22.0 può avviare lo scenario pack manuale della piccola coorte.
