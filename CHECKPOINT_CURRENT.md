# Checkpoint completo consolidato — feature/notifications-v2

Questo pacchetto contiene la cartella completa `agri_app` aggiornata fino al punto in cui:
- login e ruoli sono stabili in produzione
- preferenze notifiche funzionano nel Codespace
- centro notifiche e agenda `/today` sono presenti nel branch `feature/notifications-v2`
- `next.config.ts` è già sistemato per Codespaces + Server Actions
- `package.json` build usa `prisma generate && next build`

## Come usarlo
1. Nel repo `bb1studio-site`, elimina la cartella esistente `agri_app`
2. Copia questa nuova cartella `agri_app`
3. Nel Codespace:
   ```bash
   cd /workspaces/bb1studio-site/agri_app
   npm install
   npx prisma generate
   npx prisma db push
   npm run build
   ```
4. Se il build è verde:
   ```bash
   git add .
   git commit -m "Checkpoint consolidato notifications-v2"
   git push
   ```

## Render
- Il live NON va toccato direttamente.
- `agri-app-main-2` deve restare su `checkpoint/live-stable`.
- Questo pacchetto va usato su `feature/notifications-v2`.
- Solo dopo verifica completa si apre una PR o si fa merge controllato.
