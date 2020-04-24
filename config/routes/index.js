const locales = process.env.LOCALES.replace(/,/g, '|');

const routes = {
  home: {
    pathname: '/home/home',
    path: `/:locale(${locales})?`,
  },
  offer: {
    pathname: '/offer/offer',
    path: `/:locale(${locales})?/:transactionType/:propertyType/:region/:departmentZip/:town/:offerId`,
  },
  list: {
    pathname: '/list/list',
    path: `/:locale(${locales})?/:adsTranslation/:transaction/:propType-:town`,
  },
};

export default routes;
