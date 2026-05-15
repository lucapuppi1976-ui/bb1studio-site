#!/usr/bin/env node
// AGRI_V17_3_INCIDENT_HANDLING_WRITE_PATH_GATE_CHECK: esegue il check V17.3 prima dei controlli operativi aggregati.
const __agriIncidentHandlingWritePathGateV173 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-incident-handling-write-path-gate-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriIncidentHandlingWritePathGateV173();

// AGRI_V17_2_PROVIDER_CANARY_CALL_EXECUTION_GATE_CHECK: esegue il check V17.2 prima dei controlli operativi aggregati.
const __agriProviderCanaryCallExecutionGateV172 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-provider-canary-call-execution-gate-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriProviderCanaryCallExecutionGateV172();

// AGRI_V17_1_MANUAL_DISPATCH_WRITE_PATH_GATE_CHECK: esegue il check V17.1 prima dei controlli operativi aggregati.
const __agriManualDispatchWritePathGateV171 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-manual-dispatch-write-path-gate-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriManualDispatchWritePathGateV171();

// AGRI_V17_0_PUBLIC_COMPLIANCE_EXPORT_PUBLICATION_GATE_CHECK: esegue il check V17.0 prima dei controlli operativi aggregati.
const __agriPublicComplianceExportPublicationGateV170 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-public-compliance-export-publication-gate-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriPublicComplianceExportPublicationGateV170();

// AGRI_V16_9_RUNTIME_INCIDENT_HANDLING_ACTIVATION_GATE_CHECK: esegue il check V16.9 prima dei controlli operativi aggregati.
const __agriRuntimeIncidentHandlingActivationGateV169 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-runtime-incident-handling-activation-gate-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriRuntimeIncidentHandlingActivationGateV169();

// AGRI_V16_8_PROVIDER_RUNTIME_CANARY_EXECUTION_CHECK: esegue il check V16.8 prima dei controlli operativi aggregati.
const __agriProviderRuntimeCanaryExecutionV168 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-provider-runtime-canary-execution-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriProviderRuntimeCanaryExecutionV168();

// AGRI_V16_7_MANUAL_DISPATCH_ACTIVATION_GATE_CHECK: esegue il check V16.7 prima dei controlli operativi aggregati.
const __agriManualDispatchActivationGateV167 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-manual-dispatch-activation-gate-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriManualDispatchActivationGateV167();

// AGRI_V16_6_COMPLIANCE_EXPORT_ACTIVATION_GATE_CHECK: esegue il check V16.6 prima dei controlli operativi aggregati.
const __agriComplianceExportActivationGateV166 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-compliance-export-activation-gate-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriComplianceExportActivationGateV166();

// AGRI_V16_5_RUNTIME_INCIDENT_RESPONSE_BOARD_CHECK: esegue il check V16.5 prima dei controlli operativi aggregati.
const __agriRuntimeIncidentResponseBoardV165 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-runtime-incident-response-board-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriRuntimeIncidentResponseBoardV165();

// AGRI_V16_4_STAGED_PROVIDER_RUNTIME_BETA_CHECK: esegue il check V16.4 prima dei controlli operativi aggregati.
const __agriStagedProviderRuntimeBetaV164 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-staged-provider-runtime-beta-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriStagedProviderRuntimeBetaV164();

// AGRI_V16_3_HUMAN_SUPERVISED_OPERATIONS_COCKPIT_CHECK: esegue il check V16.3 prima dei controlli operativi aggregati.
const __agriHumanSupervisedOperationsCockpitV163 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-human-supervised-operations-cockpit-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriHumanSupervisedOperationsCockpitV163();

// AGRI_V16_2_OPERATIONAL_AUDIT_PACKAGE_CHECK: esegue il check V16.2 prima dei controlli operativi aggregati.
const __agriOperationalAuditPackageV162 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-operational-audit-package-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriOperationalAuditPackageV162();

// AGRI_V16_1_POST_BETA_OBSERVABILITY_ROLLBACK_CHECK: esegue il check V16.1 prima dei controlli operativi aggregati.
const __agriPostBetaObservabilityRollbackV161 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-post-beta-observability-rollback-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriPostBetaObservabilityRollbackV161();

// AGRI_V16_0_CONTROLLED_PRODUCTION_BETA_GATE_CHECK: esegue il check V16.0 prima dei controlli operativi aggregati.
const __agriControlledProductionBetaGateV160 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-controlled-production-beta-gate-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriControlledProductionBetaGateV160();

