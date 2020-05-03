import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
export default (initialState = {}) => {
  const ssrMode = typeof window === 'undefined';
  const cache = new InMemoryCache().restore(initialState);

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode,
    link: createIsomorphLink(),
    cache,
  });
};

const createIsomorphLink = () => {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('apollo-link-schema');

    const dataSources = require('@server/dataSources').default;
    const schema = require('@config/graphql/schema').default;

    const schemaLink = new SchemaLink({
      schema,
      context: () => {
        return {
          dataSources,
        };
      },
    });

    return new SchemaLink(schemaLink);
  } else {
    const { HttpLink } = require('apollo-link-http');
    return new HttpLink({
      fetch,
      uri: '/graphql',
      // credentials: 'same-origin',
    });
  }
};
