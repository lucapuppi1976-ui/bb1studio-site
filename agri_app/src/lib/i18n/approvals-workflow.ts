import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";

type StatusKey = "ALL" | "PENDING" | "APPROVED" | "REJECTED";

type ApprovalsWorkflowCopy = {
  page: {
    title: string;
    eyebrow: string;
    description: string;
  };
  stats: {
    total: string;
    pending: string;
    approved: string;
    rejected: string;
  };
  filters: Record<StatusKey, string>;
  fields: {
    plant: string;
    activity: string;
    interventionType: string;
    proposedBy: string;
    reviewedBy: string;
    proposedFor: string;
    createdAt: string;
    status: string;
    notes: string;
  };
  actions: {
    approve: string;
    reject: string;
    openActivity: string;
    openPlant: string;
    sendProposal: string;
  };
  propose: {
    title: string;
    eyebrow: string;
    description: string;
    helpTitle: string;
    helpText: string;
  };
  empty: {
    all: string;
    pending: string;
    approved: string;
    rejected: string;
    notes: string;
  };
  statuses: Record<"PENDING" | "APPROVED" | "REJECTED", string>;
  notifications: {
    proposalMissing: string;
    taskMissing: string;
    proposerMissing: string;
    approvedTitle: string;
    rejectedTitle: string;
    approvedMessage: (title: string) => string;
    rejectedMessage: (title: string) => string;
  };
};

