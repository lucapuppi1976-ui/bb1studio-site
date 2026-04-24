# Upload to GitHub

Questo pacchetto è **repo-ready**.

## Importante
Su GitHub **non devi caricare file compilati** (`.next`, `node_modules`, build output).
Devi caricare il **sorgente completo** del progetto.

## Metodo consigliato (CLI Git)
1. Estrai lo ZIP.
2. Entra nella cartella del progetto.
3. Crea un repository GitHub vuoto.
4. Esegui:

```bash
git init -b main
git add .
git commit -m "Initial agri_app source"
git remote add origin https://github.com/TUO-USERNAME/TUO-REPO.git
git push -u origin main
```

## Metodo via browser GitHub
GitHub Web va bene, ma ha limiti pratici:
- massimo **25 MiB per file**
- massimo **100 file** per singolo upload

Quindi, se usi il browser:
1. Estrai lo ZIP.
2. Carica il contenuto in **più blocchi** se necessario.
3. Non caricare:
   - `.env`
   - `node_modules`
   - `.next`
   - segreti o credenziali

## Verifica finale
Nel repo devono esserci almeno:
- `package.json`
- `src/`
- `prisma/`
- `public/`
- `.gitignore`
- `.env.example`
- `render.yaml`
