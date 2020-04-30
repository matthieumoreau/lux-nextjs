import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

import offer from './offer';

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  Query: {
    offer,
  },
};

export default resolvers;
