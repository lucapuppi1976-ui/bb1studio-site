# V19.8 — Protected Tester Account Write Pilot & Single-Tester Creation Endpoint

V19.8 introduce un endpoint protetto per il primo pilot di creazione account tester.

## Endpoint

/api/ops/tester-account-write-pilot

## Stato

- defaultDryRunOnly=true
- protectedSingleTesterWriteRouteReady=true
- serverWriteEnabledRequired=true
- serverConfirmRequired=true
- bodyConfirmRequired=true
- oneTesterPilotOnly=true
- inviteEmailSendAllowed=false
- publicSignupAllowed=false
- automaticAccountWriteAllowed=false
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
- server env AGRI_TESTER_ACCOUNT_WRITE_ENABLED=true
- server env AGRI_TESTER_ACCOUNT_WRITE_CONFIRM=CONFIRM_V19_8_TESTER_ACCOUNT_WRITE
- body dryRun=false
- body confirm=CONFIRM_V19_8_TESTER_ACCOUNT_WRITE
- email tester valida
- utente non già esistente
- acceptLimitations=true se role/language non sono supportati nello schema

## Check

npm run ops:tester-account-write-pilot-check

## Decisione

V19.8 non crea utenti durante deploy/verifica. La creazione reale è opzionale, manuale, protetta e separata.

## V19.8F — Role enum-safe patch

Lo schema corrente usa `User.role` come enum `UserRole` con valori compatibili `SUPER_ADMIN` e `OPERATOR`.
Il pilot continua ad accettare ruoli UAT semantici (`uat_observer`, `uat_operator`, `uat_reviewer`), ma la write path reale mappa questi ruoli al valore DB sicuro `OPERATOR`.

La lingua resta nel payload/report se il campo lingua non è presente nello schema.
