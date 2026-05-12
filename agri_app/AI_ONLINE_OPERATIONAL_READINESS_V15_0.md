# V15.0 — Online Operational Readiness & Provider Activation Plan

## Scopo

Questa versione apre la fase V15 con un modulo locale dry-run di readiness operativa online.

V15.0 non abilita provider AI reali, persistenza AI, memoria persistente, automazioni, task, interventi, prescrizioni, dosaggi o forecast. Costruisce invece il piano di transizione verso una futura fase operativa controllata.

## Componenti

- provider activation plan;
- environment readiness matrix;
- data migration plan;
- human review workflow plan;
- access control plan;
- cost/rate limit plan;
- rollback and kill-switch plan;
- beta go/no-go board;
- operational readiness gates;
- readiness board pack;
- readiness risk register;
- staged roadmap V15.x / V16.0.

## Endpoint ops

`/api/ops/ai-online-operational-readiness-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiOnlineOperationalReadiness.ts`
- `src/app/api/ops/ai-online-operational-readiness-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/OnlineOperationalReadinessPanel.tsx`
- `src/app/admin/operations/OperationsAiOnlineOperationalReadiness.tsx`
- `scripts/ops-ai-online-operational-readiness-check.mjs`

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

## Roadmap consigliata

- V15.0: readiness operativa e activation plan.
- V15.1: provider runtime staging gateway.
- V15.2: AI case persistence migration plan.
- V15.3: persistent human review workflow e manual conversion gate.
- V16.0: controlled production beta solo dopo staging e go/no-go.

## Stato operativo

La APP può continuare in online controllato dry-run. L’AI operativa reale resta no-go.
