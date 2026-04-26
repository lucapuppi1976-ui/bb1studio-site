# Checkpoint 16 — email notifications + cron operativo vero

## Cosa aggiunge
- supporto email con Resend via API HTTP
- digest email giornaliero per utente, deduplicato per giorno
- log di invio nel DB con `NotificationEmailLog`
- cron `/api/cron/daily-notifications` esteso con conteggi `emailsSent` e `emailsSkipped`
- file env esempio aggiornati per DEV e LIVE
- check script DEV che valida anche la configurazione email

## File inclusi
- `prisma/schema.prisma`
- `src/lib/env.server.ts`
- `src/lib/notifications/email.ts`
- `src/lib/notifications/daily.ts`
- `src/app/api/cron/daily-notifications/route.ts`
- `.env.codespaces.example`
- `.env.render.live.example`
- `scripts/check-dev-env.mjs`

## Prima di testare
Nel branch feature, dentro `agri_app`:

```bash
npx prisma generate
npx prisma db push
npm run build
```

## Variabili live da aggiungere
Nel servizio Render live (`agri-app-main-2`):
- `ENABLE_EMAIL_NOTIFICATIONS=true`
- `RESEND_API_KEY=...`
- `EMAIL_FROM=Agri App <onboarding@resend.dev>` oppure un sender verificato
- `EMAIL_REPLY_TO=` opzionale

## Variabili DEV
Nel Codespace puoi tenere:
- `ENABLE_EMAIL_NOTIFICATIONS=false`
oppure abilitarle solo quando vuoi testare davvero l'invio.

## Test cron
Usa il secret del live:

```bash
curl -X POST "https://bb1studio.com/agri_app/api/cron/daily-notifications?secret=IL_TUO_CRON_SECRET"
```

Se l'ora locale dell'utente coincide con `dailyDigestHour` e `emailEnabled=true`, il cron prova a inviare la digest.
