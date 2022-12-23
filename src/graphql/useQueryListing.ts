import { useQuery, UseQueryOptions } from "react-query";

import { ClientError, gql, RequestOptions } from "graphql-request";

import client from "./client";

export const queryListingsByID = gql`
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
        stats
      }
    }
  }
`;

type Listing = Maybe<SingleListing>;

export const queryListingByIDRequest = async (
  options?: Partial<
    RequestOptions<
      Partial<{
        listingId?: string;
      }>,
      Listing
    >
  >
) => {
  return client
    .request<Queries>({
      ...options,
      variables: {
        listingIDs: [options?.variables?.listingId],
      },
      document: queryListingsByID,
    })
    .then((data) => data.queryListingsByIDs?.listings?.[0]);
};

export const useQueryListing = (
  variables: {
    listingId?: string;
  },
  options?: UseQueryOptions<Listing, ClientError>
) => {
  return useQuery<Listing, ClientError>(
    [useQueryListing.name],
    () => {
      return queryListingByIDRequest({ variables });
    },
    {
      enabled: !!variables.listingId,
      ...options,
    }
  );
};

export default useQueryListing;
