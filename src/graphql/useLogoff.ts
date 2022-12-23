import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { useLocalStorage } from "react-use";

import { ClientError, gql } from "graphql-request";

import client from "./client";
import useGetUserInfo from "./useGetUserInfo";

export const logoffMutation = gql`
  mutation logoff($email: String!) {
    logoff(email: $email) {
      userId
    }
  }
`;

export const logoffRequest = async (
  variables: MutationLogoffArgs,
  requestHeaders?: HeadersInit
) => {
  return client
    .request<Mutation>(logoffMutation, variables, requestHeaders)
    .then((data) => data.logoff);
};

export const useLogoff = (
  options?: UseMutationOptions<
    Mutation["logoff"],
    ClientError,
    MutationLogoffArgs
  >
) => {
  const [, , removeAuthToken] = useLocalStorage<string>("auth-token");
  const queryClient = useQueryClient();

  return useMutation<Mutation["logoff"], ClientError, MutationLogoffArgs>(
    [useLogoff.name],
    logoffRequest,
    {
      ...options,
      onSuccess: (data, variables, context) => {
        removeAuthToken();
        queryClient.setQueryData([useGetUserInfo.name], undefined);

        options?.onSuccess?.(data, variables, context);
      },
    }
  );
};

export default useLogoff;
