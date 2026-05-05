# Agri App — Strategia AI diagnosi fotografica V5.6

## Visione

Agri App deve diventare uno strumento premium per diagnosi fotografica agricola:

- l’utente carica o scatta una foto;
- il sistema analizza la pianta e il contesto visivo;
- l’AI propone problemi possibili;
- l’AI suggerisce azioni concrete;
- l’operatore conferma, modifica o scarta;
- l’app conserva storico, priorità e follow-up.

## Pipeline funzionale futura

### 1. Ingresso immagine

- validazione formato;
- limiti dimensione;
- preview;
- privacy;
- collegamento opzionale a pianta/intervento/task.

### 2. Analisi AI

- descrizione immagine;
- identificazione pianta, se possibile;
- sintomi visibili;
- fattori ambientali osservabili;
- confidenza;
- dati mancanti da chiedere all’utente.

### 3. Diagnosi assistita

- problemi probabili;
- gravità;
- urgenza;
- rischio propagazione;
- incertezza;
- alternative plausibili.

### 4. Soluzioni proposte

- azioni immediate;
- controlli ulteriori;
- trattamenti o interventi consigliati;
- tempi di rivalutazione;
- warning e limiti.

### 5. Human review

- nessun output AI deve diventare automaticamente attività critica senza conferma;
- l’utente deve poter accettare, modificare o respingere;
- il sistema deve distinguere ipotesi, raccomandazioni e azioni confermate.

## Prima release AI reale consigliata

La prossima release funzionale dovrebbe introdurre solo una base controllata:

- pagina o form di diagnosi foto;
- upload/preview locale o controllato;
- nessuna persistenza immagine se non esplicitamente prevista;
- nessuna chiamata AI live finché non sono definiti provider, costi, privacy e limiti.

## Guardrail

- niente chiavi provider in codice;
- niente valori sensibili in UI;
- niente diagnosi presentate come certezza;
- niente trattamenti rischiosi senza avvertenze;
- log e risultati redatti;
- fallback manuale sempre disponibile.
