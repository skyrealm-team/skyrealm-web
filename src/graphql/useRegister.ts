import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { useLocalStorage } from "react-use";

import { ClientError, gql } from "graphql-request";

import client from "./client";
import useUserInfo from "./useUserInfo";

export const registerMutation = gql`
  mutation register(
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
      authToken
    }
  }
`;

export const registerRequest = (
  variables: MutationRegisterArgs,
  requestHeaders?: HeadersInit
) => {
  return client.request(registerMutation, variables, requestHeaders);
};

export const useRegister = (
  options?: UseMutationOptions<Mutation, ClientError, MutationRegisterArgs>
) => {
  const [, setAuthToken] = useLocalStorage<string>("auth-token");
  const queryClient = useQueryClient();

  return useMutation([useRegister.name], registerRequest, {
    ...options,
    onSuccess: async (data, variables, context) => {
      setAuthToken(data.register?.authToken);
      await queryClient.refetchQueries([useUserInfo.name]);

      options?.onSuccess?.(data, variables, context);
    },
  });
};

export default useRegister;
