import { useQuery, UseQueryOptions } from "react-query";

import { ClientError, gql, RequestOptions } from "graphql-request";

import client from "./client";

export const queryListingsByIDs = gql`
  query queryListingsByIDs($listingIDs: [String]) {
    queryListingsByIDs(listingIDs: $listingIDs) {
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

export const queryListingsByIDsRequest = (
  options?: Partial<
    RequestOptions<Partial<QueriesQueryListingsByIDsArgs>, Queries>
  >
) => {
  return client.request({
    ...options,
    document: queryListingsByIDs,
  });
};

export const useQueryListingsByIDs = (
  variables?: Partial<QueriesQueryListingsByIDsArgs>,
  options?: UseQueryOptions<Queries, ClientError>
) => {
  return useQuery<Queries, ClientError>(
    [useQueryListingsByIDs.name],
    () => {
      return queryListingsByIDsRequest({
        variables,
      });
    },
    {
      enabled: !!variables?.listingIDs?.length,
      ...options,
    }
  );
};

export default useQueryListingsByIDs;
