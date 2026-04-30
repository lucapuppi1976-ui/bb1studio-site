import type { Locale } from "@/lib/i18n/config";

export type NotificationScope = "all" | "unread" | "task" | "approval" | "system";

type NotificationHubText = {
  filters: Record<NotificationScope, string>;
  metrics: {
    all: string;
    unread: string;
    today: string;
    task: string;
    approval: string;
  };
  search: {
    label: string;
    placeholder: string;
    button: string;
    clear: string;
  };
  card: {
    received: string;
    status: string;
    unread: string;
    read: string;
    open: string;
    markRead: string;
    alreadyRead: string;
  };
  empty: {
    title: string;
    body: string;
  };
  settings: {
    channelStatus: string;
    inAppActive: string;
    emailPrepared: string;
    emailOff: string;
    emailOn: string;
    eventsDescription: string;
    scheduleDescription: string;
    digestHelp: string;
    timezoneHelp: string;
    localeHelp: string;
  };
};

export const notificationScopes: NotificationScope[] = ["all", "unread", "task", "approval", "system"];

const texts: Record<Locale, NotificationHubText> = {
  it: {
    filters: { all: "Tutti", unread: "Da leggere", task: "Attività", approval: "Approvazioni", system: "Sistema" },
    metrics: { all: "Avvisi totali", unread: "Da leggere", today: "Ricevuti oggi", task: "Attività", approval: "Approvazioni" },
    search: { label: "Cerca avvisi", placeholder: "Cerca per titolo o messaggio", button: "Cerca", clear: "Pulisci" },
    card: { received: "Ricevuto", status: "Stato", unread: "Da leggere", read: "Letto", open: "Apri", markRead: "Segna come letto", alreadyRead: "Già letto" },
    empty: { title: "Nessun avviso da mostrare", body: "Quando ci saranno attività, approvazioni o messaggi importanti, li troverai qui." },
    settings: {
      channelStatus: "Stato dei canali",
      inAppActive: "Gli avvisi dentro l’app sono il canale principale e restano disponibili nel centro avvisi.",
      emailPrepared: "L’invio email è predisposto, ma viene usato solo quando il servizio email è abilitato.",
      emailOff: "Email non attive sul servizio",
      emailOn: "Email attive sul servizio",
      eventsDescription: "Scegli quali situazioni devono generare un avviso dentro l’app.",
      scheduleDescription: "Imposta l’orario del riepilogo giornaliero e la lingua da usare per i messaggi automatici.",
      digestHelp: "Numero da 0 a 23. Esempio: 7 significa riepilogo alle 07:00.",
      timezoneHelp: "Usa una zona oraria valida, ad esempio Europe/Madrid.",
      localeHelp: "La lingua scelta viene usata per gli avvisi automatici e per i riepiloghi.",
    },
  },
  es: {
    filters: { all: "Todos", unread: "Por leer", task: "Tareas", approval: "Aprobaciones", system: "Sistema" },
    metrics: { all: "Avisos totales", unread: "Por leer", today: "Recibidos hoy", task: "Tareas", approval: "Aprobaciones" },
    search: { label: "Buscar avisos", placeholder: "Buscar por título o mensaje", button: "Buscar", clear: "Limpiar" },
    card: { received: "Recibido", status: "Estado", unread: "Por leer", read: "Leído", open: "Abrir", markRead: "Marcar como leído", alreadyRead: "Ya leído" },
    empty: { title: "No hay avisos para mostrar", body: "Cuando haya tareas, aprobaciones o mensajes importantes, aparecerán aquí." },
    settings: {
      channelStatus: "Estado de los canales",
      inAppActive: "Los avisos dentro de la app son el canal principal y permanecen disponibles en el centro de avisos.",
      emailPrepared: "El envío por email está preparado, pero solo se usa cuando el servicio de email está habilitado.",
      emailOff: "Email no activo en el servicio",
      emailOn: "Email activo en el servicio",
      eventsDescription: "Elige qué situaciones deben generar un aviso dentro de la app.",
      scheduleDescription: "Define la hora del resumen diario y el idioma para los mensajes automáticos.",
      digestHelp: "Número de 0 a 23. Ejemplo: 7 significa resumen a las 07:00.",
      timezoneHelp: "Usa una zona horaria válida, por ejemplo Europe/Madrid.",
      localeHelp: "El idioma elegido se usa para avisos automáticos y resúmenes.",
    },
  },
  en: {
    filters: { all: "All", unread: "Unread", task: "Tasks", approval: "Approvals", system: "System" },
    metrics: { all: "Total notices", unread: "Unread", today: "Received today", task: "Tasks", approval: "Approvals" },
    search: { label: "Search notices", placeholder: "Search by title or message", button: "Search", clear: "Clear" },
    card: { received: "Received", status: "Status", unread: "Unread", read: "Read", open: "Open", markRead: "Mark as read", alreadyRead: "Already read" },
    empty: { title: "No notices to show", body: "Tasks, approvals, and important messages will appear here when they need your attention." },
    settings: {
      channelStatus: "Channel status",
      inAppActive: "In-app notices are the main channel and remain available in the notice center.",
      emailPrepared: "Email delivery is prepared, but it is used only when the email service is enabled.",
      emailOff: "Email is not active on the service",
      emailOn: "Email is active on the service",
      eventsDescription: "Choose which situations should create an in-app notice.",
      scheduleDescription: "Set the daily summary hour and the language for automatic messages.",
      digestHelp: "Number from 0 to 23. Example: 7 means summary at 07:00.",
      timezoneHelp: "Use a valid time zone, for example Europe/Madrid.",
      localeHelp: "The selected language is used for automatic notices and summaries.",
    },
  },
  sk: {
    filters: { all: "Všetky", unread: "Neprečítané", task: "Úlohy", approval: "Schvaľovania", system: "Systém" },
    metrics: { all: "Celkový počet upozornení", unread: "Neprečítané", today: "Prijaté dnes", task: "Úlohy", approval: "Schvaľovania" },
    search: { label: "Hľadať upozornenia", placeholder: "Hľadať podľa názvu alebo správy", button: "Hľadať", clear: "Vymazať" },
    card: { received: "Prijaté", status: "Stav", unread: "Neprečítané", read: "Prečítané", open: "Otvoriť", markRead: "Označiť ako prečítané", alreadyRead: "Už prečítané" },
    empty: { title: "Žiadne upozornenia na zobrazenie", body: "Úlohy, schvaľovania a dôležité správy sa zobrazia tu." },
    settings: {
      channelStatus: "Stav kanálov",
      inAppActive: "Upozornenia v aplikácii sú hlavným kanálom a zostávajú dostupné v centre upozornení.",
      emailPrepared: "Odosielanie e-mailov je pripravené, ale použije sa iba po povolení e-mailovej služby.",
      emailOff: "E-mail nie je v službe aktívny",
      emailOn: "E-mail je v službe aktívny",
      eventsDescription: "Vyberte, ktoré situácie majú vytvoriť upozornenie v aplikácii.",
      scheduleDescription: "Nastavte hodinu denného súhrnu a jazyk automatických správ.",
      digestHelp: "Číslo od 0 do 23. Príklad: 7 znamená súhrn o 07:00.",
      timezoneHelp: "Použite platné časové pásmo, napríklad Europe/Madrid.",
      localeHelp: "Vybraný jazyk sa používa pre automatické upozornenia a súhrny.",
    },
  },
  fr: {
    filters: { all: "Tous", unread: "À lire", task: "Tâches", approval: "Validations", system: "Système" },
    metrics: { all: "Avis totaux", unread: "À lire", today: "Reçus aujourd’hui", task: "Tâches", approval: "Validations" },
    search: { label: "Rechercher des avis", placeholder: "Rechercher par titre ou message", button: "Rechercher", clear: "Effacer" },
    card: { received: "Reçu", status: "Statut", unread: "À lire", read: "Lu", open: "Ouvrir", markRead: "Marquer comme lu", alreadyRead: "Déjà lu" },
    empty: { title: "Aucun avis à afficher", body: "Les tâches, validations et messages importants apparaîtront ici." },
    settings: {
      channelStatus: "État des canaux",
      inAppActive: "Les avis dans l’app sont le canal principal et restent disponibles dans le centre d’avis.",
      emailPrepared: "L’envoi par e-mail est prêt, mais utilisé uniquement lorsque le service e-mail est activé.",
      emailOff: "E-mail non actif dans le service",
      emailOn: "E-mail actif dans le service",
      eventsDescription: "Choisissez les situations qui doivent créer un avis dans l’app.",
      scheduleDescription: "Définissez l’heure du récapitulatif quotidien et la langue des messages automatiques.",
      digestHelp: "Nombre de 0 à 23. Exemple : 7 signifie récapitulatif à 07:00.",
      timezoneHelp: "Utilisez un fuseau horaire valide, par exemple Europe/Madrid.",
      localeHelp: "La langue choisie est utilisée pour les avis automatiques et les récapitulatifs.",
    },
  },
  de: {
    filters: { all: "Alle", unread: "Ungelesen", task: "Aufgaben", approval: "Freigaben", system: "System" },
    metrics: { all: "Alle Hinweise", unread: "Ungelesen", today: "Heute erhalten", task: "Aufgaben", approval: "Freigaben" },
    search: { label: "Hinweise suchen", placeholder: "Nach Titel oder Nachricht suchen", button: "Suchen", clear: "Leeren" },
    card: { received: "Erhalten", status: "Status", unread: "Ungelesen", read: "Gelesen", open: "Öffnen", markRead: "Als gelesen markieren", alreadyRead: "Bereits gelesen" },
    empty: { title: "Keine Hinweise vorhanden", body: "Aufgaben, Freigaben und wichtige Nachrichten erscheinen hier." },
    settings: {
      channelStatus: "Kanalstatus",
      inAppActive: "Hinweise in der App sind der Hauptkanal und bleiben im Hinweiszentrum verfügbar.",
      emailPrepared: "Der E-Mail-Versand ist vorbereitet, wird aber nur genutzt, wenn der E-Mail-Dienst aktiviert ist.",
      emailOff: "E-Mail im Dienst nicht aktiv",
      emailOn: "E-Mail im Dienst aktiv",
      eventsDescription: "Wählen Sie, welche Situationen einen Hinweis in der App erzeugen sollen.",
      scheduleDescription: "Legen Sie die Uhrzeit der täglichen Übersicht und die Sprache automatischer Nachrichten fest.",
      digestHelp: "Zahl von 0 bis 23. Beispiel: 7 bedeutet Übersicht um 07:00.",
      timezoneHelp: "Verwenden Sie eine gültige Zeitzone, zum Beispiel Europe/Madrid.",
      localeHelp: "Die gewählte Sprache wird für automatische Hinweise und Übersichten verwendet.",
    },
  },
  ru: {
    filters: { all: "Все", unread: "Непрочитанные", task: "Задачи", approval: "Согласования", system: "Система" },
    metrics: { all: "Всего уведомлений", unread: "Непрочитанные", today: "Получены сегодня", task: "Задачи", approval: "Согласования" },
    search: { label: "Поиск уведомлений", placeholder: "Искать по заголовку или сообщению", button: "Искать", clear: "Очистить" },
    card: { received: "Получено", status: "Статус", unread: "Непрочитано", read: "Прочитано", open: "Открыть", markRead: "Отметить как прочитанное", alreadyRead: "Уже прочитано" },
    empty: { title: "Нет уведомлений для показа", body: "Задачи, согласования и важные сообщения появятся здесь." },
    settings: {
      channelStatus: "Статус каналов",
      inAppActive: "Уведомления внутри приложения — основной канал и доступны в центре уведомлений.",
      emailPrepared: "Отправка email подготовлена, но используется только после включения email-сервиса.",
      emailOff: "Email не активен в сервисе",
      emailOn: "Email активен в сервисе",
      eventsDescription: "Выберите, какие ситуации должны создавать уведомление внутри приложения.",
      scheduleDescription: "Установите время ежедневного обзора и язык автоматических сообщений.",
      digestHelp: "Число от 0 до 23. Например, 7 означает обзор в 07:00.",
      timezoneHelp: "Используйте корректный часовой пояс, например Europe/Madrid.",
      localeHelp: "Выбранный язык используется для автоматических уведомлений и обзоров.",
    },
  },
  hu: {
    filters: { all: "Összes", unread: "Olvasatlan", task: "Feladatok", approval: "Jóváhagyások", system: "Rendszer" },
    metrics: { all: "Összes értesítés", unread: "Olvasatlan", today: "Ma érkezett", task: "Feladatok", approval: "Jóváhagyások" },
    search: { label: "Értesítések keresése", placeholder: "Keresés cím vagy üzenet alapján", button: "Keresés", clear: "Törlés" },
    card: { received: "Érkezett", status: "Állapot", unread: "Olvasatlan", read: "Olvasott", open: "Megnyitás", markRead: "Olvasottnak jelölés", alreadyRead: "Már olvasott" },
    empty: { title: "Nincs megjeleníthető értesítés", body: "A feladatok, jóváhagyások és fontos üzenetek itt jelennek meg." },
    settings: {
      channelStatus: "Csatornák állapota",
      inAppActive: "Az alkalmazáson belüli értesítések a fő csatorna, és elérhetők az értesítési központban.",
      emailPrepared: "Az email küldés elő van készítve, de csak akkor használjuk, ha az email szolgáltatás engedélyezve van.",
      emailOff: "Email nem aktív a szolgáltatásban",
      emailOn: "Email aktív a szolgáltatásban",
      eventsDescription: "Válaszd ki, mely helyzetek hozzanak létre alkalmazáson belüli értesítést.",
      scheduleDescription: "Állítsd be a napi összefoglaló időpontját és az automatikus üzenetek nyelvét.",
      digestHelp: "0 és 23 közötti szám. Példa: 7 jelentése összefoglaló 07:00-kor.",
      timezoneHelp: "Használj érvényes időzónát, például Europe/Madrid.",
      localeHelp: "A kiválasztott nyelvet az automatikus értesítésekhez és összefoglalókhoz használjuk.",
    },
  },
};

export function getNotificationHubText(locale: Locale) {
  return texts[locale] ?? texts.it;
}
