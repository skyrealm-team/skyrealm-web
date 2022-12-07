import { useQuery, UseQueryOptions } from 'react-query';
import { useLocalStorage } from 'react-use';

import { ClientError, gql } from 'graphql-request';

import client from './client';

export const getUserUserInfoQuery = gql`
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

export const getUserUserInfoRequest = (requestHeaders?: HeadersInit) => {
  return client.request(getUserUserInfoQuery, requestHeaders);
};

export const useUserInfo = <
  TData = {
    getUserUserInfo: User;
  },
>(
  options?: UseQueryOptions<TData, ClientError>,
) => {
  const [authToken] = useLocalStorage<string>('auth-token');

  return useQuery<TData, ClientError>(
    [useUserInfo.name],
    () => {
      return getUserUserInfoRequest();
    },
    {
      enabled: !!authToken,
      ...options,
    },
  );
};

export default useUserInfo;
