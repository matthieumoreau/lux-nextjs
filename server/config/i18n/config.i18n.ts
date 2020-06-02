import path from 'path';
import { InitConfig } from 'next-i18next';

export const languages = process.env.NEXT_PUBLIC_LOCALES
  ? process.env.NEXT_PUBLIC_LOCALES.split(',')
  : ['fr', 'en', 'it', 'de', 'nl', 'ru'];

let defaultLanguage, otherLanguages;
[defaultLanguage, ...otherLanguages] = languages;

export const common: InitConfig = {
  defaultLanguage,
  otherLanguages,
  fallbackLng: defaultLanguage,
  load: 'languageOnly',
  lowerCaseLng: true,
  ns: ['common', 'locality'],
  defaultNS: 'common',
  whitelist: [...languages],
  preload: [...languages],
  strictMode: false, // remove warning
  shallowRender: true,
  browserLanguageDetection: false,
  serverLanguageDetection: true,
  // debug: true, // process.env.NODE_ENV === 'development',
};

export const detection = {
  order: ['path', 'queryString', 'cookie'],
  lookupQuerystring: 'locale',
  lookupCookie: 'locale',
  lookupFromPathIndex: 0,
  locales: languages,
  caches: ['cookie'],
  checkWhitelist: true,
};

export const backend = {
  loadPath: path.join(__dirname, '../../../static/locales/{{lng}}/{{ns}}.json'),
};
