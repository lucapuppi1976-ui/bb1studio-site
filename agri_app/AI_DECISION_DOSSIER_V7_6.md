# Agri App — AI Decision Dossier V7.6

## Obiettivo

V7.6 introduce un dossier decisionale locale per trasformare il case report V7.5 in un approval pack operativo.

Il dossier include:

- AiDecisionDossier;
- DecisionGate;
- DecisionWorkPackage;
- DecisionSignOff;
- dossierFingerprint;
- caseReportFingerprint;
- executiveDecision;
- decisionStatus;
- gate di approvazione;
- work package operativi;
- blocchi esecutivi;
- safety sign-off;
- export testuale e JSON.

## Endpoint operativo protetto

    /api/ops/ai-decision-dossier-dry-run

## Export package

- textDossierReady=true
- jsonDossierReady=true
- approvalPacketReady=true
- databasePersistenceReady=false
- automaticExecutionReady=false

## Safety

- providerCalled=false
- persistencePerformed=false
- productPrescriptionPerformed=false
- dosageAdvicePerformed=false
- automaticTaskCreationPerformed=false
- automaticInterventionCreationPerformed=false
- endpointAiCalled=false
- allowedToExecute=false
- humanReviewRequired=true
- redactedOutputOnly=true

## Guardrail

- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun endpoint `/api/ai`;
- nessun endpoint `/api/diagnosis`;
- nessuna persistenza DB;
- nessuna modifica Prisma schema;
- nessuna creazione automatica di attività o interventi;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- revisione umana obbligatoria.

## Check automatico

    npm run ops:ai-decision-dossier-check

Con verifica live protetta:

    npm run ops:ai-decision-dossier-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il valore del secret in chat.
