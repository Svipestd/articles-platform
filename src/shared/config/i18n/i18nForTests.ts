import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANG } from './i18n';

i18n.use(initReactI18next).init({
  lng: DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
