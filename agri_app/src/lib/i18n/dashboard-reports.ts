import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";

type DashboardReportsCopy = {
  dashboard: {
    eyebrow: string;
    actionTasks: string;
    actionToday: string;
    stats: {
      openTasks: string;
      dueToday: string;
      overdue: string;
      unreadNotices: string;
      activePlants: string;
      completedTasks: string;
    };
    sections: {
      doNow: string;
      doNowHint: string;
      plantsToWatch: string;
      plantsToWatchHint: string;
      recentInterventions: string;
      recentInterventionsHint: string;
      quickActions: string;
    };
    empty: {
      noUrgentTasks: string;
      noPlantsToWatch: string;
      noRecentInterventions: string;
    };
    labels: {
      due: string;
      responsible: string;
      noResponsible: string;
      open: string;
      viewPlant: string;
      tasksOpen: string;
      lastWork: string;
      plant: string;
    };
    quick: {
      today: string;
      allTasks: string;
      plants: string;
      reports: string;
      schedules: string;
    };
  };
  reports: {
    eyebrow: string;
    description: string;
    sections: {
      operations: string;
      tasks: string;
      exports: string;
      exportsHint: string;
      recent: string;
    };
    stats: {
      totalPlants: string;
      activePlants: string;
      totalInterventions: string;
      last30Interventions: string;
      totalTasks: string;
      openTasks: string;
      dueToday: string;
      overdue: string;
      completedTasks: string;
      pendingProposals: string;
      notifications: string;
    };
    exports: {
      plantsTitle: string;
      plantsDescription: string;
      interventionsTitle: string;
      interventionsDescription: string;
      tasksTitle: string;
      tasksDescription: string;
      download: string;
    };
    hints: {
      noSchemaChange: string;
      csvNote: string;
    };
  };
};

