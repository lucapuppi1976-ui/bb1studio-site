import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

type AdminSystemCockpitText = {
  header: {
    title: string;
    eyebrow: string;
    description: string;
  };
  status: {
    ok: string;
    warning: string;
    problem: string;
    disabled: string;
    enabled: string;
    ready: string;
    notReady: string;
    configured: string;
    missing: string;
    safe: string;
  };
  cards: {
    database: { title: string; bodyOk: string; bodyProblem: string };
    environment: { title: string; bodyOk: string; bodyProblem: string };
    email: { title: string; bodyDisabled: string; bodyEnabled: string };
    cron: { title: string; bodyOk: string; bodyProblem: string };
  };
  sections: {
    operationalNumbers: string;
    recurringQuality: string;
    quickChecks: string;
    publicConfig: string;
    missingServerEnv: string;
    notes: string;
  };
  labels: {
    dbName: string;
    dbHost: string;
    dbTarget: string;
    serverEnv: string;
    publicConfig: string;
    emailMode: string;
    emailFrom: string;
    emailProvider: string;
    canSendTestEmail: string;
    cronSecret: string;
    users: string;
    plants: string;
    openTasks: string;
    generatedTasks: string;
    schedules: string;
    activeSchedules: string;
    dueSchedules: string;
    unassignedSchedules: string;
    unreadNotices: string;
    generatedWithoutSourceDate: string;
    generatedWithoutTemplate: string;
    duplicateGroups: string;
  };
  actions: {
    health: string;
    ready: string;
    emailStatus: string;
    preflight: string;
    notifications: string;
    recurringTasks: string;
    reports: string;
  };
  messages: {
    noMissingEnv: string;
    noData: string;
    liveDbWarning: string;
    emailDisabledSafe: string;
    duplicateOk: string;
    generatedQualityOk: string;
    publicConfigHint: string;
  };
};

