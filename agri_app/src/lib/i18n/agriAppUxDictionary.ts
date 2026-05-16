import type { AgriAppLanguageCode } from "./agriAppLanguages";

export type AgriAppUxDictionaryKey =
  | "app.mode.controlledDryRun"
  | "app.action.startLiveUat"
  | "app.action.reviewEvidence"
  | "app.action.openPhotoDiagnosis"
  | "app.status.noAiLive"
  | "app.status.noWrite"
  | "app.status.humanReviewRequired"
  | "app.empty.noEvidence"
  | "app.error.generic"
  | "app.loading.default"
  | "tester.onboarding.title"
  | "tester.onboarding.description"
  | "tester.role.reviewer"
  | "tester.role.operator"
  | "tester.role.observer"
  | "admin.operations.title";

export type AgriAppUxDictionary = Record<AgriAppUxDictionaryKey, string>;

export const AGRI_APP_UX_DICTIONARY: Record<AgriAppLanguageCode, AgriAppUxDictionary> = {
  it: {
    "app.mode.controlledDryRun": "Modalità controllata dry-run",
    "app.action.startLiveUat": "Avvia test live controllato",
    "app.action.reviewEvidence": "Rivedi evidenze",
    "app.action.openPhotoDiagnosis": "Apri diagnosi foto",
    "app.status.noAiLive": "AI live disattivata",
    "app.status.noWrite": "Scritture operative disattivate",
    "app.status.humanReviewRequired": "Revisione umana obbligatoria",
    "app.empty.noEvidence": "Nessuna evidenza raccolta per ora.",
    "app.error.generic": "Si è verificato un errore. Riprova o contatta un reviewer.",
    "app.loading.default": "Caricamento in corso...",
    "tester.onboarding.title": "Benvenuto nel test UAT controllato",
    "tester.onboarding.description": "Puoi testare i flussi live senza attivare azioni reali.",
    "tester.role.reviewer": "Reviewer UAT",
    "tester.role.operator": "Operatore UAT",
    "tester.role.observer": "Osservatore UAT",
    "admin.operations.title": "Operazioni amministrative",
  },
  en: {
    "app.mode.controlledDryRun": "Controlled dry-run mode",
    "app.action.startLiveUat": "Start controlled live test",
    "app.action.reviewEvidence": "Review evidence",
    "app.action.openPhotoDiagnosis": "Open photo diagnosis",
    "app.status.noAiLive": "Live AI disabled",
    "app.status.noWrite": "Operational writes disabled",
    "app.status.humanReviewRequired": "Human review required",
    "app.empty.noEvidence": "No evidence collected yet.",
    "app.error.generic": "An error occurred. Try again or contact a reviewer.",
    "app.loading.default": "Loading...",
    "tester.onboarding.title": "Welcome to controlled UAT testing",
    "tester.onboarding.description": "You can test live flows without enabling real actions.",
    "tester.role.reviewer": "UAT reviewer",
    "tester.role.operator": "UAT operator",
    "tester.role.observer": "UAT observer",
    "admin.operations.title": "Admin operations",
  },
  es: {
    "app.mode.controlledDryRun": "Modo controlado dry-run",
    "app.action.startLiveUat": "Iniciar prueba live controlada",
    "app.action.reviewEvidence": "Revisar evidencias",
    "app.action.openPhotoDiagnosis": "Abrir diagnóstico de foto",
    "app.status.noAiLive": "IA live desactivada",
    "app.status.noWrite": "Escrituras operativas desactivadas",
    "app.status.humanReviewRequired": "Revisión humana obligatoria",
    "app.empty.noEvidence": "Aún no hay evidencias recopiladas.",
    "app.error.generic": "Se produjo un error. Inténtalo de nuevo o contacta con un reviewer.",
    "app.loading.default": "Cargando...",
    "tester.onboarding.title": "Bienvenido a la prueba UAT controlada",
    "tester.onboarding.description": "Puedes probar flujos live sin activar acciones reales.",
    "tester.role.reviewer": "Reviewer UAT",
    "tester.role.operator": "Operador UAT",
    "tester.role.observer": "Observador UAT",
    "admin.operations.title": "Operaciones administrativas",
  },
  fr: {
    "app.mode.controlledDryRun": "Mode dry-run contrôlé",
    "app.action.startLiveUat": "Démarrer le test live contrôlé",
    "app.action.reviewEvidence": "Examiner les preuves",
    "app.action.openPhotoDiagnosis": "Ouvrir le diagnostic photo",
    "app.status.noAiLive": "IA live désactivée",
    "app.status.noWrite": "Écritures opérationnelles désactivées",
    "app.status.humanReviewRequired": "Revue humaine obligatoire",
    "app.empty.noEvidence": "Aucune preuve collectée pour le moment.",
    "app.error.generic": "Une erreur est survenue. Réessayez ou contactez un reviewer.",
    "app.loading.default": "Chargement...",
    "tester.onboarding.title": "Bienvenue dans le test UAT contrôlé",
    "tester.onboarding.description": "Vous pouvez tester les flux live sans activer d’actions réelles.",
    "tester.role.reviewer": "Reviewer UAT",
    "tester.role.operator": "Opérateur UAT",
    "tester.role.observer": "Observateur UAT",
    "admin.operations.title": "Opérations admin",
  },
  de: {
    "app.mode.controlledDryRun": "Kontrollierter Dry-run-Modus",
    "app.action.startLiveUat": "Kontrollierten Live-Test starten",
    "app.action.reviewEvidence": "Nachweise prüfen",
    "app.action.openPhotoDiagnosis": "Fotodiagnose öffnen",
    "app.status.noAiLive": "Live-KI deaktiviert",
    "app.status.noWrite": "Operative Schreibvorgänge deaktiviert",
    "app.status.humanReviewRequired": "Menschliche Prüfung erforderlich",
    "app.empty.noEvidence": "Noch keine Nachweise erfasst.",
    "app.error.generic": "Ein Fehler ist aufgetreten. Versuche es erneut oder kontaktiere einen Reviewer.",
    "app.loading.default": "Wird geladen...",
    "tester.onboarding.title": "Willkommen beim kontrollierten UAT-Test",
    "tester.onboarding.description": "Du kannst Live-Flows testen, ohne echte Aktionen zu aktivieren.",
    "tester.role.reviewer": "UAT-Reviewer",
    "tester.role.operator": "UAT-Operator",
    "tester.role.observer": "UAT-Beobachter",
    "admin.operations.title": "Admin-Operationen",
  },
  pt: {
    "app.mode.controlledDryRun": "Modo dry-run controlado",
    "app.action.startLiveUat": "Iniciar teste live controlado",
    "app.action.reviewEvidence": "Rever evidências",
    "app.action.openPhotoDiagnosis": "Abrir diagnóstico por foto",
    "app.status.noAiLive": "IA live desativada",
    "app.status.noWrite": "Escritas operacionais desativadas",
    "app.status.humanReviewRequired": "Revisão humana obrigatória",
    "app.empty.noEvidence": "Ainda não há evidências recolhidas.",
    "app.error.generic": "Ocorreu um erro. Tente novamente ou contacte um reviewer.",
    "app.loading.default": "A carregar...",
    "tester.onboarding.title": "Bem-vindo ao teste UAT controlado",
    "tester.onboarding.description": "Pode testar fluxos live sem ativar ações reais.",
    "tester.role.reviewer": "Reviewer UAT",
    "tester.role.operator": "Operador UAT",
    "tester.role.observer": "Observador UAT",
    "admin.operations.title": "Operações administrativas",
  },
};

export const AGRI_APP_UX_DICTIONARY_KEYS: AgriAppUxDictionaryKey[] = [
  "app.mode.controlledDryRun",
  "app.action.startLiveUat",
  "app.action.reviewEvidence",
  "app.action.openPhotoDiagnosis",
  "app.status.noAiLive",
  "app.status.noWrite",
  "app.status.humanReviewRequired",
  "app.empty.noEvidence",
  "app.error.generic",
  "app.loading.default",
  "tester.onboarding.title",
  "tester.onboarding.description",
  "tester.role.reviewer",
  "tester.role.operator",
  "tester.role.observer",
  "admin.operations.title",
];

export function getAgriAppUxText(language: AgriAppLanguageCode, key: AgriAppUxDictionaryKey): string {
  return AGRI_APP_UX_DICTIONARY[language][key] ?? AGRI_APP_UX_DICTIONARY.it[key];
}
