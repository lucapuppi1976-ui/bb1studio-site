export type OfflineOperationKind = "CREATE_INTERVENTION";

export type CreateInterventionPayload = {
  plantId: string;
  type: string;
  title: string;
  description?: string | null;
  scheduledDate?: string | null;
  completedAt?: string | null;
  operatorName?: string | null;
  beforeImageUrl?: string | null;
  afterImageUrl?: string | null;
  waterLiters?: number | null;
  productName?: string | null;
  dosage?: string | null;
  heightCm?: number | null;
  notes?: string | null;
};

export type OfflineQueueStatus = "pending" | "processing" | "failed";

export type OfflineQueueItem = {
  id: string;
  kind: OfflineOperationKind;
  status: OfflineQueueStatus;
  retries: number;
  createdAt: string;
  lastError?: string | null;
  payload: CreateInterventionPayload;
};
