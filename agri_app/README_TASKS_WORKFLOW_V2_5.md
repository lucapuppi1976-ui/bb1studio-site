# Agri App — V2.5 Workflow Attività

Questa patch migliora il flusso operativo delle attività senza modificare database, Prisma o configurazioni Render.

## Include

- Conteggi rapidi su `/tasks`: totali, aperte, oggi, in ritardo, completate.
- Filtri server-side tramite query string.
- Ricerca per titolo, descrizione, note, pianta, codice pianta e responsabile.
- Card attività più leggibili su mobile.
- Azione rapida “Completa” direttamente da `/tasks` e `/today`.
- Dettaglio attività più ordinato con sezione “Cosa fare ora”.
- Copy multilingua per IT, ES, EN, SK, FR, DE, RU, HU.

## File principali

- `src/app/tasks/page.tsx`
- `src/app/tasks/[id]/page.tsx`
- `src/app/today/page.tsx`
- `src/lib/i18n/tasks-workflow.ts`

## Note

Non eseguire `prisma db push`: la V2.5 non cambia lo schema.
