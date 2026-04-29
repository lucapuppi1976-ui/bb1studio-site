import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";

export const PRIORITY_OPTIONS = ["MANDATORY", "RECOMMENDED"] as const;
export const TASK_STATUS_OPTIONS = ["SCHEDULED", "NOTIFIED", "DONE", "SKIPPED", "EXPIRED"] as const;
export const PLANT_TYPE_OPTIONS = ["PLANT", "TREE"] as const;
export const ENVIRONMENT_OPTIONS = ["INDOOR", "OUTDOOR"] as const;
export const PLANT_STATUS_OPTIONS = ["ACTIVE", "ARCHIVED", "REMOVED"] as const;
export const INTERVENTION_TYPE_OPTIONS = [
  "IRRIGATION",
  "PRUNING",
  "FERTILIZATION",
  "PHYTOSANITARY",
  "MEASUREMENT",
  "TRANSPLANT",
  "HARVEST",
  "OTHER",
] as const;
export const RECURRENCE_OPTIONS = ["DAILY", "WEEKLY", "EVERY_X_DAYS"] as const;

type OperationalCopy = {
  fields: Record<string, string>;
  actions: Record<string, string>;
  sections: Record<string, string>;
  messages: Record<string, string>;
  pages: Record<string, string>;
  queue: {
    total: string;
    pending: string;
    failed: string;
    plantId: string;
    statuses: Record<string, string>;
    operations: Record<string, string>;
  };
  proposalStatuses: Record<string, string>;
};

