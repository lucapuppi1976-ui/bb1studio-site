# Agri App — V3.0 Email controllate

Questa patch prepara il test controllato delle email senza attivare automaticamente gli invii live.

## Cosa aggiunge

- Dry-run su `/api/cron/daily-notifications`.
- Preview dei riepiloghi email senza inviare nulla.
- Diagnostica configurazione email.
- Endpoint sicuro `/api/ops/email-status`.
- Endpoint sicuro `/api/ops/email-test` per preview e test email con conferma esplicita.
- Nessuna modifica a Prisma, DB, package o variabili Render.

## Regola live

Su Render live mantenere:

```text
ENABLE_EMAIL_NOTIFICATIONS=false
```

Finché questo valore resta `false`, l'invio reale resta bloccato anche se `RESEND_API_KEY` ed `EMAIL_FROM` sono configurati.

## Dry-run cron

Con dev server acceso:

```bash
curl -sS -X POST \
  "http://localhost:3000/agri_app/api/cron/daily-notifications?secret=$CRON_SECRET_VALUE&dryRun=1" \
  | python -m json.tool
```

Il dry-run:

- non genera task ricorrenti;
- non crea avvisi in-app;
- non aggiorna stati attività;
- non invia email;
- mostra `wouldCreate`, `emailsWouldSend` ed eventuali `emailPreviews`.

## Diagnostica email

Con sessione SUPER_ADMIN oppure con `CRON_SECRET`:

```bash
curl -sS \
  "http://localhost:3000/agri_app/api/ops/email-status?secret=$CRON_SECRET_VALUE" \
  | python -m json.tool
```

## Preview email test

```bash
curl -sS \
  "http://localhost:3000/agri_app/api/ops/email-test?secret=$CRON_SECRET_VALUE" \
  | python -m json.tool
```

## Invio test controllato

Invia davvero solo se:

- `ENABLE_EMAIL_NOTIFICATIONS=true`
- `RESEND_API_KEY` configurata
- `EMAIL_FROM` configurato
- viene passato `confirm=send-test-email`

```bash
curl -sS -X POST \
  "http://localhost:3000/agri_app/api/ops/email-test?secret=$CRON_SECRET_VALUE&confirm=send-test-email&to=destinatario@example.com" \
  | python -m json.tool
```

In live non eseguire questo test finché non si decide esplicitamente di attivare le email.

## Build

```bash
npx prisma generate
npm run build
```

Non fare `prisma db push`: la V3.0 non cambia DB.
