# V21.2 — Second Tester Manual UAT Scenario Pack & Evidence Checklist

V21.2 prepara e valida lo scenario pack UAT manuale del secondo tester in modalità read-only.

## Endpoint

/api/ops/tester-second-tester-manual-uat-scenario-pack-dry-run

## Stato

- testerSecondTesterManualUatScenarioPackReady=true
- secondTesterManualScenarioPackReady=true
- scenarioChecklistReady=true
- evidenceChecklistReady=true
- issueTriageReady=true
- secondTesterUatExpansionReady=true
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

## Scenario pack

- ST-UAT-001 Login and first landing
- ST-UAT-002 Navigation and mobile usability
- ST-UAT-003 Photo diagnosis entry point
- ST-UAT-004 Evidence bundle entry point
- ST-UAT-005 Operations read-only visibility
- ST-UAT-006 Locale fallback and logout

## Decisioni possibili

- SECOND_TESTER_SCENARIO_PACK_COMPLETE
- EVIDENCE_INCOMPLETE
- SCENARIO_COVERAGE_INCOMPLETE
- FIX_BEFORE_SCENARIO_PACK
- NO_GO

## Check

npm run ops:tester-second-tester-manual-uat-scenario-pack-check

## Decisione

V21.2 non crea account, non scrive password, non invia email, non chiama provider AI e non persiste evidenze. Se il gate risulta completo, V21.3 può produrre il report di esecuzione UAT del secondo tester.
