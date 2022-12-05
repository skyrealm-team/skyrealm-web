import { gql, ClientError } from 'graphql-request';
import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { useLocalStorage } from 'react-use';
import client from './client';
import useUserInfo from './useUserInfo';

export const logoff = gql`
  mutation logoff($email: String!) {
    logoff(email: $email) {
      userId
    }
  }
`;

export const useLogoff = (
  options?: UseMutationOptions<
    {
      data: User;
    },
    ClientError,
    MutationLogoffArgs
  >,
) => {
  const [, , removeAuthToken] = useLocalStorage<string>('auth-token');
  const queryClient = useQueryClient();

  return useMutation(
    [useLogoff.name],
    (variables) => {
      return client.request(logoff, variables);
    },
    {
      ...options,
      onSuccess: (data, variables, context) => {
        removeAuthToken();
        queryClient.setQueryData([useUserInfo.name], undefined);

        options?.onSuccess?.(data, variables, context);
      },
    },
  );
};

export default useLogoff;
