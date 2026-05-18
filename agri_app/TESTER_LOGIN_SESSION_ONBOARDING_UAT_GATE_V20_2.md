# V20.2 — Tester Login Session Verification & Manual Onboarding UAT Gate

V20.2 verifica il primo accesso manuale del tester pilota.

## Endpoint

/api/ops/tester-login-session-onboarding-uat-gate-dry-run

## Stato

- testerLoginSessionOnboardingUatGateReady=true
- manualLoginVerificationReady=true
- sessionVerificationReady=true
- onboardingVerificationReady=true
- protectedRouteVerificationReady=true
- localeFallbackVerificationReady=true
- logoutVerificationReady=true
- readOnlyVerificationOnly=true
- publicSignupAllowed=false
- accountWriteAllowed=false
- testerAccountCreateAllowed=false
- passwordWriteAllowed=false
- inviteEmailSendAllowed=false
- oauthLinkWriteAllowed=false
- schemaWriteAllowed=false
- migrationExecutionAllowed=false
- providerAiReady=false
- providerCalled=false
- operationalExecutionAllowed=false
- publicExportArtifactWriteAllowed=false
- humanReviewRequired=true
- redactedOutputOnly=true

## Decisioni possibili

- MANUAL_UAT_READY
- LOGIN_OBSERVATION_REQUIRED
- LOGIN_METHOD_MISSING
- ONBOARDING_REVIEW_REQUIRED
- NO_GO

## Check

npm run ops:tester-login-session-onboarding-uat-gate-check

## Decisione

V20.2 non crea account, non scrive password, non invia email e non modifica sessioni. Formalizza solo il gate UAT manuale.
