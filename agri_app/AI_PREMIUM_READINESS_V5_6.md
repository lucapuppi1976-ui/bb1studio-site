# Agri App — AI Premium Readiness Checkpoint V5.6

## Obiettivo

V5.6 crea un checkpoint live sicuro prima dell’introduzione delle funzionalità AI premium.

Questa release non attiva ancora:

- riconoscimento immagini;
- upload fotografico dedicato AI;
- chiamate verso provider AI;
- endpoint AI live;
- modifiche DB;
- modifiche Prisma schema.

## Funzionalità preparate

La direzione premium è:

1. acquisizione sicura foto;
2. riconoscimento visivo assistito;
3. identificazione problemi;
4. proposta soluzioni;
5. classificazione gravità/priorità;
6. revisione umana;
7. storico diagnosi e confronto nel tempo.

## Stato sicurezza

- Nessuna chiave AI deve essere versionata.
- Nessun valore sensibile deve apparire nella UI.
- Nessun endpoint AI deve essere esposto prima di una release dedicata.
- Le prime integrazioni AI dovranno avere controlli dedicati e fallback espliciti.
- Ogni output AI dovrà essere presentato come assistivo, non come certezza assoluta.

## Check automatico

    npm run ops:ai-readiness-check

## Vincoli mantenuti

- Nessun prisma db push.
- Nessuna modifica al DB schema.
- Nessuna modifica al Prisma schema.
- Email live disattivate.
- ENABLE_EMAIL_NOTIFICATIONS=false.
