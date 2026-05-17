# V20.0 — Tester Login Method Setup Gate

V20.0 sceglie il metodo di login più sicuro per il tester pilota già creato.

## Endpoint

/api/ops/tester-login-method-setup-gate-dry-run

## Stato

- testerLoginMethodSetupGateReady=true
- authMethodDiscoveryReady=true
- passwordSetupReadinessReady=true
- magicLinkReadinessReady=true
- oauthReadinessReady=true
- onboardingLoginGateReady=true
- protectedReadOnlyRouteReady=true
- readOnlyVerificationOnly=true
- passwordWriteAllowed=false
- emailVerifiedWriteAllowed=false
- oauthLinkWriteAllowed=false
- magicLinkSendAllowed=false
- publicSignupAllowed=false
- accountWriteAllowed=false
- testerAccountCreateAllowed=false
- schemaWriteAllowed=false
- migrationExecutionAllowed=false
- providerAiReady=false
- providerCalled=false
- operationalExecutionAllowed=false
- publicExportArtifactWriteAllowed=false
- humanReviewRequired=true
- redactedOutputOnly=true

## Decisioni possibili

- PASSWORD_SETUP_CANDIDATE
- MAGIC_LINK_CANDIDATE
- OAUTH_LINK_CANDIDATE
- AUTH_IMPLEMENTATION_REVIEW_REQUIRED
- NO_GO

## Check

npm run ops:tester-login-method-setup-gate-check

## Decisione

V20.0 non imposta password, non invia email, non collega OAuth e non modifica account. Produce solo la decisione per la prossima release.
