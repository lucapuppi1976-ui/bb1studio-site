# Agri App — Release Gate V4.7

## Obiettivo

Centralizzare i controlli pre-release in un unico comando operativo.

La V4.7 non modifica database, Prisma schema, Render, cron o email. Aggiunge solo uno script di controllo.

## Comando base

Da `agri_app`:

```bash
node scripts/release-gate.mjs
```

Esegue:

- `db-safety-check.mjs --expect=dev`
- `security-check.mjs --strict`
- `recurring-quality-check.mjs --expect=dev`
- `npx prisma generate && npm run build`

## Controllo live opzionale

Il controllo live è opzionale e richiede il `CRON_SECRET` live.

```bash
read -s -r -p "Incolla CRON_SECRET live e premi Invio: " CRON_SECRET_VALUE
echo

node scripts/release-gate.mjs \
  --include-live \
  --base https://bb1studio.com/agri_app \
  --secret "$CRON_SECRET_VALUE"

unset CRON_SECRET_VALUE
```

Passare solo il valore del secret. Lo script normalizza anche input accidentali del tipo `CRON_SECRET="..."`, ma la procedura corretta è incollare solo il valore.

## Dry-run cron live opzionale

```bash
node scripts/release-gate.mjs \
  --include-live \
  --include-cron-dry-run \
  --base https://bb1studio.com/agri_app \
  --secret "$CRON_SECRET_VALUE"
```

## Opzioni

- `--skip-build`: salta la build locale.
- `--include-live`: include `ops-live-check.mjs`.
- `--include-cron-dry-run`: include il dry-run del cron live dentro l'ops check.
- `--base <url>`: base URL live, default `https://bb1studio.com/agri_app`.
- `--secret <value>`: valore del `CRON_SECRET` live.

## Regole operative

- Non eseguire `prisma db push` durante il release gate.
- `ENABLE_EMAIL_NOTIFICATIONS` deve restare `false`.
- Il DB locale deve essere classificato come `DEV`.
- Le email live devono restare disattivate.
- Il cron reale in-app resta invariato.

## Esito atteso

```text
Release gate completato con successo.
```
