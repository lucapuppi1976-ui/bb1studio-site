# Agri App — Cron reale in-app V3.5

## Esito

- Cron Job Render attivo
- Nome cron: bb1studio-site
- Branch: checkpoint/live-stable
- Schedule: 0 7 * * *
- Modalità: reale, senza dryRun
- Trigger manuale Render: eseguito
- Avvisi in-app: abilitati
- Attività ricorrenti: generate solo se dovute
- Email live: disattivate
- ENABLE_EMAIL_NOTIFICATIONS live: false
- Mittente live configurato: Agri App <notifiche@bb1studio.com>
- DB schema: non modificato
- Prisma schema: non modificato

## Comando cron reale

curl -fsS -X POST -G "https://bb1studio.com/agri_app/api/cron/daily-notifications" --data-urlencode "secret=$CRON_SECRET"

## Nota

Il cron reale può creare avvisi in-app e attività ricorrenti dovute.
Gli invii email restano disattivati finché ENABLE_EMAIL_NOTIFICATIONS=false.
