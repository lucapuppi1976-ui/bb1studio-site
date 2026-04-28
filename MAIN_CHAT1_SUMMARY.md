# MAIN_CHAT1 — Stato progetto Agri App

## Stato attuale

### LIVE
- URL pubblico: `https://bb1studio.com/agri_app`
- Servizio Render live: `agri-app-main-2`
- Branch live: `checkpoint/live-stable`
- Funzionano:
  - login
  - ruoli SUPER_ADMIN / OPERATOR
  - `/settings/notifications`
  - `/notifications`
  - `/today`
  - `/api/health`
- `ENABLE_EMAIL_NOTIFICATIONS` deve restare `false` finché non si decide di attivare davvero le email.
- Nota importante: la route live `/recurring-tasks` ha mostrato errore server-side dopo il merge, e la causa più probabile è **schema DB live non ancora allineato** con i nuovi modelli recurring. Quando si porterà recurring sul live bisognerà eseguire `prisma db push` contro il DB live.

### DEV
- Branch di lavoro: `feature/notifications-v2`
- Codespace usato: `glorious-engine-5gwqwxrwgvxq24g44`
- Base path: `/agri_app`
- Ambiente DEV separato dal LIVE
- DB DEV separato: `agri_app_dev_db`
- In DEV sono stati verificati:
  - build verde
  - cron notifiche ok
  - UI notifiche ok
  - preferenze notifiche ok
  - recurring tasks ok (route e flusso DEV)

## Workflow corretto
- LIVE: `checkpoint/live-stable`
- DEV / nuove feature: `feature/*`
- Render live deve sempre restare sul branch `checkpoint/live-stable`
- Codespaces deve usare il DB DEV, non quello live

## Avvisi importanti
- In chat è stata incollata almeno una connection string del DB DEV. Va ruotata appena possibile su Render.
- Non committare `.env` o `.env.local`.
- Su Render tenere:
  - `ENABLE_EMAIL_NOTIFICATIONS=false`
  finché non si decide di testare davvero Resend.

## Cosa contiene questo checkpoint
Questo zip include la cartella completa `agri_app` con:
- auth e ruoli
- notifiche in-app
- centro notifiche
- agenda `/today`
- cron notifiche
- setup dev separato
- scaffold email/cron
- recurring tasks
- `next.config.ts` già aggiornato per Codespaces su porta 3000 e 3001

## Prossimo passo consigliato nella nuova chat
1. Sostituire la cartella locale `bb1studio-site/agri_app` con quella di questo zip
2. Commit/push su `feature/notifications-v2`
3. In Codespaces:
   - `git switch feature/notifications-v2`
   - `git pull`
   - `cd agri_app`
   - `npx prisma generate`
   - `npx prisma db push`
   - `npm run build`
   - `npm run dev`
4. Verificare in DEV:
   - `/agri_app/settings/notifications`
   - `/agri_app/notifications`
   - `/agri_app/today`
   - `/agri_app/recurring-tasks`
5. Solo dopo si decide cosa mergeare nel live e se aggiornare il DB live.
