# Agri App — AI Agronomic Memory Quality Guard & Drift Control V9.9

## Obiettivo

V9.9 introduce una funzionalità premium sostanziosa: controllo qualità della memoria agronomica prima di qualsiasi futura persistenza.

Componenti:

- MemoryQualityGuardInput;
- MemoryQualityGuardReport;
- evidenceAdequacyMatrix;
- conflictClusters;
- staleInsightFindings;
- biasDriftFindings;
- quarantineRecommendations;
- qualityImprovementPlan;
- reviewerQualityBriefing;
- qualityExportPacket;
- qualitySummary.

## Endpoint operativo protetto

    /api/ops/ai-memory-quality-guard-dry-run

## Capacità premium

- memoryQualityGuardReady=true
- evidenceAdequacyMatrixReady=true
- conflictDetectionReady=true
- staleInsightDetectorReady=true
- biasDriftGuardReady=true
- quarantineRecommendationsReady=true
- qualityImprovementPlanReady=true
- reviewerQualityBriefingReady=true
- qualityExportPacketReady=true
- providerAiReady=false
- persistenceReady=false
- memoryPersistenceReady=false
- automaticTaskCreationReady=false
- automaticInterventionCreationReady=false
- automaticExecutionReady=false

## Safety invarianti

- providerCalled=false
- persistencePerformed=false
- memoryPersistencePerformed=false
- memoryPromotionPerformed=false
- memoryQualityWritePerformed=false
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
- memoryPersistenceAllowed=false
- memoryPromotionAllowed=false
- memoryQualityWriteAllowed=false
- publicShareAllowed=false
- productPrescriptionAllowed=false
- dosageAdviceAllowed=false
- manualDispatchOnly=true
- humanReviewRequired=true
- localAnalysisOnly=true
- localQualityOnly=true
- localMemoryOnly=true

## Nota

Il quality guard V9.9 è locale e dry-run. Non crea memoria persistente DB, non scrive qualità memoria e non promuove automaticamente nulla.

## Guardrail

- nessuna chiamata provider AI live;
- nessuna chiave AI;
- nessun endpoint `/api/ai`;
- nessun endpoint `/api/diagnosis`;
- nessuna memoria persistente DB;
- nessuna persistenza DB;
- nessuna scrittura qualità memoria;
- nessuna promozione memoria automatica;
- nessuna modifica Prisma schema;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio.

## Check automatico

    npm run ops:ai-memory-quality-guard-check

Con live protetto:

    npm run ops:ai-memory-quality-guard-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
