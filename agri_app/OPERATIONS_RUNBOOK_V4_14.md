# Agri App — Runbook operativo unico V4.14

## Stato operativo corrente

- Live pubblico: https://bb1studio.com/agri_app
- Branch live stabile: checkpoint/live-stable
- Email live: disattivate
- ENABLE_EMAIL_NOTIFICATIONS=false
- Cron reale in-app: attivo su Render
- DB schema: invariato
- Prisma schema: invariato

## Regole fondamentali

- NON fare prisma db push salvo istruzione esplicita.
- NON usare il DB live nei test locali.
- Prima di ogni build locale usare:
  - unset DATABASE_URL LIVE_DATABASE_URL
  - npx prisma generate
  - npm run build
- ENABLE_EMAIL_NOTIFICATIONS deve restare false in DEV e live, salvo test DEV esplicitamente controllati.
- Il CRON_SECRET del Web Service Render e del Render Cron Job devono essere identici.
- Non passare secret tramite npm run con argomenti --secret.
- Usare il wrapper secret-safe per i controlli live protetti.

## Quick check standard

Da agri_app:

    npm run ops:quick-check -- --expect-branch checkpoint/live-stable

Questo controllo non richiede secret e include:

- DB safety DEV
- Security strict
- Recurring quality DEV
- Ops labels check
- Release status live
- Ops log redaction check

## Quick check protetto

Da agri_app:

    read -s -r -p "Incolla CRON_SECRET live e premi Invio: " CRON_SECRET_VALUE
    echo
    export CRON_SECRET_VALUE

    npm run ops:quick-check -- --include-protected --expect-branch checkpoint/live-stable

    unset CRON_SECRET_VALUE

Il secret non deve essere stampato nei log.

## Release gate live secret-safe

Da agri_app:

    read -s -r -p "Incolla CRON_SECRET live e premi Invio: " CRON_SECRET_VALUE
    echo
    export CRON_SECRET_VALUE

    npm run ops:release-gate:live

    unset CRON_SECRET_VALUE

Il comando usa agri_app/scripts/release-gate-live-safe.mjs.

## Gestione CRON_SECRET Render

Il CRON_SECRET deve essere impostato nello stesso identico valore in:

- Render Web Service Agri App
- Render Cron Job

Nel Web Service, dopo modifica usare Save and deploy oppure Save, rebuild, and deploy.
Non usare solo Save only se serve applicare subito il valore.

Il Render Cron Job deve mantenere questo comando:

    curl -fsS -X POST -G "https://bb1studio.com/agri_app/api/cron/daily-notifications" --data-urlencode "secret=$CRON_SECRET"

Non testare questo comando nel terminale locale se CRON_SECRET non è valorizzato localmente.

## Verifica email status protetta

La verifica sicura è inclusa in:

    npm run ops:quick-check -- --include-protected --expect-branch checkpoint/live-stable

Atteso:

- ok=true
- email.enabled=false
- testSafety.canSendTestEmail=false
- from=Agri App <notifiche@bb1studio.com>

## Build sicura

Da agri_app:

    unset DATABASE_URL LIVE_DATABASE_URL
    npx prisma generate
    npm run build

Non eseguire prisma db push.

## Controlli singoli

Da agri_app:

    npm run ops:db-safety
    npm run ops:security
    npm run ops:recurring-quality
    npm run ops:labels-check
    npm run ops:banner-check
    npm run ops:log-redaction-check
    npm run ops:release-status:live
    npm run ops:release-gate
    npm run ops:runbook-check

## Redazione log

ops-live-check.mjs deve redigere URL e argomenti sensibili:

- secret=[REDACTED]
- --secret [REDACTED]

Il controllo automatico è:

    npm run ops:log-redaction-check

Il 403 nel log redaction check è voluto perché usa un fake secret.

## Rollback branch prima del merge live

Prima del merge su checkpoint/live-stable creare sempre un rollback branch:

    ROLLBACK_BRANCH="checkpoint/live-rollback-pre-NOME-VERSIONE-$(date +%Y%m%d-%H%M%S)"
    git branch "$ROLLBACK_BRANCH" HEAD
    git push origin "$ROLLBACK_BRANCH"

## Tag finale

Dopo push live e verifiche:

    TAG_NAME="checkpoint/live-NOME-VERSIONE-$(date +%Y%m%d-%H%M%S)"
    git tag -a "$TAG_NAME" -m "Live checkpoint NOME VERSIONE"
    git push origin "$TAG_NAME"

## Stato atteso live

- /api/health: ok=true, service=agri-app
- /api/ready: ok=true
- email live disabled
- cron reale in-app attivo
- DB schema invariato
- Prisma schema invariato


## Quick check coverage

Il controllo automatico della copertura della checklist rapida è:

    npm run ops:quick-coverage-check

Deve confermare che ops:quick-check includa DB safety, security, qualità ricorrenze, labels, banner, release status, log redaction, runbook e controllo protetto opzionale.


## Admin Operations Center

La pagina operativa admin è disponibile a:

    /admin/operations

Questa pagina riassume quick check, release gate secret-safe, gestione CRON_SECRET, build sicura, rollback e tag checkpoint.


## Preflight admin dinamico

La pagina `/admin/operations` include un pannello dinamico che legge:

- `/api/health`
- `/api/ready`
- `/api/ops/preflight`

Il preflight viene chiamato tramite sessione admin e non richiede input CRON_SECRET nella UI.

Controllo automatico:

    npm run ops:admin-dynamic-check
    npm run ops:admin-navigation-check
    npm run ops:admin-ux-check
    npm run ops:admin-command-palette-check
    npm run ops:ai-readiness-check
    npm run ops:ai-photo-intake-check
    npm run ops:ai-diagnosis-draft-check
    npm run ops:ai-action-plan-check
    npm run ops:ai-review-workflow-check
    npm run ops:ai-provider-safety-check
    npm run ops:ai-provider-status-check
    npm run ops:ai-provider-dry-run-check
    npm run ops:ai-provider-response-check
    npm run ops:ai-pipeline-dry-run-check
    npm run ops:ai-photo-quality-gate-check
    npm run ops:ai-evidence-bundle-check
    npm run ops:ai-provider-request-check
    npm run ops:ai-orchestrator-dry-run-check
    npm run ops:ai-case-file-check
    npm run ops:ai-photo-annotation-check
    npm run ops:ai-differential-diagnosis-check
    npm run ops:ai-solution-playbook-check
    npm run ops:ai-case-report-check
    npm run ops:ai-decision-dossier-check
    npm run ops:ai-work-order-preview-check
    npm run ops:ai-work-order-execution-gate-check
    npm run ops:ai-manual-conversion-audit-check
    npm run ops:ai-case-export-bundle-check
    npm run ops:ai-case-export-archive-check
    npm run ops:admin-live-routes-check
    npm run ops:admin-route-monitoring-check


## Admin navigation

La navigazione admin include:

- `/admin`
- `/admin/operations`
- `/admin/system`
- `/admin/users`

Controllo automatico:

    npm run ops:admin-navigation-check


## Admin live route monitoring

Le route admin monitorate dagli script operativi sono:

- `/admin`
- `/admin/operations`
- `/admin/system`

Controlli automatici:

    npm run ops:admin-live-routes-check
    npm run ops:admin-route-monitoring-check

Le route possono rispondere 200 oppure redirect 302/307/308 in base alla sessione.


## Operations UX polish

La pagina `/admin/operations` include una sezione UX con:

- percorso operativo consigliato;
- route admin monitorate;
- comandi essenziali;
- note sicurezza;
- spiegazione degli HTTP 307 sulle route protette.

Controllo automatico:

    npm run ops:admin-ux-check


## Operations command palette

La pagina `/admin/operations` include una command palette copiabile con:

- controlli standard;
- controlli protetti;
- build sicura;
- route admin;
- rollback branch;
- tag checkpoint.

Controllo automatico:

    npm run ops:admin-command-palette-check


## AI premium readiness checkpoint

Prima di introdurre riconoscimento foto, diagnosi AI e proposte operative automatiche, il live deve restare in stato sicuro.

Documenti:

- `AI_PREMIUM_READINESS_V5_6.md`
- `AI_IMAGE_DIAGNOSIS_STRATEGY_V5_6.md`

Controllo automatico:

    npm run ops:ai-readiness-check

Regole:

- nessuna chiave AI nel repository;
- nessun endpoint AI live prima della release dedicata;
- nessun valore sensibile in UI;
- nessuna modifica DB/Prisma in questa fase.


## AI photo diagnosis intake

La pagina `/ai/photo-diagnosis` introduce il primo intake controllato per la diagnosi fotografica:

- upload locale;
- preview;
- raccolta sintomi;
- gravità;
- note operatore;
- brief locale copiabile.

Controllo automatico:

    npm run ops:ai-photo-intake-check

Regole:

- nessuna chiamata AI live;
- nessun endpoint AI live;
- nessuna chiave provider;
- nessuna persistenza DB.


## AI diagnosis draft engine

La pagina `/ai/photo-diagnosis` include un motore locale di bozza diagnosi:

- rischio operativo;
- confidenza;
- ipotesi problema;
- azioni immediate;
- controlli aggiuntivi;
- follow-up;
- limiti.

Controllo automatico:

    npm run ops:ai-diagnosis-draft-check

Regole:

- nessuna chiamata AI live;
- nessun endpoint AI live;
- nessuna chiave provider;
- nessuna persistenza DB.


## AI photo action plan

La pagina `/ai/photo-diagnosis` include un motore locale di piano d’azione:

- priorità operativa;
- attività proposte;
- interventi consigliati;
- monitoraggio;
- escalation;
- materiali e verifiche;
- note di revisione umana.

Controllo automatico:

    npm run ops:ai-action-plan-check

Regole:

- nessuna chiamata AI live;
- nessun endpoint AI live;
- nessuna chiave provider;
- nessuna persistenza DB;
- nessuna creazione automatica di attività o interventi.


## AI human review workflow

La pagina `/ai/photo-diagnosis` include un workflow locale di revisione umana:

