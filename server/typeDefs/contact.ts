import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Mutation {
    sendMessage(input: ContactInput): Contact
  }

  input ContactInput {
    lang: String
    offerId: String
    email: String
    message: String
    location: String
    firstname: String
    lastname: String
    phone: String
    TransactionTypeId: String
  }

  type Contact {
    success: Boolean
    message: String
    send: JSONObject
    copy: JSONObject
  }
`;

export default typeDefs;
