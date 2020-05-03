import { i18n } from './../config/i18n';

export const translateLocality = address => {
  Object.values(address).map((locality: any) => {
    locality.names = process.env.LOCALES.split(',').reduce((obj, locale) => {
      const t = i18n.getFixedT(locale, 'locality');
      obj[locale] = t(locality.name, locality.name ? locality.name : null);
      return obj;
    }, {});
  });
  return address;
};