const approvalsWorkflow: Record<Locale, ApprovalsWorkflowCopy> = {
  it: {
    page: { title: "Approvazioni", eyebrow: "Proposte operative", description: "Controlla le proposte inviate dagli operatori e trasformale in attività quando sono approvate." },
    stats: { total: "Totali", pending: "Da valutare", approved: "Approvate", rejected: "Rifiutate" },
    filters: { ALL: "Tutte", PENDING: "Da valutare", APPROVED: "Approvate", REJECTED: "Rifiutate" },
    fields: { plant: "Pianta", activity: "Attività collegata", interventionType: "Tipo intervento", proposedBy: "Proposta da", reviewedBy: "Valutata da", proposedFor: "Data proposta", createdAt: "Invio", status: "Stato", notes: "Note" },
    actions: { approve: "Approva", reject: "Rifiuta", openActivity: "Apri attività", openPlant: "Apri pianta", sendProposal: "Invia proposta" },
    propose: { title: "Proponi un seguito", eyebrow: "Nuova proposta", description: "Usa questo modulo quando l’attività richiede un intervento o un controllo successivo.", helpTitle: "Cosa succede dopo", helpText: "La proposta va in approvazione. Un amministratore potrà approvarla e creare una nuova attività, oppure rifiutarla." },
    empty: { all: "Non ci sono proposte da mostrare.", pending: "Nessuna proposta da valutare.", approved: "Nessuna proposta approvata.", rejected: "Nessuna proposta rifiutata.", notes: "Nessuna nota." },
    statuses: { PENDING: "Da valutare", APPROVED: "Approvata", REJECTED: "Rifiutata" },
    notifications: { proposalMissing: "Proposta non trovata.", taskMissing: "Attività non trovata.", proposerMissing: "Utente proponente mancante.", approvedTitle: "Proposta approvata", rejectedTitle: "Proposta rifiutata", approvedMessage: (title) => `La proposta “${title}” è stata approvata.`, rejectedMessage: (title) => `La proposta “${title}” è stata rifiutata.` },
  },
  es: {
    page: { title: "Aprobaciones", eyebrow: "Propuestas operativas", description: "Revisa las propuestas enviadas por los operadores y conviértelas en tareas cuando se aprueben." },
    stats: { total: "Totales", pending: "Por revisar", approved: "Aprobadas", rejected: "Rechazadas" },
    filters: { ALL: "Todas", PENDING: "Por revisar", APPROVED: "Aprobadas", REJECTED: "Rechazadas" },
    fields: { plant: "Planta", activity: "Tarea relacionada", interventionType: "Tipo de intervención", proposedBy: "Propuesta por", reviewedBy: "Revisada por", proposedFor: "Fecha propuesta", createdAt: "Enviada", status: "Estado", notes: "Notas" },
    actions: { approve: "Aprobar", reject: "Rechazar", openActivity: "Abrir tarea", openPlant: "Abrir planta", sendProposal: "Enviar propuesta" },
    propose: { title: "Proponer seguimiento", eyebrow: "Nueva propuesta", description: "Usa este formulario cuando la tarea necesite una intervención o revisión posterior.", helpTitle: "Qué ocurre después", helpText: "La propuesta queda pendiente de aprobación. Un administrador podrá aprobarla y crear una nueva tarea, o rechazarla." },
    empty: { all: "No hay propuestas para mostrar.", pending: "No hay propuestas por revisar.", approved: "No hay propuestas aprobadas.", rejected: "No hay propuestas rechazadas.", notes: "Sin notas." },
    statuses: { PENDING: "Por revisar", APPROVED: "Aprobada", REJECTED: "Rechazada" },
    notifications: { proposalMissing: "Propuesta no encontrada.", taskMissing: "Tarea no encontrada.", proposerMissing: "Falta el usuario que propone.", approvedTitle: "Propuesta aprobada", rejectedTitle: "Propuesta rechazada", approvedMessage: (title) => `La propuesta “${title}” ha sido aprobada.`, rejectedMessage: (title) => `La propuesta “${title}” ha sido rechazada.` },
  },
  en: {
    page: { title: "Approvals", eyebrow: "Operational proposals", description: "Review proposals sent by operators and turn them into tasks when approved." },
    stats: { total: "Total", pending: "To review", approved: "Approved", rejected: "Rejected" },
    filters: { ALL: "All", PENDING: "To review", APPROVED: "Approved", REJECTED: "Rejected" },
    fields: { plant: "Plant", activity: "Related task", interventionType: "Intervention type", proposedBy: "Proposed by", reviewedBy: "Reviewed by", proposedFor: "Proposed date", createdAt: "Sent", status: "Status", notes: "Notes" },
    actions: { approve: "Approve", reject: "Reject", openActivity: "Open task", openPlant: "Open plant", sendProposal: "Send proposal" },
    propose: { title: "Propose follow-up", eyebrow: "New proposal", description: "Use this form when the task needs a follow-up intervention or check.", helpTitle: "What happens next", helpText: "The proposal is sent for approval. An administrator can approve it and create a new task, or reject it." },
    empty: { all: "There are no proposals to show.", pending: "There are no proposals to review.", approved: "There are no approved proposals.", rejected: "There are no rejected proposals.", notes: "No notes." },
    statuses: { PENDING: "To review", APPROVED: "Approved", REJECTED: "Rejected" },
    notifications: { proposalMissing: "Proposal not found.", taskMissing: "Task not found.", proposerMissing: "Missing proposer user.", approvedTitle: "Proposal approved", rejectedTitle: "Proposal rejected", approvedMessage: (title) => `The proposal “${title}” has been approved.`, rejectedMessage: (title) => `The proposal “${title}” has been rejected.` },
  },
  sk: {
    page: { title: "Schvaľovanie", eyebrow: "Prevádzkové návrhy", description: "Skontrolujte návrhy od operátorov a po schválení ich premeňte na úlohy." },
    stats: { total: "Spolu", pending: "Na kontrolu", approved: "Schválené", rejected: "Zamietnuté" },
    filters: { ALL: "Všetky", PENDING: "Na kontrolu", APPROVED: "Schválené", REJECTED: "Zamietnuté" },
    fields: { plant: "Rastlina", activity: "Súvisiaca úloha", interventionType: "Typ zásahu", proposedBy: "Navrhol", reviewedBy: "Skontroloval", proposedFor: "Navrhovaný dátum", createdAt: "Odoslané", status: "Stav", notes: "Poznámky" },
    actions: { approve: "Schváliť", reject: "Zamietnuť", openActivity: "Otvoriť úlohu", openPlant: "Otvoriť rastlinu", sendProposal: "Odoslať návrh" },
    propose: { title: "Navrhnúť pokračovanie", eyebrow: "Nový návrh", description: "Použite tento formulár, keď úloha potrebuje následný zásah alebo kontrolu.", helpTitle: "Čo sa stane potom", helpText: "Návrh pôjde na schválenie. Administrátor ho môže schváliť a vytvoriť novú úlohu, alebo zamietnuť." },
    empty: { all: "Nie sú žiadne návrhy na zobrazenie.", pending: "Nie sú žiadne návrhy na kontrolu.", approved: "Nie sú žiadne schválené návrhy.", rejected: "Nie sú žiadne zamietnuté návrhy.", notes: "Žiadne poznámky." },
    statuses: { PENDING: "Na kontrolu", APPROVED: "Schválené", REJECTED: "Zamietnuté" },
    notifications: { proposalMissing: "Návrh sa nenašiel.", taskMissing: "Úloha sa nenašla.", proposerMissing: "Chýba navrhujúci používateľ.", approvedTitle: "Návrh schválený", rejectedTitle: "Návrh zamietnutý", approvedMessage: (title) => `Návrh „${title}“ bol schválený.`, rejectedMessage: (title) => `Návrh „${title}“ bol zamietnutý.` },
  },
  fr: {
    page: { title: "Validations", eyebrow: "Propositions opérationnelles", description: "Vérifiez les propositions envoyées par les opérateurs et transformez-les en tâches lorsqu’elles sont validées." },
    stats: { total: "Total", pending: "À vérifier", approved: "Validées", rejected: "Refusées" },
    filters: { ALL: "Toutes", PENDING: "À vérifier", APPROVED: "Validées", REJECTED: "Refusées" },
    fields: { plant: "Plante", activity: "Tâche liée", interventionType: "Type d’intervention", proposedBy: "Proposée par", reviewedBy: "Vérifiée par", proposedFor: "Date proposée", createdAt: "Envoyée", status: "Statut", notes: "Notes" },
    actions: { approve: "Valider", reject: "Refuser", openActivity: "Ouvrir la tâche", openPlant: "Ouvrir la plante", sendProposal: "Envoyer la proposition" },
    propose: { title: "Proposer une suite", eyebrow: "Nouvelle proposition", description: "Utilisez ce formulaire lorsqu’une tâche nécessite une intervention ou un contrôle ultérieur.", helpTitle: "Et ensuite", helpText: "La proposition est envoyée pour validation. Un administrateur peut la valider et créer une nouvelle tâche, ou la refuser." },
    empty: { all: "Aucune proposition à afficher.", pending: "Aucune proposition à vérifier.", approved: "Aucune proposition validée.", rejected: "Aucune proposition refusée.", notes: "Aucune note." },
    statuses: { PENDING: "À vérifier", APPROVED: "Validée", REJECTED: "Refusée" },
    notifications: { proposalMissing: "Proposition introuvable.", taskMissing: "Tâche introuvable.", proposerMissing: "Utilisateur proposant manquant.", approvedTitle: "Proposition validée", rejectedTitle: "Proposition refusée", approvedMessage: (title) => `La proposition « ${title} » a été validée.`, rejectedMessage: (title) => `La proposition « ${title} » a été refusée.` },
  },
  de: {
    page: { title: "Freigaben", eyebrow: "Operative Vorschläge", description: "Prüfen Sie Vorschläge von Operatoren und wandeln Sie sie nach Freigabe in Aufgaben um." },
    stats: { total: "Gesamt", pending: "Zu prüfen", approved: "Freigegeben", rejected: "Abgelehnt" },
    filters: { ALL: "Alle", PENDING: "Zu prüfen", APPROVED: "Freigegeben", REJECTED: "Abgelehnt" },
    fields: { plant: "Pflanze", activity: "Verknüpfte Aufgabe", interventionType: "Interventionstyp", proposedBy: "Vorgeschlagen von", reviewedBy: "Geprüft von", proposedFor: "Vorgeschlagenes Datum", createdAt: "Gesendet", status: "Status", notes: "Notizen" },
    actions: { approve: "Freigeben", reject: "Ablehnen", openActivity: "Aufgabe öffnen", openPlant: "Pflanze öffnen", sendProposal: "Vorschlag senden" },
    propose: { title: "Folgeaktion vorschlagen", eyebrow: "Neuer Vorschlag", description: "Nutzen Sie dieses Formular, wenn die Aufgabe eine Folgeintervention oder Prüfung braucht.", helpTitle: "Was danach passiert", helpText: "Der Vorschlag wird zur Freigabe gesendet. Ein Administrator kann ihn freigeben und eine neue Aufgabe erstellen oder ablehnen." },
    empty: { all: "Keine Vorschläge zum Anzeigen.", pending: "Keine Vorschläge zur Prüfung.", approved: "Keine freigegebenen Vorschläge.", rejected: "Keine abgelehnten Vorschläge.", notes: "Keine Notizen." },
    statuses: { PENDING: "Zu prüfen", APPROVED: "Freigegeben", REJECTED: "Abgelehnt" },
    notifications: { proposalMissing: "Vorschlag nicht gefunden.", taskMissing: "Aufgabe nicht gefunden.", proposerMissing: "Vorschlagender Benutzer fehlt.", approvedTitle: "Vorschlag freigegeben", rejectedTitle: "Vorschlag abgelehnt", approvedMessage: (title) => `Der Vorschlag „${title}“ wurde freigegeben.`, rejectedMessage: (title) => `Der Vorschlag „${title}“ wurde abgelehnt.` },
  },
  ru: {
    page: { title: "Согласования", eyebrow: "Рабочие предложения", description: "Проверяйте предложения операторов и превращайте их в задачи после одобрения." },
    stats: { total: "Всего", pending: "На проверке", approved: "Одобрены", rejected: "Отклонены" },
    filters: { ALL: "Все", PENDING: "На проверке", APPROVED: "Одобрены", REJECTED: "Отклонены" },
    fields: { plant: "Растение", activity: "Связанная задача", interventionType: "Тип вмешательства", proposedBy: "Предложил", reviewedBy: "Проверил", proposedFor: "Предложенная дата", createdAt: "Отправлено", status: "Статус", notes: "Заметки" },
    actions: { approve: "Одобрить", reject: "Отклонить", openActivity: "Открыть задачу", openPlant: "Открыть растение", sendProposal: "Отправить предложение" },
    propose: { title: "Предложить продолжение", eyebrow: "Новое предложение", description: "Используйте форму, если задаче нужен следующий шаг, вмешательство или проверка.", helpTitle: "Что будет дальше", helpText: "Предложение отправляется на согласование. Администратор может одобрить его и создать новую задачу или отклонить." },
    empty: { all: "Нет предложений для отображения.", pending: "Нет предложений на проверке.", approved: "Нет одобренных предложений.", rejected: "Нет отклонённых предложений.", notes: "Нет заметок." },
    statuses: { PENDING: "На проверке", APPROVED: "Одобрено", REJECTED: "Отклонено" },
    notifications: { proposalMissing: "Предложение не найдено.", taskMissing: "Задача не найдена.", proposerMissing: "Не указан пользователь, отправивший предложение.", approvedTitle: "Предложение одобрено", rejectedTitle: "Предложение отклонено", approvedMessage: (title) => `Предложение «${title}» одобрено.`, rejectedMessage: (title) => `Предложение «${title}» отклонено.` },
  },
  hu: {
    page: { title: "Jóváhagyások", eyebrow: "Operatív javaslatok", description: "Ellenőrizd az operátorok javaslatait, és jóváhagyás után alakítsd őket feladattá." },
    stats: { total: "Összes", pending: "Ellenőrzésre vár", approved: "Jóváhagyva", rejected: "Elutasítva" },
    filters: { ALL: "Mind", PENDING: "Ellenőrzésre vár", APPROVED: "Jóváhagyva", REJECTED: "Elutasítva" },
    fields: { plant: "Növény", activity: "Kapcsolódó feladat", interventionType: "Beavatkozás típusa", proposedBy: "Javasolta", reviewedBy: "Ellenőrizte", proposedFor: "Javasolt dátum", createdAt: "Elküldve", status: "Állapot", notes: "Jegyzetek" },
    actions: { approve: "Jóváhagyás", reject: "Elutasítás", openActivity: "Feladat megnyitása", openPlant: "Növény megnyitása", sendProposal: "Javaslat küldése" },
    propose: { title: "Folytatás javaslata", eyebrow: "Új javaslat", description: "Használd ezt az űrlapot, ha a feladat további beavatkozást vagy ellenőrzést igényel.", helpTitle: "Mi történik ezután", helpText: "A javaslat jóváhagyásra kerül. Egy adminisztrátor jóváhagyhatja és új feladatot hozhat létre, vagy elutasíthatja." },
    empty: { all: "Nincs megjeleníthető javaslat.", pending: "Nincs ellenőrzésre váró javaslat.", approved: "Nincs jóváhagyott javaslat.", rejected: "Nincs elutasított javaslat.", notes: "Nincs jegyzet." },
    statuses: { PENDING: "Ellenőrzésre vár", APPROVED: "Jóváhagyva", REJECTED: "Elutasítva" },
    notifications: { proposalMissing: "A javaslat nem található.", taskMissing: "A feladat nem található.", proposerMissing: "Hiányzik a javaslatot küldő felhasználó.", approvedTitle: "Javaslat jóváhagyva", rejectedTitle: "Javaslat elutasítva", approvedMessage: (title) => `A(z) „${title}” javaslat jóvá lett hagyva.`, rejectedMessage: (title) => `A(z) „${title}” javaslat el lett utasítva.` },
  },
};

export type ApprovalStatusFilter = keyof ApprovalsWorkflowCopy["statuses"] | "ALL";

export function getApprovalsWorkflowText(locale: Locale = DEFAULT_LOCALE) {
  return approvalsWorkflow[locale] ?? approvalsWorkflow[DEFAULT_LOCALE];
}

export function formatProposalStatus(status: string | null | undefined, locale: Locale = DEFAULT_LOCALE) {
  if (!status) return "—";
  const copy = getApprovalsWorkflowText(locale);
  return copy.statuses[status as keyof typeof copy.statuses] ?? status;
}