- decisione revisore;
- note revisore;
- checklist revisione;
- pacchetto revisione copiabile;
- export JSON locale.

Controllo automatico:

    npm run ops:ai-review-workflow-check

Regole:

- nessuna chiamata AI live;
- nessun endpoint AI live;
- nessuna chiave provider;
- nessuna persistenza DB;
- nessuna creazione automatica di attività o interventi.


## AI provider safety harness

La pagina `/ai/photo-diagnosis` include un provider safety harness locale:

- provider contract;
- output atteso;
- output vietato;
- requisiti backend;
- rollout controllato;
- human review obbligatoria.

Controllo automatico:

    npm run ops:ai-provider-safety-check

Regole:

- nessuna chiamata AI live;
- nessun endpoint AI live;
- nessuna chiave provider;
- nessuna persistenza DB;
- nessuna creazione automatica di attività o interventi.


## AI provider ops status

Endpoint operativo protetto:

    /api/ops/ai-provider-status

Controllo automatico:

    npm run ops:ai-provider-status-check

Controllo live protetto:

    npm run ops:ai-provider-status-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- providerCallsEnabled=false;
- clientProviderCallsAllowed=false;
- persistenceAllowed=false;
- automaticTaskCreationAllowed=false;
- humanReviewRequired=true;
- nessuna chiamata AI live;
- nessuna chiave AI esposta;
- nessun salvataggio automatico.


## AI provider dry-run adapter

Endpoint operativo protetto:

    /api/ops/ai-provider-dry-run

Controllo automatico:

    npm run ops:ai-provider-dry-run-check

Controllo live protetto:

    npm run ops:ai-provider-dry-run-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- externalProviderCalled=false;
- providerCallsEnabled=false;
- persistenceAllowed=false;
- automaticTaskCreationAllowed=false;
- humanReviewRequired=true;
- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun salvataggio automatico;
- nessuna creazione automatica di attività o interventi.


## AI provider response contract

Endpoint operativo protetto:

    /api/ops/ai-provider-response-validate

Controllo automatico:

    npm run ops:ai-provider-response-check

Controllo live protetto:

    npm run ops:ai-provider-response-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- schema agri-ai-diagnosis-response.v1;
- humanReviewRequired=true;
- automaticTaskCreationAllowed=false;
- persistenceAllowed=false;
- nessuna chiamata AI live;
- nessuna chiave AI;
- nessuna creazione automatica di attività o interventi.


## AI diagnosis pipeline dry-run

Endpoint operativo protetto:

    /api/ops/ai-diagnosis-pipeline-dry-run

Controllo automatico:

    npm run ops:ai-pipeline-dry-run-check

Controllo live protetto:

    npm run ops:ai-pipeline-dry-run-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- externalProviderCalled=false;
- providerCallsEnabled=false;
- persistenceAllowed=false;
- automaticTaskCreationAllowed=false;
- automaticInterventionCreationAllowed=false;
- humanReviewRequired=true;
- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun salvataggio automatico;
- nessuna creazione automatica di attività o interventi.


## AI photo quality gate

Endpoint operativo protetto:

    /api/ops/ai-photo-quality-gate

Controllo automatico:

    npm run ops:ai-photo-quality-gate-check

Controllo live protetto:

    npm run ops:ai-photo-quality-gate-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- acceptedForAiPipeline deve bloccare materiale insufficiente;
- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun salvataggio automatico;
- nessuna creazione automatica di attività o interventi;
- revisione umana obbligatoria.


## AI photo evidence bundle

Endpoint operativo protetto:

    /api/ops/ai-photo-evidence-bundle

Controllo automatico:

    npm run ops:ai-evidence-bundle-check

Controllo live protetto:

    npm run ops:ai-evidence-bundle-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- acceptedForAiPipeline deve dipendere da qualità e completezza delle evidenze;
- providerReadyPayload deve restare dry-run;
- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun salvataggio automatico;
- nessuna creazione automatica di attività o interventi;
- revisione umana obbligatoria.


## AI provider request preview

Endpoint operativo protetto:

    /api/ops/ai-provider-request-preview

Controllo automatico:

    npm run ops:ai-provider-request-check

Controllo live protetto:

    npm run ops:ai-provider-request-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- providerPayload deve restare dry-run;
- expectedJsonSchema deve essere presente;
- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun salvataggio automatico;
- nessuna creazione automatica di attività o interventi;
- revisione umana obbligatoria.


## AI diagnosis orchestrator dry-run

Endpoint operativo protetto:

    /api/ops/ai-diagnosis-orchestrator-dry-run

Controllo automatico:

    npm run ops:ai-orchestrator-dry-run-check

Controllo live protetto:

    npm run ops:ai-orchestrator-dry-run-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- orchestratore completo ma dry-run;
- syntheticProviderResponse locale;
- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun salvataggio automatico;
- nessuna creazione automatica di attività o interventi;
- allowedToExecute=false;
- revisione umana obbligatoria.


## AI diagnosis case file

Endpoint operativo protetto:

    /api/ops/ai-diagnosis-case-file-dry-run

Controllo automatico:

    npm run ops:ai-case-file-check

Controllo live protetto:

    npm run ops:ai-case-file-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- case file dry-run esportabile;
- audit trail completo;
- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun salvataggio automatico;
- nessuna creazione automatica di attività o interventi;
- allowedToExecute=false;
- revisione umana obbligatoria.


## AI photo symptom annotation

Endpoint operativo protetto:

    /api/ops/ai-photo-annotation-dry-run

Controllo automatico:

    npm run ops:ai-photo-annotation-check

Controllo live protetto:

    npm run ops:ai-photo-annotation-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- mappa sintomi fotografica dry-run;
- regioni normalizzate x/y/w/h;
- evidence map pronta per provider futuro;
- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun salvataggio automatico;
- nessuna creazione automatica di attività o interventi;
- allowedToExecute=false;
- revisione umana obbligatoria.


## AI differential diagnosis matrix

Endpoint operativo protetto:

    /api/ops/ai-differential-diagnosis-dry-run

Controllo automatico:

    npm run ops:ai-differential-diagnosis-check

Controllo live protetto:

    npm run ops:ai-differential-diagnosis-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- matrice locale di diagnosi differenziale;
- ranking ipotesi;
- evidenceFor, evidenceAgainst, evidenceMissing;
- confidenceBand e riskBand;
- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun salvataggio automatico;
- nessuna creazione automatica di attività o interventi;
- allowedToExecute=false;
- revisione umana obbligatoria.


## AI solution playbook

Endpoint operativo protetto:

    /api/ops/ai-solution-playbook-dry-run

Controllo automatico:

    npm run ops:ai-solution-playbook-check

Controllo live protetto:

    npm run ops:ai-solution-playbook-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- playbook locale di soluzioni;
- nessuna chiamata AI live;
- nessuna chiave AI;
- nessuna persistenza DB;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- nessuna creazione automatica di attività o interventi;
- allowedToExecute=false;
- revisione umana obbligatoria.


## AI case report builder

Endpoint operativo protetto:

    /api/ops/ai-case-report-dry-run

Controllo automatico:

    npm run ops:ai-case-report-check

Controllo live protetto:

    npm run ops:ai-case-report-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- report locale esportabile;
- executive summary;
- evidence digest;
- audit trail;
- export testuale e JSON;
- nessuna chiamata AI live;
- nessuna chiave AI;
- nessuna persistenza DB;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- nessuna creazione automatica di attività o interventi;
- allowedToExecute=false;
- revisione umana obbligatoria.


## AI decision dossier

Endpoint operativo protetto:

    /api/ops/ai-decision-dossier-dry-run

Controllo automatico:

    npm run ops:ai-decision-dossier-check

Controllo live protetto:

    npm run ops:ai-decision-dossier-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- approval pack locale;
- decision gates;
- work package operativi;
- safety sign-off;
- export testuale e JSON;
- nessuna chiamata AI live;
- nessuna chiave AI;
- nessuna persistenza DB;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- nessuna creazione automatica di attività o interventi;
- allowedToExecute=false;
- revisione umana obbligatoria.


## AI work order preview

Endpoint operativo protetto:

    /api/ops/ai-work-order-preview-dry-run

Controllo automatico:

    npm run ops:ai-work-order-preview-check

Controllo live protetto:

    npm run ops:ai-work-order-preview-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- task draft;
- intervention draft;
- pacchetto reviewer;
- nessuna chiamata AI live;
- nessuna chiave AI;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- allowedToCreateTask=false;
- allowedToCreateIntervention=false;
- allowedToExecute=false;
- revisione umana obbligatoria.


## AI work order execution gate

Endpoint operativo protetto:

    /api/ops/ai-work-order-execution-gate-dry-run

Controllo automatico:

    npm run ops:ai-work-order-execution-gate-check

Controllo live protetto:

    npm run ops:ai-work-order-execution-gate-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- conversione manuale solo dopo review umana;
- automaticTaskCreationAllowed=false;
- automaticInterventionCreationAllowed=false;
- automaticExecutionAllowed=false;
- noAutomaticDbWrites=true;
- noProviderCall=true;
- nessuna chiamata AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio.


## AI manual conversion audit

Endpoint operativo protetto:

    /api/ops/ai-manual-conversion-audit-dry-run

Controllo automatico:

    npm run ops:ai-manual-conversion-audit-check

Controllo live protetto:

    npm run ops:ai-manual-conversion-audit-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- audit trail solo export/dry-run;
- conversione reale solo manuale;
- nessuna chiamata AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI case export bundle

Endpoint operativo protetto:

    /api/ops/ai-case-export-bundle-dry-run

Controllo automatico:

    npm run ops:ai-case-export-bundle-check

Controllo live protetto:

    npm run ops:ai-case-export-bundle-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- bundle esportabile solo dry-run;
- nessuna chiamata AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI case export archive

Endpoint operativo protetto:

    /api/ops/ai-case-export-archive-dry-run

Controllo automatico:

    npm run ops:ai-case-export-archive-check

Controllo live protetto:

    npm run ops:ai-case-export-archive-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- archive pack solo dry-run;
