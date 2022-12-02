import { gql, ClientError } from 'graphql-request';
import { useMutation, UseMutationOptions } from 'react-query';
import client from './client';
import { useSnackbar } from 'notistack';

export const forgetPassword = gql`
  mutation forgetPassword($email: String!) {
    forgetPassword(email: $email) {
      authToken
    }
  }
`;

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

  return useMutation(
    [useForgetPassword.name],
    (variables) => {
      return client.request(forgetPassword, variables);
    },
    {
      ...options,
      onSuccess: async (data, variables, context) => {
        enqueueSnackbar('The password reset instruction has been sent to your email address', {
          variant: 'success',
        });
        options?.onSuccess?.(data, variables, context);
      },
    },
  );
};

export default useForgetPassword;
