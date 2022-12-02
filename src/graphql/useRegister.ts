import { gql, ClientError } from 'graphql-request';
import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { useLocalStorage } from 'react-use';
import client from './client';
import useUserInfo from './useUserInfo';

export const register = gql`
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

export const useRegister = (
  options?: UseMutationOptions<
    {
      register: User;
    },
    ClientError,
    MutationRegisterArgs
  >,
) => {
  const [, setAuthToken] = useLocalStorage<string>('auth-token');
  const queryClient = useQueryClient();

  return useMutation(
    [useRegister.name],
    (variables) => {
      return client.request(register, variables);
    },
    {
      ...options,
      onSuccess: async (data, variables, context) => {
        setAuthToken(data.register.authToken);
        await queryClient.refetchQueries([useUserInfo.name]);

        options?.onSuccess?.(data, variables, context);
      },
    },
  );
};

export default useRegister;
