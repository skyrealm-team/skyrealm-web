import { useMutation, UseMutationOptions } from "react-query";

import { ClientError, gql } from "graphql-request";
import { useSnackbar } from "notistack";

import client from "./client";

export const resetForgetPasswordMutation = gql`
  mutation resetForgetPassword($password: String!, $resetToken: String!) {
    resetForgetPassword(password: $password, resetToken: $resetToken) {
      authToken
    }
  }
`;

export const resetForgetPasswordRequest = (
  variables: MutationResetForgetPasswordArgs,
  requestHeaders?: HeadersInit
) => {
  return client
    .request<Mutation>(resetForgetPasswordMutation, variables, requestHeaders)
    .then((data) => data.resetForgetPassword);
};

export const useResetForgetPassword = (
  options?: UseMutationOptions<
    Mutation["resetForgetPassword"],
    ClientError,
    MutationResetForgetPasswordArgs
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<
    Mutation["resetForgetPassword"],
    ClientError,
    MutationResetForgetPasswordArgs
  >([useResetForgetPassword.name], resetForgetPasswordRequest, {
    ...options,
    onSuccess: async (data, variables, context) => {
      enqueueSnackbar("Password successfully updated.", {
        variant: "success",
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export default useResetForgetPassword;
