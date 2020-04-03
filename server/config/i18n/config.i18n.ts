import path from 'path';
import locale from 'locale';
import { InitConfig } from 'next-i18next';

const languages = process.env.LOCALES
  ? process.env.LOCALES.split(',')
  : ['fr', 'en', 'it', 'de', 'nl', 'ru'];

let defaultLanguage, otherLanguages;
[defaultLanguage, ...otherLanguages] = languages;

export const common: InitConfig = {
  defaultLanguage,
  otherLanguages,
  fallbackLng: ['fr'],
  load: 'languageOnly',
  lowerCaseLng: true,
  ns: ['common'],
  defaultNS: 'common',
  whitelist: [...languages],
  preload: [...languages],
  strictMode: false,
  shallowRender: true,
  customDetectors: [
    {
      name: 'liHeader',
      lookup: function(req, res, options) {
        const browserLocales = new locale.Locales(
          req.headers['accept-language']
        );
        const supported = new locale.Locales(languages);
        const best = browserLocales.best(supported);
        return !best.defaulted && best.code;
      },
    },
  ],
  debug: false, // process.env.NODE_ENV === 'development',
};

export const detection = {
  order: ['path', 'cookie', 'liHeaderLookup', 'queryString'],
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
