# V15.1 — AI Provider Runtime Staging Gateway & Contract Hardening

## Scopo

Questa versione aggiunge un modulo locale dry-run per progettare il futuro gateway provider di staging.

V15.1 non abilita provider AI reali, persistenza AI, memoria persistente, automazioni, task, interventi, prescrizioni, dosaggi o forecast. Introduce soltanto il piano strutturale per un futuro runtime provider lato server.

## Componenti

- provider runtime staging gateway;
- backend-only provider boundary;
- request envelope plan;
- response contract hardening;
- schema guard plan;
- provider budget guard;
- fallback and degradation plan;
- dry-run case matrix;
- staging gateway gates;
- staging gateway board pack;
- staging risk register;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-provider-runtime-staging-gateway-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiProviderRuntimeStagingGateway.ts`
- `src/app/api/ops/ai-provider-runtime-staging-gateway-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ProviderRuntimeStagingGatewayPanel.tsx`
- `src/app/admin/operations/OperationsAiProviderRuntimeStagingGateway.tsx`
- `scripts/ops-ai-provider-runtime-staging-gateway-check.mjs`

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
- onlineControlledReady=true
- operationalAiReady=false
- providerActivationAllowed=false
- casePersistenceActivationAllowed=false
- automationActivationAllowed=false
- providerCallAllowed=false
- providerCallPerformed=false

## Roadmap consigliata

- V15.1: provider runtime staging gateway design and contract hardening.
- V15.2: AI case persistence migration plan.
- V15.3: persistent human review workflow and manual conversion gate.
- V15.4: provider staging shadow run with no production activation.
- V16.0: controlled production beta only after staging gates pass.

## Stato operativo

Gateway provider pronto solo come progetto dry-run. L’AI operativa reale resta no-go.
