import Link from "next/link";

import PhotoDiagnosisIntake from "./PhotoDiagnosisIntake";
import PhotoQualityGatePanel from "./PhotoQualityGatePanel";
import PhotoEvidenceBundleBuilder from "./PhotoEvidenceBundleBuilder";
import AiProviderRequestPreviewPanel from "./AiProviderRequestPreviewPanel";
import DiagnosisOrchestratorDryRunPanel from "./DiagnosisOrchestratorDryRunPanel";
import DiagnosisCaseFilePanel from "./DiagnosisCaseFilePanel";
import PhotoSymptomAnnotationPanel from "./PhotoSymptomAnnotationPanel";
import DifferentialDiagnosisPanel from "./DifferentialDiagnosisPanel";
import SolutionPlaybookPanel from "./SolutionPlaybookPanel";
import CaseReportPanel from "./CaseReportPanel";
import DecisionDossierPanel from "./DecisionDossierPanel";
import WorkOrderPreviewPanel from "./WorkOrderPreviewPanel";
import WorkOrderExecutionGatePanel from "./WorkOrderExecutionGatePanel";
import ManualConversionAuditPanel from "./ManualConversionAuditPanel";
import CaseExportBundlePanel from "./CaseExportBundlePanel";
import CaseExportArchivePanel from "./CaseExportArchivePanel";
import FieldIntelligencePanel from "./FieldIntelligencePanel";
import TemporalTrendPanel from "./TemporalTrendPanel";
import FieldScoutingPlanPanel from "./FieldScoutingPlanPanel";
import FieldRiskHeatmapPanel from "./FieldRiskHeatmapPanel";
import FollowUpSchedulerPanel from "./FollowUpSchedulerPanel";
import InterventionReadinessPanel from "./InterventionReadinessPanel";
import InterventionProtocolPanel from "./InterventionProtocolPanel";
import FarmCommandBoardPanel from "./FarmCommandBoardPanel";
import ScoutingMissionPlannerPanel from "./ScoutingMissionPlannerPanel";
import FarmRiskRadarPanel from "./FarmRiskRadarPanel";
import InterventionImpactRoiPanel from "./InterventionImpactRoiPanel";
import ResponsePortfolioOptimizerPanel from "./ResponsePortfolioOptimizerPanel";
import CaseMemoryGraphPanel from "./CaseMemoryGraphPanel";
import CaseMemoryRetrievalPanel from "./CaseMemoryRetrievalPanel";
import CaseOutcomeLearningPanel from "./CaseOutcomeLearningPanel";
import MemoryPromotionGovernancePanel from "./MemoryPromotionGovernancePanel";
import MemoryQualityGuardPanel from "./MemoryQualityGuardPanel";
import KnowledgeVaultGovernancePanel from "./KnowledgeVaultGovernancePanel";
import FieldAutopilotControlRoomPanel from "./FieldAutopilotControlRoomPanel";
import CropProtocolBuilderPanel from "./CropProtocolBuilderPanel";
import AgronomicBoardPackPanel from "./AgronomicBoardPackPanel";
import FarmDigitalTwinReadinessPanel from "./FarmDigitalTwinReadinessPanel";
import ClimateWaterStrategyPanel from "./ClimateWaterStrategyPanel";
import PestDiseaseOutbreakSentinelPanel from "./PestDiseaseOutbreakSentinelPanel";
import SoilNutrientStrategyPanel from "./SoilNutrientStrategyPanel";
import PhenologyYieldRiskPanel from "./PhenologyYieldRiskPanel";
import HarvestQualityReadinessPanel from "./HarvestQualityReadinessPanel";
import AgronomicControlTowerPanel from "./AgronomicControlTowerPanel";
import AgronomicExplainabilityLedgerPanel from "./AgronomicExplainabilityLedgerPanel";
import AgronomicCompliancePassportPanel from "./AgronomicCompliancePassportPanel";
import AgronomicDecisionAssurancePanel from "./AgronomicDecisionAssurancePanel";
import AgronomicScenarioStressTestPanel from "./AgronomicScenarioStressTestPanel";
import AgronomicImprovementScorecardPanel from "./AgronomicImprovementScorecardPanel";
import ProviderActivationFirewallPanel from "./ProviderActivationFirewallPanel";
import ProviderRequestSandboxPanel from "./ProviderRequestSandboxPanel";
import ProviderResponseFirewallPanel from "./ProviderResponseFirewallPanel";
import ProviderShadowEvaluationPanel from "./ProviderShadowEvaluationPanel";
import ProviderCanaryRolloutPanel from "./ProviderCanaryRolloutPanel";
import ProviderObservabilityDrillPanel from "./ProviderObservabilityDrillPanel";
import ProviderSafeEnablementGatePanel from "./ProviderSafeEnablementGatePanel";
import ProviderRuntimeAdapterContractPanel from "./ProviderRuntimeAdapterContractPanel";
import ProviderFinalReadinessAuditPanel from "./ProviderFinalReadinessAuditPanel";
import HumanReviewMissionControlPanel from "./HumanReviewMissionControlPanel";
import ReviewerConsensusCalibrationPanel from "./ReviewerConsensusCalibrationPanel";
import EvidenceIntegrityCustodyPanel from "./EvidenceIntegrityCustodyPanel";
import ReviewerRationaleLedgerPanel from "./ReviewerRationaleLedgerPanel";
import HumanReviewBoardPackPanel from "./HumanReviewBoardPackPanel";
import HumanReviewQualityAssurancePanel from "./HumanReviewQualityAssurancePanel";

export default function AiPhotoDiagnosisPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Premium
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Diagnosi fotografica AI</h1>
        <p className="max-w-3xl text-muted-foreground">
          Primo intake controllato per riconoscimento foto, identificazione problemi e proposta
          soluzioni. In questa release l’analisi AI non è ancora attiva.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted" href="/admin/operations">
            Operations Center
          </Link>
          <Link className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted" href="/admin">
            Admin Hub
          </Link>
        </div>
      </header>

      <PhotoDiagnosisIntake />
      <PhotoQualityGatePanel />
      <PhotoEvidenceBundleBuilder />
      <AiProviderRequestPreviewPanel />
      <DiagnosisOrchestratorDryRunPanel />
      <DiagnosisCaseFilePanel />
      <PhotoSymptomAnnotationPanel />
      <DifferentialDiagnosisPanel />
      <SolutionPlaybookPanel />
      <CaseReportPanel />
      <DecisionDossierPanel />
      <WorkOrderPreviewPanel />
      <WorkOrderExecutionGatePanel />
      <ManualConversionAuditPanel />
      <CaseExportBundlePanel />
      <CaseExportArchivePanel />
      <FieldIntelligencePanel />
      <TemporalTrendPanel />
      <FieldScoutingPlanPanel />
      <FieldRiskHeatmapPanel />
      <FollowUpSchedulerPanel />
      <InterventionReadinessPanel />
      <InterventionProtocolPanel />
      <FarmCommandBoardPanel />
      <ScoutingMissionPlannerPanel />
      <FarmRiskRadarPanel />
      <InterventionImpactRoiPanel />
      <ResponsePortfolioOptimizerPanel />
      <CaseMemoryGraphPanel />
      <CaseMemoryRetrievalPanel />
      <CaseOutcomeLearningPanel />
      <MemoryPromotionGovernancePanel />
      <MemoryQualityGuardPanel />

      <KnowledgeVaultGovernancePanel />

      <FieldAutopilotControlRoomPanel />

      <CropProtocolBuilderPanel />

      <AgronomicBoardPackPanel />

      <FarmDigitalTwinReadinessPanel />

      <ClimateWaterStrategyPanel />

      <PestDiseaseOutbreakSentinelPanel />

      <SoilNutrientStrategyPanel />

      <PhenologyYieldRiskPanel />

      <HarvestQualityReadinessPanel />

      <AgronomicControlTowerPanel />

      <AgronomicExplainabilityLedgerPanel />

      <AgronomicCompliancePassportPanel />

      <AgronomicDecisionAssurancePanel />

      <AgronomicScenarioStressTestPanel />

      <AgronomicImprovementScorecardPanel />

      <ProviderActivationFirewallPanel />

      <ProviderRequestSandboxPanel />

      <ProviderResponseFirewallPanel />

      <ProviderShadowEvaluationPanel />

      <ProviderCanaryRolloutPanel />

      <ProviderObservabilityDrillPanel />

      <ProviderSafeEnablementGatePanel />

      <ProviderRuntimeAdapterContractPanel />

      <ProviderFinalReadinessAuditPanel />

      <HumanReviewMissionControlPanel />

      <ReviewerConsensusCalibrationPanel />

      <EvidenceIntegrityCustodyPanel />

      <ReviewerRationaleLedgerPanel />

      <HumanReviewBoardPackPanel />

      <HumanReviewQualityAssurancePanel />
</main>
  );
}
