import { useQuery, UseQueryOptions } from "react-query";

import { ClientError, gql, RequestOptions } from "graphql-request";

import client from "./client";

export const queryListingsQuery = gql`
  query queryListings(
    $currentPage: Int
    $rowsPerPage: Int
    $bounds: QueryListingBounds!
    $spaceUse: String
  ) {
    queryListings(
      currentPage: $currentPage
      rowsPerPage: $rowsPerPage
      bounds: $bounds
      spaceUse: $spaceUse
    ) {
      currentPage
      rowsPerPage
      totalPage
      listings {
        listingId
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
  options?: Partial<
    RequestOptions<
      Partial<QueriesQueryListingsArgs>,
      {
        queryListings: QueryListing;
      }
    >
  >
) => {
  return client.request({
    ...options,
    variables: {
      currentPage: 1,
      rowsPerPage: 100,
      ...options?.variables,
    },
    document: queryListingsQuery,
  });
};

export const useQueryListings = <
  TData = {
    queryListings: QueryListing;
  }
>(
  variables?: Partial<QueriesQueryListingsArgs>,
  options?: UseQueryOptions<TData, ClientError>
) => {
  return useQuery<TData, ClientError>(
    [useQueryListings.name, variables],
    ({ signal }) => {
      return queryListingsRequest({
        variables,
        signal: signal as RequestOptions["signal"],
      });
    },
    {
      enabled: !!variables?.bounds,
      ...options,
    }
  );
};

export default useQueryListings;