const texts: Record<Locale, AdminSystemCockpitText> = {
  it: {
    header: { title: "Sistema", eyebrow: "Cockpit operativo", description: "Controlla stato app, database, email, cron e qualità delle programmazioni prima di intervenire sul live." },
    status: { ok: "OK", warning: "Attenzione", problem: "Problema", disabled: "Disattivato", enabled: "Attivo", ready: "Pronto", notReady: "Non pronto", configured: "Configurato", missing: "Mancante", safe: "Sicuro" },
    cards: {
      database: { title: "Database", bodyOk: "La connessione al database risponde correttamente.", bodyProblem: "La connessione al database non risponde." },
      environment: { title: "Variabili server", bodyOk: "La configurazione server è valida.", bodyProblem: "Mancano variabili server o la configurazione non è valida." },
      email: { title: "Email", bodyDisabled: "Gli invii reali sono disattivati: configurazione sicura per il live.", bodyEnabled: "Gli invii reali risultano attivi: verifica che sia intenzionale." },
      cron: { title: "Cron", bodyOk: "CRON_SECRET è configurato.", bodyProblem: "CRON_SECRET non risulta configurato." },
    },
    sections: { operationalNumbers: "Numeri operativi", recurringQuality: "Qualità programmazioni", quickChecks: "Controlli rapidi", publicConfig: "Configurazione pubblica", missingServerEnv: "Variabili server mancanti", notes: "Note operative" },
    labels: { dbName: "Database", dbHost: "Host", dbTarget: "Target", serverEnv: "Server env", publicConfig: "Public env", emailMode: "Modalità email", emailFrom: "Mittente", emailProvider: "Provider email", canSendTestEmail: "Test email reale", cronSecret: "CRON_SECRET", users: "Utenti", plants: "Piante", openTasks: "Attività aperte", generatedTasks: "Attività da programmazioni", schedules: "Programmazioni", activeSchedules: "Programmazioni attive", dueSchedules: "Da generare", unassignedSchedules: "Senza responsabile", unreadNotices: "Avvisi da leggere", generatedWithoutSourceDate: "Generate senza data origine", generatedWithoutTemplate: "Con data origine ma senza programmazione", duplicateGroups: "Gruppi duplicati" },
    actions: { health: "Health", ready: "Ready", emailStatus: "Stato email", preflight: "Preflight", notifications: "Avvisi", recurringTasks: "Programmazioni", reports: "Rapporti" },
    messages: { noMissingEnv: "Nessuna variabile server mancante.", noData: "Dato non disponibile.", liveDbWarning: "Il live deve puntare al database di produzione. In Codespaces invece deve essere usato il DB DEV.", emailDisabledSafe: "Le email restano bloccate finché ENABLE_EMAIL_NOTIFICATIONS=false.", duplicateOk: "Nessun doppione ricorrente rilevato nei primi controlli.", generatedQualityOk: "Le attività generate hanno collegamenti coerenti alla programmazione.", publicConfigHint: "Questi valori sono pubblici e non devono contenere segreti." },
  },
  es: {
    header: { title: "Sistema", eyebrow: "Panel operativo", description: "Controla app, base de datos, email, cron y calidad de programaciones antes de operar en producción." },
    status: { ok: "OK", warning: "Atención", problem: "Problema", disabled: "Desactivado", enabled: "Activo", ready: "Listo", notReady: "No listo", configured: "Configurado", missing: "Falta", safe: "Seguro" },
    cards: { database: { title: "Base de datos", bodyOk: "La conexión responde correctamente.", bodyProblem: "La conexión no responde." }, environment: { title: "Variables servidor", bodyOk: "La configuración del servidor es válida.", bodyProblem: "Faltan variables o la configuración no es válida." }, email: { title: "Email", bodyDisabled: "Los envíos reales están desactivados: configuración segura para live.", bodyEnabled: "Los envíos reales están activos: verifica que sea intencional." }, cron: { title: "Cron", bodyOk: "CRON_SECRET está configurado.", bodyProblem: "CRON_SECRET no está configurado." } },
    sections: { operationalNumbers: "Números operativos", recurringQuality: "Calidad de programaciones", quickChecks: "Comprobaciones rápidas", publicConfig: "Configuración pública", missingServerEnv: "Variables servidor faltantes", notes: "Notas operativas" },
    labels: { dbName: "Base de datos", dbHost: "Host", dbTarget: "Destino", serverEnv: "Server env", publicConfig: "Public env", emailMode: "Modo email", emailFrom: "Remitente", emailProvider: "Proveedor email", canSendTestEmail: "Test email real", cronSecret: "CRON_SECRET", users: "Usuarios", plants: "Plantas", openTasks: "Tareas abiertas", generatedTasks: "Tareas de programaciones", schedules: "Programaciones", activeSchedules: "Programaciones activas", dueSchedules: "Por generar", unassignedSchedules: "Sin responsable", unreadNotices: "Avisos por leer", generatedWithoutSourceDate: "Generadas sin fecha origen", generatedWithoutTemplate: "Con fecha origen sin programación", duplicateGroups: "Grupos duplicados" },
    actions: { health: "Health", ready: "Ready", emailStatus: "Estado email", preflight: "Preflight", notifications: "Avisos", recurringTasks: "Programaciones", reports: "Informes" },
    messages: { noMissingEnv: "No faltan variables servidor.", noData: "Dato no disponible.", liveDbWarning: "Live debe apuntar al DB de producción. Codespaces debe usar DB DEV.", emailDisabledSafe: "El email queda bloqueado mientras ENABLE_EMAIL_NOTIFICATIONS=false.", duplicateOk: "No se detectaron duplicados recurrentes.", generatedQualityOk: "Las tareas generadas tienen vínculos coherentes.", publicConfigHint: "Estos valores son públicos y no deben contener secretos." },
  },
  en: {
    header: { title: "System", eyebrow: "Operations cockpit", description: "Check app, database, email, cron, and schedule quality before operating on live." },
    status: { ok: "OK", warning: "Warning", problem: "Problem", disabled: "Disabled", enabled: "Enabled", ready: "Ready", notReady: "Not ready", configured: "Configured", missing: "Missing", safe: "Safe" },
    cards: { database: { title: "Database", bodyOk: "The database connection is responding correctly.", bodyProblem: "The database connection is not responding." }, environment: { title: "Server variables", bodyOk: "The server configuration is valid.", bodyProblem: "Some server variables are missing or invalid." }, email: { title: "Email", bodyDisabled: "Real email delivery is disabled: safe live configuration.", bodyEnabled: "Real email delivery is enabled: confirm this is intentional." }, cron: { title: "Cron", bodyOk: "CRON_SECRET is configured.", bodyProblem: "CRON_SECRET is not configured." } },
    sections: { operationalNumbers: "Operational numbers", recurringQuality: "Schedule quality", quickChecks: "Quick checks", publicConfig: "Public configuration", missingServerEnv: "Missing server variables", notes: "Operational notes" },
    labels: { dbName: "Database", dbHost: "Host", dbTarget: "Target", serverEnv: "Server env", publicConfig: "Public env", emailMode: "Email mode", emailFrom: "Sender", emailProvider: "Email provider", canSendTestEmail: "Real email test", cronSecret: "CRON_SECRET", users: "Users", plants: "Plants", openTasks: "Open tasks", generatedTasks: "Scheduled tasks generated", schedules: "Schedules", activeSchedules: "Active schedules", dueSchedules: "Due schedules", unassignedSchedules: "Unassigned schedules", unreadNotices: "Unread notices", generatedWithoutSourceDate: "Generated without source date", generatedWithoutTemplate: "Source date without schedule", duplicateGroups: "Duplicate groups" },
    actions: { health: "Health", ready: "Ready", emailStatus: "Email status", preflight: "Preflight", notifications: "Notices", recurringTasks: "Schedules", reports: "Reports" },
    messages: { noMissingEnv: "No missing server variables.", noData: "Data not available.", liveDbWarning: "Live must point to the production database. Codespaces should use the DEV database.", emailDisabledSafe: "Email remains blocked while ENABLE_EMAIL_NOTIFICATIONS=false.", duplicateOk: "No recurring duplicates detected.", generatedQualityOk: "Generated tasks have consistent schedule links.", publicConfigHint: "These values are public and must not contain secrets." },
  },
  sk: {
    header: { title: "Systém", eyebrow: "Operačný panel", description: "Skontrolujte aplikáciu, databázu, email, cron a kvalitu plánovaní pred prácou na live." },
    status: { ok: "OK", warning: "Pozor", problem: "Problém", disabled: "Vypnuté", enabled: "Zapnuté", ready: "Pripravené", notReady: "Nepripravené", configured: "Nastavené", missing: "Chýba", safe: "Bezpečné" },
    cards: { database: { title: "Databáza", bodyOk: "Pripojenie k databáze funguje.", bodyProblem: "Pripojenie k databáze nefunguje." }, environment: { title: "Serverové premenné", bodyOk: "Serverová konfigurácia je platná.", bodyProblem: "Niektoré serverové premenné chýbajú alebo sú neplatné." }, email: { title: "Email", bodyDisabled: "Skutočné odosielanie emailov je vypnuté.", bodyEnabled: "Skutočné odosielanie emailov je zapnuté: overte zámer." }, cron: { title: "Cron", bodyOk: "CRON_SECRET je nastavený.", bodyProblem: "CRON_SECRET nie je nastavený." } },
    sections: { operationalNumbers: "Operačné čísla", recurringQuality: "Kvalita plánovaní", quickChecks: "Rýchle kontroly", publicConfig: "Verejná konfigurácia", missingServerEnv: "Chýbajúce serverové premenné", notes: "Operačné poznámky" },
    labels: { dbName: "Databáza", dbHost: "Host", dbTarget: "Cieľ", serverEnv: "Server env", publicConfig: "Public env", emailMode: "Režim emailu", emailFrom: "Odosielateľ", emailProvider: "Email provider", canSendTestEmail: "Test reálneho emailu", cronSecret: "CRON_SECRET", users: "Používatelia", plants: "Rastliny", openTasks: "Otvorené úlohy", generatedTasks: "Úlohy z plánovaní", schedules: "Plánovania", activeSchedules: "Aktívne plánovania", dueSchedules: "Na vytvorenie", unassignedSchedules: "Bez zodpovednej osoby", unreadNotices: "Neprečítané upozornenia", generatedWithoutSourceDate: "Bez dátumu pôvodu", generatedWithoutTemplate: "Dátum pôvodu bez plánovania", duplicateGroups: "Duplicitné skupiny" },
    actions: { health: "Health", ready: "Ready", emailStatus: "Stav emailu", preflight: "Preflight", notifications: "Upozornenia", recurringTasks: "Plánovania", reports: "Reporty" },
    messages: { noMissingEnv: "Nechýbajú žiadne serverové premenné.", noData: "Údaj nie je dostupný.", liveDbWarning: "Live má používať produkčnú databázu. Codespaces má používať DEV databázu.", emailDisabledSafe: "Email je blokovaný, kým ENABLE_EMAIL_NOTIFICATIONS=false.", duplicateOk: "Neboli zistené duplicity plánovaní.", generatedQualityOk: "Vytvorené úlohy majú konzistentné väzby.", publicConfigHint: "Tieto hodnoty sú verejné a nesmú obsahovať tajomstvá." },
  },
  fr: {
    header: { title: "Système", eyebrow: "Cockpit opérationnel", description: "Contrôlez application, base, email, cron et qualité des programmations avant d’agir sur le live." },
    status: { ok: "OK", warning: "Attention", problem: "Problème", disabled: "Désactivé", enabled: "Activé", ready: "Prêt", notReady: "Pas prêt", configured: "Configuré", missing: "Manquant", safe: "Sûr" },
    cards: { database: { title: "Base de données", bodyOk: "La connexion répond correctement.", bodyProblem: "La connexion ne répond pas." }, environment: { title: "Variables serveur", bodyOk: "La configuration serveur est valide.", bodyProblem: "Des variables serveur manquent ou sont invalides." }, email: { title: "Email", bodyDisabled: "L’envoi réel est désactivé : configuration live sûre.", bodyEnabled: "L’envoi réel est activé : vérifiez que c’est intentionnel." }, cron: { title: "Cron", bodyOk: "CRON_SECRET est configuré.", bodyProblem: "CRON_SECRET n’est pas configuré." } },
    sections: { operationalNumbers: "Chiffres opérationnels", recurringQuality: "Qualité des programmations", quickChecks: "Contrôles rapides", publicConfig: "Configuration publique", missingServerEnv: "Variables serveur manquantes", notes: "Notes opérationnelles" },
    labels: { dbName: "Base", dbHost: "Host", dbTarget: "Cible", serverEnv: "Server env", publicConfig: "Public env", emailMode: "Mode email", emailFrom: "Expéditeur", emailProvider: "Provider email", canSendTestEmail: "Test email réel", cronSecret: "CRON_SECRET", users: "Utilisateurs", plants: "Plantes", openTasks: "Tâches ouvertes", generatedTasks: "Tâches issues de programmations", schedules: "Programmations", activeSchedules: "Programmations actives", dueSchedules: "À générer", unassignedSchedules: "Sans responsable", unreadNotices: "Avis non lus", generatedWithoutSourceDate: "Sans date source", generatedWithoutTemplate: "Date source sans programmation", duplicateGroups: "Groupes dupliqués" },
    actions: { health: "Health", ready: "Ready", emailStatus: "État email", preflight: "Preflight", notifications: "Avis", recurringTasks: "Programmations", reports: "Rapports" },
    messages: { noMissingEnv: "Aucune variable serveur manquante.", noData: "Donnée non disponible.", liveDbWarning: "Le live doit utiliser la base de production. Codespaces doit utiliser la base DEV.", emailDisabledSafe: "L’email reste bloqué tant que ENABLE_EMAIL_NOTIFICATIONS=false.", duplicateOk: "Aucun doublon récurrent détecté.", generatedQualityOk: "Les tâches générées ont des liens cohérents.", publicConfigHint: "Ces valeurs sont publiques et ne doivent pas contenir de secrets." },
  },
  de: {
    header: { title: "System", eyebrow: "Betriebs-Cockpit", description: "Prüfen Sie App, Datenbank, E-Mail, Cron und Planungsqualität vor Arbeiten am Live-System." },
    status: { ok: "OK", warning: "Achtung", problem: "Problem", disabled: "Deaktiviert", enabled: "Aktiv", ready: "Bereit", notReady: "Nicht bereit", configured: "Konfiguriert", missing: "Fehlt", safe: "Sicher" },
    cards: { database: { title: "Datenbank", bodyOk: "Die Verbindung antwortet korrekt.", bodyProblem: "Die Verbindung antwortet nicht." }, environment: { title: "Server-Variablen", bodyOk: "Die Serverkonfiguration ist gültig.", bodyProblem: "Server-Variablen fehlen oder sind ungültig." }, email: { title: "E-Mail", bodyDisabled: "Realer Versand ist deaktiviert: sichere Live-Konfiguration.", bodyEnabled: "Realer Versand ist aktiv: bitte Absicht prüfen." }, cron: { title: "Cron", bodyOk: "CRON_SECRET ist konfiguriert.", bodyProblem: "CRON_SECRET ist nicht konfiguriert." } },
    sections: { operationalNumbers: "Betriebszahlen", recurringQuality: "Planungsqualität", quickChecks: "Schnellprüfungen", publicConfig: "Öffentliche Konfiguration", missingServerEnv: "Fehlende Server-Variablen", notes: "Betriebsnotizen" },
    labels: { dbName: "Datenbank", dbHost: "Host", dbTarget: "Ziel", serverEnv: "Server env", publicConfig: "Public env", emailMode: "E-Mail-Modus", emailFrom: "Absender", emailProvider: "E-Mail-Provider", canSendTestEmail: "Realtest E-Mail", cronSecret: "CRON_SECRET", users: "Benutzer", plants: "Pflanzen", openTasks: "Offene Aufgaben", generatedTasks: "Aufgaben aus Planungen", schedules: "Planungen", activeSchedules: "Aktive Planungen", dueSchedules: "Fällig", unassignedSchedules: "Nicht zugewiesen", unreadNotices: "Ungelesene Hinweise", generatedWithoutSourceDate: "Ohne Quelldatum", generatedWithoutTemplate: "Quelldatum ohne Planung", duplicateGroups: "Doppelte Gruppen" },
    actions: { health: "Health", ready: "Ready", emailStatus: "E-Mail-Status", preflight: "Preflight", notifications: "Hinweise", recurringTasks: "Planungen", reports: "Berichte" },
    messages: { noMissingEnv: "Keine Server-Variablen fehlen.", noData: "Daten nicht verfügbar.", liveDbWarning: "Live muss die Produktionsdatenbank nutzen. Codespaces sollte DEV nutzen.", emailDisabledSafe: "E-Mail bleibt blockiert, solange ENABLE_EMAIL_NOTIFICATIONS=false ist.", duplicateOk: "Keine wiederkehrenden Duplikate erkannt.", generatedQualityOk: "Generierte Aufgaben haben konsistente Verknüpfungen.", publicConfigHint: "Diese Werte sind öffentlich und dürfen keine Geheimnisse enthalten." },
  },
  ru: {
    header: { title: "Система", eyebrow: "Операционный центр", description: "Проверка приложения, БД, email, cron и качества расписаний перед действиями в live." },
    status: { ok: "OK", warning: "Внимание", problem: "Проблема", disabled: "Отключено", enabled: "Включено", ready: "Готово", notReady: "Не готово", configured: "Настроено", missing: "Отсутствует", safe: "Безопасно" },
    cards: { database: { title: "База данных", bodyOk: "Соединение работает корректно.", bodyProblem: "Соединение не отвечает." }, environment: { title: "Переменные сервера", bodyOk: "Конфигурация сервера валидна.", bodyProblem: "Некоторые переменные отсутствуют или неверны." }, email: { title: "Email", bodyDisabled: "Реальная отправка отключена: безопасная live-конфигурация.", bodyEnabled: "Реальная отправка включена: проверьте, что это намеренно." }, cron: { title: "Cron", bodyOk: "CRON_SECRET настроен.", bodyProblem: "CRON_SECRET не настроен." } },
    sections: { operationalNumbers: "Операционные показатели", recurringQuality: "Качество расписаний", quickChecks: "Быстрые проверки", publicConfig: "Публичная конфигурация", missingServerEnv: "Отсутствующие переменные", notes: "Операционные заметки" },
    labels: { dbName: "База", dbHost: "Хост", dbTarget: "Цель", serverEnv: "Server env", publicConfig: "Public env", emailMode: "Режим email", emailFrom: "Отправитель", emailProvider: "Email provider", canSendTestEmail: "Реальный email-тест", cronSecret: "CRON_SECRET", users: "Пользователи", plants: "Растения", openTasks: "Открытые задачи", generatedTasks: "Задачи из расписаний", schedules: "Расписания", activeSchedules: "Активные расписания", dueSchedules: "К созданию", unassignedSchedules: "Без ответственного", unreadNotices: "Непрочитанные уведомления", generatedWithoutSourceDate: "Без исходной даты", generatedWithoutTemplate: "Исходная дата без расписания", duplicateGroups: "Дублирующиеся группы" },
    actions: { health: "Health", ready: "Ready", emailStatus: "Статус email", preflight: "Preflight", notifications: "Уведомления", recurringTasks: "Расписания", reports: "Отчёты" },
    messages: { noMissingEnv: "Нет отсутствующих серверных переменных.", noData: "Данные недоступны.", liveDbWarning: "Live должен использовать production БД. Codespaces должен использовать DEV БД.", emailDisabledSafe: "Email заблокирован, пока ENABLE_EMAIL_NOTIFICATIONS=false.", duplicateOk: "Дубликаты расписаний не обнаружены.", generatedQualityOk: "Созданные задачи имеют корректные связи.", publicConfigHint: "Эти значения публичны и не должны содержать секреты." },
  },
  hu: {
    header: { title: "Rendszer", eyebrow: "Operációs cockpit", description: "Ellenőrizd az alkalmazást, adatbázist, emailt, cront és ütemezési minőséget éles műveletek előtt." },
    status: { ok: "OK", warning: "Figyelem", problem: "Probléma", disabled: "Letiltva", enabled: "Aktív", ready: "Kész", notReady: "Nem kész", configured: "Beállítva", missing: "Hiányzik", safe: "Biztonságos" },
    cards: { database: { title: "Adatbázis", bodyOk: "Az adatbázis-kapcsolat válaszol.", bodyProblem: "Az adatbázis-kapcsolat nem válaszol." }, environment: { title: "Szerverváltozók", bodyOk: "A szerverkonfiguráció érvényes.", bodyProblem: "Hiányzó vagy hibás szerverváltozók vannak." }, email: { title: "Email", bodyDisabled: "A valós emailküldés tiltva: biztonságos live beállítás.", bodyEnabled: "A valós emailküldés aktív: ellenőrizd, hogy szándékos-e." }, cron: { title: "Cron", bodyOk: "CRON_SECRET beállítva.", bodyProblem: "CRON_SECRET nincs beállítva." } },
    sections: { operationalNumbers: "Operációs számok", recurringQuality: "Ütemezési minőség", quickChecks: "Gyors ellenőrzések", publicConfig: "Publikus konfiguráció", missingServerEnv: "Hiányzó szerverváltozók", notes: "Operációs jegyzetek" },
    labels: { dbName: "Adatbázis", dbHost: "Host", dbTarget: "Cél", serverEnv: "Server env", publicConfig: "Public env", emailMode: "Email mód", emailFrom: "Feladó", emailProvider: "Email provider", canSendTestEmail: "Valós email teszt", cronSecret: "CRON_SECRET", users: "Felhasználók", plants: "Növények", openTasks: "Nyitott feladatok", generatedTasks: "Ütemezésből létrehozott feladatok", schedules: "Ütemezések", activeSchedules: "Aktív ütemezések", dueSchedules: "Esedékes", unassignedSchedules: "Nincs felelős", unreadNotices: "Olvasatlan értesítések", generatedWithoutSourceDate: "Forrásdátum nélkül", generatedWithoutTemplate: "Forrásdátum ütemezés nélkül", duplicateGroups: "Duplikált csoportok" },
    actions: { health: "Health", ready: "Ready", emailStatus: "Email állapot", preflight: "Preflight", notifications: "Értesítések", recurringTasks: "Ütemezések", reports: "Jelentések" },
    messages: { noMissingEnv: "Nincs hiányzó szerverváltozó.", noData: "Nincs elérhető adat.", liveDbWarning: "A live a production adatbázist használja. Codespaces DEV adatbázist használjon.", emailDisabledSafe: "Az email tiltva marad, amíg ENABLE_EMAIL_NOTIFICATIONS=false.", duplicateOk: "Nincs ismétlődő duplikáció.", generatedQualityOk: "A létrehozott feladatok kapcsolatai konzisztensek.", publicConfigHint: "Ezek publikus értékek, nem tartalmazhatnak titkokat." },
  },
};

export function getAdminSystemCockpitText(locale: Locale): AdminSystemCockpitText {
  return texts[locale] ?? texts[DEFAULT_LOCALE];
}
