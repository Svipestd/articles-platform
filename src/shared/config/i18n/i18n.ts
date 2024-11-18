import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

export enum Language {
  EN = 'en',
  RU = 'ru',
}

export const DEFAULT_LANG = Language.RU;

i18n
  .use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: DEFAULT_LANG,
    fallbackLng: DEFAULT_LANG,
    debug: false,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
