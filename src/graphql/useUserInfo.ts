import { gql, ClientError } from 'graphql-request';
import { useQuery, UseQueryOptions } from 'react-query';
import client from './client';

export const getUserUserInfo = gql`
  query getUserUserInfo {
    getUserUserInfo {
      email
      favorite
      firstName
      lastName
      organization
      phoneNumber
      userId
      userType
    }
  }
`;

export const useUserInfo = <TVariables = {}>(
  options?: UseQueryOptions<
    TVariables,
    ClientError,
    {
      getUserUserInfo: User;
    },
    any
  >,
) => {
  return useQuery(
    [useUserInfo.name],
    () => {
      return client.request(getUserUserInfo);
    },
    options,
  );
};

export default useUserInfo;
