# Agri App — AI Photo Symptom Annotation V7.2

## Obiettivo

V7.2 introduce la mappa sintomi fotografica strutturata.

Il sistema produce:

- PhotoSymptomAnnotationMap;
- annotationFingerprint;
- regioni normalizzate normalizedBox;
- tessuto colpito;
- severità;
- distribuzione;
- segni visibili;
- aiEvidenceMap;
- providerReady;
- export report testuale e JSON.

## Endpoint operativo protetto

    /api/ops/ai-photo-annotation-dry-run

## Output chiave

- annotationId
- annotationFingerprint
- normalizedBox
- affectedTissues
- visibleSigns
- aiEvidenceMap
- providerReady
- allowedToExecute=false
- providerCalled=false
- persistencePerformed=false
- automaticTaskCreationPerformed=false
- automaticInterventionCreationPerformed=false
- humanReviewRequired=true

## Guardrail

- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun endpoint `/api/ai`;
- nessun endpoint `/api/diagnosis`;
- nessuna persistenza DB;
- nessuna modifica Prisma schema;
- nessuna creazione automatica di attività o interventi;
- allowedToExecute=false;
- revisione umana obbligatoria.

## Check automatico

    npm run ops:ai-photo-annotation-check

Con verifica live protetta:

    npm run ops:ai-photo-annotation-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il valore del secret in chat.
