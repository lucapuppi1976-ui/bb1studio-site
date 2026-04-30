# Agri App — V2.8 Approvals Workflow

Questa patch migliora il flusso approvazioni e proposte operative.

## Cosa include

- Pagina `/approvals` più chiara e filtrabile.
- Conteggi: totali, da valutare, approvate, rifiutate.
- Card proposta con pianta, attività collegata, tipo intervento, proponente, data proposta e stato.
- Azioni approva/rifiuta mostrate solo per proposte ancora da valutare.
- Pagina `/tasks/[id]/propose` con testo guida.
- Form proposta più chiaro e coerente con la UI mobile.
- Notifiche approvazione/rifiuto localizzate in base alla lingua preferita dell’utente, quando disponibile.
- Nuovo dizionario `src/lib/i18n/approvals-workflow.ts` per 8 lingue.

## Non cambia

- Nessuna modifica Prisma.
- Nessun `db push` richiesto.
- Nessuna modifica a `package.json` o `package-lock.json`.
- Nessuna attivazione email.

## Test consigliati

- `/agri_app/tasks/[id]/propose`
- `/agri_app/approvals`
- `/agri_app/tasks/[id]`
- `/agri_app/notifications`

Flusso:

1. Operatore propone un seguito da un’attività.
2. Admin apre Approvazioni.
3. Admin approva o rifiuta.
4. Lo stato è leggibile.
5. L’utente riceve una notifica user-friendly.
