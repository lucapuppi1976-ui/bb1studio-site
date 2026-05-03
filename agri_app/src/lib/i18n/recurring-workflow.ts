import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

export const RECURRING_SCOPES = ["all", "active", "paused", "due", "unassigned"] as const;
export type RecurringScope = (typeof RECURRING_SCOPES)[number];

type RecurringWorkflowText = {
  filters: Record<RecurringScope, string>;
  stats: {
    total: string;
    active: string;
    paused: string;
    due: string;
    unassigned: string;
  };
  actions: {
    search: string;
    clear: string;
    generateNow: string;
    viewPlant: string;
    pause: string;
    resume: string;
    createFromPlant: string;
  };
  fields: {
    searchPlaceholder: string;
    status: string;
    frequency: string;
    nextDate: string;
    plant: string;
    responsible: string;
    lastGenerated: string;
    recentGenerated: string;
  };
  manual: {
    title: string;
    description: string;
    confirm: string;
    confirmRequired: string;
  };
  messages: {
    empty: string;
    noFilteredResults: string;
    generated: (created: number, skipped: number) => string;
    dueNow: string;
    notDueYet: string;
    noResponsible: string;
    none: string;
  };
  newSchedule: {
    introTitle: string;
    introBody: string;
    frequencyHelp: string;
    everyXDaysHelp: string;
    firstDateHelp: string;
    assignmentHelp: string;
  };
};