- download solo manuale;
- nessuna chiamata AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.

    npm run ops:ai-field-intelligence-check
    npm run ops:ai-temporal-trend-check
    npm run ops:ai-field-scouting-plan-check
    npm run ops:ai-field-risk-heatmap-check
    npm run ops:ai-follow-up-scheduler-check
    npm run ops:ai-intervention-readiness-check
    npm run ops:ai-intervention-protocol-check
    npm run ops:ai-farm-command-board-check
    npm run ops:ai-scouting-mission-check
    npm run ops:ai-farm-risk-radar-check
    npm run ops:ai-intervention-impact-check
    npm run ops:ai-response-portfolio-check
    npm run ops:ai-case-memory-graph-check
    npm run ops:ai-case-memory-retrieval-check
    npm run ops:ai-case-outcome-learning-check
    npm run ops:ai-memory-promotion-check
    npm run ops:ai-memory-quality-guard-check


## AI field intelligence

Endpoint operativo protetto:

    /api/ops/ai-field-intelligence-dry-run

Controllo automatico:

    npm run ops:ai-field-intelligence-check

Controllo live protetto:

    npm run ops:ai-field-intelligence-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- field intelligence solo dry-run;
- correlazione multi-foto locale;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI temporal trend

Endpoint operativo protetto:

    /api/ops/ai-temporal-trend-dry-run

Controllo automatico:

    npm run ops:ai-temporal-trend-check

Controllo live protetto:

    npm run ops:ai-temporal-trend-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- trend temporale solo dry-run;
- confronto baseline/follow-up locale;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI field scouting plan

Endpoint operativo protetto:

    /api/ops/ai-field-scouting-plan-dry-run

Controllo automatico:

    npm run ops:ai-field-scouting-plan-check

Controllo live protetto:

    npm run ops:ai-field-scouting-plan-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- scouting plan solo dry-run;
- sampling grid locale;
- route scouting locale;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI field risk heatmap

Endpoint operativo protetto:

    /api/ops/ai-field-risk-heatmap-dry-run

Controllo automatico:

    npm run ops:ai-field-risk-heatmap-check

Controllo live protetto:

    npm run ops:ai-field-risk-heatmap-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- risk heatmap solo dry-run;
- scoring zone locale;
- spread model locale non diagnostico definitivo;
- work queue solo manuale;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI follow-up scheduler

Endpoint operativo protetto:

    /api/ops/ai-follow-up-scheduler-dry-run

Controllo automatico:

    npm run ops:ai-follow-up-scheduler-check

Controllo live protetto:

    npm run ops:ai-follow-up-scheduler-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- follow-up scheduler solo dry-run;
- cadence osservazioni locale;
- finestre follow-up manuali;
- bozze task non persistite;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI intervention readiness

Endpoint operativo protetto:

    /api/ops/ai-intervention-readiness-dry-run

Controllo automatico:

    npm run ops:ai-intervention-readiness-check

Controllo live protetto:

    npm run ops:ai-intervention-readiness-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- intervention readiness solo dry-run;
- approval board solo manuale;
- pacchetti conversione non persistiti;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI intervention protocol

Endpoint operativo protetto:

    /api/ops/ai-intervention-protocol-dry-run

Controllo automatico:

    npm run ops:ai-intervention-protocol-check

Controllo live protetto:

    npm run ops:ai-intervention-protocol-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- intervention protocol solo dry-run;
- manual dispatch bloccato;
- compliance guard obbligatorio;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI farm command board

Endpoint operativo protetto:

    /api/ops/ai-farm-command-board-dry-run

Controllo automatico:

    npm run ops:ai-farm-command-board-check

Controllo live protetto:

    npm run ops:ai-farm-command-board-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- Farm Command Board solo dry-run;
- priorità multi-caso solo locali;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI scouting mission planner

Endpoint operativo protetto:

    /api/ops/ai-scouting-mission-dry-run

Controllo automatico:

    npm run ops:ai-scouting-mission-check

Controllo live protetto:

    npm run ops:ai-scouting-mission-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- mission planner solo dry-run;
- route e shot list solo locali;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI farm risk radar

Endpoint operativo protetto:

    /api/ops/ai-farm-risk-radar-dry-run

Controllo automatico:

    npm run ops:ai-farm-risk-radar-check

Controllo live protetto:

    npm run ops:ai-farm-risk-radar-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- Farm Risk Radar solo dry-run;
- forecast e priorità solo locali;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI intervention impact ROI

Endpoint operativo protetto:

    /api/ops/ai-intervention-impact-dry-run

Controllo automatico:

    npm run ops:ai-intervention-impact-check

Controllo live protetto:

    npm run ops:ai-intervention-impact-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- simulatore impatto solo dry-run;
- ROI proxy non è dato finanziario reale;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI response portfolio optimizer

Endpoint operativo protetto:

    /api/ops/ai-response-portfolio-dry-run

Controllo automatico:

    npm run ops:ai-response-portfolio-check

Controllo live protetto:

    npm run ops:ai-response-portfolio-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- portfolio optimizer solo dry-run;
- portfolio value proxy non è dato finanziario reale;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI case memory graph

Endpoint operativo protetto:

    /api/ops/ai-case-memory-graph-dry-run

Controllo automatico:

    npm run ops:ai-case-memory-graph-check

Controllo live protetto:

    npm run ops:ai-case-memory-graph-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- case memory graph solo dry-run;
- nessuna memoria persistente DB;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI case memory retrieval

Endpoint operativo protetto:

    /api/ops/ai-case-memory-retrieval-dry-run

Controllo automatico:

    npm run ops:ai-case-memory-retrieval-check

Controllo live protetto:

    npm run ops:ai-case-memory-retrieval-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- case memory retrieval solo dry-run;
- nessuna memoria persistente DB;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI case outcome learning

Endpoint operativo protetto:

    /api/ops/ai-case-outcome-learning-dry-run

Controllo automatico:

    npm run ops:ai-case-outcome-learning-check

Controllo live protetto:

    npm run ops:ai-case-outcome-learning-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- case outcome learning solo dry-run;
- nessuna memoria persistente DB;
- nessun aggiornamento memoria automatico;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI memory promotion governance

Endpoint operativo protetto:

    /api/ops/ai-memory-promotion-dry-run

Controllo automatico:

    npm run ops:ai-memory-promotion-check

Controllo live protetto:

    npm run ops:ai-memory-promotion-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- memory promotion solo dry-run;
- nessuna memoria persistente DB;
- nessuna promozione memoria automatica;
- nessun aggiornamento memoria automatico;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.


## AI memory quality guard

Endpoint operativo protetto:

    /api/ops/ai-memory-quality-guard-dry-run

Controllo automatico:

    npm run ops:ai-memory-quality-guard-check

Controllo live protetto:

    npm run ops:ai-memory-quality-guard-check -- --base https://bb1studio.com/agri_app --include-live

Regole:

- memory quality guard solo dry-run;
- nessuna memoria persistente DB;
- nessuna scrittura qualità memoria;
- nessuna promozione memoria automatica;
- nessun aggiornamento memoria automatico;
- nessuna chiamata provider AI live;
- nessuna persistenza DB;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- human review obbligatoria.

## V10.0 — AI Agronomic Knowledge Vault & Expert Playbook Governance

### Scope

V10.0 aggiunge un vault locale dry-run per la governance della conoscenza agronomica premium:

- playbook expert versionati;
- regole di applicabilità per coltura, caso, stagione, rischio, evidenza e compliance;
- soglie evidenziali con blocker;
- conflict register tra playbook;
- approval queue manuale;
- snapshot governance redatto;
- rollback plan;
- endpoint ops protetto `/api/ops/ai-knowledge-vault-dry-run`.

### Check

Script dedicato:

```txt
ops:ai-knowledge-vault-check
```

Il check verifica engine, route, pannelli UI/admin, README, safety dry-run, assenza di provider call, assenza di storage client, assenza di accessi DB e integrazione nei check operativi principali.

### Safety

Il modulo resta locale, redatto e manuale: providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true, localMemoryOnly=true, localQualityOnly=true.
## V10.1 — AI Field Autopilot Simulation Control Room

### Scope

V10.1 aggiunge una control room simulativa locale per coordinare scouting, rischio campo, readiness interventi, memory quality, knowledge vault e command board.

- endpoint ops protetto `/api/ops/ai-field-autopilot-control-room-dry-run`;
- engine locale `aiFieldAutopilotControlRoom.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- command candidates solo simulativi;
- hard-stop su task, interventi, esecuzione, provider, persistenza, prescrizioni e dosaggi.

### Check

```txt
ops:ai-field-autopilot-control-room-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V10.2 — AI Crop-Specific Expert Protocol Builder

### Scope

V10.2 aggiunge un builder locale dry-run per protocolli agronomici expert specifici per coltura.

- endpoint ops protetto `/api/ops/ai-crop-protocol-builder-dry-run`;
- engine locale `aiCropProtocolBuilder.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- evidence gates, conflict register e manual review board;
- hard-stop su provider, persistenza, task, interventi, esecuzione, prescrizioni e dosaggi.

### Check

```txt
ops:ai-crop-protocol-builder-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V10.3 — AI Agronomic Board Pack & Executive Decision Center

### Scope

V10.3 aggiunge un Executive Decision Center locale dry-run per creare board pack agronomici redatti.

- endpoint ops protetto `/api/ops/ai-agronomic-board-pack-dry-run`;
- engine locale `aiAgronomicBoardPack.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- decision cards, risk register, ROI proxy e governance checklist;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, prescrizioni e dosaggi.

### Check

```txt
ops:ai-agronomic-board-pack-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V10.4 — AI Farm Digital Twin Readiness Simulator

### Scope

V10.4 aggiunge un simulatore locale dry-run di digital twin aziendale.

- endpoint ops protetto `/api/ops/ai-farm-digital-twin-readiness-dry-run`;
- engine locale `aiFarmDigitalTwinReadiness.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- field nodes, case pressure, scenario sandbox, readiness gaps e governance stops;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, prescrizioni e dosaggi.

### Check

```txt
ops:ai-farm-digital-twin-readiness-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V10.5 — AI Climate Resilience & Water Strategy Simulator

