# Agri App — AI Strategic Response Portfolio Optimizer V9.4

## Obiettivo

V9.4 introduce una funzionalità premium sostanziosa: ottimizzazione portafoglio decisionale multi-caso.

Componenti:

- ResponsePortfolioInput;
- ResponsePortfolioReport;
- portfolioScenarios;
- priorityAllocationMatrix;
- resourceAllocationPlan;
- tradeoffMatrix;
- decisionBoard;
- executivePortfolioBriefing;
- compliancePortfolioGuard;
- portfolioExportPacket;
- portfolioSummary.

## Endpoint operativo protetto

    /api/ops/ai-response-portfolio-dry-run

## Capacità premium

- responsePortfolioReady=true
- portfolioOptimizerReady=true
- priorityAllocationReady=true
- resourceAllocationReady=true
- tradeoffMatrixReady=true
- decisionBoardReady=true
- executivePortfolioBriefingReady=true
- compliancePortfolioGuardReady=true
- portfolioExportPacketReady=true
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

## Nota

Il portfolio value proxy non è dato finanziario reale. Serve a ordinare priorità operative e scenari manuali, non a produrre consulenza finanziaria, prescrizioni agronomiche o dosaggi.

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

    npm run ops:ai-response-portfolio-check

Con live protetto:

    npm run ops:ai-response-portfolio-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
