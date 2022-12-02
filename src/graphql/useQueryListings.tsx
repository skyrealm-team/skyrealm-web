import { gql, useQuery } from '@apollo/client';

export const QUERY_LISTINGS = gql(`
  query QUERY_LISTINGS($currentPage: Int, $addressState: String, $freeText: String) {
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
`);

const useQueryListings = (variables?: QueriesQueryListingsArgs) => {
  return useQuery<
    {
      queryListings: QueryListing;
    },
    QueriesQueryListingsArgs
  >(QUERY_LISTINGS, {
    variables,
  });
};

export default useQueryListings;
