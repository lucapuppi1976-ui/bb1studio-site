# Agri App — Security hardening V3.8

## Obiettivo

Aggiungere un controllo operativo locale per ridurre il rischio di:

- usare il DB live dal Codespace per errore;
- lasciare `ENABLE_EMAIL_NOTIFICATIONS=true` dopo un test;
- committare `.env` o segreti;
- tenere chiavi API esposte in file versionabili.

## Script aggiunto

```bash
cd agri_app
node scripts/security-check.mjs
```

Controlli principali:

- verifica se `.env` è ignorato da Git;
- classifica `DATABASE_URL` come DEV / LIVE / UNKNOWN;
- segnala `ENABLE_EMAIL_NOTIFICATIONS=true`;
- verifica formato base di `RESEND_API_KEY` senza stamparla;
- mostra `EMAIL_FROM` configurato;
- mostra `git status --short`;
- cerca possibili segreti in file versionabili.

## Modalità utili

Controllo standard:

```bash
node scripts/security-check.mjs
```

Fallire se il Codespace punta al DB live:

```bash
node scripts/security-check.mjs --fail-on-live
```

Consentire intenzionalmente DB live, solo per controlli manuali espliciti:

```bash
node scripts/security-check.mjs --allow-live-db
```

Consentire temporaneamente email abilitate, solo durante test DEV:

```bash
node scripts/security-check.mjs --allow-email-enabled
```

Modalità severa per trattare possibili segreti come errore:

```bash
node scripts/security-check.mjs --strict
```

## Regole operative

- Il Codespace deve usare `agri_app_dev_db`.
- Il live deve restare con `ENABLE_EMAIL_NOTIFICATIONS=false` finché l'invio email non viene attivato esplicitamente.
- `.env` e `.env.local` non devono mai essere committati.
- Se una chiave Resend viene mostrata a schermo o in chat, va ruotata.
- Prima di `prisma db push` su live serve sempre controllo esplicito del DB target e backup/recovery plan.

## Stato V3.8

- DB schema: invariato.
- Prisma schema: invariato.
- Render env: invariato.
- Email live: disattivate.
