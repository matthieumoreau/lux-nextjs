const locales = process.env.LOCALES.replace(/,/g, '|');

export default (server, app) => {
  /** HOME PAGE */
  server.get(`/:locale(${locales})?`, (req, res) =>
    app.render(req, res, '/home/home', { ...req.params })
  );

  /** OFFER PAGE */
  server.get(
    `/:locale(${locales})?/:transaction/:propType/:region/:departmentZip/:town/:offerId`,
    (req, res) =>
      app.render(req, res, '/offer/offer', {
        ...req.params,
      })
  );

  /** SEARCH RESULTS PAGE */
  server.get(
    `/:locale(${locales})?/:adsTranslation/:transaction/:propType-:town`,
    (req, res) =>
      app.render(req, res, '/offer/offer', {
        ...req.params,
      })
  );
};
