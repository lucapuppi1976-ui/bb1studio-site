# Agri App — AI Agronomic Case Memory & Pattern Graph V9.5

## Obiettivo

V9.5 introduce una funzionalità premium sostanziosa: memoria agronomica locale e grafo pattern multi-caso.

Componenti:

- CaseMemoryGraphInput;
- CaseMemoryGraphReport;
- graphNodes;
- graphEdges;
- similarityClusters;
- recurrenceSignals;
- knowledgeGaps;
- memoryRecommendations;
- caseLineage;
- memoryExportPacket;
- memorySummary.

## Endpoint operativo protetto

    /api/ops/ai-case-memory-graph-dry-run

## Capacità premium

- caseMemoryReady=true
- graphNodesReady=true
- graphEdgesReady=true
- similarityClustersReady=true
- recurrenceSignalsReady=true
- knowledgeGapDetectorReady=true
- memoryRecommendationsReady=true
- caseLineageReady=true
- memoryExportPacketReady=true
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
- localMemoryOnly=true

## Nota

La memoria V9.5 è locale e dry-run. Non è ancora memoria persistente DB. Serve a costruire il modello funzionale e il grafo esportabile prima di introdurre persistenza controllata.

## Guardrail

- nessuna chiamata provider AI live;
- nessuna chiave AI;
- nessun endpoint `/api/ai`;
- nessun endpoint `/api/diagnosis`;
- nessuna memoria persistente DB;
- nessuna persistenza DB;
- nessuna modifica Prisma schema;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio.

## Check automatico

    npm run ops:ai-case-memory-graph-check

Con live protetto:

    npm run ops:ai-case-memory-graph-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
