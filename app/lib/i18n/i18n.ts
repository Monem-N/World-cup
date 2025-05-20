import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations - for now we'll use empty objects
// In a production app, you would import real translation files
const enCommon = {};
const arCommon = {};
const frCommon = {};

// Initialize i18next
const initI18n = async () => {
  await i18n
    // detect user language
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next
    .use(initReactI18next)
    // init i18next
    .init({
      debug: true,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      resources: {
        en: {
          common: enCommon
        },
        ar: {
          common: arCommon
        },
        fr: {
          common: frCommon
        }
      },
      defaultNS: 'common',
      initAsync: true, // Ensure initialization is async
    });

  return i18n;
};

// Initialize i18n
initI18n();

export default i18n;