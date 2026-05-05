# Agri App — AI Provider Request Preview V6.8

## Obiettivo

V6.8 introduce la preview della richiesta provider AI.

Il sistema costruisce:

- providerPayload;
- systemInstruction;
- userInstruction;
- expectedJsonSchema;
- evidenceSummary;
- requestReady;
- vincoli runtime provider.

## Endpoint operativo protetto

    /api/ops/ai-provider-request-preview

## Output chiave

- requestPreview
- providerPayload
- expectedJsonSchema
- systemInstruction
- userInstruction
- requestReady
- humanReviewRequired=true

## Guardrail

- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun endpoint `/api/ai`;
- nessun endpoint `/api/diagnosis`;
- nessuna persistenza DB;
- nessuna modifica Prisma schema;
- nessuna creazione automatica di attività o interventi;
- providerCallsEnabled=false;
- externalProviderCalled=false;
- clientProviderCallsAllowed=false;
- humanReviewRequired=true.

## Check automatico

    npm run ops:ai-provider-request-check

Con verifica live protetta:

    npm run ops:ai-provider-request-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il valore del secret in chat.
