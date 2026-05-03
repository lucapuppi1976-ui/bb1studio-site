# Agri App — Security check strict pulito V4.6

## Obiettivo

Ridurre il rumore del controllo sicurezza e rendere `security-check --strict` utile per bloccare segreti o credenziali demo non consentite.

## Modifiche

- Rimossi riferimenti a credenziali demo statiche dal README principale.
- Aggiornato il seed Prisma per richiedere password seed tramite variabili ambiente.
- Aggiornato lo script di rimozione utenti demo evitando literal sensibili nel codice.
- Aggiornato `security-check.mjs` con classificazione finding: critici, warning, informativi.
- I template `.env.*.example` vengono trattati come template informativi, non come leak.

## Comandi consigliati

```bash
cd agri_app
node scripts/security-check.mjs
node scripts/security-check.mjs --strict
node scripts/security-check.mjs --json
```

## Regole operative

- Non committare `.env`.
- Non committare chiavi Resend reali.
- Non committare password seed statiche.
- Usare `ENABLE_EMAIL_NOTIFICATIONS=false` salvo test espliciti.
- Usare il DB DEV in Codespaces.

## Seed DEV

Per eseguire il seed, impostare variabili temporanee:

```bash
SEED_ADMIN_EMAIL=dev-admin@example.invalid \
SEED_ADMIN_PASSWORD='<password-forte>' \
SEED_OPERATOR_EMAIL=dev-operator@example.invalid \
SEED_OPERATOR_PASSWORD='<password-forte>' \
npx prisma db seed
```