### Scope

V10.5 aggiunge un simulatore locale dry-run per resilienza climatica e strategia idrica.

- endpoint ops protetto `/api/ops/ai-climate-water-strategy-dry-run`;
- engine locale `aiClimateWaterStrategy.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- climate risk zones, water strategy scenarios, readiness lanes, evidence gaps e governance stops;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, prescrizioni e dosaggi.

### Check

```txt
ops:ai-climate-water-strategy-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V10.6 — AI Pest & Disease Outbreak Sentinel & Biosecurity Simulator

### Scope

V10.6 aggiunge un simulatore locale dry-run per early warning fitopatologico e biosecurity.

- endpoint ops protetto `/api/ops/ai-pest-disease-outbreak-sentinel-dry-run`;
- engine locale `aiPestDiseaseOutbreakSentinel.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- outbreak risk zones, pressure signals, surveillance lanes, evidence gaps e biosecurity stops;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, alert pubblici, prescrizioni e dosaggi.

### Check

```txt
ops:ai-pest-disease-outbreak-sentinel-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V10.7 — AI Soil Health & Nutrient Balance Strategy Simulator

### Scope

V10.7 aggiunge un simulatore locale dry-run per soil health e nutrient balance.

- endpoint ops protetto `/api/ops/ai-soil-nutrient-strategy-dry-run`;
- engine locale `aiSoilNutrientStrategy.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- soil zones, nutrient signals, sampling lanes, evidence gaps e governance stops;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, prescrizioni prodotto, raccomandazioni fertilizzanti e dosaggi.

### Check

```txt
ops:ai-soil-nutrient-strategy-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V10.8 — AI Phenology, Pollination & Yield Risk Simulator

### Scope

V10.8 aggiunge un simulatore locale dry-run per fenologia, impollinazione e yield-risk proxy.

- endpoint ops protetto `/api/ops/ai-phenology-yield-risk-dry-run`;
- engine locale `aiPhenologyYieldRisk.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- phenology windows, risk signals, review lanes, evidence gaps e governance stops;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-phenology-yield-risk-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V10.9 — AI Harvest Readiness & Post-Harvest Quality Simulator

### Scope

V10.9 aggiunge un simulatore locale dry-run per readiness raccolta e qualità post-raccolta.

- endpoint ops protetto `/api/ops/ai-harvest-quality-readiness-dry-run`;
- engine locale `aiHarvestQualityReadiness.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- harvest zones, quality signals, review lanes, evidence gaps e governance stops;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-harvest-quality-readiness-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V11.0 — AI Agronomic Control Tower & Governance Kernel

### Scope

V11.0 aggiunge una control tower agronomica locale dry-run per coordinare i moduli premium AI V10.x.

- endpoint ops protetto `/api/ops/ai-agronomic-control-tower-dry-run`;
- engine locale `aiAgronomicControlTower.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- module nodes, command cards, governance gates, escalation paths e readiness gaps;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, alert, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-agronomic-control-tower-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V11.1 — AI Agronomic Explainability Ledger & Traceability Kernel

### Scope

V11.1 aggiunge un ledger locale dry-run per explainability, traceability e audit agronomico.

- endpoint ops protetto `/api/ops/ai-agronomic-explainability-ledger-dry-run`;
- engine locale `aiAgronomicExplainabilityLedger.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- source nodes, evidence contribution map, reasoning trace, uncertainty register, counterfactual review, reviewer questions e audit ledger;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, alert, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-agronomic-explainability-ledger-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V11.2 — AI Agronomic Compliance Passport & Certification Readiness Kernel

### Scope

V11.2 aggiunge un passport locale dry-run per compliance agronomica, audit readiness e certification readiness.

- endpoint ops protetto `/api/ops/ai-agronomic-compliance-passport-dry-run`;
- engine locale `aiAgronomicCompliancePassport.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- source nodes, requirement matrix, audit trail, certification readiness, traceability gaps, reviewer checklist ed export sections;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-agronomic-compliance-passport-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V11.3 — AI Agronomic Decision Assurance & Human Sign-off Kernel

### Scope

V11.3 aggiunge un kernel locale dry-run per decision assurance, human sign-off e safe decision packet.

- endpoint ops protetto `/api/ops/ai-agronomic-decision-assurance-dry-run`;
- engine locale `aiAgronomicDecisionAssurance.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- assurance gates, human sign-off board, dissent register, decision packet, evidence chain e assurance gaps;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-agronomic-decision-assurance-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V11.4 — AI Agronomic Scenario Stress Test & Resilience War Room

### Scope

V11.4 aggiunge un simulatore locale dry-run per stress test agronomico multi-scenario e resilience war room.

- endpoint ops protetto `/api/ops/ai-agronomic-scenario-stress-test-dry-run`;
- engine locale `aiAgronomicScenarioStressTest.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- scenario nodes, failure modes, war room drills, resilience gates, rollback playbook, stress evidence chain e stress test gaps;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-agronomic-scenario-stress-test-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V11.5 — AI Agronomic Continuous Improvement & Resilience Scorecard Kernel

### Scope

V11.5 aggiunge un kernel locale dry-run per continuous improvement agronomico, scorecard resilienza e maturity roadmap.

- endpoint ops protetto `/api/ops/ai-agronomic-improvement-scorecard-dry-run`;
- engine locale `aiAgronomicImprovementScorecard.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- source nodes, resilience scorecard, improvement backlog, maturity model, review cadence, roadmap scenarios e improvement gaps;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-agronomic-improvement-scorecard-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V12.0 — AI Provider Activation Firewall & Runtime Safety Control Plane

### Scope

V12.0 aggiunge un control plane locale dry-run per provider activation readiness senza attivare provider reali.

- endpoint ops protetto `/api/ops/ai-provider-activation-firewall-dry-run`;
- engine locale `aiProviderActivationFirewall.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- source nodes, readiness gates, payload minimization review, rollout stages, runtime firewall rules, rollback plan e manual approval questions;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-provider-activation-firewall-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V12.1 — AI Provider Request Sandbox & Redaction Contract Kernel

### Scope

V12.1 aggiunge un sandbox locale dry-run per provider request contract readiness senza chiamare provider reali.

- endpoint ops protetto `/api/ops/ai-provider-request-sandbox-dry-run`;
- engine locale `aiProviderRequestSandbox.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- source nodes, request blueprint, redaction contract, output contract, review gates, manual approval board e rollback plan;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-provider-request-sandbox-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V12.2 — AI Provider Response Firewall & Output Validation Contract

### Scope

V12.2 aggiunge un firewall locale dry-run per validazione futura delle risposte provider senza chiamare provider reali.

- endpoint ops protetto `/api/ops/ai-provider-response-firewall-dry-run`;
- engine locale `aiProviderResponseFirewall.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- source nodes, response envelope, output validation gates, unsafe output rules, contract breach register, reviewer validation board e rollback plan;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-provider-response-firewall-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V12.3 — AI Provider Shadow Evaluation & Synthetic Benchmark Harness

### Scope

V12.3 aggiunge un harness locale dry-run per shadow evaluation provider e synthetic benchmark governance senza chiamare provider reali.

- endpoint ops protetto `/api/ops/ai-provider-shadow-evaluation-dry-run`;
- engine locale `aiProviderShadowEvaluation.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- source nodes, synthetic benchmark cases, shadow metrics, rejection drills, review gates, manual approval board e rollback plan;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-provider-shadow-evaluation-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V12.4 — AI Provider Pilot Readiness Board & Canary Rollout Simulator

### Scope

V12.4 aggiunge un simulatore locale dry-run per provider pilot readiness e canary rollout governance senza attivare provider reali.

- endpoint ops protetto `/api/ops/ai-provider-canary-rollout-dry-run`;
- engine locale `aiProviderCanaryRollout.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- source nodes, canary stages, acceptance criteria, kill-switch drills, pilot approval board, rollback governance e risk register;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-provider-canary-rollout-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V12.5 — AI Provider Observability & Incident Response Drill Center

### Scope

V12.5 aggiunge un centro locale dry-run per provider observability, incident drill e runtime review senza attivare provider reali.

- endpoint ops protetto `/api/ops/ai-provider-observability-drill-dry-run`;
- engine locale `aiProviderObservabilityDrill.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- source nodes, runtime signals, incident drills, review gates, quality drift watch, latency budget review, approval board e rollback plan;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-provider-observability-drill-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V12.7 — AI Provider Safe Enablement Gate & Dual-Control Activation Simulator

### Scope

V12.7 aggiunge un gate locale dry-run per provider safe enablement, dual-control review e change ticket simulation senza attivare provider reali.

- endpoint ops protetto `/api/ops/ai-provider-safe-enablement-gate-dry-run`;
- engine locale `aiProviderSafeEnablementGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- source nodes, enablement gates, dual-control approval board, change ticket draft, readiness ledger, boundary exceptions, go-live blockers e rollback rehearsal;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-provider-safe-enablement-gate-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V12.8 — AI Provider Runtime Adapter Contract & Zero-Call Execution Harness

### Scope

V12.8 aggiunge un modulo locale dry-run per provider runtime adapter contract e zero-call harness senza attivare provider reali.

- endpoint ops protetto `/api/ops/ai-provider-runtime-adapter-contract-dry-run`;
- engine locale `aiProviderRuntimeAdapterContract.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- source nodes, adapter contract, zero-call proof, runtime adapter gates, adapter stages, human-loop handoff, rollback rehearsal e adapter risk register;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-provider-runtime-adapter-contract-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V12.9 — AI Provider Final Readiness Audit Pack & Activation Freeze Ledger

### Scope

V12.9 aggiunge un audit pack locale dry-run per chiusura fase provider readiness e activation freeze governance senza attivare provider reali.

