import { gql } from '@apollo/client';
import { USER_FIELDS } from './commonFragments';
import { User } from './commonTypes';

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

export interface REGISTER_RESULT {
  register: User;
}

export const REGISTER = gql`
  mutation REGISTER(
    $firstName: String!
    $lastName: String!
    $email: String!
    $organization: String!
    $userType: String!
    $password: String!
    $phoneNumber: String
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      organization: $organization
      userType: $userType
      password: $password
      phoneNumber: $phoneNumber
    ) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

export interface LOGIN_INPUT {
  email: string;
  password: string;
}

export interface LOGIN_RESULT {
  login: User;
}

export const LOGIN = gql`
  query LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

export interface LOGOFF_INPUT {
  email: string;
}

export const LOGOFF = gql`
  mutation LOGOFF($email: String!) {
    logoff(email: $email) {
      firstName
    }
  }
`;
