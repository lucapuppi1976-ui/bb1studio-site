import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

type LoginProductionText = {
  emailPlaceholder: string;
  passwordPlaceholder: string;
  infoTitle: string;
  infoBody: string;
  contactAdmin: string;
};

const texts: Record<Locale, LoginProductionText> = {
  it: {
    emailPlaceholder: "nome@azienda.com",
    passwordPlaceholder: "Password personale",
    infoTitle: "Accesso riservato",
    infoBody: "Usa le credenziali fornite dall’amministratore. Le credenziali demo non sono mostrate né usate in produzione.",
    contactAdmin: "Se non riesci ad accedere, chiedi a un amministratore di verificare il tuo profilo.",
  },
  es: {
    emailPlaceholder: "nombre@empresa.com",
    passwordPlaceholder: "Contraseña personal",
    infoTitle: "Acceso reservado",
    infoBody: "Usa las credenciales proporcionadas por el administrador. Las credenciales demo no se muestran ni se usan en producción.",
    contactAdmin: "Si no puedes acceder, pide a un administrador que revise tu perfil.",
  },
  en: {
    emailPlaceholder: "name@company.com",
    passwordPlaceholder: "Personal password",
    infoTitle: "Restricted access",
    infoBody: "Use the credentials provided by your administrator. Demo credentials are not shown or used in production.",
    contactAdmin: "If you cannot sign in, ask an administrator to review your profile.",
  },
  sk: {
    emailPlaceholder: "meno@firma.com",
    passwordPlaceholder: "Osobné heslo",
    infoTitle: "Vyhradený prístup",
    infoBody: "Použite prihlasovacie údaje od administrátora. Demo údaje sa v produkcii nezobrazujú ani nepoužívajú.",
    contactAdmin: "Ak sa neviete prihlásiť, požiadajte administrátora o kontrolu profilu.",
  },
  fr: {
    emailPlaceholder: "nom@entreprise.com",
    passwordPlaceholder: "Mot de passe personnel",
    infoTitle: "Accès réservé",
    infoBody: "Utilisez les identifiants fournis par l’administrateur. Les identifiants de démonstration ne sont pas affichés ni utilisés en production.",
    contactAdmin: "Si vous ne pouvez pas vous connecter, demandez à un administrateur de vérifier votre profil.",
  },
  de: {
    emailPlaceholder: "name@firma.com",
    passwordPlaceholder: "Persönliches Passwort",
    infoTitle: "Geschützter Zugang",
    infoBody: "Verwenden Sie die vom Administrator bereitgestellten Zugangsdaten. Demo-Zugangsdaten werden in Produktion nicht angezeigt oder verwendet.",
    contactAdmin: "Wenn Sie sich nicht anmelden können, bitten Sie einen Administrator, Ihr Profil zu prüfen.",
  },
  ru: {
    emailPlaceholder: "name@company.com",
    passwordPlaceholder: "Личный пароль",
    infoTitle: "Ограниченный доступ",
    infoBody: "Используйте учётные данные, выданные администратором. Demo-учётные данные не отображаются и не используются в production.",
    contactAdmin: "Если войти не получается, попросите администратора проверить ваш профиль.",
  },
  hu: {
    emailPlaceholder: "nev@ceg.com",
    passwordPlaceholder: "Személyes jelszó",
    infoTitle: "Korlátozott hozzáférés",
    infoBody: "Használd az adminisztrátor által megadott belépési adatokat. Demo belépési adatok production környezetben nem jelennek meg és nem használatosak.",
    contactAdmin: "Ha nem tudsz belépni, kérj meg egy adminisztrátort a profilod ellenőrzésére.",
  },
};

export function getLoginProductionText(locale: string | undefined): LoginProductionText {
  return texts[(locale as Locale) || DEFAULT_LOCALE] ?? texts[DEFAULT_LOCALE];
}
