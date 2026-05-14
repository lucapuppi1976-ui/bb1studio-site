#!/usr/bin/env node
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


import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const appDir = resolve(dirname(scriptFile), "..");
const repoRoot = resolve(appDir, "..");
const args = process.argv.slice(2);

function readArg(name, fallback = "") {
  const index = args.indexOf(name);

  if (index >= 0) {
    return args[index + 1] ?? "";
  }

  const prefix = `${name}=`;
  const inline = args.find((arg) => arg.startsWith(prefix));

  return inline ? inline.slice(prefix.length) : fallback;
}

function hasFlag(name) {
  return args.includes(name);
}

const baseUrl = readArg("--base", "https://bb1studio.com/agri_app").replace(/\/+$/, "");
const expectBranch = readArg("--expect-branch", "");
const includeProtected = hasFlag("--include-protected");
const secret = process.env.CRON_SECRET_VALUE || process.env.CRON_SECRET || "";

const redactionValues = [secret].filter((value) => typeof value === "string" && value.length > 0);

function redact(value) {
  let output = String(value);

  for (const secretValue of redactionValues) {
    output = output.split(secretValue).join("[REDACTED]");
  }

  output = output.replace(/([?&]secret=)[^&\s'"]+/g, "$1[REDACTED]");
  output = output.replace(/(--secret(?:=|\s+))[^&\s'"]+/g, "$1[REDACTED]");

  return output;
}

function print(value = "") {
  process.stdout.write(`${redact(value)}\n`);
}

function section(title) {
  print("");
  print(`--- ${title} ---`);
}

const results = [];

function runStep(label, command, commandArgs, options = {}) {
  section(label);

  const result = spawnSync(command, commandArgs, {
    cwd: options.cwd || appDir,
    encoding: "utf8",
    env: {
      ...process.env,
    },
    maxBuffer: 1024 * 1024 * 20,
  });

  if (result.stdout) {
    process.stdout.write(redact(result.stdout));
  }

  if (result.stderr) {
    process.stderr.write(redact(result.stderr));
  }

  const status = typeof result.status === "number" ? result.status : 1;
  const ok = status === 0;

  results.push({
    label,
    ok,
    status,
  });

  return ok;
}

async function protectedEmailStatusCheck() {
  section("Protected email status live");

  if (!secret) {
    print("ERRORE: per --include-protected impostare CRON_SECRET_VALUE oppure CRON_SECRET.");
    results.push({
      label: "Protected email status live",
      ok: false,
      status: 2,
    });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const url = new URL(`${baseUrl}/api/ops/email-status`);
    url.searchParams.set("secret", secret);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    const text = await response.text();

    let data = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = {
        raw: text,
      };
    }

    print(`HTTP status: ${response.status}`);

    const serialized = JSON.stringify(data, null, 2);
    print(serialized);

    const email = data?.email || data || {};
    const testSafety = data?.testSafety || {};
    const ok =
      response.ok &&
      data?.ok === true &&
      email.enabled === false &&
      (testSafety.canSendTestEmail === false || testSafety.canSendTestEmail === undefined);

    results.push({
      label: "Protected email status live",
      ok,
      status: ok ? 0 : response.status,
    });

    if (!ok) {
      print("ERRORE: protected email status live non conforme.");
    }
  } catch (error) {
    print(`ERRORE: protected email status live fallito: ${error.message}`);
    results.push({
      label: "Protected email status live",
      ok: false,
      status: 1,
    });
  } finally {
    clearTimeout(timeout);
  }
}

print("Agri App ops quick check operativo");
print(`Repo root: ${repoRoot}`);
print(`App dir: ${appDir}`);
print(`Base URL: ${baseUrl}`);
print(`Expected branch: ${expectBranch || "(non impostato)"}`);
print(`Protected checks: ${includeProtected ? "yes" : "no"}`);
print(`Secret configured: ${secret ? "yes" : "no"}`);

runStep("DB safety DEV", process.execPath, [
  "scripts/db-safety-check.mjs",
  "--expect=dev",
]);

runStep("Security strict", process.execPath, [
  "scripts/security-check.mjs",
  "--strict",
]);

runStep("Recurring quality DEV", process.execPath, [
  "scripts/recurring-quality-check.mjs",
  "--expect=dev",
]);

runStep("Ops labels check", process.execPath, [
  "scripts/ops-labels-check.mjs",
]);

runStep("Ops banner check", process.execPath, [
  "scripts/ops-banner-check.mjs",
]);

const releaseStatusArgs = [
  "scripts/release-status.mjs",
  "--strict",
  "--base",
  baseUrl,
];

if (expectBranch) {
  releaseStatusArgs.push("--expect-branch", expectBranch);
}

runStep("Release status live", process.execPath, releaseStatusArgs);

runStep("Ops log redaction check", process.execPath, [
  "scripts/ops-log-redaction-check.mjs",
  "--base",
  baseUrl,
]);

runStep("Ops runbook check", process.execPath, [
  "scripts/ops-runbook-check.mjs",
]);

runStep("Admin operations dynamic check", process.execPath, [
  "scripts/ops-admin-dynamic-check.mjs",
]);

runStep("Admin operations navigation check", process.execPath, [
  "scripts/ops-admin-navigation-check.mjs",
]);

runStep("Admin operations UX check", process.execPath, [
  "scripts/ops-admin-ux-check.mjs",
]);

runStep("Admin command palette check", process.execPath, [
  "scripts/ops-admin-command-palette-check.mjs",
]);

runStep("AI readiness check", process.execPath, [
  "scripts/ops-ai-readiness-check.mjs",
]);

runStep("AI photo intake check", process.execPath, [
  "scripts/ops-ai-photo-intake-check.mjs",
]);

runStep("AI diagnosis draft check", process.execPath, [
  "scripts/ops-ai-diagnosis-draft-check.mjs",
]);

runStep("AI action plan check", process.execPath, [
  "scripts/ops-ai-action-plan-check.mjs",
]);

runStep("AI human review workflow check", process.execPath, [
  "scripts/ops-ai-review-workflow-check.mjs",
]);

runStep("AI provider safety check", process.execPath, [
  "scripts/ops-ai-provider-safety-check.mjs",
]);

runStep("AI provider ops status check", process.execPath, [
  "scripts/ops-ai-provider-status-check.mjs",
]);

runStep("AI provider dry-run check", process.execPath, [
  "scripts/ops-ai-provider-dry-run-check.mjs",
]);

runStep("AI provider response contract check", process.execPath, [
  "scripts/ops-ai-provider-response-check.mjs",
]);

runStep("AI diagnosis pipeline dry-run check", process.execPath, [
  "scripts/ops-ai-pipeline-dry-run-check.mjs",
]);

runStep("AI photo quality gate check", process.execPath, [
  "scripts/ops-ai-photo-quality-gate-check.mjs",
]);

runStep("AI photo evidence bundle check", process.execPath, [
  "scripts/ops-ai-evidence-bundle-check.mjs",
]);

runStep("AI provider request preview check", process.execPath, [
  "scripts/ops-ai-provider-request-check.mjs",
]);

runStep("AI diagnosis orchestrator dry-run check", process.execPath, [
  "scripts/ops-ai-orchestrator-dry-run-check.mjs",
]);

runStep("AI diagnosis case file check", process.execPath, [
  "scripts/ops-ai-case-file-check.mjs",
]);

runStep("AI photo symptom annotation check", process.execPath, [
  "scripts/ops-ai-photo-annotation-check.mjs",
]);

runStep("AI differential diagnosis check", process.execPath, [
  "scripts/ops-ai-differential-diagnosis-check.mjs",
]);

runStep("AI solution playbook check", process.execPath, [
  "scripts/ops-ai-solution-playbook-check.mjs",
]);

runStep("AI case report check", process.execPath, [
  "scripts/ops-ai-case-report-check.mjs",
]);

runStep("AI decision dossier check", process.execPath, [
  "scripts/ops-ai-decision-dossier-check.mjs",
]);

runStep("AI work order preview check", process.execPath, [
  "scripts/ops-ai-work-order-preview-check.mjs",
]);

runStep("AI work order execution gate check", process.execPath, [
  "scripts/ops-ai-work-order-execution-gate-check.mjs",
]);

runStep("AI manual conversion audit check", process.execPath, [
  "scripts/ops-ai-manual-conversion-audit-check.mjs",
]);

runStep("AI case export bundle check", process.execPath, [
  "scripts/ops-ai-case-export-bundle-check.mjs",
]);

runStep("AI case export archive check", process.execPath, [
  "scripts/ops-ai-case-export-archive-check.mjs",
]);

runStep("AI field intelligence check", process.execPath, [
  "scripts/ops-ai-field-intelligence-check.mjs",
]);

runStep("AI temporal trend check", process.execPath, [
  "scripts/ops-ai-temporal-trend-check.mjs",
]);

runStep("AI field scouting plan check", process.execPath, [
  "scripts/ops-ai-field-scouting-plan-check.mjs",
]);

runStep("AI field risk heatmap check", process.execPath, [
  "scripts/ops-ai-field-risk-heatmap-check.mjs",
]);

runStep("AI follow-up scheduler check", process.execPath, [
  "scripts/ops-ai-follow-up-scheduler-check.mjs",
]);

runStep("AI intervention readiness check", process.execPath, [
  "scripts/ops-ai-intervention-readiness-check.mjs",
]);

runStep("AI intervention protocol check", process.execPath, [
  "scripts/ops-ai-intervention-protocol-check.mjs",
]);

runStep("AI farm command board check", process.execPath, [
  "scripts/ops-ai-farm-command-board-check.mjs",
]);

runStep("AI scouting mission check", process.execPath, [
  "scripts/ops-ai-scouting-mission-check.mjs",
]);

runStep("AI farm risk radar check", process.execPath, [
  "scripts/ops-ai-farm-risk-radar-check.mjs",
]);

runStep("AI intervention impact check", process.execPath, [
  "scripts/ops-ai-intervention-impact-check.mjs",
]);

runStep("AI response portfolio check", process.execPath, [
  "scripts/ops-ai-response-portfolio-check.mjs",
]);

runStep("AI case memory graph check", process.execPath, [
  "scripts/ops-ai-case-memory-graph-check.mjs",
]);

runStep("AI case memory retrieval check", process.execPath, [
  "scripts/ops-ai-case-memory-retrieval-check.mjs",
]);

runStep("AI case outcome learning check", process.execPath, [
  "scripts/ops-ai-case-outcome-learning-check.mjs",
]);

runStep("AI memory promotion governance check", process.execPath, [
  "scripts/ops-ai-memory-promotion-check.mjs",
]);

runStep("AI memory quality guard check", process.execPath, [
  "scripts/ops-ai-memory-quality-guard-check.mjs",
]);

runStep("Admin live routes check", process.execPath, [
  "scripts/ops-admin-live-routes-check.mjs",
  "--base",
  baseUrl,
]);

runStep("Admin route monitoring check", process.execPath, [
  "scripts/ops-admin-route-monitoring-check.mjs",
]);

if (includeProtected) {
  await protectedEmailStatusCheck();
}

print("");
print("--- Ops quick check summary ---");

for (const result of results) {
  print(`${result.ok ? "✓" : "✗"} ${result.label} (${result.status})`);
}

const failures = results.filter((result) => !result.ok);

if (failures.length) {
  print("");
  print(`Ops quick check fallito: ${failures.length} problemi.`);
  process.exit(1);
}

print("");
print("Ops quick check completato con successo.");
