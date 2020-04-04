import express from 'express';
import * as dotenv from 'dotenv';
import nextI18NextMiddleware from 'next-i18next/middleware';
import { ApolloServer } from 'apollo-server-express';

dotenv.config();

import router from './routes';

import nextApp from './app';
import nextI18next from './config/i18n';
import { typeDefs, resolvers } from './config/graphql';

const port = parseInt(process.env.PORT || '3000', 10);
const handle = nextApp.getRequestHandler();

(async () => {
  await nextApp.prepare();
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });

  await nextI18next.initPromise;
  app.use(nextI18NextMiddleware(nextI18next));

  router(app, nextApp);

  app.get('*', (req, res) => handle(req, res));

  await app.listen(port);
  console.log(
    `⏩ Next server ready at ${
      process.env.NODE_ENV === 'development' && port
        ? `http://localhost:${port}`
        : process.env.APP_HOSTNAME
    }`
  );

  console.log(
    `🚀 Apollo server ready at http://localhost:${port}${server.graphqlPath}`
  );
})();
