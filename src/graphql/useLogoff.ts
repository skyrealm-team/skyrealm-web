import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { useLocalStorage } from 'react-use';

import { ClientError, gql } from 'graphql-request';

import client from './client';
import useUserInfo from './useUserInfo';

export const logoffMutation = gql`
  mutation logoff($email: String!) {
    logoff(email: $email) {
      userId
    }
  }
`;

export const logoffRequest = (variables: MutationLogoffArgs, requestHeaders?: HeadersInit) => {
  return client.request(logoffMutation, variables, requestHeaders);
};

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

  return useMutation([useLogoff.name], logoffRequest, {
    ...options,
    onSuccess: (data, variables, context) => {
      removeAuthToken();
      queryClient.setQueryData([useUserInfo.name], undefined);

      options?.onSuccess?.(data, variables, context);
    },
  });
};

export default useLogoff;
