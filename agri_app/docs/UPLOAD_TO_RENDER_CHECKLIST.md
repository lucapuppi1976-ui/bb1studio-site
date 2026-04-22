# Upload / deploy checklist

## Repo
1. Crea repo GitHub privato
2. Carica tutto il pacchetto
3. Verifica che `.env` NON sia nel repo

## Render service
- Runtime: Node
- Build Command: `npm install && npm run build`
- Start Command: `npm run start`
- Health check path: `/agri_app/api/health`

## Variabili ambiente minime
- `DATABASE_URL`
- `NEXTAUTH_URL=https://bb1studio.com/agri_app/api/auth`
- `NEXTAUTH_SECRET=...`
- `NEXT_PUBLIC_APP_ORIGIN=https://bb1studio.com`
- `NEXT_PUBLIC_APP_BASE_PATH=/agri_app`
- `NEXT_PUBLIC_APP_ASSET_PREFIX=/agri_app-static`
- `CLOUDINARY_CLOUD_NAME=...`
- `CLOUDINARY_API_KEY=...`
- `CLOUDINARY_API_SECRET=...`
- `CRON_SECRET=...`

## Primo deploy
Dopo il deploy:
1. esegui migration
2. esegui seed
3. verifica `/agri_app/api/ready`
4. login admin
5. controlla dashboard, plants, interventions, tasks
