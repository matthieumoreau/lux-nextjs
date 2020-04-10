import typeDefs from './typeDefs';
import resolvers from './resolvers';
import dataSources from './dataSources';

const apolloConfig = {
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  playground: process.env.NODE_ENV !== 'production',
  dataSources: () => {
    return dataSources;
  },
};

export default apolloConfig;
