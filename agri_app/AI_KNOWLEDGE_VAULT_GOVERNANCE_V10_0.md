# V10.0 — AI Agronomic Knowledge Vault & Expert Playbook Governance

## Scopo

Questa versione introduce un vault locale dry-run per la governance della conoscenza agronomica:

- playbook expert versionati;
- regole di applicabilità per coltura, sintomo, stagione, rischio, evidenza e compliance;
- soglie evidenziali con blocker espliciti;
- conflict register tra playbook;
- approval queue manuale;
- snapshot governance redatto;
- export locale redatto;
- rollback plan;
- endpoint ops protetto.

## File principali

- `src/lib/ai/aiKnowledgeVaultGovernance.ts`
- `src/app/api/ops/ai-knowledge-vault-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/KnowledgeVaultGovernancePanel.tsx`
- `src/app/admin/operations/OperationsAiKnowledgeVaultGovernance.tsx`
- `scripts/ops-ai-knowledge-vault-check.mjs`

## Endpoint ops

`/api/ops/ai-knowledge-vault-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer e restituisce solo output dry-run redatto.

## Guardrail

- providerAiReady=false
- persistenceReady=false
- memoryPersistenceReady=false
- automaticTaskCreationReady=false
- automaticInterventionCreationReady=false
- automaticExecutionReady=false
- providerCalled=false
- persistencePerformed=false
- memoryPersistencePerformed=false
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
- publicShareAllowed=false
- productPrescriptionAllowed=false
- dosageAdviceAllowed=false
- manualDispatchOnly=true
- humanReviewRequired=true
- localAnalysisOnly=true
- redactedOutputOnly=true
- localMemoryOnly=true
- localLearningOnly=true
- localPromotionOnly=true
- localQualityOnly=true
- memoryPromotionAllowed=false
- memoryQualityWriteAllowed=false
- memoryPromotionPerformed=false
- memoryQualityWritePerformed=false

## Stato operativo

Il modulo è pronto per revisione premium e controllo operativo, ma resta interamente locale e manuale.
Non abilita provider AI, persistenza, automazioni, prescrizioni prodotto o consigli di dosaggio.
