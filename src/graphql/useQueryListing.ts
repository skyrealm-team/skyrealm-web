import { useQuery, UseQueryOptions } from "react-query";

import { ClientError, gql, RequestOptions } from "graphql-request";

import client from "./client";

export const queryListingQuery = gql`
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
        stats
        polyGeom
        paid
        size
        ceiling
        frontage
        rentPrice
        rentUnit
        rentPeriod
        possession
        pics
        overview
        brokersInfo {
          agency
          agencyAvatar
          avatar
          bio
          firstName
          lastName
          phone
        }
      }
    }
  }
`;

export const queryListingRequest = async (
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
      document: queryListingQuery,
    })
    .then((data) => data.queryListingsByIDs?.listings?.[0] ?? null);
};

export const useQueryListing = (
  variables: {
    listingId?: string;
  },
  options?: UseQueryOptions<Maybe<SingleListing>, ClientError>
) => {
  return useQuery<Maybe<SingleListing>, ClientError>(
    [queryListingQuery, variables],
    () => {
      return queryListingRequest({ variables });
    },
    {
      enabled: !!variables.listingId,
      ...options,
    }
  );
};

export default useQueryListing;
