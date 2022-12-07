import { useQuery, UseQueryOptions } from 'react-query';

import { ClientError, gql } from 'graphql-request';

import client from './client';

export const queryListingsLiteQuery = gql`
  query queryListingsLite($freeText: String) {
    queryListingsLite(freeText: $freeText) {
      listingId
      isFavorite
      latitude
      longitude
      address
      visitors
      frequency
      mediumIncome
      availableSpaces
    }
  }
`;

export const queryListingsLiteRequest = (variables?: QueriesQueryListingsLiteArgs, requestHeaders?: HeadersInit) => {
  return client.request(queryListingsLiteQuery, variables, requestHeaders);
};

export const useQueryListingsLite = <
  TData = {
    queryListingsLite: SingleListingLite[];
  },
>(
  variables?: QueriesQueryListingsLiteArgs,
  options?: UseQueryOptions<TData, ClientError>,
) => {
  return useQuery<TData, ClientError>(
    [useQueryListingsLite.name, variables],
    () => {
      return queryListingsLiteRequest(variables);
    },
    {
      ...options,
    },
  );
};

export default useQueryListingsLite;