// AGRI_V15_9_CONTROLLED_BETA_READINESS_BOARD_CHECK: esegue il check V15.9 prima dei controlli operativi aggregati.
const __agriControlledBetaReadinessBoardV159 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-controlled-beta-readiness-board-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriControlledBetaReadinessBoardV159();

// AGRI_V15_8_STORAGE_REHEARSAL_BOARD_CHECK: esegue il check V15.8 prima dei controlli operativi aggregati.
const __agriStorageRehearsalBoardV158 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-storage-rehearsal-board-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriStorageRehearsalBoardV158();

// AGRI_V15_7_PROVIDER_STAGING_ACTIVATION_GATE_CHECK: esegue il check V15.7 prima dei controlli operativi aggregati.
const __agriProviderStagingActivationGateV157 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-provider-staging-activation-gate-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriProviderStagingActivationGateV157();

// AGRI_V15_6_MANUAL_CONVERSION_REHEARSAL_CHECK: esegue il check V15.6 prima dei controlli operativi aggregati.
const __agriManualConversionRehearsalV156 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-manual-conversion-rehearsal-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriManualConversionRehearsalV156();

// AGRI_V15_5_MIGRATION_REHEARSAL_STORAGE_GATE_CHECK: esegue il check V15.5 prima dei controlli operativi aggregati.
const __agriMigrationRehearsalStorageGateV155 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-migration-rehearsal-storage-gate-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriMigrationRehearsalStorageGateV155();

// AGRI_V15_4_PROVIDER_STAGING_SHADOW_RUN_CHECK: esegue il check V15.4 prima dei controlli operativi aggregati.
const __agriProviderStagingShadowRunV154 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-provider-staging-shadow-run-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriProviderStagingShadowRunV154();

// AGRI_V15_3_PERSISTENT_HUMAN_REVIEW_WORKFLOW_CHECK: esegue il check V15.3 prima dei controlli operativi aggregati.
const __agriPersistentHumanReviewWorkflowRunV153 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-persistent-human-review-workflow-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriPersistentHumanReviewWorkflowRunV153();

// AGRI_V15_2_CASE_PERSISTENCE_MIGRATION_PLAN_CHECK: esegue il check V15.2 prima dei controlli operativi aggregati.
const __agriCasePersistenceMigrationPlanRunV152 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-case-persistence-migration-plan-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriCasePersistenceMigrationPlanRunV152();

// AGRI_V15_1_PROVIDER_RUNTIME_STAGING_GATEWAY_CHECK: esegue il check V15.1 prima dei controlli operativi aggregati.
const __agriProviderRuntimeStagingGatewayRunV151 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-provider-runtime-staging-gateway-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriProviderRuntimeStagingGatewayRunV151();

// AGRI_V15_0_ONLINE_OPERATIONAL_READINESS_CHECK: esegue il check V15.0 prima dei controlli operativi aggregati.
const __agriOnlineOperationalReadinessRunV150 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-online-operational-readiness-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriOnlineOperationalReadinessRunV150();

// AGRI_V14_5_AGRONOMIC_EXECUTIVE_DOSSIER_CHECK: esegue il check V14.5 prima dei controlli operativi aggregati.
const __agriAgronomicExecutiveDossierRunV145 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-agronomic-executive-dossier-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriAgronomicExecutiveDossierRunV145();

// AGRI_V14_4_AGRONOMIC_GOVERNANCE_FREEZE_CHECK: esegue il check V14.4 prima dei controlli operativi aggregati.
const __agriAgronomicGovernanceFreezeRunV144 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-agronomic-governance-freeze-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriAgronomicGovernanceFreezeRunV144();

// AGRI_V14_3_AGRONOMIC_SENSITIVITY_ROBUSTNESS_CHECK: esegue il check V14.3 prima dei controlli operativi aggregati.
const __agriAgronomicSensitivityRobustnessRunV143 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-agronomic-sensitivity-robustness-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriAgronomicSensitivityRobustnessRunV143();

// AGRI_V14_2_AGRONOMIC_STRATEGY_PORTFOLIO_COMPARATOR_CHECK: esegue il check V14.2 prima dei controlli operativi aggregati.
const __agriAgronomicStrategyPortfolioComparatorRunV142 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-agronomic-strategy-portfolio-comparator-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriAgronomicStrategyPortfolioComparatorRunV142();

// AGRI_V14_1_AGRONOMIC_SCENARIO_STRESS_TEST_CHECK: esegue il check V14.1 prima dei controlli operativi aggregati.
const __agriAgronomicScenarioStressTestRunV141 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-agronomic-scenario-stress-test-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriAgronomicScenarioStressTestRunV141();

