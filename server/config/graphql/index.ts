import path from 'path';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import { importSchema } from 'graphql-import';

import resolvers from '../../resolvers';
import dataSources from '../../dataSources';



const typeDefs = importSchema(path.join(__dirname, '../../typeDefs/schema.graphql'))


const apolloConfig: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  playground: process.env.NODE_ENV !== 'production',
  dataSources: () => {
    return dataSources;
  },
};

export default apolloConfig;
