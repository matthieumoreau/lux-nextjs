import { gql } from 'apollo-server-express';

import offer from './offer';
import contact from './contact';

const root = gql`
  scalar JSON
  scalar JSONObject

  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

export default [root, offer, contact];