// AGRI_V14_0_AGRONOMIC_DECISION_SIMULATION_BOARD_CHECK: esegue il check V14.0 prima dei controlli operativi aggregati.
const __agriAgronomicDecisionSimulationBoardRunV140 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-agronomic-decision-simulation-board-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriAgronomicDecisionSimulationBoardRunV140();

// AGRI_V13_6_HUMAN_REVIEW_COMPLIANCE_ATTESTATION_CHECK: esegue il check V13.6 prima dei controlli operativi aggregati.
const __agriHumanReviewComplianceAttestationRunV136 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-human-review-compliance-attestation-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriHumanReviewComplianceAttestationRunV136();

// AGRI_V13_5_HUMAN_REVIEW_QUALITY_ASSURANCE_CHECK: esegue il check V13.5 prima dei controlli operativi aggregati.
const __agriHumanReviewQualityAssuranceRunV135 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-human-review-quality-assurance-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriHumanReviewQualityAssuranceRunV135();

// AGRI_V13_4_HUMAN_REVIEW_BOARD_PACK_CHECK: esegue il check V13.4 prima dei controlli operativi aggregati.
const __agriHumanReviewBoardPackRunV134 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-human-review-board-pack-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriHumanReviewBoardPackRunV134();

// AGRI_V13_3_REVIEWER_RATIONALE_LEDGER_CHECK: esegue il check V13.3 prima dei controlli operativi aggregati.
const __agriReviewerRationaleLedgerRunV133 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-reviewer-rationale-ledger-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriReviewerRationaleLedgerRunV133();

// AGRI_V13_2_EVIDENCE_INTEGRITY_CUSTODY_CHECK: esegue il check V13.2 prima dei controlli operativi aggregati.
const __agriEvidenceIntegrityCustodyRunV132 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-evidence-integrity-custody-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriEvidenceIntegrityCustodyRunV132();

// AGRI_V13_1_REVIEWER_CONSENSUS_CALIBRATION_CHECK: esegue il check V13.1 prima dei controlli operativi aggregati.
const __agriReviewerConsensusCalibrationRunV131 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-reviewer-consensus-calibration-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriReviewerConsensusCalibrationRunV131();

// AGRI_V13_0_HUMAN_REVIEW_MISSION_CONTROL_CHECK: esegue il check V13.0 prima dei controlli operativi aggregati.
const __agriHumanReviewMissionControlRunV130 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-human-review-mission-control-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriHumanReviewMissionControlRunV130();

// AGRI_V12_9_PROVIDER_FINAL_READINESS_AUDIT_CHECK: esegue il check V12.9 prima dei controlli operativi aggregati.
const __agriProviderFinalReadinessAuditRunV129 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-provider-final-readiness-audit-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriProviderFinalReadinessAuditRunV129();

// AGRI_V12_8_PROVIDER_RUNTIME_ADAPTER_CONTRACT_CHECK: esegue il check V12.8 prima dei controlli operativi aggregati.
const __agriProviderRuntimeAdapterContractRunV128 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-provider-runtime-adapter-contract-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriProviderRuntimeAdapterContractRunV128();

// AGRI_V12_7_PROVIDER_SAFE_ENABLEMENT_GATE_CHECK: esegue il check V12.7 prima dei controlli operativi aggregati.
const __agriProviderSafeEnablementGateRunV127 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-provider-safe-enablement-gate-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriProviderSafeEnablementGateRunV127();

// AGRI_V12_5_PROVIDER_OBSERVABILITY_DRILL_CHECK: esegue il check V12.5 prima dei controlli operativi aggregati.
const __agriProviderObservabilityDrillRunV125 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-provider-observability-drill-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriProviderObservabilityDrillRunV125();

// AGRI_V12_4_PROVIDER_CANARY_ROLLOUT_CHECK: esegue il check V12.4 prima dei controlli operativi aggregati.
const __agriProviderCanaryRolloutRunV124 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-provider-canary-rollout-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriProviderCanaryRolloutRunV124();

// AGRI_V12_3_PROVIDER_SHADOW_EVALUATION_CHECK: esegue il check V12.3 prima dei controlli operativi aggregati.
const __agriProviderShadowEvaluationRunV123 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-provider-shadow-evaluation-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriProviderShadowEvaluationRunV123();

// AGRI_V12_2_PROVIDER_RESPONSE_FIREWALL_CHECK: esegue il check V12.2 prima dei controlli operativi aggregati.
const __agriProviderResponseFirewallRunV122 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-provider-response-firewall-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriProviderResponseFirewallRunV122();

