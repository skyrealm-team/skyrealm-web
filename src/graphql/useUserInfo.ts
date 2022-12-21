import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { useLocalStorage } from "react-use";

import { ClientError, gql, RequestOptions } from "graphql-request";

import client from "./client";

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

export const getUserUserInfoRequest = (options?: Partial<RequestOptions>) => {
  return client.request({
    ...options,
    document: getUserUserInfoQuery,
  });
};

export const useUserInfo = (
  options?: UseQueryOptions<Queries, ClientError>
) => {
  const [authToken] = useLocalStorage<string>("auth-token");

  return useQuery<Queries, ClientError>(
    [useUserInfo.name],
    () => {
      return getUserUserInfoRequest();
    },
    {
      enabled: !!authToken,
      ...options,
    }
  );
};

export const useSetUserInfoData = () => {
  const queryClient = useQueryClient();

  return (data: Partial<Queries>) => {
    queryClient.setQueryData<Partial<Queries>>([useUserInfo.name], data);
  };
};

export default useUserInfo;
