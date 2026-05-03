import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

type AccessRolesCopy = {
  users: {
    title: string;
    eyebrow: string;
    description: string;
    signedIn: string;
    total: string;
    admins: string;
    operators: string;
    userList: string;
    roleMatrix: string;
    lastUpdated: string;
  };
  roles: {
    superAdmin: string;
    operator: string;
    superAdminDescription: string;
    operatorDescription: string;
    superAdminWarning: string;
  };
  permissions: {
    title: string;
    adminOnly: string;
    operatorAllowed: string;
    publicAccess: string;
    superAdminAreas: string;
    operatorAreas: string;
    apiProtection: string;
    cronProtection: string;
  };
  fields: {
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    noName: string;
    currentUser: string;
  };
  forbidden: {
    title: string;
    eyebrow: string;
    heading: string;
    body: string;
    sessionHint: string;
    adminHint: string;
    dashboard: string;
    login: string;
  };
  actions: {
    openDashboard: string;
    openSystem: string;
  };
};

const copy: Record<Locale, AccessRolesCopy> = {
  it: {
    users: { title: "Utenti e accessi", eyebrow: "Ruoli operativi", description: "Controlla chi può operare nell’app e quali aree sono riservate agli amministratori.", signedIn: "Sessione corrente", total: "Utenti", admins: "Amministratori", operators: "Operatori", userList: "Utenti registrati", roleMatrix: "Matrice permessi", lastUpdated: "Ultimo aggiornamento" },
    roles: { superAdmin: "Amministratore", operator: "Operatore", superAdminDescription: "Accesso completo a sistema, utenti, rapporti, approvazioni e programmazioni.", operatorDescription: "Accesso alle attività operative: piante, interventi, attività, oggi, avvisi e scanner.", superAdminWarning: "Mantieni almeno un amministratore attivo prima di modificare ruoli o accessi." },
    permissions: { title: "Regole accesso", adminOnly: "Solo amministratore", operatorAllowed: "Operatore consentito", publicAccess: "Pubblico o pre-login", superAdminAreas: "Admin, utenti, sistema, report, approvazioni, programmazioni e modifiche sensibili.", operatorAreas: "Dashboard, piante, interventi, attività, oggi, avvisi, scanner e lavoro offline.", apiProtection: "Le API operative usano sessione utente o controllo ruolo amministratore.", cronProtection: "Le API cron sono protette da CRON_SECRET e non dipendono dalla sessione browser." },
    fields: { name: "Nome", email: "Email", role: "Ruolo", createdAt: "Creato", updatedAt: "Aggiornato", noName: "Nome non indicato", currentUser: "utente corrente" },
    forbidden: { title: "Accesso non consentito", eyebrow: "Permessi insufficienti", heading: "Non hai i permessi per entrare in questa sezione.", body: "Questa area è riservata a un ruolo diverso. Se pensi che sia un errore, chiedi a un amministratore di verificare il tuo profilo.", sessionHint: "Se hai appena cambiato ruolo, esci e accedi di nuovo per aggiornare la sessione.", adminHint: "Le aree amministrative richiedono il ruolo Amministratore.", dashboard: "Torna alla dashboard", login: "Vai al login" },
    actions: { openDashboard: "Apri dashboard", openSystem: "Apri sistema" },
  },
  es: {
    users: { title: "Usuarios y accesos", eyebrow: "Roles operativos", description: "Controla quién puede operar en la app y qué áreas están reservadas a administradores.", signedIn: "Sesión actual", total: "Usuarios", admins: "Administradores", operators: "Operadores", userList: "Usuarios registrados", roleMatrix: "Matriz de permisos", lastUpdated: "Última actualización" },
    roles: { superAdmin: "Administrador", operator: "Operador", superAdminDescription: "Acceso completo a sistema, usuarios, informes, aprobaciones y programaciones.", operatorDescription: "Acceso a las áreas operativas: plantas, intervenciones, tareas, hoy, avisos y escáner.", superAdminWarning: "Mantén al menos un administrador activo antes de cambiar roles o accesos." },
    permissions: { title: "Reglas de acceso", adminOnly: "Solo administrador", operatorAllowed: "Operador permitido", publicAccess: "Público o previo al login", superAdminAreas: "Admin, usuarios, sistema, informes, aprobaciones, programaciones y cambios sensibles.", operatorAreas: "Dashboard, plantas, intervenciones, tareas, hoy, avisos, escáner y trabajo sin conexión.", apiProtection: "Las API operativas usan sesión de usuario o control de rol administrador.", cronProtection: "Las API cron están protegidas por CRON_SECRET y no dependen de la sesión del navegador." },
    fields: { name: "Nombre", email: "Email", role: "Rol", createdAt: "Creado", updatedAt: "Actualizado", noName: "Nombre no indicado", currentUser: "usuario actual" },
    forbidden: { title: "Acceso no permitido", eyebrow: "Permisos insuficientes", heading: "No tienes permisos para entrar en esta sección.", body: "Esta área está reservada a otro rol. Si crees que es un error, pide a un administrador que revise tu perfil.", sessionHint: "Si acabas de cambiar de rol, cierra sesión e inicia sesión de nuevo.", adminHint: "Las áreas administrativas requieren rol de Administrador.", dashboard: "Volver al dashboard", login: "Ir al login" },
    actions: { openDashboard: "Abrir dashboard", openSystem: "Abrir sistema" },
  },
  en: {
    users: { title: "Users and access", eyebrow: "Operational roles", description: "Review who can operate in the app and which areas are reserved for administrators.", signedIn: "Current session", total: "Users", admins: "Administrators", operators: "Operators", userList: "Registered users", roleMatrix: "Permission matrix", lastUpdated: "Last updated" },
    roles: { superAdmin: "Administrator", operator: "Operator", superAdminDescription: "Full access to system, users, reports, approvals, and schedules.", operatorDescription: "Access to operational areas: plants, interventions, tasks, today, notices, and scanner.", superAdminWarning: "Keep at least one active administrator before changing roles or access." },
    permissions: { title: "Access rules", adminOnly: "Administrator only", operatorAllowed: "Operator allowed", publicAccess: "Public or pre-login", superAdminAreas: "Admin, users, system, reports, approvals, schedules, and sensitive changes.", operatorAreas: "Dashboard, plants, interventions, tasks, today, notices, scanner, and offline work.", apiProtection: "Operational APIs use a user session or administrator role check.", cronProtection: "Cron APIs are protected by CRON_SECRET and do not depend on browser sessions." },
    fields: { name: "Name", email: "Email", role: "Role", createdAt: "Created", updatedAt: "Updated", noName: "No name set", currentUser: "current user" },
    forbidden: { title: "Access not allowed", eyebrow: "Insufficient permissions", heading: "You do not have permission to enter this section.", body: "This area is reserved for a different role. If you think this is a mistake, ask an administrator to review your profile.", sessionHint: "If your role has just changed, sign out and sign in again to refresh your session.", adminHint: "Administrative areas require the Administrator role.", dashboard: "Back to dashboard", login: "Go to login" },
    actions: { openDashboard: "Open dashboard", openSystem: "Open system" },
  },
  sk: {
    users: { title: "Používatelia a prístupy", eyebrow: "Prevádzkové roly", description: "Skontrolujte, kto môže pracovať v aplikácii a ktoré časti sú vyhradené administrátorom.", signedIn: "Aktuálna relácia", total: "Používatelia", admins: "Administrátori", operators: "Operátori", userList: "Registrovaní používatelia", roleMatrix: "Matica oprávnení", lastUpdated: "Posledná aktualizácia" },
    roles: { superAdmin: "Administrátor", operator: "Operátor", superAdminDescription: "Plný prístup k systému, používateľom, reportom, schvaľovaniam a plánovaniam.", operatorDescription: "Prístup k prevádzkovým častiam: rastliny, zásahy, úlohy, dnes, upozornenia a skener.", superAdminWarning: "Pred zmenou rolí ponechajte aktívneho aspoň jedného administrátora." },
    permissions: { title: "Pravidlá prístupu", adminOnly: "Iba administrátor", operatorAllowed: "Operátor povolený", publicAccess: "Verejné alebo pred prihlásením", superAdminAreas: "Admin, používatelia, systém, reporty, schvaľovania, plánovania a citlivé zmeny.", operatorAreas: "Dashboard, rastliny, zásahy, úlohy, dnes, upozornenia, skener a offline práca.", apiProtection: "Prevádzkové API používajú reláciu používateľa alebo kontrolu administrátorskej roly.", cronProtection: "Cron API sú chránené pomocou CRON_SECRET." },
    fields: { name: "Meno", email: "Email", role: "Rola", createdAt: "Vytvorené", updatedAt: "Aktualizované", noName: "Meno nie je uvedené", currentUser: "aktuálny používateľ" },
    forbidden: { title: "Prístup nie je povolený", eyebrow: "Nedostatočné oprávnenia", heading: "Nemáte oprávnenie vstúpiť do tejto sekcie.", body: "Táto časť je vyhradená pre inú rolu. Ak si myslíte, že ide o chybu, požiadajte administrátora o kontrolu profilu.", sessionHint: "Ak sa vaša rola práve zmenila, odhláste sa a prihláste znova.", adminHint: "Administratívne časti vyžadujú rolu Administrátor.", dashboard: "Späť na dashboard", login: "Prejsť na login" },
    actions: { openDashboard: "Otvoriť dashboard", openSystem: "Otvoriť systém" },
  },
  fr: {
    users: { title: "Utilisateurs et accès", eyebrow: "Rôles opérationnels", description: "Vérifiez qui peut utiliser l’app et quelles zones sont réservées aux administrateurs.", signedIn: "Session actuelle", total: "Utilisateurs", admins: "Administrateurs", operators: "Opérateurs", userList: "Utilisateurs enregistrés", roleMatrix: "Matrice des permissions", lastUpdated: "Dernière mise à jour" },
    roles: { superAdmin: "Administrateur", operator: "Opérateur", superAdminDescription: "Accès complet au système, utilisateurs, rapports, validations et programmations.", operatorDescription: "Accès aux zones opérationnelles : plantes, interventions, tâches, aujourd’hui, avis et scanner.", superAdminWarning: "Gardez au moins un administrateur actif avant de modifier les rôles ou accès." },
    permissions: { title: "Règles d’accès", adminOnly: "Administrateur uniquement", operatorAllowed: "Opérateur autorisé", publicAccess: "Public ou avant connexion", superAdminAreas: "Admin, utilisateurs, système, rapports, validations, programmations et changements sensibles.", operatorAreas: "Dashboard, plantes, interventions, tâches, aujourd’hui, avis, scanner et travail hors connexion.", apiProtection: "Les API opérationnelles utilisent la session utilisateur ou le contrôle du rôle administrateur.", cronProtection: "Les API cron sont protégées par CRON_SECRET." },
    fields: { name: "Nom", email: "Email", role: "Rôle", createdAt: "Créé", updatedAt: "Mis à jour", noName: "Nom non indiqué", currentUser: "utilisateur actuel" },
    forbidden: { title: "Accès non autorisé", eyebrow: "Permissions insuffisantes", heading: "Vous n’avez pas l’autorisation d’accéder à cette section.", body: "Cette zone est réservée à un autre rôle. Si vous pensez qu’il s’agit d’une erreur, demandez à un administrateur de vérifier votre profil.", sessionHint: "Si votre rôle vient de changer, déconnectez-vous puis reconnectez-vous.", adminHint: "Les zones administratives exigent le rôle Administrateur.", dashboard: "Retour au dashboard", login: "Aller au login" },
    actions: { openDashboard: "Ouvrir le dashboard", openSystem: "Ouvrir système" },
  },
  de: {
    users: { title: "Benutzer und Zugriffe", eyebrow: "Operative Rollen", description: "Prüfen Sie, wer in der App arbeiten kann und welche Bereiche Administratoren vorbehalten sind.", signedIn: "Aktuelle Sitzung", total: "Benutzer", admins: "Administratoren", operators: "Operatoren", userList: "Registrierte Benutzer", roleMatrix: "Berechtigungsmatrix", lastUpdated: "Zuletzt aktualisiert" },
    roles: { superAdmin: "Administrator", operator: "Operator", superAdminDescription: "Voller Zugriff auf System, Benutzer, Berichte, Freigaben und Planungen.", operatorDescription: "Zugriff auf operative Bereiche: Pflanzen, Interventionen, Aufgaben, Heute, Hinweise und Scanner.", superAdminWarning: "Behalten Sie mindestens einen aktiven Administrator, bevor Sie Rollen oder Zugriffe ändern." },
    permissions: { title: "Zugriffsregeln", adminOnly: "Nur Administrator", operatorAllowed: "Operator erlaubt", publicAccess: "Öffentlich oder vor Login", superAdminAreas: "Admin, Benutzer, System, Berichte, Freigaben, Planungen und sensible Änderungen.", operatorAreas: "Dashboard, Pflanzen, Interventionen, Aufgaben, Heute, Hinweise, Scanner und Offline-Arbeit.", apiProtection: "Operative APIs verwenden Benutzersitzung oder Administrator-Rollenprüfung.", cronProtection: "Cron-APIs sind durch CRON_SECRET geschützt." },
    fields: { name: "Name", email: "E-Mail", role: "Rolle", createdAt: "Erstellt", updatedAt: "Aktualisiert", noName: "Kein Name angegeben", currentUser: "aktueller Benutzer" },
    forbidden: { title: "Zugriff nicht erlaubt", eyebrow: "Unzureichende Berechtigungen", heading: "Sie haben keine Berechtigung für diesen Bereich.", body: "Dieser Bereich ist einer anderen Rolle vorbehalten. Wenn Sie einen Fehler vermuten, bitten Sie einen Administrator um Prüfung.", sessionHint: "Wenn Ihre Rolle gerade geändert wurde, melden Sie sich ab und erneut an.", adminHint: "Administrative Bereiche erfordern die Administratorrolle.", dashboard: "Zurück zum Dashboard", login: "Zum Login" },
    actions: { openDashboard: "Dashboard öffnen", openSystem: "System öffnen" },
  },
  ru: {
    users: { title: "Пользователи и доступ", eyebrow: "Операционные роли", description: "Проверьте, кто может работать в приложении и какие разделы доступны только администраторам.", signedIn: "Текущая сессия", total: "Пользователи", admins: "Администраторы", operators: "Операторы", userList: "Зарегистрированные пользователи", roleMatrix: "Матрица прав", lastUpdated: "Последнее обновление" },
    roles: { superAdmin: "Администратор", operator: "Оператор", superAdminDescription: "Полный доступ к системе, пользователям, отчётам, согласованиям и расписаниям.", operatorDescription: "Доступ к рабочим разделам: растения, работы, задачи, сегодня, уведомления и сканер.", superAdminWarning: "Оставьте хотя бы одного активного администратора перед изменением ролей или доступа." },
    permissions: { title: "Правила доступа", adminOnly: "Только администратор", operatorAllowed: "Оператор разрешён", publicAccess: "Публично или до входа", superAdminAreas: "Admin, пользователи, система, отчёты, согласования, расписания и чувствительные изменения.", operatorAreas: "Dashboard, растения, работы, задачи, сегодня, уведомления, сканер и офлайн-работа.", apiProtection: "Рабочие API используют сессию пользователя или проверку роли администратора.", cronProtection: "Cron API защищены CRON_SECRET." },
    fields: { name: "Имя", email: "Email", role: "Роль", createdAt: "Создан", updatedAt: "Обновлён", noName: "Имя не указано", currentUser: "текущий пользователь" },
    forbidden: { title: "Доступ запрещён", eyebrow: "Недостаточно прав", heading: "У вас нет прав для входа в этот раздел.", body: "Этот раздел предназначен для другой роли. Если это ошибка, попросите администратора проверить профиль.", sessionHint: "Если роль только что изменилась, выйдите и войдите снова.", adminHint: "Административные разделы требуют роль Администратор.", dashboard: "Вернуться на dashboard", login: "Перейти к login" },
    actions: { openDashboard: "Открыть dashboard", openSystem: "Открыть систему" },
  },
  hu: {
    users: { title: "Felhasználók és hozzáférés", eyebrow: "Operatív szerepkörök", description: "Ellenőrizd, ki használhatja az appot, és mely részek adminisztrátorhoz kötöttek.", signedIn: "Aktuális munkamenet", total: "Felhasználók", admins: "Adminisztrátorok", operators: "Operátorok", userList: "Regisztrált felhasználók", roleMatrix: "Jogosultsági mátrix", lastUpdated: "Utolsó frissítés" },
    roles: { superAdmin: "Adminisztrátor", operator: "Operátor", superAdminDescription: "Teljes hozzáférés a rendszerhez, felhasználókhoz, riportokhoz, jóváhagyásokhoz és ütemezésekhez.", operatorDescription: "Hozzáférés az operatív részekhez: növények, beavatkozások, feladatok, ma, értesítések és szkenner.", superAdminWarning: "Szerepkör módosítás előtt maradjon legalább egy aktív adminisztrátor." },
    permissions: { title: "Hozzáférési szabályok", adminOnly: "Csak adminisztrátor", operatorAllowed: "Operátor engedélyezett", publicAccess: "Nyilvános vagy belépés előtti", superAdminAreas: "Admin, felhasználók, rendszer, riportok, jóváhagyások, ütemezések és érzékeny módosítások.", operatorAreas: "Dashboard, növények, beavatkozások, feladatok, ma, értesítések, szkenner és offline munka.", apiProtection: "Az operatív API-k felhasználói munkamenetet vagy admin szerepkör-ellenőrzést használnak.", cronProtection: "A cron API-k CRON_SECRET védelemmel működnek." },
    fields: { name: "Név", email: "Email", role: "Szerepkör", createdAt: "Létrehozva", updatedAt: "Frissítve", noName: "Nincs név megadva", currentUser: "aktuális felhasználó" },
    forbidden: { title: "Hozzáférés nem engedélyezett", eyebrow: "Nincs elegendő jogosultság", heading: "Nincs jogosultságod belépni ebbe a részbe.", body: "Ez a rész másik szerepkör számára van fenntartva. Ha hibának gondolod, kérj adminisztrátori ellenőrzést.", sessionHint: "Ha most változott a szerepköröd, jelentkezz ki és be újra.", adminHint: "Az adminisztrációs részekhez Adminisztrátor szerepkör kell.", dashboard: "Vissza a dashboardra", login: "Login megnyitása" },
    actions: { openDashboard: "Dashboard megnyitása", openSystem: "Rendszer megnyitása" },
  },
};

export function getAccessRolesText(locale: string | undefined): AccessRolesCopy {
  return copy[(locale as Locale) || DEFAULT_LOCALE] ?? copy[DEFAULT_LOCALE];
}
