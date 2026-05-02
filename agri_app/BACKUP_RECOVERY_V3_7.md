# Agri App — Backup e Recovery V3.7

## Obiettivo

Definire una procedura chiara per proteggere il database live prima di modifiche importanti, attivazioni operative o test che possono scrivere dati.

## Stato richiesto

- Live branch: `checkpoint/live-stable`
- Live URL: `https://bb1studio.com/agri_app`
- Email live: `ENABLE_EMAIL_NOTIFICATIONS=false`, salvo attivazione esplicita futura
- DB live: non usare per test DEV
- DB DEV: usare per prove e sviluppo

## Controllo DB prima di operazioni rischiose

Da `agri_app`:

```bash
node scripts/db-safety-check.mjs
```

Per bloccare qualsiasi operazione se viene rilevato il DB live:

```bash
node scripts/db-safety-check.mjs --fail-on-live
```

Per verificare esplicitamente il DB DEV:

```bash
node scripts/db-safety-check.mjs --expect=dev
```

Per verificare esplicitamente il DB live:

```bash
node scripts/db-safety-check.mjs --expect=live
```

## Prima di modifiche DB live

- Verificare che il branch sia `checkpoint/live-stable`.
- Creare un rollback branch.
- Eseguire build locale.
- Verificare `DATABASE_URL` target.
- Non usare `prisma db push` sul live senza controllo esplicito.
- Non usare `--accept-data-loss` sul live senza backup e revisione.

## Recovery Render

Render Postgres mette a disposizione recovery e backup in base al tipo di database e al piano. Verificare sempre la pagina Recovery del database live prima di operazioni importanti.

## Procedura minima di emergenza codice

```bash
git switch checkpoint/live-stable
git reset --hard origin/NOME_BRANCH_ROLLBACK
git push --force-with-lease origin checkpoint/live-stable
```

## Procedura minima di emergenza DB

- Non eseguire restore distruttivi diretti.
- Usare prima una recovery instance o un database separato.
- Validare i dati recuperati.
- Solo dopo aggiornare i servizi a usare il database corretto.

## Note

Questa V3.7 non modifica DB, Prisma schema, package.json, package-lock.json o variabili Render.
