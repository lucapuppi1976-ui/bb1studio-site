# Agri App — AI Scouting Mission Planner & Field Crew Route Sequencer V9.1

## Obiettivo

V9.1 introduce una funzionalità premium sostanziosa: pianificazione missioni scouting multi-caso.

Componenti:

- ScoutingMissionInput;
- ScoutingMissionReport;
- missionRoute;
- photoShotList;
- safetyGate;
- resourceAssignments;
- debriefPackets;
- escalationTriggers;
- exportPacket;
- missionSummary.

## Endpoint operativo protetto

    /api/ops/ai-scouting-mission-dry-run

## Capacità premium

- scoutingMissionReady=true
- routeSequencingReady=true
- photoShotListReady=true
- safetyGateReady=true
- resourceAssignmentReady=true
- debriefPacketReady=true
- escalationTriggerReady=true
- exportPacketReady=true
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

    npm run ops:ai-scouting-mission-check

Con live protetto:

    npm run ops:ai-scouting-mission-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