- endpoint ops protetto `/api/ops/ai-provider-final-readiness-audit-dry-run`;
- engine locale `aiProviderFinalReadinessAudit.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- source nodes, final audit dossier, activation freeze ledger, executive board checklist, non-activation evidence, release freeze gates, residual hold register e rollback certification;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-provider-final-readiness-audit-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V13.0 — AI Human Reviewer Mission Control & Evidence Arbitration Board

### Scope

V13.0 aggiunge un modulo locale dry-run per mission control della revisione umana, arbitraggio evidenze e signoff manuale.

- endpoint ops protetto `/api/ops/ai-human-review-mission-control-dry-run`;
- engine locale `aiHumanReviewMissionControl.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- review queue, evidence arbitration, reviewer disagreements, confidence calibration, decision locks, escalation board, audit packet e human signoff;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-human-review-mission-control-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V13.1 — AI Reviewer Consensus Calibration & Dispute Resolution Engine

### Scope

V13.1 aggiunge un modulo locale dry-run per consenso tra reviewer, evidence weighting, dissent register e dispute resolution.

- endpoint ops protetto `/api/ops/ai-reviewer-consensus-calibration-dry-run`;
- engine locale `aiReviewerConsensusCalibration.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- evidence weighting, dissent register, calibration board, dispute resolution gates, decision holds, consensus board, reviewer audit trail e consensus signoff;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-reviewer-consensus-calibration-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V13.2 — AI Evidence Integrity Chain-of-Custody & Audit Replay Board

### Scope

V13.2 aggiunge un modulo locale dry-run per integrità evidenze, chain-of-custody, tamper review e replay audit.

- endpoint ops protetto `/api/ops/ai-evidence-integrity-custody-dry-run`;
- engine locale `aiEvidenceIntegrityCustody.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- custody timeline, integrity gate matrix, tamper review board, redaction ledger, audit replay trail, evidence locks, escalation board e custody signoff;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-evidence-integrity-custody-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V13.3 — AI Reviewer Rationale Ledger & Evidence-to-Decision Traceability Matrix

### Scope

V13.3 aggiunge un modulo locale dry-run per rationale ledger, evidence-to-decision traceability, decision hold reasons e audit replay.

- endpoint ops protetto `/api/ops/ai-reviewer-rationale-ledger-dry-run`;
- engine locale `aiReviewerRationaleLedger.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- evidence decision trace, reviewer rationale ledger, decision hold reasons, traceability gates, dissent links, audit replay, escalation board e rationale signoff;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-reviewer-rationale-ledger-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V13.4 — AI Human Review Board Pack & Decision Freeze Certificate

### Scope

V13.4 aggiunge un board pack locale dry-run per review umana, decision freeze, outcome matrix e signoff manuale.

- endpoint ops protetto `/api/ops/ai-human-review-board-pack-dry-run`;
- engine locale `aiHumanReviewBoardPack.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- board briefing, decision freeze certificate, review outcome matrix, escalation holds, non-actionable export packet e human board signoff;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-human-review-board-pack-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V13.5 — AI Human Review Quality Assurance & Peer Calibration Audit

### Scope

V13.5 aggiunge un modulo locale dry-run per quality assurance della revisione umana, peer calibration, rubric quality e QA signoff.

- endpoint ops protetto `/api/ops/ai-human-review-quality-assurance-dry-run`;
- engine locale `aiHumanReviewQualityAssurance.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- peer calibration board, rubric quality matrix, reviewer drift watch, QA gate matrix, QA exception register, decision freeze certificate, audit replay e QA signoff;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-human-review-quality-assurance-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V13.6 — AI Human Review Compliance Attestation & Accountability Ledger

### Scope

V13.6 aggiunge un modulo locale dry-run per compliance attestation della revisione umana, accountability ledger e governance evidence pack.

- endpoint ops protetto `/api/ops/ai-human-review-compliance-attestation-dry-run`;
- engine locale `aiHumanReviewComplianceAttestation.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- compliance attestation board, accountability ledger, governance evidence pack, compliance gate matrix, governance exception register, decision freeze assurance, audit replay e compliance signoff;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-human-review-compliance-attestation-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V14.0 — AI Agronomic Decision Simulation Board & Non-Execution Strategy Pack

### Scope

V14.0 apre la fase V14 con un modulo locale dry-run per simulazione decisionale agronomica post-review e non-execution strategy pack.

- endpoint ops protetto `/api/ops/ai-agronomic-decision-simulation-board-dry-run`;
- engine locale `aiAgronomicDecisionSimulationBoard.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- decision simulation board, option scenario matrix, agronomic uncertainty map, non-execution certificate, strategy gate matrix, board strategy pack, audit replay e strategy signoff;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-agronomic-decision-simulation-board-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V14.1 — AI Agronomic Scenario Stress Test & Failure Mode Sandbox

### Scope

V14.1 aggiunge un modulo locale dry-run per stress test degli scenari agronomici non esecutivi, failure mode sandbox e resilience strategy pack.

- endpoint ops protetto `/api/ops/ai-agronomic-scenario-stress-test-dry-run`;
- engine locale `aiAgronomicScenarioStressTest.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- scenario stress cases, failure mode sandbox, fragility map, contingency holds, non-execution envelope, stress gate matrix, resilience strategy pack, audit replay e stress signoff;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-agronomic-scenario-stress-test-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V14.2 — AI Agronomic Strategy Portfolio Comparator & Trade-Off Board

### Scope

V14.2 aggiunge un modulo locale dry-run per confronto di portafogli strategici agronomici, trade-off board e option ranking non esecutivo.

- endpoint ops protetto `/api/ops/ai-agronomic-strategy-portfolio-comparator-dry-run`;
- engine locale `aiAgronomicStrategyPortfolioComparator.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- strategy portfolio options, tradeoff board, option ranking matrix, uncertainty budget, non-execution boundary, portfolio gate matrix, board portfolio pack, audit replay e portfolio signoff;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-agronomic-strategy-portfolio-comparator-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V14.3 — AI Agronomic Sensitivity Map & Robustness Boundary Board

### Scope

V14.3 aggiunge un modulo locale dry-run per sensitivity map, perturbation matrix e robustness boundary degli scenari agronomici non esecutivi.

- endpoint ops protetto `/api/ops/ai-agronomic-sensitivity-robustness-dry-run`;
- engine locale `aiAgronomicSensitivityRobustness.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- sensitivity drivers, perturbation matrix, robustness boundaries, fragile assumption register, uncertainty levers, non-execution boundary, robustness gate matrix, robustness board pack, audit replay e robustness signoff;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-agronomic-sensitivity-robustness-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V14.4 — AI Agronomic Governance Freeze & Strategy Signoff Registry

### Scope

V14.4 aggiunge un modulo locale dry-run per governance freeze della strategia agronomica simulata, registry di signoff e actionability trap board.

- endpoint ops protetto `/api/ops/ai-agronomic-governance-freeze-dry-run`;
- engine locale `aiAgronomicGovernanceFreeze.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- governance freeze board, signoff registry, actionability trap board, scenario closure map, decision boundary ledger, non-execution certificate, governance gate matrix, governance board pack, audit replay e governance signoff;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-agronomic-governance-freeze-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V14.5 — AI Agronomic Executive Board Dossier & Non-Operational Strategy Narrative

### Scope

V14.5 aggiunge un modulo locale dry-run per executive board dossier agronomico, strategy narrative freeze e non-operational certificate.

- endpoint ops protetto `/api/ops/ai-agronomic-executive-dossier-dry-run`;
- engine locale `aiAgronomicExecutiveDossier.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- executive dossier board, strategy narrative freeze, board signal summary, decision boundary summary, human signoff agenda, non-operational certificate, executive gate matrix, executive board pack, audit replay e executive signoff;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-agronomic-executive-dossier-check
```

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V15.0 — Online Operational Readiness & Provider Activation Plan

### Scope

V15.0 apre la fase di readiness operativa online. La versione non abilita provider AI reali, persistenza AI, memoria persistente, automazioni, task, interventi o esecuzione.

- endpoint ops protetto `/api/ops/ai-online-operational-readiness-dry-run`;
- engine locale `aiOnlineOperationalReadiness.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- provider activation plan, environment readiness matrix, data migration plan, human review workflow plan, access control plan, cost/rate limit plan, rollback and kill-switch plan, beta go/no-go board, readiness gates e board pack;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-online-operational-readiness-check
```

### Stato

Online controllato dry-run consentito. AI operativa reale non ancora consentita.

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V15.1 — AI Provider Runtime Staging Gateway & Contract Hardening

### Scope

V15.1 aggiunge un modulo locale dry-run per provider runtime staging gateway, request envelope, response contract hardening, schema guard, budget guard e fallback plan.

- endpoint ops protetto `/api/ops/ai-provider-runtime-staging-gateway-dry-run`;
- engine locale `aiProviderRuntimeStagingGateway.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- gateway design plan, request envelope plan, response contract hardening, schema guard plan, provider budget guard, fallback plan, dry-run case matrix, staging gateway gates e board pack;
- hard-stop su provider reale, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

### Check

```txt
ops:ai-provider-runtime-staging-gateway-check
```

### Stato

Gateway provider disponibile solo come staging design dry-run. Nessuna chiamata provider reale.

### Safety

providerAiReady=false, persistenceReady=false, memoryPersistenceReady=false, automaticTaskCreationReady=false, automaticInterventionCreationReady=false, automaticExecutionReady=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, providerCallAllowed=false, providerCallPerformed=false, publicSharePerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V15.2 — AI Case Persistence Migration Plan & Storage Safety Blueprint

### Scope

V15.2 aggiunge un modulo locale dry-run per progettare la futura persistenza dei casi AI e il piano migration/storage safety.

