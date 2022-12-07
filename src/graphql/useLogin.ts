import { gql, ClientError } from 'graphql-request';
import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { useLocalStorage } from 'react-use';
import client from './client';
import useUserInfo from './useUserInfo';

export const loginQuery = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      authToken
    }
  }
`;

export const loginRequest = (variables: QueriesLoginArgs, requestHeaders?: HeadersInit) => {
  return client.request(loginQuery, variables, requestHeaders);
};

export const useLogin = (
  options?: UseMutationOptions<
    {
      login: User;
    },
    ClientError,
    QueriesLoginArgs
  >,
) => {
  const [, setAuthToken] = useLocalStorage<string>('auth-token');
  const queryClient = useQueryClient();

  return useMutation([useLogin.name], loginRequest, {
    ...options,
    onSuccess: async (data, variables, context) => {
      setAuthToken(data.login.authToken);
      await queryClient.refetchQueries([useUserInfo.name]);

      options?.onSuccess?.(data, variables, context);
    },
  });
};

export default useLogin;
