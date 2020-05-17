import gql from 'graphql-tag';

const CONTACT_OFFER_QUERY = gql`
  mutation contactOffer ($input: ContactInput) {
    sendMessage(input: $input) {
      success
      message,
      copy, 
      send
    }
  }
`;

export default CONTACT_OFFER_QUERY;
