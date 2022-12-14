import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { useCookie } from "react-use";

import { ClientError, gql } from "graphql-request";

import client from "./client";
import { getUserUserInfoQuery } from "./useGetUserInfo";

export const loginQuery = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      authToken
    }
  }
`;

export const loginRequest = async (
  variables: QueriesLoginArgs,
  requestHeaders?: HeadersInit
) => {
  return client
    .request<Queries>(loginQuery, variables, requestHeaders)
    .then((data) => data.login);
};

export const useLogin = (
  options?: UseMutationOptions<Queries["login"], ClientError, QueriesLoginArgs>
) => {
  const [, setAuthToken] = useCookie("auth-token");
  const queryClient = useQueryClient();

  return useMutation<Queries["login"], ClientError, QueriesLoginArgs>(
    [loginQuery],
    loginRequest,
    {
      ...options,
      onSuccess: async (data, variables, context) => {
        setAuthToken(data?.authToken ?? "");
        await queryClient.refetchQueries([getUserUserInfoQuery]);

        options?.onSuccess?.(data, variables, context);
      },
    }
  );
};

export default useLogin;