- endpoint ops protetto `/api/ops/ai-case-persistence-migration-plan-dry-run`;
- engine locale `aiCasePersistenceMigrationPlan.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- entity blueprint, migration plan, backup/restore plan, photo retention plan, audit chain plan, review record plan, storage gates e board pack;
- nessuna modifica Prisma schema, nessuna migration execution, nessuna scrittura AI persistente, nessuna memoria persistente, nessuna automazione, nessun task/intervento.

### Check

```txt
ops:ai-case-persistence-migration-plan-check
```

### Stato

Blueprint persistenza AI pronto solo in dry-run. Persistenza AI reale ancora no-go.

### Safety

providerAiReady=false, persistenceReady=false, casePersistenceActivationAllowed=false, casePersistencePerformed=false, migrationExecutionAllowed=false, migrationExecutionPerformed=false, schemaWriteAllowed=false, schemaWritePerformed=false, providerCalled=false, persistencePerformed=false, memoryPersistencePerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V15.3 — AI Persistent Human Review Workflow & Manual Conversion Gate Design

### Scope

V15.3 aggiunge un modulo locale dry-run per workflow umano persistente e gate di conversione manuale AI-to-work.

- endpoint ops protetto `/api/ops/ai-persistent-human-review-workflow-dry-run`;
- engine locale `aiPersistentHumanReviewWorkflow.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- review state machine, reviewer ownership plan, reason requirement plan, audit trail design, manual conversion gate plan, correction path plan, review go/no-go board, review workflow gates e board pack;
- nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-persistent-human-review-workflow-check
```

### Stati review progettati

DRAFT, PROVIDER_STAGING_HOLD, REVIEW_REQUIRED, REVIEW_IN_PROGRESS, APPROVED_FOR_MANUAL_CONVERSION, REJECTED, ARCHIVED.

### Stato

Workflow umano persistente pronto solo in dry-run. Persistenza review e conversione reale ancora no-go.

### Safety

providerAiReady=false, persistenceReady=false, casePersistenceActivationAllowed=false, reviewPersistenceAllowed=false, reviewPersistencePerformed=false, manualConversionAllowed=false, manualConversionPerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V15.4 — AI Provider Staging Shadow Run & Non-Production Evaluation Drill

### Scope

V15.4 aggiunge un modulo locale dry-run per shadow run provider non produttivo.

- endpoint ops protetto `/api/ops/ai-provider-staging-shadow-run-dry-run`;
- engine locale `aiProviderStagingShadowRun.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- shadow scenarios, envelope simulation plan, contract validation matrix, budget simulation plan, fallback drill plan, shadow evaluation matrix, non-production boundary, shadow run gates e board pack;
- nessuna chiamata provider esterna, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-provider-staging-shadow-run-check
```

### Stato

Shadow run provider pronto solo in dry-run non produttivo. Provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, providerCallAllowed=false, providerCallPerformed=false, shadowRunExternalCallAllowed=false, shadowRunExternalCallPerformed=false, persistenceReady=false, casePersistenceActivationAllowed=false, reviewPersistenceAllowed=false, manualConversionAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V15.5 — AI Migration Rehearsal & Storage Gate Validation in Staging

### Scope

V15.5 aggiunge un modulo locale dry-run per rehearsal di migrazione e validazione storage gate in staging.

- endpoint ops protetto `/api/ops/ai-migration-rehearsal-storage-gate-dry-run`;
- engine locale `aiMigrationRehearsalStorageGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- rehearsal plan, schema diff review, backup/restore drill, storage gate validation, retention validation, audit event rehearsal, rollback board, rehearsal gates e board pack;
- nessuna modifica Prisma schema, nessuna migration execution, nessuna scrittura AI persistente, nessuna persistenza review, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-migration-rehearsal-storage-gate-check
```

### Stato

Rehearsal migration/storage pronto solo in dry-run. Migration reale e storage AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, persistenceReady=false, casePersistenceActivationAllowed=false, casePersistencePerformed=false, migrationExecutionAllowed=false, migrationExecutionPerformed=false, schemaWriteAllowed=false, schemaWritePerformed=false, reviewPersistenceAllowed=false, manualConversionAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V15.6 — AI Manual Conversion Rehearsal & No-Execution Work Preview

### Scope

V15.6 aggiunge un modulo locale dry-run per progettare conversion preview e rehearsal manuale AI-to-work senza creazione reale di task o interventi.

- endpoint ops protetto `/api/ops/ai-manual-conversion-rehearsal-dry-run`;
- engine locale `aiManualConversionRehearsal.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- conversion preview plan, reviewer checklist, conversion blockers, work package drafts, correction path plan, non-execution certificate, go/no-go board, conversion gates e board pack;
- nessuna creazione task/intervento, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna automazione.

### Check

```txt
ops:ai-manual-conversion-rehearsal-check
```

### Stato

Conversione manuale pronta solo come dry-run preview. Creazione task/interventi reale ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, persistenceReady=false, casePersistenceActivationAllowed=false, reviewPersistenceAllowed=false, manualConversionAllowed=false, manualConversionPerformed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V15.7 — AI Provider Staging Activation Gate & Production Runtime Lock

### Scope

V15.7 aggiunge un modulo locale dry-run per progettare il gate di attivazione staging provider e mantenere bloccato il runtime produttivo.

- endpoint ops protetto `/api/ops/ai-provider-staging-activation-gate-dry-run`;
- engine locale `aiProviderStagingActivationGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- runtime boundary plan, staging switch plan, provider registry plan, budget gate plan, canary boundary plan, failure stop plan, production runtime lock, go/no-go board, activation gates e board pack;
- nessuna chiamata provider esterna, nessuna attivazione staging reale, nessun runtime produttivo, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-provider-staging-activation-gate-check
```

### Stato

Gate di attivazione staging pronto solo come dry-run design. Provider reale, staging runtime e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, providerActivationAllowed=false, providerStagingActivationAllowed=false, productionRuntimeAllowed=false, providerRegistryWriteAllowed=false, persistenceReady=false, casePersistenceActivationAllowed=false, reviewPersistenceAllowed=false, manualConversionAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V15.8 — AI Storage Rehearsal Board & Live Migration Execution Lock

### Scope

V15.8 aggiunge un modulo locale dry-run per storage rehearsal board e live migration execution lock.

- endpoint ops protetto `/api/ops/ai-storage-rehearsal-board-dry-run`;
- engine locale `aiStorageRehearsalBoard.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- storage blueprint, staging rehearsal plan, restore validation plan, retention control plan, audit replay plan, live migration lock, storage safety board, go/no-go board, storage gates e board pack;
- nessuna modifica Prisma schema, nessuna migration execution, nessuna scrittura AI persistente, nessuna persistenza review, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-storage-rehearsal-board-check
```

### Stato

Storage rehearsal board pronta solo come dry-run design. Live migration, schema write e storage AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, persistenceReady=false, casePersistenceActivationAllowed=false, storageActivationAllowed=false, storageActivationPerformed=false, liveMigrationExecutionAllowed=false, liveMigrationExecutionPerformed=false, migrationExecutionAllowed=false, schemaWriteAllowed=false, schemaWritePerformed=false, reviewPersistenceAllowed=false, manualConversionAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V15.9 — AI Controlled Beta Readiness Board & Manual-Only Operational Gate

### Scope

V15.9 aggiunge un modulo locale dry-run per board di readiness beta controllata e gate operativo manual-only.

- endpoint ops protetto `/api/ops/ai-controlled-beta-readiness-board-dry-run`;
- engine locale `aiControlledBetaReadinessBoard.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- provider gate plan, storage gate plan, review gate plan, conversion gate plan, observability plan, rollback plan, manual-only boundary, go/no-go board, beta board gates e board pack;
- nessuna beta reale, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-controlled-beta-readiness-board-check
```

### Stato

Board beta controllata pronta solo come dry-run design. Beta reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, controlledBetaAllowed=false, controlledBetaPerformed=false, productionRuntimeAllowed=false, persistenceReady=false, casePersistenceActivationAllowed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, manualConversionAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V16.0 — AI Controlled Production Beta Launch Gate & Zero-Activation Cutover Plan

### Scope

V16.0 aggiunge un modulo locale dry-run per gate di lancio beta controllata e zero-activation cutover plan.

- endpoint ops protetto `/api/ops/ai-controlled-production-beta-gate-dry-run`;
- engine locale `aiControlledProductionBetaGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- launch cutover plan, provider runtime locks, storage runtime locks, review runtime locks, conversion runtime locks, observability tower, rollback tower, go/no-go board, launch gates e board pack;
- nessuna beta reale, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-controlled-production-beta-gate-check
```

### Stato

Launch gate beta controllata pronto solo come dry-run design. Beta reale, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, controlledBetaAllowed=false, productionBetaAllowed=false, productionBetaPerformed=false, zeroActivationMode=true, productionRuntimeAllowed=false, persistenceReady=false, casePersistenceActivationAllowed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, manualConversionAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V16.1 — AI Post-Beta Observability & Rollback Hardening Drill

### Scope

V16.1 aggiunge un modulo locale dry-run per hardening post-beta di osservabilità e rollback.

- endpoint ops protetto `/api/ops/ai-post-beta-observability-rollback-dry-run`;
- engine locale `aiPostBetaObservabilityRollback.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- incident signal plan, rollback tower hardening, kill-switch drill plan, reviewer audit plan, anomaly board, fallback route plan, runtime lock hardening, go/no-go board, hardening gates e board pack;
- nessun runtime reale, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-post-beta-observability-rollback-check
```

### Stato

Hardening post-beta pronto solo come dry-run design. Runtime reale, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, controlledBetaAllowed=false, productionBetaAllowed=false, zeroActivationMode=true, productionRuntimeAllowed=false, persistenceReady=false, casePersistenceActivationAllowed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, manualConversionAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V16.2 — AI Operational Audit Package & Compliance Export Hardening

### Scope

V16.2 aggiunge un modulo locale dry-run per operational audit package e compliance export hardening.

- endpoint ops protetto `/api/ops/ai-operational-audit-package-dry-run`;
- engine locale `aiOperationalAuditPackage.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- audit trail package, compliance export packet, redaction board, reviewer evidence pack, immutable evidence design, runtime lock evidence, export no-go board, audit package gates e board pack;
- nessun compliance export reale, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-operational-audit-package-check
```

### Stato

Operational audit package pronto solo come dry-run design. Compliance export reale, runtime reale, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, controlledBetaAllowed=false, productionBetaAllowed=false, zeroActivationMode=true, productionRuntimeAllowed=false, complianceExportAllowed=false, complianceExportPerformed=false, persistenceReady=false, casePersistenceActivationAllowed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, manualConversionAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, publicShareAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V16.3 — AI Human-Supervised Agronomic Operations Cockpit & Manual Dispatch Readiness

### Scope

