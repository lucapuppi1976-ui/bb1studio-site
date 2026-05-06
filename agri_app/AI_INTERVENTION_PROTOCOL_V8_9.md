# Agri App — AI Intervention Protocol Simulator & Compliance Guard V8.9

## Obiettivo

V8.9 introduce una funzionalità premium sostanziosa: simulatore protocollo operativo manuale e compliance guard.

Componenti:

- InterventionProtocolInput;
- InterventionProtocolReport;
- protocolSteps;
- complianceGuard;
- preFlightChecklist;
- manualDispatchPackets;
- operatorBriefing;
- complianceAuditTrail.

## Endpoint operativo protetto

    /api/ops/ai-intervention-protocol-dry-run

## Capacità premium

- interventionProtocolReady=true
- complianceGuardReady=true
- preFlightChecklistReady=true
- manualDispatchPacketReady=true
- operatorBriefingReady=true
- auditTrailReady=true
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
- productPrescriptionAllowed=false
- dosageAdviceAllowed=false
- manualDispatchOnly=true
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

    npm run ops:ai-intervention-protocol-check

Con live protetto:

    npm run ops:ai-intervention-protocol-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
