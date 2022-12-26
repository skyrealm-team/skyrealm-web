import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { useCookie } from "react-use";

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

export const getUserInfoRequest = async (
  options?: Partial<RequestOptions<undefined, Queries["getUserUserInfo"]>>
) => {
  return client
    .request<Queries>({
      ...options,
      document: getUserUserInfoQuery,
    })
    .then((data) => data.getUserUserInfo);
};

export const useGetUserInfo = (
  options?: UseQueryOptions<Queries["getUserUserInfo"], ClientError>
) => {
  const [authToken] = useCookie("auth-token");

  return useQuery<Queries["getUserUserInfo"], ClientError>(
    [useGetUserInfo.name],
    () => {
      return getUserInfoRequest();
    },
    {
      enabled: !!authToken,
      ...options,
    }
  );
};

export const useSetUserInfoData = () => {
  const queryClient = useQueryClient();

  return (data: Partial<Queries["getUserUserInfo"]>) => {
    queryClient.setQueryData([useGetUserInfo.name], data);
  };
};

export default useGetUserInfo;
