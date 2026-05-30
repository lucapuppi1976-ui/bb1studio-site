# V21.8 — Protected Small-Cohort Password Setup Pilot

V21.8 introduce un write pilot protetto per impostare passwordHash sulla piccola coorte già creata.

## Endpoint

/api/ops/tester-small-cohort-password-setup-pilot

## Conferme richieste per write reale

- CRON_SECRET valido
- AGRI_SMALL_COHORT_PASSWORD_SETUP_ENABLED=true
- AGRI_SMALL_COHORT_PASSWORD_SETUP_CONFIRM=CONFIRM_V21_8_SMALL_COHORT_PASSWORD_SETUP
- body.confirm=CONFIRM_V21_8_SMALL_COHORT_PASSWORD_SETUP
- body.dryRun=false
- previousAccountWritePilotClosed=true
- writePathsClosedConfirmed=true
- passwordWriteOnlyConfirmed=true
- noAccountCreateConfirmed=true
- noInviteEmailConfirmed=true
- noPublicSignupConfirmed=true
- noSchemaMigrationConfirmed=true
- noAiProviderCallConfirmed=true
- noExecutionConfirmed=true
- noEvidencePersistenceConfirmed=true

## Stato

- testerSmallCohortPasswordSetupPilotReady=true
- protectedSmallCohortPasswordWriteRouteReady=true
- defaultDryRunOnly=true
- serverWriteEnabledRequired=true
- serverConfirmRequired=true
- bodyConfirmRequired=true
- smallCohortLimitReady=true
- minCohortSize=3
- maxCohortSize=5
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

npm run ops:tester-small-cohort-password-setup-pilot-check
