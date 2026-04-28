# Cosa fare adesso

## A. Sul PC con GitHub Desktop
1. Chiudi eventuali file aperti del progetto.
2. Vai nel clone locale del repo `bb1studio-site`.
3. Sostituisci completamente la cartella:
   `bb1studio-site/agri_app`
   con la cartella `agri_app` contenuta in questo zip.
4. In GitHub Desktop:
   - repo: `bb1studio-site`
   - branch: `feature/notifications-v2`
   - commit message consigliato:
     `Checkpoint completo MAIN_CHAT1`
   - push su GitHub

## B. In Codespaces
```bash
cd /workspaces/bb1studio-site
git switch feature/notifications-v2
git pull origin feature/notifications-v2
cd agri_app
npx prisma generate
npx prisma db push
npm run build
npm run dev
```

## C. Link DEV da verificare
Se il Codespace continua a usare la porta 3000:
- https://glorious-engine-5gwqwxrwgvxq24g44-3000.app.github.dev/agri_app/settings/notifications
- https://glorious-engine-5gwqwxrwgvxq24g44-3000.app.github.dev/agri_app/notifications
- https://glorious-engine-5gwqwxrwgvxq24g44-3000.app.github.dev/agri_app/today
- https://glorious-engine-5gwqwxrwgvxq24g44-3000.app.github.dev/agri_app/recurring-tasks

Se il Codespace usa la porta 3001, sostituisci `3000` con `3001`.

## D. NON fare adesso
- non toccare Render live
- non cambiare branch del servizio live
- non fare `db seed`
- non incollare secret in chat

## E. Se poi vorrai portare recurring tasks sul LIVE
1. mergiare `feature/notifications-v2` in `checkpoint/live-stable`
2. eseguire `prisma db push` contro il DB live usando la EXTERNAL URL live dal Codespace
3. fare deploy su Render
4. testare:
   - `/agri_app/recurring-tasks`
   - `/agri_app/tasks`
   - `/agri_app/today`
   - `/agri_app/notifications`
