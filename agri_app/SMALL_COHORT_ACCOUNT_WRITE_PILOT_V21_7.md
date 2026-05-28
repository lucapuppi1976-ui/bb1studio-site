# V21.7 — Protected Small-Cohort Account Write Pilot

V21.7 introduce un write pilot protetto per creare una piccola coorte di account tester.

## Endpoint

/api/ops/tester-small-cohort-account-write-pilot

## Conferme richieste per write reale

- CRON_SECRET valido
- AGRI_SMALL_COHORT_ACCOUNT_WRITE_ENABLED=true
- AGRI_SMALL_COHORT_ACCOUNT_WRITE_CONFIRM=CONFIRM_V21_7_SMALL_COHORT_ACCOUNT_WRITE
- body.confirm=CONFIRM_V21_7_SMALL_COHORT_ACCOUNT_WRITE
- body.dryRun=false
- previousCandidateReadinessCleared=true
- writePathsClosedConfirmed=true
- acceptLimitations=true
- safety confirmations complete

## Stato

- testerSmallCohortAccountWritePilotReady=true
- protectedSmallCohortAccountWriteRouteReady=true
- defaultDryRunOnly=true
- serverWriteEnabledRequired=true
- serverConfirmRequired=true
- bodyConfirmRequired=true
- smallCohortLimitReady=true
- minCohortSize=3
- maxCohortSize=5
- roleMappedToOperatorOnly=true
- languageFallbackOnly=true
- passwordWriteAllowed=false
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

Gli account vengono creati con ruolo OPERATOR. Non viene impostata passwordHash. Il setup password resta separato.

## Check

npm run ops:tester-small-cohort-account-write-pilot-check