const operational: Record<Locale, OperationalCopy> = {
  it: {
    fields: {
      code: "Codice",
      name: "Nome",
      title: "Titolo",
      type: "Tipo",
      environment: "Ambiente",
      species: "Specie",
      variety: "Varietà",
      sowingDate: "Data di semina",
      germinationDate: "Data di germinazione",
      transplantDate: "Data di trapianto",
      potSize: "Vaso (L)",
      substrate: "Substrato",
      height: "Altezza (cm)",
      diameter: "Diametro (mm)",
      zone: "Zona",
      latitude: "Latitudine",
      longitude: "Longitudine",
      status: "Stato",
      notes: "Note",
      description: "Descrizione",
      dueDate: "Scadenza",
      priority: "Priorità",
      assignTo: "Assegna a",
      scheduledDate: "Data pianificata",
      completedDate: "Data completamento",
      operator: "Operatore",
      waterLiters: "Litri acqua",
      productName: "Prodotto",
      dosage: "Dosaggio",
      beforePhoto: "Foto prima",
      afterPhoto: "Foto dopo",
      proposalTitle: "Titolo proposta",
      interventionType: "Tipo intervento",
      proposedDate: "Data proposta",
      recurrenceType: "Frequenza",
      everyXDays: "Intervallo in giorni",
      firstDate: "Prima data",
    },
    actions: {
      createPlant: "Crea pianta",
      createTask: "Crea attività",
      createIntervention: "Crea intervento",
      createSchedule: "Crea programmazione",
      saveChanges: "Salva modifiche",
      sendProposal: "Invia proposta",
      markCompleted: "Segna completata",
      proposeFollowUp: "Proponi seguito",
      edit: "Modifica",
      viewAll: "Vedi tutti",
      newIntervention: "Nuovo intervento",
      offlineIntervention: "Intervento senza rete",
      newTask: "Nuova attività",
      recurringSchedule: "Programmazione",
      newSchedule: "Nuova programmazione",
      qr: "QR",
      saveOffline: "Salva in coda",
      saving: "Salvataggio…",
      syncNow: "Sincronizza ora",
      syncing: "Sincronizzazione…",
    },
    sections: {
      identity: "Dati della pianta",
      notes: "Note",
      interventions: "Interventi",
      tasks: "Attività",
      schedules: "Programmazioni",
      mainData: "Dati principali",
      images: "Immagini",
      linkedProposals: "Proposte collegate",
      baseData: "Dati base",
      recurrence: "Frequenza",
      assignment: "Assegnazione",
    },
    messages: {
      none: "—",
      notAssigned: "Non assegnato",
      noNotes: "Nessuna nota.",
      noInterventions: "Nessun intervento registrato.",
      noTasksForPlant: "Nessuna attività per questa pianta.",
      noSchedulesForPlant: "Nessuna programmazione per questa pianta.",
      noProposals: "Nessuna proposta.",
      noBeforePhoto: "Nessuna foto prima",
      noAfterPhoto: "Nessuna foto dopo",
      everyXDaysHelp: "Da usare solo se scegli un intervallo personalizzato",
      offlineSaved: "Intervento salvato in coda. Verrà sincronizzato appena torna la rete.",
      offlineSynced: "Intervento sincronizzato correttamente.",
      saveError: "Errore durante il salvataggio.",
      queueEmpty: "Nessuna operazione in attesa.",
      syncDone: "Sincronizzazione completata.",
      syncError: "Errore durante la sincronizzazione.",
      sent: "Inviati",
      failed: "Falliti",
      publicQrUrl: "URL pubblico QR",
    },
    pages: {
      newPlant: "Nuova pianta",
      editPlant: "Modifica pianta",
      newTask: "Nuova attività",
      editTask: "Modifica attività",
      taskDetails: "Dettagli attività",
      proposeFollowUp: "Proponi seguito",
      newIntervention: "Nuovo intervento",
      editIntervention: "Modifica intervento",
      interventionDetails: "Dettagli intervento",
      newOfflineIntervention: "Nuovo intervento senza rete",
      newSchedule: "Nuova programmazione",
      offlineTitle: "Modalità senza rete",
      offlineEyebrow: "Lavoro locale",
      offlineBody: "Sei senza rete. Puoi continuare a registrare alcuni dati: li sincronizzeremo appena la connessione torna disponibile.",
      offlineSyncTitle: "Lavoro senza rete",
      offlineSyncEyebrow: "Operazioni in attesa",
      homeSummary: "Riepilogo",
      homeTasksDescription: "Agenda giornaliera, approvazioni e avvisi dentro l’app.",
    },
    queue: {
      total: "Totale",
      pending: "In attesa",
      failed: "Fallite",
      plantId: "Pianta",
      statuses: { pending: "In attesa", processing: "In corso", failed: "Fallita" },
      operations: { CREATE_INTERVENTION: "Intervento da sincronizzare" },
    },
    proposalStatuses: { PENDING: "In attesa", APPROVED: "Approvata", REJECTED: "Rifiutata" },
  },
  es: {
    fields: {
      code: "Código", name: "Nombre", title: "Título", type: "Tipo", environment: "Ambiente", species: "Especie", variety: "Variedad", sowingDate: "Fecha de siembra", germinationDate: "Fecha de germinación", transplantDate: "Fecha de trasplante", potSize: "Maceta (L)", substrate: "Sustrato", height: "Altura (cm)", diameter: "Diámetro (mm)", zone: "Zona", latitude: "Latitud", longitude: "Longitud", status: "Estado", notes: "Notas", description: "Descripción", dueDate: "Vencimiento", priority: "Prioridad", assignTo: "Asignar a", scheduledDate: "Fecha planificada", completedDate: "Fecha de finalización", operator: "Operador", waterLiters: "Litros de agua", productName: "Producto", dosage: "Dosis", beforePhoto: "Foto antes", afterPhoto: "Foto después", proposalTitle: "Título de la propuesta", interventionType: "Tipo de intervención", proposedDate: "Fecha propuesta", recurrenceType: "Frecuencia", everyXDays: "Intervalo en días", firstDate: "Primera fecha",
    },
    actions: { createPlant: "Crear planta", createTask: "Crear tarea", createIntervention: "Crear intervención", createSchedule: "Crear programación", saveChanges: "Guardar cambios", sendProposal: "Enviar propuesta", markCompleted: "Marcar como completada", proposeFollowUp: "Proponer seguimiento", edit: "Editar", viewAll: "Ver todo", newIntervention: "Nueva intervención", offlineIntervention: "Intervención sin conexión", newTask: "Nueva tarea", recurringSchedule: "Programación", newSchedule: "Nueva programación", qr: "QR", saveOffline: "Guardar en cola", saving: "Guardando…", syncNow: "Sincronizar ahora", syncing: "Sincronizando…" },
    sections: { identity: "Datos de la planta", notes: "Notas", interventions: "Intervenciones", tasks: "Tareas", schedules: "Programaciones", mainData: "Datos principales", images: "Imágenes", linkedProposals: "Propuestas relacionadas", baseData: "Datos base", recurrence: "Frecuencia", assignment: "Asignación" },
    messages: { none: "—", notAssigned: "Sin responsable", noNotes: "No hay notas.", noInterventions: "No hay intervenciones registradas.", noTasksForPlant: "No hay tareas para esta planta.", noSchedulesForPlant: "No hay programaciones para esta planta.", noProposals: "No hay propuestas.", noBeforePhoto: "No hay foto anterior", noAfterPhoto: "No hay foto posterior", everyXDaysHelp: "Úsalo solo si eliges un intervalo personalizado", offlineSaved: "Intervención guardada en cola. Se sincronizará cuando vuelva la conexión.", offlineSynced: "Intervención sincronizada correctamente.", saveError: "Error al guardar.", queueEmpty: "No hay operaciones pendientes.", syncDone: "Sincronización completada.", syncError: "Error durante la sincronización.", sent: "Enviados", failed: "Fallidos", publicQrUrl: "URL pública QR" },
    pages: { newPlant: "Nueva planta", editPlant: "Editar planta", newTask: "Nueva tarea", editTask: "Editar tarea", taskDetails: "Detalles de la tarea", proposeFollowUp: "Proponer seguimiento", newIntervention: "Nueva intervención", editIntervention: "Editar intervención", interventionDetails: "Detalles de la intervención", newOfflineIntervention: "Nueva intervención sin conexión", newSchedule: "Nueva programación", offlineTitle: "Modo sin conexión", offlineEyebrow: "Trabajo local", offlineBody: "Estás sin conexión. Puedes seguir registrando algunos datos; los sincronizaremos cuando vuelva internet.", offlineSyncTitle: "Trabajo sin conexión", offlineSyncEyebrow: "Operaciones pendientes", homeSummary: "Resumen", homeTasksDescription: "Agenda diaria, aprobaciones y avisos dentro de la app." },
    queue: { total: "Total", pending: "Pendientes", failed: "Fallidas", plantId: "Planta", statuses: { pending: "Pendiente", processing: "En curso", failed: "Fallida" }, operations: { CREATE_INTERVENTION: "Intervención por sincronizar" } },
    proposalStatuses: { PENDING: "Pendiente", APPROVED: "Aprobada", REJECTED: "Rechazada" },
  },
  en: {
    fields: { code: "Code", name: "Name", title: "Title", type: "Type", environment: "Environment", species: "Species", variety: "Variety", sowingDate: "Sowing date", germinationDate: "Germination date", transplantDate: "Transplant date", potSize: "Pot (L)", substrate: "Substrate", height: "Height (cm)", diameter: "Diameter (mm)", zone: "Zone", latitude: "Latitude", longitude: "Longitude", status: "Status", notes: "Notes", description: "Description", dueDate: "Due date", priority: "Priority", assignTo: "Assign to", scheduledDate: "Planned date", completedDate: "Completion date", operator: "Operator", waterLiters: "Water liters", productName: "Product", dosage: "Dosage", beforePhoto: "Before photo", afterPhoto: "After photo", proposalTitle: "Proposal title", interventionType: "Intervention type", proposedDate: "Proposed date", recurrenceType: "Frequency", everyXDays: "Interval in days", firstDate: "First date" },
    actions: { createPlant: "Create plant", createTask: "Create task", createIntervention: "Create intervention", createSchedule: "Create schedule", saveChanges: "Save changes", sendProposal: "Send proposal", markCompleted: "Mark completed", proposeFollowUp: "Propose follow-up", edit: "Edit", viewAll: "View all", newIntervention: "New intervention", offlineIntervention: "Offline intervention", newTask: "New task", recurringSchedule: "Schedule", newSchedule: "New schedule", qr: "QR", saveOffline: "Save to queue", saving: "Saving…", syncNow: "Sync now", syncing: "Syncing…" },
    sections: { identity: "Plant details", notes: "Notes", interventions: "Interventions", tasks: "Tasks", schedules: "Schedules", mainData: "Main details", images: "Images", linkedProposals: "Linked proposals", baseData: "Basic details", recurrence: "Frequency", assignment: "Assignment" },
    messages: { none: "—", notAssigned: "Not assigned", noNotes: "No notes.", noInterventions: "No interventions recorded.", noTasksForPlant: "No tasks for this plant.", noSchedulesForPlant: "No schedules for this plant.", noProposals: "No proposals.", noBeforePhoto: "No before photo", noAfterPhoto: "No after photo", everyXDaysHelp: "Use only for a custom interval", offlineSaved: "Intervention saved to the queue. It will sync when the connection is back.", offlineSynced: "Intervention synced successfully.", saveError: "Error while saving.", queueEmpty: "No operations waiting.", syncDone: "Sync completed.", syncError: "Error during sync.", sent: "Sent", failed: "Failed", publicQrUrl: "Public QR URL" },
    pages: { newPlant: "New plant", editPlant: "Edit plant", newTask: "New task", editTask: "Edit task", taskDetails: "Task details", proposeFollowUp: "Propose follow-up", newIntervention: "New intervention", editIntervention: "Edit intervention", interventionDetails: "Intervention details", newOfflineIntervention: "New offline intervention", newSchedule: "New schedule", offlineTitle: "Offline mode", offlineEyebrow: "Local work", offlineBody: "You are offline. You can keep recording some data; it will be synced when the connection is available again.", offlineSyncTitle: "Offline work", offlineSyncEyebrow: "Waiting operations", homeSummary: "Summary", homeTasksDescription: "Daily agenda, approvals, and in-app notices." },
    queue: { total: "Total", pending: "Pending", failed: "Failed", plantId: "Plant", statuses: { pending: "Pending", processing: "Processing", failed: "Failed" }, operations: { CREATE_INTERVENTION: "Intervention waiting to sync" } },
    proposalStatuses: { PENDING: "Pending", APPROVED: "Approved", REJECTED: "Rejected" },
  },
  sk: {
    fields: { code: "Kód", name: "Názov", title: "Názov", type: "Typ", environment: "Prostredie", species: "Druh", variety: "Odroda", sowingDate: "Dátum výsevu", germinationDate: "Dátum klíčenia", transplantDate: "Dátum presadenia", potSize: "Kvetináč (L)", substrate: "Substrát", height: "Výška (cm)", diameter: "Priemer (mm)", zone: "Zóna", latitude: "Zemepisná šírka", longitude: "Zemepisná dĺžka", status: "Stav", notes: "Poznámky", description: "Popis", dueDate: "Termín", priority: "Priorita", assignTo: "Priradiť", scheduledDate: "Plánovaný dátum", completedDate: "Dátum dokončenia", operator: "Operátor", waterLiters: "Litre vody", productName: "Produkt", dosage: "Dávkovanie", beforePhoto: "Fotka pred", afterPhoto: "Fotka po", proposalTitle: "Názov návrhu", interventionType: "Typ zásahu", proposedDate: "Navrhovaný dátum", recurrenceType: "Frekvencia", everyXDays: "Interval v dňoch", firstDate: "Prvý dátum" },
    actions: { createPlant: "Vytvoriť rastlinu", createTask: "Vytvoriť úlohu", createIntervention: "Vytvoriť zásah", createSchedule: "Vytvoriť plánovanie", saveChanges: "Uložiť zmeny", sendProposal: "Odoslať návrh", markCompleted: "Označiť ako dokončené", proposeFollowUp: "Navrhnúť pokračovanie", edit: "Upraviť", viewAll: "Zobraziť všetko", newIntervention: "Nový zásah", offlineIntervention: "Zásah bez pripojenia", newTask: "Nová úloha", recurringSchedule: "Plánovanie", newSchedule: "Nové plánovanie", qr: "QR", saveOffline: "Uložiť do fronty", saving: "Ukladá sa…", syncNow: "Synchronizovať teraz", syncing: "Synchronizuje sa…" },
    sections: { identity: "Údaje rastliny", notes: "Poznámky", interventions: "Zásahy", tasks: "Úlohy", schedules: "Plánovania", mainData: "Hlavné údaje", images: "Obrázky", linkedProposals: "Súvisiace návrhy", baseData: "Základné údaje", recurrence: "Frekvencia", assignment: "Priradenie" },
    messages: { none: "—", notAssigned: "Nepriradené", noNotes: "Žiadne poznámky.", noInterventions: "Nie sú zaznamenané žiadne zásahy.", noTasksForPlant: "Pre túto rastlinu nie sú žiadne úlohy.", noSchedulesForPlant: "Pre túto rastlinu nie sú žiadne plánovania.", noProposals: "Žiadne návrhy.", noBeforePhoto: "Žiadna fotka pred", noAfterPhoto: "Žiadna fotka po", everyXDaysHelp: "Použite iba pri vlastnom intervale", offlineSaved: "Zásah bol uložený do fronty. Synchronizuje sa po obnovení pripojenia.", offlineSynced: "Zásah bol úspešne synchronizovaný.", saveError: "Chyba pri ukladaní.", queueEmpty: "Žiadne čakajúce operácie.", syncDone: "Synchronizácia dokončená.", syncError: "Chyba počas synchronizácie.", sent: "Odoslané", failed: "Zlyhané", publicQrUrl: "Verejná QR URL" },
    pages: { newPlant: "Nová rastlina", editPlant: "Upraviť rastlinu", newTask: "Nová úloha", editTask: "Upraviť úlohu", taskDetails: "Detail úlohy", proposeFollowUp: "Navrhnúť pokračovanie", newIntervention: "Nový zásah", editIntervention: "Upraviť zásah", interventionDetails: "Detail zásahu", newOfflineIntervention: "Nový zásah bez pripojenia", newSchedule: "Nové plánovanie", offlineTitle: "Režim bez pripojenia", offlineEyebrow: "Lokálna práca", offlineBody: "Ste bez pripojenia. Niektoré údaje môžete ďalej zapisovať; synchronizujú sa po obnovení pripojenia.", offlineSyncTitle: "Práca bez pripojenia", offlineSyncEyebrow: "Čakajúce operácie", homeSummary: "Prehľad", homeTasksDescription: "Denný plán, schvaľovania a upozornenia v aplikácii." },
    queue: { total: "Celkom", pending: "Čakajúce", failed: "Zlyhané", plantId: "Rastlina", statuses: { pending: "Čaká", processing: "Spracúva sa", failed: "Zlyhalo" }, operations: { CREATE_INTERVENTION: "Zásah čaká na synchronizáciu" } },
    proposalStatuses: { PENDING: "Čaká", APPROVED: "Schválené", REJECTED: "Zamietnuté" },
  },
  fr: {
    fields: { code: "Code", name: "Nom", title: "Titre", type: "Type", environment: "Environnement", species: "Espèce", variety: "Variété", sowingDate: "Date de semis", germinationDate: "Date de germination", transplantDate: "Date de transplantation", potSize: "Pot (L)", substrate: "Substrat", height: "Hauteur (cm)", diameter: "Diamètre (mm)", zone: "Zone", latitude: "Latitude", longitude: "Longitude", status: "Statut", notes: "Notes", description: "Description", dueDate: "Échéance", priority: "Priorité", assignTo: "Assigner à", scheduledDate: "Date planifiée", completedDate: "Date de fin", operator: "Opérateur", waterLiters: "Litres d’eau", productName: "Produit", dosage: "Dosage", beforePhoto: "Photo avant", afterPhoto: "Photo après", proposalTitle: "Titre de la proposition", interventionType: "Type d’intervention", proposedDate: "Date proposée", recurrenceType: "Fréquence", everyXDays: "Intervalle en jours", firstDate: "Première date" },
    actions: { createPlant: "Créer une plante", createTask: "Créer une tâche", createIntervention: "Créer une intervention", createSchedule: "Créer une programmation", saveChanges: "Enregistrer", sendProposal: "Envoyer la proposition", markCompleted: "Marquer comme terminée", proposeFollowUp: "Proposer une suite", edit: "Modifier", viewAll: "Tout voir", newIntervention: "Nouvelle intervention", offlineIntervention: "Intervention hors connexion", newTask: "Nouvelle tâche", recurringSchedule: "Programmation", newSchedule: "Nouvelle programmation", qr: "QR", saveOffline: "Enregistrer en attente", saving: "Enregistrement…", syncNow: "Synchroniser", syncing: "Synchronisation…" },
    sections: { identity: "Données de la plante", notes: "Notes", interventions: "Interventions", tasks: "Tâches", schedules: "Programmations", mainData: "Données principales", images: "Images", linkedProposals: "Propositions liées", baseData: "Données de base", recurrence: "Fréquence", assignment: "Assignation" },
    messages: { none: "—", notAssigned: "Non assigné", noNotes: "Aucune note.", noInterventions: "Aucune intervention enregistrée.", noTasksForPlant: "Aucune tâche pour cette plante.", noSchedulesForPlant: "Aucune programmation pour cette plante.", noProposals: "Aucune proposition.", noBeforePhoto: "Aucune photo avant", noAfterPhoto: "Aucune photo après", everyXDaysHelp: "À utiliser uniquement pour un intervalle personnalisé", offlineSaved: "Intervention enregistrée en attente. Elle sera synchronisée au retour de la connexion.", offlineSynced: "Intervention synchronisée correctement.", saveError: "Erreur lors de l’enregistrement.", queueEmpty: "Aucune opération en attente.", syncDone: "Synchronisation terminée.", syncError: "Erreur pendant la synchronisation.", sent: "Envoyés", failed: "Échoués", publicQrUrl: "URL publique QR" },
    pages: { newPlant: "Nouvelle plante", editPlant: "Modifier la plante", newTask: "Nouvelle tâche", editTask: "Modifier la tâche", taskDetails: "Détails de la tâche", proposeFollowUp: "Proposer une suite", newIntervention: "Nouvelle intervention", editIntervention: "Modifier l’intervention", interventionDetails: "Détails de l’intervention", newOfflineIntervention: "Nouvelle intervention hors connexion", newSchedule: "Nouvelle programmation", offlineTitle: "Mode hors connexion", offlineEyebrow: "Travail local", offlineBody: "Vous êtes hors connexion. Vous pouvez continuer à saisir certaines données ; elles seront synchronisées dès que la connexion revient.", offlineSyncTitle: "Travail hors connexion", offlineSyncEyebrow: "Opérations en attente", homeSummary: "Résumé", homeTasksDescription: "Agenda quotidien, validations et avis dans l’application." },
    queue: { total: "Total", pending: "En attente", failed: "Échouées", plantId: "Plante", statuses: { pending: "En attente", processing: "En cours", failed: "Échouée" }, operations: { CREATE_INTERVENTION: "Intervention à synchroniser" } },
    proposalStatuses: { PENDING: "En attente", APPROVED: "Approuvée", REJECTED: "Rejetée" },
  },
  de: {
    fields: { code: "Code", name: "Name", title: "Titel", type: "Typ", environment: "Umgebung", species: "Art", variety: "Sorte", sowingDate: "Aussaatdatum", germinationDate: "Keimdatum", transplantDate: "Umpflanzdatum", potSize: "Topf (L)", substrate: "Substrat", height: "Höhe (cm)", diameter: "Durchmesser (mm)", zone: "Zone", latitude: "Breitengrad", longitude: "Längengrad", status: "Status", notes: "Notizen", description: "Beschreibung", dueDate: "Fälligkeitsdatum", priority: "Priorität", assignTo: "Zuweisen an", scheduledDate: "Geplantes Datum", completedDate: "Abschlussdatum", operator: "Operator", waterLiters: "Liter Wasser", productName: "Produkt", dosage: "Dosierung", beforePhoto: "Foto vorher", afterPhoto: "Foto nachher", proposalTitle: "Titel des Vorschlags", interventionType: "Interventionstyp", proposedDate: "Vorgeschlagenes Datum", recurrenceType: "Frequenz", everyXDays: "Intervall in Tagen", firstDate: "Erstes Datum" },
    actions: { createPlant: "Pflanze erstellen", createTask: "Aufgabe erstellen", createIntervention: "Intervention erstellen", createSchedule: "Planung erstellen", saveChanges: "Änderungen speichern", sendProposal: "Vorschlag senden", markCompleted: "Als erledigt markieren", proposeFollowUp: "Folgeaktion vorschlagen", edit: "Bearbeiten", viewAll: "Alle anzeigen", newIntervention: "Neue Intervention", offlineIntervention: "Intervention ohne Verbindung", newTask: "Neue Aufgabe", recurringSchedule: "Planung", newSchedule: "Neue Planung", qr: "QR", saveOffline: "In Warteschlange speichern", saving: "Speichern…", syncNow: "Jetzt synchronisieren", syncing: "Synchronisieren…" },
    sections: { identity: "Pflanzendaten", notes: "Notizen", interventions: "Interventionen", tasks: "Aufgaben", schedules: "Planungen", mainData: "Hauptdaten", images: "Bilder", linkedProposals: "Verknüpfte Vorschläge", baseData: "Basisdaten", recurrence: "Frequenz", assignment: "Zuweisung" },
    messages: { none: "—", notAssigned: "Nicht zugewiesen", noNotes: "Keine Notizen.", noInterventions: "Keine Interventionen erfasst.", noTasksForPlant: "Keine Aufgaben für diese Pflanze.", noSchedulesForPlant: "Keine Planungen für diese Pflanze.", noProposals: "Keine Vorschläge.", noBeforePhoto: "Kein Foto vorher", noAfterPhoto: "Kein Foto nachher", everyXDaysHelp: "Nur bei einem benutzerdefinierten Intervall verwenden", offlineSaved: "Intervention in der Warteschlange gespeichert. Sie wird synchronisiert, sobald die Verbindung zurück ist.", offlineSynced: "Intervention erfolgreich synchronisiert.", saveError: "Fehler beim Speichern.", queueEmpty: "Keine wartenden Vorgänge.", syncDone: "Synchronisierung abgeschlossen.", syncError: "Fehler bei der Synchronisierung.", sent: "Gesendet", failed: "Fehlgeschlagen", publicQrUrl: "Öffentliche QR-URL" },
    pages: { newPlant: "Neue Pflanze", editPlant: "Pflanze bearbeiten", newTask: "Neue Aufgabe", editTask: "Aufgabe bearbeiten", taskDetails: "Aufgabendetails", proposeFollowUp: "Folgeaktion vorschlagen", newIntervention: "Neue Intervention", editIntervention: "Intervention bearbeiten", interventionDetails: "Interventionsdetails", newOfflineIntervention: "Neue Intervention ohne Verbindung", newSchedule: "Neue Planung", offlineTitle: "Modus ohne Verbindung", offlineEyebrow: "Lokale Arbeit", offlineBody: "Sie sind ohne Verbindung. Sie können einige Daten weiter erfassen; sie werden synchronisiert, sobald die Verbindung wieder verfügbar ist.", offlineSyncTitle: "Arbeit ohne Verbindung", offlineSyncEyebrow: "Wartende Vorgänge", homeSummary: "Übersicht", homeTasksDescription: "Tagesagenda, Freigaben und Hinweise in der App." },
    queue: { total: "Gesamt", pending: "Wartend", failed: "Fehlgeschlagen", plantId: "Pflanze", statuses: { pending: "Wartend", processing: "In Bearbeitung", failed: "Fehlgeschlagen" }, operations: { CREATE_INTERVENTION: "Intervention wartet auf Synchronisierung" } },
    proposalStatuses: { PENDING: "Wartend", APPROVED: "Genehmigt", REJECTED: "Abgelehnt" },
  },
  ru: {
    fields: { code: "Код", name: "Название", title: "Название", type: "Тип", environment: "Среда", species: "Вид", variety: "Сорт", sowingDate: "Дата посева", germinationDate: "Дата прорастания", transplantDate: "Дата пересадки", potSize: "Горшок (л)", substrate: "Субстрат", height: "Высота (см)", diameter: "Диаметр (мм)", zone: "Зона", latitude: "Широта", longitude: "Долгота", status: "Статус", notes: "Заметки", description: "Описание", dueDate: "Срок", priority: "Приоритет", assignTo: "Назначить", scheduledDate: "Плановая дата", completedDate: "Дата завершения", operator: "Оператор", waterLiters: "Литры воды", productName: "Продукт", dosage: "Дозировка", beforePhoto: "Фото до", afterPhoto: "Фото после", proposalTitle: "Название предложения", interventionType: "Тип вмешательства", proposedDate: "Предложенная дата", recurrenceType: "Частота", everyXDays: "Интервал в днях", firstDate: "Первая дата" },
    actions: { createPlant: "Создать растение", createTask: "Создать задачу", createIntervention: "Создать вмешательство", createSchedule: "Создать расписание", saveChanges: "Сохранить изменения", sendProposal: "Отправить предложение", markCompleted: "Отметить выполненной", proposeFollowUp: "Предложить продолжение", edit: "Изменить", viewAll: "Показать все", newIntervention: "Новое вмешательство", offlineIntervention: "Вмешательство без сети", newTask: "Новая задача", recurringSchedule: "Расписание", newSchedule: "Новое расписание", qr: "QR", saveOffline: "Сохранить в очередь", saving: "Сохранение…", syncNow: "Синхронизировать", syncing: "Синхронизация…" },
    sections: { identity: "Данные растения", notes: "Заметки", interventions: "Вмешательства", tasks: "Задачи", schedules: "Расписания", mainData: "Основные данные", images: "Изображения", linkedProposals: "Связанные предложения", baseData: "Основные данные", recurrence: "Частота", assignment: "Назначение" },
    messages: { none: "—", notAssigned: "Не назначено", noNotes: "Нет заметок.", noInterventions: "Вмешательства не зарегистрированы.", noTasksForPlant: "Для этого растения нет задач.", noSchedulesForPlant: "Для этого растения нет расписаний.", noProposals: "Нет предложений.", noBeforePhoto: "Нет фото до", noAfterPhoto: "Нет фото после", everyXDaysHelp: "Используйте только для пользовательского интервала", offlineSaved: "Вмешательство сохранено в очереди. Оно будет синхронизировано, когда сеть вернётся.", offlineSynced: "Вмешательство успешно синхронизировано.", saveError: "Ошибка при сохранении.", queueEmpty: "Нет ожидающих операций.", syncDone: "Синхронизация завершена.", syncError: "Ошибка синхронизации.", sent: "Отправлено", failed: "Не удалось", publicQrUrl: "Публичный QR URL" },
    pages: { newPlant: "Новое растение", editPlant: "Изменить растение", newTask: "Новая задача", editTask: "Изменить задачу", taskDetails: "Детали задачи", proposeFollowUp: "Предложить продолжение", newIntervention: "Новое вмешательство", editIntervention: "Изменить вмешательство", interventionDetails: "Детали вмешательства", newOfflineIntervention: "Новое вмешательство без сети", newSchedule: "Новое расписание", offlineTitle: "Режим без сети", offlineEyebrow: "Локальная работа", offlineBody: "Вы без сети. Вы можете продолжать вносить некоторые данные; они будут синхронизированы, когда соединение восстановится.", offlineSyncTitle: "Работа без сети", offlineSyncEyebrow: "Ожидающие операции", homeSummary: "Сводка", homeTasksDescription: "Ежедневная повестка, утверждения и уведомления в приложении." },
    queue: { total: "Всего", pending: "Ожидают", failed: "Ошибки", plantId: "Растение", statuses: { pending: "Ожидает", processing: "В обработке", failed: "Ошибка" }, operations: { CREATE_INTERVENTION: "Вмешательство ожидает синхронизации" } },
    proposalStatuses: { PENDING: "Ожидает", APPROVED: "Одобрено", REJECTED: "Отклонено" },
  },
  hu: {
    fields: { code: "Kód", name: "Név", title: "Cím", type: "Típus", environment: "Környezet", species: "Faj", variety: "Fajta", sowingDate: "Vetés dátuma", germinationDate: "Csírázás dátuma", transplantDate: "Átültetés dátuma", potSize: "Cserép (L)", substrate: "Közeg", height: "Magasság (cm)", diameter: "Átmérő (mm)", zone: "Zóna", latitude: "Szélesség", longitude: "Hosszúság", status: "Állapot", notes: "Jegyzetek", description: "Leírás", dueDate: "Határidő", priority: "Prioritás", assignTo: "Hozzárendelés", scheduledDate: "Tervezett dátum", completedDate: "Befejezés dátuma", operator: "Operátor", waterLiters: "Víz literben", productName: "Termék", dosage: "Adagolás", beforePhoto: "Fotó előtte", afterPhoto: "Fotó utána", proposalTitle: "Javaslat címe", interventionType: "Beavatkozás típusa", proposedDate: "Javasolt dátum", recurrenceType: "Gyakoriság", everyXDays: "Intervallum napokban", firstDate: "Első dátum" },
    actions: { createPlant: "Növény létrehozása", createTask: "Feladat létrehozása", createIntervention: "Beavatkozás létrehozása", createSchedule: "Ütemezés létrehozása", saveChanges: "Változások mentése", sendProposal: "Javaslat küldése", markCompleted: "Késznek jelölés", proposeFollowUp: "Folytatás javaslata", edit: "Szerkesztés", viewAll: "Összes megtekintése", newIntervention: "Új beavatkozás", offlineIntervention: "Beavatkozás kapcsolat nélkül", newTask: "Új feladat", recurringSchedule: "Ütemezés", newSchedule: "Új ütemezés", qr: "QR", saveOffline: "Mentés sorba", saving: "Mentés…", syncNow: "Szinkronizálás", syncing: "Szinkronizálás…" },
    sections: { identity: "Növény adatai", notes: "Jegyzetek", interventions: "Beavatkozások", tasks: "Feladatok", schedules: "Ütemezések", mainData: "Fő adatok", images: "Képek", linkedProposals: "Kapcsolódó javaslatok", baseData: "Alapadatok", recurrence: "Gyakoriság", assignment: "Hozzárendelés" },
    messages: { none: "—", notAssigned: "Nincs hozzárendelve", noNotes: "Nincsenek jegyzetek.", noInterventions: "Nincs rögzített beavatkozás.", noTasksForPlant: "Ehhez a növényhez nincs feladat.", noSchedulesForPlant: "Ehhez a növényhez nincs ütemezés.", noProposals: "Nincs javaslat.", noBeforePhoto: "Nincs előtte fotó", noAfterPhoto: "Nincs utána fotó", everyXDaysHelp: "Csak egyéni intervallum esetén használd", offlineSaved: "Beavatkozás mentve a sorba. Szinkronizálva lesz, amikor visszatér a kapcsolat.", offlineSynced: "Beavatkozás sikeresen szinkronizálva.", saveError: "Hiba mentés közben.", queueEmpty: "Nincs várakozó művelet.", syncDone: "Szinkronizálás befejezve.", syncError: "Hiba a szinkronizálás során.", sent: "Elküldve", failed: "Sikertelen", publicQrUrl: "Nyilvános QR URL" },
    pages: { newPlant: "Új növény", editPlant: "Növény szerkesztése", newTask: "Új feladat", editTask: "Feladat szerkesztése", taskDetails: "Feladat részletei", proposeFollowUp: "Folytatás javaslata", newIntervention: "Új beavatkozás", editIntervention: "Beavatkozás szerkesztése", interventionDetails: "Beavatkozás részletei", newOfflineIntervention: "Új beavatkozás kapcsolat nélkül", newSchedule: "Új ütemezés", offlineTitle: "Kapcsolat nélküli mód", offlineEyebrow: "Helyi munka", offlineBody: "Nincs kapcsolat. Bizonyos adatokat továbbra is rögzíthetsz; szinkronizáljuk őket, amikor a kapcsolat visszatér.", offlineSyncTitle: "Munka kapcsolat nélkül", offlineSyncEyebrow: "Várakozó műveletek", homeSummary: "Áttekintés", homeTasksDescription: "Napi agenda, jóváhagyások és alkalmazáson belüli értesítések." },
    queue: { total: "Összes", pending: "Várakozik", failed: "Sikertelen", plantId: "Növény", statuses: { pending: "Várakozik", processing: "Feldolgozás", failed: "Sikertelen" }, operations: { CREATE_INTERVENTION: "Szinkronizálásra váró beavatkozás" } },
    proposalStatuses: { PENDING: "Várakozik", APPROVED: "Jóváhagyva", REJECTED: "Elutasítva" },
  },
};

export function getOperationalText(locale: Locale = DEFAULT_LOCALE) {
  return operational[locale] ?? operational[DEFAULT_LOCALE];
}

export function lookupText(map: Record<string, string>, value: string | null | undefined) {
  if (!value) return "—";
  return map[value] ?? value;
}
