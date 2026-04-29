import type { Locale } from "./config";
import { DEFAULT_LOCALE } from "./config";

export const dictionary = {
  it: {

    common: {
      appName: "Agri App",
      open: "Apri",
      save: "Salva",
      saveChanges: "Salva modifiche",
      cancel: "Annulla",
      back: "Indietro",
      loading: "Caricamento…",
      noData: "Nessun dato disponibile.",
      yes: "Sì",
      no: "No",
      search: "Cerca",
      language: "Lingua",
      responsible: "Responsabile",
      notAssigned: "Non assegnato",
      plant: "Pianta",
      plants: "Piante",
      task: "Attività",
      tasks: "Attività",
      today: "Oggi",
      status: "Stato",
      notes: "Note",
      date: "Data",
      email: "Email",
      password: "Password",
      code: "Codice",
      state: "Stato",
      recentInterventions: "Interventi recenti",
      recentTasks: "Attività recenti",
      planned: "Previsto",
      completed: "Completato",
      type: "Tipo"
    },
    nav: {
      summary: "Riepilogo",
      plants: "Piante",
      interventions: "Interventi",
      tasks: "Attività",
      today: "Oggi",
      notices: "Avvisi",
      reports: "Report",
      scan: "Scanner",
      offline: "Offline",
      scheduledTasks: "Programmazioni",
      approvals: "Approvazioni",
      users: "Utenti",
      system: "Sistema",
      login: "Accedi",
      logout: "Esci"
    },
    shell: {
      signedInAs: "Accesso come",
      roleSuperAdmin: "Amministratore",
      roleOperator: "Operatore"
    },
    dashboard: {
      title: "Riepilogo",
      eyebrow: "Vista generale",
      plants: "Piante",
      interventions: "Interventi",
      tasks: "Attività",
      unreadNotices: "Avvisi da leggere",
      todayTitle: "Oggi",
      todayDescription: "Consulta le attività previste e il lavoro da completare.",
      offlineTitle: "Lavoro offline",
      offlineDescription: "Controlla le modifiche salvate senza connessione e sincronizzale quando torna internet."
    },
    notices: {
      title: "Avvisi",
      eyebrow: "Centro avvisi",
      preferences: "Impostazioni",
      markAllRead: "Segna tutti come letti",
      unread: "Da leggere",
      generatedToday: "Ricevuti oggi",
      empty: "Non hai avvisi per ora.",
      read: "Letto",
      unreadState: "Da leggere",
      alreadyRead: "Già letto",
      markRead: "Segna come letto"
    },
    notificationSettings: {
      title: "Impostazioni avvisi",
      eyebrow: "Preferenze personali",
      saved: "Modifiche salvate correttamente.",
      channelsTitle: "Come vuoi ricevere gli avvisi",
      channelsDescription: "Gli avvisi dentro l’app sono attivi. L’invio email è predisposto, ma resta disattivato finché non viene abilitato dal servizio.",
      inAppEnabled: "Ricevere avvisi dentro l’app",
      emailEnabled: "Ricevere avvisi via email",
      eventsTitle: "Quali avvisi vuoi ricevere",
      taskDueToday: "Attività in scadenza oggi",
      taskDueTomorrow: "Attività in scadenza domani",
      overdueTasks: "Attività scadute non completate",
      proposalUpdates: "Aggiornamenti sulle proposte di intervento",
      systemMessages: "Messaggi importanti del sistema",
      scheduleTitle: "Orario, zona oraria e lingua",
      dailyDigestHour: "Ora del riepilogo giornaliero",
      timezone: "Zona oraria",
      locale: "Lingua preferita"
    },
    recurring: {
      title: "Programmazioni",
      eyebrow: "Attività ricorrenti",
      goToPlants: "Vai alle piante",
      generateNow: "Crea attività ora",
      generationDone: "Processo completato.",
      created: "Create",
      skipped: "Saltate",
      total: "Programmazioni totali",
      active: "Attive",
      paused: "In pausa",
      empty: "Non ci sono ancora attività programmate. Apri una pianta e crea una programmazione.",
      nextDate: "Prossima data",
      lastGenerated: "Ultima attività creata",
      pause: "Pausa",
      resume: "Riattiva",
      viewPlant: "Vedi pianta"
    },
    todayPage: {
      title: "Oggi",
      eyebrow: "Agenda del giorno",
      notices: "Avvisi",
      tasksToManage: "Attività da gestire",
      overdue: "In ritardo",
      unreadNotices: "Avvisi da leggere",
      overdueTitle: "Attività in ritardo",
      todayTitle: "Attività di oggi",
      emptyToday: "Nessuna attività prevista per oggi."
    },
    tasksPage: {
      title: "Attività",
      eyebrow: "Agenda completa",
      empty: "Non ci sono attività da mostrare."
    },
    plantsPage: {
      title: "Piante e alberi",
      eyebrow: "Archivio",
      newPlant: "Nuova pianta",
      empty: "Non ci sono ancora piante in archivio."
    },
    interventionsPage: {
      title: "Interventi",
      eyebrow: "Storico lavori",
      empty: "Non ci sono interventi registrati."
    },
    reportsPage: {
      title: "Report",
      eyebrow: "Area amministratore",
      pendingProposals: "Proposte da controllare",
      exportPlants: "Esporta piante in CSV",
      exportInterventions: "Esporta interventi in CSV",
      exportTasks: "Esporta attività in CSV"
    },
    approvalsPage: {
      title: "Approvazioni",
      eyebrow: "Proposte da controllare",
      empty: "Non ci sono proposte in attesa.",
      proposedBy: "proposta da",
      approve: "Approva",
      reject: "Rifiuta"
    },
    admin: {
      usersTitle: "Utenti",
      usersEyebrow: "Gestione accessi",
      systemTitle: "Sistema",
      systemEyebrow: "Controlli tecnici",
      database: "Database",
      connectionError: "Connessione non disponibile",
      serverEnv: "Configurazione server",
      valid: "Valida",
      invalid: "Da controllare",
      publicConfig: "Configurazione pubblica"
    },
    auth: {
      loginTitle: "Accesso",
      loginEyebrow: "Area riservata",
      invalidCredentials: "Email o password non corretti.",
      signingIn: "Accesso in corso…",
      signIn: "Accedi",
      devSeedTitle: "Credenziali demo DEV",
      forbiddenTitle: "Accesso non consentito",
      forbiddenEyebrow: "Permessi insufficienti",
      forbiddenHeading: "Non hai i permessi per entrare in questa sezione.",
      forbiddenBody: "Se pensi che sia un errore, chiedi a un amministratore di verificare il tuo profilo.",
      backToSummary: "Torna al riepilogo",
      goToLogin: "Vai all’accesso"
    },
    labels: {
      roles: {
        SUPER_ADMIN: "Amministratore",
        OPERATOR: "Operatore"
      },
      priorities: {
        MANDATORY: "Prioritaria",
        RECOMMENDED: "Consigliata"
      },
      taskStatuses: {
        SCHEDULED: "Programmata",
        NOTIFIED: "Avvisata",
        DONE: "Completata",
        SKIPPED: "Saltata",
        EXPIRED: "Scaduta"
      },
      recurrence: {
        DAILY: "Ogni giorno",
        WEEKLY: "Ogni settimana",
        EVERY_X_DAYS: "Ogni {days} giorni"
      },
      notificationTypes: {
        INFO: "Informazione",
        TASK: "Attività",
        APPROVAL: "Approvazione",
        SYSTEM: "Sistema"
      },
      plantTypes: {
        PLANT: "Pianta",
        TREE: "Albero"
      },
      environments: {
        INDOOR: "Interno",
        OUTDOOR: "Esterno"
      },
      plantStatuses: {
        ACTIVE: "Attiva",
        ARCHIVED: "Archiviata",
        REMOVED: "Rimossa"
      },
      interventionTypes: {
        IRRIGATION: "Irrigazione",
        PRUNING: "Potatura",
        FERTILIZATION: "Concimazione",
        PHYTOSANITARY: "Trattamento",
        MEASUREMENT: "Misurazione",
        TRANSPLANT: "Trapianto",
        HARVEST: "Raccolta",
        OTHER: "Altro"
      }
    }
  ,
    backend: {
      chooseStartDate: "Scegli una data iniziale.",
      loginRequired: "La sessione non è attiva. Accedi di nuovo.",
      noPermission: "Non hai i permessi per questa operazione.",
      invalidPayload: "I dati inviati non sono validi. Controlla e riprova.",
      unsupportedOperation: "Questa operazione non è supportata.",
      unknownError: "Si è verificato un errore. Riprova tra poco.",
      missingFile: "Aggiungi un file prima di continuare.",
      cronUnauthorized: "Accesso non valido per questa operazione automatica.",
      choosePlant: "Scegli una pianta.",
      enterTitle: "Inserisci un titolo.",
      proposalsTitle: "Proposte da controllare",
      todaySection: "Attività di oggi",
      tomorrowSection: "Attività di domani",
      overdueSection: "Attività scadute",
      proposalsSection: "Proposte da controllare",
      appLink: "Apri l’app",
      noticesLink: "Centro avvisi",
      taskTodayTitle: (taskTitle: string) => `Attività di oggi: ${taskTitle}`,
      taskTodayMessage: (plantLabel: string) => `${plantLabel} • in scadenza oggi`,
      taskTomorrowTitle: (taskTitle: string) => `Attività di domani: ${taskTitle}`,
      taskTomorrowMessage: (plantLabel: string) => `${plantLabel} • in scadenza domani`,
      taskOverdueTitle: (taskTitle: string) => `Attività scaduta: ${taskTitle}`,
      taskOverdueMessage: (plantLabel: string) => `${plantLabel} • da completare`,
      proposalsMessage: (count: number) => `Ci sono ${count} proposte da verificare.`,
      digestGreeting: (name: string) => `Ciao ${name}, ecco il tuo riepilogo giornaliero`,
      digestGreetingText: (name: string) => `Ciao ${name}, ecco il tuo riepilogo giornaliero.`,
      digestSubject: (dateKey: string) => `Agri App • riepilogo giornaliero ${dateKey}`
    }
  },
  es: {

    common: {
      appName: "Agri App",
      open: "Abrir",
      save: "Guardar",
      saveChanges: "Guardar cambios",
      cancel: "Cancelar",
      back: "Volver",
      loading: "Cargando…",
      noData: "No hay datos disponibles.",
      yes: "Sí",
      no: "No",
      search: "Buscar",
      language: "Idioma",
      responsible: "Responsable",
      notAssigned: "Sin asignar",
      plant: "Planta",
      plants: "Plantas",
      task: "Tarea",
      tasks: "Tareas",
      today: "Hoy",
      status: "Estado",
      notes: "Notas",
      date: "Fecha",
      email: "Email",
      password: "Contraseña",
      code: "Código",
      state: "Estado",
      recentInterventions: "Intervenciones recientes",
      recentTasks: "Tareas recientes",
      planned: "Previsto",
      completed: "Completado",
      type: "Tipo"
    },
    nav: {
      summary: "Resumen",
      plants: "Plantas",
      interventions: "Intervenciones",
      tasks: "Tareas",
      today: "Hoy",
      notices: "Avisos",
      reports: "Informes",
      scan: "Escáner",
      offline: "Sin conexión",
      scheduledTasks: "Programaciones",
      approvals: "Aprobaciones",
      users: "Usuarios",
      system: "Sistema",
      login: "Entrar",
      logout: "Salir"
    },
    shell: {
      signedInAs: "Sesión iniciada como",
      roleSuperAdmin: "Administrador",
      roleOperator: "Operador"
    },
    dashboard: {
      title: "Resumen",
      eyebrow: "Vista general",
      plants: "Plantas",
      interventions: "Intervenciones",
      tasks: "Tareas",
      unreadNotices: "Avisos pendientes",
      todayTitle: "Hoy",
      todayDescription: "Consulta el trabajo previsto y las tareas pendientes.",
      offlineTitle: "Trabajo sin conexión",
      offlineDescription: "Revisa los cambios guardados sin conexión y sincronízalos cuando vuelva internet."
    },
    notices: {
      title: "Avisos",
      eyebrow: "Centro de avisos",
      preferences: "Ajustes",
      markAllRead: "Marcar todos como leídos",
      unread: "Pendientes",
      generatedToday: "Recibidos hoy",
      empty: "No tienes avisos por ahora.",
      read: "Leído",
      unreadState: "Pendiente",
      alreadyRead: "Ya leído",
      markRead: "Marcar como leído"
    },
    notificationSettings: {
      title: "Ajustes de avisos",
      eyebrow: "Preferencias personales",
      saved: "Cambios guardados correctamente.",
      channelsTitle: "Cómo quieres recibir avisos",
      channelsDescription: "Los avisos dentro de la app están activos. El envío por email está preparado, pero seguirá desactivado hasta habilitarlo desde el servicio.",
      inAppEnabled: "Recibir avisos dentro de la app",
      emailEnabled: "Recibir avisos por email",
      eventsTitle: "Qué avisos quieres recibir",
      taskDueToday: "Tareas que vencen hoy",
      taskDueTomorrow: "Tareas que vencen mañana",
      overdueTasks: "Tareas vencidas sin completar",
      proposalUpdates: "Cambios en propuestas de intervención",
      systemMessages: "Avisos importantes del sistema",
      scheduleTitle: "Horario, zona horaria e idioma",
      dailyDigestHour: "Hora del resumen diario",
      timezone: "Zona horaria",
      locale: "Idioma preferido"
    },
    recurring: {
      title: "Programaciones",
      eyebrow: "Tareas recurrentes",
      goToPlants: "Ir a plantas",
      generateNow: "Crear tareas ahora",
      generationDone: "Proceso completado.",
      created: "Creadas",
      skipped: "Omitidas",
      total: "Programaciones totales",
      active: "Activas",
      paused: "En pausa",
      empty: "Aún no hay tareas programadas. Abre una planta y crea una programación.",
      nextDate: "Próxima fecha",
      lastGenerated: "Última tarea creada",
      pause: "Pausar",
      resume: "Reactivar",
      viewPlant: "Ver planta"
    },
    todayPage: {
      title: "Hoy",
      eyebrow: "Agenda del día",
      notices: "Avisos",
      tasksToManage: "Tareas por gestionar",
      overdue: "Vencidas",
      unreadNotices: "Avisos pendientes",
      overdueTitle: "Tareas vencidas",
      todayTitle: "Tareas de hoy",
      emptyToday: "No hay tareas programadas para hoy."
    },
    tasksPage: {
      title: "Tareas",
      eyebrow: "Agenda completa",
      empty: "No hay tareas para mostrar."
    },
    plantsPage: {
      title: "Plantas y árboles",
      eyebrow: "Archivo",
      newPlant: "Nueva planta",
      empty: "Aún no hay plantas en el archivo."
    },
    interventionsPage: {
      title: "Intervenciones",
      eyebrow: "Historial de trabajos",
      empty: "No hay intervenciones registradas."
    },
    reportsPage: {
      title: "Informes",
      eyebrow: "Área de administración",
      pendingProposals: "Propuestas por revisar",
      exportPlants: "Exportar plantas en CSV",
      exportInterventions: "Exportar intervenciones en CSV",
      exportTasks: "Exportar tareas en CSV"
    },
    approvalsPage: {
      title: "Aprobaciones",
      eyebrow: "Propuestas por revisar",
      empty: "No hay propuestas pendientes.",
      proposedBy: "propuesta por",
      approve: "Aprobar",
      reject: "Rechazar"
    },
    admin: {
      usersTitle: "Usuarios",
      usersEyebrow: "Gestión de accesos",
      systemTitle: "Sistema",
      systemEyebrow: "Comprobaciones técnicas",
      database: "Base de datos",
      connectionError: "Conexión no disponible",
      serverEnv: "Configuración del servidor",
      valid: "Válida",
      invalid: "Revisar",
      publicConfig: "Configuración pública"
    },
    auth: {
      loginTitle: "Acceso",
      loginEyebrow: "Área privada",
      invalidCredentials: "Email o contraseña incorrectos.",
      signingIn: "Entrando…",
      signIn: "Entrar",
      devSeedTitle: "Credenciales demo DEV",
      forbiddenTitle: "Acceso no permitido",
      forbiddenEyebrow: "Permisos insuficientes",
      forbiddenHeading: "No tienes permisos para entrar en esta sección.",
      forbiddenBody: "Si crees que es un error, pide a un administrador que revise tu perfil.",
      backToSummary: "Volver al resumen",
      goToLogin: "Ir al acceso"
    },
    labels: {
      roles: {
        SUPER_ADMIN: "Administrador",
        OPERATOR: "Operador"
      },
      priorities: {
        MANDATORY: "Prioritaria",
        RECOMMENDED: "Recomendada"
      },
      taskStatuses: {
        SCHEDULED: "Programada",
        NOTIFIED: "Avisada",
        DONE: "Completada",
        SKIPPED: "Omitida",
        EXPIRED: "Vencida"
      },
      recurrence: {
        DAILY: "Cada día",
        WEEKLY: "Cada semana",
        EVERY_X_DAYS: "Cada {days} días"
      },
      notificationTypes: {
        INFO: "Información",
        TASK: "Tarea",
        APPROVAL: "Aprobación",
        SYSTEM: "Sistema"
      },
      plantTypes: {
        PLANT: "Planta",
        TREE: "Árbol"
      },
      environments: {
        INDOOR: "Interior",
        OUTDOOR: "Exterior"
      },
      plantStatuses: {
        ACTIVE: "Activa",
        ARCHIVED: "Archivada",
        REMOVED: "Eliminada"
      },
      interventionTypes: {
        IRRIGATION: "Riego",
        PRUNING: "Poda",
        FERTILIZATION: "Abonado",
        PHYTOSANITARY: "Tratamiento",
        MEASUREMENT: "Medición",
        TRANSPLANT: "Trasplante",
        HARVEST: "Cosecha",
        OTHER: "Otro"
      }
    }
  ,
    backend: {
      chooseStartDate: "Elige una fecha inicial.",
      loginRequired: "La sesión no está activa. Vuelve a entrar.",
      noPermission: "No tienes permiso para esta acción.",
      invalidPayload: "Los datos enviados no son válidos. Revísalos e inténtalo de nuevo.",
      unsupportedOperation: "Esta operación no está disponible.",
      unknownError: "Ha ocurrido un error. Inténtalo de nuevo en unos minutos.",
      missingFile: "Añade un archivo antes de continuar.",
      cronUnauthorized: "Acceso no válido para esta operación automática.",
      choosePlant: "Elige una planta.",
      enterTitle: "Introduce un título.",
      proposalsTitle: "Propuestas por revisar",
      todaySection: "Tareas de hoy",
      tomorrowSection: "Tareas de mañana",
      overdueSection: "Tareas vencidas",
      proposalsSection: "Propuestas por revisar",
      appLink: "Abrir la app",
      noticesLink: "Centro de avisos",
      taskTodayTitle: (taskTitle: string) => `Tarea de hoy: ${taskTitle}`,
      taskTodayMessage: (plantLabel: string) => `${plantLabel} • vence hoy`,
      taskTomorrowTitle: (taskTitle: string) => `Tarea de mañana: ${taskTitle}`,
      taskTomorrowMessage: (plantLabel: string) => `${plantLabel} • vence mañana`,
      taskOverdueTitle: (taskTitle: string) => `Tarea vencida: ${taskTitle}`,
      taskOverdueMessage: (plantLabel: string) => `${plantLabel} • pendiente de completar`,
      proposalsMessage: (count: number) => `Hay ${count} propuestas por revisar.`,
      digestGreeting: (name: string) => `Hola ${name}, aquí tienes tu resumen diario`,
      digestGreetingText: (name: string) => `Hola ${name}, aquí tienes tu resumen diario.`,
      digestSubject: (dateKey: string) => `Agri App • resumen diario ${dateKey}`
    }
  },
  en: {

    common: {
      appName: "Agri App",
      open: "Open",
      save: "Save",
      saveChanges: "Save changes",
      cancel: "Cancel",
      back: "Back",
      loading: "Loading…",
      noData: "No data available.",
      yes: "Yes",
      no: "No",
      search: "Search",
      language: "Language",
      responsible: "Responsible",
      notAssigned: "Unassigned",
      plant: "Plant",
      plants: "Plants",
      task: "Task",
      tasks: "Tasks",
      today: "Today",
      status: "Status",
      notes: "Notes",
      date: "Date",
      email: "Email",
      password: "Password",
      code: "Code",
      state: "Status",
      recentInterventions: "Recent interventions",
      recentTasks: "Recent tasks",
      planned: "Planned",
      completed: "Completed",
      type: "Type"
    },
    nav: {
      summary: "Summary",
      plants: "Plants",
      interventions: "Interventions",
      tasks: "Tasks",
      today: "Today",
      notices: "Notices",
      reports: "Reports",
      scan: "Scanner",
      offline: "Offline",
      scheduledTasks: "Schedules",
      approvals: "Approvals",
      users: "Users",
      system: "System",
      login: "Sign in",
      logout: "Sign out"
    },
    shell: {
      signedInAs: "Signed in as",
      roleSuperAdmin: "Administrator",
      roleOperator: "Operator"
    },
    dashboard: {
      title: "Summary",
      eyebrow: "Overview",
      plants: "Plants",
      interventions: "Interventions",
      tasks: "Tasks",
      unreadNotices: "Unread notices",
      todayTitle: "Today",
      todayDescription: "Review today’s work and the tasks still to complete.",
      offlineTitle: "Offline work",
      offlineDescription: "Review changes saved without connection and sync them when internet is back."
    },
    notices: {
      title: "Notices",
      eyebrow: "Notice center",
      preferences: "Settings",
      markAllRead: "Mark all as read",
      unread: "Unread",
      generatedToday: "Received today",
      empty: "You have no notices for now.",
      read: "Read",
      unreadState: "Unread",
      alreadyRead: "Already read",
      markRead: "Mark as read"
    },
    notificationSettings: {
      title: "Notice settings",
      eyebrow: "Personal preferences",
      saved: "Changes saved successfully.",
      channelsTitle: "How you want to receive notices",
      channelsDescription: "In-app notices are active. Email delivery is ready, but remains disabled until it is enabled from the service.",
      inAppEnabled: "Receive notices inside the app",
      emailEnabled: "Receive notices by email",
      eventsTitle: "Which notices you want to receive",
      taskDueToday: "Tasks due today",
      taskDueTomorrow: "Tasks due tomorrow",
      overdueTasks: "Overdue tasks not completed",
      proposalUpdates: "Updates on intervention proposals",
      systemMessages: "Important system notices",
      scheduleTitle: "Time, time zone and language",
      dailyDigestHour: "Daily summary hour",
      timezone: "Time zone",
      locale: "Preferred language"
    },
    recurring: {
      title: "Schedules",
      eyebrow: "Recurring tasks",
      goToPlants: "Go to plants",
      generateNow: "Create tasks now",
      generationDone: "Process completed.",
      created: "Created",
      skipped: "Skipped",
      total: "Total schedules",
      active: "Active",
      paused: "Paused",
      empty: "There are no scheduled tasks yet. Open a plant and create a schedule.",
      nextDate: "Next date",
      lastGenerated: "Last task created",
      pause: "Pause",
      resume: "Reactivate",
      viewPlant: "View plant"
    },
    todayPage: {
      title: "Today",
      eyebrow: "Day agenda",
      notices: "Notices",
      tasksToManage: "Tasks to manage",
      overdue: "Overdue",
      unreadNotices: "Unread notices",
      overdueTitle: "Overdue tasks",
      todayTitle: "Today’s tasks",
      emptyToday: "No tasks scheduled for today."
    },
    tasksPage: {
      title: "Tasks",
      eyebrow: "Full agenda",
      empty: "There are no tasks to show."
    },
    plantsPage: {
      title: "Plants and trees",
      eyebrow: "Archive",
      newPlant: "New plant",
      empty: "There are no plants in the archive yet."
    },
    interventionsPage: {
      title: "Interventions",
      eyebrow: "Work history",
      empty: "There are no interventions recorded."
    },
    reportsPage: {
      title: "Reports",
      eyebrow: "Administrator area",
      pendingProposals: "Proposals to review",
      exportPlants: "Export plants as CSV",
      exportInterventions: "Export interventions as CSV",
      exportTasks: "Export tasks as CSV"
    },
    approvalsPage: {
      title: "Approvals",
      eyebrow: "Proposals to review",
      empty: "There are no pending proposals.",
      proposedBy: "proposed by",
      approve: "Approve",
      reject: "Reject"
    },
    admin: {
      usersTitle: "Users",
      usersEyebrow: "Access management",
      systemTitle: "System",
      systemEyebrow: "Technical checks",
      database: "Database",
      connectionError: "Connection unavailable",
      serverEnv: "Server configuration",
      valid: "Valid",
      invalid: "Needs review",
      publicConfig: "Public configuration"
    },
    auth: {
      loginTitle: "Sign in",
      loginEyebrow: "Private area",
      invalidCredentials: "Email or password is incorrect.",
      signingIn: "Signing in…",
      signIn: "Sign in",
      devSeedTitle: "DEV demo credentials",
      forbiddenTitle: "Access not allowed",
      forbiddenEyebrow: "Insufficient permissions",
      forbiddenHeading: "You do not have permission to enter this section.",
      forbiddenBody: "If you think this is a mistake, ask an administrator to review your profile.",
      backToSummary: "Back to summary",
      goToLogin: "Go to sign in"
    },
    labels: {
      roles: {
        SUPER_ADMIN: "Administrator",
        OPERATOR: "Operator"
      },
      priorities: {
        MANDATORY: "Priority",
        RECOMMENDED: "Recommended"
      },
      taskStatuses: {
        SCHEDULED: "Scheduled",
        NOTIFIED: "Notified",
        DONE: "Completed",
        SKIPPED: "Skipped",
        EXPIRED: "Expired"
      },
      recurrence: {
        DAILY: "Every day",
        WEEKLY: "Every week",
        EVERY_X_DAYS: "Every {days} days"
      },
      notificationTypes: {
        INFO: "Information",
        TASK: "Task",
        APPROVAL: "Approval",
        SYSTEM: "System"
      },
      plantTypes: {
        PLANT: "Plant",
        TREE: "Tree"
      },
      environments: {
        INDOOR: "Indoor",
        OUTDOOR: "Outdoor"
      },
      plantStatuses: {
        ACTIVE: "Active",
        ARCHIVED: "Archived",
        REMOVED: "Removed"
      },
      interventionTypes: {
        IRRIGATION: "Irrigation",
        PRUNING: "Pruning",
        FERTILIZATION: "Fertilization",
        PHYTOSANITARY: "Treatment",
        MEASUREMENT: "Measurement",
        TRANSPLANT: "Transplant",
        HARVEST: "Harvest",
        OTHER: "Other"
      }
    }
  ,
    backend: {
      chooseStartDate: "Choose a start date.",
      loginRequired: "Your session is not active. Please sign in again.",
      noPermission: "You do not have permission for this action.",
      invalidPayload: "The submitted data is not valid. Please review it and try again.",
      unsupportedOperation: "This operation is not available.",
      unknownError: "Something went wrong. Please try again in a few minutes.",
      missingFile: "Add a file before continuing.",
      cronUnauthorized: "Invalid access for this automated operation.",
      choosePlant: "Choose a plant.",
      enterTitle: "Enter a title.",
      proposalsTitle: "Proposals to review",
      todaySection: "Today’s tasks",
      tomorrowSection: "Tomorrow’s tasks",
      overdueSection: "Overdue tasks",
      proposalsSection: "Proposals to review",
      appLink: "Open the app",
      noticesLink: "Notice center",
      taskTodayTitle: (taskTitle: string) => `Today’s task: ${taskTitle}`,
      taskTodayMessage: (plantLabel: string) => `${plantLabel} • due today`,
      taskTomorrowTitle: (taskTitle: string) => `Tomorrow’s task: ${taskTitle}`,
      taskTomorrowMessage: (plantLabel: string) => `${plantLabel} • due tomorrow`,
      taskOverdueTitle: (taskTitle: string) => `Overdue task: ${taskTitle}`,
      taskOverdueMessage: (plantLabel: string) => `${plantLabel} • still to complete`,
      proposalsMessage: (count: number) => `There are ${count} proposals to review.`,
      digestGreeting: (name: string) => `Hi ${name}, here is your daily summary`,
      digestGreetingText: (name: string) => `Hi ${name}, here is your daily summary.`,
      digestSubject: (dateKey: string) => `Agri App • daily summary ${dateKey}`
    }
  },
  sk: {

    common: {
      appName: "Agri App",
      open: "Otvoriť",
      save: "Uložiť",
      saveChanges: "Uložiť zmeny",
      cancel: "Zrušiť",
      back: "Späť",
      loading: "Načítava sa…",
      noData: "Žiadne dostupné údaje.",
      yes: "Áno",
      no: "Nie",
      search: "Hľadať",
      language: "Jazyk",
      responsible: "Zodpovedný",
      notAssigned: "Nepriradené",
      plant: "Rastlina",
      plants: "Rastliny",
      task: "Úloha",
      tasks: "Úlohy",
      today: "Dnes",
      status: "Stav",
      notes: "Poznámky",
      date: "Dátum",
      email: "E-mail",
      password: "Heslo",
      code: "Kód",
      state: "Stav",
      recentInterventions: "Nedávne zásahy",
      recentTasks: "Nedávne úlohy",
      planned: "Plánované",
      completed: "Dokončené",
      type: "Typ"
    },
    nav: {
      summary: "Súhrn",
      plants: "Rastliny",
      interventions: "Zásahy",
      tasks: "Úlohy",
      today: "Dnes",
      notices: "Upozornenia",
      reports: "Prehľady",
      scan: "Skener",
      offline: "Bez pripojenia",
      scheduledTasks: "Plánovania",
      approvals: "Schválenia",
      users: "Používatelia",
      system: "Systém",
      login: "Prihlásiť sa",
      logout: "Odhlásiť sa"
    },
    shell: {
      signedInAs: "Prihlásený ako",
      roleSuperAdmin: "Administrátor",
      roleOperator: "Operátor"
    },
    dashboard: {
      title: "Súhrn",
      eyebrow: "Prehľad",
      plants: "Rastliny",
      interventions: "Zásahy",
      tasks: "Úlohy",
      unreadNotices: "Neprečítané upozornenia",
      todayTitle: "Dnes",
      todayDescription: "Pozrite si dnešnú prácu a úlohy, ktoré treba dokončiť.",
      offlineTitle: "Práca bez pripojenia",
      offlineDescription: "Skontrolujte zmeny uložené bez pripojenia a synchronizujte ich po obnovení internetu."
    },
    notices: {
      title: "Upozornenia",
      eyebrow: "Centrum upozornení",
      preferences: "Nastavenia",
      markAllRead: "Označiť všetky ako prečítané",
      unread: "Neprečítané",
      generatedToday: "Prijaté dnes",
      empty: "Zatiaľ nemáte žiadne upozornenia.",
      read: "Prečítané",
      unreadState: "Neprečítané",
      alreadyRead: "Už prečítané",
      markRead: "Označiť ako prečítané"
    },
    notificationSettings: {
      title: "Nastavenia upozornení",
      eyebrow: "Osobné preferencie",
      saved: "Zmeny boli uložené.",
      channelsTitle: "Ako chcete dostávať upozornenia",
      channelsDescription: "Upozornenia v aplikácii sú aktívne. Odosielanie e-mailov je pripravené, ale zostáva vypnuté, kým nebude povolené v službe.",
      inAppEnabled: "Dostávať upozornenia v aplikácii",
      emailEnabled: "Dostávať upozornenia e-mailom",
      eventsTitle: "Aké upozornenia chcete dostávať",
      taskDueToday: "Úlohy s termínom dnes",
      taskDueTomorrow: "Úlohy s termínom zajtra",
      overdueTasks: "Oneskorené nedokončené úlohy",
      proposalUpdates: "Zmeny v návrhoch zásahov",
      systemMessages: "Dôležité systémové upozornenia",
      scheduleTitle: "Čas, časové pásmo a jazyk",
      dailyDigestHour: "Hodina denného súhrnu",
      timezone: "Časové pásmo",
      locale: "Preferovaný jazyk"
    },
    recurring: {
      title: "Plánovania",
      eyebrow: "Opakované úlohy",
      goToPlants: "Prejsť na rastliny",
      generateNow: "Vytvoriť úlohy teraz",
      generationDone: "Proces dokončený.",
      created: "Vytvorené",
      skipped: "Vynechané",
      total: "Celkový počet plánovaní",
      active: "Aktívne",
      paused: "Pozastavené",
      empty: "Zatiaľ nie sú naplánované žiadne úlohy. Otvorte rastlinu a vytvorte plánovanie.",
      nextDate: "Ďalší dátum",
      lastGenerated: "Posledná vytvorená úloha",
      pause: "Pozastaviť",
      resume: "Znova aktivovať",
      viewPlant: "Zobraziť rastlinu"
    },
    todayPage: {
      title: "Dnes",
      eyebrow: "Denný plán",
      notices: "Upozornenia",
      tasksToManage: "Úlohy na spracovanie",
      overdue: "Oneskorené",
      unreadNotices: "Neprečítané upozornenia",
      overdueTitle: "Oneskorené úlohy",
      todayTitle: "Dnešné úlohy",
      emptyToday: "Na dnes nie sú naplánované žiadne úlohy."
    },
    tasksPage: {
      title: "Úlohy",
      eyebrow: "Celý plán",
      empty: "Nie sú žiadne úlohy na zobrazenie."
    },
    plantsPage: {
      title: "Rastliny a stromy",
      eyebrow: "Archív",
      newPlant: "Nová rastlina",
      empty: "V archíve zatiaľ nie sú žiadne rastliny."
    },
    interventionsPage: {
      title: "Zásahy",
      eyebrow: "História prác",
      empty: "Nie sú zaznamenané žiadne zásahy."
    },
    reportsPage: {
      title: "Prehľady",
      eyebrow: "Administrátorská zóna",
      pendingProposals: "Návrhy na kontrolu",
      exportPlants: "Exportovať rastliny do CSV",
      exportInterventions: "Exportovať zásahy do CSV",
      exportTasks: "Exportovať úlohy do CSV"
    },
    approvalsPage: {
      title: "Schválenia",
      eyebrow: "Návrhy na kontrolu",
      empty: "Nie sú žiadne čakajúce návrhy.",
      proposedBy: "navrhol",
      approve: "Schváliť",
      reject: "Zamietnuť"
    },
    admin: {
      usersTitle: "Používatelia",
      usersEyebrow: "Správa prístupov",
      systemTitle: "Systém",
      systemEyebrow: "Technické kontroly",
      database: "Databáza",
      connectionError: "Pripojenie nie je dostupné",
      serverEnv: "Konfigurácia servera",
      valid: "Platné",
      invalid: "Vyžaduje kontrolu",
      publicConfig: "Verejná konfigurácia"
    },
    auth: {
      loginTitle: "Prihlásenie",
      loginEyebrow: "Súkromná oblasť",
      invalidCredentials: "E-mail alebo heslo nie je správne.",
      signingIn: "Prihlasovanie…",
      signIn: "Prihlásiť sa",
      devSeedTitle: "Demo prihlasovacie údaje DEV",
      forbiddenTitle: "Prístup nie je povolený",
      forbiddenEyebrow: "Nedostatočné oprávnenia",
      forbiddenHeading: "Nemáte oprávnenie vstúpiť do tejto sekcie.",
      forbiddenBody: "Ak si myslíte, že ide o chybu, požiadajte administrátora o kontrolu profilu.",
      backToSummary: "Späť na súhrn",
      goToLogin: "Prejsť na prihlásenie"
    },
    labels: {
      roles: {
        SUPER_ADMIN: "Administrátor",
        OPERATOR: "Operátor"
      },
      priorities: {
        MANDATORY: "Prioritná",
        RECOMMENDED: "Odporúčaná"
      },
      taskStatuses: {
        SCHEDULED: "Naplánovaná",
        NOTIFIED: "Oznámená",
        DONE: "Dokončená",
        SKIPPED: "Vynechaná",
        EXPIRED: "Po termíne"
      },
      recurrence: {
        DAILY: "Každý deň",
        WEEKLY: "Každý týždeň",
        EVERY_X_DAYS: "Každých {days} dní"
      },
      notificationTypes: {
        INFO: "Informácia",
        TASK: "Úloha",
        APPROVAL: "Schválenie",
        SYSTEM: "Systém"
      },
      plantTypes: {
        PLANT: "Rastlina",
        TREE: "Strom"
      },
      environments: {
        INDOOR: "Interiér",
        OUTDOOR: "Exteriér"
      },
      plantStatuses: {
        ACTIVE: "Aktívna",
        ARCHIVED: "Archivovaná",
        REMOVED: "Odstránená"
      },
      interventionTypes: {
        IRRIGATION: "Zavlažovanie",
        PRUNING: "Rez",
        FERTILIZATION: "Hnojenie",
        PHYTOSANITARY: "Ošetrenie",
        MEASUREMENT: "Meranie",
        TRANSPLANT: "Presádzanie",
        HARVEST: "Zber",
        OTHER: "Iné"
      }
    }
  ,
    backend: {
      chooseStartDate: "Vyberte počiatočný dátum.",
      loginRequired: "Relácia nie je aktívna. Prihláste sa znova.",
      noPermission: "Na túto akciu nemáte oprávnenie.",
      invalidPayload: "Odoslané údaje nie sú platné. Skontrolujte ich a skúste to znova.",
      unsupportedOperation: "Táto operácia nie je dostupná.",
      unknownError: "Niečo sa pokazilo. Skúste to znova o pár minút.",
      missingFile: "Pred pokračovaním pridajte súbor.",
      cronUnauthorized: "Neplatný prístup k tejto automatickej operácii.",
      choosePlant: "Vyberte rastlinu.",
      enterTitle: "Zadajte názov.",
      proposalsTitle: "Návrhy na kontrolu",
      todaySection: "Dnešné úlohy",
      tomorrowSection: "Zajtrajšie úlohy",
      overdueSection: "Oneskorené úlohy",
      proposalsSection: "Návrhy na kontrolu",
      appLink: "Otvoriť aplikáciu",
      noticesLink: "Centrum upozornení",
      taskTodayTitle: (taskTitle: string) => `Dnešná úloha: ${taskTitle}`,
      taskTodayMessage: (plantLabel: string) => `${plantLabel} • termín je dnes`,
      taskTomorrowTitle: (taskTitle: string) => `Zajtrajšia úloha: ${taskTitle}`,
      taskTomorrowMessage: (plantLabel: string) => `${plantLabel} • termín je zajtra`,
      taskOverdueTitle: (taskTitle: string) => `Oneskorená úloha: ${taskTitle}`,
      taskOverdueMessage: (plantLabel: string) => `${plantLabel} • čaká na dokončenie`,
      proposalsMessage: (count: number) => `Na kontrolu je ${count} návrhov.`,
      digestGreeting: (name: string) => `Dobrý deň ${name}, tu je váš denný súhrn`,
      digestGreetingText: (name: string) => `Dobrý deň ${name}, tu je váš denný súhrn.`,
      digestSubject: (dateKey: string) => `Agri App • denný súhrn ${dateKey}`
    }
  },
  fr: {

    common: {
      appName: "Agri App",
      open: "Ouvrir",
      save: "Enregistrer",
      saveChanges: "Enregistrer les modifications",
      cancel: "Annuler",
      back: "Retour",
      loading: "Chargement…",
      noData: "Aucune donnée disponible.",
      yes: "Oui",
      no: "Non",
      search: "Rechercher",
      language: "Langue",
      responsible: "Responsable",
      notAssigned: "Non attribué",
      plant: "Plante",
      plants: "Plantes",
      task: "Tâche",
      tasks: "Tâches",
      today: "Aujourd’hui",
      status: "État",
      notes: "Notes",
      date: "Date",
      email: "E-mail",
      password: "Mot de passe",
      code: "Code",
      state: "État",
      recentInterventions: "Interventions récentes",
      recentTasks: "Tâches récentes",
      planned: "Prévu",
      completed: "Terminé",
      type: "Type"
    },
    nav: {
      summary: "Résumé",
      plants: "Plantes",
      interventions: "Interventions",
      tasks: "Tâches",
      today: "Aujourd’hui",
      notices: "Avis",
      reports: "Rapports",
      scan: "Scanner",
      offline: "Hors ligne",
      scheduledTasks: "Programmations",
      approvals: "Validations",
      users: "Utilisateurs",
      system: "Système",
      login: "Se connecter",
      logout: "Se déconnecter"
    },
    shell: {
      signedInAs: "Connecté en tant que",
      roleSuperAdmin: "Administrateur",
      roleOperator: "Opérateur"
    },
    dashboard: {
      title: "Résumé",
      eyebrow: "Vue d’ensemble",
      plants: "Plantes",
      interventions: "Interventions",
      tasks: "Tâches",
      unreadNotices: "Avis non lus",
      todayTitle: "Aujourd’hui",
      todayDescription: "Consultez le travail prévu et les tâches à terminer.",
      offlineTitle: "Travail hors ligne",
      offlineDescription: "Vérifiez les modifications enregistrées hors ligne et synchronisez-les quand internet revient."
    },
    notices: {
      title: "Avis",
      eyebrow: "Centre d’avis",
      preferences: "Paramètres",
      markAllRead: "Tout marquer comme lu",
      unread: "Non lus",
      generatedToday: "Reçus aujourd’hui",
      empty: "Vous n’avez aucun avis pour le moment.",
      read: "Lu",
      unreadState: "Non lu",
      alreadyRead: "Déjà lu",
      markRead: "Marquer comme lu"
    },
    notificationSettings: {
      title: "Paramètres des avis",
      eyebrow: "Préférences personnelles",
      saved: "Modifications enregistrées.",
      channelsTitle: "Comment recevoir les avis",
      channelsDescription: "Les avis dans l’application sont actifs. L’envoi par e-mail est prêt, mais reste désactivé tant qu’il n’est pas activé dans le service.",
      inAppEnabled: "Recevoir les avis dans l’application",
      emailEnabled: "Recevoir les avis par e-mail",
      eventsTitle: "Quels avis recevoir",
      taskDueToday: "Tâches à faire aujourd’hui",
      taskDueTomorrow: "Tâches à faire demain",
      overdueTasks: "Tâches en retard non terminées",
      proposalUpdates: "Changements dans les propositions d’intervention",
      systemMessages: "Avis système importants",
      scheduleTitle: "Heure, fuseau horaire et langue",
      dailyDigestHour: "Heure du résumé quotidien",
      timezone: "Fuseau horaire",
      locale: "Langue préférée"
    },
    recurring: {
      title: "Programmations",
      eyebrow: "Tâches récurrentes",
      goToPlants: "Aller aux plantes",
      generateNow: "Créer les tâches maintenant",
      generationDone: "Processus terminé.",
      created: "Créées",
      skipped: "Ignorées",
      total: "Programmations totales",
      active: "Actives",
      paused: "En pause",
      empty: "Aucune tâche programmée pour le moment. Ouvrez une plante et créez une programmation.",
      nextDate: "Prochaine date",
      lastGenerated: "Dernière tâche créée",
      pause: "Mettre en pause",
      resume: "Réactiver",
      viewPlant: "Voir la plante"
    },
    todayPage: {
      title: "Aujourd’hui",
      eyebrow: "Agenda du jour",
      notices: "Avis",
      tasksToManage: "Tâches à gérer",
      overdue: "En retard",
      unreadNotices: "Avis non lus",
      overdueTitle: "Tâches en retard",
      todayTitle: "Tâches du jour",
      emptyToday: "Aucune tâche programmée pour aujourd’hui."
    },
    tasksPage: {
      title: "Tâches",
      eyebrow: "Agenda complet",
      empty: "Aucune tâche à afficher."
    },
    plantsPage: {
      title: "Plantes et arbres",
      eyebrow: "Archive",
      newPlant: "Nouvelle plante",
      empty: "Aucune plante dans l’archive pour le moment."
    },
    interventionsPage: {
      title: "Interventions",
      eyebrow: "Historique des travaux",
      empty: "Aucune intervention enregistrée."
    },
    reportsPage: {
      title: "Rapports",
      eyebrow: "Espace administrateur",
      pendingProposals: "Propositions à vérifier",
      exportPlants: "Exporter les plantes en CSV",
      exportInterventions: "Exporter les interventions en CSV",
      exportTasks: "Exporter les tâches en CSV"
    },
    approvalsPage: {
      title: "Validations",
      eyebrow: "Propositions à vérifier",
      empty: "Aucune proposition en attente.",
      proposedBy: "proposée par",
      approve: "Valider",
      reject: "Refuser"
    },
    admin: {
      usersTitle: "Utilisateurs",
      usersEyebrow: "Gestion des accès",
      systemTitle: "Système",
      systemEyebrow: "Contrôles techniques",
      database: "Base de données",
      connectionError: "Connexion indisponible",
      serverEnv: "Configuration serveur",
      valid: "Valide",
      invalid: "À vérifier",
      publicConfig: "Configuration publique"
    },
    auth: {
      loginTitle: "Connexion",
      loginEyebrow: "Espace privé",
      invalidCredentials: "E-mail ou mot de passe incorrect.",
      signingIn: "Connexion…",
      signIn: "Se connecter",
      devSeedTitle: "Identifiants démo DEV",
      forbiddenTitle: "Accès non autorisé",
      forbiddenEyebrow: "Permissions insuffisantes",
      forbiddenHeading: "Vous n’avez pas l’autorisation d’accéder à cette section.",
      forbiddenBody: "Si vous pensez qu’il s’agit d’une erreur, demandez à un administrateur de vérifier votre profil.",
      backToSummary: "Retour au résumé",
      goToLogin: "Aller à la connexion"
    },
    labels: {
      roles: {
        SUPER_ADMIN: "Administrateur",
        OPERATOR: "Opérateur"
      },
      priorities: {
        MANDATORY: "Prioritaire",
        RECOMMENDED: "Recommandée"
      },
      taskStatuses: {
        SCHEDULED: "Programmée",
        NOTIFIED: "Signalée",
        DONE: "Terminée",
        SKIPPED: "Ignorée",
        EXPIRED: "Expirée"
      },
      recurrence: {
        DAILY: "Chaque jour",
        WEEKLY: "Chaque semaine",
        EVERY_X_DAYS: "Tous les {days} jours"
      },
      notificationTypes: {
        INFO: "Information",
        TASK: "Tâche",
        APPROVAL: "Validation",
        SYSTEM: "Système"
      },
      plantTypes: {
        PLANT: "Plante",
        TREE: "Arbre"
      },
      environments: {
        INDOOR: "Intérieur",
        OUTDOOR: "Extérieur"
      },
      plantStatuses: {
        ACTIVE: "Active",
        ARCHIVED: "Archivée",
        REMOVED: "Supprimée"
      },
      interventionTypes: {
        IRRIGATION: "Arrosage",
        PRUNING: "Taille",
        FERTILIZATION: "Fertilisation",
        PHYTOSANITARY: "Traitement",
        MEASUREMENT: "Mesure",
        TRANSPLANT: "Transplantation",
        HARVEST: "Récolte",
        OTHER: "Autre"
      }
    }
  ,
    backend: {
      chooseStartDate: "Choisissez une date de début.",
      loginRequired: "Votre session n’est pas active. Connectez-vous à nouveau.",
      noPermission: "Vous n’avez pas l’autorisation pour cette action.",
      invalidPayload: "Les données envoyées ne sont pas valides. Vérifiez-les et réessayez.",
      unsupportedOperation: "Cette opération n’est pas disponible.",
      unknownError: "Une erreur est survenue. Réessayez dans quelques minutes.",
      missingFile: "Ajoutez un fichier avant de continuer.",
      cronUnauthorized: "Accès non valide pour cette opération automatique.",
      choosePlant: "Choisissez une plante.",
      enterTitle: "Saisissez un titre.",
      proposalsTitle: "Propositions à vérifier",
      todaySection: "Tâches du jour",
      tomorrowSection: "Tâches de demain",
      overdueSection: "Tâches en retard",
      proposalsSection: "Propositions à vérifier",
      appLink: "Ouvrir l’application",
      noticesLink: "Centre d’avis",
      taskTodayTitle: (taskTitle: string) => `Tâche du jour : ${taskTitle}`,
      taskTodayMessage: (plantLabel: string) => `${plantLabel} • à faire aujourd’hui`,
      taskTomorrowTitle: (taskTitle: string) => `Tâche de demain : ${taskTitle}`,
      taskTomorrowMessage: (plantLabel: string) => `${plantLabel} • à faire demain`,
      taskOverdueTitle: (taskTitle: string) => `Tâche en retard : ${taskTitle}`,
      taskOverdueMessage: (plantLabel: string) => `${plantLabel} • à terminer`,
      proposalsMessage: (count: number) => `Il y a ${count} propositions à vérifier.`,
      digestGreeting: (name: string) => `Bonjour ${name}, voici votre récapitulatif quotidien`,
      digestGreetingText: (name: string) => `Bonjour ${name}, voici votre récapitulatif quotidien.`,
      digestSubject: (dateKey: string) => `Agri App • récapitulatif quotidien ${dateKey}`
    }
  },
  de: {

    common: {
      appName: "Agri App",
      open: "Öffnen",
      save: "Speichern",
      saveChanges: "Änderungen speichern",
      cancel: "Abbrechen",
      back: "Zurück",
      loading: "Wird geladen…",
      noData: "Keine Daten verfügbar.",
      yes: "Ja",
      no: "Nein",
      search: "Suchen",
      language: "Sprache",
      responsible: "Verantwortlich",
      notAssigned: "Nicht zugewiesen",
      plant: "Pflanze",
      plants: "Pflanzen",
      task: "Aufgabe",
      tasks: "Aufgaben",
      today: "Heute",
      status: "Status",
      notes: "Notizen",
      date: "Datum",
      email: "E-Mail",
      password: "Passwort",
      code: "Code",
      state: "Status",
      recentInterventions: "Letzte Eingriffe",
      recentTasks: "Letzte Aufgaben",
      planned: "Geplant",
      completed: "Abgeschlossen",
      type: "Typ"
    },
    nav: {
      summary: "Übersicht",
      plants: "Pflanzen",
      interventions: "Eingriffe",
      tasks: "Aufgaben",
      today: "Heute",
      notices: "Hinweise",
      reports: "Berichte",
      scan: "Scanner",
      offline: "Offline",
      scheduledTasks: "Planungen",
      approvals: "Freigaben",
      users: "Benutzer",
      system: "System",
      login: "Anmelden",
      logout: "Abmelden"
    },
    shell: {
      signedInAs: "Angemeldet als",
      roleSuperAdmin: "Administrator",
      roleOperator: "Operator"
    },
    dashboard: {
      title: "Übersicht",
      eyebrow: "Gesamtüberblick",
      plants: "Pflanzen",
      interventions: "Eingriffe",
      tasks: "Aufgaben",
      unreadNotices: "Ungelesene Hinweise",
      todayTitle: "Heute",
      todayDescription: "Prüfen Sie die geplante Arbeit und die noch offenen Aufgaben.",
      offlineTitle: "Offline-Arbeit",
      offlineDescription: "Prüfen Sie offline gespeicherte Änderungen und synchronisieren Sie sie, sobald Internet verfügbar ist."
    },
    notices: {
      title: "Hinweise",
      eyebrow: "Hinweiszentrale",
      preferences: "Einstellungen",
      markAllRead: "Alle als gelesen markieren",
      unread: "Ungelesen",
      generatedToday: "Heute erhalten",
      empty: "Es gibt derzeit keine Hinweise.",
      read: "Gelesen",
      unreadState: "Ungelesen",
      alreadyRead: "Bereits gelesen",
      markRead: "Als gelesen markieren"
    },
    notificationSettings: {
      title: "Hinweiseinstellungen",
      eyebrow: "Persönliche Einstellungen",
      saved: "Änderungen wurden gespeichert.",
      channelsTitle: "Wie Sie Hinweise erhalten möchten",
      channelsDescription: "Hinweise in der App sind aktiv. E-Mail-Versand ist vorbereitet, bleibt aber deaktiviert, bis er im Dienst aktiviert wird.",
      inAppEnabled: "Hinweise in der App erhalten",
      emailEnabled: "Hinweise per E-Mail erhalten",
      eventsTitle: "Welche Hinweise Sie erhalten möchten",
      taskDueToday: "Heute fällige Aufgaben",
      taskDueTomorrow: "Morgen fällige Aufgaben",
      overdueTasks: "Überfällige, nicht erledigte Aufgaben",
      proposalUpdates: "Änderungen an Eingriffsvorschlägen",
      systemMessages: "Wichtige Systemhinweise",
      scheduleTitle: "Uhrzeit, Zeitzone und Sprache",
      dailyDigestHour: "Uhrzeit der täglichen Übersicht",
      timezone: "Zeitzone",
      locale: "Bevorzugte Sprache"
    },
    recurring: {
      title: "Planungen",
      eyebrow: "Wiederkehrende Aufgaben",
      goToPlants: "Zu Pflanzen",
      generateNow: "Aufgaben jetzt erstellen",
      generationDone: "Vorgang abgeschlossen.",
      created: "Erstellt",
      skipped: "Übersprungen",
      total: "Alle Planungen",
      active: "Aktiv",
      paused: "Pausiert",
      empty: "Es gibt noch keine geplanten Aufgaben. Öffnen Sie eine Pflanze und erstellen Sie eine Planung.",
      nextDate: "Nächstes Datum",
      lastGenerated: "Zuletzt erstellte Aufgabe",
      pause: "Pausieren",
      resume: "Reaktivieren",
      viewPlant: "Pflanze ansehen"
    },
    todayPage: {
      title: "Heute",
      eyebrow: "Tagesagenda",
      notices: "Hinweise",
      tasksToManage: "Zu bearbeitende Aufgaben",
      overdue: "Überfällig",
      unreadNotices: "Ungelesene Hinweise",
      overdueTitle: "Überfällige Aufgaben",
      todayTitle: "Heutige Aufgaben",
      emptyToday: "Für heute sind keine Aufgaben geplant."
    },
    tasksPage: {
      title: "Aufgaben",
      eyebrow: "Vollständige Agenda",
      empty: "Es gibt keine Aufgaben anzuzeigen."
    },
    plantsPage: {
      title: "Pflanzen und Bäume",
      eyebrow: "Archiv",
      newPlant: "Neue Pflanze",
      empty: "Im Archiv sind noch keine Pflanzen vorhanden."
    },
    interventionsPage: {
      title: "Eingriffe",
      eyebrow: "Arbeitsverlauf",
      empty: "Es sind keine Eingriffe erfasst."
    },
    reportsPage: {
      title: "Berichte",
      eyebrow: "Administratorbereich",
      pendingProposals: "Vorschläge zur Prüfung",
      exportPlants: "Pflanzen als CSV exportieren",
      exportInterventions: "Eingriffe als CSV exportieren",
      exportTasks: "Aufgaben als CSV exportieren"
    },
    approvalsPage: {
      title: "Freigaben",
      eyebrow: "Vorschläge zur Prüfung",
      empty: "Es gibt keine ausstehenden Vorschläge.",
      proposedBy: "vorgeschlagen von",
      approve: "Freigeben",
      reject: "Ablehnen"
    },
    admin: {
      usersTitle: "Benutzer",
      usersEyebrow: "Zugriffsverwaltung",
      systemTitle: "System",
      systemEyebrow: "Technische Prüfungen",
      database: "Datenbank",
      connectionError: "Verbindung nicht verfügbar",
      serverEnv: "Serverkonfiguration",
      valid: "Gültig",
      invalid: "Prüfen",
      publicConfig: "Öffentliche Konfiguration"
    },
    auth: {
      loginTitle: "Anmeldung",
      loginEyebrow: "Privater Bereich",
      invalidCredentials: "E-Mail oder Passwort ist falsch.",
      signingIn: "Anmeldung läuft…",
      signIn: "Anmelden",
      devSeedTitle: "DEV-Demo-Zugangsdaten",
      forbiddenTitle: "Zugriff nicht erlaubt",
      forbiddenEyebrow: "Unzureichende Berechtigungen",
      forbiddenHeading: "Sie haben keine Berechtigung für diesen Bereich.",
      forbiddenBody: "Wenn Sie glauben, dass dies ein Fehler ist, bitten Sie einen Administrator, Ihr Profil zu prüfen.",
      backToSummary: "Zurück zur Übersicht",
      goToLogin: "Zur Anmeldung"
    },
    labels: {
      roles: {
        SUPER_ADMIN: "Administrator",
        OPERATOR: "Operator"
      },
      priorities: {
        MANDATORY: "Priorität",
        RECOMMENDED: "Empfohlen"
      },
      taskStatuses: {
        SCHEDULED: "Geplant",
        NOTIFIED: "Benachrichtigt",
        DONE: "Erledigt",
        SKIPPED: "Übersprungen",
        EXPIRED: "Abgelaufen"
      },
      recurrence: {
        DAILY: "Jeden Tag",
        WEEKLY: "Jede Woche",
        EVERY_X_DAYS: "Alle {days} Tage"
      },
      notificationTypes: {
        INFO: "Information",
        TASK: "Aufgabe",
        APPROVAL: "Freigabe",
        SYSTEM: "System"
      },
      plantTypes: {
        PLANT: "Pflanze",
        TREE: "Baum"
      },
      environments: {
        INDOOR: "Innen",
        OUTDOOR: "Außen"
      },
      plantStatuses: {
        ACTIVE: "Aktiv",
        ARCHIVED: "Archiviert",
        REMOVED: "Entfernt"
      },
      interventionTypes: {
        IRRIGATION: "Bewässerung",
        PRUNING: "Schnitt",
        FERTILIZATION: "Düngung",
        PHYTOSANITARY: "Behandlung",
        MEASUREMENT: "Messung",
        TRANSPLANT: "Umpflanzen",
        HARVEST: "Ernte",
        OTHER: "Sonstiges"
      }
    }
  ,
    backend: {
      chooseStartDate: "Wählen Sie ein Startdatum.",
      loginRequired: "Ihre Sitzung ist nicht aktiv. Bitte melden Sie sich erneut an.",
      noPermission: "Sie haben keine Berechtigung für diese Aktion.",
      invalidPayload: "Die übermittelten Daten sind nicht gültig. Bitte prüfen Sie sie und versuchen Sie es erneut.",
      unsupportedOperation: "Diese Operation ist nicht verfügbar.",
      unknownError: "Etwas ist schiefgelaufen. Bitte versuchen Sie es in ein paar Minuten erneut.",
      missingFile: "Fügen Sie eine Datei hinzu, bevor Sie fortfahren.",
      cronUnauthorized: "Ungültiger Zugriff für diese automatische Operation.",
      choosePlant: "Wählen Sie eine Pflanze.",
      enterTitle: "Geben Sie einen Titel ein.",
      proposalsTitle: "Vorschläge zur Prüfung",
      todaySection: "Heutige Aufgaben",
      tomorrowSection: "Morgige Aufgaben",
      overdueSection: "Überfällige Aufgaben",
      proposalsSection: "Vorschläge zur Prüfung",
      appLink: "App öffnen",
      noticesLink: "Hinweiszentrale",
      taskTodayTitle: (taskTitle: string) => `Heutige Aufgabe: ${taskTitle}`,
      taskTodayMessage: (plantLabel: string) => `${plantLabel} • heute fällig`,
      taskTomorrowTitle: (taskTitle: string) => `Morgige Aufgabe: ${taskTitle}`,
      taskTomorrowMessage: (plantLabel: string) => `${plantLabel} • morgen fällig`,
      taskOverdueTitle: (taskTitle: string) => `Überfällige Aufgabe: ${taskTitle}`,
      taskOverdueMessage: (plantLabel: string) => `${plantLabel} • noch zu erledigen`,
      proposalsMessage: (count: number) => `Es gibt ${count} Vorschläge zur Prüfung.`,
      digestGreeting: (name: string) => `Hallo ${name}, hier ist Ihre tägliche Übersicht`,
      digestGreetingText: (name: string) => `Hallo ${name}, hier ist Ihre tägliche Übersicht.`,
      digestSubject: (dateKey: string) => `Agri App • tägliche Übersicht ${dateKey}`
    }
  },
  ru: {

    common: {
      appName: "Agri App",
      open: "Открыть",
      save: "Сохранить",
      saveChanges: "Сохранить изменения",
      cancel: "Отмена",
      back: "Назад",
      loading: "Загрузка…",
      noData: "Данные отсутствуют.",
      yes: "Да",
      no: "Нет",
      search: "Поиск",
      language: "Язык",
      responsible: "Ответственный",
      notAssigned: "Не назначено",
      plant: "Растение",
      plants: "Растения",
      task: "Задача",
      tasks: "Задачи",
      today: "Сегодня",
      status: "Статус",
      notes: "Заметки",
      date: "Дата",
      email: "Email",
      password: "Пароль",
      code: "Код",
      state: "Статус",
      recentInterventions: "Недавние работы",
      recentTasks: "Недавние задачи",
      planned: "Запланировано",
      completed: "Завершено",
      type: "Тип"
    },
    nav: {
      summary: "Обзор",
      plants: "Растения",
      interventions: "Работы",
      tasks: "Задачи",
      today: "Сегодня",
      notices: "Уведомления",
      reports: "Отчёты",
      scan: "Сканер",
      offline: "Офлайн",
      scheduledTasks: "Расписания",
      approvals: "Согласования",
      users: "Пользователи",
      system: "Система",
      login: "Войти",
      logout: "Выйти"
    },
    shell: {
      signedInAs: "Вход выполнен как",
      roleSuperAdmin: "Администратор",
      roleOperator: "Оператор"
    },
    dashboard: {
      title: "Обзор",
      eyebrow: "Общая картина",
      plants: "Растения",
      interventions: "Работы",
      tasks: "Задачи",
      unreadNotices: "Непрочитанные уведомления",
      todayTitle: "Сегодня",
      todayDescription: "Посмотрите запланированные работы и задачи, которые нужно завершить.",
      offlineTitle: "Работа офлайн",
      offlineDescription: "Проверьте изменения, сохранённые без подключения, и синхронизируйте их после восстановления интернета."
    },
    notices: {
      title: "Уведомления",
      eyebrow: "Центр уведомлений",
      preferences: "Настройки",
      markAllRead: "Отметить все как прочитанные",
      unread: "Непрочитанные",
      generatedToday: "Получены сегодня",
      empty: "Пока нет уведомлений.",
      read: "Прочитано",
      unreadState: "Непрочитано",
      alreadyRead: "Уже прочитано",
      markRead: "Отметить как прочитанное"
    },
    notificationSettings: {
      title: "Настройки уведомлений",
      eyebrow: "Личные настройки",
      saved: "Изменения сохранены.",
      channelsTitle: "Как получать уведомления",
      channelsDescription: "Уведомления внутри приложения активны. Отправка по email подготовлена, но остаётся отключённой, пока не будет включена в сервисе.",
      inAppEnabled: "Получать уведомления в приложении",
      emailEnabled: "Получать уведомления по email",
      eventsTitle: "Какие уведомления получать",
      taskDueToday: "Задачи со сроком сегодня",
      taskDueTomorrow: "Задачи со сроком завтра",
      overdueTasks: "Просроченные незавершённые задачи",
      proposalUpdates: "Изменения в предложениях по работам",
      systemMessages: "Важные системные уведомления",
      scheduleTitle: "Время, часовой пояс и язык",
      dailyDigestHour: "Время ежедневного обзора",
      timezone: "Часовой пояс",
      locale: "Предпочитаемый язык"
    },
    recurring: {
      title: "Расписания",
      eyebrow: "Повторяющиеся задачи",
      goToPlants: "Перейти к растениям",
      generateNow: "Создать задачи сейчас",
      generationDone: "Процесс завершён.",
      created: "Создано",
      skipped: "Пропущено",
      total: "Всего расписаний",
      active: "Активные",
      paused: "На паузе",
      empty: "Пока нет запланированных задач. Откройте растение и создайте расписание.",
      nextDate: "Следующая дата",
      lastGenerated: "Последняя созданная задача",
      pause: "Пауза",
      resume: "Возобновить",
      viewPlant: "Открыть растение"
    },
    todayPage: {
      title: "Сегодня",
      eyebrow: "Повестка дня",
      notices: "Уведомления",
      tasksToManage: "Задачи в работе",
      overdue: "Просрочено",
      unreadNotices: "Непрочитанные уведомления",
      overdueTitle: "Просроченные задачи",
      todayTitle: "Задачи на сегодня",
      emptyToday: "На сегодня задач не запланировано."
    },
    tasksPage: {
      title: "Задачи",
      eyebrow: "Полная повестка",
      empty: "Нет задач для отображения."
    },
    plantsPage: {
      title: "Растения и деревья",
      eyebrow: "Архив",
      newPlant: "Новое растение",
      empty: "В архиве пока нет растений."
    },
    interventionsPage: {
      title: "Работы",
      eyebrow: "История работ",
      empty: "Работы ещё не зарегистрированы."
    },
    reportsPage: {
      title: "Отчёты",
      eyebrow: "Раздел администратора",
      pendingProposals: "Предложения для проверки",
      exportPlants: "Экспорт растений в CSV",
      exportInterventions: "Экспорт работ в CSV",
      exportTasks: "Экспорт задач в CSV"
    },
    approvalsPage: {
      title: "Согласования",
      eyebrow: "Предложения для проверки",
      empty: "Нет ожидающих предложений.",
      proposedBy: "предложено",
      approve: "Одобрить",
      reject: "Отклонить"
    },
    admin: {
      usersTitle: "Пользователи",
      usersEyebrow: "Управление доступом",
      systemTitle: "Система",
      systemEyebrow: "Технические проверки",
      database: "База данных",
      connectionError: "Подключение недоступно",
      serverEnv: "Конфигурация сервера",
      valid: "Действительно",
      invalid: "Требует проверки",
      publicConfig: "Публичная конфигурация"
    },
    auth: {
      loginTitle: "Вход",
      loginEyebrow: "Закрытая зона",
      invalidCredentials: "Email или пароль неверны.",
      signingIn: "Выполняется вход…",
      signIn: "Войти",
      devSeedTitle: "Демо-доступ DEV",
      forbiddenTitle: "Доступ запрещён",
      forbiddenEyebrow: "Недостаточно прав",
      forbiddenHeading: "У вас нет прав для входа в этот раздел.",
      forbiddenBody: "Если вы считаете, что это ошибка, попросите администратора проверить ваш профиль.",
      backToSummary: "Вернуться к обзору",
      goToLogin: "Перейти ко входу"
    },
    labels: {
      roles: {
        SUPER_ADMIN: "Администратор",
        OPERATOR: "Оператор"
      },
      priorities: {
        MANDATORY: "Приоритетная",
        RECOMMENDED: "Рекомендуемая"
      },
      taskStatuses: {
        SCHEDULED: "Запланирована",
        NOTIFIED: "Уведомлена",
        DONE: "Завершена",
        SKIPPED: "Пропущена",
        EXPIRED: "Просрочена"
      },
      recurrence: {
        DAILY: "Каждый день",
        WEEKLY: "Каждую неделю",
        EVERY_X_DAYS: "Каждые {days} дн."
      },
      notificationTypes: {
        INFO: "Информация",
        TASK: "Задача",
        APPROVAL: "Согласование",
        SYSTEM: "Система"
      },
      plantTypes: {
        PLANT: "Растение",
        TREE: "Дерево"
      },
      environments: {
        INDOOR: "В помещении",
        OUTDOOR: "На улице"
      },
      plantStatuses: {
        ACTIVE: "Активно",
        ARCHIVED: "В архиве",
        REMOVED: "Удалено"
      },
      interventionTypes: {
        IRRIGATION: "Полив",
        PRUNING: "Обрезка",
        FERTILIZATION: "Удобрение",
        PHYTOSANITARY: "Обработка",
        MEASUREMENT: "Измерение",
        TRANSPLANT: "Пересадка",
        HARVEST: "Сбор урожая",
        OTHER: "Другое"
      }
    }
  ,
    backend: {
      chooseStartDate: "Выберите начальную дату.",
      loginRequired: "Сессия не активна. Войдите снова.",
      noPermission: "У вас нет прав для этого действия.",
      invalidPayload: "Отправленные данные недействительны. Проверьте их и попробуйте снова.",
      unsupportedOperation: "Эта операция недоступна.",
      unknownError: "Что-то пошло не так. Попробуйте снова через несколько минут.",
      missingFile: "Добавьте файл перед продолжением.",
      cronUnauthorized: "Недействительный доступ для этой автоматической операции.",
      choosePlant: "Выберите растение.",
      enterTitle: "Введите название.",
      proposalsTitle: "Предложения для проверки",
      todaySection: "Задачи на сегодня",
      tomorrowSection: "Задачи на завтра",
      overdueSection: "Просроченные задачи",
      proposalsSection: "Предложения для проверки",
      appLink: "Открыть приложение",
      noticesLink: "Центр уведомлений",
      taskTodayTitle: (taskTitle: string) => `Задача на сегодня: ${taskTitle}`,
      taskTodayMessage: (plantLabel: string) => `${plantLabel} • срок сегодня`,
      taskTomorrowTitle: (taskTitle: string) => `Задача на завтра: ${taskTitle}`,
      taskTomorrowMessage: (plantLabel: string) => `${plantLabel} • срок завтра`,
      taskOverdueTitle: (taskTitle: string) => `Просроченная задача: ${taskTitle}`,
      taskOverdueMessage: (plantLabel: string) => `${plantLabel} • нужно завершить`,
      proposalsMessage: (count: number) => `Есть ${count} предложений для проверки.`,
      digestGreeting: (name: string) => `Здравствуйте, ${name}! Ваш ежедневный обзор`,
      digestGreetingText: (name: string) => `Здравствуйте, ${name}! Ваш ежедневный обзор.`,
      digestSubject: (dateKey: string) => `Agri App • ежедневный обзор ${dateKey}`
    }
  },
  hu: {

    common: {
      appName: "Agri App",
      open: "Megnyitás",
      save: "Mentés",
      saveChanges: "Módosítások mentése",
      cancel: "Mégse",
      back: "Vissza",
      loading: "Betöltés…",
      noData: "Nincs elérhető adat.",
      yes: "Igen",
      no: "Nem",
      search: "Keresés",
      language: "Nyelv",
      responsible: "Felelős",
      notAssigned: "Nincs hozzárendelve",
      plant: "Növény",
      plants: "Növények",
      task: "Feladat",
      tasks: "Feladatok",
      today: "Ma",
      status: "Állapot",
      notes: "Jegyzetek",
      date: "Dátum",
      email: "Email",
      password: "Jelszó",
      code: "Kód",
      state: "Állapot",
      recentInterventions: "Legutóbbi beavatkozások",
      recentTasks: "Legutóbbi feladatok",
      planned: "Tervezett",
      completed: "Befejezett",
      type: "Típus"
    },
    nav: {
      summary: "Áttekintés",
      plants: "Növények",
      interventions: "Beavatkozások",
      tasks: "Feladatok",
      today: "Ma",
      notices: "Értesítések",
      reports: "Riportok",
      scan: "Szkenner",
      offline: "Offline",
      scheduledTasks: "Ütemezések",
      approvals: "Jóváhagyások",
      users: "Felhasználók",
      system: "Rendszer",
      login: "Bejelentkezés",
      logout: "Kijelentkezés"
    },
    shell: {
      signedInAs: "Bejelentkezve mint",
      roleSuperAdmin: "Adminisztrátor",
      roleOperator: "Operátor"
    },
    dashboard: {
      title: "Áttekintés",
      eyebrow: "Általános nézet",
      plants: "Növények",
      interventions: "Beavatkozások",
      tasks: "Feladatok",
      unreadNotices: "Olvasatlan értesítések",
      todayTitle: "Ma",
      todayDescription: "Nézd át a mai munkát és a még elvégzendő feladatokat.",
      offlineTitle: "Offline munka",
      offlineDescription: "Ellenőrizd a kapcsolat nélkül mentett módosításokat, és szinkronizáld őket, amikor visszatér az internet."
    },
    notices: {
      title: "Értesítések",
      eyebrow: "Értesítési központ",
      preferences: "Beállítások",
      markAllRead: "Összes megjelölése olvasottként",
      unread: "Olvasatlan",
      generatedToday: "Ma érkezett",
      empty: "Jelenleg nincs értesítésed.",
      read: "Olvasott",
      unreadState: "Olvasatlan",
      alreadyRead: "Már olvasott",
      markRead: "Megjelölés olvasottként"
    },
    notificationSettings: {
      title: "Értesítési beállítások",
      eyebrow: "Személyes beállítások",
      saved: "A módosítások mentve.",
      channelsTitle: "Hogyan szeretnél értesítéseket kapni",
      channelsDescription: "Az alkalmazáson belüli értesítések aktívak. Az email küldés elő van készítve, de letiltva marad, amíg a szolgáltatásban nincs engedélyezve.",
      inAppEnabled: "Értesítések fogadása az alkalmazásban",
      emailEnabled: "Értesítések fogadása emailben",
      eventsTitle: "Milyen értesítéseket szeretnél kapni",
      taskDueToday: "Ma esedékes feladatok",
      taskDueTomorrow: "Holnap esedékes feladatok",
      overdueTasks: "Lejárt, befejezetlen feladatok",
      proposalUpdates: "Beavatkozási javaslatok változásai",
      systemMessages: "Fontos rendszerértesítések",
      scheduleTitle: "Idő, időzóna és nyelv",
      dailyDigestHour: "Napi összefoglaló ideje",
      timezone: "Időzóna",
      locale: "Előnyben részesített nyelv"
    },
    recurring: {
      title: "Ütemezések",
      eyebrow: "Ismétlődő feladatok",
      goToPlants: "Ugrás a növényekhez",
      generateNow: "Feladatok létrehozása most",
      generationDone: "A folyamat befejeződött.",
      created: "Létrehozva",
      skipped: "Kihagyva",
      total: "Összes ütemezés",
      active: "Aktív",
      paused: "Szüneteltetve",
      empty: "Még nincsenek ütemezett feladatok. Nyiss meg egy növényt, és hozz létre ütemezést.",
      nextDate: "Következő dátum",
      lastGenerated: "Utoljára létrehozott feladat",
      pause: "Szüneteltetés",
      resume: "Újraaktiválás",
      viewPlant: "Növény megtekintése"
    },
    todayPage: {
      title: "Ma",
      eyebrow: "Napi agenda",
      notices: "Értesítések",
      tasksToManage: "Kezelendő feladatok",
      overdue: "Lejárt",
      unreadNotices: "Olvasatlan értesítések",
      overdueTitle: "Lejárt feladatok",
      todayTitle: "Mai feladatok",
      emptyToday: "Mára nincs ütemezett feladat."
    },
    tasksPage: {
      title: "Feladatok",
      eyebrow: "Teljes agenda",
      empty: "Nincs megjeleníthető feladat."
    },
    plantsPage: {
      title: "Növények és fák",
      eyebrow: "Archívum",
      newPlant: "Új növény",
      empty: "Még nincsenek növények az archívumban."
    },
    interventionsPage: {
      title: "Beavatkozások",
      eyebrow: "Munkatörténet",
      empty: "Nincs rögzített beavatkozás."
    },
    reportsPage: {
      title: "Riportok",
      eyebrow: "Adminisztrátori terület",
      pendingProposals: "Ellenőrizendő javaslatok",
      exportPlants: "Növények exportálása CSV-be",
      exportInterventions: "Beavatkozások exportálása CSV-be",
      exportTasks: "Feladatok exportálása CSV-be"
    },
    approvalsPage: {
      title: "Jóváhagyások",
      eyebrow: "Ellenőrizendő javaslatok",
      empty: "Nincs függőben lévő javaslat.",
      proposedBy: "javasolta",
      approve: "Jóváhagyás",
      reject: "Elutasítás"
    },
    admin: {
      usersTitle: "Felhasználók",
      usersEyebrow: "Hozzáférés-kezelés",
      systemTitle: "Rendszer",
      systemEyebrow: "Technikai ellenőrzések",
      database: "Adatbázis",
      connectionError: "A kapcsolat nem elérhető",
      serverEnv: "Szerverkonfiguráció",
      valid: "Érvényes",
      invalid: "Ellenőrzést igényel",
      publicConfig: "Nyilvános konfiguráció"
    },
    auth: {
      loginTitle: "Bejelentkezés",
      loginEyebrow: "Privát terület",
      invalidCredentials: "Az email vagy a jelszó hibás.",
      signingIn: "Bejelentkezés…",
      signIn: "Bejelentkezés",
      devSeedTitle: "DEV demo belépési adatok",
      forbiddenTitle: "Hozzáférés nem engedélyezett",
      forbiddenEyebrow: "Nincs elegendő jogosultság",
      forbiddenHeading: "Nincs jogosultságod belépni ebbe a részbe.",
      forbiddenBody: "Ha úgy gondolod, hogy ez hiba, kérj meg egy adminisztrátort a profilod ellenőrzésére.",
      backToSummary: "Vissza az áttekintéshez",
      goToLogin: "Ugrás a bejelentkezéshez"
    },
    labels: {
      roles: {
        SUPER_ADMIN: "Adminisztrátor",
        OPERATOR: "Operátor"
      },
      priorities: {
        MANDATORY: "Prioritás",
        RECOMMENDED: "Ajánlott"
      },
      taskStatuses: {
        SCHEDULED: "Ütemezve",
        NOTIFIED: "Értesítve",
        DONE: "Befejezve",
        SKIPPED: "Kihagyva",
        EXPIRED: "Lejárt"
      },
      recurrence: {
        DAILY: "Minden nap",
        WEEKLY: "Minden héten",
        EVERY_X_DAYS: "Minden {days}. napon"
      },
      notificationTypes: {
        INFO: "Információ",
        TASK: "Feladat",
        APPROVAL: "Jóváhagyás",
        SYSTEM: "Rendszer"
      },
      plantTypes: {
        PLANT: "Növény",
        TREE: "Fa"
      },
      environments: {
        INDOOR: "Beltéri",
        OUTDOOR: "Kültéri"
      },
      plantStatuses: {
        ACTIVE: "Aktív",
        ARCHIVED: "Archivált",
        REMOVED: "Eltávolított"
      },
      interventionTypes: {
        IRRIGATION: "Öntözés",
        PRUNING: "Metszés",
        FERTILIZATION: "Trágyázás",
        PHYTOSANITARY: "Kezelés",
        MEASUREMENT: "Mérés",
        TRANSPLANT: "Átültetés",
        HARVEST: "Betakarítás",
        OTHER: "Egyéb"
      }
    }
  ,
    backend: {
      chooseStartDate: "Válassz kezdő dátumot.",
      loginRequired: "A munkamenet nem aktív. Jelentkezz be újra.",
      noPermission: "Nincs jogosultságod ehhez a művelethez.",
      invalidPayload: "A beküldött adatok nem érvényesek. Ellenőrizd, majd próbáld újra.",
      unsupportedOperation: "Ez a művelet nem elérhető.",
      unknownError: "Hiba történt. Próbáld újra néhány perc múlva.",
      missingFile: "A folytatás előtt adj hozzá egy fájlt.",
      cronUnauthorized: "Érvénytelen hozzáférés ehhez az automatikus művelethez.",
      choosePlant: "Válassz növényt.",
      enterTitle: "Adj meg egy címet.",
      proposalsTitle: "Ellenőrizendő javaslatok",
      todaySection: "Mai feladatok",
      tomorrowSection: "Holnapi feladatok",
      overdueSection: "Lejárt feladatok",
      proposalsSection: "Ellenőrizendő javaslatok",
      appLink: "Alkalmazás megnyitása",
      noticesLink: "Értesítési központ",
      taskTodayTitle: (taskTitle: string) => `Mai feladat: ${taskTitle}`,
      taskTodayMessage: (plantLabel: string) => `${plantLabel} • ma esedékes`,
      taskTomorrowTitle: (taskTitle: string) => `Holnapi feladat: ${taskTitle}`,
      taskTomorrowMessage: (plantLabel: string) => `${plantLabel} • holnap esedékes`,
      taskOverdueTitle: (taskTitle: string) => `Lejárt feladat: ${taskTitle}`,
      taskOverdueMessage: (plantLabel: string) => `${plantLabel} • még el kell végezni`,
      proposalsMessage: (count: number) => `${count} javaslat vár ellenőrzésre.`,
      digestGreeting: (name: string) => `Szia ${name}, itt a napi összefoglalód`,
      digestGreetingText: (name: string) => `Szia ${name}, itt a napi összefoglalód.`,
      digestSubject: (dateKey: string) => `Agri App • napi összefoglaló ${dateKey}`
    }
  },
} as const;

export type Dictionary = typeof dictionary.it;

export function getDictionary(locale: Locale): Dictionary {
  return (dictionary[locale] ?? dictionary[DEFAULT_LOCALE]) as unknown as Dictionary;
}
