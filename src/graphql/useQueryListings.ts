import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import {
  useDeepCompareEffect,
  useFirstMountState,
  usePrevious,
} from "react-use";

import { ClientError, gql, RequestOptions } from "graphql-request";

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
  options?: Partial<
    RequestOptions<
      QueriesQueryListingsArgs,
      {
        queryListings: QueryListing;
      }
    >
  >
) => {
  return client.request({
    ...options,
    document: queryListingsQuery,
  });
};

export const useQueryListings = <
  TData = {
    queryListings: QueryListing;
  }
>(
  variables?: QueriesQueryListingsArgs,
  options?: UseQueryOptions<TData, ClientError>
) => {
  const queryClient = useQueryClient();
  const previousVariables = usePrevious(variables);
  const isFirstMount = useFirstMountState();

  useDeepCompareEffect(() => {
    if (!isFirstMount) {
      queryClient.cancelQueries({
        queryKey: [useQueryListings.name, previousVariables],
      });
    }
  }, [variables]);

  return useQuery<TData, ClientError>(
    [useQueryListings.name, variables],
    ({ signal }) => {
      return queryListingsRequest({ variables, signal: signal as any });
    },
    {
      ...options,
    }
  );
};

export default useQueryListings;
