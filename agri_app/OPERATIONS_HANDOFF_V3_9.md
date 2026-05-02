# Agri App — Operations Handoff V3.9

## Stato live

- URL live: `https://bb1studio.com/agri_app`
- Branch live: `checkpoint/live-stable`
- Servizio Render live: `agri-app-main-2`
- Cron Render: attivo per `daily-notifications` senza `dryRun`
- Email operative live: disattivate
- `ENABLE_EMAIL_NOTIFICATIONS=false`
- Mittente configurato: `Agri App <notifiche@bb1studio.com>`
- DB live: invariato durante le fasi V3.x documentali/operative
- Prisma schema: invariato nelle fasi V3.0–V3.9 salvo diversa indicazione futura

## Stato funzionale raggiunto

- UI sobria e mobile-first attiva
- Multilingua attivo: italiano, spagnolo, inglese, slovacco, francese, tedesco, russo, ungherese
- Centro avvisi migliorato
- Workflow attività migliorato
- Dashboard e rapporti migliorati
- Approvazioni e proposte operative migliorate
- Cron reale in-app attivo
- Email controllate pronte, ma invii live disattivati
- Resend testato in DEV
- Mittente `notifiche@bb1studio.com` testato in DEV
- Backup/recovery runbook disponibile
- Security hardening/check disponibili

## Regole operative fondamentali

- Non committare mai `.env` o `.env.local`
- Non eseguire `prisma db push` sul live senza controllo esplicito
- Non usare `--force-reset` o `--accept-data-loss` sul live
- Non attivare `ENABLE_EMAIL_NOTIFICATIONS=true` sul live senza decisione esplicita
- Prima di ogni merge live creare un rollback branch da `checkpoint/live-stable`
- Dopo ogni deploy live verificare `/api/health` e `/api/ready`

## Verifica live rapida

```bash
curl -sS https://bb1studio.com/agri_app/api/health | python -m json.tool
curl -sS https://bb1studio.com/agri_app/api/ready | python -m json.tool
```

Atteso:

```json
{ "ok": true, "service": "agri-app" }
```

```json
{ "ok": true }
```

## Verifica email live sicura

Usare `CRON_SECRET` senza stamparlo:

```bash
read -s -r -p "Incolla CRON_SECRET live e premi Invio: " CRON_SECRET_VALUE
echo

curl -sS -G "https://bb1studio.com/agri_app/api/ops/email-status" \
  --data-urlencode "secret=$CRON_SECRET_VALUE" \
  | python -m json.tool

unset CRON_SECRET_VALUE
```

Atteso:

- `email.enabled=false`
- `email.mode=disabled`
- `testSafety.canSendTestEmail=false`
- `from=Agri App <notifiche@bb1studio.com>`

## Cron live

Cron Render attivo:

```bash
curl -fsS -X POST -G "https://bb1studio.com/agri_app/api/cron/daily-notifications" --data-urlencode "secret=$CRON_SECRET"
```

Effetti:

- crea avvisi in-app se dovuti
- genera attività ricorrenti se dovute
- non invia email finché `ENABLE_EMAIL_NOTIFICATIONS=false`

## Controllo DB target in Codespaces

```bash
cd agri_app
node scripts/db-safety-check.mjs --expect=dev
node scripts/db-safety-check.mjs --fail-on-live
```

Atteso:

- `Classificazione: DEV`
- database `agri_app_dev_db`

## Controllo sicurezza locale

```bash
cd agri_app
node scripts/security-check.mjs
node scripts/security-check.mjs --fail-on-live
```

Atteso:

- `.env` ignorato da Git
- DB classificato come DEV
- `ENABLE_EMAIL_NOTIFICATIONS=false` in DEV salvo test controllato

## Rollback codice live

Usare il rollback branch creato prima del merge live.

Esempio:

```bash
git switch checkpoint/live-stable
git reset --hard origin/NOME_BRANCH_ROLLBACK
git push --force-with-lease origin checkpoint/live-stable
```

Non fare rollback distruttivi del DB senza backup e senza decisione esplicita.

## Prossima evoluzione consigliata

La prossima fase dovrebbe essere funzionale, non più infrastrutturale. Candidati:

1. gestione avanzata delle attività ricorrenti
2. filtri e ricerca su piante/interventi
3. report operativi più completi
4. primo piano di attivazione email live con rollout graduale
5. ruoli/permessi più granulari

La priorità consigliata è la gestione avanzata delle attività ricorrenti, perché il cron reale è già attivo e il flusso operativo può essere migliorato.
