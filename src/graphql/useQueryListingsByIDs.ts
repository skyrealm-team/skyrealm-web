import { useQuery, UseQueryOptions } from "react-query";

import { ClientError, gql, RequestOptions } from "graphql-request";

import client from "./client";

export const queryListingsByIDsQuery = gql`
  query queryListingsByIDs($listingIDs: [String]) {
    queryListingsByIDs(listingIDs: $listingIDs) {
      listings {
        listingId
        name
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

export const queryListingsByIDsRequest = async (
  options?: Partial<
    RequestOptions<
      Partial<QueriesQueryListingsByIDsArgs>,
      Queries["queryListingsByIDs"]
    >
  >
) => {
  return client
    .request<Queries>({
      ...options,
      document: queryListingsByIDsQuery,
    })
    .then((data) => data.queryListingsByIDs);
};

export const useQueryListingsByIDs = (
  variables?: Partial<QueriesQueryListingsByIDsArgs>,
  options?: UseQueryOptions<Queries["queryListingsByIDs"], ClientError>
) => {
  return useQuery<Queries["queryListingsByIDs"], ClientError>(
    [queryListingsByIDsQuery],
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
