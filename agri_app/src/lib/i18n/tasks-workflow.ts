import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";

type TasksWorkflowCopy = {
  stats: {
    total: string;
    open: string;
    today: string;
    overdue: string;
    completed: string;
  };
  filters: {
    searchLabel: string;
    searchPlaceholder: string;
    apply: string;
    clear: string;
    all: string;
    open: string;
    today: string;
    overdue: string;
    completed: string;
    noResults: string;
    noResultsHint: string;
  };
  card: {
    due: string;
    responsible: string;
    plant: string;
    proposals: string;
    open: string;
    complete: string;
    completed: string;
    dueToday: string;
    overdue: string;
  };
  detail: {
    nextStepTitle: string;
    nextStepOpen: string;
    nextStepCompleted: string;
    dueDate: string;
    assignedTo: string;
    createdBy: string;
    completedAt: string;
    descriptionTitle: string;
    notesTitle: string;
  };
  today: {
    open: string;
    complete: string;
  };
};

const copy: Record<Locale, TasksWorkflowCopy> = {
  it: {
    stats: { total: "Totali", open: "Aperte", today: "Oggi", overdue: "In ritardo", completed: "Completate" },
    filters: {
      searchLabel: "Cerca attività",
      searchPlaceholder: "Cerca per titolo, pianta o responsabile",
      apply: "Filtra",
      clear: "Pulisci",
      all: "Tutte",
      open: "Aperte",
      today: "Oggi",
      overdue: "In ritardo",
      completed: "Completate",
      noResults: "Nessuna attività trovata.",
      noResultsHint: "Prova a cambiare filtro o ricerca.",
    },
    card: {
      due: "Scadenza",
      responsible: "Responsabile",
      plant: "Pianta",
      proposals: "Proposte",
      open: "Apri",
      complete: "Completa",
      completed: "Completata",
      dueToday: "Da fare oggi",
      overdue: "In ritardo",
    },
    detail: {
      nextStepTitle: "Cosa fare ora",
      nextStepOpen: "Completa l’attività quando il lavoro è stato eseguito, oppure proponi un seguito se serve un nuovo intervento.",
      nextStepCompleted: "Questa attività risulta completata. Puoi consultare i dettagli o proporre un seguito se necessario.",
      dueDate: "Scadenza",
      assignedTo: "Responsabile",
      createdBy: "Creata da",
      completedAt: "Completata il",
      descriptionTitle: "Cosa fare",
      notesTitle: "Note operative",
    },
    today: { open: "Apri", complete: "Completa" },
  },
  es: {
    stats: { total: "Totales", open: "Abiertas", today: "Hoy", overdue: "Atrasadas", completed: "Completadas" },
    filters: {
      searchLabel: "Buscar tareas",
      searchPlaceholder: "Busca por título, planta o responsable",
      apply: "Filtrar",
      clear: "Limpiar",
      all: "Todas",
      open: "Abiertas",
      today: "Hoy",
      overdue: "Atrasadas",
      completed: "Completadas",
      noResults: "No se han encontrado tareas.",
      noResultsHint: "Prueba a cambiar el filtro o la búsqueda.",
    },
    card: {
      due: "Vence",
      responsible: "Responsable",
      plant: "Planta",
      proposals: "Propuestas",
      open: "Abrir",
      complete: "Completar",
      completed: "Completada",
      dueToday: "Para hoy",
      overdue: "Atrasada",
    },
    detail: {
      nextStepTitle: "Qué hacer ahora",
      nextStepOpen: "Marca la tarea como completada cuando el trabajo esté hecho, o propone un seguimiento si hace falta otro trabajo.",
      nextStepCompleted: "Esta tarea ya está completada. Puedes consultar los detalles o proponer un seguimiento si hace falta.",
      dueDate: "Fecha límite",
      assignedTo: "Responsable",
      createdBy: "Creada por",
      completedAt: "Completada el",
      descriptionTitle: "Qué hacer",
      notesTitle: "Notas de trabajo",
    },
    today: { open: "Abrir", complete: "Completar" },
  },
  en: {
    stats: { total: "Total", open: "Open", today: "Today", overdue: "Overdue", completed: "Completed" },
    filters: {
      searchLabel: "Search tasks",
      searchPlaceholder: "Search by title, plant, or assignee",
      apply: "Filter",
      clear: "Clear",
      all: "All",
      open: "Open",
      today: "Today",
      overdue: "Overdue",
      completed: "Completed",
      noResults: "No tasks found.",
      noResultsHint: "Try changing the filter or search term.",
    },
    card: {
      due: "Due",
      responsible: "Assignee",
      plant: "Plant",
      proposals: "Proposals",
      open: "Open",
      complete: "Complete",
      completed: "Completed",
      dueToday: "Due today",
      overdue: "Overdue",
    },
    detail: {
      nextStepTitle: "What to do next",
      nextStepOpen: "Mark the task as completed when the work is done, or propose a follow-up if more work is needed.",
      nextStepCompleted: "This task is completed. You can review the details or propose a follow-up if needed.",
      dueDate: "Due date",
      assignedTo: "Assignee",
      createdBy: "Created by",
      completedAt: "Completed at",
      descriptionTitle: "What to do",
      notesTitle: "Work notes",
    },
    today: { open: "Open", complete: "Complete" },
  },
  sk: {
    stats: { total: "Spolu", open: "Otvorené", today: "Dnes", overdue: "Oneskorené", completed: "Dokončené" },
    filters: {
      searchLabel: "Hľadať úlohy",
      searchPlaceholder: "Hľadať podľa názvu, rastliny alebo zodpovednej osoby",
      apply: "Filtrovať",
      clear: "Vyčistiť",
      all: "Všetky",
      open: "Otvorené",
      today: "Dnes",
      overdue: "Oneskorené",
      completed: "Dokončené",
      noResults: "Nenašli sa žiadne úlohy.",
      noResultsHint: "Skúste zmeniť filter alebo hľadaný text.",
    },
    card: {
      due: "Termín",
      responsible: "Zodpovedný",
      plant: "Rastlina",
      proposals: "Návrhy",
      open: "Otvoriť",
      complete: "Dokončiť",
      completed: "Dokončené",
      dueToday: "Na dnes",
      overdue: "Oneskorené",
    },
    detail: {
      nextStepTitle: "Čo urobiť teraz",
      nextStepOpen: "Po vykonaní práce označte úlohu ako dokončenú alebo navrhnite pokračovanie, ak treba ďalší zásah.",
      nextStepCompleted: "Táto úloha je dokončená. Môžete si pozrieť podrobnosti alebo navrhnúť pokračovanie.",
      dueDate: "Termín",
      assignedTo: "Zodpovedný",
      createdBy: "Vytvoril",
      completedAt: "Dokončené dňa",
      descriptionTitle: "Čo urobiť",
      notesTitle: "Pracovné poznámky",
    },
    today: { open: "Otvoriť", complete: "Dokončiť" },
  },
  fr: {
    stats: { total: "Total", open: "Ouvertes", today: "Aujourd’hui", overdue: "En retard", completed: "Terminées" },
    filters: {
      searchLabel: "Rechercher des tâches",
      searchPlaceholder: "Rechercher par titre, plante ou responsable",
      apply: "Filtrer",
      clear: "Effacer",
      all: "Toutes",
      open: "Ouvertes",
      today: "Aujourd’hui",
      overdue: "En retard",
      completed: "Terminées",
      noResults: "Aucune tâche trouvée.",
      noResultsHint: "Essayez de modifier le filtre ou la recherche.",
    },
    card: {
      due: "Échéance",
      responsible: "Responsable",
      plant: "Plante",
      proposals: "Propositions",
      open: "Ouvrir",
      complete: "Terminer",
      completed: "Terminée",
      dueToday: "À faire aujourd’hui",
      overdue: "En retard",
    },
    detail: {
      nextStepTitle: "Que faire maintenant",
      nextStepOpen: "Marquez la tâche comme terminée lorsque le travail est fait, ou proposez un suivi si nécessaire.",
      nextStepCompleted: "Cette tâche est terminée. Vous pouvez consulter les détails ou proposer un suivi si nécessaire.",
      dueDate: "Échéance",
      assignedTo: "Responsable",
      createdBy: "Créée par",
      completedAt: "Terminée le",
      descriptionTitle: "À faire",
      notesTitle: "Notes de travail",
    },
    today: { open: "Ouvrir", complete: "Terminer" },
  },
  de: {
    stats: { total: "Gesamt", open: "Offen", today: "Heute", overdue: "Überfällig", completed: "Erledigt" },
    filters: {
      searchLabel: "Aufgaben suchen",
      searchPlaceholder: "Nach Titel, Pflanze oder zuständiger Person suchen",
      apply: "Filtern",
      clear: "Zurücksetzen",
      all: "Alle",
      open: "Offen",
      today: "Heute",
      overdue: "Überfällig",
      completed: "Erledigt",
      noResults: "Keine Aufgaben gefunden.",
      noResultsHint: "Ändern Sie den Filter oder die Suche.",
    },
    card: {
      due: "Fällig",
      responsible: "Zuständig",
      plant: "Pflanze",
      proposals: "Vorschläge",
      open: "Öffnen",
      complete: "Erledigen",
      completed: "Erledigt",
      dueToday: "Heute fällig",
      overdue: "Überfällig",
    },
    detail: {
      nextStepTitle: "Nächster Schritt",
      nextStepOpen: "Markieren Sie die Aufgabe als erledigt, wenn die Arbeit abgeschlossen ist, oder schlagen Sie eine Folgearbeit vor.",
      nextStepCompleted: "Diese Aufgabe ist erledigt. Sie können die Details prüfen oder bei Bedarf eine Folgearbeit vorschlagen.",
      dueDate: "Fälligkeitsdatum",
      assignedTo: "Zuständig",
      createdBy: "Erstellt von",
      completedAt: "Erledigt am",
      descriptionTitle: "Was zu tun ist",
      notesTitle: "Arbeitsnotizen",
    },
    today: { open: "Öffnen", complete: "Erledigen" },
  },
  ru: {
    stats: { total: "Всего", open: "Открытые", today: "Сегодня", overdue: "Просроченные", completed: "Завершённые" },
    filters: {
      searchLabel: "Поиск задач",
      searchPlaceholder: "Искать по названию, растению или ответственному",
      apply: "Фильтр",
      clear: "Очистить",
      all: "Все",
      open: "Открытые",
      today: "Сегодня",
      overdue: "Просроченные",
      completed: "Завершённые",
      noResults: "Задачи не найдены.",
      noResultsHint: "Попробуйте изменить фильтр или поисковый запрос.",
    },
    card: {
      due: "Срок",
      responsible: "Ответственный",
      plant: "Растение",
      proposals: "Предложения",
      open: "Открыть",
      complete: "Завершить",
      completed: "Завершена",
      dueToday: "На сегодня",
      overdue: "Просрочена",
    },
    detail: {
      nextStepTitle: "Что сделать дальше",
      nextStepOpen: "Отметьте задачу как завершённую после выполнения работы или предложите продолжение, если нужна новая работа.",
      nextStepCompleted: "Эта задача завершена. Можно просмотреть детали или предложить продолжение при необходимости.",
      dueDate: "Срок",
      assignedTo: "Ответственный",
      createdBy: "Создана пользователем",
      completedAt: "Завершена",
      descriptionTitle: "Что сделать",
      notesTitle: "Рабочие заметки",
    },
    today: { open: "Открыть", complete: "Завершить" },
  },
  hu: {
    stats: { total: "Összes", open: "Nyitott", today: "Ma", overdue: "Lejárt", completed: "Elkészült" },
    filters: {
      searchLabel: "Feladatok keresése",
      searchPlaceholder: "Keresés cím, növény vagy felelős alapján",
      apply: "Szűrés",
      clear: "Törlés",
      all: "Mind",
      open: "Nyitott",
      today: "Ma",
      overdue: "Lejárt",
      completed: "Elkészült",
      noResults: "Nem található feladat.",
      noResultsHint: "Próbáljon másik szűrőt vagy keresést.",
    },
    card: {
      due: "Határidő",
      responsible: "Felelős",
      plant: "Növény",
      proposals: "Javaslatok",
      open: "Megnyitás",
      complete: "Elkészítve",
      completed: "Elkészült",
      dueToday: "Ma esedékes",
      overdue: "Lejárt",
    },
    detail: {
      nextStepTitle: "Következő lépés",
      nextStepOpen: "A munka elvégzése után jelölje késznek a feladatot, vagy javasoljon folytatást, ha szükséges.",
      nextStepCompleted: "Ez a feladat elkészült. Megnézheti a részleteket, vagy szükség esetén javasolhat folytatást.",
      dueDate: "Határidő",
      assignedTo: "Felelős",
      createdBy: "Létrehozta",
      completedAt: "Elkészült ekkor",
      descriptionTitle: "Teendő",
      notesTitle: "Munkanapló",
    },
    today: { open: "Megnyitás", complete: "Elkészítve" },
  },
};

export function getTasksWorkflowText(locale: Locale): TasksWorkflowCopy {
  return copy[locale] ?? copy[DEFAULT_LOCALE];
}
