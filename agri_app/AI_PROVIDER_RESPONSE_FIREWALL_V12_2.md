# V12.2 — AI Provider Response Firewall & Output Validation Contract

## Scopo

Questa versione introduce un firewall locale dry-run per future risposte provider:

- response source nodes;
- response envelope;
- output validation gates;
- unsafe output rejection rules;
- contract breach register;
- reviewer validation board;
- rollback plan;
- response gaps;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-provider-response-firewall-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiProviderResponseFirewall.ts`
- `src/app/api/ops/ai-provider-response-firewall-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ProviderResponseFirewallPanel.tsx`
- `src/app/admin/operations/OperationsAiProviderResponseFirewall.tsx`
- `scripts/ops-ai-provider-response-firewall-check.mjs`

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

Il provider response firewall è pronto per review premium e output validation governance. Resta completamente locale, dry-run, redatto e manuale.