const copy: Record<Locale, DashboardReportsCopy> = {
  it: {
    dashboard: {
      eyebrow: "Centro operativo",
      actionTasks: "Vedi attività",
      actionToday: "Apri oggi",
      stats: {
        openTasks: "Attività aperte",
        dueToday: "In scadenza oggi",
        overdue: "In ritardo",
        unreadNotices: "Avvisi da leggere",
        activePlants: "Piante attive",
        completedTasks: "Attività completate",
      },
      sections: {
        doNow: "Da fare ora",
        doNowHint: "Le attività più urgenti, ordinate per scadenza.",
        plantsToWatch: "Piante da seguire",
        plantsToWatchHint: "Piante con attività ancora aperte.",
        recentInterventions: "Ultimi interventi",
        recentInterventionsHint: "Lavori registrati più di recente.",
        quickActions: "Accessi rapidi",
      },
      empty: {
        noUrgentTasks: "Non ci sono attività urgenti da gestire.",
        noPlantsToWatch: "Nessuna pianta richiede attenzione immediata.",
        noRecentInterventions: "Nessun intervento registrato di recente.",
      },
      labels: {
        due: "Scadenza",
        responsible: "Responsabile",
        noResponsible: "Non assegnata",
        open: "Apri",
        viewPlant: "Vedi pianta",
        tasksOpen: "attività aperte",
        lastWork: "Ultimo intervento",
        plant: "Pianta",
      },
      quick: {
        today: "Oggi",
        allTasks: "Tutte le attività",
        plants: "Piante",
        reports: "Rapporti",
        schedules: "Programmazioni",
      },
    },
    reports: {
      eyebrow: "Dati e download",
      description: "Una vista sintetica sul lavoro registrato e sui dati esportabili.",
      sections: {
        operations: "Andamento generale",
        tasks: "Stato attività",
        exports: "Esportazioni",
        exportsHint: "Scarica i dati principali in formato CSV.",
        recent: "Ultimi dati",
      },
      stats: {
        totalPlants: "Piante totali",
        activePlants: "Piante attive",
        totalInterventions: "Interventi totali",
        last30Interventions: "Interventi ultimi 30 giorni",
        totalTasks: "Attività totali",
        openTasks: "Attività aperte",
        dueToday: "In scadenza oggi",
        overdue: "In ritardo",
        completedTasks: "Completate",
        pendingProposals: "Proposte in attesa",
        notifications: "Avvisi generati",
      },
      exports: {
        plantsTitle: "Esporta piante",
        plantsDescription: "Elenco piante con codice, stato, ambiente e dati principali.",
        interventionsTitle: "Esporta interventi",
        interventionsDescription: "Storico interventi, operatori, date e dettagli registrati.",
        tasksTitle: "Esporta attività",
        tasksDescription: "Attività con scadenze, priorità, stato e responsabile.",
        download: "Scarica CSV",
      },
      hints: {
        noSchemaChange: "Questi rapporti usano i dati già presenti: non richiedono modifiche al database.",
        csvNote: "I file CSV possono essere aperti con Excel, Numbers o Google Sheets.",
      },
    },
  },
  es: {
    dashboard: {
      eyebrow: "Centro operativo",
      actionTasks: "Ver tareas",
      actionToday: "Abrir hoy",
      stats: {
        openTasks: "Tareas abiertas",
        dueToday: "Vencen hoy",
        overdue: "Atrasadas",
        unreadNotices: "Avisos pendientes",
        activePlants: "Plantas activas",
        completedTasks: "Tareas completadas",
      },
      sections: {
        doNow: "Para hacer ahora",
        doNowHint: "Las tareas más urgentes, ordenadas por fecha.",
        plantsToWatch: "Plantas a seguir",
        plantsToWatchHint: "Plantas con tareas todavía abiertas.",
        recentInterventions: "Últimas intervenciones",
        recentInterventionsHint: "Trabajos registrados recientemente.",
        quickActions: "Accesos rápidos",
      },
      empty: {
        noUrgentTasks: "No hay tareas urgentes por gestionar.",
        noPlantsToWatch: "Ninguna planta requiere atención inmediata.",
        noRecentInterventions: "No hay intervenciones recientes registradas.",
      },
      labels: {
        due: "Vencimiento",
        responsible: "Responsable",
        noResponsible: "Sin asignar",
        open: "Abrir",
        viewPlant: "Ver planta",
        tasksOpen: "tareas abiertas",
        lastWork: "Última intervención",
        plant: "Planta",
      },
      quick: {
        today: "Hoy",
        allTasks: "Todas las tareas",
        plants: "Plantas",
        reports: "Informes",
        schedules: "Programaciones",
      },
    },
    reports: {
      eyebrow: "Datos y descargas",
      description: "Una vista resumida del trabajo registrado y los datos exportables.",
      sections: {
        operations: "Vista general",
        tasks: "Estado de tareas",
        exports: "Exportaciones",
        exportsHint: "Descarga los datos principales en formato CSV.",
        recent: "Últimos datos",
      },
      stats: {
        totalPlants: "Plantas totales",
        activePlants: "Plantas activas",
        totalInterventions: "Intervenciones totales",
        last30Interventions: "Intervenciones últimos 30 días",
        totalTasks: "Tareas totales",
        openTasks: "Tareas abiertas",
        dueToday: "Vencen hoy",
        overdue: "Atrasadas",
        completedTasks: "Completadas",
        pendingProposals: "Propuestas pendientes",
        notifications: "Avisos generados",
      },
      exports: {
        plantsTitle: "Exportar plantas",
        plantsDescription: "Listado de plantas con código, estado, ambiente y datos principales.",
        interventionsTitle: "Exportar intervenciones",
        interventionsDescription: "Historial de intervenciones, operadores, fechas y detalles registrados.",
        tasksTitle: "Exportar tareas",
        tasksDescription: "Tareas con vencimientos, prioridad, estado y responsable.",
        download: "Descargar CSV",
      },
      hints: {
        noSchemaChange: "Estos informes usan los datos existentes: no requieren cambios en la base de datos.",
        csvNote: "Los archivos CSV se pueden abrir con Excel, Numbers o Google Sheets.",
      },
    },
  },
  en: {
    dashboard: {
      eyebrow: "Operations hub",
      actionTasks: "View tasks",
      actionToday: "Open today",
      stats: {
        openTasks: "Open tasks",
        dueToday: "Due today",
        overdue: "Overdue",
        unreadNotices: "Unread notices",
        activePlants: "Active plants",
        completedTasks: "Completed tasks",
      },
      sections: {
        doNow: "Do now",
        doNowHint: "The most urgent tasks, ordered by due date.",
        plantsToWatch: "Plants to watch",
        plantsToWatchHint: "Plants with open work still pending.",
        recentInterventions: "Recent interventions",
        recentInterventionsHint: "The latest recorded work.",
        quickActions: "Quick actions",
      },
      empty: {
        noUrgentTasks: "There are no urgent tasks to manage.",
        noPlantsToWatch: "No plant needs immediate attention.",
        noRecentInterventions: "No recent interventions recorded.",
      },
      labels: {
        due: "Due",
        responsible: "Responsible",
        noResponsible: "Unassigned",
        open: "Open",
        viewPlant: "View plant",
        tasksOpen: "open tasks",
        lastWork: "Latest intervention",
        plant: "Plant",
      },
      quick: {
        today: "Today",
        allTasks: "All tasks",
        plants: "Plants",
        reports: "Reports",
        schedules: "Schedules",
      },
    },
    reports: {
      eyebrow: "Data and downloads",
      description: "A clear overview of recorded work and exportable data.",
      sections: {
        operations: "General overview",
        tasks: "Task status",
        exports: "Exports",
        exportsHint: "Download the main datasets as CSV files.",
        recent: "Latest data",
      },
      stats: {
        totalPlants: "Total plants",
        activePlants: "Active plants",
        totalInterventions: "Total interventions",
        last30Interventions: "Interventions last 30 days",
        totalTasks: "Total tasks",
        openTasks: "Open tasks",
        dueToday: "Due today",
        overdue: "Overdue",
        completedTasks: "Completed",
        pendingProposals: "Pending proposals",
        notifications: "Generated notices",
      },
      exports: {
        plantsTitle: "Export plants",
        plantsDescription: "Plant list with code, status, environment and key details.",
        interventionsTitle: "Export interventions",
        interventionsDescription: "Intervention history with operators, dates and recorded details.",
        tasksTitle: "Export tasks",
        tasksDescription: "Tasks with due dates, priority, status and responsible person.",
        download: "Download CSV",
      },
      hints: {
        noSchemaChange: "These reports use existing data and do not require database changes.",
        csvNote: "CSV files can be opened with Excel, Numbers or Google Sheets.",
      },
    },
  },
  sk: {
    dashboard: {
      eyebrow: "Operačné centrum",
      actionTasks: "Zobraziť úlohy",
      actionToday: "Otvoriť dnešok",
      stats: {
        openTasks: "Otvorené úlohy",
        dueToday: "Termín dnes",
        overdue: "Po termíne",
        unreadNotices: "Neprečítané upozornenia",
        activePlants: "Aktívne rastliny",
        completedTasks: "Dokončené úlohy",
      },
      sections: {
        doNow: "Urobiť teraz",
        doNowHint: "Najnaliehavejšie úlohy zoradené podľa termínu.",
        plantsToWatch: "Rastliny na sledovanie",
        plantsToWatchHint: "Rastliny s otvorenou prácou.",
        recentInterventions: "Posledné zásahy",
        recentInterventionsHint: "Najnovšie zaznamenané práce.",
        quickActions: "Rýchle akcie",
      },
      empty: {
        noUrgentTasks: "Nie sú žiadne naliehavé úlohy.",
        noPlantsToWatch: "Žiadna rastlina nevyžaduje okamžitú pozornosť.",
        noRecentInterventions: "Nie sú zaznamenané žiadne nedávne zásahy.",
      },
      labels: {
        due: "Termín",
        responsible: "Zodpovedný",
        noResponsible: "Nepriradené",
        open: "Otvoriť",
        viewPlant: "Zobraziť rastlinu",
        tasksOpen: "otvorené úlohy",
        lastWork: "Posledný zásah",
        plant: "Rastlina",
      },
      quick: {
        today: "Dnes",
        allTasks: "Všetky úlohy",
        plants: "Rastliny",
        reports: "Prehľady",
        schedules: "Plánovania",
      },
    },
    reports: {
      eyebrow: "Dáta a exporty",
      description: "Prehľad zaznamenanej práce a exportovateľných údajov.",
      sections: {
        operations: "Všeobecný prehľad",
        tasks: "Stav úloh",
        exports: "Exporty",
        exportsHint: "Stiahnite hlavné údaje vo formáte CSV.",
        recent: "Najnovšie údaje",
      },
      stats: {
        totalPlants: "Rastliny celkom",
        activePlants: "Aktívne rastliny",
        totalInterventions: "Zásahy celkom",
        last30Interventions: "Zásahy za posledných 30 dní",
        totalTasks: "Úlohy celkom",
        openTasks: "Otvorené úlohy",
        dueToday: "Termín dnes",
        overdue: "Po termíne",
        completedTasks: "Dokončené",
        pendingProposals: "Čakajúce návrhy",
        notifications: "Vygenerované upozornenia",
      },
      exports: {
        plantsTitle: "Exportovať rastliny",
        plantsDescription: "Zoznam rastlín s kódom, stavom, prostredím a hlavnými údajmi.",
        interventionsTitle: "Exportovať zásahy",
        interventionsDescription: "História zásahov s operátormi, dátumami a detailmi.",
        tasksTitle: "Exportovať úlohy",
        tasksDescription: "Úlohy s termínmi, prioritou, stavom a zodpovednou osobou.",
        download: "Stiahnuť CSV",
      },
      hints: {
        noSchemaChange: "Tieto prehľady používajú existujúce údaje a nevyžadujú zmeny databázy.",
        csvNote: "CSV súbory otvoríte v Exceli, Numbers alebo Google Sheets.",
      },
    },
  },
  fr: {
    dashboard: {
      eyebrow: "Centre opérationnel",
      actionTasks: "Voir les tâches",
      actionToday: "Ouvrir aujourd’hui",
      stats: {
        openTasks: "Tâches ouvertes",
        dueToday: "À faire aujourd’hui",
        overdue: "En retard",
        unreadNotices: "Avis non lus",
        activePlants: "Plantes actives",
        completedTasks: "Tâches terminées",
      },
      sections: {
        doNow: "À faire maintenant",
        doNowHint: "Les tâches les plus urgentes, classées par échéance.",
        plantsToWatch: "Plantes à suivre",
        plantsToWatchHint: "Plantes avec du travail encore ouvert.",
        recentInterventions: "Dernières interventions",
        recentInterventionsHint: "Travaux enregistrés récemment.",
        quickActions: "Accès rapides",
      },
      empty: {
        noUrgentTasks: "Aucune tâche urgente à gérer.",
        noPlantsToWatch: "Aucune plante ne demande une attention immédiate.",
        noRecentInterventions: "Aucune intervention récente enregistrée.",
      },
      labels: {
        due: "Échéance",
        responsible: "Responsable",
        noResponsible: "Non assignée",
        open: "Ouvrir",
        viewPlant: "Voir la plante",
        tasksOpen: "tâches ouvertes",
        lastWork: "Dernière intervention",
        plant: "Plante",
      },
      quick: {
        today: "Aujourd’hui",
        allTasks: "Toutes les tâches",
        plants: "Plantes",
        reports: "Rapports",
        schedules: "Programmations",
      },
    },
    reports: {
      eyebrow: "Données et téléchargements",
      description: "Une vue synthétique du travail enregistré et des données exportables.",
      sections: {
        operations: "Vue générale",
        tasks: "État des tâches",
        exports: "Exports",
        exportsHint: "Téléchargez les données principales au format CSV.",
        recent: "Dernières données",
      },
      stats: {
        totalPlants: "Plantes totales",
        activePlants: "Plantes actives",
        totalInterventions: "Interventions totales",
        last30Interventions: "Interventions des 30 derniers jours",
        totalTasks: "Tâches totales",
        openTasks: "Tâches ouvertes",
        dueToday: "À faire aujourd’hui",
        overdue: "En retard",
        completedTasks: "Terminées",
        pendingProposals: "Propositions en attente",
        notifications: "Avis générés",
      },
      exports: {
        plantsTitle: "Exporter les plantes",
        plantsDescription: "Liste des plantes avec code, état, environnement et données principales.",
        interventionsTitle: "Exporter les interventions",
        interventionsDescription: "Historique des interventions avec opérateurs, dates et détails.",
        tasksTitle: "Exporter les tâches",
        tasksDescription: "Tâches avec échéances, priorité, état et responsable.",
        download: "Télécharger CSV",
      },
      hints: {
        noSchemaChange: "Ces rapports utilisent les données existantes et ne nécessitent aucune modification de base de données.",
        csvNote: "Les fichiers CSV peuvent être ouverts avec Excel, Numbers ou Google Sheets.",
      },
    },
  },
  de: {
    dashboard: {
      eyebrow: "Operationszentrum",
      actionTasks: "Aufgaben ansehen",
      actionToday: "Heute öffnen",
      stats: {
        openTasks: "Offene Aufgaben",
        dueToday: "Heute fällig",
        overdue: "Überfällig",
        unreadNotices: "Ungelesene Hinweise",
        activePlants: "Aktive Pflanzen",
        completedTasks: "Erledigte Aufgaben",
      },
      sections: {
        doNow: "Jetzt erledigen",
        doNowHint: "Die dringendsten Aufgaben nach Fälligkeit sortiert.",
        plantsToWatch: "Pflanzen im Blick",
        plantsToWatchHint: "Pflanzen mit noch offenen Aufgaben.",
        recentInterventions: "Letzte Eingriffe",
        recentInterventionsHint: "Zuletzt erfasste Arbeiten.",
        quickActions: "Schnellzugriffe",
      },
      empty: {
        noUrgentTasks: "Es gibt keine dringenden Aufgaben.",
        noPlantsToWatch: "Keine Pflanze benötigt sofortige Aufmerksamkeit.",
        noRecentInterventions: "Keine aktuellen Eingriffe erfasst.",
      },
      labels: {
        due: "Fällig",
        responsible: "Verantwortlich",
        noResponsible: "Nicht zugewiesen",
        open: "Öffnen",
        viewPlant: "Pflanze ansehen",
        tasksOpen: "offene Aufgaben",
        lastWork: "Letzter Eingriff",
        plant: "Pflanze",
      },
      quick: {
        today: "Heute",
        allTasks: "Alle Aufgaben",
        plants: "Pflanzen",
        reports: "Berichte",
        schedules: "Planungen",
      },
    },
    reports: {
      eyebrow: "Daten und Downloads",
      description: "Eine übersichtliche Ansicht der erfassten Arbeit und exportierbaren Daten.",
      sections: {
        operations: "Allgemeiner Überblick",
        tasks: "Aufgabenstatus",
        exports: "Exporte",
        exportsHint: "Laden Sie die wichtigsten Daten als CSV herunter.",
        recent: "Aktuelle Daten",
      },
      stats: {
        totalPlants: "Pflanzen gesamt",
        activePlants: "Aktive Pflanzen",
        totalInterventions: "Eingriffe gesamt",
        last30Interventions: "Eingriffe der letzten 30 Tage",
        totalTasks: "Aufgaben gesamt",
        openTasks: "Offene Aufgaben",
        dueToday: "Heute fällig",
        overdue: "Überfällig",
        completedTasks: "Erledigt",
        pendingProposals: "Ausstehende Vorschläge",
        notifications: "Erzeugte Hinweise",
      },
      exports: {
        plantsTitle: "Pflanzen exportieren",
        plantsDescription: "Pflanzenliste mit Code, Status, Umgebung und Kerndaten.",
        interventionsTitle: "Eingriffe exportieren",
        interventionsDescription: "Verlauf der Eingriffe mit Bedienern, Daten und Details.",
        tasksTitle: "Aufgaben exportieren",
        tasksDescription: "Aufgaben mit Fälligkeit, Priorität, Status und Verantwortlichen.",
        download: "CSV herunterladen",
      },
      hints: {
        noSchemaChange: "Diese Berichte nutzen vorhandene Daten und erfordern keine Datenbankänderungen.",
        csvNote: "CSV-Dateien können mit Excel, Numbers oder Google Sheets geöffnet werden.",
      },
    },
  },
  ru: {
    dashboard: {
      eyebrow: "Операционный центр",
      actionTasks: "Открыть задачи",
      actionToday: "Открыть сегодня",
      stats: {
        openTasks: "Открытые задачи",
        dueToday: "На сегодня",
        overdue: "Просрочено",
        unreadNotices: "Непрочитанные уведомления",
        activePlants: "Активные растения",
        completedTasks: "Выполненные задачи",
      },
      sections: {
        doNow: "Что сделать сейчас",
        doNowHint: "Самые срочные задачи, отсортированные по сроку.",
        plantsToWatch: "Растения под наблюдением",
        plantsToWatchHint: "Растения с открытыми задачами.",
        recentInterventions: "Последние работы",
        recentInterventionsHint: "Недавно зарегистрированные работы.",
        quickActions: "Быстрые действия",
      },
      empty: {
        noUrgentTasks: "Срочных задач нет.",
        noPlantsToWatch: "Нет растений, требующих немедленного внимания.",
        noRecentInterventions: "Недавних работ не зарегистрировано.",
      },
      labels: {
        due: "Срок",
        responsible: "Ответственный",
        noResponsible: "Не назначено",
        open: "Открыть",
        viewPlant: "Открыть растение",
        tasksOpen: "открытые задачи",
        lastWork: "Последняя работа",
        plant: "Растение",
      },
      quick: {
        today: "Сегодня",
        allTasks: "Все задачи",
        plants: "Растения",
        reports: "Отчёты",
        schedules: "Расписания",
      },
    },
    reports: {
      eyebrow: "Данные и загрузки",
      description: "Сводка зарегистрированных работ и данных для экспорта.",
      sections: {
        operations: "Общий обзор",
        tasks: "Состояние задач",
        exports: "Экспорт",
        exportsHint: "Скачайте основные данные в формате CSV.",
        recent: "Последние данные",
      },
      stats: {
        totalPlants: "Всего растений",
        activePlants: "Активные растения",
        totalInterventions: "Всего работ",
        last30Interventions: "Работы за последние 30 дней",
        totalTasks: "Всего задач",
        openTasks: "Открытые задачи",
        dueToday: "На сегодня",
        overdue: "Просрочено",
        completedTasks: "Выполнено",
        pendingProposals: "Ожидающие предложения",
        notifications: "Созданные уведомления",
      },
      exports: {
        plantsTitle: "Экспорт растений",
        plantsDescription: "Список растений с кодом, статусом, средой и основными данными.",
        interventionsTitle: "Экспорт работ",
        interventionsDescription: "История работ с операторами, датами и деталями.",
        tasksTitle: "Экспорт задач",
        tasksDescription: "Задачи со сроками, приоритетом, статусом и ответственным.",
        download: "Скачать CSV",
      },
      hints: {
        noSchemaChange: "Эти отчёты используют существующие данные и не требуют изменений базы данных.",
        csvNote: "CSV-файлы можно открыть в Excel, Numbers или Google Sheets.",
      },
    },
  },
  hu: {
    dashboard: {
      eyebrow: "Műveleti központ",
      actionTasks: "Feladatok megnyitása",
      actionToday: "Mai nap megnyitása",
      stats: {
        openTasks: "Nyitott feladatok",
        dueToday: "Ma esedékes",
        overdue: "Lejárt",
        unreadNotices: "Olvasatlan értesítések",
        activePlants: "Aktív növények",
        completedTasks: "Befejezett feladatok",
      },
      sections: {
        doNow: "Most elvégzendő",
        doNowHint: "A legsürgősebb feladatok határidő szerint rendezve.",
        plantsToWatch: "Figyelendő növények",
        plantsToWatchHint: "Növények nyitott feladatokkal.",
        recentInterventions: "Legutóbbi beavatkozások",
        recentInterventionsHint: "Legutóbb rögzített munkák.",
        quickActions: "Gyors műveletek",
      },
      empty: {
        noUrgentTasks: "Nincs sürgős kezelendő feladat.",
        noPlantsToWatch: "Egy növény sem igényel azonnali figyelmet.",
        noRecentInterventions: "Nincs nemrég rögzített beavatkozás.",
      },
      labels: {
        due: "Határidő",
        responsible: "Felelős",
        noResponsible: "Nincs hozzárendelve",
        open: "Megnyitás",
        viewPlant: "Növény megnyitása",
        tasksOpen: "nyitott feladat",
        lastWork: "Utolsó beavatkozás",
        plant: "Növény",
      },
      quick: {
        today: "Ma",
        allTasks: "Összes feladat",
        plants: "Növények",
        reports: "Jelentések",
        schedules: "Ütemezések",
      },
    },
    reports: {
      eyebrow: "Adatok és letöltések",
      description: "Áttekintés a rögzített munkáról és az exportálható adatokról.",
      sections: {
        operations: "Általános áttekintés",
        tasks: "Feladatok állapota",
        exports: "Exportok",
        exportsHint: "Töltsd le a fő adatokat CSV formátumban.",
        recent: "Legutóbbi adatok",
      },
      stats: {
        totalPlants: "Összes növény",
        activePlants: "Aktív növények",
        totalInterventions: "Összes beavatkozás",
        last30Interventions: "Beavatkozások az elmúlt 30 napban",
        totalTasks: "Összes feladat",
        openTasks: "Nyitott feladatok",
        dueToday: "Ma esedékes",
        overdue: "Lejárt",
        completedTasks: "Befejezett",
        pendingProposals: "Függő javaslatok",
        notifications: "Létrehozott értesítések",
      },
      exports: {
        plantsTitle: "Növények exportálása",
        plantsDescription: "Növénylista kóddal, állapottal, környezettel és fő adatokkal.",
        interventionsTitle: "Beavatkozások exportálása",
        interventionsDescription: "Beavatkozási előzmények operátorokkal, dátumokkal és részletekkel.",
        tasksTitle: "Feladatok exportálása",
        tasksDescription: "Feladatok határidővel, prioritással, állapottal és felelőssel.",
        download: "CSV letöltése",
      },
      hints: {
        noSchemaChange: "Ezek a jelentések meglévő adatokat használnak, adatbázis-módosítás nélkül.",
        csvNote: "A CSV fájlok megnyithatók Excelben, Numbersben vagy Google Sheetsben.",
      },
    },
  },
};

export function getDashboardReportsText(locale: Locale) {
  return copy[locale] ?? copy[DEFAULT_LOCALE];
}
