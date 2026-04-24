# Review notes

## Cosa ho controllato
- presenza di tutti i file sorgente principali
- coerenza degli import interni (`@/...`)
- assenza di errori di parsing TypeScript/TSX
- configurazione repo-ready (`.gitignore`, `.env.example`, `render.yaml`, `README`, istruzioni upload)

## Correzioni applicate
1. `render.yaml`: sostituito `autoDeploy` con `autoDeployTrigger: commit`, in linea con la Blueprint spec attuale di Render.
2. Rimossa la dipendenza da `NEXT_PUBLIC_APP_ASSET_PREFIX` per semplificare il deploy sotto `/agri_app`.
3. Aggiornate le guide per GitHub browser upload e deploy Render.
4. Aggiunto `engines.node >= 20` in `package.json`.
5. Rimosso lo script `lint` dal `package.json` perché il pacchetto non include configurazione ESLint dedicata.

## Limite onesto
La revisione è stata fatta a livello strutturale e logico. In questo ambiente non ho eseguito davvero `npm install`, `prisma migrate` e `next build` contro il tuo database/servizi reali.
