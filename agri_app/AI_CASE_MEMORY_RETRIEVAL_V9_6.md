# Agri App — AI Case Memory Retrieval & Similar Case Advisor V9.6

## Obiettivo

V9.6 introduce una funzionalità premium sostanziosa: recupero locale di casi simili e insight riutilizzabili da memoria agronomica dry-run.

Componenti:

- CaseMemoryRetrievalInput;
- CaseMemoryRetrievalReport;
- similarityMatches;
- insightCards;
- transferLearningCandidates;
- gapBridgePlan;
- retrievalBriefing;
- retrievalExportPacket;
- retrievalSummary.

## Endpoint operativo protetto

    /api/ops/ai-case-memory-retrieval-dry-run

## Capacità premium

- caseMemoryRetrievalReady=true
- similarityMatchesReady=true
- insightCardsReady=true
- transferLearningReady=true
- gapBridgePlanReady=true
- retrievalBriefingReady=true
- retrievalExportPacketReady=true
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
- localRetrievalOnly=true

## Nota

Il retrieval V9.6 è locale e dry-run. Non crea memoria persistente DB e non riusa insight in modo automatico. Ogni insight richiede revisione umana.

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

    npm run ops:ai-case-memory-retrieval-check

Con live protetto:

    npm run ops:ai-case-memory-retrieval-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
