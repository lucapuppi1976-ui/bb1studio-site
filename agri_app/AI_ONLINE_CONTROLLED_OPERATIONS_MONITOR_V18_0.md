# V18.0 — Online Controlled Operations Monitor & Dry-Run Production Watchtower

V18.0 aggiunge online controlled operations monitor e dry-run production watchtower post go-live.

## Stato operativo

- onlineControlledGo=true
- controlledDryRunProductionReady=true
- providerAiReady=false
- providerCalled=false
- persistencePerformed=false
- memoryPersistencePerformed=false
- taskCreated=false
- interventionCreated=false
- automaticExecutionPerformed=false
- publicSharePerformed=false
- productPrescriptionPerformed=false
- dosageAdvicePerformed=false
- operationalExecutionAllowed=false
- executionCommandAllowed=false
- publicExportArtifactWriteAllowed=false
- publicExportPackageWriteAllowed=false
- incidentRecordWriteAllowed=false
- incidentWriteAllowed=false
- schemaWriteAllowed=false
- migrationExecutionAllowed=false
- manualDispatchOnly=true
- humanReviewRequired=true
- localAnalysisOnly=true
- redactedOutputOnly=true

## Endpoint ops

/api/ops/ai-online-controlled-operations-monitor-dry-run

## Check

npm run ops:ai-online-controlled-operations-monitor-check

## Decisione

La APP resta online in controlled dry-run. Ogni attivazione reale richiede un gate separato, esplicito e reversibile.
