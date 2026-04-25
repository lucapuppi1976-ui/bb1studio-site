# Checkpoint completo aggiornato — agri_app

Questo pacchetto contiene la cartella completa `agri_app` pronta da sostituire dentro il repository `bb1studio-site`.

## Fix inclusi
- struttura completa subtree `bb1studio-site/agri_app`
- Node fissato a `22.x` per Render
- fix Next.js 15 per `src/app/login/page.tsx` (`searchParams` async)
- fix TypeScript per `bcryptjs`
- hardening produzione base:
  - `src/lib/env.server.ts`
  - `src/app/admin/layout.tsx`
  - scripts per creare utenti reali
  - variabile `SHOW_DEV_SEED_HINTS=false`

## Come applicarlo
1. Apri il repo locale `bb1studio-site`
2. Sostituisci l'intera cartella `agri_app` con quella contenuta in questo zip
3. Commit:
   `Checkpoint completo aggiornato agri_app`
4. Push su GitHub
5. In Render:
   - Manual Deploy
   - Clear build cache & deploy

## Dopo il deploy
1. Aggiorna env locale e Render
2. Crea utenti reali:
   ```bash
   node --env-file=.env scripts/create-user.mjs luca@bb1studio.com PASSWORD SUPER_ADMIN "Luca"
   node --env-file=.env scripts/create-user.mjs operatore1@bb1studio.com PASSWORD OPERATOR "Operatore 1"
   ```
3. Elimina utenti demo:
   ```bash
   node --env-file=.env scripts/delete-demo-users.mjs
   ```
