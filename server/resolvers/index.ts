import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

import offer from './offer';
import sendMessage from './contact';

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  Query: {
    offer,
  },
  Mutation: {
    sendMessage,
  },
};

export default resolvers;
