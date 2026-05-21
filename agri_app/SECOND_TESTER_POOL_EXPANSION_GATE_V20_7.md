# V20.7 — Controlled Second Tester Pool Expansion Gate

V20.7 prepara l'espansione controllata del pool UAT verso un secondo tester.

## Endpoint

/api/ops/tester-second-tester-pool-expansion-gate-dry-run

## Stato

- testerSecondTesterPoolExpansionGateReady=true
- controlledSecondTesterPoolExpansionReady=true
- candidateReadinessBoardReady=true
- accessScopeReviewReady=true
- onboardingPlanReady=true
- secondTesterWritePilotDecisionReady=true
- manualEvidenceOnly=true
- readOnlyVerificationOnly=true
- candidatePersistenceAllowed=false
- accountWriteAllowed=false
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

## Decisioni possibili

- SECOND_TESTER_WRITE_PILOT_READY
- SECOND_TESTER_ACCESS_REVIEW_READY
- CANDIDATE_SELECTION_INCOMPLETE
- FIX_BEFORE_EXPANSION
- NO_GO

## Check

npm run ops:tester-second-tester-pool-expansion-gate-check

## Decisione

V20.7 non crea account, non invia email, non scrive password e non apre public signup. Se il gate è pronto, V20.8 potrà essere un write pilot protetto separato.
