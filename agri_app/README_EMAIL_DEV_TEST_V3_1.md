# Agri App — V3.1 Email reali solo in DEV

Questa fase prepara il test reale delle email in ambiente DEV, mantenendo il live protetto.

## Regola principale

Sul live deve restare:

```text
ENABLE_EMAIL_NOTIFICATIONS=false
```

Con questo valore, nessun invio reale viene eseguito anche se `RESEND_API_KEY` e `EMAIL_FROM` sono configurati.

## Nuova protezione V3.1

L'endpoint di test email ora ha una protezione aggiuntiva:

- invia solo se `ENABLE_EMAIL_NOTIFICATIONS=true`;
- invia solo se `RESEND_API_KEY` e `EMAIL_FROM` sono configurati;
- blocca l'invio test in ambienti live/production, salvo opt-in esplicito con `EMAIL_TEST_ALLOW_LIVE=true`.

Questa protezione riguarda l'endpoint di test. Gli invii operativi restano governati da `ENABLE_EMAIL_NOTIFICATIONS`.

## Test DEV consigliato

Nel Codespace o ambiente DEV:

```bash
cd agri_app
node scripts/email-dev-test.mjs --base http://localhost:3000/agri_app
```

Per usare la porta 3001:

```bash
node scripts/email-dev-test.mjs --base http://localhost:3001/agri_app
```

## Invio test reale in DEV

Solo dopo aver configurato in DEV:

```text
ENABLE_EMAIL_NOTIFICATIONS=true
RESEND_API_KEY=...
EMAIL_FROM=Agri App <onboarding@resend.dev>
```

puoi inviare una singola email test:

```bash
node scripts/email-dev-test.mjs --base http://localhost:3000/agri_app --send --to tua-email@example.com
```

## Live

Sul live non attivare ancora:

```text
ENABLE_EMAIL_NOTIFICATIONS=true
```

Prima di attivare le email operative in produzione, usare un mittente di dominio verificato, ad esempio:

```text
Agri App <notifiche@bb1studio.com>
```

invece di:

```text
Agri App <onboarding@resend.dev>
```
