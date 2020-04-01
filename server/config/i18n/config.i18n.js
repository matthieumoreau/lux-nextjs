import path from 'path';
// import { fromBrowser } from '../../components/detect-locale';

const languages = process.env.LOCALS
  ? process.env.LOCALS.split(',')
  : ['fr', 'en', 'it', 'de', 'nl', 'ru'];

let defaultLanguage, otherLanguages;
[defaultLanguage, ...otherLanguages] = languages;

export const common = {
  defaultLanguage,
  otherLanguages,
  fallbackLng: ['en'],
  load: 'languageOnly',
  lowerCaseLng: true,
  ns: ['common'],
  defaultNS: 'common',
  whitelist: [...languages],
  preload: [...languages],
  strictMode: false,
  shallowRender: true,
};

export const detection = {
  order: ['path', 'cookie'],
  lookupQuerystring: 'locale',
  lookupCookie: 'locale',
  lookupFromPathIndex: 0,
  locales: languages,
  caches: ['cookie'],
};

export const backend = {
  loadPath: path.join(__dirname, '../../../static/locales/{{lng}}/{{ns}}.json'),
};

// export const liHeaderLookup = {
//   name: 'liHeader',
//   lookup: function(req, res, options) {
//     return fromBrowser(req.locales || options.locales, req);
//   },
// };
