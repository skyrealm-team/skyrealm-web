import graphqlClient from 'graphql/client';
import { OperationVariables } from '@apollo/client/core/types';
import { MutationOptions, QueryOptions } from '@apollo/client/core/watchQueryOptions';
import message from 'components/Message';

export const mutateWithMessage = async <T = any, TVariables = OperationVariables>(
  options: MutationOptions<T, TVariables>,
) => {
  try {
    const result = await graphqlClient.mutate<T, TVariables>(options);
    return result;
  } catch (e: any) {
    message.error(e.message);
    throw e;
  }
};

export const queryWithMessage = async <T = any, TVariables = OperationVariables>(
  options: QueryOptions<TVariables, T>,
) => {
  try {
    const result = await graphqlClient.query<T, TVariables>(options);
    return result;
  } catch (e: any) {
    message.error(e.message);
    throw e;
  }
};