const texts: Record<Locale, RecurringWorkflowText> = {
  it: {
    filters: { all: "Tutte", active: "Attive", paused: "In pausa", due: "Da generare", unassigned: "Senza responsabile" },
    stats: { total: "Programmazioni", active: "Attive", paused: "In pausa", due: "Da generare", unassigned: "Senza responsabile" },
    actions: { search: "Cerca", clear: "Pulisci", generateNow: "Genera attività dovute", viewPlant: "Apri pianta", pause: "Metti in pausa", resume: "Riattiva", createFromPlant: "Crea da una pianta" },
    fields: { searchPlaceholder: "Cerca per titolo, pianta o responsabile", status: "Stato", frequency: "Frequenza", nextDate: "Prossima data", plant: "Pianta", responsible: "Responsabile", lastGenerated: "Ultima attività creata", recentGenerated: "Attività recenti" },
    manual: { title: "Generazione manuale", description: "Usala solo per recuperare attività già dovute. Il cron live genera automaticamente ogni giorno.", confirm: "Confermo di voler generare solo le attività già dovute", confirmRequired: "Per avviare la generazione manuale devi confermare l’operazione." },
    messages: { empty: "Non ci sono ancora programmazioni. Apri una pianta e crea la prima programmazione.", noFilteredResults: "Nessuna programmazione corrisponde ai filtri scelti.", generated: (created, skipped) => `Generazione completata. Create: ${created}. Saltate: ${skipped}.`, dueNow: "Da generare", notDueYet: "Non ancora dovuta", noResponsible: "Senza responsabile", none: "—" },
    newSchedule: { introTitle: "Come funziona", introBody: "Una programmazione crea automaticamente attività future per questa pianta quando arriva la data prevista.", frequencyHelp: "Scegli ogni quanto creare l’attività.", everyXDaysHelp: "Compila questo campo solo se scegli un intervallo personalizzato.", firstDateHelp: "È la prima data in cui il cron potrà creare l’attività.", assignmentHelp: "Se assegni un responsabile, l’attività generata sarà già assegnata." },
  },
  es: {
    filters: { all: "Todas", active: "Activas", paused: "En pausa", due: "Por generar", unassigned: "Sin responsable" },
    stats: { total: "Programaciones", active: "Activas", paused: "En pausa", due: "Por generar", unassigned: "Sin responsable" },
    actions: { search: "Buscar", clear: "Limpiar", generateNow: "Crear tareas vencidas", viewPlant: "Abrir planta", pause: "Pausar", resume: "Reactivar", createFromPlant: "Crear desde una planta" },
    fields: { searchPlaceholder: "Buscar por título, planta o responsable", status: "Estado", frequency: "Frecuencia", nextDate: "Próxima fecha", plant: "Planta", responsible: "Responsable", lastGenerated: "Última tarea creada", recentGenerated: "Tareas recientes" },
    manual: { title: "Generación manual", description: "Úsala solo para recuperar tareas ya vencidas. El cron live genera automáticamente cada día.", confirm: "Confirmo que quiero crear solo las tareas ya vencidas", confirmRequired: "Debes confirmar la operación para iniciar la generación manual." },
    messages: { empty: "Todavía no hay programaciones. Abre una planta y crea la primera.", noFilteredResults: "Ninguna programación coincide con los filtros.", generated: (created, skipped) => `Generación completada. Creadas: ${created}. Omitidas: ${skipped}.`, dueNow: "Por generar", notDueYet: "Aún no vence", noResponsible: "Sin responsable", none: "—" },
    newSchedule: { introTitle: "Cómo funciona", introBody: "Una programación crea automáticamente tareas futuras para esta planta cuando llega la fecha prevista.", frequencyHelp: "Elige cada cuánto crear la tarea.", everyXDaysHelp: "Usa este campo solo si eliges un intervalo personalizado.", firstDateHelp: "Es la primera fecha en la que el cron podrá crear la tarea.", assignmentHelp: "Si asignas un responsable, la tarea generada ya quedará asignada." },
  },
  en: {
    filters: { all: "All", active: "Active", paused: "Paused", due: "Due", unassigned: "Unassigned" },
    stats: { total: "Schedules", active: "Active", paused: "Paused", due: "Due", unassigned: "Unassigned" },
    actions: { search: "Search", clear: "Clear", generateNow: "Create due tasks", viewPlant: "Open plant", pause: "Pause", resume: "Resume", createFromPlant: "Create from a plant" },
    fields: { searchPlaceholder: "Search by title, plant, or responsible person", status: "Status", frequency: "Frequency", nextDate: "Next date", plant: "Plant", responsible: "Responsible", lastGenerated: "Last task created", recentGenerated: "Recent tasks" },
    manual: { title: "Manual generation", description: "Use it only to recover tasks that are already due. The live cron runs automatically every day.", confirm: "I confirm I want to create only tasks that are already due", confirmRequired: "Confirm the operation before starting manual generation." },
    messages: { empty: "There are no schedules yet. Open a plant and create the first schedule.", noFilteredResults: "No schedules match the selected filters.", generated: (created, skipped) => `Generation completed. Created: ${created}. Skipped: ${skipped}.`, dueNow: "Due", notDueYet: "Not due yet", noResponsible: "Unassigned", none: "—" },
    newSchedule: { introTitle: "How it works", introBody: "A schedule automatically creates future tasks for this plant when the planned date arrives.", frequencyHelp: "Choose how often the task should be created.", everyXDaysHelp: "Use this field only for a custom interval.", firstDateHelp: "This is the first date when the cron can create the task.", assignmentHelp: "If you assign a responsible person, generated tasks will already be assigned." },
  },
  sk: {
    filters: { all: "Všetky", active: "Aktívne", paused: "Pozastavené", due: "Na vytvorenie", unassigned: "Bez zodpovednej osoby" },
    stats: { total: "Plánovania", active: "Aktívne", paused: "Pozastavené", due: "Na vytvorenie", unassigned: "Bez zodpovednej osoby" },
    actions: { search: "Hľadať", clear: "Vymazať", generateNow: "Vytvoriť splatné úlohy", viewPlant: "Otvoriť rastlinu", pause: "Pozastaviť", resume: "Obnoviť", createFromPlant: "Vytvoriť z rastliny" },
    fields: { searchPlaceholder: "Hľadať podľa názvu, rastliny alebo zodpovednej osoby", status: "Stav", frequency: "Frekvencia", nextDate: "Ďalší dátum", plant: "Rastlina", responsible: "Zodpovedná osoba", lastGenerated: "Posledná vytvorená úloha", recentGenerated: "Nedávne úlohy" },
    manual: { title: "Ručné vytvorenie", description: "Použite iba na doplnenie úloh, ktoré sú už splatné. Live cron beží automaticky každý deň.", confirm: "Potvrdzujem vytvorenie iba už splatných úloh", confirmRequired: "Pred ručným vytvorením potvrďte operáciu." },
    messages: { empty: "Zatiaľ nie sú žiadne plánovania.", noFilteredResults: "Žiadne plánovanie nezodpovedá filtrom.", generated: (created, skipped) => `Vytvorenie dokončené. Vytvorené: ${created}. Preskočené: ${skipped}.`, dueNow: "Na vytvorenie", notDueYet: "Ešte nie je splatné", noResponsible: "Bez zodpovednej osoby", none: "—" },
    newSchedule: { introTitle: "Ako to funguje", introBody: "Plánovanie automaticky vytvára budúce úlohy pre túto rastlinu, keď nastane plánovaný dátum.", frequencyHelp: "Vyberte, ako často sa má úloha vytvárať.", everyXDaysHelp: "Použite iba pri vlastnom intervale.", firstDateHelp: "Prvý dátum, kedy môže cron vytvoriť úlohu.", assignmentHelp: "Ak priradíte zodpovednú osobu, vytvorené úlohy budú už priradené." },
  },
  fr: {
    filters: { all: "Toutes", active: "Actives", paused: "En pause", due: "À générer", unassigned: "Non assignées" },
    stats: { total: "Programmations", active: "Actives", paused: "En pause", due: "À générer", unassigned: "Non assignées" },
    actions: { search: "Rechercher", clear: "Effacer", generateNow: "Créer les tâches dues", viewPlant: "Ouvrir la plante", pause: "Mettre en pause", resume: "Réactiver", createFromPlant: "Créer depuis une plante" },
    fields: { searchPlaceholder: "Rechercher par titre, plante ou responsable", status: "Statut", frequency: "Fréquence", nextDate: "Prochaine date", plant: "Plante", responsible: "Responsable", lastGenerated: "Dernière tâche créée", recentGenerated: "Tâches récentes" },
    manual: { title: "Génération manuelle", description: "À utiliser seulement pour récupérer les tâches déjà dues. Le cron live fonctionne automatiquement chaque jour.", confirm: "Je confirme vouloir créer uniquement les tâches déjà dues", confirmRequired: "Confirmez l’opération avant la génération manuelle." },
    messages: { empty: "Aucune programmation pour le moment.", noFilteredResults: "Aucune programmation ne correspond aux filtres.", generated: (created, skipped) => `Génération terminée. Créées : ${created}. Ignorées : ${skipped}.`, dueNow: "À générer", notDueYet: "Pas encore due", noResponsible: "Non assignée", none: "—" },
    newSchedule: { introTitle: "Fonctionnement", introBody: "Une programmation crée automatiquement les futures tâches pour cette plante à la date prévue.", frequencyHelp: "Choisissez la fréquence de création.", everyXDaysHelp: "Utilisez ce champ uniquement pour un intervalle personnalisé.", firstDateHelp: "Première date à laquelle le cron pourra créer la tâche.", assignmentHelp: "Si vous assignez un responsable, les tâches générées seront déjà assignées." },
  },
  de: {
    filters: { all: "Alle", active: "Aktiv", paused: "Pausiert", due: "Fällig", unassigned: "Nicht zugewiesen" },
    stats: { total: "Planungen", active: "Aktiv", paused: "Pausiert", due: "Fällig", unassigned: "Nicht zugewiesen" },
    actions: { search: "Suchen", clear: "Zurücksetzen", generateNow: "Fällige Aufgaben erstellen", viewPlant: "Pflanze öffnen", pause: "Pausieren", resume: "Fortsetzen", createFromPlant: "Aus Pflanze erstellen" },
    fields: { searchPlaceholder: "Nach Titel, Pflanze oder Verantwortlichem suchen", status: "Status", frequency: "Frequenz", nextDate: "Nächstes Datum", plant: "Pflanze", responsible: "Verantwortlich", lastGenerated: "Zuletzt erstellte Aufgabe", recentGenerated: "Letzte Aufgaben" },
    manual: { title: "Manuelle Erstellung", description: "Nur verwenden, um bereits fällige Aufgaben nachzuholen. Der Live-Cron läuft täglich automatisch.", confirm: "Ich bestätige, nur bereits fällige Aufgaben zu erstellen", confirmRequired: "Bestätigen Sie die Operation vor der manuellen Erstellung." },
    messages: { empty: "Es gibt noch keine Planungen.", noFilteredResults: "Keine Planung entspricht den Filtern.", generated: (created, skipped) => `Erstellung abgeschlossen. Erstellt: ${created}. Übersprungen: ${skipped}.`, dueNow: "Fällig", notDueYet: "Noch nicht fällig", noResponsible: "Nicht zugewiesen", none: "—" },
    newSchedule: { introTitle: "Funktionsweise", introBody: "Eine Planung erstellt automatisch künftige Aufgaben für diese Pflanze, sobald das geplante Datum erreicht ist.", frequencyHelp: "Wählen Sie, wie oft die Aufgabe erstellt wird.", everyXDaysHelp: "Nur bei benutzerdefiniertem Intervall verwenden.", firstDateHelp: "Erstes Datum, an dem der Cron die Aufgabe erstellen kann.", assignmentHelp: "Wenn Sie jemanden zuweisen, sind generierte Aufgaben direkt zugewiesen." },
  },
  ru: {
    filters: { all: "Все", active: "Активные", paused: "На паузе", due: "К созданию", unassigned: "Без ответственного" },
    stats: { total: "Расписания", active: "Активные", paused: "На паузе", due: "К созданию", unassigned: "Без ответственного" },
    actions: { search: "Поиск", clear: "Очистить", generateNow: "Создать задачи к сроку", viewPlant: "Открыть растение", pause: "Поставить на паузу", resume: "Возобновить", createFromPlant: "Создать из растения" },
    fields: { searchPlaceholder: "Поиск по названию, растению или ответственному", status: "Статус", frequency: "Частота", nextDate: "Следующая дата", plant: "Растение", responsible: "Ответственный", lastGenerated: "Последняя созданная задача", recentGenerated: "Недавние задачи" },
    manual: { title: "Ручное создание", description: "Используйте только для задач, срок которых уже наступил. Live cron работает ежедневно автоматически.", confirm: "Подтверждаю создание только уже наступивших задач", confirmRequired: "Подтвердите операцию перед ручным созданием." },
    messages: { empty: "Расписаний пока нет.", noFilteredResults: "Нет расписаний по выбранным фильтрам.", generated: (created, skipped) => `Создание завершено. Создано: ${created}. Пропущено: ${skipped}.`, dueNow: "К созданию", notDueYet: "Срок ещё не наступил", noResponsible: "Без ответственного", none: "—" },
    newSchedule: { introTitle: "Как это работает", introBody: "Расписание автоматически создаёт будущие задачи для этого растения при наступлении даты.", frequencyHelp: "Выберите частоту создания задачи.", everyXDaysHelp: "Используйте только для индивидуального интервала.", firstDateHelp: "Первая дата, когда cron может создать задачу.", assignmentHelp: "Если назначить ответственного, созданные задачи будут назначены сразу." },
  },
  hu: {
    filters: { all: "Összes", active: "Aktív", paused: "Szüneteltetett", due: "Esedékes", unassigned: "Nincs felelős" },
    stats: { total: "Ütemezések", active: "Aktív", paused: "Szüneteltetett", due: "Esedékes", unassigned: "Nincs felelős" },
    actions: { search: "Keresés", clear: "Törlés", generateNow: "Esedékes feladatok létrehozása", viewPlant: "Növény megnyitása", pause: "Szüneteltetés", resume: "Folytatás", createFromPlant: "Létrehozás növényből" },
    fields: { searchPlaceholder: "Keresés cím, növény vagy felelős alapján", status: "Állapot", frequency: "Gyakoriság", nextDate: "Következő dátum", plant: "Növény", responsible: "Felelős", lastGenerated: "Utoljára létrehozott feladat", recentGenerated: "Legutóbbi feladatok" },
    manual: { title: "Kézi létrehozás", description: "Csak már esedékes feladatok pótlására használd. Az élő cron naponta automatikusan fut.", confirm: "Megerősítem, hogy csak a már esedékes feladatokat hozom létre", confirmRequired: "A kézi létrehozás előtt erősítsd meg a műveletet." },
    messages: { empty: "Még nincsenek ütemezések.", noFilteredResults: "Nincs a szűrőknek megfelelő ütemezés.", generated: (created, skipped) => `Létrehozás kész. Létrehozva: ${created}. Kihagyva: ${skipped}.`, dueNow: "Esedékes", notDueYet: "Még nem esedékes", noResponsible: "Nincs felelős", none: "—" },
    newSchedule: { introTitle: "Hogyan működik", introBody: "Az ütemezés automatikusan jövőbeli feladatokat hoz létre ehhez a növényhez, amikor elérkezik a tervezett dátum.", frequencyHelp: "Válaszd ki, milyen gyakran jöjjön létre a feladat.", everyXDaysHelp: "Csak egyéni intervallum esetén használd.", firstDateHelp: "Az első dátum, amikor a cron létrehozhatja a feladatot.", assignmentHelp: "Ha felelőst választasz, a létrehozott feladatok már hozzá lesznek rendelve." },
  },
};

export function normalizeRecurringScope(value: string | string[] | undefined): RecurringScope {
  const raw = Array.isArray(value) ? value[0] : value;
  return RECURRING_SCOPES.includes(raw as RecurringScope) ? (raw as RecurringScope) : "all";
}

export function getRecurringWorkflowText(locale: string | undefined): RecurringWorkflowText {
  return texts[(locale as Locale) || DEFAULT_LOCALE] ?? texts[DEFAULT_LOCALE];
}
