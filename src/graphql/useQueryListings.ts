import { useQuery, UseQueryOptions } from "react-query";

import { ClientError, gql, RequestOptions } from "graphql-request";

import client from "./client";

export const queryListingsQuery = gql`
  query queryListings(
    $currentPage: Int
    $rowsPerPage: Int
    $bounds: QueryListingBounds!
    $spaceUse: String
    $listingType: String
  ) {
    queryListings(
      currentPage: $currentPage
      rowsPerPage: $rowsPerPage
      bounds: $bounds
      spaceUse: $spaceUse
      listingType: $listingType
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
        totalVisits
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
  return client
    .request<Queries>({
      ...options,
      variables: {
        currentPage: 1,
        rowsPerPage: 100,
        ...options?.variables,
      },
      document: queryListingsQuery,
    })
    .then((data) => data.queryListings);
};

export const useQueryListings = (
  variables?: Partial<QueriesQueryListingsArgs>,
  options?: UseQueryOptions<Queries["queryListings"], ClientError>
) => {
  return useQuery<Queries["queryListings"], ClientError>(
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
