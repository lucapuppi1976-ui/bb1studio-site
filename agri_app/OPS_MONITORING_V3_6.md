# Agri App — Monitoraggio operativo V3.6

## Obiettivo

Aggiungere un controllo operativo leggero per verificare lo stato live senza modificare dati.

## Script

```bash
cd agri_app
node scripts/ops-live-check.mjs --base https://bb1studio.com/agri_app --secret "$CRON_SECRET_VALUE"
```

Lo script controlla:

- `/api/health`
- `/api/ready`
- stato email live tramite `/api/ops/email-status`
- pagine operative principali
- assenza di segnali evidenti di errore server-side

## Cron dry-run opzionale

Per includere anche il dry-run del cron notifiche:

```bash
node scripts/ops-live-check.mjs \
  --base https://bb1studio.com/agri_app \
  --secret "$CRON_SECRET_VALUE" \
  --include-cron-dry-run
```

Il dry-run non deve creare notifiche, non deve generare attività ricorrenti e non deve inviare email.

## Stato atteso live

- `ENABLE_EMAIL_NOTIFICATIONS=false`
- `email.enabled=false`
- `testSafety.canSendTestEmail=false`
- `EMAIL_FROM=Agri App <notifiche@bb1studio.com>`
- Cron reale Render attivo per avvisi in-app
- Email live ancora disattivate

## Note sicurezza

- Non inserire mai `CRON_SECRET` nel repository.
- Non committare `.env`.
- Non attivare `ENABLE_EMAIL_NOTIFICATIONS=true` sul live senza decisione esplicita.
- Il controllo operativo non sostituisce i log Render, ma velocizza la verifica post-deploy.
