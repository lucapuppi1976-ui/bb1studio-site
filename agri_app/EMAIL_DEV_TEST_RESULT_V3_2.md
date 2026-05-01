# Agri App — Email DEV Test V3.2

## Esito

- Ambiente: DEV / Codespaces
- Invio reale email DEV: riuscito
- Provider: Resend
- Mittente test: onboarding@resend.dev
- Destinatario test: account Gmail di verifica
- Risultato API: ok true
- Message ID Resend: registrato nel terminale durante il test
- ENABLE_EMAIL_NOTIFICATIONS DEV: riportato a false dopo il test
- ENABLE_EMAIL_NOTIFICATIONS live: rimasto false
- DB live: non modificato
- Prisma schema: non modificato
- .env: non committato
- Nota sicurezza: la API key usata nel test va ruotata se è stata esposta accidentalmente a schermo o in chat.

## Comando usato

node scripts/email-dev-test.mjs --base http://localhost:3000/agri_app --send --to <destinatario>

## Note

Il test reale è stato eseguito solo in ambiente DEV.
La configurazione live resta protetta: gli invii reali rimangono disattivati finché ENABLE_EMAIL_NOTIFICATIONS=false.
