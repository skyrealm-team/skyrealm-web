import { gql, ClientError } from 'graphql-request';
import { useQuery, UseQueryOptions } from 'react-query';
import client from './client';

export const queryListings = gql`
  query queryListings($currentPage: Int, $addressState: String, $freeText: String) {
    queryListings(currentPage: $currentPage, addressState: $addressState, freeText: $freeText) {
      currentPage
      pageNumbers
      listings {
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
  }
`;

export const useQueryListings = <TVariables = QueriesQueryListingsArgs>(
  variables?: TVariables,
  options?: UseQueryOptions<
    QueriesQueryListingsArgs,
    ClientError,
    {
      queryListings: QueryListing;
    },
    any
  >,
) => {
  return useQuery(
    [useQueryListings.name, variables],
    () => {
      return client.request(queryListings, variables);
    },
    options,
  );
};

export default useQueryListings;
