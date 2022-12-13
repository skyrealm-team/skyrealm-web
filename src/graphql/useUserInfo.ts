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

export const getUserUserInfoRequest = (
  options?: Partial<RequestOptions<QueriesQueryListingsArgs>>
) => {
  return client.request({
    ...options,
    document: getUserUserInfoQuery,
  });
};

export const useUserInfo = <
  TData = {
    getUserUserInfo: User;
  }
>(
  options?: UseQueryOptions<TData, ClientError>
) => {
  const [authToken] = useLocalStorage<string>("auth-token");

  return useQuery<TData, ClientError>(
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

export const useSetUserInfoData = <
  TData = {
    getUserUserInfo: User;
  }
>() => {
  const queryClient = useQueryClient();

  return (data: TData) => {
    queryClient.setQueryData<TData>([useUserInfo.name], data);
  };
};

export default useUserInfo;
