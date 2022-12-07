import { gql, ClientError } from 'graphql-request';
import { useMutation, UseMutationOptions } from 'react-query';
import client from './client';
import { useSnackbar } from 'notistack';

export const resetForgetPasswordMutation = gql`
  mutation resetForgetPassword($password: String!, $resetToken: String!) {
    resetForgetPassword(password: $password, resetToken: $resetToken) {
      authToken
    }
  }
`;

export const resetForgetPasswordRequest = (
  variables: MutationResetForgetPasswordArgs,
  requestHeaders?: HeadersInit,
) => {
  return client.request(resetForgetPasswordMutation, variables, requestHeaders);
};

export const useResetForgetPassword = (
  options?: UseMutationOptions<
    {
      resetForgetPassword: User;
    },
    ClientError,
    MutationResetForgetPasswordArgs
  >,
) => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation([useResetForgetPassword.name], resetForgetPasswordRequest, {
    ...options,
    onSuccess: async (data, variables, context) => {
      enqueueSnackbar('Password successfully updated.', {
        variant: 'success',
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export default useResetForgetPassword;
