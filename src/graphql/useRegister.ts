import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { useCookie } from "react-use";

import { ClientError, gql } from "graphql-request";

import client from "./client";
import useGetUserInfo from "./useGetUserInfo";

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

export const registerRequest = async (
  variables: MutationRegisterArgs,
  requestHeaders?: HeadersInit
) => {
  return client
    .request<Mutation>(registerMutation, variables, requestHeaders)
    .then((data) => data.register);
};

export const useRegister = (
  options?: UseMutationOptions<
    Mutation["register"],
    ClientError,
    MutationRegisterArgs
  >
) => {
  const [, setAuthToken] = useCookie("auth-token");
  const queryClient = useQueryClient();

  return useMutation<Mutation["register"], ClientError, MutationRegisterArgs>(
    [useRegister.name],
    registerRequest,
    {
      ...options,
      onSuccess: async (data, variables, context) => {
        setAuthToken(data?.authToken ?? "");
        await queryClient.refetchQueries([useGetUserInfo.name]);

        options?.onSuccess?.(data, variables, context);
      },
    }
  );
};

export default useRegister;
