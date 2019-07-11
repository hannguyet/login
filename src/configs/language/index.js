import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enLocale from './locales/en.json';
import viLocale from './locales/vi.json';

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      translation: enLocale
    },
    vi: {
      translation: viLocale
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});
