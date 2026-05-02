# Agri App — Cron controllati V3.4

## Esito

- Cron Job Render creato
- Nome cron: bb1studio-site
- Branch: checkpoint/live-stable
- Schedule: 0 7 * * *
- Modalità: dry-run
- Trigger manuale Render: riuscito
- Risultato cron: ok true
- recurring.dryRun: true
- notifications.dryRun: true
- email.enabled: false
- Mittente live: Agri App <notifiche@bb1studio.com>
- ENABLE_EMAIL_NOTIFICATIONS live: false
- DB live: non modificato
- Prisma schema: non modificato

## Comando cron dry-run

curl -fsS -X POST -G "https://bb1studio.com/agri_app/api/cron/daily-notifications" --data-urlencode "secret=$CRON_SECRET" --data-urlencode "dryRun=1"

## Nota

Il cron è configurato in dry-run. Non crea notifiche, non genera attività ricorrenti e non invia email.

Il passaggio a cron reale, senza dryRun, dovrà essere deciso esplicitamente in una fase successiva.
