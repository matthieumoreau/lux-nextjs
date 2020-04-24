import routes from '../config/routes';

export default (server, app) => {
  Object.entries(routes).map(([key, value]: any) => {
    server.get(value.path, (req, res) =>
      app.render(req, res, value.pathname, {
        ...req.params,
      })
    );
  });
};
