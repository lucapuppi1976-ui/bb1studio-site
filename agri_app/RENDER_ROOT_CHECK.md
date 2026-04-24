# Root check per Render

Se il repository è corretto, nel **root del repo GitHub** devi vedere direttamente questi file/cartelle:

- package.json
- next.config.ts
- tsconfig.json
- prisma/
- public/
- src/
- .gitignore
- .env.example
- render.yaml

Se invece vedi una cartella tipo `agri_app_github_ready_source_reviewed_v2/` e **dentro** ci sono questi file, allora il repo è stato caricato con un livello di cartella in più e Render non troverà `package.json`.

## Build settings Render
- Language/Runtime: Node
- Root Directory: lasciare vuoto
- Build Command: `npm install && npm run build`
- Start Command: `npm run start`
