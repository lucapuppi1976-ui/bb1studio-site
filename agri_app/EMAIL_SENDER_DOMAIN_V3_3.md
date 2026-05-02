# Agri App — Mittente email definitivo V3.3

## Esito

- Ambiente test: DEV / Codespaces
- Provider: Resend
- Dominio email: bb1studio.com
- Mittente definitivo testato: Agri App <notifiche@bb1studio.com>
- Invio reale email DEV: riuscito
- Risultato API: ok true
- Message ID Resend: c14dac98-78f3-427a-b567-4fcacb59449f
- ENABLE_EMAIL_NOTIFICATIONS DEV: riportato a false dopo il test
- ENABLE_EMAIL_NOTIFICATIONS live: rimasto false
- DB live: non modificato
- Prisma schema: non modificato
- .env: non committato

## Comando usato

node scripts/email-dev-test.mjs --base http://localhost:3000/agri_app --send --to <destinatario>

## Nota live

Il live resta protetto: gli invii reali rimangono disattivati finche ENABLE_EMAIL_NOTIFICATIONS=false.
