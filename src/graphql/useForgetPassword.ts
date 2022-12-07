import { gql, ClientError } from 'graphql-request';
import { useMutation, UseMutationOptions } from 'react-query';
import client from './client';
import { useSnackbar } from 'notistack';

export const forgetPasswordMutation = gql`
  mutation forgetPassword($email: String!) {
    forgetPassword(email: $email) {
      authToken
    }
  }
`;

export const forgetPasswordRequest = (variables: MutationForgetPasswordArgs, requestHeaders?: HeadersInit) => {
  return client.request(forgetPasswordMutation, variables, requestHeaders);
};

export const useForgetPassword = (
  options?: UseMutationOptions<
    {
      forgetPassword: User;
    },
    ClientError,
    MutationForgetPasswordArgs
  >,
) => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation([useForgetPassword.name], forgetPasswordRequest, {
    ...options,
    onSuccess: async (data, variables, context) => {
      enqueueSnackbar('The password reset instruction has been sent to your email address', {
        variant: 'success',
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export default useForgetPassword;
