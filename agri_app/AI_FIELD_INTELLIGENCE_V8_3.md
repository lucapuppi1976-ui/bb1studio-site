# Agri App — AI Multi-Photo Field Intelligence V8.3

## Obiettivo

V8.3 introduce una funzionalità premium sostanziosa: field intelligence multi-foto per casi agricoli.

Componenti:

- FieldIntelligenceCaseInput;
- FieldIntelligenceReport;
- evidenceMatrix;
- severityMap;
- riskForecast;
- differentialFocus;
- nextPhotoProtocol;
- humanReviewChecklist.

## Endpoint operativo protetto

    /api/ops/ai-field-intelligence-dry-run

## Capacità premium

- multiPhotoCorrelation=true
- temporalComparisonReady=true
- fieldScoutingProtocolReady=true
- escalationWorkflowReady=true
- providerAiReady=false
- persistenceReady=false
- automaticTaskCreationReady=false
- automaticInterventionCreationReady=false
- automaticExecutionReady=false

## Safety invarianti

- providerCalled=false
- persistencePerformed=false
- taskCreated=false
- interventionCreated=false
- automaticExecutionPerformed=false
- publicSharePerformed=false
- productPrescriptionPerformed=false
- dosageAdvicePerformed=false
- automaticTaskCreationAllowed=false
- automaticInterventionCreationAllowed=false
- automaticExecutionAllowed=false
- dbPersistenceAllowed=false
- publicShareAllowed=false
- humanReviewRequired=true
- localAnalysisOnly=true

## Guardrail

- nessuna chiamata provider AI live;
- nessuna chiave AI;
- nessun endpoint `/api/ai`;
- nessun endpoint `/api/diagnosis`;
- nessuna persistenza DB;
- nessuna modifica Prisma schema;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio.

## Check automatico

    npm run ops:ai-field-intelligence-check

Con live protetto:

    npm run ops:ai-field-intelligence-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
