# Agri App — Release Checklist

## Prima del merge su live

- [ ] Branch feature corretto
- [ ] Working tree pulito
- [ ] `npm run build` verde
- [ ] Nessun `.env` o `.env.local` tracciato
- [ ] Nessuna modifica accidentale a `package.json` o `package-lock.json`
- [ ] Nessuna modifica a Prisma se non prevista
- [ ] Se Prisma cambia schema: verificare DB target prima di `db push`
- [ ] Se Prisma cambia schema live: eseguire `migrate diff` e controllare che non ci siano operazioni distruttive
- [ ] Creare rollback branch da `checkpoint/live-stable`
- [ ] `ENABLE_EMAIL_NOTIFICATIONS=false`, salvo attivazione esplicita

## Dopo il push su `checkpoint/live-stable`

- [ ] Render deploy partito
- [ ] Render deploy concluso con successo
- [ ] `/agri_app/api/health` OK
- [ ] `/agri_app/api/ready` OK
- [ ] Login OK
- [ ] Dashboard OK
- [ ] Attività OK
- [ ] Oggi OK
- [ ] Avvisi OK
- [ ] Programmazioni OK
- [ ] Pagine operative principali OK
- [ ] Multilingua OK
- [ ] Mobile OK
- [ ] Smoke test live OK

## Smoke test live

```bash
cd agri_app
node scripts/smoke-live.mjs https://bb1studio.com/agri_app
```

## Rollback codice

Usare il branch rollback creato prima del merge live.

Esempio:

```bash
git switch checkpoint/live-stable
git reset --hard origin/NOME_BRANCH_ROLLBACK
git push --force-with-lease origin checkpoint/live-stable
```

## Note importanti

- Non fare rollback distruttivi del DB senza backup.
- Non usare `--force-reset` su Prisma.
- Non usare `--accept-data-loss` su live senza controllo esplicito.
- Non committare mai `.env` o `.env.local`.
- Le email restano disattivate finché `ENABLE_EMAIL_NOTIFICATIONS=false`.
