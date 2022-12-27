import { useQuery, UseQueryOptions } from "react-query";

import { ClientError, gql, RequestOptions } from "graphql-request";

import client from "./client";

export const queryListingByIdQuery = gql`
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

export const queryListingByIdRequest = async (
  options?: Partial<
    RequestOptions<
      Partial<{
        listingId?: string;
      }>,
      Maybe<SingleListing>
    >
  >
) => {
  return client
    .request<Queries>({
      ...options,
      variables: {
        listingIDs: [options?.variables?.listingId],
      },
      document: queryListingByIdQuery,
    })
    .then((data) => data.queryListingsByIDs?.listings?.[0] ?? null);
};

export const useQueryListingById = (
  variables: {
    listingId?: string;
  },
  options?: UseQueryOptions<Maybe<SingleListing>, ClientError>
) => {
  return useQuery<Maybe<SingleListing>, ClientError>(
    [queryListingByIdQuery, variables],
    () => {
      return queryListingByIdRequest({ variables });
    },
    {
      enabled: !!variables.listingId,
      ...options,
    }
  );
};

export default useQueryListingById;
