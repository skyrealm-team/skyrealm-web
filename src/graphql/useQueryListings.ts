import { useQuery, UseQueryOptions } from "react-query";

import { ClientError, gql } from "graphql-request";

import client from "./client";

export const queryListingsQuery = gql`
  query queryListings(
    $currentPage: Int
    $rowsPerPage: Int
    $viewport: QueryListingViewport
    $listingId: String
    $addressState: String
    $freeText: String
  ) {
    queryListings(
      currentPage: $currentPage
      rowsPerPage: $rowsPerPage
      viewport: $viewport
      listingId: $listingId
      addressState: $addressState
      freeText: $freeText
    ) {
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

export const queryListingsRequest = (
  variables?: QueriesQueryListingsArgs,
  requestHeaders?: HeadersInit
) => {
  return client.request(queryListingsQuery, variables, requestHeaders);
};

export const useQueryListings = <
  TData = {
    queryListings: QueryListing;
  }
>(
  variables?: QueriesQueryListingsArgs,
  options?: UseQueryOptions<TData, ClientError>
) => {
  return useQuery<TData, ClientError>(
    [useQueryListings.name, variables],
    () => {
      return queryListingsRequest(variables);
    },
    {
      ...options,
    }
  );
};

export default useQueryListings;
