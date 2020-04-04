import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
