import express from 'express';
import nextI18NextMiddleware from 'next-i18next/middleware';

import app from './app';
import nextI18next from './config/i18n';

import router from './routes';

const port = parseInt(process.env.PORT || '3000', 10);
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  await nextI18next.initPromise;
  server.use(nextI18NextMiddleware(nextI18next));

  router(server, app);

  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  console.log(
    `Server started ➜ ${
      process.env.NODE_ENV === 'development' && port
        ? `http://localhost:${port}`
        : process.env.APP_HOSTNAME
    }`
  );
})();
