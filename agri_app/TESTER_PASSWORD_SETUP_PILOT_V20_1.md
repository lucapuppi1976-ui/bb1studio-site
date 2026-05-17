# V20.1 — Protected Tester Password Setup Pilot

V20.1 introduce un endpoint protetto per impostare la password del tester pilota già creato.

## Endpoint

/api/ops/tester-password-setup-pilot

## Stato

- testerPasswordSetupPilotReady=true
- protectedTesterPasswordSetupRouteReady=true
- defaultDryRunOnly=true
- serverWriteEnabledRequired=true
- serverConfirmRequired=true
- bodyConfirmRequired=true
- existingTesterOnly=true
- accountCreateAllowed=false
- publicSignupAllowed=false
- inviteEmailSendAllowed=false
- oauthLinkWriteAllowed=false
- emailVerifiedWriteAllowed=false
- schemaWriteAllowed=false
- migrationExecutionAllowed=false
- providerAiReady=false
- providerCalled=false
- operationalExecutionAllowed=false
- publicExportArtifactWriteAllowed=false
- humanReviewRequired=true
- redactedOutputOnly=true

## Conferme richieste per scrittura reale

La scrittura reale richiede:

- CRON_SECRET
- server env AGRI_TESTER_PASSWORD_WRITE_ENABLED=true
- server env AGRI_TESTER_PASSWORD_WRITE_CONFIRM=CONFIRM_V20_1_TESTER_PASSWORD_SETUP
- body dryRun=false
- body confirm=CONFIRM_V20_1_TESTER_PASSWORD_SETUP
- email tester esistente
- temporaryPassword >= 12 caratteri
- passwordHash assente

## Check

npm run ops:tester-password-setup-pilot-check

## Decisione

V20.1 non crea account, non invia email, non apre public signup e non modifica schema.
