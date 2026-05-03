import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

type RecurringHistoryText = {
  badges: {
    generated: string;
  };
  filters: {
    generated: string;
  };
  task: {
    originTitle: string;
    originDescription: string;
    schedule: string;
    sourceDate: string;
    openSchedules: string;
  };
  plant: {
    generatedTasks: string;
    generatedFrom: string;
    sourceDate: string;
  };
  recurring: {
    openGeneratedTask: string;
    sourceDate: string;
  };
};

const texts: Record<Locale, RecurringHistoryText> = {
  it: {
    badges: { generated: "Da programmazione" },
    filters: { generated: "Da programmazione" },
    task: { originTitle: "Origine programmazione", originDescription: "Questa attività è stata creata automaticamente da una programmazione ricorrente.", schedule: "Programmazione", sourceDate: "Data origine", openSchedules: "Apri programmazioni" },
    plant: { generatedTasks: "Attività generate", generatedFrom: "Da", sourceDate: "Data origine" },
    recurring: { openGeneratedTask: "Apri attività", sourceDate: "Data origine" },
  },
  es: {
    badges: { generated: "De programación" },
    filters: { generated: "De programación" },
    task: { originTitle: "Origen de la programación", originDescription: "Esta tarea fue creada automáticamente desde una programación recurrente.", schedule: "Programación", sourceDate: "Fecha de origen", openSchedules: "Abrir programaciones" },
    plant: { generatedTasks: "Tareas generadas", generatedFrom: "De", sourceDate: "Fecha de origen" },
    recurring: { openGeneratedTask: "Abrir tarea", sourceDate: "Fecha de origen" },
  },
  en: {
    badges: { generated: "From schedule" },
    filters: { generated: "From schedule" },
    task: { originTitle: "Schedule origin", originDescription: "This task was created automatically from a recurring schedule.", schedule: "Schedule", sourceDate: "Source date", openSchedules: "Open schedules" },
    plant: { generatedTasks: "Generated tasks", generatedFrom: "From", sourceDate: "Source date" },
    recurring: { openGeneratedTask: "Open task", sourceDate: "Source date" },
  },
  sk: {
    badges: { generated: "Z plánovania" },
    filters: { generated: "Z plánovania" },
    task: { originTitle: "Pôvod plánovania", originDescription: "Táto úloha bola vytvorená automaticky z opakovaného plánovania.", schedule: "Plánovanie", sourceDate: "Pôvodný dátum", openSchedules: "Otvoriť plánovania" },
    plant: { generatedTasks: "Vytvorené úlohy", generatedFrom: "Z", sourceDate: "Pôvodný dátum" },
    recurring: { openGeneratedTask: "Otvoriť úlohu", sourceDate: "Pôvodný dátum" },
  },
  fr: {
    badges: { generated: "Depuis programmation" },
    filters: { generated: "Depuis programmation" },
    task: { originTitle: "Origine de la programmation", originDescription: "Cette tâche a été créée automatiquement depuis une programmation récurrente.", schedule: "Programmation", sourceDate: "Date d’origine", openSchedules: "Ouvrir les programmations" },
    plant: { generatedTasks: "Tâches générées", generatedFrom: "Depuis", sourceDate: "Date d’origine" },
    recurring: { openGeneratedTask: "Ouvrir la tâche", sourceDate: "Date d’origine" },
  },
  de: {
    badges: { generated: "Aus Planung" },
    filters: { generated: "Aus Planung" },
    task: { originTitle: "Planungsursprung", originDescription: "Diese Aufgabe wurde automatisch aus einer wiederkehrenden Planung erstellt.", schedule: "Planung", sourceDate: "Quelldatum", openSchedules: "Planungen öffnen" },
    plant: { generatedTasks: "Erstellte Aufgaben", generatedFrom: "Aus", sourceDate: "Quelldatum" },
    recurring: { openGeneratedTask: "Aufgabe öffnen", sourceDate: "Quelldatum" },
  },
  ru: {
    badges: { generated: "Из расписания" },
    filters: { generated: "Из расписания" },
    task: { originTitle: "Источник расписания", originDescription: "Эта задача была автоматически создана из повторяющегося расписания.", schedule: "Расписание", sourceDate: "Исходная дата", openSchedules: "Открыть расписания" },
    plant: { generatedTasks: "Созданные задачи", generatedFrom: "Из", sourceDate: "Исходная дата" },
    recurring: { openGeneratedTask: "Открыть задачу", sourceDate: "Исходная дата" },
  },
  hu: {
    badges: { generated: "Ütemezésből" },
    filters: { generated: "Ütemezésből" },
    task: { originTitle: "Ütemezési eredet", originDescription: "Ez a feladat automatikusan jött létre egy ismétlődő ütemezésből.", schedule: "Ütemezés", sourceDate: "Forrás dátum", openSchedules: "Ütemezések megnyitása" },
    plant: { generatedTasks: "Létrehozott feladatok", generatedFrom: "Innen", sourceDate: "Forrás dátum" },
    recurring: { openGeneratedTask: "Feladat megnyitása", sourceDate: "Forrás dátum" },
  },
};

export function getRecurringHistoryText(locale: string | undefined): RecurringHistoryText {
  return texts[(locale as Locale) || DEFAULT_LOCALE] ?? texts[DEFAULT_LOCALE];
}