// AGRI_V12_1_PROVIDER_REQUEST_SANDBOX_CHECK: esegue il check V12.1 prima dei controlli operativi aggregati.
const __agriProviderRequestSandboxRunV121 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-provider-request-sandbox-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriProviderRequestSandboxRunV121();

// AGRI_V12_0_PROVIDER_ACTIVATION_FIREWALL_CHECK: esegue il check V12.0 prima dei controlli operativi aggregati.
const __agriProviderActivationFirewallRunV120 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-provider-activation-firewall-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriProviderActivationFirewallRunV120();

// AGRI_V11_5_AGRONOMIC_IMPROVEMENT_SCORECARD_CHECK: esegue il check V11.5 prima dei controlli operativi aggregati.
const __agriImprovementScorecardRunV115 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-agronomic-improvement-scorecard-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriImprovementScorecardRunV115();

// AGRI_V11_4_AGRONOMIC_SCENARIO_STRESS_TEST_CHECK: esegue il check V11.4 prima dei controlli operativi aggregati.
const __agriScenarioStressRunV114 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-agronomic-scenario-stress-test-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriScenarioStressRunV114();

// AGRI_V11_3_AGRONOMIC_DECISION_ASSURANCE_CHECK: esegue il check V11.3 prima dei controlli operativi aggregati.
const __agriDecisionAssuranceRunV113 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-agronomic-decision-assurance-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriDecisionAssuranceRunV113();

// AGRI_V11_2_AGRONOMIC_COMPLIANCE_PASSPORT_CHECK: esegue il check V11.2 prima dei controlli operativi aggregati.
const __agriCompliancePassportRunV112 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-agronomic-compliance-passport-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriCompliancePassportRunV112();

// AGRI_V11_1_AGRONOMIC_EXPLAINABILITY_LEDGER_CHECK: esegue il check V11.1 prima dei controlli operativi aggregati.
const __agriExplainabilityLedgerRunV111 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-agronomic-explainability-ledger-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriExplainabilityLedgerRunV111();

// AGRI_V11_0_AGRONOMIC_CONTROL_TOWER_CHECK: esegue il check V11.0 prima dei controlli operativi aggregati.
const __agriControlTowerRunV110 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-agronomic-control-tower-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriControlTowerRunV110();

// AGRI_V10_9_HARVEST_QUALITY_READINESS_CHECK: esegue il check V10.9 prima dei controlli operativi aggregati.
const __agriHarvestQualityRunV109 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-harvest-quality-readiness-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriHarvestQualityRunV109();

// AGRI_V10_8_PHENOLOGY_YIELD_RISK_CHECK: esegue il check V10.8 prima dei controlli operativi aggregati.
const __agriPhenologyYieldRunV108 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-phenology-yield-risk-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriPhenologyYieldRunV108();

// AGRI_V10_7_SOIL_NUTRIENT_STRATEGY_CHECK: esegue il check V10.7 prima dei controlli operativi aggregati.
const __agriSoilNutrientRunV107 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-soil-nutrient-strategy-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriSoilNutrientRunV107();

// AGRI_V10_6_PEST_DISEASE_OUTBREAK_SENTINEL_CHECK: esegue il check V10.6 prima dei controlli operativi aggregati.
const __agriOutbreakSentinelRunV106 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-pest-disease-outbreak-sentinel-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriOutbreakSentinelRunV106();

// AGRI_V10_5_CLIMATE_WATER_STRATEGY_CHECK: esegue il check V10.5 prima dei controlli operativi aggregati.
const __agriClimateWaterRunV105 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-climate-water-strategy-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriClimateWaterRunV105();

// AGRI_V10_4_FARM_DIGITAL_TWIN_READINESS_CHECK: esegue il check V10.4 prima dei controlli operativi aggregati.
const __agriFarmTwinRunV104 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-farm-digital-twin-readiness-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriFarmTwinRunV104();

// AGRI_V10_3_AGRONOMIC_BOARD_PACK_CHECK: esegue il check V10.3 prima dei controlli operativi aggregati.
const __agriBoardPackRunV103 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-agronomic-board-pack-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriBoardPackRunV103();

// AGRI_V10_2_CROP_PROTOCOL_BUILDER_CHECK: esegue il check V10.2 prima dei controlli operativi aggregati.
const __agriCropProtocolRunV102 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-crop-protocol-builder-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriCropProtocolRunV102();

