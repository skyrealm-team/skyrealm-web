import { useQuery, UseQueryOptions } from "react-query";

import { ClientError, gql, RequestOptions } from "graphql-request";

import client from "./client";

export const queryBrokerListingsQuery = gql`
  query queryBrokerListings($listingIDs: [String]) {
    queryBrokerListings(listingIDs: $listingIDs) {
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

export const queryBrokerListingsRequest = async (
  options?: Partial<RequestOptions<object, Queries["queryBrokerListings"]>>
) => {
  return client
    .request<Queries>({
      ...options,
      document: queryBrokerListingsQuery,
    })
    .then((data) => data.queryBrokerListings);
};

export const useQueryBrokerListings = (
  options?: UseQueryOptions<Queries["queryBrokerListings"], ClientError>
) => {
  return useQuery<Queries["queryBrokerListings"], ClientError>(
    [queryBrokerListingsQuery],
    () => {
      return queryBrokerListingsRequest();
    },
    {
      ...options,
    }
  );
};

export default useQueryBrokerListings;
