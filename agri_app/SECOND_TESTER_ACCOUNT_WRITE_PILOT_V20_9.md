# V20.9 — Protected Second Tester Account Write Pilot

V20.9 introduce un write pilot protetto per creare un solo account secondo tester.

## Endpoint

/api/ops/tester-second-tester-account-write-pilot

## Conferme richieste per write reale

- CRON_SECRET valido
- AGRI_SECOND_TESTER_ACCOUNT_WRITE_ENABLED=true
- AGRI_SECOND_TESTER_ACCOUNT_WRITE_CONFIRM=CONFIRM_V20_9_SECOND_TESTER_ACCOUNT_WRITE
- body.confirm=CONFIRM_V20_9_SECOND_TESTER_ACCOUNT_WRITE
- body.dryRun=false
- previousAccessGateCleared=true
- acceptLimitations=true
- safety confirmations complete

## Stato

- testerSecondTesterAccountWritePilotReady=true
- protectedSecondTesterWriteRouteReady=true
- defaultDryRunOnly=true
- serverWriteEnabledRequired=true
- serverConfirmRequired=true
- bodyConfirmRequired=true
- oneSecondTesterPilotOnly=true
- roleMappedToOperatorOnly=true
- languageFallbackOnly=true
- publicSignupAllowed=false
- inviteEmailSendAllowed=false
- passwordWriteAllowed=false
- schemaWriteAllowed=false
- migrationExecutionAllowed=false
- providerAiReady=false
- providerCalled=false
- operationalExecutionAllowed=false
- humanReviewRequired=true
- redactedOutputOnly=true

## Note

Il record User viene creato con ruolo OPERATOR. Non viene impostata passwordHash. Il setup password resta separato.

## Check

npm run ops:tester-second-tester-account-write-pilot-check
