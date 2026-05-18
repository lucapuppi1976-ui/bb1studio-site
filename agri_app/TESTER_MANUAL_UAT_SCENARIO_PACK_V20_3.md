# V20.3 — First Manual UAT Scenario Pack & Evidence Checklist

V20.3 definisce il primo scenario pack UAT manuale per il tester pilota.

## Endpoint

/api/ops/tester-manual-uat-scenario-pack-dry-run

## Scenari

- UAT-001 — Login and landing
- UAT-002 — Navigation and mobile usability
- UAT-003 — Photo diagnosis entry point
- UAT-004 — Operations read-only visibility
- UAT-005 — Logout

## Evidenze manuali richieste

- screenshot login/landing
- screenshot navigazione
- screenshot mobile o viewport stretto
- screenshot photo diagnosis entry point
- screenshot operations/read-only area se accessibile
- note manuali su blocchi o anomalie
- conferma no AI provider call
- conferma no execution
- conferma no public signup
- conferma no account/password write
- conferma no schema/migration

## Stato

- testerManualUatScenarioPackReady=true
- firstManualUatScenarioPackReady=true
- evidenceChecklistReady=true
- manualEvidenceOnly=true
- readOnlyVerificationOnly=true
- evidencePersistenceAllowed=false
- accountWriteAllowed=false
- passwordWriteAllowed=false
- inviteEmailSendAllowed=false
- publicSignupAllowed=false
- schemaWriteAllowed=false
- migrationExecutionAllowed=false
- providerAiReady=false
- providerCalled=false
- operationalExecutionAllowed=false
- publicExportArtifactWriteAllowed=false
- humanReviewRequired=true
- redactedOutputOnly=true

## Check

npm run ops:tester-manual-uat-scenario-pack-check

## Decisione

V20.3 non salva evidenze, non scrive account, non invia email e non attiva AI. Formalizza il primo UAT manuale.