// AGRI_V10_1_FIELD_AUTOPILOT_CONTROL_ROOM_CHECK: esegue il check V10.1 prima dei controlli operativi aggregati.
const __agriAutopilotRunV101 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-field-autopilot-control-room-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriAutopilotRunV101();

// AGRI_V10_0_KNOWLEDGE_VAULT_CHECK: esegue il check V10.0 prima dei controlli operativi aggregati.
const __agriKvRunV100 = async () => {
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync(
    "npm",
    ["run", "ops:ai-knowledge-vault-check", "--silent"],
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  if ((result.status ?? 0) !== 0) {
    process.exit(result.status ?? 1);
  }
};

await __agriKvRunV100();


import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");

const requiredFiles = [
  "agri_app/OPERATIONS_RUNBOOK_V4_14.md",
  "agri_app/scripts/ops-runbook-check.mjs",
  "agri_app/scripts/ops-quick-check.mjs",
  "agri_app/scripts/ops-admin-page-check.mjs",
  "agri_app/scripts/ops-admin-dynamic-check.mjs",
  "agri_app/scripts/ops-admin-navigation-check.mjs",
  "agri_app/scripts/ops-admin-ux-check.mjs",
  "agri_app/scripts/ops-admin-command-palette-check.mjs",
  "agri_app/AI_IMAGE_DIAGNOSIS_STRATEGY_V5_6.md",
  "agri_app/AI_PREMIUM_READINESS_V5_6.md",
  "agri_app/scripts/ops-ai-readiness-check.mjs",
  "agri_app/AI_PHOTO_DIAGNOSIS_INTAKE_V5_7.md",
  "agri_app/scripts/ops-ai-photo-intake-check.mjs",
  "agri_app/AI_PHOTO_DIAGNOSIS_DRAFT_ENGINE_V5_8.md",
  "agri_app/scripts/ops-ai-diagnosis-draft-check.mjs",
  "agri_app/AI_PHOTO_ACTION_PLAN_V5_9.md",
  "agri_app/scripts/ops-ai-action-plan-check.mjs",
  "agri_app/AI_HUMAN_REVIEW_WORKFLOW_V6_0.md",
  "agri_app/scripts/ops-ai-review-workflow-check.mjs",
  "agri_app/AI_PROVIDER_SAFETY_HARNESS_V6_1.md",
  "agri_app/scripts/ops-ai-provider-safety-check.mjs",
  "agri_app/AI_PROVIDER_OPS_STATUS_V6_2.md",
  "agri_app/scripts/ops-ai-provider-status-check.mjs",
  "agri_app/AI_PROVIDER_DRY_RUN_ADAPTER_V6_3.md",
  "agri_app/scripts/ops-ai-provider-dry-run-check.mjs",
  "agri_app/AI_PROVIDER_RESPONSE_CONTRACT_V6_4.md",
  "agri_app/scripts/ops-ai-provider-response-check.mjs",
  "agri_app/AI_DIAGNOSIS_PIPELINE_DRY_RUN_V6_5.md",
  "agri_app/scripts/ops-ai-pipeline-dry-run-check.mjs",
  "agri_app/AI_PHOTO_QUALITY_GATE_V6_6.md",
  "agri_app/scripts/ops-ai-photo-quality-gate-check.mjs",
  "agri_app/AI_PHOTO_EVIDENCE_BUNDLE_V6_7.md",
  "agri_app/scripts/ops-ai-evidence-bundle-check.mjs",
  "agri_app/AI_PROVIDER_REQUEST_PREVIEW_V6_8.md",
  "agri_app/scripts/ops-ai-provider-request-check.mjs",
  "agri_app/AI_DIAGNOSIS_ORCHESTRATOR_DRY_RUN_V7_0.md",
  "agri_app/scripts/ops-ai-orchestrator-dry-run-check.mjs",
  "agri_app/AI_DIAGNOSIS_CASE_FILE_V7_1.md",
  "agri_app/scripts/ops-ai-case-file-check.mjs",
  "agri_app/AI_PHOTO_SYMPTOM_ANNOTATION_V7_2.md",
  "agri_app/scripts/ops-ai-photo-annotation-check.mjs",
  "agri_app/AI_DIFFERENTIAL_DIAGNOSIS_MATRIX_V7_3.md",
  "agri_app/scripts/ops-ai-differential-diagnosis-check.mjs",
  "agri_app/AI_SOLUTION_PLAYBOOK_V7_4.md",
  "agri_app/scripts/ops-ai-solution-playbook-check.mjs",
  "agri_app/AI_CASE_REPORT_BUILDER_V7_5.md",
  "agri_app/scripts/ops-ai-case-report-check.mjs",
  "agri_app/AI_DECISION_DOSSIER_V7_6.md",
  "agri_app/scripts/ops-ai-decision-dossier-check.mjs",
  "agri_app/AI_WORK_ORDER_PREVIEW_V7_7.md",
  "agri_app/scripts/ops-ai-work-order-preview-check.mjs",
  "agri_app/AI_WORK_ORDER_EXECUTION_GATE_V7_8.md",
  "agri_app/scripts/ops-ai-work-order-execution-gate-check.mjs",
  "agri_app/AI_MANUAL_CONVERSION_AUDIT_V7_9.md",
  "agri_app/scripts/ops-ai-manual-conversion-audit-check.mjs",
  "agri_app/AI_CASE_EXPORT_BUNDLE_V8_0.md",
  "agri_app/scripts/ops-ai-case-export-bundle-check.mjs",
  "agri_app/AI_CASE_EXPORT_ARCHIVE_V8_1.md",
  "agri_app/scripts/ops-ai-case-export-archive-check.mjs",
  "agri_app/AI_FIELD_INTELLIGENCE_V8_3.md",
  "agri_app/scripts/ops-ai-field-intelligence-check.mjs",
  "agri_app/AI_TEMPORAL_FIELD_TREND_V8_4.md",
  "agri_app/scripts/ops-ai-temporal-trend-check.mjs",
  "agri_app/AI_FIELD_SCOUTING_PLAN_V8_5.md",
  "agri_app/scripts/ops-ai-field-scouting-plan-check.mjs",
  "agri_app/AI_FIELD_RISK_HEATMAP_V8_6.md",
  "agri_app/scripts/ops-ai-field-risk-heatmap-check.mjs",
  "agri_app/AI_FOLLOW_UP_SCHEDULER_V8_7.md",
  "agri_app/scripts/ops-ai-follow-up-scheduler-check.mjs",
  "agri_app/AI_INTERVENTION_READINESS_V8_8.md",
  "agri_app/scripts/ops-ai-intervention-readiness-check.mjs",
  "agri_app/AI_INTERVENTION_PROTOCOL_V8_9.md",
  "agri_app/scripts/ops-ai-intervention-protocol-check.mjs",
  "agri_app/AI_FARM_COMMAND_BOARD_V9_0.md",
  "agri_app/scripts/ops-ai-farm-command-board-check.mjs",
  "agri_app/AI_SCOUTING_MISSION_PLANNER_V9_1.md",
  "agri_app/scripts/ops-ai-scouting-mission-check.mjs",
  "agri_app/AI_FARM_RISK_RADAR_V9_2.md",
  "agri_app/scripts/ops-ai-farm-risk-radar-check.mjs",
  "agri_app/AI_INTERVENTION_IMPACT_ROI_V9_3.md",
  "agri_app/scripts/ops-ai-intervention-impact-check.mjs",
  "agri_app/AI_RESPONSE_PORTFOLIO_OPTIMIZER_V9_4.md",
  "agri_app/scripts/ops-ai-response-portfolio-check.mjs",
  "agri_app/AI_CASE_MEMORY_GRAPH_V9_5.md",
  "agri_app/scripts/ops-ai-case-memory-graph-check.mjs",
  "agri_app/AI_CASE_MEMORY_RETRIEVAL_V9_6.md",
  "agri_app/scripts/ops-ai-case-memory-retrieval-check.mjs",
  "agri_app/AI_CASE_OUTCOME_LEARNING_V9_7.md",
  "agri_app/scripts/ops-ai-case-outcome-learning-check.mjs",
  "agri_app/AI_MEMORY_PROMOTION_GOVERNANCE_V9_8.md",
  "agri_app/scripts/ops-ai-memory-promotion-check.mjs",
  "agri_app/AI_MEMORY_QUALITY_GUARD_V9_9.md",
  "agri_app/scripts/ops-ai-memory-quality-guard-check.mjs",
  "agri_app/scripts/ops-admin-route-monitoring-check.mjs",
  "agri_app/scripts/ops-admin-live-routes-check.mjs",
  "agri_app/scripts/ops-quick-coverage-check.mjs",
  "agri_app/scripts/release-gate-live-safe.mjs",
  "agri_app/scripts/ops-log-redaction-check.mjs",
  "agri_app/scripts/ops-labels-check.mjs",
  "agri_app/scripts/ops-banner-check.mjs",
  "agri_app/scripts/release-gate.mjs",
  "agri_app/scripts/release-status.mjs",
  "agri_app/scripts/db-safety-check.mjs",
  "agri_app/scripts/security-check.mjs",
  "agri_app/scripts/recurring-quality-check.mjs",
];

const requiredScripts = [
  "ops:quick-check",
  "ops:admin-page-check",
  "ops:admin-dynamic-check",
  "ops:admin-navigation-check",
  "ops:admin-ux-check",
  "ops:admin-command-palette-check",
  "ops:ai-readiness-check",
  "ops:ai-photo-intake-check",
  "ops:ai-diagnosis-draft-check",
  "ops:ai-action-plan-check",
  "ops:ai-review-workflow-check",
  "ops:ai-provider-safety-check",
  "ops:ai-provider-status-check",
  "ops:ai-provider-dry-run-check",
  "ops:ai-provider-response-check",
  "ops:ai-pipeline-dry-run-check",
  "ops:ai-photo-quality-gate-check",
  "ops:ai-evidence-bundle-check",
  "ops:ai-provider-request-check",
  "ops:ai-orchestrator-dry-run-check",
  "ops:ai-case-file-check",
  "ops:ai-photo-annotation-check",
  "ops:ai-differential-diagnosis-check",
  "ops:ai-solution-playbook-check",
  "ops:ai-case-report-check",
  "ops:ai-decision-dossier-check",
  "ops:ai-work-order-preview-check",
  "ops:ai-work-order-execution-gate-check",
  "ops:ai-manual-conversion-audit-check",
  "ops:ai-case-export-bundle-check",
  "ops:ai-case-export-archive-check",
  "ops:ai-field-intelligence-check",
  "ops:ai-temporal-trend-check",
  "ops:ai-field-scouting-plan-check",
  "ops:ai-field-risk-heatmap-check",
  "ops:ai-follow-up-scheduler-check",
  "ops:ai-intervention-readiness-check",
  "ops:ai-intervention-protocol-check",
  "ops:ai-farm-command-board-check",
  "ops:ai-scouting-mission-check",
  "ops:ai-farm-risk-radar-check",
  "ops:ai-intervention-impact-check",
  "ops:ai-response-portfolio-check",
  "ops:ai-case-memory-graph-check",
  "ops:ai-case-memory-retrieval-check",
  "ops:ai-case-outcome-learning-check",
  "ops:ai-memory-promotion-check",
  "ops:ai-memory-quality-guard-check",
  "ops:admin-route-monitoring-check",
  "ops:admin-live-routes-check",
  "ops:quick-coverage-check",
  "ops:release-gate:live",
  "ops:log-redaction-check",
  "ops:labels-check",
  "ops:banner-check",
  "ops:runbook-check",
  "ops:release-status:live",
  "ops:db-safety",
  "ops:security",
  "ops:recurring-quality",
];

const requiredRunbookText = [
  "NON fare prisma db push",
  "ENABLE_EMAIL_NOTIFICATIONS=false",
  "CRON_SECRET_VALUE",
  "npm run ops:quick-check",
  "npm run ops:admin-dynamic-check",
  "npm run ops:admin-navigation-check",
  "npm run ops:admin-ux-check",
  "npm run ops:admin-command-palette-check",
  "npm run ops:ai-readiness-check",
  "npm run ops:ai-photo-intake-check",
  "npm run ops:ai-diagnosis-draft-check",
  "npm run ops:ai-action-plan-check",
  "npm run ops:ai-review-workflow-check",
  "npm run ops:ai-provider-safety-check",
  "npm run ops:ai-provider-status-check",
  "npm run ops:ai-provider-dry-run-check",
  "npm run ops:ai-provider-response-check",
  "npm run ops:ai-pipeline-dry-run-check",
  "npm run ops:ai-photo-quality-gate-check",
  "npm run ops:ai-evidence-bundle-check",
  "npm run ops:ai-provider-request-check",
  "npm run ops:ai-orchestrator-dry-run-check",
  "npm run ops:ai-case-file-check",
  "npm run ops:ai-photo-annotation-check",
  "npm run ops:ai-differential-diagnosis-check",
  "npm run ops:ai-solution-playbook-check",
  "npm run ops:ai-case-report-check",
  "npm run ops:ai-decision-dossier-check",
  "npm run ops:ai-work-order-preview-check",
  "npm run ops:ai-work-order-execution-gate-check",
  "npm run ops:ai-manual-conversion-audit-check",
  "npm run ops:ai-case-export-bundle-check",
  "npm run ops:ai-case-export-archive-check",
  "npm run ops:ai-field-intelligence-check",
  "npm run ops:ai-temporal-trend-check",
  "npm run ops:ai-field-scouting-plan-check",
  "npm run ops:ai-field-risk-heatmap-check",
  "npm run ops:ai-follow-up-scheduler-check",
  "npm run ops:ai-intervention-readiness-check",
  "npm run ops:ai-intervention-protocol-check",
  "npm run ops:ai-farm-command-board-check",
  "npm run ops:ai-scouting-mission-check",
  "npm run ops:ai-farm-risk-radar-check",
  "npm run ops:ai-intervention-impact-check",
  "npm run ops:ai-response-portfolio-check",
  "npm run ops:ai-case-memory-graph-check",
  "npm run ops:ai-case-memory-retrieval-check",
  "npm run ops:ai-case-outcome-learning-check",
  "npm run ops:ai-memory-promotion-check",
  "npm run ops:ai-memory-quality-guard-check",
  "npm run ops:admin-route-monitoring-check",
  "npm run ops:admin-live-routes-check",
  "npm run ops:quick-coverage-check",
  "npm run ops:banner-check",
  "npm run ops:release-gate:live",
  "secret=[REDACTED]",
  "checkpoint/live-stable",
  "/admin",
  "/admin/operations",
  "/admin/system",
  "/ai/photo-diagnosis",
  "Render Web Service Agri App",
  "Render Cron Job",
  "AI premium readiness checkpoint",
  "AI photo diagnosis intake",
  "AI diagnosis draft engine",
  "AI photo action plan",
  "AI human review workflow",
  "AI provider safety harness",
  "AI provider ops status",
  "AI provider dry-run adapter",
  "AI provider response contract",
  "AI diagnosis pipeline dry-run",
  "AI photo quality gate",
  "AI photo evidence bundle",
  "AI provider request preview",
  "AI diagnosis orchestrator dry-run",
  "AI diagnosis case file",
  "AI photo symptom annotation",
  "AI differential diagnosis matrix",
  "AI solution playbook",
  "AI case report builder",
  "AI decision dossier",
  "AI work order preview",
  "AI work order execution gate",
  "AI manual conversion audit",
  "AI case export bundle",
  "AI case export archive",
  "AI field intelligence",
  "AI temporal trend",
  "AI field scouting plan",
  "AI field risk heatmap",
  "AI follow-up scheduler",
  "AI intervention readiness",
  "AI intervention protocol",
  "AI farm command board",
  "AI scouting mission planner",
  "AI farm risk radar",
  "AI intervention impact ROI",
  "AI response portfolio optimizer",
  "AI case memory graph",
  "AI case memory retrieval",
  "AI case outcome learning",
  "AI memory promotion governance",
  "AI memory quality guard",
];

const failures = [];

console.log("Agri App ops runbook check operativo");
console.log(`Repo root: ${repoRoot}`);
console.log("");

console.log("--- File richiesti ---");
for (const file of requiredFiles) {
  const ok = existsSync(resolve(repoRoot, file));
  console.log(`${ok ? "✓" : "✗"} ${file}`);

  if (!ok) {
    failures.push(`File mancante: ${file}`);
  }
}

console.log("");
console.log("--- Alias npm richiesti ---");

const packagePath = resolve(appDir, "package.json");
let packageJson = null;

try {
  packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
} catch (error) {
  failures.push(`package.json non leggibile: ${error.message}`);
}

for (const scriptName of requiredScripts) {
  const ok = Boolean(packageJson?.scripts?.[scriptName]);
  console.log(`${ok ? "✓" : "✗"} ${scriptName}`);

  if (!ok) {
    failures.push(`Alias npm mancante: ${scriptName}`);
  }
}

console.log("");
console.log("--- Contenuto runbook ---");

const runbookPath = resolve(repoRoot, "agri_app/OPERATIONS_RUNBOOK_V4_14.md");
let runbookText = "";

try {
  runbookText = readFileSync(runbookPath, "utf8");
} catch (error) {
  failures.push(`Runbook non leggibile: ${error.message}`);
}

for (const requiredText of requiredRunbookText) {
  const ok = runbookText.includes(requiredText);
  console.log(`${ok ? "✓" : "✗"} ${requiredText}`);

  if (!ok) {
    failures.push(`Testo richiesto mancante nel runbook: ${requiredText}`);
  }
}

console.log("");
console.log("--- Runbook check summary ---");

if (failures.length) {
  console.log(`Failures: ${failures.length}`);

  for (const failure of failures) {
    console.log(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Failures: 0");
console.log("");
console.log("Ops runbook check completato con successo.");
