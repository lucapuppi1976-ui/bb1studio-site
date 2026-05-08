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