V16.3 aggiunge un modulo locale dry-run per cockpit operativo umano-supervisionato e manual dispatch readiness.

- endpoint ops protetto `/api/ops/ai-human-supervised-operations-cockpit-dry-run`;
- engine locale `aiHumanSupervisedOperationsCockpit.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- operator board, manual dispatch readiness, reviewer queue, escalation path plan, safety boundary, operational evidence pack, execution no-go board, cockpit gates e board pack;
- nessun dispatch reale, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-human-supervised-operations-cockpit-check
```

### Stato

Cockpit umano-supervisionato pronto solo come dry-run design. Dispatch reale, runtime reale, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, controlledBetaAllowed=false, productionBetaAllowed=false, zeroActivationMode=true, productionRuntimeAllowed=false, complianceExportAllowed=false, persistenceReady=false, casePersistenceActivationAllowed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, manualConversionAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, publicShareAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V16.4 — AI Staged Provider Runtime Beta Gate & Explicit Activation Approval Lock

### Scope

V16.4 aggiunge un modulo locale dry-run per staged provider runtime beta gate e explicit activation approval lock.

- endpoint ops protetto `/api/ops/ai-staged-provider-runtime-beta-dry-run`;
- engine locale `aiStagedProviderRuntimeBeta.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- runtime allowlist, provider contract plan, budget window plan, canary scope plan, runtime stop plan, reviewer approval board, production runtime locks, go/no-go board e runtime beta gates;
- nessun provider runtime reale, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-staged-provider-runtime-beta-check
```

### Stato

Staged provider runtime beta pronto solo come dry-run design. Provider reale, runtime reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, providerRuntimeBetaAllowed=false, providerRuntimeBetaPerformed=false, explicitActivationApprovalAllowed=false, explicitActivationApprovalPerformed=false, productionRuntimeAllowed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, manualConversionAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, publicShareAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V16.5 — AI Runtime Incident Response Board & Provider Failure Drill

### Scope

V16.5 aggiunge un modulo locale dry-run per runtime incident response board e provider failure drill.

- endpoint ops protetto `/api/ops/ai-runtime-incident-response-board-dry-run`;
- engine locale `aiRuntimeIncidentResponseBoard.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- incident intake plan, provider failure drill, response routing plan, rollback action cards, operator communication plan, anomaly replay plan, incident no-go board, incident gates e board pack;
- nessun incident response reale, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza incidenti, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-runtime-incident-response-board-check
```

### Stato

Runtime incident response board pronta solo come dry-run design. Incident response reale, provider reale, incident write e notifiche ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, incidentResponseAllowed=false, incidentResponsePerformed=false, providerFailureDrillAllowed=false, runtimeIncidentWriteAllowed=false, incidentNotificationAllowed=false, providerRuntimeBetaAllowed=false, productionRuntimeAllowed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, manualConversionAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, publicShareAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V16.6 — AI Compliance Export Activation Gate & Privacy Redaction Approval Lock

### Scope

V16.6 aggiunge un modulo locale dry-run per compliance export activation gate e privacy redaction approval lock.

- endpoint ops protetto `/api/ops/ai-compliance-export-activation-gate-dry-run`;
- engine locale `aiComplianceExportActivationGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- export activation gate, privacy redaction approval, legal review locks, reviewer attestation board, export scope plan, audit evidence locks, publication no-go board e export gate checks;
- nessun export reale, nessuna pubblicazione, nessun file write, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-compliance-export-activation-gate-check
```

### Stato

Compliance export activation gate pronto solo come dry-run design. Export reale, pubblicazione, file write, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, complianceExportActivationAllowed=false, complianceExportActivationPerformed=false, exportFileWriteAllowed=false, exportPublicationAllowed=false, publicShareAllowed=false, privacyRedactionApprovalAllowed=false, legalReviewApprovalAllowed=false, productionRuntimeAllowed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, manualConversionAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V16.7 — AI Manual Dispatch Activation Gate & Operational Approval Lock

### Scope

V16.7 aggiunge un modulo locale dry-run per manual dispatch activation gate e operational approval lock.

- endpoint ops protetto `/api/ops/ai-manual-dispatch-activation-gate-dry-run`;
- engine locale `aiManualDispatchActivationGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- dispatch activation gate, operator approval board, agronomic safety checklist, work conversion boundary, reviewer signoff board, rollback dispatch plan, dispatch no-go board e dispatch gate checks;
- nessun dispatch reale, nessun ticket write, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-manual-dispatch-activation-gate-check
```

### Stato

Manual dispatch activation gate pronto solo come dry-run design. Dispatch reale, ticket write, task, interventi, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, manualDispatchActivationAllowed=false, manualDispatchActivationPerformed=false, operationalApprovalAllowed=false, dispatchTicketWriteAllowed=false, workOrderDispatchAllowed=false, dispatchNotificationAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, publicShareAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V16.8 — AI Provider Runtime Canary Execution Gate & Zero-Call Execution Lock

### Scope

V16.8 aggiunge un modulo locale dry-run per provider runtime canary execution gate e zero-call execution lock.

- endpoint ops protetto `/api/ops/ai-provider-runtime-canary-execution-dry-run`;
- engine locale `aiProviderRuntimeCanaryExecution.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- canary execution gate, provider zero-call locks, canary case criteria, budget envelope, reviewer canary approval, provider result boundary, canary stop plan e canary no-go board;
- nessun provider canary reale, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza risultato canary, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-provider-runtime-canary-execution-check
```

### Stato

Provider runtime canary execution gate pronto solo come dry-run design. Canary reale, provider call, result persistence, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, providerRuntimeCanaryAllowed=false, providerRuntimeCanaryPerformed=false, providerCanaryCallAllowed=false, providerCanaryCallPerformed=false, canaryExecutionAllowed=false, canaryExecutionPerformed=false, canaryResultPersistenceAllowed=false, canaryResultPersistencePerformed=false, providerCallAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, publicShareAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V16.9 — AI Runtime Incident Handling Activation Gate & Incident Write Approval Lock

### Scope

V16.9 aggiunge un modulo locale dry-run per runtime incident handling activation gate e incident write approval lock.

- endpoint ops protetto `/api/ops/ai-runtime-incident-handling-activation-gate-dry-run`;
- engine locale `aiRuntimeIncidentHandlingActivationGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- incident handling gate, incident write approval lock, operator notification boundary, incident escalation board, provider incident boundary, rollback incident plan, incident closure checklist e incident no-go board;
- nessun incident handling reale, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza incidenti, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-runtime-incident-handling-activation-gate-check
```

### Stato

Runtime incident handling activation gate pronto solo come dry-run design. Incident handling reale, incident write, escalation, closure, notifiche, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, incidentHandlingAllowed=false, incidentHandlingPerformed=false, incidentWriteAllowed=false, incidentEscalationAllowed=false, incidentClosureAllowed=false, incidentNotificationAllowed=false, providerCallAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, publicShareAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V17.0 — AI Public Compliance Export Publication Gate & Legal Privacy Final Approval Lock

### Scope

V17.0 aggiunge un modulo locale dry-run per public compliance export publication gate e legal/privacy final approval lock.

- endpoint ops protetto `/api/ops/ai-public-compliance-export-publication-gate-dry-run`;
- engine locale `aiPublicComplianceExportPublicationGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- publication gate, legal final approval board, privacy final approval board, publication scope plan, redaction attestation board, export file boundary, takedown rollback plan e publication no-go board;
- nessun export pubblico reale, nessuna pubblicazione, nessun package write, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-public-compliance-export-publication-gate-check
```

### Stato

Public compliance export publication gate pronto solo come dry-run design. Pubblicazione reale, package write, public share, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, publicComplianceExportPublicationAllowed=false, publicComplianceExportPublicationPerformed=false, legalFinalApprovalAllowed=false, privacyFinalApprovalAllowed=false, publicationPackageWriteAllowed=false, publicationTakedownAllowed=false, publicShareAllowed=false, providerCallAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V17.1 — AI Manual Dispatch Write Path Gate & Task/Intervention Creation Approval Lock

### Scope

V17.1 aggiunge un modulo locale dry-run per manual dispatch write path gate e task/intervention creation approval lock.

