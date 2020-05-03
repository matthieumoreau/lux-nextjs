import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from '../../server/typeDefs';
import resolvers from '../../server/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
