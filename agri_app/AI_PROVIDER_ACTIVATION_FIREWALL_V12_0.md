# V12.0 — AI Provider Activation Firewall & Runtime Safety Control Plane

## Scopo

Questa versione introduce un control plane locale dry-run per provider activation readiness:

- provider readiness source nodes;
- activation readiness gates;
- payload minimization review;
- runtime firewall rules;
- rollout stages;
- rollback plan;
- manual approval questions;
- firewall gaps;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-provider-activation-firewall-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiProviderActivationFirewall.ts`
- `src/app/api/ops/ai-provider-activation-firewall-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ProviderActivationFirewallPanel.tsx`
- `src/app/admin/operations/OperationsAiProviderActivationFirewall.tsx`
- `scripts/ops-ai-provider-activation-firewall-check.mjs`

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

Il provider activation firewall è pronto per review premium e runtime safety governance. Resta completamente locale, dry-run, redatto e manuale.
