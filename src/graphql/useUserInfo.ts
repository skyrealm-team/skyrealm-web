import { gql, ClientError } from 'graphql-request';
import { useQuery, UseQueryOptions } from 'react-query';
import { useLocalStorage } from 'react-use';
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
      return client.request(getUserUserInfo);
    },
    {
      enabled: !!authToken,
      ...options,
    },
  );
};

export default useUserInfo;
