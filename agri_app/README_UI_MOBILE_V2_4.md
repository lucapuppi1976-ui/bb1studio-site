# Agri App — UI Mobile UX V2.4

Questa patch migliora l'usabilità mobile senza modificare database, Prisma, logica applicativa o variabili Render.

## Cosa cambia

- Header più compatto su mobile
- Navigazione principale orizzontale e scrollabile
- Barra mobile inferiore per le sezioni più usate
- Bottoni con area touch più ampia
- Form più comodi da usare su telefono
- Input a 16px per evitare zoom automatico su iOS
- Spaziature e card più leggere su piccoli schermi
- Upload immagini più coerente con la UI chiara
- Coda senza rete più leggibile su mobile
- Scanner QR più stabile e centrato su schermi piccoli

## Cosa non cambia

- Nessuna modifica DB
- Nessuna modifica Prisma
- Nessuna modifica package.json/package-lock.json
- Nessuna modifica alle variabili Render
- Nessuna attivazione email

## Test consigliato

```bash
cd agri_app
npx prisma generate
npm run build
npm run dev
```

Verificare su mobile o responsive mode:

- `/agri_app/dashboard`
- `/agri_app/plants`
- `/agri_app/plants/new`
- `/agri_app/plants/[id]`
- `/agri_app/plants/[id]/tasks/new`
- `/agri_app/plants/[id]/interventions/new`
- `/agri_app/tasks`
- `/agri_app/tasks/[id]`
- `/agri_app/offline-sync`
- `/agri_app/scan`

## Nota

La barra inferiore mobile appare solo quando l'utente è autenticato e contiene le sezioni operative principali: riepilogo, piante, attività, oggi e avvisi.
