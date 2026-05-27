# V21.5 — Controlled Small-Cohort Tester Expansion Planning Gate

V21.5 pianifica una piccola coorte tester controllata dopo la comparativa dual tester.

## Endpoint

/api/ops/tester-controlled-small-cohort-expansion-planning-gate-dry-run

## Stato

- testerControlledSmallCohortExpansionPlanningGateReady=true
- controlledSmallCohortPlanningReady=true
- candidateCohortPlanReady=true
- onboardingPlanReady=true
- supportCapacityReviewReady=true
- rollbackReadinessReviewReady=true
- expansionHumanApprovalReady=true
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

## Decisioni possibili

- CONTROLLED_SMALL_COHORT_PLAN_READY
- COHORT_PLANNING_INCOMPLETE
- CONTINUE_DUAL_TESTER_UAT
- FIX_BEFORE_COHORT
- NO_GO

## Check

npm run ops:tester-controlled-small-cohort-expansion-planning-gate-check

## Decisione

V21.5 non crea account, non scrive password, non invia email, non chiama provider AI, non esegue operation e non persiste evidenze/issue. Se il gate risulta pronto, V21.6 può passare alla readiness/provisioning della piccola coorte.
