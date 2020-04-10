import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

import apolloConfig from '.';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