- endpoint ops protetto `/api/ops/ai-manual-dispatch-write-path-gate-dry-run`;
- engine locale `aiManualDispatchWritePathGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- dispatch write path gate, task write approval lock, intervention write approval lock, work order boundary, operator write attestation, rollback write plan e write no-go board;
- nessun write path reale, nessun ticket write, nessun task, nessun intervento, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna automazione.

### Check

```txt
ops:ai-manual-dispatch-write-path-gate-check
```

### Stato

Manual dispatch write path gate pronto solo come dry-run design. Write path reale, ticket write, task, interventi, work order persistence, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, manualDispatchWritePathAllowed=false, dispatchDraftWriteAllowed=false, dispatchTicketWriteAllowed=false, workOrderDispatchAllowed=false, taskWriteApprovalAllowed=false, interventionWriteApprovalAllowed=false, workOrderPersistenceAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, publicShareAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V17.2 — AI Provider Canary Call Execution Gate & Explicit Provider Approval Lock

### Scope

V17.2 aggiunge un modulo locale dry-run per provider canary call execution gate e explicit provider approval lock.

- endpoint ops protetto `/api/ops/ai-provider-canary-call-execution-gate-dry-run`;
- engine locale `aiProviderCanaryCallExecutionGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- provider call gate, explicit provider approval lock, provider request boundary, budget envelope, reviewer provider approval, provider result boundary, rollback provider call plan e provider call no-go board;
- nessuna chiamata provider reale, nessun request send, nessuna produzione AI, nessuna persistenza risultato, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-provider-canary-call-execution-gate-check
```

### Stato

Provider canary call execution gate pronto solo come dry-run design. Provider call reale, request send, result review, result persistence, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, providerCanaryCallExecutionAllowed=false, explicitProviderApprovalAllowed=false, providerRequestSendAllowed=false, providerResultReviewAllowed=false, canaryResultPersistenceAllowed=false, providerCallAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, publicShareAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V17.3 — AI Incident Handling Write Path Gate & Incident Governance Approval Lock

### Scope

V17.3 aggiunge un modulo locale dry-run per incident handling write path gate e incident governance approval lock.

- endpoint ops protetto `/api/ops/ai-incident-handling-write-path-gate-dry-run`;
- engine locale `aiIncidentHandlingWritePathGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- incident write path gate, incident governance approval lock, incident record boundary, escalation write boundary, closure write boundary, notification boundary, rollback incident write plan e incident write no-go board;
- nessuna scrittura incidente reale, nessuna escalation, nessuna closure, nessuna notifica, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-incident-handling-write-path-gate-check
```

### Stato

Incident handling write path gate pronto solo come dry-run design. Incident write reale, escalation write, closure write, notifiche, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, incidentHandlingWritePathAllowed=false, incidentGovernanceApprovalAllowed=false, incidentRecordWriteAllowed=false, incidentEscalationWriteAllowed=false, incidentClosureWriteAllowed=false, incidentNotificationAllowed=false, providerCallAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, publicShareAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V17.4 — AI Public Export Package Write Path Gate & Legal Privacy Write Approval Lock

### Scope

V17.4 aggiunge un modulo locale dry-run per public export package write path gate e legal/privacy write approval lock.

- endpoint ops protetto `/api/ops/ai-public-export-package-write-path-gate-dry-run`;
- engine locale `aiPublicExportPackageWritePathGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- package write gate, legal privacy write approval lock, export artifact boundary, publication package boundary, retention board, access control board, rollback package plan e package write no-go board;
- nessun package write reale, nessun artifact write, nessun public share, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-public-export-package-write-path-gate-check
```

### Stato

Public export package write path gate pronto solo come dry-run design. Package write reale, artifact write, public share, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, publicExportPackageWriteAllowed=false, publicExportPackageWritePerformed=false, publicExportArtifactWriteAllowed=false, publicationPackageWriteAllowed=false, exportRetentionWriteAllowed=false, exportAccessControlWriteAllowed=false, legalFinalApprovalAllowed=false, privacyFinalApprovalAllowed=false, publicShareAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V17.5 — AI Task & Intervention Creation Gate & Operational Write Approval Lock

### Scope

V17.5 aggiunge un modulo locale dry-run per task/intervention creation gate e operational write approval lock.

- endpoint ops protetto `/api/ops/ai-task-intervention-creation-gate-dry-run`;
- engine locale `aiTaskInterventionCreationGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- creation gate, operational write approval lock, task creation boundary, intervention creation boundary, work order materialization boundary, safety execution boundary, rollback creation plan e creation no-go board;
- nessuna creazione task/intervento reale, nessun record write, nessuna materializzazione work order, nessuna notifica, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna automazione.

### Check

```txt
ops:ai-task-intervention-creation-gate-check
```

### Stato

Task/intervention creation gate pronto solo come dry-run design. Creazione reale task/interventi, work order materialization, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, taskInterventionCreationAllowed=false, taskCreated=false, interventionCreated=false, taskRecordWriteAllowed=false, interventionRecordWriteAllowed=false, workOrderMaterializationAllowed=false, operationWriteApprovalAllowed=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, publicShareAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V17.6 — AI Provider Call Execution Gate & Explicit Provider Approval Runtime Lock

### Scope

V17.6 aggiunge un modulo locale dry-run per provider call execution gate e explicit provider approval runtime lock.

- endpoint ops protetto `/api/ops/ai-provider-call-execution-gate-dry-run`;
- engine locale `aiProviderCallExecutionGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- provider call execution gate, explicit provider approval runtime lock, request dispatch boundary, response intake boundary, budget runtime boundary, reviewer approval evidence, rollback provider call plan e provider call no-go board;
- nessuna chiamata provider reale, nessun request dispatch, nessun response intake, nessuna produzione AI, nessuna persistenza risultato, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-provider-call-execution-gate-check
```

### Stato

Provider call execution gate pronto solo come dry-run design. Provider call reale, request dispatch, response intake, result persistence, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, providerCallExecutionAllowed=false, providerRequestDispatchAllowed=false, providerResponseIntakeAllowed=false, providerResponseReviewAllowed=false, providerResultPersistenceAllowed=false, explicitProviderApprovalAllowed=false, providerCallAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, publicShareAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V17.7 — AI Incident Record Write Gate & Incident Governance Final Approval Lock

### Scope

V17.7 aggiunge un modulo locale dry-run per incident record write gate e incident governance final approval lock.

- endpoint ops protetto `/api/ops/ai-incident-record-write-gate-dry-run`;
- engine locale `aiIncidentRecordWriteGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- incident record write gate, governance final approval lock, timeline write boundary, audit write boundary, retention boundary, closure eligibility board, rollback record plan e record write no-go board;
- nessuna scrittura incidente reale, nessun timeline write, nessun audit write, nessuna retention write, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-incident-record-write-gate-check
```

### Stato

Incident record write gate pronto solo come dry-run design. Record write reale, timeline write, audit write, retention write, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, incidentRecordWriteAllowed=false, incidentTimelineWriteAllowed=false, incidentAuditWriteAllowed=false, incidentRetentionWriteAllowed=false, incidentClosureEligibilityWriteAllowed=false, incidentGovernanceFinalApprovalAllowed=false, providerCallAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, publicShareAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V17.8 — AI Public Export Artifact Write Gate & Legal Privacy Final Artifact Approval Lock

### Scope

V17.8 aggiunge un modulo locale dry-run per public export artifact write gate e legal/privacy final artifact approval lock.

- endpoint ops protetto `/api/ops/ai-public-export-artifact-write-gate-dry-run`;
- engine locale `aiPublicExportArtifactWriteGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- artifact write gate, legal privacy final artifact approval lock, manifest write boundary, checksum write boundary, archive write boundary, access-control boundary, rollback artifact plan e artifact write no-go board;
- nessuna scrittura artifact reale, nessun manifest write, nessun checksum write, nessun archive write, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-public-export-artifact-write-gate-check
```

### Stato

Public export artifact write gate pronto solo come dry-run design. Artifact write reale, manifest write, checksum write, archive write, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, publicExportArtifactWriteAllowed=false, publicExportManifestWriteAllowed=false, publicExportChecksumWriteAllowed=false, publicExportArchiveWriteAllowed=false, publicExportAccessControlWriteAllowed=false, publicExportArtifactFinalApprovalAllowed=false, legalFinalApprovalAllowed=false, privacyFinalApprovalAllowed=false, publicShareAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionPerformed=false, productPrescriptionPerformed=false, dosageAdvicePerformed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V17.9 — AI Operational Execution Gate & Explicit Human Approval Lock

### Scope

V17.9 aggiunge un modulo locale dry-run per operational execution gate e explicit human approval lock.

- endpoint ops protetto `/api/ops/ai-operational-execution-gate-dry-run`;
- engine locale `aiOperationalExecutionGate.ts`;
- pannello UI in `/ai/photo-diagnosis`;
- pannello Admin Operations;
- operational execution gate, explicit human approval lock, execution preflight boundary, execution command boundary, execution notification boundary, emergency stop board, rollback execution plan e execution no-go board;
- nessuna esecuzione reale, nessun command dispatch, nessuna notifica, nessuna chiamata provider esterna, nessuna produzione AI, nessuna persistenza review, nessuna scrittura AI persistente, nessuna modifica Prisma schema, nessuna migration execution, nessuna creazione task/intervento, nessuna automazione.

### Check

```txt
ops:ai-operational-execution-gate-check
```

### Stato

Operational execution gate pronto solo come dry-run design. Esecuzione reale, command dispatch, notification, emergency stop runtime, provider reale e produzione AI ancora no-go.

### Safety

providerAiReady=false, providerCalled=false, operationalExecutionAllowed=false, operationalExecutionPerformed=false, executionPreflightAllowed=false, executionCommandAllowed=false, executionNotificationAllowed=false, emergencyStopConfigured=false, humanExecutionApprovalAllowed=false, taskCreated=false, interventionCreated=false, automaticExecutionAllowed=false, automaticExecutionPerformed=false, productPrescriptionAllowed=false, dosageAdviceAllowed=false, storageActivationAllowed=false, reviewPersistenceAllowed=false, publicShareAllowed=false, manualDispatchOnly=true, humanReviewRequired=true, localAnalysisOnly=true, redactedOutputOnly=true.
## V18.0 — Online Controlled Operations Monitor & Dry-Run Production Watchtower

### Scope

V18.0 aggiunge online controlled operations monitor e dry-run production watchtower post go-live.

- endpoint ops protetto /api/ops/ai-online-controlled-operations-monitor-dry-run;
- engine locale aiOnlineControlledOperationsMonitor.ts;
- pannello UI in /ai/photo-diagnosis;
- pannello Admin Operations;
- watchtower signals, protected endpoint board, daily ops checklist, rollback readiness board, AI guardrail observations, live route observations e go-live evidence pack;
- nessuna AI live, nessun provider call, nessuna persistenza AI, nessuna memoria DB, nessun task/intervento, nessuna execution, nessun public export write, nessun incident write, nessuna modifica Prisma schema, nessuna migration execution.

### Check

ops:ai-online-controlled-operations-monitor-check

### Stato

APP online in controlled dry-run. AI live, scritture operative, execution reale, public export write e incident write restano no-go.
## V18.1 — AI Incident Record Persistence Governance Monitor & Final Approval Evidence Vault

### Scope

V18.1 aggiunge un monitor dry-run per governance della futura persistenza dei record incidente.

- endpoint ops protetto /api/ops/ai-incident-record-persistence-governance-dry-run;
- engine locale aiIncidentRecordPersistenceGovernance.ts;
- pannello UI in /ai/photo-diagnosis;
- pannello Admin Operations;
- approval evidence board, persistence boundary, evidence vault, rollback readiness e no-go board;
- nessuna persistenza reale, nessun provider call, nessun task/intervento, nessuna execution, nessun public export write, nessuna modifica Prisma schema, nessuna migration execution.

### Check

ops:ai-incident-record-persistence-governance-check

### Stato

APP online in controlled dry-run. Incident record persistence resta no-go.
