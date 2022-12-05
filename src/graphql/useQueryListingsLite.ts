import { gql, ClientError } from 'graphql-request';
import { useQuery, UseQueryOptions } from 'react-query';
import client from './client';

export const queryListingsLite = gql`
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
      return client.request(queryListingsLite, variables);
    },
    {
      ...options,
    },
  );
};

export default useQueryListingsLite;
