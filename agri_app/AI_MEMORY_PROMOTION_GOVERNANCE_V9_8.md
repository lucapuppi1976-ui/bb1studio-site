# Agri App — AI Memory Promotion Governance & Versioned Knowledge Draft V9.8

## Obiettivo

V9.8 introduce una funzionalità premium sostanziosa: governance locale per promuovere lesson e memory update draft in una futura memoria agronomica persistente.

Componenti:

- MemoryPromotionInput;
- MemoryPromotionGovernanceReport;
- promotionQueue;
- memoryPatchDrafts;
- governanceDecisionBoard;
- versionedMemorySnapshotDraft;
- rollbackPlan;
- promotionAuditTrail;
- promotionExportPacket;
- governanceSummary.

## Endpoint operativo protetto

    /api/ops/ai-memory-promotion-dry-run

## Capacità premium

- memoryPromotionGovernanceReady=true
- promotionQueueReady=true
- memoryPatchDraftsReady=true
- governanceDecisionBoardReady=true
- versionedMemorySnapshotDraftReady=true
- rollbackPlanReady=true
- promotionAuditTrailReady=true
- promotionExportPacketReady=true
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
- publicShareAllowed=false
- productPrescriptionAllowed=false
- dosageAdviceAllowed=false
- manualDispatchOnly=true
- humanReviewRequired=true
- localAnalysisOnly=true
- localPromotionOnly=true
- localMemoryOnly=true

## Nota

La governance V9.8 è locale e dry-run. Non crea memoria persistente DB, non promuove automaticamente nulla e non applica patch reali. Ogni candidate richiede revisione umana.

## Guardrail

- nessuna chiamata provider AI live;
- nessuna chiave AI;
- nessun endpoint `/api/ai`;
- nessun endpoint `/api/diagnosis`;
- nessuna memoria persistente DB;
- nessuna persistenza DB;
- nessuna promozione memoria automatica;
- nessuna modifica Prisma schema;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio.

## Check automatico

    npm run ops:ai-memory-promotion-check

Con live protetto:

    npm run ops:ai-memory-promotion-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
