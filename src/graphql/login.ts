import gql from 'graphql-tag';
import { User } from './commonTypes';
import { USER_FIELDS } from './commonFragments';

export interface SignInInput {
  email: string;
  password: string;
}

export interface REGISTER_INPUT {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  userType: string;
  password: string;
}

export const REGISTER = gql`
  mutation REGISTER(
    $firstName: String!
    $lastName: String!
    $email: String!
    $organization: String!
    $userType: String!
    $password: String!
  ) {
    ...UserFields
  }
  ${USER_FIELDS}
`;

export const USER_SIGN_IN = gql`
  mutation USER_SIGN_IN($email: String!, $password: String!) {
    login: userSignIn(email: $email, password: $password) {
      user {
        ...UserFields
      }
      token
    }
  }
  ${USER_FIELDS}
`;

export const USER_SIGN_OUT = gql`
  mutation USER_SIGN_OUT {
    userSignOut
  }
`;

export interface GuestUserSignInReturn {
  guestUserSignIn: {
    user: User;
    token: string;
  };
}
export const GUEST_USER_SIGN_IN = gql`
  mutation GUEST_USER_SIGN_IN {
    guestUserSignIn {
      user {
        ...UserFields
      }
      token
    }
  }
  ${USER_FIELDS}
`;
