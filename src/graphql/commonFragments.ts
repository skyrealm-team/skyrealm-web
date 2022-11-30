import { gql } from '@apollo/client';

export const USER_FIELDS = gql`
  fragment UserFields on User {
    userId
    firstName
    lastName
    email
    organization
    userType
    isLoggedIn
    favorite
    authToken
    phoneNumber
  }
`;
