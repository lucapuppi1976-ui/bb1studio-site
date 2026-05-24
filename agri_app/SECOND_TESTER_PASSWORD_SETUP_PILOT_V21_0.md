# V21.0 — Protected Second Tester Password Setup Pilot

V21.0 introduce un write pilot protetto per impostare passwordHash sul secondo tester già creato.

## Endpoint

/api/ops/tester-second-tester-password-setup-pilot

## Conferme richieste per write reale

- CRON_SECRET valido
- AGRI_SECOND_TESTER_PASSWORD_SETUP_ENABLED=true
- AGRI_SECOND_TESTER_PASSWORD_SETUP_CONFIRM=CONFIRM_V21_0_SECOND_TESTER_PASSWORD_SETUP
- body.confirm=CONFIRM_V21_0_SECOND_TESTER_PASSWORD_SETUP
- body.dryRun=false
- previousAccountWriteCleared=true
- passwordWriteOnlyConfirmed=true
- noAccountCreateConfirmed=true
- noInviteEmailConfirmed=true
- noPublicSignupConfirmed=true
- noSchemaMigrationConfirmed=true
- noAiProviderCallConfirmed=true
- noExecutionConfirmed=true

## Stato

- testerSecondTesterPasswordSetupPilotReady=true
- protectedSecondTesterPasswordWriteRouteReady=true
- defaultDryRunOnly=true
- serverWriteEnabledRequired=true
- serverConfirmRequired=true
- bodyConfirmRequired=true
- oneSecondTesterPasswordPilotOnly=true
- passwordHashWriteOnly=true
- accountCreateAllowed=false
- inviteEmailSendAllowed=false
- publicSignupAllowed=false
- schemaWriteAllowed=false
- migrationExecutionAllowed=false
- providerAiReady=false
- providerCalled=false
- operationalExecutionAllowed=false
- humanReviewRequired=true
- redactedOutputOnly=true

## Note

La password temporanea viene usata solo per generare passwordHash. Non viene restituita nella risposta API.

## Check

npm run ops:tester-second-tester-password-setup-pilot-check
